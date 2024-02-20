import { Component } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'client-cart',
  template: `
    <div>
      <h2>Cart</h2>

      <div *ngIf="cart.length">
        <ul *ngFor="let id of cart; let i = index">
          <li>
            {{ id }}
            <button (click)="removeFromCart(i)">Remove</button>
          </li>
        </ul>
      </div>
    </div>

    <form (submit)="onSubmit($event)">
      <div>
        <input type="datetime-local" name="date" [(ngModel)]="date" />
      </div>
      <div *ngIf="!employeesLoading">
        <select name="employeeId" [(ngModel)]="employeeId" id="">
          <option *ngFor="let employee of employees" [value]="employee._id">
            {{ employee.firstName }} {{ employee.lastName }}
          </option>
        </select>
      </div>
      <button type="submit">Take appointment</button>
    </form>
  `,
})
export class ClientCartComponent {
  cart = [];

  employees: any[] = [];
  employeesLoading = true;

  date: string = '';
  employeeId: string = '';

  apiUrl: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

  ngOnInit() {
    this.getEmployees();
    this.refreshCart();
  }

  clearCart() {
    localStorage.removeItem('cart');
  }

  refreshCart() {
    let cart = JSON.parse(localStorage.getItem('cart') as string);
    if (cart) {
      this.cart = cart;
    } else {
      this.cart = [];
    }
  }

  removeFromCart(index: number) {
    let cart = JSON.parse(localStorage.getItem('cart') as string);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.refreshCart();
  }

  getEmployees() {
    fetch(`${this.apiUrl}/employees`)
      .then((response) => response.json())
      .then((data) => {
        this.employees = data;
        this.employeesLoading = false;
      });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    let data = {
      serviceIds: JSON.parse(localStorage.getItem('cart') as string),
      userId: localStorage.getItem('userId'),
      date: this.date,
      employeeId: this.employeeId,
    };

    fetch(`${this.apiUrl}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      this.clearCart();
      this.refreshCart();
    });
  }
}
