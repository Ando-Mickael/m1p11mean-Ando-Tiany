import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialOfferService } from '../services/special-offer.service';

@Component({
  selector: 'manager-special-offer',
  template: `
    <div>
      <h2>Create New Special Offer</h2>

      <form [formGroup]="specialOfferForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" formControlName="name" />
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <textarea id="description" formControlName="description"></textarea>
        </div>

        <button type="submit">Create Special Offer</button>
      </form>
    </div>
  `,
})
export class ManagerSpecialOfferComponent {
  specialOfferForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private specialOfferService: SpecialOfferService
  ) {
    this.specialOfferForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.specialOfferForm.valid) {
      const { name, description } = this.specialOfferForm.value;

      this.specialOfferService
        .createSpecialOffer({ name, description })
        .subscribe(
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
