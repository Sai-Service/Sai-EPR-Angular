import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGenerationComponent } from './order-generation.component';

describe('OrderGenerationComponent', () => {
  let component: OrderGenerationComponent;
  let fixture: ComponentFixture<OrderGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
