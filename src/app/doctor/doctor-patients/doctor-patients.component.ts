import { Component } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { AppDataOperations } from '../../shared/databases/appointments.operations';
import { UserDataOperations } from '../../shared/databases/user-data.operations';
import { AuthService } from '../../shared/guards/auth.service';

@Component({
  selector: 'app-doctor-patients',
  standalone: false,
  templateUrl: './doctor-patients.component.html',
  styleUrl: './doctor-patients.component.css'
})
export class DoctorPatientsComponent {
  public patients: any[] = [];
  public isLoading: boolean = false;
  public errorMessage: string = '';
  public doctorId : number = 0;

  constructor(
    private appDataOps: AppDataOperations,
    private userDataOps: UserDataOperations,
    private authService: AuthService 
  ) {}

  async ngOnInit() {
    this.doctorId = this.authService.currentUser.id;
    this.getPatients();
  }

  private async getPatients(){
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      if(!this.doctorId){
        this.errorMessage = 'error fetching patients';
      }
      const appointments = await this.appDataOps.getAppsByUserId(this.doctorId); 

      const patientsIds = [...new Set(appointments.map(app=> app.patientId))];

      this.patients = await Promise.all(
        patientsIds.map(id => this.userDataOps.getUserById(id, "Patient"))
      )
  } catch (error) {
    console.error('Error loading patients:', error);
    this.errorMessage = 'Failed to load patients. Please try again later.';
    } finally {
    this.isLoading = false;
    }
  }
}