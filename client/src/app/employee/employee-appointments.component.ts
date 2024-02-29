// employee-appointments.component.ts
import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../services/appointments.service';
import { PromotionsService } from '../services/promotions.service';

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

interface Promotion {
  _id: string;
  name: string;
  percentages: { [serviceId: string]: number };
  startDate: Date;
  endDate: Date;
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
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10 ftco-animate">
            <h2>Mes Rendez-vous</h2>
            <div class="filter-container">
              <div class="form-group">
                <input type="date" [(ngModel)]="filterDate" (change)="applyFilters()" class="form-control"
                       placeholder="Date">
              </div>
              <div class="form-group">
                <select [(ngModel)]="filterStatus" (change)="applyFilters()" class="form-control">
                  <option value="">Tous les États</option>
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmé</option>
                </select>
              </div>
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
                  <button *ngIf="appointment.status !== 'confirmed'"
                          (click)="confirmAppointment(appointment._id)">
                    Confirmer
                  </button>
                </mat-card-content>
              </mat-card>
            </div>
            <h2 class="mt-3">Total des Commissions: {{ getTotalCommissions() }} MGA</h2>
          </div>
        </div>
      </div>
    </section>
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
  promotions: Promotion[] = [];
  filterDate: string = '';
  filterStatus: string = '';

  constructor(
    private appointmentsService: AppointmentsService,
    private promotionsService: PromotionsService
  ) {}

  ngOnInit() {
    this.loadAppointments();
    this.loadPromotions();
  }

  loadAppointments() {
    const token = localStorage.getItem('token');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

    if (userId) {
      this.appointmentsService.getAppointments(userId).subscribe(
        (appointments) => {
          this.appointments = appointments;
          this.applyFilters();
        },
        (error) => {
          console.error('Error loading appointments', error);
        }
      );
    } else {
      console.error('User ID not found in the token.');
    }
  }

  loadPromotions() {
    this.promotionsService.getPromotions().subscribe(
      (promotions) => {
        this.promotions = promotions;
      },
      (error) => {
        console.error('Error loading promotions', error);
      }
    );
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
    // Calculate total price considering promotions
    let totalPrice = services.reduce((sum, service) => sum + service.price, 0);
    this.promotions.forEach((promotion) => {
      const promotionStartDate = new Date(promotion.startDate);
      const promotionEndDate = new Date(promotion.endDate);
      this.filteredAppointments.forEach((appointment) => {
        const appointmentDate = new Date(appointment.date);
        if (
          appointmentDate >= promotionStartDate &&
          appointmentDate <= promotionEndDate
        ) {
          Object.keys(promotion.percentages).forEach((serviceId) => {
            const percentage = promotion.percentages[serviceId];
            const matchedService = services.find(
              (service) => service._id === serviceId
            );
            if (matchedService) {
              totalPrice -=
                (matchedService.price * percentage) / 100;
            }
          });
        }
      });
    });
    return totalPrice;
  }

  getTotalCommission(services: Service[]): number {
    // Calculate total commission considering promotions
    let totalCommission = services.reduce(
      (sum, service) => sum + (service.price * service.commissionRate) / 100,
      0
    );
    this.promotions.forEach((promotion) => {
      const promotionStartDate = new Date(promotion.startDate);
      const promotionEndDate = new Date(promotion.endDate);
      this.filteredAppointments.forEach((appointment) => {
        const appointmentDate = new Date(appointment.date);
        if (
          appointmentDate >= promotionStartDate &&
          appointmentDate <= promotionEndDate
        ) {
          Object.keys(promotion.percentages).forEach((serviceId) => {
            const percentage = promotion.percentages[serviceId];
            const matchedService = services.find(
              (service) => service._id === serviceId
            );
            if (matchedService) {
              totalCommission -=
                (matchedService.price * percentage) / 100;
            }
          });
        }
      });
    });
    return totalCommission;
  }

  getTotalCommissions(): number {
    return this.filteredAppointments.reduce((sum, appointment) => sum + this.getTotalCommission(appointment.serviceIds), 0);
  }

  confirmAppointment(appointmentId: string) {
    console.log('Confirm appointment:', appointmentId);
  }
}
