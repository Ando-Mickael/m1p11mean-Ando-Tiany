import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'manager-form-employee',
  template: `
    <h2 class="heading">Ajouter un employé</h2>
    <form (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="firstName">Prénoms</label>
        <input
          type="text"
          name="firstName"
          placeholder="Prénoms"
          [(ngModel)]="newUser.firstName"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="lastName">Nom</label>
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          [(ngModel)]="newUser.lastName"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="birthday">Date de naissance</label>
        <input
          type="date"
          name="birthday"
          [(ngModel)]="newUser.birthday"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          [(ngModel)]="newUser.email"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          [(ngModel)]="newUser.password"
          class="form-control"
        />
      </div>

      <div>
        <button type="submit" class="btn btn-primary w-100 px-4 py-3">
          Ajouter
        </button>
      </div>
    </form>
  `,
})
export class ManagerFormEmployeeComponent {
  newUser: any = {};

  apiUrl: string;

  constructor(private configService: ConfigService, private router: Router) {
    this.apiUrl = configService.getApiUrl();
  }

  onSubmit() {
    fetch(`${this.apiUrl}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.newUser),
    }).then(() => {
      this.router.navigate(['/manager/employees']);
    });
  }
}
