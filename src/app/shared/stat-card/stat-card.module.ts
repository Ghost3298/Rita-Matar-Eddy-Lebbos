import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from './stat-card.component';

@NgModule({
  declarations: [StatCardComponent],
  imports: [CommonModule],
  exports: [StatCardComponent]
})
export class StatCardModule { }