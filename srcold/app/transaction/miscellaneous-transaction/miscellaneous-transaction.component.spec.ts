import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousTransactionComponent } from './miscellaneous-transaction.component';

describe('MiscellaneousTransactionComponent', () => {
  let component: MiscellaneousTransactionComponent;
  let fixture: ComponentFixture<MiscellaneousTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
