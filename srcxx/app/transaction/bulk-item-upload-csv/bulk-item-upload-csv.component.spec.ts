import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkItemUploadCSVComponent } from './bulk-item-upload-csv.component';

describe('BulkItemUploadCSVComponent', () => {
  let component: BulkItemUploadCSVComponent;
  let fixture: ComponentFixture<BulkItemUploadCSVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkItemUploadCSVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkItemUploadCSVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
