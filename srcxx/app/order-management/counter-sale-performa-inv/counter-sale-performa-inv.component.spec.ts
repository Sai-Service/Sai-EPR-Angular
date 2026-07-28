import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterSalePerformaInvComponent } from './counter-sale-performa-inv.component';

describe('CounterSalePerformaInvComponent', () => {
  let component: CounterSalePerformaInvComponent;
  let fixture: ComponentFixture<CounterSalePerformaInvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterSalePerformaInvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterSalePerformaInvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
