import { Component } from '@angular/core';

@Component({
  selector: 'client-navbar',
  template: `
    <div class="py-1 bg-black">
      <div class="container">
        <div
          class="row no-gutters d-flex align-items-start align-items-center px-md-0"
        >
          <div class="col-lg-12 d-block">
            <div class="row d-flex">
              <div class="col-md pr-4 d-flex topper align-items-center">
                <span class="text">SAMPILAHY HERINIAVO Tiany</span>
              </div>
              <div
                class="col-md-5 pr-4 d-flex topper align-items-center text-lg-right"
              >
                <span class="text">RAMAHENINA Ando Mickael</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nav
      class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
      id="ftco-navbar"
    >
      <div class="container">
        <a class="navbar-brand" href="#">Minishop</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#ftco-nav"
          aria-controls="ftco-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="oi oi-menu"></span> Menu
        </button>

        <div class="collapse navbar-collapse" id="ftco-nav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a href="/client/services" class="nav-link">Services</a>
            </li>
            <li class="nav-item">
              <a href="/client/history" class="nav-link">Historiques</a>
            </li>
            <li class="nav-item">
              <a href="/client/preferences" class="nav-link">Préférences</a>
            </li>
            <li class="nav-item">
              <a href="/client/notifications" class="nav-link">Notifications</a>
            </li>
            <li class="nav-item">
              <a href="/logout" class="nav-link">Déconnexion</a>
            </li>
            <li class="nav-item cta cta-colored">
              <a href="/client/cart" class="nav-link"
                ><span class="icon-shopping_cart"></span>[0]</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
})
export class ClientNavbarComponent {}
