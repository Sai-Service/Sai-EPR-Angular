import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantWithPriceMasterComponent } from './variant-with-price-master.component';

describe('VariantWithPriceMasterComponent', () => {
  let component: VariantWithPriceMasterComponent;
  let fixture: ComponentFixture<VariantWithPriceMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantWithPriceMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantWithPriceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
