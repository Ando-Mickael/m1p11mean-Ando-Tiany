import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SignupCodeComponent } from './auth/signup/signup-code.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './core/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // auth
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup-code', component: SignupCodeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
