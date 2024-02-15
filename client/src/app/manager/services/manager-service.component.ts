import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'manager-service',
  template: `
          <div class="row">
              <div class="col-md-3">
                  <section class="ftco-section">
                      <div class="container">
                          <div class="row justify-content-center">
                              <div class="col-xl-10 ftco-animate">
                                  <div>
                                      <h2>Créer une nouvelle Service</h2>

                                      <form (ngSubmit)="onSubmit()" class="billing-form">
                                          <div class="form-group">
                                              <label for="name">Nom:</label>
                                              <input
                                                      type="text"
                                                      id="name"
                                                      [(ngModel)]="serviceName"
                                                      name="name"
                                                      required
                                                      class="form-control"
                                                      placeholder=""
                                              />
                                          </div>

                                          <div class="form-group">
                                              <label for="price">Prix:</label>
                                              <input
                                                      type="number"
                                                      id="price"
                                                      [(ngModel)]="servicePrice"
                                                      name="price"
                                                      required
                                                      class="form-control"
                                                      placeholder=""
                                              />
                                          </div>

                                          <div class="form-group">
                                              <label for="duration">Durée:</label>
                                              <input
                                                      type="number"
                                                      id="duration"
                                                      [(ngModel)]="serviceDuration"
                                                      name="duration"
                                                      required
                                                      class="form-control"
                                                      placeholder=""
                                              />
                                          </div>

                                          <div class="form-group">
                                              <label for="commissionRate">Commission:</label>
                                              <input
                                                      type="number"
                                                      id="commissionRate"
                                                      [(ngModel)]="serviceCommissionRate"
                                                      name="commissionRate"
                                                      required
                                                      class="form-control"
                                                      placeholder=""
                                              />
                                          </div>

                                          <button type="submit" class="btn btn-primary">Créer le service</button>
                                      </form>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </section>
              </div>
              <div class="col-md-9">
                  <section class="ftco-section ftco-cart">
                      <div class="container">
                          <h2>Toutes les Services</h2>
                          <table class="table">
                              <thead class="thead-primary">
                              <tr>
                                  <th>Nom</th>
                                  <th>Prix</th>
                                  <th>Durée</th>
                                  <th>Commission</th>
                                  <th></th>
                              </tr>
                              </thead>
                              <tbody>
                              <ng-container *ngFor="let service of services; let i = index">
                                  <tr *ngIf="!service.isEditing; else editRow" class="text-center">
                                      <td>{{ service.name }}</td>
                                      <td>{{ service.price }}</td>
                                      <td>{{ service.duration }}</td>
                                      <td>{{ service.commissionRate }}</td>
                                      <td>
                                          <button class="px-2" (click)="toggleEdit(i)">Modifier</button>
                                          <button class="ml-2 px-2" (click)="deleteService(service._id)">Supprimer
                                          </button>
                                      </td>
                                  </tr>
                                  <ng-template #editRow>
                                      <tr>
                                          <td><input type="text" [(ngModel)]="service.name" class="form-control"/></td>
                                          <td><input type="number" [(ngModel)]="service.price" class="form-control"/>
                                          </td>
                                          <td><input type="number" [(ngModel)]="service.duration" class="form-control"/>
                                          </td>
                                          <td>
                                              <input type="number" [(ngModel)]="service.commissionRate"
                                                     class="form-control"/>
                                          </td>
                                          <td>
                                              <button class="px-2" (click)="updateService(service)">Enregistrer</button>
                                              <button class="ml-2 px-2" (click)="cancelEdit(service)">Annuler</button>
                                          </td>
                                      </tr>
                                  </ng-template>
                              </ng-container>
                              </tbody>
                          </table>
                      </div>
                  </section>
              </div>
          </div>
  `,
})
export class ManagerServiceComponent implements OnInit {
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
      commissionRate: this.serviceCommissionRate,
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

  toggleEdit(index: number) {
    this.services[index].isEditing = true;
  }

  cancelEdit(service: any) {
    service.isEditing = false;
  }

  updateService(service: any) {
    // Call your service to update the service
    this.serviceService.updateService(service._id, service).subscribe(
      () => {
        console.log('Service updated successfully');
        // Refresh the list of services after updating
        this.getServices();
      },
      (error) => {
        console.error('Error updating service', error);
        // Handle error, show an error message, etc.
      }
    );
    service.isEditing = false;
  }
}
