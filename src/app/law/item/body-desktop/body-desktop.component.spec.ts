import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawItemBodyDesktopComponent } from './body-desktop.component';

describe('LawItemBodyDesktopComponent', () => {
    let component: LawItemBodyDesktopComponent;
    let fixture: ComponentFixture<LawItemBodyDesktopComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LawItemBodyDesktopComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LawItemBodyDesktopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
