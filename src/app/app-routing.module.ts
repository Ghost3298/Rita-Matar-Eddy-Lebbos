import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './shared/layouts/main/main.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ApppointmentResolver } from './shared/databases/appointment.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminScheduleComponent } from './admin/admin-schedule/admin-schedule.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { PatientScheduleComponent } from './patient/patient-schedule/patient-schedule.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { DoctorScheduleComponent } from './doctor/doctor-schedule/doctor-schedule.component';
import { DoctorPatientsComponent } from './doctor/doctor-patients/doctor-patients.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  
  { path: 'home', component: MainComponent, 
    children:[
      { path: 'Admin-dashboard', component: AdminDashboardComponent,resolve:{appointments: ApppointmentResolver}},
      { path: 'Admin-panel', component: AdminPanelComponent},
      { path: 'Admin-schedule', component: AdminScheduleComponent},
      { path: 'Patient-dashboard', component: PatientDashboardComponent},
      { path: 'Patient-schedule', component: PatientScheduleComponent},
      { path: 'Doctor-dashboard', component: DoctorDashboardComponent},
      { path: 'Doctor-schedule', component: DoctorScheduleComponent},
      { path: 'Doctor-patients', component: DoctorPatientsComponent}
      ]
  },
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
