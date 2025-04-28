import { Time } from "@angular/common";

export enum Status{
    Pending = 'Pending',
    Cancelled = 'Cancelled',
    Done = ' Done'
}

export interface Appointment{
    id: number,
    doctorId: number,
    patientId: number,
    date: string,
    time: Time,
    status: Status,
    note : string
}

export interface AppointmentDatabase{
    appointments : Appointment[];
}