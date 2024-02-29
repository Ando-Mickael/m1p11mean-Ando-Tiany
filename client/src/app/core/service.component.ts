import { Component, Input } from '@angular/core';
import { CartService } from '../client/cart.service';

export type Service = {
  _id?: string;
  name: string;
  price: number;
  duration: number;
  image: string | null;
};

@Component({
  selector: 'app-service',
  template: `
    <div class="product d-flex flex-column">
      <a href="#" class="img-prod"
        ><img
          class="img-fluid"
          *ngIf="service?.image; else defaultImage"
          src="http://localhost:3001/uploads/services/{{ service?.image }}"
          [alt]="service?.name"
        />
        <ng-template #defaultImage>
          <img
            class="img-fluid"
            src="assets/images/product-1.png"
            [alt]="service?.name"
          />
        </ng-template>
        <div class="overlay"></div>
      </a>
      <div class="text py-3 pb-4 px-3">
        <div class="d-flex">
          <div class="cat">
            <span>Service</span>
          </div>
          <div class="rating">
            <p class="text-right mb-0">
              <a href="#"><span class="ion-ios-star-outline"></span></a>
              <a href="#"><span class="ion-ios-star-outline"></span></a>
              <a href="#"><span class="ion-ios-star-outline"></span></a>
              <a href="#"><span class="ion-ios-star-outline"></span></a>
              <a href="#"><span class="ion-ios-star-outline"></span></a>
            </p>
          </div>
        </div>
        <h3>
          <a href="#">{{ service?.name }}</a>
        </h3>
        <div class="pricing">
          <p class="price">
            <span>{{ service?.price | currency : 'MGA' }}</span>
          </p>
        </div>
        <p class="bottom-area d-flex px-3">
          <a
            (click)="addToCart(service?._id)"
            class="add-to-cart text-center py-2 mr-1"
            ><span>Add to cart <i class="ion-ios-add ml-1"></i></span
          ></a>
        </p>
      </div>
    </div>
  `,
})
export class ServiceComponent {
  @Input() service: Service | null = null;

  constructor(private cartService: CartService) {}

  addToCart(id: string | undefined) {
    let cart = JSON.parse(localStorage.getItem('cart') as string);

    if (cart) {
      cart.push(id);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartService.getCount();
    } else {
      localStorage.setItem('cart', JSON.stringify([id]));
    }
  }
}
