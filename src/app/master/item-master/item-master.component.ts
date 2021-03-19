import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, RequiredValidator } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators,FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';

interface IItemMaster{
  segment:string;
  description:string;
  categoryId:number;
  uom:string;
  costing:string;
  stockable:string;
  purchasable:string;
  costCenter:number;
  hsnSacCode:string;
  internalOrder:string;
  marginCategory:string;
  assetItem:string;
  lotSize:number;
  status:string;
  type:string;
  mainModel:string;
  colorCode:string;
  variantCode:string;
  chasisNo:string;
  engineNo:string;
  date:Date;
  manYaer:string;
  octraiBillDate:Date;
  octraiType:string;
  warrantyStatus:string;
  ewStatus:string;
  ewdate:Date;
  ewPeriod:number;
  ewBookletNo:string;
  smartCardNumber:number;
  ewInsName:string;
  ewInsSite:string;
  itemType:string;
  insName:string;
  insSite:string;
  interiors:string;
  rips:string;
  twoTone:string;
  hold:string;
  holdReason:string;
  escortLocation:string;
  escortReceipt:string;
  escortReceiptDt:Date;
  escortAmount:number;
  bwhLocation:string;
  bwhDebitMemo:number;
  bwhDebitMemoDt:Date;
  bwhEscortNo:number;
  cngKitNo:number;
  cngCylinderNo:number;
  keyNo:number;
  batteryMake:string;
  batteryNo:string;
}

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent implements OnInit {

  itemMasterForm: FormGroup;
  segment:string;
  submitted = false;
  description:string;
  categoryId:number;
  uom:string;
  costing:string;
  stockable:string;
  purchasable:string;
  costCenter:number;
  hsnSacCode:string;
  internalOrder:string;
  marginCategory:string;
  assetItem:string;
  lotSize:number;
  status:string;
  type:string;
  mainModel:string;
  colorCode:string;
  variantCode:string;
  chasisNo:string;
  engineNo:string;
  date:Date;
  manYaer:string;
  octraiBillDate:Date;
  octraiType:string;
  warrantyStatus:string;
  ewStatus:string;
  ewdate:Date;
  ewPeriod:number;
  ewBookletNo:string;
  smartCardNumber:number;
  ewInsName:string;
  ewInsSite:string;
  itemType:string;
  insName:string;
  insSite:string;
  interiors:string;
  rips:string;
  twoTone:string;
  hold:string;
  holdReason:string;
  escortLocation:string;
  escortReceipt:string;
  escortReceiptDt:Date;
  escortAmount:number;
  bwhLocation:string;
  bwhDebitMemo:number;
  bwhDebitMemoDt:Date;
  bwhEscortNo:number;
  cngKitNo:number;
  cngCylinderNo:number;
  keyNo:number;
  batteryMake:string;
  batteryNo:string;

  lstcomments: any[];
  public YesNoList: Array<string> = [];
  public categoryIdList: Array<string> = [];
  public uomList: Array<string> = [];
  public costingList: Array<string> = [];
  public stockableList: Array<string> = [];
  public purchasableList: Array<string>=[];
  public costCenterList:Array<string>=[];
  public hsnSacCodeList: Array<string>[];
  public internalOrderList:Array<string>[];
  public marginCategoryList:Array<string>[];
  public assetItemList:Array<string>[];
  public itemStatusList:Array<string>[];
  public typeList:Array<string>[];
  public mainModelList:Array<string>[];
  public colorCodeList:Array<string>[];
  public variantCodeList:Array<string>[];
  public manYaerList:Array<string>[];
  public octraiBillDateList:Array<string>[];
  public octraiTypeList:Array<string>[];
  public warrantyStatusList:Array<string>[];
  public ewStatusList:Array<string>[];
  public ewPeriodList:Array<string>[];
  public ewInsNameList:any;
  public ewInsSiteList:Array<string>[];
  public itemTypeList:Array<string>[];
  public insNameList:Array<string>[];
  public insSiteList:Array<string>[];
  public ripsList:Array<string>[];
  public twoToneList:Array<string>[];
  public holdList:Array<string>[];
  public holdReasonList:Array<string>[];

  
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.itemMasterForm = fb.group({
      segment:['', [Validators.required]],
      description:['', [Validators.required]],
      categoryId:['', [Validators.required]],
      uom:['', [Validators.required]],
      costing:['', [Validators.required]],
      stockable:['', [Validators.required]],
      purchasable:['', [Validators.required]],
      costCenter:['', [Validators.required]],
      hsnSacCode:['', [Validators.required]],
      internalOrder:['', [Validators.required]],
      marginCategory:['', [Validators.required]],
      assetItem:['', [Validators.required]],
      lotSize:['', [Validators.required]],
      status:['', [Validators.required]],
      type:['', [Validators.required]],
      mainModel:['', [Validators.required]],
      colorCode:['', [Validators.required]],
      variantCode:['', [Validators.required]],
      chasisNo:['', [Validators.required]],
      engineNo:['', [Validators.required]],
      date:['', [Validators.required]],
      manYaer:[''],
      octraiBillDate:[''],
      octraiType:[''],
      warrantyStatus:[''],
      ewStatus:[''],
      ewdate:[''],
      ewPeriod:[''],
      ewBookletNo:[''],
      smartCardNumber:[''],
      ewInsName:[''],
      ewInsSite:[''],
      itemType:[''],
      insName:[''],
      insSite:[''],
      interiors:[''],
      rips:[''],
      twoTone:[''],
      hold:[''],
      holdReason:[''],
      escortLocation:[''],
      escortReceipt:[''],
      escortReceiptDt:[''],
      escortAmount:[''],
      bwhLocation:[''],
      bwhDebitMemo:[''],
      bwhDebitMemoDt:[''],
      bwhEscortNo:[''],
      cngKitNo:[''],
      cngCylinderNo:[''],
      keyNo:[''],
      batteryMake:[''],
      batteryNo:['']
    })
   }





   
   get f() { return this.itemMasterForm.controls; }

  ngOnInit(): void {

    this.service.YesNoList()
      .subscribe(
        data => {
          this.YesNoList = data;
          console.log(this.YesNoList);
        }
      )
    this.service.categoryIdList()
    .subscribe(
      data => {
        this.categoryIdList = data;
        console.log(this.categoryIdList);
      }
    );
 

    this.service.uomList()
    .subscribe(
      data => {
        this.uomList = data;
        console.log(this.uomList);
      }
    );
    

    this.service.costingList()
    .subscribe(
      data => {
        this.costingList = data;
        console.log(this.costingList);
      }
    );


    this.service.stockableList()
    .subscribe(
      data => {
        this.stockableList = data;
        console.log(this.stockableList);
      }
    );
    
    this.service.purchasableList()
    .subscribe(
      data => {
        this.purchasableList = data;
        console.log(this.purchasableList);
      }
    );

    this.service.costCenterList()
    .subscribe(
      data => {
        this.costCenterList = data;
        console.log(this.costCenterList);
      }
    );

    this.service.hsnSacCodeList()
    .subscribe(
      data => {
        this.hsnSacCodeList = data;
        console.log(this.hsnSacCodeList);
      }
    );

    this.service.internalOrderList()
    .subscribe(
      data => {
        this.internalOrderList = data;
        console.log(this.internalOrderList);
      }
    );
    
    this.service.marginCategoryList()
    .subscribe(
      data => {
        this.marginCategoryList = data;
        console.log(this.marginCategoryList);
      }
    );

    this.service.assetItemList()
    .subscribe(
      data => {
        this.assetItemList = data;
        console.log(this.assetItemList);
      }
    );
    
    this.service.itemStatusList()
    .subscribe(
      data => {
        this.itemStatusList = data;
        console.log(this.itemStatusList);
      }
    );

   this.service.typeList()
    .subscribe(
      data => {
        this.typeList = data;
        console.log(this.typeList);
      }
    );
    
   this.service.mainModelList()
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
    
    this.service.manYaerList()
    .subscribe(
      data => {
        this.manYaerList = data;
        console.log(this.manYaerList);
      }
    );

    this.service.octraiBillDateList()
    .subscribe(
      data => {
        this.octraiBillDateList = data;
        console.log(this.octraiBillDateList);
      }
    );
    
    this.service.octraiTypeList()
    .subscribe(
      data => {
        this.octraiTypeList = data;
        console.log(this.octraiTypeList);
      }
    );
    
    this.service.warrantyStatusList()
    .subscribe(
      data => {
        this.warrantyStatusList = data;
        console.log(this.warrantyStatusList);
      }
    );  
    
    this.service.ewStatusList()
    .subscribe(
      data => {
        this.ewStatusList = data;
        console.log(this.ewStatusList);
      }
    );  

    this.service.ewPeriodList()
    .subscribe(
      data => {
        this.ewPeriodList = data;
        console.log(this.ewPeriodList);
      }
    );
    

    this.service.ewInsNameList()
    .subscribe(
      data => {
        this.ewInsNameList = data;
        console.log(this.ewInsNameList);
      }
    );
   
    
    
    this.service.itemTypeList()
    .subscribe(
      data => {
        this.itemTypeList = data;
        console.log(this.itemTypeList);
      }
    );

    this.service.insNameList()
    .subscribe(
      data => {
        this.insNameList = data;
        console.log(this.insNameList);
      }
    );
    
    // this.service.insSiteList(customerId)
    // .subscribe(
    //   data => {
    //     this.insSiteList = data;
    //     console.log(this.insSiteList);
    //   }
    // );

    this.service.ripsList()
    .subscribe(
      data => {
        this.ripsList = data;
        console.log(this.ripsList);
      }
    );
    
    this.service.twoToneList()
    .subscribe(
      data => {
        this.twoToneList = data;
        console.log(this.twoToneList);
      }
    );

    this.service.holdList()
    .subscribe(
      data => {
        this.holdList = data;
        console.log(this.holdList);
      }
    );

    this.service.holdReasonList()
    .subscribe(
      data => {
        this.holdReasonList = data;
        console.log(this.holdReasonList);
      }
    );
 
  }

  itemMaster(itemMaster: any) {
  }
  
  UomEvent(e) {
    if (e.target.checked) {
    this.stockable='Y'
    }
    else{
      this.stockable = 'N';
    }
  }
  stockableEvent(e) {
    if (e.target.checked) {
    this.stockable='Y'
    }
    else{
      this.stockable = 'N';
    }
  }
  purchasableEvent(e) {
    if (e.target.checked) {
    this.purchasable='Y'
    }
    else{
      this.purchasable = 'N';
    }
  }
  twoToneEvent(e) {
    if (e.target.checked) {
    this.purchasable='Y'
    }
    else{
      this.purchasable = 'N';
    }
  }
  ripsEvent(e) {
    if (e.target.checked) {
    this.purchasable='Y'
    }
    else{
      this.purchasable = 'N';
    }
  }
  holdEvent(e) {
    if (e.target.checked) {
    this.purchasable='Y'
    }
    else{
      this.purchasable = 'N';
    }
  }
  costingEvent(e) {
    if (e.target.checked) {
    this.costing='Y'
    }
    else{
      this.costing = 'N';
    }
  }
  internalOrderEvent(e) {
    if (e.target.checked) {
    this.internalOrder='Y'
    }
    else{
      this.internalOrder = 'N';
    }
  }
  assetItemEvent(e) {
    if (e.target.checked) {
    this.assetItem='Y'
    }
    else{
      this.assetItem = 'N';
    }
  }
  SearchItemCode(segment){
      this.service.getItemCodePach(segment)
      .subscribe(
        data => {
          this.lstcomments = data;
      this.itemMasterForm.patchValue(this.lstcomments);
        }
      );
  }
  onEwInsNameSelected(customerId: any) {
    debugger;
    console.log(customerId);
    let select = this.ewInsNameList.find(d => d.custName == customerId);
    console.log(select.customerId);
    
    this.SearchonEwInsName(select.customerId);
  }
  SearchonEwInsName(customerId) {

    this.service.ewInsSiteList(customerId)
    .subscribe(
      data => {
        this.ewInsSiteList = data;
        console.log(this.ewInsSiteList);
      }
    );
  }
  onInsurerNameSelected(customerId: any) {
    console.log(customerId);
    this.Search(customerId);
  }
  Search(customerId: number) {
    this.service.insSiteList(customerId)
     .subscribe(
      data => {
        this.insSiteList = data;
        console.log(this.insSiteList);
      }
    );
  }
  newItemMast(){}
  resetItemMast(){this.router.navigate(['admin']);}
  closeItemMast(){ window.location.reload();}
  searchItemMast(){}
  updateItemMast(){}
 


}
