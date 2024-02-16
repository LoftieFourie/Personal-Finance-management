// notification.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject =
    new Subject<NotificationService.AppNotification>();

  get notifications$() {
    return this.notificationSubject.asObservable();
  }

  success(message: string) {
    console.log('running');
    this.notificationSubject.next({ type: 'success', message });
  }

  error(message: string) {
    this.notificationSubject.next({ type: 'error', message });
  }
}

export namespace NotificationService {
  export interface AppNotification {
    type: 'success' | 'error';
    message: string;
  }
}
