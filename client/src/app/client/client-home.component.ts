import { Component } from '@angular/core';

@Component({
  selector: 'client-home',
  template: `
    <div>
      <client-navbar></client-navbar>

      <client-notifications></client-notifications>

      <client-preferences></client-preferences>

      <router-outlet></router-outlet>
    </div>
  `,
})
export class ClientHomeComponent {}
