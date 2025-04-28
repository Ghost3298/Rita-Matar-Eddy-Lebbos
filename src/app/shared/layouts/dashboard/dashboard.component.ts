import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../guards/auth.service';
import { StatItem } from '../stat-side/stat-side.component';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  public role : any = '';
  @Input() appointments: any[] =[];
  @Input() stats: StatItem[] =[];
  constructor(
        private auth : AuthService
      ){}
    
      ngOnInit() {
          this.role = this.auth.currentUser.role;
      }
}
