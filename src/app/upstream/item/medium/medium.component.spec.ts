import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpstreamItemMediumComponent } from './medium.component';

describe('UpstreamItemMediumComponent', () => {
    let component: UpstreamItemMediumComponent;
    let fixture: ComponentFixture<UpstreamItemMediumComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UpstreamItemMediumComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UpstreamItemMediumComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
