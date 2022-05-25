import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
// import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { TransactionService } from '../transaction.service';
import { ManualARInvoiceObj } from './manual-arinvoice-obj';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
// import { stringify } from '@angular/compiler/src/util';
// import { event } from 'jquery';
// import { log } from 'util';
// import { ManualInvoiceObj } from '../po-invoice/manual-invoice-obglDatej';
// import { ManualARInvoiceObj } from '../manual-arinvoice-obj';


interface IArInvoice {
  taxableAmount: number;
  taxAmount: number;
  source: string;
  trxNumber1: string;
  trxNumber: string;
  custTrxTypeId: string;
  referenceNo: string;
  dmsInvNo: string;
  dmsOrderNo: string;
  invCurrancyCode: string;
  invoiceAmount: number;
  shipToCustName: string;
  shipToCustNo: number;
  shipToCustAdd: string;
  billToCustName: string;
  billToCustNo: number;
  billToCustAdd: string;
  soldToCustName: string;
  soldToCustId: number;
  ouId: number;
  basicAmt: number;
  taxPer: number;
  taxRecoverable: number;
  extendedAmount: number;
  // glDate: Date;
  accountDesc: string;
  billcontactNo: number;
  shipcontactNo: number;
  // invoiceAmount:number;
  emplId: number;
  custtaxCategoryName: string;
  siteName: string;
  concatenatedSegment: string;
}
@Component({
  selector: 'app-arinvoice',
  templateUrl: './arinvoice.component.html',
  styleUrls: ['./arinvoice.component.css']
})

export class ARInvoiceComponent implements OnInit {
  arInvoiceForm: FormGroup;
  pipe = new DatePipe('en-US');
  branch: any;
  divisionId: number;
  itemId: number;
  taxCategoryId: number;
  accountDesc: string;
  sum: 0;
  custTrxLineId: number = null;
  basicAmt: number;

  taxRecoverable: number;
  extendedAmount: number;
  poLineTax: number;
  public currentOp: string;
  displaytaxDisscountButton = true;
  displayTaxDetailForm = true;
  displayinvItem = true;
  ouId: number;
  trxNumber1: string;
  trxNumber: string;
  lstcomments: any;
  selectedLine = 0;
  content: number;
  // displayModal = true;
  lookupValueDesc4: string;
  lookupValueDesc1: string;
  lookupValueDesc2: string;
  lookupValueDesc3: string;
  lookupValueDesc5: string;
  segment11: string;
  segment2: number;
  // showModal: boolean;
  segment3: number;
  segment4: number;
  segment5: number;
  poChargeAcc: number;
  taxItemId: number;
  invLineNo: number;
  invoiceLineNum: number;
  codeCombinationId: number;
  invCurrancyCode = 'INR';
  charges = 0.00;
  freight = 0.00;
  balance: number;
  status = "Open"
  taxCat1: number;
  // glDate = new Date(); jyoti
  // glDate:string;
  taxAmount: number;
  billToCustName: string;
  displaytaxName: boolean = true;
  public applyTo = 'INVOICE'
  // now = Date.now();
  // new=new Date();
  // public minDate = new Date();
  now = new Date();
  private sub: any;
  // glDate = this.pipe.transform(this.now, 'dd-MM-yyyy')
  glDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  // invoiceDate = this.pipe.transform(this.now, 'dd-MM-yyyy'); jyotik
  invoiceDate= this.pipe.transform(Date.now(), 'y-MM-dd');
  glDateLine: Date;
  // glDateLine = this.pipe.transform(this.now, 'y-MM-dd');comment by vinita
  // glDateLine = this.pipe.transform(this.now, 'dd-MM-yyyy');
  // glDate = this.pipe.transform(this.new,'dd-MM-yyyy');comment by vinita
  // glDate = this.pipe.transform(this.now, 'y-MM-dd');

  applDate = this.pipe.transform(Date.now(), 'y-MM-dd');

  public distributioArr: any;
  public paymentTermList: any[];
  public locIdList: Array<string> = [];
  public locIdListModel: Array<string> = [];
  public sourceList: Array<string> = [];
  public classList: Array<string> = [];
  public invTypeList: any = [];
  public BranchList: Array<string> = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: Array<string> = [];
  public InterBrancList: Array<string> = [];
  accountNoSearch: any;
  accountNoSite: any;
  displayCustomerSite = true;
  invItemList: any[];
  taxPer: number;
  lstinvoices: any[];
  isVisibleInvoice: boolean = false;

  billToCustNo: number;
  public taxCalforItem: any;
  userList1: any[] = [];
  userList2: any[] = [];
  lastkeydown1: number = 0;
  userList3: any[] = [];
  lastkeydown3: number = 0;
  public taxCategoryList: any = [];
  public segmentNameList: any;
  subscription: any;
  public taxUistatus: boolean = false;
  viewAccounting1: any[];
  viewAccounting2: any[];
  docSeqValue: string;
  name1: number;
  ledgerId: number;
  description: string;

  public distarray: any[] = [];

  public taxarr = new Map<number, any>();
  public distarr = new Map<number, any>();
  billcontactNo: number;
  shipcontactNo: number;
  paymentTerm: string;
  emplId: number;
  activeTab = 'home-md';

  displaySaveButton = true;
  applySaveButton = false;
  validateStatus = false;
  selectAllflag1 = false;
  checkValidation = false;
  applLineValidation = false;

  displayaddRow = true;
  displayRemoveRow = true;
  displayRmDistRow = true;

  title: string;

  tApplAmt: number;
  tUapplAmt: number;
  totUnAppliedtAmount: number;
  totAppliedtAmount: number;
  balanceAmount: number;
  creditNoteAmount: number;
  customerId: number;
  customerSiteId: number;
  custAccountNo: number;
  custName: string;
  siteName: string;

  hsnSacCodeList: any = [];

  GLPeriodCheck: any;
  glPrdStartDate: string;
  glPrdEndDate: string;
  customerNameSearch: any;
  viewAccountingArdata: any;

  jeSource: string;
  name: string;
  ledgerName: string;
  jeCategory: string;
  postedDate: Date;
  periodName: string;
  runningTotalDr: number;
  runningTotalCr: number;
  disabledViewAccounting = false;
  disabledComplete = false;
  compId: number;
  custtaxCategoryName: string;
  addonDescList: any;
  public allTaxCategoryList: any = [];


  isVisibleArInvoiceLine: boolean = false;
  isVisibleArDist: boolean = false;
  isVisibleUpdate: boolean = false;
  isDisabledName = false;
  isDisabledPer = false;
  isVisibleApply: boolean = false;
  concatenatedSegment: string;
  displayglDate=true;
  displayglDate1=true;
  search(activeTab) {
    this.activeTab = activeTab;
  }

  result(activeTab) {
    this.activeTab = activeTab;
  }
  constructor(private fb: FormBuilder, private router: Router, private router1: ActivatedRoute, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.arInvoiceForm = fb.group({
      // poHeaderId: [],
      source: [],
      class: [],
      locId: [],
      trxNumber1: [],
      name1: [],
      trxNumber: [],
      custTrxTypeId: [],
      referenceNo: [],
      dmsInvNo: [],
      dmsOrderNo: [],
      paymentTerm: [],
      invCurrancyCode: [],
      freight: [],
      balance: [],
      charges: [],
      taxAmount: [],
      invoiceDate: [],
      shipToSiteId: [],
      billToCustId: [],
      billToSiteId: [],
      shipToCustId: [],
      glDate: [],
      invoiceAmount: [],
      shipToCustName: [],
      shipToCustNo: [],
      shipToCustAdd: [],
      billToCustName: [],
      billToCustNo: [],
      billToCustAdd: [],
      soldToCustName: [],
      soldToCustId: [],
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
      ouId: [],
      status: [],
      billcontactNo: [],
      shipcontactNo: [],
      emplId: [],

      applyTo: [],
      tApplAmt: [],
      tUapplAmt: [],
      creditNoteAmount: [],
      totUnAppliedtAmount: [],
      totAppliedtAmount: [],
      balanceAmount: [],
      customerId: [],
      customerSiteId: [],
      custAccountNo: [],
      custName: [],
      glPrdStartDate: [],
      glPrdEndDate: [],

      jeSource: [],
      name: [],
      ledgerName: [],
      jeCategory: [],
      postedDate: [],
      periodName: [],
      runningTotalDr: [],
      runningTotalCr: [],
      ledgerId: [],
      description: [],
      docSeqValue: [],
      custtaxCategoryName: [],
      siteName: [],

      invLines: this.fb.array([this.lineDetailsGroup()]),
      invDisLines: this.fb.array([this.distLineDetails()]),
      taxLines: this.fb.array([this.TaxDetailsGroup()]),
      invApplyList: this.fb.array([this.invLineDetails()])
    });
  }

  invLineDetails() {
    return this.fb.group({
      // selectAllflag: [],
      applyTo: [],
      applyrcptFlag: [],
      trxNumber: [],
      trxDate: [],
      invoiceAmount: [],
      applAmt: [],
      balDueAmt: [],
      balance1: [],
      applAmtNew: [],
      paymentAmt: [],
      applDate: [],
      glDate: [],
      glDateLine: [],
      billToCustId: [],
      billToSiteId: [],
      invCurrancyCode: [],
      refReasonCode: [],
      // emplId:[],

    })
  }

  invLineArray(): FormArray {
    return <FormArray>this.arInvoiceForm.get('invApplyList')
  }
  addRow(k) {
    //   alert('k '+ k);
    var trxLnArr1 = this.arInvoiceForm.get('invLines').value;
    var item = trxLnArr1[k].segment;
    var desc = trxLnArr1[k].description;
    var itemqty = trxLnArr1[k].orderedQty;
    var price = trxLnArr1[k].unitSellingPrice
    var taxCat = trxLnArr1[k].taxCategoryName
    // alert(item+''+desc+''+itemqty+''+price+''+taxCat);
    if ((item === null || desc === null || item === undefined || desc === undefined) && (itemqty === null && price === null && taxCat === '')) {
      alert('Please enter data in blank field');
      return;
    }
    this.lineDetailsArray.push(this.lineDetailsGroup());
    var len = this.lineDetailsArray.length;
    var patch = this.arInvoiceForm.get('invLines') as FormArray;
    var control = this.arInvoiceForm.get('invLines').value;
    (patch.controls[len - 1]).patchValue(
      {
        lineNum: len,
      }
    );


  }
  addRowDistribution(k) {

    this.lineDistributionArray().push(this.distLineDetails());
    var len = this.lineDistributionArray().length;
    var patch = this.arInvoiceForm.get('invDisLines') as FormArray;
    (patch.controls[len - 1]).patchValue(
      {
        lineNum: len,
      }
    );
  }
  RemoveRow(index) {

    // if (index === 0) {

    // } else {
    var len1 = this.lineDetailsArray.length;
    // alert(len1);
    if (len1 === 1) {
      alert('You can not delete the line');
      return;
    }
    this.lineDetailsArray.removeAt(index);
    // }
    index = index + 1;

    var taxLn = this.arInvoiceForm.get('taxLines').value;
    var distLn = this.arInvoiceForm.get('invDisLines').value;

    for (let i = distLn.length - 1; i >= 0; i--) {
      if (distLn[i].invoiceLineNum == index) {
        this.RemoveDistributionRow(i);
      }
    }
    for (let j = taxLn.length - 1; j >= 0; j--) {
      if (taxLn[j].invLineNo == index) {
        this.TaxDetailsArray().removeAt(j)
      }
    }
    this.taxarr.delete(index);
    this.distarr.delete(index);
  }

