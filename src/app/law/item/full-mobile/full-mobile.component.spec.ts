import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawItemFullMobileComponent } from './full-mobile.component';

describe('LawItemFullMobileComponent', () => {
    let component: LawItemFullMobileComponent;
    let fixture: ComponentFixture<LawItemFullMobileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LawItemFullMobileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LawItemFullMobileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
