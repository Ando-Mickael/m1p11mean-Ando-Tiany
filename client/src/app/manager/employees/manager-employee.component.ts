import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'manager-employee',
  template: `
    <div *ngIf="!isLoading">
      <form (ngSubmit)="update()">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          [(ngModel)]="user.lastName"
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          [(ngModel)]="user.firstName"
        />
        <input
          type="date"
          name="birthday"
          placeholder="Birthday"
          [(ngModel)]="user.birthday"
        />

        <button type="submit">Update</button>
      </form>
    </div>
  `,
})
export class ManagerEmployeeComponent {
  user: any = {};
  isLoading = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getUser(params['id']);
    });
  }

  getUser(id: string) {
    fetch(`http://localhost:3000/employees/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.user = data;
        this.isLoading = false;
      });
  }

  update() {
    console.log(this.user);
    fetch(`http://localhost:3000/employees/${this.user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.user),
    }).then(() => {
      this.getUser(this.user._id);
    });
  }
}
