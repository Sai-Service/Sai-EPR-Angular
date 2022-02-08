import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';

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


interface ISalesBookingForm {
  locationId:number;
  shipLocName:string;
  ouId:number;
  locCode:string;
  divisionName:string;
  ouName:string;
  ticketNo:string;
  deptId:number;
  emplId:number;
  locId:number;
  deptName:string;
  loginOuId1:number;
  billLocName:string;
  customerId:number;
  orderNumber:number;
  gstNo:string;
  panNo:string;
  accountNo:number;
  paymentTermId:number;
  payTermDesc:string;
  custAddress:string;
  billToAddress:string;
  custName:string;
  transactionTypeName:string;
  orderedDate:Date;
  flowStatusCode:string;
  salesRepName:string;
  tlName:string;
  remarks:string;
  priceListName:string;
  subtotal:number;
  totTax:number;
  totAmt:number;
  model:string;
  variant:string;
  color:string;
  fuelType:string;
  taxiYN:string;
  financeType:string;
  financerName:string;
  financeAmt:number;
  emi:number;
  tenure:number;
  downPayment:number;
  exchange:string;
  loyaltyBonus:number;
  exRegNo:string;
  insCharges:number;
  offerPrice:number;
  //// Line details //////
  lineNumber:number;
  tcs:string;
  itemId:number;
  orderedItem: string;
  pricingQty:number;
  unitSellingPrice: number;
  taxCategoryName: string;
  baseAmt:number;
  taxAmt:number;
  category:string;
  itemType:string;
  hsnSacCode:string;
  invType:string;
  taxCategoryId:number;
  displaysegment: false;
  segment: string;
  orgId: number;
  adhocDiscount: number;
  adhocConsu: number;
  additionalDisc: number;
  adhocExchBonus: number;
  adhocFinanceOffer:number;
  adhocISL: number;
  //////// Tax Details Line //////
  totTaxAmt: number;
taxRateName: string;
taxTypeName: string;
taxPointBasis: string;
precedence1: number;
precedence2: number;
precedence3: number;
precedence4: number;
precedence5: number;
precedence6: number;
precedence7: number;
precedence8: number;
precedence9: number;
precedence10: number;
currencyCode: number;
totTaxPer: number;
recoverableFlag: string;
selfAssesedFlag: string;
inclusiveFlag: string;
invLineNo: number;
invLineItemId:number;
}

@Component({
  selector: 'app-om-sales-order-form',
  templateUrl: './om-sales-order-form.component.html',
  styleUrls: ['./om-sales-order-form.component.css']
})
export class OmSalesOrderFormComponent implements OnInit {
  SalesOrderBookingForm: FormGroup;
  locationId:number;
  shipLocName:string;
  ouId:number;
  locCode:string;
  divisionName:string;
  ouName:string;
  ticketNo:string;
  deptId:number;
  emplId:number;
  locId:number;
  deptName:string;
  loginOuId1:number;
  billLocName:string;
  customerId:number;
  orderNumber:number;
  gstNo:string;
  panNo:string;
  accountNo:number;
  paymentTermId:number;
  payTermDesc:string;
  custAddress:string;
  billToAddress:string;
  custName:string;
  transactionTypeName:string;
  orderedDate = new Date();
  flowStatusCode:string;
  salesRepName:string;
  tlName:string;
  remarks:string;
  priceListName:string;
  subtotal:number;
  totTax:number;
  totAmt:number;
  model:string;
  variant:string;
  color:string;
  fuelType:string;
  taxiYN:string;
  financeType:string;
  financerName:string;
  financeAmt:number;
  emi:number;
  tenure:number;
  downPayment:number;
  exchange:string;
  loyaltyBonus:number;
  exRegNo:string;
  insCharges:number;
  offerPrice:number;
  //  Line Details ////
  lineNumber:number;
  tcs:string;
  itemId:number;
  orderedItem: string;
  pricingQty:number;
  unitSellingPrice: number;
  taxCategoryName: string;
  baseAmt:number;
  taxAmt:number;
  category:string;
  itemType:string;
  hsnSacCode:string;
  invType:string;
  taxCategoryId:number;
  displaysegment: false;
  segment: string;
  orgId: number;
  adhocDiscount: number;
  adhocConsu: number;
  additionalDisc: number;
  adhocExchBonus: number;
  adhocFinanceOffer:number;
  adhocISL: number;
////// Tax Details Line ///////
totTaxAmt: number;
taxRateName: string;
taxTypeName: string;
taxPointBasis: string;
precedence1: number;
precedence2: number;
precedence3: number;
precedence4: number;
precedence5: number;
precedence6: number;
precedence7: number;
precedence8: number;
precedence9: number;
precedence10: number;
currencyCode: number;
totTaxPer: number;
recoverableFlag: string;
selfAssesedFlag: string;
inclusiveFlag: string;
invLineNo: number;
invLineItemId:number;

