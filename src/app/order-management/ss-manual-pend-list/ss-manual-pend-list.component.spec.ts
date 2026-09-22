import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SsManualPendListComponent } from './ss-manual-pend-list.component';

describe('SsManualPendListComponent', () => {
  let component: SsManualPendListComponent;
  let fixture: ComponentFixture<SsManualPendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsManualPendListComponent ],
      imports: [ ReactiveFormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsManualPendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
