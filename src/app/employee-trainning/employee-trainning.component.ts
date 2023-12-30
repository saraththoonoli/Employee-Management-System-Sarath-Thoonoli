import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-trainning',
  templateUrl: './employee-trainning.component.html',
  styleUrls: ['./employee-trainning.component.scss']
})
export class EmployeeTrainningComponent {

constructor(private router:Router){}

  goBack(): void {
    console.log('Navigating back to employee dashboard');
    this.router.navigate(['/employee-dashboard']);
  }
}
