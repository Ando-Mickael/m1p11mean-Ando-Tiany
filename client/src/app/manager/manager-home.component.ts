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
    </div>
  `,
})
export class ManagerHomeComponent {}
