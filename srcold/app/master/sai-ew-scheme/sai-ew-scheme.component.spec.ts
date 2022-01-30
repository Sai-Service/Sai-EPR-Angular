import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaiEwSchemeComponent } from './sai-ew-scheme.component';

describe('SaiEwSchemeComponent', () => {
  let component: SaiEwSchemeComponent;
  let fixture: ComponentFixture<SaiEwSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaiEwSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaiEwSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
