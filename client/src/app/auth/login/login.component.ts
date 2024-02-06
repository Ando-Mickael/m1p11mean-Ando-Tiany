import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" formControlName="email" required />
          <div
            *ngIf="
              loginForm.get('email')?.hasError('email') &&
              loginForm.get('email')?.touched
            "
          >
            Adresse Email Invalide
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            formControlName="password"
            required
          />
          <div
            *ngIf="
              loginForm.get('password')?.hasError('minlength') &&
              loginForm.get('password')?.touched
            "
          >
            Mot de passe Obligatoire
          </div>
        </div>
        <button type="submit" [disabled]="loginForm.invalid">
          Se Connecter
        </button>
        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .error-message {
        color: red;
        margin-top: 10px;
      }
    `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
          this.router.navigate([`/${response.role}`]);
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
    }
  }
}
