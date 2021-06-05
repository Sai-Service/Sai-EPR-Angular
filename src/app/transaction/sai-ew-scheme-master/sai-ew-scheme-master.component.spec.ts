import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaiEwSchemeMasterComponent } from './sai-ew-scheme-master.component';

describe('SaiEwSchemeMasterComponent', () => {
  let component: SaiEwSchemeMasterComponent;
  let fixture: ComponentFixture<SaiEwSchemeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaiEwSchemeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaiEwSchemeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
