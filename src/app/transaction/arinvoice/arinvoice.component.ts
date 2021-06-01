import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { TransactionService } from '../transaction.service';
import { ManualARInvoiceObj } from './manual-arinvoice-obj';
// import { ManualInvoiceObj } from '../po-invoice/manual-invoice-obj';
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
  taxRecoverable: number;
  extendedAmount: number;
  glDate: Date;
  accountDesc: string;
  // invoiceAmount:number;
}
@Component({
  selector: 'app-arinvoice',
  templateUrl: './arinvoice.component.html',
  styleUrls: ['./arinvoice.component.css']
})

export class ARInvoiceComponent implements OnInit {
  arInvoiceForm: FormGroup;
  branch: any;
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
  ouId: number;
  trxNumber1: string;
  lstcomments: any;
  selectedLine = 0;
  content: number;
  displayModal = true;
  lookupValueDesc4: string;
  lookupValueDesc1: string;
  lookupValueDesc2: string;
  lookupValueDesc3: string;
  lookupValueDesc5: string;
  segment11: string;
  segment2: number;
  showModal: boolean;
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
  status = "Open"
  taxCat1: number;
  glDate = new Date();
  taxAmount: number;

  public distributioArr: any;
  public paymentTermList: Array<string> = [];
  public locIdList: Array<string> = [];
  public locIdListModel: Array<string> = [];
  public sourceList: Array<string> = [];
  public classList: Array<string> = [];
  public invTypeList: Array<string> = [];
  public BranchList: Array<string> = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: Array<string> = [];
  public InterBrancList: Array<string> = [];
  accountNoSearch: any;
  invItemList: any[];
  billToCustNo: number;
  public taxCalforItem: any;
  userList1: any[] = [];
  userList2: any[] = [];
  lastkeydown1: number = 0;
  public taxCategoryList: any;
  public segmentNameList: any;
  subscription: any;
  public taxUistatus: boolean = false;

  public distarray:any[]=[];

