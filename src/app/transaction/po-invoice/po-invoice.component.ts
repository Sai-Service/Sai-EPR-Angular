import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DateRangePickerComponent } from 'ngx-daterange';
import { IDateRange, IDateRangePickerOptions } from 'ngx-daterange';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { DatePipe } from '@angular/common';
import { ManualInvoiceObj } from './manual-invoice-obj';
import { from } from 'rxjs';

interface IpoInvoice {
  suppInvDate: Date;
  invoiceDate: Date;
  termsDate: Date;
  title: string;
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
}


@Component({
  selector: 'app-po-invoice',
  templateUrl: './po-invoice.component.html',
  styleUrls: ['./po-invoice.component.css']
})
export class PoInvoiceComponent implements OnInit {
  // public start: Date = new Date ("10/07/2017"); 
  // public end: Date = new Date ("11/25/2017");

  @ViewChild('dateRangePicker', { static: true })
  dateRangePicker: DateRangePickerComponent;
  indexVal: number;
  firstFieldEmittedValue: IDateRange;
  isSearchPatch : boolean = false;
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
  suppNo: number;
  suppId: number;
  ouName: string;
  invoiceNum: string;
  invoiceAmt: number;
  internalSeqNum:number;
  invDescription:string;
  
  // invoiceDate:Date;
  pipe = new DatePipe('en-US');
  now = Date.now();
  invoiceDate = this.pipe.transform(this.now, 'd-M-y h:mm:ss');
  accountingDate= new Date();
  suppInvDate: Date;
  termsDate: Date;
  termsId: number;
  itemType: string;
  taxCategoryId: number;
  taxCategoryName:string;
  // glDate:Date;
  //  glDate=this.pipe.transform(this.now, 'd-M-y h:mm:ss'); 
  // glDate = new Date();
  // public glDate =this.datepipe.transform(this.glDate1, 'yyyy-MM-dd');
  // pipe = new DatePipe('en-US');
  // now = Date.now();
  glDate = this.pipe.transform(this.now, 'short');
  paymentMethod='CHEQUE';


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
  invTransferStatus: string="Never Validated";
  INVStatus:string='Never Validated';
  poChargeDesc:string= 'Unprocessed';
  dispStatus=true;
  disDeleteButton=true;
  dispAccountCode=true;
  displayAddNewLine=true;
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
  activeLineNo:number=1;
  // ouId:number;
  accDesc:string;
  submitted = false;
  public OUIdList: Array<string> = [];
  public TypeList: Array<string> = [];
  public lstsearchapinv: any;
  // nverValidedCnd:false;
  // ValidedCnd:true;
  public locIdList1: Array<string> = [];
  public BranchList: Array<string> = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: Array<string> = [];
  public InterBrancList: Array<string> = [];
  public paymentMethodList: Array<string> = [];
  public prepayTypeList: Array<string> = [];
  public poTypeList: Array<string> = [];
  public APitemtYPE: Array<string> = [];
  public locIdList: Array<string> = [];
  public distributionSetNameList: Array<string>[];
  public taxCalforItem: any[];
  public suppIdList: any
  public distributionLineWise: any[];
  taxCat: string;
  public taxCategoryList: any[];
  public ValidateObj: any;
  taxLines: number;
  displayOUName = false;
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
  displayModal = true;
  selectedLine = 0;
  userList1: any[] = [];
  userList2: any[] = [];
  lastkeydown1: number = 0;
  public supplierCodeList: any[];
  public supplierCodeList1: any[];
  siteIdList: any;
  invItemId: number;
  billToLoc: string;
  segmentName1: string;
  taxDetaileSendArr: any = [];
  paymentMethod1:any;

  public taxarr = new Map<number, any>();
  public distarr = new Map<number, any>();

  invoiceLineNo :number=1;
  prepaydata:any;

  errorMsg: string;
  displayError: boolean;
  formSumitAttempt: boolean;
  hsnsaclist: any;
  constructor(private fb: FormBuilder, private transactionService: TransactionService, private service: MasterService, private router: Router,) {
    this.poInvoiceForm = fb.group({
      ouId: [''],
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
      // ouId:[],
      // ouName:[''],
      // suppInvDate:[''],
      // termsDate:[''],
      // termsId:[''],
      // glDate:[''],
      // currency:[''],
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
      segment1:[],
      internalSeqNum:[],
      obj: this.fb.array([this.lineDetailsGroup()]),
      invLines: this.fb.array([this.invLineDetails()]),
      distribution: this.fb.array([this.distLineDetails()]),
      taxLines: this.fb.array([this.TaxDetailsGroup()])
    });
    // this.poInvoiceForm.get('paymentMethod').patchValue('CHEQUE');
  }
  addRow() {
    // alert('k '+ k);
    this.invLineDetailsArray().push(this.invLineDetails());
    var len = this.invLineDetailsArray().length;
    this.invoiceLineNo=this.invoiceLineNo+1;
    var patch = this.poInvoiceForm.get('invLines') as FormArray;
    (patch.controls[len - 1]).patchValue(
      {
        // lineNumber: len,
        lineNumber:this.invoiceLineNo,

      }
    );
  }


  Delete(trxLineIndex){
    this.invLineDetailsArray().removeAt(trxLineIndex);
    trxLineIndex=trxLineIndex+1;
    this.taxarr.delete(trxLineIndex);
    this.distarr.delete(trxLineIndex);
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
    // return this.lineDetailsArray.controls[].get('taxAmounts') as FormArray
    return <FormArray>this.poInvoiceForm.get('taxLines')
  }



  distLineDetails() {
    return this.fb.group({
      invDistributionId: [],
      invoiceLineNum: [],
      distLineNumber: [],
      amount: [],
      accountingDate: [],
      baseAmount: [],
      poSegment: [],
      distCodeCombId: [],
      distCodeCombSeg: [],
      poChargeAc: [],
      poChargeDesc: [],
      poChargeCode: [],
      lineTypeLookupCode: [],
      description: [],
      invTransferStatus: [],
      poChargeAcCode: [],
      accDesc:[],
      // totalDistAmt:[],
      // totalDistBaseAmt:[],
      // poChargeAcCode:[],
      // invTransferStatus:[],
    })
  }

  invLineDetails() {
    return this.fb.group({
      internalSeqNum:[],
      itemId: [],
      invoiceId: [],
      lineNumber: [],
      lineTypeLookupCode: [],
      segment1: [],
      amount: [],
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
      locId: [],
    })
  }

  invLineDetailsArray(): FormArray {
    // var patch = this.poInvoiceForm.get('invLines') as FormArray;
    // (patch.controls[0]).patchValue(
    //   {
    //     lineNumber: 1,
    //   }
    // );
    return <FormArray>this.poInvoiceForm.get('invLines')
  }


