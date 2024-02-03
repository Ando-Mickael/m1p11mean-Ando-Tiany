import { Component } from '@angular/core';

@Component({
  selector: 'manager-employees',
  template: `
    <p *ngIf="isLoading">Loading...</p>
    <table border="1" *ngIf="!isLoading">
      <thead>
        <th>Last name</th>
        <th>First name</th>
        <th></th>
      </thead>
      <tbody>
        <tr *ngFor="let user of users">
          <td>
            <a href="/manager/employees/{{ user._id }}">{{ user.lastName }}</a>
          </td>
          <td>{{ user.firstName }}</td>
          <td><button (click)="deleteUser(user._id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
      table {
        border-collapse: collapse;
      }
      td,
      th {
        padding: 5px;
      }
    `,
  ],
})
export class ManagerEmployeesComponent {
  users: any[] = [];
  isLoading = true;

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    fetch('http://localhost:3000/employees')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.users = data;
        this.isLoading = false;
      });
  }

  deleteUser(id: any) {
    fetch(`http://localhost:3000/employees/${id}`, {
      method: 'DELETE',
    }).then(() => {
      this.getUsers();
    });
  }
}
