import { Component, OnInit, HostListener, ViewChild, ElementRef ,NgModule} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from,Observable } from 'rxjs';
import { Url } from 'url';
import { FormsModule } from '@angular/forms';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe ,Location} from '@angular/common';
import { data, get } from 'jquery';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-rto-line-item-report',
  templateUrl: './rto-line-item-report.component.html',
  styleUrls: ['./rto-line-item-report.component.css']
})
export class RtoLineItemReportComponent implements OnInit {
  rtoListForm: FormGroup;
  pipe = new DatePipe('en-US');
  today = new Date();
  startDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
  minDate = new Date();
  endDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
  rtoDataListDetails:any=[];
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  constructor(private fb: FormBuilder, private router: Router, private location1: Location,
    private router1: ActivatedRoute, private service: MasterService) { 
      this.rtoListForm = this.fb.group({
        endDt:[''],
        startDt:[''],
      })
    }

    rtoList(rtoListForm) {
    }

  ngOnInit(): void {
    var endDt1 = new Date(this.today);
    endDt1.setDate(endDt1.getDate() + 1);
    this.endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
      this.service.getRtoDataList(this.startDt, this.endDt,Number(sessionStorage.getItem('ouId')),sessionStorage.getItem('locId')).subscribe((res: any) => {
          this.rtoDataListDetails = res;
          console.log(res);  
      })
  }
  getrtoReport(){
    var stDt = this.rtoListForm.get('startDt').value;
   // this.startDt = this.pipe.transform(stDt, 'dd-MMM-yyyy');
    var stDate = this.pipe.transform(stDt, 'dd-MMM-yyyy');

    var endDtSt = this.rtoListForm.get('endDt').value;
    var endDt1 = new Date(endDtSt);
    // endDt1.setDate(endDt1.getDate() + 1);
   var endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
    this.service.getRtoDataList(stDate, endDt,Number(sessionStorage.getItem('ouId')),sessionStorage.getItem('locId')).subscribe((res: any) => {
      this.rtoDataListDetails = res;
      console.log(res);  
  })
  }
  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
      // xlsx.utils.json_to_sheet(this.storeAllOrderData);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'CounterSaleOrderList.xlsx');
  }

}
