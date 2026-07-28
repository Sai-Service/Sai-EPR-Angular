import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsReportsComponent } from './tools-reports.component';

describe('ToolsReportsComponent', () => {
  let component: ToolsReportsComponent;
  let fixture: ComponentFixture<ToolsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
