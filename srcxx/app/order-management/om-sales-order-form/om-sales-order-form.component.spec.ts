import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmSalesOrderFormComponent } from './om-sales-order-form.component';

describe('OmSalesOrderFormComponent', () => {
  let component: OmSalesOrderFormComponent;
  let fixture: ComponentFixture<OmSalesOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmSalesOrderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmSalesOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
