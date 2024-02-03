import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupCodeComponent } from './auth/signup/signup-code.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { HomeEmployeeComponent } from './home-employee/home-employee.component';
import { HomeManagerComponent } from './home-manager/home-manager.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { ManagerEmployeeComponent } from './manager/manager-employee.component';
import { ManagerEmployeesComponent } from './manager/manager-employees.component';
import { ManagerFormEmployeeComponent } from './manager/manager-form-employee.component';
import { ManagerHomeComponent } from './manager/manager-home.component';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup-code', component: SignupCodeComponent },
  { path: 'client', component: HomeClientComponent },
  { path: 'managers', component: ManagerHomeComponent },
  { path: 'manager/employees', component: ManagerEmployeesComponent },
  { path: 'manager/employees/:id', component: ManagerEmployeeComponent },
  { path: 'manager/form-employee', component: ManagerFormEmployeeComponent },
  { path: 'employee', component: HomeEmployeeComponent },
  { path: 'manager', component: HomeManagerComponent },
  { path: 'services', component: ServiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
