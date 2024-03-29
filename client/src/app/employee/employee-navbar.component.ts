import { Component } from '@angular/core';

@Component({
  selector: 'employee-navbar',
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
              <a href="#" class="nav-link">Services</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">Historique</a>
            </li>
            <li class="nav-item">
              <a href="/logout" class="nav-link">Déconnexion</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
})
export class EmployeeNavbarComponent {}
