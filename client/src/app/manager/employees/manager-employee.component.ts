import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'manager-employee',
  template: `
    <div class="container p-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <h1>Profil</h1>
          <hr />
          <div *ngIf="!isLoading">
            <form (ngSubmit)="update()">
              <div class="form-group">
                <label for="lastName">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  [(ngModel)]="user.lastName"
                  class="form-control"
                />
              </div>
              <div>
                <label for="firstName">Prénoms</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  [(ngModel)]="user.firstName"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="birthday">Date de naissance</label>
                <input
                  type="date"
                  name="birthday"
                  placeholder="Birthday"
                  class="form-control"
                  [(ngModel)]="user.birthday"
                />
              </div>

              <div>
                <button type="submit" class="btn btn-primary w-100 px-4 py-3">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
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
    fetch(`${this.apiUrl}/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.user = {
          ...data,
          birthday: new Date(data.birthday).toISOString().split('T')[0],
        };
        this.isLoading = false;
      });
  }

  update() {
    console.log('update : ', this.user);
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
