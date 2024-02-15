import { Component } from '@angular/core';

@Component({
  selector: 'manager-statistiques',
  template: `
    <div class="container">
      <p>Statistiques</p>

      <div class="row">
        <div class="col-md-12">
          <h1>Bénéfices</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <manager-daily-revenue></manager-daily-revenue>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <manager-monthly-revenue></manager-monthly-revenue>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-12">
          <h1>Chiffres d'affaire</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <manager-daily-ca></manager-daily-ca>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <manager-monthly-ca></manager-monthly-ca>
            </div>
          </div>
        </div>
      </div>

      <div class="my-4">
        <h2>Total monthly appointments</h2>
        <div class="card">
          <div class="card-body">
            <manager-total-monthly-appointments></manager-total-monthly-appointments>
          </div>
        </div>
      </div>
    </div>

  `,
  styles: [],
})
export class ManagerStatistiquesComponent {}
