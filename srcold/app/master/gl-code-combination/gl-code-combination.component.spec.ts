import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlCodeCombinationComponent } from './gl-code-combination.component';

describe('GlCodeCombinationComponent', () => {
  let component: GlCodeCombinationComponent;
  let fixture: ComponentFixture<GlCodeCombinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlCodeCombinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlCodeCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
