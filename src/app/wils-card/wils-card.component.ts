import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wils-card',
  templateUrl: './wils-card.component.html',
  styleUrls: ['./wils-card.component.scss']
})
export class WilsCardComponent {
constructor(private router:Router){}
    // Back function
    goBack(): void {
      this.router.navigate(['/login']);
    }
}
