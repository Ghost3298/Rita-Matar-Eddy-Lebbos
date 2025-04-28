import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../guards/auth.service';
import { UserDataOperations } from '../../databases/user-data.operations';
import { FormControl, FormGroup } from '@angular/forms';
import { Appointment, Status } from '../../models/appointment.model';
import { AppDataOperations } from '../../databases/appointments.operations';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-schedule',
  standalone: false,
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  @Input() isPatientView: boolean = false;
  @Input() currentUserId: number = 0;
  
  public role: string = '';
  public fields: string[] = [];
  public docSelected: boolean = false;
  public isModalOpen: boolean = false;
  public selectedDoctor: any = null;
  public doctors: any[] = [];
  public selectedDoctorAppointments: Appointment[] = [];
  public patients: any[] = [];
  public currentUser: any;

  appForm = new FormGroup({
    patientId: new FormControl<number>(0),
    date: new FormControl(''),
    time: new FormControl(''),
    note: new FormControl('')
  });

  constructor(
    private auth: AuthService,
    private userDataOp: UserDataOperations,
    private appOp: AppDataOperations
  ) {}

  ngOnInit() {
    this.loadFields();
    this.role = this.auth.currentUser.role;
    this.currentUser = this.auth.currentUser;
    
    if (!this.isPatientView) {
      this.patients = this.userDataOp.getUsersByRole('Patient');
    } else {
      this.appForm.patchValue({
        patientId: this.currentUserId
      });
    }

    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if(this.isModalOpen)
          {this.openModal()};
      }
    });
  }

  private loadFields(): void {
    try {
      this.fields = this.userDataOp.getFields();
    } catch (error) {
      console.error('Failed to load doctor fields:', error);
      this.fields = [];
    }
  }

  clearDoctors(): void {
    this.doctors = [];
    this.selectedDoctorAppointments = [];
    this.docSelected = false;
    this.selectedDoctor = null;
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  async getDoctors(field: string): Promise<void> {
    try {
      const doctors = this.userDataOp.getDoctorsByField(field);
      this.doctors = await Promise.all(
        doctors.map(async (doctor) => {
          let appointments = await this.appOp.getAppsByUserId(doctor.id);
          
          if (this.isPatientView) {
            appointments = appointments.filter(app => app.patientId === this.currentUserId);
          }
          
          return {
            ...doctor,
            appointments: appointments || []
          };
        })
      );
    } catch (error) {
      console.error(`Failed to load doctors for field ${field}:`, error);
      this.doctors = [];
    }
  }

  loadDoctorAppointments(doctor: any): void {
    if (this.isPatientView) {
      this.selectedDoctorAppointments = doctor.appointments.filter(
        (app: Appointment) => app.patientId === this.currentUserId
      );
    } else {
      this.selectedDoctorAppointments = doctor.appointments;
    }
    
    this.docSelected = true;
    this.selectedDoctor = doctor;
    console.log(this.docSelected);
  }

  submitApp() {
    const newApp: Appointment = {
      id: 0,
      doctorId: this.selectedDoctor.id,
      patientId: this.isPatientView ? this.currentUserId : this.appForm.value.patientId!,
      date: this.appForm.value.date!,
      time: this.parseTime(this.appForm.value.time!),
      status: Status.Pending,
      note: this.appForm.value.note || ''
    };

    this.appOp.addAppointment(newApp);
    alert('Appointment Submitted!');
    this.isModalOpen = false;
    this.docSelected = false;
    this.selectedDoctor = null;
    this.appForm.reset();
    
    if (this.isPatientView) {
      this.appForm.patchValue({
        patientId: this.currentUserId
      });
    }
  }

  private parseTime(timeString: string): { hours: number, minutes: number } {
    const [hours, minutes] = timeString.split(':').map(Number);
    return { hours, minutes };
  }
}