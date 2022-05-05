import { Component, OnInit, HostListener, ViewChild, ElementRef, NgModule } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';
import { OrderManagementService } from 'src/app/order-management/order-management.service';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};


@Component({
  selector: 'app-eway-bill-customer-no-wise',
  templateUrl: './eway-bill-customer-no-wise.component.html',
  styleUrls: ['./eway-bill-customer-no-wise.component.css']
})
export class EwayBillCustomerNoWiseComponent implements OnInit {
  ewayBillDataForm: FormGroup;
  ewayListDetails: any = [];
  storeAllOrderData: any = [];
  pipe = new DatePipe('en-US');
  totInvAmt = 0;
  today = new Date();
  startDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
  minDate = new Date();
  endDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
  isPending: Array<boolean> = [];
  status: string;
  custName: string;
  custAccountNo: number;
  customerNameSearch: any = [];
  closeResetButton =true;
  dataDisplay: any;
  progress = 0;
  DOCU_DT:Date;
  docDate:Date;


  constructor(private fb: FormBuilder, private router: Router, private orderManagementService: OrderManagementService, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.ewayBillDataForm = this.fb.group({
      startDt: [],
      endDt: [],
      custAccountNo: [],
      custName: [],
      DOCU_DT:[],
    })
  }


  ewayBillData(ewayBillDataForm) {
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
  }

  accountNoSearch(custAccountNo) {
    // alert(custAccountNo);
    this.service.searchCustomerByAccount(custAccountNo)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.custName = data.obj.custName;
            this.custAccountNo=data.obj.custAccountNo;
            this.ewayBillDataForm.get('custAccountNo').disable();
            this.ewayBillDataForm.get('custName').disable();
          }
          else if (data.code === 400) {
            alert(data.message);
          }
        }
      )
  }



  custNameSearch(custName) {
    // alert(custName)
    this.orderManagementService.custNameSearchFn1(custName, sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.customerNameSearch = data.obj;
          }
          else {
            if (data.code === 400) {
              alert(data.message);
            }
          }
        }
      );
  }


  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
      // xlsx.utils.json_to_sheet(this.ewayListDetails);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'EwayBillList.xlsx');
  }

  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }

  // DOCU_DT:Date;
  getInvoiceDate() { 
    var stDt = this.ewayBillDataForm.get('startDt').value;
    var stDate = this.pipe.transform(stDt, 'dd-MMM-yyyy');

    var endDtSt = this.ewayBillDataForm.get('endDt').value;
    var endDt1 = new Date(endDtSt);
    // endDt1.setDate(endDt1.getDate() + 1);
   var endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
   var custAccountNo = this.ewayBillDataForm.get('custAccountNo').value;
   this.closeResetButton=false;
   this.progress = 0;
   this.dataDisplay ='Data Loading in progress....Do not refresh the Page'
  //  alert(custAccountNo);
   if (custAccountNo === undefined){
    custAccountNo=''
   }
   this.service.getemwayBillcustNo(stDate, endDt,sessionStorage.getItem('locId'),sessionStorage.getItem('deptId'),custAccountNo).subscribe((res: any) => {
    if (res.code === 200) {
      this.ewayListDetails = res.obj;
      // this.ewayBillDataForm.patchValue({DOCU_DT:res.obj.DOCU_DT})
      // alert(res.obj.DOCU_DT)
      // this.DOCU_DT= res.obj.DOCU_DT;
      // this.docDate = this.DOCU_DT;
      this.dataDisplay ='Data Display Sucessfully....'
      this.closeResetButton=true;
    }
    else {
      if (res.code === 400) {
        alert(res.message);
      }
    }
  })
  }
}
