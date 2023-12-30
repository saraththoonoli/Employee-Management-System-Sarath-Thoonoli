import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import Swal from 'sweetalert2';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuard implements CanDeactivate<CreateEmployeeComponent> {
  canDeactivate(
    component: CreateEmployeeComponent
  ): boolean {
    // Check if the form is dirty or if the user should be prompted before leaving
    if (component.isFormDirty()) {
      Swal.fire({
        title: 'Unsaved Changes',
        text: 'You have unsaved changes. Do you really want to leave?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, leave!',
        cancelButtonText: 'No, stay',
      }).then((result) => {
        if (result.isConfirmed) {
          // User clicked "Yes, leave!" - go back to the previous page
          window.history.back();
        }
      });

      // Returning false by default here to handle asynchronous nature of Swal
      return false;
    }

    return true;
  }
}