  RemoveDistributionRow(index) {
    // if (index === 0) {

    // } else {
    this.lineDistributionArray().removeAt(index);
    // }
  }

  TaxDetailsGroup() {
    return this.fb.group({
      totTaxAmt: [],
      invLineNo: [],
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
      taxItemId: [],

    });
  }


  TaxDetailsArray(): FormArray {
    // return this.lineDetailsArray.controls[].get('taxAmounts') as FormArray
    return <FormArray>this.arInvoiceForm.get('taxLines')
  }
  distLineDetails() {
    return this.fb.group({
      // invDistributionId: [],
      class: [],
      invoiceLineNum: [],
      lineNum: [],
      amount: [],
      // accountingDate: [],
      glDate: [],
      // poSegment: [],
      codeCombinationId: [],
      concatenatedSegment: [],
      accountDesc: [],
      // poChargeAc: [],
      // poChargeDesc: [],
      // poChargeCode: [],
      custTrxLineId: [],
      percent: [],
      invTransferStatus: [],
      // poChargeAcCode: [],
      // totalDistAmt:[],
      // totalDistBaseAmt:[],
      // poChargeAcCode:[],
      // invTransferStatus:[],
    })
  }
  lineDistributionArray(): FormArray {
    // var patch = this.poInvoiceForm.get('invDisLines') as FormArray;
    //   (patch.controls[0]).patchValue(
    //     {
    //       distLineNumber: 1,
    //     }
    //   );
    return <FormArray>this.arInvoiceForm.get('invDisLines')
  }
  lineDetailsGroup() {
    return this.fb.group({
      // poLineId: [],
      // polineNum: [],
      lineNum: [],
      segment: [],
      itemId: [],
      description: [],
      invCategory: [],
      uom: [],
      hsnSacCode: [],
      taxCategoryName: [],
      taxPer: [],
      taxCategoryId: [],
      diss1: [],

      itemType: [],
      unitSellingPrice: [],
      orderedQty: ['', [Validators.required, Validators.pattern("^[-]{1}[0-9]*$")]],    //^[0-9]\d*(\.\d+)?$
      basicAmt: [],
      // poChargeAcc: [],
      segmentName: [],

      taxRecoverable: [],
      extendedAmount: [],



    });
  }

  get lineDetailsArray() {
    var patch = this.arInvoiceForm.get('invLines') as FormArray;
    (patch.controls[0]).patchValue(
      {
        polineNum: 1,
      }
    );
    return <FormArray>this.arInvoiceForm.get('invLines')
  }
  get f() { return this.arInvoiceForm.controls; }


  ngOnInit(): void {
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'))
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.compId = Number(sessionStorage.getItem('compId'));
    this.transactionService.paymentTermListFn()
      .subscribe(
        data => {
          this.paymentTermList = data;
          console.log(this.paymentTermList);
        }
      );
    this.service.locationIdList1(this.ouId)
      .subscribe(
        data => {
          this.locIdList = data;
          console.log(this.locIdList);
        }
      );
    this.transactionService.classListFN()
      .subscribe(
        data => {
          this.classList = data;
          console.log(this.classList);
        }
      );
    this.transactionService.sourceListFn().subscribe(data => {
      this.sourceList = data;
      console.log(this.sourceList);

    })
    this.service
      .searchByItemSegmentDiv(this.divisionId, '36DH1601')
      .subscribe((data) => {
        this.invItemList = data;
        // console.log(this.newRow.controls.segment);

        //(<any>this.newRow.controls.segment).nativeElement.focus();
      });
    // this.service.searchByItemSegmentAR('TCS')
    // .subscribe((data) => {
    //   this.invItemList = data;

    // });
    // this.transactionService.invTypeListFN().subscribe(data => {
    //   this.invTypeList = data;
    //   console.log(this.invTypeList);

    // })


    var patch = this.arInvoiceForm.get('invLines') as FormArray;
    (patch.controls[0]).patchValue(
      {
        lineNum: 1,
      }
    );

    this.service.GLperiod()
      .subscribe(
        data => {
          this.GLPeriodCheck = data.obj;
          console.log(this.GLPeriodCheck);
        }
      );


    // alert(Number(sessionStorage.getItem('deptId')))
    if (Number(sessionStorage.getItem('deptId')) == 4) {
      this.sub = this.router1.params.subscribe(params => {
        this.trxNumber1 = params['invoiceNumber'];
        // alert(this.trxNumber1)
        if (this.trxNumber1 != undefined) {
          this.searchByInvoiceNo(this.trxNumber1)
        }
      })
    }

    this.glPrdStartDate = this.GLPeriodCheck.startDate;
    this.glPrdEndDate = this.GLPeriodCheck.endDate;
  }
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

  viewARDist() {
    // alert('Hello'+this.BranchList)
    // if (this.BranchList == undefined) {
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
    this.service.NaturalAccountListRec()
      .subscribe(
        data => {
          this.NaturalAccountList = data.obj;
          console.log(this.NaturalAccountList);
        }
      ); this.service.InterBrancList()
        .subscribe(
          data => {
            this.InterBrancList = data;
            console.log(this.InterBrancList);
          }
        );
    this.service.locationCodeList()
      .subscribe(
        data => {
          this.locIdListModel = data;
          console.log(this.locIdListModel);
        }
      );
    // }
  }
  viewARLinedata() {
    this.service.searchByItemSegmentAR('TCS')
      .subscribe((data) => {
        this.invItemList = data.obj;

      });
    if (this.hsnSacCodeList == '') {
      this.service.hsnSacCodeData('HSN').subscribe(
        data => {
          this.hsnSacCodeList = data;
        }
      )

      // this.service.taxCategoryListForSALES()
      //   .subscribe(
      //     data1 => {
      //       this.allTaxCategoryList = data1;
      //       this.taxCategoryList[0]=data1;
      //       console.log(this.taxCategoryList);
      //       data1 = this.taxCategoryList;
      //     }
      //   );
    }
  }
  onOptionTaxPerSel(event, k) {
    // alert(event);
    var per = event.target.value;
    var custTax = this.arInvoiceForm.get('custtaxCategoryName').value;
    this.orderManagementService.getTaxCategoriesForSales(custTax, per)
      .subscribe(
        data1 => {
          this.allTaxCategoryList = data1;
          this.taxCategoryList[k] = data1;
          // let itemCateNameList = this.taxCategoryList[k].find(d => d.taxCategoryName === data.obj[i].taxCategoryName);
          // (controlinv.controls[k]).patchValue({
          //   taxCategoryId: itemCateNameList.taxCategoryId,
          //   taxCategoryName: itemCateNameList,
          // })
        }
      );
  }
  filterRecord(event, i) {
    // alert(event+'Filter');
    var invTyp = this.arInvoiceForm.get('source').value;

    var itemCode = event.target.value;
    // alert(itemCode)
    if (event.keyCode == 13) {
      // enter keycode
      if (itemCode.length == 8) {
        if (this.invItemList.length <= 1) {
          if (invTyp === 'Manual') {
            // alert('inside if--');
            this.service.searchByItemSegmentAR(itemCode.toUpperCase())
              .subscribe((data) => {
                this.invItemList = data.obj;
                this.onOptioninvItemIdSelected(itemCode, i);
              });
          } else {
            this.service
              .searchByItemSegmentDiv(this.divisionId, itemCode.toUpperCase())
              .subscribe((data) => {
                this.invItemList = data;
                // this.Select(data[0].itemId);
                this.onOptioninvItemIdSelected(itemCode, i);
              });
          }
        } else {
          this.onOptioninvItemIdSelected(itemCode, i);
        }

        return;
      } else if (itemCode.length >= 4) {
        // alert(trxType);
        if (invTyp === 'Manual') {
          // alert('inside if');
          this.service.searchByItemSegmentAR(itemCode.toUpperCase())
            .subscribe((data) => {
              this.invItemList = data.obj;

            });
        } else {
          this.service
            .searchByItemSegmentDiv(this.divisionId, itemCode.toUpperCase())
            .subscribe((data) => {
              this.invItemList = data;
              // this.Select(data[0].itemId);
              //  this.onOptiongetItem(itemCode, i);
            });
        }
      } else {
        alert('Please Enter 4 characters of item number!!');
        return;
      }
    }
  }
  // filterRecord(event, i) {
  //   var itemCode = event.target.value;
  //   var invTyp = this.arInvoiceForm.get('source').value;
  //   if (event.keyCode == 13) {
  //     if (itemCode.length == 4) {
  //       if(invTyp==='Manual'){
  //         this.service.searchByItemSegmentAR(itemCode.toUpperCase()).subscribe((data)=>{
  //           this.invItemList=data.obj;
  //           if(data.obj.length===0){
  //             alert('Please enter non inventory item');
  //           }
  //           else{
  //           this.onOptioninvItemIdSelected(itemCode, i);
  //           } 
  //         });
  //       }
  //       else{
  //       console.log(this.invItemList.length)
  //       this.service
  //         .searchByItemSegmentDiv(this.divisionId, itemCode.toUpperCase())
  //         .subscribe((data) => {
  //           this.invItemList = data;
  //           // this.Select(data[0].itemId);
  //           this.onOptioninvItemIdSelected(itemCode, i);
  //         });
  //       }
  //       //  }   
  //     } else {
  //       alert('Please Enter 4 characters of item number!!');
  //       return;
  //     }
  //   }
  // }

  arInvoice(arInvoiceForm) { }

