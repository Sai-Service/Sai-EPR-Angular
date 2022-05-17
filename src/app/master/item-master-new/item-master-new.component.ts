import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, RequiredValidator } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';

interface IItemMaster {
  segment: string;
  oemWarrentyEndDate: Date;
  description: string;
  loyaltyCardDate: Date;
  categoryId: number;
  uom: string;
  tyreMake: string;
  materialType: string;
  tyreNo: string;
  bookletNo: string;
  toolkit: string;
  fuelType: string;
  costing: string;
  stockable: string;
  purchasable: string;
  costCenter: number;
  hsnSacCode: string;
  hsnGstPer: number;
  internalOrder: string;
  marginCategory: string;
  assetItem: string;
  lotSize: number;
  status: string;
  type: string;
  mainModel: string;
  colorCode: string;
  variantCode: string;
  chassisNo: string;
  engineNo: string;
  vehicleDelvDate: Date;
  manYaer: string;
  // octraiBillDate:Date;
  // octraiType:string;
  warrantyStatus: string;
  ewStatus: string;
  ewStartDate: Date;
  ewEndDate: Date;
  ewPeriod: number;
  ewBookletNo: string;
  smartCardNumber: number;
  ewInsurerId: string;
  ewInsurerSite: string;
  itemType: string;
  insurerCompId: string;
  insurerSiteId: string;
  interiors: string;
  rips: string;
  twoTone: string;
  hold: string;
  holdReason: string;
  // escortLocation:string;
  // escortReceipt:string;
  // escortReceiptDt:Date;
  // escortAmount:number;
  // bwhLocation:string;
  // bwhDebitMemo:number;
  // bwhDebitMemoDt:Date;
  // bwhEscortNo:number;
  cngKitNumber: number;
  cngCylinderNo: number;
  keyNo: number;
  batteryMake: string;
  batteryNo: string;
  loyaltyCardNumber: string;
  fastTagIssueDate: Date;
  fastTagNo: string;
  smartCardIssueDate: Date;
  tempRegNo: string;
  tempRegDate: Date;
  poChargeAccount: number;
  vin: string;
  isTaxable: string;
  taxCategoryPur: number;
  taxCategorySale: number;
}

