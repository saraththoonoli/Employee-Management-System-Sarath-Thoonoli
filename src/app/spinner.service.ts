import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  // show spinner
  show(): void {
    this.loadingSubject.next(true);
  }
  // hide spinner
  hide(): void {
    this.loadingSubject.next(false);
  }
}
