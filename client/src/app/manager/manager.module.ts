import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ManagerDailyRevenueComponent } from './manager-daily-revenue.component';
import { ManagerEmployeeComponent } from './manager-employee.component';
import { ManagerEmployeesComponent } from './manager-employees.component';
import { ManagerFormEmployeeComponent } from './manager-form-employee.component';
import { ManagerFormSpendingComponent } from './manager-form-spending.component';
import { ManagerHomeComponent } from './manager-home.component';
import { ManagerMonthlyRevenueComponent } from './manager-monthly-revenue.component';
import { ManagerServiceComponent } from './manager-service.component';
import { ManagerSpecialOfferComponent } from './manager-special-offer.component';
import { ManagerSpendingsComponent } from './manager-spendings.component';
import { ManagerStatistiquesComponent } from './manager-statistiques.component';
import { TotalMonthlyAppointments } from './manager-total-monthly-appointments.component';

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
    ManagerStatistiquesComponent,
    ManagerDailyRevenueComponent,
    ManagerMonthlyRevenueComponent,
    TotalMonthlyAppointments,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgChartsModule],
})
export class ManagerModule {}
