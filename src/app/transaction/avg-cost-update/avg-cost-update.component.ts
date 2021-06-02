import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemeService } from 'ng2-charts';
import { DatePipe } from '@angular/common';


interface IAvgCostUpdate {

  // priceListId :number;
  // priceListName:string;
  // priceDesc:string;

  // status:string;
  // startDate:Date;
  
  // ouId: number; 
  // ouName : string;
  // description : string; 
  priceListType: string;
  priceListHeaderId:number;
  

}

@Component({
  selector: 'app-avg-cost-update',
  templateUrl: './avg-cost-update.component.html',
  styleUrls: ['./avg-cost-update.component.css']
})

export class AvgCostUpdateComponent implements OnInit {
  avgCostUpdateForm : FormGroup;

  priceListId :number;
  priceListName:string;
  priceListDesc:string;
  priceListType:string;
  
  priceListHeaderId : number;
  
 
  
  description : string; 
  
  itemId : number;  
  itemDescription : string ;
  itemName :string;
  segmentName:string;
  priceDesc:string;
  segment :string;

  searchBy : string;
  searchValue : string;

  startDate:Date;
  endDate:Date;


  fromDate:Date;
  toDate:Date;
  searchItemId:number;

  showOu=false;
  showItemSearch=false;
  showPriceListLov =true;
  display=true;
  lstcomments: any;

  public statusList: Array<string> = [];
  invItemList: any;
  avgCurrrentCost:any;
  public PriceTypeList: Array<string> = [];
  public DepartmentList: Array<string> = [];
  public locIdList: Array<string> = [];

  public PriceListIdList : Array<string> = [];
  public priceDescList  :any;

  public OUIdList: Array<string> = [];
  
  public DivisionIDList : Array<string>=[];
  public itemIdList : Array<string>=[];

  public itemNameList: any;
  public priceListNameList: any;

  enableDesc=false;
  
  public status = "Active";
  displayInactive = true;
  Status1: any;
  // display= true;
  display1 = true;
  displayButton = true;
  plsearch=false;

  userList2: any[] = [];
  lastkeydown1: number = 0;

  pipe = new DatePipe('en-US');
  now = Date.now();
  transDate = this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');

  divisionId : number;
  loginName:string;
  loginArray:string;
  name:string;
  ouId :number;
  ouName : string;
  locId: number;
  locName : string;
  deptId :number;
  // emplId :number;
  orgId:number;
  priorCost:number;
  actualCost:number;
  // codeCombinationId:number;
  // reason:string;
  createdBy :number;
  lastUpdatedBy:number


  public emplId =6;
  public codeCombinationId=2079;
  public reason='IC001';
  public transSourceTypeId=17;
  public locatorId=999
  public subInventoryCode='SP'

  constructor(private service: MasterService, private fb: FormBuilder, private router: Router) 
    {
      this.avgCostUpdateForm  = fb.group({

      loginArray:[''],
      loginName:[''],
      ouName :[''],
      locId:[''],
      ouId:[''],
      locName :[''],
      emplId:[''],

      fromDate:[],
      toDate:[],
      searchItemId:[],
      itemName:[],
        
        // priceListHeaderId: [],
        // priceListType:[],
        divisionId: [],
        deptId: [],
        // description: [],
        // itemDescription:[],
        priceDesc:[],
        // priceListId:['', [Validators.required]],
        // priceListName:['', [Validators.required]],
        searchBy:['', [Validators.required]],
        searchValue:['', [Validators.required]],
        
        transDate:[],
        codeCombinationId:[],
        reason:[],
        transSourceTypeId:[],
        segmentName:[],
        // locatorId:[],
        // subInventoryCode:[],

        createdBy :[],
        lastUpdatedBy:[],

        priceListDetailList: this.fb.array([this.lineDetailsGroup()])   
      });
    }

    lineDetailsGroup() {
      return this.fb.group({
        // priceListLineId:[''],
        itemId :['', [Validators.required]],   
        segment: ['', [Validators.required]], 
        itemDescription: ['', [Validators.required]],
        itemCategory: ['', [Validators.required]],
        uom: ['', [Validators.required]],
        actualCost: ['', [Validators.required]],
        priorCost: ['', [Validators.required]],
        locatorId:[],
        subInventoryCode:[],
            
        // codeCombinationId:[],
        // reason:[],
        // transSourceTypeId:[],
       });
    }
  
   lineDetailsArray() :FormArray{
      return <FormArray>this.avgCostUpdateForm .get('priceListDetailList')
    }
   

