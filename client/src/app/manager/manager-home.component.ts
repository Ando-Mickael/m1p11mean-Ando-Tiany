import { Component } from '@angular/core';

@Component({
  selector: 'manager-home',
  template: `
    <div>
      <manager-navbar></manager-navbar>
      <div class="top"></div>
      <router-outlet></router-outlet>
    </div>
    <big-footer></big-footer>
  `,
  styles: [
    `
    .top {
      margin-top: 100px;
    }
    `
  ]
})
export class ManagerHomeComponent {}
