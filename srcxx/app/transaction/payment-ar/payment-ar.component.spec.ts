import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentArComponent } from './payment-ar.component';

describe('PaymentArComponent', () => {
  let component: PaymentArComponent;
  let fixture: ComponentFixture<PaymentArComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentArComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentArComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
