import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientHomeComponent } from './client-home.component';
import { ClientServicesComponent } from './client-services.component';
import {PreferencesComponent} from "./preferences.component";
import {UserService} from "../services/user.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [ClientHomeComponent, ClientServicesComponent, PreferencesComponent],
  imports: [CommonModule, FormsModule],
  providers: [UserService]
})
export class ClientModule {}
