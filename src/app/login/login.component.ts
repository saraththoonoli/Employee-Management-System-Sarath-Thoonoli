import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../spinner.service'; // Import the SpinnerService
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // login Properties
  username: string = '';
  password: string = '';
  // spinner property
  loading: boolean = false;
  // Reactive form
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService,
    private fb: FormBuilder
  ) {
     // Initialize the form in the constructor
     this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
// Life cycle hook
  ngOnInit(): void {}

// Login Method
  login(): void {

    // Show spinner
    this.spinnerService.show();
    // Call the login method of the AuthService
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

        // Display error alert 
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred during login. Please try again later.',
        });
      },
      () => {
        // Hide spinner on completion 
        this.spinnerService.hide(); 
      }
    );
  }
}
