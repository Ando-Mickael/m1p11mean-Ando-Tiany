import { Component } from '@angular/core';

type Notification = {
  type: string;
  date: Date;
  id: string;
};

@Component({
  selector: 'client-notifications',
  template: `
    <div>
      <h2>Notifications</h2>
      <div *ngIf="!isLoading">
        <ul *ngFor="let notification of notifications">
          <li>
            {{ notification.type }} : {{ notification.date | relativeTime }}
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class ClientNotificationsComponent {
  notifications: Notification[] = [];
  isLoading = true;

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    try {
      const userId = localStorage.getItem('userId');

      fetch(`http://localhost:3000/users/notifications/${userId}`)
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
