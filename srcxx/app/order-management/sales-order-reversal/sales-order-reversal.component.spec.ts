import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderReversalComponent } from './sales-order-reversal.component';

describe('SalesOrderReversalComponent', () => {
  let component: SalesOrderReversalComponent;
  let fixture: ComponentFixture<SalesOrderReversalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderReversalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderReversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
