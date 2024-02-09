import { Component } from '@angular/core';

@Component({
  selector: 'manager-statistiques',
  template: `
    <div>
      <p>Statistiques</p>
      <h1>Bénéfices</h1>
      <manager-daily-revenue></manager-daily-revenue>
      <manager-monthly-revenue></manager-monthly-revenue>
      <h1>Chiffres d'affaire</h1>
      <manager-daily-ca></manager-daily-ca>
      <manager-monthly-ca></manager-monthly-ca>
      <div>
        <h2>Total monthly appointments</h2>
        <manager-total-monthly-appointments></manager-total-monthly-appointments>
      </div>
    </div>
  `,
  styles: [],
})
export class ManagerStatistiquesComponent {}
