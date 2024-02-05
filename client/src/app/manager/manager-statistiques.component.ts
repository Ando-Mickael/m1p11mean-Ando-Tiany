import {Component} from "@angular/core";

@Component({
  selector: 'manager-statistiques',
  template: `
    <div>
      <p>Statistiques</p>
      <manager-daily-revenue></manager-daily-revenue>
      <manager-monthly-revenue></manager-monthly-revenue>
    </div>
  `,
  styles: []
})
export class ManagerStatistiquesComponent {

}
