import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { EmployeeService } from '../employee.service';
import { OnlineStatusService } from '../online-status.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {

  loggedInEmployeeId: string | null;
  loggedInEmployee: any;
  isOnline: boolean = true;
  @Input() bg: string = '';

  // DI services
  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private onlineStatusService: OnlineStatusService,
    private router: Router
  ) {
    this.loggedInEmployeeId = this.authService.getLoggedInEmployeeId();
  }

  ngOnInit(): void {
    console.log('Employee Dashboard Component initialized.');
    this.loadLoggedInEmployeeDetails();
  }
  // logged employee details 
  loadLoggedInEmployeeDetails(): void {
    if (this.loggedInEmployeeId) {
      this.employeeService
        .getEmployeeDetails(+this.loggedInEmployeeId)
        .subscribe((data) => {
          this.loggedInEmployee = data;
          console.log('Logged-in Employee Details:', this.loggedInEmployee);
        });
    }
  }

  // mark online button
  markOnline(): void {
    console.log('Marking online...');
    this.isOnline = true;
    this.saveOnlineStatus(true);

    Swal.fire({
      icon: 'success',
      title: 'You are online',
      text: 'Welcome back!',
    });
  }

  // mark offline button
  markOffline(): void {
    console.log('Marking offline...');
    this.isOnline = false;
    this.saveOnlineStatus(false);

    Swal.fire({
      icon: 'info',
      title: 'You are offline',
      text: 'See You Again..',
    });
  }

  // save online status 
  private saveOnlineStatus(online: boolean): void {
    if (this.loggedInEmployeeId) {
      this.onlineStatusService
        .updateOnlineStatus(+this.loggedInEmployeeId, online)
        .subscribe(() => {
          console.log('Online status updated successfully.');
          // Reload employee details after updating status
          this.loadLoggedInEmployeeDetails();
        });
    }
  }
  // logout Logic 
  logout(): void {
    console.log('Logging out...');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
