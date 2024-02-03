import { Component } from '@angular/core';

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
export class ManagerSpendingsComponent {
  spendings: any[] = [];
  isLoading = true;

  ngOnInit() {
    this.getSpendings();
  }

  getSpendings() {
    fetch('http://localhost:3000/spendings')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.spendings = data;
        this.isLoading = false;
      });
  }
}
