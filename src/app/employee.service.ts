import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // The base URL for the employee service API
  private apiUrl = 'http://localhost:3000/employees';

  // initialized to null, indicating that no employee is logged in initially.
  private loggedInEmployeeId: number | null = null;

  // when the employee list needs to be refreshed.
  private refreshListSubject = new Subject<void>();

  // Constructor with dependency injection
  constructor(private http: HttpClient) { }
  
  // Method to get all employees
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Method to get details of a specific employee
  getEmployeeDetails(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.get<any>(url);
  }
  // Method to add a new employee
  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.apiUrl, employee);
  }
  // Method to update an existing employee
  updateEmployee(employeeId: number, employee: any): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.put(url, employee);
  }
  // Method to delete an employee
  deleteEmployee(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.delete(url);
  }
  // Method to  refresh the employee list
  notifyRefreshList(): void {
    this.refreshListSubject.next();
  }
}