     get f() { return this.avgCostUpdateForm .controls; }
     avgCostUpdate(avgCostUpdateForm:any) {  }

 
     ngOnInit(): void {

      this.name=  sessionStorage.getItem('name');
      this.loginArray=sessionStorage.getItem('divisionName');
      this.loginName=sessionStorage.getItem('name');
      this.ouName = (sessionStorage.getItem('ouName'));
      this.ouId=Number(sessionStorage.getItem('ouId'));
      this.locId=Number(sessionStorage.getItem('locId'));
      // this.locName=(sessionStorage.getItem('locName'));
      this.deptId=Number(sessionStorage.getItem('dept'));
      // this.emplId= Number(sessionStorage.getItem('emplId'));
     
      this.orgId=this.ouId;
      console.log(this.loginArray);
      console.log(this.locId);
      // console.log(this.ouId);

    //  alert("ouid= "+ this.ouId);

     this.service.invItemList1()
      .subscribe(
        data => {
          this.invItemList = data;
          console.log(this.invItemList);
        }
      );

   

    this.service.OUIdList()
    .subscribe(
      data => {
        this.OUIdList = data;
        console.log(this.OUIdList);
      }
    );

    this.service.locationIdList()
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

    // this.service.statusList()
    // .subscribe(
    //   data => {
    //     this.statusList = data;
    //     console.log(this.statusList);
    //   }
    // );
    
    // this.service.DepartmentList()
    // .subscribe(
    //   data => {
    //     this.DepartmentList = data;
    //     console.log(this.DepartmentList);
    //   }
    // );

    
    this.service.itemIdList()
    .subscribe(
      data => {
        this.itemIdList = data;
        console.log(this.itemIdList);
      }
    );

  }

  
  onOptionsSelectedStatus(event: any) {
    this.Status1 = this.avgCostUpdateForm .get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.avgCostUpdateForm .get('endDate').reset();
      this.displayInactive=true;
    }
  }


  

 
  
  
 

  addRow() {
    // alert('addrow index '+index);
    this.lineDetailsArray().push(this.lineDetailsGroup());
    
  }

  RemoveRow(index) {
    if (index===0){

    }
    else {
      this.lineDetailsArray().removeAt(index);
    }
  
  }

  ////////////////////////// Reset Button module
  resetMast() {  window.location.reload();   }

  ////////////////////////// Close Button module
  closeMast() {  this.router.navigate(['admin']);  }

  //////////////////////////////////////New Button 
  transeData(val) {
    delete val.priceDesc;
    // delete val.itemDescription;
    delete val.priceListId;
    delete val.itemCategory;
    delete val.uom;

    delete val.locName;
    delete val.ouName;
    delete val.loginArray;
    delete val.loginName;
    delete val.priceListType;
    delete val.divisionId;
    delete val.deptId;
    delete val.description;
    delete val.priceListName;
    delete val.searchBy;
    delete val.searchValue;
    delete val.priceListHeaderId;
    delete val.transDate;
    delete val.priceListHeaderId;
    delete val.priceListLineId;

   return val;
  }
  
    newMast1() {

      // alert ("Posting data  to PL mater......")
      // const formValue: IPriceList =this.priceListMasterForm.value;
      const formValue: IAvgCostUpdate =this.transeData(this.avgCostUpdateForm .value);
      this.service.AvgCostUpdateSubmit(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD INSERTED SUCCESSFUILY');
          this.avgCostUpdateForm .reset();
        } else {
          if (res.code === 400) {
            alert('ERROR WHILE INSERTING');
            this.avgCostUpdateForm .reset();
          }
        }
      });
    }

    newMast() {
      alert('Posting data....')
      // alert(this.avgCostUpdateForm.get('locId').value);
      const formValue: IAvgCostUpdate = this.avgCostUpdateForm.value;
      let variants = <FormArray>this.lineDetailsArray();
      var locationId = this.avgCostUpdateForm.get('locId').value;
      var transSourceTypeId = this.avgCostUpdateForm.get('transSourceTypeId').value;
      var codeCombinationId = this.avgCostUpdateForm.get('codeCombinationId').value;
      var segmentName = this.avgCostUpdateForm.get('segmentName').value;
      var reason = this.avgCostUpdateForm.get('reason').value;
      var lastUpdatedBy = this.avgCostUpdateForm.get('emplId').value;
      var createdBy = this.avgCostUpdateForm.get('emplId').value;
      for (let i = 0; i < this.lineDetailsArray().length; i++) {
        let variantFormGroup = <FormGroup>variants.controls[i];
        variantFormGroup.addControl('locationId', new FormControl(locationId, Validators.required));
        variantFormGroup.addControl('transSourceTypeId', new FormControl(transSourceTypeId, Validators.required));
        variantFormGroup.addControl('codeCombinationId', new FormControl(codeCombinationId, Validators.required));
        variantFormGroup.addControl('segmentName', new FormControl(segmentName, Validators.required));
        variantFormGroup.addControl('reason', new FormControl(reason, Validators.required));
        variantFormGroup.addControl('lastUpdatedBy', new FormControl(lastUpdatedBy, Validators.required));
        variantFormGroup.addControl('createdBy', new FormControl(createdBy, Validators.required));
      }
      console.log(variants.value);
      this.service.AvgCostUpdateSubmit(variants.value).subscribe((res: any) => {
        // var obj=res;
        // sessionStorage.setItem('shipmentNumber',obj[0].shipmentNumber);
        if (res.code === 200) {
          alert("Record inserted Successfully");
          this.avgCostUpdateForm .reset();
        }
        else {
          if (res.code === 400) {
            alert("Code already present in data base");
            this.avgCostUpdateForm.reset();
          }
        }
      });
    }

    // updateMast() {
  
    //   const formValue: IAvgCostUpdate =this.transeData(this.avgCostUpdateForm .value);
    //   this.service.UpdatePriceListById(formValue, formValue.priceListHeaderId).subscribe((res: any) => {
    //     if (res.code === 200) {
    //       alert('RECORD UPDATED SUCCESSFUILY');
    //       window.location.reload();
    //     } else {
    //       if (res.code === 400) {
    //         alert('ERROR OCCOURED IN PROCEESS');
    //         this.avgCostUpdateForm .reset();
    //       }
    //     }
    //   });
    // };

  // ============================================================

  Select(priceListHeaderId: number) {
    this.avgCostUpdateForm .reset();
    this.display1= false;
    // alert ('priceListHeaderId='+priceListHeaderId);
    let select = this.lstcomments.find(d => d.priceListHeaderId === priceListHeaderId);
    console.log(select.priceListDetailList[0]);
    // alert(this.lineDetailsArray.length);
 
    for(let i=0; i<this.lineDetailsArray.length; i++){ 
      this.lineDetailsArray().removeAt(i);
    }
    this.lineDetailsArray().clear();
    // alert(this.lineDetailsArray.length);
    if (select) {
      this.priceListType = select.priceListType+ "-" + select.priceListName;
      var control = this.avgCostUpdateForm .get('priceListDetailList') as FormArray;
      
      // alert("PL LENGTH: "+ select.priceListDetailList.length);
      for (let i=0; i<select.priceListDetailList.length;i++) {
        var priceListDetailList:FormGroup=this.lineDetailsGroup();
        control.push(priceListDetailList);
      }
      this.priceListHeaderId = select.priceListHeaderId;
      this.displayButton = false;
      this.display = false;
      this.showItemSearch=true;
      // alert('priceListHeaderId='+priceListHeaderId+"  PL TYPE :" + this.priceListType);
      // console.log("price list details : " + select.priceListDetailList);
      // let controlinv1 = this.priceListMasterForm.get('priceListDetailList') as FormArray;
      // for (let i=0; i<select.priceListDetailList.length;i++) {
      //   alert('Item '+select.priceListDetailList[i].itemId);
      //   alert('priceValue '+select.priceListDetailList[i].priceValue); 
      //   // controlinv1.controls[i].patchValue(select.priceListDetailList[i]);
      // // this.priceListMasterForm.get('priceListDetailList').patchValue(select.priceListDetailList);
      // }
      // this.priceListMasterForm.get('priceListDetailList').patchValue(select.priceListDetailList);
      this.avgCostUpdateForm .patchValue(select);
    }
  }


  searchMast(locId:any,itemId:any,frmDate:any,toDate:any) {
    frmDate=this.pipe.transform(frmDate, 'dd/MM/y');
    toDate=this.pipe.transform(toDate, 'dd/MM/y');
    this.service.getAvgHistoryList(locId,itemId,frmDate,toDate)
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  }

   
  onItemSelected(itemId: any) 
  {
      alert("ITEM ID :" + itemId);
    if(itemId>0)
    {
       this.enableDesc=false
      this.service.itemNameList(itemId)
        .subscribe(
          data => {
            this.itemNameList = data;
            console.log(this.itemNameList);
            this.avgCostUpdateForm .patchValue(this.itemNameList.description);
            // this.itemDescription = this.itemNameList.description;
            this.itemDescription = this.itemNameList.description;
            // alert("item desc :" + this.description);
          }
        );
    }
    else {
      this.enableDesc=true;
      this.avgCostUpdateForm .get("description").reset();
    }
    // alert ("enable Desc="+this.enableDesc);
 }

 // ===============================================================================

  getInvItemId($event) {
    let userId = (<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
    this.userList2 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList2 = this.searchFromArray1(this.invItemList, userId);
      }
    }
  }
  
  searchFromArray1(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };

  onOptioninvItemIdSelected(itemId, index) {
 
    //  alert('item function');
      let selectedValue = this.invItemList.find(v => v.segment == itemId);
      if( selectedValue != undefined){
      // alert(selectedValue.itemId);
      console.log(selectedValue);
      
      var arrayControl = this.avgCostUpdateForm .get('priceListDetailList').value
      var patch = this.avgCostUpdateForm .get('priceListDetailList') as FormArray;
      // this.itemType = arrayControl[index].itemType
      // alert(this.itemType)
      this.itemId = selectedValue.itemId;
      // console.log(this.invItemId, this.taxCat);

        // ---------------------Prior Cost picking--------------------------
        var patch = this.avgCostUpdateForm.get('priceListDetailList') as FormArray; 
        this.service.avgCurrentCost(this.itemId,this.locId)
        .subscribe(
          data => {
            this.avgCurrrentCost = data;
            console.log(this.avgCurrrentCost);
    
            // this.avgCostUpdateForm.patchValue(this.avgCurrrentCost.rate);
           
            this.priorCost=this.avgCurrrentCost.rate;
            (patch.controls[index]).patchValue({priorCost: this.priorCost})
            // alert("Prior cost Rate:" +this.priorCost +" Item Id:"+this.itemId+" Location Id:"+this.locId);
          }
        );
  
        // ---------------------Prior Cost picking--------------------------
      (patch.controls[index]).patchValue(
        {
          uom: selectedValue.uom,
          // itemDescription: selectedValue.description,
          itemDescription: selectedValue.description,
          itemCategory: selectedValue.categoryId.attribute1,
          itemId: selectedValue.itemId,
          itemName:selectedValue.segment,
        
        }
      );
  
    }
  }
