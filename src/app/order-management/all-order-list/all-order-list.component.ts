import { Component, OnInit, HostListener, ViewChild, ElementRef ,NgModule} from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe ,Location} from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
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
  minDate = new Date();

  startDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
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
    var stDate = this.pipe.transform(stDt, 'dd-MMM-yyyy');

    var endDtSt = this.orderListForm.get('endDt').value;
    var endDt1 = new Date(endDtSt);
    // endDt1.setDate(endDt1.getDate() + 1);
   var endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
    this.service.getOrderByUser(Number(sessionStorage.getItem('locId')), stDate, endDt,sessionStorage.getItem('deptId')).subscribe((res: any) => {
      (document.getElementById('search') as HTMLInputElement).disabled = true;
      if (res.code === 200) {
        this.orderListDetails = res.obj;
        this.storeAllOrderData =res.obj;
        console.log(this.storeAllOrderData);
        
        for (let x=0; x<this.orderListDetails.length; x++){
         
          this.totInvAmt = Math.round(((this.totInvAmt += (this.orderListDetails[x].orAmt)) + Number.EPSILON) * 100) / 100;
          console.log(this.totInvAmt);
      }
      (document.getElementById('search') as HTMLInputElement).disabled = false;
      }
      else {
        if (res.code === 400) {

          alert(res.message);
          (document.getElementById('search') as HTMLInputElement).disabled = false;
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
      // xlsx.utils.json_to_sheet(this.storeAllOrderData);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'CounterSaleOrderList.xlsx');
  }
}
