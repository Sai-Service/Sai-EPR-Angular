import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderBookingComponent } from './sales-order-booking.component';

describe('SalesOrderBookingComponent', () => {
  let component: SalesOrderBookingComponent;
  let fixture: ComponentFixture<SalesOrderBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
