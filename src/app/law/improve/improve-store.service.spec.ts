import { TestBed, inject } from '@angular/core/testing';

import { ImproveStoreService } from './improve-store.service';

describe('ImproveStoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ImproveStoreService]
        });
    });

    it('should be created', inject([ImproveStoreService], (service: ImproveStoreService) => {
        expect(service).toBeTruthy();
    }));
});
