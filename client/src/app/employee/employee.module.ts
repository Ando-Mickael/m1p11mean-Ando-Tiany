import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeHomeComponent } from './employee-home.component';

@NgModule({
  declarations: [EmployeeHomeComponent],
  imports: [CommonModule, ReactiveFormsModule, DragDropModule],
})
export class EmployeeModule {}
