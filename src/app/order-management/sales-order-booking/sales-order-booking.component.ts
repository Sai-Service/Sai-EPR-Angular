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
import { DatePipe } from '@angular/common';
import { Location } from "@angular/common";



interface ISalesBookingForm {
  divisionName:string,
  ouName:string,
  locCode:string,
  ticketNo:string,
  emplId:number;
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
  category:string;
  hsnSacCode:string;
  priceListName:string;
  billLocName:string;
  shipLocName:string;
  ouId:number;
  customerId:string;
  // locName:string;
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
  orderedDate=new Date();
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
  priceListName:string;
  unitSellingPrice:number;
  taxCategoryName:string;
  baseAmt:number;
  taxAmt:number;
  totAmt1:number;
  flowStatusCode1:string;
  lstgetOrderDetails:any;
  invItemId:number;
  description:string;
  category:string;
  hsnSacCode:string;
  emplId:number;
<<<<<<< HEAD
  billLocName:string;
  shipLocName:string;
  ouId:number;
  customerId:string;
  // locCode:string;
=======
>>>>>>> 16fe2ae73245d25736e48240b3aca7a8626fc93e
  lstgetOrderLineDetails: any[];
  public financeTypeList:any;
  public financerNameList:any;
  

  public orderLines:any[];
  hideArray: Array<boolean> = [];
  displayOrderLine: Array<boolean> = [];
  public ItemIdList:Array<string>=[];
  // public addonItemList:Array<string>=[];
  public addonItemList:any[];
  public addonDescList:any[];

  displayInsDetails = true;
  displayEWDetails=true;

  displayfinanceType=true;
  displayfinancerName=true;
  displayfinanceAmt=true;
  displayemi=true;
  displaytenure=true;
  displaydownPayment=true;
  displayorderedDate=true;
  displaytransactionTypeName=true;
  displayflowStatusCode=true;
  displaypayTermDesc=true;
  displaysalesRepName=true;
  displaytlName=true;
  displayremarks=true;
  displayallotmentFlag=true;
  displaymodel=true;
  displayvariant=true;
  displaycolor=true;
  displaysegment=true;
  displaycategory=true;
  displaypricingQty=true;
  displaytaxCategoryName=true;
  displayorderedItem=true;
<<<<<<< HEAD
=======

  displayorderLineDetailsPart=true;
>>>>>>> 16fe2ae73245d25736e48240b3aca7a8626fc93e

  displayorderLineDetailsPart=true;
  lstcommentsbyorderNo: any[];

