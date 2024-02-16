import { Component } from '@angular/core';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'manager-spendings',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 mb-5">
          <manager-form-spending></manager-form-spending>
        </div>

        <div class="col-lg-9">
          <p *ngIf="isLoading">Loading...</p>
          <h2>Liste des dépenses</h2>
          <div class="table-responsive">
            <table class="table" *ngIf="!isLoading">
              <thead class="thead-primary">
                <tr class="text-center">
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center" *ngFor="let spending of spendings">
                  <td>{{ spending.name }}</td>
                  <td>{{ spending.amount | currency : 'MGA' }}</td>
                  <td>{{ spending.date | date : 'long' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
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
