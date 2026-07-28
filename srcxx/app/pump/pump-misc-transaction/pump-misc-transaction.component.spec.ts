import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpMiscTransactionComponent } from './pump-misc-transaction.component';

describe('PumpMiscTransactionComponent', () => {
  let component: PumpMiscTransactionComponent;
  let fixture: ComponentFixture<PumpMiscTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpMiscTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpMiscTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
