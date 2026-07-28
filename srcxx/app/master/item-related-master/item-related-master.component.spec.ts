import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRelatedMasterComponent } from './item-related-master.component';

describe('ItemRelatedMasterComponent', () => {
  let component: ItemRelatedMasterComponent;
  let fixture: ComponentFixture<ItemRelatedMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemRelatedMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRelatedMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
