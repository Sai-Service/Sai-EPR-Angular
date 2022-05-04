import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EwayBillInvoiceDataComponent } from './eway-bill-invoice-data.component';

describe('EwayBillInvoiceDataComponent', () => {
  let component: EwayBillInvoiceDataComponent;
  let fixture: ComponentFixture<EwayBillInvoiceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EwayBillInvoiceDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EwayBillInvoiceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
