// employee-appointments.component.ts
import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../services/appointments.service';

interface Service {
  _id: string;
  name: string;
  price: number;
  commissionRate: number;
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
      <div class="filter-container">
        <input type="date" [(ngModel)]="filterDate" (change)="applyFilters()" placeholder="Date">
        <select [(ngModel)]="filterStatus" (change)="applyFilters()">
          <option value="">Tous les États</option>
          <option value="pending">En attente</option>
          <option value="confirmed">Confirmé</option>
        </select>
      </div>
      <div class="appointments-container">
        <mat-card *ngFor="let appointment of filteredAppointments" class="appointment-card">
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
            <p>Total Commission: {{ getTotalCommission(appointment.serviceIds) }} MGA</p>
            <p>Status: {{ appointment.status }}</p>
            <button *ngIf="appointment.status !== 'confirmed'" (click)="confirmAppointment(appointment._id)">
              Confirmer
            </button>
          </mat-card-content>
        </mat-card>
      </div>
      <h2>Total des Commissions: {{ getTotalCommissions() }} MGA</h2>
    </div>
  `,
  styles: [
    `
      .filter-container {
        margin-bottom: 10px;
      }

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
  filteredAppointments: Appointment[] = [];
  filterDate: string = '';
  filterStatus: string = '';

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

    if (userId) {
      this.appointmentsService.getAppointments(userId).subscribe(
        (appointments) => {
          this.appointments = appointments;
          this.applyFilters(); // Apply initial filters
        },
        (error) => {
          console.error('Error loading appointments', error);
        }
      );
    } else {
      console.error('User ID not found in the token.');
    }
  }

  applyFilters() {
    this.filteredAppointments = this.appointments.filter(appointment => {
      let passDateFilter = true;
      let passStatusFilter = true;

      // Apply date filter
      if (this.filterDate) {
        const filterDate = new Date(this.filterDate).toISOString().split('T')[0];
        const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
        passDateFilter = filterDate === appointmentDate;
      }

      // Apply status filter
      if (this.filterStatus) {
        passStatusFilter = appointment.status === this.filterStatus;
      }

      return passDateFilter && passStatusFilter;
    });
  }

  getTotalPrice(services: Service[]): number {
    return services.reduce((sum, service) => sum + service.price, 0);
  }

  getTotalCommission(services: Service[]): number {
    return services.reduce((sum, service) => sum + (service.price * service.commissionRate / 100), 0);
  }

  getTotalCommissions(): number {
    return this.filteredAppointments.reduce((sum, appointment) => sum + this.getTotalCommission(appointment.serviceIds), 0);
  }

  confirmAppointment(appointmentId: string) {
    console.log('Confirm appointment:', appointmentId);
  }
}
