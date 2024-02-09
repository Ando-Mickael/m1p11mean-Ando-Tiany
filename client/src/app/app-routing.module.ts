import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupCodeComponent } from './auth/signup/signup-code.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ClientHistoryComponent } from './client/client-history.component';
import { ClientHomeComponent } from './client/client-home.component';
import { ClientPaymentComponent } from './client/client-payment.component';
import { ClientServicesComponent } from './client/client-services.component';
import { HomeComponent } from './core/home.component';
import { EmployeeHomeComponent } from './employee/employee-home.component';
import { ManagerStatistiquesComponent } from './manager/dashboard/manager-statistiques.component';
import { ManagerEmployeeComponent } from './manager/employees/manager-employee.component';
import { ManagerEmployeesComponent } from './manager/employees/manager-employees.component';
import { ManagerHomeComponent } from './manager/manager-home.component';
import { ManagerServiceComponent } from './manager/services/manager-service.component';
import { ManagerSpecialOfferComponent } from './manager/special-offers/manager-special-offer.component';
import { ManagerFormSpendingComponent } from './manager/spendings/manager-form-spending.component';
import { ManagerSpendingsComponent } from './manager/spendings/manager-spendings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // auth
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup-code', component: SignupCodeComponent },
  // client
  { path: 'client', component: ClientHomeComponent },
  { path: 'client/services', component: ClientServicesComponent },
  { path: 'client/history', component: ClientHistoryComponent },
  { path: 'client/payment/:appointmentId', component: ClientPaymentComponent },
  // manager
  { path: 'manager', component: ManagerHomeComponent },
  { path: 'manager/employees', component: ManagerEmployeesComponent },
  { path: 'manager/employees/:id', component: ManagerEmployeeComponent },
  { path: 'manager/spendings', component: ManagerSpendingsComponent },
  { path: 'manager/form-spending', component: ManagerFormSpendingComponent },
  { path: 'manager/special-offer', component: ManagerSpecialOfferComponent },
  { path: 'manager/services', component: ManagerServiceComponent },
  { path: 'manager/statistiques', component: ManagerStatistiquesComponent },
  // employee
  { path: 'employee', component: EmployeeHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
