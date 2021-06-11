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
customerId: 8,
custType: string;
accountNo: number;
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
  pricingQty: number;
  taxCategoryId: number;
  orgId: number;
  adhocDiscount: number;
  adhocConsu: number;
  additionalDisc: number;
  adhocExchBonus: number;
  adhocFinanceOffer: number;
  adhocISL: number;
  itemType: string;
}


@Component({
  selector: 'app-counter-sale',
  templateUrl: './counter-sale.component.html',
  styleUrls: ['./counter-sale.component.css']
})
export class CounterSaleComponent implements OnInit {
  CounterSaleOrderBookingForm: FormGroup;
  // divisionName: string;
  // itemId:number;
  // ouName: string;
  // indexVal: number;
  // locCode: string;
  itemType:string;
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
accountNo: number;
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
  orderType:string;
  deptId:number;
  createOrder:string;
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
      accountNo: [''],
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
      orderType:[''],
      createOrder:[''],
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
      itemType:[''],
      hsnSacCode:[''],
      invType:[''],
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

  }


  CounterSaleOrderBooking(CounterSaleOrderBookingForm: any) {
  }




  OrderFind(orderNumber) {
    this.emplId = Number(sessionStorage.getItem('emplId'));
    // this.orderlineDetailsArray().clear();
    this.orderManagementService.getsearchByOrderNo(orderNumber)
    .subscribe(
      data => {
        this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
        this.lstgetOrderTaxDetails = data.obj.taxAmounts;
       let control = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
        let control1 = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
        if (data.obj.flowStatusCode === 'ENTERED') {
          // this.displayorderLineDetailsPart = false;
          data.obj.emplId = this.emplId;
          data.obj.locCode = this.locCode;
          data.obj.ouId = this.ouId;
          console.log(data.obj.locCode);

        }
        else {
          // this.displayorderLineDetailsPart = true;
        }
        if (this.lstgetOrderLineDetails.length === 0) {
          this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
        }
        else {
          for (let i = 0; i <= this.lstgetOrderLineDetails.length - 1; i++) {
            var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
            control.push(oeOrderLinesAllList1);
          }
        
          // for (let i = 0; i < data.obj.oeOrderLinesAllList[i].taxAmounts.length - 1; i++) {
          //   var invLnGrp: FormGroup = this.TaxDetailsGroup();
          //   this.TaxDetailsArray().push(invLnGrp);
          //.this.SalesOrderBookingForm.get('taxAmounts').patchValue(data.obj.oeOrderLinesAllList[i].taxAmounts);
          // }
        }
        this.CounterSaleOrderBookingForm.patchValue(data.obj);
        for (let i = 0; i <= this.lstgetOrderLineDetails.length - 1; i++) {
          control.controls[i].patchValue({itemType: this.lstgetOrderLineDetails[i].invType});
          // alert(this.lstgetOrderLineDetails[i].segment);
          control.controls[i].patchValue({ segment:this.lstgetOrderLineDetails[i].segment});
          control.controls[i].patchValue({ taxCategoryName:this.lstgetOrderLineDetails[i].taxCategoryName});
          control.controls[i].patchValue({ flowStatusCode:this.lstgetOrderLineDetails[i].flowStatusCode});
          // alert(this.lstgetOrderLineDetails[i].flowStatusCode);
          if (this.lstgetOrderLineDetails[i].flowStatusCode==='Invoiced'){
          // this.displayinvoiceButton=true;
          }
          else{
            // this.displayinvoiceButton=false;
          }
        }
       
        // (invLnGrp.controls[i]).patchValue({ taxCategoryName: data.oeOrderLinesAllList[i].taxCategoryName });
        // alert(data.obj.oeOrderLinesAllList[i].taxCategoryName);
      }
    )
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


onOptionsSelectedpaymentOption(payTermDesc){
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


onOptionsSelectedTL(ticketNo) {
  this.orderManagementService.ticketNoSearchFn(ticketNo)
    .subscribe(
      data => {
        this.ticketNoSearch = data.obj;
        console.log(this.ticketNoSearch);
        this.tlName = this.ticketNoSearch.leadTicketNo;
      }
    );
}

onOptionsSelectedlncategoryType(orderType){
alert(orderType);
this.itemType='SS_SPARES';
alert(this.itemType);
this.CounterSaleOrderBookingForm.patchValue({itemType: 'SS_SPARES'});
this.orderManagementService.getItemByCatType(this.itemType,1 )
      .subscribe(
        data => {
          this.invItemList1=data;
          this.orderedItem=data.description;
        }
      );
}


accountNoSearch(accountNo){
  this.orderManagementService.accountNoSearchFn(accountNo, this.ouId)
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
  alert(segment +'*****');
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
  // alert(i);
  var taxCategoryName = taxCategory.taxCategoryName;
  var taxCategoryId = taxCategoryId;
  this.indexVal = i;
  var arrayControl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;

  var amount = arrayControl[i].unitSellingPrice;
  // alert(amount);
  let select = this.taxCategoryList.find(d => d.taxCategoryName === taxCategoryName);
  // console.log(this.taxCategoryList[0].taxCategoryName);
  
  this.taxCategoryId= select.taxCategoryId;
  alert( this.taxCategoryId);
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
  const formValue: AccOrderLinesPost1 = this.transData(this.CounterSaleOrderBookingForm.value);
  // var accLines = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
  // var taxAmounts = this.CounterSaleOrderBookingForm.get('taxAmounts').value;
  // var req = new Array();
  // for(let i=0  ; i <accLines.length ; i++){
  //   var accArr1 = accLines[i];
  //   accArr1['orderNumber'] = formValue.orderNumber;
  //   accArr1['taxAmounts'] = taxAmounts;
  //   req.push(accArr1);
  // }
  
  this.ouId = Number(sessionStorage.getItem('ouId'));
  this.orderManagementService.SaveCounterSaleOrder(formValue).subscribe((res: any) => {
    if (res.code === 200) {
      this.orderNumber = res.obj;
      console.log(this.orderNumber);
      alert('RECORD INSERTED SUCCESSFULLY');
      // this.SalesOrderBookingForm.reset();
    } else {
      if (res.code === 400) {
        alert('Data already present in the data base');
        // this.SalesOrderBookingForm.reset();
      }
    }
  });
}
}


