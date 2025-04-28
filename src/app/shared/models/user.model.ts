export enum Role {
    Doctor = 'Doctor',
    Patient = 'Patient',
    Admin = 'Admin'
  }
  
  export enum BloodType {
    APositive = 'A+',
    ANegative = 'A-',
    BPositive = 'B+',
    BNegative = 'B-',
    OPositive = 'O+',
    ONegative = 'O-',
    ABPositive = 'AB+',
    ABNegative = 'AB-'
  }
  
  export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    fatherSName: string;
    lastName: string;
    role: Role;
    dob: string;
    bloodType: BloodType;
    field: string;
  }

  export interface UserDatabase{
    users: User[];
  }