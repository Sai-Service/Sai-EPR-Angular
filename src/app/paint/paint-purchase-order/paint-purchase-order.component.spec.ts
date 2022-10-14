import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintPurchaseOrderComponent } from './paint-purchase-order.component';

describe('PaintPurchaseOrderComponent', () => {
  let component: PaintPurchaseOrderComponent;
  let fixture: ComponentFixture<PaintPurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintPurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
