import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxiVehiclePurchaseOrderFromComponent } from './txi-vehicle-purchase-order-from.component';

describe('TxiVehiclePurchaseOrderFromComponent', () => {
  let component: TxiVehiclePurchaseOrderFromComponent;
  let fixture: ComponentFixture<TxiVehiclePurchaseOrderFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxiVehiclePurchaseOrderFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxiVehiclePurchaseOrderFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
