import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ManagerDailyRevenueComponent } from './dashboard/manager-daily-revenue.component';
import { ManagerMonthlyRevenueComponent } from './dashboard/manager-monthly-revenue.component';
import { ManagerStatistiquesComponent } from './dashboard/manager-statistiques.component';
import { TotalMonthlyAppointments } from './dashboard/manager-total-monthly-appointments.component';
import { ManagerEmployeeComponent } from './employees/manager-employee.component';
import { ManagerEmployeesComponent } from './employees/manager-employees.component';
import { ManagerFormEmployeeComponent } from './employees/manager-form-employee.component';
import { ManagerHomeComponent } from './manager-home.component';
import { ManagerServiceComponent } from './services/manager-service.component';
import { ManagerSpecialOfferComponent } from './special-offers/manager-special-offer.component';
import { ManagerFormSpendingComponent } from './spendings/manager-form-spending.component';
import { ManagerSpendingsComponent } from './spendings/manager-spendings.component';

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
