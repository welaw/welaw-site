import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawPageComponent } from './page.component';

describe('LawPageComponent', () => {
    let component: LawPageComponent;
    let fixture: ComponentFixture<LawPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LawPageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LawPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
