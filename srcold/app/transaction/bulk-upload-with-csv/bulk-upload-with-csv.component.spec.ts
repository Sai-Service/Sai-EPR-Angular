import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadWithCsvComponent } from './bulk-upload-with-csv.component';

describe('BulkUploadWithCsvComponent', () => {
  let component: BulkUploadWithCsvComponent;
  let fixture: ComponentFixture<BulkUploadWithCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkUploadWithCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUploadWithCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
