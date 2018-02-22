import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteDesktopComponent } from './vote-desktop.component';

describe('VoteDesktopComponent', () => {
  let component: VoteDesktopComponent;
  let fixture: ComponentFixture<VoteDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