  lineDetailsGroup() {
    return this.fb.group({
      ouId: [],
      ouName: [],
      invTypeLookupCode: [],
      segment1: [],
      name: ['',[Validators.required]],
      suppInvNo: [],
      suppId: ['',[Validators.required]],
      suppInvDate: ['',[Validators.required]],
      suppNo: [],
      siteName: ['',[Validators.required]],
      taxAmt: [],
      invoiceNum: ['',[Validators.required]],
      invoiceAmt: ['',[Validators.required]],
      invoiceDate: ['',[Validators.required]],
      termsDate: [''],
      termsId: [''],
      glDate: [''],
      currency: [''],
      paymentRateDate: [],
      distributionSet: [],
      matchAction: [],
      terms: [],
      paymentMethod: [],
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
      supplierSiteId: ['',[Validators.required]],
      accPayCodeCombId: [],
      amtAppToDisc: [],
    })
  }

  lineDetailsArray(): FormArray {
    return <FormArray>this.poInvoiceForm.get('obj')
  }


  lineDistributionArray(): FormArray {
    // var patch = this.poInvoiceForm.get('distribution') as FormArray;
    //   (patch.controls[0]).patchValue(
    //     {
    //       distLineNumber: 1,
    //     }
    //   );
    return <FormArray>this.poInvoiceForm.get('distribution')
  }

  // get lineDetailsArray() {
  //   return <FormArray>this.poInvoiceForm.get('poLines')
  // }


  get g() { return this.poInvoiceForm.controls; }

