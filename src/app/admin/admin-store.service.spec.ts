import { TestBed, inject } from '@angular/core/testing';

import { AdminStoreService } from './admin-store.service';

describe('AdminStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminStoreService]
    });
  });

  it('should be created', inject([AdminStoreService], (service: AdminStoreService) => {
    expect(service).toBeTruthy();
  }));
});
