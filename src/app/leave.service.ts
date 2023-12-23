// leave.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private apiUrl = 'http://localhost:3000/leaveRequests';

  constructor(private http: HttpClient) {}

  applyLeave(employeeId: number, leaveDetails: any): Observable<any> {
    const url = `${this.apiUrl}`;
    const leaveRequest = { employeeId, ...leaveDetails, status: 'pending' };
    return this.http.post(url, leaveRequest);
  }

  getEmployeeLeaveRequests(employeeId: number): Observable<any[]> {
    const url = `${this.apiUrl}?employeeId=${employeeId}`;
    return this.http.get<any[]>(url);
  }

  getLeaveCounts(): Observable<any[]> {
    const url = `${this.apiUrl}/leave-counts`;
    return this.http.get<any[]>(url);
  }
  getEmployeeDetails(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/employees/${employeeId}`;
    return this.http.get<any>(url);
  }
  updateEmployeeStatus(employeeId: number, status: { online: boolean }): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.patch(url, status);
  }
  updateEmployee(employeeId: number, employee: any): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.patch(url, employee);
  }
  
// for leave bar chart
  getEmployeeLeaveCount(employeeId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/employees/${employeeId}/leave-count`);
  }
}