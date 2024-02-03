import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientHomeComponent } from './client-home.component';
import { ClientServicesComponent } from './client-services.component';

@NgModule({
  declarations: [ClientHomeComponent, ClientServicesComponent],
  imports: [CommonModule],
})
export class ClientModule {}
