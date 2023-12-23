import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBarChartComponent } from './leave-bar-chart.component';

describe('LeaveBarChartComponent', () => {
  let component: LeaveBarChartComponent;
  let fixture: ComponentFixture<LeaveBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
