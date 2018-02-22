import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawItemFullDesktopComponent } from './full-desktop.component';

describe('LawItemFullDesktopComponent', () => {
    let component: LawItemFullDesktopComponent;
    let fixture: ComponentFixture<LawItemFullDesktopComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LawItemFullDesktopComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LawItemFullDesktopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
