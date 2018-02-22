import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemMediumComponent } from './medium.component';

describe('UserItemMediumComponent', () => {
    let component: UserItemMediumComponent;
    let fixture: ComponentFixture<UserItemMediumComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserItemMediumComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserItemMediumComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