// ======================================================================


  onOptioninvItemIdSelectedSingle(itemId) {
 
    //  alert('item function');
      let selectedValue = this.invItemList.find(v => v.segment == itemId);
      if( selectedValue != undefined){
      alert(selectedValue.itemId);
      console.log(selectedValue);
      this.searchItemId = selectedValue.itemId;
      this.itemName=selectedValue.description;
      this.segment=selectedValue.segment;
    }
  }

  findByCode(searchBy,searchValue){
    // var arrayControl = this.priceListMasterForm.get('priceListDetailList').value
    var priceListHeaderId= this.avgCostUpdateForm .get('priceListHeaderId').value;
    let select1 = this.lstcomments.find(d => d.priceListHeaderId === priceListHeaderId);
    console.log('(select1.priceListDetailList) ' +select1.priceListDetailList);
    console.log(select1.priceListDetailList.length);
    var data : any=[] ;
    if(searchBy== 'ITEM DESCRIPTION'){
      for(let i=0; i<select1.priceListDetailList.length; i++){
        if(select1.priceListDetailList[i].itemDescription.includes(searchValue)){
          data.push(select1.priceListDetailList[i])
        }
      }
    }
    if(searchBy== 'ITEM CODE'){
      for(let i=0; i<select1.priceListDetailList.length; i++){
        if(select1.priceListDetailList[i].segment.includes(searchValue)){
          data.push(select1.priceListDetailList[i])
        }
      }
    }
    console.log(data);
    // let select = (select1.priceListDetailList).find(d => d.itemDescription.includes(searchValue));
    // console.log(select);
    for(let i=0; i<this.lineDetailsArray.length; i++){ 
      this.lineDetailsArray().removeAt(i);
    }
    this.lineDetailsArray().clear();
    // alert(this.lineDetailsArray.length);
    var control = this.avgCostUpdateForm .get('priceListDetailList') as FormArray;
    for (let i=0; i<data.length;i++) {
      var priceListDetailList:FormGroup=this.lineDetailsGroup();
      control.push(priceListDetailList);
    }
    this.avgCostUpdateForm .get('priceListDetailList').patchValue(data);
  }


  validateAvgPrice(index: any){
    // alert("price validation " +index);

    var priceLineArr = this.avgCostUpdateForm.get('priceListDetailList').value;
    var linePrice = priceLineArr[index].actualCost;
    

    if (linePrice <=0 ) 
    {
       alert (linePrice+" << Invalid Avg Price Rate. Avg Price value should be above 0")

       var patch = this.avgCostUpdateForm.get('priceListDetailList') as FormArray;
       patch.controls[index].patchValue({actualCost:''})
    }
    // return;
    
  }


}


 
