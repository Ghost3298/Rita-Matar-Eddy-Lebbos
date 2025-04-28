import { Component, OnInit } from '@angular/core';
import { Appointment, Status } from '../../shared/models/appointment.model';
import { FormControl, FormGroup } from '@angular/forms';
import { UserDataOperations } from '../../shared/databases/user-data.operations';
import { AppDataOperations } from '../../shared/databases/appointments.operations';
import { AuthService } from '../../shared/guards/auth.service';

@Component({
  selector: 'app-admin-schedule',
  standalone: false,
  templateUrl: './admin-schedule.component.html',
  styleUrl: './admin-schedule.component.css'
})
export class AdminScheduleComponent implements OnInit {
   public id : number =0;
  
      constructor(
        private  auth : AuthService
      ){}
  
      ngOnInit(){
        this.id = this.auth.currentUser.id
      }
}