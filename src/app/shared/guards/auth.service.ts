import { Injectable, Inject } from "@angular/core";
import { USER_DATABASE } from "../databases/user-data.mock";
import { User, UserDatabase } from "../models/user.model";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private readonly STORAGE_KEY = 'currentUser';

    constructor(
        @Inject(USER_DATABASE) private userDatabase: UserDatabase,
        private router: Router
      ) {}

      login(username: string, password: string): string{
        if(!username || !password){
            return ("Please enter username and password");
        }
        
        const foundUser = this.findUser(username,password);

        if(foundUser){
            const userData = {
                id : foundUser.id,
                username,
                role: foundUser.role,
                loginTime: Date.now()
            };

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
            this.router.navigate([`/home/${foundUser.role}-dashboard`]);
            return ("Logged In!");
        } else {
            return ('invalid username or password');
        }
      }

      private findUser(username: string, password: string): User | null {
        const user =this.userDatabase.users.find(
            a => a.username == username && a.password == password
        )

        if(user){
            return user;
        }

        return null;
      }

      logout(): void{
        localStorage.removeItem(this.STORAGE_KEY);
        this.router.navigate(['']);
    }

    get currentUser(){
        const user = localStorage.getItem(this.STORAGE_KEY);
        return user ? JSON.parse(user) : null;
    }

    get isLoggedIn(): boolean{
        return !!this.currentUser;
    }

    get userRole(): string | null{
        return this.currentUser.role || null;
    }
}