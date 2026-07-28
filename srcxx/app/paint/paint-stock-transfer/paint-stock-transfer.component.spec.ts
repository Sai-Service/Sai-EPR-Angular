import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintStockTransferComponent } from './paint-stock-transfer.component';

describe('PaintStockTransferComponent', () => {
  let component: PaintStockTransferComponent;
  let fixture: ComponentFixture<PaintStockTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintStockTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintStockTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
