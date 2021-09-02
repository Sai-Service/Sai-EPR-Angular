import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashBankTransferComponent } from './cash-bank-transfer.component';

describe('CashBankTransferComponent', () => {
  let component: CashBankTransferComponent;
  let fixture: ComponentFixture<CashBankTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashBankTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashBankTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
