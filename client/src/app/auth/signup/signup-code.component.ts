import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-code',
  template: `
    <form (ngSubmit)="onSubmit()">
      <input type="text" name="code" placeholder="Code" [(ngModel)]="code" />
      <button type="button" (click)="resendCode()">Resend code</button>
      <button type="submit">Verify</button>
    </form>
  `,
})
export class SignupCodeComponent {
  code: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    const verificationCode = localStorage.getItem('code')?.replace(/"/g, '');

    console.log(this.code, verificationCode);

    if (this.code == verificationCode) {
      // insert new user in db
      const newUser = JSON.parse(localStorage.getItem('newUser') as string);

      fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('user', JSON.stringify(data));

          // redirect to client home
          this.router.navigate(['/client']);
        });
    } else {
      alert('Wrong code');
    }
  }

  resendCode() {
    const newUser = localStorage.getItem('newUser');
    console.log(newUser);

    fetch('http://localhost:3000/auth/send-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: newUser,
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('code', JSON.stringify(data.code));
      });
  }
}
