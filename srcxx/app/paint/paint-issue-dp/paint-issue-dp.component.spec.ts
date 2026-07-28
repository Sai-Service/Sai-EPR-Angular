import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintIssueDpComponent } from './paint-issue-dp.component';

describe('PaintIssueDpComponent', () => {
  let component: PaintIssueDpComponent;
  let fixture: ComponentFixture<PaintIssueDpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintIssueDpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintIssueDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
