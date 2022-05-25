import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBookingChetakComponent } from './order-booking-chetak.component';

describe('OrderBookingChetakComponent', () => {
  let component: OrderBookingChetakComponent;
  let fixture: ComponentFixture<OrderBookingChetakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBookingChetakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBookingChetakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
