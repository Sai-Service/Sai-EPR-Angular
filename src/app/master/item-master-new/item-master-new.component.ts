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
  categoryName: string;
  uom: string;
  tyreMake: string;
  materialType: string;
  tyreNo: string;
  bookletNo: string;
  toolkit: string;
  fuelType: string;
  dealerCode: string;
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
  taxCategoryPurIGST: number;
  taxCategorySaleIGST: number;
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
  displayGSTPer=true;
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
  ssAccessories = false;
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
  categoryName: string;
  hsnSacCode: string;
  hsnSacCodeDet: any = [];
  taxCategoryListS: any = [];
  taxCategoryListP: any = [];
  taxCategoryListPIGST: any = [];
  taxCategoryListPSAndCGST: any = [];
  taxCategoryListSalesIGST: any = [];
  taxCategoryListSalesSAndCGST: any = [];
  userList3: any[] = [];
  lastkeydown3: number = 0;
  uom: string;
  public uomList: Array<string> = [];
  displayInactive = true;
  displayActiveHeader = true;
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
  taxCategorySale: number;
  taxCategoryPur: number;
  taxCategoryPurIGST: number;
  taxCategorySaleIGST: number;
  mainModel: string;
  VariantSearch: Array<string>[];
  ColourSearch: Array<string>[];
  colorCode: string = '';
  variantCode: string = '';
  chassisNo: string = '';
  engineNo: string;
  vehicleDelvDate: Date;
  public maxDate = new Date();
  public dealerCodeList: Array<string> = [];
  dealerCode: string;
  fuelType: string;
  vin: string;
  public insSiteList: Array<string>[];
  insurerCompId: number;
  public insNameList: Array<string>[];
  insurerSiteId: number;
  public minDate = new Date();
  oemWarrentyEndDate: Date;
  ewBookletNo: string;
  ewPeriod: string;
  ewStartDate: Date;
  ewEndDate: Date;
  ewInsurerId: number;
  public ewInsNameList: any;
  public ewInsurerSiteList: Array<string>[];
  ewInsurerSite: string;
  tempRegNo: string;
  tempRegDate: Date;
  smartCardNumber: string;
  smartCardIssueDate: Date;
  fastTagNo: string;
  fastTagIssueDate: Date;
  loyaltyCardNumber: string;
  loyaltyCardDate: Date;
  monthYrManf: Date;
  cngKitNumber: string;
  cngCylinderNo: string;
  keyNo: string;
  batteryMake: string;
  tyreMake: string;
  tyreNo: string;
  bookletNo: string;
  toolkit: string;
  interiors: string;
  rips: string;
  twoTone: string;
  hold: string;
  displayHold = true;
  public holdReasonList: Array<string>[];
  marginCategory: string;
  materialType: string;
  lotSize: string;
  dispupdate: boolean = true;
  public taxCategoryDataList: Array<string> = [];
  displaytaxCategoryListPSAndCGST = true;
  taxCategoryPurIGSTNm: string;
  displaytaxCategoryListPIGST = true;
  taxCategoryPurNm: string;
  displaytaxCategoryListSalesSAndCGST = true;
  taxCategorySaleIGSTNm: string;
  displaytaxCategoryListSalesIGST = true;
  taxCategorySaleNm: string;
  isVisibleUpdateBtn:boolean=false;


  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService) {
    this.itemMasterForm = fb.group({
      segmentName: [],
      taxCategoryPurNm: [],
      taxCategorySaleIGSTNm: [],
      taxCategorySaleNm: [],
      segment1: [],
      stockable: [''],
      costing: [],
      internalOrder: [],
      assetItem: [],
      purchasable: [],
      isTaxable: [],
      costCenter: ['', [Validators.required]],
      itemTypeForCat: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      categoryName: [],
      hsnSacCode: ['', [Validators.required]],
      hsnGstPer: [],
      uom: ['', [Validators.required]],
      status: [],
      endDate: [],
      segment: ['', [Validators.required]],
      description: ['', [Validators.required]],
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
      poChargeAccount: ['', [Validators.required]],
      taxCategorySale: [],
      taxCategoryPur: [],
      taxCategoryPurIGST: [],
      taxCategorySaleIGST: [],
      mainModel: [],
      colorCode: [],
      variantCode: [],
      chassisNo: [],
      engineNo: [],
      vehicleDelvDate: [],
      dealerCode: [],
      fuelType: [],
      vin: [],
      insurerCompId: [],
      insurerSiteId: [],
      oemWarrentyEndDate: [],
      ewBookletNo: [],
      ewPeriod: [],
      ewEndDate: [],
      ewStartDate: [],
      ewInsurerId: [],
      ewInsurerSite: [],
      tempRegNo: [],
      tempRegDate: [],
      smartCardNumber: [],
      smartCardIssueDate: [],
      fastTagNo: [],
      fastTagIssueDate: [],
      loyaltyCardNumber: [],
      loyaltyCardDate: [],
      monthYrManf: [],
      cngKitNumber: [],
      cngCylinderNo: [],
      keyNo: [],
      batteryMake: [],
      tyreMake: [],
      tyreNo: [],
      bookletNo: [],
      toolkit: [],
      interiors: [],
      rips: [],
      twoTone: [],
      hold: [],
      holdReason: [],
      marginCategory: [],
      materialType: [],
      lotSize: [],
      taxCategoryPurIGSTNm: [],
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

    this.service.holdReasonList()
      .subscribe(
        data => {
          this.holdReasonList = data;
          console.log(this.holdReasonList);
        }
      );
    this.status = 'Active';
  }

  get f() { return this.itemMasterForm.controls; }


  itemMaster(itemMaster: any) {
  }


  SearchItemCode(segment) {
    this.dispupdate = false;
    this.service.getItemCodePach(segment)
      .subscribe(
        data => {
          this.lstcomments = data;
          this.displayActiveHeader = false;
          this.taxCategoryDataList = data.taxCategoryNameList;
          this.itemMasterForm.patchValue(this.lstcomments);
          let selloc = sessionStorage.getItem('locCode');
          this.segmentName = selloc + '.'
            + this.costCenter + '.'
            + this.poChargeAccount + '.'
            + '0000'; //this.lookupValueDesc5
          if (data.itemTypeForCat == 'ss_vehicle') {
            this.ssVehical = true;
          }
          if (data.itemTypeForCat == 'ss_spares') {
            this.ssSpares = true;
            this.ssAccessories = true;
          }
          if (data.isTaxable == 'Y') {
            this.displayisTaxable = false;
          }
          else {
            this.displayisTaxable = true;
          }
          this.itemMasterForm.get('costCenter').disable();
          this.itemMasterForm.get('poChargeAccount').disable();
          // alert(data.taxCategoryNameList);
          this.onHsnCodeSelectedSearch(data.hsnSacCode);
          if (data.stockable === 'Y') {
            // alert(this.stockable)
            this.service.hsnSacCodeData('HSN').subscribe(
              data => {
                this.hsnSacCodeList = data;
                console.log(this.hsnSacCodeList);
              }
            )
            this.service.hsnSacCodeDetNew(data.hsnSacCode)
            .subscribe(
              data => {
                // this.hsnSacCodeList = data;
                this.hsnSacCodeDet = data;
                // alert(this.hsnSacCodeDet.length)
                console.log(this.hsnSacCodeDet);
                if (this.hsnSacCodeDet.length===0){
                  alert('Invalid HSN/SAC Code.! Please Confirm HSN/SAC Code.!')
                }
              else  if (this.hsnSacCodeDet.length==1){
                this.displayGSTPer=true;
                this.itemMasterForm.patchValue(this.hsnSacCodeDet[0].gstPercentage);
                this.hsnGstPer = this.hsnSacCodeDet[0].gstPercentage;
                this.service.taxCategoryListHSN(this.hsnGstPer, 'SALES')
                  .subscribe(data1 => {
                    this.taxCategoryListSalesIGST = data1;
                    let taxCategoryListSalesIGST = this.taxCategoryListSalesIGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == true || customer.taxCategoryName.includes('I GST') == true));
                    console.log(taxCategoryListSalesIGST);
                    this.taxCategoryListSalesIGST = taxCategoryListSalesIGST;
                    this.displaytaxCategoryListSalesIGST = true;
                  });
    
                this.service.taxCategoryListHSN(this.hsnGstPer, 'SALES')
                  .subscribe(data1 => {
                    this.taxCategoryListSalesSAndCGST = data1;
                    let taxCategoryListSalesSAndCGST = this.taxCategoryListSalesSAndCGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == false && customer.taxCategoryName.includes('I GST') == false));
                    console.log(taxCategoryListSalesSAndCGST);
                    this.taxCategoryListSalesSAndCGST = taxCategoryListSalesSAndCGST;
                    this.displaytaxCategoryListSalesSAndCGST = true;
                  });
    
                this.service.taxCategoryListHSN(this.hsnGstPer, 'PURCHASE')
                  .subscribe(
                    data1 => {
                      this.taxCategoryListPIGST = data1;
                      console.log(data1);
                      let purchaseIGSTList = this.taxCategoryListPIGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == true));
                      console.log(purchaseIGSTList);
                      this.taxCategoryListPIGST = purchaseIGSTList;
                      this.displaytaxCategoryListPIGST = true;
                    });
                this.service.taxCategoryListHSN(this.hsnGstPer, 'PURCHASE')
                  .subscribe(
                    data1 => {
                      this.taxCategoryListPSAndCGST = data1;
                      console.log(data1);
                      let taxCategoryListPSAndCGST = this.taxCategoryListPSAndCGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == false));
                      console.log(taxCategoryListPSAndCGST);
                      this.taxCategoryListPSAndCGST = taxCategoryListPSAndCGST;
                      this.displaytaxCategoryListPSAndCGST = true;
                    });
                  }
                  else if (this.hsnSacCodeDet.length !=1){
                    this.displayGSTPer=false;
                  }
              });
          }
          else {
            this.service.hsnSacCodeData('SAC').subscribe(
              data => {
                this.hsnSacCodeList = data;
              }

            )
          }
          // alert(data.taxCategoryPur);
          this.displaytaxCategoryListPSAndCGST = false;
          this.displaytaxCategoryListPIGST = false;
          this.displaytaxCategoryListSalesIGST = false;
          this.displaytaxCategoryListSalesSAndCGST = false;
          if (sessionStorage.getItem('ticketNo')==='2M27189'){
            this.isVisibleUpdateBtn=true;
          }
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
    console.log(select);
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
      this.ssVehical = true; this.ssSpares = false; this.ssAccessories = false;
      this.costCenter = select.costCenter
    }
    if (category == 'SS_SPARES') { this.ssVehical = false; this.ssSpares = true; this.ssAccessories = true }

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


    this.itemMasterForm.get('hsnGstPer').reset();
    this.itemMasterForm.get('hsnSacCode').reset();
    this.taxCategoryListS = null;
    this.taxCategoryListP = null;
    this.taxCategoryListPIGST = null;
    this.taxCategoryListPSAndCGST = null;
    this.taxCategoryListSalesIGST = null;
    this.taxCategoryListSalesSAndCGST = null;
  }

  onHsnCodeSelectedSearch(mHsnCode) {
    //  alert(mHsnCode+'----')
    if (mHsnCode != null) {
      this.service.hsnSacCodeDetNew(mHsnCode)
        .subscribe(
          data => {
            // this.hsnSacCodeList = data;
            this.hsnSacCodeDet = data;
            console.log(this.hsnSacCodeDet);
            this.itemMasterForm.patchValue(this.hsnSacCodeDet[0].gstPercentage);
            this.hsnGstPer = this.hsnSacCodeDet[0].gstPercentage;
            // alert(this.hsnGstPer);
            this.service.taxCategoryListHSN(this.hsnGstPer, 'SALES')
              .subscribe(data1 => {
                this.taxCategoryListSalesIGST = data1;
                let taxCategoryListSalesIGST = this.taxCategoryListSalesIGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == true || customer.taxCategoryName.includes('I GST') == true));
                console.log(taxCategoryListSalesIGST);
                this.taxCategoryListSalesIGST = taxCategoryListSalesIGST;
              });

            this.service.taxCategoryListHSN(this.hsnGstPer, 'SALES')
              .subscribe(data1 => {
                this.taxCategoryListSalesSAndCGST = data1;
                let taxCategoryListSalesSAndCGST = this.taxCategoryListSalesSAndCGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == false && customer.taxCategoryName.includes('I GST') == false));
                console.log(taxCategoryListSalesSAndCGST);
                this.taxCategoryListSalesSAndCGST = taxCategoryListSalesSAndCGST;
              });

            // this.service.taxCategoryListHSN(this.hsnGstPer, 'SALES')
            //   .subscribe(
            //     data1 => {
            //       this.taxCategoryListP = data1;
            //       console.log(this.taxCategoryListP);
            //       data1 = this.taxCategoryListP;
            //     });
            this.service.taxCategoryListHSN(this.hsnGstPer, 'PURCHASE')
              .subscribe(
                data1 => {
                  this.taxCategoryListPIGST = data1;
                  console.log(data1);
                  let purchaseIGSTList = this.taxCategoryListPIGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == true));
                  console.log(purchaseIGSTList);
                  this.taxCategoryListPIGST = purchaseIGSTList;
                });
            this.service.taxCategoryListHSN(this.hsnGstPer, 'PURCHASE')
              .subscribe(
                data1 => {
                  this.taxCategoryListPSAndCGST = data1;
                  console.log(data1);
                  let taxCategoryListPSAndCGST = this.taxCategoryListPSAndCGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == false));
                  console.log(taxCategoryListPSAndCGST);
                  this.taxCategoryListPSAndCGST = taxCategoryListPSAndCGST;
                });


          });
    }
  }


  onHsnCodeSelected(mHsnCode: any) {
    // alert(mHsnCode);
    var mHsnCode = mHsnCode.target.value;
    if (mHsnCode != null) {
      this.service.hsnSacCodeDetNew(mHsnCode)
        .subscribe(
          data => {
            // this.hsnSacCodeList = data;
            this.hsnSacCodeDet = data;
            // alert(this.hsnSacCodeDet.length)
            console.log(this.hsnSacCodeDet);
            if (this.hsnSacCodeDet.length===0){
              alert('Invalid HSN/SAC Code.! Please Confirm HSN/SAC Code.!')
            }
          else  if (this.hsnSacCodeDet.length==1){
            this.displayGSTPer=true;
            this.itemMasterForm.patchValue(this.hsnSacCodeDet[0].gstPercentage);
            this.hsnGstPer = this.hsnSacCodeDet[0].gstPercentage;
            this.service.taxCategoryListHSN(this.hsnGstPer, 'SALES')
              .subscribe(data1 => {
                this.taxCategoryListSalesIGST = data1;
                let taxCategoryListSalesIGST = this.taxCategoryListSalesIGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == true || customer.taxCategoryName.includes('I GST') == true));
                console.log(taxCategoryListSalesIGST);
                this.taxCategoryListSalesIGST = taxCategoryListSalesIGST;
                this.displaytaxCategoryListSalesIGST = true;
              });

            this.service.taxCategoryListHSN(this.hsnGstPer, 'SALES')
              .subscribe(data1 => {
                this.taxCategoryListSalesSAndCGST = data1;
                let taxCategoryListSalesSAndCGST = this.taxCategoryListSalesSAndCGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == false && customer.taxCategoryName.includes('I GST') == false));
                console.log(taxCategoryListSalesSAndCGST);
                this.taxCategoryListSalesSAndCGST = taxCategoryListSalesSAndCGST;
                this.displaytaxCategoryListSalesSAndCGST = true;
              });

            this.service.taxCategoryListHSN(this.hsnGstPer, 'PURCHASE')
              .subscribe(
                data1 => {
                  this.taxCategoryListPIGST = data1;
                  console.log(data1);
                  let purchaseIGSTList = this.taxCategoryListPIGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == true));
                  console.log(purchaseIGSTList);
                  this.taxCategoryListPIGST = purchaseIGSTList;
                  this.displaytaxCategoryListPIGST = true;
                });
            this.service.taxCategoryListHSN(this.hsnGstPer, 'PURCHASE')
              .subscribe(
                data1 => {
                  this.taxCategoryListPSAndCGST = data1;
                  console.log(data1);
                  let taxCategoryListPSAndCGST = this.taxCategoryListPSAndCGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == false));
                  console.log(taxCategoryListPSAndCGST);
                  this.taxCategoryListPSAndCGST = taxCategoryListPSAndCGST;
                  this.displaytaxCategoryListPSAndCGST = true;
                });
              }
              else if (this.hsnSacCodeDet.length !=1){
                this.displayGSTPer=false;
              }
          });
    }
  }

  onhsnGstPerSelected(event){
    // alert(event.target.value);
    var hsnGstPer = event.target.value;
    this.service.taxCategoryListHSN(hsnGstPer, 'SALES')
    .subscribe(data1 => {
      this.taxCategoryListSalesIGST = data1;
      let taxCategoryListSalesIGST = this.taxCategoryListSalesIGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == true || customer.taxCategoryName.includes('I GST') == true));
      console.log(taxCategoryListSalesIGST);
      this.taxCategoryListSalesIGST = taxCategoryListSalesIGST;
      this.displaytaxCategoryListSalesIGST = true;
    });

  this.service.taxCategoryListHSN(hsnGstPer, 'SALES')
    .subscribe(data1 => {
      this.taxCategoryListSalesSAndCGST = data1;
      let taxCategoryListSalesSAndCGST = this.taxCategoryListSalesSAndCGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == false && customer.taxCategoryName.includes('I GST') == false));
      console.log(taxCategoryListSalesSAndCGST);
      this.taxCategoryListSalesSAndCGST = taxCategoryListSalesSAndCGST;
      this.displaytaxCategoryListSalesSAndCGST = true;
    });

  this.service.taxCategoryListHSN(hsnGstPer, 'PURCHASE')
    .subscribe(
      data1 => {
        this.taxCategoryListPIGST = data1;
        console.log(data1);
        let purchaseIGSTList = this.taxCategoryListPIGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == true));
        console.log(purchaseIGSTList);
        this.taxCategoryListPIGST = purchaseIGSTList;
        this.displaytaxCategoryListPIGST = true;
      });
  this.service.taxCategoryListHSN(hsnGstPer, 'PURCHASE')
    .subscribe(
      data1 => {
        this.taxCategoryListPSAndCGST = data1;
        console.log(data1);
        let taxCategoryListPSAndCGST = this.taxCategoryListPSAndCGST.filter((customer) => (customer.taxCategoryName.includes('I-GST') == false));
        console.log(taxCategoryListPSAndCGST);
        this.taxCategoryListPSAndCGST = taxCategoryListPSAndCGST;
        this.displaytaxCategoryListPSAndCGST = true;
      });
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

  onEwInsNameSelected(customerId: any) {

    console.log(customerId);
    let select = this.ewInsNameList.find(d => d.custName == customerId);
    console.log(select.customerId);

    this.SearchonEwInsName(select.customerId);
  }
  SearchonEwInsName(customerId) {

    this.service.ewInsSiteList(customerId)
      .subscribe(
        data => {
          this.ewInsurerSiteList = data;
          console.log(this.ewInsurerSiteList);
        }
      );
  }
  interiorsEvent(e) {
    if (e.target.checked) {
      this.interiors = 'Y'
    }
    else {
      this.interiors = 'N';
    }
  }

  ripsEvent(e) {
    if (e.target.checked) {
      this.rips = 'Y'
    }
    else {
      this.rips = 'N';
    }
  }

  twoToneEvent(e) {
    if (e.target.checked) {
      this.twoTone = 'Y'
    }
    else {
      this.twoTone = 'N';
    }
  }

  holdEvent(e) {
    if (e.target.checked) {
      this.hold = 'Y'
      this.displayHold = false;
    }
    else {
      this.hold = 'N';
      this.displayHold = true;
    }
  }

  message: string = "Please Fix the Errors !";
  msgType: string = "Close";
  getMessage(msgType: string) {
    this.msgType = msgType;
    if (msgType.includes("Save")) {
      this.submitted = true;
      (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
      // if (this.itemMasterForm.invalid) {
      //   alert('Some fields validation error (D)');
      //   (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '');
      //   return;
      // }
      this.message = "Do you want to SAVE the changes(Yes/No)?"

    }

    if (msgType.includes("Update")) {
      this.submitted = true;
      (document.getElementById('updateBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
      if (this.itemMasterForm.invalid) {
        alert('Some fields validation error (D)');
        //this.submitted = false;
        (document.getElementById('updateBtn') as HTMLInputElement).setAttribute('data-target', '');
        return;
      }
      this.message = "Do you want to UPDATE the changes(Yes/No)?"

    }

    if (msgType.includes("Reset")) {
      this.message = "Do you want to Reset the changes(Yes/No)?"
    }

    if (msgType.includes("Close")) {
      this.message = "Do you want to Close the Form(Yes/No)?"
    }
    return;
  }

  executeAction() {
    if (this.msgType.includes("Save")) {
      this.newItemMast();
    }

    if (this.msgType.includes("Update")) {
      this.updateItemMast();
    }

    if (this.msgType.includes("Reset")) {
      this.resetItemMast();
      //       this.itemMasterForm.reset();
    }

    if (this.msgType.includes("Close")) {
      // this.closeItemCatMast();
      this.router.navigate(['admin']);
    }
    return;
  }


  transData(val) {
    delete val.segment11;
    delete val.segment2;
    delete val.segment3;
    delete val.segment4;
    delete val.segment5;
    delete val.lookupValueDesc4;
    delete val.lookupValueDesc1;
    delete val.lookupValueDesc2;
    delete val.lookupValueDesc3;
    delete val.lookupValueDesc5;

    return val;
  }

  newItemMast() {
    // this.submitted = true;
    // if(this.itemMasterForm.invalid){
    //   alert('Error');
    // return;
    // } 
   
    // alert(this.isTaxable);
    var costCenter = this.itemMasterForm.get('costCenter').value;
    var poChargeAccount = this.itemMasterForm.get('poChargeAccount').value;
    if (this.segment == undefined || this.segment == null || this.segment == '') {
      alert('Select Item Code.!');
      return;
    }
    else if (this.description == undefined || this.description == null || this.description == '') {
      alert('Select Item Description.!');
      return;
    }

    else if (this.uom == undefined || this.uom == null || this.uom ==''){
      alert('Select UOM.!');
      return;
    }
    else if (this.isTaxable == 'Y') {
      // alert(this.taxCategoryPur)
      var taxCategoryPur=this.itemMasterForm.get('taxCategoryPur').value;
      var taxCategoryPurIGST=this.itemMasterForm.get('taxCategoryPurIGST').value;
      var taxCategorySale=this.itemMasterForm.get('taxCategorySale').value;
      var taxCategorySaleIGST = this.itemMasterForm.get('taxCategorySaleIGST').value;
      if (taxCategoryPur == undefined || taxCategoryPur == null) {
        alert('Select Purchase S&CGST Category Name And Then Click Save Button.!');
        return;
      }
      else if (taxCategoryPurIGST == undefined || taxCategoryPurIGST == null) {
        alert('Select Purchase IGST Category Name And Then Click Save Button.!');
        return;
      }
      else if (taxCategorySale == undefined || taxCategorySale == null) {
        alert('Select Sales S&CGST Category Name And Then Click Save Button.!');
        return;
      }
      else if (taxCategorySaleIGST == undefined || taxCategorySaleIGST == null) {
        alert('Select Sales IGST Category Name And Then Click Save Button.!');
        return;
      }
    }
    else if (costCenter == undefined || costCenter == null) {
      alert('Select Cost Center.!');
      return;
    }
    else if (poChargeAccount == undefined || poChargeAccount == null) {
      alert('Select Natural Account.!');
      return;
    }
    const formValue: IItemMaster = this.transData(this.itemMasterForm.value);
    formValue.stockable = this.stockable;
    formValue.costing = this.costing;
    formValue.internalOrder = this.internalOrder;
    formValue.assetItem = this.assetItem;
    formValue.purchasable = this.purchasable;
    formValue.isTaxable = this.isTaxable;
    this.service.VehItemSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.itemMasterForm.disable();
        // this.itemMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS' + res.obj);
          // this.itemMasterForm.reset();
        }
      }
    });
  }
  resetItemMast() { window.location.reload(); }
  closeItemMast() { this.router.navigate(['admin']); }

  updateItemMast() {
    if (this.isTaxable == 'Y') {
      // alert(this.taxCategoryPur)
      if (this.taxCategoryPur == undefined || this.taxCategoryPur == null) {
        alert('Select Purchase S&CGST Category Name And Then Click Save Button.!');
        return;
      }
      else if (this.taxCategoryPurIGST == undefined || this.taxCategoryPurIGST == null) {
        alert('Select Purchase IGST Category Name And Then Click Save Button.!');
        return;
      }
      else if (this.taxCategorySale == undefined || this.taxCategorySale == null) {
        alert('Select Sales S&CGST Category Name And Then Click Save Button.!');
        return;
      }
      else if (this.taxCategorySaleIGST == undefined || this.taxCategorySaleIGST == null) {
        alert('Select Sales IGST Category Name And Then Click Save Button.!');
        return;
      }
    }
    const formValue: IItemMaster = this.itemMasterForm.getRawValue();
    this.service.UpdateItemMasterById(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert(res.message
          );
          // this.CompanyMasterForm.reset();
          // window.location.reload();
        }
      }
    });
  }

}
