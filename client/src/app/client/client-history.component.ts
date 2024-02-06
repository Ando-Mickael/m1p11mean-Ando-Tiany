import { Component } from '@angular/core';

@Component({
  selector: 'client-history',
  template: `
    <div *ngIf="!isLoading">
      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Services</th>
          </tr>
        </thead>
        <tbody *ngFor="let appointment of appointments">
          <tr>
            <td>{{ appointment.date }}</td>
            <td>{{ appointment.serviceIds | json }}</td>
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

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments() {
    fetch(
      'http://localhost:3000/appointments/users/' +
        localStorage.getItem('userId')
    )
      .then((response) => response.json())
      .then((data) => {
        this.appointments = data;
        this.isLoading = false;
      });
  }
}
