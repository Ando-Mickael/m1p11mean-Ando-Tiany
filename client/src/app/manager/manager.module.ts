import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagerEmployeeComponent } from './manager-employee.component';
import { ManagerEmployeesComponent } from './manager-employees.component';
import { ManagerFormEmployeeComponent } from './manager-form-employee.component';
import { ManagerFormSpendingComponent } from './manager-form-spending.component';
import { ManagerHomeComponent } from './manager-home.component';
import { ManagerServiceComponent } from './manager-service.component';
import { ManagerSpecialOfferComponent } from './manager-special-offer.component';
import { ManagerSpendingsComponent } from './manager-spendings.component';

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
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ManagerModule {}
