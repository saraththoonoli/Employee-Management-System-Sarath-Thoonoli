
import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../leave.service';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss'],
})
export class LeaveRequestComponent implements OnInit {
  leaveForm: FormGroup;
  employeeId: any; // This will be set based on the logged-in employee
  leaveRequests: any[] = [];

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.leaveForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required],
      leaveType: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const loggedInEmployeeId = this.authService.getLoggedInEmployeeId();
    if (loggedInEmployeeId !== null) {
      this.employeeId = loggedInEmployeeId;
      this.loadLeaveRequests();
    } else {
      console.error('Unable to retrieve logged-in employee ID');
    }
  }

  applyLeave() {
    if (this.leaveForm.valid) {
      const leaveDetails = this.leaveForm.value;
      this.leaveService.applyLeave(this.employeeId, leaveDetails).subscribe(
        () => {
          this.loadLeaveRequests();
          this.leaveForm.reset();

          // Display success message
          Swal.fire({
            icon: 'success',
            title: 'Leave Applied!',
            text: 'Your leave request has been submitted successfully.',
          });
        },
        (error) => {
          console.error('Error applying leave:', error);

          // Display error message
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred while applying leave. Please try again.',
          });
        }
      );
    }
  }

  loadLeaveRequests(leaveRequestId?: number) {
    this.leaveService.getEmployeeLeaveRequests(this.employeeId).subscribe(
      (leaveRequests) => {
        if (leaveRequestId !== undefined) {
          // Find the leave request with the  ID
          const selectedRequest = leaveRequests.find(
            (request) => request.id === leaveRequestId
          );

          // Display feedback status only for the selected leave request
          this.leaveRequests = selectedRequest ? [selectedRequest] : [];
        } else {
          // Display all leave requests
          this.leaveRequests = leaveRequests;
        }
      },
      (error) => {
        console.error('Error fetching leave requests:', error);
        // Handle error 
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/employee-dashboard']);
  }

  isStatusAvailable(leaveRequest: any): boolean {
    return (
      leaveRequest.status === 'approved' || leaveRequest.status === 'rejected'
    );
  }
}
