import { TestBed } from '@angular/core/testing';

import { AppErrorHandler } from './app-error-handler';

describe('AppErrorHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppErrorHandler
      ]
    });
  });

  it('should be created', () => {
    const appErrorHandler: AppErrorHandler = TestBed.inject(AppErrorHandler);
    expect(appErrorHandler).toBeTruthy();
  });

});
