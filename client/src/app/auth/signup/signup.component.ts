import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  template: `
    <form (ngSubmit)="onSubmit()">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        [(ngModel)]="signupData.firstName"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        [(ngModel)]="signupData.lastName"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        [(ngModel)]="signupData.email"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        [(ngModel)]="signupData.password"
      />

      <button type="submit">Signup</button>
    </form>
  `,
})
export class SignupComponent {
  signupData: any = {
    firstName: 'Ando',
    lastName: 'Mickael',
    password: 'ando',
  };

  constructor(private router: Router) {}

  onSubmit() {
    // save user for signup
    localStorage.setItem('newUser', JSON.stringify(this.signupData));

    // send verification code
    fetch('http://localhost:3000/auth/send-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.signupData),
    })
      .then((response) => response.json())
      .then((data) => {
        // make it into global state
        localStorage.setItem('code', JSON.stringify(data.code));

        // redirect to signup-code
        this.router.navigate(['/signup-code']);
      });
  }
}
