import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLawsComponent } from './laws.component';

describe('UserLawsComponent', () => {
    let component: UserLawsComponent;
    let fixture: ComponentFixture<UserLawsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserLawsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserLawsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
