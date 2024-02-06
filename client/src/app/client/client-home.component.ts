import { Component } from '@angular/core';

@Component({
  selector: 'client-home',
  template: `
    <ul>
      <li><a href="/client/services">Services</a></li>
    </ul>
    <client-preferences></client-preferences>
  `,
})
export class ClientHomeComponent {}
