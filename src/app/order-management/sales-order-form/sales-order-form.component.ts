import { Component, OnInit, ViewChild } from '@angular/core';
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
import { SalesOrderobj } from './sales-orderobj'
import { identifierModuleUrl } from '@angular/compiler';
const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

interface ISalesBookingForm {
  divisionName: string,
  ouName: string,
  divisionId:number,
  fuelType: string;
  locCode: string,
  ticketNo: string,
  emplId: number;
  orderNumber: number,
  accountNo: number,
  custName: string,
  orderedDate: Date,
  transactionTypeName: string,
  flowStatusCode: string,
  payTermDesc: string,
  salesRepName: string,
  tlName: string,
  remarks: string,
  locationId: number;
  subtotal: number,
  totTax: number,
  totAmt: number,
  custAddress: string,
  model: string,
  variant: string,
  locId: number;
  color: string,
  financeType: string,
  financerName: string,
  financeAmt: number,
  emi: number;
  tenure: number;
  downPayment: number;
  lineNumber: number;
  segment: string;
  orderedItem: string;
  pricingQty: number;
  unitSellingPrice: number;
  taxCategoryName: string;
  baseAmt: number;
  taxAmt: number;
  totAmt1: number;
  flowStatusCode1: string;
  category: string;
  hsnSacCode: string;
  priceListName: string;
  billLocName: string;
  shipLocName: string;
  ouId: number;
  // loginOuId1:number;
  customerId: string;
  // locName:string;
  billToAddress: string;
  gstNo: string;
  panNo: string;
  invType: string;
  taxAmounts: IterableIterator<any[]>;
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
  selector: 'app-sales-order-form',
  templateUrl: './sales-order-form.component.html',
  styleUrls: ['./sales-order-form.component.css']
})
export class SalesOrderFormComponent implements OnInit {
  SalesOrderBookingForm: FormGroup;
  public op: string;
  invLineNo: number;
  divisionId:number;
  paymentTermId: number;
  deptName: string;
  exchange: string;
  loyaltyBonus: string;
  taxiYN: string;
  exRegNo: string;
  insCharges: string;
  offerPrice: string;
  custOuId: number;
  loginOuId1: number;
  tcs = false;
  selectedLine = 0;
  invLineItemId: number;
  lstInvLineDeatails1: any[];
  indexVal: number;
  allDatastore: any;
  activeLineNo: number = 1;
  divisionName: string;
  dept: number;
  poLineTax: number;
  category: string;
  itemId: number;
  ouName: string;
  locId: number;
  locCode: string;
  locationId: number;
  ticketNo: string;
  orderNumber: number;
  accountNo: number;
  custName: string;
  orderedDate = new Date();
  transactionTypeName: string;
  flowStatusCode: string;
  payTermDesc: string;
  salesRepName: string;
  tlName: string;
  remarks: string;
  subtotal: number;
  totTax: number;
  totAmt: number;
  fuelType: string;
  custAddress: string;
  model: string;
  variant: string;
  color: string;
  financeType: string;
  financerName: string;
  financeAmt: number;
  emi: number;
  tenure: number;
  downPayment: number;
  segment: string;
  orderedItem: string;
  lineNumber: number;
  pricingQty: number;
  priceListName: string;
  unitSellingPrice: number;
  taxCategoryName: string;
  baseAmt: number;
  taxAmt: number;
  totAmt1: number;
  flowStatusCode1: string;
  lstgetOrderDetails: any;
  invItemId: number;
  description: string;
  hsnSacCode: string;
  emplId: number;
  billLocName: string;
  shipLocName: string;
  ouId: number;
  customerId: string;
  billToAddress: string;
  deptId: number;
  gstNo: string;
  panNo: string;
  invType: string;
  taxAmounts: number;
  taxCategoryId: number;
  // locCode:string;
  adhocDiscount: number;
  adhocConsu: number;
  additionalDisc: number;
  adhocExchBonus: number;
  adhocFinanceOffer: number;
  adhocISL: number;
  public transactionTypeNameList: any;
  public payTermDescList: any;
  public salesRepNameList: any;
  public taxCategoryList: any[];
  public viewAllInvoiceData: any[];
  public ticketNoSearch: any;
  public priceListNameList: any;
  public mainModelList: Array<string>[];
  public VariantSearch: Array<string>[];
  public ColourSearch: any;
  public financeTypeList: any;
  public financerNameList: any;
  public lineLevelOrderStatusList: any;
  invItemList1: any[];
  public taxCalforItem: any;
  categoryList: any[];
  public addonDescList: any[];
  lstgetOrderLineDetails: any[];
  lstgetOrderTaxDetails: any[];
  displayorderDetails = true;
  displayaccountNo = true;
  displayAllButtons = true;
  displaycustAccountNo = true;
  currentOpration: string;
  displayVehicleDetails = true;
  displayCreateOrderButton = false;
  displayLineTaxDetails = true;
  public YesNoList: Array<string> = [];
  displaySalesLines = true;
  displayAdditonalDetails = true;
  // payTermDesc:string;



