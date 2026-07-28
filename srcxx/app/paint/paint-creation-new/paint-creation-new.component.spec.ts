import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintCreationNewComponent } from './paint-creation-new.component';

describe('PaintCreationNewComponent', () => {
  let component: PaintCreationNewComponent;
  let fixture: ComponentFixture<PaintCreationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintCreationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintCreationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
