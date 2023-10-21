import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DateRangePickerComponent } from 'ngx-daterange';
import { IDateRange, IDateRangePickerOptions } from 'ngx-daterange';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { DatePipe } from '@angular/common';
import { ManualInvoiceObjNew } from './manual-invoice-obj-new';
import { InvoiceSearchNew } from './invoice-search-new';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { data } from 'jquery';
import { async } from 'rxjs/internal/scheduler/async';


interface IpoInvoice {
  suppInvDate: Date;
  invoiceDate: Date;
  termsDate: Date;
  title: string;
  invLineNumber: number;
  suppNo: number;
  suppId: number;
  ouName: string;
  invoiceNum: string;
  invoiceAmt: number;
  termsId: number;
  glDate: Date;
  currency: string;
  segment1: string;
  name: string;
  siteName: string;
  taxAmt: number;
  internalSeqNum: number;
  paymentRateDate: Date;
  distributionSet: number;
  matchAction: string;
  terms: string;
  paymentMethod: string;
  // paymentMethod:'CHEQUE';
  payGroup: string;
  prepayType: string;
  addonType: string;
  settlementDate: Date;
  taxationCountry: string;
  remitToSuppName: string;
  remitToBankAccount: string;
  remitToBankAccountNo: string;
  debitMemoReason: string;
  remitToSuppSite: string;
  invoiceId: number;
  ouId: number;
  description: string;
  totalDistAmt: number;
  totalDistBaseAmt: number;
  distLineNumber: number;
  distCodeCombId: number;
  invTransferStatus: string;
  lineNumber: number;
  lineTypeLookupCode: string;
  hsnSacCode: string;
  gstPercentage: number;
  emplId: number;

  thresHoldHdrId: number;
  thresHoldTypeId: number;
  // chassisNo: string;
  // description:string;
  voucherNum: number;
  remark: string;
  trxNumber: number;
}

interface ISearch {
  suppNo: number;
  name: string;//supplier name
  segment1: string;
  suppSiteId: number;
  invoiceNum: string;
  frminvoiceAmt: number;
  toinvoiceAmt: number;
  frminvoiceDate: Date;
  toinvoiceDate: Date;
  attribute1: string;//Invoice Status
  receiptNo: number;
  ouId: number;
}


interface glSearch{
  invoiceNum:string;
}

@Component({
  selector: 'app-payable-invoice-new',
  templateUrl: './payable-invoice-new.component.html',
  styleUrls: ['./payable-invoice-new.component.css']
})



export class PayableInvoiceNewComponent implements OnInit {

  @ViewChild('dateRangePicker', { static: true })
  dateRangePicker: DateRangePickerComponent;
  indexVal: number;
  locId: number;
  locCode: string;
  partyId:number;
  source: string;
  taxAmount: number;
  tdsTotAmt: number;
  tdsBasicAmt: number;
  tottdsAmt: number;
  tdsTotDiscAmt: number;
  supTdsYN: string;
  userList3: any[] = [];
  chassisNoList: any = [];
  lastkeydown3: number = 0;
  userList4: any[] = [];
  userList5: any[] = [];
  lastkeydown4: number = 0;
  itemSeg: string;
  firstFieldEmittedValue: IDateRange;
  isSearchPatch: boolean = false;
  firstFieldOptions: IDateRangePickerOptions = {
    autoApply: false,
    format: 'MM/DD/YYYY',
    icons: 'material',
    minDate: moment().subtract(10, 'years'),
    maxDate: moment().add(3, 'years'),
    preDefinedRanges: [
      {
        name: 'Last Week',
        value: {
          start: moment().subtract(1, 'week').startOf('week'),
          end: moment().subtract(1, 'week').endOf('week')
        }
      },
      {
        name: 'Two Weeks Ago',
        value: {
          start: moment().subtract(2, 'week').startOf('week'),
          end: moment().subtract(2, 'week').endOf('week')
        }
      }
    ],
    validators: Validators.required,
  }

  secondFieldOptions: IDateRangePickerOptions = {
    autoApply: false,
    clickOutsideAllowed: false,
    format: 'MM/DD/YYYY',
    icons: 'font-awesome',
    minDate: moment().subtract(10, 'years'),
    maxDate: moment().add(1, 'year'),
  }

  rightFieldOptions: IDateRangePickerOptions = {
    format: 'MM/DD/YYYY',
    icons: 'material',
    minDate: moment().subtract(2, 'years'),
    maxDate: moment().add(1, 'year'),
    position: 'right',
  }

  singleFieldOptions: IDateRangePickerOptions = {
    autoApply: true,
    clickOutsideAllowed: false,
    format: 'MM/DD/YYYY',
    icons: 'material',
    labelText: 'Single Picker',
    minDate: moment().subtract(2, 'years'),
    maxDate: moment().add(1, 'year'),
    singleCalendar: true,
  }

  invLineItemId: number;
  invLineNo: number;
  form: FormGroup = null;
  poInvoiceForm: FormGroup;
  emplId: number;
  showModal: boolean;
  content: number;
  title: string;
  invLineNumber: number;
  suppNo: number;
  suppId: number;
  ouName: string;
  invoiceNum: string;
  invoiceAmt: number;
  internalSeqNo: number;
  invDescription: string;
  baseAmount: number;
  amount: number;
  invoiceDistId: number;
  // segment1:string
  lookupValue: string;
  internalSeqNum: number;

  // invoiceDate:Date;
  pipe = new DatePipe('en-US');
  now = Date.now();
  isVisible: boolean = true;
  isVisible1: boolean = true;
  isVisibleUpdateBtn: boolean = false;
  isVisibleAPCancelled: boolean = false;
  isVisiblePayment: boolean = false;
  isVisibleCancel: boolean = false;
  isVisibleSave: boolean = true;
  isVisibleValidate: boolean = false;
  isVisibleSaveTDS: boolean = false;
  isVisibleviewAccounting: boolean = false;
  isVisibleTDSTab: boolean = false;
  isVisiblepayGroupSelectList: boolean = false;
  isVisiblepayGroupGroupinput: boolean = false;
  isVisiblelineDetialsDeleteButton: boolean = false;
  isVisibleAddonType: boolean = false;
  isVisibleRoundOffButton: boolean = false;
  isVisiblepayDetail: boolean = false;
  displayPayData: boolean = false;
  // invoiceDate = this.pipe.transform(this.now, 'yyyy-MM-ddTHH:mm');
  // invoiceDate = this.pipe.transform(this.now, 'dd-MMM-yyyy');
  // accountingDate = new Date();
  suppInvDate: Date;
  termsDate: Date;
  termsId: number;
  itemType: string;
  taxCategoryId: number;
  taxCategoryName: string;
  hsnSacCodeList: any = [];
  displayTaxCategory = true;
  displayManualAP = false;
  // glDate:Date;
  //  glDate=this.pipe.transform(this.now, 'd-M-y h:mm:ss');
  // glDate = new Date();
  // public glDate =this.datepipe.transform(this.glDate1, 'yyyy-MM-dd');
  // pipe = new DatePipe('en-US');
  // now = Date.now();
  // glDate = this.pipe.transform(this.now, 'dd-MM-yyyy');

  // glDate = this.pipe.transform(this.now, 'dd-MMM-yyyy');
  // glDate:Date;
  glDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  invoiceDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  accountingDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  // paymentMethod = 'CHEQUE';
  showViewActLine = false;

  currency: 'INR';
  segment1: string;
  name: string;
  siteName: string;
  taxAmt: number;
  paymentRateDate: Date;
  distributionSet: number;
  matchAction: string;
  terms: string;
  distCodeCombId: string;
  // paymentMethod: string;
  // public paymentMethod = 'CHEQUE';
  payGroup: string;
  prepayType: string;
  addonType: string;
  settlementDate: Date;
  taxationCountry: string;
  remitToSuppName: string;
  remitToBankAccount: string;
  remitToBankAccountNo: string;
  debitMemoReason: string;
  remitToSuppSite: string;
  public tdsSectionList: any = [];
  // public tdsTaxCategoryList: Array<string> = [];
  tdsTaxCategoryList: any[];
  // public tdsTaxCategoryList1: Array<string> = [];
  tdsTaxCategoryList1: any[];
  lstTdsLineDetails: any[];
  lstTdsLine: any[];

  lstTdsTaxLineDetails: any[];
  displayinvoiceLine: Array<boolean> = [];
  hideArray: Array<boolean> = [];
  lstInvLineDeatails: any = [];
  lstInvLineDeatails1: any;
  distLinesDeatails: any[];
  // lines Details start
  public ItemDetailsList: any;
  invItemList: any[];
  invItemList1: any[];

  lessThanValue: number;
  greaterThanValue: number;

  invoiceId: number;
  ouId: number;
  description: string;
  totalDistAmt: number;
  totalDistBaseAmt: number;
  distLineNumber: number;
  invTransferStatus: string = "Not Validated";
  invoiceStatus: string;
  poChargeDesc: string = 'Unprocessed';
  dispStatus = true;
  displayTdsButton = false;
  showTdsLineDetails = true;
  tdsLineValidation = false;
  disDeleteButton = true;
  dispAccountCode = true;
  displayAddNewLine = true;
  displayViewTaxDetails = true;
  disTdsTaxCategoryName = true;
  viewAccounting2: any[];
  viewAccounting1: any[];
  periodName: string;
  postedDate: Date;
  jeCategory: string;
  name1: string;
  ledgerId: number;
  runningTotalDr: number;
  runningTotalCr: number;
  docSeqValue: number;
  lineNumber: number;
  lineTypeLookupCode: string;
  public segmentNameList: any;
  branch: any;
  segment11: string;
  segment2: number;
  segment3: number;
  segment4: number;
  segment5: number;
  lookupValueDesc4: string;
  lookupValueDesc1: string;
  lookupValueDesc2: string;
  lookupValueDesc3: string;
  lookupValueDesc5: string;
  activeLineNo: number = 1;
  // ouId:number;
  accDesc: string;
  submitted = false;
  public OUIdList: Array<string> = [];
  public TypeList: Array<string> = [];
  public lstsearchapinv: any;
  // nverValidedCnd:false;
  // ValidedCnd:true;
  viewAccountingLines: Array<string> = [];
  // public locIdList1: Array<string> = [];
  locIdList1: any = [];
  // public BranchList: Array<string> = [];
  BranchList: any = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: Array<any> = [];
  public InterBrancList: any = [];
  paymentMethodList: any = [];
  public prepayTypeList: Array<string> = [];
  public poTypeList: Array<string> = [];
  public APitemtYPE: Array<string> = [];
  public locIdList: any = [];
  public distributionSetNameList: Array<any>[];
  public taxCalforItem: any[];
  public suppIdList: any
  public distributionLineWise: any[];
  taxCat: string;
  taxCategoryList: any = [];
  public ValidateObj: any;
  taxLines: number;
  displayHeaderData = true;
  displayOUName = false;
  displayglDate = false;
  dispaccountingDate = false;
  displaypoType = false;
  displaysegment1 = false;
  displayname = false;
  displaysuppNo = false;
  displaysiteName = false;
  displaycurrency = false;
  displayitemName = false;
  displaydescription = false;
  displaydistributionSet = false;
  displayValidateButton = true;
  displayapInvCancelled = true;
  displayModal = true;
  selectedLine = 0;
  tdsOperation = 'Serch'
  userList1: any[] = [];
  userList2: any[] = [];
  lastkeydown1: number = 0;
  public supplierCodeList: any[];
  public supplierCodeList1: any[];
  siteIdList: any = [];
  invItemId: number;
  billToLoc: string;
  segmentName1: string;
  taxDetaileSendArr: any = [];
  paymentMethod1: any;
  // tdsLineValidation=true;
  public taxarr = new Map<number, any>();
  public distarr = new Map<number, any>();

  invoiceLineNo: number = 1;
  prepaydata: any;

  public thresHoldHdrId = 10012;
  public thresHoldTypeId = 10169;
  public taxMap = new Map<string, any>();

  errorMsg: string;
  displayError: boolean;
  formSumitAttempt: boolean;
  hsnsaclist: any;
  public apInvoiceTyp: string = 'MANUAL';
  isDisabled = false;
  private sub: any;
  @ViewChild('aForm') aForm: ElementRef;
  addonDescList: any;
  public allTaxCategoryList: any = [];


  displaylineNumber = true;
  // chassisNo: string;
  voucherNum: number;
  remark: string;
  trxNumber: number;
  isVisibleSelectButton: boolean = false;
  BalAmt: number;
  supname: string;
  balData: any;
  payData: any;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  taxCategoryId1: number;
  rounAmt = 0;
  disAmt = 0;

  constructor(private fb: FormBuilder, private router1: ActivatedRoute, private orderManagementService: OrderManagementService, private transactionService: TransactionService, private service: MasterService, private router: Router) {
    this.poInvoiceForm = fb.group({
      emplId: [],
      invoiceId: [],
      ouId: [''],
      invoiceStatus: [''],
      suppNo: [''],
      actualSectionCode: [],
      taxCategoryId1: [],
      suppId: [''],
      partyId:[''],
      invoiceNum: [''],
      invoiceAmt: [0.00],
      invoiceDate: [''],
      supTdsYN: [],
      rounAmt: [0],
      secondDateRange: [''],
      totalDistAmt: [],
      totalDistBaseAmt: [],
      poChargeAcCode: [],
      tdsTotAmt: [],
      tdsTotDiscAmt: [],
      tdsBasicAmt: [],
      tottdsAmt: [],
      invTransferStatus: [],
      distLineNumber: [],
      distCodeCombId: [],
      description: [],
      segment11: [],
      segment2: [],
      segment3: [],
      segment4: [],
      segment5: [],
      lookupValueDesc4: [],
      lookupValueDesc1: [],
      lookupValueDesc2: [],
      lookupValueDesc3: [],
      lookupValueDesc5: [],
      segment1: [],
      internalSeqNo: [],
      payGroup: [],
      thresHoldHdrId: [],
      thresHoldTypeId: [],
      runningTotalDr: [],
      periodName: [],
      postedDate: [],
      jeCategory: [],
      docSeqValue: [],
      runningTotalCr: [],
      name1: [],
      source: [],
      BalAmt: [],
      supname: [],
      obj: this.fb.array([this.lineDetailsGroup()]),
      invLines: this.fb.array([this.invLineDetails()]),
      distribution: this.fb.array([this.distLineDetails()]),
      taxLines: this.fb.array([this.TaxDetailsGroup()]),
      tdsLines: this.fb.array([this.tdsLineDetails()]),
      tdsTaxLines: this.fb.array([this.tdsTaxDetailsGroup()]),

    });
  }

  poInvoice(poInvoiceForm) {

  }

  TaxDetailsArray(): FormArray {
    // return this.lineDetailsArray.controls[].get('taxAmounts') as FormArray
    return <FormArray>this.poInvoiceForm.get('taxLines')
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

  ////////////////////////////DISTRIBUTION ///////////////////////
  distLineDetails() {
    return this.fb.group({
      invDistributionId: [],
      invoiceLineNum: [],
      distLineNumber: [],
      distCodeCombId: [],
      amount: ['', [Validators.required]],
      accountingDate: [],
      baseAmount: ['', [Validators.required]],
      poSegment: [],
      // distCodeCombId: [],
      distCodeCombSeg: ['', [Validators.required]],
      poChargeAc: [],
      poChargeDesc: [],
      poChargeCode: [],
      lineTypeLookupCode: ['', [Validators.required]],
      description: [],
      invTransferStatus: [],
      poChargeAcCode: [],
      accDesc: [],

    })
  }

  invLineDetails() {
    return this.fb.group({
      internalSeqNo: [],
      itemId: [],
      invoiceId: [],
      lineNumber: [],
      locCode: [],
      lineTypeLookupCode: ['', [Validators.required]],
      segment1: [],
      itemSeg: [],
      suppNo: [],
      amount: ['', [Validators.required]],
      poNumber: [],
      poLineId: [],
      matchType: [],
      defaultDistCcid: [],
      accDesc: [],
      defaultDisAcc: [],
      receiptNumber: [],
      qtyInvoiced: [],
      baseAmount: [],
      itemName: [],
      description: [],
      glDate: [],
      invDescription: [],
      // invItemId:[],
      segment: [],
      taxCategoryName: [],
      taxCategoryId: [],
      hsnSacCode: [],
      gstPercentage: [],
      locId: ['', [Validators.required]],
    })
  }

  invLineDetailsArray(): FormArray {
    return <FormArray>this.poInvoiceForm.get('invLines')
  }


  lineDetailsGroup() {
    return this.fb.group({
      ouId: ['', [Validators.required]],
      locationId: ['', [Validators.required]],
      emplId: [],
      ouName: [],
      source: [],
      suppNo: [],
      supTdsYN: [],
      invoiceId: [],
      invoiceStatus: [],
      payGroup: [],
      invTypeLookupCode: ['', [Validators.required]],
      segment1: [],
      name: ['', [Validators.required]],
      suppInvNo: [],
      // chassisNo: [''],
      description: [],
      voucherNum: [],
      remark: [],
      trxNumber: [],
      suppId: [],
      partyId:[],
      suppInvDate: [],
      // suppNo: [],
      siteName: [],
      taxAmt: [],
      // invoiceId: [],
      invoiceNum: ['', [Validators.required]],
      invoiceAmt: [0.00, [Validators.required]],
      invoiceDate: ['', [Validators.required]],
      termsDate: [''],
      termsId: [''],
      glDate: [''],
      currency: [''],
      paymentRateDate: [],
      distributionSet: [],
      matchAction: [],
      terms: [],
      paymentMethod: ['', [Validators.required]],
      prepayType: [],
      addonType: [],
      settlementDate: [],
      taxationCountry: [],
      remitToSuppName: [],
      remitToBankAccount: [],
      remitToBankAccountNo: [],
      debitMemoReason: [],
      remitToSuppSite: [],
      suppSiteId: [],
      supplierSiteId: ['', [Validators.required]],
      taxCategoryName: [],
      accPayCodeCombId: [],
      amtAppToDisc: [],
      invoiceId1: [],
      internalSeqNum: [],
    })
  }


  lineDetailsArray(): FormArray {
    return <FormArray>this.poInvoiceForm.get('obj')
  }


  lineDistributionArray(): FormArray {
    return <FormArray>this.poInvoiceForm.get('distribution')
  }


  tdsLineDetails() {
    return this.fb.group({
      invoiceLineNum: [],
      distCodeCombSeg: [],
      baseAmount: [],
      accDesc: [],
      description: [],
      tdsSectionCode: [],
      tdsSelectFlag: [],
      tdsTaxAmount: [],
      invDistributionId: [],
      invoiceDistId: [],
      wthldInvTaxId: [],
      invoiceId: [],
      // invoiceDistId:[],
      distLineNumber: [],
      distCodeCombId: [],
      actualSectionCode: [],
      taxAmount: [],
      taxCategoryId: [],

      thresHoldHdrId: [],
      thresHoldTypeId: [],

    })
  }

  TdsDetailsArray(): FormArray {
    return <FormArray>this.poInvoiceForm.get('tdsLines')
  }

  tdsTaxDetailsGroup() {
    return this.fb.group({
      totTaxAmt: [],
      lineNumber: [],
      taxRateName: [],
      taxTypeName: [],
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
      totTaxPer: [],
      invLineItemId: [],
      invLineNo: [],
    });
  }

  tdsTaxDetailsArray(): FormArray {
    return <FormArray>this.poInvoiceForm.get('tdsTaxLines')
  }



  get g() { return this.poInvoiceForm.controls; }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.isVisibleSelectButton = false;
    var patch = this.poInvoiceForm.get('obj') as FormArray;
    (patch.controls[0]).patchValue(
      {
        ouName: (sessionStorage.getItem('ouName')),
        ouId: (sessionStorage.getItem('ouId')),
        glDate: this.pipe.transform(Date.now(), 'y-MM-dd'),
        invoiceDate: this.pipe.transform(Date.now(), 'y-MM-dd'),
      }
    );
    this.isVisibleAddonType = true;
    // this.poInvoiceForm.patchValue({ invoiceStatus: 'Not Validated' })comment by vinita on 28dec22
    this.poInvoiceForm.patchValue({ invoiceStatus: '' })
    this.isVisiblelineDetialsDeleteButton = true;
    this.paymentMethod1 = 69;
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.isVisibleRoundOffButton = false;

    this.service.getLocationSearch1(this.ouId)
      .subscribe(
        data => {
          this.locIdList = data;
          console.log(this.locIdList);
        }
      );

    this.service.OUIdList()
      .subscribe(
        data => {
          this.OUIdList = data;
          console.log(this.OUIdList);
        }
      );

    this.service.tdsSectionList()
      .subscribe(
        data => {
          this.tdsSectionList = data;
          console.log(this.tdsSectionList);
        }
      );



    this.transactionService.paymentIdListList()
      .subscribe(
        data => {
          this.paymentMethodList = data;
          console.log(this.paymentMethodList);
          let selectPayment = this.paymentMethodList.find(v => v.lookupValue == 'CASH');
          console.log(selectPayment);
          var patch = this.poInvoiceForm.get('obj') as FormArray;
          (patch.controls[0]).patchValue(
            {
              paymentMethod: selectPayment.lookupValue,
            }
          );
        }
      );




    this.transactionService.prepayTypeList()
      .subscribe(
        data => {
          this.prepayTypeList = data;
          console.log(this.prepayTypeList);
        }
      );
    // this.service.invItemList1()
    //   .subscribe(
    //     data => {
    //       this.invItemList1 = data;
    //       console.log(this.invItemList1);
    //     }
    //   );
    this.service.APiNVOICEtYPETypeList()
      .subscribe(
        data => {
          this.poTypeList = data;
          console.log(this.poTypeList);
        }
      );
    this.service.APitemtYPEList()
      .subscribe(
        data => {
          this.APitemtYPE = data;
          console.log(this.APitemtYPE);
        }
      );


    this.transactionService.distributionSetNameList()
      .subscribe(
        data => {
          this.distributionSetNameList = data;
          console.log(this.distributionSetNameList);
        }
      );


    this.service.supplierCodeWithEmplListNew()
      .subscribe(
        data1 => {
          this.supplierCodeList = data1;
          console.log(this.supplierCodeList);
        }
      );


    this.service.BranchList()
      .subscribe(
        data => {
          this.BranchList = data;
          console.log(this.BranchList);
        }
      );
    this.service.CostCenterList()
      .subscribe(
        data => {
          this.CostCenterList = data;
          console.log(this.CostCenterList);
        }
      );
    this.service.locationCodeList()
      .subscribe(
        data => {
          this.locIdList1 = data;
          console.log(this.locIdList1);
        }
      );

    // this.service.getInterBranchNewApi(11000).subscribe(
    //   data1 => {
    //     this.InterBrancList = data1.obj
    //     console.log(this.InterBrancList);
    //   })

    this.service.getInterBranchNatural()
      .subscribe(
        data => {
          for (let j = 0; j < data.obj.length; j++) {
            var str = data.obj[j].naturalaccount + '-' + data.obj[j].description;
            this.NaturalAccountList.push(str);
            
          }
        }
      );

    this.service.hsnSacCodeList()
      .subscribe(
        data => {
          this.hsnsaclist = data;
        }
      );

    this.service.tdsSectionList()
      .subscribe(
        data => {
          this.tdsSectionList = data;
        }
      );

    this.service.tdsTaxCategoryList()
      .subscribe(
        data => {
          this.tdsTaxCategoryList = data;
        }
      );

    this.service.tdsTaxCategoryList1()
      .subscribe(
        data => {
          this.tdsTaxCategoryList1 = data;
        }
      );


    this.service.hsnSacCodeData('HSN').subscribe(
      data => {
        this.hsnSacCodeList = data;
      }
    )


    var patch = this.poInvoiceForm.get('invLines') as FormArray;
    (patch.controls[0]).patchValue(
      {
        lineNumber: 1,
      }
    );

    this.service
      .searchByItemSegmentDiv(sessionStorage.getItem('divisionId'), '36DH1601')
      .subscribe((data) => {
        this.invItemList = data;
      });


    this.sub = this.router1.params.subscribe(params => {
      var docNo = params['invNo'];
      var cate = params['cate'];
      // alert(docNo+'----'+cate)
      if (docNo != undefined) {
        if (cate==undefined){
        this.InvDocFind(docNo)
      }
      else if (cate=='AP Invoice Cancelation'){
        this.apInvFindAfterSave(docNo);
      } 
      }
    }
    )
  }

