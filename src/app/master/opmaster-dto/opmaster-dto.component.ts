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
  poHeaderId:number;
  poLineId:number;
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
  totalAmt: string;
  // termsId: string;
  ewayBillNo: string;
  iRNNo: string;
  approveDate: Date;
  dept: number;
  empId: any,
  baseAmount: number;
  suppInvNo: number;
  TransactionNature: string;
  purchaseLocation: string;
  evaluatorName: string;
  exchangeBonusShare: string;
  // context: string;
  // name: string;

  polineNum: number;
  invItemId: number;
  uom: string;
  itemType: string;
  unitPrice: number;
  orderedQty: number;
  totalPrice: number;
  cancelFlag: string;
  cancelBy: string;
  cancelDate: Date;
  cancelReason: string;
  delearCode: string;
  closedCode: string;
  poChargeAcc: number;
  // ouId
  startDate: Date;
  endDate: Date;
  status: string;


}


@Component({
  selector: 'app-opmaster-dto',
  templateUrl: './opmaster-dto.component.html',
  styleUrls: ['./opmaster-dto.component.css']
})
export class OPMasterDtoComponent implements OnInit {
  poMasterDtoForm: FormGroup;
  poHeaderId:number;
  poLineId:number;
  ouId: number;
  poDate: Date;
  poType: string;
  supplierSiteId: number;
  supplierCode: number;
  billToLoc: string;
  shipToLoc: string;
  currencyCode: string;
   authorizationStatus:string;
  // public authorizationStatus = 'Inprogress';
  segment1: string;
  totalAmt: string;
  approveDate: Date;
  dept: number;
  empId: any;
  baseAmount: number;
  suppInvNo: number;
  TransactionNature: string;
  purchaseLocation: string;
  evaluatorName: string;
  exchangeBonusShare: string;
  poChargeAcc: number;
  ewayBillNo: string;
  iRNNo: string;
  uom: string;
  itemType: string;
  unitPrice: number;
  orderedQty: number;
  totalPrice: number;
  cancelFlag: string;
  cancelBy: string;
  cancelDate: Date;
  cancelReason: string;
  delearCode: string;
  closedCode: string;
  polineNum:number;
  // polineNum:any[];
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
  invItemId:number;

  // name: string;
  submitted = false;
  lstcomments: any[];
  lstcomments1: any;
  invItemList:any[];
  siteIdList:any[];
  supplierCodeSelected: any;
  public OUIdList: Array<string> = [];
  public DepartmentList: Array<string> = [];
  // public invItemList: Array<string> = [];
  public supplierCodeList: Array<string> = [];
  public suppIdList: Array<string> = [];
  public BillShipList: Array<string> = [];
  public BillShipList1: Array<string> = [];
  // public siteIdList :Array<string> =[];
  public segmentNameList: any;

