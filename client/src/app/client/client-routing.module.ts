import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHistoryComponent } from './client-history.component';
import { ClientHomeComponent } from './client-home.component';
import { ClientPaymentComponent } from './client-payment.component';
import { ClientServicesComponent } from './client-services.component';

const routes: Routes = [
  {
    path: 'client',
    component: ClientHomeComponent,
    children: [
      { path: 'services', component: ClientServicesComponent },
      { path: 'history', component: ClientHistoryComponent },
      {
        path: 'payment/:appointmentId',
        component: ClientPaymentComponent,
      },
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
