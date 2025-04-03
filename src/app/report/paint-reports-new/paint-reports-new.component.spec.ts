import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintReportsNewComponent } from './paint-reports-new.component';

describe('PaintReportsNewComponent', () => {
  let component: PaintReportsNewComponent;
  let fixture: ComponentFixture<PaintReportsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintReportsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintReportsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
