import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellReportComponent } from './shell-report.component';

describe('ShellReportComponent', () => {
  let component: ShellReportComponent;
  let fixture: ComponentFixture<ShellReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
