import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAndAddonPriceUploadComponent } from './vehicle-and-addon-price-upload.component';

describe('VehicleAndAddonPriceUploadComponent', () => {
  let component: VehicleAndAddonPriceUploadComponent;
  let fixture: ComponentFixture<VehicleAndAddonPriceUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleAndAddonPriceUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleAndAddonPriceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