  displaysegmentInvType: Array<boolean> = [];
  displayLineflowStatusCode: Array<boolean> = [];
  displaytaxCategoryName: Array<boolean> = [];
  displayRemoveRow: Array<boolean> = [];
  // displayTaxCategoryupdate:Array<boolean>=[];
  displayCounterSaleLine: Array<boolean> = [];
  public itemMap = new Map<string, any[]>();
  public taxMap = new Map<string, any>();

  constructor(private fb: FormBuilder, private location: Location, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.SalesOrderBookingForm = fb.group({
      divisionName: [''],
      ouName: [''],
      exchange: [''],
      taxiYN: [''],
      loyaltyBonus: [''],
      exRegNo: [''],
      insCharges: [''],
      offerPrice: [''],
      paymentTermId: [],
      locCode: [''],
      locId: [''],
      locationId: [''],
      ticketNo: [''],
      orderNumber: [''],
      accountNo: [''],
      custName: [''],
      orderedDate: [''],
      transactionTypeName: [''],
      flowStatusCode: [''],
      payTermDesc: [''],
      salesRepName: [''],
      tlName: [''],
      remarks: [''],
      subtotal: [''],
      fuelType: [''],
      totTax: [''],
      totAmt: [''],
      custAddress: [''],
      model: [''],
      variant: [''],
      color: [''],
      financeType: [''],
      financerName: [''],
      financeAmt: [''],
      emi: [''],
      tenure: [''],
      downPayment: [''],
      emplId: [''],
      priceListName: [''],
      billLocName: [''],
      shipLocName: [''],
      ouId: [''],
      customerId: [''],
      billToAddress: [''],
      gstNo: [''],
      panNo: [''],
      tcs: [''],
      oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
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
      itemId: [],
      invLineNo: [],
      invLineItemId: [],
      // taxAmounts: [],
    });
  }

  TaxDetailsArray(): FormArray {
    return <FormArray>this.SalesOrderBookingForm.get('taxAmounts')
  }



