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
    this.getServices();
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
        this.getServices();
      },
      (error) => {
        console.error('Error creating service', error);
        // You can handle errors, e.g., show an error message
      }
    );
  }

  private getServices() {
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

  deleteService(id: string) {
    this.serviceService.deleteService(id).subscribe(
      () => {
        console.log('Service deleted successfully');
        // Optional: Refresh the list of services after deletion
        this.getServices();
      },
      (error) => {
        console.error('Error deleting service', error);
        // Handle error, show an error message, etc.
      }
    );
  }
}
