import { Component, OnInit, HostListener, ViewChild, ElementRef, NgModule } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators, FormArray, FormsModule } from '@angular/forms';

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
  salesRepId:number;
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
  salesRepName:string;
}


var require: any;

@Component({
  selector: 'app-counter-sale-with-csvmodule',
  templateUrl: './counter-sale-with-csvmodule.component.html',
  styleUrls: ['./counter-sale-with-csvmodule.component.css'],
  template: `<pdf-viewer [src]="pdfSrc"
              [render-text]="true"
              style="display: block;"></pdf-viewer>`
})
export class CounterSaleWithCSVModuleComponent implements OnInit {

  CounterSaleOrderBookingForm: FormGroup;
  lnflowStatusCode: 'BOOKED';
  refCustNo: string;
  isDisabled3 = false;
  isDisabled5 = false;
  salesRepId:number;
  creditAmt: number;
  errorList: string;
  issueCodeType1:string;
  issueCode:string;
  displaywalkingCustomer = true;
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
  custPoDate:Date;
  // Customer Form
  locData: any = [];
  // =[ {
  //   "locatorId": 999,
  //   "segmentName": "D.U.01.D.01",
  //   "id": 7,
  //   "onHandQty": 40
  // }];
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
  // isVisible:boolean;
  isVisible: boolean = false;
  displayPerson: boolean;
  public minDate = new Date();
  public cityList: Array<string>[];
  public issueCodeTypeList: any[];
  public status = "Active";
  public titleList: Array<string>[];
  exicutiveNameByCustNameList: any = [];
  displayOrgnization: boolean;
  PersonType: any;
  classCodeType: string;
  public cityList1: any;
  location: string;
  displaydisAmt = false;
  displayDMSCDMS: boolean;


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
  displaypickTicketInvoice = true;
  displaycreateOrderType = true;
  showApplyDiscount = true;
  selectedLine = 0;
  categoryList: any = [];
  custSiteList: any = [];
  // orderedDate:Date;
  diss: number;
  InvoiceNumber: number;
  locId: number;
  isDisabled = false;
  contactNoSearchData: any;
  othRefNoSearchFnData: any;
  taxCat1: number;
  cntLineTax: number;
  invType: string;
  mobile1: number;
  segment: string;
  dept: number;
  baseAmt: number;
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
  createOrderTypeList: any;
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
  displayShowLinseTab = true;
  displayaddRow = true;
  // displayRemoveRow=true;
  displaysalesRepName = true;
  // displaytaxCategoryName=true;
  displaycreateCustomer = true;
  displayCounterSaleLine: Array<boolean> = [];

  selCustomer: any;
  boxQty: number;
  driverName: string;
  vehNo: string;
  public  taxCatMap =new Map<number, any[]>();

  // @ViewChild("paymentButton") myInputField: ElementRef;



  // customer Master
  // custType: string;
  // customerId:number;

  display = 'none';
  @ViewChild("myinput") myInputField: ElementRef;
  @ViewChild("paymentButton") paymentButton: ElementRef;
  @ViewChild('fileInput') fileInput;

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

  public itemMap = new Map<string, any[]>();

  // @ViewChild("myinput") myInputField: ElementRef;
  @ViewChild("othRefNo") othRefNo1: ElementRef;
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
  PaymentViewReceipt = true;


  constructor(private fb: FormBuilder, private location1: Location, private router1: ActivatedRoute, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.CounterSaleOrderBookingForm = fb.group({
      emplId: [''],
      disPer: [''],
      refCustNo: [''],
      taxCategoryName: [''],
      transactionTypeId: [''],
      InvoiceNumber: [''],
      salesRepId:[],
      creditAmt: [''],
      custPoDate:[''],
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
      // orderType:[''],
      // createOrderType:[''],
      billToAddress: [''],
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
      files: [''],
      issueCodeType1:[''],
      issueCode:[''],
    })

  }



  orderlineDetailsArray(): FormArray {
    return <FormArray>this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList')
  }

