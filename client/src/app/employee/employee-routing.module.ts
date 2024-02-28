import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { EmployeeHomeComponent } from './employee-home.component';

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
