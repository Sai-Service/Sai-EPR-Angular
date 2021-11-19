import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantMasterComponent } from './variant-master.component';

describe('VariantMasterComponent', () => {
  let component: VariantMasterComponent;
  let fixture: ComponentFixture<VariantMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
