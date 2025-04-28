import { Inject, Injectable } from "@angular/core";
import { Appointment, AppointmentDatabase } from "../models/appointment.model";
import { APP_DATABASE } from "./appointments.mock";
import { DateTime } from "luxon";

@Injectable({
    providedIn: 'root'
})

export class AppDataOperations{
    constructor(
        @Inject(APP_DATABASE) private appDatabase : AppointmentDatabase
    ){}
    
    getAppointments() : Array<Appointment>{
        return this.appDatabase.appointments.map(
            appointment => ({
                ...appointment,
            })
        );
    }

    private convertToDate(date: Date | string): Date {
        return typeof date === 'string' 
            ? DateTime.fromFormat(date, 'dd-MM-yyyy').toJSDate()
            : new Date(date);
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
        }).length;
    }


    countAppointmentsThisMonth(): number {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        return this.appDatabase.appointments.filter(appointment => {
            const appointmentDate = this.convertToDate(appointment.date);
            return appointmentDate >= startOfMonth && appointmentDate <= endOfMonth;
        }).length;
    }


    getAppsByUserId(Id : number) : Appointment[]{
        return this.appDatabase.appointments.filter(a => a.doctorId == Id || a.patientId == Id);
    }

    getAppById(Id : number){
        return this.appDatabase.appointments.find(a=> a.id == Id);
    }

    addAppointment(newApp : Appointment){
        const maxId = this.getAppointments.length;
        newApp.id = maxId +1;
        this.appDatabase.appointments.push(newApp);
    }

    updateAppointment(updateAppointment : Appointment){

    }
}