import { InjectionToken } from "@angular/core";
import { AppointmentDatabase, Status } from "../models/appointment.model";

export const APP_DATABASE = new InjectionToken<AppointmentDatabase>('AppDatabase');

export const appDatabaseValue: AppointmentDatabase = {
    appointments: [
        {
            id: 1,
            doctorId: 2,
            patientId: 4,
            date: '08-04-2025',
            time: {
                hours: 13,
                minutes: 0
            },
            status: Status.Pending,
            note: "check hand skin"
        }
    ]
};