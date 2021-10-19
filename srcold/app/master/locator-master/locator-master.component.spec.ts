import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorMasterComponent } from './locator-master.component';

describe('LocatorMasterComponent', () => {
  let component: LocatorMasterComponent;
  let fixture: ComponentFixture<LocatorMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatorMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
