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
  selector: 'app-all-order-list',
  templateUrl: './all-order-list.component.html',
  styleUrls: ['./all-order-list.component.css']
})
export class AllOrderListComponent implements OnInit {
  orderListForm: FormGroup;
  poPendingListForm: FormGroup;
  pipe = new DatePipe('en-US');
  poDetails: any = [];
  today = new Date();
  startDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
  minDate = new Date();
  endDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
  isPending : Array<boolean> = [];

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) { 
    this.orderListForm = this.fb.group({
      startDt: [],
      endDt: [],
    })
  }

  orderList(orderListForm) {
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    var endDt1 = new Date(this.today);
    endDt1.setDate(endDt1.getDate() + 1);
    this.endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
      this.service.getPOByUser(Number(sessionStorage.getItem('emplId')), this.startDt, this.endDt).subscribe((res: any) => {
        if (res.code === 200) {
          this.poDetails = res.obj;
          for (let i = 0; i < res.obj.length; i++) {
            var poDt = this.poDetails[i].poDate;
            var supInvDt = this.poDetails[i].suppInvDate;
            this.poDetails[i].poDate = this.pipe.transform(poDt, 'dd-MM-yyyy');
            this.poDetails[i].suppInvDate = this.pipe.transform(supInvDt, 'dd-MM-yyyy');
            if (this.poDetails[i].rcvLines.length > 0) {
              var recDt = this.poDetails[i].rcvLines[0].receiptDate;
              this.poDetails[i].rcvLines[0].receiptDate = this.pipe.transform(recDt, 'dd-MM-yyyy');
              this.isPending[i] = false;
            }else{
                this.poDetails[i].rcvLines.push({receiptNo : "Pending"});
                this.isPending[i] = true;
            }
  
          }
          console.log(this.poDetails);
        }
        else {
          if (res.code === 400) {
            alert(res.message);
          }
        }
      })
  }



  getPO() {
    var stDt = this.orderListForm.get('startDt').value;
    this.startDt = this.pipe.transform(stDt, 'dd-MMM-yyyy');

    var endDtSt = this.orderListForm.get('endDt').value;
    var endDt1 = new Date(endDtSt);
    endDt1.setDate(endDt1.getDate() + 1);
    this.endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');

    this.service.getPOByUser(Number(sessionStorage.getItem('emplId')), this.startDt, this.endDt).subscribe((res: any) => {
      if (res.code === 200) {
        this.poDetails = res.obj;
        for (let i = 0; i < res.obj.length; i++) {
          //this.poPendingListForm.patchValue({ segment1: res[i].obj.segment1 })
          var poDt = this.poDetails[i].poDate;
          var supInvDt = this.poDetails[i].suppInvDate;
          this.poDetails[i].poDate = this.pipe.transform(poDt, 'dd-MM-yyyy');
          this.poDetails[i].suppInvDate = this.pipe.transform(supInvDt, 'dd-MM-yyyy');
          if (this.poDetails[i].rcvLines.length > 0) {
            var recDt = this.poDetails[i].rcvLines[0].receiptDate;
            this.poDetails[i].rcvLines[0].receiptDate = this.pipe.transform(recDt, 'dd-MM-yyyy');
            this.isPending[i] = false;
          }else{
              this.poDetails[i].rcvLines.push({receiptNo : "Pending"});
              this.isPending[i] = true;
          }

        }
        console.log(this.poDetails);
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

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }
}
