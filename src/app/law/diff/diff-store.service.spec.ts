import { TestBed, inject } from '@angular/core/testing';

import { DiffStoreService } from './diff-store.service';

describe('DiffStoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DiffStoreService]
        });
    });

    it('should be created', inject([DiffStoreService], (service: DiffStoreService) => {
        expect(service).toBeTruthy();
    }));
});