  orderlineDetailsGroup() {
    return this.fb.group({
      lineNumber: [''],
      tcs: [''],
      itemId: [],
      orderedItem: [''],
      pricingQty: [''],
      unitSellingPrice: [''],
      taxCategoryName: [''],
      baseAmt: [''],
      taxAmt: [''],
      totAmt: [''],
      flowStatusCode: [''],
      category: [''],
      itemType: [''],
      hsnSacCode: [''],
      invType: [''],
      taxCategoryId: [''],
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

  SalesOrderBooking(SalesOrderBookingForm: any) { }


  ngOnInit(): void {
    this.op = 'insert';
    // this.displayLineTaxDetails=true;
    this.currentOpration = 'NewOrder';
    this.displaysegmentInvType[0] = true;

    this.divisionName = sessionStorage.getItem('divisionName');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.locCode = (sessionStorage.getItem('locCode'));
    this.ticketNo = (sessionStorage.getItem('ticketNo'));
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.deptId = Number(sessionStorage.getItem('deptId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.locationId = Number(sessionStorage.getItem('locId'));
    this.deptName = (sessionStorage.getItem('deptName'));
    this.loginOuId1 = Number(sessionStorage.getItem('loginOuId1'));
    this.divisionId=Number(sessionStorage.getItem('divisionId'))


    this.orderlineDetailsGroup();
    var patch = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray
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
          data1 = this.taxCategoryList;
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
          console.log(this.categoryList);
          data1 = this.categoryList;
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


  onOptionsSelectedDescription(segment: any, k) {
    // alert('HII Item Desc')
    let select = this.invItemList1.find(d => d.segment === segment);
    this.SalesOrderBookingForm.patchValue({ itemId: select.itemId })
    this.itemId = select.itemId;
    this.orderManagementService.addonDescList(segment)
      .subscribe(
        data => {
          this.addonDescList = data;
          let controlinv = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
          for (let i = 0; i < data.length; i++) {
            var taxCatNm: string = data[i].taxCategoryName;
            // alert('FOR LOOP ENTER'+' '+ taxCatNm);
            if (taxCatNm === null) {
              // alert(taxCatNm);
              (controlinv.controls[k]).patchValue({
                itemId: data[i].itemId,
                orderedItem: data[i].description,
                hsnSacCode: data[i].hsnSacCode,
                // taxCategoryId: data[i].taxCategoryId,
                // taxCategoryName: data[i].taxCategoryName,
                unitSellingPrice: data[i].priceValue,
                flowStatusCode: 'BOOKED',
              });
            }
            if (taxCatNm.includes('Sale')) {
              (controlinv.controls[k]).patchValue({
                itemId: data[i].itemId,
                orderedItem: data[i].description,
                hsnSacCode: data[i].hsnSacCode,
                taxCategoryId: data[i].taxCategoryId,
                taxCategoryName: data[i].taxCategoryName,
                unitSellingPrice: data[i].priceValue,
                flowStatusCode: 'BOOKED',
              });
            }
          }
        }
      );
  }
  public itemMap2 = new Map<number, any[]>();


  onOptionsSelectedCategory(orderType: string, lnNo: number) {
    this.invType = orderType;
    // this.flowStatusCode='BOOKED';
    // alert(this.flowStatusCode);
    if (this.itemMap.has(orderType)) {
      var itemsList = this.itemMap.get(orderType);
      this.itemMap2.set(lnNo, this.itemMap.get(orderType));
    } else {
    }
    this.invItemList1 = this.itemMap.get(orderType);
    this.orderManagementService.getItemByCatType(orderType, 1)
      .subscribe(
        data => {
          this.invItemList1 = data;
          // this.orderedItem=data.description;
          this.itemMap.set(orderType, data);
          this.itemMap2.set(lnNo, this.itemMap.get(orderType));
        }
      );
  }


  onOptionsSelectedTL(ticketNo: any) {
    this.dept = Number(sessionStorage.getItem('deptId'));
    this.orderManagementService.ticketNoSearchFn(ticketNo, this.dept)
      .subscribe(
        data => {
          this.ticketNoSearch = data.obj;
          console.log(this.ticketNoSearch);
          this.tlName = this.ticketNoSearch.leadTicketNo;
        }
      );
  }

  onOptionsSelectedColor(variant) {
    if (this.currentOpration != 'orderSearch') {
      // alert('variant')
      this.orderManagementService.ColourSearchFn(variant)
        .subscribe(
          data => {
            this.ColourSearch = data;
            console.log(this.ColourSearch);
            let select = this.ColourSearch.find(d => d.variant === variant);
            this.fuelType = select.fuelType;
          }
        );
    }
  }

  onOptionsSelectedVariant(mainModel) {
    if (this.currentOpration != 'orderSearch') {
      // alert('mainModel')
      this.orderManagementService.VariantSearchFn(mainModel)
        .subscribe(
          data => {
            this.VariantSearch = data;
            console.log(this.VariantSearch);
          }
        );
    }
  }



  accountNoSearch(accountNo) {
    this.orderManagementService.accountNoSearchFn(accountNo, this.ouId,this.divisionId)
      .subscribe(
        data => {
          this.accountNoSearch = data.obj;
          console.log(this.accountNoSearch);
          this.SalesOrderBookingForm.patchValue(this.accountNoSearch);
          this.paymentTermId = data.obj.termId;
          this.payTermDesc = data.obj.paymentType;
        }
      );
  }

  onOptionsSelectedlncategoryType(orderType) {
    // alert(orderType);
    // alert(this.invType);
    this.orderManagementService.getItemByCatType(orderType, 1)
      .subscribe(
        data => {
          this.invItemList1 = data;
          this.orderedItem = data.description;
        }
      );
  }



  addDiscount(i) {
    // alert(i);
    console.log(this.SalesOrderBookingForm.get('oeOrderLinesAllList').value);
    let controlinv1 = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
    let controlinv = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
    var invLineNo = controlinv1[i].lineNumber;
    // alert(invLineNo);
    var invLineItemId = controlinv1[i].itemId;
    var taxCategoryId = controlinv1[i].taxCategoryId;
    console.log(controlinv1[i].taxCategoryId);
    this.activeLineNo = invLineNo;
    var baseAmt = controlinv1[i].baseAmt;
    // alert(baseAmt);
    var patch = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
    var arrayControlTax = this.SalesOrderBookingForm.get('taxAmounts').value;
    var index = Number(arrayControlTax[1].invLineNo);
    var diss1 = arrayControlTax[0].totTaxAmt;
    var diss2 = arrayControlTax[1].totTaxAmt;
    var diss3 = arrayControlTax[2].totTaxAmt;
    var diss4 = arrayControlTax[3].totTaxAmt;
    var diss5 = arrayControlTax[4].totTaxAmt;
    // var itemId = controlinv1[index - 1].itemId;
    this.service.taxCalforItemwithMulDisc(sessionStorage.getItem('ouId'), taxCategoryId, baseAmt, diss1, diss2, diss3, diss4, diss5)
      .subscribe(
        (data: any[]) => {
          this.taxCalforItem = data;
          for (let i = 0, j = index; i < this.taxCalforItem.length; i++, j++) {
            (patch.controls[i]).patchValue(
              {
                amount: this.taxCalforItem[i].totTaxAmt,
                invLineNo:invLineNo
              }
            );
          }
          this.patchResultList(i, this.taxCalforItem, invLineNo, invLineItemId);
          var arrayupdateTaxLine = this.SalesOrderBookingForm.get('taxAmounts').value;
          this.taxMap.set(i,arrayupdateTaxLine);
          // alert('map'+''+ this.taxMap.size)
        });
  }



  patchResultList(i, taxCalforItem, invLineNo, invLineItemId) {
    alert('Tax has been applied.')
    let control = this.SalesOrderBookingForm.get('taxAmounts') as FormArray
    control.clear();
    // alert('in patch' + this.taxCalforItem);
    taxCalforItem.forEach(x => {
      console.log('in patch' + taxCalforItem);
      console.log(x.taxRateName);
      control.push(this.fb.group({
        totTaxAmt: x.totTaxAmt,
        lineNumber: x.lineNumber,
        taxRateName: x.taxRateName,
        taxTypeName: x.taxTypeName,
        taxPointBasis: x.taxPointBasis,
        precedence1: x.precedence1,
        precedence2: x.precedence2,
        precedence3: x.precedence3,
        precedence4: x.precedence4,
        precedence5: x.precedence5,
        precedence6: x.precedence6,
        precedence7: x.precedence7,
        precedence8: x.precedence8,
        precedence9: x.precedence9,
        precedence10: x.precedence10,
        currencyCode: x.currencyCode,
        totTaxPer: x.totTaxPer,
        recoverableFlag: x.recoverableFlag,
        selfAssesedFlag: x.selfAssesedFlag,
        inclusiveFlag: x.inclusiveFlag,
        // invLineNo: invLineNo,
        // invLineItemId: itemId
      }));
    });
    console.log(control);
  }


  onKey(index) {
    console.log(index);
    // alert('call')
    var arrayControl = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value
    var patch = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var taxcatName = arrayControl[index].taxCategoryName;
    let select = this.taxCategoryList.find(d => d.taxCategoryName === taxcatName);
    var taxCategoryId = select.taxCategoryId;
    patch.controls[index].patchValue({ taxCategoryId: taxCategoryId });
    console.log(arrayControl);
    var itemId = arrayControl[index].itemId;
    var baseAmt = arrayControl[index].unitSellingPrice * arrayControl[index].pricingQty;
    var diss = 0;
    var sum = 0;
    if (taxcatName != null && taxcatName.length > 0) {
      this.service.taxCalforItem(itemId, taxCategoryId, diss, baseAmt)
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
              taxAmt: sum,
              totAmt: baseAmt + sum,
            });

            let controlinv1 = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
            var invLineNo1 = index + 1;
            console.log(invLineNo1);

            this.TaxDetailsArray().clear();

            for (let i = 0; i < data.length; i++) {
              var invLnGrp: FormGroup = this.TaxDetailsGroup();
              controlinv1.push(invLnGrp);
              (controlinv1.controls[i]).patchValue({
                invLineNo: index + 1,
              });
              data[i].invLineNo = invLineNo1;
            }
            this.SalesOrderBookingForm.get('taxAmounts').patchValue(data);
            this.taxMap.set(index, data);
            // alert('map'+''+ this.taxMap.size)
          });
    }
    else {
      // alert(taxCatNm+ ' '+ 'NULL CON');
      this.displaysegmentInvType[index] = false;
      (patch.controls[index]).patchValue({
        baseAmt: baseAmt,
        taxAmt: sum,
        totAmt: baseAmt + sum,
      });
    }
  }

  addRow() {
    this.displaysegmentInvType.push(true);
    this.displayRemoveRow.push(true);
    this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
    var len = this.orderlineDetailsArray().length;
    // alert(len);
    var patch = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray
    (patch.controls[len - 1]).patchValue(
      {
        lineNumber: len,

      }
    );
    this.displayCounterSaleLine.push(true);
    this.displaysegmentInvType.push(true);
    this.displayLineflowStatusCode.push(false);

    this.displaytaxCategoryName.push(true);
    // this.displayTaxCategoryupdate.push(true);
  }

  // RemoveRow(OrderLineIndex){
  //   this.orderlineDetailsArray().removeAt(OrderLineIndex);   
  // }

  // RemoveRow(index) {
  //   if (index === 0) {
  //     alert('first alert')
  //   } else {
  //     alert('second alert')
  //     for (let i=0;this.lstgetOrderLineDetails.length;i++){
  //     alert(this.lstgetOrderLineDetails[0].lineNumber);
  //     this.lstgetOrderLineDetails[i].removeAt(this.lineNumber);
  //   }
  //   }
  //   // index=index+1;
  //   // this.TaxDetailsArray().delete(index);

  // }


  refresh() {
    window.location.reload();
  }
  close() {
    this.router.navigate(['admin']);
  }


  // order Save Function 
  transData(val) {
    // delete val.categoryId;
    return val;
  }


  OrderBooked() {
    // this.flowStatusCode='BOOKED';
    this.ouId = Number(sessionStorage.getItem('ouId'))
    // alert(this.ouId)
    const formValue: ISalesBookingForm = this.transData(this.SalesOrderBookingForm.value);
    formValue.flowStatusCode = 'BOOKED';
    formValue.ouId = Number(sessionStorage.getItem('ouId'));
    formValue.divisionId=Number(sessionStorage.getItem('divisionId'))
    this.orderManagementService.OrderBook(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.orderNumber = res.obj;
        console.log(this.orderNumber);
        alert(res.message);
        this.SalesOrderBookingForm.get('accountNo').disable();
        this.displayorderDetails = false;
        this.displayVehicleDetails = false;
        this.OrderFind(this.orderNumber);
        // this.SalesOrderBookingForm.reset();
      } else {
        if (res.code === 400) {
          alert(res.message);
          // this.SalesOrderBookingForm.reset();
        }
      }
    });
  }







