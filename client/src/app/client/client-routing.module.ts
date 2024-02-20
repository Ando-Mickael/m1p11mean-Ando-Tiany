import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientCartComponent } from './client-cart.component';
import { ClientHistoryComponent } from './client-history.component';
import { ClientHomeComponent } from './client-home.component';
import { ClientNotificationsComponent } from './client-notifications.component';
import { ClientPaymentComponent } from './client-payment.component';
import { ClientPreferencesComponent } from './client-preferences.component';
import { ClientServicesComponent } from './client-services.component';
import {AuthGuard} from "../auth.guard";

const routes: Routes = [
  {
    path: 'client',
    component: ClientHomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['client'] },
    children: [
      { path: 'services', component: ClientServicesComponent },
      { path: 'history', component: ClientHistoryComponent },
      { path: 'preferences', component: ClientPreferencesComponent },
      { path: 'notifications', component: ClientNotificationsComponent },
      { path: 'cart', component: ClientCartComponent },
      {
        path: 'payment/:appointmentId',
        component: ClientPaymentComponent,
      },
      { path: '', redirectTo: 'services', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
