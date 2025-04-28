import { Component, Input } from '@angular/core';

export interface StatItem {
  title: string;
  value: string | number;
  icon: string;
}


@Component({
  selector: 'app-stat-side',
  standalone: false,
  templateUrl: './stat-side.component.html',
  styleUrl: './stat-side.component.css'
})

export class StatSideComponent {


    @Input() stats: StatItem[] = [];

}
