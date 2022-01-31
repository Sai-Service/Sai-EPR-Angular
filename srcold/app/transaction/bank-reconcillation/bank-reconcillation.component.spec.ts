import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankReconcillationComponent } from './bank-reconcillation.component';

describe('BankReconcillationComponent', () => {
  let component: BankReconcillationComponent;
  let fixture: ComponentFixture<BankReconcillationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankReconcillationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankReconcillationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
