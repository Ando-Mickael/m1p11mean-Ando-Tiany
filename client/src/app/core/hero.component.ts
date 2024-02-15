import {Component, Input} from '@angular/core';

@Component({
  selector: 'hero',
  template: `
    <div class="hero-wrap hero-bread" [style.background-image]="'url(assets/images/bg_6.jpg)'">
      <div class="container">
        <div class="row no-gutters slider-text align-items-center justify-content-center">
          <div class="col-md-9 ftco-animate text-center">
            <h1 class="mb-0 bread">{{ pageTitle }}</h1>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HeroComponent {
  @Input() pageTitle: string = '';
}
