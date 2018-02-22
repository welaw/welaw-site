import { TestBed, inject } from '@angular/core/testing';

import { AuthStoreService } from './auth-store.service';

describe('AuthStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthStoreService]
    });
  });

  it('should be created', inject([AuthStoreService], (service: AuthStoreService) => {
    expect(service).toBeTruthy();
  }));
});
