import { Component } from '@angular/core';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'manager-employees',
  template: `
    <p *ngIf="isLoading">Loading...</p>
    <table border="1" *ngIf="!isLoading">
      <thead>
        <th>Last name</th>
        <th>First name</th>
        <th>Temps moyen de travail</th>
        <th></th>
      </thead>
      <tbody>
        <tr *ngFor="let user of users">
          <td>
            <a href="/manager/employees/{{ user._id }}">{{ user.lastName }}</a>
          </td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.averageWorkDuration }}</td>
          <td><button (click)="deleteUser(user._id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
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
