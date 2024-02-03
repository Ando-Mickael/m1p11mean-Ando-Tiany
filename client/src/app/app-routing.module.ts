import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeClientComponent } from './home-client/home-client.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagerEmployeeComponent } from './manager/manager-employee.component';
import { ManagerEmployeesComponent } from './manager/manager-employees.component';
import { ManagerFormEmployeeComponent } from './manager/manager-form-employee.component';
import { ManagerHomeComponent } from './manager/manager-home.component';
import { SignupCodeComponent } from './signup-code/signup-code.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup-code', component: SignupCodeComponent },
  { path: 'client', component: HomeClientComponent },
  { path: 'manager', component: ManagerHomeComponent },
  { path: 'manager/employees', component: ManagerEmployeesComponent },
  { path: 'manager/employees/:id', component: ManagerEmployeeComponent },
  { path: 'manager/form-employee', component: ManagerFormEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
