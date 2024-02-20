import { Component } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'client-cart',
  template: `
    <section class="ftco-section ftco-cart">
      <div class="container">
        <div class="row">
          <div class="col-md-12 ftco-animate">
            <div class="cart-list">
              <table class="table">
                <thead class="thead-primary">
                  <tr class="text-center">
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>Produit</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="text-center"
                    *ngFor="let id of cart; let i = index"
                  >
                    <td class="product-remove">
                      <a (click)="removeFromCart(i)"
                        ><span class="ion-ios-close"></span
                      ></a>
                    </td>

                    <td class="image-prod">
                      <div
                        class="img"
                        style="background-image: url(assets/images/product-3.jpg)"
                      ></div>
                    </td>

                    <td class="product-name">
                      <h3>{{ id }}</h3>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nulla laboriosam nesciunt commodi natus, vero earum
                        cumque unde
                      </p>
                    </td>

                    <td class="price">$4.90</td>

                    <td class="quantity">1</td>

                    <td class="total">$4.90</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row justify-content-end mt-5">
          <div class="col-lg-5 cart-total">
            <form (submit)="onSubmit($event)">
              <h3
                style="font-weight: bold; text-transform: uppercase;letter-spacing: 2px; font-size: 18px;"
              >
                Prendre un rendez-vous
              </h3>
              <div class="form-group">
                <label for="date">Date du rendez-vous</label>
                <input
                  id="date"
                  type="datetime-local"
                  name="date"
                  [(ngModel)]="date"
                  class="form-control"
                />
              </div>
              <div *ngIf="!employeesLoading" class="form-group">
                <label for="employeeId">Choisir un employé</label>
                <select
                  id="employeeId"
                  name="employeeId"
                  [(ngModel)]="employeeId"
                  class="form-control"
                >
                  <option
                    *ngFor="let employee of employees"
                    [value]="employee._id"
                  >
                    {{ employee.firstName }} {{ employee.lastName }}
                  </option>
                </select>
              </div>
              <div>
                <button class="btn btn-primary py-3 px-4 w-100" type="submit">
                  Confirmer le rendez-vous
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
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
