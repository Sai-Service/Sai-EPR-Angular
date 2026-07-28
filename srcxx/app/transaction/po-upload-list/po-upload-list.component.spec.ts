import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoUploadListComponent } from './po-upload-list.component';

describe('PoUploadListComponent', () => {
  let component: PoUploadListComponent;
  let fixture: ComponentFixture<PoUploadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoUploadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoUploadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
