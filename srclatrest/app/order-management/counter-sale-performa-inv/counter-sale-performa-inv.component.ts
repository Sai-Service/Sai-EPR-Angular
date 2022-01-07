import { Component, OnInit, HostListener, ViewChild, ElementRef, NgModule, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormControlName, NgForm, Validators, FormArray, FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { data } from 'jquery';
import { SalesOrderobj } from 'src/app/order-management/sales-order-form/sales-orderobj'
import { DatePipe, Location } from '@angular/common';
import { escapeRegExp } from '@angular/compiler/src/util';
import { saveAs } from 'file-saver';
import { SelectorMatcher } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { v4 as uuidv4 } from 'uuid';
import { enableDebugTools } from '@angular/platform-browser';
import { ReturnToVendorComponent } from 'src/app/transaction/return-to-vendor/return-to-vendor.component';


const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};


interface ISalesBookingForm {
  state: string;
  emailId: string;
  emailId1: string;
  birthDate: Date;
  weddingDate: Date;
  gstNo: string;
  panNo: string;
  custAccountNo: number;
  creditAmt: number;
  name: string;
  customerSiteId: number;
  taxCategoryName: string;
  custName: string;
  mobile1: number;
  custAddress: string;
  walkCustName: string;
  walkCustPan: string;
  walkCustaddres: string;
  cntrOrdCustName: string;
  refCustNo: string;
  custPoNumber: string;
  custPoDate: Date;
  transactionTypeName: string;
  issueCodeType: string;
  priceListName: string;
  priceListId: number;
  orderedDate: Date;
  flowStatusCode: string;
  issuedBy: string;
  dept: number;
  loginArray: string;
  ouName: string;
  ticketNo: string;
  divisionId: number;
  emplId: number;
  ouId: number;
  deptId: number;

  locationId: number;
  deptName: string;
  invType: string;
  locCode: string;
  subtotal: number;
  discAmt: number;
  totTax: number;
  totAmt: number;
  discType: string;
  disPer: number;
  creditDays: string;
  daysMsg: string;
}

@Component({
  selector: 'app-counter-sale-performa-inv',
  templateUrl: './counter-sale-performa-inv.component.html',
  styleUrls: ['./counter-sale-performa-inv.component.css']
})
export class CounterSalePerformaInvComponent implements OnInit {
  CounterSaleOrderBookingForm: FormGroup;
  itemSeg: string = "";
  orderNumber: number;
  emailId: string;
  emailId1: string;
  birthDate: Date;
  weddingDate: Date;
  gstNo: string;
  panNo: string;
  custAccountNo: number;
  creditAmt: number;
  name: string;
  customerSiteId: number;
  taxCategoryName: string;
  custName: string;
  mobile1: number;
  custAddress: string;
  walkCustName: string;
  walkCustPan: string;
  walkCustaddres: string;
  cntrOrdCustName: string;
  refCustNo: string;
  custPoNumber: string;
  custPoDate: Date;
  state: string;
  transactionTypeName: string;
  issueCodeType: string;
  issueCode: string;
  issueCodeType1: string;
  priceListName: string;
  priceListId: number;
  // orderedDate: Date;
  flowStatusCode: string;
  issuedBy: string;
  dept: number;
  loginArray: string;
  ouName: string;
  ticketNo: string;
  divisionId: number;
  emplId: number;
  ouId: number;
  deptId: number;
  locationId: number;
  deptName: string;
  invType: string;
  locCode: string;
  subtotal: number;
  discAmt: number;
  totTax: number;
  totAmt: number;
  discType: string;
  disPer: number;
  pipe = new DatePipe('en-US');
  now = new Date();
  itemId: number;
  segment: string;
  Avalqty: number;
  pricingQty: number;
  orderedItem: string;
  unitSellingPrice: number;
  baseAmt: number;
  disAmt: number;
  taxAmt: number;
  hsnSacCode: string;
  taxPer: number;
  sgst: number;
  cgst: number;
  igst: number;
  mrp: number;
  creditDays: string;
  daysMsg: string;

  orderedDate1 = this.pipe.transform(this.now, 'dd-MM-yyyy');
  orderedDate = new Date(this.orderedDate1);
  // custPoDate = this.pipe.transform(this.now, 'dd-MM-yyyy');

  selCustomer: any;
  custSiteList: any = [];
  displaytcsYN = true;
  displaytcsBuuton = false;
  public payTermDescList: any = [];
  displaywalkingCustomer = true;
  displaydisPer = true;
  isDisabled3 = false;
  customerNameSearch: any = [];
  display = 'none';
  exicutiveNameByCustNameList: any = [];
  displayDMSCDMS: boolean;
  showApplyDiscount = true;
  accountNoSearchdata: any[];
  submitted = false;
  displayCustomerSite = true;
  createOrderTypeList: any[];
  public orderTypeList: any;
  public issueCodeTypeList: any[];
  public priceListNameList: any;
  displayCSOrderAndLineDt = true;
  displaysegmentInvType: Array<boolean> = [];
  categoryList: any[];
  public itemMap = new Map<string, any[]>();
  public itemMap2 = new Map<number, any[]>();
  invItemList1: any[];
  displayorderHedaerDetails = true;
  public addonDescList: any[];
  displayaddRow = true;
  displayRemoveRow: Array<boolean> = [];
  public op: string;
  displayCounterSaleLine: Array<boolean> = [];
  displayLineflowStatusCode: Array<boolean> = [];
  isDisabled = false;

  @ViewChild('aForm') aForm: ElementRef;

