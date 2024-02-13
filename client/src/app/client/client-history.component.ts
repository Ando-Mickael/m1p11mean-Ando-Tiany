import { Component } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'client-history',
  template: `
    <div *ngIf="!isLoading">
      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Services</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody *ngFor="let appointment of appointments">
          <tr>
            <td>{{ appointment.date }}</td>
            <td>{{ appointment.serviceIds | json }}</td>
            <td>{{ appointment.status }}</td>
            <td><a href="/client/payment/{{ appointment._id }}">Pay</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      table {
        border-collapse: collapse;
      }
      td,
      th {
        padding: 5px;
      }
    `,
  ],
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
