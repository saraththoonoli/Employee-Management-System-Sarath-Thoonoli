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
  searchTerm: string = '';

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private leaveService: LeaveService
  ) { }
// life cyclehook
  ngOnInit(): void {
    console.log('Employee Details Component initialized.');
    this.loadEmployees();
  }

  // load emp details
  loadEmployees(): void {
    console.log('Fetching employees...');
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
        console.log('Employees:', this.employees);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
// edit employee details
  editEmployee(employeeId: number): void {
    console.log('Editing employee with ID:', employeeId);
    this.router.navigate(['/edit', employeeId]);
  }

  // delete employee details
  deleteEmployee(employeeId: number): void {
    console.log('Deleting employee with ID:', employeeId);

    // Display a confirmation dialog using SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms, delete the employee
        this.employeeService.deleteEmployee(employeeId).subscribe(
          () => {
            // Display a success alert
            Swal.fire({
              title: 'Success!',
              text: 'Employee deleted successfully.',
              icon: 'success',
            });
            // Reload the list of employees
            this.loadEmployees();
            //  to refresh the employee list
            this.employeeService.notifyRefreshList();
          },
          (error) => {
            // Display an error alert if deletion fails
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
    console.log('Navigating back to HR dashboard...');
    this.router.navigate(['/hr-dashboard']);
  }

  // search filter
  applyFilter(): void {
    if (this.searchTerm === '') {
      // If search term is empty, reload all data
      this.loadEmployees();
    } else {
      // Filter employees based on the search term
      this.employees = this.employees.filter((emp) => {
        const fullName = emp.name.toLowerCase();
        const email = emp.email.toLowerCase();
        const searchTerm = this.searchTerm.toLowerCase();

        return fullName.includes(searchTerm) || email.includes(searchTerm);
      });
    }
  }
}
