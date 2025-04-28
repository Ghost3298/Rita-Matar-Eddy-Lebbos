import { Component, OnInit } from '@angular/core';
import { Appointment, Status } from '../../shared/models/appointment.model';
import { AppDataOperations } from '../../shared/databases/appointments.operations';
import { AuthService } from '../../shared/guards/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-schedule',
  standalone: false,
  templateUrl: './doctor-schedule.component.html',
  styleUrl: './doctor-schedule.component.css'
})
export class DoctorScheduleComponent implements OnInit {
    public appointmentForm : FormGroup;
    public appointments: any[] = [];
    public selectedAppointment: Appointment | null = null;
    public statusOptions = Object.values(Status);

    constructor(
      private appDataops: AppDataOperations,
      private auth : AuthService,
      private fb: FormBuilder
    ){this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      notes: [''],
      status: ['', Validators.required]
  });}

    ngOnInit(){
      this.appointments = this.appDataops.getAppsByUserId(this.auth.currentUser.id)
    }

    onAppointmentSelected(appointment: Appointment) {
      this.selectedAppointment = appointment;
      this.appointmentForm.patchValue({
          date: this.formatDateForInput(appointment.date),
          time: this.formatTimeForInput(appointment.time),
          notes: appointment.note || '',
          status: appointment.status
      });
  }

  saveAppointment() {
      if (this.appointmentForm.valid && this.selectedAppointment) {
          const updatedAppointment = {
              ...this.selectedAppointment,
              date: this.appointmentForm.value.date,
              time: this.parseTimeFromInput(this.appointmentForm.value.time),
              notes: this.appointmentForm.value.notes,
              status: this.appointmentForm.value.status
          };

          this.appDataops.updateAppointment(updatedAppointment);
          
      }
  }

  private formatDateForInput(date: string): string {
    const [day, month, year] = date.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  

  private formatTimeForInput(time: { hours: number, minutes: number } | string): string {
      if (typeof time === 'string') {
          return time; 
      }
      return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`;
  }

  private parseTimeFromInput(timeString: string): { hours: number, minutes: number } {
      const [hours, minutes] = timeString.split(':').map(Number);
      return { hours, minutes };
  }
}