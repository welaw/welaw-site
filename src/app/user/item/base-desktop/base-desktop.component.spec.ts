import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemBaseDesktopComponent } from './base-desktop.component';

describe('UserItemBaseDesktopComponent', () => {
    let component: UserItemBaseDesktopComponent;
    let fixture: ComponentFixture<UserItemBaseDesktopComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserItemBaseDesktopComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserItemBaseDesktopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
