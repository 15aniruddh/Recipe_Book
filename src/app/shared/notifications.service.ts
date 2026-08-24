import { Injectable } from '@angular/core';

export interface AppNotification {
  message: string;
  timestamp: string;
}

const CLEARED_KEY = 'notificationsCleared';

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  { message: 'Adebayo Apercu sent you a message', timestamp: 'Yesterday' },
  { message: 'Oladele Tamilore replied your message', timestamp: 'Monday 22 October' },
  { message: '20 people added your recipe as a favourite', timestamp: 'Friday 19 October' },
];

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private cleared = localStorage.getItem(CLEARED_KEY) === '1';

  list(): AppNotification[] {
    return this.cleared ? [] : DEFAULT_NOTIFICATIONS;
  }

  clear() {
    this.cleared = true;
    localStorage.setItem(CLEARED_KEY, '1');
  }
}
