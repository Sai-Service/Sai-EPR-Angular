import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderProformaChetakComponent } from './sales-order-proforma-chetak.component';

describe('SalesOrderProformaChetakComponent', () => {
  let component: SalesOrderProformaChetakComponent;
  let fixture: ComponentFixture<SalesOrderProformaChetakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderProformaChetakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderProformaChetakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
