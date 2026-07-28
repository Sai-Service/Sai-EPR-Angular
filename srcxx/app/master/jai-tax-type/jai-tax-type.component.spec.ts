import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JaiTaxTypeComponent } from './jai-tax-type.component';

describe('JaiTaxTypeComponent', () => {
  let component: JaiTaxTypeComponent;
  let fixture: ComponentFixture<JaiTaxTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JaiTaxTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JaiTaxTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
