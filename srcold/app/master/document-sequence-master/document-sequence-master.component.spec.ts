import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSequenceMasterComponent } from './document-sequence-master.component';

describe('DocumentSequenceMasterComponent', () => {
  let component: DocumentSequenceMasterComponent;
  let fixture: ComponentFixture<DocumentSequenceMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentSequenceMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSequenceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
