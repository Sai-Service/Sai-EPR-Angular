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
  dealerCode:string;
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
  insurerSiteId: number;
  interiors: string;
  rips: string;
  twoTone: string;
  hold: string;
  holdReason: string;
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
  Status1: any;
  public SSitemTypeList: any;
  stockableShow = true;
  costingShow = true;
  internalOrderShow = true;
  assetItemShow = true;
  purchasableShow = true;
  isTaxableShow = true;
  displayCosting = true;
  displayPoCharge = true;
  hsnGstPer: string;
  displayisTaxable = true;
  ssVehical = false;
  ssSpares = false;
  submitted = false;
  public categoryIdList: Array<string> = [];
  public mainModelList: Array<string>[];
  public colorCodeList: Array<string>[];
  public variantCodeList: Array<string>[];
  hsnSacCodeList: any;
  stockable: string;
  costing: string;
  internalOrder: string;
  assetItem: string;
  purchasable: string;
  isTaxable: string;
  costCenter: number;
  itemTypeForCat: string;
  categoryId: number;
  hsnSacCode: string;
  hsnSacCodeDet: any = [];
  taxCategoryListS: any = [];
  taxCategoryListP: any = [];
  userList3: any[] = [];
  lastkeydown3: number = 0;
  uom: string;
  public uomList: Array<string> = [];
  displayInactive = true;
  endDate: Date;
  status: string;
  public statusList: Array<string> = [];
  segment: string;
  description: string;
  segment11: string;
  lookupValueDesc1: string;
  segment2: string;
  lookupValueDesc2: string;
  branch: any;
  lookupValueDesc4: string;
  lookupValueDesc3: string;
  lookupValueDesc5: string;
  poChargeAccount: number;
  displayModal = true;
  segment3: string;
  segment4: string;
  segment5: string;
  showModal: boolean;
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: Array<string> = [];
  taxCategorySale: string;
  taxCategoryPur: string;
  mainModel: string;
  VariantSearch: Array<string>[];
  ColourSearch: Array<string>[];
  colorCode: string = '';
  variantCode: string = '';
  chassisNo: string = '';
  engineNo:string;
  vehicleDelvDate:Date;
  public maxDate = new Date();
  public dealerCodeList: Array<string> = [];
  dealerCode:string;
  fuelType:string;
  vin:string;
  public insSiteList: Array<string>[];
  insurerCompId:number;
  public insNameList: Array<string>[];
  insurerSiteId:number;
  public minDate = new Date();
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
      categoryId: [],
      hsnSacCode: [],
      hsnGstPer: [],
      uom: [],
      status: [],
      endDate: [],
      segment: [],
      description: [],
      segment11: [],
      lookupValueDesc1: [],
      segment2: [],
      lookupValueDesc2: [],
      segment3: [],
      segment4: [],
      segment5: [],
      lookupValueDesc4: [],
      lookupValueDesc3: [],
      lookupValueDesc5: [],
      poChargeAccount: [],
      taxCategorySale: [],
      taxCategoryPur: [],
      mainModel: [],
      colorCode: [],
      variantCode: [],
      chassisNo: [],
      engineNo:[],
      vehicleDelvDate:[],
      dealerCode:[],
      fuelType:[],
      vin:[],
      insurerCompId:[],
      insurerSiteId:[],
    })
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.service.SSitemTypeListFn()
      .subscribe(
        data => {
          this.SSitemTypeList = data;
          console.log(this.SSitemTypeList);
        }
      );

    this.service.uomList()
      .subscribe(
        data => {
          this.uomList = data;
          console.log(this.uomList);
        }
      );

    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
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
      );

      this.service.delearCodeList()
      .subscribe(
        data => {
          this.dealerCodeList = data;
          console.log(this.dealerCodeList);
        }
      );

      this.service.insNameList()
      .subscribe(
        data => {
          this.insNameList = data;
          console.log(this.insNameList);
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
  }




  onHsnCodeSelected(mHsnCode: any) {
    var mHsnCode = mHsnCode.target.value;
    if (mHsnCode != null) {
      this.service.hsnSacCodeDet(mHsnCode)
        .subscribe(
          data => {
            // this.hsnSacCodeList = data;
            this.hsnSacCodeDet = data;
            console.log(this.hsnSacCodeDet);
            this.itemMasterForm.patchValue(this.hsnSacCodeDet.gstPercentage);
            this.hsnGstPer = this.hsnSacCodeDet.gstPercentage;
            alert(this.hsnGstPer)
            this.service.taxCategoryListHSN(this.hsnGstPer, 'SALES')
              .subscribe(data1 => {
                this.taxCategoryListS = data1;
                console.log(this.taxCategoryListS);
                data1 = this.taxCategoryListS;
              });

            this.service.taxCategoryListHSN(this.hsnGstPer, 'PURCHASE')
              .subscribe(
                data1 => {
                  this.taxCategoryListP = data1;
                  console.log(this.taxCategoryListP);
                  data1 = this.taxCategoryListP;
                });
          });
    }
  }
  onOptionsSelected(event: any) {
    this.Status1 = this.itemMasterForm.get('status').value;
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
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
          if (lType === 'NaturalAccount') {
            this.lookupValueDesc4 = this.branch.lookupValueDesc;
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
        let selloc = sessionStorage.getItem('locCode');

        this.segmentName = selloc + '.'
          + this.costCenter + '.'
          + this.poChargeAccount + '.'
          + '0000';
      }
    );

  }


  openCodeComb() {
    let segmentName1 = this.itemMasterForm.get('segmentName').value;
    if (segmentName1 === null) {
      this.itemMasterForm.get('segment11').reset();
      this.itemMasterForm.get('segment2').reset();
      this.itemMasterForm.get('segment3').reset();
      this.itemMasterForm.get('segment4').reset();
      this.itemMasterForm.get('lookupValueDesc1').reset();
      this.itemMasterForm.get('lookupValueDesc2').reset();
      this.itemMasterForm.get('lookupValueDesc3').reset();
      this.itemMasterForm.get('lookupValueDesc4').reset();
      this.itemMasterForm.get('lookupValueDesc5').reset();
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
  }
  stockableEvent(e) {
    if (e.target.checked) {
      this.stockable = 'Y'
    }
    else {
      this.stockable = 'N';
    }
  }


  onOptionsSelectedColor(variant) {
    if (variant === undefined || variant === '') {
    }
    else {
      this.orderManagementService.ColourSearchFn(variant)
        .subscribe(
          data => {
            this.ColourSearch = data;
            console.log(this.ColourSearch);
            this.onKey(0);
          }
        );
    }
  }


  onKey(event: any) {
    if (Number(sessionStorage.getItem('divisionId')) === 1) {
      const aaa = 'MV' + this.variantCode + '-' + this.colorCode + '-' + this.chassisNo;
      this.itemMasterForm.patchValue({ segment: aaa })
    }
    else if (Number(sessionStorage.getItem('divisionId')) === 2) {
      const aaa = 'BV' + this.variantCode + '-' + this.colorCode + '-' + this.chassisNo;
      this.itemMasterForm.patchValue({ segment: aaa })
    }
  }

  onOptionsSelectedVariant(mainModel) {
    if (mainModel != undefined) {
      this.orderManagementService.VariantSearchFn(mainModel)
        .subscribe(
          data => {
            this.VariantSearch = data;
            console.log(this.VariantSearch);
          }
        );
    }
    else { }
  }
  onInsurerNameSelected(customerId: number) {
    this.service.insSiteList(customerId)
      .subscribe(
        data => {
          this.insSiteList = data.customerSiteMasterList;
          console.log(this.insSiteList);
        }
      );
  }
}
