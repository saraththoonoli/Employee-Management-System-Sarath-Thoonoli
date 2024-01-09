import { Component } from '@angular/core';
import { HrLeaveService } from '../hr-leave.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hr-leave',
  templateUrl: './hr-leave.component.html',
  styleUrls: ['./hr-leave.component.scss'],
})
export class HrLeaveComponent {
  pendingLeaveRequests: any[] = [];
  // Dependancy injuction
  constructor(private hrLeaveService: HrLeaveService) {
    console.log('HR Leave Component initialized.');
    // Fetch pending leave requests when the component is initialized
    this.fetchPendingLeaveRequests();
  }
  // Methord for fetch pending leave req
  fetchPendingLeaveRequests(): void {
    console.log('Fetching pending leave requests...');
    this.hrLeaveService.getPendingLeaveRequests().subscribe((requests) => {
      this.pendingLeaveRequests = requests;
      console.log('Pending leave requests:', this.pendingLeaveRequests);
    });
  }
  // methord for aproove leave 
  approveLeave(leaveRequestId: number): void {
    console.log('Approving leave request with ID:', leaveRequestId);
    this.hrLeaveService.approveLeave(leaveRequestId).subscribe(() => {
      // After approving leave, fetch updated pending leave requests
      this.fetchPendingLeaveRequests();
      // Show success alert
      this.showSuccessAlert('Leave request approved successfully.');
    });
  }
  // methord for reject leave 
  rejectLeave(leaveRequestId: number): void {
    console.log('Rejecting leave request with ID:', leaveRequestId);
    this.hrLeaveService.rejectLeave(leaveRequestId).subscribe(() => {
      // After rejecting leave, fetch updated pending leave requests
      this.fetchPendingLeaveRequests();
      this.showErrorAlert('Leave request rejected.');
    });
  }

  // Show success alert
  private showSuccessAlert(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }

  // Display an error alert if rejection fails
  private showErrorAlert(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Rejected!',
      text: message,
    });
  }
}