  orderlineDetailsGroup() {
    return this.fb.group({
      frmLocatorId: ['', [Validators.required]],
      onHandQty: [],
      discType: [],
      disPer: ['0'],
      disAmt: ['0'],
      uom: [],
      lnflowStatusCode: [''],
      Avalqty: [],
      resveQty: [],
      frmLocatorName: [],
      itemId: [],
      orderedItem: [''],
      pricingQty: ['', [Validators.required]],
      orderedQty: [''],
      unitSellingPrice: [''],
      taxCategoryName: ['', [Validators.required]],
      baseAmt: [],
      taxAmt: [],
      totAmt: [''],
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
    this.errList[0] = '';
    this.displayShowLinseTab = true;
    $("#wrapper").toggleClass("toggled");


    if (Number(sessionStorage.getItem('divisionId')) === 1) {
      this.displayDMSCDMS = true;
      this.showApplyDiscount = false;
    }
    else if (Number(sessionStorage.getItem('divisionId')) === 2) {
      this.displayDMSCDMS = false;
      this.showApplyDiscount = true;
      if (sessionStorage.getItem('deptName') === 'Spares') {
        this.CounterSaleOrderBookingForm.patchValue({ transactionTypeName: 'Spares Sale - Cash' });
        this.CounterSaleOrderBookingForm.patchValue({ issueCodeType1: 'Regular Sales' });
      this.CounterSaleOrderBookingForm.patchValue({ issueCode: 'CM03' });
      var concatissuetypecode = this.CounterSaleOrderBookingForm.get('issueCode').value + '-' + this.CounterSaleOrderBookingForm.get('issueCodeType1').value
      this.CounterSaleOrderBookingForm.patchValue({ issueCodeType: concatissuetypecode });
      }
      else if (sessionStorage.getItem('deptName') === 'Accessories') {
        this.CounterSaleOrderBookingForm.patchValue({ transactionTypeName: 'Accessories Sale - Credit' });
        this.CounterSaleOrderBookingForm.patchValue({ issueCodeType1: 'Regular Sales' });
        this.CounterSaleOrderBookingForm.patchValue({ issueCode: 'CM03' });
        var concatissuetypecode = this.CounterSaleOrderBookingForm.get('issueCode').value + '-' + this.CounterSaleOrderBookingForm.get('issueCodeType1').value
        this.CounterSaleOrderBookingForm.patchValue({ issueCodeType: concatissuetypecode });
      }
      else {
        this.CounterSaleOrderBookingForm.patchValue({ transactionTypeName: '--Select--' });
        this.CounterSaleOrderBookingForm.patchValue({ issueCodeType: '--Select--' });
      }
      this.CounterSaleOrderBookingForm.patchValue({ createOrderType: 'Pick Ticket' });

      if (this.CounterSaleOrderBookingForm.get('transactionTypeName').value === 'Spares Sale - Credit' || this.CounterSaleOrderBookingForm.get('transactionTypeName').value === 'Accessories Sale - Credit') {
        this.PaymentButton = false;
      }
      else {
        this.PaymentButton = true;
      }
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

    this.onOptionsSelectedCategory(this.invType, 0);
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
          if (this.deptName === 'Spares') {
            for (let i = 0; i < data1.length; i++) {
              if (data1[i].code != 'SS_SPARES') {
                this.categoryList.splice(i, 1)
              }
            }

          }
        }
      );
    //Get Order type credit /cash
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

    // this.orderManagementService.priceListNameList1(sessionStorage.getItem('ouId'), (sessionStorage.getItem('divisionId')))
    //   .subscribe(
    //     data => {
    //       this.priceListNameList = data;
    //       for (let i = 0; i < data.length; i++) {
    //         if (data[i].ouId === 999) {
    //           this.CounterSaleOrderBookingForm.patchValue({ priceListName: data[i].priceListName })
    //           this.CounterSaleOrderBookingForm.patchValue({ priceListId: data[i].priceListHeaderId })
    //         }
    //       }
    //     }
    //   );


      this.orderManagementService.priceListNameListouwise(sessionStorage.getItem('ouId'), (sessionStorage.getItem('divisionId')), sessionStorage.getItem('deptId'))
      .subscribe(
        data => {
          this.priceListNameList = data;
          for (let i = 0; i < data.length; i++) {
            this.CounterSaleOrderBookingForm.patchValue({ priceListName: data[i].priceListName })
            this.CounterSaleOrderBookingForm.patchValue({ priceListId: data[i].priceListHeaderId })
          }
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
    this.displayShowLinseTab = false;
    this.isVisible = true;
    this.isDisabled = true;
    this.isDisabled = true;
    this.isDisabled5 = true;
    // alert(this.isDisabled)
    // alert(this.op)
    this.emplId = Number(sessionStorage.getItem('emplId'))
    this.orderlineDetailsArray().clear();
    this.TaxDetailsArray().clear();
    this.displaycustAccountNo = false;
    this.displaycreateOrderType = false;
    this.displayCustomerSite = false;
    // alert(this.displayCustomerSite);
    this.orderManagementService.counterSaleOrderSearchNew(orderNumber, sessionStorage.getItem('locId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
            this.lstgetOrderTaxDetails = data.obj.taxAmounts;
            this.allDatastore = data.obj;
            if (data.obj.discType === 'Header Level Discount') {
              this.onOptionsSelectedDiscountType(data.obj.discType);
              this.CounterSaleOrderBookingForm.patchValue({ disPer: data.obj.disPer })
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
            // this.totTax = data.obj.totTax;
            // this.totAmt = data.obj.totAmt;
            // this.subtotal = data.obj.subtotal;
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
              // alert('check for tax details')
              let controlinv = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
              (controlinv.controls[k]).patchValue({
                totTaxAmt: data.obj.taxAmounts[k].totTaxAmt,
              });
              this.TaxDetailsArray().disabled;
            }
            this.CounterSaleOrderBookingForm.patchValue({ orderedDate: data.obj.orderedDate });
            this.CounterSaleOrderBookingForm.get('orderedDate').disable();
            if (data.obj.orderStatus != 'BOOKED' && data.obj.trxNumber != null) {
              this.isVisible = true;
            }
            else {
              this.isVisible = false;
            }
            this.CounterSaleOrderBookingForm.controls['emplId'].patchValue(Number(sessionStorage.getItem('emplId')));
            if (this.allDatastore.createOrderType === 'Pick Ticket' && this.allDatastore.flowStatusCode === 'BOOKED') {
              this.isVisible = true;
              this.CounterSaleOrderBookingForm.get('custName').disable();
              this.CounterSaleOrderBookingForm.get('mobile1').disable();
              this.CounterSaleOrderBookingForm.get('refCustNo').disable();
              this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
              this.displayorderHedaerDetails = false;
              this.displaycounterSaleOrderSave = false;
              this.displaypickTicketInvoice = false;
              this.displaypickTicketUpdate = false;
              this.displayViewGatePass = true;
              this.displaycounterSaleOrderSave = false;
              for (let i = 0; this.allDatastore.oeOrderLinesAllList.length; i++) {
                if (this.allDatastore.oeOrderLinesAllList[i].flowStatusCode === 'BOOKED') {
                  this.displayLineflowStatusCode[i] = false;
                  this.displayRemoveRow[i] = false;
                }
                else if
                  (this.allDatastore.oeOrderLinesAllList[i].flowStatusCode === 'CANCELLED' && this.allDatastore.oeOrderLinesAllList[i].flowStatusCode === 'Invoiced') {
                  this.displayLineflowStatusCode[i] = true;
                }
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
            } else {
              this.displayAfterGatePass = true;
              this.isVisible = true;
            }
            // if (this.allDatastore.flowStatusCode === 'BOOKED' && this.allDatastore.paymentType === 'IMMEDIATE') {
            //   this.PaymentButton = false;
            // }
            if (data.obj.transactionTypeName === 'Accessories Sale - Cash' || data.obj.transactionTypeName === 'Spares Sale - Cash') {
              // this.paymentButton.nativeElement.hidden = true;
              this.PaymentViewReceipt = false;
            }
            else if (data.obj.transactionTypeName === 'Accessories Sale - Credit' || data.obj.transactionTypeName === 'Spares Sale - Credit') {
              this.PaymentButton = false;
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
    this.dataDisplay = 'Order Save in progress....Do not refresh the Page';
    const formValue: ISalesBookingForm = this.CounterSaleOrderBookingForm.value;
    // var orderLines = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    // for (let i=0;i<orderLines.length; i++){
    //   orderLines[i].taxCategoryName=orderLines[i].taxCategoryName.taxCategoryName;
    // }
    this.orderManagementService.UpdateCounterSaleInv(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message + 'res.message');
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.OrderFind(this.orderNumber);
        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert(res.message + 'res.message');
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.CounterSaleOrderBookingForm.reset();
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
        this.CounterSaleOrderBookingForm.get('othRefNo').enable();
        this.othRefNoSearch();
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


  onOptionsSelectedCategory(itemType: string, lnNo: number) {
    if (this.itemMap2.get(lnNo) != undefined) {
      return;
    }
    if (this.itemMap.has(itemType)) {
      var itemsList = this.itemMap.get(itemType);
      this.itemMap2.set(lnNo, this.itemMap.get(itemType));
    } else {
    }
    this.invItemList1 = this.itemMap.get(itemType);
    this.orderManagementService.getItemByCatType(itemType, this.divisionId)
      .subscribe(
        data => {
          this.orderedItem = data.description;
          this.itemMap.set(itemType, data);
          this.itemMap2.set(lnNo, this.itemMap.get(itemType));
        }
      );

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
    this.service.searchCustomerByAccount(custAccountNo)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.displayShowLinseTab = false;
            this.selCustomer = data.obj;
            this.custSiteList = data.obj.customerSiteMasterList;
            this.CounterSaleOrderBookingForm.patchValue(data.obj);
            this.CounterSaleOrderBookingForm.patchValue({ name: this.custSiteList[0].siteName });
            let select = this.payTermDescList.find(d => d.lookupValueId === this.selCustomer.termId);
            this.CounterSaleOrderBookingForm.patchValue({ custAccountNo: custAccountNo });
            this.CounterSaleOrderBookingForm.patchValue({ paymentType: select.lookupValue })
            this.paymentType = select.lookupValue;
            this.CounterSaleOrderBookingForm.get('custName').disable();
            this.CounterSaleOrderBookingForm.get('mobile1').disable();
            if (this.custSiteList.length === 1) {
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
            this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
            this.isDisabled3 = true;
            this.customerNameSearch.splice(0, this.customerNameSearch.length);
          }
          else {
            if (data.code === 400) {
              alert('res' + data.message);
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
    // alert(siteName)
    let selSite = this.custSiteList.find(d => d.siteName === siteName);
    console.log(selSite);

    if (selSite.ouId != (sessionStorage.getItem('ouId'))) {
      alert('First Create OU wise Site to continue process!')
    }
    else {
      this.CounterSaleOrderBookingForm.patchValue(selSite);
      this.custName = this.selCustomer.custName;
      this.customerId = this.selCustomer.customerId;
      this.custAddress = (selSite.address1 + ', '
        + selSite.address2 + ', '
        + selSite.address3 + ', '
        + selSite.address4 + ', '
        + selSite.city + ', '
        + selSite.pinCd + ', '
        + selSite.state);
      this.birthDate = this.selCustomer.birthDate;
      this.taxCategoryName = selSite.taxCategoryName;
      this.weddingDate = this.selCustomer.weddingDate;
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
    // if (Number(sessionStorage.getItem('divisionId')) === 2) {
    //   this.service.crediteLimitFn(this.selCustomer.customerId, sessionStorage.getItem('locId'), selSite.customerSiteId)
    //     .subscribe(
    //       data => {
    //         if (data.code === 200) {
    //         }
    //       })
    // }

    if (Number(sessionStorage.getItem('divisionId')) === 2) {
      this.service.crediteLimitFn(this.selCustomer.customerId, sessionStorage.getItem('locId'), selSite.customerSiteId)
        .subscribe(
          data => {
            if (data.code === 200) {
              var credAmt = this.CounterSaleOrderBookingForm.get('creditAmt').value;
              var newCrmAmt1 = Math.round(((data.obj.outStandingAmt) + Number.EPSILON) * 100) / 100;
              this.CounterSaleOrderBookingForm.patchValue({ creditAmt: newCrmAmt1 });
              this.CounterSaleOrderBookingForm.patchValue({ creditDays: data.obj.creditDays });
              this.CounterSaleOrderBookingForm.patchValue({ daysMsg: data.obj.daysMsg });
            }
          })
    }
    if (Number(sessionStorage.getItem('deptId'))===6){
      this.transactionTypeName = 'Accessories Sale - Credit';
    }
    else if (Number(sessionStorage.getItem('deptId'))===5){
    this.transactionTypeName = 'Spares Sale - Credit';
  }
    this.CounterSaleOrderBookingForm.patchValue({ createOrderType: 'Pick Ticket' });

    this.orderManagementService.getTaxCategoriesForSales(selSite.taxCategoryName, 28)
    .subscribe(
      data1 => {
       this.taxCatMap.set(28, data1);
      
      }
    );
  
    this.orderManagementService.getTaxCategoriesForSales(selSite.taxCategoryName, 18)
    .subscribe(
      data1 => {
       this.taxCatMap.set(18, data1);
      
      }
    );
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


  salesOrderDetails(event){
    // alert(event.target.value); 
    var orderNumber=event.target.value;
    let orderNumberDetails = this.othRefNoSearchFnData.find(d => Number(d.orderNumber1) === Number(orderNumber));
    console.log(orderNumberDetails);
    this.salesRepName = orderNumberDetails.salesRepName1;
    this.tlName = orderNumberDetails.tlName1;
    this.paymentType = orderNumberDetails.paymentType1;
  }

  othRefNoSearch() {
    var customerId= this.CounterSaleOrderBookingForm.get('customerId').value;
      this.orderManagementService.othRefNoSearchFn(sessionStorage.getItem('locId'),1,customerId)
        .subscribe(
          data => {
            if (data.code === 200) {
              this.othRefNoSearchFnData = data.obj;
              this.CounterSaleOrderBookingForm.patchValue(this.othRefNoSearchFnData);
          //  alert(data.obj.length)
              for (let i=0; i< data.obj.length; i++){
              if (this.custAccountNo != this.othRefNoSearchFnData[i].custAccountNo1) {
                alert('Sales Order Customer & Counter Sale Order Customer Not Match');
                this.CounterSaleOrderBookingForm.get('othRefNo').reset()
                return;
              }
              else {
                this.othRefNo = data.obj[i].orderNumber1;
              }
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
            // this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
            // this.CounterSaleOrderBookingForm.get('custName').disable();
            // this.CounterSaleOrderBookingForm.get('mobile1').disable();
            this.custAddress = data.obj.billToAddress;
            this.custAccountNo = data.obj.accountNo;
          }
          else {
            if (data.code === 400) {
              alert(data.message);
              this.displaycreateCustomer = false;
              // this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
              // this.CounterSaleOrderBookingForm.get('custName').disable();
              // this.CounterSaleOrderBookingForm.get('mobile1').disable();
            }
          }
          //   for (let i=0; i <= this.contactNoSearchData.length ; i++){
          //     // alert(this.contactNoSearchData.length );
          //   if (this.contactNoSearchData.length >= 1){
          //   this.CounterSaleOrderBookingForm.patchValue(this.contactNoSearchData);
          //   this.custAddress=data.obj.billToAddress;
          //   console.log( this.custAddress);

          //   this.custAccountNo=this.contactNoSearchData[i].accountNo;
          //   this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
          //   this.CounterSaleOrderBookingForm.get('custName').disable();
          // }
          // else{
          //   if (this.contactNoSearchData.length <= 1){
          //   alert('Customer Not Found! Please create New Customer.')
          //   this.displaycreateCustomer=false;
          //   this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
          //   this.CounterSaleOrderBookingForm.get('custName').disable();
          //   this.CounterSaleOrderBookingForm.get('mobile1').disable();
          //   }
          //   else{
          //   alert('Multiple Customer Available please contact to IT.')
          // }
          // }
          // }
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



  validate(index: number, qty1, Avalqty) {

    var trxLnArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray
    let uomCode = trxLnArr[index].uom;
    let segment = trxLnArr[index].segment;
    if (qty1 > Avalqty) {
      // alert("Order Quantity is more than Available quantity for item "+ segment);
      this.errList = "Order Quantity is more than Available quantity for item " + segment;
      // this.CounterSaleOrderBookingForm.patchValue({errorList:errList});
      console.log(this.errList);
      trxLnArr1.controls[index].patchValue({ pricingQty: '0' });
      return false;
    }

    if (qty1 <= 0) {
      alert("Please enter quantity more than zero");
      trxLnArr1.controls[index].patchValue({ quantity: '' });
      (<any>trxLnArr[index].get('pricingQty')).nativeElement.focus();
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
    return true;
  }

  onKey(index) {
    alert('on call')
    var arrayControl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    console.log(index);
    var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    console.log(arrayControl);
    var itemId = arrayControl[index].itemId;
    var taxcatName = arrayControl[index].taxCategoryName;
    console.log(arrayControl[index].taxCategoryName);
    let select = this.taxCategoryList[index].find(d => d.taxCategoryName === taxcatName.taxCategoryName);
    var taxCategoryId = select.taxCategoryId;
    patch.controls[index].patchValue({ taxCategoryId: taxCategoryId });
    patch.controls[index].patchValue({ taxCategoryName: select });
    patch.controls[index].patchValue({ disAmt: 0 });
    var baseAmt = arrayControl[index].unitSellingPrice * arrayControl[index].pricingQty;
    console.log(baseAmt);
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
          (patch.controls[index]).patchValue({
            baseAmt: baseAmt,
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
        });
    // }
  }




  onOptionsSelectedDescription(segment: any, k) {
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
      let select = (this.itemMap.get(itemType)).find(d => d.segment === segment);
      //this.CounterSaleOrderBookingForm.patchValue({ itemId: select.itemId })
      this.itemId = select.itemId;
      // var siteName1 = this.CounterSaleOrderBookingForm.get('name').value;
      // let selSite = this.custSiteList.find(d => d.siteName === siteName1);
      const custtaxCategoryName = this.CounterSaleOrderBookingForm.get('taxCategoryName').value;
      var priceListId = this.CounterSaleOrderBookingForm.get('priceListId').value;
      if (custtaxCategoryName === 'Sales-IGST') {
        alert(custtaxCategoryName);
        this.orderManagementService.addonDescList1(segment, custtaxCategoryName, priceListId)
          .subscribe(
            data => {
              if (data.code === 200) {
                this.addonDescList = data.obj;
                for (let i = 0; i < data.obj.length; i++) {
                  var itemtaxCatNm: string = data.obj[i].taxCategoryName;
                  if (itemtaxCatNm.includes('Sale-I-GST')) {
                    alert(itemtaxCatNm);
                    (controlinv.controls[k]).patchValue({
                      itemId: data.obj[i].itemId,
                      orderedItem: data.obj[i].description,
                      hsnSacCode: data.obj[i].hsnSacCode,
                      uom: data.obj[i].uom,
                      unitSellingPrice: data.obj[0].priceValue,
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
                  this.service.getfrmSubLoc(this.locId, select.itemId, this.subInventoryId).subscribe(
                    data => {
                      console.log(data);
                      if (data.length === 0) {
                        // alert('Locator Not Found!.');
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
                        }
                        else {
                          controlinv.controls[k].patchValue({ frmLocator: getfrmSubLoc[0].segmentName });
                          controlinv.controls[k].patchValue({ frmLocatorId: getfrmSubLoc[0].locatorId });
                          controlinv.controls[k].patchValue({ onHandQty: getfrmSubLoc[0].onHandQty })
                          controlinv.controls[k].patchValue({ id: getfrmSubLoc[0].id });
                        }
                        this.service.getreserqty(this.locId, select.itemId).subscribe
                          (data => {
                            this.resrveqty = data;
                            controlinv.controls[k].patchValue({ resveQty: this.resrveqty });
                            this.AvailQty(k, select.itemId);
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
              this.addonDescList = data; //// item iformation
              for (let i = 0; i < data.length; i++) {
                var taxCatNm: string = data[i].taxCategoryName;
                if (taxCatNm.includes('Sale-S&C')) {
                  (controlinv.controls[k]).patchValue({
                    itemId: data[i].itemId,
                    orderedItem: data[i].description,
                    hsnSacCode: data[i].hsnSacCode,
                    // taxCategoryId: data[i].taxCategoryId,
                    // taxCategoryName: data[i].taxCategoryName,
                    uom: data[i].uom,
                    unitSellingPrice: data[i].priceValue,
                  });

                  this.orderManagementService.getTaxCategoriesForSales(custtaxCategoryName, data[i].taxPercentage)
                    .subscribe(
                      data1 => {
                        this.taxCategoryList[k] = data1;
                        this.allTaxCategoryList[k] = data1;

                        let itemCateNameList = this.taxCategoryList[k].find(d => d.taxCategoryName === data[i].taxCategoryName);
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
                this.service.getfrmSubLoc(this.locId, select.itemId, this.subInventoryId).subscribe(
                  data => {
                    console.log(data);
                    if (data.length === 0) {
                      // alert('Locator Not Found!.');
                      var lotList = [{ locatorId: 0, segmentName: 'Not Found' }]
                      controlinv.controls[k].patchValue({ frmLocatorId: lotList });
                      controlinv.controls[k].patchValue({ onHandQty: 0 });
                      controlinv.controls[k].get('frmLocatorId').disable()
                      return;
                    } else {
                      var getfrmSubLoc = data;
                      this.locData[k] = data;
                      
                      // let select = this.locData.find(d => d.frmLocatorId === getfrmSubLoc[0].locatorId);
                      controlinv.controls[k].get('frmLocatorId').enable();
                      if (getfrmSubLoc.length == 1) {
                        controlinv.controls[k].patchValue({ onHandId: getfrmSubLoc[0].segmentName });
                        controlinv.controls[k].patchValue({ frmLocatorId: getfrmSubLoc[0].locatorId });
                        controlinv.controls[k].patchValue({ frmLocator: getfrmSubLoc[0].segmentName });
                        controlinv.controls[k].patchValue({ onHandQty: getfrmSubLoc[0].onHandQty });
                        controlinv.controls[k].patchValue({ id: getfrmSubLoc[0].id });
                      }
                      else {
                        controlinv.controls[k].patchValue({ frmLocator: getfrmSubLoc[0].segmentName });
                        controlinv.controls[k].patchValue({ frmLocatorId: getfrmSubLoc[0].locatorId });
                        controlinv.controls[k].patchValue({ onHandQty: getfrmSubLoc[0].onHandQty })
                        controlinv.controls[k].patchValue({ id: getfrmSubLoc[0].id });
                      }
                      this.service.getreserqty(this.locId, select.itemId).subscribe
                        (data => {
                          this.resrveqty = data;
                          controlinv.controls[k].patchValue({ resveQty: this.resrveqty });
                          this.AvailQty(k, select.itemId);
                        });
                    }
                  });
              }
            });
      }
    }

  }

  AvailQty(i, itemId) {
    var trxLnArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    if (itemId === undefined) {
      itemId = trxLnArr[i].itemId;
    }
    var locId = trxLnArr[i].frmLocatorId;
    var onhandid = trxLnArr[i].id;
    if (locId != null) {
      this.service.getonhandqty(Number(sessionStorage.getItem('locId')), this.subInventoryId, locId, itemId).subscribe
        (data => {
          this.onhand1 = data.obj;
          console.log(this.onhand1);
          var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
          trxLnArr1.controls[i].patchValue({ onHandQty: data.obj });
          let onHand = data.obj;
          let reserve = trxLnArr[i].resveQty;
          let avlqty1 = 0;
          avlqty1 = onHand - reserve;
          var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
          trxLnArr1.controls[i].patchValue({ Avalqty: avlqty1 });
          let arrayControl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
          var pricingQty = arrayControl[i].pricingQty;
          var Avalqty = avlqty1;
          var isvalidqty = this.validate(i, pricingQty, Avalqty);
          if (isvalidqty == false) {
            return;
          }
          this.onKey(i);
        })


    }
    else {
      // alert('Locator Not Found!.')
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



  // counterSaleOrderSave(){}


  transData(val) {
    return val;
  }


  pickTicketInvoiceFunction() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Invoice Generating....Do not refresh the Page';
    const formValue: ISalesBookingForm = this.transData(this.CounterSaleOrderBookingForm.value);
    formValue.ouId = Number(sessionStorage.getItem('ouId'));
    formValue.emplId = Number(sessionStorage.getItem('emplId'));
    formValue.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.orderManagementService.pickTicketInvoiceFun(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.InvoiceNumber = res.obj;
        this.dataDisplay = ''
        this.closeResetButton = true;
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
          // this.SalesOrderBookingForm.reset();
        }
      }
    });
  }


  counterSaleOrderSave() {
    var orderLines = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    for (let j = 0; j < orderLines.length; j++) {
      if (orderLines[j].segment === '' && orderLines[j].taxCategoryName === '' && orderLines[j].pricingQty === '') {
        alert('First Select Line Details..!');
        return;
      }
      if (orderLines[j].unitSellingPrice === '') {
        alert('Line No' + j + 'Amount is Zero please confirm')
      }
      if (orderLines[j].pricingQty === 0) {
        alert('Line No' + ' ' + j + 1 + ' ' + 'Quantity is Zero please confirm');
        this.closeResetButton = true;
        this.dataDisplay = ''
        this.isDisabled = false;
        return;
      }
      // alert(orderLines[j].segment.length)
      if (orderLines[j].segment.length > 8) {
        alert('Line No' + ' ' + orderLines[j].segment + ' ' + 'Select Item Is Wrong... Please confirm');
        this.closeResetButton = true;
        this.dataDisplay = ''
        this.isDisabled = false;
        return;
      }
    }
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Order Save in progress....Do not refresh the Page';
    // for (let i = 0; i < orderLines.length; i++) {
    //   orderLines[i].taxCategoryName = orderLines[i].taxCategoryName.taxCategoryName;
    // }
    // let jsonData = this.CounterSaleOrderBookingForm.value;
    let jsonData = this.CounterSaleOrderBookingForm.getRawValue();

    jsonData.orderedDate = this.pipe.transform(this.now, 'yyyy-MM-dd');
    jsonData.refCustNo = this.CounterSaleOrderBookingForm.get('refCustNo').value;
    // alert(jsonData.refCustNo);
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
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled5 = true;
        console.log(this.orderNumber);
        alert(res.message);
        this.orderNumber = res.obj;
        // this.orderNumber=this.CounterSaleOrderBookingForm.get('orderNumber').value;
        console.log(this.orderNumber);
        this.OrderFind(this.orderNumber);
      } else {
        if (res.code === 400) {
          alert(res.message);
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
    // alert(this.CounterSaleOrderBookingForm.get('disPer').value)

    this.displayRemoveRow.push(true);
    this.displayCounterSaleLine.push(true);
    this.displayLineflowStatusCode.push(true);
    this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
    var len = this.orderlineDetailsArray().length;
    var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray
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

  }

  RemoveRow(OrderLineIndex) {
    // alert(OrderLineIndex)
    this.orderlineDetailsArray().removeAt(OrderLineIndex);
    this.TaxDetailsArray().removeAt(OrderLineIndex);
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




  onOptionsSelectedTransactionType(transactionTypeName) {
    if (transactionTypeName != undefined) {
      this.displayCSOrderAndLineDt = false;
      let select = this.orderTypeList.find(d => d.transactionTypeName === this.transactionTypeName);
      console.log(select);
      // alert(select.transactionTypeId)
      this.CounterSaleOrderBookingForm.patchValue({ transactionTypeId: select.transactionTypeId })
      if (transactionTypeName === 'Accessories Sale - Cash' || transactionTypeName === 'Spares Sale - Cash') {
        this.PaymentButton = true
      }
      else {
        this.PaymentButton = false;
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


  errList: any = [];
 
  uploadFile(event: any) {
    // alert(event)
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'File Upload in progress....Do not refresh the Page';
    event.target.disabled = true;
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0])
    var priceListName = this.CounterSaleOrderBookingForm.get('priceListName').value;
    var siteName1 = this.CounterSaleOrderBookingForm.get('name').value;
    let selSite = this.custSiteList.find(d => d.siteName === siteName1);
    //const taxCategoryName = selSite.taxCategoryName;
    const subInvID = this.subInvCode.subInventoryId;
    // alert(subInvID);
    const custtaxCategoryName = selSite.taxCategoryName;
    this.service.bulkPickTickCSV(formData, priceListName, custtaxCategoryName, subInvID,
      sessionStorage.getItem('locId'), selSite.customerSiteId).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.orderlineDetailsArray().clear();
          let control = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
          let control1 = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
          for (let i = 0; i <= res.obj.length - 1; i++) {
            var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
            control.push(oeOrderLinesAllList1);
            this.displaysegmentInvType[i] = true;
            this.displayRemoveRow[i] = true;
            this.displayLineflowStatusCode.push(true);
            this.displayCounterSaleLine.push(false);
            if (res.obj[i].onhandList.length === 0) {
              this.errList.push("Stock Not avaliable for - " + res.obj[i].segment);
            }
                     
          }
          this.CounterSaleOrderBookingForm.patchValue(res.obj);

          for (let k = 0; k < res.obj.length; k++) {
           
            if(this.taxCatMap.has(res.obj[k].gstPercentage)){
              this.taxCategoryList[k] =this.taxCatMap.get(res.obj[k].gstPercentage);
            }else{
              
            this.orderManagementService.getTaxCategoriesForSales(custtaxCategoryName, res.obj[k].gstPercentage)
            .subscribe(
              data1 => {
                this.taxCategoryList[k] = data1;
                this.taxCatMap.set(res.obj[k].gstPercentage, data1);
                console.log(this.taxCategoryList[k]);
               
                this.allTaxCategoryList[k] = data1;
              }
            );
          }
         
          let itemCateNameList = this.taxCategoryList[k].find(d => d.taxCategoryId === res.obj[k].taxCategoryId);
          
            let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
           
            this.locData[k] = res.obj[k].onhandList;
            (controlinv.controls[k]).patchValue({
              lineNumber: res.obj[k].lineNumber,
              disPer: selSite.disPer,
              invType: res.obj[k].invType,
              segment: res.obj[k].segment,
              orderedItem:res.obj[k].orderedItem,
              Avalqty: res.obj[k].avalqty,
              pricingQty: res.obj[k].pricingQty,
              orderedQty: res.obj[k].orderedQty,
              unitSellingPrice: res.obj[k].unitSellingPrice,
              baseAmt: res.obj[k].baseAmt,
              disAmt: res.obj[k].disAmt,
              taxAmt: res.obj[k].taxAmt,
              totAmt: res.obj[k].totAmt,
              hsnSacCode: res.obj[k].hsnSacCode,
              flowStatusCode: 'BOOKED',
              itemId: res.obj[k].itemId,
              taxCategoryName: itemCateNameList.taxCategoryName,
              taxCategoryId: res.obj[k].taxCategoryId,
              })
            if(res.obj[k].onhandList.length >=1){
              (controlinv.controls[k]).patchValue({frmLocatorId: res.obj[k].onhandList[0].locatorId})
            }

            if(res.obj[k].pricingQty > res.obj[k].avalqty) {
              (controlinv.controls[k]).patchValue({pricingQty: res.obj[k].avalqty})
            }

           
            // this.onOptionsSelectedDescriptionNew(res.obj[k].segment, res.obj[k].itemId,k)
          }
        }
        else {
          if (res.code === 400) {
            alert(res.message + "--" + res.obj.length);

            if (res.obj != undefined && res.obj.length > 0) {
              this.errList = res.obj;
            }
            this.dataDisplay = 'File Uploading given error...'
            this.closeResetButton = true;
          }
        }
      })

    setTimeout(() => {
      event.target.disabled = false;
    }, 60000);
  }



  onOptionsSelectedDescriptionNew(segment: any, itemId: any, k) {
    this.displayorderHedaerDetails = false;
    var orderedDate = this.pipe.transform(this.now, 'dd-MM-yyyy');
    this.CounterSaleOrderBookingForm.patchValue({ 'orderedDate': orderedDate });
    this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
    this.CounterSaleOrderBookingForm.get('name').disable();
    this.CounterSaleOrderBookingForm.get('custName').disable();
    this.CounterSaleOrderBookingForm.get('mobile1').disable();
    this.CounterSaleOrderBookingForm.get('refCustNo').disable();
    if (Number(sessionStorage.getItem('divisionId')) === 2) {
      this.displayDMSCDMS = false;
      this.showApplyDiscount = true;
      if (sessionStorage.getItem('deptName') === 'Spares') {
        this.CounterSaleOrderBookingForm.patchValue({ transactionTypeName: 'Spares Sale - Credit' });
        this.CounterSaleOrderBookingForm.patchValue({ issueCodeType: 'Regular Sales' });
      }
      else if (sessionStorage.getItem('deptName') === 'Accessories') {
        this.CounterSaleOrderBookingForm.patchValue({ transactionTypeName: 'Accessories Sale - Credit' });
        this.CounterSaleOrderBookingForm.patchValue({ issueCodeType: 'Regular Sales' });
      }
      else {
        this.CounterSaleOrderBookingForm.patchValue({ transactionTypeName: '--Select--' });
        this.CounterSaleOrderBookingForm.patchValue({ issueCodeType: '--Select--' });
      }
      this.CounterSaleOrderBookingForm.patchValue({ createOrderType: 'Pick Ticket' });

      if (this.CounterSaleOrderBookingForm.get('transactionTypeName').value === 'Spares Sale - Credit' || this.CounterSaleOrderBookingForm.get('transactionTypeName').value === 'Accessories Sale - Credit') {
        this.PaymentButton = false;
      }
      else {
        this.PaymentButton = true;
      }
    }
    if (this.CounterSaleOrderBookingForm.get('createOrderType').value === 'Sales Order' && this.CounterSaleOrderBookingForm.get('othRefNo').value === undefined) {
      alert('Please Enter Reference Number First !');
      this.CounterSaleOrderBookingForm.get('segment').disable();
      this.orderlineDetailsArray().get('segment').disable();
      (<any>this.CounterSaleOrderBookingForm.get('othRefNo')).nativeElement.focus();
    }
    else {
      let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
      var itemType = (controlinv.controls[k]).get('invType').value;
      // let select = (this.itemMap.get(itemType)).find(d => d.segment === segment);
      var siteName1 = this.CounterSaleOrderBookingForm.get('name').value;k
      let selSite = this.custSiteList.find(d => d.siteName === siteName1);
      const custtaxCategoryName = selSite.taxCategoryName;
      var priceListId = this.CounterSaleOrderBookingForm.get('priceListId').value;
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
                if (itemId != null) {
                  let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
                  var invTp = controlinv.controls[k].get('invType').value;
                  this.service.getfrmSubLoc(this.locId, itemId, this.subInventoryId).subscribe(
                    data => {
                      console.log(data);
                      if (data.length === 0) {
                        // alert('Locator Not Found!.');
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
                        }
                        else {
                          controlinv.controls[k].patchValue({ frmLocator: getfrmSubLoc[0].segmentName });
                          controlinv.controls[k].patchValue({ frmLocatorId: getfrmSubLoc[0].locatorId });
                          controlinv.controls[k].patchValue({ onHandQty: getfrmSubLoc[0].onHandQty })
                          controlinv.controls[k].patchValue({ id: getfrmSubLoc[0].id });
                        }
                        this.service.getreserqty(this.locId, itemId).subscribe
                          (data => {
                            this.resrveqty = data;
                            controlinv.controls[k].patchValue({ resveQty: this.resrveqty });
                            this.AvailQty(k, itemId);
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
                if (itemId != null) {
                  let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
                  var invTp = controlinv.controls[k].get('invType').value;
                  this.service.getfrmSubLoc(this.locId, itemId, this.subInventoryId).subscribe(
                    data => {
                      console.log(data);
                      if (data.length === 0) {
                        // alert('Locator Not Found!.');
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
                        }
                        else {
                          controlinv.controls[k].patchValue({ frmLocator: getfrmSubLoc[0].segmentName });
                          controlinv.controls[k].patchValue({ frmLocatorId: getfrmSubLoc[0].locatorId });
                          controlinv.controls[k].patchValue({ onHandQty: getfrmSubLoc[0].onHandQty })
                          controlinv.controls[k].patchValue({ id: getfrmSubLoc[0].id });
                        }
                        this.service.getreserqty(this.locId, itemId).subscribe
                          (data => {
                            this.resrveqty = data;
                            controlinv.controls[k].patchValue({ resveQty: this.resrveqty });
                            this.AvailQty(k, itemId);
                          });
                      }
                    });
                }
              }
              else if (data.code === 400) {
                alert(data.message);
              }
            });
      }
    }
    // this.onKey(k);
  }


  reloadlineAndTaxArray() {
    this.orderlineDetailsArray().clear();
    this.TaxDetailsArray().clear();
    this.CounterSaleOrderBookingForm.get('files').reset();
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



  onOptionsSelectedissueTypeCode(event: any) {
    let selectIssueCode = this.issueCodeTypeList.find(d => d.codeDesc === event);
    this.CounterSaleOrderBookingForm.patchValue({ issueCode: selectIssueCode.code })
    var concatissuetypecode = this.CounterSaleOrderBookingForm.get('issueCode').value + '-' + this.CounterSaleOrderBookingForm.get('issueCodeType1').value
    this.CounterSaleOrderBookingForm.patchValue({ issueCodeType: concatissuetypecode });
  }
}