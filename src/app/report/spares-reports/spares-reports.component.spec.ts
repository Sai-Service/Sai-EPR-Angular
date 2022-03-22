import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { SparesReportsComponent } from './spares-reports.component';

describe('SparesReportsComponent', () => {
  let component: SparesReportsComponent;
  let fixture: ComponentFixture<SparesReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparesReportsComponent ],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
