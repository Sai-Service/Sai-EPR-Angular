import { Component, OnInit, HostListener, ViewChild, ElementRef, NgModule, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormControlName, NgForm, Validators, FormArray, FormsModule } from '@angular/forms';

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

interface IGatePass {
  boxQty: number;
  driverName: string;
  vehNo: string;
  orderNumber: number;
  emplId: number;
}

interface ISalesBookingForm {
  emplId: number;
  issueCodeType: string;
  headerId: number;
  divisionId: number;
  transactionTypeId: number;
  customerSiteId: number;
  ouId: number;
  orderTypeId: string;
  transactionTypeName: string;
  createOrderType: string;
  custPoNumber: number;
  // orderedDate: Date;
  frmLocatorId: number;
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
  refCustNo: string;
  totAmt: number;
  othRefNo: number;
  orderNumber: number;
  itemId: number;
  taxCategoryId: number;
  mobile1: number;
  paymentType: string;
  issuedBy: string;
  cntrOrdPan: string;
  cntrOrdCustName: string;
  tcsAmt: number;
  tcsPer: number;
  salesRepId: string;
}




export class StockTransferRow {
  segment: string;
  Locator: string;
  quantity: number;
}

export class reserveLine {
  transactionType: string;
  transactionNumber: string;
  locId: number;
  reservedQty: number;
  invItemId: number;
  locatorId: number;
  rate: number;
}




@Component({
  selector: 'app-counter-sale',
  templateUrl: './counter-sale.component.html',
  styleUrls: ['./counter-sale.component.css'],

  template: `<pdf-viewer [src]="pdfSrc"
              [render-text]="true"
              style="display: block;"></pdf-viewer>`
})



export class CounterSaleComponent implements OnInit, OnDestroy {
  itemSeg: string = "";
  CounterSaleOrderBookingForm: FormGroup;
  lnflowStatusCode: 'BOOKED';
  refCustNo: string;
  // classCodeType:string;
  issueCodeType1: string;
  issueCode: string;
  custPoNumber: string;
  // custPoDate:Date;
  salesRepId: string;
  creditAmt: number;
  lineNumber: number;
  uuidRef: string;
  private allLineTotalAmt = 0;
  tcsYN: string;
  tcsPer: number;
  tcsAmt: number;
  creditDays: number;
  daysMsg: string;
  amountMsg: string;
  transactionTypeId: number;
  customerSiteId: number;
  reservedQty: number;
  frmLocatorId: number;
  activeLineNo: number = 1;
  divisionId: number;
  orderedQty: number;
  issueCodeType: string;
  uom: string;
  public sub: any;
  pricingQty: number;
  disAmt1: number;
  name: string;
  id: number;
  disPer: number;
  disAmt: number;
  taxAmt: number;
  discType: string;
  locData: any = [];
  deptName: string;
  resveQty: number;
  resrveqty: any;
  loginArray: string;
  frmLocatorName: string;
  userList2: any[] = [];
  lastkeydown1: number = 0;
  public ItemIdList: any = [];
  subInventoryId: number;
  public subInvCode: any;
  onhand1: any;
  Avalqty: number;
  isVisible: boolean = false;
  isVisibleGatePass: boolean = false;
  isVisible15: boolean = false;
  isVisible16: boolean = false;
  isVisible17: boolean = false;
  isVisible18: boolean = false;

  isVisibleCreateOrder: boolean = false;
  isVisiblePickTiPreview: boolean = false;
  isVisibleUpdate: boolean = false;
  isVisibleGenerateInvoice: boolean = false;
  isVisibleGenerateGatePass: boolean = false;
  isVisiblePayment: boolean = false;
  isVisibleViewInvoice: boolean = false;
  isVisibleViewReceipt: boolean = false;
  isVisibleViewGatePass: boolean = false;

  displayPerson: boolean;
  public minDate = new Date();
  public cityList: Array<string>[];
  public issueCodeTypeList: any[];
  public status = "Active";
  public titleList: Array<string>[];
  displayOrgnization: boolean;
  PersonType: any;
  classCodeType: string;
  public cityList1: any;
  location: string;
  displaydisAmt = false;
  displayDMSCDMS: boolean;
  cntrOrdCustName: string;
  trxNumber: number;
  orderStatus: string;
  public currentCS: string;
  customerNameSearch: any = [];
  accountNoSearchdata: any[];
  exicutiveNameByCustNameList: any = [];
  public op: string;
  // divisionName: string;
  submitted = false;
  poLineTax: number;
  hsnSacCode: string;
  displayorderHedaerDetails = true;
  displayCSOrderAndLineDt = true;
  displaypickTicketUpdate = true;
  displayViewGatePass = true;
  displayAfterGatePass = true;

  displayCustomerSite = true;
  displaysegmentInvType: Array<boolean> = [];
  displayRemoveRow: Array<boolean> = [];
  displayLineflowStatusCode: Array<boolean> = [];
  // displaysegmentInvType=true;
  displaycounterSaleAllButtons = true;
  displaydisPer = true;
  displaytcsYN = true;
  displaytcsBuuton = false;
  displaypickTicketInvoice = true;
  displaycreateOrderType = true;
  showApplyDiscount = true;
  selectedLine = 0;
  categoryList: any[];
  custSiteList: any = [];
  // orderedDate:Date;
  diss: number;
  InvoiceNumber: number;
  locId: number;
  contactNoSearchData: any;
  othRefNoSearchFnData: any;
  taxCat1: number;
  cntLineTax: number;
  invType: string;
  mobile1: number;
  segment: string;
  dept: number;
  baseAmt: number;
  discAmt: number;
  issuedBy: string;
  orderedItem: string;
  emplId: number;
  taxCategoryId: number;
  headerId: number;
  ouId: number;
  orderTypeId: string;
  transactionTypeName: string;
  createOrderType: string;
  // orderedDate: Date;
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
  custClassCode: string;
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
  itemId: number;
  indexVal: number;
  orderNumber: number;
  adhocDiscount: number;
  adhocConsu: number;
  additionalDisc: number;
  adhocExchBonus: number;
  adhocFinanceOffer: number;
  billToAddress: string;
  adhocISL: number;
  state: string;
  paymentType: string;
  // transactionTypeName:string;
  deptId: number;
  // createOrderType:string;
  ticketNo: string;
  // locId:number;
  panNo: string;
  SelectCustType: string;
  ouName: string;
  gstNo: string;
  taxCategoryName: string;
  public taxCategoryList: any = [];
  public allTaxCategoryList: any = [];
  lstgetOrderLineDetails: any[];
  lstgetOrderTaxDetails: any[];
  custSiteAddressList: any;
  newCustomerButton = true;
  PaymentButton = true;
  displaysegment = true;
  lstInvLineDeatails1: any[];
  createOrderTypeList: any[];
  allDatastore: any;
  displayorderLineDetailsPart = true;
  public payTermDescList: any = [];
  public orderTypeList: any;
  public ticketNoSearch: any;
  public taxCalforItem: any;
  public salesRepNameList: any;
  public priceListNameList: any;
  invItemList1: any[];
  public addonDescList: any[];
  displaycustAccountNo = true;
  displaycounterSaleOrderSave = true;
  displayaddRow = true;
  // displayRemoveRow=true;
  displaysalesRepName = true;
  // displaytaxCategoryName=true;
  displaycreateCustomer = true;
  displayCounterSaleLine: Array<boolean> = [];
  displaywalkingCustomer = true;
  PaymentViewReceipt = true;

  selCustomer: any;
  boxQty: number;
  driverName: string;
  vehNo: string;

  tmpTotAmt: number = 0;



  display = 'none';
  @ViewChild("myinput") myInputField: ElementRef;

  @ViewChild("paymentButton") paymentButton: ElementRef;

  @ViewChild('aForm') aForm: ElementRef;


  title: string;
  customerId1: number;
  fName: string;
  mName: string;
  lName: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  pinCd: number;
  mobile2: number;
  mobile3: number;
  emailId: string;
  emailId1: string;
  contactPerson: string;
  contactNo: number;
  birthDate: Date;
  weddingDate: Date;
  startDate: Date;
  endDate: Date;
  tanNo: string;
  divisionName: string;
  walkCustName: string;
  walkCustPan: string;
  walkCustaddres: string;

  public itemMap = new Map<string, any[]>();


  @ViewChild("othRefNo") othRefNo1: ElementRef;
  getfrmSubLoc: any;
  ngAfterViewInit() {

  }
  public taxMap = new Map<string, any>();

  pipe = new DatePipe('en-US');
  now = new Date();
  orderedDate = this.pipe.transform(this.now, 'dd-MM-yyyy');
  custPoDate = this.pipe.transform(this.now, 'dd-MM-yyyy');

  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  isDisabled = false;
  isDisabled3 = false;
  isDisabled10 = false;
  isDisabled11 = false;
  isDisabled15 = false;
  isDisabled16 = false;


