import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiPoReportsComponent } from './taxi-po-reports.component';

describe('TaxiPoReportsComponent', () => {
  let component: TaxiPoReportsComponent;
  let fixture: ComponentFixture<TaxiPoReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxiPoReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxiPoReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
