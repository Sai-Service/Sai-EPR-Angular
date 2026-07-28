import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsUpdationComponent } from './order-details-updation.component';

describe('OrderDetailsUpdationComponent', () => {
  let component: OrderDetailsUpdationComponent;
  let fixture: ComponentFixture<OrderDetailsUpdationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailsUpdationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsUpdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
