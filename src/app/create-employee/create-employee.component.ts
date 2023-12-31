import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent {
  employeeForm: FormGroup;
  // dependancy injection
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private location: Location,
    private router: Router
  ) {
    
    // validations
    this.employeeForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      age: [null, Validators.required],
      dob: [null, Validators.required],
      image: [''],
      bloodGroup: [''],
      gender: ['', Validators.required],
    });

    // Log the initial state of the form
    console.log('Initial employeeForm:', this.employeeForm.value);
  }

  // Method to calculate age
  calculateAge(dateOfBirth: string): void {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    this.employeeForm.patchValue({ age });
  }

  // onSubmit method
  onSubmit(): void {
    console.log('Submitting form:', this.employeeForm.value);

    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(
        () => {
          Swal.fire({
            title: 'Success!',
            text: 'Employee added successfully.',
            icon: 'success',
          });

          console.log('Employee added successfully.');
          console.log('Updated employeeForm:', this.employeeForm.value);

          // Navigate to the employee-details route
          this.router.navigate(['/employee-details']);
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while adding the employee.',
            icon: 'error',
          });

          console.error('Error adding emp:', error);
        }
      );
    }
  }

  //  candeactive guard
  isFormDirty(): boolean {
    return this.employeeForm.dirty;
  }

  // goBack page navigation
  goBack() {
    console.log('Navigating back to hr-dashboard');
    this.router.navigate(['hr-dashboard']);
  }
}
