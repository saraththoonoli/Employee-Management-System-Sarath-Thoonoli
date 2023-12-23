import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../spinner.service'; // Import the SpinnerService
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  // Add loading property
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {}

  login(): void {
    // Show spinner
    this.spinnerService.show();
    this.authService.login(this.username, this.password).subscribe(
      (success) => {
        if (success) {
          if (this.authService.getRole() === 'hr') {
            this.router.navigate(['/hr-dashboard']);
          } else {
            this.router.navigate(['/employee-dashboard']);
          }

          // Display success alert using SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You are now logged in.',
            timer: 3000, // Automatically close after 3 seconds
            showConfirmButton: false,
          });
        } else {
          console.error('Invalid credentials. Authentication failed.');

          // Display error alert using SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid credentials. Please try again.',
          });
        }
      },
      (error) => {
        console.error('Error during login:', error);

        // Display error alert using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred during login. Please try again later.',
        });
      },
      () => {
        // Hide spinner on completion (success or error)
        this.spinnerService.hide(); 
      }
    );
  }
}
