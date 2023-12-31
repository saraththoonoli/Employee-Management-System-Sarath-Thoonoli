import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

@Injectable({
  providedIn: 'root',
})
export class DeactivateGuard implements CanDeactivate<CreateEmployeeComponent> {
  canDeactivate(
    component: CreateEmployeeComponent
  ): boolean {
    if (component.isFormDirty()) {
      return window.confirm('Do you really want to leave?');
    }
  
    return true;
  }
}
