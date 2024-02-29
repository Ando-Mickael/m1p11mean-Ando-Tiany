import { Component } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'client-services',
  template: `
    <section class="ftco-section bg-light">
      <div class="container">
        <div class="row">
          <div class="col-12 mb-4">
            <input type="text" [(ngModel)]="searchTerm" (ngModelChange)="filterServices()" placeholder="Rechercher une service" class="form-control">
          </div>
          <div class="col-12 order-md-last" *ngIf="!servicesLoading">
            <div class="row">
              <div
                class="col-sm-12 col-md-12 col-lg-4 ftco-animate d-flex"
                *ngFor="let service of filteredServices"
              >
                <app-service [service]="service"></app-service>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ClientServicesComponent {
  services: any[] = [];
  filteredServices: any[] = [];
  servicesLoading = true;
  searchTerm: string = '';

  apiUrl: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

  ngOnInit() {
    this.getServices();
  }

  getServices() {
    fetch(`${this.apiUrl}/services`)
      .then((response) => response.json())
      .then((data) => {
        this.services = data;
        this.filteredServices = data; // Initially set filteredServices to all services
        this.servicesLoading = false;
      });
  }

  // Function to filter services based on search term
  filterServices() {
    if (!this.searchTerm) {
      // If search term is empty, show all services
      this.filteredServices = this.services;
    } else {
      // Filter services by name based on search term
      this.filteredServices = this.services.filter(service =>
        service.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