  public taxarr = new Map<number, any>();
  public distarr = new Map<number, any>();
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.arInvoiceForm = fb.group({
      // poHeaderId: [],
      source: [],
      class: [],
      locId: [],
      trxNumber1: [],
      trxNumber: [],
      custTrxTypeId: [],
      referenceNo: [],
      dmsInvNo: [],
      dmsOrderNo: [],
      paymentTerm: [],
      invCurrancyCode: [],
      freight: [],
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
      invLines: this.fb.array([this.lineDetailsGroup()]),
      invDisLines: this.fb.array([this.distLineDetails()]),
      taxLines: this.fb.array([this.TaxDetailsGroup()])
    });
  }
  addRow(k) {
    // alert('k '+ k);
    this.lineDetailsArray.push(this.lineDetailsGroup());
    var len = this.lineDetailsArray.length;
    var patch = this.arInvoiceForm.get('invLines') as FormArray;
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
    if (index === 0) {

    } else {
      this.lineDetailsArray.removeAt(index);
    }
    index=index+1;
    this.taxarr.delete(index)
    this.distarr.delete(index);
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
    this.transactionService.paymentTermListFn()
      .subscribe(
        data => {
          this.paymentTermList = data;
          console.log(this.paymentTermList);
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
    this.service.locationIdList()
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

    this.transactionService.invTypeListFN().subscribe(data => {
      this.invTypeList = data;
      console.log(this.invTypeList);

    })
    this.transactionService.invItemList()
      .subscribe(
        data => {
          this.invItemList = data;
          console.log(this.invItemList);
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
    this.service.locationCodeList()
      .subscribe(
        data => {
          this.locIdListModel = data;
          console.log(this.locIdListModel);
        }
      );
      var patch = this.arInvoiceForm.get('invLines') as FormArray;
      (patch.controls[0]).patchValue(
        {
          lineNum: 1,
        }
      );
  }

  arInvoice(arInvoiceForm) { }
  searchByInvoiceNo(trxNumber1) {
    this.arInvoiceForm.reset();
    // this.TaxDetailsArray().clear();
    // this.arInvoiceForm.get('invLines').clear();
    this.lineDistributionArray().clear();
    this.transactionService.searchByInvoiceNoAR(trxNumber1)
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
          this.taxUistatus = true;
          this.arInvoiceForm.patchValue(this.lstcomments, { emitEvent: false });
          // alert('after emit');
          var len = this.lineDetailsArray.length;
          for (let i = 0; i < data.invLines.length - len; i++) {
            var invLnGrp: FormGroup = this.lineDetailsGroup();
            this.lineDetailsArray.push(invLnGrp);
          }
          for (let i = 0; i < data.invDisLines.length ; i++) {
            var invLnGrp: FormGroup = this.distLineDetails();
            this.lineDistributionArray().push(invLnGrp);
          }
          for (let i = 0; i < data.taxLines.length - len; i++) {
            var invLnGrp: FormGroup = this.TaxDetailsGroup();
            this.TaxDetailsArray().push(invLnGrp);
            this.arInvoiceForm.get('taxLines').patchValue(data.taxLines);

          }
          // alert('second emit call')
          this.arInvoiceForm.patchValue(data);

        }
      );
  };
  closeMast() {
    this.router.navigate(['admin']);
  }
  clearFormArray() {
    window.location.reload();
  }

  onOptioninvItemIdSelected(itemId, index) {
    let selectedValue = this.invItemList.find(v => v.segment == itemId);
    // alert(selectedValue.itemId)
    var patch = this.arInvoiceForm.get('invLines') as FormArray;
    patch.controls[index].patchValue({
      itemId: selectedValue.itemId,
      description: selectedValue.description,
      invCategory: selectedValue.categoryId.attribute1,
      uom: selectedValue.uom,
      hsnSacCode: selectedValue.hsnSacCode,
      poChargeAcc: selectedValue.poChargeAccount,
      diss1: 0,

    })
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
  searchFromArray1(arr :any[], regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };

  fnCancatination(index) {
    // alert(index);
    // var arrayControl = this.arInvoiceForm.get('poLines').value
    var patch = this.arInvoiceForm.get('invDisLines') as FormArray;
    // arrayControl[index].segmentName = arrayControl[index].segment11 + '.' + arrayControl[index].segment2 + '.' + arrayControl[index].segment3 + '.' + arrayControl[index].segment4 + '.' + arrayControl[index].segment5 + '.' + arrayControl[index].segment6 + '.' + arrayControl[index].segment7 + '.' + arrayControl[index].segment8 + '.' + arrayControl[index].segment9;
    // alert(this.arInvoiceForm.get('segment11').value)
    var segmentName = this.arInvoiceForm.get('segment11').value + '.'
      + this.arInvoiceForm.get('segment2').value + '.'
      + this.arInvoiceForm.get('segment3').value + '.'
      + this.arInvoiceForm.get('segment4').value + '.'
      + this.arInvoiceForm.get('segment5').value;
    // alert(segmentName)
    patch.controls[index].patchValue({ concatenatedSegment: segmentName })
    this.service.segmentNameList(segmentName)
      .subscribe(
        data => {

          this.segmentNameList = data;
          if (this.segmentNameList.code === 200) {
            patch.controls[index].patchValue({ codeCombinationId: this.segmentNameList.obj.codeCombinationId })
            // if (this.segmentNameList.length == 0) {
            //   alert('Invalid Code Combination');
            // } else {
            //   console.log(this.segmentNameList);
            //   this.codeCombinationId = Number(this.segmentNameList.codeCombinationId)
            // }
          } else if (this.segmentNameList.code === 400) {
            // var arrayControl = this.arInvoiceForm.get('poLines').value
            this.arInvoiceForm.patchValue({ concatenatedSegment: '' })
            // alert(this.segmentNameList.message);

          }
        }
      );
    this.arInvoiceForm.get('segment11').reset();
    this.arInvoiceForm.get('segment2').reset();
    this.arInvoiceForm.get('segment3').reset();
    this.arInvoiceForm.get('segment4').reset();
    this.arInvoiceForm.get('segment5').reset();
    // this.arInvoiceForm.get('segment6').reset();
    this.arInvoiceForm.get('lookupValueDesc1').reset();
    this.arInvoiceForm.get('lookupValueDesc2').reset();
    this.arInvoiceForm.get('lookupValueDesc3').reset();
    this.arInvoiceForm.get('lookupValueDesc4').reset();
    this.arInvoiceForm.get('lookupValueDesc5').reset();
  }

  openCodeComb(i) {
    // alert('hi')
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
      //       var arrayControl = this.arInvoiceForm.get('poLines').value
      //       var patch = this.arInvoiceForm.get('poLines') as FormArray;
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
    // let a = i + 1
    // this.title = "PoLine :" + a;    // Dynamic Data

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
  saveARInvoiceNew() {
    //Get invoice lines
    const formValue: IArInvoice = this.transData(this.arInvoiceForm.value);
    formValue.ouId = this.ouId;
    var arrayControl = this.arInvoiceForm.get('invLines').value;
    var patch = this.arInvoiceForm.get('invLines') as FormArray;
    Array.from(this.taxarr.values());

    

    this.basicAmt = 0;
    this.taxRecoverable = 0;
    this.extendedAmount = 0;

    var custTrxTypeId = this.arInvoiceForm.get('custTrxTypeId').value;
    var locId = this.arInvoiceForm.get('locId').value;
    // alert(locId)
    if (locId == null) {
      locId = '000';
    }
    

    // for (var i = 0; i < arrayControl.length; i++) {
    //   this.basicAmt = this.basicAmt + arrayControl[i].basicAmt;
    //   this.taxRecoverable = this.taxRecoverable + arrayControl[i].taxRecoverable;

    //   alert('***' + this.taxarr.get(i));
      // this.service.taxCalforItem1(sessionStorage.getItem('ouId'), locId, arrayControl[i].basicAmt, arrayControl[i].taxCategoryId, 0)
      //   .subscribe(
      //     (data: any) => {taxarr.push(data)
      //     alert(JSON.stringify(taxarr))});

      // this.service.distributionApi1(custTrxTypeId, sessionStorage.getItem('ouId'), locId, arrayControl[i].basicAmt, arrayControl[i].extendedAmount)
      //               .subscribe(
      //                 data1 => {distarr[i]=(data)
      //                 alert(JSON.stringify(data))
      //                 });


  //}
    
    console.log(this.arInvoiceForm.value);
    let jsonData = this.arInvoiceForm.value;
    
    formValue.extendedAmount = (this.basicAmt + this.taxRecoverable);
    this.arInvoiceForm.patchValue({ invoiceAmount: this.extendedAmount })
    formValue.invoiceAmount = this.extendedAmount;
    formValue.taxAmount = this.taxRecoverable;
    formValue.taxableAmount = this.basicAmt;
    //For loop
    //get tax detailplus store
    //get dist dettailplus store
    //end for loop
    // let manInvObj = Object.assign(new ManualARInvoiceObj(), jsonData);
    // manInvObj.setinvLines(this.arInvoiceForm.value.invLines);
    // manInvObj.setTaxLines(Array.from(this.taxarr.values()));
    // manInvObj.setinvDisLines(Array.from(this.distarr.values()));
    // console.log(JSON.stringify(manInvObj));
    // //save
    this.transactionService.ARInvoiceSubmit(JSON.stringify(formValue)).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
        this.arInvoiceForm.patchValue({ trxNumber: res.obj.trxNumber })

        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          // this.CompanyMasterForm.reset();
          // window.location.reload();
        }
      }
    });

  }
  Save(){
    
    let jsonData=this.arInvoiceForm.value;
    jsonData.ouId = this.ouId;
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
    
      console.log('---' + JSON.stringify(taxStr));
  
    let manArInvObj=Object.assign(new ManualARInvoiceObj(),jsonData);
    manArInvObj.setinvLines(this.arInvoiceForm.value.invLines);
    manArInvObj.setTaxLines(taxStr);
    manArInvObj.setinvDisLines(disStr);
    // manArInvObj.setTaxLines(Array.from(this.taxarr.values()));
    // manArInvObj.setinvDisLines(this.arInvoiceForm.value.invDisLines);
    // manArInvObj.setinvDisLines(Array.from(this.distarr.values()));
    alert(this.distarr.size+'Array')

   
  

    console.log(JSON.stringify(manArInvObj));
    this.transactionService.ARInvoiceSubmit(JSON.stringify(manArInvObj)).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
        this.arInvoiceForm.patchValue({ trxNumber: res.obj.trxNumber })

        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          // this.CompanyMasterForm.reset();
          // window.location.reload();
        }
      }
    });
  }
  saveArInvoice() {
    const formValue: IArInvoice = this.transData(this.arInvoiceForm.value);
    formValue.ouId = this.ouId;
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
    formValue.invoiceAmount = this.extendedAmount;
    formValue.taxAmount = this.taxRecoverable;
    formValue.taxableAmount = this.basicAmt;
    this.transactionService.ARInvoiceSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
        this.arInvoiceForm.patchValue({ trxNumber: res.obj.trxNumber })

        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          // this.CompanyMasterForm.reset();
          // window.location.reload();
        }
      }
    });
  }
  onOptionTaxCatSelected(i, taxcatid, taxCategoryName, basicAmt) {
    var len1 = this.TaxDetailsArray().length;
    this.invLineNo = i+1;
    alert(this.invLineNo);
    // alert(len1 + 'lengthUpdate' + this.taxUistatus);

    if (this.taxUistatus === false) {

      // alert('If call');

      this.TaxDetailsArray().clear();
      this.lineDistributionArray().clear();
      var arrayControl = this.arInvoiceForm.get('invLines').value;
      var patchtaxDetail = this.arInvoiceForm.get('taxLines') as FormArray;
      if (taxcatid === null) {
        let selectedValue = this.taxCategoryList.find(v => v.taxCategoryName == taxCategoryName);
        this.taxCategoryId = selectedValue.taxCategoryId
      }
      else {
        this.taxCategoryId = taxcatid;
      }
      var patch = this.arInvoiceForm.get('invLines') as FormArray;
      (patch.controls[i]).patchValue(
        {
          taxCategoryId: Number(this.taxCategoryId),
        });
      this.itemId = arrayControl[i].itemId;
   //   this.invLineNo = arrayControl[i].lineNum;
      var itemId = arrayControl[i].itemId;
      var diss = 0;
      var sum = 0;
      var baseAmount = arrayControl[i].basicAmt
      // alert(baseAmount + 'basic');
      var custTrxTypeId = this.arInvoiceForm.get('custTrxTypeId').value;
      var locId = this.arInvoiceForm.get('locId').value;
      // alert(locId)
      if (locId == null) {
        locId = '000';
      }
      var len1 = this.TaxDetailsArray().length;
      // alert(baseAmount + " baseAmount" + this.taxCategoryId + " this.taxCategoryId" + diss + " diss")
      if (baseAmount != null && this.taxCategoryId != undefined) {
        this.service.taxCalforItem1(sessionStorage.getItem('ouId'), locId, baseAmount, this.taxCategoryId, diss)
          .subscribe(
            (data: any) => {
              this.taxCalforItem = data.taxLines;
              // this.taxCalforItem.invLineNo=(this.invLineNo);
              
              // this.taxarr.set(i, data.taxLines);
              console.log(this.taxarr);
              console.log(this.taxCalforItem);
              for (let i = 0; i < data.taxLines.length - len1; i++) {
                var invLnGrp: FormGroup = this.TaxDetailsGroup();
                this.TaxDetailsArray().push(invLnGrp);

               }
              // let control = this.arInvoiceForm.get('taxLines') as FormArray;
              // control.clear();
              this.arInvoiceForm.get('taxLines').patchValue(data.taxLines);

              // alert(this.taxCalforItem.length + ' this.taxCalforItem.length')
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
              this.taxarr.set(this.invLineNo,this.arInvoiceForm.get('taxLines').value);
              this.service.distributionApi1(custTrxTypeId, sessionStorage.getItem('ouId'), locId, arrayControl[i].basicAmt, extendedAmount)
                .subscribe(
                  data1 => {
                    this.distributioArr = data1;
                    console.log(this.distributioArr);
                    for (let i = 0; i <= this.distributioArr.length-1; i++) {
                      var invLnGrp: FormGroup = this.distLineDetails();
                      this.lineDistributionArray().push(invLnGrp);
                    }
                    this.arInvoiceForm.get('invDisLines').patchValue(data1);
                    var k = this.lineDistributionArray().length;
                    for (let j = 0; j < data.invDisLines.length; j++) {
                      var invLnGrp: FormGroup = this.distLineDetails();
                      this.lineDistributionArray().push(invLnGrp);
                      
                      // this.distarray.push(invLnGrp);
                    }

                    
                    var control = this.arInvoiceForm.get('invDisLines') as FormArray;
                    for (let i = 0, z = k ; i < data.invDisLines.length; i++, z++) {
                      control.controls[z].patchValue(data.invDisLines[i]);
                     (control.controls[z]).patchValue({ invoiceLineNum: this.invLineNo });
                    }
                    alert('this.lineDistributionArray().length ' + this.lineDistributionArray().length)
                    for (let i = 0; i < this.lineDistributionArray().length; i++) {
           
                      control.controls[i].patchValue({ lineNum: i + 1 });
                      (control.controls[i]).patchValue({ invoiceLineNum: this.invLineNo });
                    }
                    control.controls[0].patchValue({ invoiceLineNum: this.invLineNo })
                    alert(this.distarr.size+'Arraytax')
                    this.distarr.set(this.invLineNo, this.arInvoiceForm.get('invDisLines').value);
                    alert(this.distarr.size+'afterArray')
                    console.log(this.arInvoiceForm.get('invDisLines').value);
                  }
                );
            });
            
            // this.distarr.set(i, this.arInvoiceForm.get('invDisLines').value);
           
                    // console.log(this.arInvoiceForm.get('invDisLines').value);
      } else {
        alert('kindly enter the base amount and order qty')
      }
      // this.patchResultList(i, this.taxCalforItem);
    }
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
    // alert(index+ ' index')
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
    patch.controls[index].patchValue({ basicAmt: arrayControl[index].baseAmtLineWise })
    var baseAmount = arrayControl[index].baseAmtLineWise
    console.log(arrayControl[index].baseAmtLineWise);
    var itemId = arrayControl[index].itemId;
    // alert(itemId);
    // alert(this.taxCategoryId)
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
    // alert(baseAmount + " baseAmount" + this.taxCategoryId + " this.taxCategoryId" + diss + " diss")
    // if (baseAmount != null && this.taxCategoryId != undefined) {
    //   this.service.taxCalforItem1(sessionStorage.getItem('ouId'), locId, baseAmount, this.taxCategoryId, diss)
    //     .subscribe(
    //       (data: any) => {
    //         this.taxCalforItem = data.taxLines;
    //         console.log(this.taxCalforItem);
    //         for (let i = 0; i < data.taxLines.length - len1; i++) {
    //           var invLnGrp: FormGroup = this.TaxDetailsGroup();
    //           this.TaxDetailsArray().push(invLnGrp);
    //         }
    //         // let control = this.arInvoiceForm.get('taxLines') as FormArray;
    //         // control.clear();
    //         this.arInvoiceForm.get('taxLines').patchValue(data.taxLines);

    //         alert(this.taxCalforItem.length + ' this.taxCalforItem.length')
    //         for (let i = 0; i < this.taxCalforItem.length; i++) {

    //           if (this.taxCalforItem[i].totTaxPer != 0) {
    //             sum = sum + this.taxCalforItem[i].totTaxAmt
    //           }
    //           alert(sum + " sum")
    //         }
    //         (patch.controls[index]).patchValue({
    //           // baseAmtLineWise: arrayControl[i].baseAmtLineWise,
    //           taxRecoverable: sum,
    //           extendedAmount: arrayControl[index].basicAmt + sum,
    //         });
    //         var extendedAmount = arrayControl[index].basicAmt + sum;
    //         alert(this.TaxDetailsArray().length + ' this.TaxDetailsArray().length-')
    //         for (let i = 0; i < this.TaxDetailsArray().length; i++) {
    //           patchtaxDetail.controls[i].patchValue({ taxItemId: this.itemId, invLineNo: this.invLineNo })
    //         }
    //         var custTrxTypeId = this.arInvoiceForm.get('custTrxTypeId').value
    //         var len2 = this.lineDistributionArray().length;
    //         this.service.distributionApi1(custTrxTypeId, sessionStorage.getItem('ouId'), locId, arrayControl[index].basicAmt, extendedAmount)
    //           .subscribe(
    //             data1 => {
    //               this.distributioArr = data1;
    //               console.log(this.distributioArr);
    //               for (let i = 0; i < this.distributioArr.length; i++) {
    //                 var invLnGrp: FormGroup = this.distLineDetails();
    //                 this.lineDistributionArray().push(invLnGrp);
    //               }
    //               this.arInvoiceForm.get('invDisLines').patchValue(data1);
    //               var k = this.lineDistributionArray().length;
    //               for (let j = 0; j < data.invDisLines.length; j++) {
    //                 var invLnGrp: FormGroup = this.distLineDetails();
    //                 this.lineDistributionArray().push(invLnGrp);
    //               }
    //               var control = this.arInvoiceForm.get('invDisLines') as FormArray;

    //               for (let i = 0, z = k - 1; i < data.invDisLines.length; i++, z++) {
    //                 alert('invoiceLineNum ' + this.invLineNo)
    //                 control.controls[0].patchValue({ invoiceLineNum: this.invLineNo })
    //                 control.controls[z].patchValue(data.invDisLines[i]);
    //               }
    //               // alert('invoiceLineNum ' + this.invLineNo)
    //               // control.controls[0].patchValue({ invoiceLineNum: this.invLineNo })
    //               alert('this.lineDistributionArray().length ' + this.lineDistributionArray().length)
    //               for (let i = 0; i < this.lineDistributionArray().length; i++) {
    //                 alert('inside for lineno')
    //                 control.controls[i].patchValue({ lineNum: i + 1 })
    //               }
    //             }
    //           );
    //       });
    // }
    if (baseAmount != null && this.taxCategoryId != undefined) {
      this.onOptionTaxCatSelected(index, this.taxCategoryId, null, baseAmount)
    }
    // console.log(this.poMasterDtoForm.value);


    // alert('for '+this.taxCalforItem.length);


    // index = index+1 
    this.baseAmountCal(baseAmount);
  }
  baseAmountCal(baseAmount) {

    this.sum = this.sum + baseAmount;
    // alert(this.sum)
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
    this.orderManagementService.accountNoSearchFn(accountNo, this.ouId)
      .subscribe(
        data => {
          this.accountNoSearch = data;
          console.log(this.accountNoSearch);
          this.arInvoiceForm.patchValue({
            billToCustName: this.accountNoSearch.custName,
            billToCustAdd: this.accountNoSearch.billToAddress,
            shipToCustNo: this.accountNoSearch.accountNo,
            shipToCustName: this.accountNoSearch.custName,
            shipToCustAdd: this.accountNoSearch.shipToAddress,
            shipToCustId: this.accountNoSearch.customerId,
            shipToSiteId: this.accountNoSearch.shipToLocId,
            billToSiteId: this.accountNoSearch.billToLocId,
            billToCustId: this.accountNoSearch.customerId,
          });
        }
      );
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
}


