import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentARComponent } from './payment-ar.component';

describe('PaymentARComponent', () => {
  let component: PaymentARComponent;
  let fixture: ComponentFixture<PaymentARComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentARComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentARComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
