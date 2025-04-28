import { Component, Inject, OnInit } from '@angular/core';
import { Appointment, AppointmentDatabase } from '../../shared/models/appointment.model';
import { StatItem } from '../../shared/layouts/stat-side/stat-side.component';
import { AppDataOperations } from '../../shared/databases/appointments.operations';
import { AuthService } from '../../shared/guards/auth.service';
import { APP_DATABASE } from '../../shared/databases/appointments.mock';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: false,
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent implements OnInit {
  public stats: StatItem[] = [];
  public appointments: Appointment[] = []
  public currentUser: any;
  public appointmentsThisWeek: any = '';
  public appointmentsThisMonth: any = '';

  constructor(
    private auth : AuthService,
    private appOps : AppDataOperations,
    @Inject(APP_DATABASE) private appDatabase : AppointmentDatabase
  ){}

  ngOnInit(){
    this.currentUser = this.auth.currentUser;
    this.appointments = this.appOps.getAppointments().filter(a=> a.doctorId == this.currentUser.id)

    this.appointmentsThisMonth = this.countAppointmentsThisMonth();
    this.appointmentsThisWeek = this.countAppointmentsThisWeek();

    const week : StatItem = {
      title: 'App. this week',
      value: this.appointmentsThisWeek,
      icon: 'assets/images/appointment.png'
    }

    const month: StatItem ={
      title: 'App. this month',
      value: this.appointmentsThisMonth,
      icon: 'assets/images/appointment.png'
    }

    this.stats.push(
      week, month
    )
  }

  countAppointmentsThisMonth(): number {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999);
  
      return this.appDatabase.appointments.filter(appointment => {
          const appointmentDate = this.convertToDate(appointment.date);
          return appointmentDate >= startOfMonth && appointmentDate <= endOfMonth;
      }).filter(a=> a.doctorId === this.currentUser.id).length;
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
      }).filter(a=> a.doctorId === this.currentUser.id).length;
  }
  
    
        private convertToDate(date: Date | string): Date {
            return typeof date === 'string' 
                ? DateTime.fromFormat(date, 'dd-MM-yyyy').toJSDate()
                : new Date(date);
        }
}
