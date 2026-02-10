import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptMethodComponent } from './receipt-method.component';

describe('ReceiptMethodComponent', () => {
  let component: ReceiptMethodComponent;
  let fixture: ComponentFixture<ReceiptMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