  searchByInvoiceNo(trxNumber1) {
    // alert('call from account login.!')
    this.displaySaveButton = false;
    this.displayCustomerSite = false;
    this.TaxDetailsArray().clear();
    // this.arInvoiceForm.get('invLines').clear();
    this.lineDistributionArray().clear();
    this.transactionService.searchByInvoiceNoAROu(trxNumber1, sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.lstcomments = data.obj;
            console.log(this.lstcomments);
            this.isVisibleArInvoiceLine = true;
            this.isVisibleArDist = true;
            this.taxUistatus = true;
            this.arInvoiceForm.patchValue(this.lstcomments, { emitEvent: false });
            // alert('after emit');
            var len = this.lineDetailsArray.length;
            for (let i = 0; i < data.obj.invLines.length - len; i++) {
              var invLnGrp: FormGroup = this.lineDetailsGroup();
              this.lineDetailsArray.push(invLnGrp);

              var patch = this.arInvoiceForm.get('invLines') as FormArray;
              patch.controls[i].patchValue({ taxPer: data.obj.invLines.taxPer })
              // var seltrxtyp = this.taxCategoryList[i].find(d => d.taxCategoryId == data.obj[i].invLines.taxCategoryId)
              // console.log(seltrxtyp);
              // var patch=this.arInvoiceForm.get('invLines')as FormArray;
              // patch.controls[i].patchValue({taxCategoryName:seltrxtyp.taxCategoryName});

            }
            for (let i = 0; i < data.obj.invDisLines.length; i++) {
              var invLnGrp: FormGroup = this.distLineDetails();
              this.lineDistributionArray().push(invLnGrp);
            }
            // for (let i = 0; i < data.taxLines.length - len; i++) {
            for (let i = 0; i < data.obj.taxLines.length; i++) {
              var invLnGrp: FormGroup = this.TaxDetailsGroup();
              this.TaxDetailsArray().push(invLnGrp);
              this.arInvoiceForm.get('taxLines').patchValue(data.obj.taxLines);


            }
            // alert('second emit call')
            var arinvLnDtlArray = this.arInvoiceForm.get('invDisLines') as FormArray;
            // alert(data.obj.invDisLines.length)
            //   for (let index=0;index< data.invDisLines.length;index ++){
            //     alert(data.invDisLines[index].glDate);
            //   arinvLnDtlArray.controls[index].patchValue({
            //     glDate:data.invDisLines[index].glDate,
            //   })
            // }
            this.arInvoiceForm.patchValue(data.obj);
            // alert(data.obj.glDate);
            this.glDate=data.obj.glDate;
            this.invoiceDate=data.obj.invoiceDate;
            if (Number(sessionStorage.getItem('deptId'))==4){
              this.displayglDate=false;
              this.displayglDate1=false;
            }
            // alert(this.invTypeList.length);
            // debugger;
            if (this.invTypeList.length < 1) {
              this.service.arInvoiceList(data.obj.class).subscribe(
                data1 => {
                  this.invTypeList = data1;
                  console.log(this.invTypeList);

                  var seltrxtyp = this.invTypeList.find(d => d.name == data.obj.invType)
                  console.log(seltrxtyp);
                  this.arInvoiceForm.patchValue({ custTrxTypeId: seltrxtyp.custTrxTypeId });

                });


              // this.taxUistatus = false;
            }
            else {
              var seltrxtyp = this.invTypeList.find(d => d.name == data.obj.invType)
              this.arInvoiceForm.patchValue({ custTrxTypeId: seltrxtyp.custTrxTypeId });
            }
            this.disabledViewAccounting = true;
            this.disabledComplete = true;
            if (data.obj.invStatus == 'Complete') {
              this.displayaddRow = false;
              this.displayRemoveRow = false;
              this.displayRmDistRow = false;
              this.disabledComplete = false;
              this.displaytaxName = false;
              this.displayinvItem = false;
              this.arInvoiceForm.disable();
            }
            if (data.obj.invStatus == 'Complete') {
              this.isVisibleInvoice = true;
              this.displayinvItem = false;
            }
            if (data.obj.class == 'Credit Memo') {
              this.isVisibleApply = true;
              // this.displayinvItem=false;
            }
            if (data.obj.referenceNo != '') {
              this.displayinvItem = false;
            }
          }
          else {
            if (data.code === 400) {
              alert(data.message);
              // this.arInvoiceForm.reset();
            }
          }
        }
      );
    // if(this.arInvoiceForm.get('referenceNo')!=null)
    // {
    // this.arInvoiceForm.disable();
    // // this.TaxDetailsArray().disable();
    // this.arInvoiceForm.get('taxLines').disable();
    // this.arInvoiceForm.get('invLines').disable();
    // this.arInvoiceForm.get('invDisLines').get('class').disable();
    // this.lineDistributionArray().disable();
    // }comment by vinita

  }

  onOptionType(event: any) {
    if (event != undefined) {
      if (event === 'Manual') {
        let currItemList = this.invItemList.filter((item) => (item.stockable === 'N'));
        this.invItemList = currItemList;
      }
    }
  }
  onOptionSelectInvoice(event: any) {
    //  alert("-1--"+event.target.value);
    var invtyp = event.target.value
    this.service.arInvoiceList(invtyp).subscribe(
      data => {
        this.invTypeList = data;
        console.log(this.invTypeList);

      });
    if (this.billToCustNo != null && this.arInvoiceForm.get('source').value != null && this.arInvoiceForm.get('class').value != null && this.arInvoiceForm.get('custTrxTypeId').value != null && this.arInvoiceForm.get('locId').value != null) {
      this.isVisibleArInvoiceLine = true;
    }


  }
  dispArInvLine() {
    if (this.billToCustNo != null && this.arInvoiceForm.get('source').value != null && this.arInvoiceForm.get('class').value != null && this.arInvoiceForm.get('custTrxTypeId').value != null && this.arInvoiceForm.get('locId').value != null) {
      this.isVisibleArInvoiceLine = true;
    }

  }
  displayTaxDetail(i) {
    for (let i = 0; i < this.lstcomments.taxLines.length; i++) {
      var invLnGrp: FormGroup = this.TaxDetailsGroup();
      this.TaxDetailsArray().push(invLnGrp);
      this.arInvoiceForm.get('taxLines').patchValue(this.lstcomments.taxLines);

    }
  }
  closeMast() {
    this.router.navigate(['admin']);
  }
  clearFormArray() {
    window.location.reload();
  }
  onOptioninvItemIdSelected(itemId, index) {
    // alert(itemId)
    console.log(this.invItemList);
    let selectedValue = this.invItemList.find(v => v.segment == itemId);
    // let selhsnsac = this.hsnSacCodeList.find(v => v.hsnsaccode == selectedValue.hsnSacCode);
    // alert(selectedValue.stockable);
    // if(selectedValue.stockable==='Y'){
    //   alert('Please select Non Inventory Item');
    //   var patch1 = this.arInvoiceForm.get('invLines') as FormArray;
    // patch1.controls[index].patchValue({
    //   itemId:''})
    // }
    // else{
    // alert(selectedValue.itemId)
    console.log(selectedValue)
    var patch = this.arInvoiceForm.get('invLines') as FormArray;
    patch.controls[index].patchValue({
      itemId: selectedValue.itemId,
      description: selectedValue.description,
      invCategory: selectedValue.itemCategory,
      uom: selectedValue.uom,
      hsnSacCode: selectedValue.hsnSacCode,
      poChargeAcc: selectedValue.poChargeAccount,
      diss1: 0,

    })
    // alert(selectedValue.isTaxable +'selectedValue.isTaxable')
    if (selectedValue.isTaxable == 'N') {
      // alert('In If');
      patch.controls[index].get('taxPer').disable();
      patch.controls[index].get('taxCategoryName').disable();
      // this.isDisabledName=false;
      // this.isDisabledPer=true;
    }
    var custaxTaxCatName = this.arInvoiceForm.get('custtaxCategoryName').value;
    // alert(custaxTaxCatName+'custaxTaxCatName')
    if (custaxTaxCatName === 'Sales-IGST') {
      // alert(custaxTaxCatName);
      this.orderManagementService.addonDescList2(itemId, custaxTaxCatName, 1, 'N')
        .subscribe(
          data => {
            if (data.code === 200) {
              this.addonDescList = data.obj;
              for (let i = 0; i < data.obj.length; i++) {
                var itemtaxCatNm: string = data.obj[i].taxCategoryName;
                if (itemtaxCatNm.includes('Sale-I-GST')) {
                  // alert(itemtaxCatNm);
                  (patch.controls[index]).patchValue({
                    // itemId: data.obj[i].itemId,
                    // orderedItem: data.obj[i].description,
                    hsnSacCode: data.obj[i].hsnSacCode,
                    uom: data.obj[i].uom,
                    // unitSellingPrice: data.obj[0].priceValue,by vinita
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
          })
        ;

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

  custNameSearch(billToCustName) {
    // alert(billToCustName)
    this.orderManagementService.custNameSearchFn(billToCustName, sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.customerNameSearch = data.obj;
            console.log(this.accountNoSearch);
          }
          else {
            if (data.code === 400) {
              alert(data.message);
              // this.display='block';
            }
          }
        }
      );
  }



  fnCancatination(i) {
    var patch = this.arInvoiceForm.get('invDisLines') as FormArray;
    var Code = this.arInvoiceForm.get('invDisLines').value;
    // debugger;
    var natacc1 = this.arInvoiceForm.get('segment4').value.split('--');
    // alert(natacc1[0]);
    var natacc = natacc1[0];
    // alert(Code[i].concatenatedSegment+'segment');
    Code[i].concatenatedSegment = this.arInvoiceForm.get('segment11').value + '.' +
      this.arInvoiceForm.get('segment2').value + '.' +
      this.arInvoiceForm.get('segment3').value + '.' +
      //  this.JournalVoucherForm.get('segment4').value+'.'+
      natacc + '.' +
      this.arInvoiceForm.get('segment5').value;

    // alert(this.segmentName);
    var segmentName = Code[i].concatenatedSegment;
    // alert(segmentName+"before patch");
    patch.controls[i].patchValue({ 'concatenatedSegment': segmentName });
    // alert(segmentName+"after patch");
    this.service.segmentNameList(segmentName)
      .subscribe(
        data => {

          this.segmentNameList = data;
          if (this.segmentNameList.code === 200) {
            patch.controls[i].patchValue({ codeCombinationId: this.segmentNameList.obj.codeCombinationId });
            this.codeCombinationId = this.segmentNameList.obj.codeCombinationId;
            // alert(this.codeCombinationId +'inside fnca');
            if (this.segmentNameList.length == 0) {
              alert('Invalid Code Combination');
            } else {
              console.log(this.segmentNameList);
              this.arInvoiceForm.patchValue({ codeCombinationId: this.segmentNameList.obj.codeCombinationId });
              this.codeCombinationId = Number(this.segmentNameList.obj.codeCombinationId);
              var dislines = this.arInvoiceForm.get('invDisLines').value;

              this.distarr.set(this.invLineNo, dislines);
              console.log(this.distarr);
            }
            // this.CheckForDuplicateLineItem(this.codeCombinationId,i);

          } else if (this.segmentNameList.code === 400) {
            // var arraycontrol =this.JournalVoucherForm.get('glLines').value;
            patch.controls[i].patchValue({ concatenatedSegment: '' });
            // alert(this.segmentNameList.message);

          }
        }
      );

    this.arInvoiceForm.get('segment11').reset();
    this.arInvoiceForm.get('segment2').reset();
    this.arInvoiceForm.get('segment3').reset();
    this.arInvoiceForm.get('segment4').reset();
    this.arInvoiceForm.get('segment5').reset();

    this.arInvoiceForm.get('lookupValueDesc1').reset();
    this.arInvoiceForm.get('lookupValueDesc2').reset();
    this.arInvoiceForm.get('lookupValueDesc3').reset();
    this.arInvoiceForm.get('lookupValueDesc4').reset();
    this.arInvoiceForm.get('lookupValueDesc5').reset();
    // alert('Code Combination search complete')
  }

  openCodeComb(i) {
    // alert('hi')
    this.content = i; // Dynamic Data
    let a = i + 1
    this.title = "Account Code Combination :" + a + "---" + this.content;
    //  var natacc1 =this.arInvoiceForm.get('segment4').value.split('--');
    //   // alert(natacc1[0]);
    //   var natacc=natacc1[0];

    let segmentName1 = this.lineDistributionArray().controls[i].get('concatenatedSegment').value;

    if (segmentName1 === null) {
      this.arInvoiceForm.get('segment11').reset();
      this.arInvoiceForm.get('segment2').reset();
      this.arInvoiceForm.get('segment3').reset();
      this.arInvoiceForm.get('segment4').reset();
      this.arInvoiceForm.get('lookupValueDesc1').reset();
      this.arInvoiceForm.get('lookupValueDesc2').reset();
      this.arInvoiceForm.get('lookupValueDesc3').reset();
      this.arInvoiceForm.get('lookupValueDesc4').reset();
      this.arInvoiceForm.get('lookupValueDesc5').reset();
    }
    if (segmentName1 != null) {
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
    // this.displayModal = false;
    // this.showModal = true; // Show-Hide Modal Check



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
          // this.arInvoiceForm.patchValue(this.branch);
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
  transData(val) {
    delete val.segment11;
    delete val.segment2;
    delete val.segment3;
    delete val.segment4;
    delete val.segment5;
    delete val.lookupValueDesc1;
    delete val.lookupValueDesc2;
    delete val.lookupValueDesc3;
    delete val.lookupValueDesc4;
    delete val.lookupValueDesc5;

    return (val);
  }
  // saveARInvoiceNew() {
  //   //Get invoice lines
  //   const formValue: IArInvoice = this.transData(this.arInvoiceForm.value);
  //   formValue.ouId = this.ouId;
  //   var arrayControl = this.arInvoiceForm.get('invLines').value;
  //   var patch = this.arInvoiceForm.get('invLines') as FormArray;
  //   Array.from(this.taxarr.values());
  //   this.basicAmt = 0;
  //   this.taxRecoverable = 0;
  //   this.extendedAmount = 0;

  //   var custTrxTypeId = this.arInvoiceForm.get('custTrxTypeId').value;
  //   var locId = this.arInvoiceForm.get('locId').value;


  //   // alert(locId)
  //   if (locId == null) {
  //     locId = '000';
  //   }


  //   // for (var i = 0; i < arrayControl.length; i++) {
  //   //   this.basicAmt = this.basicAmt + arrayControl[i].basicAmt;
  //   //   this.taxRecoverable = this.taxRecoverable + arrayControl[i].taxRecoverable;

  //   //   alert('***' + this.taxarr.get(i));
  //   // this.service.taxCalforItem1(sessionStorage.getItem('ouId'), locId, arrayControl[i].basicAmt, arrayControl[i].taxCategoryId, 0)
  //   //   .subscribe(
  //   //     (data: any) => {taxarr.push(data)
  //   //     alert(JSON.stringify(taxarr))});

  //   // this.service.distributionApi1(custTrxTypeId, sessionStorage.getItem('ouId'), locId, arrayControl[i].basicAmt, arrayControl[i].extendedAmount)
  //   //               .subscribe(
  //   //                 data1 => {distarr[i]=(data)
  //   //                 alert(JSON.stringify(data))
  //   //                 });


  //   //}

  //   console.log(this.arInvoiceForm.value);
  //   let jsonData = this.arInvoiceForm.value;

  //   formValue.extendedAmount = (this.basicAmt + this.taxRecoverable);
  //   this.arInvoiceForm.patchValue({ invoiceAmount: this.extendedAmount })
  //   formValue.invoiceAmount = this.extendedAmount;
  //   formValue.taxAmount = this.taxRecoverable;
  //   formValue.taxableAmount = this.basicAmt;
  //   //For loop
  //   //get tax detailplus store
  //   //get dist dettailplus store
  //   //end for loop
  //   // let manInvObj = Object.assign(new ManualARInvoiceObj(), jsonData);
  //   // manInvObj.setinvLines(this.arInvoiceForm.value.invLines);
  //   // manInvObj.setTaxLines(Array.from(this.taxarr.values()));
  //   // manInvObj.setinvDisLines(Array.from(this.distarr.values()));
  //   // console.log(JSON.stringify(manInvObj));
  //   // //save
  //   this.transactionService.ARInvoiceSubmit(JSON.stringify(formValue)).subscribe((res: any) => {
  //     if (res.code === 200) {
  //       alert('RECORD INSERTED SUCCESSFULLY');
  //       this.arInvoiceForm.patchValue({ trxNumber: res.obj.trxNumber })
  //       this.disabledViewAccounting = true;
  //       this.disabledComplete = true;

  //       // window.location.reload();
  //     } else {
  //       if (res.code === 400) {
  //         alert('Code already present in the data base');
  //         // this.CompanyMasterForm.reset();
  //         // window.location.reload();
  //       }
  //     }
  //   });

  // }
  Save() {
    // debugger;
    let jsonData = this.arInvoiceForm.getRawValue();
    jsonData.ouId = this.ouId;
    var arrayControl = this.arInvoiceForm.get('invLines').value;
    var patch = this.arInvoiceForm.get('invLines') as FormArray;
    this.basicAmt = 0;
    this.taxRecoverable = 0;
    this.extendedAmount = 0;

    for (var i = 0; i < arrayControl.length; i++) {
      this.basicAmt = this.basicAmt + arrayControl[i].basicAmt;
      this.taxRecoverable = this.taxRecoverable + arrayControl[i].taxRecoverable;
    }
    this.extendedAmount = (this.basicAmt + this.taxRecoverable);
    this.arInvoiceForm.patchValue({ invoiceAmount: this.extendedAmount })
    jsonData.invoiceAmount = this.extendedAmount;
    jsonData.taxAmount = this.taxRecoverable;
    jsonData.taxableAmount = this.basicAmt;
    var glDate = this.arInvoiceForm.get('glDate').value;
    // alert(glDate);
    var invoiceDate=this.arInvoiceForm.get('invoiceDate').value;
    // alert(invoiceDate)
    // return;
    jsonData.glDate = this.pipe.transform(glDate, 'dd-MM-yyyy');
    jsonData.invoiceDate = this.pipe.transform(invoiceDate, 'dd-MM-yyyy');
    // alert(this.pipe.transform(glDate, 'dd-MM-yyyy'));
    var taxStr = [];
    for (let taxlinval of this.taxarr.values()) {
      // console.log("Map Values= " +JSON.stringify(value));
      for (let i = 0; i < taxlinval.length; i++) {
        taxStr.push(taxlinval[i]);
      }
    }
    var disStr = [];
    for (let dislinval of this.distarr.values()) {
      // console.log("Map Values= " +JSON.stringify(value));
      for (let i = 0; i < dislinval.length; i++) {
        disStr.push(dislinval[i]);
      }
    }

    console.log('---' + JSON.stringify(taxStr));

    let manArInvObj = Object.assign(new ManualARInvoiceObj(), jsonData);
    manArInvObj.setinvLines(this.arInvoiceForm.value.invLines);
    manArInvObj.setTaxLines(taxStr);
    manArInvObj.setinvDisLines(disStr);
    // manArInvObj.setTaxLines(Array.from(this.taxarr.values()));
    // manArInvObj.setinvDisLines(this.arInvoiceForm.value.invDisLines);
    // manArInvObj.setinvDisLines(Array.from(this.distarr.values()));
    // alert(this.distarr.size+'Array')




    console.log(JSON.stringify(manArInvObj));
    this.transactionService.ARInvoiceSubmit(JSON.stringify(manArInvObj)).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.displaySaveButton = false;
        this.arInvoiceForm.patchValue({ trxNumber: res.obj.trxNumber })
        this.disabledComplete = true;

        if ((this.arInvoiceForm.get('class').value) == 'Credit Memo') {
          this.isVisibleApply = true;
        }

        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert(res.message);
          // this.CompanyMasterForm.reset();
          // window.location.reload();
        }
      }
    });
  }
  // saveArInvoice() {
  //   const formValue: IArInvoice = this.transData(this.arInvoiceForm.value);
  //   formValue.ouId = this.ouId;
  //   var arrayControl = this.arInvoiceForm.get('invLines').value;
  //   var patch = this.arInvoiceForm.get('invLines') as FormArray;
  //   this.basicAmt = 0;
  //   this.taxRecoverable = 0;
  //   this.extendedAmount = 0;

  //   for (var i = 0; i < arrayControl.length; i++) {
  //     this.basicAmt = this.basicAmt + arrayControl[i].basicAmt;
  //     this.taxRecoverable = this.taxRecoverable + arrayControl[i].taxRecoverable;
  //   }
  //   this.extendedAmount = (this.basicAmt + this.taxRecoverable);
  //   this.arInvoiceForm.patchValue({ invoiceAmount: this.extendedAmount })
  //   formValue.invoiceAmount = this.extendedAmount;
  //   formValue.taxAmount = this.taxRecoverable;
  //   formValue.taxableAmount = this.basicAmt;
  //   this.transactionService.ARInvoiceSubmit(formValue).subscribe((res: any) => {
  //     if (res.code === 200) {
  //       alert('RECORD INSERTED SUCCESSFULLY');
  //       this.arInvoiceForm.patchValue({ trxNumber: res.obj.trxNumber })

  //       // window.location.reload();
  //     } else {
  //       if (res.code === 400) {
  //         alert('Code already present in the data base');
  //         // this.CompanyMasterForm.reset();
  //         // window.location.reload();
  //       }
  //     }
  //   });
  // }
  invDisLinesInTax: any = [];
  onOptionTaxCatSelected(i, taxcatid, taxCategoryName, basicAmt, activeTab) {
    // alert(taxCategoryName.taxCategoryName);
    var len1 = this.TaxDetailsArray().length;
    this.invLineNo = i + 1;
    if (this.taxUistatus === false) {
      this.TaxDetailsArray().clear();
      this.lineDistributionArray().clear();
      var arrayControl = this.arInvoiceForm.get('invLines').value;
      var patchtaxDetail = this.arInvoiceForm.get('taxLines') as FormArray;
      if (taxcatid === null) {
        let selectedValue = this.allTaxCategoryList.find(v => v.taxCategoryName == taxCategoryName.taxCategoryName);
        this.taxCategoryId = selectedValue.taxCategoryId
      }
      else {
        // alert('in else')
        this.taxCategoryId = taxcatid;
      }
      var patch = this.arInvoiceForm.get('invLines') as FormArray;
      (patch.controls[i]).patchValue(
        {
          taxCategoryId: Number(this.taxCategoryId),
        });
      this.itemId = arrayControl[i].itemId;

      var itemId = arrayControl[i].itemId;
      var diss = 0;
      var sum = 0;
      var baseAmount = arrayControl[i].basicAmt

      var custTrxTypeId = this.arInvoiceForm.get('custTrxTypeId').value;
      var locId = this.arInvoiceForm.get('locId').value;

      if (locId == null) {
        locId = '000';
      }
      var len1 = this.TaxDetailsArray().length;
      ;
      if (baseAmount != null && this.taxCategoryId != undefined) {

        this.service.taxCalforItem1(sessionStorage.getItem('ouId'), locId, baseAmount, this.taxCategoryId, diss)
          .subscribe(
            (data: any) => {
              this.taxCalforItem = data.taxLines;
              this.invDisLinesInTax = data.invDisLines;
              // this.taxarr.set(i, data.taxLines);
              for (let i = 0; i < data.taxLines.length - len1; i++) {
                var invLnGrp: FormGroup = this.TaxDetailsGroup();
                this.TaxDetailsArray().push(invLnGrp);

              }
              //patch tax values on ar line  tab
              this.arInvoiceForm.get('taxLines').patchValue(data.taxLines);

              for (let i = 0; i < this.taxCalforItem.length; i++) {
                if (this.taxCalforItem[i].totTaxPer != 0) {
                  sum = sum + this.taxCalforItem[i].totTaxAmt
                }
                // alert(sum + " sum")
              }
              (patch.controls[i]).patchValue({
                // baseAmtLineWise: arrayControl[i].baseAmtLineWise,
                taxRecoverable: sum,
                extendedAmount: arrayControl[i].basicAmt + sum,
              });
              var extendedAmount = arrayControl[i].basicAmt + sum;
              // alert(this.TaxDetailsArray().length + ' this.TaxDetailsArray().length-')
              for (let i = 0; i < this.TaxDetailsArray().length; i++) {
                patchtaxDetail.controls[i].patchValue({ taxItemId: this.itemId, invLineNo: this.invLineNo })

              }
              var custTrxTypeId = this.arInvoiceForm.get('custTrxTypeId').value
              var len2 = this.lineDistributionArray().length;
              this.taxarr.set(this.invLineNo, this.arInvoiceForm.get('taxLines').value);

              // Adding distrubition lines ===--- receiable revenue and tax lines
              this.service.distributionApi1(custTrxTypeId, sessionStorage.getItem('ouId'), locId, arrayControl[i].basicAmt, extendedAmount)
                .subscribe(
                  data1 => {
                    var distrRes: any = data1;
                    this.distributioArr = [];
                    var exLineArr = Array.from(this.distarr.values());
                    // debugger;
                    var isDistAdded = false;
                    for (let i = 0; i < exLineArr.length; i++) {
                      var exLines = exLineArr[i];
                      for (let j = 0; j < exLines.length; j++) {
                        // alert(exLines[j].invoiceLineNum+'-line no in tax--'+ this.invLineNo)
                        if (exLines[j].invoiceLineNum <= this.invLineNo) {

                        } else {
                          this.distributioArr.push(exLines[j]);
                        }

                        // this.distributioArr.push(exLines[j]);comment by vinnit1-3-22
                      }
                    }
                    for (let i = 0; i < distrRes.length; i++) {
                      distrRes[i].invoiceLineNum = this.invLineNo;
                      this.distributioArr.push(distrRes[i]);
                    }
                    for (let i = 0; i < data.invDisLines.length; i++) {
                      data.invDisLines[i].invoiceLineNum = this.invLineNo;
                      this.distributioArr.push(data.invDisLines[i]);
                    }
                    console.log(this.distributioArr);

                    for (let i = 0; i < this.distributioArr.length; i++) {
                      var invLnGrp: FormGroup = this.distLineDetails();
                      this.lineDistributionArray().push(invLnGrp);
                    }

                    var control = this.arInvoiceForm.get('invDisLines') as FormArray;
                    for (let i = 0; i < this.lineDistributionArray().length; i++) {
                      control.controls[i].patchValue(this.distributioArr[i]);
                      control.controls[i].patchValue({ lineNum: i + 1 });
                      //(control.controls[i]).patchValue({ invoiceLineNum: this.invLineNo });
                    }
                    //this.distarr.set(this.invLineNo, this.arInvoiceForm.get('invDisLines').value);
                    // debugger;
                    this.distarr.set(this.invLineNo, this.distributioArr);
                    console.log(this.distarr)
                    alert(this.distarr.size + 'afterArray')
                    console.log(this.arInvoiceForm.get('invDisLines').value);
                  }
                );
            }
          );

        // this.distarr.set(i, this.arInvoiceForm.get('invDisLines').value);

        // console.log(this.arInvoiceForm.get('invDisLines').value);
      } else {
        alert('kindly enter the base amount and order qty')
      }
      // this.patchResultList(i, this.taxCalforItem);
    }
    this.activeTab = activeTab;
    this.isVisibleArDist = true;
  }

  taxDetails(op, i, taxCategoryId) {
    var arrayControl = this.arInvoiceForm.get('invLines').value
    this.poLineTax = i;
    this.displaytaxDisscountButton = false;
    this.displayTaxDetailForm = false;
    var itemId = arrayControl[this.poLineTax].itemId;
    // var taxCategoryId = taxCategoryId;
    // this.taxCatId = taxCategoryId;

    var diss = arrayControl[i].diss1;
    var baseAmount = arrayControl[this.poLineTax].basicAmt;
    this.service.taxCalforItem(itemId, taxCategoryId, diss, baseAmount)
      .subscribe(
        (data: any[]) => {
          this.taxCalforItem = data;
          // alert(this.taxCalforItem.length);
          console.log(this.taxCalforItem);
          this.patchResultList(i, this.taxCalforItem);

        }
      );

  }
  patchResultList(i, taxCalforItem) {
    console.log(taxCalforItem);

    // alert(i);
    // alert('in patch fn')
    let control = this.arInvoiceForm.get('taxLines') as FormArray
    // this.TaxDetailsArray().controls[i].get('taxLines') as FormArray
    // let control = this.lineDetailsArray.controls[i].get('taxLines') as FormArray
    // alert(control);
    // control.clear();
    // alert('in patch' + this.taxCalforItem);
    // for(let i=0; i<taxCalforItem.length -1; i++){

    // }
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
      }));
    });
    console.log(control);
  }
  onKey(index) {
    console.log(index);
    // alert(index + ' index')
    var arrayControl = this.arInvoiceForm.get('invLines').value
    var patch = this.arInvoiceForm.get('invLines') as FormArray;
    var patchtaxDetail = this.arInvoiceForm.get('taxLines') as FormArray;
    // alert(arrayControl[index].unitSellingPrice)

    if (this.arInvoiceForm.get('class').value == 'Credit Memo') {
      if (Math.sign(arrayControl[index].unitSellingPrice) == 1) {
        alert('Kindly enter the unit selling price as negative value ')
        patch.controls[index].patchValue({ unitSellingPrice: '' }, { basicAmt: '' });
      }
    }
    // alert(arrayControl[index].orderedQty);

    arrayControl[index].baseAmtLineWise = arrayControl[index].unitSellingPrice * arrayControl[index].orderedQty;
    patch.controls[index].patchValue({ basicAmt: arrayControl[index].baseAmtLineWise, extendedAmount: arrayControl[index].baseAmtLineWise })
    var baseAmount = arrayControl[index].baseAmtLineWise
    console.log(arrayControl[index].baseAmtLineWise);
    var itemId = arrayControl[index].itemId;
    var taxId = arrayControl[index].taxCategoryId
    // alert(itemId);
    // alert(taxId)
    var diss = 0;
    var sum = 0;
    // var baseAmount = arrayControl[index].basicAmt
    var custTrxTypeId = this.arInvoiceForm.get('custTrxTypeId').value;
    var locId = this.arInvoiceForm.get('locId').value;
    // alert(locId)
    if (locId == null) {
      locId = '000';
    }
    var len1 = this.TaxDetailsArray().length;
    // comment need tgo replace
    if (baseAmount != null && taxId != undefined) {
      // alert('in if');
      this.onOptionTaxCatSelected(index, taxId, null, baseAmount, 'profile-md')
    }
    // console.log(this.poMasterDtoForm.value);


    // alert('for '+this.taxCalforItem.length);


    // index = index+1
    this.baseAmountCal(baseAmount);
    this.CalculateDistribution(index);
  }
  baseAmountCal(baseAmount) {

    this.sum = this.sum + baseAmount;
    // alert(this.sum)
  }

  completeInvoice() {
    var invno = this.arInvoiceForm.get('trxNumber').value;
    // const formValue: IArInvoice = this.transData(this.arInvoiceForm.value);
    this.service.completeInvoice(invno).subscribe(
      (res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.arInvoiceForm.disable();
          this.TaxDetailsArray().disable();
          this.arInvoiceForm.get('invLines').disable();
          this.lineDistributionArray().disable();

          // window.location.reload();
        } else {
          if (res.code === 400) {
            alert(res.message);
            // this.CompanyMasterForm.reset();
            // window.location.reload();
          }
        }
      });


  }

  addDiscount(i) {
    // const formValue: IpostPO = this.poMasterDtoForm.value;
    // formValue.polineNum = this.poLineTax;
    const aa = this.poLineTax;
    // alert(aa);
    var invLine = this.arInvoiceForm.get('invLines').value
    var arrayControl = this.arInvoiceForm.get('taxLines').value
    const invItemId = arrayControl[0].taxItemId
    const lineNo = arrayControl[0].invLineNo
    this.taxCat1 = invLine[lineNo - 1].taxCategoryId
    // this.taxCat1 =arrayControl[this.poLineTax].taxCategoryId
    // console.log(this.taxCat);
    var arrayControltaxAmounts = this.arInvoiceForm.get('taxLines').value;
    // alert(arrayControltaxAmounts[aa])
    var diss = arrayControltaxAmounts[0].totTaxAmt;
    // alert(arrayControltaxAmounts[aa].totTaxAmt);
    var baseAmount = invLine[lineNo - 1].basicAmt;
    // alert(baseAmount);
    // alert(this.poLineTax);

    console.log(invItemId, this.taxCat1, diss, baseAmount);

    let control = this.arInvoiceForm.get('taxLines') as FormArray;
    control.clear();
    // this.taxCatId
    this.service.taxCalforItem(invItemId, this.taxCat1, diss, baseAmount)
      .subscribe(
        (data: any[]) => {
          this.taxCalforItem = data;
          // this.patchResultList(this.poLineTax, this.taxCalforItem);
          var sum = 0;
          for (i = 0; i < this.taxCalforItem.length; i++) {

            if (this.taxCalforItem[i].totTaxPer != 0) {
              sum = sum + this.taxCalforItem[i].totTaxAmt
            }
          }
          const TotAmtLineWise1 = arrayControl[this.poLineTax].baseAmtLineWise
          var tolAmoutLine = sum + TotAmtLineWise1
          // alert(this.taxCalforItem[0].totTaxAmt);
          // var patch = this.poMasterDtoForm.get('poLines') as FormArray;
          // (patch.controls[aa]).patchValue(
          //   {
          //     diss1 : this.taxCalforItem[0].totTaxAmt,
          //     taxAmtLineWise: sum,
          //     totAmtLineWise: tolAmoutLine,
          //   }////////////////////
          // );
          this.TaxDetailsArray().clear()
          for (let i = 0; i < this.taxCalforItem.length; i++) {
            var invLnGrp: FormGroup = this.TaxDetailsGroup();
            this.TaxDetailsArray().push(invLnGrp);
            this.arInvoiceForm.get('taxLines').patchValue(this.taxCalforItem);
          }
          // this.patchResultList(this.poLineTax, this.taxCalforItem);
        });
  }
  accountNoSearchfn(accountNo) {
    this.orderManagementService.accountNoSearchFn(accountNo, this.ouId, this.divisionId)
      // this.service.searchCustomerByAccount(accountNo)
      .subscribe(
        data => {
          this.accountNoSearch = data.obj[0];
          this.accountNoSite = data.obj;
          console.log(this.accountNoSearch);
          let selectedValue = this.paymentTermList.find(v => v.lookupValue === this.accountNoSearch.paymentType);
          this.arInvoiceForm.patchValue({
            billToCustNo: this.accountNoSearch.accountNo,
            billToCustName: this.accountNoSearch.custName,
            shipToCustNo: this.accountNoSearch.accountNo,
            shipToCustName: this.accountNoSearch.custName,
            shipToCustId: this.accountNoSearch.customerId,
            paymentTerm: selectedValue.lookupValueId,
          });

          for (let i = 0; i < this.accountNoSite.length; i++) {
            // alert(this.custSiteList.length + '----' + this.custSiteList[i].ouId + '-----' + sessionStorage.getItem('ouId'));
            // && Number(this.accountNoSite[i].ouId) === Number(sessionStorage.getItem('ouId'))
            if (this.accountNoSite.length === 1) {
              this.arInvoiceForm.patchValue({ siteName: this.accountNoSite[0].siteName });
              this.onOptionsSelectedcustSiteName(this.accountNoSite[0].siteName);
            }
            if (this.accountNoSite.length > 1) {
              if (Number(this.accountNoSite[i].ouId) === Number(sessionStorage.getItem('ouId'))) {
                this.arInvoiceForm.patchValue({ siteName: this.accountNoSite[i].siteName });
                //  this.onOptionsSelectedcustSiteName(this.custSiteList[i].siteName);
              }
            }
            // else if (this.accountNoSite[i].ouId != (sessionStorage.getItem('ouId'))) {
            //   alert('Please Create/Select Operating Unit wise Site to continue process!')
            // }
          }

        }
      );
    // alert(this.arInvoiceForm.get('source').value)
    if (this.billToCustNo != null && this.arInvoiceForm.get('source').value != null && this.arInvoiceForm.get('class').value != null && this.arInvoiceForm.get('custTrxTypeId').value != null && this.arInvoiceForm.get('locId').value != null) {
      this.isVisibleArInvoiceLine = true;
    }

  }

  onOptionsSelectedcustSiteName(siteName) {
    let selSite = this.accountNoSite.find(d => d.siteName === siteName);
    console.log(selSite);
    console.log(this.accountNoSite);

    // alert(selSite.ouId +'-----' + sessionStorage.getItem('ouId'));

    // if (selSite.ouId != (sessionStorage.getItem('ouId'))) {
    //   alert('First Create OU wise Site to continue process!')
    // }
    // else {
    // alert(this.selCustomer)
    this.arInvoiceForm.patchValue({
      billToCustAdd: selSite.billToAddress,
      shipToCustAdd: selSite.shipToAddress,
      shipToSiteId: selSite.shipToLocId,
      billToSiteId: selSite.billToLocId,
      billToCustId: selSite.customerId,
      billcontactNo: selSite.mobile1,
      shipcontactNo: selSite.mobile1,
      custtaxCategoryName: selSite.taxCategoryName,
      // paymentTerm:this.accountNoSearch.paymentTerm,
    })

    // }
    if (this.billToCustNo != null && this.arInvoiceForm.get('source').value != null && this.arInvoiceForm.get('class').value != null && this.arInvoiceForm.get('custTrxTypeId').value != null && this.arInvoiceForm.get('locId').value != null) {
      this.isVisibleArInvoiceLine = true;
    }


  }

  distribution1(k) {
    var arrayControl = this.arInvoiceForm.get('invLines').value;
    var amount = arrayControl[k].extendedAmount;
    var taxableAmt = arrayControl[k].taxRecoverable;
    var custTrxTypeId = this.arInvoiceForm.get('custTrxTypeId').value;
    // alert(custTrxTypeId);
    // for(let j=0; j<this.invLineDetailsArray().length; j++){
    //    amount = amount + arrayControl2[j].amount;
    // }
    if (amount == null) {
      alert('Kindly entered Amount');
    }

    if ((amount != null)) {
      var len = this.lineDistributionArray().length;
      var patch = this.arInvoiceForm.get('invDisLines') as FormArray;
      // var controlDist = this.arInvoiceForm.get('invDisLines').value;
      // if (controlDist[0].distLineNumber != null) {
      // this.lineDistributionArray().push(this.distLineDetails());
      var aa = this.lineDistributionArray().length;
      (patch.controls[aa - 1]).patchValue(
        {
          distLineNumber: aa,
          invoiceLineNum: k + 1
        }
      );
      // }
      // if (controlDist[0].lineTypeLookupCode == null || controlDist[0].distLineNumber == null) {
      //   (patch.controls[len - 1]).patchValue(
      //     {
      //       distLineNumber: len,
      //       invoiceLineNum: k + 1
      //     }
      //   );
      // }
      var len = this.lineDistributionArray().length;
      // let controlinv = this.arInvoiceForm.get('invDisLines') as FormArray;
      let controlDist = this.arInvoiceForm.get('invDisLines') as FormArray;
      var controlPatchDist = this.arInvoiceForm.get('invDisLines').value;
      this.transactionService.DistributionCal(amount, taxableAmt, custTrxTypeId)
        .subscribe(
          data => {
            //             for (let i = 0; i < data.length-len ; i++) {
            //               var invLnGrp: FormGroup = this.distLineDetails();
            //               this.lineDistributionArray().push(invLnGrp);
            //               // (controlinv.controls[i]).patchValue({ lineNumber: 1 });
            //             }
            //             for (let i = 0, j=len; i <= data.length-1 ; i++, j++){
            // // {            this.arInvoiceForm.get('invDisLines').patchValue(data);
            // // controlinv.controls[i].patchValue(data);
            // this.lineDistributionArray().controls[i].patchValue(data[i]);
            //           }
            var totalLen = len + Number(data.length)
            if (len == 1) {
              // alert('in len 1')
              if (controlPatchDist[0].codeCombinationId != null || controlPatchDist[0].lineNum != null) {
                // alert('in data not null')
                for (let i = len; i <= data.length; i++) {
                  // alert('pushing line i '+ i)
                  var invLnGrp: FormGroup = this.distLineDetails();
                  this.lineDistributionArray().push(invLnGrp);
                }
              } else {
                for (let i = len - 1; i < data.length - 1; i++) {
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
              if (controlPatchDist[0].codeCombinationId != null || controlPatchDist[0].lineNum != null) {
                for (let i = 0, z = len; i < data.length; i++, z++) {
                  controlDist.controls[z].patchValue(data[i]);
                  (controlDist.controls[z]).patchValue({ invoiceLineNum: k + 1, lineNum: z + 1 });
                  // (control.controls[z]).patchValue({ invoiceLineNum : k+1});
                  // this.poInvoiceForm.get('distribution').patchValue(data.distribution);
                }
              }
              else {
                for (let i = 0, z = len - 1; i < data.length; i++, z++) {
                  controlDist.controls[z].patchValue(data[i]);
                  (controlDist.controls[z]).patchValue({ invoiceLineNum: k + 1, lineNum: z + 1 });
                }
              }
            } else {

              for (let i = 0, z = len; i < data.length; i++, z++) {
                controlDist.controls[z].patchValue(data[i]);
                (controlDist.controls[z]).patchValue({ invoiceLineNum: k + 1, lineNum: z + 1 });
                // (control.controls[z]).patchValue({ invoiceLineNum : k+1});
                // this.poInvoiceForm.get('distribution').patchValue(data.distribution);
              }
            }
          }
        );
    }
  }


  // SearchInvoices(a,b,c){

  // var custAcno= this.arInvoiceForm.get('shipToCustNo').value
  // var billToSite= this.arInvoiceForm.get('billToSiteId').value
  // var invoiceNum= this.arInvoiceForm.get('trxNumber').value

  // alert("wip....search invoices :"+custAcno +","+billToSite +","+invoiceNum);

  // }

  SearchInvoices() {
    // this.paymentArForm.get('applyTo').disable();

    var custAcno = this.arInvoiceForm.get('shipToCustNo').value
    var billToSite = this.arInvoiceForm.get('billToSiteId').value
    var creditMemoNum = this.arInvoiceForm.get('trxNumber').value
    // var totCrAmt= this.arInvoiceForm.get('invoiceAmount').value
    // this.creditNoteAmount=Math.abs(totCrAmt);

    this.applySaveButton = false;
    this.invLineArray().clear();

    this.service.getCreditMemoSearchByInvoiceNo(custAcno, this.ouId, creditMemoNum)
      .subscribe(
        data => {
          this.lstinvoices = data.obj.invLine;
          console.log(this.lstinvoices);
          var len = this.invLineArray().length;
          // alert("this.lstinvoices.length :"+this.lstinvoices.length +","+len);
          var y = 0;


          //  if (this.lstinvoices.length > 0) {
          //    alert ("in if....");
          //     this.validateStatus = true;
          //     this.arInvoiceForm.get('selectAllflag1').disable();
          //   } else {   alert ("in else....");
          //     this.arInvoiceForm.get('selectAllflag1').disable();
          //     this.validateStatus = false; return;
          //   }

          // alert ("testing....");
          var invCount = this.lstinvoices.length;

          if (invCount > 0) {
            this.validateStatus = true;
            // this.arInvoiceForm.get('selectAllflag1').disable();

            this.totAppliedtAmount = Math.abs(data.obj.totAppliedtAmount);
            this.totUnAppliedtAmount = Math.abs(data.obj.totUnAppliedtAmount);
            this.balanceAmount = Math.abs(data.obj.balanceAmount);
            this.creditNoteAmount = Math.abs(data.obj.creditNoteAmount);

            this.customerId = data.obj.customerId;
            this.customerSiteId = data.obj.customerSiteId;
            this.custAccountNo = data.obj.custAccountNo;
            this.custName = data.obj.custName;

            this.tUapplAmt = this.totUnAppliedtAmount;
            this.tApplAmt = this.totAppliedtAmount;

            for (let i = 0; i < this.lstinvoices.length - len; i++) {
              var invLnGrp: FormGroup = this.invLineDetails();
              this.invLineArray().push(invLnGrp);
            }

            this.arInvoiceForm.get('invApplyList').patchValue(this.lstinvoices);

            /////////////////////////////////////////////////////////
            var patch = this.arInvoiceForm.get('invApplyList') as FormArray;
            var invLineArr = this.arInvoiceForm.get('invApplyList').value;

            for (let i = 0; i < this.lstinvoices.length - len; i++) {
              y = invLineArr[i].balDueAmt.toFixed(2);
              patch.controls[i].patchValue({ balDueAmt: y })
              patch.controls[i].patchValue({ balance1: y })
              var x = invLineArr[i].applAmt.toFixed(2);
              patch.controls[i].patchValue({ applAmt: x })
              patch.controls[i].patchValue({ applyTo: 'INVOICE' })

              // var z1 = this.pipe.transform(this.now, 'y-MM-dd');
              //  patch.controls[i].patchValue({applDate:z1})comment by vinita

              var invAmt = invLineArr[i].invoiceAmount.toFixed(2);
              patch.controls[i].patchValue({ invoiceAmount: invAmt })
            }
          } else {
            alert("No Pending Bills Found against this customer.");
            this.arInvoiceForm.get('selectAllflag1').disable();
            this.validateStatus = false;
          }

        });
  }



  validateLineApplAmt(index) {


    var x = 0;
    var totUnAppAmt = 0;
    var totAppAmt = 0;
    var LineinvAmt = 0;
    var LineApplAmount = 0;
    var invBalAmt = 0;
    var applyReceiptFlag;
    var invLineArr = this.arInvoiceForm.get('invApplyList').value;
    var patch = this.arInvoiceForm.get('invApplyList') as FormArray;

    this.invLineArray().controls[index].get('applyrcptFlag').enable();
    this.applySaveButton = false;
    this.validateStatus = true;

    var lineApplAmt = Number(invLineArr[index].applAmtNew);
    var applyReceiptFlag = invLineArr[index].applyrcptFlag;
    var ytotUnAppAmt = Number(this.totUnAppliedtAmount);
    var ytotAppAmt = Number(this.totAppliedtAmount);

    // patch.controls[index].patchValue({ applyrcptFlag: true })



    if (applyReceiptFlag === true) {

      var LineinvAmt = Number(invLineArr[index].invoiceAmount);
      var LineDueAmt = Number(invLineArr[index].balance1);

      if (lineApplAmt > LineDueAmt || lineApplAmt <= 0 || lineApplAmt > ytotUnAppAmt) {
        // alert("Line: " + (index + 1) + "\nInvoice Amt :" + LineDueAmt + "\nApplied Amt :" + lineApplAmt + "\nLine appiled Amt should be > 0 and <= Line balance Amt and  <=Unapplied Amt");
        patch.controls[index].patchValue({ applAmtNew: '' })
        patch.controls[index].patchValue({ applyrcptFlag: '' })
      }
      else {
        LineinvAmt = invLineArr[index].invoiceAmount;
        LineApplAmount = invLineArr[index].applAmtNew;
        invBalAmt = invLineArr[index].balance1;
        var newBal = 0;
        newBal = invBalAmt - LineApplAmount;
        newBal = Number(newBal.toFixed(2));

        patch.controls[index].patchValue({ balDueAmt: newBal })
        x = 0;

      }

      /////////////////////////////////////////////////////////
      this.CalculateBalance();

      ///////////////////////////////////////////////////////
    }
    else {
      alert("Line-" + index + " : Apply Flag not selected/disabled...Select Apply Flag First.");
      patch.controls[index].patchValue({ applAmtNew: '' });
      patch.controls[index].patchValue({ balDueAmt: invLineArr[index].balance1 });

    }

  }


  CalculateBalance() {

    var patch = this.arInvoiceForm.get('invApplyList') as FormArray;
    var invLineArr = this.arInvoiceForm.get('invApplyList').value;

    // alert ("CalculateBalance...");
    var appCount = 0;
    var len = this.invLineArray().length;
    var len1 = this.lstinvoices.length;
    var ttl = 0;
    this.tApplAmt = this.totAppliedtAmount;
    this.tUapplAmt = this.totUnAppliedtAmount;

    // alert ("tApplAmt :"+this.tApplAmt + "tUapplAmt : "+this.tUapplAmt + " invLineArray.length : "+this.invLineArray().length)

    for (let i = 0; i < this.invLineArray().length; i++) {

      if (invLineArr[i].applAmtNew > 0) {
        ttl = ttl + Number(invLineArr[i].applAmtNew);
      }

      if (invLineArr[i].applyrcptFlag === true) { appCount = appCount + 1; }

    }

    // alert ("ttl ="+ttl);

    if (len1 == appCount) { this.arInvoiceForm.patchValue({ selectAllflag1: true }) }

    // alert("Total Applied Amt :"  +ttl);
    this.tApplAmt = Number(this.tApplAmt) + ttl;
    this.tUapplAmt = Number(this.tUapplAmt) - ttl;
    // this.balanceAmount=   this.tUapplAmt;

  }

  applyReceiptFlag(e, index) {
    //  alert("invoked fn from applyReceiptFlagAll");
    // alert("e  ,index= "+ e +","+index);
    var xyz;
    var tApplAmt;
    var tUappAmt;

    var totUnAppAmt = 0;
    var totAppAmt = 0;
    var LineinvAmt = 0;
    var LineApplAmount = 0;
    var invBalAmt = 0;
    var lineBalDueAmt = 0

    var invLineArr = this.arInvoiceForm.get('invApplyList').value;
    var patch = this.arInvoiceForm.get('invApplyList') as FormArray;

    lineBalDueAmt = Number(invLineArr[index].balance1);
    totUnAppAmt = Number(this.tUapplAmt);
    totAppAmt = Number(this.tApplAmt);



    if (e.target.checked) {
      // alert("applyReceiptFlag-IF selected ");
      // alert("applyReceiptFlag>>> e.target.checked :"  +e.target.checked);


      if (this.tApplAmt >= 0) { totAppAmt = this.tApplAmt; } else { totAppAmt = 0; }
      if (this.tUapplAmt <= 0) {
        alert("Unapplied Balance not availabe to apply to Invoice");
        e.target.checked = false;
        patch.controls[index].patchValue({ applyrcptFlag: false })
        this.invLineArray().controls[index].get('applAmtNew').disable();
        this.invLineArray().controls[index].get('glDateLine').disable();
        return;
      }
      this.invLineArray().controls[index].get('applAmtNew').enable();
      this.invLineArray().controls[index].get('glDateLine').enable();
      if (totUnAppAmt >= lineBalDueAmt) {
        //  alert ("in if section")

        // this.invLineArray().controls[index].get('applAmtNew').enable();
        xyz = LineinvAmt;
        var lbDueAmt = lineBalDueAmt.toFixed(2)
        patch.controls[index].patchValue({ applAmtNew: lbDueAmt })
        LineApplAmount = Number(invLineArr[index].applAmtNew);
        invBalAmt = 0;
        var ibalAmt = invBalAmt.toFixed(2);
        patch.controls[index].patchValue({ balDueAmt: ibalAmt })

        // var z1 = this.pipe.transform(this.now, 'y-MM-dd');comment by vinita
        // patch.controls[index].patchValue({ glDateLine: z1 })comment by vinita
        // patch.controls[i].patchValue({glDate:z1})
        this.CalculateBalance();
      }
      else {

        var appAmt = Number(totUnAppAmt.toFixed(2));
        patch.controls[index].patchValue({ applAmtNew: appAmt })
        LineApplAmount = Number(invLineArr[index].applAmtNew);

        invBalAmt = lineBalDueAmt - totUnAppAmt;
        var newBal = Number(invBalAmt.toFixed(2));
        patch.controls[index].patchValue({ balDueAmt: newBal })

        // var z1 = this.pipe.transform(this.now, 'y-MM-dd');Comment by vinita
        // patch.controls[index].patchValue({ glDateLine: z1 })comment by vinita
        this.CalculateBalance();
      }

    }
    else {

      this.invLineArray().controls[index].get('applAmtNew').disable();
      this.invLineArray().controls[index].get('glDateLine').disable();
      xyz = LineinvAmt;
      lineBalDueAmt = Number(invLineArr[index].balance1);
      LineApplAmount = Number(invLineArr[index].applAmtNew);
      invBalAmt = Number(invLineArr[index].balDueAmt);
      var b1 = lineBalDueAmt.toFixed(2);
      patch.controls[index].patchValue({ balDueAmt: b1 })
      patch.controls[index].patchValue({ applAmtNew: 0 })
      xyz = 0;

      this.CalculateBalance();

      // invBalAmt=invBalAmt+LineApplAmount;
      // var tApp=Number(this.tApplAmt)-LineApplAmount;
      // this.tApplAmt= tApp;
      // this.tApplAmt.toFixed(2);
      // this.tUapplAmt =Number(this.tUapplAmt)+LineApplAmount;
      // this.tUapplAmt.toFixed(2);
      this.arInvoiceForm.patchValue({ selectAllflag1: '' });
    }
  }

  glPrdValidateLine(i: any) {

    // alert("GL Period : " + this.pipe.transform(this.GLPeriodCheck.startDate, 'dd-MM-y') + " - " + this.pipe.transform(this.GLPeriodCheck.endDate, 'dd-MM-y'));
    // alert("GL Period : " + this.GLPeriodCheck.startDate + " - " +this.GLPeriodCheck.endDate);

    var patch = this.arInvoiceForm.get('invApplyList') as FormArray;
    var applLineArr = this.arInvoiceForm.get('invApplyList').value;
    var gld = applLineArr[i].glDateLine;
    // alert("index :"+i + "  gl date - " +gld);
    var tglDate = new Date(gld);
    var sDate = new Date(this.GLPeriodCheck.startDate);
    var tDate = new Date(this.GLPeriodCheck.endDate);
    // alert(tglDate+'--'+ sDate+'--'+tDate);
    if (gld < sDate || gld > tDate) {
      alert("Line :" + (i + 1) + " GL date is not valid.. should be within GL period\nGL Period : " + this.pipe.transform(this.GLPeriodCheck.startDate, 'dd-MM-y') + " - " + this.pipe.transform(this.GLPeriodCheck.endDate, 'dd-MM-y'));
      // var z = this.pipe.transform(this.now, 'y-MM-dd');comment y vinita
      // patch.controls[i].patchValue({ glDateLine: z })comment by vinita
      // patch.controls[i].patchValue({ glDate: z })comment by vinita
      return;
    }
  }

  validateSave() {
    // debugger;
    if (this.GLPeriodCheck === null) {
      this.checkValidation = false;
      alert("GL PERIOD is null. Please update GL period.");
      return;
    }

    var applLineArr = this.arInvoiceForm.get('invApplyList').value;
    var len1 = applLineArr.length;

    this.validateStatus = false;
    this.applySaveButton = false;

    // for (let i = 0; i < len1 ; i++)
    for (let i = len1 - 1; i >= 0; i--) {

      if (this.invLineArray().controls[i].get('applyrcptFlag').value != true) {
        this.invLineArray().removeAt(i);
      } else { this.applySaveButton = true; }


    }


    //  for (let i = 0; i < applLineArr.length ; i++) {
    //   this.invLineArray().controls[i].get('applyrcptFlag').disable();
    //   this.CheckLineValidations(i);

    //  }

    var applLineArr1 = this.arInvoiceForm.get('invApplyList').value;
    var patch = this.arInvoiceForm.get('invApplyList') as FormArray;

    for (let i = 0; i < applLineArr1.length; i++) {

      patch.controls[i].patchValue({ applAmt: applLineArr1[i].applAmtNew });
      patch.controls[i].patchValue({ glDate: applLineArr1[i].glDateLine });

      this.invLineArray().controls[i].get('applyrcptFlag').disable();
      this.invLineArray().controls[i].get('applAmtNew').disable();
      this.invLineArray().controls[i].get('glDateLine').disable();

      this.CheckLineValidations(i);

    }




    if (this.applLineValidation == true) { this.applySaveButton = true; } else { this.applySaveButton = false; }

  }


  CheckLineValidations(i) {

    // alert('addrow index '+i);

    var applLineArr = this.arInvoiceForm.get('invApplyList').value;
    var lineValue1 = applLineArr[i].applAmt;
    var tglDate = new Date(applLineArr[i].glDate);
    var chkFlag = applLineArr[i].applyrcptFlag;
    var j = i + 1;

    if (lineValue1 === undefined || lineValue1 === null || lineValue1 <= 0) {
      alert("Line-" + j + " APPL AMT :  Should  be grater than Zero");
      this.applLineValidation = false;
      return;
    }


    var sDate = new Date(this.GLPeriodCheck.startDate);
    var tDate = new Date(this.GLPeriodCheck.endDate);
    if (tglDate === undefined || tglDate === null || tglDate < sDate || tglDate > tDate) {
      // this.checkValidation = false;
      alert("GL DATE: Should not be null / Should be within GL period.\nGL Period : " + this.GLPeriodCheck.startDate + " - " + this.GLPeriodCheck.endDate);
      // this.glDate = this.pipe.transform(this.now, 'y-MM-dd');
      this.applLineValidation = false;
      return;
    }


    // if (chkFlag === false || chkFlag === null || chkFlag === undefined) {
    //   alert("Line-" + j + " : Line not Selected.Pls Check Mark the Line");
    //   this.applLineValidation = false;
    //   return;
    // }

    this.applLineValidation = true;
  }

  transeData1(val) {
    delete val.divisionId;
    delete val.division;
    delete val.ouId;
    delete val.loginArray;
    delete val.loginName;
    delete val.ouName;
    delete val.locName;
    return val;
  }


  SaveApplyCreditMemo() {
    // alert ("Posting data  to AR RECEIPT appl......")

    if (this.GLPeriodCheck === null) {
      this.checkValidation = false;
      alert("GL PERIOD is null. Please update GL period.");
      return;
    }

    var patch = this.arInvoiceForm.get('invApplyList') as FormArray;
    var applLineArr = this.arInvoiceForm.get('invApplyList').value;

    this.applLineValidation = false;
    var len1 = applLineArr.length;

    for (let i = 0; i < len1; i++) {
      this.CheckLineValidations(i);
    }

    if (this.applLineValidation === false) {
      alert("Apply Validation Failed... \nPosting not done....")
      return;
    } else { alert("Data Validation Successful... ..") }
    // this.CalculateRcptBalances();
    this.applySaveButton = false;


    const formValue: IArInvoice = this.transeData1(this.arInvoiceForm.value);


    let variants = <FormArray>this.invLineArray();
    var crnNumber = this.arInvoiceForm.get('trxNumber').value;
    var crnDate = this.arInvoiceForm.get('invoiceDate').value;
    var customerId = this.arInvoiceForm.get('customerId').value;
    var custAccountNo = this.arInvoiceForm.get('custAccountNo').value;
    var customerSiteId = this.arInvoiceForm.get('customerSiteId').value;
    var custName = this.arInvoiceForm.get('custName').value;

    for (let i = 0; i < this.invLineArray().length; i++) {
      //  let variants = <FormArray>this.invLineArray();

      let variantFormGroup = <FormGroup>variants.controls[i];
      // variantFormGroup.addControl('crnNumber', new FormControl(invoiceNumber, Validators.required));
      // variantFormGroup.addControl('crnDate', new FormControl(invoiceDate, Validators.required));
      variantFormGroup.addControl('customerId', new FormControl(customerId, Validators.required));
      variantFormGroup.addControl('custAccountNo', new FormControl(custAccountNo, Validators.required));
      variantFormGroup.addControl('customerSiteId', new FormControl(customerSiteId, Validators.required));
      variantFormGroup.addControl('custName', new FormControl(custName, Validators.required));

      // patch.controls[i].patchValue({ applAmt: applLineArr[i].applAmtNew });
      // patch.controls[i].patchValue({ glDate: applLineArr[i].glDateLine });
      // patch.controls[i].patchValue({trxDate: this.pipe.transform(applLineArr[i].trxDate,'y-MM-dd')});

    }

    console.log(variants.value);

    this.service.CreditMemmoApplySubmit(variants.value, crnNumber).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);

        this.arInvoiceForm.disable();

      } else {
        if (res.code === 400) {
          alert('Error While Saving Record:-' + res.obj);

        }
      }

    });

  }

  viewAccountingold(trxNumber) {
    // var tranNo=this.arInvoiceForm.get('transactionNo').value;
    this.service.viewAccountingAR(trxNumber)
      .subscribe((res: any) => {
        if (res.code === 200) {
          // this.viewAccountingArdata=res.obj;
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

        } else {
          if (res.code === 400) {
            alert(res.message);
          }
        }
      });

  }


  viewAccounting(trxNumber: any) {
    // alert(receiptNo);
    this.service.viewAccountingAR(trxNumber).subscribe((res: any) => {
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


  //item-without tax 
  lineTaxdetails: any = [];
  lineDisdetails: any = [];
  selTaxLn = 0;
  distValues: any[]
  openTaxDetails(i: number) {
    // debugger;


    var i = Number(i + 1);
    this.selTaxLn = (i);
    this.invLineNo = i;
    // debugger;
    this.lineTaxdetails = this.TaxDetailsArray() as FormArray;
    // this.lineDisdetails = this.lineDistributionArray() as FormArray;
    this.lineTaxdetails.clear();
    // this.lineDisdetails.clear();
    this.TaxDetailsArray().clear();
    // this.lineDistributionArray().clear();
    if (this.taxarr.has(this.selTaxLn)) {
      // alert(i + '---' + this.selTaxLn)
      var taxValues: any = this.taxarr.get(this.selTaxLn);
      for (let x = 0; x < taxValues.length; x++) {
        if (taxValues[x].invLineNo === i) {
          this.lineTaxdetails.push(this.TaxDetailsGroup());
          this.lineTaxdetails.controls[x].patchValue(taxValues[x]);
        }
      }
    }
  }

  CalculateDistribution(index) {
    // this.lineDisdetails = this.lineDistributionArray() as FormArray;
    this.lineDistributionArray().clear();
    var patch = this.arInvoiceForm.get('invLines') as FormArray;
    console.log(patch);
    var control = patch.getRawValue();
    console.log(control);

    // alert(control[index].basicAmt);
    var custTrxTypeId = this.arInvoiceForm.get('custTrxTypeId').value
    var locId = this.arInvoiceForm.get('locId').value;
    var extendedAmount = control[index].basicAmt;
    this.invLineNo = index + 1;
    // alert(control[index].taxCategoryName + '--' + control[index].basicAmt);
    if (control[index].taxCategoryName == null && control[index].basicAmt != null) {
      // this.lineDistributionArray().clear();
      // var exDistData = this.distarr.get(i);  
      // if(exDistData === undefined){
      this.service.distributionApi1(custTrxTypeId, sessionStorage.getItem('ouId'), locId, control[index].basicAmt, extendedAmount)
        .subscribe(
          data1 => {
            var distrRes: any = data1;
            this.distributioArr = [];
            var exLineArr = Array.from(this.distarr.values());
            // debugger;
            for (let i = 0; i < exLineArr.length; i++) {
              var exLines = exLineArr[i];
              for (let j = 0; j < exLines.length; j++) {
                // alert(exLines[j].invoiceLineNum+'-line no--'+ this.invLineNo)
                if (exLines[j].invoiceLineNum == this.invLineNo) {
                  // Avoid adding duplcate data
                  alert('Duplicate Entry');
                } else {

                  this.distributioArr.push(exLines[j]);
                }

                // this.distributioArr.push(exLines[j]);

              }
            }

            for (let i = 0; i < distrRes.length; i++) {
              distrRes[i].invoiceLineNum = this.invLineNo;
              // value check if( distrRes[i].lineNumber === )
              console.log(exLineArr);
              console.log(distrRes)
              this.distributioArr.push(distrRes[i]);
            }
            console.log(this.distributioArr);
            for (let i = 0; i < this.distributioArr.length; i++) {
              var invLnGrp: FormGroup = this.distLineDetails();

              this.lineDistributionArray().push(invLnGrp);
              // alert(i);
            }
            var control = this.arInvoiceForm.get('invDisLines') as FormArray;
            for (let i = 0; i < this.lineDistributionArray().length; i++) {
              control.controls[i].patchValue(this.distributioArr[i]);
              // control.controls[i].patchValue({ lineNum: i + 1 });
            }
            // this.distarr.set(this.invLineNo, this.arInvoiceForm.get('invDisLines').value);
            // debugger;
            this.distarr.set(this.invLineNo, distrRes)
            console.log(this.distarr);
            console.log(this.arInvoiceForm.get('invDisLines').value);
            this.isVisibleArDist = true;
          }
        );
    }

  }
  AllDistribution() {
    // alert('hiiii')
    this.lineDistributionArray().clear();
    var distValues1 = Array.from(this.distarr.values());
    var allDistLn: any = [];
    for (let x = 0; x < distValues1.length; x++) {
      var exLines = distValues1[x];
      for (let y = 0; y < exLines.length; y++) {
        allDistLn.push(exLines[y]);
        var invLnGrp: FormGroup = this.distLineDetails();
        this.lineDistributionArray().push(invLnGrp);
      }
    }

    var control = this.arInvoiceForm.get('invDisLines') as FormArray;
    // alert(allDistLn.length +'--allDistLn' +  this.lineDistributionArray().length);
    for (let y = 0; y < allDistLn.length; y++) {
      // alert(allDistLn[y]);

      control.controls[y].patchValue(allDistLn[y]);
    }
    this.isVisibleArDist = true;
  }

  ViewInvoice() {
    var trxNumber = this.arInvoiceForm.get('trxNumber').value;
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.viewInvnote(trxNumber)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }

}





