import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptWriteoffComponent } from './receipt-writeoff.component';

describe('ReceiptWriteoffComponent', () => {
  let component: ReceiptWriteoffComponent;
  let fixture: ComponentFixture<ReceiptWriteoffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptWriteoffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptWriteoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
