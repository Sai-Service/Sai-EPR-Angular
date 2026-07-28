import { Component, OnInit, HostListener, ViewChild, ElementRef ,NgModule} from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { DatePipe ,Location} from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import * as xlsx from 'xlsx';
import{OrderManagementService} from '../order-management.service';



@Component({
  selector: 'app-erp-taxi-alloted-list',
  templateUrl: './erp-taxi-alloted-list.component.html',
  styleUrls: ['./erp-taxi-alloted-list.component.css']
})
export class ErpTaxiAllotedListComponent implements OnInit {
 orderListForm: FormGroup;
  // poPendingListForm: FormGroup;
  pipe = new DatePipe('en-US');

  // Tab control
  activeTab: string = 'erp';

  // Tab 1 - ERP flow data
  orderListDetails: any = [];
  storeAllOrderData:any = [];

  // Tab 2 - PO generated data
  poGeneratedDetails: any = [];
  storeAllPoGeneratedData: any = [];

  totInvAmt=0;
  totInvAmt1=0;
  today = new Date();
  minDate = new Date();

  startDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
  endDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');

  isPending : Array<boolean> = [];
  // status:string;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild('potable', { static: false }) potable: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: OrderManagementService) { 
    this.orderListForm = this.fb.group({
      startDt: [],
      endDt: [],
      status:[],
    })
  }

  orderList(orderListForm:any) {
  }

  ngOnInit(): void {
    // $("#wrapper").toggleClass("toggled");
    // var endDt1 = new Date(this.today);
    // endDt1.setDate(endDt1.getDate() + 1);
    // this.endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
      this.service.getSOBallotedList().subscribe((res: any) => {
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


       this.service.getPOGeneratedList().subscribe((res: any) => {
      if (res.code === 200) {
        this.poGeneratedDetails = res.obj;
        this.storeAllPoGeneratedData = res.obj;
         for (let x=0; x<this.poGeneratedDetails.length; x++){
            this.totInvAmt1 = Math.round(((this.totInvAmt1 += (this.poGeneratedDetails[x].orAmt)) + Number.EPSILON) * 100) / 100;
            console.log(this.totInvAmt1);
        }
      }
      else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    })
      // this.loadPoGeneratedList();
  }

 
  loadPoGeneratedList(): void {
    this.service.getPOGeneratedList().subscribe((res: any) => {
      if (res.code === 200) {
        this.poGeneratedDetails = res.obj;
        this.storeAllPoGeneratedData = res.obj;
         for (let x=0; x<this.poGeneratedDetails.length; x++){
            this.totInvAmt1 = Math.round(((this.totInvAmt1 += (this.poGeneratedDetails[x].orAmt)) + Number.EPSILON) * 100) / 100;
            console.log(this.totInvAmt1);
        }
      }
      else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    })
  }



  // getPO() {
  //   var stDt = this.orderListForm.get('startDt')?.value;
  //   var stDate = this.pipe.transform(stDt, 'dd-MMM-yyyy');

  //   var endDtSt = this.orderListForm.get('endDt')?.value;
  //   var endDt1 = new Date(endDtSt);
  //   // endDt1.setDate(endDt1.getDate() + 1);
  //  var endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
  //   this.service.getOrderByUser(Number(sessionStorage.getItem('locId')), stDate, endDt,sessionStorage.getItem('deptId')).subscribe((res: any) => {
  //     (document.getElementById('search') as HTMLInputElement).disabled = true;
  //     if (res.code === 200) {
  //       this.orderListDetails = res.obj;
  //       this.storeAllOrderData =res.obj;
  //       console.log(this.storeAllOrderData);
        
  //       for (let x=0; x<this.orderListDetails.length; x++){
         
  //         this.totInvAmt = Math.round(((this.totInvAmt += (this.orderListDetails[x].orAmt)) + Number.EPSILON) * 100) / 100;
  //         console.log(this.totInvAmt);
  //     }
  //     (document.getElementById('search') as HTMLInputElement).disabled = false;
  //     }
  //     else {
  //       if (res.code === 400) {

  //         alert(res.message);
  //         (document.getElementById('search') as HTMLInputElement).disabled = false;
  //       }
  //     }
  //   })

  // }
  
// onSelectStatus(event:any){
//   // alert(event);
//   console.log(this.orderListDetails);
//   var orderList = this.orderListDetails;
//   let currCustomer = this.storeAllOrderData.filter((orderList) => (orderList.orStatus === event));
//   console.log(currCustomer);
//   this.orderListDetails=currCustomer;
//   for (let x=0; x<currCustomer.length; x++){
//     console.log(this.totInvAmt);
//     this.totInvAmt = Math.round((( this.totInvAmt += (currCustomer[x].orAmt)) + Number.EPSILON) * 100) / 100;
// }
// }


// createPO(sobNumber: string) {
// var createdBy= sessionStorage.getItem('locId')??'';
//     this.service.createPO(sobNumber, createdBy).subscribe({
//       next: (response) => {
//         console.log('PO created successfully', response);
        
//       },
//       error: (err) => {
//         console.error('Error creating PO', err);
      
//       }
//     });
//   }



createPO(sobNumber: string ,NEWCUSTACCOUNT:string) {
  var createdBy = sessionStorage.getItem('locId') ?? '';

  this.service.createPO(sobNumber, createdBy).subscribe({
    next: (response: any) => {
      console.log('PO created successfully', response);

      if (response.code === 200) {
        alert(`PO Generated Successfully.`);
        this.resetPage();
        this.activeTab = 'po';
      } 
       if (response.code === 400) {
        alert(`Please Create Advance Receipt first against SOB: `+ sobNumber +`  & Cutstomer No :` + NEWCUSTACCOUNT);
        // this.resetPage();
        // this.activeTab = 'po';
      }
      
      else {
        // alert(response.message || 'Something went wrong while creating PO');
      }
    },
    error: (err) => {
      console.error('Error creating PO', err);
      alert('Error creating PO. Please try again.');
    }
  });
}



resetPage() {
  this.orderListDetails = [];
  this.getOrderList();
  this.getPocreatrdList();
}


getOrderList(){
 this.service.getSOBallotedList().subscribe((res: any) => {
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


      getPocreatrdList(){
    this.service.getPOGeneratedList().subscribe((res: any) => {
      if (res.code === 200) {
        this.poGeneratedDetails = res.obj;
        this.storeAllPoGeneratedData = res.obj;
         for (let x=0; x<this.poGeneratedDetails.length; x++){
            this.totInvAmt1 = Math.round(((this.totInvAmt1 += (this.poGeneratedDetails[x].orAmt)) + Number.EPSILON) * 100) / 100;
            console.log(this.totInvAmt1);
        }
      }
      else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    })}



      





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

  exportToExcelPo() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.potable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'POGeneratedList.xlsx');
  }


}