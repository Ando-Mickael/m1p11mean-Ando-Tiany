import { Component } from '@angular/core';

@Component({
  selector: 'client-home',
  template: `
    <ul>
      <li><a href="/client/services">Services</a></li>
      <li><a href="/client/history">History</a></li>
    </ul>

    <client-notifications></client-notifications>

    <client-preferences></client-preferences>
  `,
})
export class ClientHomeComponent {}
