import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../config.service';

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

  apiUrl: string;

  constructor(
    private configService: ConfigService,
    private route: ActivatedRoute
  ) {
    this.apiUrl = configService.getApiUrl();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getUser(params['id']);
    });
  }

  getUser(id: string) {
    fetch(`${this.apiUrl}/employees/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.user = data;
        this.isLoading = false;
      });
  }

  update() {
    console.log(this.user);
    fetch(`${this.apiUrl}/employees/${this.user._id}`, {
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
