import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawItemListDesktopComponent } from './list-desktop.component';

describe('LawItemListDesktopComponent', () => {
    let component: LawItemListDesktopComponent;
    let fixture: ComponentFixture<LawItemListDesktopComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LawItemListDesktopComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LawItemListDesktopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
