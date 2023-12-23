// spinner.component.ts
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../spinner.service'; // Import the SpinnerService
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  loading$: Observable<boolean>; // Import Observable
  constructor(private spinnerService: SpinnerService) {
    this.loading$ = this.spinnerService.loading$; // Assign the loading observable
  }

  ngOnInit(): void {
  }
}