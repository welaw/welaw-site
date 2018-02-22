import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemSmallComponent } from './small.component';

describe('UserItemSmallComponent', () => {
    let component: UserItemSmallComponent;
    let fixture: ComponentFixture<UserItemSmallComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserItemSmallComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserItemSmallComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
