import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportsComponent } from './sales-reports.component';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';

describe('SalesReportsComponent', () => {
  let component: SalesReportsComponent;
  let fixture: ComponentFixture<SalesReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReportsComponent ],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
