import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RelativeTimePipe } from '../pipes/relative-time.pipe';
import { UserService } from '../services/user.service';
import { ClientHistoryComponent } from './client-history.component';
import { ClientHomeComponent } from './client-home.component';
import { ClientNotificationsComponent } from './client-notifications.component';
import { ClientPaymentComponent } from './client-payment.component';
import { ClientServicesComponent } from './client-services.component';
import { PreferencesComponent } from './preferences.component';

@NgModule({
  declarations: [
    ClientHomeComponent,
    ClientServicesComponent,
    PreferencesComponent,
    ClientHistoryComponent,
    ClientPaymentComponent,
    ClientNotificationsComponent,
    RelativeTimePipe,
  ],
  imports: [CommonModule, FormsModule],
  providers: [UserService],
})
export class ClientModule {}
