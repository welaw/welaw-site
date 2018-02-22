import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpstreamLawsComponent } from './laws.component';

describe('UpstreamLawsComponent', () => {
    let component: UpstreamLawsComponent;
    let fixture: ComponentFixture<UpstreamLawsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UpstreamLawsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UpstreamLawsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
