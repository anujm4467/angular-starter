import { TestBed } from '@angular/core/testing';

import { NetworkService } from './network.service';

describe('NetworkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkService]
    });
  });

  it('should be created', () => {
    const service: NetworkService = TestBed.inject(NetworkService);

    expect(service).toBeTruthy();
  });

});
