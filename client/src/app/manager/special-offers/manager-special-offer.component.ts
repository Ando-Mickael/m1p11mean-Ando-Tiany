import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SpecialOfferService } from '../../services/special-offer.service';
import { Service } from "../../core/service.component";
import { ServiceService } from "../../services/service.service";

@Component({
  selector: 'manager-special-offer',
  template: `
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10 ftco-animate">
            <div>
              <h2>Créer une Offre Spéciale</h2>

              <form [formGroup]="specialOfferForm" (ngSubmit)="onSubmit()">
                <label for="name">Name</label>
                <input type="text" id="name" formControlName="name">
                <div *ngIf="specialOfferForm.get('name').invalid && specialOfferForm.get('name').touched">
                  <small>Name is required</small>
                </div>

                <label for="description">Description</label>
                <textarea id="description" formControlName="description"></textarea>
                <div *ngIf="specialOfferForm.get('description').invalid && specialOfferForm.get('description').touched">
                  <small>Description is required</small>
                </div>

                <label for="startDate">Start Date</label>
                <input type="date" id="startDate" formControlName="startDate">
                <div *ngIf="specialOfferForm.get('startDate').invalid && specialOfferForm.get('startDate').touched">
                  <small>Start Date is required</small>
                </div>

                <label for="endDate">End Date</label>
                <input type="date" id="endDate" formControlName="endDate">
                <div *ngIf="specialOfferForm.get('endDate').invalid && specialOfferForm.get('endDate').touched">
                  <small>End Date is required</small>
                </div>

                <div formArrayName="percentages">
                  <div *ngFor="let percentageGroup of specialOfferForm.get('percentages')?.controls; let i = index">
                    <div [formGroupName]="i">
                      <label>{{ services[i].name }}</label>
                      <input type="number" formControlName="percentage">
                      <div *ngIf="percentageGroup.get('percentage')?.invalid && percentageGroup.get('percentage')?.touched">
                        <small>Percentage is required</small>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" [disabled]="specialOfferForm.invalid">Submit</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ManagerSpecialOfferComponent implements OnInit {
  specialOfferForm!: FormGroup;
  services: Service[] = [];

  constructor(
    private serviceService: ServiceService,
    private specialOfferService: SpecialOfferService
  ) {}

  ngOnInit() {
    this.specialOfferForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      percentages: new FormArray([]),
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
    const percentagesFormArray = this.specialOfferForm.get('percentages') as FormArray;
    this.services.forEach((service) => {
      if (service && service._id) {
        percentagesFormArray.push(new FormGroup({
          serviceId: new FormControl(service._id),
          percentage: new FormControl('0', Validators.required),
        }));
      }
    });
  }

  onSubmit() {
    if (this.specialOfferForm && this.specialOfferForm.valid) {
      const { name, description, startDate, endDate, percentages } = this.specialOfferForm.value;

      this.specialOfferService.createSpecialOffer({
        name,
        description,
        percentages,
        startDate,
        endDate
      }).subscribe(
        (createdOffer) => {
          console.log('Special offer created successfully', createdOffer);
          // Handle success, e.g., show a success message
        },
        (error) => {
          console.error('Error creating special offer', error);
          // Handle errors, e.g., show an error message
        }
      );
    }
  }
}
