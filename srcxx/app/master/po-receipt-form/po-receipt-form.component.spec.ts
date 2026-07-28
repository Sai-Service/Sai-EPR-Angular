import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoReceiptFormComponent } from './po-receipt-form.component';

describe('PoReceiptFormComponent', () => {
  let component: PoReceiptFormComponent;
  let fixture: ComponentFixture<PoReceiptFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoReceiptFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
