import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  notification: NotificationService.AppNotification | null = null;
  private subscription: Subscription;

  constructor(private notificationService: NotificationService) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    console.log('ruenadng2');
    this.subscription.add(
      this.notificationService.notifications$.subscribe((notification) => {
        this.notification = notification;
        // Automatically clear the notification after a certain time
        setTimeout(() => this.clearNotification(), 5000);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clearNotification() {
    this.notification = null;
  }
}
