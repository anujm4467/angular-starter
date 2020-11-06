import { TestBed } from '@angular/core/testing';
import { LoggerService } from '../logger';

import { AppErrorHandler } from './app-error-handler';

describe('AppErrorHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppErrorHandler,
        { provide: LoggerService, useValue: {} }
      ]
    });
  });

  it('should be created', () => {
    const appErrorHandler: AppErrorHandler = TestBed.inject(AppErrorHandler);
    expect(appErrorHandler).toBeTruthy();
  });

});
