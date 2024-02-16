import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-signup',
  template: `
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-6">
          <form (ngSubmit)="onSubmit()">
            <h1 class="text-center my-4">Sign Up</h1>
            <div class="form-group">
              <label for="firstName">First name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                [(ngModel)]="signupData.firstName"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="lastName">Last name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                [(ngModel)]="signupData.lastName"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                [(ngModel)]="signupData.email"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                [(ngModel)]="signupData.password"
                class="form-control"
              />
            </div>

            <div>
              <button type="submit" class="btn btn-primary w-100 px-4 py-3">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class SignupComponent {
  signupData: any = {
    firstName: 'Ando',
    lastName: 'Mickael',
    password: 'ando',
  };

  apiUrl: string;

  constructor(private router: Router, private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

  onSubmit() {
    // save user for signup
    localStorage.setItem('newUser', JSON.stringify(this.signupData));

    // send verification code
    fetch(`${this.apiUrl}/auth/send-code`, {
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
