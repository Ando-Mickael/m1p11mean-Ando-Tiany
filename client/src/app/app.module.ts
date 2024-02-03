import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupCodeComponent } from './auth/signup/signup-code.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ClientModule } from './client/client.module';
import { HomeComponent } from './core/home.component';
import { EmployeeModule } from './employee/employee.module';
import { ServiceComponent } from './manager/manager-service.component';
import { ManagerSpecialOfferComponent } from './manager/manager-special-offer.component';
import { ManagerModule } from './manager/manager.module';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SignupCodeComponent,
    LoginComponent,
    ManagerSpecialOfferComponent,
    ServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    MatIconModule,
    ManagerModule,
    EmployeeModule,
    ClientModule,
  ],
  providers: [AuthService, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
