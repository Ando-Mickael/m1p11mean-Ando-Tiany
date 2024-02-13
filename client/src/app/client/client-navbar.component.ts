import { Component } from '@angular/core';

@Component({
  selector: 'client-navbar',
  template: `
    <div>
      <ul>
        <li><a href="/client/services">Services</a></li>
        <li><a href="/client/history">History</a></li>
      </ul>
      <hr />
    </div>
  `,
})
export class ClientNavbarComponent {}
