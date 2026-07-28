import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McpEnrollmentComponent } from './mcp-enrollment.component';

describe('McpEnrollmentComponent', () => {
  let component: McpEnrollmentComponent;
  let fixture: ComponentFixture<McpEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McpEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McpEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
