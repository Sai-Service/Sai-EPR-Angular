import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpSubinventoryTransferComponent } from './pump-subinventory-transfer.component';

describe('PumpSubinventoryTransferComponent', () => {
  let component: PumpSubinventoryTransferComponent;
  let fixture: ComponentFixture<PumpSubinventoryTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpSubinventoryTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpSubinventoryTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
