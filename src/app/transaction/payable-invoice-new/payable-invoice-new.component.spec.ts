import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayableInvoiceNewComponent } from './payable-invoice-new.component';

describe('PayableInvoiceNewComponent', () => {
  let component: PayableInvoiceNewComponent;
  let fixture: ComponentFixture<PayableInvoiceNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayableInvoiceNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayableInvoiceNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
