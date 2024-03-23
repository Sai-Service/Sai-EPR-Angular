import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpPoReceiptComponent } from './pump-po-receipt.component';

describe('PumpPoReceiptComponent', () => {
  let component: PumpPoReceiptComponent;
  let fixture: ComponentFixture<PumpPoReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpPoReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpPoReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
