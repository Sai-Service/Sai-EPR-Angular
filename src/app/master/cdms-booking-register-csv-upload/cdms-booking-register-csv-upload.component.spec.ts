import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsBookingRegisterCsvUploadComponent } from './cdms-booking-register-csv-upload.component';

describe('CdmsBookingRegisterCsvUploadComponent', () => {
  let component: CdmsBookingRegisterCsvUploadComponent;
  let fixture: ComponentFixture<CdmsBookingRegisterCsvUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdmsBookingRegisterCsvUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsBookingRegisterCsvUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
