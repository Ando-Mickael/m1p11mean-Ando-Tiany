import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerStatistiquesComponent } from './dashboard/manager-statistiques.component';
import { ManagerEmployeeComponent } from './employees/manager-employee.component';
import { ManagerEmployeesComponent } from './employees/manager-employees.component';
import { ManagerHomeComponent } from './manager-home.component';
import { ManagerServiceComponent } from './services/manager-service.component';
import { ManagerSpecialOfferComponent } from './special-offers/manager-special-offer.component';
import { ManagerFormSpendingComponent } from './spendings/manager-form-spending.component';
import { ManagerSpendingsComponent } from './spendings/manager-spendings.component';

const routes: Routes = [
  {
    path: 'manager',
    component: ManagerHomeComponent,
    children: [
      { path: 'manager', component: ManagerHomeComponent },
      { path: 'employees', component: ManagerEmployeesComponent },
      { path: 'employees/:id', component: ManagerEmployeeComponent },
      { path: 'spendings', component: ManagerSpendingsComponent },
      {
        path: 'form-spending',
        component: ManagerFormSpendingComponent,
      },
      {
        path: 'special-offer',
        component: ManagerSpecialOfferComponent,
      },
      { path: 'services', component: ManagerServiceComponent },
      { path: 'statistiques', component: ManagerStatistiquesComponent },
      { path: '', redirectTo: 'statistiques', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
