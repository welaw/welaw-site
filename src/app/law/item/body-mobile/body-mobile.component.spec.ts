import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawItemBodyMobileComponent } from './body-mobile.component';

describe('LawItemBodyMobileComponent', () => {
  let component: LawItemBodyMobileComponent;
  let fixture: ComponentFixture<LawItemBodyMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawItemBodyMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawItemBodyMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