  ngOnInit(): void {
    // this.glDate = new Date();
    this.INVStatus='Never Validated';
    this.paymentMethod1 = 69;
    this.ouId = Number(sessionStorage.getItem('ouId'));

    this.service.getLocationSearch1(this.ouId)
      .subscribe(
        data => {
          this.locIdList = data;
          console.log(this.locIdList);
        }
      );
    // this.form = this.formBuilder.group({});
    this.service.OUIdList()
      .subscribe(
        data => {
          this.OUIdList = data;
          console.log(this.OUIdList);
        }
      );



    this.transactionService.paymentIdListList()
      .subscribe(
        data => {
          this.paymentMethodList = data;
          console.log(this.paymentMethodList);
        }
      );

    this.transactionService.prepayTypeList()
      .subscribe(
        data => {
          this.prepayTypeList = data;
          console.log(this.prepayTypeList);
        }
      );
    this.service.invItemList1()
      .subscribe(
        data => {
          this.invItemList1 = data;
          console.log(this.invItemList1);
        }
      );
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

    this.service.taxCategoryList()
      .subscribe(
        data1 => {
          this.taxCategoryList = data1;
          console.log(this.taxCategoryList);
          data1 = this.taxCategoryList;
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
    this.service.NaturalAccountList()
      .subscribe(
        data => {
          this.NaturalAccountList = data;
          console.log(this.NaturalAccountList);
        }
      ); this.service.InterBrancList()
        .subscribe(
          data => {
            this.InterBrancList = data;
            console.log(this.InterBrancList);
          }
        );
        this.service.hsnSacCodeList()
        .subscribe(
          data=>{
            this.hsnsaclist=data;

          }
        );


        // this.poInvoiceForm.get('paymentMethod').patchValue('CHEQUE');
        var patch = this.poInvoiceForm.get('invLines') as FormArray;
        (patch.controls[0]).patchValue(
          {
            lineNumber: 1,
          }
        );
  }


  // myFunction(){
  //   this.datepipe.transform(this.glDate, 'dd/MM/yyyy')
  //  }

  onOptionsSelectedsuppName(name: any, i) {
    // alert(name);
    this.service.supplierCodeList1()
      .subscribe(
        data => {
          this.supplierCodeList1 = data;
          console.log(this.supplierCodeList1);
          this.suppNo = name;
          console.log(this.supplierCodeList1);

        }
      );
    // var value = supp.substr(supp.indexOf('@') + 1, supp.length);
    let selectedValue = this.supplierCodeList.find(v => v.suppNo == name);
    this.currency = 'INR';
    // var patch = this.poInvoiceForm.get('obj').value;
    // patch.controls[0].patchValue({
    //   currency:'IRN'
    // })
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
//   validateAllFormFields(formGroup: FormGroup) {
//     alert('InValid')         //{1}
//   Object.keys(formGroup.controls).forEach(field => {  //{2}
//     const control = formGroup.get(field);             //{3}
//     if (control instanceof FormControl) {             //{4}
//       control.markAsTouched({ onlySelf: true });
//     } else if (control instanceof FormGroup) {        //{5}
//       this.validateAllFormFields(control);            //{6}
//     }
//   });
// }

// isFieldValid(index,field: string) {
// // //  alert( this.poInvoiceForm.get(obj).value)
// //   // var objarr=this.poInvoiceForm.get('obj').value;
// // alert("In field func")
//   return (
// //     (!this.poInvoiceForm.get(field).valid && this.poInvoiceForm.get(field).touched) ||
// //     (this.poInvoiceForm.get(field).untouched && this.formSumitAttempt)
//        (!(<FormArray>this.poInvoiceForm.get('obj')).at(index).get(field).valid &&(<FormArray>this.poInvoiceForm.get('obj')).at(index).get(field).touched)||
//        ((<FormArray>this.poInvoiceForm.get('obj')).at(index).get(field).untouched && this.formSumitAttempt)
//   );
// }

// displayFieldCss(i,field: string) {
//   return {
//     'has-error': this.isFieldValid(i,field),
//     'has-feedback': this.isFieldValid(i,field)
//   };
// }

HeaderValidation(typecode) {
  

  (<FormArray>this.poInvoiceForm.get('obj')).controls.forEach((group: FormGroup) => {
    (<any>Object).values(group.controls).forEach((control: FormControl) => { 
        control.markAsTouched();
    }) 
  });
  // alert('Please enter valid detail');
  // this.lineTypeLookupCode.focus();
  typecode.focus();
}

getGroupControl(index, fieldName) {
  // alert('nam'+fieldName);
  return (<FormArray>this.poInvoiceForm.get('obj')).at(index).get(fieldName);
}
// HeaderValidation(){
//   this.formSumitAttempt = true;
//     if (this.poInvoiceForm.valid) {
//             console.log('form submitted');
//     }
//   }

  transData(val) {
    return val;
  }
  apInvFind(content) {
    this.lineDetailsArray().clear();
    this.displayOUName = true;
    this.displaypoType = true;
    this.displaysegment1 = true;
    this.displayname = true;
    this.displaysuppNo = true;
    this.displaysiteName = true;
    this.displaycurrency = true;
    this.displayitemName = true;
    this.displaydescription = true;
    this.displaydistributionSet = true;
    const formValue: IpoInvoice = this.transData(this.poInvoiceForm.value);
    this.transactionService.getsearchByApINV(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.lstsearchapinv = res.obj;
        // alert(res.obj[0].segment1);
        // if(res.obj[0].segment1===null){
        //    alert(res.obj[0].segment1);
        //   this.poInvoiceForm.get('distribution').disable();
        //   this.poInvoiceForm.get('invLines').disable();
        //   this.poInvoiceForm.get('taxLines').disable();
        // }
       
        this.lstsearchapinv.forEach(f => {
          var invLnGrp: FormGroup = this.lineDetailsGroup();
          this.lineDetailsArray().push(invLnGrp);
        });
        this.poInvoiceForm.get('obj').patchValue(this.lstsearchapinv);
        // var x=this.lstsearchapinv.invLines;
        // console.log(x);
        
        // alert(this.lstsearchapinv.invLines[0].taxCategoryName)
      //  this.poInvoiceForm.get('taxCategoryName').patchValue(this.lstsearchapinv.taxCategoryName);

        this.displayValidateButton= false;
        this.INVStatus= this.lstsearchapinv.invoiceStatus;
      }
      else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          // this.LocationMasterForm.reset();
          // window.location.reload();
        }
      }
    });
  }

 
  // addNewLine(k:number){
    
  //  this.trxLinesList().push(this.newtrxLinesList());
      
  // var len = this.trxLinesList().length;
  // var patch = this.poInvoiceForm.get('trxLinesList') as FormArray;
  // (patch.controls[len - 1]).patchValue(
  //   {
  //     lineNumber: len,
  //   }
  // );
  //   // this.reservePos();
  // }

  apInvFind1(content) {
    // alert(content);
    const formValue: IpoInvoice = this.transData(this.poInvoiceForm.value);
    this.transactionService.getsearchByApINV(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.lstsearchapinv = res.obj;
        let control = this.poInvoiceForm.get('obj') as FormArray;
        for (let i = 0; i <= this.lstsearchapinv.length - 1; i++) {
          var poLine: FormGroup = this.lineDetailsGroup();
          control.push(poLine);
          // this.poInvoiceForm.patchValue(this.lstsearchapinv);
        }
        this.poInvoiceForm.patchValue(this.lstsearchapinv);
      }
      else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          // this.LocationMasterForm.reset();
          window.location.reload();
        }
      }
    });
  }
  @HostListener("window:keyup.control.f", ["$event"]) f(e: KeyboardEvent) {
    console.log("control+ f", e);
    // alert('control+ f'+e);

  }
  triggerKeyboardEvent(el: any, keyString: string) {
    var eventObj = document.createEvent("Events") as any;

    if (eventObj.initEvent) {
      eventObj.initEvent("keyup", true, true);
    }

    eventObj.shiftKey = true;
    eventObj.ctrlKey = false;
    eventObj.metaKey = false;
    eventObj.altKey = false;
    eventObj.key = keyString;

    el.dispatchEvent
      ? el.dispatchEvent(eventObj)
      : el.fireEvent("onkeyup", eventObj);
  }

  openCodeComb(i) {
    this.showModal = true; // Show-Hide Modal Check
    this.content = i; // Dynamic Data
    let a = i + 1
    this.title = "PoLine :" + a;    // Dynamic Data
  }
  poInvoice(poInvoiceForm) {

  }

  invoiceDetails(i) {
    var displayinvoiceLine: Boolean = this.hideArray[i];
    this.hideArray[i] = !displayinvoiceLine;
  }

  // public today = new Date();
  // public priorDate = new Date().setDate(this.today.getDate() - 30)
  // selected: {startDate: Moment, endDate: Moment};

  selectDisLineDtl(k) {
    // alert('k'+k)
    var lineNumber = this.invLineDetailsArray().controls[k].get('lineNumber').value;
    var invoiceId = this.invLineDetailsArray().controls[k].get('invoiceId').value;
    var taxcat=this.invLineDetailsArray().controls[k].get('taxCategoryName').value;
    var itemtyp=this.invLineDetailsArray().controls[k].get('lineTypeLookupCode').value;
    alert(itemtyp+'itemtyp');
    // this.lineDistributionArray().clear();
    // alert(lineNumber + ' ' + invoiceId);
    this.invoiceId = this.lstInvLineDeatails.invoiceId;
    // alert(this.invoiceId);
    if(this.invoiceId ==null)
    {alert('Invoice No is not generated');
    // this.onOptionTaxCatSelected(taxcat, k);
    if(itemtyp!='MISCELLANEOUS')
      {
        this.distribution1(k);
      }
    return;
  }
  else
  
  {  this.lineDistributionArray().clear();
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


  selectINVLineDtl(i) {
    var invoiceNum = this.lineDetailsArray().controls[i].get('invoiceNum').value;
    // alert(invoiceNum);
    this.invLineDetailsArray().clear();
    
    this.transactionService.getApInvLineDetails(invoiceNum)
      .subscribe(
        data => {
          console.log(data);
          this.isSearchPatch = true;
          this.poInvoiceForm.patchValue({invoiceNum:data.invoiceNum,
            segment1: data.invLines[0].poNumber,
           })
          this.lstInvLineDeatails = data;
          console.log(data.invoiceStatus);
          if(data.source==='PO Receipt' ){
            // alert(data.invTypeLookupCode);
           this.poInvoiceForm.get('distribution').disable();
           this.poInvoiceForm.get('invLines').disable();
           this.poInvoiceForm.get('taxLines').disable();
         }
         if(data.invTypeLookupCode ==='DMS Invoice'){
          alert(data.invTypeLookupCode);
          this.poInvoiceForm.get('distribution').disable();
          this.poInvoiceForm.get('invLines').disable();
          this.poInvoiceForm.get('taxLines').disable();
         }
          data.invLines.forEach(f => {
            var invLnGrp: FormGroup = this.invLineDetails();
            this.invLineDetailsArray().push(invLnGrp);
           
          });
        
          for (let i = 0; i < data.invDisLines.length - 1; i++) {
            var invLnGrp: FormGroup = this.distLineDetails();
            this.lineDistributionArray().push(invLnGrp);
          
          }
          
          for (let i = 0; i < data.taxLines.length - 1; i++) {
            var invLnGrp: FormGroup = this.TaxDetailsGroup();
            this.TaxDetailsArray().push(invLnGrp);
            
          }
          this.poInvoiceForm.get('invLines').patchValue(data.invLines);
          this.poInvoiceForm.get('taxLines').patchValue(data.taxLines);
          this.poInvoiceForm.get('distribution').patchValue(data.invDisLines);
          let controlinv = this.poInvoiceForm.get('invLines') as FormArray;
          
          for (let i=0; i<data.invLines.length;i++){
            if(data.invLines[i].lineTypeLookupCode==='ITEM' || data.invLines[i].lineTypeLookupCode==='OTHER'){
              // this.poInvoiceForm.patchValue({taxCategoryName:data.invLines[i].taxCategoryName})
              //controlinv.controls[i].get('taxCategoryName').setValue(data.invLines[i].taxCategoryName);
              (controlinv.controls[i]).patchValue({ taxCategoryName: data.invLines[i].taxCategoryName });
             
            }
          }
         
        
          this.INVStatus=data.invoiceStatus;
          // console.log(data.invDisLines[0].invTransferStatus||data.invoiceStatus==='Validated');
        
          // if(data.invDisLines[0].invTransferStatus===null){
          // alert(data.invDisLines[0].invTransferStatus);
          //   this.INVStatus='Never Validated';
          // }
          // else{
          //   if(data.invoiceStatus==='Validated'){
          //   alert(data.invoiceStatus);
          //   this.INVStatus=data.invoiceStatus;
          // }
          // }
          if(data.invoiceStatus=='Validated'){
            this.poInvoiceForm.disable();
            this.displayAddNewLine=false;
            this.INVStatus=data.invoiceStatus;
          }
          if(data.source == 'MANUAL'){
            this.dispStatus=true;
            this.disDeleteButton=true;
            this.displayAddNewLine=true;
            this.dispAccountCode=true;
            // alert(this.lineDistributionArray().length);
            this.poInvoiceForm.get('distribution').enable();
            this.poInvoiceForm.get('invLines').enable();
            this.poInvoiceForm.get('taxLines').enable();
            // this.poInvoiceForm.get('hsnSacCode').enable();

          }else{
            this.dispStatus=false;
            this.disDeleteButton=false;
            this.dispAccountCode =false;
            // var patch = this.poInvoiceForm.get('distribution') as FormArray;
            // patch.controls[0].patchValue({poChargeDesc:'Unprocessed'})
            this.poInvoiceForm.get('distribution').disable();
            this.poInvoiceForm.get('invLines').disable();
            this.poInvoiceForm.get('taxLines').disable();
          }
        }


      )
  }




  public onChange1(event) {
    this.greaterThanValue = event.target.value;
  }

  public onChange(event) {
    this.lessThanValue = event.target.value;
    // alert('$event ' +event.target.value);
    // var aa = this.poInvoiceForm.get('greaterThanValue').value;
    // alert(aa+'aa');
    if (this.greaterThanValue > this.lessThanValue) {
      alert('Plese enter correct value')
      this.poInvoiceForm.get('greaterThanValue').reset();
    }
    // if (this.greaterThanValue > this.lessThanValue) {
    //   // console.log('Incorrect');
    //   this.greaterThanValue = this.lessThanValue - 1;
    // }
  }


  apInvoiceSave() {
    this.displayValidateButton = false;
    // let manInvObj=new ManualInvoiceObj();
    let jsonData = this.poInvoiceForm.value.obj[0];
    jsonData.ouId = this.ouId;
    // jsonData.suppId=this.suppId;
    jsonData.amtAppToDisc = 0
    jsonData.accPayCodeCombId = 2079
    jsonData.currency = 'INR';
    var taxStr = [];
    for (let taxlinval of this.taxarr.values()) {  
      // console.log("Map Values= " +JSON.stringify(value));  
     for(let i=0 ; i< taxlinval.length; i++){
         taxStr.push(taxlinval[i]);
        }
      }

      var disStr = [];
      for (let dislinval of this.distarr.values()) {  
       // console.log("Map Values= " +JSON.stringify(value));  
      for(let i=0 ; i< dislinval.length; i++){
       disStr.push(dislinval[i]);
         }
       }
    let manInvObj = Object.assign(new ManualInvoiceObj(), jsonData);
    manInvObj.setinvLines(this.poInvoiceForm.get('invLines').value);
    // manInvObj.setinvLines(this.poInvoiceForm.value.invLines);
    manInvObj.setinvDisLines(disStr);
    manInvObj.setTaxLines(taxStr);

    // let newTodo = Object.assign(new ManualInvoiceObj(), jsonData); 
    // const formValue: IpoInvoice = this.transData(this.poInvoiceForm.value);
    console.log(JSON.stringify(manInvObj));
    // console.log(this.poInvoiceForm.value.obj[0].invoiceNum);
    var reqArr: any[];
    // reqArr = formValue;
    console.log(reqArr);

    //     reqArr.push({
    //       supplierSiteId: 
    //       frmDate: formValue.frmDate,
    //        toDate: formValue.frmDate,
    //       // toDate:'2021-02-05',
    //        billToLocId:this.locId
    // });
    this.transactionService.apInvSaveSubmit(JSON.stringify(manInvObj)).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        alert(res.obj);
        this.internalSeqNum=res.obj;
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
        }
      }
    });
  }

  close() {
    // this.router.navigate(['login']);
    this.router.navigate(['admin']);
  }

  refresh() {
    window.location.reload();
  }

  move(val1, val2) {
    val2.focus();
  }
  distribution1(k) {
    alert(k);
     var arrayControl = this.poInvoiceForm.get('obj').value;
    var distributionSet = arrayControl[0].distributionSet;
    var arrayControl2 = this.poInvoiceForm.get('invLines').value;
    var amount = arrayControl2[k].amount;
    var invln=arrayControl2[k].lineNumber;
    alert(amount);
    // for(let j=0; j<this.invLineDetailsArray().length; j++){
    //    amount = amount + arrayControl2[j].amount;
    // }
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
            alert("7 " + this.lineDistributionArray().length)

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
                // (control.controls[z]).patchValue({ invoiceLineNum : k+1});
                // this.poInvoiceForm.get('distribution').patchValue(data.distribution);
              }
            } else {
              for (let i = 0, z = len; i < data.distribution.length; i++, z++) {
                control.controls[z].patchValue(data.distribution[i]);
                (control.controls[z]).patchValue({ invoiceLineNum: k + 1, distLineNumber: z + 1 });
                // (control.controls[z]).patchValue({ invoiceLineNum : k+1});
                // this.poInvoiceForm.get('distribution').patchValue(data.distribution);
              }
            }
          }
        );
    }
    if ((distributionSet == null && amount != null)) {
      var len = this.lineDistributionArray().length;
      var patch = this.poInvoiceForm.get('distribution') as FormArray;
      var controlDist = this.poInvoiceForm.get('distribution').value;
      if (controlDist[0].lineTypeLookupCode != null || controlDist[0].distLineNumber != null) {
        this.lineDistributionArray().push(this.distLineDetails());
        var aa  = this.lineDistributionArray().length;
        (patch.controls[aa - 1]).patchValue(
          {
            distLineNumber: aa,
            // invoiceLineNum: k + 1
            invoiceLineNum:invln
          }
        );
      }
      if (controlDist[0].lineTypeLookupCode == null || controlDist[0].distLineNumber == null) {
        alert(k+'LineNum');
        (patch.controls[len - 1]).patchValue(
          {
           
            distLineNumber: len,
            // invoiceLineNum: k + 1
            invoiceLineNum:invln
          }
        );
      }

    }
  }

  distribution() {
    var arrayControl = this.poInvoiceForm.get('obj').value;
    var distributionSet = arrayControl[0].distributionSet;
    // if(distributionSet == null){
    //   alert('Kindly select distribution set')
    //   return;
    // }
    var arrayControl2 = this.poInvoiceForm.get('invLines').value;
    var amount = 0
    for (let j = 0; j < this.invLineDetailsArray().length; j++) {
      amount = amount + arrayControl2[j].amount;
    }
    if (amount == null) {
      alert('Kindly entered Amount');
    }
    if (distributionSet != null && amount != null) {
      this.transactionService.DistributionDataList(distributionSet, amount)
        .subscribe(
          data => {
            this.distributionLineWise = data;
            console.log(this.distributionLineWise);
            data.distribution.forEach(f => {
              var distLineDet: FormGroup = this.distLineDetails();
              this.lineDistributionArray().push(distLineDet);
            });
            this.poInvoiceForm.get('distribution').patchValue(data.distribution);
          }
        );
    }
    if ((distributionSet == null && amount == null)) {
      alert('Invoice amount and line wise amount are not same')
    }

  }
  ShowAllDistribution() {
    this.displayValidateButton = false;
    var invoiceNum = this.lineDetailsArray().controls[0].get('invoiceNum').value;
    if (invoiceNum == null) {
      alert('Kindly insert the invoice number');
    } else {
      this.lineDistributionArray().clear();
      var data = this.lstInvLineDeatails.invDisLines;
      data.forEach(f => {
        var invLnGrp: FormGroup = this.distLineDetails();
        this.lineDistributionArray().push(invLnGrp);
        this.poInvoiceForm.get('distribution').patchValue(data);
      });
    }
  }
  onOptionsSelected(event: any, k) {
    // alert(event);
    var patch = this.poInvoiceForm.get('distribution') as FormArray;
    if (event === 'Validated') {
      // alert('Validated');
      patch.controls[k].patchValue({
        poChargeDesc: 'Processed',
      })
    }
    if (event === 'Never Validated' || event === 'Etc') {
      // alert('Never Validated');
      patch.controls[k].patchValue({
        poChargeDesc: 'Unprocessed',
      })
    }
    if (event === '--Select--') {
      // alert('--Select--');
      patch.controls[k].patchValue({
        poChargeDesc: '',
      })
    }
  }


  getUserIdsFirstWay($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList1 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.supplierCodeList, userId);
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


  onSiteSelected(siteId: any) {
    // alert(siteId);
    this.service.siteIdList(siteId)
      .subscribe(
        data => {
          this.siteIdList = data;
          console.log(this.siteIdList);
        }
      );
  }

 
  onOptioninvItemIdSelected(itemId, index) {
    // if(this.itemType === "EXPENCE"){
    // alert('in expence');
    this.service.expenceItemDetailsList(this.invItemId)
      .subscribe(
        data => {
          this.ItemDetailsList = data;
          console.log(this.ItemDetailsList);
          var patch = this.poInvoiceForm.get('invLines') as FormArray;
          this.taxCategoryId = this.ItemDetailsList.taxCategoryId
          // alert('segment value is not null');
          // alert(this.ItemDetailsList.uom);
          (patch.controls[index]).patchValue(
            {
              diss1: 0,
              uom: this.ItemDetailsList.uom,
              invDescription: this.ItemDetailsList.invDescription,
              invCategory: this.ItemDetailsList.invCategory,
              hsnSacCode: this.ItemDetailsList.hsnSacCode,
              taxCategoryName: this.ItemDetailsList.taxCategoryName,
              segmentName: this.ItemDetailsList.segmentName,
              poChargeAcc: Number(this.ItemDetailsList.codeCombinationId),
              taxCategoryId: Number(this.ItemDetailsList.taxCategoryId),
              invItemId: this.invItemId,
            }
          );


        }
      );
    // }
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

  searchFromArray1(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };
  InventIdSelected(event, k) {
    let select = this.invItemList1.find(d => d.segment === event);
    this.invItemId = select.itemId;
    // this.invItemId=Number (sessionStorage.getItem('ouId'));
    let controlinv = this.poInvoiceForm.get('invLines') as FormArray;
    (controlinv.controls[k]).patchValue({ itemId: select.itemId });
    (controlinv.controls[k]).patchValue({ hsnSacCode: select.hsnSacCode });
    // alert(this.invItemList1[0].description);
    this.invDescription=this.invItemList1[0].description;
  }
  onOptionTaxCatSelected(taxCategoryName, k) {
    if(this.isSearchPatch === false){
    this.indexVal = k;
    // const amount=this.lineDetailsArray().controls[k].get('amount').value;
    var arrayControl = this.poInvoiceForm.get('invLines').value;

    var amount = arrayControl[k].amount;
    // alert(amount);
    let select = this.taxCategoryList.find(d => d.taxCategoryName === taxCategoryName);
    // alert(select.taxCategoryId);
    // this.taxCategoryId=select.taxCategoryId;
    let controlinv = this.poInvoiceForm.get('invLines') as FormArray;
    // alert(controlinv.length+'existing line');
    var existlinecnt=controlinv.length;
    (controlinv.controls[k]).patchValue({ taxCategoryId: select.taxCategoryId });
    var disAm = 0;
  
    this.transactionService.getTaxDetails(select.taxCategoryId, sessionStorage.getItem('ouId'), disAm, amount)
      .subscribe(
        data => {
          this.lstInvLineDeatails1 = data;
          console.log(this.lstInvLineDeatails1);
          for (let i = 0; i < data.miscLines.length; i++) {
            var invLnGrp: FormGroup = this.invLineDetails();
            this.invLineDetailsArray().push(invLnGrp);
          }
          (controlinv.controls[0]).patchValue({ lineNumber: 1 });
          // alert(k);
          // alert(this.indexVal+ " indexVal")
          // var x = k + 1;
          var x= controlinv.length+1;
          alert(x+'x')

          // alert(x + '"-------"' + this.invLineDetailsArray().length);
          for (let z = existlinecnt, j = 1; z < this.invLineDetailsArray().length; j++, z++) {
            controlinv.controls[z].patchValue(data.miscLines[j - 1]);
            var ln = Number(this.indexVal+1+"."+j);
            (controlinv.controls[z]).patchValue({ lineNumber: ln });
          }
          
          var segment = (arrayControl[k].segment)
          let select = this.invItemList1.find(d => d.segment === segment);
          // alert(select.itemId);
          let controlinv1 = this.poInvoiceForm.get('taxLines') as FormArray;
          // var LEN = controlinv1.length;
          this.taxDetaileSendArr.push(data.taxLines)
          this.TaxDetailsArray().clear();
          for (let i = 0; i < data.taxLines.length; i++) {
            var invLnGrp: FormGroup = this.TaxDetailsGroup();
            this.TaxDetailsArray().push(invLnGrp);
          }
          // alert('data.taxLines.length ' + data.taxLines.length);
          // alert(data.taxLines)
          this.poInvoiceForm.get('taxLines').patchValue(data.taxLines);
          for (let j = 0; j < data.taxLines.length; j++) {
            // controlinv1.controls[j].patchValue(data.taxLines[j]);

            controlinv1.controls[j].patchValue({
              // invLineItemId: select.itemId,  done by vinita
              invLineNo: this.indexVal + 1,
            });
          }
          
          this.invLineNo=k+1;
          alert(this.invLineNo);
          alert(this.taxarr.size+'Arraytax');
          // this.taxarr.set(this.invLineNo,data.taxLines);
          this.taxarr.set(this.invLineNo,this.poInvoiceForm.get('taxLines').value);
          alert(this.taxarr.size+'afterArray');
          //////////////Distribution////////////////
          let controlDist = this.poInvoiceForm.get('distribution') as FormArray;
          var controlPatchDist = this.poInvoiceForm.get('distribution').value;
          var x1 = Number((this.lineDistributionArray().length));
          var len = this.lineDistributionArray().length
          var totalLen = len + Number(data.invDisLines.length)
          alert('Distribution'+totalLen)
          if (len == 1) {
            alert('in len 1')
            if (controlPatchDist[0].lineTypeLookupCode != null || controlPatchDist[0].distLineNumber != null) {
              // alert('in data not null')
              for (let i = len; i <= data.invDisLines.length; i++) {
                // alert('pushing line i '+ i)
                var invLnGrp: FormGroup = this.distLineDetails();
                this.lineDistributionArray().push(invLnGrp);
              }
            } else {
              alert('lenght more than one')
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
            if (controlPatchDist[0].lineTypeLookupCode != null || controlPatchDist[0].distLineNumber != null) {
            for (let i = 0, z = len ; i < data.invDisLines.length; i++, z++) {
              controlDist.controls[z].patchValue(data.invDisLines[i]);
              (controlDist.controls[z]).patchValue({ invoiceLineNum: Number(this.invoiceLineNo), distLineNumber: z + 1 });
              // (control.controls[z]).patchValue({ invoiceLineNum : k+1});
              // this.poInvoiceForm.get('distribution').patchValue(data.distribution);
            }}
            else{
              for (let i = 0, z = len-1; i < data.invDisLines.length; i++, z++) {
                controlDist.controls[z].patchValue(data.invDisLines[i]);
                (controlDist.controls[z]).patchValue({ invoiceLineNum: Number(this.invoiceLineNo), distLineNumber: z + 1 });
              }
            }
          } else {

            for (let i = 0, z = len; i < data.invDisLines.length; i++, z++) {
              controlDist.controls[z].patchValue(data.invDisLines[i]);
              // var ln = this.invoiceLineNo;
              // (controlDist.controls[z]).patchValue({ invoiceLineNum: k + 1, distLineNumber: z + 1 });
              (controlDist.controls[z]).patchValue({ invoiceLineNum: Number(this.invoiceLineNo), distLineNumber: z + 1 });
              // (control.controls[z]).patchValue({ invoiceLineNum : k+1});
              // this.poInvoiceForm.get('distribution').patchValue(data.distribution);
            }
          }
          
          this.distarr.set(this.invLineNo, this.poInvoiceForm.get('distribution').value);
          
          // }

          // this.lineDistributionArray().patchValue(data.invDisLines);
          // alert(k);

          //   for(let j=0; j<data.invDisLines.length; j++){
          //     console.log('in for loop');
          //     alert('in for loop');
          //     debugger;
          //   controlDist.controls[j].patchValue({
          //     invLineItemId:select.itemId,
          //     invoiceLineNum: k+1,
          //     // distLineNumber:x1,
          //   });
          //   // x1=x1+1;
          // }
        })
      }}

      prepaymentData(event)
      {
        alert(event);
        var headerVal= this.poInvoiceForm.get('obj').value;
        var invtype=headerVal[0].invTypeLookupCode;
        if(invtype=='PREPAYMENT')
        {
          var supId=headerVal[0].suppId;
          var supsitId=headerVal[0].supplierSiteId;
          var invamt=event.target.value;
          this.transactionService.getprepay(supId,supsitId)
      .subscribe(
        data=>{
          this.prepaydata=data;
          var arraydist=this.poInvoiceForm.get('distribution').value;
          var patchdist=this.poInvoiceForm.get('distribution') as FormArray;

          var arrinvln=this.poInvoiceForm.get('invLines')as FormArray;

          for(let k=0 ;k<this.invLineDetailsArray().length;k++)
          {
            arrinvln.controls[k].patchValue({lineTypeLookupCode:'OTHER',amount:Number(invamt)});
            

          }
          console.log(this.poInvoiceForm.get('invLines').value);
          alert (this.poInvoiceForm.value);
          var distlen=this.lineDistributionArray().length;
           for(let i=0;i<data.length-distlen;i++)
           {
            var dislist: FormGroup = this.distLineDetails();
            this.lineDistributionArray().push(dislist);
           }
           for(let j=0;j<this.lineDistributionArray().length;j++)
           {
            patchdist.controls[j].patchValue({distCodeCombSeg:data.prepayCodeCombName,accDesc:data.prepayCodeCombDesc,
                                              baseAmount:Number(invamt),amount:Number(invamt),lineTypeLookupCode:'OTHER',distLineNumber:j+1,
                                              invoiceLineNum:  this.invoiceLineNo ,distCodeCombId:data.prepayCodeCombId});
           }
           console.log(this.poInvoiceForm.get('distribution').value);
           this.distarr.set(this.invoiceLineNo, this.poInvoiceForm.get('distribution').value);
        });
        
        // this.poInvoiceForm.get('distribution').disable();
          this.poInvoiceForm.get('invLines').disable();
        //   this.poInvoiceForm.get('taxLines').disable();
        }
        
      }
  Validate() {
        var arrayControl = this.poInvoiceForm.get('obj').value;
    var arrayControl1 = this.poInvoiceForm.get('invLines').value;
    var arrayCaontrolOfDistribution = this.poInvoiceForm.get('distribution').value;
    var amount = arrayControl[0].invoiceAmt;
    var totalOfInvLineAmout = 0;
    for (let i = 0; i < this.invLineDetailsArray().length; i++) {
      totalOfInvLineAmout = totalOfInvLineAmout + arrayControl1[i].amount
    }
    var totalOfDistributionAmout = 0;
    for (let j = 0; j < this.lineDistributionArray().length; j++) {
      totalOfDistributionAmout = totalOfDistributionAmout +Number (arrayCaontrolOfDistribution[j].amount)
    }
    // alert('totalOfDistributionAmout ' + totalOfDistributionAmout);

    if (amount == totalOfInvLineAmout && amount == totalOfDistributionAmout) {
      // alert('in validate')
      var arrayControl = this.poInvoiceForm.get('obj').value;
      var invoiceNum = arrayControl[0].invoiceNum;
      // alert(invoiceNum);
      this.transactionService.UpdateValidate(invoiceNum).subscribe((res: any) => {
        if (res.code === 200) {
          alert('VALIDATE SUCCESSFULLY');
          this.poInvoiceForm.disable();
          // window.location.reload();
        } else {
          if (res.code === 400) {
            alert('ERROR OCCOURED IN PROCEESS');
            // this.operatingUnitMasterForm.reset();
            // window.location.reload();
          }
        }
      });
      //  this.displayValidateButton =false;
    }else{
      alert('Amount Missmach kindly check');
    }

  }
  validateNum(index, j) {
    // var arrayControl =this.lineDetailsArray.controls[index].get('taxAmounts').value;  
    // // this.poMasterDtoForm.get('poLines').value
    // var value = arrayControl[index].totTaxAmt
    // if (value.charAt(0) === '-') {
    //   alert('Valid Number: ' + value);
    // } else {
    //   alert('Invalid Number: ' + value + ' ' + 'Kindly enter negetive value');   
    //   // this.lineDetailsArray.controls[index].get('orderedQty').reset();
    //   // this.poMasterDtoForm.controls['poLines'].controls[index].controls['taxAmounts'].controls[j].controls.totTaxPer.value
    //   // this.TaxDetailsArray.controls[j].get('orderedQty').reset();
    //   // arrayControl[index].totTaxAmt = 00;
    //   // this.lineDetailsArray.controls[j].get('taxAmounts').controls
    // }
  }
  addDiscount(i) {
    let controlinv1 = this.poInvoiceForm.get('taxLines').value;
    let controlinv = this.poInvoiceForm.get('taxLines') as FormArray;
    var invLineNo = controlinv1[i].invLineNo;
    var invLineItemId = controlinv1[i].invLineItemId;
    this.activeLineNo=invLineNo;
    // alert("invLineItemId " + invLineItemId + " " + "invLineNo " + invLineNo);
    // controlinv.controls[i].patchValue({
    //   invLineItemId: invLineItemId,
    //   invLineNo:invLineNo
    // });
    var arrayControl = this.poInvoiceForm.get('invLines').value;
    var patch = this.poInvoiceForm.get('invLines') as FormArray;
    var patchDistributionAmt = this.poInvoiceForm.get('distribution') as FormArray;
    var distributionValue = this.poInvoiceForm.get('distribution').value;
    var arrayControlTax = this.poInvoiceForm.get('taxLines').value;
    var index = Number(arrayControlTax[i].invLineNo);
    // alert('index ' + index);
    var amount = arrayControl[index - 1].amount;
    var taxCategoryId = arrayControl[index - 1].taxCategoryId;
    // alert('amount ' + amount);
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
          for (let i=0, j=0; i< this.lineDistributionArray().length; i++){
            if(invLineNo==distributionValue[i].invoiceLineNum && distributionValue[i].lineTypeLookupCode =='MISCELLANEOUS'){
              // alert('j '+j)
              patchDistributionAmt.controls[i].patchValue(
              {
                amount : this.taxCalforItem[j].totTaxAmt,
                baseAmount:this.taxCalforItem[j].totTaxAmt,
              }
            );
            j=j+1;
            } 
          }
          
          // for (i = 0; i < this.taxCalforItem.length; i++) {

          //   if (this.taxCalforItem[i].totTaxPer != 0) {
          //     sum = sum + this.taxCalforItem[i].totTaxAmt
          //   }
          // }
          // const TotAmtLineWise1 = arrayControl[this.poLineTax].baseAmtLineWise
          // var tolAmoutLine = sum + TotAmtLineWise1
          // // alert(this.taxCalforItem[0].totTaxAmt);
          // var patch = this.poMasterDtoForm.get('poLines') as FormArray;
          // (patch.controls[aa]).patchValue(
          //   {
          //     diss1 : this.taxCalforItem[0].totTaxAmt,
          //     taxAmtLineWise: sum,
          //     totAmtLineWise: tolAmoutLine,
          //   }
          // );
          this.patchResultList(i, this.taxCalforItem, invLineNo, invLineItemId);

          //        controlinv.controls[i].patchValue({
          //   invLineItemId: invLineItemId,
          //   invLineNo:invLineNo
          // });
        });
  }

  amountmatch(k,qty1){
    
   var currentlinamt=qty1.target.value;   
   var invarr=this.poInvoiceForm.get('invLines').value;

   var distotamt=0;
  
  var disarr=this.poInvoiceForm.get('distribution').value;
   var dispatch=this.poInvoiceForm.get('distribution') as FormArray;
   var lnrow=disarr[k].invoiceLineNum;
   alert(lnrow+'row');

   for(let i=0;i<=this.lineDetailsArray().length;i++)
   {
    var invln=invarr[i].lineNumber;
    var invtyp=invarr[i].lineTypeLookupCode;
    var itemInvamt=invarr[i].amount;
    if (invarr[i].lineTypeLookupCode!='MISCELLANEOUS' && invln===lnrow )
     {
     var disamt=0;
   for(let j=0;j<this.lineDistributionArray().length;j++)
   { 
     if(disarr[j].lineTypeLookupCode!='MISCELLANEOUS'&& disarr[j].invoiceLineNum===lnrow)
     {
      var disln=disarr[j].invoiceLineNum;
   
      var distyp=disarr[j].lineTypeLookupCode;
    
       if(j==k){
        alert('inside if');
          disamt=qty1.target.value;
        }
       else{
        disamt=Number(disarr[j].amount);
        alert(disamt+'elseamt');
              }
      alert(distotamt+'befortotal');
      distotamt=Number(distotamt)+Number(disamt);
   
      alert(distotamt+'total');
     }
   }
   
  }
  alert(distotamt+'--total'+itemInvamt+'--before2if');
  alert(invln+'line'+disln)
   if(invln===disln && invtyp===distyp && distotamt<itemInvamt )
   {
  
    var newrow=k+1;
  this.addRowDistribution(newrow);
  dispatch.controls[newrow].patchValue({invoiceLineNum:invln}) ;   
  (dispatch.controls[newrow - 1]).patchValue(
        {
          distLineNumber: newrow,
        }
      );  

  return;
      }
  if(distotamt>itemInvamt){
    alert('You can not enter more than invoice amount line');
    qty1.focus();
  }
   }

  }
  
 


  patchResultList(i, taxCalforItem, invLineNo, invLineItemId) {

    let control = this.poInvoiceForm.get('taxLines') as FormArray
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
        invLineNo: invLineNo,
        invLineItemId: invLineNo
      }));
    });
    console.log(control);
  }
  openCodeComb1(i) {
    // let segmentName1 = this.invLineDetailsArray().controls[i].get('segmentName').value;
    var arrayControl = this.poInvoiceForm.get('distribution').value
    let segmentName1 = arrayControl[i].distCodeCombSeg
    // alert('i ' + i + " segmentName1 " + segmentName1)
    if (segmentName1 === null) {
      this.poInvoiceForm.get('segment11').reset();
      this.poInvoiceForm.get('segment2').reset();
      this.poInvoiceForm.get('segment3').reset();
      this.poInvoiceForm.get('segment4').reset();
      this.poInvoiceForm.get('segment5').reset();
      // this.poMasterDtoForm.get('segment6').reset();
      this.poInvoiceForm.get('lookupValueDesc1').reset();
      this.poInvoiceForm.get('lookupValueDesc2').reset();
      this.poInvoiceForm.get('lookupValueDesc3').reset();
      this.poInvoiceForm.get('lookupValueDesc4').reset();
      this.poInvoiceForm.get('lookupValueDesc5').reset();
    }
    if (segmentName1 != null) {
      // this.service.segmentNameList(this.segmentName1)
      // .subscribe(
      //   data => {

      //     this.segmentNameList = data;
      //     if (this.segmentNameList.code === 200) {
      //       if (this.segmentNameList.length == 0) {
      //         alert('Invalid Code Combination');
      //       } else {
      //         console.log(this.segmentNameList);
      //         this.poChargeAcc = Number(this.segmentNameList.codeCombinationId)
      //       }
      //     } else if (this.segmentNameList.code === 400) {
      //       var arrayControl = this.poMasterDtoForm.get('poLines').value
      //       var patch = this.poMasterDtoForm.get('poLines') as FormArray;
      //       (patch.controls[i]).patchValue({ segmentName: ''})
      //       alert(this.segmentNameList.message);

      //     }
      //   }
      // );
      var temp = segmentName1.split('.');
      // alert(temp[0]);
      this.segment11 = temp[0];
      this.segment2 = temp[1];
      this.segment3 = temp[2];
      this.segment4 = temp[3];
      this.segment5 = temp[4];
      // this.segment6 = temp[5];
    }
    // alert(segmentName1);
    this.displayModal = false;
    this.showModal = true; // Show-Hide Modal Check
    this.content = i; // Dynamic Data
    let a = i + 1
    this.title = "Distribution Line :" + a;    // Dynamic Data

  }
  fnCancatination(index) {
    // alert(index)
    var arrayControl = this.poInvoiceForm.get('distribution').value
    var patch = this.poInvoiceForm.get('distribution') as FormArray;
    // arrayControl[index].segmentName = arrayControl[index].segment11 + '.' + arrayControl[index].segment2 + '.' + arrayControl[index].segment3 + '.' + arrayControl[index].segment4 + '.' + arrayControl[index].segment5 + '.' + arrayControl[index].segment6 + '.' + arrayControl[index].segment7 + '.' + arrayControl[index].segment8 + '.' + arrayControl[index].segment9;
    arrayControl[index].segmentName = this.poInvoiceForm.get('segment11').value + '.'
      + this.poInvoiceForm.get('segment2').value + '.'
      + this.poInvoiceForm.get('segment3').value + '.'
      + this.poInvoiceForm.get('segment4').value + '.'
      + this.poInvoiceForm.get('segment5').value;
    this.segmentName1 = arrayControl[index].segmentName
    console.log(this.segmentName1);
    (patch.controls[index]).patchValue({ distCodeCombSeg: this.segmentName1 })

    this.service.segmentNameList(this.segmentName1)
      .subscribe(
        data => {
          this.segmentNameList = data;
          if (this.segmentNameList.code === 200) {
            // alert('in if 1' + index)
            // alert(this.segmentNameList.obj.codeCombinationId);
            (patch.controls[index]).patchValue({ distCodeCombId: this.segmentNameList.obj.codeCombinationId });
            if (this.segmentNameList.length == 0) {
              // alert('in if 2')
              alert('Invalid Code Combination');
            } else {
              // alert('in if 3')
              console.log(this.segmentNameList);
              (patch.controls[index]).patchValue({ distCodeCombId: this.segmentNameList.obj.codeCombinationId })
              // this.distCodeCombId = Number(this.segmentNameList.codeCombinationId)
            }
          }
          if (this.segmentNameList.code === 400) {
            alert(data.message);
            (patch.controls[index]).patchValue({ distCodeCombSeg: '' })
            // alert(this.segmentNameList.message);


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
  onOptionsSelectedBranch(segment: any, lType: string) {
    // alert(segment);
    // var InterBranch1=this.GlCodeCombinaionForm.get('segment1').value;
    this.service.getInterBranch(segment, lType).subscribe(
      data => {
        this.branch = data;
        console.log(this.branch);
        // if(this.branch.code === 200){
        if (this.branch != null) {
          // this.poMasterDtoForm.patchValue(this.branch);
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
            this.lookupValueDesc1 = this.branch.lookupValueDesc;
          }
        }
        // }else if(this.branch.code === 400){
        //   alert(this.branch.message);

        // }


      }
    );

  }
}