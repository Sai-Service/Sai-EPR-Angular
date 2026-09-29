import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderManagementService } from '../order-management.service';
import { MasterService } from '../../master/master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';


const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};

@Component({
  selector: 'app-ss-manual-pend-list',
  templateUrl: './ss-manual-pend-list.component.html',
  styleUrls: ['./ss-manual-pend-list.component.css']
})
export class SsManualPendListComponent implements OnInit {
    SalesGatepassPendListForm: FormGroup;

  public minDate = new Date();
  pipe = new DatePipe('en-US');
  now = new Date();
  gatepassPenList: any[] = [];

  constructor(  private fb: FormBuilder,
    private router: Router,
    private router1: ActivatedRoute,
    private service: MasterService,
    private orderManagementService: OrderManagementService,
    private location: Location)  {
    this.SalesGatepassPendListForm = this.fb.group({
           fromDate: [''],
toDate: ['']
    });
  }
 get f() {
    return this.SalesGatepassPendListForm.controls;
  }
    SalesGatepass(formData: any): void {
    if (this.SalesGatepassPendListForm.invalid) {
      this.SalesGatepassPendListForm.markAllAsTouched();
      alert('Please enter all required details');
      return;
    }

    console.log('Gate Pass Request:', formData);
  }
  ngOnInit(): void {
  }




  gatePassSearchTable() {
  const fromDate = this.SalesGatepassPendListForm.get('fromDate')?.value;
  const toDate = this.SalesGatepassPendListForm.get('toDate')?.value;
  const fromDt = fromDate? this.pipe.transform(fromDate, 'dd-MMM-yyyy')?.toUpperCase(): '';
  const toDt = toDate? this.pipe.transform(toDate, 'dd-MMM-yyyy')?.toUpperCase() : '';
  const locId = sessionStorage.getItem('locId');
  this.orderManagementService.searchGatepassPendigList(fromDt, toDt,locId)
    .subscribe(
      (data) => {
        this.gatepassPenList = data.obj || data || [];
      },
      (err) => {
        console.error('Gate pass search failed', err);
        this.gatepassPenList = [];
      }
    );
}

  close() {
    this.location.back();
  }

}
