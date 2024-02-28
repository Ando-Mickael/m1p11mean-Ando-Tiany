import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ManagerDailyAppointmentsByMonthAndYear } from './dashboard/manager-daily-appointments-by-month-and-year.component';
import { ManagerDailyCaComponent } from './dashboard/manager-daily-ca.component';
import { ManagerDailyRevenueComponent } from './dashboard/manager-daily-revenue.component';
import { ManagerMonthlyAppointmentsByYear } from './dashboard/manager-monthly-appointments-by-year.component';
import { ManagerMonthlyCaComponent } from './dashboard/manager-monthly-ca.component';
import { ManagerMonthlyRevenueComponent } from './dashboard/manager-monthly-revenue.component';
import { ManagerStatistiquesComponent } from './dashboard/manager-statistiques.component';
import { ManagerEmployeeComponent } from './employees/manager-employee.component';
import { ManagerEmployeesComponent } from './employees/manager-employees.component';
import { ManagerFormEmployeeComponent } from './employees/manager-form-employee.component';
import { FooterComponent } from './footer.component';
import { ManagerHomeComponent } from './manager-home.component';
import { ManagerNavbarComponent } from './manager-navbar.component';
import { ManagerRoutingModule } from './manager-routing.module';
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
    ManagerDailyAppointmentsByMonthAndYear,
    ManagerMonthlyCaComponent,
    ManagerDailyCaComponent,
    ManagerNavbarComponent,
    FooterComponent,
    ManagerMonthlyAppointmentsByYear,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    ManagerRoutingModule,
  ],
})
export class ManagerModule {}
