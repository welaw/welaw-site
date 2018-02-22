import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawItemVoteComponent } from './vote.component';

describe('LawItemVoteComponent', () => {
    let component: LawItemVoteComponent;
    let fixture: ComponentFixture<LawItemVoteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LawItemVoteComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LawItemVoteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
