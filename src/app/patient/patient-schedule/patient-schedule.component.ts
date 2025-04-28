import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/guards/auth.service';

@Component({
  selector: 'app-patient-schedule',
  standalone: false,
  templateUrl: './patient-schedule.component.html',
  styleUrl: './patient-schedule.component.css'
})
export class PatientScheduleComponent implements OnInit{
    public id : number =0;

    constructor(
      private  auth : AuthService
    ){}

    ngOnInit(){
      this.id = this.auth.currentUser.id
    }
}
