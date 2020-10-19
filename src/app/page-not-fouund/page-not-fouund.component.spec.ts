import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFouundComponent } from './page-not-fouund.component';

describe('PageNotFouundComponent', () => {
  let component: PageNotFouundComponent;
  let fixture: ComponentFixture<PageNotFouundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFouundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFouundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
