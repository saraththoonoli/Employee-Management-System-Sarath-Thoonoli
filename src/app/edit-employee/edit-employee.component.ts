import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  employeeId: any;
  employee: any = {};

  // Inject the Location service in the constructor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private location: Location
  ) { }

  // employee id fetch
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeeId = +params['id'];
      console.log('Employee ID:', this.employeeId);
      this.loadEmployeeDetails();
    });
  }

  // load the employee details
  loadEmployeeDetails(): void {
    this.employeeService.getEmployeeDetails(this.employeeId).subscribe(
      (data) => {
        this.employee = data;
        console.log('Employee Details:', this.employee);
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }

  // update employee details
  updateEmployee(): void {
    console.log('Updating Employee:', this.employee);

    this.employeeService.updateEmployee(this.employeeId, this.employee).subscribe(
      () => {
        Swal.fire({
          title: 'Success!',
          text: 'Employee details updated successfully.',
          icon: 'success',
        });
        console.log('Employee details updated successfully.');
        this.router.navigate(['/employee-details']);
      },
      (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while updating the employee details.',
          icon: 'error',
        });
        console.error('Error updating employee details:', error);
      }
    );
  }

  

  // go back logic
  goBack(): void {
    console.log('Navigating back');
    this.location.back();
  }
}