import { Component } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'client-services',
  template: `
    <div>
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

      <div *ngIf="!servicesLoading">
        <h2>Services</h2>
        <ul *ngFor="let service of services">
          <li>
            {{ service.name }}
            <button (click)="addToCart(service._id)">Add to Cart</button>
          </li>
        </ul>

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
      </div>
    </div>
  `,
})
export class ClientServicesComponent {
  services: any[] = [];
  servicesLoading = true;

  employees: any[] = [];
  employeesLoading = true;

  date: string = '';
  employeeId: string = '';

  cart = [];

  apiUrl: string;

  constructor(private configService: ConfigService) {
    this.clearCart();
    this.apiUrl = configService.getApiUrl();
  }

  ngOnInit() {
    this.getServices();
    this.getEmployees();
  }

  clearCart() {
    localStorage.removeItem('cart');
  }

  getServices() {
    fetch(`${this.apiUrl}/services`)
      .then((response) => response.json())
      .then((data) => {
        this.services = data;
        this.servicesLoading = false;
      });
  }

  getEmployees() {
    fetch(`${this.apiUrl}/employees`)
      .then((response) => response.json())
      .then((data) => {
        this.employees = data;
        this.employeesLoading = false;
      });
  }

  addToCart(id: string) {
    let cart = JSON.parse(localStorage.getItem('cart') as string);

    if (cart) {
      cart.push(id);
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.setItem('cart', JSON.stringify([id]));
    }
    this.refreshCart();

    console.log(this.cart);
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
