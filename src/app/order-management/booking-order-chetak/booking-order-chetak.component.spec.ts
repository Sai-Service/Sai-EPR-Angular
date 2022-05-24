import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingOrderChetakComponent } from './booking-order-chetak.component';

describe('BookingOrderChetakComponent', () => {
  let component: BookingOrderChetakComponent;
  let fixture: ComponentFixture<BookingOrderChetakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingOrderChetakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingOrderChetakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
