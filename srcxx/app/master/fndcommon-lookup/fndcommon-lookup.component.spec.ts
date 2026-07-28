import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FNDCommonLookupComponent } from './fndcommon-lookup.component';

describe('FNDCommonLookupComponent', () => {
  let component: FNDCommonLookupComponent;
  let fixture: ComponentFixture<FNDCommonLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FNDCommonLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FNDCommonLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
