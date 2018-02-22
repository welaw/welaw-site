import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawMakersComponent } from './lawmakers.component';

describe('LawMakersComponent', () => {
    let component: LawMakersComponent;
    let fixture: ComponentFixture<LawMakersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LawMakersComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LawMakersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
