import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  // To track the loading state with an initial value of false
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Subscribe to changes in the loading state
  loading$ = this.loadingSubject.asObservable();

  // Method to show the spinner
  show(): void {
    // Set the loading state to true
    this.loadingSubject.next(true);
  }

  // Method to hide the spinner
  hide(): void {
    // Set the loading state to false
    this.loadingSubject.next(false);
  }
}
