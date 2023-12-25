import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrls: ['./emp-edit.component.scss'],
})
export class EmpEditComponent {
  employeeId: any;
  employee: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    // Subscribe to route parameters to get the employee ID
    this.route.params.subscribe((params) => {
      this.employeeId = +params['id'];
      // Load employee details based on the ID
      this.loadEmployeeDetails();
    });
  }

  loadEmployeeDetails(): void {
    // Fetch employee details using the employee service
    this.employeeService.getEmployeeDetails(this.employeeId).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }

  updateEmployee(): void {
    if (this.employeeId) {
      // If the employee ID is available, update the employee details
      this.employeeService
        .updateEmployee(this.employeeId, this.employee)
        .subscribe(
          () => {
            // Display a success alert using SweetAlert2
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Employee details updated successfully.',
            }).then(() => {
              // Navigate back to employee details page
              this.router.navigate(['/emp-details']);

              // reloading the component or fetching fresh data
              this.loadEmployeeDetails();
            });
          },
          (error) => {
            Swal.fire({
              // Display an error alert if the update fails
              icon: 'error',
              title: 'Error',
              text: 'Error updating employee details. Please try again.',
            });
            console.error('Error updating employee details:', error);
          }
        );
    }
  }
  goBack(): void {
    // Navigate back to the employee details page
    this.router.navigate(['/emp-details']);
  }
}
