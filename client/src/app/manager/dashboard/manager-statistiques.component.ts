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

      <div class="row mt-3">
        <div class="col-md-12">
          <h1>Nombre de rendez-vous</h1>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <manager-daily-appointments-by-month-and-year></manager-daily-appointments-by-month-and-year>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <manager-monthly-appointments-by-year></manager-monthly-appointments-by-year>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ManagerStatistiquesComponent {}
