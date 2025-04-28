import { Inject, Injectable } from "@angular/core";
import { USER_DATABASE } from "./user-data.mock";
import { User, UserDatabase } from "../models/user.model";

@Injectable({
    providedIn : 'root'
})
export class UserDataOperations {
    constructor(
        @Inject(USER_DATABASE) private userDatabase: UserDatabase
    ) {}
  
    getCount(Role : string) : number{
        return this.userDatabase.users.filter(a=>a.role == Role).length;
    }

    getUserCount() : number{
        return this.userDatabase.users.length;
    }

    getUserById(Id: number, Role: string){
        return this.userDatabase.users.find(a => a.role == Role && a.id == Id);
    }

    getAllUsers(){
        return [
            ...this.userDatabase.users
        ]
    }

    getUsersByRole(Role : string){
        return this.userDatabase.users.filter(a => a.role == Role);
    }

    addUser(newUser: User) {
        const maxId : number = this.userDatabase.users.length +1;
        if(!newUser.field){
            newUser.field = '';
        }
        newUser.id = maxId;
        try{
            this.userDatabase.users.push(newUser);
           alert('User Added Successfully!')
        }catch(error){
            console.log(error)
        }
    }

    getFields() : string [] {
        const fields = this.userDatabase.users.filter(a => a.role=='Doctor').map(b => b.field);
        return [...new Set(fields)];
    }

    getDoctorsByField(field: string): Omit<User, 'username' | 'password'>[]{
        return this.userDatabase.users
        .filter(a => a.role =='Doctor' && a.field == field)
        .map(b => {
            const{username , password, ...rest} = b;
            return rest;
        });
    }
}