@Component({
  selector: 'app-item-master-new',
  templateUrl: './item-master-new.component.html',
  styleUrls: ['./item-master-new.component.css']
})
export class ItemMasterNewComponent implements OnInit {
  itemMasterForm: FormGroup;
  segmentName: string;
  segment1: string;
  lstcomments: any[];
  disItemCode = true;
  public SSitemTypeList: any;
  stockableShow = true;
  costingShow = true;
  internalOrderShow = true;
  assetItemShow = true;
  purchasableShow = true;
  isTaxableShow = true;
  displayCosting = true;
  displayPoCharge = true;
  displayisTaxable = true;
  ssVehical = false;
  ssSpares = false;
  submitted = false;
  public categoryIdList: Array<string> = [];
  public mainModelList: Array<string>[];
  public colorCodeList: Array<string>[];
  public variantCodeList: Array<string>[];
  public hsnSacCodeList: Array<string>[];
  stockable: string;
  costing: string;
  internalOrder: string;
  assetItem: string;
  purchasable: string;
  isTaxable: string;
  costCenter: number;
  itemTypeForCat: string;
  categoryId:number;
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService) {
    this.itemMasterForm = fb.group({
      segmentName: [],
      segment1: [],
      stockable: [''],
      costing: [],
      internalOrder: [],
      assetItem: [],
      purchasable: [],
      isTaxable: [],
      costCenter: [],
      itemTypeForCat: [],
      categoryId:[],
    })
  }

  ngOnInit(): void {
    
    this.service.SSitemTypeListFn()
      .subscribe(
        data => {
          this.SSitemTypeList = data;
          console.log(this.SSitemTypeList);
        }
      );
  }

  get f() { return this.itemMasterForm.controls; }


  itemMaster(itemMaster: any) {
  }


  SearchItemCode(segment) {
    // this.dispupdate = false;
    this.service.getItemCodePach(segment)
      .subscribe(
        data => {
          this.lstcomments = data;
          // this.taxCategoryDataList = data.taxCategoryNameList;
          this.itemMasterForm.patchValue(this.lstcomments);

          // let selloc = sessionStorage.getItem('locCode');

          // this.segmentName = selloc + '.'
          //   + this.costCenter + '.'
          //   + this.poChargeAccount + '.'
          //   + '0000';

          // if (data.itemTypeForCat == 'ss_vehicle') {
          //   this.ssVehical = true;
          // }
          // if (data.itemTypeForCat == 'ss_spares') {
          //   this.ssSpares = true;
          // }
        }
      );
  }


  onOptionsSelectedItemType(category: any) {
    var category = category.target.value;
    // alert("onOptionsSelectedItemType");
    if (category == 'SS_VEHICLE') {
      this.disItemCode = false;
    } else {
      this.disItemCode = true;
    }
    let select = this.SSitemTypeList.find(d => d.itemType === category);
    // alert(select.assetItem);
    if (select.stockable == 'Y') { this.stockableShow = false; this.stockable = 'Y' }
    if (select.stockable == 'N') { this.stockableShow = true; this.stockable = 'N' }
    if (select.costing == 'Y') { this.costingShow = false; this.displayCosting = false; this.costing = 'Y' }
    if (select.costing == 'N') { this.costingShow = true; this.costing = 'N' }
    if (select.internalOrder == 'Y') { this.internalOrderShow = false; this.internalOrder = 'Y' }
    if (select.internalOrder == 'N') { this.internalOrderShow = true; this.internalOrder = 'N' }
    if (select.assetItem == 'Y') { this.assetItemShow = false; this.assetItem = 'Y' }
    if (select.assetItem == 'N') { this.assetItemShow = true; this.assetItem = 'N' }
    if (select.purchable == 'Y') { this.purchasableShow = false; this.displayPoCharge = false; this.purchasable = 'Y' }
    if (select.purchable == 'N') { this.purchasableShow = true; this.purchasable = 'N' }
    if (select.isTaxable == 'Y') { this.isTaxableShow = false; this.displayisTaxable = false; this.isTaxable = 'Y' }
    if (select.isTaxable == 'N') { this.isTaxableShow = true; this.isTaxable = 'N' }

    this.service.categoryIdList1(category, sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          this.categoryIdList = data;
          console.log(this.categoryIdList);
        }
      );
    if (category == 'SS_VEHICLE') {
      this.ssVehical = true; this.ssSpares = false;
      this.costCenter = select.costCenter
    }
    if (category == 'SS_SPARES') { this.ssVehical = false; this.ssSpares = true; }

    if (category === undefined) {
    }
    else {

      this.service.mainModelListByDivisionId()
        .subscribe(
          data => {
            this.mainModelList = data;
            console.log(this.mainModelList);
          }
        );

      this.service.colorCodeList()
        .subscribe(
          data => {
            this.colorCodeList = data;
            console.log(this.colorCodeList);
          }
        );

      this.service.variantCodeList()
        .subscribe(
          data => {
            this.variantCodeList = data;
            console.log(this.variantCodeList);
          }
        );
      if (this.stockable === 'Y') {
        // alert(this.stockable)
        this.service.hsnSacCodeData('HSN').subscribe(
          data => {
            this.hsnSacCodeList = data;
            console.log(this.hsnSacCodeList);

          }

        )
      }
      else {
        this.service.hsnSacCodeData('SAC').subscribe(
          data => {
            this.hsnSacCodeList = data;
          }

        )
      }
    }


    // this.itemMasterForm.get('hsnGstPer').reset();
    // this.itemMasterForm.get('hsnSacCode').reset();
    // this.taxCategoryListS = null;
    // this.taxCategoryListP = null;

  }

}
