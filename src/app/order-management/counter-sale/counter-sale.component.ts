import { Component, OnInit,HostListener ,ViewChild, ElementRef } from '@angular/core';
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


interface ISalesBookingForm {
emplId:number;
headerId: number;
ouId: number;
orderTypeId: string;
transactionTypeName: string;
createOrderType: string;
 custPoNumber: number;
orderedDate: Date;
priceListId: number;
priceListName: string;
paymentTermId: number;
payTermDesc: string;
locationId: number;
billToLocId: number;
shipToLocId: number;
billLocName: string;
shipLocName: string;
locCode: string;
customerId: number,
custType: string;
custAccountNo: number;
custName: string;
custAddress: string;
 salesRepName: string;
flowStatusCode: string;
tlName: string;
remarks: string;
subtotal: number;
totTax: number;
totAmt: number;
othRefNo: number;
orderNumber:number;
itemId:number;
taxCategoryId:number;
}

interface AccOrderLinesPost1 {
  lineNumber: number;
  orderNumber: number;
  segment: string;
  flowStatusCode:string;
  pricingQty: number;
  taxCategoryId: number;
  orgId: number;
  adhocDiscount: number;
  adhocConsu: number;
  additionalDisc: number;
  adhocExchBonus: number;
  adhocFinanceOffer: number;
  adhocISL: number;
  invType: string;
}


@Component({
  selector: 'app-counter-sale',
  templateUrl: './counter-sale.component.html',
  styleUrls: ['./counter-sale.component.css']
})
export class CounterSaleComponent implements OnInit {
  CounterSaleOrderBookingForm: FormGroup;
  // divisionName: string;
  invType:string;
  dept:number;
  // itemId:number;
  // ouName: string;
  // indexVal: number;
  // locCode: string;
  // invType:string;
  // ticketNo: string;
  // orderNumber: number;
  // accountNo: number;
  // custName: string;
  // orderedDate = new Date();
  // transactionTypeName: string;
  // flowStatusCode: string;
  // payTermDesc: string;
  // salesRepName: string;
  // tlName: string;
  // remarks: string;
  // subtotal: number;
  // totTax: number;
  // totAmt: number;
  // fuelType:string;
  // custAddress: string;
  // model: string;
  // variant: string;
  // color: string;
  // financeType: string;
  // financerName: string;
  // financeAmt: number;
  // emi: number;
  // tenure: number;
  // downPayment: number;
  // segment: string;
  orderedItem: string;
  // lineNumber: number;
  // pricingQty: number;
  // priceListName: string;
  // unitSellingPrice: number;
  // taxCategoryName: string;
  // baseAmt: number;
  // taxAmt: number;
  // totAmt1: number;
  // flowStatusCode1: string;
  // lstgetOrderDetails: any;
  // invItemId: number;
  // description: string;
  // category: string;
  // hsnSacCode: string;
  // emplId: number;
  // billLocName: string;
  // shipLocName: string;
  // ouId: number;
  // customerId: string;
  // billToAddress: string;
  // deptId: number;
  // locId: number;
  // gstNo: string;
  // panNo: string;
  // invType: string;
  // taxAmounts: number;
  // taxCategoryId: number;
  // // locCode:string;
  emplId:number;
  taxCategoryId:number;
headerId: number;
ouId: number;
orderTypeId: string;
transactionTypeName: string;
createOrderType: string;
 custPoNumber: number;
orderedDate: Date;
priceListId: number;
priceListName: string;
paymentTermId: number;
payTermDesc: string;
locationId: number;
billToLocId: number;
shipToLocId: number;
billLocName: string;
shipLocName: string;
locCode: string;
customerId: number;
custType: string;
custAccountNo: number;
custName: string;
custAddress: string;
 salesRepName: string;
flowStatusCode: string;
tlName: string;
remarks: string;
subtotal: number;
totTax: number;
totAmt: number;
othRefNo: number;
itemId:number;
indexVal:number;
orderNumber:number;
  adhocDiscount: number;
  adhocConsu: number;
  additionalDisc: number;
  adhocExchBonus: number;
  adhocFinanceOffer: number;
  billToAddress:string;
  adhocISL: number;
  state:string;
  // transactionTypeName:string;
  deptId:number;
  // createOrderType:string;
  ticketNo:string;
  locId:number;
  panNo:string;
  SelectCustType:string;
  ouName:string;
  gstNo:string;
  public taxCategoryList: any[];
  lstgetOrderLineDetails: any[];
  lstgetOrderTaxDetails: any[];
  newCustomerButton=true;
  PaymentButton=true;
  lstInvLineDeatails1: any[];
  displayorderLineDetailsPart = true;
  public payTermDescList: any;
  public orderTypeList:any;
  public ticketNoSearch: any;
  public taxCalforItem:any;
  public salesRepNameList: any;
  public priceListNameList: any;
  invItemList1: any[];
  public addonDescList: any[];

