import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderProformaComponent } from './sales-order-proforma.component';

describe('SalesOrderProformaComponent', () => {
  let component: SalesOrderProformaComponent;
  let fixture: ComponentFixture<SalesOrderProformaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderProformaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
