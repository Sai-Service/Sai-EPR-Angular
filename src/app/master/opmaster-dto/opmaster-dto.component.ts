import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';

interface IpostPO {
  poHeaderId: number;
  poLineId: number;
  ouId: number;
  poDate: Date;
  poType: string;
  supplierSiteId: number;
  supplierCode: number;
  billToLoc: string;
  shipToLoc: string;
  currencyCode: string;
  authorizationStatus: string;
  segment1: string;
  totalAmt: number;
  ewayBillNo: string;
  iRNNo: string;
  approveDate: Date;
  dept: number;
  ouName: string;
  empId: any,
  Description: string;
  baseAmount: number;
  suppInvNo: number;
  TransactionNature: string;
  purchaseLocation: string;
  evaluatorName: string;
  exchangeBonusShare: string;
  ewayBillDate: Date;
  GSTDocumentNo: string
  GSTDocumentDate: Date;
  address: string;
  mobileNo: number;
  kilometer: number;
  transferToNewCarACNo: string;
  paymentToBank: string;
  paymentToCustomer: string;
  holdforPendingDoc: string;
   polineNum: number;
  invItemId: number;
  invDescription:string;
  invCategory:string;
  uom: string;
  hsnSacCode: string;
  taxCategoryName: string;
  itemType: string;
  unitPrice: number;
  orderedQty: number;
  baseAmtLineWise: number;
  delearCode: string;
  poChargeAcc: number;
  taxAmtLineWise: number;
  totAmtLineWise: number;

  lineNumber: number;
  taxRateName: string;
  taxTypeName: string;
  taxPointBasis: string;
  precedence1: number;
  precedence2: number;
  precedence3: number;
  precedence4: number;
  precedence5: number;
  precedence6: number;
  precedence7: number;
  precedence8: number;
  precedence9: number;
  precedence10: number;
  // currencyCode:string;
  totTaxAmt: number;
  totTaxPer: number;
  recoverableFlag: string;
  selfAssesedFlag: string;
  inclusiveFlag: string;
}


@Component({
  selector: 'app-opmaster-dto',
  templateUrl: './opmaster-dto.component.html',
  styleUrls: ['./opmaster-dto.component.css']
})
export class OPMasterDtoComponent implements OnInit {
  poMasterDtoForm: FormGroup;
  poHeaderId: number;
  poLineId: number;
  ouId: number;
  public poDate = new Date();
  public poType = 'Standard Purchase Order'
  supplierSiteId: number;
  supplierCode: number;
  billToLoc: string;
  shipToLoc: string;
  public currencyCode = 'INR'
  authorizationStatus: string;
  segment1: string;
  totalAmt: number;
  approveDate: Date;
  dept: string;
  empId: any;
  name: string;
  ouName: string;
  Description: string;
  totTaxAmt: number;
  baseAmount: number;
  suppInvNo: number;
  TransactionNature: string;
  purchaseLocation: string;
  evaluatorName: string;
  exchangeBonusShare: string;
  ewayBillDate: Date;
  GSTDocumentNo: string
  GSTDocumentDate: Date;
  address: string;
  mobileNo: number;
  kilometer: number;
  transferToNewCarACNo: string;
  paymentToBank: string;
  paymentToCustomer: string;
  holdforPendingDoc: string;
  poChargeAcc: number;
  ewayBillNo: string;
  iRNNo: string;
  uom: string;
  invDescription:string;
  invCategory:string;
  hsnSacCode: string;
  taxCategoryName: string;
  divisionName: string;
  taxCategoryId: number;
  itemType: string;
  unitPrice: number;
  orderedQty: number;
  baseAmtLineWise: number;
  delearCode: string;
  polineNum: number;
  taxAmtLineWise: number;
  totAmtLineWise: number;
  contextValue: string;
  startDate: Date;
  endDate: Date;
  status: string;
  poNo: string;

  segment11: string;
  segment2: number;
  segment3: number;
  segment4: number;
  segment5: number;
  segment6: number;
  segment7: number;
  segment8: number;
  segment9: number;
  segmentName: string;
  invItemId: number;
  public searchInput: String = '';
  public searchResult: Array<any> = [];
  public seriesList: Array<any> = []
 
