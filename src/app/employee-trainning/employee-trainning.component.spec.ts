import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTrainningComponent } from './employee-trainning.component';

describe('EmployeeTrainningComponent', () => {
  let component: EmployeeTrainningComponent;
  let fixture: ComponentFixture<EmployeeTrainningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTrainningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeTrainningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
