import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'manager-form-spending',
  template: `
    <form (ngSubmit)="onSubmit()">
      <h2>Add employee</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        [(ngModel)]="newSpending.name"
      />
      <input
        type="text"
        name="amount"
        placeholder="Amount"
        [(ngModel)]="newSpending.amount"
      />
      <input type="date" name="date" [(ngModel)]="newSpending.date" />

      <button type="submit">Add</button>
    </form>
  `,
})
export class ManagerFormSpendingComponent {
  newSpending: any = {};
  apiUrl: string;

  constructor(private configService: ConfigService, private router: Router) {
    this.apiUrl = configService.getApiUrl();
  }

  onSubmit() {
    fetch(`${this.apiUrl}/spendings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.newSpending),
    }).then(() => {
      this.router.navigate(['/manager/spendings']);
    });
  }
}
