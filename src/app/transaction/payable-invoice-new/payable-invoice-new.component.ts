import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener, ChangeDetectionStrategy } from '@angular/core';
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

interface IpoInvoice {
  suppInvDate: Date;
  invoiceDate: Date;
  termsDate: Date;
  title: string;
  invLineNumber:number;
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
  invTransferStatus: string;
  lineNumber: number;
  lineTypeLookupCode: string;
  hsnSacCode: string;
  gstPercentage: number;
  emplId: number;

  thresHoldHdrId: number;
  thresHoldTypeId: number;
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

@Component({
  selector: 'app-payable-invoice-new',
  templateUrl: './payable-invoice-new.component.html',
  styleUrls: ['./payable-invoice-new.component.css']
})
export class PayableInvoiceNewComponent implements OnInit {
  emplId: number;
  @ViewChild('dateRangePicker', { static: true })
  dateRangePicker: DateRangePickerComponent;
  indexVal: number;
  locId:number;
  locCode:string;
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
  showModal: boolean;
  content: number;
  title: string;
  invLineNumber:number;
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
  isVisibleUpdateBtn:boolean=true;

  invoiceDate = this.pipe.transform(this.now, 'yyyy-MM-ddTHH:mm');
  // accountingDate = new Date();
  suppInvDate: Date;
  termsDate: Date;
  termsId: number;
  itemType: string;
  taxCategoryId: number;
  taxCategoryName: string;
  hsnSacCodeList: any = [];
  // glDate:Date;
  //  glDate=this.pipe.transform(this.now, 'd-M-y h:mm:ss');
  // glDate = new Date();
  // public glDate =this.datepipe.transform(this.glDate1, 'yyyy-MM-dd');
  // pipe = new DatePipe('en-US');
  // now = Date.now();
  // glDate = this.pipe.transform(this.now, 'dd-MM-yyyy');

  glDate = this.pipe.transform(this.now, 'dd-MM-yyyy');
  accountingDate = this.pipe.transform(this.now, 'dd-MM-yyyy');
  // paymentMethod = 'CHEQUE';


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
  settlementDate: Date;
  taxationCountry: string;
  remitToSuppName: string;
  remitToBankAccount: string;
  remitToBankAccountNo: string;
  debitMemoReason: string;
  remitToSuppSite: string;
  public tdsSectionList: Array<string> = [];
  public tdsTaxCategoryList: Array<string> = [];
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
  invTransferStatus: string = "Never Validated";
  INVStatus: string;
  poChargeDesc: string = 'Unprocessed';
  dispStatus = true;
  displayTdsButton = false;
  showTdsLineDetails = true;
  tdsLineValidation = false;
  disDeleteButton = true;
  dispAccountCode = true;
  displayAddNewLine = true;
  displayViewTaxDetails=true;
  viewAccounting2: any[];
  viewAccounting1: any[];
  periodName:string;
postedDate:Date;
jeCategory:string;
name1:string;
ledgerId:number;
runningTotalDr:number;
runningTotalCr:number;
docSeqValue:number;
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
  public locIdList1: Array<string> = [];
  public BranchList: Array<string> = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: any = [];
  public InterBrancList: any=[];
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
  taxCategoryList: any=[];
  public ValidateObj: any;
  taxLines: number;
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


  errorMsg: string;
  displayError: boolean;
  formSumitAttempt: boolean;
  hsnsaclist: any;
  public apInvoiceTyp: string = 'MANUAL';
  isDisabled = false;
  constructor(private fb: FormBuilder, private transactionService: TransactionService, private service: MasterService, private router: Router) {   this.poInvoiceForm = fb.group({
    emplId: [],
    invoiceId:[],
    ouId: [''],
    INVStatus: [''],
    suppNo: [''],
    suppId: [''],
    invoiceNum: [''],
    invoiceAmt: [''],
    invoiceDate: [''],
    secondDateRange: [''],
    totalDistAmt: [],
    totalDistBaseAmt: [],
    poChargeAcCode: [],
    invTransferStatus: [],
    distLineNumber: [],
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

    thresHoldHdrId: [],
    thresHoldTypeId: [],
    runningTotalDr:[],
    periodName:[],
    postedDate:[],
    jeCategory:[],
    docSeqValue:[],
    runningTotalCr:[],
    name1:[],

    obj: this.fb.array([this.lineDetailsGroup()]),
    invLines: this.fb.array([this.invLineDetails()]),
    distribution: this.fb.array([this.distLineDetails()]),
    taxLines: this.fb.array([this.TaxDetailsGroup()]),
    tdsLines: this.fb.array([this.tdsLineDetails()]),
    tdsTaxLines: this.fb.array([this.tdsTaxDetailsGroup()]),

  });
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
        amount: ['', [Validators.required]],
        accountingDate: [],
        baseAmount: ['', [Validators.required]],
        poSegment: [],
        distCodeCombId: [],
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
        locCode:[],
        lineTypeLookupCode: ['', [Validators.required]],
        segment1: [],
        amount: ['', [Validators.required]],
        poNumber: [],
        poLineId: [],
        matchType: [],
        defaultDistCcid: [],
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
        invoiceId:[],
        INVStatus: [],
        invTypeLookupCode: ['', [Validators.required]],
        segment1: [],
        name: ['', [Validators.required]],
        suppInvNo: [],
        suppId: [],
        suppInvDate: [],
        suppNo: [],
        siteName: [],
        taxAmt: [],
        // invoiceId: [],
        invoiceNum: ['', [Validators.required]],
        invoiceAmt: ['', [Validators.required]],
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
        payGroup: [],
        prepayType: [],
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
  }

  addRow() {
    // alert('k '+ k);
    this.invLineDetailsArray().push(this.invLineDetails());
    var len = this.invLineDetailsArray().length;
    this.invoiceLineNo = this.invoiceLineNo + 1;
    var patch = this.poInvoiceForm.get('invLines') as FormArray;
    (patch.controls[len - 1]).patchValue(
      {
        // lineNumber: len,
        lineNumber: this.invoiceLineNo,

      }
    );
  }


  Delete(trxLineIndex) {
    this.invLineDetailsArray().removeAt(trxLineIndex);
    trxLineIndex = trxLineIndex + 1;
    this.taxarr.delete(trxLineIndex);
    this.distarr.delete(trxLineIndex);
  }
  getLocation(k) {
    var arrayControl = this.poInvoiceForm.get('obj').value;
    var patch1 = this.poInvoiceForm.get('invLines') as FormArray;
    console.log(this.locIdList);   
    var location = arrayControl[0].locationId;
    // var selectlocId = this.locIdList.find(v => v.locId === arrayControl[0].locationId);
    var selectlocId = this.locIdList.find(d => d.locId === arrayControl[0].locationId);
    console.log(selectlocId);  
    patch1.controls[k].patchValue({ locId: location });
    patch1.controls[k].patchValue({locCode:selectlocId.locCode})
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
}
