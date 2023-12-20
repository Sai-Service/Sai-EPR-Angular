import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpShiftPumpNewComponent } from './pump-shift-pump-new.component';

describe('PumpShiftPumpNewComponent', () => {
  let component: PumpShiftPumpNewComponent;
  let fixture: ComponentFixture<PumpShiftPumpNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpShiftPumpNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpShiftPumpNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
