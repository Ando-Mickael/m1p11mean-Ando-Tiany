import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-6 login-container">
          <h2 class="mb-4">Login</h2>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" formControlName="email" class="form-control" required />
              <div *ngIf="loginForm.get('email')?.hasError('email') && loginForm.get('email')?.touched" class="invalid-feedback">
                Adresse Email Invalide
              </div>
            </div>
            <div class="form-group">
              <label for="password">Mot De Passe:</label>
              <input type="password" id="password" formControlName="password" class="form-control" required />
              <div *ngIf="loginForm.get('password')?.hasError('minlength') && loginForm.get('password')?.touched" class="invalid-feedback">
                Mot de passe Obligatoire
              </div>
            </div>
            <div *ngIf="errorMessage" class="mt-3 alert alert-danger">
              {{ errorMessage }}
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">
              Se Connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .error-message {
        color: red;
        margin-top: 10px;
      }

      .login-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh; /* Set to 100% of viewport height */
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
    localStorage.clear();
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
