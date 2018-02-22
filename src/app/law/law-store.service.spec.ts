import { TestBed, inject } from '@angular/core/testing';

import { LawStoreService } from './law-store.service';

describe('LawStoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LawStoreService]
        });
    });

    it('should be created', inject([LawStoreService], (service: LawStoreService) => {
        expect(service).toBeTruthy();
    }));
});
