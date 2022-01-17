import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRelationMasterComponent } from './customer-relation-master.component';

describe('CustomerRelationMasterComponent', () => {
  let component: CustomerRelationMasterComponent;
  let fixture: ComponentFixture<CustomerRelationMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRelationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRelationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
