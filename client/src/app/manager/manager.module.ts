import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagerEmployeeComponent } from './manager-employee.component';
import { ManagerEmployeesComponent } from './manager-employees.component';
import { ManagerFormEmployeeComponent } from './manager-form-employee.component';
import { ManagerFormSpendingComponent } from './manager-form-spending.component';
import { ManagerHomeComponent } from './manager-home.component';
import { ManagerServiceComponent } from './manager-service.component';
import { ManagerSpecialOfferComponent } from './manager-special-offer.component';
import { ManagerSpendingsComponent } from './manager-spendings.component';
import {ManagerStatistiquesComponent} from "./manager-statistiques.component";

@NgModule({
  declarations: [
    ManagerHomeComponent,
    ManagerEmployeesComponent,
    ManagerEmployeeComponent,
    ManagerFormEmployeeComponent,
    ManagerSpendingsComponent,
    ManagerFormSpendingComponent,
    ManagerSpecialOfferComponent,
    ManagerServiceComponent,
    ManagerStatistiquesComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgChartsModule],
})
export class ManagerModule {}
