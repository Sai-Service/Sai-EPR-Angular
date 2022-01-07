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
  orderListDetails: any = [];
  storeAllOrderData:any = [];
  totInvAmt=0;
  today = new Date();
  startDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
  minDate = new Date();
  endDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
  isPending : Array<boolean> = [];
  status:string;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) { 
    this.orderListForm = this.fb.group({
      startDt: [],
      endDt: [],
      status:[],
    })
  }

  orderList(orderListForm) {
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    var endDt1 = new Date(this.today);
    endDt1.setDate(endDt1.getDate() + 1);
    this.endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
      this.service.getOrderByUser(Number(sessionStorage.getItem('locId')), this.startDt, this.endDt,sessionStorage.getItem('deptId')).subscribe((res: any) => {
        if (res.code === 200) {
          this.orderListDetails = res.obj;
          this.storeAllOrderData =res.obj;
          for (let x=0; x<this.orderListDetails.length; x++){
            this.totInvAmt = Math.round(((this.totInvAmt += (this.orderListDetails[x].orAmt)) + Number.EPSILON) * 100) / 100;
            console.log(this.totInvAmt);
        }
          // for (let i = 0; i < res.obj.length; i++) {
          //   var poDt = this.orderListDetails[i].poDate;
          //   var supInvDt = this.orderListDetails[i].suppInvDate;
          //   this.orderListDetails[i].poDate = this.pipe.transform(poDt, 'dd-MM-yyyy');
          //   this.orderListDetails[i].suppInvDate = this.pipe.transform(supInvDt, 'dd-MM-yyyy');
          //   if (this.orderListDetails[i].rcvLines.length > 0) {
          //     var recDt = this.orderListDetails[i].rcvLines[0].receiptDate;
          //     this.orderListDetails[i].rcvLines[0].receiptDate = this.pipe.transform(recDt, 'dd-MM-yyyy');
          //     this.isPending[i] = false;
          //   }else{
          //       this.orderListDetails[i].rcvLines.push({receiptNo : "Pending"});
          //       this.isPending[i] = true;
          //   }
  
          // }
          // console.log(this.orderListDetails);
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
   // this.startDt = this.pipe.transform(stDt, 'dd-MMM-yyyy');
    var stDate = this.pipe.transform(stDt, 'dd-MMM-yyyy');

    var endDtSt = this.orderListForm.get('endDt').value;
    var endDt1 = new Date(endDtSt);
    // endDt1.setDate(endDt1.getDate() + 1);
   var endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
    this.service.getOrderByUser(Number(sessionStorage.getItem('locId')), stDate, endDt,sessionStorage.getItem('deptId')).subscribe((res: any) => {
      if (res.code === 200) {
        this.orderListDetails = res.obj;
        this.storeAllOrderData =res.obj;
        console.log(this.storeAllOrderData);
        
        for (let x=0; x<this.orderListDetails.length; x++){
         
          this.totInvAmt = Math.round(((this.totInvAmt += (this.orderListDetails[x].orAmt)) + Number.EPSILON) * 100) / 100;
          console.log(this.totInvAmt);
      }
      }
      else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    })

  }
  
onSelectStatus(event:any){
  // alert(event);
  console.log(this.orderListDetails);
  var orderList = this.orderListDetails;
  let currCustomer = this.storeAllOrderData.filter((orderList) => (orderList.orStatus === event));
  console.log(currCustomer);
  this.orderListDetails=currCustomer;
  for (let x=0; x<currCustomer.length; x++){
    console.log(this.totInvAmt);
    this.totInvAmt = Math.round((( this.totInvAmt += (currCustomer[x].orAmt)) + Number.EPSILON) * 100) / 100;
}
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
    xlsx.writeFile(wb, 'CounterSaleOrderList.xlsx');
  }
}