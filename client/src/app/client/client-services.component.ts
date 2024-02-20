import { Component } from '@angular/core';
import { ConfigService } from '../config.service';
import { Service } from '../core/service.component';

@Component({
  selector: 'client-services',
  template: `
      <section class="ftco-section bg-light">
          <div class="container">
              <div class="row">
                  <div class="col-12 order-md-last" *ngIf="!servicesLoading">
                      <div class="row">
                          <div class="col-sm-12 col-md-12 col-lg-4 ftco-animate d-flex"  *ngFor="let service of services">
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
  servicesLoading = true;

  apiUrl: string;

  test: Service | null = null;

  constructor(private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

  ngOnInit() {
    this.getServices();
    this.test = {
      name: 'Massage',
      duration: 10,
      price: 10,
    };
  }

  getServices() {
    fetch(`${this.apiUrl}/services`)
      .then((response) => response.json())
      .then((data) => {
        this.services = data;
        this.servicesLoading = false;
      });
  }
}
