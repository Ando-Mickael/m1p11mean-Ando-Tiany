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
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ClientModule } from './client/client.module';
import { ConfigService } from './config.service';
import { HomeComponent } from './core/home.component';
import { EmployeeModule } from './employee/employee.module';
import { ManagerModule } from './manager/manager.module';
import {HomeNavbarComponent} from "./core/home-navbar.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, HomeNavbarComponent],
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
    AuthModule,
  ],
  providers: [AuthService, provideAnimationsAsync(), ConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {}
