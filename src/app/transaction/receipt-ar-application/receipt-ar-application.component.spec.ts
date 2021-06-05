import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptArApplicationComponent } from './receipt-ar-application.component';

describe('ReceiptArApplicationComponent', () => {
  let component: ReceiptArApplicationComponent;
  let fixture: ComponentFixture<ReceiptArApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptArApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptArApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
