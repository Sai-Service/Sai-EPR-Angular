import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EwayBillCustomerNoWiseComponent } from './eway-bill-customer-no-wise.component';

describe('EwayBillCustomerNoWiseComponent', () => {
  let component: EwayBillCustomerNoWiseComponent;
  let fixture: ComponentFixture<EwayBillCustomerNoWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EwayBillCustomerNoWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EwayBillCustomerNoWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
