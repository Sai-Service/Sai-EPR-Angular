import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItCorrectionForAllComponent } from './it-correction-for-all.component';

describe('ItCorrectionForAllComponent', () => {
  let component: ItCorrectionForAllComponent;
  let fixture: ComponentFixture<ItCorrectionForAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItCorrectionForAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItCorrectionForAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
