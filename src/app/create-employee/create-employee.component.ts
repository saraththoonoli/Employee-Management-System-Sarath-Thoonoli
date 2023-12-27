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

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private location: Location,
    private router: Router
  ) {
    this.employeeForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      age: [null, Validators.required],
      dob: [null, Validators.required],
      image: [''],
      bloodGroup: [''],
      gender: ['', Validators.required],
    });
  }

  // onSubmit method
  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(
        () => {
          Swal.fire({
            title: 'Success!',
            text: 'Employee added successfully.',
            icon: 'success',
          });
          console.log('Employee added successfully.');
          // Navigate to the employee-details route
          this.router.navigate(['/employee-details']);
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while adding the employee.',
            icon: 'error',
          });
          console.error('Error adding employee:', error);
        }
      );
    } else {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please fill in all required fields and correct any validation errors.',
        icon: 'warning',
      });
    }
  }

  // goBack page navigation
  goBack() {
    this.router.navigate(['hr-dashboard']);
  }
}
