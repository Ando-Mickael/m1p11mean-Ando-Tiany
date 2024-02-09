import { Component } from '@angular/core';

@Component({
  selector: 'manager-statistiques',
  template: `
    <div>
      <p>Statistiques</p>
      <manager-daily-revenue></manager-daily-revenue>
      <manager-monthly-revenue></manager-monthly-revenue>
      <div>
        <h2>Total monthly appointments</h2>
        <manager-total-monthly-appointments></manager-total-monthly-appointments>
      </div>
    </div>
  `,
  styles: [],
})
export class ManagerStatistiquesComponent {}
