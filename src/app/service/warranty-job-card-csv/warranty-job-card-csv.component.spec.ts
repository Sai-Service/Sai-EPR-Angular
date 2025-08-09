import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyJobCardCSVComponent } from './warranty-job-card-csv.component';

describe('WarrantyJobCardCSVComponent', () => {
  let component: WarrantyJobCardCSVComponent;
  let fixture: ComponentFixture<WarrantyJobCardCSVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantyJobCardCSVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyJobCardCSVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
