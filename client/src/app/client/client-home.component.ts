import { Component } from '@angular/core';

@Component({
  selector: 'client-home',
  template: `
    <div>
      <client-navbar></client-navbar>
      <hero [pageTitle]="'Client'"></hero>
      <router-outlet></router-outlet>
      <big-footer></big-footer>
    </div>
  `,
})
export class ClientHomeComponent {}
