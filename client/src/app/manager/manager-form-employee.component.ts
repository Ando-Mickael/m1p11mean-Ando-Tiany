import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'manager-form-employee',
  template: `
    <form (ngSubmit)="onSubmit()">
      <h2>Add employee</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        [(ngModel)]="newUser.firstName"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        [(ngModel)]="newUser.lastName"
      />
      <input type="date" name="birthday" [(ngModel)]="newUser.birthday" />
      <input
        type="email"
        name="email"
        placeholder="Email"
        [(ngModel)]="newUser.email"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        [(ngModel)]="newUser.password"
      />

      <button type="submit">Add</button>
    </form>
  `,
})
export class ManagerFormEmployeeComponent {
  newUser: any = {};

  constructor(private router: Router) {}

  onSubmit() {
    fetch('http://localhost:3000/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.newUser),
    }).then(() => {
      this.router.navigate(['/manager/employees']);
    });
  }
}
