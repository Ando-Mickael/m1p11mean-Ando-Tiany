import { Component } from '@angular/core';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'manager-spendings',
  template: `
    <p *ngIf="isLoading">Loading...</p>
    <table border="1" *ngIf="!isLoading">
      <thead>
        <th>Name</th>
        <th>Amount</th>
        <th>Date</th>
      </thead>
      <tbody>
        <tr *ngFor="let spending of spendings">
          <td>{{ spending.name }}</td>
          <td>{{ spending.amount }}</td>
          <td>{{ spending.date }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class ManagerSpendingsComponent {
  spendings: any[] = [];
  isLoading = true;

  apiUrl: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

  ngOnInit() {
    this.getSpendings();
  }

  getSpendings() {
    fetch(`${this.apiUrl}/spendings`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.spendings = data;
        this.isLoading = false;
      });
  }
}
