import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: false,
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent {
  @Input() title: string ='';
  @Input() value: number | string = 0;
  @Input() icon? : string;
  @Input() cardClass: string = 'bg-white';
}
