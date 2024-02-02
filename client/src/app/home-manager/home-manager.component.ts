// home-manager.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialOfferService } from '../services/special-offer.service';

@Component({
  selector: 'app-home-manager',
  templateUrl: './home-manager.component.html',
  styleUrls: ['./home-manager.component.css']
})
export class HomeManagerComponent {
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

      this.specialOfferService.createSpecialOffer({ name, description }).subscribe(
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
