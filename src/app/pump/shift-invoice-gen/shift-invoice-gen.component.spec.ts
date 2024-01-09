import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftInvoiceGenComponent } from './shift-invoice-gen.component';

describe('ShiftInvoiceGenComponent', () => {
  let component: ShiftInvoiceGenComponent;
  let fixture: ComponentFixture<ShiftInvoiceGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftInvoiceGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftInvoiceGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
