import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeClientComponent } from './home-client/home-client.component';
import { HomeComponent } from './home/home.component';
import { SignupCodeComponent } from './signup-code/signup-code.component';
import { SignupComponent } from './signup/signup.component';
import {LoginComponent} from "./login/login.component";
import {HomeEmployeeComponent} from "./home-employee/home-employee.component";
import {HomeManagerComponent} from "./home-manager/home-manager.component";
import {ServiceComponent} from "./service/service.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup-code', component: SignupCodeComponent },
  { path: 'client', component: HomeClientComponent },
  { path: 'employee', component: HomeEmployeeComponent },
  { path: 'manager', component: HomeManagerComponent },
  { path: 'services', component: ServiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
