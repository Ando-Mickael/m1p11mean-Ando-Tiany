import { Component } from '@angular/core';

@Component({
  selector: 'manager-home',
  template: `
    <div>
      <manager-navbar></manager-navbar>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class ManagerHomeComponent {}