  constructor(private fb: FormBuilder,private location: Location, private router: Router, private service: MasterService,private orderManagementService:OrderManagementService,private transactionService :TransactionService) {
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
  emplId:[''],
<<<<<<< HEAD
  priceListName:[''],
  billLocName:[''],
  shipLocName:[''],
  ouId:[''],
  customerId:[''],
=======
>>>>>>> 16fe2ae73245d25736e48240b3aca7a8626fc93e
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
      category:[''],
      hsnSacCode:[''],
    })
  }


 orderlineDetailsArray():FormArray {
    return <FormArray>this.SalesOrderBookingForm.get('oeOrderLinesAllList')
  }

  //  get f() { return this.SalesOrderBookingForm.controls; }

   SalesOrderBooking(SalesOrderBookingForm: any) {

  }

  ngOnInit(): void {
    this.divisionName=sessionStorage.getItem('divisionName');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.locCode= (sessionStorage.getItem('locCode'));
    this.ticketNo=(sessionStorage.getItem('ticketNo'));
    this.emplId=Number(sessionStorage.getItem('emplId'));
<<<<<<< HEAD
    this.ouId=Number(sessionStorage.getItem('ouId'));
=======
>>>>>>> 16fe2ae73245d25736e48240b3aca7a8626fc93e

    console.log(this.emplId);
    

    this.orderManagementService.getFinTypeSearch1()
    .subscribe(
      data => {
        this.financeTypeList = data;
        console.log(this.financeTypeList);
      }
    );

    this.orderManagementService.getFinNameSearch()
    .subscribe(
      data => {
        this.financerNameList = data;
        console.log(this.financerNameList);
      }
    );


    // this.orderManagementService.ItemIdList()
    // .subscribe(
    //   data =>{ 
    //     this.ItemIdList = data;
    //     console.log(this.ItemIdList);
    //     });

    
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  OrderFind(orderNumber){
    alert(orderNumber);
    this.emplId=Number(sessionStorage.getItem('emplId'))
    this.orderlineDetailsArray().clear(); 
    this.displayfinanceType=false;
    this.displayfinancerName=false;
    this.displayfinanceAmt=false;
    this.displayemi=false;
    this.displaytenure=false;
    this.displaydownPayment=false;
    this.displayorderedDate=false;
    this.displaytransactionTypeName=false;
    this.displayflowStatusCode=false
    this.displaypayTermDesc=false
    this.displaysalesRepName=false;
    this.displaytlName=false;
    this.displayremarks=false;
    this.displayallotmentFlag=false;
    this.displaymodel=false;
    this.displayvariant=false
    this.displaycolor=false;
    this.displaysegment=false;
    this.displaycategory=false;
    this.displaypricingQty=false;
    this.displaytaxCategoryName=false;
    this.displayorderedItem=false;
<<<<<<< HEAD

=======
    this.SalesOrderBookingForm.patchValue({'emplId':Number(sessionStorage.getItem('emplId'))});
>>>>>>> 16fe2ae73245d25736e48240b3aca7a8626fc93e
    this.orderManagementService.getsearchByOrderNo(orderNumber)
    .subscribe(
      data => {
        this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
        let control=this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
        if (data.obj.flowStatusCode==='ENTERED'){
          this.displayorderLineDetailsPart=false;
          data.obj.emplId = this.emplId;
<<<<<<< HEAD
          data.obj.locCode=this.locCode;
          data.obj.ouId=this.ouId;
          console.log(data.obj.locCode);
          
=======
>>>>>>> 16fe2ae73245d25736e48240b3aca7a8626fc93e
        }
        else{
          this.displayorderLineDetailsPart=true; 
        }
        if (this.lstgetOrderLineDetails.length===0){
    this.displaycategory=true;
    this.displaypricingQty=true;
    this.displaytaxCategoryName=true;
    this.displayorderedItem=true;
    this.displaysegment=true;
          this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
        }
        else{
        for (let i=0;i<=this.lstgetOrderLineDetails.length-1;i++){
          var oeOrderLinesAllList1: FormGroup=this.orderlineDetailsGroup();
          control.push(oeOrderLinesAllList1);
        }
       
      }
<<<<<<< HEAD
=======
      
>>>>>>> 16fe2ae73245d25736e48240b3aca7a8626fc93e
        this.SalesOrderBookingForm.patchValue(data.obj);
        alert(sessionStorage.getItem('emplId'));
      }
    )
    // this.SalesOrderBookingForm.patchValue({emplId:this.emplId})
    // alert(sessionStorage.getItem('emplId'));
    // this.emplId=Number(sessionStorage.getItem('emplId'));
    // this.emplId=Number(sessionStorage.getItem('emplId'))
    // this.SalesOrderBookingForm.patchValue({'emplId':Number(sessionStorage.getItem('emplId'))});
    // debugger;
    this.SalesOrderBookingForm.controls['emplId'].patchValue(Number(sessionStorage.getItem('emplId')));
    // alert(Number(sessionStorage.getItem('emplId')));
    // this.SalesOrderBookingForm.get('emplId').patchValue(Number(sessionStorage.getItem('emplId')));
    
    // setValue(Number(sessionStorage.getItem('emplId')));
    // this.SalesOrderBookingForm.get('emplId').patchValue('emplId');
  }

  addRow() {
    this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
  }

  RemoveRow(index){
    this.orderlineDetailsArray().removeAt(index);
  }

  
  onOptionsSelectedCategory(category:any){
 if (category === 'EW') {
  this.displayEWDetails = false;
}
else if (category === 'INS') {
    this.displayInsDetails=false;
  }

this.orderManagementService.addonItemList(category)
    .subscribe(
      data => {
        this.addonItemList = data;
        // this.orderedItem=data.description;
      }
    );
  }

  onOptionsSelectedDescription(segment:any){
// alert(segment);
this.orderManagementService.addonDescList(segment)
    .subscribe(
      data => {
        this.addonDescList = data;
        console.log(this.addonDescList[0].description);
        this.orderedItem=this.addonDescList[0].description;
        this.taxCategoryName=this.addonDescList[0].taxCategoryName;
        this.hsnSacCode=this.addonDescList[0].hsnSacCode;
        // alert(data.description1);
        console.log(this.taxCategoryName);  
      }
     
    
    );
    
  }

  refresh() {
    window.location.reload();
  }
  close() {
    this.router.navigate(['admin']);
  }  
<<<<<<< HEAD

  transData(val) {
    // delete val.categoryId;
    return val;
  }


  OrderBooked(){
    // this.flowStatusCode='BOOKED';
    const formValue: ISalesBookingForm = this.transData(this.SalesOrderBookingForm.value);
    formValue.flowStatusCode= 'BOOKED';
    this.orderManagementService.OrderBook(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        // this.SalesOrderBookingForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          // this.SalesOrderBookingForm.reset();
        }
      }
    });
  }


  receiptPayment(){
    this.router.navigate(['/paymentReceipt']);
  }

  paymentReceipt(orderNumber){
   alert(this.orderNumber) ;
   this.orderManagementService.getOmReceiptSearchByOrdNo(orderNumber)
   .subscribe(
   data => {
     this.lstcommentsbyorderNo = data.obj.oePayList;
     console.log(this.lstcommentsbyorderNo);
    }
   );
  }
=======

  transData(val) {
    // delete val.categoryId;
    return val;
  }


  OrderBooked(){
    this.flowStatusCode='BOOKED'
    this.emplId=Number(sessionStorage.getItem('emplId'));
    const formValue: ISalesBookingForm = this.transData(this.SalesOrderBookingForm.value);
    console.log(this.emplId);
    this.orderManagementService.OrderBook(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        // this.SalesOrderBookingForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          // this.SalesOrderBookingForm.reset();
        }
      }
    });
  }

>>>>>>> 16fe2ae73245d25736e48240b3aca7a8626fc93e
}


