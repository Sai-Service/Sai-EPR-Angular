import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgModule } from '@angular/core';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { data } from 'jquery';
import { SalesOrderobj } from 'src/app/order-management/sales-order-form/sales-orderobj'
import { DatePipe } from '@angular/common';
import { Location } from "@angular/common";
import { escapeRegExp } from '@angular/compiler/src/util';
import { saveAs } from 'file-saver';
import { SelectorMatcher } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { uuidv4 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
// import { NgxSpinnerService } from "ngx-spinner";


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
  tcsAmt:number;
  tcsPer:number;
}

interface CustomerCreationInterface {
  ouName: string;
  loginArray: string;
  custType: string;
  classCodeType: string;
  custAccountNo: number;
  title: string;
  fName: string;
  mName: string;
  lName: string;
  custName: string;
  customerId1: number;
  address1: string;
  address2: string;
  cmnTypeId: number;
  address3: string;
  address4: string;
  city: string;
  pinCd: number;
  state: string;
  mobile1: number;
  mobile2: number;
  mobile3: number;
  emailId: string;
  emailId1: string;
  contactPerson: string;
  contactNo: number;
  birthDate: Date;
  weddingDate: Date;
  startDate: Date;
  gstNo: string;
  panNo: string;
  tanNo: string;
  location: string;
}


var require: any;


@Component({
  selector: 'app-counter-sale',
  templateUrl: './counter-sale.component.html',
  styleUrls: ['./counter-sale.component.css'],

  template: `<pdf-viewer [src]="pdfSrc"
              [render-text]="true"
              style="display: block;"></pdf-viewer>`
})


export class CounterSaleComponent implements OnInit {
  itemSeg: string = "";
  CounterSaleOrderBookingForm: FormGroup;
  lnflowStatusCode: 'BOOKED';
  refCustNo: string;
  lineNumber: number;
  private allLineTotalAmt = 0;
  tcsYN: string;
  tcsPer: number;
  tcsAmt:number;
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
  customerNameSearch: any[];
  accountNoSearchdata: any[];
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
  custPoNumber: number;
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

  // @ViewChild("paymentButton") myInputField: ElementRef;



  // customer Master
  // custType: string;
  // customerId:number;


  display = 'none';
  @ViewChild("myinput") myInputField: ElementRef;

  @ViewChild("paymentButton") paymentButton: ElementRef;

  @ViewChild('aForm') aForm: ElementRef;


  title: string;
  customerId1: number;
  fName: string;
  mName: string;
  lName: string;
  // custName: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  pinCd: number;
  // state: string;
  // mobile1: number;
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
  // gstNo: string;
  // panNo: string;
  tanNo: string;
  divisionName: string;
  walkCustName: string;
  walkCustPan: string;
  walkCustaddres: string;

  public itemMap = new Map<string, any[]>();

  // @ViewChild("myinput") myInputField: ElementRef;
  @ViewChild("othRefNo") othRefNo1: ElementRef;
  getfrmSubLoc: any;
  ngAfterViewInit() {
    // this.myInputField.nativeElement.focus();
  }
  public taxMap = new Map<string, any>();

  pipe = new DatePipe('en-US');
  now = new Date();
  orderedDate = this.pipe.transform(this.now, 'dd-MM-yyyy');

  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  isDisabled = false;