  lineNumber: number;
  taxRateName: string;
  taxTypeName: string;
  taxPointBasis: string;
  precedence1: number;
  precedence2: number;
  precedence3: number;
  precedence4: number;
  precedence5: number;
  precedence6: number;
  precedence7: number;
  precedence8: number;
  precedence9: number;
  precedence10: number;
  totTaxPer: number;
  recoverableFlag: string;
  taxCatId: number;
  selfAssesedFlag: string;
  inclusiveFlag: string;
  displayNewButton = true;
  displaytaxDisscountButton = true;
  displayTaxDetailForm = true;
  displayContexValue = true;
  totAmtDiss = true;
  displayButton = true;
  displayLine = true;
  DissRecoverableFlag = false;
  DissinclusiveFlag = false;
  DissselfAssesedFlag = false;
  disTaxDiss: Array<boolean> = [];
  taxCat: string;
  sum = 0;
  segmentName1: string;
  poLineTax: number;
  private mdlSampleIsOpen: boolean = false;

  submitted = false;
  lstcomments: any[];
  taxList: any[];
  lstcomments1: any;
  invItemList: any[];
  siteIdList: any;
  supplierCodeSelected: any;
  public OUIdList: Array<string> = [];
  public DepartmentList: Array<string> = [];
  DepartmentListById: any;
  public supplierCodeList: Array<string> = [];
  public suppIdList: Array<string> = [];
  public BillShipList: Array<string> = [];
  public BillShipList1: Array<string> = [];
  public DivisionIDList: Array<string> = [];
  public locIdList: Array<string> = [];
  public companyCodeList: Array<string> = [];
  public BranchList: Array<string> = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: Array<string> = [];
  public InterBrancList: Array<string> = [];
  public FutureList: Array<string> = [];
  public SubAccountList: Array<string> = [];
  public statusList: Array<string> = [];
  public poTypeList: Array<string> = [];
  public YesNoList: Array<string> = [];
  public taxCalforItem: any[];
  public ItemDetailsList: any;
  public segmentNameList: any;

