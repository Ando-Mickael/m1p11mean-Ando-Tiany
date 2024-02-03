import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ManagerEmployeeComponent } from './manager-employee.component';
import { ManagerEmployeesComponent } from './manager-employees.component';
import { ManagerFormEmployeeComponent } from './manager-form-employee.component';
import { ManagerFormSpendingComponent } from './manager-form-spending.component';
import { ManagerHomeComponent } from './manager-home.component';
import { ManagerSpendingsComponent } from './manager-spendings.component';

@NgModule({
  declarations: [
    ManagerHomeComponent,
    ManagerEmployeesComponent,
    ManagerEmployeeComponent,
    ManagerFormEmployeeComponent,
    ManagerSpendingsComponent,
    ManagerFormSpendingComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class ManagerModule {}
