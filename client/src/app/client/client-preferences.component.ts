// preferences.component.ts
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { ServiceService } from '../services/service.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'client-preferences',
  template: `
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10 ftco-animate">
            <div>
              <h2>Modifier mes Préférences</h2>
              <form (ngSubmit)="onSubmit()">
                <div class="form-group">
                  <label for="servicePreferred">Service Préféré:</label>
                  <select
                    id="servicePreferred"
                    [(ngModel)]="selectedService"
                    name="servicePreferred"
                    class="form-control"
                  >
                    <option
                      *ngFor="let service of services"
                      [value]="service._id"
                    >
                      {{ service.name }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="employeePreferred">Employé Préféré:</label>
                  <select
                    id="employeePreferred"
                    [(ngModel)]="selectedEmployee"
                    name="employeePreferred"
                    class="form-control"
                  >
                    <option
                      *ngFor="let employee of employees"
                      [value]="employee._id"
                    >
                      {{ employee.firstName }} {{ employee.lastName }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <button type="submit" class="btn btn-primary">Valider</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ClientPreferencesComponent implements OnInit {
  selectedService: string = '';
  selectedEmployee: string = '';
  services: any[] = [];
  employees: any[] = [];

  constructor(
    private userService: UserService,
    private serviceService: ServiceService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.loadServices();
    this.loadEmployees();
    this.loadUserAndPreferences();
  }

  loadServices() {
    this.serviceService.getServices().subscribe(
      (services) => {
        this.services = services;
      },
      (error) => {
        console.error('Error loading services', error);
      }
    );
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        this.employees = employees;
      },
      (error) => {
        console.error('Error loading employees', error);
      }
    );
  }

  loadUserAndPreferences() {
    const token = localStorage.getItem('token');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

    this.userService.getUserById(userId).subscribe(
      (user: any) => {
        this.selectedService = String(user.preferences.servicePreferred);
        this.selectedEmployee = String(user.preferences.employeePreferred);
      },
      (error) => {
        console.error('Error loading user and preferences', error);
      }
    );
  }

  onSubmit() {
    const token = localStorage.getItem('token');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

    if (userId) {
      const updatedUser = {
        preferences: {
          servicePreferred: this.selectedService,
          employeePreferred: this.selectedEmployee,
        },
      };

      this.userService.updateUser(userId, updatedUser).subscribe(
        () => {
          console.log('User updated successfully');
          // You can handle success, e.g., show a success message
        },
        (error) => {
          console.error('Error updating user', error);
          // You can handle errors, e.g., show an error message
        }
      );
    } else {
      console.error('User ID not found in the token.');
      // Handle the case where user ID is not found in the token
    }
  }
}
