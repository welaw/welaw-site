import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpstreamsComponent } from './upstreams.component';

describe('UpstreamsComponent', () => {
  let component: UpstreamsComponent;
  let fixture: ComponentFixture<UpstreamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpstreamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpstreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
