import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdsInvoiceComponent } from './tds-invoice.component';

describe('TdsInvoiceComponent', () => {
  let component: TdsInvoiceComponent;
  let fixture: ComponentFixture<TdsInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdsInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdsInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
