import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiVehCounterOrderComponent } from './taxi-veh-counter-order.component';

describe('TaxiVehCounterOrderComponent', () => {
  let component: TaxiVehCounterOrderComponent;
  let fixture: ComponentFixture<TaxiVehCounterOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxiVehCounterOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxiVehCounterOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
