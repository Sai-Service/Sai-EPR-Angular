import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpPurchaseOrderComponent } from './pump-purchase-order.component';

describe('PumpPurchaseOrderComponent', () => {
  let component: PumpPurchaseOrderComponent;
  let fixture: ComponentFixture<PumpPurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpPurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
