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

  @ViewChild('dateRangePicker', { static: true })
  dateRangePicker: DateRangePickerComponent;
  indexVal: number;
  locId: number;
  locCode: string;
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
  isVisibleSave: boolean = true;
  isVisibleValidate: boolean = false;
  isVisibleSaveTDS: boolean = false;

  invoiceDate = this.pipe.transform(this.now, 'yyyy-MM-ddTHH:mm');
  // accountingDate = new Date();
  suppInvDate: Date;
  termsDate: Date;
  termsId: number;
  itemType: string;
  taxCategoryId: number;
  taxCategoryName: string;
  hsnSacCodeList: any = [];
  displayTaxCategory = true;
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
  public locIdList1: Array<string> = [];
  public BranchList: Array<string> = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: any = [];
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
  constructor(private fb: FormBuilder, private transactionService: TransactionService, private service: MasterService, private router: Router) {
    this.poInvoiceForm = fb.group({
      emplId: [],
      invoiceId: [],
      ouId: [''],
      invoiceStatus: [''],
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
      payGroup:[],
      thresHoldHdrId: [],
      thresHoldTypeId: [],
      runningTotalDr: [],
      periodName: [],
      postedDate: [],
      jeCategory: [],
      docSeqValue: [],
      runningTotalCr: [],
      name1: [],

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
      locCode: [],
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
      invoiceId: [],
      invoiceStatus: [],
      payGroup:[],
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
    $("#wrapper").toggleClass("toggled");
    var patch = this.poInvoiceForm.get('obj') as FormArray;
    (patch.controls[0]).patchValue(
      {
        ouName: (sessionStorage.getItem('ouName')),
        ouId: (sessionStorage.getItem('ouId')),

      }
    );

    this.poInvoiceForm.patchValue({ invoiceStatus: 'Not Validated' })

    this.paymentMethod1 = 69;
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.emplId = Number(sessionStorage.getItem('emplId'));

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


    this.service.supplierCodeList()
      .subscribe(
        data1 => {
          this.supplierCodeList = data1;
          console.log(this.supplierCodeList);
          data1 = this.supplierCodeList;
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
    this.service.getInterBranchNatural()
      .subscribe(
        data => {
          this.NaturalAccountList = data.obj;
          console.log(data.obj);
          console.log(this.NaturalAccountList);
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
          console.log(this.tdsSectionList);
        }
      );

    this.service.tdsTaxCategoryList()
      .subscribe(
        data => {
          this.tdsTaxCategoryList = data;
          console.log(this.tdsTaxCategoryList);
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
    patch1.controls[k].patchValue({ locCode: selectlocId.locCode })
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
  currop='Save';
  currentOP = 'Search'
  apInvFind(content) {
    // alert(content)
    this.currentOP = 'Search';
    // alert(this.currop)
    this.lineDetailsArray().clear();
    this.TaxDetailsArray().clear();
    this.TdsDetailsArray().clear();
    this.lineDistributionArray().clear();
    this.displayHeaderData = false;
    let jsonData = this.poInvoiceForm.value;
    let invSearch: ISearch = Object.assign({}, jsonData);
    var searchObj: InvoiceSearchNew = new InvoiceSearchNew();
    if (this.currop==='Save'){
      searchObj.invoiceNum==='content';
    }
    if (this.poInvoiceForm.get('segment1').value != null) { searchObj.segment1 = this.poInvoiceForm.get('segment1').value }
    if (this.poInvoiceForm.get('suppNo').value != null) { searchObj.suppNo = this.poInvoiceForm.get('suppNo').value }
    if (this.poInvoiceForm.get('invoiceNum').value != null) { searchObj.invoiceNum = this.poInvoiceForm.get('invoiceNum').value }
    this.transactionService.getsearchByApINV(JSON.stringify(searchObj)).subscribe((res: any) => {
      if (res.code === 200) {
        this.isDisabled = true;
        this.isVisibleSave = false;
        this.isVisibleUpdateBtn = true;
        this.isVisibleValidate = true;

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
            let payDtString = payDate.format('yyyy-MM-DD');
            this.lineDetailsArray().controls[i].patchValue({ paymentRateDate: payDtString, invoiceId1: this.lstsearchapinv[i].invoiceId, internalSeqNum: this.lstsearchapinv[i].internalSeqNum });
            this.lineDetailsArray().controls[i].patchValue({ glDate: res.obj[i].glDate });
            if (res.obj.paymentMethod === undefined) {
              (patch.controls[i]).patchValue(
                {
                  paymentMethod: 'CASH',
                }
              );
            }
            console.log(this.locIdList);
            let selectedValue = this.locIdList.find(v => v.locId == res.obj[i].attribute1);
            console.log(selectedValue);
            this.lineDetailsArray().controls[i].patchValue({ locationId: selectedValue.locId });
            if (res.obj[i].invoiceStatus === 'Validated') {
              this.poInvoiceForm.disable();
              this.isVisibleUpdateBtn = false;
              // this.isVisibleSave=false;
            }
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
              this.lineDetailsArray().controls[i].get('glDate').disable();
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

    this.service.supplierCodeList1()
      .subscribe(
        data => {
          this.supplierCodeList1 = data;
          console.log(this.supplierCodeList1);
          this.suppNo = name;
          console.log(this.supplierCodeList1);

        }
      );

    let selectedValue = this.supplierCodeList.find(v => v.suppNo == name);
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


  selectINVLineDtl(i) {
    // alert(this.currentOP);
    this.tdsTaxDetailsArray().clear();
    this.lineDistributionArray().clear();
    this.invLineDetailsArray().clear();
    this.TaxDetailsArray().clear();
    this.dispaccountingDate = true;
    this.displayapInvCancelled = true;
    this.displayViewTaxDetails = false;
    this.selectedLine = i;
    this.displaydescription = false;
    var arrayControl = this.poInvoiceForm.get('obj').value;
    var invoiceStatus = arrayControl[this.selectedLine].invoiceStatus;
    var invoiceStatus = arrayControl[this.selectedLine].invoiceStatus;
    var invoiceStatus1 = this.poInvoiceForm.get('invoiceStatus').value;
    var invoiceNum = this.lineDetailsArray().controls[i].get('invoiceNum').value;
    this.invLineDetailsArray().clear();
    this.transactionService.getApInvLineDetails(invoiceNum)
      .subscribe(
        data => {
          console.log(data);
          this.isSearchPatch = true;
          this.displayitemName = true;
          this.displayTaxCategory = false;
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

          for (let i = 0; i < data.invDisLines.length; i++) {
            var invLnGrp: FormGroup = this.tdsLineDetails();
            this.TdsDetailsArray().push(invLnGrp);
          }
          // alert(data.taxLines.length)
          for (let i = 0; i < data.taxLines.length; i++) {
            var invLnGrp: FormGroup = this.TaxDetailsGroup();
            this.TaxDetailsArray().push(invLnGrp);
          }
          console.log(data.taxLines);
          
          this.poInvoiceForm.get('invLines').patchValue(data.invLines);
          this.poInvoiceForm.get('taxLines').patchValue(data.taxLines);
          this.poInvoiceForm.get('distribution').patchValue(data.invDisLines);
          this.poInvoiceForm.get('tdsLines').patchValue(data.invTdsLines);
          let controlinv = this.poInvoiceForm.get('invLines') as FormArray;
          for (let i = 0; i < data.invLines.length; i++) {
            if (data.invLines[i].lineTypeLookupCode === 'ITEM' || data.invLines[i].lineTypeLookupCode === 'OTHER') {
              (controlinv.controls[i]).patchValue({ taxCategoryName: data.invLines[i].taxCategoryName });

            }
          }
          var arraybase1 = this.poInvoiceForm.get('obj').value;
          var invId = arraybase1[0].invoiceId;
          let tdscontrolInv = this.poInvoiceForm.get('tdsLines') as FormArray;
          for (let i = 0; i < data.invDisLines.length; i++) {
            (tdscontrolInv.controls[i]).patchValue({ invoiceId: invId });
            (tdscontrolInv.controls[i]).patchValue({ invoiceLineNum: data.invDisLines[i].invoiceLineNum });
            (tdscontrolInv.controls[i]).patchValue({ invoiceDistId: data.invDisLines[i].invDistributionId });
            (tdscontrolInv.controls[i]).patchValue({ distCodeCombSeg: data.invDisLines[i].distCodeCombSeg });
            (tdscontrolInv.controls[i]).patchValue({ baseAmount: data.invDisLines[i].baseAmount });
            (tdscontrolInv.controls[i]).patchValue({ description: data.invDisLines[i].description });
          }

          this.invoiceStatus = data.invoiceStatus;

          if (data.invTdsLines.length === 0) {

            this.displayTdsButton = true;
            this.showTdsLineDetails = false;
            this.showTdsLines(0);
          } else {
            this.displayTdsButton = false;
            this.showTdsLineDetails = true;
          }
          if (data.invoicestatus == '' || data.invoiceStatus==null) {
            this.isVisibleSave = false;
            this.isVisibleUpdateBtn = true;
            this.isVisibleValidate = true;
          }
          if (data.invoiceStatus == 'Validated') {
            this.poInvoiceForm.disable();
            this.displayAddNewLine = false;
            this.invoiceStatus = data.invoiceStatus;
            this.displayapInvCancelled = false;
            this.isVisibleUpdateBtn = false;
            this.isVisibleValidate = false;
            this.isVisibleSaveTDS=false;
          }
          if (data.source == 'MANUAL') {
            this.apInvoiceTyp = 'MANUAL';
            this.dispStatus = true;
            this.disDeleteButton = true;
            this.displayAddNewLine = true;
            this.dispAccountCode = true;
            this.poInvoiceForm.get('distribution').enable();
            this.poInvoiceForm.get('invLines').enable();
            this.poInvoiceForm.get('taxLines').enable();
          }

          else {
            this.dispStatus = false;
            this.disDeleteButton = false;
            this.dispAccountCode = false;
            this.poInvoiceForm.get('distribution').disable();
            this.poInvoiceForm.get('invLines').disable();
            this.poInvoiceForm.get('taxLines').disable();
          }
          if (data.invoiceStatus === 'Validated') {
            this.displayapInvCancelled = false;
            this.isVisible = false;
            this.poInvoiceForm.disable();
            this.isVisible1 = true;
            this.displayapInvCancelled = false;
            this.TdsDetailsArray().disable();

          }
          else if (data.invoiceStatus === 'CANCELLED') {
            this.displayapInvCancelled = true;
            this.isVisible = false;
            this.poInvoiceForm.disable();
          }
          else {
            this.isVisible = true;
            this.displayapInvCancelled = false;
          }
        }
      )

    if (invoiceStatus1 === 'Validated' || invoiceStatus1 === 'CANCELLED') {
      this.isVisible = false;
      // this.isVisible1=true;
      this.displayapInvCancelled = false;
    }
    else {
      this.isVisible = true;
      //  this.isVisible1=false;
      this.displayapInvCancelled = false;
      this.isVisibleSaveTDS=true;
    }
    if (this.currentOP === 'Search') {
      // alert('in if search')
      this.tdsTaxDetailsArray().disable();
      this.lineDistributionArray().disable();
      this.invLineDetailsArray().disable();
      this.TaxDetailsArray().disable();
    }
  }
  showTdsLines(mInvId) {

    var invId;
    if (mInvId === 0) {
      var arraybase = this.poInvoiceForm.get('obj').value;
      invId = arraybase[0].invoiceId;
      console.log(arraybase);
      this.invoiceId = arraybase[0].invoiceId;

    } else { invId = mInvId; }
    console.log(this.invoiceDistId);

    this.service.getTdsDetails(invId)
      .subscribe(
        data => {
          this.lstTdsLineDetails = data;
          console.log(this.lstTdsLineDetails);

          for (let i = 0; i < this.TdsDetailsArray.length; i++) {
            this.TdsDetailsArray().removeAt(i);
          }
          this.TdsDetailsArray().clear();

          for (let i = 0; i < this.lstTdsLineDetails.length; i++) {

            var tdsLnGrp: FormGroup = this.tdsLineDetails();
            this.TdsDetailsArray().push(tdsLnGrp);

          }
          this.poInvoiceForm.get('tdsLines').patchValue(this.lstTdsLineDetails);
          let tdscontrolInv = this.poInvoiceForm.get('tdsLines') as FormArray;

          for (let i = 0; i < this.lstTdsLineDetails.length; i++) {
            // alert(this.lstTdsLineDetails[i].invDistributionId);
            (tdscontrolInv.controls[i]).patchValue({ invoiceId: invId });
            (tdscontrolInv.controls[i]).patchValue({ invoiceDistId: this.lstTdsLineDetails[i].invDistributionId });
            (tdscontrolInv.controls[i]).patchValue({ description: this.lstTdsLineDetails[i].description });

          }

        });
  }

  onOptionViewTaxDetails(taxCategoryId, k) {
    // alert(k)
    var arrayControl = this.poInvoiceForm.get('invLines').value;
    var linetaxCategoryId = arrayControl[k].taxCategoryId
  }


  selectDisLineDtl(k) {
    var lineNumber = this.invLineDetailsArray().controls[k].get('lineNumber').value;
    var invoiceId = this.invLineDetailsArray().controls[k].get('invoiceId').value;
    var taxcat = this.invLineDetailsArray().controls[k].get('taxCategoryName').value;
    var itemtyp = this.invLineDetailsArray().controls[k].get('lineTypeLookupCode').value;
    var amount = this.invLineDetailsArray().controls[k].get('amount').value;
    this.invoiceId = this.lstInvLineDeatails.invoiceId;
    if (this.invoiceId == null) {
      alert('Invoice No is not generated');
      if (itemtyp != 'MISCELLANEOUS') {
        this.distribution1(k, itemtyp, amount);
      }
      return;
    }
    else {
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
  distribution1(k, itemtyp, amount) {
    var arrayControl = this.poInvoiceForm.get('obj').value;
    var distributionSet = arrayControl[0].distributionSet;
    var arrayControl2 = this.poInvoiceForm.get('invLines').value;
    var amount = arrayControl2[k].amount;
    var invln = arrayControl2[k].lineNumber;
    if (amount == null) {
      alert('Kindly entered Amount');
    }
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
      var len = this.lineDistributionArray().length;
      var patch = this.poInvoiceForm.get('distribution') as FormArray;
      var controlDist = this.poInvoiceForm.get('distribution').value;
      if (controlDist[0].lineTypeLookupCode != null && controlDist[0].distLineNumber != null) {
        this.lineDistributionArray().push(this.distLineDetails());
        var aa = this.lineDistributionArray().length;
        (patch.controls[aa - 1]).patchValue(
          {
            distLineNumber: aa,
            invoiceLineNum: invln,
            lineTypeLookupCode: itemtyp,
            amount: amount,
            baseAmount: amount,
          }
        );
        this.distarr.set(invln, this.poInvoiceForm.get('distribution').value);
      }
      if (controlDist[0].lineTypeLookupCode == null || controlDist[0].distLineNumber == null) {
        (patch.controls[len - 1]).patchValue(
          {
            distLineNumber: len,
            invoiceLineNum: invln
          }
        );
        this.distarr.set(invln, this.poInvoiceForm.get('distribution').value);
      }

    }
    this.poInvoiceForm.get('invLines').patchValue({ locId: arrayControl[0].locationId });
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
  }


  onHsnCodeSelected(event, index) {
    console.log(event);
    let selectgstPercentage = this.hsnSacCodeList.find(v => v.hsnsaccode == event);
    if (event != null && event != 'NA') {
      var gstPercentage = selectgstPercentage.gstPercentage;
      let control = this.poInvoiceForm.get('invLines') as FormArray;
      (control.controls[index]).patchValue(
        {
          gstPercentage: selectgstPercentage.gstPercentage,
        });
      console.log(this.poInvoiceForm.get('taxCategoryName'));
      console.log(this.lineDetailsArray().controls[0].get('taxCategoryName').value);
      var CusttaxCategoryName = this.lineDetailsArray().controls[0].get('taxCategoryName').value;
      this.service.taxCategoryListNew(CusttaxCategoryName, gstPercentage)
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
          this.lineDetailsArray().controls[0].patchValue({ taxCategoryName: data.taxCategoryName })
        }
      );
  }

  onOptionTaxCatSelected(taxCategoryName, k) {
    if (this.isSearchPatch === false) {
      this.displayViewTaxDetails = false;
      var arrayControl = this.poInvoiceForm.get('invLines').value;
      var objarray = this.poInvoiceForm.get('obj').value;
      this.indexVal = arrayControl[k].lineNumber;
      var amount = arrayControl[k].amount;
      let select = this.taxCategoryList[k].find(d => d.taxCategoryName === taxCategoryName);
      let controlinv = this.poInvoiceForm.get('invLines') as FormArray;
      var existlinecnt = controlinv.length;
      (controlinv.controls[k]).patchValue({ taxCategoryId: select.taxCategoryId });
      (controlinv.controls[k]).patchValue({ locId: objarray[0].locationId });
      var disAm = 0;
      var sum = 0;
      this.transactionService.getTaxDetails(select.taxCategoryId, sessionStorage.getItem('ouId'), disAm, amount)
        .subscribe(
          data => {
            this.lstInvLineDeatails1 = data;
            console.log(this.lstInvLineDeatails1);
            // alert(this.lstInvLineDeatails1.taxLines.length)
            for (let i = 0; i < this.lstInvLineDeatails1.taxLines.length; i++) {
              // alert(this.lstInvLineDeatails1.taxLines[i].totTaxPer)
              if (this.lstInvLineDeatails1.taxLines[i].totTaxPer != 0) {
                sum = sum + this.lstInvLineDeatails1.taxLines[i].totTaxAmt;
              }
            }
            // alert(sum + '----'+ (amount+sum));
            var patch = this.poInvoiceForm.get('obj') as FormArray;
            (patch.controls[0]).patchValue({ invoiceAmt: (amount+sum)});
            (patch.controls[0]).patchValue({ taxAmt: sum});
           
          
            for (let i = 0; i < data.miscLines.length; i++) {
              var invLnGrp: FormGroup = this.invLineDetails();
              this.invLineDetailsArray().push(invLnGrp);
            }
            (controlinv.controls[0]).patchValue({ lineNumber: 1 });
            var x = controlinv.length + 1;
            for (let z = existlinecnt, j = 1; z < this.invLineDetailsArray().length; j++, z++) {
              controlinv.controls[z].patchValue(data.miscLines[j - 1]);
              var ln = Number(this.indexVal + "." + j);
              (controlinv.controls[z]).patchValue({ lineNumber: ln });
              (controlinv.controls[z]).patchValue({ locId: objarray[0].locationId });
            }
            let controlinv1 = this.poInvoiceForm.get('taxLines') as FormArray;
            this.TaxDetailsArray().clear();
            for (let i = 0; i < data.taxLines.length; i++) {
              var invLnGrp: FormGroup = this.TaxDetailsGroup();
              this.TaxDetailsArray().push(invLnGrp);
              console.log(new Date());
            }
            this.poInvoiceForm.get('taxLines').patchValue(data.taxLines);
            for (let j = 0; j < data.taxLines.length; j++) {
              console.log(new Date());
              controlinv1.controls[j].patchValue({
                invLineNo: this.indexVal + 1,
              });
              console.log(new Date());
              var patch = this.poInvoiceForm.get('obj') as FormArray;
              var taxLinesData = this.poInvoiceForm.get('taxLines').value;
              console.log(taxLinesData);
              // var headerTotTaxAmt = sum(taxLinesData[j].totTaxAmt)
              alert('Tax Details Has Been Patched... Please Confirm!');
              var lnv = this.indexVal;
              // alert(this.indexVal+'----index value---')
              var lno:String = String(lnv);
              // alert(lno+'----taxcategory' );
              // let taxMapData = this.poInvoiceForm.get('taxLines').value;
              this.taxMap.set(String(lno), taxLinesData);
              console.log(this.taxMap.get(String(lno)));
            }
            // var ln: string = String(this.invLineNo);
            this.invLineNo = k + 1;
            this.taxarr.set(this.invLineNo, this.poInvoiceForm.get('taxLines').value);
            let controlDist = this.poInvoiceForm.get('distribution') as FormArray;
            var controlPatchDist = this.poInvoiceForm.get('distribution').value;
            var x1 = Number((this.lineDistributionArray().length));
            var len = this.lineDistributionArray().length
            var totalLen = len + Number(data.invDisLines.length)

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

              if (controlPatchDist[0].distLineNumber != null) {
                for (let i = 0, z = len; i < data.invDisLines.length; i++, z++) {
                  controlDist.controls[z].patchValue(data.invDisLines[i]);
                  (controlDist.controls[z]).patchValue({ invoiceLineNum: Number(this.invoiceLineNo), distLineNumber: z + 1 });

                }
              }
              else {
                for (let i = 0, z = len - 1; i < data.invDisLines.length; i++, z++) {
                  controlDist.controls[z].patchValue(data.invDisLines[i]);
                  (controlDist.controls[z]).patchValue({ invoiceLineNum: Number(this.invoiceLineNo), distLineNumber: z + 1 });
                }
              }
            } else {

              for (let i = 0, z = len; i < data.invDisLines.length; i++, z++) {
                controlDist.controls[z].patchValue(data.invDisLines[i]);
                (controlDist.controls[z]).patchValue({ invoiceLineNum: Number(this.invoiceLineNo), distLineNumber: z + 1 });
              }
            }

            this.distarr.set(this.invLineNo, this.poInvoiceForm.get('distribution').value);
           
          })
    }
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
    var arrayControl = this.poInvoiceForm.get('distribution').value;
    var invLinesControl = this.poInvoiceForm.get('invLines').value;
    let segmentName1 = arrayControl[i].distCodeCombSeg
    if (segmentName1 === null) {
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
    if (segmentName1 != null) {

      var temp = segmentName1.split('.');
      this.segment11 = temp[0];
      this.segment2 = temp[1];
      this.segment3 = temp[2];
      this.segment4 = temp[3];
      this.segment5 = temp[4];
    }
    this.displayModal = false;
    this.showModal = true; // Show-Hide Modal Check
    this.content = i; // Dynamic Data
    let a = i + 1
    this.title = "Distribution Line :" + a;    // Dynamic Data
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
    var invoiceNum = this.lineDetailsArray().controls[this.selectedLine].get('invoiceNum').value;
    this.service.viewAPAccounting(invoiceNum).subscribe((res: any) => {
      if (res.code === 200) {
        this.viewAccounting2 = res.obj;
        this.description = res.obj.description;
        this.periodName = res.obj.periodName;
        this.postedDate = res.obj.postedDate;
        this.jeCategory = res.obj.jeCategory;
        this.name1 = res.obj.name;
        this.ledgerId = res.obj.ledgerId;
        this.runningTotalDr = res.obj.runningTotalDr;
        this.runningTotalCr = res.obj.runningTotalCr;
        this.docSeqValue = res.obj.docSeqValue;
        console.log(this.description);

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

  apInvoiceSave() {
    this.displayValidateButton = false;
    let jsonData = this.poInvoiceForm.value.obj[0];
    jsonData.ouId = this.ouId;
    jsonData.emplId = this.emplId;
    jsonData.amtAppToDisc = 0
    jsonData.accPayCodeCombId = 2079
    jsonData.currency = 'INR';
    var taxStr = [];
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
     if(tdsVals.taxCategoryId===null){
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
        var invNum= haederDtls[0].invoiceNum;
        // alert(invNum);
        this.poInvoiceForm.patchValue({ invoiceId: res.obj })
        this.displayTdsButton = true;
        this.showTdsLines(res.obj);
        this.isVisibleSave = false;
        this.isVisibleUpdateBtn = true;
        this.isVisibleValidate = true;
        // this.poInvoiceForm.reset();
        window.location.reload();
        // this.apInvFind(invNum);
        // this.TaxDetailsArray().clear();
        // this.TdsDetailsArray().clear();
        // // this.lineDetailsArray().clear();
        // this.tdsTaxDetailsArray().clear();
        // this.invLineDetailsArray().clear();
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
  }



  Validate() {
    var arrayControl = this.poInvoiceForm.get('obj').value;
    var arrayControl1 = this.poInvoiceForm.get('invLines').value;
    var arrayCaontrolOfDistribution = this.poInvoiceForm.get('distribution').value;
    var amount = this.lineDetailsArray().controls[this.selectedLine].get('invoiceAmt').value;
    var totalOfInvLineAmout = 0;
    for (let i = 0; i < this.invLineDetailsArray().length; i++) {
      totalOfInvLineAmout = Math.round(((totalOfInvLineAmout + arrayControl1[i].amount) + Number.EPSILON) * 100) / 100;
    }
    var totalOfDistributionAmout = 0;
    for (let j = 0; j < this.lineDistributionArray().length; j++) {
      totalOfDistributionAmout = Math.round(((totalOfDistributionAmout + Number(arrayCaontrolOfDistribution[j].amount)) + Number.EPSILON) * 100) / 100;
    }
    if (amount == totalOfInvLineAmout && amount == totalOfDistributionAmout) {
      var arrayControl = this.poInvoiceForm.get('obj').value;
      var invoiceNum = this.lineDetailsArray().controls[this.selectedLine].get('invoiceNum').value;
      this.transactionService.UpdateValidate(invoiceNum).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.poInvoiceForm.disable();
          this.poInvoiceForm.patchValue({ invoiceStatus: 'Validate' })
          this.isVisible = false;
          this.isVisibleUpdateBtn = false;
          this.isVisibleValidate = false;
        } else {
          if (res.code === 400) {
            alert(res.message);
          }
        }
      });
    } else {
      alert('Amount Missmach kindly check');
    }

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

      this.transactionService.PoInvoiceTdsDataSubmit(tdsLines).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
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
    var tdsTaxAmt = tdsLineArr1[i].taxAmount;
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
    this.service.getInterBranch(segment, lType).subscribe(
      data => {
        this.branch = data;
        console.log(this.branch);
        if (this.branch != null) {
          if (lType === 'SS_Interbranch') {
            this.lookupValueDesc5 = this.branch.lookupValueDesc;
          }
          if (lType === 'CostCentre') {
            this.lookupValueDesc3 = this.branch.lookupValueDesc;
          }
          if (lType === 'SS_Location') {
            this.lookupValueDesc2 = this.branch.lookupValueDesc;
          }
          if (lType === 'SS_Branch') {
            this.lookupValueDesc1 = this.branch.lookupValueDesc;
          }
        }
      }
    );

  }


  onOptionsSelectedBranchNew(event) {
    if (event != undefined) {
      let selectinterbranch = this.InterBrancList.find(v => v.lookupValue == event);
      console.log(selectinterbranch);
      this.lookupValueDesc5 = selectinterbranch.lookupValueDesc;
    }
  }


  fnCancatination(index) {
    var arrayControl = this.poInvoiceForm.get('distribution').value;
    var patch = this.poInvoiceForm.get('distribution') as FormArray;
    arrayControl[index].segmentName = this.poInvoiceForm.get('segment11').value + '.'
      + this.poInvoiceForm.get('segment2').value + '.'
      + this.poInvoiceForm.get('segment3').value + '.'
      + this.poInvoiceForm.get('segment4').value + '.'
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
    if (event != undefined) {
      let selectnaturalaccount = this.NaturalAccountList.find(v => v.naturalaccount == event);
      console.log(selectnaturalaccount);
      this.lookupValueDesc4 = selectnaturalaccount.description;
      this.service.getInterBranchNewApi(event).subscribe(
        data => {
          this.InterBrancList = data.obj
        })
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
    // debugger;
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
        this.showTdsTaxLines(1, baseAmount, taxCatId, tdsSectionCd, index);
      }

      // }
    } else { this.tdsTaxDetailsArray().reset(); }

  }


  showTdsTaxLines(mItemId: any, mBaseAmt: any, mTaxCatId: any, mtdsSection: any, j: any) {
    // alert ("Tds lines...wip.inv id :"+mInvId);
    this.service.getTdsTaxDetails(mItemId, mBaseAmt, mTaxCatId)
      .subscribe(
        data => {
          this.lstTdsTaxLineDetails = data;
          console.log(this.lstTdsTaxLineDetails);

          // alert("this.lstTdsTaxLineDetails.length  :"+this.lstTdsTaxLineDetails.length);

          for (let i = 0; i < this.tdsTaxDetailsArray.length; i++) {
            this.tdsTaxDetailsArray().removeAt(i);
          }

          this.tdsTaxDetailsArray().clear();

          //  for (let i = 0; i < this.lstTdsTaxLineDetails.length; i++)
          // {
          var tdsTaxLnGrp: FormGroup = this.tdsTaxDetailsGroup();
          this.tdsTaxDetailsArray().push(tdsTaxLnGrp);

          // }
          this.poInvoiceForm.get('tdsTaxLines').patchValue(this.lstTdsTaxLineDetails);

          var tdsTaxArr = this.poInvoiceForm.get('tdsTaxLines').value;
          var tdsTaxAmt1 = tdsTaxArr[0].totTaxAmt;
          // var invLineArr = this.poInvoiceForm.get('tdsLines').value;
          var patch = this.poInvoiceForm.get('tdsLines') as FormArray;
          patch.controls[j].patchValue({ taxAmount: tdsTaxAmt1 })

        }
      );

  }

  prepaymentData(event) {
    var headerVal = this.poInvoiceForm.get('obj').value;
    var invtype = headerVal[0].invTypeLookupCode;
    // alert(invtype);
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
              arrinvln.controls[k].patchValue({ lineTypeLookupCode: 'OTHER', amount: Number(invamt) });


            }
            console.log(this.poInvoiceForm.get('invLines').value);
            // alert (this.poInvoiceForm.value);
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

}

