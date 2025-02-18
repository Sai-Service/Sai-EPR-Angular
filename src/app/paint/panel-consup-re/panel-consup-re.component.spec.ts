import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelConsupReComponent } from './panel-consup-re.component';

describe('PanelConsupReComponent', () => {
  let component: PanelConsupReComponent;
  let fixture: ComponentFixture<PanelConsupReComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelConsupReComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelConsupReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
