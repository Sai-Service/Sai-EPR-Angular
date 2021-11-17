import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedItemPartComponent } from './related-item-part.component';

describe('RelatedItemPartComponent', () => {
  let component: RelatedItemPartComponent;
  let fixture: ComponentFixture<RelatedItemPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedItemPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedItemPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
