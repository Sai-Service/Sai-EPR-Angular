import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ARInvoiceComponent } from './arinvoice.component';

describe('ARInvoiceComponent', () => {
  let component: ARInvoiceComponent;
  let fixture: ComponentFixture<ARInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ARInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ARInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
