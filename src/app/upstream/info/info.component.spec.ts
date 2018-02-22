import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpstreamInfoComponent } from './info.component';

describe('UpstreamInfoComponent', () => {
    let component: UpstreamInfoComponent;
    let fixture: ComponentFixture<UpstreamInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UpstreamInfoComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UpstreamInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
