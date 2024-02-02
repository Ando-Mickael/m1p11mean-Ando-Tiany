import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupCodeComponent } from './signup-code/signup-code.component';
import { SignupComponent } from './signup/signup.component';
import { HomeClientComponent } from './home-client/home-client.component';
import {LoginComponent} from "./login/login.component";
import {AuthService} from "./services/auth.service";
import {HomeEmployeeComponent} from "./home-employee/home-employee.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeManagerComponent } from './home-manager/home-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SignupCodeComponent,
    HomeClientComponent,
    HomeEmployeeComponent,
    LoginComponent,
    HomeManagerComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, DragDropModule,MatIconModule,],
  providers: [AuthService, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
