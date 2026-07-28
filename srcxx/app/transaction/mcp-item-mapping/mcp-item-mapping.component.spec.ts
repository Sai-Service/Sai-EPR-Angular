import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McpItemMappingComponent } from './mcp-item-mapping.component';

describe('McpItemMappingComponent', () => {
  let component: McpItemMappingComponent;
  let fixture: ComponentFixture<McpItemMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McpItemMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McpItemMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
