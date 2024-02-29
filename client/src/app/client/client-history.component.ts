import { Component } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'client-history',
  template: `
    <div class="container my-5">
      <div class="row d-flex justify-content-center">
        <div class="col-12">
          <h1 class="mb-4">Historique des rendez-vous</h1>
          <div *ngIf="!isLoading">
            <table class="table">
              <thead class="thead-primary">
                <tr class="text-center">
                  <th>Date</th>
                  <th>Services</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody *ngFor="let appointment of appointments">
                <tr class="text-center">
                  <td>{{ appointment.date | date : 'long' }}</td>
                  <td>
                    <ul *ngFor="let service of appointment.serviceIds">
                      <li>{{ service.name }}</li>
                    </ul>
                  </td>
                  <td *ngIf="appointment.status === 'pending'">
                    <a
                      href="/client/payment/{{ appointment._id }}"
                      class="btn btn-primary"
                      >Payer</a
                    >
                  </td>
                  <td *ngIf="appointment.status === 'confirmed'">
                    <span class="badge badge-pill badge-success"
                      >Déja payé</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ClientHistoryComponent {
  appointments: any[] = [];
  isLoading = true;

  apiUrl: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments() {
    fetch(`${this.apiUrl}/appointments/users/` + localStorage.getItem('userId'))
      .then((response) => response.json())
      .then((data) => {
        this.appointments = data;
        this.isLoading = false;
      });
  }
}
