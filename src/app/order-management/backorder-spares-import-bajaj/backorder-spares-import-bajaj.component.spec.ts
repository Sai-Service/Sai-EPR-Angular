import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackorderSparesImportBajajComponent } from './backorder-spares-import-bajaj.component';

describe('BackorderSparesImportBajajComponent', () => {
  let component: BackorderSparesImportBajajComponent;
  let fixture: ComponentFixture<BackorderSparesImportBajajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackorderSparesImportBajajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackorderSparesImportBajajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
