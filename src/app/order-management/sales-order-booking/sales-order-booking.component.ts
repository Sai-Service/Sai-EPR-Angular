import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators,FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { data } from 'jquery';

interface ISalesBookingForm {
  divisionName:string,
  ouName:string,
  locCode:string,
  ticketNo:string,
  orderNumber:number,
  accountNo:number,
  custName:string,
  orderedDate:Date,
  transactionTypeName:string,
  flowStatusCode:string,
  payTermDesc:string,
  salesRepName:string,
  tlName:string,
  remarks:string,
  subtotal:number,
  totTax:number,
  totAmt:number,
  custAddress:string,
  model:string,
  variant:string
  color:string,
  financeType:string,
  financerName:string,
  financeAmt:number,
  emi:number;
  tenure:number;
  downPayment:number;
  lineNumber:number;
  segment:string;
  orderedItem:string;
  pricingQty:number;
  unitSellingPrice:number;
  taxCategoryName:string;
  baseAmt:number;
  taxAmt:number;
  totAmt1:number;
  flowStatusCode1:string;
}


@Component({
  selector: 'app-sales-order-booking',
  templateUrl: './sales-order-booking.component.html',
  styleUrls: ['./sales-order-booking.component.css']
})
export class SalesOrderBookingComponent implements OnInit {
  SalesOrderBookingForm: FormGroup;
  divisionName:string;
  ouName:string;
  locCode:string;
  ticketNo:string;
  orderNumber:number;
  accountNo:number;
  custName:string;
  orderedDate:Date;
  transactionTypeName:string;
  flowStatusCode:string;
  payTermDesc:string;
  salesRepName:string;
  tlName:string;
  remarks:string;
  subtotal:number;
  totTax:number;
  totAmt:number;
  custAddress:string;
  model:string;
  variant:string;
  color:string;
  financeType:string;
  financerName:string;
  financeAmt:number;
  emi:number;
  tenure:number;
  downPayment:number;
  segment:string;
  orderedItem:string;
  lineNumber:number;
  pricingQty:number;
  unitSellingPrice:number;
  taxCategoryName:string;
  baseAmt:number;
  taxAmt:number;
  totAmt1:number;
  flowStatusCode1:string;
  lstgetOrderDetails:any;
  lstgetOrderLineDetails: any[];

  public orderLines:any[];
  hideArray: Array<boolean> = [];
  displayOrderLine: Array<boolean> = [];
  
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private orderManagementService:OrderManagementService) {
    this.SalesOrderBookingForm = fb.group({
      divisionName:[''],
      ouName:[''],
      locCode:[''],
      ticketNo:[''],
      orderNumber:[''],
      accountNo:[''],
      custName:[''],
      orderedDate:[''],
      transactionTypeName:[''],
      flowStatusCode:[''],
      payTermDesc:[''],
      salesRepName:[''],
      tlName:[''],
      remarks:[''],
      subtotal:[''],
  totTax:[''],
  totAmt:[''],
  custAddress:[''],
  model:[''],
  variant:[''],
  color:[''],
  financeType:[''],
  financerName:[''],
  financeAmt:[''],
  emi:[''],
  tenure:[''],
  downPayment:[''],
  oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
    })
   
  }

  orderlineDetailsGroup() {
    return this.fb.group({
      lineNumber:[''],
      segment:[''],
      orderedItem:[''],
      pricingQty:[''],
      unitSellingPrice:[''],
      taxCategoryName:[''],
      baseAmt:[''],
      taxAmt:[''],
      totAmt:[''],
      flowStatusCode:[''],
    })
  }


 orderlineDetailsArray():FormArray {
    return <FormArray>this.SalesOrderBookingForm.get('oeOrderLinesAllList')
  }

   get f() { return this.SalesOrderBookingForm.controls; }

   SalesOrderBooking(SalesOrderBookingForm: any) {

  }

  ngOnInit(): void {
    this.divisionName=sessionStorage.getItem('divisionName');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.locCode= (sessionStorage.getItem('locCode'));
    this.ticketNo=(sessionStorage.getItem('ticketNo'));
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  OrderFind(orderNumber){
    alert(orderNumber);
    this.orderlineDetailsArray().clear(); 
    this.orderManagementService.getsearchByOrderNo(orderNumber)
    .subscribe(
      data => {
        this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
        // this.totAmt1=data.obj.oeOrderLinesAllList.totAmt;
        // this.flowStatusCode1=data.obj.oeOrderLinesAllList.flowStatusCode;
        let control=this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
        for (let i=0;i<=this.lstgetOrderLineDetails.length-1;i++){
          var oeOrderLinesAllList1: FormGroup=this.orderlineDetailsGroup();
          control.push(oeOrderLinesAllList1);
        }
        // this.SalesOrderBookingForm.get('oeOrderLinesAllList').patchValue(this.lstgetOrderLineDetails);
        this.SalesOrderBookingForm.patchValue(data.obj);
      }
    )
  }

  addRow(index) {
    var arrayControl = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value  
    var itemId = arrayControl[index].itemId;

    if (itemId != null) {
      this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
    } else { ('Kindly Insert the line-Details first'); }
    var index = index + 1

    var aa = index + 1;
    var patch = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    (patch.controls[index]).patchValue(
      {
        lineNumber: aa,
      }
    );
    this.displayOrderLine.push(true);
    this.hideArray[index] = true;
  }

}
