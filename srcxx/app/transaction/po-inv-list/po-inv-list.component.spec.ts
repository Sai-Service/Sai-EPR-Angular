import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { PoInvListComponent } from './po-inv-list.component';

describe('PoInvListComponent', () => {
  let component: PoInvListComponent;
  let fixture: ComponentFixture<PoInvListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoInvListComponent ],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoInvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
