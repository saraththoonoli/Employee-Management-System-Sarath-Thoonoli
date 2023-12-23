import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrLeaveService {

  private apiUrl = 'http://localhost:3000/leaveRequests';

  constructor(private http: HttpClient) {}
  getPendingLeaveRequests(): Observable<any[]> {
    const url = `${this.apiUrl}?status=pending`;
    return this.http.get<any[]>(url);
  }

  approveLeave(leaveRequestId: number): Observable<any> {
    const url = `${this.apiUrl}/${leaveRequestId}`;
    return this.http.patch(url, { status: 'approved' });
  }

  rejectLeave(leaveRequestId: number): Observable<any> {
    const url = `${this.apiUrl}/${leaveRequestId}`;
    return this.http.patch(url, { status: 'rejected' });
  }
  getLeaveData(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/leave-data');
  }

  
}
