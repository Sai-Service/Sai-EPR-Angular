import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintPoReceiptComponent } from './paint-po-receipt.component';

describe('PaintPoReceiptComponent', () => {
  let component: PaintPoReceiptComponent;
  let fixture: ComponentFixture<PaintPoReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintPoReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintPoReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
