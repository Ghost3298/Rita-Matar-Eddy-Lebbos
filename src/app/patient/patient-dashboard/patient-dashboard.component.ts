import { Component, Inject } from '@angular/core';
import { AuthService } from '../../shared/guards/auth.service';
import { AppDataOperations } from '../../shared/databases/appointments.operations';
import { UserDataOperations } from '../../shared/databases/user-data.operations';
import { StatItem } from '../../shared/layouts/stat-side/stat-side.component';
import { APP_DATABASE } from '../../shared/databases/appointments.mock';
import { AppointmentDatabase } from '../../shared/models/appointment.model';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-patient-dashboard',
  standalone: false,
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})

export class PatientDashboardComponent {
  public appointmentsThisWeek: any = '';
  public appointmentsThisMonth: any = '';
  public patientId: string = '';
  public patient : any ='';

  public appointments : StatItem[] = [];

  constructor(
    private userOp: UserDataOperations,
    private auth : AuthService,
    @Inject(APP_DATABASE) private appDatabase : AppointmentDatabase
  ) {}

  ngOnInit(): void {
    this.patientId = this.auth.currentUser.id;
    this.patient = this.userOp.getUserById( this.auth.currentUser.id, 'Patient');

    this.appointmentsThisMonth = this.countAppointmentsThisMonth();
    this.appointmentsThisWeek = this.countAppointmentsThisWeek();

    const week : StatItem ={
      title: 'App. this week',
      value: this.appointmentsThisWeek,
      icon: 'assets/images/appointment.png'
    }

    const month : StatItem ={
      title: 'App. this month',
      value: this.appointmentsThisMonth,
      icon: 'assets/images/appointment.png'
    }

    this.appointments = [
      week, month
    ]
  }

  countAppointmentsThisMonth(): number {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    return this.appDatabase.appointments.filter(appointment => {
        const appointmentDate = this.convertToDate(appointment.date);
        return appointmentDate >= startOfMonth && appointmentDate <= endOfMonth;
    }).filter(a=> a.patientId === this.patient.id).length;
  }

  countAppointmentsThisWeek(): number {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);

    return this.appDatabase.appointments.filter(appointment => {
        const appointmentDate = this.convertToDate(appointment.date);
        return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek;
    }).filter(a=> a.patientId === this.patient.id).length;
}

  
      private convertToDate(date: Date | string): Date {
          return typeof date === 'string' 
              ? DateTime.fromFormat(date, 'dd-MM-yyyy').toJSDate()
              : new Date(date);
      }
}