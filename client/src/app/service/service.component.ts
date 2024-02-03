import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent  implements OnInit{
  serviceName: string = '';
  servicePrice: number = 0;
  serviceDuration: number = 0;
  serviceCommissionRate: number = 0;
  services: any[] = [];

  constructor(private serviceService: ServiceService) {}

  ngOnInit() {
    this.loadServices();
  }

  onSubmit() {
    const newService = {
      name: this.serviceName,
      price: this.servicePrice,
      duration: this.serviceDuration,
      commissionRate: this.serviceCommissionRate
    };

    this.serviceService.createService(newService).subscribe(
      (createdService) => {
        console.log('Service created successfully', createdService);
        // Refresh the services after creating a new one
        this.loadServices();
      },
      (error) => {
        console.error('Error creating service', error);
        // You can handle errors, e.g., show an error message
      }
    );
  }

  private loadServices() {
    this.serviceService.getServices().subscribe(
      (services) => {
        this.services = services;
      },
      (error) => {
        console.error('Error loading services', error);
        // You can handle errors, e.g., show an error message
      }
    );
  }
}
