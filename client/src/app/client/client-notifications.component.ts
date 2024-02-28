import { Component } from '@angular/core';
import { ConfigService } from '../config.service';

type Notification = {
  type: string;
  date: Date;
  id: string;
};

@Component({
  selector: 'client-notifications',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-12 p-3">
          <div class="card">
            <div class="card-body">
              <h1
                class="card-title"
                style="text-transform: uppercase; font-weight: bold; font-size: 1.5em"
              >
                Notifications
              </h1>
              <div *ngIf="!isLoading">
                <p *ngIf="notifications.length == 0">Pas de notification.</p>
                <div *ngFor="let notification of notifications">
                  <div
                    *ngIf="notification.type == 'offer'"
                    class="d-flex justify-content-between border-bottom p-3"
                  >
                    <p>
                      <strong class="d-bock"> 🎁 Offre spéciale 🎁 </strong>
                      Ne rattez nos <a href="/client/services">promotions</a>.
                    </p>
                    <p>({{ notification.date | relativeTime }})</p>
                  </div>
                  <div
                    *ngIf="notification.type == 'appointment'"
                    class="d-flex justify-content-between border-bottom p-3"
                  >
                    <p>
                      <strong class="d-bock"> 📍 Rendez-vous 📍 </strong>
                      Ne rattez votre
                      <a href="/client/payment/{{ notification.id }}"
                        >rendez-vous</a
                      >
                      le {{ notification.date | date : 'fullDate' }}.
                    </p>
                    <p>({{ notification.date | relativeTime }})</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ClientNotificationsComponent {
  notifications: Notification[] = [];
  isLoading = true;

  apiUrl: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
  }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    try {
      const userId = localStorage.getItem('userId');

      fetch(`${this.apiUrl}/users/notifications/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          this.notifications = data;
          this.isLoading = false;
          console.log(this.notifications);
        });
    } catch (error) {
      console.log(error);
    }
  }
}
