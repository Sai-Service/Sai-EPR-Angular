import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxCategoryMasterComponent } from './tax-category-master.component';

describe('TaxCategoryMasterComponent', () => {
  let component: TaxCategoryMasterComponent;
  let fixture: ComponentFixture<TaxCategoryMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxCategoryMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxCategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
