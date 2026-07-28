import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintCreationComponent } from './paint-creation.component';

describe('PaintCreationComponent', () => {
  let component: PaintCreationComponent;
  let fixture: ComponentFixture<PaintCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
