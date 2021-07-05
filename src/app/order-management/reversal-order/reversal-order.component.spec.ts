import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversalOrderComponent } from './reversal-order.component';

describe('ReversalOrderComponent', () => {
  let component: ReversalOrderComponent;
  let fixture: ComponentFixture<ReversalOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReversalOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReversalOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
