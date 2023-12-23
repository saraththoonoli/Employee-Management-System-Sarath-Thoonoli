import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent {
  // for saving employee details in backend
  employee: any = {
    name: '',
    email: '',
    phone: '',
    age: null,
    dob: null,
    image: '',
    bloodGroup: '',
    gender: '',
    leaveDetails: '',
    designation: '',
  };

  constructor(
    private employeeService: EmployeeService,
    private location: Location,
    private router: Router
  ) {}

  // onSubmit
  onSubmit(): void {
    this.employeeService.addEmployee(this.employee).subscribe(
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
  }

  // goBack page navigation
  goBack(): void {
    this.location.back();
  }
}
