import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpCustomerMasterComponent } from './pump-customer-master.component';

describe('PumpCustomerMasterComponent', () => {
  let component: PumpCustomerMasterComponent;
  let fixture: ComponentFixture<PumpCustomerMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpCustomerMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpCustomerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
