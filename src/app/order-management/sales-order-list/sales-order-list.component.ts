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
  selector: 'app-sales-order-list',
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.css']
})
export class SalesOrderListComponent implements OnInit {
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
  custName:string;
  custNumber:number;
  custContact:number;
  isVisibleSearchDetails:boolean=false;
  isVisibledeptAndLocation:boolean=false;
  public DepartmentList: any = [];
  DepartmentListNew:any=[];
  public BillShipToList: Array<string> = [];
  deptId:number;
  locCode:string;
  locId:number;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location,
     private router1: ActivatedRoute, private service: MasterService) { 
    this.orderListForm = this.fb.group({
      startDt: [],
      endDt: [],
      status:[],
      custName:[],
      custNumber:[],
      locId:[],
      deptId:[],
      locCode:[],
      custContact:['', [Validators.pattern('[0-9]*'), Validators.minLength(10),Validators.maxLength(10)]],
    })
  }

  orderList(orderListForm) {
  }
  

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    var endDt1 = new Date(this.today);
    endDt1.setDate(endDt1.getDate() + 1);
    this.endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
    if (Number(sessionStorage.getItem('deptId'))!=4){
      this.service.getSalesOrderByUser(Number(sessionStorage.getItem('locId')), this.startDt, this.endDt,sessionStorage.getItem('deptId')).subscribe((res: any) => {
        if (res.code === 200) {
          this.orderListDetails = res.obj;
          this.storeAllOrderData =res.obj;
          if (res.obj.length !=0){
            this.isVisibleSearchDetails=true;
          }
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

      if (Number(sessionStorage.getItem('deptId'))===4){
        this.isVisibledeptAndLocation=true;
      }
      else{
        this.isVisibledeptAndLocation=false;
      }

      this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.BillShipToList = data;
        }
      );

      this.service.DepartmentListNew()
      .subscribe(
        data => {
          this.DepartmentListNew = data;
          let createOrderList = this.DepartmentListNew.filter((dept) => (dept.divisionId==2));
          console.log(createOrderList);
          let createOrderListSales = this.DepartmentListNew.filter((dept) => (dept.code=='Sales'));
          console.log(createOrderListSales);   
         this.DepartmentList= createOrderListSales;       
        }
      );
  }



  getPO() {
    var stDt = this.orderListForm.get('startDt').value;
   // this.startDt = this.pipe.transform(stDt, 'dd-MMM-yyyy');
    var stDate = this.pipe.transform(stDt, 'dd-MMM-yyyy');

    var endDtSt = this.orderListForm.get('endDt').value;
    var endDt1 = new Date(endDtSt);
    // endDt1.setDate(endDt1.getDate() + 1);
   var endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
   if (Number(sessionStorage.getItem('deptId')) !=4){
    this.service.getSalesOrderByUser(Number(sessionStorage.getItem('locId')), stDate, endDt,sessionStorage.getItem('deptId')).subscribe((res: any) => {
      (document.getElementById('search') as HTMLInputElement).disabled = true;
      if (res.code === 200) {
        this.orderListDetails = res.obj;
        this.storeAllOrderData =res.obj;
        console.log(this.storeAllOrderData);
        if (res.obj.length !=0){
          this.isVisibleSearchDetails=true;
        }
        for (let x=0; x<this.orderListDetails.length; x++){
          this.totInvAmt = Math.round(((this.totInvAmt += (this.orderListDetails[x].orAmt)) + Number.EPSILON) * 100) / 100;
          console.log(this.totInvAmt);
      }
      (document.getElementById('search') as HTMLInputElement).disabled = false;
      }
      else {
        if (res.code === 400) {
          (document.getElementById('search') as HTMLInputElement).disabled = false;
          alert(res.message);
        }
      }
    })
  }
  else if (Number(sessionStorage.getItem('deptId')) ==4){
    var deptId =this.orderListForm.get('deptId').value;
    // alert(deptId)
    var locId=this.orderListForm.get('locId').value;
    this.service.getSalesOrderByUser(locId, stDate, endDt,deptId).subscribe((res: any) => {
      if (res.code === 200) {
        this.orderListDetails = res.obj;
        this.storeAllOrderData =res.obj;
        console.log(this.storeAllOrderData);
        if (res.obj.length !=0){
          this.isVisibleSearchDetails=true;
        }
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
  }
  
  onOptionsLocation(event) {
    // alert(event);
    this.orderListForm.patchValue({ locId: event })
  }

onSelectStatus(event:any){
  // alert(event);
  console.log(this.orderListDetails);
  var orderList = this.orderListDetails;
  let currCustomer = this.storeAllOrderData.filter((orderList) => (orderList.flStatusCode === event));
  console.log(currCustomer);
  this.orderListDetails=currCustomer;
  for (let x=0; x<currCustomer.length; x++){
    console.log(this.totInvAmt);
    this.totInvAmt = Math.round((( this.totInvAmt += (currCustomer[x].orAmt)) + Number.EPSILON) * 100) / 100;
}
}

onSelectCustName(event:any){
  var custName = event.target.value;
  // alert(custName);
  console.log(this.storeAllOrderData);
  let currCustomer = this.storeAllOrderData.filter((orderList) =>(orderList.custName.includes(custName)));
  console.log(currCustomer);
  if (currCustomer.length===0){
    alert('Data not found..Please confirm ...!')
  }
  else if (currCustomer.length !=0){
  this.orderListDetails=currCustomer;
}

}


onSelectcustNumber(event){
  var custNumber = event.target.value;
  // alert(custNumber);
  console.log(this.storeAllOrderData);
  let currCustomer = this.storeAllOrderData.filter((orderList) => (orderList.custActNo===custNumber));
  // let currCustomer = this.storeAllOrderData.filter((orderList) =>(orderList.custActNo === custNumber));
  console.log(currCustomer);
  if (currCustomer.length===0){
    alert('Data not found..Please confirm ...!')
  }
  else if (currCustomer.length !=0){
  this.orderListDetails=currCustomer;
}
}


onSelectcustConatctNo(event){
  var custConatctNo = event.target.value;
  // alert(custConatctNo);
  if (custConatctNo.length != 10){
    alert('Please enter proper contact number..!');
    return;
  }
  else{
  console.log(this.storeAllOrderData);
  let currCustomer = this.storeAllOrderData.filter((orderList) => (orderList.custContact.includes(custConatctNo)));
  console.log(currCustomer);
  if (currCustomer.length===0){
    alert('Data not found..Please confirm ...!')
  }
  else if (currCustomer.length !=0){
  this.orderListDetails=currCustomer;
  }
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
