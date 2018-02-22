import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpstreamItemSmallComponent } from './small.component';

describe('UpstreamItemSmallComponent', () => {
    let component: UpstreamItemSmallComponent;
    let fixture: ComponentFixture<UpstreamItemSmallComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UpstreamItemSmallComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UpstreamItemSmallComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
