import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'manager-form-spending',
  template: `
    <h2>Ajouter une dépense</h2>
    <form (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="name">Intitulé</label>
        <input
          type="text"
          name="name"
          placeholder="Intitulé"
          [(ngModel)]="newSpending.name"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="amount">Prix</label>
        <input
          type="text"
          name="amount"
          placeholder="Prix"
          [(ngModel)]="newSpending.amount"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="date">Date</label>
        <input
          type="date"
          name="date"
          [(ngModel)]="newSpending.date"
          class="form-control"
        />
      </div>
      <div>
        <button class="btn btn-primary w-100 px-4 py-3" type="submit">
          Add
        </button>
      </div>
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
