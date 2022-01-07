import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JaiTaxCategoryLineComponent } from './jai-tax-category-line.component';

describe('JaiTaxCategoryLineComponent', () => {
  let component: JaiTaxCategoryLineComponent;
  let fixture: ComponentFixture<JaiTaxCategoryLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JaiTaxCategoryLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JaiTaxCategoryLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
