import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualSalesGatepassComponent } from './manual-sales-gatepass.component';

describe('ManualSalesGatepassComponent', () => {
  let component: ManualSalesGatepassComponent;
  let fixture: ComponentFixture<ManualSalesGatepassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualSalesGatepassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualSalesGatepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
