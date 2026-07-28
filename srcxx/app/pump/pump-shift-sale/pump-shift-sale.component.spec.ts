import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpShiftSaleComponent } from './pump-shift-sale.component';

describe('PumpShiftSaleComponent', () => {
  let component: PumpShiftSaleComponent;
  let fixture: ComponentFixture<PumpShiftSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpShiftSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpShiftSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
