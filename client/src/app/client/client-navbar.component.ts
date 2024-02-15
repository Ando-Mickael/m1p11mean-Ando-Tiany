import { Component } from '@angular/core';

@Component({
  selector: 'client-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
      <div class="container">
        <a class="navbar-brand" href="#">Minishop</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="oi oi-menu"></span> Menu
        </button>

        <div class="collapse navbar-collapse" id="ftco-nav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item"><a href="/client/services" class="nav-link">Services</a></li>
            <li class="nav-item"><a href="/client/history" class="nav-link">History</a></li>
            <li class="nav-item"><a href="/logout" class="nav-link">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <hr />
  `,
})
export class ClientNavbarComponent {}
