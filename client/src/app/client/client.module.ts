import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientHomeComponent } from './client-home.component';
import { ClientServicesComponent } from './client-services.component';

@NgModule({
  declarations: [ClientHomeComponent, ClientServicesComponent],
  imports: [CommonModule, FormsModule],
})
export class ClientModule {}