  OrderFind(orderNumber) {
    // alert(orderNumber)
    this.displaySalesLines = false;
    this.displayAllButtons = false;
    this.displayCreateOrderButton = true;
    this.currentOpration = 'orderSearch';
    this.emplId = Number(sessionStorage.getItem('emplId'))
    this.orderlineDetailsArray().clear();
    this.TaxDetailsArray().clear();
    this.orderManagementService.getsearchByOrderNo(orderNumber)
      .subscribe(
        data => {
          if (data != null) {
            this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
            this.lstgetOrderTaxDetails = data.obj.taxAmounts;
            this.allDatastore = data.obj;
            let control = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
            let control1 = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
            if (this.lstgetOrderLineDetails.length === 0 && this.lstgetOrderTaxDetails.length === 0) {
              this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
              this.TaxDetailsArray().push(this.TaxDetailsGroup());
              this.displayLineTaxDetails = true;
              // alert(data.obj.flowStatusCode)
              if (data.obj.flowStatusCode === 'BOOKED') {
                // alert(this.op);
                this.op = 'insert';
                this.displayLineTaxDetails = false;
                this.orderlineDetailsGroup();
                var patch = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray
                (patch.controls[0]).patchValue(
                  {
                    lineNumber: 1,
                  }
                );

              }
            }
            else {
              for (let i = 0; i < this.lstgetOrderLineDetails.length; i++) {
                var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
                control.push(oeOrderLinesAllList1);
                this.op = 'Search';
                this.displayLineTaxDetails = false;
                this.displaysegmentInvType[i] = false;
                this.displayCounterSaleLine.push(false);
                if (this.lstgetOrderLineDetails[i].flowStatusCode === 'BOOKED' || this.lstgetOrderLineDetails[i].flowStatusCode === 'ALLOTED' || this.lstgetOrderLineDetails[i].flowStatusCode === 'READY FOR INVOICE') {
                  this.displaytaxCategoryName[i] = true;
                  this.displayLineflowStatusCode[i] = false;
                }
                if (this.lstgetOrderLineDetails[i].flowStatusCode === 'INVOICED' || this.lstgetOrderLineDetails[i].flowStatusCode === 'CANCELLED') {
                  this.displayLineflowStatusCode[i] = true;
                  this.displayRemoveRow[i] = false;
                  this.displaytaxCategoryName[i] = false;
                }
                else {
                  this.displayRemoveRow[i] = false;
                  this.displayCounterSaleLine[i] = false;
                }
              }
            }
            this.SalesOrderBookingForm.patchValue(data.obj);
            this.salesRepName = data.obj.salesRepName;
            console.log(Number(sessionStorage.getItem('ouId')));
            var controlinv1 = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
            var controlinv2 = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
          if (this.currentOpration != 'orderSearch'){
            for (let i = 0; i < controlinv1.length; i++) {
              if (controlinv1[i].invType === 'SS_VEHICLE' && controlinv1[i].flowStatusCode === 'ALLOTED') {
                // alert(controlinv1[i].segment + '--' + i);
                this.orderManagementService.addonDescList(controlinv1[i].segment)
                  .subscribe(
                    data1 => {
                      this.addonDescList = data1;
                      for (let j = 0; j < data1.length; j++) {
                        var taxCatNm: string = data1[j].taxCategoryName;
                        if (taxCatNm.includes('Sale')) {
                          // alert(taxCatNm);
                          (controlinv2.controls[i]).patchValue({
                            taxCategoryId: data1[j].taxCategoryId,
                            taxCategoryName: data1[j].taxCategoryName,
                          });

                        }
                      }
                      if (controlinv1.taxCategoryName != null) {
                        this.onKey(i)
                      }
                    }
                  );
              }
              else {
                (controlinv2.controls[i]).patchValue({
                  taxCategoryId: data[i].taxCategoryId,
                  taxCategoryName: data[i].taxCategoryName,
                });
              }
            }
          }
          }
        }
      )

    this.SalesOrderBookingForm.get('accountNo').disable();
    this.displayorderDetails = false;
    this.displayVehicleDetails = false;
    this.displayCreateOrderButton = true;
  }


