import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCancellationUploadComponent } from './order-cancellation-upload.component';

describe('OrderCancellationUploadComponent', () => {
  let component: OrderCancellationUploadComponent;
  let fixture: ComponentFixture<OrderCancellationUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCancellationUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCancellationUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
