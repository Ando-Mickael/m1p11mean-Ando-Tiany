import { Component } from '@angular/core';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'manager-employees',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 mb-5">
          <manager-form-employee></manager-form-employee>
        </div>

        <div class="col-lg-9">
          <p *ngIf="isLoading">Loading...</p>
          <h2>Liste des employés</h2>
          <div class="table-responsive">
            <table class="table" *ngIf="!isLoading">
              <thead class="thead-primary">
                <tr class="text-center">
                  <th>Nom</th>
                  <th>Prénoms</th>
                  <th>Temps moyen de travail</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let user of users" class="text-center">
                  <td>
                    <a href="/manager/employees/{{ user._id }}">{{
                      user.lastName
                    }}</a>
                  </td>
                  <td>{{ user.firstName }}</td>
                  <td>{{ user.averageWorkDuration }}</td>
                  <td>
                    <button class="" (click)="deleteUser(user._id)">
                      Supprimer
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ManagerEmployeesComponent {
  users: any[] = [];
  isLoading = true;
  apiUrl: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    fetch(`${this.apiUrl}/employees`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.users = data;
        this.isLoading = false;
      });
  }

  deleteUser(id: any) {
    fetch(`${this.apiUrl}/employees/${id}`, {
      method: 'DELETE',
    }).then(() => {
      this.getUsers();
    });
  }
}
