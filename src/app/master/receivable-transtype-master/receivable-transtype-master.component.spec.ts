import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivableTranstypeMasterComponent } from './receivable-transtype-master.component';

describe('ReceivableTranstypeMasterComponent', () => {
  let component: ReceivableTranstypeMasterComponent;
  let fixture: ComponentFixture<ReceivableTranstypeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivableTranstypeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivableTranstypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
