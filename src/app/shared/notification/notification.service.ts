import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { NotificationComponent } from './notification.component';
import { NotificationConfig } from './notification';

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) { }

  success() {

  }

  public show(options: NotificationConfig) {
    const type = options.type || 'info';
    const duration = options.config ? options.config.duration : -1;

    let panelClass = '';
    switch (options.type) {
      case 'error':
        panelClass = 'error-notification';
        break;

      case 'info':
        panelClass = 'info-notification';
        break;

      case 'success':
        panelClass = 'success-notification';
        break;

      case 'warn':
        panelClass = 'warning-notification';
        break;
    }

    const config: MatSnackBarConfig = {
      duration: -1,
      panelClass,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      data: {
        message: options.message,
        title: options.title,
        action: options.action,
        image: options.image,
        type,
        duration
      },
      ...options.config
    };

    this.snackBar.openFromComponent(NotificationComponent, config);
  }
}
