import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LeaveService } from '../leave.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  employees: any[] = [];
  location: any;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private leaveService: LeaveService
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadEmployees();

  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  editEmployee(employeeId: number): void {
    this.router.navigate(['/edit', employeeId]);
  }

  deleteEmployee(employeeId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(employeeId).subscribe(
          () => {
            Swal.fire({
              title: 'Success!',
              text: 'Employee deleted successfully.',
              icon: 'success',
            });
            this.loadEmployees();
            this.employeeService.notifyRefreshList(); // Notify to refresh the employee list
          },
          (error) => {
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while deleting the employee.',
              icon: 'error',
            });
            console.error('Error deleting employee:', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Employee deletion cancelled.', 'error');
      }
    });
  }

  // Back function
  goBack(): void {
    this.router.navigate(['/hr-dashboard']);
  }
}