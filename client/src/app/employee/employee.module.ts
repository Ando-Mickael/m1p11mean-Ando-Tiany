import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { AppointmentsService } from '../services/appointments.service';
import { EmployeeAppointmentsComponent } from './employee-appointments.component';
import { EmployeeHomeComponent } from './employee-home.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import {EmployeeNavbarComponent} from "./employee-navbar.component";

@NgModule({
  declarations: [EmployeeHomeComponent, EmployeeAppointmentsComponent, EmployeeNavbarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    FormsModule,
    EmployeeRoutingModule,
  ],
  providers: [AppointmentsService],
})
export class EmployeeModule {}
