import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../config.service';

@Component({
  selector: 'client-home',
  template: `
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10 ftco-animate">
            <form (ngSubmit)="onSubmit($event)" class="billing-form">
              <h3 class="mb-4 billing-heading">Détails de paiement</h3>
              <div class="row align-items-end">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="cardNumber">Numéro de carte</label>
                    <input
                      id="cardNumber"
                      type="text"
                      class="form-control"
                      name="cardNumber"
                      [(ngModel)]="cardNumber"
                      placeholder="XXXX XXXX XXXX XXXX"
                    />
                  </div>
                </div>
                <div class="w-100"></div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="country">Pays</label>
                    <div class="select-wrap">
                      <div class="icon">
                        <span class="ion-ios-arrow-down"></span>
                      </div>
                      <select name="" id="country" class="form-control">
                        <option value="">Madagascar</option>
                        <option value="">France</option>
                        <option value="">Etas Unis</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="postcodezip">Code postal</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="90210"
                    />
                  </div>
                </div>
                <div class="w-100"></div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="expiration">Exipiration</label>
                    <input id="expiration" type="date" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="cvv">CVV</label>
                    <input
                      id="cvv"
                      type="text"
                      class="form-control"
                      placeholder="CVV"
                    />
                  </div>
                </div>
                <div class="w-100"></div>
              </div>
              <div>
                <button class="btn btn-primary w-100 px-4 py-3" type="submit">
                  Payer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ClientPaymentComponent {
  cardNumber = '';
  appointmentId = '';

  apiUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService
  ) {
    this.apiUrl = configService.getApiUrl();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.appointmentId = params['appointmentId'];
      console.log(this.appointmentId);
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.cardNumber, this.appointmentId);

    if (
      this.cardNumber === '0000000000000000' ||
      this.cardNumber.length != 16
    ) {
      alert('Invalid card number');
    } else {
      fetch(`${this.apiUrl}/appointments/confirm/${this.appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: '',
      }).then(() => {
        this.router.navigate(['/client/history']);
      });
    }
  }
}