  constructor(private fb: FormBuilder, private location1: Location, private router1: ActivatedRoute, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService,) {
    this.CounterSaleOrderBookingForm = fb.group({
      orderNumber: [],
      emailId: [],
      emailId1: [],
      birthDate: [],
      weddingDate: [],
      gstNo: [],
      panNo: [],
      custAccountNo: ['', [Validators.required]],
      creditAmt: [],
      name: [],
      customerSiteId: [],
      taxCategoryName: [],
      custName: [],
      mobile1: [],
      custAddress: [],
      walkCustName: [],
      walkCustPan: [],
      walkCustaddres: [],
      cntrOrdCustName: [],
      refCustNo: [],
      custPoNumber: [],
      custPoDate: [],
      state: [],
      transactionTypeName: [],
      issueCodeType: [],
      issueCode: [],
      issueCodeType1: [],
      priceListName: [],
      priceListId: [],
      orderedDate: [],
      flowStatusCode: [],
      issuedBy: [],
      dept: [],
      loginArray: [],
      ouName: [],
      ticketNo: [],
      divisionId: [],
      emplId: [],
      ouId: [],
      deptId: [],
      locId: [],
      locationId: [],
      deptName: [],
      invType: [],
      subtotal: [],
      discAmt: [],
      totTax: [],
      totAmt: [],
      discType: [],
      disPer: [],
      creditDays: [],
      daysMsg: [],
      oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
    })
  }


  orderlineDetailsArray(): FormArray {
    return <FormArray>this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList')
  }

  orderlineDetailsGroup() {
    return this.fb.group({
      displaysegment: false,
      lineNumber: [''],
      invType: [''],
      itemSeg: [''],
      segment: ['', [Validators.required]],
      itemId: [''],
      orderedItem: [''],
      hsnSacCode: [''],
      Avalqty: [''],
      pricingQty: [''],
      unitSellingPrice: [''],
      baseAmt: [''],
      disPer: [''],
      disAmt: [''],
      taxPer: [''],
      sgst: [''],
      cgst: [''],
      igst: [''],
      taxAmt:[],
      totAmt: [''],
      mrp: [''],
      flowStatusCode: [''],
      uom: [''],
    })
  }



  TaxDetailsArray(): FormArray {
    return <FormArray>this.CounterSaleOrderBookingForm.get('taxAmounts')
  }


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    if (Number(sessionStorage.getItem('divisionId')) === 1) {
      this.displayDMSCDMS = true;
      this.showApplyDiscount = false;
    }
    else if (Number(sessionStorage.getItem('divisionId')) === 2) {
      this.displayDMSCDMS = false;
      this.showApplyDiscount = true;
      this.CounterSaleOrderBookingForm.patchValue({ issueCodeType1: 'Regular Sales' });
      this.CounterSaleOrderBookingForm.patchValue({ issueCode: 'CM03' });
      var concatissuetypecode = this.CounterSaleOrderBookingForm.get('issueCode').value + '-' + this.CounterSaleOrderBookingForm.get('issueCodeType1').value
      this.CounterSaleOrderBookingForm.patchValue({ issueCodeType: concatissuetypecode });
    }
    this.CounterSaleOrderBookingForm.patchValue({ discType: 'No Discount' })

    this.dept = Number(sessionStorage.getItem('deptId'));
    this.loginArray = sessionStorage.getItem('divisionName');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.locCode = (sessionStorage.getItem('locCode'));
    this.ticketNo = (sessionStorage.getItem('ticketNo'));
    this.issuedBy = (sessionStorage.getItem('ticketNo'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'))
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.deptId = Number(sessionStorage.getItem('deptId'));

    this.locationId = Number(sessionStorage.getItem('locId'));
    this.deptName = (sessionStorage.getItem('deptName'));
    this.invType = 'SS_SPARES';
    // this.orderlineDetailsArray().controls[0].patchValue({ invType: 'SS_SPARES' });
    // this.orderlineDetailsArray().controls[0].patchValue({ flowStatusCode: 'BOOKED' });

    this.service.payTermDescList()
      .subscribe(
        data => {
          this.payTermDescList = data;
          console.log(this.payTermDescList);
        }
      );


    this.service.createOrderTypeListFn()
      .subscribe(
        data1 => {
          this.createOrderTypeList = data1;
          console.log(this.createOrderTypeList);
        }
      );


    this.orderManagementService.orderTypeList((sessionStorage.getItem('deptId')), sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.orderTypeList = data;
          console.log(this.orderTypeList);
        }
      );

    this.service.issueCodeFunction(sessionStorage.getItem('divisionId'))
      .subscribe(
        data1 => {
          this.issueCodeTypeList = data1;
        }
      );

    this.orderManagementService.priceListNameList1(sessionStorage.getItem('ouId'), (sessionStorage.getItem('divisionId')))
      .subscribe(
        data => {
          this.priceListNameList = data;
          console.log(this.priceListNameList);
          this.CounterSaleOrderBookingForm.patchValue({ priceListName: data[0].priceListName })
          this.CounterSaleOrderBookingForm.patchValue({ priceListId: data[0].priceListHeaderId })
        }
      );

    this.orderlineDetailsGroup();
    var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray
    (patch.controls[0]).patchValue(
      {
        lineNumber: 1,
      }
    );

    this.displaysegmentInvType[0] = true;

    this.orderManagementService.categoryList1()
      .subscribe(
        data1 => {
          this.categoryList = data1;
          if (this.deptName === 'TrueValue') { }
          else {
            for (let i = 0; i < data1.length; i++) {
              if (data1[i].itemType === 'SS_VEHICLE') {
                this.categoryList.splice(i, 1)
              }
            }

          }
        }
      );
    this.service
      .searchByItemSegmentDiv(this.divisionId, '36DH1601')
      .subscribe((data) => {
        this.invItemList1 = data;
        this.itemMap2.set(0, this.invItemList1);
      });

  }

  CounterSaleOrderBooking(CounterSaleOrderBookingForm: any) {
  }

  get f() { return this.CounterSaleOrderBookingForm.controls }

  lstgetOrderLineDetails: any[];
  allDatastore: any;

