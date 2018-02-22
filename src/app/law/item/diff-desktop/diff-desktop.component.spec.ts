import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawItemDiffDesktopComponent } from './diff-desktop.component';

describe('LawItemDiffDesktopComponent', () => {
    let component: LawItemDiffDesktopComponent;
    let fixture: ComponentFixture<LawItemDiffDesktopComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LawItemDiffDesktopComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LawItemDiffDesktopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
