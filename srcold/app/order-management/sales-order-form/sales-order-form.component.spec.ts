import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderFormComponent } from './sales-order-form.component';

describe('SalesOrderFormComponent', () => {
  let component: SalesOrderFormComponent;
  let fixture: ComponentFixture<SalesOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
