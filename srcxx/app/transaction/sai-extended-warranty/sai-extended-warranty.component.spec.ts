import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaiExtendedWarrantyComponent } from './sai-extended-warranty.component';

describe('SaiExtendedWarrantyComponent', () => {
  let component: SaiExtendedWarrantyComponent;
  let fixture: ComponentFixture<SaiExtendedWarrantyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaiExtendedWarrantyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaiExtendedWarrantyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
