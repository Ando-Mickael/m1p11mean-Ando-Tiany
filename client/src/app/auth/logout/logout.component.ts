import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: ` <div></div> `,
})
export class LogoutComponent {
  constructor(private router: Router) {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
