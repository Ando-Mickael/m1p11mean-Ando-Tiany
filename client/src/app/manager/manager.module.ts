import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ManagerEmployeeComponent } from './manager-employee.component';
import { ManagerEmployeesComponent } from './manager-employees.component';
import { ManagerFormEmployeeComponent } from './manager-form-employee.component';
import { ManagerHomeComponent } from './manager-home.component';

@NgModule({
  declarations: [
    ManagerHomeComponent,
    ManagerEmployeesComponent,
    ManagerEmployeeComponent,
    ManagerFormEmployeeComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class ManagerModule {}
