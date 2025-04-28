import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { StatCardModule } from "./shared/stat-card/stat-card.module";
import { AdminScheduleComponent } from './admin/admin-schedule/admin-schedule.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { PatientScheduleComponent } from './patient/patient-schedule/patient-schedule.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { DoctorScheduleComponent } from './doctor/doctor-schedule/doctor-schedule.component';
import { DoctorPatientsComponent } from './doctor/doctor-patients/doctor-patients.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    AdminDashboardComponent,
    AdminPanelComponent,
    AdminScheduleComponent,
    PatientDashboardComponent,
    PatientScheduleComponent,
    DoctorDashboardComponent,
    DoctorScheduleComponent,
    DoctorPatientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
