import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatSideComponent } from './stat-side.component';

describe('StatSideComponent', () => {
  let component: StatSideComponent;
  let fixture: ComponentFixture<StatSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatSideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
