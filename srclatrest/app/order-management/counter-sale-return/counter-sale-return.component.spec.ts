import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterSaleReturnComponent } from './counter-sale-return.component';

describe('CounterSaleReturnComponent', () => {
  let component: CounterSaleReturnComponent;
  let fixture: ComponentFixture<CounterSaleReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterSaleReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterSaleReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
