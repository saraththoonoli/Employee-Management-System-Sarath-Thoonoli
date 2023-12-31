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
    // Check if the form is dirty,
    if (component.isFormDirty()) {
      // Display a confirmation dialog
      return window.confirm('Do you really want to leave?');
    }
  
    return true;
  }
}