  constructor(private fb: FormBuilder, private location1: Location, private router1: ActivatedRoute, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService,) {
    this.CounterSaleOrderBookingForm = fb.group({
      emplId: [''],
      taxCategoryName: [''],
      disPer: [''],
      refCustNo: [''],
      discAmt: [''],
      tcsYN: [''],
      tcsPer: [''],
      tcsAmt:[],
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
      classCodeType: [''],
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



  orderlineDetailsArray(): FormArray {
    return <FormArray>this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList')
  }

  orderlineDetailsGroup() {
    return this.fb.group({
      itemSeg: [''],
      frmLocatorId: ['', [Validators.required]],
      onHandQty: [],
      discType: [],
      disPer: ['0'],
      disAmt: [0],
      uom: [],
      lnflowStatusCode: [''],
      Avalqty: [],
      resveQty: [],
      frmLocatorName: [],
      itemId: [],
      orderedItem: [''],
      pricingQty: ['', [Validators.required]],
      orderedQty: [''],
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
    // this.CounterSaleOrderBookingForm.patchValue({refCustNo:uuidv4()});
    // console.log(uuidv4());
    // alert(uuidv4())
    $("#wrapper").toggleClass("toggled");
    if (Number(sessionStorage.getItem('divisionId')) === 1) {
      this.displayDMSCDMS = true;
      this.showApplyDiscount = false;
    }
    else if (Number(sessionStorage.getItem('divisionId')) === 2) {
      this.displayDMSCDMS = false;
      this.showApplyDiscount = true;
      this.CounterSaleOrderBookingForm.patchValue({ issueCodeType: 'Regular Sales' });
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

    //this.onOptionsSelectedCategory(this.invType, 0);
    this.disPer = 0.00;
    this.service.payTermDescList()
      .subscribe(
        data => {
          this.payTermDescList = data;
          console.log(this.payTermDescList);
        }
      );


    // this.service.taxCategoryListForSALES()
    //   .subscribe(
    //     data1 => {
    //       this.taxCategoryList = data1;
    //       this.allTaxCategoryList = data1;
    //       console.log(this.taxCategoryList);
    //     }
    //   );


    this.orderManagementService.categoryList1()
      .subscribe(
        data1 => {
          this.categoryList = data1;
          if (this.deptName === 'TrueValue') { }
          else {
            // let selectInvType=this.categoryList.find(d => d.itemType === 'SS_VEHICLE');
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

    this.service.subInvCode2(this.deptId, this.divisionId).subscribe(
      data => {
        this.subInvCode = data;
        console.log(this.subInventoryId);
        this.subInventoryId = this.subInvCode.subInventoryId;
        // alert('check hideloader'+' ' + this.subInventoryId);
        // this.hideloader();
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

    // this.lnflowStatusCode='BOOKED'

    this.custSiteList.push({ 'siteName': '--Select--' });
  }


  CounterSaleOrderBooking(CounterSaleOrderBookingForm: any) {
  }


  // onOptionsSelecteddisablesdirectInvForm(createOrderType){
  //   if(createOrderType==='Pick Ticket' || createOrderType==='Pick Ticket Invoice'){
  //     this.CounterSaleOrderBookingForm.enable();
  //   }
  //   else{
  //     this.CounterSaleOrderBookingForm.disable();
  //     alert('This Order Not able to do Direct Invoice')
  //   }
  // }


  OrderFind(orderNumber) {
    this.op = 'Search';
    this.displayCSOrderAndLineDt = false;
    this.emplId = Number(sessionStorage.getItem('emplId'))
    this.orderlineDetailsArray().clear();
    this.TaxDetailsArray().clear();
    this.displaycustAccountNo = false;
    this.displaycreateOrderType = false;
    this.displayCustomerSite = false;
    this.orderManagementService.counterSaleOrderSearch(orderNumber)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
            this.lstgetOrderTaxDetails = data.obj.taxAmounts;
            this.allDatastore = data.obj;
            if (data.obj.discType === 'Header Level Discount') {
              this.onOptionsSelectedDiscountType(data.obj.discType);
              this.CounterSaleOrderBookingForm.patchValue({ disPer: data.obj.disPer });
              this.CounterSaleOrderBookingForm.get('disPer').disable();
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
            this.salesRepName = data.obj.salesRepName;
            this.createOrderType = data.obj.createOrderType;
            this.priceListName = data.obj.priceListName;
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
            }
            else {
              this.isVisible = false;
            }
            this.CounterSaleOrderBookingForm.controls['emplId'].patchValue(Number(sessionStorage.getItem('emplId')));
            if (this.allDatastore.createOrderType === 'Pick Ticket' && this.allDatastore.flowStatusCode === 'BOOKED') {
              this.CounterSaleOrderBookingForm.get('custName').disable();
              this.CounterSaleOrderBookingForm.get('mobile1').disable();
              this.CounterSaleOrderBookingForm.get('refCustNo').disable();
              this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
              this.displayorderHedaerDetails = false;
              this.displaycounterSaleOrderSave = false;
              this.displaypickTicketInvoice = false;
              this.displaypickTicketUpdate = false;
              this.displayViewGatePass = true;
              
              if (this.allDatastore.tcsYN === 'Y') {
                this.displaytcsYN = false;
                this.isDisabled = false;
                this.displaytcsBuuton = true;
                this.tcsAmt = Math.round(((data.obj.totAmt * this.tcsPer)+ Number.EPSILON) * 100) / 100;
              }
              else {
                this.displaytcsYN = true;
                this.displaytcsBuuton = false;
               // this.isDisabled = false;
              }
              for (let i = 0; this.allDatastore.oeOrderLinesAllList.length; i++) {
                if (data.obj.oeOrderLinesAllList[i].flowStatusCode === 'BOOKED') {
                  this.displayLineflowStatusCode[i] = false;
                  this.displayRemoveRow[i] = false;
                }
                // else if
                //   (this.allDatastore.oeOrderLinesAllList[i].flowStatusCode === 'CANCELLED' && this.allDatastore.oeOrderLinesAllList[i].flowStatusCode === 'Invoiced') {
                //   this.displayLineflowStatusCode[i] = true;
                // }
              }

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
              // alert(this.allDatastore.flowStatusCode);
              // if (this.allDatastore.flowStatusCode === 'BOOKED' && this.allDatastore.paymentType === 'IMMEDIATE') {
              //   // alert('Hi..')
              //   this.PaymentButton = false;
              // }
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
            if (data.obj.orderStatus === 'INVOICED' && data.obj.gatePassYN === 'Y') {
              this.displayAfterGatePass = false;
              this.isVisible = false;
              this.CounterSaleOrderBookingForm.disable();
            } else {
              this.displayAfterGatePass = true;
              this.isVisible = true;
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
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
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
    var orderLines = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var exLines = this.lstgetOrderLineDetails.length;
    for (let i = exLines; i < orderLines.length; i++) {
      orderLines[i].taxCategoryName = orderLines[i].taxCategoryName.taxCategoryName;
      orderLines[i].frmLocatorId = orderLines[i].frmLocatorName;
    }

    let jsonData = this.CounterSaleOrderBookingForm.getRawValue();

    jsonData.orderedDate = this.pipe.transform(this.now, 'yyyy-MM-dd');
    jsonData.refCustNo = this.CounterSaleOrderBookingForm.get('refCustNo').value;
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
    this.orderManagementService.UpdateCounterSaleInv(JSON.stringify(salesObj)).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message + 'res.message');
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.OrderFind(this.orderNumber);

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
        this.OrderFind(this.orderNumber);
        // this.displayViewGatePass=false;
        // window.location.reload();
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

  // onKeyPaymentTerm(payTermDesc){
  //   alert(payTermDesc);
  //   let select = this.payTermDescList.find(d => d.cmnDesc === payTermDesc);
  //   this.paymentTermId = select.cmnTypeId;
  // }

  // onOptionsSelectedpaymentOption(payTermDesc){
  //   alert(payTermDesc);
  //   let select = this.payTermDescList.find(d => d.codeDesc === payTermDesc);
  //   alert(select);
  //   this.paymentTermId = select.cmnTypeId;
  //   if(payTermDesc==='IMMEDIATE'){
  //     this.PaymentButton=false;
  //   }
  //   else{
  //     this.PaymentButton=true;
  //   }

  // }

  close() {
    this.router.navigate(['admin']);
  }

  refresh() {
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

  // *******  old code *******
  // onOptionsSelectedCategory(itemType: string, lnNo: number) {
  //   if (this.itemMap2.get(lnNo) != undefined) {
  //     return;
  //   }
  //   if (this.itemMap.has(itemType)) {
  //     var itemsList = this.itemMap.get(itemType);
  //     this.itemMap2.set(lnNo, this.itemMap.get(itemType));
  //   } else {
  //   }
  //   this.invItemList1 = this.itemMap.get(itemType);
  //   this.orderManagementService.getItemByCatType(itemType, this.divisionId)
  //     .subscribe(
  //       data => {
  //         this.orderedItem = data.description;
  //         this.itemMap.set(itemType, data);
  //         this.itemMap2.set(lnNo, this.itemMap.get(itemType));
  //         // this.lnflowStatusCode='BOOKED'
  //         // console.log(this.lnflowStatusCode);
  //       }
  //     );

  // }
  // *******  old code *******

  searchByItemSegmentDiv(itemDesc: string, lnNo: number) {
    // alert('hi')
    let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var itemType = (controlinv.controls[lnNo]).get('invType').value;
    (controlinv.controls[lnNo]).patchValue({ 'segment': '' });
    //var itemType = "SS_SPARES";
    // if (this.itemMap2.get(lnNo) != undefined) {
    //   return;
    // }
    if (this.itemMap.has(itemDesc)) {
      var itemsList = this.itemMap.get(itemDesc);
      this.itemMap2.set(lnNo, this.itemMap.get(itemDesc));
    } else {
    }
    this.invItemList1 = this.itemMap.get(itemDesc);
    //this.orderManagementService.getItemByCatType(itemType, this.divisionId)
    this.orderManagementService.searchByItemSegmentDiv(this.divisionId, itemDesc)
      .subscribe(
        data => {
          this.orderedItem = data.description;
          this.itemMap.set(itemDesc, data);

          this.itemMap2.set(lnNo, this.itemMap.get(itemDesc));

          if (data.length == 1) {
            (controlinv.controls[lnNo]).patchValue({ 'segment': data[0].segment });
          }
        }
      );

  }


  onOptionsSelectedCategory(itemType: string, lnNo: number) {

    // if (this.itemMap2.get(lnNo) != undefined) {
    //   return;
    // }
    // if (this.itemMap.has(itemType)) {
    //   var itemsList = this.itemMap.get(itemType);
    //   this.itemMap2.set(lnNo, this.itemMap.get(itemType));
    // } else {
    // }
    // this.invItemList1 = this.itemMap.get(itemType);
    // //this.orderManagementService.getItemByCatType(itemType, this.divisionId)
    // this.orderManagementService.searchByItemSegmentDiv(this.divisionId, "36DH")
    //   .subscribe(
    //     data => {
    //       this.orderedItem = data.description;
    //       this.itemMap.set(itemType, data);
    //       this.itemMap2.set(lnNo, this.itemMap.get(itemType));
    //     }
    //   );

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
              this.isDisabled = true;
            }
            // alert(data.obj.tcsYN);
            this.CounterSaleOrderBookingForm.patchValue({ tcsYN: data.obj.tcsYN });
            this.CounterSaleOrderBookingForm.patchValue({ tcsPer: data.obj.tcsPer });
            this.CounterSaleOrderBookingForm.patchValue({ custAccountNo: custAccountNo });
            // alert(data.obj.tcsPer)
            // this.CounterSaleOrderBookingForm.patchValue({ name: this.custSiteList[0].siteName });
            let select = this.payTermDescList.find(d => d.lookupValueId === this.selCustomer.termId);
            this.paymentType = select.lookupValue;
            this.CounterSaleOrderBookingForm.get('custName').disable();
            this.CounterSaleOrderBookingForm.get('mobile1').disable();
            if (this.custSiteList.length === 1) {
              // alert('hi')
              this.CounterSaleOrderBookingForm.patchValue({ name: this.custSiteList[0].siteName });
              this.onOptionsSelectedcustSiteName(this.custSiteList[0].siteName);
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
          }
          else {
            if (data.code === 400) {
              // alert('Error :' + data.message);
              this.display = 'block';
              // this.displaycreateCustomer = false;
            }
          }
        });
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
    //  alert(siteName);
    //  alert(sessionStorage.getItem('ouId'));
    let selSite = this.custSiteList.find(d => d.siteName === siteName);
    console.log(selSite);
    // alert(selSite.ouId);

    if (selSite.ouId != (sessionStorage.getItem('ouId'))) {
      alert('First Create OU wise Site to continue process!')
    }
    else {
      this.CounterSaleOrderBookingForm.patchValue(selSite);
      this.custName = this.selCustomer.custName;
      this.customerId = this.selCustomer.customerId;
      this.custAddress = (this.selCustomer.address1 + ', '
        + this.selCustomer.address2 + ', '
        + this.selCustomer.address3 + ', '
        + this.selCustomer.address4 + ', '
        + this.selCustomer.city + ', '
        + this.selCustomer.pinCd + ', '
        + this.selCustomer.state);
      this.birthDate = this.selCustomer.birthDate;
      this.weddingDate = this.selCustomer.weddingDate;
      this.taxCategoryName = this.selCustomer.taxCategoryName;
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
      this.service.crediteLimitFn(this.selCustomer.customerId, selSite.customerSiteId)
        .subscribe(
          data => {
            if (data.code === 200) {
              // alert(data.obj);
            }
          })
    }

  }
  // onOptionsSelectedcustSiteName(siteName) {
  //   // alert(siteName);
  //   let selSite = this.custSiteList.find(d => d.siteName === siteName);
  //   this.CounterSaleOrderBookingForm.patchValue({ id: selSite.customerSiteId })
  //   this.id = selSite.customerSiteId;
  //   // alert(this.id);
  //   this.orderManagementService.custSideAddDet(this.id)
  //     .subscribe(
  //       data => {
  //         // if (data.code===200){
  //         this.custSiteAddressList = data;
  //         this.ouId = data.ouId;
  //         // alert(data.ouId+' '+ sessionStorage.getItem('ouId'))
  //         if (data.ouId != (sessionStorage.getItem('ouId'))) {
  //           alert('First Create OU wise Site to continue process!')
  //         }
  //         else {
  //           this.CounterSaleOrderBookingForm.patchValue(this.custSiteAddressList);
  //           this.custName = data.customerId.custName;
  //           this.customerId = data.customerId.customerId;
  //           this.custAddress = (data.customerId.address1 + ', ' + data.customerId.address2 + ', ' + data.customerId.address3 + ', ' + data.customerId.address4
  //             + ', ' + data.customerId.city + ', ' + data.customerId.pinCd + ', ' + data.customerId.state)
  //           console.log(this.custSiteAddressList);
  //           console.log(this.custSiteAddressList.customerId.custName);
  //           this.birthDate = data.customerId.birthDate;
  //           this.weddingDate = data.customerId.weddingDate;
  //         }
  //       });
  // }

  othRefNoSearch(othRefNo) {
    // alert(othRefNo);
    this.orderManagementService.othRefNoSearchFn(othRefNo)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.othRefNoSearchFnData = data.obj;
            this.othRefNo = data.obj.orderNumber1;
            this.salesRepName = data.obj.salesRepName1;
            this.tlName = data.obj.tlName1;
            this.CounterSaleOrderBookingForm.patchValue(this.othRefNoSearchFnData);
            if (this.custAccountNo != this.othRefNoSearchFnData.custAccountNo1) {
              alert('Sales Order Customer & Counter Sale Order Customer Not Match')
            }
            else { }
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

  createNewCust() {
    this.displaycreateCustomer = true;
    this.accountNoSearch(this.custAccountNo);
  }

  custNameSearch(custName) {
    // alert(custName)
    this.orderManagementService.custNameSearchFn1(custName, sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.customerNameSearch = data.obj;
            console.log(this.accountNoSearch);
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
    var trxLnArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray
    var Avalqty = trxLnArr[index].Avalqty;
    let uomCode = trxLnArr[index].uom;
    let unitSellingPrice = trxLnArr[index].unitSellingPrice;
    // if (this.orderNumber === undefined && Avalqty != null || Avalqty != undefined) {
    if (qty1 > Avalqty) {
      var bckOrd = qty1 - Avalqty;
      trxLnArr1.controls[index].patchValue({ orderedQty: bckOrd });
      trxLnArr1.controls[index].patchValue({ pricingQty: Avalqty });
    }
    //     alert("You can not enter more than available quantity!..");
    //     trxLnArr1.controls[index].patchValue({ pricingQty: '' });
    //     // (<any>trxLnArr1.controls[index].get('pricingQty')).nativeElement.focus();
    //     return false;
    //   }
    // }comment by vinita
    // alert(qty1)
    if (this.orderNumber === undefined && Avalqty != null || Avalqty != undefined) {
      if (qty1 <= 0) {
        alert("Please enter quantity more than zero");
        trxLnArr1.controls[index].patchValue({ quantity: '' });
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

  onKey(index, fldName) {
   
    var arrayControl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var pricingQty = arrayControl[index].pricingQty;
    // alert(pricingQty)
    if (pricingQty === null || pricingQty === undefined || pricingQty === 0 || pricingQty === '') {
      return;
    }
    var isvalidqty = this.validate(index, pricingQty);
    if (isvalidqty == false) {
      return;
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
      // alert("2" + taxCategoryId)
      // select = [{ taxCategoryId: taxCategoryId, taxCategoryName: taxcatName }];
      // console.log(select);
      // taxCategoryId = select.taxCategoryId;
      patch.controls[index].patchValue({ taxCategoryId: taxCategoryId });
      patch.controls[index].patchValue({ taxCategoryName: taxcatName });
    }

    patch.controls[index].patchValue({ disAmt: 0 });
    var baseAmt = arrayControl[index].unitSellingPrice * arrayControl[index].pricingQty;

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
            // baseAmt: baseAmt,
            baseAmt: Math.round((baseAmt + Number.EPSILON) * 100) / 100,
            // taxAmt:Math.round(sum),
            taxAmt: Math.round((sum + Number.EPSILON) * 100) / 100,
            // totAmt: baseAmt + sum - disAmt1,
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
          let taxMapData = this.CounterSaleOrderBookingForm.get('taxAmounts').value;
          this.taxMap.set(index, taxMapData);
          this.updateTotAmtPerline(index);

        });

    var itemId1 = arrayControl[index].itemId;
    // alert(itemId1)
    if (itemId1 != null && fldName != "locator") {
      this.addRow(index + 1);

    }
    else {
      this.displayRemoveRow.push(true);
      // alert(this.displayRemoveRow)
    }

  }




  onOptionsSelectedDescription(segment: string, k) {
    if (segment != undefined && segment != "") {
      this.displayorderHedaerDetails = false;
      var orderedDate = this.pipe.transform(this.now, 'dd-MM-yyyy');
      this.CounterSaleOrderBookingForm.patchValue({ orderedDate: orderedDate });
      this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
      this.CounterSaleOrderBookingForm.get('name').disable();
      this.CounterSaleOrderBookingForm.get('custName').disable();
      this.CounterSaleOrderBookingForm.get('mobile1').disable();
      this.CounterSaleOrderBookingForm.get('refCustNo').disable();
      if (this.CounterSaleOrderBookingForm.get('createOrderType').value === 'Sales Order' && this.CounterSaleOrderBookingForm.get('othRefNo').value === undefined) {
        alert('Please Enter Reference Number First !');
        this.CounterSaleOrderBookingForm.get('segment').disable();
        this.orderlineDetailsArray().get('segment').disable();
        (<any>this.CounterSaleOrderBookingForm.get('othRefNo')).nativeElement.focus();
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
                      let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
                      var invTp = controlinv.controls[k].get('invType').value;
                      // this.service.getfrmSubLoc(this.locId, select.itemId, this.subInventoryId).subscribe(
                      this.service.getfrmSubLocPrice(this.locId, select.itemId, this.subInventoryId).subscribe(
                        data => {
                          console.log(data);
                          if (data.length === 0) {
                            alert('Locator Not Found!.');
                            var lotList = [{ locatorId: 0, segmentName: 'Not Found' }]
                            controlinv.controls[k].patchValue({ frmLocatorId: lotList });
                            controlinv.controls[k].patchValue({ onHandQty: 0 });
                            controlinv.controls[k].get('frmLocatorId').disable()
                            return;
                          } else {
                            var getfrmSubLoc = data;

                            this.locData[k] = data;
                            controlinv.controls[k].get('frmLocatorId').enable();
                            if (getfrmSubLoc.length == 1) {
                              controlinv.controls[k].patchValue({ onHandId: getfrmSubLoc[0].segmentName });
                              controlinv.controls[k].patchValue({ frmLocatorId: getfrmSubLoc[0].locatorId });
                              controlinv.controls[k].patchValue({ frmLocator: getfrmSubLoc[0].segmentName });
                              controlinv.controls[k].patchValue({ onHandQty: getfrmSubLoc[0].onHandQty });
                              controlinv.controls[k].patchValue({ id: getfrmSubLoc[0].id });
                              controlinv.controls[k].patchValue({ unitSellingPrice: getfrmSubLoc[0].prc });
                            }
                            else {
                              controlinv.controls[k].patchValue({ frmLocator: getfrmSubLoc[0].segmentName });
                              controlinv.controls[k].patchValue({ frmLocatorId: getfrmSubLoc[0].locatorId });
                              controlinv.controls[k].patchValue({ onHandQty: getfrmSubLoc[0].onHandQty })
                              controlinv.controls[k].patchValue({ id: getfrmSubLoc[0].id });
                              controlinv.controls[k].patchValue({ unitSellingPrice: getfrmSubLoc[0].prc });
                            }
                            this.service.getreserqty(this.locId, select.itemId).subscribe
                              (data => {
                                this.resrveqty = data;
                                controlinv.controls[k].patchValue({ resveQty: this.resrveqty });
                                this.AvailQty(k, select.itemId, 'Item');
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
                            alert('Locator Not Found!.');
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
                              controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].ROWNUM });
                              controlinv.controls[k].patchValue({ frmLocator: selLocator[0].segmentName });
                              // controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].locatorId });
                              controlinv.controls[k].patchValue({ onHandQty: selLocator[0].onHandQty })
                              controlinv.controls[k].patchValue({ id: selLocator[0].id });
                              controlinv.controls[k].patchValue({ unitSellingPrice: selLocator[0].prc });
                            }
                            this.service.getreserqty(this.locId, select.itemId).subscribe
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
  // getLocatorDetails(k, itemId) {
  //   alert(k)
  //   // alert('Enter getLocatorDetails ');
  //   let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
  //   var invTp = controlinv.controls[k].get('invType').value;
  //   this.service.getfrmSubLoc(this.locId, itemId, this.subInventoryId).subscribe(
  //     data => {
  //       console.log(data);
  //       if (data.length === 0) {
  //         alert('Locator Not Found!.');
  //         var lotList = [{ locatorId: 0, segmentName: 'Not Found' }]
  //         controlinv.controls[k].patchValue({ frmLocatorId: lotList });
  //         controlinv.controls[k].patchValue({ onHandQty: 0 });
  //         controlinv.controls[k].get('frmLocatorId').disable()
  //         return;
  //       } else {
  //         var getfrmSubLoc = data;
  //         this.locData = data;
  //         controlinv.controls[k].get('frmLocatorId').enable();
  //         if (getfrmSubLoc.length == 1) {
  //           controlinv.controls[k].patchValue({ onHandId: getfrmSubLoc[0].segmentName });
  //           controlinv.controls[k].patchValue({ frmLocatorId: getfrmSubLoc[0].locatorId });
  //           controlinv.controls[k].patchValue({ frmLocator: getfrmSubLoc[0].segmentName });
  //           controlinv.controls[k].patchValue({ onHandQty: getfrmSubLoc[0].onHandQty });
  //           controlinv.controls[k].patchValue({ id: getfrmSubLoc[0].id });
  //         }
  //         else {
  //           // this.getfrmSubLoc=data;;
  //           //  trxLnArr2.controls[i].patchValue({onHandId:getfrmSubLoc});
  //           // alert('hi---locat')
  //           controlinv.controls[k].patchValue({ frmLocator: getfrmSubLoc[0].segmentName });
  //           controlinv.controls[k].patchValue({frmLocatorId: getfrmSubLoc[0].locatorId });
  //           controlinv.controls[k].patchValue({ onHandQty: getfrmSubLoc[0].onHandQty })
  //           controlinv.controls[k].patchValue({ id: getfrmSubLoc[0].id });
  //         }
  //         this.service.getreserqty(this.locId, itemId).subscribe
  //           (data => {
  //             this.resrveqty = data;
  //             controlinv.controls[k].patchValue({ resveQty: this.resrveqty });
  //             this.AvailQty(k, itemId);
  //           });
  //       }
  //     });

  //   controlinv.controls[k].patchValue({ invType: invTp });
  // }

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
    // alert(selloc.onHandQty+'on');
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
      this.AvailQty(i, trxLnArr[i].itemId, 'locator');
    }
    var fldName = "locator";
    this.onKey(i, fldName);
  }

  AvailQty(i, itemId, calledFrom) {
    // alert('Hi***' + i);
    var trxLnArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var trxLnFormArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    if (itemId === undefined) {
      itemId = trxLnArr[i].itemId;
    }
    // var itemid=trxLnArr[i].itemId;
    // var locId = trxLnArr[i].frmLocatorId.locatorId;
    // alert( locId+'locId');
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
          // alert(trxLnArr1 +' '+'Hi');
        })
    }
    else {
      alert('Locator Not Found!.')
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
    alert('Added TCS' + tcsCal);
    this.dataDisplay = 'Invoice Genration in progress....Do not refresh the Page';
    const formValue: ISalesBookingForm = this.transData(this.CounterSaleOrderBookingForm.value);
    var orderLines = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    formValue.ouId = Number(sessionStorage.getItem('ouId'));
    formValue.emplId = Number(sessionStorage.getItem('emplId'));
    formValue.divisionId = Number(sessionStorage.getItem('divisionId'));
    debugger;
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
          alert(res.message);
          this.dataDisplay = ''
          this.closeResetButton = true;
          // this.SalesOrderBookingForm.reset();
        }
      }
    });
  }


  counterSaleOrderSave() {
    // this.submitted = false;
    // if(this.CounterSaleOrderBookingForm.invalid){
    // return;
    // }
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Order Save in progress....Do not refresh the Page';
    this.isDisabled = true;
    var orderLines = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    for (let j = 0; j < orderLines.length; j++) {
      if (orderLines[j].segment === '' && orderLines[j].taxCategoryName === '' && orderLines[j].pricingQty === '') {
        alert('First Select Line Details..!');
        return;
      }
      if (orderLines[j].unitSellingPrice === '') {
        alert('Line No' + j + 'Amount is Zero please confirm')
      }
    }
    for (let i = 0; i < orderLines.length; i++) {
      orderLines[i].taxCategoryName = orderLines[i].taxCategoryName.taxCategoryName;
      orderLines[i].frmLocatorId = orderLines[i].frmLocatorName;
    }
    let jsonData = this.CounterSaleOrderBookingForm.getRawValue();

    jsonData.orderedDate = this.pipe.transform(this.now, 'yyyy-MM-dd');
    jsonData.refCustNo = this.CounterSaleOrderBookingForm.get('refCustNo').value;
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
        // this.orderNumber=this.CounterSaleOrderBookingForm.get('orderNumber').value;
        console.log(this.orderNumber);
        this.OrderFind(this.orderNumber);
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.closeResetButton = true;
          this.dataDisplay = ''
          this.isDisabled = false;
          // this.SpinnerService.hide();
          // this.SalesOrderBookingForm.reset();
        }
      }
    });
  }

  addRow(i) {
    // if (i > -1) {
    //   this.reservePos(i);
    // }
    // this.displaysegmentInvType.push(true);

    var disPer = this.CounterSaleOrderBookingForm.get('disPer').value;
    this.displayRemoveRow.push(true);
    this.displayCounterSaleLine.push(true);
    this.displayLineflowStatusCode.push(true);
    this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
    var len = this.orderlineDetailsArray().length;
    var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var currentLn = patch.controls[i].get('lineNumber').value;
    // alert(currentLn);
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
    this.displayRemoveRow.push(true);
    this.displayCounterSaleLine.push(true);
    this.displayLineflowStatusCode.push(true);
    this.taxCategoryList = this.allTaxCategoryList;
    this.itemSeg = '';
    var ln = len - 1;
     this.setFocus('itemSeg' + ln);

  }

  updateTotAmtPerline(lineIndex) {

    var formVal = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var formArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var tcsPer = this.CounterSaleOrderBookingForm.get('tcsPer').value;
    var basicAmt = 0;
    var taxAmt1 = 0;
    var totAmt = 0;
    var disAmt = 0;
    var tcsAmt1 = 0;
    for (let i = 0; i < formVal.length; i++) {
      if( formVal[i].flowStatusCode === 'BOOKED' ||formVal[i].flowStatusCode ==='INVOICED'){
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
        totAmt = totAmt + tcsAmt1;
      }
      }}
    //   for (let i = 0; i < formVal.length; i++) {
    //     if( formVal[i].flowStatusCode === 'BOOKED' && formVal[i].segment == 'TCS' ){
    //     alert('inside TCS' + tcsAmt1);
    //     formArr.controls[i].enable();
    //     tcsAmt1 = Math.round((totAmt * tcsPer / 100 + Number.EPSILON) * 100) / 100;
    //     formArr.controls[i].patchValue({'totAmt':tcsAmt1});
    //     formArr.controls[i].patchValue({'unitSellingPrice':0});
    //     formArr.controls[i].patchValue({'baseAmt':0});
    //     totAmt = totAmt + tcsAmt1
    
    // }
    // }
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
  }


  RemoveRow(OrderLineIndex) {
    this.orderlineDetailsArray().removeAt(OrderLineIndex);
    this.TaxDetailsArray().removeAt(OrderLineIndex);

    var formVal = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var formArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;

    var basicAmt = 0;
    var taxAmt1 = 0;
    var totAmt = 0;
    var disAmt = 0;
    var tcsAmt1 = 0;
    //alert(formVal.length)
    debugger;
     for (let i = 0; i < formVal.length; i++) {
    //   if (formVal[i].taxAmt != undefined && formVal[i].totAmt != undefined) {
    //     basicAmt = basicAmt + formVal[i].baseAmt;
    //     disAmt = disAmt + formVal[i].disAmt;
    //     taxAmt1 = taxAmt1 + formVal[i].taxAmt;
    //     totAmt = totAmt + formVal[i].totAmt;
    //   }
      (formArr.controls[i]).patchValue({
        lineNumber: i + 1,
      });
    }
    // basicAmt = Math.round(((basicAmt) + Number.EPSILON) * 100) / 100;
    // this.CounterSaleOrderBookingForm.patchValue({ 'subtotal': basicAmt });
    // disAmt = Math.round(((disAmt) + Number.EPSILON) * 100) / 100;
    // this.CounterSaleOrderBookingForm.patchValue({ 'discAmt': disAmt });
    // taxAmt1 = Math.round(((taxAmt1) + Number.EPSILON) * 100) / 100;
    // this.CounterSaleOrderBookingForm.patchValue({ 'totTax': taxAmt1 });
    // totAmt = Math.round(((totAmt) + Number.EPSILON) * 100) / 100;
    // this.CounterSaleOrderBookingForm.patchValue({ 'totAmt': totAmt });
    // tcsAmt1 = Math.round((totAmt * this.tcsPer / 100 + Number.EPSILON) * 100) / 100;
    // this.CounterSaleOrderBookingForm.patchValue({ 'tcsAmt': tcsAmt1 });

    // var newln = OrderLineIndex-1;
    // this.setFocus('itemSeg' + newln);
    this.updateTotAmtPerline(0);
  }

updateLineOnCancel(event, i){
  var trxArrVal = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
  var trxArr= this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
  if( trxArrVal[i].flowStatusCode === 'CANCELLED'){
    trxArr.controls[i].patchValue({ 'baseAmt': 0 , 'disAmt': 0 , 'taxAmt': 0 ,'totAmt': 0 });
   }
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
    let controlinv1 = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
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
    //   this.cityList1.ouId=106;
    //   if (this.ouId != 106){
    //     alert(this.ouId)
    //     alert('This Is IGST Customer')
    //   }
    // else{
    //   var ouId1=104;
    //   if(this.ouId===ouId1){
    //   alert('This Is SGST Customer')
    // }
    // }
  }
  transDataWithSite(val) { }




  newMast() {
    // const formValue: CustomerCreationInterface = this.transDataWithSite(this.CounterSaleOrderBookingForm.value);
    const formValue: CustomerCreationInterface = this.transData(this.CounterSaleOrderBookingForm.value);
    formValue.customerId1 = this.custAccountNo;
    this.service.CustMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        if (this.custAccountNo != null) {
          this.accountNoSearch1(this.custAccountNo);
        }
        else if (this.mobile1 != null) {
          this.contactNoSearch(this.mobile1);
        }
        else {
          this.custNameSearch(this.custName);
        }

        // this.CounterSaleOrderBookingForm.reset();
      } else {
        if (res.code === 400) {
          alert(res.message);
          // this.CounterSaleOrderBookingForm.reset();
        }
      }
    });
  }



  accountNoSearch1(custAccountNo) {
    // alert(this.custAccountNo);
    this.orderManagementService.accountNoSearchFn(this.custAccountNo, this.ouId, (sessionStorage.getItem('divisionId')))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.accountNoSearch = data.obj;
            this.displaycreateCustomer = true;
            console.log(this.accountNoSearch);
            this.CounterSaleOrderBookingForm.patchValue(this.accountNoSearch);
            this.custAddress = data.obj.billToAddress;
            this.paymentTermId = data.obj.termId;
            this.CounterSaleOrderBookingForm.get('custName').disable();
            this.CounterSaleOrderBookingForm.get('mobile1').disable();
          }
          else {
            if (data.code === 400) {
              alert(data.message);
              this.displaycreateCustomer = false;
            }
          }
        });

  }

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


  qtyvalidation(i, uom, pricingQty) {
    // alert(i + ' ' + uom + ' ' + pricingQty);
    if (uom === 'NO') {
      // alert(pricingQty);
      pricingQty: [0 - 9]
    }
    else {
      pricingQty: '[0-9\.\,]'
    }
  }

  hideloader() {
    document.getElementById('loading')
      .style.display = 'none';
  }



  reservePos(i) {
    // alert("Hello");
    var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    let variants = <FormArray>this.orderlineDetailsArray();
    var transtypeid = this.CounterSaleOrderBookingForm.get('transactionTypeId').value;
    console.log(transtypeid);
    var locId1 = sessionStorage.getItem('locId');
    let variantFormGroup = <FormGroup>variants.controls[i];
    variantFormGroup.addControl('transactionTypeId', new FormControl(transtypeid, Validators.required));
    variantFormGroup.addControl('locId', new FormControl(locId1, Validators.required));
    variantFormGroup.addControl('reservedQty', new FormControl(trxLnArr1[i].pricingQty, Validators.required));
    variantFormGroup.addControl('onHandId', new FormControl(trxLnArr1[i].id, []));
    this.service.reservePost(variants.value[i]).subscribe((res: any) => {
      if (res.code === 200) {
        // alert("Record inserted Successfully");
      }
      else {
        if (res.code === 400) {
          window.location.reload();
        }
      }
    }
    );
  }




  onOptionsSelectedTransactionType(transactionTypeName: string) {
    if (transactionTypeName != undefined) {
      // alert(transactionTypeName)
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
        // alert('hi')
      }
      if (transactionTypeName.includes('Credit')) {
        let selectTrx = this.createOrderTypeList.find(d => d.code === 'Pick Ticket');
        this.CounterSaleOrderBookingForm.patchValue({ createOrderType: selectTrx.codeDesc });
        this.setFocus('createOrderType');
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
  message1: string = "Customer Not Found !  Do you want to create new Customer?";
  msgType: string = "Navigate";
  getMessage(msgType: string) {
    if (msgType.includes("Navigate")) {
      this.message1 = "Do you want to Navigate the Form(Yes/No)?"
    }
  }

  executeAction() {
    if (this.msgType.includes("Navigate")) {
      this.router.navigate(['/admin/master/customerMaster'])
    }
  }


  closeModalDialog() {
    this.display = 'none'; //set none css after close dialog
    this.myInputField.nativeElement.focus();
  }

  setFocus(name) {
    // alert(name)
    const ele = this.aForm.nativeElement[name];
    console.log(ele);
    if (ele) {
      ele.focus();
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
            (patch.controls[lnNo - 1]).patchValue({ 'unitSellingPrice': tcsCal});
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

  deleteReserveLinewise(i) {
    var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var orderNumber = this.orderNumber;
    // alert(orderNumber);
    var itemid = trxLnArr1[i].itemId;
    this.service.reserveDeleteLine(orderNumber, Number(sessionStorage.getItem('locId')), itemid).subscribe((res: any) => {
      //  var obj=res.obj;
      if (res.code === 200) {
        // alert(res.message);
      }
    });
  }






}
