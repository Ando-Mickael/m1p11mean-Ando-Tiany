import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../config.service';

@Component({
  selector: 'client-home',
  template: `
    <form (ngSubmit)="onSubmit($event)">
      <h2>Payment</h2>
      <div>
        <label for="">Card number</label>
        <input
          type="text"
          name="cardNumber"
          [(ngModel)]="cardNumber"
          placeholder="XXXX XXXX XXXX XXXX"
        />
      </div>
      <div>
        <label for="">CVV</label>
        <input type="text" placeholder="CVV" />
      </div>
      <div>
        <label for="">Expiry</label>
        <input type="date" />
      </div>
      <div>
        <label for="">Code postal</label>
        <input type="text" placeholder="90210" />
      </div>

      <div>
        <label for="">Country</label>
        <select name="" id="">
          <option value="">Madagascar</option>
          <option value="">France</option>
          <option value="">United States</option>
        </select>
      </div>

      <button type="submit">Pay</button>
    </form>
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
