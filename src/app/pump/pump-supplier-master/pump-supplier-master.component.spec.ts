import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpSupplierMasterComponent } from './pump-supplier-master.component';

describe('PumpSupplierMasterComponent', () => {
  let component: PumpSupplierMasterComponent;
  let fixture: ComponentFixture<PumpSupplierMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpSupplierMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpSupplierMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
