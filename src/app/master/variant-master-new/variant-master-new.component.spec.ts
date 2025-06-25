import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantMasterNewComponent } from './variant-master-new.component';

describe('VariantMasterNewComponent', () => {
  let component: VariantMasterNewComponent;
  let fixture: ComponentFixture<VariantMasterNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantMasterNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantMasterNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
