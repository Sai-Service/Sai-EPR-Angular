import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantCreationMasterComponent } from './variant-creation-master.component';

describe('VariantCreationMasterComponent', () => {
  let component: VariantCreationMasterComponent;
  let fixture: ComponentFixture<VariantCreationMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantCreationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantCreationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
