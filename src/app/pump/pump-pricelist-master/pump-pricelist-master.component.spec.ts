import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpPricelistMasterComponent } from './pump-pricelist-master.component';

describe('PumpPricelistMasterComponent', () => {
  let component: PumpPricelistMasterComponent;
  let fixture: ComponentFixture<PumpPricelistMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpPricelistMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpPricelistMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
