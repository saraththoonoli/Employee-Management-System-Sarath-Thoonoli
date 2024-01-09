import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss'],
})
// Dependancy Injection
export class HrDashboardComponent {
  constructor(private router: Router, private authService: AuthService) {
    console.log('HR Dashboard Component initialized.');
  }

  // logout 
  logout() {
    console.log('Logging out...');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