  currentOpration:string;

  displayorderDetails=true;
  displayVehicleDetails=true;
  displayAdditonalDetails=true;
  displayCreateOrderButton=false;
  displayLineTaxDetails=true;
  displayAllButtons=true;
  displaysegmentInvType:Array<boolean>=[];
  displayLineflowStatusCode:Array<boolean>=[];
  displaytaxCategoryName:Array<boolean>=[];
  displayRemoveRow:Array<boolean>=[];
  displayCounterSaleLine: Array<boolean> = [];
  public itemMap=new Map <string,any[]>();
  displayEnterStatusButton=true;


  public ticketNoSearch: any;
  public YesNoList: Array<string> = [];
  public transactionTypeNameList: any;
  public payTermDescList: any;
  public salesRepNameList: any;
  public taxCategoryList: any[];
  public viewAllInvoiceData:any[];
  public priceListNameList: any;
  public mainModelList: Array<string>[];
  public VariantSearch:  Array<string>[];
  public ColourSearch: any;
  public financeTypeList: any;
  public financerNameList: any;
  public lineLevelOrderStatusList:any;
  categoryList: any[];
  lstgetOrderLineDetails: any[];
  lstgetOrderTaxDetails: any[];
  allDatastore:any;

  constructor(private fb: FormBuilder, private location: Location, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.SalesOrderBookingForm = fb.group({
      locationId:[''],
      shipLocName:[''],
      ouId:[''],
      locCode:[''],
      divisionName:[''],
      ouName:[''],
      ticketNo:[''],
      deptId:[''],
      emplId:[''],
      locId:[''],
      deptName:[''],
      loginOuId1:[''],
      billLocName:[''],
      customerId:[''],
      orderNumber:[''],
      gstNo:[''],
      panNo:[''],
      accountNo:[''],
      paymentTermId:[''],
      payTermDesc:[''],
      custAddress:[''],
      billToAddress:[''],
      custName:[''],
      transactionTypeName:[''],
      orderedDate:[''],
      flowStatusCode:[''],
      salesRepName:[''],
      tlName:[''],
      remarks:[''],
      priceListName:[''],
      subtotal:[''],
      totTax:[''],
      totAmt:[''],
      model:[''],
      variant:[''],
      color:[''],
  fuelType:[''],
  taxiYN:[''],
  financeType:[''],
  financerName:[''],
  financeAmt:[''],
  emi:[''],
  tenure:[''],
  downPayment:[''],
  exchange:[''],
  loyaltyBonus:[''],
  exRegNo:[''],
  insCharges:[''],
  offerPrice:[''],
  tcs:[''],
  oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
  taxAmounts: this.fb.array([this.TaxDetailsGroup()])
    })
   }

   orderlineDetailsGroup() {
    return this.fb.group({
      lineNumber:[''],
      tcs:[''],
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
      orderNumber: [''],
      segment: [''],
      // pricingQty: [''],
      // taxCategoryId: [''],
      orgId: [''],
      adhocDiscount: [''],
      adhocConsu: [''],
      additionalDisc: [''],
      adhocExchBonus: [''],
      adhocFinanceOffer: [''],
      adhocISL: [''],
    })
  }


