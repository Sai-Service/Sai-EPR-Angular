import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDownloadComponent } from './template-download.component';

describe('TemplateDownloadComponent', () => {
  let component: TemplateDownloadComponent;
  let fixture: ComponentFixture<TemplateDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
