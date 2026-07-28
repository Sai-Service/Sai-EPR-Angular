import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMasterNewComponent } from './item-master-new.component';

describe('ItemMasterNewComponent', () => {
  let component: ItemMasterNewComponent;
  let fixture: ComponentFixture<ItemMasterNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMasterNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMasterNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
