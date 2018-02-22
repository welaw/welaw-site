import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawItemAuthorDesktopComponent } from './author-desktop.component';

describe('LawItemAuthorDesktopComponent', () => {
    let component: LawItemAuthorDesktopComponent;
    let fixture: ComponentFixture<LawItemAuthorDesktopComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LawItemAuthorDesktopComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LawItemAuthorDesktopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
