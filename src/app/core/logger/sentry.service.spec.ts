import { TestBed } from '@angular/core/testing';

import { SentryService } from './sentry.service';

describe('SentryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SentryService = TestBed.inject(SentryService);
    expect(service).toBeTruthy();
  });
});
