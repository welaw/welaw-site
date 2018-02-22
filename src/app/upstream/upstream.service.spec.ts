import { TestBed, inject } from '@angular/core/testing';

import { UpstreamService } from './upstream.service';

describe('UpstreamService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UpstreamService]
        });
    });

    it('should be created', inject([UpstreamService], (service: UpstreamService) => {
        expect(service).toBeTruthy();
    }));
});
