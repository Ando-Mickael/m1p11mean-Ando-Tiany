import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeHomeComponent } from './employee-home.component';
import {AuthGuard} from "../auth.guard";

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeHomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['employee'] },
    children: [
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
