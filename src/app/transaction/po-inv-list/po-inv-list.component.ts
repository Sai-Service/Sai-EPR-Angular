import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { ApInvListClass } from './ap-inv-list-class';


@Component({
  selector: 'app-po-inv-list',
  templateUrl: './po-inv-list.component.html',
  styleUrls: ['./po-inv-list.component.css']
})
export class PoInvListComponent implements OnInit {
  apInvListForm: FormGroup;
  apInvDetails: any = [];
  closeResetButton =true;
  dataDisplay: any;
  progress = 0;
  content: number;
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService,private transactionService: TransactionService) { 
    this.apInvListForm = this.fb.group({
    
    })
  }

  ngOnInit(): void {

    this.closeResetButton=false;
    this.progress = 0;
    this.dataDisplay ='Data Loading in progress....Do not refresh the Page'
    var searchObj: ApInvListClass = new ApInvListClass();
    // if (this.poInvoiceForm.get('segment1').value != null) { searchObj.segment1 = this.poInvoiceForm.get('segment1').value }
    // if (this.poInvoiceForm.get('suppNo').value != null) { searchObj.suppNo = this.poInvoiceForm.get('suppNo').value }
    // if (this.poInvoiceForm.get('invoiceNum').value != null) { searchObj.invoiceNum = this.poInvoiceForm.get('invoiceNum').value }
    this.transactionService.getsearchByApINV(JSON.stringify(searchObj)).subscribe((res: any) => {
      if (res.code === 200) {
        this.apInvDetails = res.obj;
        this.dataDisplay ='Data Display Sucessfully....'
        this.closeResetButton=true;
      }
      else if (res.code===400){
        alert(res.message);
        this.dataDisplay ='Data Display Failed....'
        this.closeResetButton=true;
      }
    })
  }

  apInvList(apInvListForm) {
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  apInvFind(content) {
    var searchObj: ApInvListClass = new ApInvListClass();
    // if (this.apInvListForm.get('segment1').value != null) { searchObj.segment1 = this.apInvListForm.get('segment1').value }
    // if (this.apInvListForm.get('suppNo').value != null) { searchObj.suppNo = this.apInvListForm.get('suppNo').value }
    // if (this.apInvListForm.get('invoiceNum').value != null) { searchObj.invoiceNum = this.apInvListForm.get('invoiceNum').value }
    this.transactionService.getsearchByApINV(JSON.stringify(searchObj)).subscribe((res: any) => {
      if (res.code === 200) {
        this.apInvDetails = res.obj;
        this.dataDisplay ='Data Display Sucessfully....'
        this.closeResetButton=true;
      }
      else if (res.code===400){
        alert(res.message);
        this.dataDisplay ='Data Display Failed....'
        this.closeResetButton=true;
      }
      }
    )}

    refresh() {
      window.location.reload();
    }
  
    close() {
      this.location1.back();
    }
  }

