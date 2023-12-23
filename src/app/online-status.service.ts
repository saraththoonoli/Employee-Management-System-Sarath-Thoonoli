// online-status.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineStatusService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  updateOnlineStatus(employeeId: number, online: boolean): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.patch(url, { online });
  }
  getOnlineStatus(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.get(url);
  }
  
  
}
