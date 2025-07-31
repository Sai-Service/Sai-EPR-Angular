import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArInvoiceInsComponent } from './ar-invoice-ins.component';

describe('ArInvoiceInsComponent', () => {
  let component: ArInvoiceInsComponent;
  let fixture: ComponentFixture<ArInvoiceInsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArInvoiceInsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArInvoiceInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
