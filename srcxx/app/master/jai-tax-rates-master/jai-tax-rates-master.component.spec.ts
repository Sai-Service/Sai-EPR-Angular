import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JaiTaxRatesMasterComponent } from './jai-tax-rates-master.component';

describe('JaiTaxRatesMasterComponent', () => {
  let component: JaiTaxRatesMasterComponent;
  let fixture: ComponentFixture<JaiTaxRatesMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JaiTaxRatesMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JaiTaxRatesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
