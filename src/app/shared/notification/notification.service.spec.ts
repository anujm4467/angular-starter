import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationService } from './notification.service';
import { NotificationConfig } from './notification';

describe('NotificationService', () => {

  const matSnackBarMock = {
    openFromComponent: jasmine.createSpy('openFromComponent')
  };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NotificationService,
      { provide: MatSnackBar, useValue: matSnackBarMock }
    ]
  }));

  it('should be created', () => {
    const service: NotificationService = TestBed.inject(NotificationService);

    expect(service).toBeTruthy();
  });

  describe('show', () => {
    it('should be able call the snackBar.openFromComponent with params', () => {
      const service: NotificationService = TestBed.inject(NotificationService);
      const snackBar: MatSnackBar = TestBed.inject(MatSnackBar);

      const option: NotificationConfig = {
        message: 'Notify message!'
      };

      service.show(option);

      expect(snackBar.openFromComponent).toHaveBeenCalled();

    });
  });

});