  orderlineDetailsArray(): FormArray {
    return <FormArray>this.SalesOrderBookingForm.get('oeOrderLinesAllList')
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
      itemId: [],
      invLineNo: [],
      invLineItemId:[],
    });
  }

  TaxDetailsArray(): FormArray {
    return <FormArray>this.SalesOrderBookingForm.get('taxAmounts')
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
    this.deptName=(sessionStorage.getItem('deptName'));
    this.loginOuId1=Number(sessionStorage.getItem('loginOuId1'));


    this.orderlineDetailsGroup();
    var patch=this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray
     (patch.controls[0]).patchValue(
      {
        lineNumber: 1,
      }
    );


    this.service.taxCategoryListForSALES()
    .subscribe(
      data1 => {
        this.taxCategoryList = data1;
        console.log(this.taxCategoryList);
      }
    );

  
    this.orderManagementService.lineLevelOrderStatus()
    .subscribe(
      data1 => {
        this.lineLevelOrderStatusList = data1;
        console.log(this.lineLevelOrderStatusList);
      }
    );
    


    this.service.transactionTypeNameList(this.deptId, this.locId, this.ouId)
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

    
    this.service.mainModelList()
      .subscribe(
        data => {
          this.mainModelList = data;
          console.log(this.mainModelList);
        }
      );


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

      this.orderManagementService.categoryList()
    .subscribe(
      data1 => {
        this.categoryList = data1;
        if (this.deptName==='TrueValue'){}
      else{
        if(this.deptName==='Sales'){
          for (let i=0;i<data1.length;i++){
            if (data1[i].itemType==='SS_VEHICLE'){
              this.categoryList.splice(i,1)
            }
          }
        }        
     
      }
    }
    );

      this.service.YesNoList()
      .subscribe(
        data => {
          this.YesNoList = data;
          console.log(this.YesNoList);
        }
      );
  }

  
  SalesOrderBooking(SalesOrderBookingForm: any) {}

  OrderFind(orderNumber){
    this.currentOpration='orderSearch';
    this.emplId = Number(sessionStorage.getItem('emplId'))
    this.orderlineDetailsArray().clear();
    this.TaxDetailsArray().clear();
    this.orderManagementService.getsearchByOrderNo(orderNumber)
    .subscribe(
      data => {
        this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
        this.lstgetOrderTaxDetails = data.obj.taxAmounts;
        this.allDatastore=data.obj;
        let control = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
        let control1 = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
        if (this.lstgetOrderLineDetails.length === 0 && this.lstgetOrderTaxDetails.length===0) {
          this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
          this.TaxDetailsArray().push(this.TaxDetailsGroup());
          if (data.obj.flowStatusCode=='ENTERED'){
            this.displayAllButtons=true;
            this.displayEnterStatusButton=false;
          }
          else if (data.obj.flowStatusCode=='BOOKED'){
            this.displayAllButtons=false;
            this.displayLineTaxDetails=false;
          }
        }
        else{
          for (let i = 0; i < this.lstgetOrderLineDetails.length; i++) {
            var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
            control.push(oeOrderLinesAllList1);
            if (data.obj.flowStatusCode=='BOOKED' && this.lstgetOrderLineDetails.length != 0){
              this.displayAllButtons=false;
              this.displayLineTaxDetails=false;
            }
          }
        }
        this.SalesOrderBookingForm.patchValue(data.obj);
        this.salesRepName=data.obj.salesRepName;
      })
      this.SalesOrderBookingForm.get('accountNo').disable();
      this.displayorderDetails=false;
      this.displayVehicleDetails=false;
      this.displayCreateOrderButton=true;
      this.displayCreateOrderButton=true;
  }

  accountNoSearch(accountNo){
    this.orderManagementService.accountNoSearchFn(accountNo, this.ouId,(sessionStorage.getItem('divisionId')))
    .subscribe(
      data => {
        this.accountNoSearch = data.obj;
        console.log(this.accountNoSearch);
        this.SalesOrderBookingForm.patchValue(this.accountNoSearch);
        this.paymentTermId=data.obj.termId;
        this.payTermDesc=data.obj.paymentType;
      }
    );
  }


  onOptionsSelectedTL(ticketNo:any) {
    var dept = Number(sessionStorage.getItem('deptId'));
    if (ticketNo != null){
    this.orderManagementService.ticketNoSearchFn(ticketNo,dept)
      .subscribe(
        data => {
          this.ticketNoSearch = data.obj;
          console.log(this.ticketNoSearch);
          if (this.ticketNoSearch.leadTicketNo !=null){
          this.SalesOrderBookingForm.patchValue({tlName:this.ticketNoSearch.leadTicketNo})
        }
        }
      );
    }
  }

  

  OrderBooked() {
    const formValue: ISalesBookingForm =(this.SalesOrderBookingForm.value);
    formValue.flowStatusCode = 'BOOKED';
    formValue.ouId=Number(sessionStorage.getItem('ouId'))
    this.orderManagementService.OrderBook(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.orderNumber = res.obj;
        console.log(this.orderNumber);
        alert(res.message);
        this.SalesOrderBookingForm.get('accountNo').disable();
        this.displayorderDetails=false;
        this.displayVehicleDetails=false;
        this.OrderFind(this.orderNumber);
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
  }

  onOptionsSelectedVariant(mainModel) {
    if (  this.currentOpration !='orderSearch'){
    this.orderManagementService.VariantSearchFn(mainModel)
      .subscribe(
        data => {
          this.VariantSearch = data;
          console.log(this.VariantSearch);
        }
      );
    }
  }

  onOptionsSelectedColor(variant) {
    if (  this.currentOpration !='orderSearch'){
    this.orderManagementService.ColourSearchFn(variant)
      .subscribe(
        data => {
          this.ColourSearch = data;
          console.log(this.ColourSearch);
          let select = this.ColourSearch.find(d => d.variant === variant);
      this.fuelType=select.fuelType;
        }
      );
      }
  }
}
