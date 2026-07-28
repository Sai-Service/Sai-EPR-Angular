import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftEntryListComponent } from './shift-entry-list.component';

describe('ShiftEntryListComponent', () => {
  let component: ShiftEntryListComponent;
  let fixture: ComponentFixture<ShiftEntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftEntryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
