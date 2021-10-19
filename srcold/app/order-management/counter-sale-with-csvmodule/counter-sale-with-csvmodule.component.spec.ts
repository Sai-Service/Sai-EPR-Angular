import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterSaleWithCSVModuleComponent } from './counter-sale-with-csvmodule.component';

describe('CounterSaleWithCSVModuleComponent', () => {
  let component: CounterSaleWithCSVModuleComponent;
  let fixture: ComponentFixture<CounterSaleWithCSVModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterSaleWithCSVModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterSaleWithCSVModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