  OrderFind(orderNumber) {
    this.op = 'Search';
    // this.isDisabled10=false;
    this.displayCSOrderAndLineDt = false;
    this.emplId = Number(sessionStorage.getItem('emplId'))
    this.orderlineDetailsArray().clear();
    this.displayCustomerSite = false;
    this.orderManagementService.findCSProformaByNum(orderNumber, sessionStorage.getItem('locId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
            // this.lstgetOrderTaxDetails = data.obj.taxAmounts;
            this.allDatastore = data.obj;
            if (data.obj.discType === 'Header Level Discount') {
              // this.onOptionsSelectedDiscountType(data.obj.discType);
              this.CounterSaleOrderBookingForm.patchValue({ disPer: data.obj.disper });
              this.CounterSaleOrderBookingForm.get('disPer').disable();
            }
            if (this.allDatastore.tcsYN === 'Y') {
              this.displaytcsYN = false;
              this.isDisabled = false;
              // this.displaytcsBuuton = true;
              // this.tcsAmt = Math.round(((data.obj.totAmt * this.tcsPer) + Number.EPSILON) * 100) / 100;
            }
            else {
              this.displaytcsYN = true;
              // this.displaytcsBuuton = false;
              // this.isDisabled = false;
            }
            let control = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
            //let control1 = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
            for (let i = 0; i <= this.lstgetOrderLineDetails.length - 1; i++) {
              var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
              control.push(oeOrderLinesAllList1);
              this.displaysegmentInvType[i] = false;
              this.displayLineflowStatusCode.push(true);
              this.displayCounterSaleLine.push(false);
            }
            // for (let j = 0; j <= this.lstgetOrderTaxDetails.length; j++) {
            //   var orderTaxLinesList: FormGroup = kthis.TaxDetailsGroup();
            //   control1.push(orderTaxLinesList);
            // }
            // this.CounterSaleOrderBookingForm.patchValue(data.obj);
            //   this.salesRepName = data.obj.salesRepName;
            //this.createOrderType = data.obj.createOrderType;
            //this.priceListName = data.obj.priceListName;
            //  this.paymentType = data.obj.paymentType;
            //  this.paymentTermId = data.obj.paymentTermId;
            this.CounterSaleOrderBookingForm.patchValue(data.obj);
            this.CounterSaleOrderBookingForm.patchValue({ trxNumber: data.obj.trxNumber })
            this.totTax = Math.round((data.obj.totTax + Number.EPSILON) * 100) / 100;
            this.totAmt = Math.round((data.obj.totAmt + Number.EPSILON) * 100) / 100;
            this.subtotal = Math.round((data.obj.subtotal + Number.EPSILON) * 100) / 100;

            this.disPer = data.obj.disPer;
            this.CounterSaleOrderBookingForm.patchValue({ name: data.obj.billLocName });
            this.CounterSaleOrderBookingForm.patchValue({ trxNumber: data.obj.trxNumber })
            var orderedDate1 = data.obj.orderedDate;
            var orderedDate2 = this.pipe.transform(orderedDate1, 'dd-MM-yyyy');
            this.CounterSaleOrderBookingForm.patchValue(({ orderedDate: orderedDate2 }));
            this.transactionTypeName = data.obj.transactionTypeName;
            for (let k = 0; k < data.obj.oeOrderLinesAllList.length; k++) {
              this.CounterSaleOrderBookingForm.patchValue({ baseAmt: this.lstgetOrderLineDetails[k].baseAmt });
              let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
              (controlinv.controls[k]).patchValue({
                baseAmt: Math.round((data.obj.oeOrderLinesAllList[k].baseAmt + Number.EPSILON) * 100) / 100,
                taxAmt: Math.round((data.obj.oeOrderLinesAllList[k].taxAmt + Number.EPSILON) * 100) / 100,
                totAmt: Math.round((data.obj.oeOrderLinesAllList[k].totAmt + Number.EPSILON) * 100) / 100,
                unitSellingPrice: Math.round((data.obj.oeOrderLinesAllList[k].unitSellingPrice + Number.EPSILON) * 100) / 100,
                disPer: data.obj.oeOrderLinesAllList[k].disPer,
                taxCategoryId: data.obj.oeOrderLinesAllList[k].taxCategoryId,
              });
            }

            // for (let k = 0; k < data.obj.taxAmounts.length; k++) {
            //   let controlinv = this.CounterSaleOrdkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkerBookingForm.get('taxAmounts') as FormArray;
            //   (controlinv.controls[k]).patchValue({
            //     totTaxAmt: data.obj.taxAmounts[k].totTaxAmt,
            //   });
            //   this.TaxDetailsArray().disabled;
            // }
            this.CounterSaleOrderBookingForm.patchValue({ orderedDate: data.obj.orderedDate });
            this.CounterSaleOrderBookingForm.get('orderedDate').disable();
            // alert( data.obj.orderStatus +'-----' + data.obj.trxNumber);

            this.CounterSaleOrderBookingForm.controls['emplId'].patchValue(Number(sessionStorage.getItem('emplId')));
            //if (this.allDatastore.createOrderType === 'Pick Ticket' && this.allDatastore.flowStatusCode === 'BOOKED') {
            this.CounterSaleOrderBookingForm.get('custName').disable();
            this.CounterSaleOrderBookingForm.get('mobile1').disable();
            this.CounterSaleOrderBookingForm.get('refCustNo').disable();
            this.CounterSaleOrderBookingForm.get('custPoDate').disable();
            this.CounterSaleOrderBookingForm.get('custPoNumber').disable();
            this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
            this.displayorderHedaerDetails = false;

            // for (let i = 0; this.allDatastore.oeOrderLinesAllList.length; i++) {
            // if (data.obj.oeOrderLinesAllList[i].flowStatusCode === 'BOOKED') {
            //   this.displayLineflowStatusCode[i] = false;
            //   this.displayRemoveRow[i] = false;
            // }
            // else if
            //   (this.allDatastore.oeOrderLinesAllList[i].flowStatusCode === 'CANCELLED' && this.allDatastore.oeOrderLinesAllList[i].flowStatusCode === 'Invoiced') {
            //   this.displayLineflowStatusCode[i] = true;
            // }
            // }




            if (data.obj.custName.includes(('CSCash Customer')) && Number(sessionStorage.getItem('divisionId')) === 2) {
              // alert(data.obj.custName);
              this.displaywalkingCustomer = false;
              var temp = data.obj.cntrOrdCustName.split('#');
              this.CounterSaleOrderBookingForm.patchValue({ walkCustName: temp[0] });
              this.CounterSaleOrderBookingForm.patchValue({ walkCustPan: temp[1] });
              this.CounterSaleOrderBookingForm.patchValue({ walkCustaddres: temp[2] });
            }
            // alert(data.obj.orderStatus);
            if (data.obj.orderStatus === 'BOOKED' && Number(sessionStorage.getItem('divisionId')) === 2) {
              this.service.crediteLimitFn(this.allDatastore.customerId, sessionStorage.getItem('locId'), this.allDatastore.customerSiteId)
                .subscribe(
                  data => {
                    if (data.code === 200) {
                      // alert(data.obj);
                      // var credAmt = this.CounterSaleOrderBookingForm.get('creditAmt').value;
                      // var newCrAmt = Number(this.allDatastore.creditAmt) - Number(data.obj.outStandingAmt);
                      // this.CounterSaleOrderBookingForm.patchValue({ creditAmt: newCrAmt });
                      var newCrmAmt1 = Math.round(((data.obj.outStandingAmt) + Number.EPSILON) * 100) / 100;
                      this.CounterSaleOrderBookingForm.patchValue({ creditAmt: newCrmAmt1 });
                      this.CounterSaleOrderBookingForm.patchValue({ creditDays: data.obj.creditDays });
                      this.CounterSaleOrderBookingForm.patchValue({ daysMsg: data.obj.daysMsg });
                      if (this.CounterSaleOrderBookingForm.get('daysMsg').value.includes('Exceeded')) {
                        alert('Credit Days is exceeded.!');
                        // this.isDisabled10 = true;
                      }
                      else if (this.allDatastore.totAmt >= data.obj.outStandingAmt) {
                        alert('Credit Amount is exceeded.! ... Credit Amount is' + ' ' + this.allDatastore.crdAmt + ' ' + 'Total Amount is' + ' ' + this.allDatastore.totAmt + '.!')
                        // this.isDisabled10 = true;
                        return;
                      }
                      // else {
                      //   this.isDisabled10 = false;
                      // }
                    }
                  })
            }
          }
          else {
            if (data.code) {
              alert(data.message);
            }
          }
        });
  }



  onOptionsSelectedTransactionType(transactionTypeName: string) {
    if (transactionTypeName != undefined) {
      // alert(transactionTypeName)'
      if (this.CounterSaleOrderBookingForm.get('custName').value == undefined) {
        alert("Please Enter Customer Proper Site Name ")
        return;
      }

      this.displayCSOrderAndLineDt = false;
      let select = this.orderTypeList.find(d => d.transactionTypeName === this.transactionTypeName);
      console.log(select);
      // alert(select.transactionTypeId)
      this.CounterSaleOrderBookingForm.patchValue({ transactionTypeId: select.transactionTypeId })
      if (transactionTypeName.includes('Cash')) {
        let selectTrx = this.createOrderTypeList.find(d => d.code === 'Direct Invoice');
        this.CounterSaleOrderBookingForm.patchValue({ createOrderType: selectTrx.codeDesc });
        this.setFocus('createOrderType');
        this.CounterSaleOrderBookingForm.get('name').disable();
        // alert('hi')
      }
      if (transactionTypeName.includes('Credit')) {
        let selectTrx = this.createOrderTypeList.find(d => d.code === 'Pick Ticket');
        this.CounterSaleOrderBookingForm.patchValue({ createOrderType: selectTrx.codeDesc });
        this.setFocus('createOrderType');
        this.CounterSaleOrderBookingForm.get('name').disable();
      }

    }

  }


  setFocus(name) {

    const ele = this.aForm.nativeElement[name];
    if (ele) {
      ele.focus();
    }
  }

  accountNoSearch(custAccountNo) {
    // alert(custAccountNo);
    this.service.searchCustomerByAccount(custAccountNo)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.selCustomer = data.obj;
            this.custSiteList = data.obj.customerSiteMasterList;
            if (data.obj.tcsYN === 'Y') {
              this.CounterSaleOrderBookingForm.patchValue(data.obj);
              this.displaytcsYN = false;
              this.displaytcsBuuton = false;
              // this.isDisabled = true;
            }
            this.CounterSaleOrderBookingForm.patchValue({ tcsYN: data.obj.tcsYN });
            this.CounterSaleOrderBookingForm.patchValue({ custName: data.obj.custName });
            this.CounterSaleOrderBookingForm.patchValue({ customerId: data.obj.customerId });

            this.CounterSaleOrderBookingForm.patchValue({ tcsPer: data.obj.tcsPer });
            this.CounterSaleOrderBookingForm.patchValue({ custAccountNo: custAccountNo });
            let select = this.payTermDescList.find(d => d.lookupValueId === this.selCustomer.termId);
            // this.paymentType = select.lookupValue;
            this.CounterSaleOrderBookingForm.patchValue({ paymentType: select.lookupValue })
            this.CounterSaleOrderBookingForm.get('custName').disable();
            this.CounterSaleOrderBookingForm.get('mobile1').disable();
            // alert(this.custSiteList.length)
            for (let i = 0; i < this.custSiteList.length; i++) {
              if (this.custSiteList.length === 1) {
                // alert(this.custSiteList.length)
                this.CounterSaleOrderBookingForm.patchValue({ name: this.custSiteList[0].siteName });
                this.onOptionsSelectedcustSiteName(this.custSiteList[0].siteName);
              }
              else if (this.custSiteList.length > 1) {
                // alert('hi')
                this.CounterSaleOrderBookingForm.patchValue({ name: this.custSiteList[0].siteName });
                this.onOptionsSelectedcustSiteName(this.custSiteList[0].siteName);
              }
            }
            var custName = data.obj.custName;
            if (custName.includes(('CSCash Customer')) && Number(sessionStorage.getItem('divisionId')) === 2) {
              this.displaywalkingCustomer = false;
              this.CounterSaleOrderBookingForm.patchValue({ discType: 'Header Level Discount' });
              this.displaydisPer = false;
            }
            else {
              this.CounterSaleOrderBookingForm.get('disPer').disable();
            }
            if (data.obj.tcsYM === 'Y') {
              this.displaytcsYN = false;
              this.displaytcsBuuton = true;
            }
            this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
            this.isDisabled3 = true;
            this.customerNameSearch.splice(0, this.customerNameSearch.length);
            console.log(this.customerNameSearch);
          }
          else {
            if (data.code === 400) {
              // alert('Error :' + data.message);
              this.display = 'block';
              // this.displaycreateCustomer = false;
            }
          }
        });

    this.service.exicutiveNameByCustName(custAccountNo, sessionStorage.getItem('locId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.exicutiveNameByCustNameList = data.obj;
            var salesExicustive = data.obj.ticketNo + '--' + data.obj.fullName;
            this.CounterSaleOrderBookingForm.patchValue({ salesRepId: data.obj.emplId });
            this.CounterSaleOrderBookingForm.patchValue({ salesRepName: salesExicustive })
          }
        })
  }



  onOptionsSelectedcustSiteName(siteName) {
    // alert(siteName);
    //  alert(sessionStorage.getItem('ouId'));
    let selSite = this.custSiteList.find(d => d.siteName === siteName);
    console.log(selSite);
    console.log(this.custSiteList);

    // alert(selSite.ouId);

    if (selSite.ouId != (sessionStorage.getItem('ouId'))) {
      alert('First Create OU wise Site to continue process!')
    }
    else {
      // alert(this.selCustomer)
      console.log(this.selCustomer);

      // alert(this.selCustomer.customerId)
      this.CounterSaleOrderBookingForm.patchValue(selSite);
      // this.custName = this.custSiteList.custName;
      // this.customerId = selSite.customerId;
      this.custAddress = (selSite.address1 + ', '
        + selSite.address2 + ', '
        + selSite.address3 + ', '
        + selSite.address4 + ', '
        + selSite.city + ', '
        + selSite.pinCd + ', '
        + this.selCustomer.state);
      this.birthDate = this.selCustomer.birthDate;
      this.weddingDate = this.selCustomer.weddingDate;
      this.taxCategoryName = this.selCustomer.taxCategoryName;
      this.CounterSaleOrderBookingForm.patchValue({ creditAmt: selSite.creditAmt });
      if (selSite.disPer != null) {
        // alert(selSite.disPer)
        this.CounterSaleOrderBookingForm.patchValue({ discType: 'Header Level Discount' })
        this.CounterSaleOrderBookingForm.patchValue({ disPer: selSite.disPer })
        this.orderlineDetailsGroup().patchValue({ disPer: selSite.disPer })
        this.displaydisPer = false;
        var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
        // alert(patch.length)
        for (let i = 0; i < patch.length; i++) {
          (patch.controls[i]).patchValue({
            disPer: selSite.disPer,
          });
        }
      }
    }
    if (Number(sessionStorage.getItem('divisionId')) === 2) {
      // alert(this.selCustomer.customerId+'----'+selSite.customerSiteId)
      // this.service.crediteLimitFn(this.selCustomer.customerId, selSite.customerSiteId)
      this.service.crediteLimitFn(this.selCustomer.customerId, sessionStorage.getItem('locId'), selSite.customerSiteId)
        .subscribe(
          data => {
            if (data.code === 200) {
              // alert(data.obj);
              var credAmt = this.CounterSaleOrderBookingForm.get('creditAmt').value;
              // var newCrAmt = Number(credAmt) - Number(data.obj.outStandingAmt);
              var newCrmAmt1 = Math.round(((data.obj.outStandingAmt) + Number.EPSILON) * 100) / 100;
              this.CounterSaleOrderBookingForm.patchValue({ creditAmt: newCrmAmt1 });
              this.CounterSaleOrderBookingForm.patchValue({ creditDays: data.obj.creditDays });
              this.CounterSaleOrderBookingForm.patchValue({ daysMsg: data.obj.daysMsg });
            }
          })
    }

  }


  custNameSearch(custName) {
    // alert(custName)
    this.orderManagementService.custNameSearchFn1(custName, sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.customerNameSearch = data.obj;
          }
          else {
            if (data.code === 400) {
              alert(data.message);
              this.display = 'block';
            }
          }
        }
      );
  }




  searchByContact(contactNo) {
    this.service.searchCustomerByContact(contactNo)
      .subscribe(
        data => {
          this.accountNoSearchdata = data.obj;
          this.CounterSaleOrderBookingForm.patchValue({ custAccountNo: data.obj.custAccountNo })

        });
  }


  panCardWalding(event: any) {
    this.orderManagementService.searchByPanNumber(this.CounterSaleOrderBookingForm.get('walkCustPan').value)
      .subscribe(
        data => {
          if (data.code === 200) {
            if (data.obj.length >= 0) {
              alert(data.message + ' ' + 'Customer Account Number' + ' ' + data.obj.accountNo)
              this.CounterSaleOrderBookingForm.get('walkCustPan').reset();
            }
            else if (data.obj.length < 0) {

            }
          }
        })
  }

  walkcustomermerge(event: any) {
    var contactName = this.CounterSaleOrderBookingForm.get('walkCustName').value + '#' + this.CounterSaleOrderBookingForm.get('walkCustPan').value + '#' + this.CounterSaleOrderBookingForm.get('walkCustaddres').value
    this.CounterSaleOrderBookingForm.patchValue({ cntrOrdCustName: contactName })
  }


  onOptionsSelectedissueTypeCode(event: any) {
    let selectIssueCode = this.issueCodeTypeList.find(d => d.codeDesc === event);
    this.CounterSaleOrderBookingForm.patchValue({ issueCode: selectIssueCode.code })
    var concatissuetypecode = this.CounterSaleOrderBookingForm.get('issueCode').value + '-' + this.CounterSaleOrderBookingForm.get('issueCodeType1').value
    this.CounterSaleOrderBookingForm.patchValue({ issueCodeType: concatissuetypecode });
  }


  searchByItemSegmentDiv(itemDesc: string, lnNo: number) {
    // alert(itemDesc)
    var itemDesc = itemDesc.toUpperCase();
    if (itemDesc === '' || itemDesc === undefined || itemDesc === null) {
      alert('Please Enter Proper Item Code.!')
      this.setFocus('itemSeg' + lnNo);
      return;
    }

    let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var itemType = (controlinv.controls[lnNo]).get('invType').value;
    (controlinv.controls[lnNo]).patchValue({ 'segment': '' });

    let controlinvArray = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    console.log(controlinvArray);
    for (let j = 0; j < controlinvArray.length; j++) {
      if (itemDesc === controlinvArray[j].segment) {
        alert('Item Already Present.!' + ' ' + 'Line Number' + ' ' + (j + 1) + '.!')
      }
    }
    if (this.itemMap.has(itemDesc)) {
      var itemsList = this.itemMap.get(itemDesc);
      this.itemMap2.set(lnNo, this.itemMap.get(itemDesc));
    } else {
    }
    this.invItemList1 = this.itemMap.get(itemDesc);
    this.orderManagementService.searchByItemSegmentDiv(this.divisionId, itemDesc)
      .subscribe(
        data => {
          this.orderedItem = data.description;
          console.log(data.description);

          this.itemMap.set(itemDesc, data);
          this.itemMap2.set(lnNo, this.itemMap.get(itemDesc));
          if (data.length == 1) {
            (controlinv.controls[lnNo]).patchValue({ 'segment': data[0].segment });

          }
          if (data.length === 0) {
            (controlinv.controls[lnNo]).patchValue({ 'segment': '' });
            (controlinv.controls[lnNo]).patchValue({ 'frmLocatorId': '' });
            (controlinv.controls[lnNo]).patchValue({ 'Avalqty': '' });
            (controlinv.controls[lnNo]).patchValue({ 'pricingQty': '' });
            (controlinv.controls[lnNo]).patchValue({ 'orderedItem': '' });
            (controlinv.controls[lnNo]).patchValue({ 'unitSellingPrice': '' });
            (controlinv.controls[lnNo]).patchValue({ 'baseAmt': '' });
            (controlinv.controls[lnNo]).patchValue({ 'taxCategoryName': '' });
            (controlinv.controls[lnNo]).patchValue({ 'taxAmt': '' });
            (controlinv.controls[lnNo]).patchValue({ 'totAmt': '' });
            (controlinv.controls[lnNo]).patchValue({ 'hsnSacCode': '' });
            (controlinv.controls[lnNo]).patchValue({ 'disAmt': '' });
            alert('Please Enter Proper Item Code.!')
            this.setFocus('itemSeg' + lnNo);
            return;
          }
        }
      );

  }



  onOptionsSelectedDescription(segment: string, k) {
    if (segment != undefined && segment != "") {
      this.displayorderHedaerDetails = false;
      // if (this.op != 'Search') {
      //   let selPayTerm = this.payTermDescList.find(d => d.lookupValueId === this.selCustomer.termId);
      //   this.paymentType = selPayTerm.lookupValue;
      // }
      var orderedDate = this.pipe.transform(this.now, 'dd-MM-yyyy');
      this.CounterSaleOrderBookingForm.patchValue({ orderedDate: orderedDate });
      this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
      this.CounterSaleOrderBookingForm.get('name').disable();
      this.CounterSaleOrderBookingForm.get('custName').disable();
      this.CounterSaleOrderBookingForm.get('mobile1').disable();
      this.CounterSaleOrderBookingForm.get('refCustNo').disable();
      this.CounterSaleOrderBookingForm.get('custPoDate').disable();
      this.CounterSaleOrderBookingForm.get('custPoNumber').disable();

      // else {
      //let select = this.invItemList1.find(d => d.segment === segment);
      let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
      var itemType = (controlinv.controls[k]).get('invType').value;

      let select = (this.itemMap2.get(k)).find(d => d.segment === segment);
      //this.CounterSaleOrderBookingForm.patchValue({ itemId: select.itemId })
      if (segment != undefined) {
        this.itemId = select.itemId;
        var custtaxCategoryName = this.CounterSaleOrderBookingForm.get('taxCategoryName').value;
        var priceListId = this.CounterSaleOrderBookingForm.get('priceListId').value;
        console.log(priceListId);
        if (custtaxCategoryName === 'Sales-IGST') {
          // alert(custtaxCategoryName);
          this.orderManagementService.addonDescList1(segment, custtaxCategoryName, priceListId)
            .subscribe(
              data => {
                if (data.code === 200) {
                  this.addonDescList = data.obj;
                  for (let i = 0; i < data.obj.length; i++) {
                    var itemtaxCatNm: string = data.obj[i].taxCategoryName;
                    if (itemtaxCatNm.includes('Sale-I-GST')) {
                      // alert(itemtaxCatNm);
                      (controlinv.controls[k]).patchValue({
                        itemId: data.obj[i].itemId,
                        orderedItem: data.obj[i].description,
                        hsnSacCode: data.obj[i].hsnSacCode,
                        uom: data.obj[i].uom,
                        unitSellingPrice: data.obj[0].priceValue,
                        taxPer: data.obj[0].taxPercentage,
                        disPer: 0,
                        disAmt: 0,
                        sgst: 0,
                        cgst: 0,
                        igst: 0,
                        totAmt: 0,
                        mrp: 0,
                        baseAmt: 0,
                      });

                    }
                  }

                }
                else if (data.code === 400) {
                  alert(data.message)
                }
              })
            ;
        }
        else {
          this.orderManagementService.addonDescList1(segment, custtaxCategoryName, priceListId)
            .subscribe(
              data => {
                if (data.code === 200) {
                  this.addonDescList = data.obj; //// item iformation
                  for (let i = 0; i < data.obj.length; i++) {
                    var taxCatNm: string = data.obj[i].taxCategoryName;
                    if (taxCatNm.includes('Sale-S&C')) {
                      (controlinv.controls[k]).patchValue({
                        itemId: data.obj[i].itemId,
                        orderedItem: data.obj[i].description,
                        hsnSacCode: data.obj[i].hsnSacCode,
                        uom: data.obj[i].uom,
                        unitSellingPrice: data.obj[0].priceValue,
                        taxPer: data.obj[0].taxPercentage,
                      });
                      if (this.CounterSaleOrderBookingForm.get('issueCodeType').value.includes('Only Oil Part') && data.obj[i].uom === 'LTR' && Number(sessionStorage.getItem('divisionId')) === 2) {
                        (controlinv.controls[k]).patchValue({
                          disPer: 0,
                          disAmt: 0
                        })
                      }
                    }
                  }
                }
                else if (data.code === 400) {
                  alert(data.message);
                }
              }

            );
        }
      }
      // }


    }
  }

  onKey(index, fldName) {
    var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var custtaxCategoryName = this.CounterSaleOrderBookingForm.get('taxCategoryName').value;
    var baseAmt = Math.round(((trxLnArr1[index].pricingQty * trxLnArr1[index].unitSellingPrice) + Number.EPSILON) * 100) / 100;
    var baseAfterDisc = Math.round(((baseAmt - trxLnArr1[index].disAmt) + Number.EPSILON) * 100) / 100;
    var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    // alert(custtaxCategoryName)
    if (custtaxCategoryName.includes('IGST')) {
      // alert(custtaxCategoryName.includes('IGST')+'---'+baseAmtWithoutDisc+'---'+trxLnArr1[index].taxPer);
      (patch.controls[index]).patchValue(
        {
          baseAmt: baseAmt,
          igst: Math.round(((baseAfterDisc * trxLnArr1[index].taxPer / 100) + Number.EPSILON) * 100) / 100,
          taxAmt: Math.round(((baseAfterDisc * trxLnArr1[index].taxPer / 100) + Number.EPSILON) * 100) / 100,
          totAmt: Math.round(((baseAfterDisc + (baseAfterDisc * trxLnArr1[index].taxPer / 100)) + Number.EPSILON) * 100) / 100,
          disAmt: Math.round((((baseAmt * trxLnArr1[index].disPer) / 100) + Number.EPSILON) * 100) / 100,
          sgst: 0,
          cgst: 0,
          mrp: 0,
        })
      this.updateTotAmtPerline(index);
    }
    else {
      var taxAmt = Math.round((((baseAfterDisc * trxLnArr1[index].taxPer / 100) ) + Number.EPSILON) * 100) / 100;
      (patch.controls[index]).patchValue(
        {
          baseAmt: baseAmt,
          sgst: Math.round((((baseAfterDisc * trxLnArr1[index].taxPer / 100) / 2) + Number.EPSILON) * 100) / 100,
          cgst: Math.round((((baseAfterDisc * trxLnArr1[index].taxPer / 100) / 2) + Number.EPSILON) * 100) / 100,
          taxAmt:taxAmt,
          disAmt: Math.round((((baseAmt * trxLnArr1[index].disPer) / 100) + Number.EPSILON) * 100) / 100,
          totAmt: Math.round(((baseAfterDisc + (taxAmt)) + Number.EPSILON) * 100) / 100,
          igst: 0,
          mrp: 0,
        })
      this.updateTotAmtPerline(index);
    }
    var itemId1 = trxLnArr1[index].itemId;
    if (itemId1 != null && fldName != "locator") {
      this.addRow(index);
    }
    else {
      this.displayRemoveRow.push(true);
    }
  }

  addRow(i) {
    var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    if (this.op == 'Search') {
      i = trxLnArr1.length;
    }
    var disPer = this.CounterSaleOrderBookingForm.get('disPer').value;
    this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
    var len = this.orderlineDetailsArray().length;
    var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    (patch.controls[len - 1]).patchValue(
      {
        lineNumber: len,
        flowStatusCode: 'BOOKED',
        disPer: disPer,
        invType: 'SS_SPARES',
      }
    );
    if (disPer === null) {
      (patch.controls[len - 1]).patchValue(
        {
          disPer: 0,
        }
      );
    }
    this.displaysegmentInvType.push(true);
    this.displayRemoveRow[len - 1] = true;
    this.displayCounterSaleLine.push(true);
    this.displayLineflowStatusCode.push(true);
    this.itemSeg = '';
    var ln = len - 1;
    this.setFocus('itemSeg' + ln);
    var arrayControl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
  }


  RemoveRow(OrderLineIndex) {
    // alert(OrderLineIndex)
    // var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var trxLnArr2 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var trxLnArr1 = trxLnArr2.getRawValue();
    var itemid = trxLnArr1[OrderLineIndex].segment;
    var itemid1 = trxLnArr1[OrderLineIndex].itemId;
    var uuidref = trxLnArr1[OrderLineIndex].uuidRef;
    var locatorId = trxLnArr1[OrderLineIndex].frmLocatorName;
    var prc = trxLnArr1[OrderLineIndex].unitSellingPrice;
    this.orderlineDetailsArray().removeAt(OrderLineIndex);
    this.TaxDetailsArray().removeAt(OrderLineIndex);
    var formVal = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var formArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;

    var basicAmt = 0;
    var taxAmt1 = 0;
    var totAmt = 0;
    var disAmt = 0;
    var tcsAmt1 = 0;

    for (let i = 0; i < formVal.length; i++) {
      (formArr.controls[i]).patchValue({
        lineNumber: i + 1,
      });
    }
    this.updateTotAmtPerline(0);
  }


  updateLineOnCancel(i) {
    var trxArrVal = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var trxArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    // alert(i+'----'+ trxArrVal[i].flowStatusCode);
    if (trxArrVal[i].flowStatusCode === 'CANCELLED') {
      trxArr.controls[i].patchValue({ 'baseAmt': 0, 'disAmt': 0, 'taxAmt': 0, 'totAmt': 0 });
    }
    this.updateTotAmtPerline(i)
  }

  updateTotAmtPerline(lineIndex) {
    alert(lineIndex);
    var formArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var formVal = formArr.getRawValue();
    // var tcsPer = this.CounterSaleOrderBookingForm.get('tcsPer').value;
    var basicAmt = 0;
    var taxAmt1 = 0;
    var totAmt = 0;
    var disAmt = 0;
    var tcsAmt1 = 0;
    for (let i = 0; i < formVal.length; i++) {
      if (formVal[i].flowStatusCode === 'BOOKED') {
        if (formVal[i].baseAmt === 0) {

        } else {
          basicAmt = basicAmt + Number(formVal[i].baseAmt);
        }

        if (formVal[i].disAmt === 0) {

        } else {
          disAmt = disAmt + Number(formVal[i].disAmt);
        }

        if (formVal[i].taxAmt === 0) {

        } else {
          taxAmt1 = taxAmt1 + Number(formVal[i].sgst + formVal[i].cgst + formVal[i].igst);
        }
        if (formVal[i].totAmt === 0) {

        } else {
          totAmt = totAmt + Number(formVal[i].totAmt);
          // tcsAmt1 = Math.round((totAmt * tcsPer / 100 + Number.EPSILON) * 100) / 100;
        }
      }
      console.log(formArr);
      var ln = i;
      if (ln < formArr.length - 1) {
        formArr.controls[i].disable();
        formArr.controls[i].get('pricingQty').enable();
        formArr.controls[i].get('flowStatusCode').enable();
      }

    }

    basicAmt = Math.round(((basicAmt) + Number.EPSILON) * 100) / 100;
    this.CounterSaleOrderBookingForm.patchValue({ 'subtotal': basicAmt });
    disAmt = Math.round(((disAmt) + Number.EPSILON) * 100) / 100;
    this.CounterSaleOrderBookingForm.patchValue({ 'discAmt': disAmt });
    taxAmt1 = Math.round(((taxAmt1) + Number.EPSILON) * 100) / 100;
    this.CounterSaleOrderBookingForm.patchValue({ 'totTax': taxAmt1 });
    totAmt = Math.round(((totAmt) + Number.EPSILON) * 100) / 100;
    this.CounterSaleOrderBookingForm.patchValue({ 'totAmt': totAmt });
    this.CounterSaleOrderBookingForm.patchValue({ 'tcsAmt': tcsAmt1 });
    var newln = lineIndex + 1;
    this.setFocus('itemSeg' + newln);
    var crdAmt = this.CounterSaleOrderBookingForm.get('creditAmt').value;
    if (crdAmt != undefined && crdAmt != null && crdAmt != '') {
      if (totAmt >= crdAmt) {
        alert('Credit Amount is exceeded.! ... Credit Amount is' + ' ' + crdAmt + ' ' + 'Total Amount is' + ' ' + totAmt + '.!');
        this.setFocus('itemSeg' + lineIndex);
        return;
      }

    }
  }


  close() {
    this.location1.back();
  }

  refresh() {
    window.location.reload();
  }

  transeData(val) { }

  createProformaOrder() {
    var formValue = this.transeData(this.CounterSaleOrderBookingForm.value);
    console.log(this.CounterSaleOrderBookingForm.value);
    console.log(formValue);
    let jsonData = this.CounterSaleOrderBookingForm.getRawValue();
    jsonData.orderedDate = this.now;
    jsonData.emplId = this.emplId;
    jsonData.divisionId = this.divisionId;
    jsonData.locationId = this.locationId;
    jsonData.customerId = this.selCustomer.customerId;
    if (jsonData.sgst != undefined && jsonData.cgst != undefined) {
      jsonData.totTax = jsonData.sgst + jsonData.cgst;
    } else if (jsonData.igst != undefined) {
      jsonData.totTax = jsonData.igst;
    }
    console.log(jsonData);
    this.orderManagementService.createProformaOrderFFn(jsonData).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        window.location.reload();
        this.isDisabled = true;
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.isDisabled = false;
          // this.paymentReceiptForm.reset();
        }
      }
    });
  }



  filterRecord(event, lnNo) {

    var itemCode1 = event.target.value;

    if (event.keyCode == 13) {
      var itemCode = '';
      if (itemCode1.includes('--')) {
        var itemCode2 = itemCode1.split('--');
        itemCode = itemCode2[0];
        // alert(itemCode + 'item in if');
      } else {
        itemCode = itemCode1;
        // alert(itemCode + 'item in else');
      }
      //alert(itemCode.length + 'length'+this.ItemIdList.length);
      // enter keycode
      if (itemCode.length >= 4 && this.invItemList1.length <= 1) {
        this.service
          .searchByItemSegmentDiv(this.divisionId, itemCode.toUpperCase())
          .subscribe((data) => {
            this.invItemList1 = data;
            this.itemMap2.set(lnNo, this.invItemList1);
            // this.Select(data[0].itemId);
          });
      } else {
        if (itemCode.length <= 1) {
          alert('Please Enter 4 characters of item number!!');
          return;
        }
      }
      if (itemCode.length === 8) {
        // alert('in len if' + itemCode.toUpperCase());
        console.log(this.invItemList1);
        let select1 = this.invItemList1.find(
          (d) => d.segment === itemCode.toUpperCase()
        );
        // alert(select1.itemId + 'In len');
        if (select1 != undefined) {
          this.onOptionsSelectedDescription(select1.segment, lnNo);
        } else {
          this.service
            .searchByItemSegmentDiv(this.divisionId, itemCode.toUpperCase())
            .subscribe((data) => {
              this.invItemList1 = data;
              this.onOptionsSelectedDescription(select1.itemId, lnNo);
            });

        }
      }
    }
  }
}