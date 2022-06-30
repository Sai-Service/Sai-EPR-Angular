import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleBookingUploadComponent } from './vehicle-booking-upload.component';

describe('VehicleBookingUploadComponent', () => {
  let component: VehicleBookingUploadComponent;
  let fixture: ComponentFixture<VehicleBookingUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleBookingUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleBookingUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
