import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/employees';
  // hr password and user name
  private hrCredentials = { username: 'hr', password: 'hrpassword' };
  // for emplyee verification
  private employeeCredentials: any[] = [];
  // get loggedin employee id
  private loggedInEmployeeId: number | null = null;
  // DI for http
  constructor(private http: HttpClient) {
    // Fetch employee credentials from the server (db.json)
    this.http
      .get<any[]>(this.apiUrl)
      .subscribe((employees) => {
        this.employeeCredentials = employees.map((employee) => ({
          id: employee.id,
          username: employee.username,
          password: employee.password,
        }));
      });
  }
  // login
  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((employees) => {
        // check HR credentials
        if (
          username === this.hrCredentials.username &&
          password === this.hrCredentials.password
        ) {
          localStorage.setItem('role', 'hr');
          return true;
        }

        //check  employee credentials
        const employee = employees.find(
          (emp) => emp.username === username && emp.password === password
        );

        if (employee) {
          localStorage.setItem('role', 'employee');
          localStorage.setItem('employeeId', employee.id.toString());
          return true;
        }

        console.log('Authentication failed. Returning false.');
        return false;
      })
    );
  }
  // logout
  logout(): void {
    localStorage.removeItem('role');
    localStorage.removeItem('employeeId');
  }
  // get role hr or employee
  getRole(): string | null {
    return localStorage.getItem('role');
  }
  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.getRole() !== null;
  }

  // get loged employee id
  getLoggedInEmployeeId(): string | null {
    return localStorage.getItem('employeeId');
  }

}