  @ViewChild("myinput") myInputField: ElementRef;
  @ViewChild("suppCode1") suppCode1: ElementRef;
  ngAfterViewInit() {
    // this.myInputField.nativeElement.focus();
  }

  constructor(private fb: FormBuilder, private location: Location, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.CounterSaleOrderBookingForm = fb.group({
      emplId:[''],
      headerId: [''],
      ouId: [''],
      orderTypeId: [''],
      transactionTypeName: [''],
      createOrderType: [''],
       custPoNumber: [''],
      orderedDate: [''],
      priceListId: [''],
      priceListName: [''],
      paymentTermId: [''],
      payTermDesc: [''],
      locationId: [''],
      billToLocId: [''],
      shipToLocId: [''],
      billLocName: [''],
      shipLocName: [''],
      locCode: [''],
      customerId: [''],
      custType: [''],
      custAccountNo: [''],
      custName: [''],
      custAddress: [''],
       salesRepName: [''],
      flowStatusCode:[''],
      tlName: [''],
      remarks: [''],
      subtotal: [''],
      totTax: [''],
      totAmt: [''],
      othRefNo: [''],
      orderNumber:[''],
      state:[''],
      gstNo:[''],
      panNo:[],
      // orderType:[''],
      // createOrderType:[''],
      billToAddress:[''],
      oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
      taxAmounts: this.fb.array([this.TaxDetailsGroup()])
    })
   }


   orderlineDetailsArray(): FormArray {
    return <FormArray>this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList')
  }