  TaxCategoryupdate(index) {
    // alert(this.orderNumber)
    const formValue: AccOrderLinesPost1 = this.transData(this.SalesOrderBookingForm.value);
    formValue.orderNumber = this.orderNumber;
    var accLines = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
    var taxAmounts: FormArray = this.SalesOrderBookingForm.get('taxAmounts').value;
    var taxAmounts1 = this.SalesOrderBookingForm.get('taxAmounts');
    var req = new Array();
    for (let i = 0; i < accLines.length; i++) {
      for (let j = 0; j < taxAmounts.length; j++) {
        taxAmounts[j].invLineNo = accLines[i].lineNumber;
      }
      var accArr1 = accLines[index];
      accArr1['orderNumber'] = formValue.orderNumber;
      accArr1['taxAmounts'] = taxAmounts;
      accArr1['invLineNo'] = index + 1;
      req.push(accArr1);
    }

    if (this.lstgetOrderLineDetails[index].invType === 'SS_VEHICLE' && this.lstgetOrderLineDetails[index].flowStatusCode === 'ALLOTED') {
      this.orderManagementService.UpdateTaxCategoryLineWise(req[0]).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.OrderFind(this.orderNumber);
          this.orderLineUpdate()
        } else {
          if (res.code === 400) {
            alert(res.message);
          }
        }
      });
    }
    else {
      alert('Vehicle already Invoice');
    }
  }

  onOptionTaxCatSelected(taxCategoryName, i) {
    this.indexVal = i;
    var arrayControl = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;

    var amount = arrayControl[i].unitSellingPrice;

    let select = this.taxCategoryList.find(d => d.taxCategoryName === taxCategoryName);

    this.taxCategoryId = select.taxCategoryId;
    console.log(this.taxCategoryId);

    let controlinv = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
    var diss = 0;
    if (this.baseAmt != undefined) {
      this.service.taxCalforItem(this.itemId, this.taxCategoryId, diss, this.baseAmt)
        .subscribe(
          (data: any[]) => {
            this.lstInvLineDeatails1 = data;
            console.log(this.lstInvLineDeatails1);
            let controlinv1 = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
            this.TaxDetailsArray().clear();
            // alert(data.length);
            for (let i = 0; i < data.length; i++) {
              var invLnGrp: FormGroup = this.TaxDetailsGroup();
              controlinv1.push(invLnGrp);
            }
            this.SalesOrderBookingForm.get('taxAmounts').patchValue(data);
            this.invLineNo = i + 1;
            // alert(this.invLineNo);
          }
        )
    }
  }




  orderLineUpdate() {
    // const formValue: ISalesBookingForm = (this.SalesOrderBookingForm.value);
    var orderLines = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
    let jsonData = this.SalesOrderBookingForm.value;
    let salesObj = Object.assign(new SalesOrderobj(), jsonData);
    salesObj.setoeOrderLinesAllList(orderLines);
    var taxStr = [];
    for (let taxlinval of this.taxMap.values()) { 
      for (let i = 0; i < taxlinval.length; i++) {
        taxStr.push(taxlinval[i]);
      }
    }
    salesObj.settaxAmounts(taxStr);
    this.orderManagementService.UpdateSalesUpdateLine(JSON.stringify(salesObj)).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.OrderFind(this.orderNumber);
      } else {
        if (res.code === 400) {
          alert(res.message);
          // this.SalesOrderBookingForm.reset();
        }
      }
    });
  }


  downloadInvoice() {
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.orderManagementService.downloadVehicleINV(this.orderNumber)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      });
  }


  downloadAddonInvoice() {
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.orderManagementService.downloadAddonINV(this.orderNumber)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      });
  }


  taxDetails(op, i, taxCategoryId) {
    // alert('hi'+' ' +op+'-' +i);
    // alert(this.displayCounterSaleLine[i]);
    this.selectedLine = i;
    if (op === 'Search') {
      // alert('Serach Of item Category')
      // .controls[i].get('taxAmounts')
      let taxControl = this.TaxDetailsArray() as FormArray
      if (taxControl != undefined) {
        taxControl.clear();
      }
      var taxItems: any[] = this.allDatastore.taxAmounts;
      var k = Number(i) + 1

      taxItems.forEach(x => {
        // alert(x.invLineNo +'--'+k);
        if (x.invLineNo === k) {
          console.log('in patch' + taxItems);
          console.log(x.totTaxAmt);
          taxControl.push(this.fb.group({
            totTaxAmt: x.totTaxAmt,
            lineNumber: x.lineNumber,
            taxRateName: x.taxRateName,
            taxTypeName: x.taxTypeName,
            taxPointBasis: x.taxPointBasis,
            precedence1: x.precedence1,
            precedence2: x.precedence2,
            precedence3: x.precedence3,
            precedence4: x.precedence4,
            precedence5: x.precedence5,
            precedence6: x.precedence6,
            precedence7: x.precedence7,
            precedence8: x.precedence8,
            precedence9: x.precedence9,
            precedence10: x.precedence10,
            currencyCode: x.currencyCode,
            totTaxPer: x.totTaxPer,
            recoverableFlag: x.recoverableFlag,
            selfAssesedFlag: x.selfAssesedFlag,
            inclusiveFlag: x.inclusiveFlag,
            invLineNo:x.invLineNo,
          }));
        }
      });
    }
    else {
      // alert('Hi');
      this.poLineTax = i;
      var itemId = this.invItemList1[i].itemId;
      // var taxCategoryId = taxCategoryId;
      // this.taxCategoryId = taxCategoryId;
      // var diss = 0;
      var arrayControl = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value
      var dissAmt1 = 0;
      var taxCatNm: string = arrayControl[i].taxCategoryName;
      const taxCategoryId: number = arrayControl[i].taxCategoryId;
      // alert(taxCatNm);
      console.log(arrayControl);
      var itemId = arrayControl[i].itemId;
      var baseAmt = arrayControl[i].unitSellingPrice * arrayControl[i].pricingQty;
      this.service.taxCalforItem(itemId, taxCategoryId, dissAmt1, baseAmt)
        .subscribe(
          (data: any[]) => {
            this.taxCalforItem = data;
            var sum = 0;
            for (i = 0; i < this.taxCalforItem.length; i++) {
              if (this.taxCalforItem[i].totTaxPer != 0) {
                sum = sum + this.taxCalforItem[i].totTaxAmt
              }
            }
            this.TaxDetailsArray().clear()
            for (let i = 0; i < this.taxCalforItem.length; i++) {
              var invLnGrp: FormGroup = this.TaxDetailsGroup();
              this.TaxDetailsArray().push(invLnGrp);
              this.SalesOrderBookingForm.get('taxAmounts').patchValue(this.taxCalforItem);
            }

          });
    }
  }

  viewAllInvoice() {
    // alert(this.orderNumber);
    this.orderManagementService.viewAllInvoice(this.orderNumber)
      .subscribe(
        data1 => {
          this.viewAllInvoiceData = data1;
          console.log(this.taxCategoryList);
        }
      );
  }

  downloadAllInvoice(invType) {
    // alert(invType)
    if (invType === 'SS_VEHICLE') {
      this.orderManagementService.downloadVehicleINV(this.orderNumber)
        .subscribe(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          var printWindow = window.open(url, '', 'width=800,height=500');
          printWindow.open
        });
    }
    else {
      // alert(invType);
      this.orderManagementService.downloadAddonINV(this.orderNumber)
        .subscribe(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          var printWindow = window.open(url, '', 'width=800,height=500');
          printWindow.open
        });
    }
  }

  RemoveRow(index) {
    if (index === 0) {
    }
    else {
      this.orderlineDetailsArray().removeAt(index);
      this.TaxDetailsArray().removeAt(index);
    }
  }
  createInvoice() {
    this.orderManagementService.createInvoiceAll(this.orderNumber, this.emplId).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.OrderFind(this.orderNumber);
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    }
    );
  }

}
