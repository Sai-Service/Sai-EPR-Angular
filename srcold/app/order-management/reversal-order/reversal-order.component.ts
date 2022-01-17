import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { data } from 'jquery';
import { DatePipe } from '@angular/common';
import { Location } from "@angular/common";
import { saveAs } from 'file-saver';


const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

interface ISalesBookingForm {
  divisionName:string;
  locationId:number;
  ouName:string;
  locCode:string;
  ticketNo:string;
  emplId:number;
  ouId:number;
  deptId:number;
  locId:number;
  reversalReason:string;
  customerId:number;
  shipLocName:string;
  billLocName:string;
  orderNumber:number;
  accountNo:number;
  custName:string;
  custAddress:string;
  billToAddress:string;
  panNo:string;
  gstNo:string;
  totAmt:number;
  subtotal:number;
  priceListName:string;
  remarks:string;
  tlName:string;
  salesRepName:string;
  payTermDesc:string;
  flowStatusCode:string;
  transactionTypeName:string;
  orderedDate:string;
  totTax:number;
} 

@Component({
  selector: 'app-reversal-order',
  templateUrl: './reversal-order.component.html',
  styleUrls: ['./reversal-order.component.css']
})
export class ReversalOrderComponent implements OnInit {
  reversalOrderForm: FormGroup;
  divisionName:string;
  locationId:number;
  reversalReason:string;
  ouName:string;
  locCode:string;
  ticketNo:string;
  emplId:number;
  ouId:number;
  deptId:number;
  locId:number;
  customerId:number;
  shipLocName:string;
  billLocName:string;
  orderNumber:number;
  accountNo:number;
  custName:string;
  custAddress:string;
  billToAddress:string;
  panNo:string;
  gstNo:string;
  totAmt:number;
  subtotal:number;
  priceListName:string;
  remarks:string;
  tlName:string;
  salesRepName:string;
  payTermDesc:string;
  flowStatusCode:string;
  transactionTypeName:string;
  orderedDate:string;
  totTax:number;
  reversalReasonList:any[];

  constructor(private fb: FormBuilder, private location: Location, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) { 
    this.reversalOrderForm = fb.group({
      orderNumber:[''],
      reversalReason:[''],
    })
  }



  ngOnInit(): void {
    this.divisionName = sessionStorage.getItem('divisionName');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.locCode = (sessionStorage.getItem('locCode'));
    this.ticketNo = (sessionStorage.getItem('ticketNo'));
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.deptId = Number(sessionStorage.getItem('deptId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.locationId=Number(sessionStorage.getItem('locId'));



    this.orderManagementService.reversalReasonList()
    .subscribe(
      data1 => {
        this.reversalReasonList = data1;
        console.log(this.reversalReasonList);
        
      }
    );

  }



  reversalOrder(reversalOrderForm: any) {}

 

  accountNoSearch(accountNo){}


  Reverse(){
    alert(this.orderNumber);
    alert(this.reversalReason);
    this.orderManagementService.OrderReversal(this.orderNumber,this.emplId,this.reversalReason).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // this.deAllotmentForm.reset();
      } else {
        if (res.code === 400) {
          alert(res.message);
          // this.deAllotmentForm.reset();
        }
      }
    });
  }
  close() {
    this.router.navigate(['admin']);
  }

  Clear() {
    window.location.reload();
  }

  OrderFind(orderNumber){}
}
