import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintPoListComponent } from './paint-po-list.component';

describe('PaintPoListComponent', () => {
  let component: PaintPoListComponent;
  let fixture: ComponentFixture<PaintPoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintPoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintPoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
