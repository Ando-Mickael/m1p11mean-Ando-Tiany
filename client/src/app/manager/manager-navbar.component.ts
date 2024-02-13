import { Component } from '@angular/core';

@Component({
  selector: 'manager-navbar',
  template: `
    <ul>
      <li><a href="manager/employees">Employees</a></li>
      <li><a href="manager/form-employee">Add employee</a></li>
      <li><a href="manager/spendings">Spendings</a></li>
      <li><a href="manager/form-spending">Add spending</a></li>
      <li><a href="manager/services">Services</a></li>
      <li><a href="manager/special-offer">Special offer</a></li>
      <li><a href="manager/statistiques">Statistiques</a></li>
      <li><a href="logout">Logout</a></li>
    </ul>
    <hr />
  `,
})
export class ManagerNavbarComponent {}
