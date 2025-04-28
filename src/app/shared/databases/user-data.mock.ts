import { InjectionToken } from "@angular/core";
import { BloodType, Role, UserDatabase } from '../models/user.model';

export const USER_DATABASE = new InjectionToken<UserDatabase>('UserDatabase');

export const userDatabaseValue: UserDatabase={
    users: [
        {
            id: 1,
            username: "admin",
            password: "admin",
            firstName: "Admin",
            fatherSName: "a",
            lastName: "admin",
            role: Role.Admin,
            dob: '03-02-1998',
            bloodType: BloodType.BPositive,
            field: ""
        },
        {
            id: 2,
            username: "doctor-1",
            password: "P@ssw0rd",
            firstName: "Doctor",
            fatherSName: "1",
            lastName: "1",
            role: Role.Doctor,
            dob: '03-02-1998',
            bloodType: BloodType.APositive,
            field: 'Dermatologist'
        },
        {
            id: 3,
            username: "doctor-2",
            password: "P@ssw0rd",
            firstName: "Doctor",
            fatherSName: "2",
            lastName: "2",
            role: Role.Doctor,
            dob: '03-02-1998',
            bloodType: BloodType.BNegative,
            field: "Cardiologist"
        },
        {
            id: 4,
            username: "patient-1",
            password: "P@ssw0rd",
            firstName: "Patient",
            fatherSName: "1",
            lastName: "1",
            role: Role.Patient,
            dob: '03-02-1998',
            bloodType: BloodType.ABNegative,
            field: ""
        },
        {
            id: 5,
            username: "patient-2",
            password: "P@ssw0rd",
            firstName: "Patient",
            fatherSName: "2",
            lastName: "2",
            role: Role.Patient,
            dob: '03-02-1998',
            bloodType: BloodType.APositive,
            field: ""
        }
    ]
}