  constructor(private fb: FormBuilder, private location1: Location, private router1: ActivatedRoute, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService,) {
    this.CounterSaleOrderBookingForm = fb.group({
      emplId: [''],
      salesRepId: [''],
      classCodeType: [''],
      // uuidRef: [''],
      taxCategoryName: [''],
      disPer: [''],
      issueCodeType1: [''],
      issueCode: [''],
      creditAmt: [''],
      creditDays: [''],
      daysMsg: [''],
      amountMsg: [''],
      refCustNo: [''],
      custPoDate: [''],
      discAmt: [''],
      tcsYN: [''],
      tcsPer: [''],
      tcsAmt: [],
      transactionTypeId: [''],
      InvoiceNumber: [''],
      name: ['', [Validators.required]],
      customerSiteId: [''],
      id: [''],
      trxNumber: [''],
      headerId: [''],
      boxQty: [''],
      driverName: [''],
      vehNo: [''],
      orderStatus: [''],
      ouId: [''],
      issuedBy: [''],
      orderTypeId: [''],
      issueCodeType: ['', [Validators.required]],
      transactionTypeName: ['', [Validators.required]],
      createOrderType: ['', [Validators.required]],
      custPoNumber: [''],
      orderedDate: [''],
      priceListId: [''],
      priceListName: ['', [Validators.required]],
      paymentTermId: [''],
      payTermDesc: [''],
      locationId: [''],
      billToLocId: [''],
      locId: [''],
      mobile1: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      paymentType: [''],
      shipToLocId: [''],
      billLocName: [''],
      shipLocName: [''],
      locCode: [''],
      customerId: [''],
      custType: [''],
      custAccountNo: ['', [Validators.required]],
      custName: [''],
      custAddress: [''],
      salesRepName: [''],
      flowStatusCode: [''],
      tlName: [''],
      remarks: [''],
      subtotal: [''],
      totTax: [''],
      totAmt: [''],
      othRefNo: [''],
      orderNumber: [''],
      state: [''],
      gstNo: ['', [Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}$"), Validators.minLength(15), Validators.maxLength(15)]],
      panNo: ['', [Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$"), Validators.minLength(10), Validators.maxLength(10)]],
      // cntrOrdPan:['', [Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$"), Validators.minLength(10), Validators.maxLength(10)]],
      cntrOrdCustName: [],
      walkCustName: [],
      walkCustPan: [],
      walkCustaddres: [],
      oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
      taxAmounts: this.fb.array([this.TaxDetailsGroup()]),
      ouName: [''],
      loginArray: [''],
      // classCodeType: [''],
      title: [''],
      fName: [''],
      mName: [''],
      lName: [],
      customerId1: [''],
      address1: ['', [Validators.minLength(10), Validators.maxLength(100), Validators.pattern('[a-zA-Z 0-9/-]*')]],
      address2: [''],
      address3: [''],
      address4: [''],
      city: [''],
      pinCd: [''],
      mobile2: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      mobile3: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      emailId: ['', [Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      emailId1: ['', [Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      contactPerson: [''],
      contactNo: ['', [Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
      birthDate: [''],
      weddingDate: [''],
      startDate: [''],
      tanNo: [''],
      location: [''],
      status: [''],
      discType: [''],
    })

  }


  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {

    console.log("closing the window!")
    return true;
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler2(event: Event) {

    console.log("closing the window!")
    return true;
  }


  orderlineDetailsArray(): FormArray {
    return <FormArray>this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList')
  }

  orderlineDetailsGroup() {
    return this.fb.group({
      itemSeg: [''],
      uuidRef: [''],
      frmLocatorId: ['', [Validators.required]],
      onHandQty: [],
      discType: [],
      disPer: ['0'],
      disAmt: [0],
      uom: [],
      lnflowStatusCode: [''],
      Avalqty: [''],
      resveQty: [],
      frmLocatorName: [],
      itemId: [],
      orderedItem: [''],
      pricingQty: ['', [Validators.required]],
      orderedQty: ['0'],
      unitSellingPrice: ['0'],
      taxCategoryName: ['', [Validators.required]],
      baseAmt: ['0'],
      taxAmt: ['0'],
      totAmt: ['0'],
      flowStatusCode: [''],
      category: [''],
      invType: ['', [Validators.required]],
      hsnSacCode: [''],
      id: [''],
      // invType:[''],
      taxCategoryId: [''],
      displaysegment: false,
      lineNumber: [''],
      orderNumber: [''],
      segment: ['', [Validators.required]],
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
      itemId: [],
      invLineNo: [],
    });
  }

  TaxDetailsArray(): FormArray {
    return <FormArray>this.CounterSaleOrderBookingForm.get('taxAmounts')
  }


  ngOnInit(): void {

    this.isVisibleCreateOrder = true;
    this.isVisiblePickTiPreview = false;
    this.isVisibleUpdate = false;
    this.isVisibleGenerateInvoice = false;
    this.isVisibleGenerateGatePass = false;
    this.isVisiblePayment = false;
    this.isVisibleViewInvoice = false;
    this.isVisibleViewReceipt = false;
    this.isVisibleViewGatePass = false;

    this.isVisible15 = true;
    this.isVisible16 = true;
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

    this.orderlineDetailsArray().controls[0].patchValue({ invType: 'SS_SPARES' });
    this.CounterSaleOrderBookingForm.patchValue({ disAmt: 0 })
    this.CounterSaleOrderBookingForm.patchValue({ discType: 'No Discount' })
    this.op = 'insert';
    this.startDate = new Date();
    this.displaypickTicketInvoice = true;
    this.displayCSOrderAndLineDt = true;
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
    this.locId = Number(sessionStorage.getItem('locId'));
    this.locationId = Number(sessionStorage.getItem('locId'));
    this.deptName = (sessionStorage.getItem('deptName'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.invType = 'SS_SPARES';


    this.disPer = 0.00;
    this.service.payTermDescList()
      .subscribe(
        data => {
          this.payTermDescList = data;
          console.log(this.payTermDescList);
        }
      );



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

    this.service.createOrderTypeListFn()
      .subscribe(
        data1 => {
          this.createOrderTypeList = data1;
          console.log(this.createOrderTypeList);
        }
      );


    this.service.issueCodeFunction(sessionStorage.getItem('divisionId'))
      .subscribe(
        data1 => {
          this.issueCodeTypeList = data1;
        }
      );

    this.service.titleList()
      .subscribe(
        data => {
          this.titleList = data;
          console.log(this.titleList);
        }
      );

    this.orderManagementService.orderTypeList(this.deptId, this.ouId)
      .subscribe(
        data => {
          this.orderTypeList = data;
          console.log(this.orderTypeList);
        }
      );




    this.service.cityList()
      .subscribe(
        data => {
          this.cityList = data;
          console.log(this.cityList);
        }
      );

    this.service.salesRepNameList(this.ouId, this.locId, this.deptId)
      .subscribe(
        data => {
          this.salesRepNameList = data.obj;
          console.log(this.salesRepNameList);
        }
      );

    this.orderManagementService.priceListNameList1(sessionStorage.getItem('ouId'), (sessionStorage.getItem('divisionId')))
      .subscribe(
        data => {
          this.priceListNameList = data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].ouId === 999) {
              this.CounterSaleOrderBookingForm.patchValue({ priceListName: data[i].priceListName })
              this.CounterSaleOrderBookingForm.patchValue({ priceListId: data[i].priceListHeaderId })
            }
          }
        }
      );



    this.orderlineDetailsGroup();
    var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray
    (patch.controls[0]).patchValue(
      {
        lineNumber: 1,
        uuidRef: uuidv4()
      }
    );

    this.service.subInvCode2(this.deptId, this.divisionId).subscribe(
      data => {
        this.subInvCode = data;
        console.log(this.subInventoryId);
        this.subInventoryId = this.subInvCode.subInventoryId;
      });

    this.sub = this.router1.params.subscribe(params => {
      this.orderNumber = params['orderNumber'];
      if (this.orderNumber != undefined) {
        this.OrderFind(this.orderNumber);
      }
    });

    this.displaysegmentInvType[0] = true;

    this.displayCounterSaleLine[0] = true;

    this.orderlineDetailsArray().controls[0].patchValue({ flowStatusCode: 'BOOKED' });



    this.custSiteList.push({ 'siteName': '--Select--' });
  }


  CounterSaleOrderBooking(CounterSaleOrderBookingForm: any) {
  }




  OrderFind(orderNumber) {
    this.op = 'Search';
    this.isDisabled11 = true;
    // this.isDisabled10=false;
    this.displayCSOrderAndLineDt = false;
    this.emplId = Number(sessionStorage.getItem('emplId'))
    this.orderlineDetailsArray().clear();
    this.TaxDetailsArray().clear();
    this.displaycustAccountNo = false;
    this.displaycreateOrderType = false;
    this.displayCustomerSite = false;
    this.orderManagementService.counterSaleOrderSearchNew(orderNumber, sessionStorage.getItem('locId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.isVisibleCreateOrder = false;
            this.isVisiblePickTiPreview = true;
            this.isVisibleUpdate = true;
            this.isVisibleGenerateInvoice = true;
            this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
            this.lstgetOrderTaxDetails = data.obj.taxAmounts;
            this.allDatastore = data.obj;
            this.custClassCode = data.obj.classCodeType;
            if (data.obj.discType === 'Header Level Discount') {
              this.onOptionsSelectedDiscountType(data.obj.discType);
              this.CounterSaleOrderBookingForm.patchValue({ disPer: data.obj.disPer });
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

            }
            let control = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
            let control1 = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
            for (let i = 0; i <= this.lstgetOrderLineDetails.length - 1; i++) {
              var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
              control.push(oeOrderLinesAllList1);
              this.displaysegmentInvType[i] = false;
              this.displayLineflowStatusCode.push(true);
              this.displayCounterSaleLine.push(false);
            }
            for (let j = 0; j <= this.lstgetOrderTaxDetails.length; j++) {
              var orderTaxLinesList: FormGroup = this.TaxDetailsGroup();
              control1.push(orderTaxLinesList);
            }
            this.CounterSaleOrderBookingForm.patchValue(data.obj);
            // let controlNew = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
            for (let x = 0; x < this.lstgetOrderTaxDetails.length; x++) {
              var invLnNo = (this.lstgetOrderTaxDetails[x].invLineNo);
              var invLn = Number(invLnNo - 1);
              control1.push(this.TaxDetailsGroup());
              var lenNo = x + 1;
              let taxes = this.lstgetOrderTaxDetails.filter((customer) => (customer.invLineNo === lenNo));
              this.taxMap.set(String(x), taxes);
            }
            var taxItemsArray = this.CounterSaleOrderBookingForm.get('taxAmounts').value;
            console.log(taxItemsArray);

            this.salesRepName = data.obj.salesRepName;
            this.createOrderType = data.obj.createOrderType;
            this.priceListName = data.obj.priceListName;
            this.paymentType = data.obj.paymentType;
            this.paymentTermId = data.obj.paymentTermId;
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

            for (let k = 0; k < data.obj.taxAmounts.length; k++) {
              let controlinv = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
              (controlinv.controls[k]).patchValue({
                totTaxAmt: data.obj.taxAmounts[k].totTaxAmt,
              });
              this.TaxDetailsArray().disabled;
            }
            this.CounterSaleOrderBookingForm.patchValue({ orderedDate: data.obj.orderedDate });
            this.CounterSaleOrderBookingForm.get('orderedDate').disable();
            // alert( data.obj.orderStatus +'-----' + data.obj.trxNumber);
            if (data.obj.orderStatus != 'BOOKED' && data.obj.trxNumber != null) {
              this.isVisible = true;
              this.isVisibleGatePass = true;
            }
            else {
              this.isVisible = false;
              this.isVisibleGatePass = false;
            }
            this.CounterSaleOrderBookingForm.controls['emplId'].patchValue(Number(sessionStorage.getItem('emplId')));
            if (this.allDatastore.createOrderType === 'Pick Ticket' && this.allDatastore.flowStatusCode === 'BOOKED') {
              this.CounterSaleOrderBookingForm.get('custName').disable();
              this.CounterSaleOrderBookingForm.get('mobile1').disable();
              this.CounterSaleOrderBookingForm.get('refCustNo').disable();
              this.CounterSaleOrderBookingForm.get('custPoDate').disable();
              this.CounterSaleOrderBookingForm.get('custPoNumber').disable();
              this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
              this.displayorderHedaerDetails = false;
              this.displaycounterSaleOrderSave = false;
              this.displaypickTicketInvoice = false;
              this.displaypickTicketUpdate = false;
              this.displayViewGatePass = true;
            }
            else if (this.allDatastore.createOrderType === 'Pick Ticket Invoice' || this.allDatastore.createOrderType === 'Direct Invoice' || this.allDatastore.createOrderType === 'Sales Order') {
              // alert('Pick to Invoice');
              this.displaycounterSaleOrderSave = false;
              // this.displaycounterSaleOrderSave=false;
              this.displaycounterSaleAllButtons = false;
              this.displayaddRow = false;
              this.displaypickTicketUpdate = false;
              this.displayViewGatePass = true;
              this.CounterSaleOrderBookingForm.disable();
              this.TaxDetailsArray().disable();
              this.CounterSaleOrderBookingForm.get('boxQty').enable();
              this.CounterSaleOrderBookingForm.get('driverName').enable();
              this.CounterSaleOrderBookingForm.get('vehNo').enable();

            }
            else {
              this.CounterSaleOrderBookingForm.enable();
              this.displaycounterSaleOrderSave = true;
              this.displayaddRow = true;
              // this.displayRemoveRow=true;
              this.displaysalesRepName = true;
              // this.displaytaxCategoryName=true;
              this.CounterSaleOrderBookingForm.get('custName').disable();
              this.CounterSaleOrderBookingForm.get('mobile1').disable();
              this.CounterSaleOrderBookingForm.get('refCustNo').disable();
              this.CounterSaleOrderBookingForm.get('custPoDate').disable();
              this.CounterSaleOrderBookingForm.get('custPoNumber').disable();
              this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
              this.CounterSaleOrderBookingForm.get('custAddress').disable();
              if (this.createOrderType === 'Sales Order') {
                this.displaysalesRepName = false;
              }
              else {
                this.displaysalesRepName = true;
              }
            }

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
            if (data.obj.orderStatus === 'INVOICED' && data.obj.gatePassYN === 'Y') {
              // this.displayAfterGatePass = false;
              // this.isVisible = false;
              // this.displaypickTicketUpdate = true;
              // this.displaypickTicketInvoice = true;
              // this.PaymentButton = true;
              // this.displaycounterSaleOrderSave = false;
              this.CounterSaleOrderBookingForm.disable();
              // this.isVisible15=false;
              // this.isVisible16=false;
              this.isVisibleUpdate = false;
              this.isVisibleGenerateInvoice = false;
              this.isVisibleGenerateGatePass = false;
              this.isVisiblePayment = false;
              this.isVisibleViewInvoice = true;
              this.isVisibleViewReceipt = true;
              this.isVisibleViewGatePass = true;
              this.isVisiblePickTiPreview = false;
              this.CounterSaleOrderBookingForm.get('remarks').disable();
              for (let i = 0; data.obj.oeOrderLinesAllList.length; i++) {
                control.controls[i].get('flowStatusCode').disable();
              }
            }
            else if (data.obj.orderStatus === 'INVOICED' && data.obj.gatePassYN === 'N') {
              this.isVisibleUpdate = false;
              this.isVisibleGenerateInvoice = false;
              this.isVisibleGenerateGatePass = true;
              this.isVisiblePayment = true;
              this.isVisibleViewInvoice = true;
              this.isVisibleViewReceipt = true;
              this.isVisiblePickTiPreview = false;
              //  alert(data.obj.orderStatus +'---'+data.obj.gatePassYN )
              // this.displayAfterGatePass = true;
              // this.isVisible15=false;
              // this.isVisible16=false;
              // this.isVisible = true;
              // this.isVisibleGatePass=true;
              // this.displaypickTicketUpdate = true;
              // this.displaycounterSaleAllButtons = false;

              this.CounterSaleOrderBookingForm.get('boxQty').enable();
              this.CounterSaleOrderBookingForm.get('driverName').enable();
              this.CounterSaleOrderBookingForm.get('vehNo').enable();
              this.CounterSaleOrderBookingForm.get('remarks').disable();
              for (let i = 0; data.obj.oeOrderLinesAllList.length; i++) {
                control.controls[i].get('flowStatusCode').disable();
              }
            }
            else if (data.obj.orderStatus === 'CANCELLED' || data.obj.orderStatus === 'CLOSED') {
              this.displayAfterGatePass = false;
              // this.isVisible = false;
              this.displaypickTicketUpdate = true;
              this.displaypickTicketInvoice = true;
              this.PaymentButton = true;
              this.displaycounterSaleOrderSave = false;
              this.CounterSaleOrderBookingForm.disable();
              this.isVisible15 = false;
              this.isVisible16 = false;
              this.isDisabled15 = true;
              this.isDisabled16 = true;
              this.CounterSaleOrderBookingForm.get('remarks').disable();
              for (let i = 0; data.obj.oeOrderLinesAllList.length; i++) {
                control.controls[i].get('flowStatusCode').disable();
              }
            }
            else {
              this.displayAfterGatePass = true;
              this.isVisible = true;
              this.isVisible15 = true;
              this.isVisible16 = true;
            }
            if (data.obj.transactionTypeName === 'Accessories Sale - Cash' || data.obj.transactionTypeName === 'Spares Sale - Cash') {
              // this.paymentButton.nativeElement.hidden = true;
              //  alert(this.PaymentViewReceipt)
              this.PaymentViewReceipt = false;

            }
            else if (data.obj.transactionTypeName === 'Accessories Sale - Credit' || data.obj.transactionTypeName === 'Spares Sale - Credit') {
              //  alert('hi')
              this.PaymentButton = false;
              this.isDisabled = true;
              // alert(this.PaymentViewReceipt);
              this.PaymentViewReceipt = true;
            }
          }
          else {
            if (data.code) {
              alert(data.message);
            }
          }
        });
  }

  transeData(val) { }

  downloadPickTicket() {
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.orderManagementService.downloadCSPreINV(this.orderNumber)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      });
  }

  downloadCSINV() {
    var invoiceNumber = this.CounterSaleOrderBookingForm.get('trxNumber').value;
    const fileName = 'download.pdf';
    // const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (this.divisionId === 1) {
      this.orderManagementService.downloadCSINV(this.orderNumber)
        .subscribe(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          var printWindow = window.open(url, '', 'width=800,height=500');
          printWindow.open
          // saveAs(new Blob([data], { type: MIME_TYPES[EXT] }));
        });
    }
    else if (this.divisionId === 2) {
      this.orderManagementService.downloadBajajCSINV(invoiceNumber)
        .subscribe(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          var printWindow = window.open(url, '', 'width=800,height=500');
          printWindow.open
          // saveAs(new Blob([data], { type: MIME_TYPES[EXT] }));
        });
    }
  }


  pickTicketupdateFunction() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Order Update in progress....Do not refresh the Page';
    // var orderLines = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').getRawValue;
    var orderLines1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var orderLines = orderLines1.getRawValue();
    var exLines = this.lstgetOrderLineDetails.length;
    for (let k = 0; k < orderLines.length; k++) {
      alert(orderLines[k].orderedQty)
      if (orderLines[k].orderedQty === 0 || orderLines[k].orderedQty ==='0') {
        if (orderLines[k].flowStatusCode === 'BOOKED' && orderLines[k].disPer != 0 && orderLines[k].disAmt === 0 && (orderLines[k].baseAmt === 0 || orderLines[k].baseAmt === '0') && (orderLines[k].taxAmt === 0 || orderLines[k].taxAmt === '0') && (orderLines[k].totAmt === 0 || orderLines[k].totAmt === '0')) {
          alert('Discount Amount is wrong for Line No ' + (k + 1) + '   And Item No:- ' + orderLines[k].segment)
          this.dataDisplay = ('Discount Amount is wrong for Line No ' + (k + 1) + '   And Item No:- ' + orderLines[k].segment);
          this.isDisabled = false;
          return;
        }
        else if (orderLines[k].flowStatusCode === 'BOOKED' && (orderLines[k].baseAmt === 0 || orderLines[k].baseAmt === '0') && (orderLines[k].taxAmt === 0 || orderLines[k].taxAmt === '0') && (orderLines[k].totAmt === 0 || orderLines[k].totAmt === '0')) {
          alert('Discount Amount is wrong for Line No ' + (k + 1) + '   And Item No:- ' + orderLines[k].segment)
          this.dataDisplay = ('Discount Amount is wrong for Line No ' + (k + 1) + '   And Item No:- ' + orderLines[k].segment);
          this.isDisabled = false;
          return;
        }
      }
    }
    for (let i = exLines; i < orderLines.length; i++) {
      orderLines[i].taxCategoryName = orderLines[i].taxCategoryName.taxCategoryName;
      orderLines[i].frmLocatorId = orderLines[i].frmLocatorName;
    }
    let jsonData = this.CounterSaleOrderBookingForm.getRawValue();

    jsonData.orderedDate = this.pipe.transform(this.now, 'yyyy-MM-dd');
    jsonData.refCustNo = this.CounterSaleOrderBookingForm.get('refCustNo').value;
    jsonData.custPoNumber = this.CounterSaleOrderBookingForm.get('custPoNumber').value;
    jsonData.custPoDate = this.CounterSaleOrderBookingForm.get('custPoDate').value;
    jsonData.ouId = Number(sessionStorage.getItem('ouId'));
    let salesObj = Object.assign(new SalesOrderobj(), jsonData);
    salesObj.setoeOrderLinesAllList(orderLines);
    var taxStr = [];
    // debugger;
    for (let taxlinval of this.taxMap.values()) {
      for (let i = 0; i < taxlinval.length; i++) {
        taxStr.push(taxlinval[i]);
      }
    }
    salesObj.settaxAmounts(taxStr);
    this.orderManagementService.UpdateCounterSaleInv(JSON.stringify(salesObj)).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message + 'res.message');
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.OrderFind(this.orderNumber);
        this.isDisabled10 = false;
        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert(res.message + 'res.message');
          this.CounterSaleOrderBookingForm.reset();
          this.dataDisplay = ''
          this.closeResetButton = true;
        }
      }
    });
  }

  generateGatePass() {
    const formValue: IGatePass = this.CounterSaleOrderBookingForm.value;
    formValue.orderNumber = this.orderNumber;
    formValue.emplId = Number(sessionStorage.getItem('emplId'));
    // alert(formValue.orderNumber);
    // let formValue1=formValue.getRawValue();
    this.orderManagementService.genrateGatePass(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.CounterSaleOrderBookingForm.reset();
        this.OrderFind(res.obj.orderNumber);

        this.CounterSaleOrderBookingForm.disable();
      } else {
        if (res.code === 400) {
          alert(res.message);
          // this.CounterSaleOrderBookingForm.reset();
          // window.location.reload();
        }
      }
    });
  }



  gatePassViewFn() {
    var orderNumber = this.CounterSaleOrderBookingForm.get('orderNumber').value;
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.orderManagementService.viewGatePass(orderNumber)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }


  viewReceipt() {
    var orderNumber = this.CounterSaleOrderBookingForm.get('orderNumber').value;
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.orderManagementService.viewReceipt(orderNumber)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }

  onOptionsSelectedCustomerType(SelectCustType: any) {
    if (SelectCustType == 'New Customer') {
      this.newCustomerButton = true;
    }
    else {
      this.newCustomerButton = false;
      // (<any>this.CounterSaleOrderBookingForm.get('accountNo')).nativeElement.focus();
    }
  }



  close() {
    this.deleteReserve();
    this.location1.back();
  }

  refresh() {
    this.deleteReserve();
    window.location.reload();
  }

  onOptionsSelectedTL(createOrderType) {
    // alert(createOrderType);
    if (createOrderType === 'Pick Ticket' || createOrderType === 'Direct Invoice') {
      // Sales Order
      this.displaysalesRepName = true;
      this.CounterSaleOrderBookingForm.get('othRefNo').disable();
    }
    else {
      if (createOrderType === 'Sales Order') {
        this.displaysalesRepName = false;
        this.CounterSaleOrderBookingForm.get('othRefNo').enable();
      }
    }
  }



  onOptionsSelectedPriceListID(priceListName) {
    // alert(priceListName);
    let select = this.priceListNameList.find(d => d.priceListName === priceListName);
    // alert(select);
    this.priceListId = select.priceListHeaderId;
    // this.displayCSOrderAndLineDt = false;
  }



  public itemMap2 = new Map<number, any[]>();

  public itemMap3 = new Map<string, StockTransferRow>();

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


  onOptionsSelectedCategory(itemType: string, lnNo: number) {


  }



  searchFromArray1(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };

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
            console.log(this.custSiteList);

            this.CounterSaleOrderBookingForm.patchValue({ paymentType: select.lookupValue })

            this.custClassCode = this.selCustomer.classCodeType;
            for (let i = 0; i < this.custSiteList.length; i++) {
              // alert(this.custSiteList.length + '----' + this.custSiteList[i].ouId + '-----' + sessionStorage.getItem('ouId'));
              if (this.custSiteList.length === 1 && Number(this.custSiteList[i].ouId) === Number(sessionStorage.getItem('ouId'))) {
                this.CounterSaleOrderBookingForm.patchValue({ name: this.custSiteList[0].siteName });
                this.onOptionsSelectedcustSiteName(this.custSiteList[0].siteName);
              }
              if (this.custSiteList.length > 1) {
                if (Number(this.custSiteList[i].ouId) === Number(sessionStorage.getItem('ouId'))) {
                  this.CounterSaleOrderBookingForm.patchValue({ name: this.custSiteList[i].siteName });
                  //  this.onOptionsSelectedcustSiteName(this.custSiteList[i].siteName);
                }
              }
              else if (this.custSiteList[i].ouId != (sessionStorage.getItem('ouId'))) {
                alert('Please Create/Select Operating Unit wise Site to continue process!')
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
            // this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
            this.isDisabled3 = true;
            this.customerNameSearch.splice(0, this.customerNameSearch.length);
            console.log(this.customerNameSearch);
            // this.transactionTypeName = 'Spares Sale - Credit';
            // this.CounterSaleOrderBookingForm.patchValue({ createOrderType: 'Pick Ticket' });
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

  onOptionsSelecteddisPer() {
    var disPer1 = this.CounterSaleOrderBookingForm.get('disPer').value
    // alert(disPer1);
    // this.orderlineDetailsArray[0].controls.patchValue({ disPer: disPer1 })
    this.orderlineDetailsArray().controls[0].patchValue({ disPer: disPer1 });
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



  onOptionsSelectedcustSiteName(siteName) {
    // alert(siteName);
    // siteName= siteName.target.value;
    //  alert(sessionStorage.getItem('ouId'));
    let selSite = this.custSiteList.find(d => d.siteName === siteName);
    console.log(selSite);
    console.log(this.custSiteList);

    // alert(selSite.ouId +'-----' + sessionStorage.getItem('ouId'));

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
    this.transactionTypeName = 'Spares Sale - Credit';
    this.CounterSaleOrderBookingForm.patchValue({ createOrderType: 'Pick Ticket' });
  }


  othRefNoSearch(othRefNo) {
    // alert(othRefNo);
    this.orderManagementService.othRefNoSearchFn(othRefNo)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.othRefNoSearchFnData = data.obj;
            this.CounterSaleOrderBookingForm.patchValue(this.othRefNoSearchFnData);
            if (this.custAccountNo != this.othRefNoSearchFnData.custAccountNo1) {
              alert('Sales Order Customer & Counter Sale Order Customer Not Match');
              this.CounterSaleOrderBookingForm.get('othRefNo').reset()
              return;
            }
            else {
              this.othRefNo = data.obj.orderNumber1;
              this.salesRepName = data.obj.salesRepName1;
              this.tlName = data.obj.tlName1;
            }
          }
          else {
            if (data.code === 400) {
              alert(data.message)
            }
          }
        })

  }


  contactNoSearch(mobile1) {
    // alert(mobile1)
    this.orderManagementService.contactNoSearchFn(mobile1, this.ouId)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.contactNoSearchData = data.obj;
            console.log(this.contactNoSearchData);
            this.CounterSaleOrderBookingForm.patchValue(this.contactNoSearchData);

            this.custAddress = data.obj.billToAddress;
            this.custAccountNo = data.obj.accountNo;
          }
          else {
            if (data.code === 400) {
              alert(data.message);
              this.displaycreateCustomer = false;

            }
          }

        }
      );
  }

  get f() { return this.CounterSaleOrderBookingForm.controls }




  getGroupControllinewise(index, fieldName) {
    // alert('nam'+fieldName);
    return (<FormArray>this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList')).at(index).get(fieldName);

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


  validate(index: number, qty1) {
    // var trxLnArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var trxLnArr = trxLnArr1.getRawValue();

    var locator = trxLnArr[index].frmLocatorId;

    var Avalqty = trxLnArr[index].Avalqty;
    let uomCode = trxLnArr[index].uom;
    let unitSellingPrice = trxLnArr[index].unitSellingPrice;
    // if (this.orderNumber === undefined && Avalqty != null || Avalqty != undefined) {
    if (qty1 > Avalqty) {
      var bckOrd = qty1 - Avalqty;
      trxLnArr1.controls[index].patchValue({ orderedQty: bckOrd });
      trxLnArr1.controls[index].patchValue({ pricingQty: Avalqty });
    }
    var transactionTypeName = this.CounterSaleOrderBookingForm.get('transactionTypeName').value;
    var createOrderType = this.CounterSaleOrderBookingForm.get('createOrderType').value;
    // alert(locator)
    let selloc = this.locData[index].find(d => Number(d.ROWNUM) === Number(locator));
    console.log(this.locData[index]);

    // alert(selloc.segmentName +'--'+selloc.onHandQty);
    // alert(createOrderType+'---'+ transactionTypeName.includes('Credit')+'---'+Avalqty)
    if (createOrderType === 'Pick Ticket' && transactionTypeName.includes('Credit') && Avalqty === 0) {
      // alert(Avalqty);
      var bckOrd = qty1 - Avalqty;
      trxLnArr1.controls[index].patchValue({ orderedQty: bckOrd });
      trxLnArr1.controls[index].patchValue({ pricingQty: 0 });
      alert("Select Item not in Stock!!")
    }
    if (qty1 > selloc.onHandQty) {
      alert("Item available with multiple price , Please check price and available quantity!!")
      qty1 = selloc.onHandQty;
      //trxLnArr1.controls[index].patchValue({ orderedQty: bckOrd });
      trxLnArr1.controls[index].patchValue({ pricingQty: selloc.onHandQty });

    }


    if (this.orderNumber === undefined && Avalqty != null || Avalqty != undefined) {
      if (qty1 <= 0) {
        alert("Please enter quantity more than zero");
        trxLnArr1.controls[index].patchValue({ quantity: '' });
        this.setFocus('pricingQty');
        // (<any>trxLnArr[index].get('pricingQty')).nativeElement.focus();
        return false;
      }

      if (uomCode === 'NO') {
        // alert(Number.isInteger(qty1)+'Status');
        if (!(Number.isInteger(qty1))) {
          alert('Please enter correct No');
          trxLnArr1.controls[index].patchValue({ pricingQty: '' });
          return;
        }
      }
      if (unitSellingPrice <= 0) {
        // alert(qty1);
        alert("Please enter more than zero amount");
        trxLnArr1.controls[index].patchValue({ unitSellingPrice: '' });
        trxLnArr1.controls[index].patchValue({ baseAmt: '' });
        trxLnArr1.controls[index].patchValue({ taxAmt: '' });
        trxLnArr1.controls[index].patchValue({ totAmt: '' });
        (<any>trxLnArr[index].get('unitSellingPrice')).nativeElement.focus();
        return false;
      }
    }
  }

  onKey(index, fldName, event) {
    // alert (event.keyCode)
    if (event.keyCode != 13) {
      // alert(index +'Onkey Alert' +'---'+fldName)
      // var arrayControl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
      var arrayControlNew = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
      var arrayControl = arrayControlNew.getRawValue();
      var pricingQty = arrayControl[index].pricingQty;
      var Avalqty = arrayControl[index].Avalqty;
      // alert(pricingQty)
      if (pricingQty === null || pricingQty === undefined || pricingQty === '') {
        return;
      }
      if (pricingQty <= 0) {
        alert("Please enter quantity more than zero");
        return;
      }
      var isvalidqty = this.validate(index, pricingQty);

      if (isvalidqty == false) {
        return;
      }

      if (pricingQty > Avalqty) {
        var bckOrd = pricingQty - Avalqty;
        pricingQty = Avalqty;
      }

      console.log(index);
      var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
      console.log(arrayControl);
      var itemId = arrayControl[index].itemId;
      var taxcatName = arrayControl[index].taxCategoryName;
      // alert(taxcatName)
      console.log(taxcatName);
      let select;
      var taxCategoryId = arrayControl[index].taxCategoryId;
      // alert(taxCategoryId);
      if (taxCategoryId === null) {
        select = this.taxCategoryList[index].find(d => d.taxCategoryName === taxcatName.taxCategoryName);
        taxCategoryId = select.taxCategoryId;
        patch.controls[index].patchValue({ taxCategoryId: taxCategoryId });
        patch.controls[index].patchValue({ taxCategoryName: select });
      } else {
        patch.controls[index].patchValue({ taxCategoryId: taxCategoryId });
        patch.controls[index].patchValue({ taxCategoryName: taxcatName });
      }

      patch.controls[index].patchValue({ disAmt: 0 });
      var baseAmt = arrayControl[index].unitSellingPrice * pricingQty;

      var disAmt1 = arrayControl[index].disAmt;
      var disPer = arrayControl[index].disPer;
      if (disPer > 0) {
        disAmt1 = (disPer / 100) * baseAmt;
        (patch.controls[index]).patchValue({
          disAmt: (disPer / 100) * baseAmt,
        });
      }
      if (disAmt1 === null && disPer === null) {
        return;
      }
      if (disAmt1 === null) {
        disAmt1 = 0;
      }
      var invLineNo1 = index + 1;
      console.log(invLineNo1);
      var sum = 0;
      var lineTotAmt = 0;
      // alert(itemId+'---'+ taxCategoryId+'----'+disAmt1+'----'+baseAmt);
      this.service.taxCalforItem(itemId, taxCategoryId, disAmt1, baseAmt)
        .subscribe(
          (data: any[]) => {
            this.taxCalforItem = data;
            console.log(this.taxCalforItem);

            for (let i = 0; i < this.taxCalforItem.length; i++) {

              if (this.taxCalforItem[i].totTaxPer != 0) {
                sum = sum + this.taxCalforItem[i].totTaxAmt
              }
            }
            lineTotAmt = Math.round(((baseAmt + sum - disAmt1) + Number.EPSILON) * 100) / 100;
            (patch.controls[index]).patchValue({
              baseAmt: Math.round((baseAmt + Number.EPSILON) * 100) / 100,
              taxAmt: Math.round((sum + Number.EPSILON) * 100) / 100,
              totAmt: Math.round(((baseAmt + sum - disAmt1) + Number.EPSILON) * 100) / 100,
              disAmt: (disPer / 100) * baseAmt,
            });
            let controlinv1 = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
            let distAmtArray = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
            console.log(controlinv1);
            this.TaxDetailsArray().clear();
            for (let i = 0; i < data.length; i++) {
              var invLnGrp: FormGroup = this.TaxDetailsGroup();
              controlinv1.push(invLnGrp);
              (controlinv1.controls[i]).patchValue({
                invLineNo: index + 1,
              });
            }
            this.CounterSaleOrderBookingForm.get('taxAmounts').patchValue(data);
            var disValue = data[0].totTaxAmt;
            if (disValue > 0 && data[0].taxTypeName.includes('Discount')) {
              patch.controls[index].patchValue({ disAmt: data[0].totTaxAmt });
            }
            else {
              patch.controls[index].patchValue({ disAmt: 0 });
            }
            // let taxMapData = this.CounterSaleOrderBookingForm.get('taxAmounts').value;
            // this.taxMap.set(index, taxMapData);
            this.updateTotAmtPerline(index);
            let taxMapData = this.CounterSaleOrderBookingForm.get('taxAmounts').value;
            var ln: string = String(index);
            this.taxMap.set(ln, taxMapData);
            console.log(this.taxMap.get(ln));
          });

      var itemId1 = arrayControl[index].itemId;

      var item = arrayControl[index].segment;
      var pricingQty = arrayControl[index].pricingQty;
      var isNewLine: boolean = false;
      // alert(orderLines.length);
      for (let i = 0; i < arrayControl.length; i++) {
        // alert(arrayControl[i].itemId)
        if (arrayControl[i].itemId === null) {
          isNewLine = true;
        }
      }
      if (event.keyCode != 13) {
        if (itemId1 != null && fldName != "locator" && isNewLine === false) {
          this.addRow(index);
        }
      }
      else {
        this.displayRemoveRow.push(true);
      }
    }
    else {
      alert('Enter Key Not Allowed.!... Please Use Tab Key')
    }
  }




  onOptionsSelectedDescription(segment: string, k) {
    if (segment != undefined && segment != "") {
      this.displayorderHedaerDetails = false;
      if (this.op != 'Search') {
        let selPayTerm = this.payTermDescList.find(d => d.lookupValueId === this.selCustomer.termId);
        this.paymentType = selPayTerm.lookupValue;
      }
      var orderedDate = this.pipe.transform(this.now, 'dd-MM-yyyy');
      this.CounterSaleOrderBookingForm.patchValue({ orderedDate: orderedDate });
      if (this.CounterSaleOrderBookingForm.get('createOrderType').value === 'Sales Order' && this.CounterSaleOrderBookingForm.get('othRefNo').value === undefined) {
        alert('Please Enter Reference Number First !');
        this.CounterSaleOrderBookingForm.get('othRefNo').enable();
        // this.orderlineDetailsArray().get('segment').disable();
        // (<any>this.CounterSaleOrderBookingForm.get('othRefNo')).nativeElement.focus();
      }
      else {
        //let select = this.invItemList1.find(d => d.segment === segment);
        let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
        var itemType = (controlinv.controls[k]).get('invType').value;
        // alert(itemType)
        // debugger;
        let select = (this.itemMap2.get(k)).find(d => d.segment === segment);
        //this.CounterSaleOrderBookingForm.patchValue({ itemId: select.itemId })
        if (segment != undefined) {
          this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
          this.CounterSaleOrderBookingForm.get('name').disable();
          this.CounterSaleOrderBookingForm.get('custName').disable();
          this.CounterSaleOrderBookingForm.get('mobile1').disable();
          this.CounterSaleOrderBookingForm.get('refCustNo').disable();
          this.CounterSaleOrderBookingForm.get('custPoDate').disable();
          this.CounterSaleOrderBookingForm.get('custPoNumber').disable();
          this.itemId = select.itemId;
          var custtaxCategoryName = this.CounterSaleOrderBookingForm.get('taxCategoryName').value;
          let isExportCust = "N";
          // alert(this.custClassCode);
          if (this.custClassCode.includes("EXPORTER") && Number(sessionStorage.getItem('ouId')) === 22) {
            isExportCust = "Y";
          }
          var priceListId = this.CounterSaleOrderBookingForm.get('priceListId').value;
          console.log(priceListId);
          if (custtaxCategoryName === 'Sales-IGST') {
            // alert(custtaxCategoryName);
            this.orderManagementService.addonDescList2(segment, custtaxCategoryName, priceListId, isExportCust)
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
                          // unitSellingPrice: data.obj[0].priceValue,by vinita
                        });
                        this.orderManagementService.getTaxCategoriesForSales(custtaxCategoryName, data.obj[i].taxPercentage)
                          .subscribe(
                            data1 => {
                              this.taxCategoryList[k] = data1;
                              console.log(this.taxCategoryList[k]);
                              console.log(data.obj[i].taxCategoryName);
                              this.allTaxCategoryList[k] = data1;
                              let itemCateNameList = this.taxCategoryList[k].find(d => d.taxCategoryName === data.obj[i].taxCategoryName);
                              console.log(itemCateNameList);

                              (controlinv.controls[k]).patchValue({
                                taxCategoryId: itemCateNameList.taxCategoryId,
                                taxCategoryName: itemCateNameList,
                              })
                            }
                          );
                      }
                    }
                    if (select.itemId != null) {
                      // this.getLocatorDetails(k, select.itemId);
                      let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
                      var invTp = controlinv.controls[k].get('invType').value;
                      // this.service.getfrmSubLoc(this.locId, select.itemId, this.subInventoryId).subscribe(
                      this.service.getfrmSubLocPrice(this.locId, select.itemId, this.subInventoryId).subscribe(
                        data => {
                          console.log(data);
                          if (data.length === 0) {
                            // alert('1')
                            alert('Item Not Found In Stock!.');
                            var lotList = [{ locatorId: 0, segmentName: 'Not Found' }]
                            controlinv.controls[k].patchValue({ frmLocatorId: lotList });
                            controlinv.controls[k].patchValue({ onHandQty: 0 });
                            controlinv.controls[k].get('frmLocatorId').disable()
                            return;
                          } else {
                            this.getfrmSubLoc = data;
                            console.log(this.getfrmSubLoc);
                            this.locData[k] = data;
                            var selLocator = this.locData[k];
                            controlinv.controls[k].get('frmLocatorId').enable();
                            if (this.getfrmSubLoc.length == 1) {
                              controlinv.controls[k].patchValue({ onHandId: selLocator[0].segmentName });
                              controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].ROWNUM });
                              controlinv.controls[k].patchValue({ frmLocator: selLocator[0].segmentName });
                              controlinv.controls[k].patchValue({ onHandQty: selLocator[0].onHandQty });
                              controlinv.controls[k].patchValue({ id: selLocator[0].id });
                              controlinv.controls[k].patchValue({ unitSellingPrice: selLocator[0].prc });
                            }
                            else {
                              // alert('2');
                              // alert(selLocator[0].segmentName);
                              alert('Please check Item has old stock with price');
                              controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].ROWNUM });
                              controlinv.controls[k].patchValue({ frmLocator: selLocator[0].segmentName });
                              // controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].locatorId });
                              controlinv.controls[k].patchValue({ onHandQty: selLocator[0].onHandQty })
                              controlinv.controls[k].patchValue({ id: selLocator[0].id });
                              controlinv.controls[k].patchValue({ unitSellingPrice: selLocator[0].prc });
                            }
                            // this.service.getreserqty(this.locId, select.itemId).subscribe
                            //   (data => {
                            //     this.resrveqty = data;
                            //     controlinv.controls[k].patchValue({ resveQty: this.resrveqty });
                            //     this.AvailQty(k, select.itemId,'Item');
                            //     this.setFocus('pricingQty');
                            //   });
                            this.service.getreserqtyNew(this.locId, select.itemId, selLocator[0].locatorId, selLocator[0].prc).subscribe
                              (data => {
                                this.resrveqty = data;
                                controlinv.controls[k].patchValue({ resveQty: this.resrveqty });
                                this.AvailQty(k, select.itemId, 'Item');
                                this.setFocus('pricingQty' + k);
                              });
                          }
                        });
                    }
                  }
                  else if (data.code === 400) {
                    alert(data.message)
                  }
                })
              ;
          }
          else {
            this.orderManagementService.addonDescList2(segment, custtaxCategoryName, priceListId, isExportCust)
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
                          // unitSellingPrice: data.obj[0].priceValue,by vinita
                        });

                        this.orderManagementService.getTaxCategoriesForSales(custtaxCategoryName, data.obj[i].taxPercentage)
                          .subscribe(
                            data1 => {
                              this.taxCategoryList[k] = data1;
                              this.allTaxCategoryList[k] = data1;
                              let itemCateNameList = this.taxCategoryList[k].find(d => d.taxCategoryName === data.obj[i].taxCategoryName);
                              (controlinv.controls[k]).patchValue({
                                taxCategoryId: itemCateNameList.taxCategoryId,
                                taxCategoryName: itemCateNameList,
                              })
                            }
                          );

                        if (this.CounterSaleOrderBookingForm.get('issueCodeType').value.includes('Only Oil Part') && data.obj[i].uom === 'LTR' && Number(sessionStorage.getItem('divisionId')) === 2) {
                          (controlinv.controls[k]).patchValue({
                            disPer: 0,
                            disAmt: 0
                          })
                        }
                      }
                    }
                    if (select.itemId != null) {
                      // this.getLocatorDetails(k, select.itemId);
                      let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
                      var invTp = controlinv.controls[k].get('invType').value;
                      // this.service.getfrmSubLoc(this.locId, select.itemId, this.subInventoryId).subscribe(
                      this.service.getfrmSubLocPrice(this.locId, select.itemId, this.subInventoryId).subscribe(
                        data => {
                          console.log(data);
                          if (data.length === 0) {
                            // alert('1')
                            alert('Item Not Found In Stock!.');
                            var lotList = [{ locatorId: 0, segmentName: 'Not Found' }]
                            controlinv.controls[k].patchValue({ frmLocatorId: lotList });
                            controlinv.controls[k].patchValue({ onHandQty: 0 });
                            controlinv.controls[k].get('frmLocatorId').disable();
                            var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
                            controlinv.controls[k].patchValue({ Avalqty: '' });
                            controlinv.controls[k].patchValue({ pricingQty: '' });
                            controlinv.controls[k].patchValue({ orderedItem: '' });
                            controlinv.controls[k].patchValue({ orderedItem: '' });
                            controlinv.controls[k].patchValue({ unitSellingPrice: '' });
                            controlinv.controls[k].patchValue({ taxCategoryName: '' });
                            controlinv.controls[k].patchValue({ hsnSacCode: '' });
                            this.setFocus('itemSeg' + k);
                            return;
                          } else {
                            this.getfrmSubLoc = data;
                            console.log(this.getfrmSubLoc);
                            this.locData[k] = data;
                            var selLocator = this.locData[k];
                            console.log(this.locData[k]);
                            // alert(selLocator[0].id );
                            controlinv.controls[k].get('frmLocatorId').enable();
                            if (this.getfrmSubLoc.length == 1) {

                              controlinv.controls[k].patchValue({ onHandId: selLocator[0].segmentName });
                              controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].ROWNUM });
                              controlinv.controls[k].patchValue({ frmLocator: selLocator[0].segmentName });
                              controlinv.controls[k].patchValue({ onHandQty: selLocator[0].onHandQty });
                              controlinv.controls[k].patchValue({ id: selLocator[0].id });
                              controlinv.controls[k].patchValue({ unitSellingPrice: selLocator[0].prc });
                            }
                            else {
                              // alert(selLocator[0].segmentName);
                              alert('Please check Item has old stock with price');
                              controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].ROWNUM });
                              controlinv.controls[k].patchValue({ frmLocator: selLocator[0].segmentName });
                              // controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].locatorId });
                              controlinv.controls[k].patchValue({ onHandQty: selLocator[0].onHandQty })
                              controlinv.controls[k].patchValue({ id: selLocator[0].id });
                              controlinv.controls[k].patchValue({ unitSellingPrice: selLocator[0].prc });
                            }


                            this.service.getreserqtyNew(this.locId, select.itemId, selLocator[0].locatorId, selLocator[0].prc).subscribe
                              (data => {
                                this.resrveqty = data;
                                controlinv.controls[k].patchValue({ resveQty: this.resrveqty });
                                this.AvailQty(k, select.itemId, 'Item');
                                this.setFocus('pricingQty' + k);
                              });
                          }
                        });
                    }

                  }
                  else if (data.code === 400) {
                    alert(data.message);
                  }
                }

              );
          }
        }
      }


    }
  }


  onSelLocaPrice(event: Number, i) {
    // debugger;
    console.log(event);
    // alert(event);
    console.log(this.locData);
    var linLocData = this.locData[i];
    let selloc = linLocData.find(d => Number(d.ROWNUM) === Number(event));
    // if(selloc.length > 1){

    // }
    console.log(selloc);
    var trxLnArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;

    // let selPrice=event.prc;
    if (trxLnArr[i].frmLocatorId != '') {
      if (trxLnArr[i].pricingQty != undefined) {
        if (trxLnArr[i].pricingQty > selloc.onHandQty) {
          // alert('if');
          trxLnArr1.controls[i].patchValue({ pricingQty: selloc.onHandQty });
        }
      }
      trxLnArr1.controls[i].patchValue({ unitSellingPrice: selloc.prc });
      trxLnArr1.controls[i].patchValue({ frmLocatorName: selloc.locatorId });
      this.resverQty(i, trxLnArr[i].itemId, selloc.locatorId, selloc.prc);
      // this.AvailQty(i,trxLnArr[i].itemId,'locator');
    }
    var fldName = "locator";
    this.onKey(i, fldName, event);
  }


  resverQty(i, itemId, locatorId, prc) {
    // alert(i+'----' + itemId +'----'+locatorId+'----'+prc)
    let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    this.service.getreserqtyNew(this.locId, itemId, locatorId, prc).subscribe
      (data => {
        this.resrveqty = data;
        controlinv.controls[i].patchValue({ resveQty: this.resrveqty });
        this.AvailQty(i, itemId, 'locator');
        this.setFocus('pricingQty' + i);
      });
  }

  AvailQty(i, itemId, calledFrom) {
    var trxLnArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var trxLnFormArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    if (itemId === undefined) {
      itemId = trxLnArr[i].itemId;
    }
    var locId;
    if (calledFrom === 'Item') {
      var linLocData = this.locData[i];
      let sellocId = linLocData.find(d => Number(d.ROWNUM) === trxLnArr[i].frmLocatorId);
      locId = sellocId.locatorId;
      (trxLnFormArr.controls[i]).patchValue({
        frmLocatorName: locId,
      });
    }
    if (calledFrom === 'locator') {
      locId = trxLnArr[i].frmLocatorName;
      trxLnArr[i].frmLocatorId = trxLnArr[i].frmLocatorName;
      // (trxLnFormArr.controls[i]).patchValue({
      //   frmLocatorId: locId,
      // });
    }
    // var locId = trxLnArr[i].frmLocatorId;
    // var locId=trxLnArr[i].frmLocatorName;
    var onhandid = trxLnArr[i].id;
    if (locId != null) {
      this.service.getonhandqty(Number(sessionStorage.getItem('locId')), this.subInventoryId, locId, itemId).subscribe
        (data => {
          this.onhand1 = data.obj;
          console.log(this.onhand1);
          var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
          trxLnArr1.controls[i].patchValue({ onHandQty: data.obj });
          // var trxLnArr=this.moveOrderForm.get('trxLinesList').value;
          let onHand = data.obj;
          // alert(onHand+'ONHAND');
          let reserve = trxLnArr[i].resveQty;
          // alert(reserve+'Reserve');
          // alert(onHand+'OnHand');
          // alert(reserve+'reserve');
          let avlqty1 = 0;
          avlqty1 = onHand - reserve;
          var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
          trxLnArr1.controls[i].patchValue({ Avalqty: avlqty1 });
          // alert(avlqty1);
          if (avlqty1 < 0) {
            // alert(avlqty1);
            trxLnArr1.controls[i].patchValue({ Avalqty: 0 });
          }
          this.setFocus('pricingQty' + i);

        })
    }
    else {
      alert('Locator Not Found!.');
      var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
      trxLnArr1.controls[i].patchValue({ Avalqty: '' });
      trxLnArr1.controls[i].patchValue({ pricingQty: '' });
      trxLnArr1.controls[i].patchValue({ orderedItem: '' });
      trxLnArr1.controls[i].patchValue({ orderedItem: '' });
      trxLnArr1.controls[i].patchValue({ unitSellingPrice: '' });
      trxLnArr1.controls[i].patchValue({ taxCategoryName: '' });
      this.setFocus('itemSeg' + i);
    }
  }


  onOptionTaxCatSelected(taxCategoryName, i) {
    this.indexVal = i;
    var arrayControl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;

    var amount = arrayControl[i].unitSellingPrice;

    let select = this.taxCategoryList[i].find(d => d.taxCategoryName === taxCategoryName);

    this.taxCategoryId = select.taxCategoryId;
    console.log(this.taxCategoryId);

    let controlinv = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
    var diss = 0;
    if (this.baseAmt != undefined) {
      this.service.taxCalforItem(this.itemId, this.taxCategoryId, diss, this.baseAmt)
        .subscribe(
          (data: any[]) => {
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
  }






  transData(val) {
    return val;
  }


  pickTicketInvoiceFunction() {
    //this.tcsCalculationAdd();

    this.closeResetButton = false;
    this.progress = 0;

    // var formLinVal = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    // var formLinArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;

    var tcsPer = this.CounterSaleOrderBookingForm.get('tcsPer').value;
    var ordTotAmt = this.CounterSaleOrderBookingForm.get('totAmt').value;
    var tcsCal = Math.round((ordTotAmt * tcsPer / 100 + Number.EPSILON) * 100) / 100;
    this.CounterSaleOrderBookingForm.patchValue({ 'tcsAmt': tcsCal });
    if (tcsCal > 0) {
      alert('Added TCS-->' + tcsCal);

    }
    this.dataDisplay = 'Invoice Genration in progress....Do not refresh the Page';
    // this.isDisabled10 = true;
    const formValue: ISalesBookingForm = this.transData(this.CounterSaleOrderBookingForm.value);
    var orderLines = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    formValue.ouId = Number(sessionStorage.getItem('ouId'));
    formValue.emplId = Number(sessionStorage.getItem('emplId'));
    formValue.divisionId = Number(sessionStorage.getItem('divisionId'));
    // debugger;
    this.orderManagementService.pickTicketInvoiceFun(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.InvoiceNumber = res.obj;
        console.log(this.orderNumber);
        alert(res.message);
        this.OrderFind(this.orderNumber);
        this.CounterSaleOrderBookingForm.disable();
        // this.orderNumber = res.obj;
        // this.orderNumber=this.CounterSaleOrderBookingForm.get('orderNumber').value;
        // console.log(this.orderNumber);
        // this.OrderFind(this.orderNumber);
      } else {
        if (res.code === 400) {
          alert(res.message + ' ' + res.obj);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled10 = false;
          // this.SalesOrderBookingForm.reset();
        }
      }
    });
  }

  discountTaxValidation(k) {
    var orderLines1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var orderLines = orderLines1.getRawValue();
    // for (let k=0; k < orderLines.length; k++){
    alert(orderLines[k].disPer + '-discAmt ' + orderLines[k].disAmt + '---baseAmt ' + orderLines[k].baseAmt + '---taxAmt ' + orderLines[k].taxAmt + '-- totAmt ' + orderLines[k].totAmt)
    if (orderLines[k].disPer != 0 && orderLines[k].disAmt === 0 && (orderLines[k].baseAmt === 0 || orderLines[k].baseAmt === '0') && (orderLines[k].taxAmt === 0 || orderLines[k].taxAmt === '0') && (orderLines[k].totAmt === 0 || orderLines[k].totAmt === '0')) {
      alert('hhiii')
      alert('Discount Amount is wrong for Line No ' + k + '   And Item No:- ' + orderLines[k].segment)
      this.dataDisplay = ('Discount Amount is wrong for Line No ' + k + '   And Item No:- ' + orderLines[k].segment);
      this.isDisabled = false;
      return;
    }
    // }
  }


  counterSaleOrderSave() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Order Save in progress....Do not refresh the Page';
    this.isDisabled = true;
    var orderLines1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var orderLines = orderLines1.getRawValue();
    for (let j = 0; j < orderLines.length; j++) {
      if (orderLines[j].segment === '' && orderLines[j].taxCategoryName === '' && orderLines[j].pricingQty === '') {
        alert('First Select Line Details..!');
        this.closeResetButton = true;
        this.dataDisplay = ''
        this.isDisabled = false;
        return;
      }
      if (orderLines[j].unitSellingPrice === '') {
        alert('Line No' + j + 'Amount is Zero please confirm')
      }
      if (orderLines[j].pricingQty === 0 && orderLines[j].orderedQty === 0) {
        alert('Line No' + ' ' + j + 1 + ' ' + 'Quantity is Zero please confirm');
        this.closeResetButton = true;
        this.dataDisplay = ''
        this.isDisabled = false;
        return;
      }
      if (orderLines[j].segment.length > 8) {
        alert('Line No' + ' ' + orderLines[j].segment + ' ' + 'Select Item Is Wrong... Please confirm');
        this.closeResetButton = true;
        this.dataDisplay = ''
        this.isDisabled = false;
        return;
      }
      // this.discountTaxValidation(j);
    }

    for (let i = 0; i < orderLines.length; i++) {
      orderLines[i].taxCategoryName = orderLines[i].taxCategoryName.taxCategoryName;
      orderLines[i].frmLocatorId = orderLines[i].frmLocatorName;
    }

    for (let k = 0; k < orderLines.length; k++) {
       if (orderLines[k].orderedQty === 0 || orderLines[k].orderedQty ==='0') {
        if (orderLines[k].disPer != 0 && orderLines[k].disAmt === 0 && (orderLines[k].baseAmt === 0 || orderLines[k].baseAmt === '0') && (orderLines[k].taxAmt === 0 || orderLines[k].taxAmt === '0') && (orderLines[k].totAmt === 0 || orderLines[k].totAmt === '0')) {
          alert('Discount Amount is wrong for Line No ' + (k + 1) + '   And Item No:- ' + orderLines[k].segment)
          this.dataDisplay = ('Discount Amount is wrong for Line No ' + (k + 1) + '   And Item No:- ' + orderLines[k].segment);
          this.isDisabled = false;
          return;
        }
        else if ((orderLines[k].baseAmt === 0 || orderLines[k].baseAmt === '0') && (orderLines[k].taxAmt === 0 || orderLines[k].taxAmt === '0') && (orderLines[k].totAmt === 0 || orderLines[k].totAmt === '0')) {
          alert('Discount Amount is wrong for Line No ' + (k + 1) + '   And Item No:- ' + orderLines[k].segment)
          this.dataDisplay = ('Discount Amount is wrong for Line No ' + (k + 1) + '   And Item No:- ' + orderLines[k].segment);
          this.isDisabled = false;
          return;
        }
       }
    }
    if (this.createOrderType === 'Sales Order' && this.othRefNo === undefined) {
      alert('Please enter Sales Order Reference number...!');
      return;
    }

    let jsonData = this.CounterSaleOrderBookingForm.getRawValue();
    var custPoDate = this.CounterSaleOrderBookingForm.get('custPoDate').value;
    jsonData.orderedDate = this.pipe.transform(this.now, 'yyyy-MM-dd');
    jsonData.refCustNo = this.CounterSaleOrderBookingForm.get('refCustNo').value;
    jsonData.custPoNumber = this.CounterSaleOrderBookingForm.get('custPoNumber').value;
    jsonData.custPoDate = this.pipe.transform(custPoDate, 'yyyy-MM-dd');
    jsonData.ouId = Number(sessionStorage.getItem('ouId'));
    let salesObj = Object.assign(new SalesOrderobj(), jsonData);
    salesObj.setoeOrderLinesAllList(orderLines);
    var taxStr = [];
    for (let taxlinval of this.taxMap.values()) {
      for (let i = 0; i < taxlinval.length; i++) {
        taxStr.push(taxlinval[i]);
      }
    }
    salesObj.settaxAmounts(taxStr);
    this.orderManagementService.SaveCounterSaleOrder(JSON.stringify(salesObj)).subscribe((res: any) => {
      if (res.code === 200) {
        this.orderNumber = res.obj;
        // alert(this.isDisabled)
        this.isDisabled = true;
        this.dataDisplay = ''
        this.closeResetButton = true;
        console.log(this.orderNumber);
        alert(res.message);
        this.orderNumber = res.obj;
        console.log(this.orderNumber);
        this.OrderFind(this.orderNumber);
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.closeResetButton = true;
          this.dataDisplay = ''
          this.isDisabled = false;
        }
      }
    });
  }

  addRow(i) {
    var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    if (this.op == 'Search') {
      i = trxLnArr1.length;
      this.isDisabled10 = true;
    }
    if (i > -1) {
      var len1 = i;
      if (trxLnArr1[len1] != undefined) {
        // this.isDisabled10=false;
        console.log(trxLnArr1[len1].pricingQty);
        var itemqty = trxLnArr1[len1].pricingQty;
        var item = trxLnArr1[len1].segment;
        var itemid = trxLnArr1[len1].itemId;
        // debugger;
        if (item === '' || itemqty === '') {
          alert('Please enter data in blank field');
          return;
        }
        if (!this.itemMap3.has(item)) {
          this.reservePos(i);
        }
        else {
          // debugger;
          // this.deleteReserveLinewise(i,itemid);COMMENT BY VINITA
          this.reservePos(i);
        }
        this.displayRemoveRow.push(true);
        this.displayCounterSaleLine.push(true);
        this.displayLineflowStatusCode.push(true);
      }
    }
    var disPer = this.CounterSaleOrderBookingForm.get('disPer').value;


    this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
    var len = this.orderlineDetailsArray().length;
    var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    // var currentLn = patch.controls[i].get('lineNumber').value;
    // alert(currentLn);
    var refId = uuidv4();
    (patch.controls[len - 1]).patchValue(
      {
        lineNumber: len,
        flowStatusCode: 'BOOKED',
        disPer: disPer,
        invType: 'SS_SPARES',
        uuidRef: refId
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
    this.taxCategoryList = this.allTaxCategoryList;
    this.itemSeg = '';
    var ln = len - 1;
    this.setFocus('itemSeg' + ln);
  }



  enterKeyLock(event, i) {
    alert(event.key)
    console.log(event);
    if (event.keyCode === 9) {
      alert('hi')
      var fldName = 'prc';
      this.onKey(i, fldName, event)
    }
    else if (event.keyCode === 13) {
      alert('Enter Not Allowed.!');
      this.setFocus('pricingQty' + i);
      return;
    }

  }

  updateTotAmtPerline(lineIndex) {
    var formArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var formVal = formArr.getRawValue();
    var tcsPer = this.CounterSaleOrderBookingForm.get('tcsPer').value;
    var basicAmt = 0;
    var taxAmt1 = 0;
    var totAmt = 0;
    var disAmt = 0;
    var tcsAmt1 = 0;
    for (let i = 0; i < formVal.length; i++) {
      if (formVal[i].flowStatusCode === 'BOOKED' || formVal[i].flowStatusCode === 'INVOICED') {
        if (formVal[i].baseAmt == undefined || formVal[i].baseAmt == null || formVal[i].baseAmt == '') {

        } else {
          basicAmt = basicAmt + Number(formVal[i].baseAmt);
        }

        if (formVal[i].disAmt == undefined || formVal[i].disAmt == null || formVal[i].disAmt == '') {

        } else {
          disAmt = disAmt + Number(formVal[i].disAmt);
        }

        if (formVal[i].taxAmt == undefined || formVal[i].taxAmt == null || formVal[i].taxAmt == '') {

        } else {
          taxAmt1 = taxAmt1 + Number(formVal[i].taxAmt);
        }
        if (formVal[i].totAmt == undefined || formVal[i].totAmt == null || formVal[i].totAmt == '') {

        } else {
          totAmt = totAmt + Number(formVal[i].totAmt);
          tcsAmt1 = Math.round((totAmt * tcsPer / 100 + Number.EPSILON) * 100) / 100;
          //totAmt = totAmt + tcsAmt1;
        }

      }
      console.log(formArr);
      var ln = i
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
    // alert(crdAmt)
    if (crdAmt != undefined && crdAmt != null && crdAmt != '') {
      if (totAmt >= crdAmt) {
        alert('Credit Amount is exceeded.! ... Credit Amount is' + ' ' + crdAmt + ' ' + 'Total Amount is' + ' ' + totAmt + '.!');
        this.setFocus('itemSeg' + lineIndex);
        // this.isDisabled10 = true;
        return;
      }
      // else {
      //   this.isDisabled10 = false;
      // }
    }
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
    if (itemid != null || itemid != undefined) {
      this.deleteReserveLinewise(OrderLineIndex, itemid1, uuidref);
      this.itemMap3.delete(itemid);

    }
    var formVal = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var formArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;

    var basicAmt = 0;
    var taxAmt1 = 0;
    var totAmt = 0;
    var disAmt = 0;
    var tcsAmt1 = 0;
    //alert(formVal.length)
    // debugger;
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
    var taxArrVal = this.CounterSaleOrderBookingForm.get('taxAmounts').value;
    var taxArrValpatch = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
    // alert(i+'----'+ trxArrVal[i].flowStatusCode);
    if (trxArrVal[i].flowStatusCode === 'CANCELLED') {
      trxArr.controls[i].patchValue({ 'baseAmt': 0, 'disAmt': 0, 'taxAmt': 0, 'totAmt': 0 });
      for (let j = 0; j < taxArrVal.length; j++) {
        // alert(taxArrVal[j].invLineNo +'-----' + (i+1))
        if (taxArrVal[j].invLineNo === (i + 1)) {
          // alert('in If')
          taxArrVal[j].totTaxAmt = 0;
          taxArrValpatch.controls[i].patchValue({ 'totTaxAmt': 0 });
        }
      }
    }
    this.updateTotAmtPerline(i)
    this.deleteReserveLinewise(i, trxArrVal[i].itemid, trxArrVal[i].uuidRef);

  }


  addDiscount(i) {
    var invLine = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var arrayControltaxAmounts = this.CounterSaleOrderBookingForm.get('taxAmounts').value;
    // const invItemId = arrayControltaxAmounts[0].taxItemId
    // const lineNo = arrayControltaxAmounts[0].invLineNo
    var invLineNo = invLine[i].lineNumber;
    var taxCategoryId = invLine[i].taxCategoryId;
    var disAmt1 = arrayControltaxAmounts[0].totTaxAmt;
    var baseAmt1 = invLine[i].baseAmt;
    var itemId = invLine[i].itemId;
    this.activeLineNo = invLineNo;
    var patch = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
    // control.clear();
    this.service.taxCalforItem(itemId, taxCategoryId, disAmt1, baseAmt1)
      .subscribe(
        (data: any[]) => {
          this.taxCalforItem = data;
          var sum = 0;
          for (i = 0; i < this.taxCalforItem.length; i++) {
            if (this.taxCalforItem[i].totTaxPer != 0) {
              sum = sum + this.taxCalforItem[i].totTaxAmt
            }
            (patch.controls[i]).patchValue(
              {
                amount: this.taxCalforItem[i].totTaxAmt,
                invLineNo: invLineNo
              }
            );
          }
          this.TaxDetailsArray().clear()
          for (let i = 0; i < this.taxCalforItem.length; i++) {
            var invLnGrp: FormGroup = this.TaxDetailsGroup();
            this.TaxDetailsArray().push(invLnGrp);
            this.CounterSaleOrderBookingForm.get('taxAmounts').patchValue(this.taxCalforItem);
          }
          this.patchResultList(this.poLineTax, this.taxCalforItem);
          var arrayupdateTaxLine = this.CounterSaleOrderBookingForm.get('taxAmounts').value;
          this.taxMap.set(i, arrayupdateTaxLine);
        });
  }


  validateNum(index, j) {
    var arrayControl = this.CounterSaleOrderBookingForm.get('taxAmounts').value
    // this.TaxDetailsArray().controls[index].get('taxAmounts').value;
    // this.poMasterDtoForm.get('poLines').value
    var value = arrayControl[index].totTaxAmt
    if (value.charAt(0) === '-') {
      alert('Valid Number: ' + value);
    } else {
      alert('Invalid Number: ' + value + ' ' + 'Kindly enter negetive value');
    }
  }



  taxDetails(op, i, taxCategoryId) {
    // alert(i);
    this.TaxDetailsArray().clear();
    this.TaxDetailsArray().disable();
    // let controlinv1 = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
    // debugger;
    var taxItems1: any[] = this.CounterSaleOrderBookingForm.get('taxAmounts').value;
    if (op === 'Search') {
      // alert(op);
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
          // alert(x.invLineNo);
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
            invLineNo: k,
          })

          );
        }
      });
    }
    else {
      // alert('Hi');
      this.poLineTax = i;
      var invLine = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
      var arrayControltaxAmounts = this.CounterSaleOrderBookingForm.get('taxAmounts').value;
      var taxCategoryId = invLine[i].taxCategoryId;
      var disAmt1 = invLine[i].disAmt;
      var baseAmt1 = invLine[i].baseAmt;
      var itemId = invLine[i].itemId;
      this.service.taxCalforItem(itemId, taxCategoryId, disAmt1, baseAmt1)
        .subscribe(
          (data: any[]) => {
            this.taxCalforItem = data;
            var sum = 0;
            for (i = 0; i < this.taxCalforItem.length; i++) {
              if (this.taxCalforItem[i].totTaxPer != 0) {
                sum = sum + this.taxCalforItem[i].totTaxAmt
              }
            }
            for (let i = 0; i < this.taxCalforItem.length; i++) {
              var invLnGrp: FormGroup = this.TaxDetailsGroup();
              this.TaxDetailsArray().push(invLnGrp);
              this.CounterSaleOrderBookingForm.get('taxAmounts').patchValue(this.taxCalforItem);
            }
            var arrayupdateTaxLine = this.CounterSaleOrderBookingForm.get('taxAmounts').value;
            this.taxMap.set(i, arrayupdateTaxLine);
          });
      let linkId = "line" + i;
      // alert(linkId);
      document.getElementById(linkId).classList.remove("active");
      document.getElementById("lineTab").classList.remove("active");
      document.getElementById("taxTab").classList.add("active");
    }
    let linkId = "line" + i;
    // alert(linkId);
    document.getElementById(linkId).classList.remove("active");
    document.getElementById("lineTab").classList.remove("active");
    document.getElementById("taxTab").classList.add("active");
  }


  patchResultList(i, taxCalforItem) {
    // alert('Tax Cal For Item')
    this.TaxDetailsArray().clear();
    let control = this.TaxDetailsArray().controls[i].get('taxAmounts') as FormArray
    // control.clear();
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
        invLineNo: i + 1,
      }));
    });
    console.log(control);
  }


  // Customer form Function /////////////
  onOptioncustTypeSelected(event: any) {
    this.PersonType = this.CounterSaleOrderBookingForm.get('custType').value;
    // alert(this.StatusPickUp);
    if (this.custType === 'Person') {
      this.displayPerson = true;
      this.displayOrgnization = false;
    } if (this.custType === 'Orgnization') {
      this.displayOrgnization = true;
      this.displayPerson = false;
    }
  }

  onKey1(event: any) {
    const aaa = this.title + '. ' + this.fName + ' ' + this.mName + ' ' + this.lName;
    var person = this.CounterSaleOrderBookingForm.get('custType').value;
    // alert(person);
    if (person === 'Person') {
      this.custName = aaa;
    }

  }
  mergeCustName(fName, mName, lName) {
    const aaa = fName + ' ' + mName + ' ' + lName;
    this.custName = aaa;
  }



  onOptionsSelectedCity(city: any) {
    // alert(city);
    if (city != null) {
      this.service.cityList1(city)
        .subscribe(
          data => {
            this.cityList1 = data;
            console.log(this.cityList1);
            this.state = this.cityList1.attribute1;
            console.log(this.cityList1.attribute1);
            // this.country = 'INDIA';
          }
        );
    }

  }
  transDataWithSite(val) { }










  // getGroupControl(index,arrayname, fieldName) {
  //   return (<FormArray>this.CounterSaleOrderBookingForm.get(arrayname)).at(index).get(fieldName);
  // }

  onOptionsSelectedDiscountType(discType) {
    // alert(discType)
    if (discType === 'Header Level Discount') {
      this.displaydisPer = false;
      this.displaydisAmt = true;
    }
    else {
      this.displaydisPer = true;
      this.displaydisAmt = false;
    }
  }

  onOptionsSelectedDiscountPer(disPer) {
    // alert(disPer);
    var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    // alert(patch.length)
    for (let i = 0; i < patch.length; i++) {
      (patch.controls[i]).patchValue({
        disPer: this.disPer,
      });
    }
  }

  validateNumber(e: any) {
    // alert(e);
    if (this.uom === 'NO') {
      let input = String.fromCharCode(e.charCode);
      const reg = /^\d*(?:[.,]\d{1,2})?$/;

      if (!reg.test(input)) {
        e.preventDefault();
      }
    }
    else { }
  }




  hideloader() {
    document.getElementById('loading')
      .style.display = 'none';
  }




  onOptionsSelectedTransactionType(transactionTypeName: string) {
    if (transactionTypeName != undefined) {
      // alert(transactionTypeName)'
      // alert(this.op)
      if (this.op != 'Search') {
        if (this.CounterSaleOrderBookingForm.get('custName').value == undefined && this.CounterSaleOrderBookingForm.get('custAddress').value == undefined) {
          alert("Please Get Proper Customer Details!.")
          return;
        }
      }
      this.displayCSOrderAndLineDt = false;
      let select = this.orderTypeList.find(d => d.transactionTypeName === this.transactionTypeName);
      console.log(select);
      // alert(select.transactionTypeId)
      this.CounterSaleOrderBookingForm.patchValue({ transactionTypeId: select.transactionTypeId })
      if (transactionTypeName === 'Accessories Sale - Cash' || transactionTypeName === 'Spares Sale - Cash') {
        this.PaymentButton = true;
      }
      else {
        this.PaymentButton = false;
      }

      if (transactionTypeName.includes('Cash')) {
        let selectTrx = this.createOrderTypeList.find(d => d.code === 'Direct Invoice');
        this.CounterSaleOrderBookingForm.patchValue({ createOrderType: selectTrx.codeDesc });
        this.setFocus('createOrderType');
        // this.CounterSaleOrderBookingForm.get('name').disable();
        // alert('hi')
      }
      if (transactionTypeName.includes('Credit')) {
        let selectTrx = this.createOrderTypeList.find(d => d.code === 'Pick Ticket');
        this.CounterSaleOrderBookingForm.patchValue({ createOrderType: selectTrx.codeDesc });
        this.setFocus('createOrderType');
        // this.CounterSaleOrderBookingForm.get('name').disable();
      }

    }

  }

  searchByContact(contactNo) {
    this.service.searchCustomerByContact(contactNo)
      .subscribe(
        data => {
          this.accountNoSearchdata = data.obj;
          this.CounterSaleOrderBookingForm.patchValue({ custAccountNo: data.obj.custAccountNo })

        });
  }

  Select(custAccountNo) {
    //alert(custAccountNo)
    if (custAccountNo != undefined) {
      let currCustomer = this.accountNoSearchdata.filter((customer) => (customer.custAccountNo === custAccountNo));
      this.selCustomer = currCustomer[0];
      this.CounterSaleOrderBookingForm.patchValue({ custAccountNo: custAccountNo });
      //this.accountNoSearch(custAccountNo);
      this.custSiteList = this.selCustomer.customerSiteMasterList;
      this.CounterSaleOrderBookingForm.patchValue(this.selCustomer);

      let selPayTerm = this.payTermDescList.find(d => d.lookupValueId === this.selCustomer.termId);
      this.paymentType = selPayTerm.lookupValue;
      this.CounterSaleOrderBookingForm.get('custName').disable();
      if (this.custSiteList.length === 1) {
        this.onOptionsSelectedcustSiteName(this.custSiteList[0].siteName);

      }

      //   this.CounterSaleOrderBookingForm.patchValue({disPer: this.custSiteList[0].disPer })    }
    }
  }


  tcsCalculationAdd() {
    var arrayctrl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    for (var i = 0; i < arrayctrl.length; i++) {
      this.allLineTotalAmt += arrayctrl[i].totAmt
    }
    var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var lnNo = Number(patch.length + 1);
    // alert(this.allLineTotalAmt)
    var tcsPer = this.CounterSaleOrderBookingForm.get('tcsPer').value;
    var tcsCal = Math.round((this.allLineTotalAmt * tcsPer / 100 + Number.EPSILON) * 100) / 100;
    this.addRow(arrayctrl.length);
    var itemDesc = 'TCS'
    //  alert(tcsCal);
    this.orderManagementService.searchByItemSegmentDiv(this.divisionId, itemDesc)
      .subscribe(
        data => {
          this.orderedItem = data.description;
          console.log(data);
          var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
          var arrayctrl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
          if (data.length == 1) {
            (patch.controls[lnNo - 1]).patchValue({ 'segment': data[0].segment });
            (patch.controls[lnNo - 1]).patchValue({ 'pricingQty': '1' });
            (patch.controls[lnNo - 1]).patchValue({ 'orderedItem': data[0].description });
            (patch.controls[lnNo - 1]).patchValue({ 'disPer': 0 });
            (patch.controls[lnNo - 1]).patchValue({ 'disAmt': 0 });
            (patch.controls[lnNo - 1]).patchValue({ 'unitSellingPrice': tcsCal });
            (patch.controls[lnNo - 1]).patchValue({ 'baseAmt': tcsCal });
            (patch.controls[lnNo - 1]).patchValue({ 'taxAmt': 0 });
            (patch.controls[lnNo - 1]).patchValue({ 'totAmt': tcsCal });
            (patch.controls[lnNo - 1]).patchValue({ 'invType': 'SS_LABOR' });
          }

          this.CounterSaleOrderBookingForm.patchValue({ 'tcsAmt': tcsCal });
          this.updateTotAmtPerline(arrayctrl.length)
        }
      );
    this.orderlineDetailsArray().disable();
    this.displaytcsBuuton = true;
    this.isDisabled = false;
  }

  reservePos(i) {
    var len = i;
    var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    console.log(trxLnArr1);
    var locId1 = this.CounterSaleOrderBookingForm.get('locId').value;
    var prqty = trxLnArr1[len].pricingQty;
    var itemId = trxLnArr1[len].itemId;
    var transactionNumber = trxLnArr1[len].uuidRef;
    var locatorId = trxLnArr1[len].frmLocatorName;
    var rate = trxLnArr1[len].unitSellingPrice;
    var transactionType = this.CounterSaleOrderBookingForm.get('transactionTypeName').value;

    var resLn: reserveLine = new reserveLine();
    resLn.transactionType = transactionType;
    resLn.transactionNumber = transactionNumber;
    resLn.locId = locId1;
    resLn.reservedQty = prqty;
    resLn.invItemId = itemId;
    resLn.locatorId = locatorId;
    resLn.rate = rate;
    this.service.reservePost(resLn).subscribe((res: any) => {
      if (res.code === 200) {
        var stkRow: StockTransferRow = new StockTransferRow();
        stkRow.segment = (trxLnArr1[i].segment);
        stkRow.Locator = (trxLnArr1[i].frmLocator);
        stkRow.quantity = (trxLnArr1[i].quantity);
        this.itemMap3.set(trxLnArr1[i].segment, stkRow);
      }
      else {
        if (res.code === 400) {
          alert(res.message);
          this.CounterSaleOrderBookingForm.reset();
        }
      }
    }
    );
  }

  deleteReserve() {
    // alert('delete reserve')
    // var transferId = this.CounterSaleOrderBookingForm.get('uuidRef').value;
    var trxLnArr2 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var trxLnArr1 = trxLnArr2.getRawValue();
    for (let j = 0; j < trxLnArr1.length; j++) {
      var transferId = trxLnArr1[j].uuidRef;
      this.service.reserveDelete(transferId, Number(sessionStorage.getItem('locId'))).subscribe((res: any) => {
        if (res.code === 200) {
        }
      });
    }
  }

  deleteReserveLinewise(i, itemid, transferId) {


    if (itemid != null) {
      // alert(i+'----'+itemid+'---'+transferId);
      this.service.reserveDeleteLine(transferId, Number(sessionStorage.getItem('locId')), itemid).subscribe((res: any) => {
        //  var obj=res.obj;
        if (res.code === 200) {
        }
      });
    }
  }

  setFocus(name) {

    const ele = this.aForm.nativeElement[name];
    if (ele) {
      ele.focus();
    }
  }

  message: string = "Please Fix the Errors!";
  cnfMsgType: string = "Close";
  // msgType:string ="Navigate";
  getMessage(msgType: string) {
    this.cnfMsgType = msgType;
    if (msgType.includes("INVOICE")) {
      this.submitted = true;
      (document.getElementById('invoiceBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
      this.message = "Do you want to Generate INVOICE the changes (Yes/No)?"
    }
    if (msgType.includes("Navigate")) {
      this.message = "Do you want to Navigate the Form(Yes/No)?"
    }

    if (msgType.includes("Reset")) { this.message = "Do you want to Reset the changes(Yes/No)?" }

    if (msgType.includes("Close")) { this.message = "Do you want to Close the Form(Yes/No)?" }
    return;
  }


  executeAction() {
    if (this.cnfMsgType.includes("INVOICE")) {
      this.pickTicketInvoiceFunction();
    }
    //     if(this.msgType.includes("Navigate")) {
    //       this.router.navigate(['/admin/master/customerMaster'])
    //  }
  }

  closeModalDialog() {
    this.display = 'none'; //set none css after close dialog
    this.myInputField.nativeElement.focus();
  }
  ngOnDestroy(): void {
    alert('Window Closed Directely.!');
    this.deleteReserve();
    return;
  }


  onOptionsSelectedissueTypeCode(event: any) {
    let selectIssueCode = this.issueCodeTypeList.find(d => d.codeDesc === event);
    this.CounterSaleOrderBookingForm.patchValue({ issueCode: selectIssueCode.code })
    var concatissuetypecode = this.CounterSaleOrderBookingForm.get('issueCode').value + '-' + this.CounterSaleOrderBookingForm.get('issueCodeType1').value
    this.CounterSaleOrderBookingForm.patchValue({ issueCodeType: concatissuetypecode });
  }

  @HostListener('window:unload', ['$event'])
  keyEvent1(event: KeyboardEvent) {
    this.deleteReserve();
    console.log(event);
  }




  lineTaxdetails: any = [];
  selTaxLn = '';
  openTaxDetails(i: number) {
    // debugger;
    // alert(i)
    this.selTaxLn = String(i);
    var i = Number(i + 1);
    this.lineTaxdetails = this.TaxDetailsArray() as FormArray;
    this.lineTaxdetails.clear();
    if (this.taxMap.has(this.selTaxLn)) {
      var taxValues: any = this.taxMap.get(this.selTaxLn);
      for (let x = 0; x < taxValues.length; x++) {
        if (taxValues[x].invLineNo === i) {
          this.lineTaxdetails.push(this.TaxDetailsGroup());
          this.lineTaxdetails.controls[x].patchValue(taxValues[x]);
        }
      }
    }
  }

  closeTaxModal() {
    console.log(this.lineTaxdetails.value);
    // debugger;
    this.CounterSaleOrderBookingForm.get('taxAmounts').patchValue(this.lineTaxdetails.value);
    this.taxMap.set(this.selTaxLn, this.lineTaxdetails.value);
    // alert('added to map closeTaxModal..' + this.selTaxLn)
    this.display = 'none'; //set none css after close dialog
    this.myInputField.nativeElement.focus();

    var taxValues = this.CounterSaleOrderBookingForm.get('taxAmounts').value;
    var totDisc = 0;
    var totTax = 0;
    for (let i = 0; i < taxValues.length; i++) {
      if (taxValues[i].taxTypeName.includes('Disc')) {
        totDisc = totDisc + taxValues[i].totTaxAmt
      }
      if (taxValues[i].totTaxPer != 0) {
        totTax = totTax + this.taxCalforItem[i].totTaxAmt
      }
    }
    var controlinv1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var controlinv2 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var baseAmt = controlinv1[this.selTaxLn].baseAmt;
    var lineTotAmt = Math.round(((baseAmt - totDisc + totTax) + Number.EPSILON) * 100) / 100;
    // (controlinv2.controls[this.selTaxLn]).patchValue({
    //   baseAmt: Math.round((baseAmt + Number.EPSILON) * 100) / 100,
    //   taxAmt: Math.round((totTax + Number.EPSILON) * 100) / 100,
    //   totAmt: lineTotAmt,
    // });
    // alert(controlinv1[this.selTaxLn].taxAmt)
  }
}
