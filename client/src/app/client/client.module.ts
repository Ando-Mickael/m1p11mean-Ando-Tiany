import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RelativeTimePipe } from '../pipes/relative-time.pipe';
import { UserService } from '../services/user.service';
import { ClientHistoryComponent } from './client-history.component';
import { ClientHomeComponent } from './client-home.component';
import { ClientNavbarComponent } from './client-navbar.component';
import { ClientNotificationsComponent } from './client-notifications.component';
import { ClientPaymentComponent } from './client-payment.component';
import { ClientRoutingModule } from './client-routing.module';
import { ClientServicesComponent } from './client-services.component';
import { PreferencesComponent } from './preferences.component';
import {HeroComponent} from "../core/hero.component";

@NgModule({
  declarations: [
    ClientHomeComponent,
    ClientServicesComponent,
    PreferencesComponent,
    ClientHistoryComponent,
    ClientPaymentComponent,
    ClientNotificationsComponent,
    RelativeTimePipe,
    ClientNavbarComponent,
    HeroComponent
  ],
  imports: [CommonModule, FormsModule, ClientRoutingModule],
  providers: [UserService],
})
export class ClientModule {}
