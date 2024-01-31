import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeClientComponent } from './home-client/home-client.component';
import { HomeComponent } from './home/home.component';
import { SignupCodeComponent } from './signup-code/signup-code.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup-code', component: SignupCodeComponent },
  { path: 'client', component: HomeClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
