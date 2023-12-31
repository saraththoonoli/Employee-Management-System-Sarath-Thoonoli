import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.scss'],
})
export class EmpDetailsComponent implements OnInit {
  loggedInEmployeeId: string | null;
  loggedInEmployee: any;
// dependancy injecrion
  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.loggedInEmployeeId = this.authService.getLoggedInEmployeeId();
  }

  ngOnInit(): void {
    this.loadLoggedInEmployeeDetails();
  }

  // load emp details 
  loadLoggedInEmployeeDetails(): void {
    if (this.loggedInEmployeeId) {
      this.employeeService
        .getEmployeeDetails(+this.loggedInEmployeeId)
        .subscribe((data) => {
          this.loggedInEmployee = data;
          console.log('Logged In Employee Details:', this.loggedInEmployee);
        });
    }
  }

  // Navigate back to the previous page
  goBack(): void {
    console.log('Navigating back to employee dashboard');
    this.router.navigate(['/employee-dashboard']);
  }
}
