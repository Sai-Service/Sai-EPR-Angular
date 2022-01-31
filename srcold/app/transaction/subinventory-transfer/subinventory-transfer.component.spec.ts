import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubinventoryTransferComponent } from './subinventory-transfer.component';

describe('SubinventoryTransferComponent', () => {
  let component: SubinventoryTransferComponent;
  let fixture: ComponentFixture<SubinventoryTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubinventoryTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubinventoryTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
