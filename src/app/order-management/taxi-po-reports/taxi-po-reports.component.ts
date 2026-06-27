import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common'
import { saveAs } from 'file-saver';
import { OrderManagementService } from '../order-management.service';

const MIME_TYPES: Record<string, string>  = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

@Component({
  selector: 'app-taxi-po-reports',
  templateUrl: './taxi-po-reports.component.html',
  styleUrls: ['./taxi-po-reports.component.css']
})
export class TaxiPoReportsComponent implements OnInit {
  taxiporeportform: FormGroup;
  pipe = new DatePipe('en-US');
  now = new Date();
  public minDate = new Date();
  fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  toDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  public OUCode : string ='';
    closeResetButton = true;
  dataDisplay: any;
  progress = 0;
   isDisabled1 = false;

  constructor(private fb: FormBuilder, private router: Router, private service: OrderManagementService, private location1: Location, private router1: ActivatedRoute) {
    this.taxiporeportform = this.fb.group({
      fromDate: [''],
      toDate: [],
     OUCode:[]

    })
  }


  potaxiReport(taxiporeportform:any) {
  }

  ngOnInit(): void {
    this.taxiporeportform.patchValue({ OUCode: sessionStorage.getItem('ouId') + '-' + sessionStorage.getItem('ouName') });

  }

  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }


  reportParameter(){
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var pucDt1 = this.taxiporeportform.get('fromDate')?.value;
    var fromDate = this.pipe.transform(pucDt1, 'dd-MMM-yyyy');
    var pucDt2 = this.taxiporeportform.get('toDate')?.value;
    var toDate = this.pipe.transform(pucDt2, 'dd-MMM-yyyy');
    const fileName = 'PURCHASE REPORT OF-' + fromDate + '-TO-' + toDate + '.xlsx';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.taxiPoReport(sessionStorage.getItem('ouId'), fromDate, toDate)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
      })

  }

 
}
