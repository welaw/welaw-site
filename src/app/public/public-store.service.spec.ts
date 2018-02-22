import { TestBed, inject } from '@angular/core/testing';

import { PublicStoreService } from './public-store.service';

describe('PublicStoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PublicStoreService]
        });
    });

    it('should be created', inject([PublicStoreService], (service: PublicStoreService) => {
        expect(service).toBeTruthy();
    }));
});
