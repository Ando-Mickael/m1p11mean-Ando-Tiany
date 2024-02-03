// employee-appointments.component.ts
import { Component, OnInit } from '@angular/core';
import {AppointmentsService} from "../services/appointments.service";

@Component({
  selector: 'employee-appointments',
  template: `
    <div>
      <h3>Mes Rendez-vous</h3>
      <div class="appointments-container">
        <mat-card *ngFor="let appointment of appointments" class="appointment-card">
          <mat-card-header>
            <mat-card-title>{{ appointment.serviceId.name }}</mat-card-title>
            <mat-card-subtitle>{{ appointment.userId.firstName }} {{ appointment.userId.lastName }}</mat-card-subtitle>
            <mat-card-subtitle>{{ appointment.date | date: 'medium' }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Status: {{ appointment.status }}</p>
            <p>Prix: {{ appointment.serviceId.price }} MGA</p>
            <!-- Add more appointment details as needed -->
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .appointments-container {
        display: flex;
        flex-wrap: wrap;
      }

      .appointment-card {
        margin: 10px;
        width: 300px;
      }
    `,
  ],
})
export class EmployeeAppointmentsComponent implements OnInit {
  appointments: any[] = [];

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

    if (userId) {
      this.appointmentsService.getAppointments(userId).subscribe(
        (appointments) => {
          this.appointments = appointments;
        },
        (error) => {
          console.error('Error loading appointments', error);
        }
      );
    } else {
      console.error('User ID not found in the token.');
    }
  }
}
