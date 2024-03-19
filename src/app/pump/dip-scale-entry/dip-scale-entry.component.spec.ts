import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DipScaleEntryComponent } from './dip-scale-entry.component';

describe('DipScaleEntryComponent', () => {
  let component: DipScaleEntryComponent;
  let fixture: ComponentFixture<DipScaleEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DipScaleEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DipScaleEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
