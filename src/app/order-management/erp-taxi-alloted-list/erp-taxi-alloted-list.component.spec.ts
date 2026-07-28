import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpTaxiAllotedListComponent } from './erp-taxi-alloted-list.component';

describe('ErpTaxiAllotedListComponent', () => {
  let component: ErpTaxiAllotedListComponent;
  let fixture: ComponentFixture<ErpTaxiAllotedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErpTaxiAllotedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErpTaxiAllotedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
