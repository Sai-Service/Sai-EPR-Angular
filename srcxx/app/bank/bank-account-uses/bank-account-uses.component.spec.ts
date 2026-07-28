import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountUsesComponent } from './bank-account-uses.component';

describe('BankAccountUsesComponent', () => {
  let component: BankAccountUsesComponent;
  let fixture: ComponentFixture<BankAccountUsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankAccountUsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountUsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
