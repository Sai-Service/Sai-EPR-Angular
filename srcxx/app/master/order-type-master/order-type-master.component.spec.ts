import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeMasterComponent } from './order-type-master.component';

describe('OrderTypeMasterComponent', () => {
  let component: OrderTypeMasterComponent;
  let fixture: ComponentFixture<OrderTypeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTypeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
