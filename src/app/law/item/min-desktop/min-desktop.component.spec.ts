import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawItemMinDesktopComponent } from './min-desktop.component';

describe('LawItemMinDesktopComponent', () => {
    let component: LawItemMinDesktopComponent;
    let fixture: ComponentFixture<LawItemMinDesktopComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LawItemMinDesktopComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LawItemMinDesktopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
