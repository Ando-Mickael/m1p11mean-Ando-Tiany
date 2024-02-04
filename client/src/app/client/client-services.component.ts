import { Component } from '@angular/core';

@Component({
  selector: 'client-services',
  template: `
    <div>
      <div *ngIf="!isLoading">
        <ul *ngFor="let service of services">
          <li>{{ service.name }}</li>
        </ul>
      </div>
    </div>
  `,
})
export class ClientServicesComponent {
  services: any[] = [];
  isLoading = true;

  ngOnInit() {
    this.getServices();
  }

  getServices() {
    fetch('http://localhost:3000/services')
      .then((response) => response.json())
      .then((data) => {
        this.services = data;
        this.isLoading = false;
      });
  }
}
