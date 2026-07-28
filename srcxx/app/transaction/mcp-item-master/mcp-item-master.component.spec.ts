import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McpItemMasterComponent } from './mcp-item-master.component';

describe('McpItemMasterComponent', () => {
  let component: McpItemMasterComponent;
  let fixture: ComponentFixture<McpItemMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McpItemMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McpItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
