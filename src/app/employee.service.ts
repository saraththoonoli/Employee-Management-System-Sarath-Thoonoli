// employee.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private apiUrl = 'http://localhost:3000/employees';
  private loggedInEmployeeId: number | null = null;
  private refreshListSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEmployeeDetails(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.get<any>(url);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.apiUrl, employee);
  }

  updateEmployee(employeeId: number, employee: any): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.put(url, employee);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.delete(url);
  }

  notifyRefreshList(): void {
    this.refreshListSubject.next();
  }

  onRefreshList(): Observable<void> {
    return this.refreshListSubject.asObservable();
  }

  getEmployeeDetailsByEmail(email: string): Observable<any> {
    const url = `${this.apiUrl}?email=${email}`;
    return this.http.get<any[]>(url);
  }

  setLoggedInEmployeeId(employeeId: number | null): void {
    this.loggedInEmployeeId = employeeId;
  }

  getLoggedInEmployeeId(): number | null {
    return this.loggedInEmployeeId;
  }

  

  
}