  public minDate = new Date();

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.poMasterDtoForm = fb.group({

      poHeaderId: [],
      ouId: ['', [Validators.required]],
      poDate: ['', [Validators.required]],
      poType: ['', [Validators.required]],
      segment1: [''],
      supplierSiteId: [],
      segmentName: [],
      supplierCode: [],
      billToLoc: [],
      shipToLoc: [],
      currencyCode: [],
      authorizationStatus: [],
      totalAmt: [],
      suppInvNo: [],
      ewayBillNo: [],
      iRNNo: [],
      approveDate: ['', [Validators.nullValidator]],
      TransactionNature: [],
      dept: [],
      baseAmount: [],
      empId: [],
      purchaseLocation: [],
      evaluatorName: [],
      exchangeBonusShare: [],
      delearCode: [],
      ewayBillDate: [],
      GSTDocumentNo: [],
      GSTDocumentDate: [],
      poNo: [],
      recoverableFlag: [],
      selfAssesedFlag: [],
      inclusiveFlag: [],
      Description: [''],

      totTaxAmt: [],
      ouName: [],
      name: [],
      contextValue: [],
      divisionName: [],
      address: [],
      mobileNo: [],
      kilometer: [],
      transferToNewCarACNo: [],
      paymentToBank: [],
      paymentToCustomer: [],
      holdforPendingDoc: [],
      poLines: this.fb.array([this.lineDetailsGroup()]),
     
    });
  }
  ngOnInit(): void {

    console.log(sessionStorage.getItem('emplId'));
    this.empId = Number(sessionStorage.getItem('emplId'));
    this.dept = (sessionStorage.getItem('dept'));
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.name = (sessionStorage.getItem('name'));
    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );

    this.service.OUIdList()
      .subscribe(
        data => {
          this.OUIdList = data;
          console.log(this.OUIdList);
        }
      );
    this.service.DepartmentList()
      .subscribe(
        data => {
          this.DepartmentList = data;
          console.log(this.DepartmentList);
        }
      );
  this.service.DepartmentListById(this.dept)
      .subscribe(
        data => {
          this.DepartmentListById = data;
          console.log(this.DepartmentListById.divisionName);
          this.poMasterDtoForm.patchValue(this.DepartmentListById.divisionName);
          this.divisionName = this.DepartmentListById.divisionName
        }
      );

    this.service.invItemList()
      .subscribe(
        data => {
          this.invItemList = data;
          console.log(this.invItemList);
        }
      );

    this.service.supplierCodeList()
      .subscribe(
        data => {
          this.supplierCodeList = data;
          console.log(this.supplierCodeList);
        }
      );
 this.service.poTypeList()
      .subscribe(
        data => {
          this.poTypeList = data;
          console.log(this.poTypeList);
        }
      );
    this.service.getLocationSearch()
      .subscribe(
        data => {
          this.BillShipList = data;
          console.log(this.BillShipList);
        }
      );
    this.service.getLocationSearch()
      .subscribe(
        data => {
          this.BillShipList1 = data;
          console.log(this.BillShipList1);
        }
      );
    this.service.locationCodeList()
      .subscribe(
        data => {
          this.locIdList = data;
          console.log(this.locIdList);
        }
      );
    this.service.DivisionIDList()
      .subscribe(
        data => {
          this.DivisionIDList = data;
          console.log(this.DivisionIDList);
        }
      );
    this.service.companyCodeList()
      .subscribe(
        data => {
          this.companyCodeList = data;
          console.log(this.companyCodeList);
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
    this.service.FutureList()
      .subscribe(
        data => {
          this.FutureList = data;
          console.log(this.FutureList);
        }
      );
    this.service.SubAccountList()
      .subscribe(
        data => {
          this.SubAccountList = data;
          console.log(this.SubAccountList);
        }
      );
    this.service.YesNoList()
      .subscribe(
        data => {
          this.YesNoList = data;
          console.log(this.YesNoList);
        }
      )
    if (this.authorizationStatus == null) {

    }
  }

  newLineS(): FormGroup {
    return this.fb.group({
      
      poLines: this.fb.array([])
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
    });
  }
  // addRowFTax(index) {
  //   alert('in add tax details'+index);
  //   this.TaxDetailsArray.push(this.TaxDetailsGroup());
  // }

  // get TaxDetailsArray() {
  //   return <FormArray>this.poMasterDtoForm.get('taxAmounts')
  // }
  TaxDetailsArray(i: number): FormArray {
    return this.lineDetailsArray.controls[i].get('taxAmounts') as FormArray
  }

  lineDetailsGroup() {
    return this.fb.group({
      poLineId: [],
      polineNum: [],
      invItemId: [],
      invDescription:[],
      invCategory:[],
      uom: [],
      hsnSacCode: [],
      taxCategoryName: [],
      itemType: [],
      unitPrice: [],
      orderedQty: [],
      baseAmtLineWise: [],
      poChargeAcc: [],
      taxCategoryId: [],
      segmentName: [],
      segment11: [],
      segment2: [],
      segment3: [],
      segment4: [],
      segment5: [],
      segment6: [],
      segment7: [],
      segment8: [],
      segment9: [],
      taxAmtLineWise: [],
       totAmtLineWise: [], 
      taxAmounts: this.fb.array([])

    });
  }

  get lineDetailsArray() {
    var patch = this.poMasterDtoForm.get('poLines') as FormArray;
    (patch.controls[0]).patchValue(
      {
        polineNum: 1,
      }
    );
    return <FormArray>this.poMasterDtoForm.get('poLines')
  }

  patchResultList(i, taxCalforItem) {

    let control = this.lineDetailsArray.controls[i].get('taxAmounts') as FormArray
    // alert('in patch'+ control);
    this.taxCalforItem.forEach(x => {
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
  }
 
  removeTaxAmount(i: number) {
    // this.TaxDetailsArray.removeAt(i);
  }

  addRow1(index) {
    alert(index);
    // const lineGr =  this.lineDetailsGroup();
    this.lineDetailsArray.push(this.lineDetailsGroup());
    var aa = index + 1;
    alert(aa);

    this.lineDetailsArray.at[index].patchValue([{
      polineNum: aa,
    }])
  }
  addRow(index) {
    alert(index);
    index = index + 1
    this.lineDetailsArray.push(this.lineDetailsGroup());
    var aa = index + 1;
    var patch = this.poMasterDtoForm.get('poLines') as FormArray;
    (patch.controls[index]).patchValue(
      {
        polineNum: aa,
      }
    );
    
  }
  RemoveRow(index) {
    this.lineDetailsArray.removeAt(index);
  }
  get f() { return this.poMasterDtoForm.controls; }

  
  Search(poNo) {
    // alert(poNo);
    console.log(this.poMasterDtoForm.value);
    this.service.getsearchByPOHeder(poNo)
      .subscribe(
        data => {
          this.lstcomments1 = data;
          const status = this.lstcomments1.authorizationStatus;
          if (status === 'Inprogress') {
            this.displayButton = false;
            this.displayNewButton = false;
            let control = this.poMasterDtoForm.get('poLines') as FormArray;
           
            for (let i = 0; i < data.poLines.length - 1; i++) {
              var poLine: FormGroup = this.lineDetailsGroup();
              control.push(poLine);
            }
            this.poMasterDtoForm.patchValue(this.lstcomments1);
          }
          if (status === 'APPROVED') {
            this.displayButton = false;
            this.displayLine = false;
            this.displayNewButton = false;
            let control = this.poMasterDtoForm.get('poLines') as FormArray;
            for (let i = 0; i < data.poLines.length - 1; i++) {
              var poLine: FormGroup = this.lineDetailsGroup();
              control.push(poLine);
            }
            this.poMasterDtoForm.patchValue(this.lstcomments1);
          }
        }
      );
  }
  transData(val) {
    delete val.id;
    delete val.poNo;
    delete val.poHeaderId;
    delete val.poLineId;
    delete val.segment1;
    delete val.posegment11;
    delete val.segment2;
    delete val.segment3;
    delete val.segment4;
    delete val.segment5;
    delete val.segment6;
    delete val.segment7;
    delete val.segment8;
    delete val.segment9;
    delete val.segmentName;
    delete val.recoverableFlag;
    delete val.selfAssesedFlag;
    delete val.inclusiveFlag;
    delete val.totTaxPer;
    // delete val.ouName;
    // delete val.name;
    console.log(val);
    return val;
  }
  transUData(val) {
    delete val.id;
    delete val.poNo;
    delete val.authorizationStatus;
    delete val.approveDate;
    delete val.posegment11;
    delete val.poHeaderId;
    delete val.poLineId;
    delete val.ouId;
    delete val.poDate;
    delete val.poType;
    delete val.supplierSiteId;
    delete val.supplierCode;
    delete val.billToLoc;
    delete val.shipToLoc;
    delete val.currencyCode;
    delete val.totalAmt;
    delete val.ewayBillNo;
    delete val.iRNNo;
    delete val.dept;
    delete val.empId;
    delete val.baseAmount;
    delete val.suppInvNo;
    delete val.TransactionNature;
    delete val.purchaseLocation;
    delete val.evaluatorName;
    delete val.exchangeBonusShare;
    delete val.polineNum;
    delete val.invItemId;
    delete val.uom;
    delete val.itemType;
    delete val.unitPrice;
    delete val.orderedQty;
    delete val.baseAmtLineWise;
    delete val.cancelFlag;
    delete val.cancelBy;
    delete val.cancelDate;
    delete val.cancelReason;
    delete val.delearCode;
    delete val.closedCode;
    delete val.poChargeAcc;
    delete val.startDate;
    delete val.endDate;
    delete val.status;
    delete val.recoverableFlag;
    delete val.selfAssesedFlag;
    delete val.inclusiveFlag;
    delete val.totTaxPer;
    delete val.ouName;
    delete val.name;
    
    return val;
  }
  transUpdateData(val) {
    delete val.id;
    delete val.poNo;
    delete val.authorizationStatus;
    delete val.approveDate;
    delete val.posegment11;
    delete val.poHeaderId;
    delete val.ouId;
    delete val.poDate;
    delete val.poType;
    delete val.supplierSiteId;
    delete val.supplierCode;
    delete val.billToLoc;
    delete val.shipToLoc;
    delete val.currencyCode;
    delete val.totalAmt;
    delete val.ewayBillNo;
    delete val.iRNNo;
    delete val.dept;
    delete val.empId;
    delete val.baseAmount;
    delete val.suppInvNo;
    delete val.TransactionNature;
    delete val.purchaseLocation;
    delete val.evaluatorName;
    delete val.exchangeBonusShare;
    
    delete val.startDate;
    delete val.endDate;
    delete val.status;
    delete val.recoverableFlag;
    delete val.selfAssesedFlag;
    delete val.inclusiveFlag;
    delete val.totTaxPer;
    delete val.ouName;
    delete val.name;
    return val;
  }
  newPOMast() {
   
    this.authorizationStatus = 'Inprogress';
    const formValue: IpostPO = this.transData(this.poMasterDtoForm.value);
     formValue.authorizationStatus = 'Inprogress';
    formValue.ouId = this.ouId;
    formValue.currencyCode = 'INR';
    var arrayControl = this.poMasterDtoForm.get('poLines').value
    this.baseAmount= 0;
    this.totTaxAmt=0;
    this.totalAmt=0;
   
    for (var i = 0; i < arrayControl.length; i++) {
      this.baseAmount = this.baseAmount + arrayControl[i].baseAmtLineWise;
      this.totTaxAmt = this.totTaxAmt + arrayControl[i].taxAmtLineWise;
    }
    this.totalAmt = (this.baseAmount + this.totTaxAmt);
    formValue.totalAmt = this.totalAmt;
    // alert(this.totalAmt);
    formValue.baseAmount = this.baseAmount;
    formValue.totTaxAmt = this.totTaxAmt;
    formValue.poType = 'Standard Purchase Orde';
    this.service.poSubmit(formValue).subscribe((res: any) => {
      var obj = res.obj;
      sessionStorage.setItem('poNo', obj);
      this.segment1 = sessionStorage.getItem('poNo');
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
         this.displayButton = false;
        this.displayNewButton = false;
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          // this.poMasterDtoForm.reset();
        }
      }
    });
  }
  onSupplierCodeSelected(suppId: any) {
 
    this.service.suppIdList(suppId)
      .subscribe(
        data => {
          this.suppIdList = data;
          console.log(this.suppIdList);

        }
      );
  }
  onContextValueSelected(contextValue: any) {
    if (contextValue === 'Y') {
      this.displayContexValue = false;
    } if (contextValue === 'N') {
      this.displayContexValue = true;
    }
  }
  onSiteSelected(siteId: any) {
    // alert(siteId);
    this.service.siteIdList(siteId)
      .subscribe(
        data => {
          this.siteIdList = data;
          console.log(this.siteIdList);
          this.taxCat = this.siteIdList.taxCategoryName
          // alert(this.taxCat);
          if (this.taxCat == null) {
            alert("Tax not attached to site")
            this.displayNewButton = false;
            const sitWithOutTax = 'y';
          }
        }
      );
  }

 
  Submit() { }
 
  fnCancatination(index) {
    // alert(index);


    var arrayControl = this.poMasterDtoForm.get('poLines').value
    var patch = this.poMasterDtoForm.get('poLines') as FormArray;
    arrayControl[index].segmentName = arrayControl[index].segment11 + '.' + arrayControl[index].segment2 + '.' + arrayControl[index].segment3 + '.' + arrayControl[index].segment4 + '.' + arrayControl[index].segment5 + '.' + arrayControl[index].segment6 + '.' + arrayControl[index].segment7 + '.' + arrayControl[index].segment8 + '.' + arrayControl[index].segment9;
    this.segmentName1 = arrayControl[index].segmentName
    console.log(this.segmentName1);
    (patch.controls[index]).patchValue({ segmentName: arrayControl[index].segmentName })

    this.service.segmentNameList(this.segmentName1)
      .subscribe(
        data => {
          this.segmentNameList = data;
          console.log(this.segmentNameList);
          this.poChargeAcc = Number(this.segmentNameList.codeCombinationId)
  
        }
      );
  }

 
  onKey(index) {
    console.log(index);
    var arrayControl = this.poMasterDtoForm.get('poLines').value
    var patch = this.poMasterDtoForm.get('poLines') as FormArray;
    console.log(arrayControl);
    arrayControl[index].baseAmtLineWise = arrayControl[index].unitPrice * arrayControl[index].orderedQty;

    var baseAmount = arrayControl[index].baseAmtLineWise

    console.log(arrayControl[index].baseAmtLineWise);

    console.log((this.poMasterDtoForm.controls['poLines'][index]));

    (patch.controls[index]).patchValue({ baseAmtLineWise: arrayControl[index].baseAmtLineWise });
    // index = index+1 
    this.baseAmountCal(baseAmount);
  }
  baseAmountCal(baseAmount) {

    this.sum = this.sum + baseAmount;
    // alert(this.sum)
  }

  UpdatePOMast() {
    const formValue: IpostPO = this.transUpdateData(this.poMasterDtoForm.value);
    formValue.ouId = this.ouId;
    formValue.currencyCode = 'INR';
    this.service.UpdatePoDetails(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUILY');
        this.displayNewButton = false;
        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.poMasterDtoForm.reset();
        }
      }
    });
  }
  Approve() {
    const formValue: IpostPO = this.transUData(this.poMasterDtoForm.value);
    formValue.ouId = this.ouId;
    formValue.currencyCode = 'INR';
    this.service.ApprovePo(formValue, formValue.segment1).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUILY');
        this.approveDate = new Date();
        this.displayNewButton = false;
        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.poMasterDtoForm.reset();
        }
      }
    });
  }

  DeletePo(segment1) {
    alert(segment1)
  }

  onOptioninvItemIdSelected(index) {
    // alert(index);
    var arrayControl = this.poMasterDtoForm.get('poLines').value
    var patch = this.poMasterDtoForm.get('poLines') as FormArray;
    this.invItemId = arrayControl[index].invItemId
    console.log(this.invItemId, this.taxCat);
    this.service.ItemDetailsList(this.invItemId, this.taxCat, this.billToLoc)
      .subscribe(
        data => {
          this.ItemDetailsList = data;
          console.log(this.ItemDetailsList);
          var patch = this.poMasterDtoForm.get('poLines') as FormArray;
          console.log(patch.controls);
          console.log(patch.controls[index]);
          this.taxCategoryId = this.ItemDetailsList.taxCategoryId
      
          if (this.ItemDetailsList.segmentName === null) {
            (patch.controls[index]).patchValue(
              {
                uom: this.ItemDetailsList.uom,
                hsnSacCode: this.ItemDetailsList.hsnSacCode,
                taxCategoryName: this.ItemDetailsList.taxCategoryName,
                segmentName: this.segmentName1,
                poChargeAcc: Number(this.ItemDetailsList.codeCombinationId),
                taxCategoryId: Number(this.ItemDetailsList.taxCategoryId),
              }
            );
           
          }
          else {
            // alert('segment value is not null');
            (patch.controls[index]).patchValue(
              {
                uom: this.ItemDetailsList.uom,
                hsnSacCode: this.ItemDetailsList.hsnSacCode,
                taxCategoryName: this.ItemDetailsList.taxCategoryName,
                segmentName: this.ItemDetailsList.segmentName,
                poChargeAcc: Number(this.ItemDetailsList.codeCombinationId),
                taxCategoryId: Number(this.ItemDetailsList.taxCategoryId),
              }
            );
            }
          
        }
      );
  }
  UpdatetaxDetails() {

  }




  taxDetails(i, taxCategoryId) {
    // alert(taxCategoryId);
    this.poLineTax = i;
    this.displaytaxDisscountButton = false;
    this.displayTaxDetailForm = false;
    // alert('hi')
    var itemId = this.ItemDetailsList.itemId;
    var taxCategoryId = taxCategoryId;
    this.taxCatId = taxCategoryId;
    var diss = 0;
    var baseAmount = this.sum;
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

  
  addDiscount(i) {
   
    const formValue: IpostPO = this.poMasterDtoForm.value;
    formValue.polineNum = this.poLineTax;
    const aa = this.poLineTax;
     alert(aa);
    var arrayControl = this.poMasterDtoForm.get('poLines').value
    const invItemId = arrayControl[this.poLineTax].invItemId

    console.log(this.poMasterDtoForm);
    var arrayControltaxAmounts = this.lineDetailsArray.controls[aa].get('taxAmounts').value
    // alert(arrayControltaxAmounts[aa])
    var diss = arrayControltaxAmounts[0].totTaxAmt;
    // alert(arrayControltaxAmounts[aa].totTaxAmt);
    var arrayControl = this.poMasterDtoForm.get('poLines').value
    var baseAmount =arrayControl[this.poLineTax].baseAmtLineWise;
  
    console.log(invItemId, this.taxCat, diss, baseAmount);

    let control = this.lineDetailsArray.controls[aa].get('taxAmounts') as FormArray;
    control.clear();
    
    this.service.taxCalforItem(invItemId, this.taxCatId, diss, baseAmount)
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
          // alert('tolAmoutLine ' + tolAmoutLine);
          var patch = this.poMasterDtoForm.get('poLines') as FormArray;
          (patch.controls[aa]).patchValue(
            {
              taxAmtLineWise: sum,
              totAmtLineWise: tolAmoutLine,
            }
          );
          this.patchResultList(this.poLineTax, this.taxCalforItem);
        });
  }


  addDiscount1() {
    // alert('indisscount '+i);
    for (let i = 0; i <= this.taxCalforItem.length; i++) {
      var taxRate = this.taxCalforItem[i].totTaxPer;
      var taxTypeName = this.taxCalforItem[i].taxTypeName;
      if (taxRate == 0) {
        // alert(i + 'taxRate=' + taxRate + ',' + 'taxTypeName=' + taxTypeName);
        this.service.addDiscount(this.totTaxAmt, taxTypeName).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD INSERTED SUCCESSFUILY');
            // this.operatingUnitMasterForm.reset();
          } else {
            if (res.code === 400) {
              alert('Data already present in the data base');
              // this.operatingUnitMasterForm.reset();
            }
          }
        });
      }

    }
  }


  onOptioninvItemIdSelected1($event) {

    let select = this.invItemList.find(d => d.invItemId === this.invItemId);
    alert(select)
    if (select) {
      // alert(select);

      // this.ouId= select.taxCategoryLinesCollection
      var index = 0;
      for (let ele of select.taxCategoryLinesCollection) {
        alert("hi")
        if (ele.taxCategoryName.orgId === this.ouId) {
          alert("hi1")
          if (ele.taxCategoryName.taxCategoryName === null) {
            alert("hi3")
            alert("Tax not attached to item")
          }
        }
      }

    
    }
  }

 
  fetchSeries(value: String) {
    // alert('xyz' + value);
    if (value === '') {
      return this.searchResult = [];
    }
   
    this.searchResult = this.seriesList.filter((series) => {
      return series.name.startsWith(value);
    })
  }

  Apply() {
    const formValue: IpostPO = this.transData(this.poMasterDtoForm.value);
    // formValue.polineNum =this.poLineTax + 1;
    formValue.ouId = this.ouId;
    formValue.currencyCode = 'INR';
    this.service.applyPOTax(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.poMasterDtoForm.reset();
      } else {
        if (res.code === 400) {
          alert('Error while insertion');
          this.poMasterDtoForm.reset();
        }
      }
    });
  }

  clearFormArray() {
    this.poMasterDtoForm.reset();
    // this.lineDetailsArray.controls[i].get('taxAmounts')
    // this.poMasterDtoForm.lineDetailsGroup.TaxDetailsArray.clear();
    this.lineDetailsArray.clear();
  }
  closeMast() {
    this.router.navigate(['admin']);
  }
  poMasterDto(poMasterDtoForm){}
}
