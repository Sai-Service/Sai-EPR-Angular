import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivableReceiptComponent } from './receivable-receipt.component';

describe('ReceivableReceiptComponent', () => {
  let component: ReceivableReceiptComponent;
  let fixture: ComponentFixture<ReceivableReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivableReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivableReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
