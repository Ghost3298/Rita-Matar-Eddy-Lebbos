import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../guards/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  public isMenuOpen: boolean = false;
  public username: string | null = null;
  public role: string | null = null;

  constructor(
    private authService : AuthService,
    private router: Router
  ){}

  ngOnInit() {
    if(this.authService.isLoggedIn){
      this.username = this.authService.currentUser.username;
      this.role= this.authService.currentUser.role;
      if(this.role){
        this.router.navigate([`/home/${this.role}-dashboard`]);
      }
    }else{
      this.router.navigate(['']);
    }
  }

  Popup() {
    const popup = document.getElementById('Logout-Popup');
    if (popup) {
      popup.style.display = popup.style.display === 'none' ? 'flex' : 'none';
    }
  }

  Logout(){
    this.authService.logout();
  }

  GOTO(location: any){
    this.router.navigate([`/${location}`]);
    this.isMenuOpen = !this.isMenuOpen
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
