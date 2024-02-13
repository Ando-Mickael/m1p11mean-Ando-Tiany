import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupCodeComponent } from './signup/signup-code.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupCodeComponent,
    LogoutComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class AuthModule {}
