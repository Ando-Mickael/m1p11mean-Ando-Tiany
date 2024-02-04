import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupCodeComponent } from './auth/signup/signup-code.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ClientHomeComponent } from './client/client-home.component';
import { ClientServicesComponent } from './client/client-home.component copy';
import { HomeComponent } from './core/home.component';
import { EmployeeHomeComponent } from './employee/employee-home.component';
import { ManagerEmployeeComponent } from './manager/manager-employee.component';
import { ManagerEmployeesComponent } from './manager/manager-employees.component';
import { ManagerFormSpendingComponent } from './manager/manager-form-spending.component';
import { ManagerHomeComponent } from './manager/manager-home.component';
import { ServiceComponent } from './manager/manager-service.component';
import { ManagerSpecialOfferComponent } from './manager/manager-special-offer.component';
import { ManagerSpendingsComponent } from './manager/manager-spendings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // auth
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup-code', component: SignupCodeComponent },
  // client
  { path: 'client', component: ClientHomeComponent },
  { path: 'client/services', component: ClientServicesComponent },
  // manager
  { path: 'manager', component: ManagerHomeComponent },
  { path: 'manager/employees', component: ManagerEmployeesComponent },
  { path: 'manager/employees/:id', component: ManagerEmployeeComponent },
  { path: 'manager/spendings', component: ManagerSpendingsComponent },
  { path: 'manager/form-spending', component: ManagerFormSpendingComponent },
  { path: 'manager/special-offer', component: ManagerSpecialOfferComponent },
  { path: 'manager/services', component: ServiceComponent },
  // employee
  { path: 'employee', component: EmployeeHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
