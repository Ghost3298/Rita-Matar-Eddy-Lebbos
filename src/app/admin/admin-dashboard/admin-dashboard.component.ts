import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../shared/models/appointment.model';
import { UserDataOperations } from '../../shared/databases/user-data.operations';
import { AppDataOperations } from '../../shared/databases/appointments.operations';
import { StatItem } from '../../shared/layouts/stat-side/stat-side.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  public appointments: any[] = [];
  public stats: StatItem[] = [];

  public numberOfDoctors: number = 0;
  public numberOfPatients: number = 0;
  public appointmentsThisWeek: number = 0;
  public appointmentsThisMonth: number = 0;

  constructor(
    private userDataOps : UserDataOperations,
    private appDataOps : AppDataOperations,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.numberOfDoctors = this.userDataOps.getCount('Doctor');
    this.numberOfPatients = this.userDataOps.getCount('Patient');
    this.appointmentsThisMonth = this.appDataOps.countAppointmentsThisMonth();
    this.appointmentsThisWeek = this.appDataOps.countAppointmentsThisWeek();

    const drs : StatItem = {
      title : "Number of Dr.",
      value : this.numberOfDoctors,
      icon : 'assets/images/Doctor.png'
    }

    const patients : StatItem = {
      title : "Number of Patients",
      value : this.numberOfPatients,
      icon : 'assets/images/Patient.png'
    }

    const week : StatItem ={
      title : "App. this week",
      value : this.appointmentsThisWeek,
      icon : 'assets/images/appointment.png'
    }

    const month : StatItem ={
      title : "App. this month",
      value : this.appointmentsThisMonth,
      icon : 'assets/images/appointment.png'
    }

    this.stats.push(drs, patients, week, month);
    this.appointments = this.route.snapshot.data['appointments'];
  }
}
