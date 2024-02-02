import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  serviceName: string = '';
  servicePrice: number = 0;
  serviceDuration: number = 0;
  serviceCommissionRate: number = 0;

  constructor(private serviceService: ServiceService) {}

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
        // You can handle success, e.g., show a success message
      },
      (error) => {
        console.error('Error creating service', error);
        // You can handle errors, e.g., show an error message
      }
    );
  }
}
