import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-signup-code',
  template: `
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-6">
          <form (ngSubmit)="onSubmit()">
            <h1 class="text-center my-4">Verify your account</h1>
            <div class="form-group">
              <label for="code">Code</label>
              <input
                type="text"
                name="code"
                placeholder="Code"
                [(ngModel)]="code"
                class="form-control"
              />
            </div>

            <button type="button" class="btn btn-link" (click)="resendCode()">
              Resend code ?
            </button>
            <div>
              <button type="submit" class="btn btn-primary w-100 px-4 py-3">
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class SignupCodeComponent {
  code: string = '';
  apiUrl: string;

  constructor(private router: Router, private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

  onSubmit() {
    const verificationCode = localStorage.getItem('code')?.replace(/"/g, '');

    console.log(this.code, verificationCode);

    if (this.code == verificationCode) {
      // insert new user in db
      const newUser = JSON.parse(localStorage.getItem('newUser') as string);

      fetch(`${this.apiUrl}/auth/signup`, {
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

    fetch(`${this.apiUrl}/auth/send-code`, {
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
