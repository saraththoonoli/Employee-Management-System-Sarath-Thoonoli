import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrLeaveService {
  // The base URL for the Leave Requests API
  private apiUrl = 'http://localhost:3000/leaveRequests';

  // Method to get pending leave requests
  constructor(private http: HttpClient) {}
  getPendingLeaveRequests(): Observable<any[]> {
    const url = `${this.apiUrl}?status=pending`;
    return this.http.get<any[]>(url);
  }
  // Method to approve leave
  approveLeave(leaveRequestId: number): Observable<any> {
    const url = `${this.apiUrl}/${leaveRequestId}`;
    return this.http.patch(url, { status: 'approved' });
  }
  // Method to reject leave
  rejectLeave(leaveRequestId: number): Observable<any> {
    const url = `${this.apiUrl}/${leaveRequestId}`;
    return this.http.patch(url, { status: 'rejected' });
  }
  
}
