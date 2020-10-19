import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCategortComponent } from './item-categort.component';

describe('ItemCategortComponent', () => {
  let component: ItemCategortComponent;
  let fixture: ComponentFixture<ItemCategortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCategortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCategortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
