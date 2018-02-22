import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawItemListMobileComponent } from './list-mobile.component';

describe('LawItemListMobileComponent', () => {
  let component: LawItemListMobileComponent;
  let fixture: ComponentFixture<LawItemListMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawItemListMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawItemListMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
