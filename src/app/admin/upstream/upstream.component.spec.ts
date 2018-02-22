import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpstreamComponent } from './upstream.component';

describe('AdminUpstreamComponent', () => {
  let component: AdminUpstreamComponent;
  let fixture: ComponentFixture<AdminUpstreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUpstreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpstreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
