import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintItemMasterComponent } from './paint-item-master.component';

describe('PaintItemMasterComponent', () => {
  let component: PaintItemMasterComponent;
  let fixture: ComponentFixture<PaintItemMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintItemMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
