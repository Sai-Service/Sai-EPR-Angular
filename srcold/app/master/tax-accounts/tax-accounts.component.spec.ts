import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxAccountsComponent } from './tax-accounts.component';

describe('TaxAccountsComponent', () => {
  let component: TaxAccountsComponent;
  let fixture: ComponentFixture<TaxAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
