import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McpEnquiryComponent } from './mcp-enquiry.component';

describe('McpEnquiryComponent', () => {
  let component: McpEnquiryComponent;
  let fixture: ComponentFixture<McpEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McpEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McpEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
