import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawItemMinMobileComponent } from './min-mobile.component';

describe('LawItemMinMobileComponent', () => {
    let component: LawItemMinMobileComponent;
    let fixture: ComponentFixture<LawItemMinMobileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LawItemMinMobileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LawItemMinMobileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
