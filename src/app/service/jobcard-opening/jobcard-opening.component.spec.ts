import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobcardOpeningComponent } from './jobcard-opening.component';

describe('JobcardOpeningComponent', () => {
  let component: JobcardOpeningComponent;
  let fixture: ComponentFixture<JobcardOpeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobcardOpeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobcardOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
