import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McpCancellationComponent } from './mcp-cancellation.component';

describe('McpCancellationComponent', () => {
  let component: McpCancellationComponent;
  let fixture: ComponentFixture<McpCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McpCancellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McpCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
