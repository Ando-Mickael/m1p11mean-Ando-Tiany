import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeHomeComponent } from './employee-home.component';
import {EmployeeAppointmentsComponent} from "./employee-appointments.component";
import {AppointmentsService} from "../services/appointments.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";

@NgModule({
  declarations: [EmployeeHomeComponent, EmployeeAppointmentsComponent],
  imports: [CommonModule, ReactiveFormsModule, DragDropModule, MatCard, MatCardHeader, MatCardContent, MatCardSubtitle, MatCardTitle],
  providers: [AppointmentsService],
})
export class EmployeeModule {}
