import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
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
