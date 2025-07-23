import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsPurchaseOrderComponent } from './tools-purchase-order.component';

describe('ToolsPurchaseOrderComponent', () => {
  let component: ToolsPurchaseOrderComponent;
  let fixture: ComponentFixture<ToolsPurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsPurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