  addRow() {
    this.invLineDetailsArray().push(this.invLineDetails());
    var len = this.invLineDetailsArray().length;
    this.invoiceLineNo = this.invoiceLineNo + 1;
    var patch = this.poInvoiceForm.get('invLines') as FormArray;
    var glDateArray = this.poInvoiceForm.get('obj').value;

    (patch.controls[len - 1]).patchValue(
      {
        lineNumber: this.invoiceLineNo,
        glDate: glDateArray[0].glDate,
      }
    );
    // this.updateTotAmtPerline(this.invoiceLineNo)
  }


  getUserIdsFirstWay($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList4 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown4 > 200) {
        this.userList4 = this.searchFromArray(this.supplierCodeList, userId);
      }
    }
  }


  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };


  getHSNFormArray($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdHSNFirstWay')).value;
    this.userList5 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown4 > 200) {
        this.userList5 = this.searchFromHSNArray(this.hsnSacCodeList, userId);
      }
    }
  }


  searchFromHSNArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };













  getNaturalAccount($event) {
    let userId = (<HTMLInputElement>document.getElementById('NaturalAccountFirstWay')).value;
    this.userList3 = [];
    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown3 > 200) {
        this.userList3 = this.searchFromArray2(this.NaturalAccountList, userId);
      }
    }
  }




  searchFromArray2(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      // alert(arr[i] + 'Array i');
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };



  Delete(trxLineIndex) {
    if (trxLineIndex == 0) {
      alert('Not Able to Delete First Line.!')
    }
    else {
      this.invLineDetailsArray().removeAt(trxLineIndex);
    }
    // trxLineIndex = trxLineIndex + 1;
    var formVal = this.poInvoiceForm.get('invLines').value;
    var formArr = this.poInvoiceForm.get('invLines') as FormArray;
    // for (let i = 0; i < formVal.length; i++) {
    //   (formArr.controls[i]).patchValue({
    //     lineNumber: i + 1,
    //   });
    // }
  }
  getLocation(k, lineTypeLookupCode) {
    // alert(k + '-----' + lineTypeLookupCode)
    var arrayControl = this.poInvoiceForm.get('obj').value;
    var patch1 = this.poInvoiceForm.get('invLines') as FormArray;
    console.log(this.locIdList);
    var location = arrayControl[0].locationId;
    // var selectlocId = this.locIdList.find(v => v.locId === arrayControl[0].locationId);
    var selectlocId = this.locIdList.find(d => d.locId === arrayControl[0].locationId);
    console.log(selectlocId);
    patch1.controls[k].patchValue({ locId: location });
    patch1.controls[k].patchValue({ locCode: selectlocId.locCode });
    if (lineTypeLookupCode === 'OTHER') {
      this.displayitemName = true
    }
    else if (lineTypeLookupCode === 'ITEM') {
      this.displayitemName = false;
    }
  }
  addRowDistribution(k) {
    this.lineDistributionArray().push(this.distLineDetails());
    var len = this.lineDistributionArray().length;
    var patch = this.poInvoiceForm.get('distribution') as FormArray;
    (patch.controls[len - 1]).patchValue(
      {
        distLineNumber: len,
      }
    );
  }
  RemoveDistributionRow(index) {
    if (index === 0) {

    } else {
      this.lineDistributionArray().removeAt(index);
    }
  }
  currop = 'Save';
  currentOP = 'Search'
  apInvFind(content) {
    this.currentOP = 'Search';
    this.lineDetailsArray().clear();
    this.TaxDetailsArray().clear();
    this.TdsDetailsArray().clear();
    this.lineDistributionArray().clear();
    this.tdsTaxDetailsArray().clear();
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Data Loading in progress....Do not refresh the Page'
    this.displayHeaderData = false;
    this.isVisibleSelectButton = true;
    let jsonData = this.poInvoiceForm.value;
    let invSearch: ISearch = Object.assign({}, jsonData);
    var searchObj: InvoiceSearchNew = new InvoiceSearchNew();
    if (this.poInvoiceForm.get('segment1').value != null) { searchObj.segment1 = this.poInvoiceForm.get('segment1').value }
    if (this.poInvoiceForm.get('suppNo').value != null) { searchObj.suppNo = this.poInvoiceForm.get('suppNo').value }
    if (this.poInvoiceForm.get('invoiceNum').value != null) { searchObj.invoiceNum = this.poInvoiceForm.get('invoiceNum').value }
    this.transactionService.getsearchByApINV(JSON.stringify(searchObj)).subscribe((res: any) => {
      if (res.code === 200) {
        this.closeResetButton = true;
        // this.progress = 0;
        this.dataDisplay = 'Data Display Sucessfully..'
        this.isDisabled = true;
        this.isVisibleAddonType = false;
        this.isVisibleSave = false;
        this.isVisibleRoundOffButton = false;
        this.isVisibleUpdateBtn = false;
        this.isVisibleValidate = false;
        if (res.obj.length === 0) {
          alert('AP Invoice Details not Find !...');
          this.poInvoiceForm.reset();
        }
        else if (res.obj.length != 0) {

          // ;
          this.lstsearchapinv = res.obj;
          this.lstsearchapinv.forEach(f => {
            var invLnGrp: FormGroup = this.lineDetailsGroup();
            this.lineDetailsArray().push(invLnGrp);
          });
          this.poInvoiceForm.get('obj').patchValue(this.lstsearchapinv);
          var patch = this.poInvoiceForm.get('obj') as FormArray;
          for (let i = 0; i < this.lstsearchapinv.length; i++) {
            let payDate = moment(this.lstsearchapinv[i].paymentRateDate, 'dd-MM-yyyy hh:mm:ss');
            let payDtString = payDate.format('dd-MMM-yyyy');
            let select = this.tdsSectionList.find(d => d.lookupValueDesc === res.obj[i].payGroup);
            this.lineDetailsArray().controls[i].patchValue({ paymentRateDate: payDtString, invoiceId1: this.lstsearchapinv[i].invoiceId, internalSeqNum: this.lstsearchapinv[i].internalSeqNum });
            var glDateNew1 = (res.obj[i].glDate)
            var glDateNew = this.pipe.transform(glDateNew1, 'y-MM-dd');
            var invoiceDateNew = this.pipe.transform(res.obj[i].invoiceDate, 'y-MM-dd');
            var invoiceAmt1 = Math.abs(res.obj[i].invoiceAmt)
            this.isVisibleinvoiceDateText = false;
            this.isVisibleinvoiceDateDate = true;
            // this.invoiceDate = invoiceDateNew;
            // this.glDate = glDateNew;
            // alert(res.obj[i].partyId )
            patch.controls[i].patchValue({ payGroup: res.obj[i].payGroup })
            patch.controls[i].patchValue({ partyId: res.obj[i].partyId })
            patch.controls[i].patchValue({ invoiceDate: invoiceDateNew })
            patch.controls[i].patchValue({ glDate: glDateNew })
            // patch.controls[i].patchValue({invoiceAmt:invoiceAmt1})
            if (res.obj[i].paymentMethod === undefined || res.obj[i].paymentMethod === null) {
              (patch.controls[i]).patchValue(
                {
                  paymentMethod: 'CASH',
                }
              );
            }
            if (res.obj[i].payGroup != undefined || res.obj[i].payGroup != null) {
              (patch.controls[i]).patchValue(
                {
                  payGroup: res.obj[i].payGroup,
                }
              );
              this.isVisibleTDSTab = true;
            }
            // ;
            console.log(this.tdsSectionList);
            if (res.obj[i].invoiceStatus === null) {
              this.lineDetailsArray().controls[i].get('locationId').enable();
              this.lineDetailsArray().controls[i].get('invTypeLookupCode').disable();
              this.lineDetailsArray().controls[i].get('segment1').enable();
              this.lineDetailsArray().controls[i].get('name').disable();
              this.lineDetailsArray().controls[i].get('suppNo').disable();
              this.lineDetailsArray().controls[i].get('siteName').disable();
              this.lineDetailsArray().controls[i].get('invoiceDate').enable();
              this.lineDetailsArray().controls[i].get('invoiceNum').enable();
              this.lineDetailsArray().controls[i].get('internalSeqNum').disable();
              this.lineDetailsArray().controls[i].get('glDate').enable();
              this.lineDetailsArray().controls[i].get('currency').disable();
              this.lineDetailsArray().controls[i].get('paymentRateDate').enable();
              this.lineDetailsArray().controls[i].get('ouName').disable();
              this.lineDetailsArray().controls[i].get('invoiceAmt').enable();
              this.lineDetailsArray().controls[i].get('taxAmt').enable();
            }
            // alert(res.obj[i].segment1)
            if (res.obj[i].segment1 != null) {
              this.lineDetailsArray().controls[i].get('invoiceDate').enable();
              this.isVisibleinvoiceDateDate = true;
              this.lineDetailsArray().controls[i].get('taxAmt').disable();
              this.lineDetailsArray().controls[i].get('invoiceAmt').disable();

              // this.poInvoiceForm.disable();
            }
            if (res.obj[i].invoiceAmt % 1 != 0) {
              this.isVisibleRoundOffButton = false;
            }
            // else{
            //   this.isVisibleRoundOffButton=true;
            // }
          }
          this.displayValidateButton = false;
        }

      }
      else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
  }

  public onChange(event) {
    this.lessThanValue = event.target.value;
    if (this.greaterThanValue > this.lessThanValue) {
      alert('Plese enter correct value')
      this.poInvoiceForm.get('greaterThanValue').reset();
    }
  }

  public onChange1(event) {
    this.greaterThanValue = event.target.value;
  }

  onOptionsSelectedsuppName(name: any, i) {
    // alert(name)
    let selectedValue = this.supplierCodeList.find(v => v.name == name);
    console.log(selectedValue);
    this.suppNo = selectedValue.suppNo;
    this.currency = 'INR';

    this.suppId = selectedValue.suppId;
    let controlinv = this.poInvoiceForm.get('obj') as FormArray;
    (controlinv.controls[i]).patchValue({ suppId: selectedValue.suppId });
    this.service.suppIdList(selectedValue.suppId, this.ouId)
      .subscribe(
        data => {
          this.suppIdList = data;
          if (this.suppIdList.length == 0) {
            alert('Supplier site not attached to supplier');
          } else {
            console.log(this.suppIdList);
          }
        }
      );
  }



  selectINVLineDtl(index) {
    // alert(index+'----'+suppNo);
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Data Loading in progress....Do not refresh the Page'
    this.tdsTaxDetailsArray().clear();
    this.lineDistributionArray().clear();
    this.invLineDetailsArray().clear();
    this.TaxDetailsArray().clear();
    this.TdsDetailsArray().clear();
    this.dispaccountingDate = true;
    this.displayapInvCancelled = true;
    this.displayViewTaxDetails = false;
    this.selectedLine = index;
    this.displaydescription = false;
    this.displayManualAP = false;

    var arraybaseNew = this.poInvoiceForm.get('obj') as FormArray;
    var arraybaseNew1 = arraybaseNew.getRawValue();
    // alert(suppNo+'----suppNo')
    var invoiceAmt = this.lineDetailsArray().controls[index].get('invoiceAmt').value;
    var source = this.lineDetailsArray().controls[index].get('source').value;
    var invoiceNum = this.lineDetailsArray().controls[index].get('invoiceNum').value;
    var suppNo = this.lineDetailsArray().controls[index].get('suppNo').value;
    var partyId = this.lineDetailsArray().controls[index].get('partyId').value;
    var suppId = this.lineDetailsArray().controls[index].get('suppId').value;
    // alert(partyId+'----'+suppId)
    var invStatus = this.lineDetailsArray().controls[index].get('invoiceStatus').value;
    // var rounAmt=0;
    if (invoiceAmt % 1 != 0) {
      this.isVisibleRoundOffButton = true;
    }
    else {
      this.isVisibleRoundOffButton = false;
    }
    this.invLineDetailsArray().clear();

    if (source === 'REFUND') {
      // alert('---If Part----')
      this.transactionService.getApInvLineDetails(invoiceNum,partyId,suppId)
      // this.transactionService.getApInvLnStatusDetailsSupwise(invoiceNum, suppNo, invStatus)
        .subscribe(
          data => {
            // if (data.code === 200) {
            console.log(data);
            this.closeResetButton = true;
            // this.progress = 0;
            this.dataDisplay = 'Data Display Sucessfully....'
            // alert('data.invoiceStatus'+data.invoiceStatus);
            this.isSearchPatch = true;
            this.displayitemName = true;
            this.displayTaxCategory = false;
            if (data.invTdsLines.length === 0) {
              this.isVisibleSaveTDS = true;
            }
            else if (data.invTdsLines.length != 0) {
              this.isVisibleSaveTDS = false;
              this.TdsDetailsArray().disable();
              this.tdsTaxDetailsArray().disable()
            }
            this.poInvoiceForm.patchValue({
              invoiceNum: data.invoiceNum,
              segment1: data.invLines[0].poNumber,
              invoiceStatus: data.invoiceStatus
            })
            this.isDisabled = true;
            this.lstInvLineDeatails = data;
            this.lstTdsLine = data.invDisLines;
            console.log(data.invoiceStatus);
            data.invLines.forEach(f => {
              var invLnGrp: FormGroup = this.invLineDetails();
              this.invLineDetailsArray().push(invLnGrp);
            });

            for (let i = 0; i < data.invDisLines.length; i++) {
              var invLnGrp: FormGroup = this.distLineDetails();
              this.lineDistributionArray().push(invLnGrp);
            }

            for (let i = 0; i < data.taxLines.length; i++) {
              var invLnGrp: FormGroup = this.TaxDetailsGroup();
              this.TaxDetailsArray().push(invLnGrp);
            }
            for (let i = 0; i < data.invTdsLines.length; i++) {
              var invLnGrp: FormGroup = this.tdsTaxDetailsGroup();
              this.tdsTaxDetailsArray().push(invLnGrp);
            }
            console.log(data.taxLines);
            this.poInvoiceForm.get('invLines').patchValue(data.invLines);
            this.poInvoiceForm.get('taxLines').patchValue(data.taxLines);
            // this.poInvoiceForm.get('distribution').patchValue(data.invDisLines);
            // this.poInvoiceForm.get('tdsLines').patchValue(data.invTdsLines);
            this.poInvoiceForm.get('tdsTaxLines').patchValue(data.invTdsLines);
            let controlinv = this.poInvoiceForm.get('invLines') as FormArray;
            for (let i = 0; i < data.invLines.length; i++) {
              if (data.invLines[i].lineTypeLookupCode === 'ITEM' || data.invLines[i].lineTypeLookupCode === 'OTHER') {
                (controlinv.controls[i]).patchValue({ taxCategoryName: data.invLines[i].taxCategoryName });
                (controlinv.controls[i].patchValue({ invDescription: data.invLines[i].description }));
              }
              // alert(data.invLines[i].description)
            }
            for (let x = 0; x < data.invLines.length; x++) {
              if (data.invLines[x].description != undefined) {
                var description = data.invLines[x].description.toUpperCase()
                if (description.includes('ROUNDING') == true) {
                  this.isVisibleRoundOffButton = false;
                }
              }
              // else {
              //   this.isVisibleRoundOffButton=true; 
              // }
            }
            var arraybase1 = this.poInvoiceForm.get('obj').value;
            var arraybaseNew = this.poInvoiceForm.get('obj') as FormArray;
            var arraybaseNew1 = arraybaseNew.getRawValue()
            var invId = arraybaseNew1[0].invoiceId;

            let tdscontroltax = this.poInvoiceForm.get('tdsTaxLines') as FormArray;
            for (let i = 0; i < data.invTdsLines.length; i++) {
              (tdscontroltax.controls[i]).patchValue({ lineNumber: data.invTdsLines[i].distLineNumber });
              // (tdscontrolInv.controls[i]).patchValue({ taxRateName: data.invDisLines[i].invDistributionId });
              (tdscontroltax.controls[i]).patchValue({ taxTypeName: data.invTdsLines[i].taxType });
              (tdscontroltax.controls[i]).patchValue({ precedence1: data.invTdsLines[i].precedence1 });
              // (tdscontrolInv.controls[i]).patchValue({ totTaxPer: data.invDisLines[i].description });
              (tdscontroltax.controls[i]).patchValue({ totTaxAmt: Math.abs(data.invTdsLines[i].taxAmount) });
              (tdscontroltax.controls[i]).patchValue({ taxAmount: Math.abs(data.invTdsLines[i].taxAmount) });
            }
            // ;
            for (let j = 0; j < data.invDisLines.length; j++) {
              // var accDate = data.invDisLines[j].accountingDate;
              // var accDate1 = this.pipe.transform(accDate, 'dd-MM-yyyy');
              // (distLineArray.controls[j]).patchValue({ accountingDate: accDate1 });
              this.accountingDate = data.invDisLines[j].accountingDate;
            }
            this.invoiceStatus = data.invoiceStatus;

            if (data.invTdsLines.length === 0 && data.isTdsInvExist != 'Y') {
              this.showTdsLines(data.invoiceId, data.payGroup);
            }
            // alert('data.invoiceStatus' + data.invoiceStatus);
            // debugger;
            if (data.invoiceStatus === '' || data.invoiceStatus === null || data.invoiceStatus === undefined) {
              // alert(data.invoiceStatus);
              this.isVisibleSave = false;
              this.isVisibleUpdateBtn = true;
              this.isVisibleValidate = true;
              this.isVisibleCancel = true;
              this.displayPayData = true;

              // this.isVisibleRoundOffButton=true;
            }
            if (data.invoiceStatus != undefined) {
              // if(data.invoiceStatus.includes('Validated')){
              //   this.isVisiblepayDetail=true;
              // }
              // alert(data.invoiceStatus )
              if (data.invoiceStatus.includes('Validated') || data.invoiceStatus === 'Unpaid') {
                // alert('In Validated')
                this.poInvoiceForm.disable();
                this.displayAddNewLine = false;
                this.invoiceStatus = data.invoiceStatus;
                this.displayapInvCancelled = false;
                this.isVisibleUpdateBtn = false;
                this.isVisibleValidate = false;
                this.isVisibleSaveTDS = false;
                this.isVisibleRoundOffButton = false;
                this.isVisibleviewAccounting = true;
                // this.isVisibleCancel=true;
                this.TaxDetailsArray().disable();
                this.TdsDetailsArray().disable();
                this.lineDetailsArray().disable();
                this.invLineDetailsArray().disable();
                this.lineDistributionArray().disable();
                this.tdsTaxDetailsArray().disable();
                this.tdsTaxDetailsGroup().disable();
                this.tdsLineDetails().disable();
                this.displayapInvCancelled = false;
                this.disDeleteButton = false;
                this.isVisiblelineDetialsDeleteButton = false;
                this.isVisibleSaveTDS = false;
                // this.isVisiblepayDetail=true;

              }
              if (data.invoiceStatus === 'Unpaid') {
                this.isVisibleCancel = true;
              }
            }
            // alert(data.invoiceStatus)
            // alert('index'+index)
            // alert(arraybaseNew1[index].invTypeLookupCode +'-----');

            if (data.invoiceStatus === undefined) {
              if (arraybaseNew1[index].invTypeLookupCode != undefined) {
                // alert(arraybaseNew1[index].invTypeLookupCode)
                if (arraybaseNew1[index].invTypeLookupCode === 'CREDIT' || arraybaseNew1[index].invTypeLookupCode === 'STANDARD') {
                  this.displayAddNewLine = false;
                  this.displayapInvCancelled = false;
                  this.isVisibleUpdateBtn = false;
                  this.isVisibleRoundOffButton = false;
                  this.isVisibleValidate = false;
                  this.isVisibleSaveTDS = false;
                  this.isVisibleviewAccounting = true;
                  this.displayapInvCancelled = false;
                  this.isVisiblePayment = false;
                  this.TaxDetailsArray().disable();
                  this.TdsDetailsArray().disable();
                  this.lineDetailsArray().disable();
                  this.invLineDetailsArray().disable();
                  this.lineDistributionArray().disable();
                  this.tdsTaxDetailsArray().disable();
                  this.tdsTaxDetailsGroup().disable();
                  this.tdsLineDetails().disable();
                  this.disDeleteButton = false;
                  this.isVisiblelineDetialsDeleteButton = false;
                  this.isVisibleSaveTDS = false;
                }
              }
            }
            if (data.invoiceStatus === 'CANCELLED') {
              this.displayapInvCancelled = true;
              this.isVisible = false;
              this.isVisibleviewAccounting = true;
              this.poInvoiceForm.disable();
            }
            // alert(data.source +'---'+arraybaseNew1[i].segment1);

            if (arraybaseNew1[index].segment1 != undefined || arraybaseNew1[index].segment1 != null || arraybaseNew1[index].segment1 != '') {
              this.poInvoiceForm.disable();
            }
            // if (data.invoiceStatus != undefined){
              // alert(data.invoiceStatus)
              // debugger;
            // if (arraybaseNew1[index].invTypeLookupCode === 'Prepayment' && data.invoiceStatus.includes('Validated') || data.obj.invoiceStatus === 'Unpaid') {
            //   if (arraybaseNew1[index].invTypeLookupCode != 'CREDIT' || arraybaseNew1[index].invTypeLookupCode != 'STANDARD') {
            //     this.isVisiblePayment = true;
            //   }
            //   // }
            // }
           
            // else if (arraybaseNew1[index].invTypeLookupCode === 'Standard Invoice' && data.invoiceStatus != undefined) {
            //   alert(data.invoiceStatus)
            //   if (data.invoiceStatus.includes('Validated') || data.invoiceStatus === 'Unpaid') {
            //     this.isVisiblePayment = true;
            //   }
            // }
            // else {
            //   this.isVisible = true;
            //   this.displayapInvCancelled = false;
            // }

            if (arraybaseNew1[index].invTypeLookupCode === 'Prepayment' && data.invoiceStatus.includes('Validated') || data.invoiceStatus === 'Unpaid') {
              if (arraybaseNew1[index].invTypeLookupCode != 'CREDIT' || arraybaseNew1[index].invTypeLookupCode != 'STANDARD') {
                this.isVisiblePayment = true;
              }
              // }
            }
            else if (arraybaseNew1[index].invTypeLookupCode === 'Standard Invoice' && data.invoiceStatus != undefined) {
              // alert(data.obj.invoiceStatus)
              if (data.invoiceStatus.includes('Validated')) {
                this.isVisiblePayment = true;
              }
            }
            else {
              this.isVisible = true;
              this.displayapInvCancelled = false;
            }
            if (arraybaseNew1[index].segment != null || arraybaseNew1[index].segment != undefined || arraybaseNew1[index].segment != '') {
              this.poInvoiceForm.disable();
            }
            this.updateTDSTotAmtPerline1();
          
          // }
          // else{
          //   if (data.code==400){
          //     alert(data.message);
          //     this.closeResetButton = false;
          //       this.progress = 0;
          //       this.dataDisplay = 'Data Loading Failed....Some Error Is There.!'
          //   }
          
        }
      
        );

    }
    else {
      // alert('else party')
      this.transactionService.getApInvLnStatusDetailsSupwise(invoiceNum, suppNo, invStatus)
        .subscribe(
          data => {
            if (data.code === 200) {
              console.log(data);
              this.closeResetButton = true;
              // this.progress = 0;
              this.dataDisplay = 'Data Display Sucessfully....'
              // alert('data.invoiceStatus'+data.invoiceStatus);
              this.isSearchPatch = true;
              this.displayitemName = true;
              this.displayTaxCategory = false;
              if (data.obj.invTdsLines.length === 0) {
                // alert(data.invTdsLines.length+'------lenght zero')
                this.isVisibleSaveTDS = true;
              }
              else if (data.obj.invTdsLines.length != 0) {
                // alert(data.invTdsLines.length+'------lenght not zero')
                this.isVisibleSaveTDS = false;
                this.TdsDetailsArray().disable();
                this.tdsTaxDetailsArray().disable()
              }
              this.poInvoiceForm.patchValue({
                invoiceNum: data.obj.invoiceNum,
                segment1: data.obj.invLines[0].poNumber,
                invoiceStatus: data.obj.invoiceStatus
              })
              this.isDisabled = true;
              this.lstInvLineDeatails = data;
              this.lstTdsLine = data.obj.invDisLines;
              console.log(data.invoiceStatus);
              data.obj.invLines.forEach(f => {
                var invLnGrp: FormGroup = this.invLineDetails();
                this.invLineDetailsArray().push(invLnGrp);
              });



              if (data.obj.taxLines != undefined) {
                for (let i = 0; i < data.obj.taxLines.length; i++) {
                  var invLnGrp: FormGroup = this.TaxDetailsGroup();
                  this.TaxDetailsArray().push(invLnGrp);
                }
              }

              console.log(data.obj.taxLines);
              this.poInvoiceForm.get('invLines').patchValue(data.obj.invLines);
              if (data.taxLines != undefined) {
                this.poInvoiceForm.get('taxLines').patchValue(data.obj.taxLines);
              }

              let controlinv = this.poInvoiceForm.get('invLines') as FormArray;
              for (let i = 0; i < data.obj.invLines.length; i++) {
                if (data.obj.invLines[i].lineTypeLookupCode === 'ITEM' || data.obj.invLines[i].lineTypeLookupCode === 'OTHER') {
                  (controlinv.controls[i]).patchValue({ taxCategoryName: data.obj.invLines[i].taxCategoryName });
                  (controlinv.controls[i].patchValue({ invDescription: data.obj.invLines[i].description }));
                  (controlinv.controls[i].patchValue({ suppNo: suppNo }));

                }
              }
              for (let x = 0; x < data.obj.invLines.length; x++) {
                if (data.obj.invLines[x].description != undefined) {
                  var description = data.obj.invLines[x].description.toUpperCase()
                  if (description.includes('ROUNDING') == true) {
                    this.isVisibleRoundOffButton = false;
                  }
                }

              }
              var arraybase1 = this.poInvoiceForm.get('obj').value;
              var arraybaseNew = this.poInvoiceForm.get('obj') as FormArray;
              var arraybaseNew1 = arraybaseNew.getRawValue()
              var invId = arraybaseNew1[0].invoiceId;


              for (let j = 0; j < data.obj.invDisLines.length; j++) {

                this.accountingDate = data.obj.invDisLines[j].accountingDate;
              }
              this.invoiceStatus = data.obj.invoiceStatus;
              // alert(data.invTdsLines.length)
              // alert(data.isTdsInvExist)
              if (data.obj.invTdsLines.length === 0 && data.obj.isTdsInvExist != 'Y') {
                this.showTdsLines(data.obj.invoiceId, data.obj.payGroup);
              }
              // alert('data.invoiceStatus' + data.invoiceStatus);
              // debugger;
              // alert(data.invoiceStatus)
              if (data.obj.invoiceStatus === '' || data.obj.invoiceStatus === null || data.obj.invoiceStatus === undefined) {
                // alert(data.invoiceStatus+'----if');
                this.isVisibleSave = false;
                this.isVisibleUpdateBtn = true;
                this.isVisibleValidate = true;
                this.isVisibleCancel = true;
                // this.isVisibleRoundOffButton=true;
              }
              // 
              // debugger;
              if (data.obj.invoiceStatus != undefined) {
                if (data.obj.invoiceStatus.includes('Validated') || data.obj.invoiceStatus === 'Unpaid' || data.obj.invoiceStatus === 'Paid') {
                  this.poInvoiceForm.disable();
                  this.displayAddNewLine = false;
                  this.invoiceStatus = data.invoiceStatus;
                  this.displayapInvCancelled = false;
                  this.isVisibleUpdateBtn = false;
                  this.isVisibleValidate = false;
                  this.isVisibleSaveTDS = false;
                  this.isVisibleRoundOffButton = false;
                  this.isVisibleviewAccounting = true;
                  this.TaxDetailsArray().disable();
                  this.TdsDetailsArray().disable();
                  this.lineDetailsArray().disable();
                  this.invLineDetailsArray().disable();
                  this.lineDistributionArray().disable();
                  this.tdsTaxDetailsArray().disable();
                  this.tdsTaxDetailsGroup().disable();
                  this.tdsLineDetails().disable();
                  this.disDeleteButton = false;
                  this.isVisiblelineDetialsDeleteButton = false;
                  this.isVisibleSaveTDS = false;

                }
                else if (data.obj.invoiceStatus === 'Unpaid') {
                  this.isVisibleCancel = true;
                }
              }

              if (data.obj.invoiceStatus === undefined) {
                if (arraybaseNew1[index].invTypeLookupCode != undefined) {
                  // alert(arraybaseNew1[index].invTypeLookupCode)
                  if (arraybaseNew1[index].invTypeLookupCode === 'CREDIT' || arraybaseNew1[index].invTypeLookupCode === 'STANDARD') {
                    this.displayAddNewLine = false;
                    this.displayapInvCancelled = false;
                    this.isVisibleUpdateBtn = false;
                    this.isVisibleRoundOffButton = false;
                    this.isVisibleValidate = false;
                    this.isVisibleSaveTDS = false;
                    this.isVisibleviewAccounting = true;
                    this.displayapInvCancelled = false;
                    this.isVisiblePayment = false;
                    this.TaxDetailsArray().disable();
                    this.TdsDetailsArray().disable();
                    this.lineDetailsArray().disable();
                    this.invLineDetailsArray().disable();
                    this.lineDistributionArray().disable();
                    this.tdsTaxDetailsArray().disable();
                    this.tdsTaxDetailsGroup().disable();
                    this.tdsLineDetails().disable();
                    this.disDeleteButton = false;
                    this.isVisiblelineDetialsDeleteButton = false;
                    this.isVisibleSaveTDS = false;
                  }
                }
              }
              if (data.obj.invoiceStatus === 'CANCELLED') {
                this.displayapInvCancelled = true;
                this.isVisible = false;
                this.isVisibleviewAccounting = true;
                // this.poInvoiceForm.disable();
              }
              // alert(data.source +'---'+arraybaseNew1[i].segment1);

              if (arraybaseNew1[index].segment1 != undefined || arraybaseNew1[index].segment1 != null || arraybaseNew1[index].segment1 != '') {
                // this.poInvoiceForm.disable();
              }
              //  alert(data.invoiceStatus+'----Unpaind')
              if (data.obj.invoiceStatus === 'Unpaid' || data.obj.invoiceStatus === 'Validated' || data.obj.invoiceStatus === undefined) {
                this.isVisibleCancel = true;
              }
              else {
                this.isVisibleCancel = false;
              }
              if (arraybaseNew1[index].invTypeLookupCode === 'Prepayment' && data.obj.invoiceStatus.includes('Validated') || data.obj.invoiceStatus === 'Unpaid') {
                if (arraybaseNew1[index].invTypeLookupCode != 'CREDIT' || arraybaseNew1[index].invTypeLookupCode != 'STANDARD') {
                  this.isVisiblePayment = true;
                }
                // }
              }
              else if (arraybaseNew1[index].invTypeLookupCode === 'Standard Invoice' && data.obj.invoiceStatus != undefined) {
                // alert(data.obj.invoiceStatus)
                if (data.obj.invoiceStatus.includes('Validated')) {
                  this.isVisiblePayment = true;
                }
              }
              else {
                this.isVisible = true;
                this.displayapInvCancelled = false;
              }
              if (arraybaseNew1[index].segment != null || arraybaseNew1[index].segment != undefined || arraybaseNew1[index].segment != '') {
                // this.poInvoiceForm.disable();
              }
              // for (let l = 0; l < data.obj.invLines.length; l++) {
              //   var desc = data.obj.invLines[l].description.toUpperCase();
              //   var desc1 = data.obj.invLines[l].description

              //   if (desc.includes('ROUNDING') == false && desc1.includes('Adhoc Disc') == false ) {
              //     if (desc1.includes('C-GST') == false && desc1.includes('S-GST') == false){
              //     alert (desc +'---Line No'+ data.obj.invLines[l].lineNumber)
              //     this.rounAmt = Math.round(((this.rounAmt + data.obj.invLines[l].amount) + Number.EPSILON) * 100) / 100;
              //     this.rounAmt = this.rounAmt;
              //   }
                 
              //   }
              // }
              var basicAmt = 0;
              var totAmt = 0;
              var disAmt = 0;
              var taxAmount = 0;
              var disctaxAmount = 0;
              for (let l = 0; l < data.obj.invLines.length; l++) {
                var desc = data.obj.invLines[l].description.toUpperCase();
                  var desc1 = data.obj.invLines[l].description
                if  (desc.includes('ROUNDING') == false){
                if (data.obj.invLines[l].description.includes('Adhoc Disc')) {
                  if (data.obj.invLines[l].amount == undefined || data.obj.invLines[l].amount == null || data.obj.invLines[l].amount == '') {
                  } else {
                    disAmt = disAmt + Number(data.obj.invLines[l].amount);
                  }
                }
                else {
                  if (data.obj.invLines[l].amount == undefined || data.obj.invLines[l].amount == null || data.obj.invLines[l].amount == '') {
          
                  } else {
                    totAmt = totAmt + Number(data.obj.invLines[l].amount);
                    // alert(totAmt)
                  }
                }
              }
              }
              // alert('totAmt------'+totAmt+'----disAmt---'+disAmt)
           
              var disAmt1 = Math.round(((disAmt) + Number.EPSILON) * 100) / 100;
              // this.poInvoiceForm.patchValue({ tdsTotDiscAmt: (disAmt1) });
              var totAmt1 = Math.round(((totAmt) + Number.EPSILON) * 100) / 100;
              var rounAmt = (totAmt1 - disAmt1);
              this.poInvoiceForm.patchValue({rounAmt:rounAmt})
              // alert(rounAmt)
              this.updateTDSTotAmtPerline1();

            }
            else {
              if (data.code == 400) {
                alert(data.message);
                this.closeResetButton = false;
                this.progress = 0;
                this.dataDisplay = 'Data Loading Failed....Some Error Is There.!'
              }
            }
          }
        );


    }
    // if (this.currentOP === 'Search') {
    //   // alert('in if search')
    //   this.tdsTaxDetailsArray().disable();
    //   this.lineDistributionArray().disable();
    //   this.invLineDetailsArray().disable();
    //   this.TaxDetailsArray().disable();
    // }
  }


  distributionLines() {

    var invoiceNumber = this.lineDetailsArray().controls[this.selectedLine].get('invoiceNum').value;
    var suppNo = this.lineDetailsArray().controls[this.selectedLine].get('suppNo').value;
    var invoiceStatus = this.lineDetailsArray().controls[this.selectedLine].get('invoiceStatus').value;
    // alert(invoiceNumber);
    var distribustionArray = this.poInvoiceForm.get('distribution') as FormArray;
    var distribustionArray1 = distribustionArray.getRawValue();
    // alert(distribustionArray1.length)
    // debugger;
    var arraybase1 = this.poInvoiceForm.get('obj') as FormArray;
    var arraybase2 = arraybase1.getRawValue();
    let distLineArray = this.poInvoiceForm.get('distribution') as FormArray;
    let distLineArray1 = distLineArray.getRawValue();
    // var accDate = arraybase2[this.selectedLine].glDate;
    // alert(arraybase2[this.selectedLine].glDate)
    // var accDate1 = this.pipe.transform(accDate, 'dd-MMM-yyyy');
    // alert(accDate1)
    if (arraybase2.length === 0) {
      alert('Please Select Lines Tab And Then Select TDS Tab.!');
      return;
    }
    if (distribustionArray1.length === 0) {
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Data Loading in progress....Do not refresh the Page'
      this.service.distributionLinesIn(invoiceNumber, suppNo, invoiceStatus)
        .subscribe(
          data => {
            this.closeResetButton = true;
            this.dispaccountingDate = false;
            this.dataDisplay = 'Data Display Sucessfully....'
            for (let i = 0; i < data.invDisLines.length; i++) {
              var invLnGrp: FormGroup = this.distLineDetails();
              this.lineDistributionArray().push(invLnGrp);
            }

            this.poInvoiceForm.get('distribution').patchValue(data.invDisLines);
            // let distLineArray = this.poInvoiceForm.get('distribution') as FormArray;
            // let distLineArray1 = distLineArray.getRawValue();
            // for (let j = 0; j < data.invDisLines.length; j++) {
            //   (distLineArray1[j].controls).patchValue({ accountingDate: arraybase2[this.selectedLine].glDate });
            // }
            this.lineDistributionArray().disable();

          }
        );
    }
    // this.lineDistributionArray().disable();
  }


  openTDSTab(tdsOperation) {
    // alert(tdsOperation)
    // this.TdsDetailsArray().clear();
    var invoiceId = this.lineDetailsArray().controls[this.selectedLine].get('invoiceId').value;
    var arraybase1 = this.poInvoiceForm.get('obj') as FormArray;
    var arraybase2 = arraybase1.getRawValue();
    var tdsLinesArray = this.poInvoiceForm.get('tdsLines') as FormArray;
    var tdsLinesArray1 = tdsLinesArray.getRawValue();
    //  alert(tdsLinesArray1.length)
    var invoiceNum = this.lineDetailsArray().controls[this.selectedLine].get('invoiceNum').value;
    var suppNo = this.lineDetailsArray().controls[this.selectedLine].get('suppNo').value;
    var invStatus = this.lineDetailsArray().controls[this.selectedLine].get('invoiceStatus').value;

    let distLineArray = this.poInvoiceForm.get('distribution') as FormArray;
    let distLineArray1 = distLineArray.getRawValue();
    let j = 0;

    var disctaxAmount = 0;

    if (distLineArray1.length === 0) {
      alert('Please Select Distribustion Tab And Then Select TDS Tab.!');
      return;
    }
    if (arraybase2.length === 0) {
      alert('Please Select Lines Tab And Then Select TDS Tab.!');
      return;
    }

    if (tdsLinesArray1.length === 0) {
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Data Loading in progress....Do not refresh the Page'
      // this.displayapInvCancelled = false;
      // this.isVisibleUpdateBtn = false;
      // this.isVisibleValidate = false;
      this.isVisibleSaveTDS = false;
      this.service.openTDSTabFn(invoiceNum, suppNo, invStatus)
        .subscribe(
          data => {
            this.closeResetButton = true;
            // this.progress = 0;
            this.dataDisplay = 'Data Display Sucessfully..'
            for (let i = 0; i < data.invTdsLines.length; i++) {
              var invLnGrp: FormGroup = this.tdsLineDetails();
              this.TdsDetailsArray().push(invLnGrp);
            }

            this.poInvoiceForm.get('tdsLines').patchValue(data.invTdsLines);
            let tdscontrolInv = this.poInvoiceForm.get('tdsLines') as FormArray;
            console.log(distLineArray1);
            for (let i = 0; i < distLineArray1.length; i++) {
              var description = distLineArray1[i].description.toUpperCase();
              // && description.includes('ROUNDING') == false
              if ((distLineArray1[i].lineTypeLookupCode != 'MISCELLANEOUS' && description.includes('ROUNDING') == false)
                || (distLineArray1[i].lineTypeLookupCode === 'MISCELLANEOUS' && distLineArray1[i].description.includes('Adhoc Disc') == true)) {
                (tdscontrolInv.controls[j]).patchValue({ invoiceId: arraybase2[this.selectedLine].invoiceId });
                (tdscontrolInv.controls[j]).patchValue({ invoiceLineNum: distLineArray1[i].invoiceLineNum });
                (tdscontrolInv.controls[j]).patchValue({ baseAmount: Math.abs(distLineArray1[i].baseAmount) });
                (tdscontrolInv.controls[j]).patchValue({ description: distLineArray1[i].description });
                tdscontrolInv.controls[j].patchValue({ distCodeCombSeg: data.invTdsLines[j].segmentName });
                j = j + 1;
                this.TdsDetailsArray().disable();

              }

            }
            this.disTdsTaxCategoryName = false;
            this.updateTDSTotAmtPerline1()

          });

    }


  }

  paymentNavigation() {
    // debugger;
    var arraybaseNew = this.poInvoiceForm.get('obj') as FormArray;

    var arraybaseNew1 = arraybaseNew.getRawValue();
    var arrayinvLines = this.poInvoiceForm.get('invLines') as FormArray;
    var arrayinvLines1 = arraybaseNew.getRawValue();
    // for (let i = 0; i < arraybaseNew1.length; i++) {
    let i = this.selectedLine;
    var invNumber = arraybaseNew1[i].invoiceNum;
    var sourceType = arraybaseNew1[i].source;
    var invType = arraybaseNew1[i].invTypeLookupCode;
    var internalSeqNum = arraybaseNew1[i].internalSeqNum;
    var suppNo = arrayinvLines1[i].suppNo;
    // alert(suppNo);
    // return;
    if (invType === 'Prepayment' && internalSeqNum != null) {
      // if (invType != 'CREDIT' || invType != 'STANDARD'){
      this.router.navigate(['/admin/transaction/Payment', invNumber, suppNo]);
      // }
    }
    else if (sourceType === 'REFUND') {
      this.router.navigate(['/admin/transaction/Payment', invNumber ]);
    }
    else if (internalSeqNum != null) {
      this.router.navigate(['/admin/transaction/Payment']);
    }

    // }
  }

  paymentCancel() {
    // const formValue: = this.paymentForm.getRawValue();
    var invoiceId = this.lineDetailsArray().controls[this.selectedLine].get('invoiceId1').value;
    this.service.cancelApInvoice(invoiceId, sessionStorage.getItem('emplId'))
      .subscribe(
        data => {
          if (data.code == 200) {
            alert(data.message);
            window.location.reload();
            this.isVisibleCancel = false;
          }
          else if (data.code === 400) {
            alert(data.message)
          }
        }
      );
  }

  // openTDSTab() {
  //   alert('hiii' + '----' + this.selectedLine)
  //   this.displayapInvCancelled = false;
  //   this.isVisibleUpdateBtn = false;
  //   this.isVisibleValidate = false;
  //   this.isVisibleSaveTDS = true;
  // }

  showTdsLines(mInvId, payGroup) {
    var invId;
    // alert(invId)
    // alert(payGroup)
    // alert(mInvId)
    if (mInvId === 0) {
      var arraybase = this.poInvoiceForm.get('obj').value;
      invId = arraybase[0].invoiceId;

      console.log(arraybase);
      this.invoiceId = arraybase[0].invoiceId;

    }
    else { invId = mInvId; }
    // alert(invId)
    var arraybase1 = this.poInvoiceForm.get('obj') as FormArray;
    var arraybase2 = arraybase1.getRawValue();
    this.poInvoiceForm.patchValue({ actualSectionCode: arraybase2[this.selectedLine].payGroup });
    this.poInvoiceForm.get('taxCategoryId1').enable();
    console.log(this.invoiceDistId);
    this.service.getTdsDetails(invId)
      .subscribe(
        data => {
          this.lstTdsLineDetails = data;
          // alert(data.length+"----data")
          console.log(this.lstTdsLineDetails);
          // for (let i = 0; i < this.TdsDetailsArray.length; i++) {
          //   this.TdsDetailsArray().removeAt(i);
          // }
          this.TdsDetailsArray().clear();
          // ;
          for (let i = 0; i < this.lstTdsLineDetails.length; i++) {
            // alert(this.lstTdsLineDetails[i].description)
            if (this.lstTdsLineDetails[i].description != undefined) {
              var description = this.lstTdsLineDetails[i].description.toUpperCase();
              // alert(description);
              if (description.includes('ROUNDING') == false) {
                var tdsLnGrp: FormGroup = this.tdsLineDetails();
                this.TdsDetailsArray().push(tdsLnGrp);
              }
            }
          }
          this.poInvoiceForm.get('tdsLines').patchValue(this.lstTdsLineDetails);
          let j = 0;
          let tdscontrolInv = this.poInvoiceForm.get('tdsLines') as FormArray;
          // TDS CODE COMMITED
          for (let i = 0; i < this.lstTdsLineDetails.length; i++) {
            if (this.lstTdsLineDetails[i].description != null || this.lstTdsLineDetails[i].description != undefined) {
              var description = this.lstTdsLineDetails[i].description.toUpperCase();
              // return;

              // alert(description);
              // alert(arraybase2[this.selectedLine].payGroup)
              if (description.includes('ROUNDING') == false) {
                (tdscontrolInv.controls[j]).patchValue({ invoiceId: invId });
                (tdscontrolInv.controls[j]).patchValue({ invoiceDistId: this.lstTdsLineDetails[i].invDistributionId });
                (tdscontrolInv.controls[j]).patchValue({ distCodeCombId: this.lstTdsLineDetails[i].distCodeCombId });
                (tdscontrolInv.controls[j]).patchValue({ description: this.lstTdsLineDetails[i].description });
                (tdscontrolInv.controls[j].patchValue({ actualSectionCode: payGroup }));
                (tdscontrolInv.controls[j].patchValue({ baseAmount: this.lstTdsLineDetails[i].baseAmount }));
                (tdscontrolInv.controls[j].patchValue({ distCodeCombSeg: this.lstTdsLineDetails[i].distCodeCombSeg }));
                (tdscontrolInv.controls[j].patchValue({ distLineNumber: this.lstTdsLineDetails[i].distLineNumber }));
                (tdscontrolInv.controls[j].patchValue({ invoiceLineNum: this.lstTdsLineDetails[i].invoiceLineNum }));
                (tdscontrolInv.controls[j].patchValue({ actualSectionCode: arraybase2[this.selectedLine].payGroup }));
                j = j + 1;
              }
            }
            // this.poInvoiceForm.get('tdsLines').patchValue(this.lstTdsLineDetails);distCodeCombSeg  distLineNumber  invoiceLineNum
          }
        });
  }

  onOptionViewTaxDetails(taxCategoryId, k) {
    // alert(k)
    var arrayControl = this.poInvoiceForm.get('invLines').value;
    var linetaxCategoryId = arrayControl[k].taxCategoryId
  }


  selectDisLineDtl(k) {
    // alert(k);
    var lineNumber = this.invLineDetailsArray().controls[k].get('lineNumber').value;
    var invoiceId = this.invLineDetailsArray().controls[k].get('invoiceId').value;
    var taxcat = this.invLineDetailsArray().controls[k].get('taxCategoryName').value;
    var itemtyp = this.invLineDetailsArray().controls[k].get('lineTypeLookupCode').value;
    var amount = this.invLineDetailsArray().controls[k].get('amount').value;
    var description = this.invLineDetailsArray().controls[k].get('description').value;
    // alert(description)
    var distributionArray = this.poInvoiceForm.get('distribution') as FormArray;
    var distributionArrVal = this.poInvoiceForm.get('distribution').value;
    console.log(distributionArray);
    var objarray = this.poInvoiceForm.get('obj').value;
    this.invoiceId = this.lstInvLineDeatails.invoiceId;
    var accDate = objarray[0].glDate;
    // var accDate1 = this.pipe.transform(accDate, 'dd-MM-yyyy');
    var gleDateNew = this.pipe.transform(objarray[0].glDate, 'y-MM-dd');
    var description1 = description.toUpperCase()

    if (amount === '' || amount == undefined || amount == null) {
      alert('Please enter amount.!');
      return;
    }
    else if (description1.includes('ROUNDING') === false) {
      if (this.invoiceId == null) {
        this.updateTotAmtPerline(k);
        alert('Distribution Line Added. Please Enter Code Combination Value in Ditribution Tab.!');
        if (distributionArray != null || distributionArray != undefined) {
          var len = k + 1;
          //  alert(len)
          for (let j = 0; j < distributionArray.length; j++) {
            console.log(distributionArrVal[j].invoiceLineNum);
            // ;
            if (distributionArrVal[j].invoiceLineNum != null && distributionArrVal[j].invoiceLineNum == len) {
              if (itemtyp != 'MISCELLANEOUS') {
                // alert(gleDateNew);
                (distributionArray.controls[k]).patchValue(
                  {
                    amount: amount,
                    baseAmount: amount,
                    accountingDate: gleDateNew,
                  }
                );
                if (taxcat != null) {
                  this.onOptionTaxCatSelected(taxcat, k)
                }
              }
              return;
            }
            else {
              if (itemtyp != 'MISCELLANEOUS') {
                // alert(gleDateNew);
                this.distribution1(k, itemtyp, amount, description);
                if (taxcat != null) {
                  this.onOptionTaxCatSelected(taxcat, k)
                }
                return;
              }

            }
          }

        }
        return;
      }

      else {
        // ;
        this.lineDistributionArray().clear();
        this.transactionService.distLinesDeatailsfa(this.invoiceId, lineNumber)
          .subscribe(
            data => {
              this.distLinesDeatails = data.distribution;
              console.log(this.distLinesDeatails);
              data.distribution.forEach(f => {
                var distLineDet: FormGroup = this.distLineDetails();
                this.lineDistributionArray().push(distLineDet);
              });
              this.poInvoiceForm.get('distribution').patchValue(this.distLinesDeatails);
            }
          );
      }
    }
    // alert(description1)
    // debugger;
    if (description1.includes('ROUNDING') === true) {
      this.displayManualAP = true;

    }
  }


  roundOffManualAP() {
    var invoiceNum = this.lineDetailsArray().controls[this.selectedLine].get('invoiceNum').value;
    var suppNo = this.lineDetailsArray().controls[this.selectedLine].get('suppNo').value;
    var arrayControl2 = this.poInvoiceForm.get('invLines') as FormArray;
    var arrayControl3 = arrayControl2.getRawValue();
    let amt = 0;
    // var description = this.invLineDetailsArray().controls[k].get('description').value;
    for (let k = 0; k < arrayControl3.length; k++) {
      var description1 = arrayControl3[k].description.toUpperCase();
      if (description1.includes('ROUNDING')) {
        // var amt = this.invLineDetailsArray().controls[k].get('amount').value;
        amt = arrayControl3[k].amount;
      }
    }
    // alert(amt);
    // return;
    this.transactionService.roundOffAPManu(invoiceNum, suppNo, amt).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.apInvFindAfterSave(res.obj.invoiceNum);
        this.TaxDetailsArray().clear();
        this.TdsDetailsArray().clear();
        this.lineDetailsArray().clear();
        this.tdsTaxDetailsArray().clear();
        this.invLineDetailsArray().clear();
      } else {
        if (res.code === 400) {
          alert(res.message);

        }
      }
    });
  }


  setFocus(name) {
    const ele = this.aForm.nativeElement[name];
    if (ele) {
      ele.focus();
    }
  }

  distribution1(k, itemtyp, amount, description) {
    // alert(itemtyp + '---amt' + amount + '-----' + k);
    // this.poInvoiceForm.get('invLines').patchValue({ locId: arrayControl[k].locationId });
    var arrayControl = this.poInvoiceForm.get('obj').value;
    var distributionSet = arrayControl[0].distributionSet;
    var arrayControl2 = this.poInvoiceForm.get('invLines').value;
    var arrayControlDist = this.poInvoiceForm.get('distribution').value;
    console.log(arrayControlDist);
    var amount = arrayControl2[k].amount;
    var invln = arrayControl2[k].lineNumber;
    // alert(invln+'----'+invoiceLineNum);
    if (amount == null) {
      alert('Kindly entered Amount');
      return;
    }
    // ;
    if (distributionSet != null && amount != null) {
      this.transactionService.DistributionDataList(distributionSet, amount)
        .subscribe(
          data => {
            this.distributionLineWise = data;
            console.log(this.distributionLineWise);
            var len = this.lineDistributionArray().length
            var totalLen = len + Number(data.distribution.length)
            if (len == 1) {
              for (let i = len - 1; i < data.distribution.length - 1; i++) {
                var distLineDet: FormGroup = this.distLineDetails();
                this.lineDistributionArray().push(distLineDet);
              }
            } else {
              for (let i = len; i < totalLen; i++) {
                var distLineDet: FormGroup = this.distLineDetails();
                this.lineDistributionArray().push(distLineDet);
              }
            }
            var control = this.poInvoiceForm.get('distribution') as FormArray;
            if (len == 1) {
              for (let i = 0, z = len - 1; i < data.distribution.length; i++, z++) {
                control.controls[z].patchValue(data.distribution[i]);
                (control.controls[z]).patchValue({ invoiceLineNum: k + 1, distLineNumber: i + 1 });
              }
            } else {
              for (let i = 0, z = len; i < data.distribution.length; i++, z++) {
                control.controls[z].patchValue(data.distribution[i]);
                (control.controls[z]).patchValue({ invoiceLineNum: k + 1, distLineNumber: z + 1 });
              }
            }
          }
        );
    }
    if ((distributionSet == null && amount != null)) {
      var patch = this.poInvoiceForm.get('distribution') as FormArray;
      var controlDist = this.poInvoiceForm.get('distribution').value;
      if (controlDist[0].lineTypeLookupCode != null && controlDist[0].distLineNumber != null) {
        this.lineDistributionArray().push(this.distLineDetails());
      }
      var aa = this.lineDistributionArray().length;
      var invoiceLineNum = controlDist.length;
      // alert(this.glDate);
      (patch.controls[aa - 1]).patchValue(
        {
          distLineNumber: aa,
          invoiceLineNum: invln,
          lineTypeLookupCode: itemtyp,
          amount: amount,
          baseAmount: amount,
          accountingDate: arrayControl[0].glDate,
          description: description,
        }
      );
      // this.accountingDate = this.glDate;
      // }

      this.distarr.set(invln, this.poInvoiceForm.get('distribution').value);
    }

  }

  move(val1, val2) {
    val2.focus();
  }

  InventIdSelected(event, k) {
    let select = this.invItemList1.find(d => d.segment === event);
    this.invItemId = select.itemId;
    let controlinv = this.poInvoiceForm.get('invLines') as FormArray;
    (controlinv.controls[k]).patchValue({ itemId: select.itemId });
    (controlinv.controls[k]).patchValue({ hsnSacCode: select.hsnSacCode });
    this.invDescription = this.invItemList1[0].description;
    this.invLineDetailsArray().get('description').disable();
  }

  getInvItemId($event) {
    let userId = (<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
    this.userList2 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList2 = this.searchFromArray1(this.invItemList, userId);
      }
    }
  }
  searchFromArray1(arr: any[], regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };


  filterRecord(event, i) {
    // alert(event+'Filter');
    var itemCode = event.target.value;
    // alert(itemCode+'-----'+itemCode.length)
    if (event.keyCode == 13) {
      // enter keycode
      if (itemCode.length == 8) {
        if (this.invItemList.length <= 1) {
          // if (invTyp === 'Manual') {
          // alert('inside if--');
          this.service.searchByItemSegmentAR(itemCode.toUpperCase())
            .subscribe((data) => {
              this.invItemList = data.obj;
              this.onOptioninvItemIdSelected(itemCode, i);
            });
          // } 
        }
        return;
      } else if (itemCode.length >= 4) {
        // alert(trxType);
        // if (invTyp === 'Manual') {
        // alert('inside if');
        this.service.searchByItemSegmentAR(itemCode.toUpperCase())
          .subscribe((data) => {
            this.invItemList = data.obj;

          });
        // } 

      } else {
        alert('Please Enter 4 characters of item number!!');
        return;
      }
    }
  }

  orderedItem: string;
  public itemMap = new Map<string, any[]>();
  public itemMap2 = new Map<number, any[]>();
  searchByItemSegmentDetails(itemDesc, k) {
    // alert(itemDesc)
    var itemDesc = itemDesc.toUpperCase();
    this.service.searchByItemSegmentAR(itemDesc.toUpperCase())
      .subscribe(
        data => {
          this.invItemList1 = data.obj;
          console.log(data.invItemList1);
          // this.itemMap.set(itemDesc, data.obj);
          // this.itemMap2.set(k, this.itemMap.get(itemDesc));
        }
      );
  }

  onOptioninvItemIdSelected(itemId, index) {
    // alert(index+'---Index----'+itemId)
    console.log(this.invItemList);
    let selectedValue = this.invItemList1.find(v => v.segment == itemId);
    console.log(selectedValue)
    var patch = this.poInvoiceForm.get('invLines') as FormArray;
    // ;
    patch.controls[index].patchValue({
      itemId: selectedValue.itemId,
      description: selectedValue.description,
      invCategory: selectedValue.itemCategory,
      uom: selectedValue.uom,
      hsnSacCode: selectedValue.hsnSacCode,
      poChargeAcc: selectedValue.poChargeAccount,
      diss1: 0,
    })
    patch.controls[index].get('description').disable();
    // alert(selectedValue.isTaxable +'selectedValue.isTaxable')
    if (selectedValue.isTaxable == 'N') {
      patch.controls[index].get('taxPer').disable();
      patch.controls[index].get('taxCategoryName').disable();
    }
    var custaxTaxCatName = patch[index].get('taxCategoryName').value;
    // alert(custaxTaxCatName+'custaxTaxCatName')
    if (custaxTaxCatName === 'Sales-IGST') {
      this.orderManagementService.addonDescList2(itemId, custaxTaxCatName, 1, 'N')
        .subscribe(
          data => {
            if (data.code === 200) {
              this.addonDescList = data.obj;
              for (let i = 0; i < data.obj.length; i++) {
                var itemtaxCatNm: string = data.obj[i].taxCategoryName;
                if (itemtaxCatNm.includes('Sale-I-GST')) {
                  (patch.controls[index]).patchValue({
                    hsnSacCode: data.obj[i].hsnSacCode,
                    uom: data.obj[i].uom,
                  });
                  this.orderManagementService.getTaxCategoriesForSales(custaxTaxCatName, data.obj[i].taxPercentage)
                    .subscribe(
                      data1 => {
                        this.taxCategoryList[index] = data1;
                        console.log(this.taxCategoryList[index]);
                        console.log(data.obj[i].taxCategoryName);
                        this.allTaxCategoryList[index] = data1;
                        let itemCateNameList = this.taxCategoryList[index].find(d => d.taxCategoryName === data.obj[i].taxCategoryName);
                        console.log(itemCateNameList);

                        (patch.controls[index]).patchValue({
                          taxCategoryId: itemCateNameList.taxCategoryId,
                          taxCategoryName: itemCateNameList,
                        })
                      }
                    );
                }
              }

            }
            else if (data.code === 400) {
              alert(data.message)
            }
          });
    }
    else {
      // alert(custaxTaxCatName+'custaxTaxCatName in else')
      this.orderManagementService.addonDescList2(itemId, custaxTaxCatName, 1, 'N')
        .subscribe(
          data => {
            if (data.code === 200) {
              this.addonDescList = data.obj;
              // for (let i = 0; i < data.obj.length; i++) {
              var itemtaxCatNm: string = data.obj[0].taxCategoryName;
              // alert(data.obj[0].taxCategoryName+'TAX IN FOR'+itemtaxCatNm+data.obj[0].taxPercentage)
              if (itemtaxCatNm.includes('Sale-S&C-GST')) {
                // alert(itemtaxCatNm+'--in If'+custaxTaxCatName);
                (patch.controls[index]).patchValue({
                  // itemId: data.obj[i].itemId,
                  // orderedItem: data.obj[i].description,
                  hsnSacCode: data.obj[0].hsnSacCode,
                  uom: data.obj[0].uom,
                  // unitSellingPrice: data.obj[0].priceValue,by vinita
                });
                // alert(custaxTaxCatName +'-------'+ data.obj[0].taxPercentage);
                this.orderManagementService.getTaxCategoriesForSales(custaxTaxCatName, data.obj[0].taxPercentage)
                  .subscribe(
                    data1 => {
                      this.taxCategoryList[index] = data1;
                      console.log(this.taxCategoryList[index]);
                      console.log(data.obj[0].taxCategoryName);
                      this.allTaxCategoryList[index] = data1;
                      let itemCateNameList = this.taxCategoryList[index].find(d => d.taxCategoryName === data.obj[0].taxCategoryName);
                      console.log(itemCateNameList);

                      (patch.controls[index]).patchValue({
                        taxCategoryId: itemCateNameList.taxCategoryId,
                        taxCategoryName: itemCateNameList,
                      })
                    }
                  );
              }
              // }

            }
            else if (data.code === 400) {
              alert(data.message)
            }
          })
        ;
    }
    // }
  }



  onHsnCodeSelected(event, index) {
    // alert(event); 
    console.log(event);
    var gstPer = event.split('--');
    let selectgstPercentage = this.hsnSacCodeList.find(v => v.hsnsaccode == gstPer[0]);
    console.log(selectgstPercentage);
    if (event != null && event != 'NA') {
      var gstPercentage = selectgstPercentage.gstPercentage;
      console.log(gstPercentage);
      let control = this.poInvoiceForm.get('invLines') as FormArray;
      (control.controls[index]).patchValue(
        {
          gstPercentage: selectgstPercentage.gstPercentage,
        });
      console.log(this.poInvoiceForm.get('taxCategoryName'));
      console.log(this.lineDetailsArray().controls[0].get('taxCategoryName').value);
      var CusttaxCategoryName = this.lineDetailsArray().controls[0].get('taxCategoryName').value;
      this.service.taxCategoryListNew(CusttaxCategoryName, gstPer[1])
        .subscribe(
          data1 => {
            this.taxCategoryList[index] = data1;
            console.log(this.taxCategoryList);
          }
        );
    }
  }

  onSiteSelected(siteId: any) {
    this.service.siteIdList(siteId)
      .subscribe(
        data => {
          this.siteIdList = data;
          console.log(this.siteIdList);
          // alert(data.suppId.supTdsYN)
          this.lineDetailsArray().controls[0].patchValue({ taxCategoryName: data.taxCategoryName })
          if (data.suppId.supTdsYN === 'Y') {
            // alert('--if---'+data.suppId.supTdsYN)
            this.lineDetailsArray().controls[0].patchValue({ payGroup: data.suppId.supTdsTyp });
            this.lineDetailsArray().controls[0].patchValue({ supTdsYN: data.suppId.supTdsYN });
            this.isVisibleTDSTab = false;
          }
          else if (data.suppId.supTdsYN === 'N') {
            this.isVisibleTDSTab = false;
            this.lineDetailsArray().controls[0].patchValue({ payGroup: data.suppId.supTdsTyp });
          }
          // alert(data.suppId.name)

        }
      );
  }

  onSelectChassis(event, i) {
    // alert(i+'-----'+ event.target.value);
    let select = this.chassisNoList.find(d => d.orderedItem === event.target.value);
    console.log(select);
    this.lineDetailsArray().controls[i].patchValue({ voucherNum: select.referenceNo });
    this.lineDetailsArray().controls[i].patchValue({ trxNumber: select.trxNumber });
  }


  onSelectAddonType(event) {
    var addType = event.target.value;
    if (addType.includes('RTO')) {
      alert('Your selected RTO addon Type. Please Select Chassis & Order Number.!')
      this.service.chassisList(sessionStorage.getItem('ouId'), addType)
        .subscribe(
          data => {
            console.log(data);
            this.chassisNoList = data.obj;
          })
    }
    else if (addType.includes('INS')) {
      alert('Your selected Insurance addon Type. Please Select Chassis & Order Number.!')
      this.service.chassisList(sessionStorage.getItem('ouId'), addType)
        .subscribe(
          data => {
            console.log(data);
            this.chassisNoList = data.obj;
          })
    }
  }

  onOptionTaxCatSelected(taxCategoryName, k) {
    if (this.isSearchPatch === false) {
      this.displayViewTaxDetails = false;
      // this.TaxDetailsArray().clear();
      var arrayControl = this.poInvoiceForm.get('invLines').value;
      var arrayControlNew = this.poInvoiceForm.get('invLines') as FormArray;
      var arrayControlNew1 = arrayControlNew.getRawValue()
      var invdescription = arrayControlNew1[k].description;
      var lineTypeLookupCode = arrayControlNew1[k].lineTypeLookupCode;
      var amount = arrayControlNew1[k].amount;
      // alert(invdescription+'---'+lineTypeLookupCode);
      if (lineTypeLookupCode === 'OTHER') {
        if (invdescription === '' || invdescription === undefined || invdescription === null) {
          alert('First Select Desciption');
          return;
        }
      }

      var hsnsac = arrayControl[k].hsnSacCode.split('--');
      // alert(hsnsac);

      var objarray = this.poInvoiceForm.get('obj').value;
      this.indexVal = arrayControl[k].lineNumber;
      // alert(this.indexVal);
      var amount = arrayControl[k].amount;
      let select = this.taxCategoryList[k].find(d => d.taxCategoryName === taxCategoryName);
      let controlinv = this.poInvoiceForm.get('invLines') as FormArray;
      var existlinecnt = controlinv.length;
      (controlinv.controls[k]).patchValue({ taxCategoryId: select.taxCategoryId });
      (controlinv.controls[k]).patchValue({ locId: objarray[0].locationId });
      (controlinv.controls[k]).patchValue({ 'hsnSacCode': hsnsac[0] });
      var disAm = 0;
      var sum = 0;
      // var klen = k + 1;
      // var klen = this.invoiceLineNo
      this.transactionService.getTaxDetailsNew(select.taxCategoryId, sessionStorage.getItem('ouId'), disAm, amount, this.indexVal)
        .subscribe(
          data => {
            this.lstInvLineDeatails1 = data;
            this.TaxDetailsArray().clear();
            console.log(this.lstInvLineDeatails1);
            for (let i = 0; i < this.lstInvLineDeatails1.taxLines.length; i++) {
              if (this.lstInvLineDeatails1.taxLines[i].totTaxPer != 0) {
                sum = sum + Math.abs(this.lstInvLineDeatails1.taxLines[i].totTaxAmt);
              }

            }
            var patch = this.poInvoiceForm.get('obj') as FormArray;
            var isLnExist: boolean = false;
            for (let i = 0; i < data.miscLines.length; i++) {
              isLnExist == false;
              for (let m = 0; m < arrayControl.length; m++) {

                if (data.miscLines[i].lineNumber == arrayControl[m].lineNumber) {
                  isLnExist = true;
                  controlinv.controls[m].patchValue(data.miscLines[i]);
                  break;
                }
              }
              if (isLnExist == false) {
                var invLnGrp: FormGroup = this.invLineDetails();
                this.invLineDetailsArray().push(invLnGrp);
              }

              var accDate = objarray[0].glDate;
              var accDate1 = this.pipe.transform(accDate, 'dd-MMM-yyyy');
              (controlinv.controls[i]).patchValue({ accountingDate: accDate1 });
            }
            controlinv = this.poInvoiceForm.get('invLines') as FormArray;
            arrayControl = this.poInvoiceForm.get('invLines').value;
            (controlinv.controls[0]).patchValue({ lineNumber: 1 });
            var x = controlinv.length + 1;
            var miscLns = new Array();
            miscLns = data.miscLines;

            for (let m = 0; m < arrayControl.length; m++) {
              for (let i = 0; i < miscLns.length; i++) {
                if (arrayControl[m].lineNumber == null) {
                  controlinv.controls[m].patchValue(miscLns[i]);
                  controlinv.controls[m].patchValue({ glDate: objarray[0].glDate });
                  arrayControl[m].lineNumber = miscLns[i].lineNumber;
                  miscLns.splice(i, 1);
                  break;
                } else if (miscLns[i].lineNumber == arrayControl[m].lineNumber) {
                  controlinv.controls[m].patchValue(miscLns[i]);
                }
              }
            }
            let controlinv1 = this.poInvoiceForm.get('taxLines') as FormArray;
            this.TaxDetailsArray().clear();
            for (let i = 0; i < data.taxLines.length; i++) {
              var invLnGrp: FormGroup = this.TaxDetailsGroup();
              this.TaxDetailsArray().push(invLnGrp);
              console.log(new Date());
            }
            this.poInvoiceForm.get('taxLines').patchValue(data.taxLines);
            // this.poInvoiceForm.get('invLines').patchValue(data.miscLines);
            // alert(objarray[0].glDate)
            for (let j = 0; j < data.taxLines.length; j++) {
              controlinv1.controls[j].patchValue({
                invLineNo: this.indexVal + 1,
              });
              var patch = this.poInvoiceForm.get('obj') as FormArray;
              var taxLinesData = this.poInvoiceForm.get('taxLines').value;
              console.log(taxLinesData);
              this.displaylineNumber = false;
              var lnv = this.indexVal;
              var lno: String = String(lnv);
              this.taxMap.set(String(lno), taxLinesData);
              console.log(this.taxMap.get(String(lno)));
            }
            if (data.taxLines.length != 0) {
              alert('Tax Details Has Been Patched... Please Confirm!');
            }
            this.invLineNo = k + 1;
            this.taxarr.set(this.invLineNo, this.poInvoiceForm.get('taxLines').value);
            let controlDist = this.poInvoiceForm.get('distribution') as FormArray;
            var controlPatchDist = this.poInvoiceForm.get('distribution').value;
            var x1 = Number((this.lineDistributionArray().length));
            var len = this.lineDistributionArray().length
            var totalLen = len + Number(data.invDisLines.length);
            // ;
            if (len == 1) {

              if (controlPatchDist[0].distLineNumber != null) {

                for (let i = len; i <= data.invDisLines.length; i++) {
                  var invLnGrp: FormGroup = this.distLineDetails();
                  this.lineDistributionArray().push(invLnGrp);
                }
              } else {

                for (let i = len - 1; i < data.invDisLines.length - 1; i++) {
                  var invLnGrp: FormGroup = this.distLineDetails();
                  this.lineDistributionArray().push(invLnGrp);
                }
              }
            } else {
              for (let i = len; i < totalLen; i++) {
                var invLnGrp: FormGroup = this.distLineDetails();
                this.lineDistributionArray().push(invLnGrp);
              }

            }
            if (len == 1) {
              // alert(len)
              if (controlPatchDist[0].distLineNumber != null) {
                // alert('hiiii  ----')
                for (let i = 0, z = len; i < data.invDisLines.length; i++, z++) {
                  // alert('first for looop')
                  controlDist.controls[z].patchValue(data.invDisLines[i]);
                  controlDist.controls[z].patchValue({ accountingDate: objarray[0].glDate });
                  (controlDist.controls[z]).patchValue({ invoiceLineNum: Number(this.invoiceLineNo), distLineNumber: z + 1 });
                }
              }
              else {
                for (let i = 0, z = len - 1; i < data.invDisLines.length; i++, z++) {
                  // alert('for lopp')
                  controlDist.controls[z].patchValue(data.invDisLines[i]);
                  (controlDist.controls[z]).patchValue({ invoiceLineNum: Number(this.invoiceLineNo), distLineNumber: z + 1 });
                  (controlDist.controls[z]).patchValue({ accountingDate: objarray[0].glDate });
                }
              }
            } else {

              for (let i = 0, z = len; i < data.invDisLines.length; i++, z++) {
                controlDist.controls[z].patchValue(data.invDisLines[i]);
                (controlDist.controls[z]).patchValue({ invoiceLineNum: Number(this.invoiceLineNo), distLineNumber: z + 1 });
                (controlDist.controls[z]).patchValue({ accountingDate: objarray[0].glDate });
              }

            }
            // alert(accDate1)
            this.distarr.set(this.invLineNo, this.poInvoiceForm.get('distribution').value);
            this.updateTotAmtPerline(k)
          })
    }
  }












  updateTotAmtPerline(lineIndex) {
    // alert(lineIndex);
    var formArr = this.poInvoiceForm.get('invLines') as FormArray;
    var formVal = formArr.getRawValue();
    console.log(formVal);
    var basicAmt = 0;
    var taxAmt1 = 0;
    var totAmt = 0;
    var disAmt = 0;
    var tcsAmt1 = 0;
    for (let i = 0; i < formVal.length; i++) {
      if (formVal[i].lineTypeLookupCode === 'MISCELLANEOUS') {
        if (formVal[i].amount == undefined || formVal[i].amount == null || formVal[i].amount == '') {

        } else {
          taxAmt1 = taxAmt1 + Number(formVal[i].amount);
          // alert(taxAmt1)
        }
      }
      else {
        if (formVal[i].amount == undefined || formVal[i].amount == null || formVal[i].amount == '') {

        } else {
          basicAmt = basicAmt + Number(formVal[i].amount);
          // alert(taxAmt1)
        }
      }
    }
    // alert(taxAmt1);
    taxAmt1 = Math.round(((taxAmt1) + Number.EPSILON) * 100) / 100;
    var headerArray = this.poInvoiceForm.get('obj').value;
    var invAmt = headerArray[0].invoiceAmt;
    var totInvAmt = (invAmt + taxAmt1);
    var patchheaderArray = this.poInvoiceForm.get('obj').value;
    var invAmt = patchheaderArray[0].invoiceAmt;
    var patch = this.poInvoiceForm.get('obj') as FormArray;
    // alert(patchheaderArray[0].invTypeLookupCode)
    if (patchheaderArray[0].invTypeLookupCode !='Credit Memo'){
    (patch.controls[0]).patchValue({ invoiceAmt: Math.abs(basicAmt + taxAmt1).toFixed(2) });
  }
  else if (patchheaderArray[0].invTypeLookupCode ==='Credit Memo'){
    (patch.controls[0]).patchValue({ invoiceAmt: (basicAmt + taxAmt1).toFixed(2) });
  }
    (patch.controls[0]).patchValue({ taxAmt: (taxAmt1).toFixed(2) });
  }














  amountmatch(k, qty1) {

    var currentlinamt = qty1.target.value;
    var invarr = this.poInvoiceForm.get('invLines').value;

    var distotamt = 0;

    var disarr = this.poInvoiceForm.get('distribution').value;
    var dispatch = this.poInvoiceForm.get('distribution') as FormArray;
    var lnrow = disarr[k].invoiceLineNum;
    for (let i = 0; i <= this.lineDetailsArray().length; i++) {
      var invln = invarr[i].lineNumber;
      var invtyp = invarr[i].lineTypeLookupCode;
      var itemInvamt = invarr[i].amount;
      if (invarr[i].lineTypeLookupCode != 'MISCELLANEOUS' && invln === lnrow) {
        var disamt = 0;
        for (let j = 0; j < this.lineDistributionArray().length; j++) {
          if (disarr[j].lineTypeLookupCode != 'MISCELLANEOUS' && disarr[j].invoiceLineNum === lnrow) {
            var disln = disarr[j].invoiceLineNum;

            var distyp = disarr[j].lineTypeLookupCode;

            if (j == k) {
              disamt = qty1.target.value;
            }
            else {
              disamt = Number(disarr[j].amount);
            }
            distotamt = Number(distotamt) + Number(disamt);
          }
        }

      }
      if (invln === disln && invtyp === distyp && distotamt < itemInvamt) {

        var newrow = k + 1;
        this.addRowDistribution(newrow);
        dispatch.controls[newrow].patchValue({ invoiceLineNum: invln });
        (dispatch.controls[newrow - 1]).patchValue(
          {
            distLineNumber: newrow,
          }
        );

        return;
      }
      if (distotamt > itemInvamt) {
        alert('You can not enter more than invoice amount line');
        qty1.focus();
      }
    }

  }

  openCodeComb1(i) {
    // alert(i)
    var arrayControl = this.poInvoiceForm.get('distribution').value;
    var invLinesControl = this.poInvoiceForm.get('invLines').value;
    let segmentName1 = arrayControl[i].distCodeCombSeg;
    // alert(segmentName1)
    if (segmentName1 === null || segmentName1 == '') {
      this.poInvoiceForm.get('segment11').reset();
      var branchNM = sessionStorage.getItem('locCode').split('.');

      this.BranchList = this.BranchList.filter((br => br.lookupValue === branchNM[0]));
      this.poInvoiceForm.get('segment11').reset();
      this.poInvoiceForm.get('segment2').reset();
      this.poInvoiceForm.get('segment3').reset();
      this.poInvoiceForm.get('segment4').reset();
      this.poInvoiceForm.get('segment5').reset();
      this.poInvoiceForm.get('lookupValueDesc1').reset();
      this.poInvoiceForm.get('lookupValueDesc2').reset();
      this.poInvoiceForm.get('lookupValueDesc3').reset();
      this.poInvoiceForm.get('lookupValueDesc4').reset();
      this.poInvoiceForm.get('lookupValueDesc5').reset();
    }
    if (segmentName1 != null || segmentName1.Length > 0) {

      var temp = segmentName1.split('.');
      if (temp.length > 0) {
        this.segment11 = temp[0];
        this.segment2 = temp[1];
        this.segment3 = temp[2];
        this.segment4 = temp[3];
        this.segment5 = temp[4];
      }
    }
    this.displayModal = false;
    this.showModal = true; // Show-Hide Modal Check
    this.content = i; // Dynamic Data
    let a = i + 1
    let naln = this.NaturalAccountList.length;
    this.title = naln + "--Distribution Line :" + a;    // Dynamic Data
    console.log(this.NaturalAccountList);

  }

  onOptionsSelected(event: any, k) {
    var patch = this.poInvoiceForm.get('distribution') as FormArray;
    if (event === 'Validated') {
      patch.controls[k].patchValue({
        poChargeDesc: 'Processed',
      })
    }
    if (event === 'Not Validated' || event === 'Etc') {
      patch.controls[k].patchValue({
        poChargeDesc: 'Unprocessed',
      })
    }
    if (event === '--Select--') {
      patch.controls[k].patchValue({
        poChargeDesc: '',
      })
    }
  }


  addDiscount(i) {
    let controlinv1 = this.poInvoiceForm.get('taxLines').value;
    let controlinv = this.poInvoiceForm.get('taxLines') as FormArray;
    var invLineNo = controlinv1[i].invLineNo;
    var invLineItemId = controlinv1[i].invLineItemId;
    this.activeLineNo = invLineNo;
    var arrayControl = this.poInvoiceForm.get('invLines').value;
    var patch = this.poInvoiceForm.get('invLines') as FormArray;
    var patchDistributionAmt = this.poInvoiceForm.get('distribution') as FormArray;
    var distributionValue = this.poInvoiceForm.get('distribution').value;
    var arrayControlTax = this.poInvoiceForm.get('taxLines').value;
    var index = Number(arrayControlTax[i].invLineNo);
    var amount = arrayControl[index - 1].amount;
    var taxCategoryId = arrayControl[index - 1].taxCategoryId;
    var diss = arrayControlTax[0].totTaxAmt;
    var itemId = arrayControl[index - 1].itemId;
    this.service.taxCalforItem(sessionStorage.getItem('ouId'), taxCategoryId, diss, amount)
      .subscribe(
        (data: any[]) => {
          this.taxCalforItem = data;
          for (let i = 0, j = index; i < this.taxCalforItem.length; i++, j++) {
            (patch.controls[j]).patchValue(
              {
                amount: this.taxCalforItem[i].totTaxAmt,

              }
            );


          }
          for (let i = 0, j = 0; i < this.lineDistributionArray().length; i++) {
            if (invLineNo == distributionValue[i].invoiceLineNum && distributionValue[i].lineTypeLookupCode == 'MISCELLANEOUS') {
              patchDistributionAmt.controls[i].patchValue(
                {
                  amount: this.taxCalforItem[j].totTaxAmt,
                  baseAmount: this.taxCalforItem[j].totTaxAmt,
                }
              );
              j = j + 1;
            }
          }
          this.patchResultList(i, this.taxCalforItem, invLineNo, invLineItemId);
        });
  }


  patchResultList(i, taxCalforItem, invLineNo, invLineItemId) {
    let control = this.poInvoiceForm.get('taxLines') as FormArray
    control.clear();
    taxCalforItem.forEach(x => {
      console.log('in patch' + taxCalforItem);
      console.log(x.taxRateName);
      control.push(this.fb.group({
        totTaxAmt: Math.abs(x.totTaxAmt),
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
        invLineNo: invLineNo,
        invLineItemId: invLineNo
      }));
    });
    console.log(control);
  }

  close() {
    this.router.navigate(['admin']);
  }

  refresh() {
    window.location.reload();
  }

  apInvCancelled() {
    var invoiceNum = this.lineDetailsArray().controls[this.selectedLine].get('invoiceNum').value;
    this.transactionService.apInvoiceCancellation(invoiceNum, sessionStorage.getItem('emplId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            alert(data.message);
            this.isVisible = false;
          }
          else if (data.code === 400) {
            alert(data.message);
          }
        }
      );
  }


  viewAccounting() {
    this.viewAccounting2 = null;
    this.viewAccountingLines = null;
    this.showViewActLine = false;
    this.runningTotalCr = null;
    this.runningTotalDr = null;
    var invoiceNum = this.lineDetailsArray().controls[this.selectedLine].get('invoiceNum').value;
    var suppId = this.lineDetailsArray().controls[this.selectedLine].get('suppId').value;
    this.service.viewAPAccounting(invoiceNum, suppId).subscribe((res: any) => {
      if (res.code === 200) {
        this.viewAccounting2 = res.obj;
        // this.description = res.obj.description;
        // this.periodName = res.obj.periodName;
        // this.postedDate = res.obj.postedDate;
        // this.jeCategory = res.obj.jeCategory;
        // this.name1 = res.obj.name;
        // this.ledgerId = res.obj.ledgerId;
        // this.runningTotalDr = res.obj.runningTotalDr;
        // this.runningTotalCr = res.obj.runningTotalCr;
        // this.docSeqValue = res.obj.docSeqValue;
        // console.log(this.description);

        this.viewAccounting1 = res.obj.glLines;
        console.log(this.viewAccounting1);
        // alert(res.message);
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
  }


  ViewActSelect(index) {
    // alert ("View Act Line ..."+index);
    this.showViewActLine = true;
    var invoiceNum = this.lineDetailsArray().controls[this.selectedLine].get('invoiceNum').value;
    var suppId = this.lineDetailsArray().controls[this.selectedLine].get('suppId').value;
    this.service.viewAPAccounting(invoiceNum, suppId).subscribe((res: any) => {
      if (res.code === 200) {
        this.viewAccountingLines = res.obj[index].glLines;
        console.log(this.viewAccountingLines);
        this.runningTotalDr = res.obj[index].runningTotalDr;
        this.runningTotalCr = res.obj[index].runningTotalCr;
        // this.paymentArForm.patchValue({totalDr:res.obj[index].runningTotalDr})
        // this.paymentArForm.patchValue({totalCr:res.obj[index].runningTotalCr})
        // alert(this.runningTotalDr +","+this.runningTotalCr);
      }
      else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });



  }

  HeaderValidate() {
    var arrayControl = this.poInvoiceForm.get('obj').value;
    var arrayControlHeader = this.poInvoiceForm.get('obj') as FormArray;
    var arrayControlHeader1 = arrayControlHeader.getRawValue();
    var arrayControlInvDetails = this.poInvoiceForm.get('invLines').value;
    var arrayControl2 = this.poInvoiceForm.get('invLines') as FormArray;
    var arrayControl1 = arrayControl2.getRawValue();
    var arrayCaontrolOfDistribution = this.poInvoiceForm.get('distribution').value;
    var amount: number = this.lineDetailsArray().controls[this.selectedLine].get('invoiceAmt').value;
    // alert(amount)
    var totalOfInvLineAmout: number = 0;
    for (let i = 0; i < this.invLineDetailsArray().length; i++) {
      var desc1: string = arrayControl1[i].description;
      if (desc1 === 'null' || desc1 === null) {
        totalOfInvLineAmout = Math.round(((arrayControl1[i].amount) + Number.EPSILON) * 100) / 100;
      }
      else {
        if (desc1.includes('Adhoc Disc')) {
          totalOfInvLineAmout = Math.round(((totalOfInvLineAmout - arrayControl1[i].amount) + Number.EPSILON) * 100) / 100;
        } else {
          totalOfInvLineAmout = Math.round(((totalOfInvLineAmout + arrayControl1[i].amount) + Number.EPSILON) * 100) / 100;
        }
      }
    }
    var totalOfDistributionAmout: number = 0;
    for (let j = 0; j < this.lineDistributionArray().length; j++) {
      var desc1: string = arrayCaontrolOfDistribution[j].description;
      if (desc1 === 'null' || desc1 === null) {
        totalOfDistributionAmout = Math.round(((Number(arrayCaontrolOfDistribution[j].amount)) + Number.EPSILON) * 100) / 100;
      }
      else {
        if (desc1.includes('Adhoc Disc')) {
          totalOfDistributionAmout = Math.round(((totalOfDistributionAmout - Number(arrayCaontrolOfDistribution[j].amount)) + Number.EPSILON) * 100) / 100;
        } else {
          totalOfDistributionAmout = Math.round(((totalOfDistributionAmout + Number(arrayCaontrolOfDistribution[j].amount)) + Number.EPSILON) * 100) / 100;
        }
      }
    }
    // for (let k = 0; k < this.lineDistributionArray().length; k++){
    //   alert(arrayControlHeader1[k].invTypeLookupCode)
    //   if (arrayControlHeader1[k].invTypeLookupCode === 'Standard Invoice'){
    //   if (arrayControlInvDetails[k].lineTypeLookupCode ===undefined || arrayControlInvDetails[k].lineTypeLookupCode===''|| arrayControlInvDetails[k].lineTypeLookupCode===null){
    //     alert('Line Number - '+arrayControlInvDetails[k].lineNumber+' ' +'Please Line level Item Type');
    //     return;
    //   }
    //   if (arrayControlInvDetails[k].description ===undefined || arrayControlInvDetails[k].description===''|| arrayControlInvDetails[k].description===null){
    //     alert('Line Number - '+arrayControlInvDetails[k].lineNumber +' '+'Please Enter Line level Item Description');
    //     return;
    //   }
    // }
    // }
    // alert('Header Amt---'+amount+'---Total Line Amt---'+totalOfInvLineAmout+'---total Distribution Amt---' +totalOfDistributionAmout);
    if (amount == totalOfInvLineAmout && amount == totalOfDistributionAmout) {

      this.apInvoiceSave()
    }
    else {
      alert('Amount Missmach kindly check');
      return;
    }
  }


  apInvoiceSave() {
    this.displayValidateButton = false;
    let jsonData = this.poInvoiceForm.value.obj[0];
    jsonData.ouId = this.ouId;
    jsonData.emplId = this.emplId;
    jsonData.amtAppToDisc = 0;
    this.isVisibleSelectButton = true;
    jsonData.accPayCodeCombId = 2079
    jsonData.currency = 'INR';

    var taxStr = [];
    var distributionArray = this.poInvoiceForm.get('distribution').value;
    var invLinesArray1 = this.poInvoiceForm.get('obj') as FormArray;
    var invLinesArray = invLinesArray1.getRawValue();
    // var distributionArray = distribution.getRawValue();
    for (let d = 0; d < distributionArray.length; d++) {
      if (distributionArray[d].lineTypeLookupCode === 'OTHER') {
        if (distributionArray[d].distCodeCombSeg === null || distributionArray[d].distCodeCombSeg === undefined || distributionArray[d].distCodeCombSeg === '') {
          alert('Please Select Code Combination In Distribution Tab. Line No ' + distributionArray[d].distLineNumber);
          return;
        }
      }
    }
    for (let i = 0; i < invLinesArray.length; i++) {
      // var hsn=invLinesArray[i].hsnSacCode.split('--');
      // invLinesArray[i].hsnSacCode=hsn[0];
      // alert(invLinesArray[i].glDate +'----'+invLinesArray[i].name);
      if (invLinesArray[i].glDate === undefined) {
        alert('Please Select GL Date.!');
        return;
      }
      // alert(invLinesArray[i].suppNo);
      // console.log(this.supplierCodeList);
      // let selectedValue = this.supplierCodeList.find(v => v.suppNo == invLinesArray[i].suppNo);
      // console.log(selectedValue);
      // var SuppName = selectedValue.name;
      // if (SuppName.includes('RTO')) {
      //   if (invLinesArray[i].description === undefined || invLinesArray[i].description === '' || invLinesArray[i].description === null) {
      //     alert('Your Selected Supplier is RTO. Please Select Chassis No & Order Number.!');
      //     return;
      //   }
      // }
      // if (SuppName.includes('INSUARNCE')) {
      //   if (invLinesArray[i].description === undefined || invLinesArray[i].description === '' || invLinesArray[i].description === null) {
      //     alert('Your Selected Supplier is Insuarnce. Please Select Chassis No & Order Number.!');
      //     return;
      //   }
      // }
    }
    for (let taxlinval of this.taxarr.values()) {
      for (let i = 0; i < taxlinval.length; i++) {
        taxStr.push(taxlinval[i]);
      }
    }
    var disStr = [];
    for (let dislinval of this.distarr.values()) {
      for (let i = 0; i < dislinval.length; i++) {
        disStr.push(dislinval[i]);
      }
    }
    let manInvObj = Object.assign(new ManualInvoiceObjNew(), jsonData);
    manInvObj.setinvLines(this.poInvoiceForm.get('invLines').value);
    manInvObj.setinvDisLines(this.poInvoiceForm.get('distribution').value);
    var tdsVals = this.poInvoiceForm.get('tdsLines').value;
    if (tdsVals.taxCategoryId === null) {
      manInvObj.setInvTdsLines(this.poInvoiceForm.get('tdsLines').value);
    }

    manInvObj.setTaxLines(taxStr);
    console.log(JSON.stringify(manInvObj));
    var reqArr: any[];
    console.log(reqArr);
    console.log(JSON.stringify(manInvObj));
    this.transactionService.apInvSaveSubmit(JSON.stringify(manInvObj)).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.internalSeqNum = res.obj;
        var patch = this.poInvoiceForm.get('obj') as FormArray;
        var haederDtls = this.poInvoiceForm.get('obj').value;
        patch.controls[0].patchValue({ invoiceId: res.obj });
        var invNum = haederDtls[0].invoiceNum;
        // alert(invNum);
        this.poInvoiceForm.patchValue({ invoiceId: res.obj.id });
        var invNumber = res.obj.name;
        // alert(invNumber)
        this.showTdsLines(res.obj.id, this.payGroup);
        this.apInvFindAfterSave(invNumber);
        // this.poInvoiceForm.reset();
        // window.location.reload();
        // this.apInvFind(invNum);
        this.TaxDetailsArray().clear();
        this.TdsDetailsArray().clear();
        this.lineDetailsArray().clear();
        this.tdsTaxDetailsArray().clear();
        this.invLineDetailsArray().clear();
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
  }



  apInvFindAfterSave(invNumber) {
    // alert(invNumber+'-----FindButton')
    this.currentOP = 'Search';
    // alert(this.currop)
    this.currentOP = 'Search';
    this.lineDetailsArray().clear();
    this.TaxDetailsArray().clear();
    this.TdsDetailsArray().clear();
    this.lineDistributionArray().clear();
    this.tdsTaxDetailsArray().clear();
    this.displayHeaderData = false;
    let jsonData = this.poInvoiceForm.value;
    let invSearch: ISearch = Object.assign({}, jsonData);
    var searchObj: InvoiceSearchNew = new InvoiceSearchNew();
    {
      searchObj.invoiceNum = invNumber
      searchObj.suppNo = this.suppNo
    }
    this.transactionService.getsearchByApINV(JSON.stringify(searchObj)).subscribe((res: any) => {
      if (res.code === 200) {
        this.isDisabled = true;
        this.isVisibleSave = false;
        this.isVisibleUpdateBtn = false;
        this.isVisibleValidate = false;
        this.isVisibleRoundOffButton = false;
        this.isVisibleAddonType = false;
        if (res.obj.length === 0) {
          alert('AP Invoice Details not Find !...');
          this.poInvoiceForm.reset();
        }
        else if (res.obj.length != 0) {
          this.lstsearchapinv = res.obj;
          this.lstsearchapinv.forEach(f => {
            var invLnGrp: FormGroup = this.lineDetailsGroup();
            this.lineDetailsArray().push(invLnGrp);
          });
          this.poInvoiceForm.get('obj').patchValue(this.lstsearchapinv);
          var patch = this.poInvoiceForm.get('obj') as FormArray;
          for (let i = 0; i < this.lstsearchapinv.length; i++) {
            let payDate = moment(this.lstsearchapinv[i].paymentRateDate, 'dd-MM-yyyy hh:mm:ss');
            let payDtString = payDate.format('dd-MMM-yyyy');
            let select = this.tdsSectionList.find(d => d.lookupValueDesc === res.obj[i].payGroup);
            // console.log(select);
            // console.log(select.lookupValueDesc);
            var glDateNew1 = (res.obj[i].glDate)
            var glDateNew = this.pipe.transform(glDateNew1, 'y-MM-dd');
            var invoiceDateNew = this.pipe.transform(res.obj[i].invoiceDate, 'y-MM-dd');
            patch.controls[i].patchValue({ invoiceDate: invoiceDateNew })
            patch.controls[i].patchValue({ glDate: glDateNew })
            this.lineDetailsArray().controls[i].patchValue({ paymentRateDate: payDtString, invoiceId1: this.lstsearchapinv[i].invoiceId, internalSeqNum: this.lstsearchapinv[i].internalSeqNum, invoiceAmt: this.lstsearchapinv[i].invoiceAmt.toFixed(2), taxAmt: this.lstsearchapinv[i].taxAmt.toFixed(2) });
            // this.lineDetailsArray().controls[i].patchValue({ glDate: res.obj[i].glDate });
            patch.controls[i].patchValue({ payGroup: res.obj[i].payGroup })
            if (res.obj[i].paymentMethod === undefined || res.obj[i].paymentMethod === null) {
              (patch.controls[i]).patchValue(
                {
                  paymentMethod: 'CASH',
                }
              );
            }
            if (res.obj[i].payGroup != undefined || res.obj[i].payGroup != null) {
              (patch.controls[i]).patchValue(
                {
                  payGroup: res.obj[i].payGroup,
                }
              );
              this.isVisibleTDSTab = true;
              this.isVisibleSaveTDS = true;
            }
            // if (res.obj[i].invoiceAmt % 1 != 0){
            //   this.isVisibleRoundOffButton=false;
            // }
            console.log(this.tdsSectionList);
            // if (res.obj[i].invoiceStatus === 'Validated' || res.obj[i].invoiceStatus === 'Unpaid' || res.obj[i].invTypeLookupCode != 'CREDIT' || res.obj[i].invTypeLookupCode != 'STANDARD') {
            //   this.poInvoiceForm.disable();
            //   this.isVisibleUpdateBtn = false;
            //   this.TaxDetailsArray().disable();
            //   this.TdsDetailsArray().disable();
            //   this.lineDetailsArray().disable();
            //   this.invLineDetailsArray().disable();
            //   // this.isVisibleSave=false;
            // }
            // alert(res.obj[i].invoiceStatus);
            if (res.obj[i].invoiceStatus === null) {
              this.lineDetailsArray().controls[i].get('locationId').enable();
              this.lineDetailsArray().controls[i].get('invTypeLookupCode').disable();
              this.lineDetailsArray().controls[i].get('segment1').enable();
              this.lineDetailsArray().controls[i].get('name').disable();
              this.lineDetailsArray().controls[i].get('suppNo').disable();
              this.lineDetailsArray().controls[i].get('siteName').disable();
              this.lineDetailsArray().controls[i].get('invoiceDate').enable();
              this.lineDetailsArray().controls[i].get('invoiceNum').enable();
              this.lineDetailsArray().controls[i].get('internalSeqNum').disable();
              this.lineDetailsArray().controls[i].get('glDate').enable();
              this.lineDetailsArray().controls[i].get('currency').disable();
              this.lineDetailsArray().controls[i].get('paymentRateDate').enable();
              this.lineDetailsArray().controls[i].get('ouName').disable();
              this.lineDetailsArray().controls[i].get('invoiceAmt').enable();
              this.lineDetailsArray().controls[i].get('taxAmt').enable();
            }

          }
          this.displayValidateButton = false;
        }

      }
      else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
  }




  Validated() {
    var arrayControl = this.poInvoiceForm.get('obj').value;
    // var arrayControl1 = this.poInvoiceForm.get('invLines').value;
    var arrayControl2 = this.poInvoiceForm.get('invLines') as FormArray;
    var arrayControl1 = arrayControl2.getRawValue();
    var arrayCaontrolOfDistribution = this.poInvoiceForm.get('distribution').value;
    var amount: number = this.lineDetailsArray().controls[this.selectedLine].get('invoiceAmt').value;
    var totalOfInvLineAmout: number = 0;
    if (arrayCaontrolOfDistribution.length === 0) {
      alert('Please Select Distribution Tab.!');
      return;
    }

    for (let i = 0; i < this.invLineDetailsArray().length; i++) {
      var desc1: string = arrayControl1[i].description;
      if (desc1 === 'null' || desc1 === null) {
        totalOfInvLineAmout = Math.round(((arrayControl1[i].amount) + Number.EPSILON) * 100) / 100;
      }
      else {
        if (desc1.includes('Adhoc Disc') || desc1.includes('Subsidy')) {
          // alert(arrayControl1[i].amount)
          totalOfInvLineAmout = Math.round(((totalOfInvLineAmout - arrayControl1[i].amount) + Number.EPSILON) * 100) / 100;
        } else {
          totalOfInvLineAmout = Math.round(((totalOfInvLineAmout + arrayControl1[i].amount) + Number.EPSILON) * 100) / 100;
        }
      }

    }

    var totalOfDistributionAmout: number = 0;
    // ;
    for (let j = 0; j < this.lineDistributionArray().length; j++) {
      var desc1: string = arrayCaontrolOfDistribution[j].description;
      if (desc1 === 'null' || desc1 === null) {
        totalOfDistributionAmout = Math.round(((totalOfDistributionAmout + Number(arrayCaontrolOfDistribution[j].amount)) + Number.EPSILON) * 100) / 100;

      }
      else {
        if (desc1.includes('Adhoc Disc') || desc1.includes('Subsidy')) {
          totalOfDistributionAmout = Math.round(((totalOfDistributionAmout - Number(arrayCaontrolOfDistribution[j].amount)) + Number.EPSILON) * 100) / 100;
        } else {
          totalOfDistributionAmout = Math.round(((totalOfDistributionAmout + Number(arrayCaontrolOfDistribution[j].amount)) + Number.EPSILON) * 100) / 100;
        }
      }
    }

    // alert('Header Amt---' + amount + '---Total Line Amt---' + totalOfInvLineAmout + '----total Distribution Amt---' + totalOfDistributionAmout);
    if (amount == totalOfInvLineAmout && amount == totalOfDistributionAmout) {
      var arrayControl = this.poInvoiceForm.get('obj').value;
      var invoiceNum = this.lineDetailsArray().controls[this.selectedLine].get('invoiceNum').value;
      var suppNo = this.lineDetailsArray().controls[this.selectedLine].get('suppNo').value;
      this.transactionService.UpdateValidateSupwise(invoiceNum, suppNo).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.apInvFindAfterSave(res.obj.name)
          this.poInvoiceForm.disable();
          this.poInvoiceForm.patchValue({ invoiceStatus: 'Validated' })
          this.isVisible = false;
          this.isVisibleUpdateBtn = false;
          this.isVisibleRoundOffButton = false;
          this.isVisibleValidate = false;
          this.displayManualAP = false;
          this.TaxDetailsArray().clear();
          this.TdsDetailsArray().clear();
          this.lineDetailsArray().clear();
          this.tdsTaxDetailsArray().clear();
          this.invLineDetailsArray().clear();
        } else {
          if (res.code === 400) {
            alert(res.message);
          }
        }
      });
    }
    else {
      alert('Amount Missmatch kindly check');
      alert('Total Header Amount And Total Line Amount and Distribution Amount missmatch.!' + '  '
        + 'Total Header Amount' + amount + '    Total Line Amount ' + totalOfInvLineAmout + '   Total Distribution Amount ' + totalOfDistributionAmout)
    }

  }


  selectTaxCategory(event) {
    var taxCategoryName = event.target.value;
    var tdsLinesarray = this.poInvoiceForm.get('tdsLines') as FormArray;
    var tdsLinesarray1 = tdsLinesarray.getRawValue();
    console.log(this.tdsTaxCategoryList1);
    let tdscontrolInv = this.poInvoiceForm.get('tdsLines') as FormArray;
    var seltaxCatId;
    var selTaxCatName;
    var baseAmount1;
    for (let i = 0; i < this.tdsTaxCategoryList1.length; i++) {

      if (this.tdsTaxCategoryList1[i].taxCategoryName.includes(taxCategoryName)) {
        seltaxCatId = this.tdsTaxCategoryList1[i].taxCategoryId;
        selTaxCatName = taxCategoryName;
      }
    }
    for (let k = 0; k < tdsLinesarray1.length; k++) {
      (tdscontrolInv.controls[k]).patchValue({ taxCategoryId: seltaxCatId });
      (tdscontrolInv.controls[k]).patchValue({ taxCategoryName: selTaxCatName });
      var baseAmount1 = tdsLinesarray1[k].baseAmount;
      // this.showTdsTaxLines(baseAmount, seltaxCatId, k);
      this.showTdsTaxLines(1, baseAmount1, seltaxCatId, k)
    }
  }



  selectTaxCategory1(event, index) {
    // alert(event.target.value)
    var taxCategoryName = event.target.value;
    var taxCategoryNamevalue = taxCategoryName.substr(taxCategoryName.indexOf(':') + 1, taxCategoryName.length);
    // alert(taxCategoryNamevalue)
    var tdsLinesarray = this.poInvoiceForm.get('tdsLines') as FormArray;
    var tdsLinesarray1 = tdsLinesarray.getRawValue();
    console.log(this.tdsTaxCategoryList1);
    let tdscontrolInv = this.poInvoiceForm.get('tdsLines') as FormArray;
    var seltaxCatId;
    var selTaxCatName;
    var baseAmount1 = tdsLinesarray1[index].baseAmount;
    // alert(baseAmount1)
    //  for (let i=0;i<this.tdsTaxCategoryList1.length;i++){

    //     if (this.tdsTaxCategoryList1[i].taxCategoryName.includes(taxCategoryName)){
    //       seltaxCatId=this.tdsTaxCategoryList1[i].taxCategoryId;

    //     } 
    //   }
    this.showTdsTaxLines(1, baseAmount1, taxCategoryNamevalue, index)
    // for (let k=0;k<tdsLinesarray1.length;k++){
    //   (tdscontrolInv.controls[k]).patchValue({ taxCategoryId: seltaxCatId});
    //   (tdscontrolInv.controls[k]).patchValue({ taxCategoryName: selTaxCatName});
    //   var baseAmount1 = tdsLinesarray1[k].baseAmount;
    // this.showTdsTaxLines(baseAmount, seltaxCatId, k);


  }



  showTdsTaxLines(mItemId, mBaseAmt, mTaxCatId, j) {
    // alert ("Tds lines...wip.inv id :"+mItemId);
    this.service.getTdsTaxDetails(mItemId, mBaseAmt, mTaxCatId)
      .subscribe(
        data => {
          this.lstTdsTaxLineDetails = data;
          console.log(this.lstTdsTaxLineDetails);
          for (let i = 0; i < this.tdsTaxDetailsArray.length; i++) {
            this.tdsTaxDetailsArray().removeAt(i);
          }

          this.tdsTaxDetailsArray().clear();
          var tdsTaxLnGrp: FormGroup = this.tdsTaxDetailsGroup();
          this.tdsTaxDetailsArray().push(tdsTaxLnGrp);
          this.poInvoiceForm.get('tdsTaxLines').patchValue(this.lstTdsTaxLineDetails);
          var tdsTaxArr = this.poInvoiceForm.get('tdsTaxLines').value;
          var tdsTaxAmt1 = Math.abs(tdsTaxArr[0].totTaxAmt);
          var patch = this.poInvoiceForm.get('tdsLines') as FormArray;
          patch.controls[j].patchValue({ taxAmount: Math.abs(tdsTaxAmt1) })
          this.updateTDSTotAmtPerline1()
        }
      );

  }


  updateTDSTotAmtPerline1() {
    // alert('lineIndex');
    var formArr = this.poInvoiceForm.get('tdsLines') as FormArray;
    var formVal = formArr.getRawValue();
    console.log(formVal);
    var basicAmt = 0;
    var totAmt = 0;
    var disAmt = 0;
    var taxAmount = 0;
    var disctaxAmount = 0;
    for (let i = 0; i < formVal.length; i++) {
      if (formVal[i].description.includes('Adhoc Disc')) {
        if (formVal[i].baseAmount == undefined || formVal[i].baseAmount == null || formVal[i].baseAmount == '') {
        } else {
          disAmt = disAmt + Number(formVal[i].baseAmount);
        }
      }
      else {
        if (formVal[i].baseAmount == undefined || formVal[i].baseAmount == null || formVal[i].baseAmount == '') {

        } else {
          totAmt = totAmt + Number(formVal[i].baseAmount);
          // alert(totAmt)
        }
      }
    }
    // *********************tds discount**************
    // debugger;
    for (let k = 0; k < formVal.length; k++) {
      if (formVal[k].description.includes('Adhoc Disc')) {
        if (formVal[k].taxAmount == undefined || formVal[k].taxAmount == null || formVal[k].taxAmount == '') {
        } else {
          disctaxAmount = disctaxAmount + (formVal[k].taxAmount);
        }
      }
      else if ((formVal[k].description.includes('Adhoc Disc')) == false) {
        if (formVal[k].taxAmount == undefined || formVal[k].taxAmount == null || formVal[k].taxAmount == '') {
        } else {

          taxAmount = taxAmount + Number(formVal[k].taxAmount);

        }
      }
    }
    // alert(disctaxAmount+'disctaxAmount'+'*******taxAmount'+taxAmount);
    var disAmt1 = Math.round(((disAmt) + Number.EPSILON) * 100) / 100;
    this.poInvoiceForm.patchValue({ tdsTotDiscAmt: (disAmt1) });
    var totAmt1 = Math.round(((totAmt) + Number.EPSILON) * 100) / 100;
    this.poInvoiceForm.patchValue({ tdsBasicAmt: totAmt1 });
    var tdsTotAmt1 = (totAmt1 - disAmt1);
    var tdsTotAmt2 = Math.round(((tdsTotAmt1) + Number.EPSILON) * 100) / 100;
    this.poInvoiceForm.patchValue({ tdsTotAmt: tdsTotAmt2 });
    var taxAmount1 = Math.round(((taxAmount) + Number.EPSILON) * 100) / 100
    var disctaxAmount1 = ((Math.round(((disctaxAmount) + Number.EPSILON) * 100) / 100));
    // alert('taxAmount1TDS---'+taxAmount1+'---disctaxAmount1TDS---***'+disctaxAmount1)
    var disctaxAmount2 = Math.abs(disctaxAmount1)
    // alert(disctaxAmount2+'disctaxAmount2*')
    var tottdsAmt1 = (taxAmount1 - disctaxAmount2)
    var tottdsAmt2 = Math.round(((tottdsAmt1) + Number.EPSILON) * 100) / 100;
    this.poInvoiceForm.patchValue({ tottdsAmt: Math.abs(tottdsAmt2) })
  }


  openTdsTaxDetails(k) {
    // alert(k)
    var patch = this.poInvoiceForm.get('tdsLines') as FormArray;
    var tdsLineArr = this.poInvoiceForm.get('tdsLines').value;
    var len1 = tdsLineArr.length;

    // for (let i = 0; i < len1 ; i++)  {

    var baseAmount = tdsLineArr[k].baseAmount;
    var taxCatId = tdsLineArr[k].taxCategoryId;
    var tdsSectionCd = tdsLineArr[k].actualSectionCode;


    if (tdsSectionCd === null || tdsSectionCd === undefined) {
      alert("Line-" + (k + 1) + " SECTION CODE :  Should not be null.");

      return;
    }
    this.showTdsTaxLines(1, baseAmount, taxCatId, k);
  }


  paymentDetails() {
    var invoiceNum = this.lineDetailsArray().controls[this.selectedLine].get('invoiceNum').value;
    var suppNo = this.lineDetailsArray().controls[this.selectedLine].get('suppNo').value;

    this.transactionService.getApPaymentDetails(suppNo, invoiceNum).subscribe((res: any) => {
      if (res.code === 200) {
        this.payData = res.obj;
      }
    });
  }

  SaveTdsDetails() {
    var tdsLineArr = this.poInvoiceForm.get('tdsLines').value;
    var len1 = tdsLineArr.length;
    for (let i = 0; i < len1; i++) {
      this.CheckTdsLineValidations(i);
    }
    if (this.tdsLineValidation) {
      alert("TDS data Validation Sucessfull....Posting data...")
      this.displayTdsButton = false;

      var tdsLines = this.poInvoiceForm.get('tdsLines').value;
      console.log(tdsLines);
      // return;
      var arrayControl = this.poInvoiceForm.get('obj') as FormArray;
      var arrayControl1 = arrayControl.getRawValue();
      this.transactionService.PoInvoiceTdsDataSubmit(tdsLines).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          // alert(arrayControl1[0].invNumber);
          // this.apInvFindAfterSave(arrayControl1[0].invNumber);
          // this.apInvFind(res.obj)
          this.apInvFindAfterSave(res.obj)
          this.TaxDetailsArray().clear();
          this.tdsTaxDetailsArray().clear();
          this.TdsDetailsArray().clear();
          this.invLineDetailsArray().clear();
          this.lineDetailsArray().clear();
          // this.lineDistributionArray().clear();
          // window.location.reload();
        } else {
          if (res.code === 400) {
            alert(res.message);
            this.displayTdsButton = true;
          }
        }
      });
    } else { alert("TDS data Validation Not Sucessfull....\nPosting Not Done...") }


  }


  CheckTdsLineValidations(i) {

    // alert('addrow index '+i);
    this.tdsLineValidation = true;
    var tdsLineArr1 = this.poInvoiceForm.get('tdsLines').value;
    var tdsTaxAmt = Math.abs(tdsLineArr1[i].taxAmount);
    var taxCatId = tdsLineArr1[i].taxCategoryId;
    var tdsSectionCd = tdsLineArr1[i].actualSectionCode;

    // alert("Line Value :"+lineValue1);
    var j = i + 1;


    if (tdsSectionCd === null || tdsSectionCd === undefined) {
      alert("Line-" + (j) + " SECTION CODE :  Should not be null.");
      this.tdsLineValidation = false;

      // patch.controls[index].patchValue({tdsSelectFlag:''})

      return;
    }

    if (taxCatId === null || taxCatId === undefined) {
      alert("Line-" + (j) + " TAX CATEGORY :  Should not be null.");
      this.tdsLineValidation = false;

      // patch.controls[index].patchValue({tdsSelectFlag:''})
      return;

    }
    if (tdsTaxAmt === undefined || tdsTaxAmt === null || tdsTaxAmt < 0) {
      alert("Line-" + j + " TAX AMOUNT :  Should not be null value");
      this.tdsLineValidation = false;
      return;
    }


  }



  onOptionsSelectedBranch(segment: any, lType: string) {
    // alert(segment+'----'+lType);
    this.service.getInterBranch(segment, lType).subscribe(
      data => {
        this.branch = data;
        console.log(this.branch);
        if (this.branch != null) {
          if (lType === 'SS_Interbranch') {
            this.lookupValueDesc5 = this.branch.lookupValueDesc;
          }
          if (lType === 'NaturalAccount') {
            this.lookupValueDesc4 = this.branch.lookupValueDesc;
            //   // this.GlCodeCombinaionForm.patchValue(this.branch);
            //  this.accountType=this.branch.accountType;
          }
          if (lType === 'CostCentre') {
            this.lookupValueDesc3 = this.branch.lookupValueDesc;
          }
          if (lType === 'SS_Location') {
            this.lookupValueDesc2 = this.branch.lookupValueDesc;
          }
          if (lType === 'SS_Branch') {
            // this.lookupValueDesc1 = this.branch.lookupValueDesc;
            this.lookupValueDesc1 = this.branch.lookupValueDesc;
            var sellBr = this.BranchList.find(d => d.lookupValue === segment);
            // console.log(sellBr);       
            this.locIdList1 = this.locIdList1.filter((br => br.lookupValue.includes(sellBr.parentValue) || br.lookupValue === "000"));
          }
        }
      }
    );

  }


  onOptionsSelecctedBranchNew(event) {
    // alert('Inside' + event);
    if (event != undefined) {
      let selectinterbranch = this.InterBrancList.find(v => v.lookupValue == event);
      console.log(selectinterbranch);
      this.lookupValueDesc5 = selectinterbranch.lookupValueDesc;
    }
  }


  fnCancatination(index) {
    var arrayControl = this.poInvoiceForm.get('distribution').value;
    var patch = this.poInvoiceForm.get('distribution') as FormArray;
    var natacc = (this.poInvoiceForm.get('segment4').value).split('-')

    arrayControl[index].segmentName = this.poInvoiceForm.get('segment11').value + '.'
      + this.poInvoiceForm.get('segment2').value + '.'
      + this.poInvoiceForm.get('segment3').value + '.'
      // + this.poInvoiceForm.get('segment4').value + '.'
      + natacc[0] + '.'
      + this.poInvoiceForm.get('segment5').value;
    this.segmentName1 = arrayControl[index].segmentName
    console.log(this.segmentName1);
    (patch.controls[index]).patchValue({ distCodeCombSeg: this.segmentName1 });
    this.service.segmentNameList(this.segmentName1)
      .subscribe(
        data => {
          this.segmentNameList = data;
          if (this.segmentNameList.code === 200) {
            (patch.controls[index]).patchValue({ distCodeCombId: this.segmentNameList.obj.codeCombinationId });
            if (this.segmentNameList.length == 0) {
              alert('Invalid Code Combination');
            } else {
              console.log(this.segmentNameList);
              (patch.controls[index]).patchValue({ distCodeCombId: this.segmentNameList.obj.codeCombinationId });
              var invLinesControl = this.poInvoiceForm.get('invLines').value;
              var invLinesArray = this.poInvoiceForm.get('invLines') as FormArray;
              for (let x = 0; x < invLinesControl.length; x++) {
                if (arrayControl[index].invoiceLineNum === invLinesControl[x].lineNumber && invLinesControl[x].lineTypeLookupCode != 'MISCELLANEOUS') {
                  (invLinesArray.controls[x]).patchValue({ defaultDistCcid: this.segmentNameList.obj.codeCombinationId });
                  (invLinesArray.controls[x]).patchValue({ defaultDisAcc: arrayControl[index].segmentName })
                  console.log(invLinesControl[x].defaultDistCcid);
                }
              }
            }
          }
          if (this.segmentNameList.code === 400) {
            alert(data.message);
            (patch.controls[index]).patchValue({ distCodeCombSeg: '' })

          }
        }
      );
    this.poInvoiceForm.get('segment11').reset();
    this.poInvoiceForm.get('segment2').reset();
    this.poInvoiceForm.get('segment3').reset();
    this.poInvoiceForm.get('segment4').reset();
    this.poInvoiceForm.get('segment5').reset();
    this.poInvoiceForm.get('lookupValueDesc1').reset();
    this.poInvoiceForm.get('lookupValueDesc2').reset();
    this.poInvoiceForm.get('lookupValueDesc3').reset();
    this.poInvoiceForm.get('lookupValueDesc4').reset();
    this.poInvoiceForm.get('lookupValueDesc5').reset();
  }

  onOptionsSelectedNatural(event) {
    if (event != undefined || event != null) {
      var naArr = event.split('-');
      this.lookupValueDesc4 = naArr[1];
      if (naArr[0].length > 4) {
        this.service.getInterBranchNewApi(naArr[0]).subscribe(
          data => {
            this.InterBrancList = data.obj;
          })
      }
    }
  }


  //-----Tax PopUp / Modal functions
  lineTaxdetails: any = [];
  selTaxLn = '';
  popDisAmt: number;
  popTaxAmt: number;
  popTotAmt: number;
  display = 'none';

  openTaxDetails(i: number) {
    // alert(i);
    this.selTaxLn = String(i);
    var invLnNo = Number(i + 1);
    // ;
    this.lineTaxdetails = this.TaxDetailsArray() as FormArray;
    console.log(this.lineTaxdetails);
    // this.lineTaxdetails.clear();
    if (this.taxMap.has(this.selTaxLn)) {
      var taxValues: any = this.taxMap.get(this.selTaxLn);
      // alert(taxValues.length+'----taxValues----length')
      for (let x = 0; x < taxValues.length; x++) {
        if (taxValues[x].invLineNo === invLnNo) {
          this.lineTaxdetails.push(this.TaxDetailsGroup());
          this.lineTaxdetails.controls[x].patchValue(taxValues[x]);
        }
      }
    }

    // var orLineVal = this.poInvoiceForm.get('oeOrderLinesAllList').value;
    // this.popDisAmt= orLineVal[i].disAmt;
    // this.popTaxAmt= orLineVal[i].taxAmt;
    // this.popTotAmt= orLineVal[i].totAmt;
  }

  closeTaxModal() {
    this.poInvoiceForm.get('taxLines').patchValue(this.lineTaxdetails.value);
    this.taxMap.set(this.selTaxLn, this.lineTaxdetails.value);
    this.display = 'none'; //set none css after close dialog
    // var controlinv2 = this.poInvoiceForm.get('oeOrderLinesAllList') as FormArray;
    // (controlinv2.controls[this.selTaxLn]).patchValue({
    //   disAmt: Math.round((this.popDisAmt + Number.EPSILON) * 100) / 100,
    //   taxAmt: Math.round((this.popTaxAmt + Number.EPSILON) * 100) / 100,
    //   totAmt: Math.round((this.popTotAmt + Number.EPSILON) * 100) / 100,
    // });
    // this.myInputField.nativeElement.focus();
  }

  tdsSelectFlag1(e, index) {

    this.tdsLineValidation = true;
    // if ( e.target.checked) {alert("Checked...");} else {alert("Unchecked...");}
    if (e.target.checked) {

      var patch = this.poInvoiceForm.get('tdsLines') as FormArray;
      var tdsLineArr = this.poInvoiceForm.get('tdsLines').value;
      var len1 = tdsLineArr.length;

      // for (let i = 0; i < len1 ; i++)  {

      var baseAmount = tdsLineArr[index].baseAmount;
      var taxCatId = tdsLineArr[index].taxCategoryId;
      var tdsSectionCd = tdsLineArr[index].actualSectionCode;


      if (tdsSectionCd === null || tdsSectionCd === undefined) {
        alert("Line-" + (index + 1) + " SECTION CODE :  Should not be null.");
        this.tdsLineValidation = false;
        e.target.checked = false;
        // patch.controls[index].patchValue({tdsSelectFlag:''})

        return;
      }

      if (taxCatId === null || taxCatId === undefined) {
        alert("Line-" + (index + 1) + " TAX CATEGORY :  Should not be null.");
        this.tdsLineValidation = false;
        e.target.checked = false;
        // patch.controls[index].patchValue({tdsSelectFlag:''})
        return;

      }

      if (this.tdsLineValidation === true) {
        this.showTdsTaxLines(1, baseAmount, taxCatId, index);
      }

      // }
    } else { this.tdsTaxDetailsArray().reset(); }

  }


  showTdsTaxLinesold(mItemId: any, mBaseAmt: any, mTaxCatId: any, mtdsSection: any, j: any) {
    // alert ("Tds lines...wip.inv id :"+mItemId);
    this.service.getTdsTaxDetails(mItemId, mBaseAmt, mTaxCatId)
      .subscribe(
        data => {
          this.lstTdsTaxLineDetails = data;
          console.log(this.lstTdsTaxLineDetails);
          for (let i = 0; i < this.tdsTaxDetailsArray.length; i++) {
            this.tdsTaxDetailsArray().removeAt(i);
          }

          this.tdsTaxDetailsArray().clear();
          var tdsTaxLnGrp: FormGroup = this.tdsTaxDetailsGroup();
          this.tdsTaxDetailsArray().push(tdsTaxLnGrp);
          this.poInvoiceForm.get('tdsTaxLines').patchValue(this.lstTdsTaxLineDetails);
          var tdsTaxArr = this.poInvoiceForm.get('tdsTaxLines').value;
          var tdsTaxAmt1 = Math.abs(tdsTaxArr[0].totTaxAmt);
          var patch = this.poInvoiceForm.get('tdsLines') as FormArray;
          patch.controls[j].patchValue({ taxAmount: Math.abs(tdsTaxAmt1) })

        }
      );

  }







  prepaymentData(event) {
    var headerVal = this.poInvoiceForm.get('obj').value;
    var patch = this.poInvoiceForm.get('obj') as FormArray;
    var invtype = headerVal[0].invTypeLookupCode;
    // alert(invtype);
    if (invtype == 'Credit Memo') {
      if (Math.sign(headerVal[0].invoiceAmt) == 1) {
        alert('Kindly enter the Invoice Amount price as negative value ')
        patch.controls[0].patchValue({ invoiceAmt: '' }, { invoiceAmt: '' });
      }
    }
    if (invtype == 'Prepayment') {
      var supId = headerVal[0].suppId;
      var supsitId = headerVal[0].supplierSiteId;
      var invamt = event.target.value;
      this.transactionService.getprepay(supId, supsitId)
        .subscribe(
          data => {
            this.prepaydata = data;
            var arraydist = this.poInvoiceForm.get('distribution').value;
            var patchdist = this.poInvoiceForm.get('distribution') as FormArray;
            var arrinvln = this.poInvoiceForm.get('invLines') as FormArray;
            for (let k = 0; k < this.invLineDetailsArray().length; k++) {
              arrinvln.controls[k].patchValue({ lineTypeLookupCode: 'OTHER', amount: Number(invamt), description: 'Pre-Payment Line Item' });
              patchdist.controls[k].patchValue({ description: 'Pre-Payment Line Item' })
            }
            console.log(this.poInvoiceForm.get('invLines').value);
            var distlen = this.lineDistributionArray().length;
            for (let i = 0; i < data.length - distlen; i++) {
              var dislist: FormGroup = this.distLineDetails();
              this.lineDistributionArray().push(dislist);
            }
            for (let j = 0; j < this.lineDistributionArray().length; j++) {
              patchdist.controls[j].patchValue({
                distCodeCombSeg: data.prepayCodeCombName, accDesc: data.prepayCodeCombDesc,
                baseAmount: Number(invamt), amount: Number(invamt), lineTypeLookupCode: 'OTHER', distLineNumber: j + 1,
                invoiceLineNum: this.invoiceLineNo, distCodeCombId: data.prepayCodeCombId
              });
            }
            console.log(this.poInvoiceForm.get('distribution').value);
            this.distarr.set(this.invoiceLineNo, this.poInvoiceForm.get('distribution').value);
          });

      // this.poInvoiceForm.get('distribution').disable();
      this.poInvoiceForm.get('invLines').disable();
      //   this.poInvoiceForm.get('taxLines').disable();
    }

  }

  isVisibleinvoiceDateText: boolean = false;
  isVisibleinvoiceDateDate: boolean = false;

  prepaymentDate(event: any) {
    // alert(event.target.value);
    if (event.target.value === 'Prepayment') {
      // this.isVisibleinvoiceDateText = true; /////   till time commited this condition
      // this.isVisibleinvoiceDateDate = false; /////   till time commited this condition
      this.isVisibleinvoiceDateText = false;
      this.isVisibleinvoiceDateDate = true;
      this.lineDetailsArray().controls[0].get('invoiceDate').enable();
      var patch = this.poInvoiceForm.get('obj') as FormArray;
      // this.invoiceDate=new Date();
      (patch.controls[0]).patchValue(
        {
          invoiceDate: (this.invoiceDate),
        }
      );
      console.log(this.invoiceDate);
      // this.lineDetailsArray().controls[0].get('invoiceDate').disable(); /// till time disable for Kiran Sir requirement
    }
    else {
      this.isVisibleinvoiceDateText = false;
      this.isVisibleinvoiceDateDate = true;
      this.lineDetailsArray().controls[0].get('invoiceDate').enable();
    }
  }

  roundOffAP() {
    var invoiceNum = this.lineDetailsArray().controls[this.selectedLine].get('invoiceNum').value;
    var suppNo = this.lineDetailsArray().controls[this.selectedLine].get('suppNo').value;
    // alert(suppNo);
    this.transactionService.roundOffAP(invoiceNum, suppNo).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.apInvFindAfterSave(res.obj.invoiceNum);
        this.TaxDetailsArray().clear();
        this.TdsDetailsArray().clear();
        this.lineDetailsArray().clear();
        this.tdsTaxDetailsArray().clear();
        this.invLineDetailsArray().clear();
      } else {
        if (res.code === 400) {
          alert(res.message);

        }
      }
    });
  }

  distrbutionGlDate(event) {
    // alert(event.target.value);

    var headerGlDate = event.target.value;
    this.validateDate(headerGlDate, 'GLD')
    var patch = this.poInvoiceForm.get('invLines') as FormArray;
    (patch.controls[0]).patchValue(
      {
        glDate: headerGlDate,
      }
    );
    var patch = this.poInvoiceForm.get('distribution') as FormArray;
    (patch.controls[0]).patchValue(
      {
        accountingDate: headerGlDate,
      }
    );
  }


  searchByinvoiceNum(invoiceNum) {
    // alert(invoiceNum);
    this.transactionService.searchByinvoiceNumFn(this.suppNo, invoiceNum).subscribe((res: any) => {
      if (res.code === 200) {
      }
      else if (res.code == 400) {
        alert(res.message);
        window.location.reload();
        return;
      }
    })
  }
  InvDocFind(docNo) {
    // alert(docNo)
    this.currentOP = 'Search';
    this.lineDetailsArray().clear();
    this.TaxDetailsArray().clear();
    this.TdsDetailsArray().clear();
    this.lineDistributionArray().clear();
    this.tdsTaxDetailsArray().clear();
    this.displayHeaderData = false;
    this.isVisibleSelectButton = true;
    let jsonData = this.poInvoiceForm.value;
    let invSearch: ISearch = Object.assign({}, jsonData);
    var searchObj: InvoiceSearchNew = new InvoiceSearchNew();
    // debugger;
    this.transactionService.getsearchByApDoc(docNo).subscribe((res: any) => {
      if (res.code === 200) {
        this.isDisabled = true;
        this.isVisibleAddonType = false;
        this.isVisibleSave = false;
        this.isVisibleRoundOffButton = false;
        this.isVisibleUpdateBtn = false;
        this.isVisibleValidate = false;
        if (res.obj.length === 0) {
          alert('AP Invoice Details not Find !...');
          this.poInvoiceForm.reset();
        }
        else if (res.obj.length != 0) {
          // ;
          this.lstsearchapinv = res.obj;
          this.lstsearchapinv.forEach(f => {
            var invLnGrp: FormGroup = this.lineDetailsGroup();
            this.lineDetailsArray().push(invLnGrp);
          });
          this.poInvoiceForm.get('obj').patchValue(this.lstsearchapinv);
          var patch = this.poInvoiceForm.get('obj') as FormArray;
          for (let i = 0; i < this.lstsearchapinv.length; i++) {
            let payDate = moment(this.lstsearchapinv[i].paymentRateDate, 'dd-MM-yyyy hh:mm:ss');
            let payDtString = payDate.format('dd-MMM-yyyy');
            let select = this.tdsSectionList.find(d => d.lookupValueDesc === res.obj[i].payGroup);
            this.lineDetailsArray().controls[i].patchValue({ paymentRateDate: payDtString, invoiceId1: this.lstsearchapinv[i].invoiceId, internalSeqNum: this.lstsearchapinv[i].internalSeqNum });
            var glDateNew1 = (res.obj[i].glDate)
            var glDateNew = this.pipe.transform(glDateNew1, 'y-MM-dd');
            var invoiceDateNew = this.pipe.transform(res.obj[i].invoiceDate, 'y-MM-dd');
            this.isVisibleinvoiceDateText = false;
            this.isVisibleinvoiceDateDate = true;
            // this.invoiceDate = invoiceDateNew;
            // this.glDate = glDateNew;
            patch.controls[i].patchValue({ payGroup: res.obj[i].payGroup })
            patch.controls[i].patchValue({ invoiceDate: invoiceDateNew })
            patch.controls[i].patchValue({ glDate: glDateNew })
            if (res.obj[i].paymentMethod === undefined || res.obj[i].paymentMethod === null) {
              (patch.controls[i]).patchValue(
                {
                  paymentMethod: 'CASH',
                }
              );
            }
            if (res.obj[i].payGroup != undefined || res.obj[i].payGroup != null) {
              (patch.controls[i]).patchValue(
                {
                  payGroup: res.obj[i].payGroup,
                }
              );
              this.isVisibleTDSTab = true;
            }
            // ;
            console.log(this.tdsSectionList);
            if (res.obj[i].invoiceStatus === null) {
              this.lineDetailsArray().controls[i].get('locationId').enable();
              this.lineDetailsArray().controls[i].get('invTypeLookupCode').disable();
              this.lineDetailsArray().controls[i].get('segment1').enable();
              this.lineDetailsArray().controls[i].get('name').disable();
              this.lineDetailsArray().controls[i].get('suppNo').disable();
              this.lineDetailsArray().controls[i].get('siteName').disable();
              this.lineDetailsArray().controls[i].get('invoiceDate').enable();
              this.lineDetailsArray().controls[i].get('invoiceNum').enable();
              this.lineDetailsArray().controls[i].get('internalSeqNum').disable();
              this.lineDetailsArray().controls[i].get('glDate').enable();
              this.lineDetailsArray().controls[i].get('currency').disable();
              this.lineDetailsArray().controls[i].get('paymentRateDate').enable();
              this.lineDetailsArray().controls[i].get('ouName').disable();
              this.lineDetailsArray().controls[i].get('invoiceAmt').enable();
              this.lineDetailsArray().controls[i].get('taxAmt').enable();
            }
            if (res.obj[i].invoiceStatus.includes('Validated')) {
              this.lineDetailsArray().controls[i].get('locationId').disable();
              this.lineDetailsArray().controls[i].get('invTypeLookupCode').disable();
              this.lineDetailsArray().controls[i].get('segment1').disable();
              this.lineDetailsArray().controls[i].get('name').disable();
              this.lineDetailsArray().controls[i].get('suppNo').disable();
              this.lineDetailsArray().controls[i].get('siteName').disable();
              this.lineDetailsArray().controls[i].get('invoiceDate').disable();
              this.lineDetailsArray().controls[i].get('invoiceNum').disable();
              this.lineDetailsArray().controls[i].get('internalSeqNum').disable();
              this.lineDetailsArray().controls[i].get('glDate').disable();
              this.lineDetailsArray().controls[i].get('currency').disable();
              this.lineDetailsArray().controls[i].get('paymentRateDate').disable();
              this.lineDetailsArray().controls[i].get('ouName').disable();
              this.lineDetailsArray().controls[i].get('invoiceAmt').disable();
              this.lineDetailsArray().controls[i].get('taxAmt').disable();
            }
            // alert(res.obj[i].segment1)
            if (res.obj[i].segment1 != null) {
              this.lineDetailsArray().controls[i].get('invoiceDate').enable();
              this.isVisibleinvoiceDateDate = true;
              this.lineDetailsArray().controls[i].get('taxAmt').disable();
              this.lineDetailsArray().controls[i].get('invoiceAmt').disable();

              // this.poInvoiceForm.disable();
            }
            if (res.obj[i].invoiceAmt % 1 != 0) {
              this.isVisibleRoundOffButton = false;
            }
            // else{
            //   this.isVisibleRoundOffButton=true;
            // }
          }
          this.displayValidateButton = false;
        }

      }
      else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
  }
  message: string = "Please Fix the Errors!";
  cnfMsgType: string = "Close";
  // msgType:string ="Navigate";
  getMessage(msgType: string) {
    this.cnfMsgType = msgType;
    if (msgType.includes("SAVE")) {
      this.submitted = true;
      (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
      this.message = "Do you want to SAVE the changes (Yes/No)?"
    }
    if (msgType.includes("CANCEL")) {
      this.message = "Do you want to SAVE the changes (Yes/No)?"
    }
    if (msgType.includes("Navigate")) {
      this.message = "Do you want to Navigate the Form(Yes/No)?"
    }

    if (msgType.includes("Reset")) { this.message = "Do you want to Reset the changes(Yes/No)?" }

    if (msgType.includes("Close")) { this.message = "Do you want to Close the Form(Yes/No)?" }
    return;
  }


  executeAction() {
    if (this.cnfMsgType.includes("SAVE")) {
      this.HeaderValidate();
    }
    if (this.cnfMsgType.includes("CANCEL")) {
      this.paymentCancel();
    }
    //     if(this.msgType.includes("Navigate")) {
    //       this.router.navigate(['/admin/master/customerMaster'])
    //  }
  }
  closeModalDialog() {
    this.display = 'none'; //set none css after close dialog
    // this.myInputField.nativeElement.focus();
  }
  CalculateBal(supnam1) {
    // alert(this.supname+'--'+ supnam1);

    var selSupp = supnam1.split('--');
    this.suppId = selSupp[1];
    this.transactionService.SuppBalPayment(selSupp[1], Number(sessionStorage.getItem('ouId'))).subscribe(
      data => {
        if (data.code == 200) {
          // alert(data.message);
          this.BalAmt = data.obj;
        }
        else if (data.code === 400) {
          alert(data.message)
        }
      })

  }
  ShowBalData(supname) {
    // alert(supname+'supname'+this.suppId);
    this.transactionService.SuppBalData(this.suppId, Number(sessionStorage.getItem('ouId'))).subscribe(
      data => {
        this.balData = data;
      })
  }


  validateDate(date1, dType) {
    // alert(date1)
    var currDate = new Date();
    var date2 = new Date(date1);
    if (date2 > currDate) {
      if (dType === 'INV') {
        alert("INVOICE DATE:" + "Should not be above Today's Date");
        this.invoiceDate = this.pipe.transform(this.now, 'y-MM-dd');
        return;
      }
      if (dType === 'GLD') {
        alert("GL DATE:" + "Should not be above Today's Date");
        this.glDate = this.pipe.transform(this.now, 'y-MM-dd');
        return;
      }

    }

  }

}

