// employee-appointments.component.ts
import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../services/appointments.service';

interface Service {
  _id: string;
  name: string;
  price: number;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Appointment {
  _id: string;
  userId: User;
  date: Date;
  serviceIds: Service[];
  status: string;
}

@Component({
  selector: 'employee-appointments',
  template: `
    <div>
      <h3>Mes Rendez-vous</h3>
      <div class="appointments-container">
        <mat-card *ngFor="let appointment of appointments" class="appointment-card">
          <mat-card-header>
            <mat-card-title>{{ appointment.userId.firstName }} {{ appointment.userId.lastName }}</mat-card-title>
            <mat-card-subtitle>{{ appointment.date | date: 'medium' }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <ul>
              <li *ngFor="let service of appointment.serviceIds">
                {{ service.name }} - {{ service.price }} MGA
              </li>
            </ul>
            <p>Total Prix: {{ getTotalPrice(appointment.serviceIds) }} MGA</p>
            <p>Status: {{ appointment.status }}</p>
            <button *ngIf="appointment.status !== 'confirmed'" (click)="confirmAppointment(appointment._id)">
              Confirmer
            </button>
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
  appointments: Appointment[] = [];

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

  getTotalPrice(services: Service[]): number {
    return services.reduce((sum, service) => sum + service.price, 0);
  }

  confirmAppointment(appointmentId: string) {
    // Call service to confirm appointment
    console.log('Confirm appointment:', appointmentId);
  }
}
