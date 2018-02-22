import { TestBed, inject } from '@angular/core/testing';

import { UpstreamStoreService } from './upstream-store.service';

describe('UpstreamStoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UpstreamStoreService]
        });
    });

    it('should be created', inject([UpstreamStoreService], (service: UpstreamStoreService) => {
        expect(service).toBeTruthy();
    }));
});
