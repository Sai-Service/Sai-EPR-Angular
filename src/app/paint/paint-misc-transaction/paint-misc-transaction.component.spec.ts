import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintMiscTransactionComponent } from './paint-misc-transaction.component';

describe('PaintMiscTransactionComponent', () => {
  let component: PaintMiscTransactionComponent;
  let fixture: ComponentFixture<PaintMiscTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintMiscTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintMiscTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
