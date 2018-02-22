import { TestBed, inject } from '@angular/core/testing';

import { CommentStoreService } from './comment-store.service';

describe('CommentStoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CommentStoreService]
        });
    });

    it('should be created', inject([CommentStoreService], (service: CommentStoreService) => {
        expect(service).toBeTruthy();
    }));
});
