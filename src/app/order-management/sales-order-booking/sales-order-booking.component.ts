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
  billToAddress:string;
  gstNo:string;
  panNo:string;
  invType:string;
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
  billLocName:string;
  shipLocName:string;
  ouId:number;
  customerId:string;
  billToAddress:string;
  deptId:number;
  locId:number;
  gstNo:string;
  panNo:string;
  invType:string;
  // locCode:string;
  lstgetOrderLineDetails: any[];
  lstgetOrderTaxDetails:any[];
  public financeTypeList:any;
  public financerNameList:any;
  public VariantSearch:any;
  public ticketNoSearch:any;
  public priceListNameList:any;
  public ColourSearch:any;
  public transactionTypeNameList:any;
  public payTermDescList:any;
  public salesRepNameList:any;
  

  public orderLines:any[];
  hideArray: Array<boolean> = [];
  displayOrderLine: Array<boolean> = [];
  public ItemIdList:Array<string>=[];
  public mainModelList:Array<string>[];
  // public addonItemList:Array<string>=[];
  public addonItemList:any[];
  public addonDescList:any[];
  public colorCodeList:Array<string>[];
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
  displayPrice=true;
  displaypriceListName=true;

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
  priceListName:[''],
  billLocName:[''],
  shipLocName:[''],
  ouId:[''],
  customerId:[''],
  billToAddress:[''],
  gstNo:[''],
  panNo:[''],
  oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
  // taxAmounts: this.fb.array([this.TaxDetailsArray()])
  taxAmounts: this.fb.array([this.TaxDetailsGroup()])
    })
   
  }


  TaxDetailsGroup() {
    return this.fb.group({
      totTaxAmt: [],
      lineNumber: [],
      taxRateName: [],
      taxTypeName: [],
      taxPointBasis: [],
      precedence1: [],
      precedence2: [],
      precedence3: [],
      precedence4: [],
      precedence5: [],
      precedence6: [],
      precedence7: [],
      precedence8: [],
      precedence9: [],
      precedence10: [],
      currencyCode: [],
      totTaxPer: [],
      recoverableFlag: [],
      selfAssesedFlag: [],
      inclusiveFlag: [],
      invLineItemId: [],
      invLineNo: [],
    });
  }

  TaxDetailsArray(): FormArray {
    // return this.lineDetailsArray.controls[].get('taxAmounts') as FormArray
    return <FormArray>this.SalesOrderBookingForm.get('taxAmounts')
  }


  // TaxDetailsArray() {
  //   return this.fb.group({

  //   })
  // }

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
      invType:[''],
     
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
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.deptId=Number(sessionStorage.getItem('deptId'));
    this.locId=Number(sessionStorage.getItem('locId'));


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


    this.service.mainModelList()
    .subscribe(
      data => {
        this.mainModelList = data;
        console.log(this.mainModelList);
      }
    );


    this.service.colorCodeList()
    .subscribe(
      data => {
        this.colorCodeList = data;
        console.log(this.colorCodeList);
      }
    );

    this.service.transactionTypeNameList(this.deptId,this.locId,this.ouId)
    .subscribe(
      data => {
        this.transactionTypeNameList = data;
        console.log(this.transactionTypeNameList);
      }
    );

    this.service.payTermDescList()
    .subscribe(
      data => {
        this.payTermDescList = data;
        console.log(this.payTermDescList);
      }
    );

    this.orderManagementService.priceListNameList()
    .subscribe(
      data => {
        this.priceListNameList = data;
        console.log(this.priceListNameList);
      }
    );
    
    
    this.service.salesRepNameList(this.ouId,this.locId,this.deptId)
    .subscribe(
      data => {
        this.salesRepNameList = data.obj;
        console.log(this.salesRepNameList);
      }
    );
    
    
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
    this.displayPrice=false;
    this.displaypriceListName=false;
    this.orderManagementService.getsearchByOrderNo(orderNumber)
    .subscribe(
      data => {
        this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
        this.lstgetOrderTaxDetails=data.obj.taxAmounts;
        let control=this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
        let control1=this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
        if (data.obj.flowStatusCode==='ENTERED'){
          this.displayorderLineDetailsPart=false;
          data.obj.emplId = this.emplId;
          data.obj.locCode=this.locCode;
          data.obj.ouId=this.ouId;
          console.log(data.obj.locCode);
          
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
        for (let i=0;i<=this.lstgetOrderTaxDetails.length-1;i++){
          // alert(this.lstgetOrderTaxDetails.length-1);
          var lstgetOrderTaxDetails1: FormGroup=this.TaxDetailsGroup();
          control.push(lstgetOrderTaxDetails1);
        }
      }
        this.SalesOrderBookingForm.patchValue(data.obj);
      }
    )
    this.SalesOrderBookingForm.controls['emplId'].patchValue(Number(sessionStorage.getItem('emplId')));
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


  // receiptPayment(orderNumber){
  //   alert(this.orderNumber);
  //   this.router.navigate(['/paymentReceipt',orderNumber]);
  // }

  // PaymentReceipt(orderNumber){
  //  alert("ORDER numnber>>"+this.orderNumber) ;
  //  this.orderManagementService.getOmReceiptSearchByOrdNo(orderNumber)
  //  .subscribe(
  //  data => {
  //    this.lstcommentsbyorderNo = data.obj.oePayList;
  //    console.log(this.lstcommentsbyorderNo);
  //   }
  //  );
  // }



  accountNoSearch(accountNo){
    this.orderManagementService.accountNoSearchFn(accountNo,this.ouId)
    .subscribe(
      data => {
        this.accountNoSearch = data;      
        console.log(this.accountNoSearch);
        this.SalesOrderBookingForm.patchValue(this.accountNoSearch);
      }
    );
  }

  onOptionsSelectedVariant(mainModel){
    this.orderManagementService.VariantSearchFn(mainModel)
    .subscribe(
      data => {
        this.VariantSearch = data;
        console.log(this.VariantSearch);
      }
    );
  }


  onOptionsSelectedTL(ticketNo){
    this.orderManagementService.ticketNoSearchFn(ticketNo)
    .subscribe(
      data => {
        this.ticketNoSearch = data.obj;
        console.log(this.ticketNoSearch);
        this.tlName=this.ticketNoSearch.leadTicketNo;
      }
    );
  }

  onOptionsSelectedColor(variant){
    this.orderManagementService.ColourSearchFn(variant)
    .subscribe(
      data => {
        this.ColourSearch = data;
        console.log(this.ColourSearch);
      }
    );
  }


}


