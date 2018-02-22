import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemVoteDesktopComponent } from './vote-desktop.component';

describe('UserItemVoteDesktopComponent', () => {
    let component: UserItemVoteDesktopComponent;
    let fixture: ComponentFixture<UserItemVoteDesktopComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserItemVoteDesktopComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserItemVoteDesktopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
