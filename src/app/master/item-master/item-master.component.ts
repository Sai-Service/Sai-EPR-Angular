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
import { OrderManagementService } from 'src/app/order-management/order-management.service';

interface IItemMaster{
  segment:string;
  oemWarrentyEndDate:Date;
  description:string;
  loyaltyCardDate:Date;
  categoryId:number;
  uom:string;
  tyreMake:string;
  materialType:string;
  tyreNo:string;
  bookletNo:string;
  toolkit:string;
  fuelType:string;
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
  chassisNo:string;
  engineNo:string;
  vehicleDelvDate:Date;
  manYaer:string;
  // octraiBillDate:Date;
  // octraiType:string;
  warrantyStatus:string;
  ewStatus:string;
  ewStartDate:Date;
  ewEndDate:Date; 
  ewPeriod:number;
  ewBookletNo:string;
  smartCardNumber:number;
  ewInsurerId:string;
  ewInsurerSite:string;
  itemType:string;
  insurerCompId:string;
  insurerSiteId:string;
  interiors:string;
  rips:string;
  twoTone:string;
  hold:string;
  holdReason:string;
  // escortLocation:string;
  // escortReceipt:string;
  // escortReceiptDt:Date;
  // escortAmount:number;
  // bwhLocation:string;
  // bwhDebitMemo:number;
  // bwhDebitMemoDt:Date;
  // bwhEscortNo:number;
  cngKitNumber:number;
  cngCylinderNo:number;
  keyNo:number;
  batteryMake:string;
  batteryNo:string;
  loyaltyCardNumber:string;
fastTagIssueDate:Date;
fastTagNo:string;
smartCardIssueDate:Date;
tempRegNo:string;
tempRegDate:Date;
poChargeAccount:number;
vin:string;
isTaxable:string;
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
  itemTypeForCat:string;
  uom:string;
  costing:string;
  stockable:string;
  loyaltyCardDate:Date;
  purchasable:string;
  costCenter:number;
  materialType:string;
  hsnSacCode:string;
  internalOrder:string;
  marginCategory:string='null';
  assetItem:string;
  lotSize:number;
  toolkit:string;
  status:string;
  type:string;
  mainModel:string;
  colorCode:string;
  variantCode:string;
  chassisNo:string;
  engineNo:string;
  vehicleDelvDate:Date;
  manYaer:string;
  // octraiBillDate:Date;
  // octraiType:string;
  warrantyStatus:string;
  ewStatus:string;
  ewStartDate:Date;
  ewEndDate:Date;
  ewPeriod:number;
  ewBookletNo:string;
  smartCardNumber:number;
  ewInsurerId:string;
  ewInsurerSite:string;
  itemType:string;
  insurerCompId:string;
  insurerSiteId:string;
  interiors:string;
  rips:string;
  twoTone:string;
  hold:string;
  holdReason:string;
  isTaxable:string;
  disItemCode=true;
  // escortLocation:string;
  // escortReceipt:string;
  // escortReceiptDt:Date;
  // escortAmount:number;
  // bwhLocation:string;
  // bwhDebitMemo:number;
  // bwhDebitMemoDt:Date;
  // bwhEscortNo:number;
  cngKitNumber:number;
  cngCylinderNo:number;
  tyreMake:string;
  bookletNo:string;
  keyNo:number;
  tyreNo:string;
  batteryMake:string;
  batteryNo:string;
  displayPoCharge=true;
  displayCosting=true;
  displayInactive = true;
  inventory= true;
  dealerCode:Number;
  poChargeAccount:number;
  Status1: any;
  startDate:Date;
  endDate:Date;
  segment11: string;
  segment2: number;
  segment3: number;
  segment4: number;
  segment5: number;
  branch: any;
  lookupValueDesc4: string;
  lookupValueDesc1: string;
  lookupValueDesc2: string;
  lookupValueDesc3: string;
  lookupValueDesc5: string;
  displayModal = true;
  showModal: boolean;
  content: number;
  segmentName:string;
  segment1:string;
  ssVehical= false;
  ssSpares = false;
  vin :string;
  public minDate = new Date() ;
  lstcomments: any[];
  public dealerCodeList :Array<string>=[];
  public statusList: Array<string> = [];
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
  VariantSearch:Array<string>[]; ColourSearch:Array<string>[];
  public ewInsurerSiteList:Array<string>[];
  public itemTypeList:Array<string>[];
  public insNameList:Array<string>[];
  public insSiteList:Array<string>[];
  public ripsList:Array<string>[];
  public twoToneList:Array<string>[];
  public holdList:Array<string>[];
  public holdReasonList:Array<string>[];
  public BranchList: Array<string> = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: Array<string> = [];
  public InterBrancList: Array<string> = [];
  public locIdList: Array<string> = [];
  public segmentNameList: any;
 public SSitemTypeList:any;
 public maxDate = new Date();
 displayHold=true;
 stockableShow=true;
 costingShow=true;
 internalOrderShow =true;
 assetItemShow =true;
 purchasableShow=true;
 
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private orderManagementService:OrderManagementService) {
    this.itemMasterForm = fb.group({
      segment:['', [Validators.required]],
      description:['', [Validators.required]],
      categoryId:['', [Validators.required]],
      itemTypeForCat:[],
      uom:['', [Validators.required]],
      costing:['', [Validators.required]],
      stockable:['', [Validators.required]],
      segment1:[],
      tyreMake:[],
      materialType:[],
      oemWarrentyEndDate:[],
      purchasable:['', [Validators.required]],
      costCenter:['', [Validators.required]],
      hsnSacCode:['', [Validators.required]],
      internalOrder:['', [Validators.required]],
      marginCategory:[],
      assetItem:['', [Validators.required]],
      lotSize:['', [Validators.required]],
      status:['', [Validators.required]],
      type:['', [Validators.required]],
      mainModel:['', [Validators.required]],
      colorCode:['', [Validators.required]],
      variantCode:['', [Validators.required]],
      chassisNo:['', [Validators.required]],
      engineNo:['', [Validators.required]],
      vehicleDelvDate:['', [Validators.required]],
      // manYear:[''],
      loyaltyCardDate:[],
      // octraiBillDate:[''],
      // octraiType:[''],
      warrantyStatus:[''],
      ewStatus:[''],
      ewStartDate:[''],
      ewEndDate:[],
      toolkit:[],
      ewPeriod:[''],
      ewBookletNo:[''],
      smartCardNumber:[''],
      ewInsurerId:[''],
      ewInsurerSite:[''],
      itemType:[''],
      insurerCompId:[''],
      fuelType:[],
      insurerSiteId:[''],
      interiors:[''],
      rips:[''],
      twoTone:[''],
      hold:[''],
      tyreNo:[],
      bookletNo:[],
      holdReason:[''],
      isTaxable:[],
      // escortLocation:[''],
      // escortReceipt:[''],
      // escortReceiptDt:[''],
      // escortAmount:[''],
      // bwhLocation:[''],
      // bwhDebitMemo:[''],
      // bwhDebitMemoDt:[''],
      // bwhEscortNo:[''],
      cngKitNumber:[''],
      cngCylinderNo:[''],
      keyNo:[''],
      batteryMake:[''],
      batteryNo:[''],
loyaltyCardNumber:[''],
fastTagIssueDate:[],
fastTagNo:[],
smartCardIssueDate:[],
tempRegNo:[],
tempRegDate:[],
poChargeAccount:[],
monthYrManf:[],
      dealerCode:[],
      startDate:[],
      segmentName:[],
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
      vin :[],
    })
   }





   
   get f() { return this.itemMasterForm.controls; }

  ngOnInit(): void {
    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
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
            this.locIdList = data;
            console.log(this.locIdList);
          }
        );
      this.service.delearCodeList()
      .subscribe(
        data => {
          this.dealerCodeList = data;
          console.log(this.dealerCodeList);
        }
      );
      this.service.SSitemTypeListFn()
      .subscribe(
        data => {
          this.SSitemTypeList = data;
          console.log(this.SSitemTypeList);
        }
      );
    // this.service.YesNoList()
    //   .subscribe(
    //     data => {
    //       this.YesNoList = data;
    //       console.log(this.YesNoList);
    //     }
    //   )
    
 

    this.service.uomList()
    .subscribe(
      data => {
        this.uomList = data;
        console.log(this.uomList);
      }
    );
    

    // this.service.costingList()
    // .subscribe(
    //   data => {
    //     this.costingList = data;
    //     console.log(this.costingList);
    //   }
    // );


    // this.service.stockableList()
    // .subscribe(
    //   data => {
    //     this.stockableList = data;
    //     console.log(this.stockableList);
    //   }
    // );
    
    // this.service.purchasableList()
    // .subscribe(
    //   data => {
    //     this.purchasableList = data;
    //     console.log(this.purchasableList);
    //   }
    // );

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

    // this.service.internalOrderList()
    // .subscribe(
    //   data => {
    //     this.internalOrderList = data;
    //     console.log(this.internalOrderList);
    //   }
    // );
    
    this.service.marginCategoryList()
    .subscribe(
      data => {
        this.marginCategoryList = data;
        console.log(this.marginCategoryList);
      }
    );

    // this.service.assetItemList()
    // .subscribe(
    //   data => {
    //     this.assetItemList = data;
    //     console.log(this.assetItemList);
    //   }
    // );
    
    // this.service.itemStatusList()
    // .subscribe(
    //   data => {
    //     this.itemStatusList = data;
    //     console.log(this.itemStatusList);
    //   }
    // );

  //  this.service.typeList()
  //   .subscribe(
  //     data => {
  //       this.typeList = data;
  //       console.log(this.typeList);
  //     }
  //   );
    
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
    
    // this.service.manYaerList()
    // .subscribe(
    //   data => {
    //     this.manYaerList = data;
    //     console.log(this.manYaerList);
    //   }
    // );

    // this.service.octraiBillDateList()
    // .subscribe(
    //   data => {
    //     this.octraiBillDateList = data;
    //     console.log(this.octraiBillDateList);
    //   }
    // );
    
    // this.service.octraiTypeList()
    // .subscribe(
    //   data => {
    //     this.octraiTypeList = data;
    //     console.log(this.octraiTypeList);
    //   }
    // );
    
    // this.service.warrantyStatusList()
    // .subscribe(
    //   data => {
    //     this.warrantyStatusList = data;
    //     console.log(this.warrantyStatusList);
    //   }
    // );  
    
    // this.service.ewStatusList()
    // .subscribe(
    //   data => {
    //     this.ewStatusList = data;
    //     console.log(this.ewStatusList);
    //   }
    // );  

    // this.service.ewPeriodList()
    // .subscribe(
    //   data => {
    //     this.ewPeriodList = data;
    //     console.log(this.ewPeriodList);
    //   }
    // );
    

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

    // this.service.ripsList()
    // .subscribe(
    //   data => {
    //     this.ripsList = data;
    //     console.log(this.ripsList);
    //   }
    // );
    
    // ;
    // this.service.twoToneList()
    // .subscribe(
    //   data => {
    //     this.twoToneList = data;
    //     console.log(this.twoToneList);
    //   }
    // );

    // this.service.holdList()
    // .subscribe(
    //   data => {
    //     this.holdList = data;
    //     console.log(this.holdList);
    //   }
    // );

    this.service.holdReasonList()
    .subscribe(
      data => {
        this.holdReasonList = data;
        console.log(this.holdReasonList);
      }
    );
 
  }
  onOptionsSelectedVariant(mainModel){
    this.orderManagementService.VariantSearchFn(mainModel)
    .subscribe(
      data => {
        this.VariantSearch = data;
        console.log(this.VariantSearch);  
      }
    );
  }

  onOptionsSelectedColor(variant){
    alert(variant)
    this.orderManagementService.ColourSearchFn(variant)
    .subscribe(
      data => {
        this.ColourSearch = data;
        console.log(this.ColourSearch);
      }
    );
  }


  itemMaster(itemMaster: any) {
  }
  
  onOptionsSelectedItemType(category:any){
    alert(category);
    if(category == 'SS_VEHICLE'){
      this.disItemCode = false;
    }else{
      this.disItemCode = true;
    }
    let select = this.SSitemTypeList.find(d => d.itemType === category);
    alert(select.assetItem);
    if(select.stockable=='Y'){ this.stockableShow=false; this.stockable='Y'}
    if(select.stockable=='N'){this.stockableShow=true; this.stockable='N' }
    if(select.costing=='Y'){this.costingShow = false; this.displayCosting=false; this.costing='Y' }
    if(select.costing=='N'){this.costingShow = true; this.costing='N' }
    if(select.internalOrder=='Y'){this.internalOrderShow = false; this.internalOrder='Y'}
    if(select.internalOrder=='N'){this.internalOrderShow = true; this.internalOrder='N'}  
    if(select.assetItem=='Y'){this.assetItemShow = false; this.assetItem='Y'}
    if(select.assetItem=='N'){this.assetItemShow = true; this.assetItem='N'}  
    if(select.purchable=='Y'){this.purchasableShow = false; this.displayPoCharge=false; this.purchasable='Y' }
    if(select.purchable=='N'){this.purchasableShow = true; this.purchasable='N'}  
    
    this.service.categoryIdList(category)
    .subscribe(
      data => {
        this.categoryIdList = data;
        console.log(this.categoryIdList);
      }
    );
    if(category=='SS_VEHICLE'){    this.ssVehical=true; this.ssSpares=false;}
    if(category=='SS_SPARES'){     this.ssVehical=false; this.ssSpares=true;}
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
    this.displayPoCharge=false;
    }
    else{
      this.purchasable = 'N';
      this.displayPoCharge=true;
    }
  }
  twoToneEvent(e) {
    if (e.target.checked) {
    this.twoTone='Y'
    }
    else{
      this.twoTone = 'N';
    }
  }
  ripsEvent(e) {
    if (e.target.checked) {
    this.rips='Y'
    }
    else{
      this.rips = 'N';
    }
  }
  holdEvent(e) {
    if (e.target.checked) {
    this.hold='Y'
    this.displayHold= false;
    }
    else{
      this.hold = 'N';
      this.displayHold= true;
    }
  }
  costingEvent(e) {
    if (e.target.checked) {
    this.costing='Y'
    this.displayCosting=false;
    }
    else{
      this.costing = 'N';
      this.displayCosting=true;
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
  isTaxableEvent(e) {
    if (e.target.checked) {
    this.isTaxable='Y'
    }
    else{
      this.isTaxable = 'N';
    }
  }
  interiorsEvent(e) {
    if (e.target.checked) {
    this.interiors='Y'
    }
    else{
      this.interiors = 'N';
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
      if(data.itemTypeForCat=='ss_vehicle'){
        this.ssVehical=true;
      }
      if(data.itemTypeForCat=='ss_spares'){
        this.ssSpares=true;
      }
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
  // onInsurerNameSelected(customerId: any) {
  //   console.log(customerId);
  //   this.Search(customerId);
  // }
  // Search
  onInsurerNameSelected(customerId: number) {
    // alert('in '+ customerId)
    this.service.insSiteList(customerId)
     .subscribe(
      data => {
        this.insSiteList = data.customerSiteMasterList;
        console.log(this.insSiteList);
      }
    );
  }
  transData(val) {
    // delete val.marginCategory;
    // delete val.lotSize;
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
  newItemMast(){
    const formValue: IItemMaster = this.transData(this.itemMasterForm.value);
    alert(this.stockable)
    formValue.stockable= this.stockable;
    formValue.costing= this.costing;
    formValue.internalOrder= this.internalOrder;
    formValue.assetItem= this.assetItem;
    formValue.purchasable= this.purchasable; 
    formValue.isTaxable= this.isTaxable;
    // formValue.purchasable= this.purchasable;
    this.service.VehItemSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.itemMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          // this.itemMasterForm.reset();
        }
      }
    });
  }
  resetItemMast(){this.router.navigate(['admin']);}
  closeItemMast(){ window.location.reload();}
  searchItemMast(){}
  updateItemMast(){
    const formValue: IItemMaster = this.itemMasterForm.value;
    this.service.UpdateItemMasterById(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUILY');
        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          // this.CompanyMasterForm.reset();
          // window.location.reload();
        }
      }
    });
  }
  onOptionsSelected(event: any) {
    this.Status1 = this.itemMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.itemMasterForm.get('endDate').reset();
    }
  }
  fnCancatination(index) {
    // var arrayControl = this.itemMasterForm.get('poLines').value
    // var patch = this.itemMasterForm.get('poLines') as FormArray;
    // arrayControl[index].segmentName = arrayControl[index].segment11 + '.' + arrayControl[index].segment2 + '.' + arrayControl[index].segment3 + '.' + arrayControl[index].segment4 + '.' + arrayControl[index].segment5 + '.' + arrayControl[index].segment6 + '.' + arrayControl[index].segment7 + '.' + arrayControl[index].segment8 + '.' + arrayControl[index].segment9;
    alert(this.itemMasterForm.get('segment11').value)
    var segmentName = this.itemMasterForm.get('segment11').value + '.'
      + this.itemMasterForm.get('segment2').value + '.'
      + this.itemMasterForm.get('segment3').value + '.'
      + this.itemMasterForm.get('segment4').value + '.'
      + this.itemMasterForm.get('segment5').value;
    // + this.itemMasterForm.get('segment6').value;
    //  + this.itemMasterForm.get('segment7').value + '.'
    //  + this.itemMasterForm.get('segment8').value + '.' 
    //  + this.itemMasterForm.get('segment9').value  ;
    // this.segmentName1 = segmentName
    // console.log(this.segmentName1);
    alert(segmentName)
   this.itemMasterForm.patchValue({ segmentName: segmentName })
   this.itemMasterForm.patchValue({ poChargeAccount:this.itemMasterForm.get('segment4').value })
    
    this.itemMasterForm.get('segment11').reset();
    this.itemMasterForm.get('segment2').reset();
    this.itemMasterForm.get('segment3').reset();
    this.itemMasterForm.get('segment4').reset();
    this.itemMasterForm.get('segment5').reset();
    // this.itemMasterForm.get('segment6').reset();
    this.itemMasterForm.get('lookupValueDesc1').reset();
    this.itemMasterForm.get('lookupValueDesc2').reset();
    this.itemMasterForm.get('lookupValueDesc3').reset();
    this.itemMasterForm.get('lookupValueDesc4').reset();
    this.itemMasterForm.get('lookupValueDesc5').reset();
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
      //       var arrayControl = this.itemMasterForm.get('poLines').value
      //       var patch = this.itemMasterForm.get('poLines') as FormArray;
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
    // this.content = i; // Dynamic Data
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
          // this.itemMasterForm.patchValue(this.branch);
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
  onKey(event: any) {
    const aaa ='MV'+this.variantCode+'-'+ this.colorCode+'-'+this.chassisNo ;
    this.itemMasterForm.patchValue({segment:aaa})
  }
}
