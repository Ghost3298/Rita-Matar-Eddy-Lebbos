import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: false,
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit, OnDestroy{
  time : number = 3;
  private timer: any;

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    const timer = setInterval(() => {
      this.time--;
      
      if (this.time <= 0) {
        clearInterval(timer);
        this.router.navigate(['']);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
