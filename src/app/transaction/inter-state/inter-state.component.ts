import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';
// import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { DatePipe } from '@angular/common';


interface IinterState{
  InterStateNo:number;
  orderNumber:number;
  transactionTypeName:number;
  BillLocName:string;
  paymentType:string;
  paymentTermId: number;
  priceListName:string;
  priceListId:number;
  issuedBy:string;
  orderStatus:string;
  remarks:string;
  custAccountNo:number;
}
@Component({
  selector: 'app-inter-state',
  templateUrl: './inter-state.component.html',
  styleUrls: ['./inter-state.component.css']
})
export class InterStateComponent implements OnInit {
InterStateForm:FormGroup;
InterStateNo:number;
orderNumber:number;
transactionTypeName:number;
public orderTypeList:any;
public priceListNameList: any;
createOrderTypeList:any;
BillLocName:string;
paymentType:string;
paymentTermId: number;
priceListName:string;
priceListId:number;
issuedBy:string;
orderStatus:string;
remarks:string;
trxNumber:number;
orderedDate:Date;
subtotal:number;
totTax:number;
totAmt:number;
custAccountNo:number;
custName:string;
mobile1:number;
custAddress:string;
state:string;
gstNo:string;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private orderManagementService: OrderManagementService) {
    this.InterStateForm=fb.group({
      orderNumber:[],
      transactionTypeName:[],
      paymentType:[],
      paymentTermId: [],
      priceListName:[],
      priceListId:[],
      issuedBy:[],
      orderStatus:[],
      remarks:[],
      trxNumber:[],
      orderedDate:[],
      subtotal:[],
      totTax:[],
      totAmt:[],
      custAccountNo:[],
      custName:[],
      mobile1:[],
      custAddress:[],
      state:[],
      gstNo:[],
    })
   }

   InterState(InterStateForm:any){}
  ngOnInit(): void {
    this.issuedBy=(sessionStorage.getItem('ticketNo'));

    this.service.createOrderTypeListFn()
    .subscribe(
      data1 => {
        this.createOrderTypeList = data1;
        console.log(this.createOrderTypeList);
        // data1 = this.createOrderTypeList;
      }
    );
    this.orderManagementService.priceListNameList()
    .subscribe(
      data => {
        this.priceListNameList = data;
        console.log(this.priceListNameList);
      }
    );

  }

}