  public minDate = new Date();

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.poMasterDtoForm = fb.group({
      
      poHeaderId:[],
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
      poNo: [],
    
      poLines: this.fb.array([this.lineDetailsGroup()])
    });
  }
  ngOnInit(): void {
    // this.polineNum[0]= 1;
    console.log(sessionStorage.getItem('emplId'));
    this.empId = Number(sessionStorage.getItem('emplId'));

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
  }

  lineDetailsGroup() {
    return this.fb.group({
      poLineId:[],
      polineNum: [],
      invItemId: [],
      uom: [],
      itemType: [],
      unitPrice: [],
      orderedQty: [],
      totalPrice: [],
      cancelFlag: [],
      cancelBy: [],
      cancelDate: [],
      cancelReason: [],
      delearCode: [],
      closedCode: [],
      // ouId: [],
      startDate: [],
      endDate: [],
      status: [],
      poChargeAcc: [],

      segmentName:[],
      segment11: [],
      segment2: [],
      segment3: [],
      segment4: [],
      segment5: [],
      segment6: [],
      segment7: [],
      segment8: [],
      segment9: [],   //51
    });
  }

  get lineDetailsArray() {
    return <FormArray>this.poMasterDtoForm.get('poLines')
  }
  addRow() {
    
    this.lineDetailsArray.push(this.lineDetailsGroup());
    this.polineNum=this.polineNum  + 1;
  }
  RemoveRow(index) {
    this.lineDetailsArray.removeAt(index);
  }
  get f() { return this.poMasterDtoForm.controls; }

  poMasterDto(poMasterDtoForm) { }
  // Search(poNo){
  //   alert(poNo)
  // }
  Search(poNo) {
    alert(poNo);
    console.log(this.poMasterDtoForm.value);
    this.service.getsearchByPOHeder(poNo)
      .subscribe(
        data => {
          this.lstcomments1 = data;
          this.poMasterDtoForm.patchValue(this.lstcomments1);
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
    console.log(val);
    return val;
  }
  transUData(val) {
    delete val.id;
    delete val.poNo;
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
    
  //   const authorizationStatus= 'APPROVED';
  //  const approveDate =new Date();
  //   val.obj = {authorizationStatus, approveDate};
    console.log(val);
    return val;
  }
  newPOMast() {
    const formValue: IpostPO = this.transData(this.poMasterDtoForm.value);
    this.service.poSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.authorizationStatus ='Incomplete';

        // this.poMasterDtoForm.reset();
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          this.poMasterDtoForm.reset();
        }
      }
    });
  }
  onSupplierCodeSelected(suppId: any) {
    // alert(suppId);
    this.service.suppIdList(suppId)
      .subscribe(
        data => {
          this.suppIdList = data;
          console.log(this.suppIdList);
          
        }
      );
  }
  onSiteSelected(siteId: any){
    alert(siteId);
    this.service.siteIdList(siteId)
    .subscribe(
      data => {
        this.siteIdList = data;
        console.log(this.siteIdList);
        
      
      }
    );
  }
  // filterCatalogues() {
  //   //  this.authorizationStatus ='Inprogress';
  // }
  Submit() { }
  fnCancatination(segment1, segment2, segment3, segment4, segment5, segment6, segment7, segment8, segment9) {
    const segmentName1 = segment1 + '.' + segment2 + '.' + segment3 + '.' + segment4 + '.' + segment5 + '.' + segment6 + '.' + segment7 + '.' + segment8 + '.' + segment9;
    this.segmentName = segmentName1;
    // this.poChargeAcc = aaa;
    // alert(aaa);
    this.service.segmentNameList(segmentName1)
      .subscribe(
        data => {
          this.segmentNameList = data;
          console.log(this.segmentNameList);
          this.poChargeAcc = this.segmentNameList.codeCombinationId
          // alert(this.poChargeAcc);
        }
      );
  }

 
Approve(){
  const formValue: IpostPO = this.transUData(this.poMasterDtoForm.value);
  this.service.ApprovePo(formValue).subscribe((res: any) => {
    if (res.code === 200) {
      alert('RECORD UPDATED SUCCESSFUILY');
      this.approveDate =new Date();
      // window.location.reload();
    } else {
      if (res.code === 400) {
        alert('ERROR OCCOURED IN PROCEESS');
        this.poMasterDtoForm.reset();
      }
    }
  });
}

DeletePo(segment1){
  alert(segment1)
}

onOptioninvItemIdSelected($event){
  
  // this.invItemId = this.poMasterDtoForm.get('invItemId').value;
  alert(this.invItemId);
  let select = this.invItemList.find(d => d.invItemId === this.invItemId);
  alert(select)
  if (select) {
    // alert(select);
   
    // this.ouId= select.taxCategoryLinesCollection
var index= 0;
for (let ele of select.taxCategoryLinesCollection ){
alert("hi")
  if(ele.taxCategoryName.orgId === this.ouId ){
    alert("hi1")
    if(ele.taxCategoryName.taxCategoryName === null ){
      alert("hi3")
      alert("Tax not attached to item")
    }
  }
}
    
//     for(var element in select.taxCategoryLinesCollection ){
// element.taxCategoryName.orgId;


//     }
    // .taxCategoryName.orgId;
    // alert(this.ouId);
}
}
}
