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
  // ouId
  startDate: Date;
  endDate: Date;
  status: string;
}
// interface IpoMasterDto {
//   ouId: number;
//   poHeaderId: string;
//   poDate: Date;
//   poType: string;
//   // shipToState: string;
//   Contact: number;
//   supplierSiteId: string;
//   supplierCode: string;
//   billToLoc: string;
//   shipToLoc: string;
//   currencyCode: string;
//   authorizationStatus: string;
//   segment1: string;
//   totalAmt: string;
//   polineNum: number;
//   itemType: string;
//   invItemId: number;
//   Rev: string;
//   Category: string;
//   Description: string;
//   uom: string
//   orderedQty: number;
//   unitPrice: number;
//   Promised: Date;
//   NeedBy: Date;
//   SupplierItem: string;
//   SupplierConfigID: string;
//   Amount: number;
//   ChargeAccount: string;
//   Reserved: string;
//   SecondaryUOM: string;
//   SecondaryQuantity: string;
//   Grade: string;
//   suppInvNo: number;
//   ewayBillNo: string;
//   iRNNo: string;
//   approveDate: Date;
//   Buyer: string;
//   termsId: string;
//   deptId: number;
//   emplId: number;
//   baseAmount: number;
// }

@Component({
  selector: 'app-opmaster-dto',
  templateUrl: './opmaster-dto.component.html',
  styleUrls: ['./opmaster-dto.component.css']
})
export class OPMasterDtoComponent implements OnInit {
  poMasterDtoForm: FormGroup;
  // ouId: number;
  // poHeaderId: string;
  // poDate: Date;
  // poType: string;
  // shipToState: string;
  // Contact: number;
  // supplierSiteId: string;
  // supplierCode: string;
  // billToLoc: string;
  // shipToLoc: string;
  // currencyCode: string;
  // authorizationStatus: string;
  // segment1: string;
  // totalAmt: string;
  // polineNum: number;
  // itemType: string;
  // invItemId: number;
  // Rev: string;
  // Category: string;
  // deptId: number;
  // emplId: number;
  // Description: string;
  // uom: string
  // orderedQty: number;
  // unitPrice: number;
  // Promised: Date;
  // NeedBy: Date;
  // SupplierItem: string;
  // SupplierConfigID: string;
  // Amount: number;
  // ChargeAccount: string;
  // Reserved: string;
  // SecondaryUOM: string;
  // SecondaryQuantity: string;
  // Grade: string;
  // id: number;
  // suppInvNo: number;
  // ewayBillNo: string;
  // iRNNo: string;
  // approveDate: Date;
  // Buyer: string;
  // termsId: string;
  // baseAmount: number;

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
  approveDate: Date;
  dept: number;
  empId: any;
  baseAmount: number;
  suppInvNo: number;
  TransactionNature: string;
  purchaseLocation: string;
  evaluatorName: string;
  exchangeBonusShare: string;
  // context: string;
  poNo:string;

  name: string;
  submitted = false;
  lstcomments: any[];
  lstcomments1: any;
  supplierCodeSelected:any;
  public OUIdList: Array<string> = [];
  public DepartmentList: Array<string> = [];
  public invItemList: Array<string> = [];
  public supplierCodeList: Array<string> = [];
  public suppIdList: Array<string> = [];
  public BillShipList: Array<string> = []; 
  public BillShipList1: Array<string> = [];   

  public minDate = new Date();

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.poMasterDtoForm = fb.group({
      // itemRows: this.fb.array([this.inItemRows()]),
      ouId: ['', [Validators.required]],
      // poHeaderId: [],
      poDate: ['', [Validators.required]],
      poType: ['', [Validators.required]],
      segment1: [''],
      // shipToState: [],
      // Contact: [],
      supplierSiteId: [],
      supplierCode: [],
      billToLoc: [],
      shipToLoc: [],
      currencyCode: [],
      authorizationStatus: [],
      totalAmt: [],
      // id: [],
      suppInvNo: [],
      ewayBillNo: [],
      iRNNo: [],
      approveDate: [],
      // Buyer: [],
      // termsId: [],
      TransactionNature: [],
      dept: [],
      baseAmount: [],
      empId: [],
      purchaseLocation: [],
      evaluatorName: [],
      exchangeBonusShare: [],
      poNo:[],
      // context: [],
      // name: [],

      //     ouId: [],
      // poDate:  [],
      // poType:  [],
      // supplierSiteId: string;
      // supplierCode: string;
      // billToLoc: string;
      // shipToLoc: string;
      // currencyCode: string;
      // authorizationStatus: string;
      // segment1: string;
      // totalAmt: string;
      // termsId: string;
      // approveDate: Date;
      // deptId: number;
      // emplId: number,
      // baseAmount: number;
      // suppInvNo: number;
      poLines: this.fb.array([this.lineDetailsGroup()])
    });
  }
  ngOnInit(): void {
    console.log(sessionStorage.getItem('emplId'));
    this.empId = sessionStorage.getItem('emplId');

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
      // polineNum: [],
      // itemType: [],
      // invItemId: [],
      // Rev: [],
      // Category: [],
      // Description: [],
      // uom: [],
      // orderedQty: [],
      // unitPrice: [],
      // Promised: [],
      // NeedBy: [],
      // SupplierItem: [],
      // SupplierConfigID: [],
      // Amount: [],
      // ChargeAccount: [],
      // Reserved: [],
      // SecondaryUOM: [],
      // SecondaryQuantity: [],
      // Grade: [],
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
    });
  }

  get lineDetailsArray() {
    return <FormArray>this.poMasterDtoForm.get('poLines')
  }
  addRow() {
    this.lineDetailsArray.push(this.lineDetailsGroup());
  }
  RemoveRow(index) {
    this.lineDetailsArray.removeAt(index);
  }
  get f() { return this.poMasterDtoForm.controls; }

  poMasterDto(poMasterDtoForm) { }
  // Search(poNo){
  //   alert(poNo)
  // }
  Search(poNo){
    alert(poNo);
    console.log(this.poMasterDtoForm.value);
    this.service.getsearchByPOHeder(poNo)
      .subscribe(
        data => {
          this.lstcomments1 = data;
          // console.log(this.lstcomments1.supplierSiteMasterList);
          this.poMasterDtoForm.patchValue(this.lstcomments1);
          // this.city = this.lstcomments.city
        }
      );
  }
  transData(val) {
    delete val.id;
delete val.poNo;
delete val.poHeaderId;

    return val;
  }
  newPOMast() {
    const formValue: IpostPO = this.transData(this.poMasterDtoForm.value);
    this.service.poSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.poMasterDtoForm.reset();
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
 
}
