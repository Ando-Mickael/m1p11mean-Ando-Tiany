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
import { SignupCodeComponent } from './auth/signup/signup-code.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { HomeEmployeeComponent } from './home-employee/home-employee.component';
import { HomeManagerComponent } from './home-manager/home-manager.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { ManagerModule } from './manager/manager.module';
import { ServiceComponent } from './service/service.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SignupCodeComponent,
    HomeClientComponent,
    HomeEmployeeComponent,
    LoginComponent,
    HomeManagerComponent,
    ServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ManagerModule,
    DragDropModule,
    MatIconModule,
  ],
  providers: [AuthService, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