   orderlineDetailsGroup() {
    return this.fb.group({
      // lineNumber:[''],
      // segment:[''],
      itemId:[],
      orderedItem: [''],
      pricingQty:[''],
      unitSellingPrice: [''],
      taxCategoryName: [''],
      baseAmt:[''],
      taxAmt:[''],
      totAmt:[''],
      flowStatusCode:[''],
      category:[''],
      invType:[''],
      hsnSacCode:[''],
      // invType:[''],
      taxCategoryId:[''],
      displaysegment: false,
      lineNumber: [''],
      orderNumber: [''],
      segment: [''],
      orgId: [''],
      adhocDiscount: [''],
      adhocConsu: [''],
      additionalDisc: [''],
      adhocExchBonus: [''],
      adhocFinanceOffer: [''],
      adhocISL: [''],
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
    return <FormArray>this.CounterSaleOrderBookingForm.get('taxAmounts')
  }

  ngOnInit(): void {
    // this.divisionName = sessionStorage.getItem('divisionName');
    this.dept=Number(sessionStorage.getItem('deptId'));
    this.ouName = (sessionStorage.getItem('ouName'));
    this.locCode = (sessionStorage.getItem('locCode'));
    this.ticketNo = (sessionStorage.getItem('ticketNo'));
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.deptId = Number(sessionStorage.getItem('deptId'));
    this.locId = Number(sessionStorage.getItem('locId'));


    this.service.payTermDescList()
    .subscribe(
      data => {
        this.payTermDescList = data;
        console.log(this.payTermDescList);
      }
    );

    this.service.taxCategoryListForSALES()
    .subscribe(
      data1 => {
        this.taxCategoryList = data1;
        console.log(this.taxCategoryList);
        data1 = this.taxCategoryList;
      }
    );
   
    this.orderManagementService.orderTypeList(this.deptId, this.locId, this.ouId)
    .subscribe(
      data => {
        this.orderTypeList = data;
        console.log(this.orderTypeList);
      }
    );
 


    

    
    this.service.salesRepNameList(this.ouId, this.locId, this.deptId)
    .subscribe(
      data => {
        this.salesRepNameList = data.obj;
        console.log(this.salesRepNameList);
      }
    );

    this.orderManagementService.priceListNameList()
    .subscribe(
      data => {
        this.priceListNameList = data;
        console.log(this.priceListNameList);
      }
    );



    this.orderlineDetailsGroup();
    var patch=this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray
     (patch.controls[0]).patchValue(
      {
        lineNumber: 1,
      }
    );



  }


  CounterSaleOrderBooking(CounterSaleOrderBookingForm: any) {
  }


  OrderFind(orderNumber){
    alert(orderNumber)
    this.emplId = Number(sessionStorage.getItem('emplId'))
    this.orderlineDetailsArray().clear();
    this.TaxDetailsArray().clear();
    this.orderManagementService.counterSaleOrderSearch(orderNumber)
    .subscribe(
      data => {
        this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
        this.lstgetOrderTaxDetails = data.obj.oeOrderLinesAllList[0].taxAmounts;
        console.log(this.lstgetOrderLineDetails[0].taxAmounts);
        let control = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
        let control1 = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
        for (let i = 0; i <= this.lstgetOrderLineDetails.length - 1; i++) {
          var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
          control.push(oeOrderLinesAllList1);
      }
      for (let j = 0; j <= this.lstgetOrderTaxDetails.length-1 ; j++) {        
        var orderTaxLinesList: FormGroup=this.TaxDetailsGroup();
        control1.push(orderTaxLinesList);
    }
    this.CounterSaleOrderBookingForm.patchValue(data.obj);
    this.CounterSaleOrderBookingForm.patchValue(data.obj.oeOrderLinesAllList[0].taxAmounts);
  });
  this.CounterSaleOrderBookingForm.controls['emplId'].patchValue(Number(sessionStorage.getItem('emplId')));
  }


  onOptionsSelectedCustomerType(SelectCustType:any){
    if(SelectCustType == 'New Customer'){
      this.newCustomerButton = true;
  }
  else{
    this.newCustomerButton = false;
    // (<any>this.CounterSaleOrderBookingForm.get('accountNo')).nativeElement.focus();
  }
}

// onKeyPaymentTerm(payTermDesc){
//   alert(payTermDesc);
//   let select = this.payTermDescList.find(d => d.cmnDesc === payTermDesc);
//   this.paymentTermId = select.cmnTypeId;
// }

onOptionsSelectedpaymentOption(payTermDesc){
  alert(payTermDesc);
  let select = this.payTermDescList.find(d => d.codeDesc === payTermDesc);
  alert(select);
  this.paymentTermId = select.cmnTypeId;  
  if(payTermDesc==='IMMEDIATE'){
    this.PaymentButton=false;
  }
  else{
    this.PaymentButton=true;
  }
 
}

close() {
  this.router.navigate(['admin']);
}

refresh() {
  window.location.reload();
}


onOptionsSelectedTL(salesRepName) {
  alert(salesRepName);
  this.orderManagementService.ticketNoSearchFn(salesRepName,this.dept)
    .subscribe(
      data => {
        this.ticketNoSearch = data.obj;
        console.log(this.ticketNoSearch);
        this.tlName = this.ticketNoSearch.leadTicketNo;
      }
    );
}



onOptionsSelectedPriceListID(priceListName) {
  // alert(priceListName);
    let select = this.priceListNameList.find(d => d.priceListName === priceListName);
    // alert(select);
    this.priceListId = select.priceListHeaderId
}


onOptionsSelectedlncategoryType(orderType){
alert(orderType);
this.invType='SS_SPARES';
alert(this.invType);
this.CounterSaleOrderBookingForm.patchValue({invType: 'SS_SPARES'});
this.orderManagementService.getItemByCatType(this.invType,1 )
      .subscribe(
        data => {
          this.invItemList1=data;
          this.orderedItem=data.description;
        }
      );
}


accountNoSearch(custAccountNo){
  this.orderManagementService.accountNoSearchFn(custAccountNo, this.ouId)
  .subscribe(
    data => {
      this.accountNoSearch = data;
      console.log(this.accountNoSearch);
      this.CounterSaleOrderBookingForm.patchValue(this.accountNoSearch);
      this.custAddress=data.billToAddress;
    }
  );
}


onKey(index) {
  console.log(index);

  var arrayControl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value
  var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
  console.log(arrayControl);
  var itemId=arrayControl[index].itemId;
 var baseAmt = arrayControl[index].unitSellingPrice * arrayControl[index].pricingQty;
  // alert(arrayControl[index].baseAmtLineWise);
     var diss = 0;
  var sum = 0;
  // var baseAmount = this.sum;
  this.service.taxCalforItem(itemId, this.taxCategoryId, diss, baseAmt)
    .subscribe(
      (data: any[]) => {
        this.taxCalforItem = data;
        console.log(this.taxCalforItem);

        for (let i = 0; i < this.taxCalforItem.length; i++) {

          if (this.taxCalforItem[i].totTaxPer != 0) {
            sum = sum + this.taxCalforItem[i].totTaxAmt
          }
        }
        (patch.controls[index]).patchValue({
          baseAmt: baseAmt,
          // baseAmtLineWise: arrayControl[index].baseAmtLineWise,
          taxAmt: sum,
          totAmt: baseAmt + sum,
        });
        let controlinv1 = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
        this.TaxDetailsArray().clear();
        // alert(data.length);
        for (let i = 0; i < data.length; i++) {
          var invLnGrp: FormGroup = this.TaxDetailsGroup();
          // this.TaxDetailsArray().push(invLnGrp);
          controlinv1.push(invLnGrp);
        }
        this.CounterSaleOrderBookingForm.get('taxAmounts').patchValue(data);
      });

}



onOptionsSelectedDescription(segment: any, k) {
  // alert(segment +'*****');
  // let select = this.invItemList1.find(d => d.SEGMENT === segment);
  let select = this.invItemList1.find(d => d.segment === segment);
  this.CounterSaleOrderBookingForm.patchValue({itemId:select.itemId})
  this.itemId = select.itemId;
  this.orderManagementService.addonDescList(segment)
    .subscribe(
      data => {
        this.addonDescList = data;
        let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
        for(let i=0; i <data.length; i++){
          var taxCatNm : string = data[i].taxCategoryName;
          if(taxCatNm.includes('Sale')){
            // alert('sale');
            (controlinv.controls[k]).patchValue({
              itemId: data[i].itemId,                
              orderedItem: data[i].description,
              hsnSacCode: data[i].hsnSacCode,
              taxCategoryId: data[i].taxCategoryId,
              taxCategoryName: data[i].taxCategoryName,
              unitSellingPrice:data[i].priceValue,
              });
          }
          // alert(this.orderedItem);
        }
    
     
    }

    );

}


onOptionTaxCatSelected(taxCategory, i) {
 alert('******** ITEM *******');
  var taxCategoryName = taxCategory.taxCategoryName;
  var taxCategoryId = taxCategoryId;
  this.indexVal = i;
  var arrayControl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;

  var amount = arrayControl[i].unitSellingPrice;
  
  let select = this.taxCategoryList.find(d => d.taxCategoryName === taxCategoryName);
  
  this.taxCategoryId= select.taxCategoryId;
console.log(this.taxCategoryId);

  let controlinv = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
  var disAm = 0;
  this.transactionService.getTaxDetails(taxCategoryId, sessionStorage.getItem('ouId'), disAm, amount)
    .subscribe(
      data  => {
        this.lstInvLineDeatails1 = data;
        console.log(this.lstInvLineDeatails1);
        let controlinv1 = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
        this.TaxDetailsArray().clear();
        // alert(data.length);
        for (let i = 0; i < data.length; i++) {
          var invLnGrp: FormGroup = this.TaxDetailsGroup();
          controlinv1.push(invLnGrp);
        }

        this.CounterSaleOrderBookingForm.get('taxAmounts').patchValue(data);
      }



    )
}



addDiscount(selectedLine){}
// counterSaleOrderSave(){}


transData(val) {
  return val;
}

counterSaleOrderSave(){
  const formValue: ISalesBookingForm = this.transData(this.CounterSaleOrderBookingForm.value);
  // var accLines = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
  // var taxAmounts = this.CounterSaleOrderBookingForm.get('taxAmounts').value;
  // var req = new Array();
  // for(let i=0  ; i <accLines.length ; i++){
  //   var accArr1 = accLines[i];
  //   accArr1['orderNumber'] = formValue.orderNumber;
  //   accArr1['taxAmounts'] = taxAmounts;
  //   req.push(accArr1);
  // }
  formValue.flowStatusCode = 'BOOKED';  
  this.ouId = Number(sessionStorage.getItem('ouId'));
  this.orderManagementService.SaveCounterSaleOrder(formValue).subscribe((res: any) => {
    if (res.code === 200) {
      this.orderNumber = res.obj;
      console.log(this.orderNumber);
      alert(res.message);
      // this.SalesOrderBookingForm.reset();
    } else {
      if (res.code === 400) {
        alert(res.message);
        // this.SalesOrderBookingForm.reset();
      }
    }
  });
}

addRow(){
  this.orderlineDetailsArray().push(this. orderlineDetailsGroup());
  var len=this.orderlineDetailsArray().length;
  alert(len);
  var patch=this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray
  (patch.controls[len-1]).patchValue(
   {
    lineNumber: len,
   }
 );
  }

  RemoveRow(OrderLineIndex){
    this.orderlineDetailsArray().removeAt(OrderLineIndex);
    
  }


}


