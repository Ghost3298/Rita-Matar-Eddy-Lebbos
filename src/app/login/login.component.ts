import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/guards/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  isLoading = false;
  errorMessage: string | null = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  ngOnInit(): void{
    if(this.auth.isLoggedIn){
      this.router.navigate(['/home'])
    }else{
      return
    }
  }

  loginClick(){
    this.errorMessage = null;

    if(this.loginForm.invalid){
      this.errorMessage = 'Please enter username and password';
      return;
    }

    const {username, password} = this.loginForm.value;

    if(!username || !password){
      this.errorMessage = 'Please enter username and password';
      return;
    }

    this.isLoading = true;

    try {
      const result = this.auth.login(username, password);
      if (result !== "Logged In!") {
        this.errorMessage = result; 
      }
    } catch (error) {
      this.errorMessage = 'Error!';
    } finally {
      this.isLoading = false;
    }
  }
}
