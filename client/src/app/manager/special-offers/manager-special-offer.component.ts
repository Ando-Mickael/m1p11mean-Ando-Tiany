import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialOfferService } from '../../services/special-offer.service';

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
