import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupCodeComponent } from './signup-code/signup-code.component';
import { SignupComponent } from './signup/signup.component';
import { HomeClientComponent } from './home-client/home-client.component';
import {LoginComponent} from "./login/login.component";
import {AuthService} from "./services/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SignupCodeComponent,
    HomeClientComponent,
    LoginComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
