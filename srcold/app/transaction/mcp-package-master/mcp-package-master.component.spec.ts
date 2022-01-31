import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McpPackageMasterComponent } from './mcp-package-master.component';

describe('McpPackageMasterComponent', () => {
  let component: McpPackageMasterComponent;
  let fixture: ComponentFixture<McpPackageMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McpPackageMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McpPackageMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
