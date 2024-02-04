import { Component } from '@angular/core';

@Component({
  selector: 'manager-home',
  template: `
    <div>
      <p>
        <a href="manager/employees">Employees</a>
      </p>
      <p>
        <a href="manager/form-employee">Add employee</a>
      </p>
      <p>
        <a href="manager/spendings">Spendings</a>
      </p>
      <p>
        <a href="manager/form-spending">Add spending</a>
      </p>
      <p>
        <a href="manager/services">Services</a>
      </p>
      <p>
        <a href="manager/special-offer">Special offer</a>
      </p>
    </div>
  `,
})
export class ManagerHomeComponent {}
