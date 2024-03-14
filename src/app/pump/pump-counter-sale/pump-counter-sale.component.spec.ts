import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpCounterSaleComponent } from './pump-counter-sale.component';

describe('PumpCounterSaleComponent', () => {
  let component: PumpCounterSaleComponent;
  let fixture: ComponentFixture<PumpCounterSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpCounterSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpCounterSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
