import { Component, OnInit, HostListener, ViewChild, ElementRef ,NgModule} from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe ,Location} from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

@Component({
  selector: 'app-eway-bill-invoice-data',
  templateUrl: './eway-bill-invoice-data.component.html',
  styleUrls: ['./eway-bill-invoice-data.component.css']
})
export class EwayBillInvoiceDataComponent implements OnInit {
  ewayBillDataForm: FormGroup;
  ewayListDetails: any = [];
  storeAllOrderData:any = [];
  pipe = new DatePipe('en-US');
  totInvAmt=0;
  today = new Date();
  startDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
  minDate = new Date();
  endDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
  isPending : Array<boolean> = [];
  status:string;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.ewayBillDataForm = this.fb.group({
      startDt: [],
      endDt: [],
    })
   }

   ewayBillData(ewayBillDataForm) {
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    var endDt1 = new Date(this.today);
    endDt1.setDate(endDt1.getDate() + 1);
    this.endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
      this.service.getemwayBill(this.startDt, this.endDt,sessionStorage.getItem('locId'),sessionStorage.getItem('deptId')).subscribe((res: any) => {
        if (res.code === 200) {
          this.ewayListDetails = res.obj;
         console.log(this.ewayListDetails);
         
        }
        else {
          if (res.code === 400) {
            alert(res.message);
          }
        }
      })
  }


  getInvoiceDate(){
    var stDt = this.ewayBillDataForm.get('startDt').value;
    var stDate = this.pipe.transform(stDt, 'dd-MMM-yyyy');

    var endDtSt = this.ewayBillDataForm.get('endDt').value;
    var endDt1 = new Date(endDtSt);
    // endDt1.setDate(endDt1.getDate() + 1);
   var endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
    this.service.getemwayBill(stDate, endDt,sessionStorage.getItem('locId'),sessionStorage.getItem('deptId')).subscribe((res: any) => {
      if (res.code === 200) {
        this.ewayListDetails = res.obj;
      }
      else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    })
  }



  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
      // xlsx.utils.json_to_sheet(this.storeAllOrderData);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'CounterSaleOrderList.xlsx');
  }


  download(trnNumber){
    alert(trnNumber)
    const fileName = 'Eway Bill Report-' + sessionStorage.getItem('locName').trim() + '-'  + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.service.EwayBill(trnNumber)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      })
    } 
  
}
