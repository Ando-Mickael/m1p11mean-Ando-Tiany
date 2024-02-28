import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { SpecialOfferService } from '../../services/special-offer.service';
import {Service} from "../../core/service.component";
import {ServiceService} from "../../services/service.service";
@Component({
  selector: 'manager-special-offer',
  template: `
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10 ftco-animate">
            <div>
              <h2>Créer une Offre Spéciale</h2>

              <form [formGroup]="specialOfferForm" (ngSubmit)="onSubmit()" class="billing-form">
                <div class="form-group">
                  <label for="name">Nom:</label>
                  <input type="text" id="name" formControlName="name" class="form-control" placeholder="">
                </div>
                <div class="form-group">
                  <label for="description">Description:</label>
                  <textarea id="description" formControlName="description" class="form-control" placeholder=""></textarea>
                </div>
                <div class="form-group">
                  <label for="startDate">Date de début:</label>
                  <input type="date" id="startDate" formControlName="startDate" class="form-control" placeholder="">
                </div>
                <div class="form-group">
                  <label for="endDate">Date de fin:</label>
                  <input type="date" id="endDate" formControlName="endDate" class="form-control" placeholder="">
                </div>
                <div class="form-group">
                  <table class="table">
                    <thead>
                    <tr>
                      <th>Service</th>
                      <th>Percentage (%)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr *ngFor="let service of services">
                      <td>{{ service.name }}</td>
                      <td><input type="number" [formControlName]="service?._id!" class="form-control"></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="w-100"></div>
                <button type="submit" class="btn btn-primary py-3 px-4">Create Special Offer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ManagerSpecialOfferComponent {
  specialOfferForm: FormGroup;
  services: Service[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
    private specialOfferService: SpecialOfferService
  ) {
    this.specialOfferForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      percentages: this.formBuilder.array([]) // Initialize an empty form array
    });
    this.loadServices();
  }

  loadServices() {
    this.serviceService.getServices().subscribe(
      (services) => {
        this.services = services;
        this.initializeFormControls();
      },
      (error) => {
        console.error('Error loading services', error);
      }
    );
  }

  initializeFormControls() {
    const percentagesFormArray = this.specialOfferForm.get('percentages') as FormArray; // Cast to FormArray
    if (percentagesFormArray) {
      this.services.forEach((service) => {
        if (service._id) { // Check if _id is defined
          percentagesFormArray.push(this.formBuilder.group({
            serviceId: service._id,
            percentage: [0, Validators.required] // Set the default value to 0
          }));
        }
      });
    }
  }

  onSubmit() {
    if (this.specialOfferForm.valid) {
      const { name, description, startDate, endDate, percentages } = this.specialOfferForm.value;

      this.specialOfferService.createSpecialOffer({
        name,
        description,
        percentages, // Send the entire percentages array
        startDate,
        endDate
      }).subscribe(
        (createdOffer) => {
          console.log('Special offer created successfully', createdOffer);
          // You can handle success, e.g., show a success message
        },
        (error) => {
          console.error('Error creating special offer', error);
          // You can handle errors, e.g., show an error message
        }
      );
    }
  }
}
