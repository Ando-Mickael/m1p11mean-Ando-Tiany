import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../core/footer.component';
import { HeroComponent } from '../core/hero.component';
import { ServiceComponent } from '../core/service.component';
import { RelativeTimePipe } from '../pipes/relative-time.pipe';
import { UserService } from '../services/user.service';
import { ClientCartComponent } from './client-cart.component';
import { ClientHistoryComponent } from './client-history.component';
import { ClientHomeComponent } from './client-home.component';
import { ClientNavbarComponent } from './client-navbar.component';
import { ClientNotificationsComponent } from './client-notifications.component';
import { ClientPaymentComponent } from './client-payment.component';
import { ClientPreferencesComponent } from './client-preferences.component';
import { ClientRoutingModule } from './client-routing.module';
import { ClientServicesComponent } from './client-services.component';

@NgModule({
  declarations: [
    ClientHomeComponent,
    ClientServicesComponent,
    ClientPreferencesComponent,
    ClientHistoryComponent,
    ClientPaymentComponent,
    ClientNotificationsComponent,
    RelativeTimePipe,
    ClientNavbarComponent,
    HeroComponent,
    FooterComponent,
    ClientCartComponent,
    ServiceComponent,
  ],
  imports: [CommonModule, FormsModule, ClientRoutingModule],
  providers: [UserService],
})
export class ClientModule {}
