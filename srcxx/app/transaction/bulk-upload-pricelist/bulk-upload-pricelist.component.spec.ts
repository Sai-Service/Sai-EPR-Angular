import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadPricelistComponent } from './bulk-upload-pricelist.component';

describe('BulkUploadPricelistComponent', () => {
  let component: BulkUploadPricelistComponent;
  let fixture: ComponentFixture<BulkUploadPricelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkUploadPricelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUploadPricelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
