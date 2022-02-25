import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadStockComponent } from './dead-stock.component';

describe('DeadStockComponent', () => {
  let component: DeadStockComponent;
  let fixture: ComponentFixture<DeadStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeadStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
