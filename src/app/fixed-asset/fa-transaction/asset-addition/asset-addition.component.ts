import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FixedAssetService } from '../../FixedAsset.service';
import { MasterService } from 'src/app/master/master.service';

interface IAssetAddition{
  assetNumber:number;
  description:string;
  tagNumber:number;
  serialNumber:number;
  attributeCategoryCode:string;
  assetCategoryId:number;
  assetKeyCcid:number;
  assetType:string;
  currentUnits:number;
  parentAssetId:number;
  modelNumber:number;
  inUseFlag:string;
  inventorial:string;
  propertyTypeCode:string;
  property12451250Code:string;
  ownedLeased:string;
  newUsed:string;
  assNumber:number;
    lstcomment: any;
    costToClear:number;
    originalCost:number;
    netBookValue:number;
    method:string;
    lifeYearMonth:number;
    datePlacedInService:Date;
    salvageAmt:number;
    recoverableCost:number;
    manufacturerName:string;
}


@Component({
  selector: 'app-asset-addition',
  templateUrl: './asset-addition.component.html',
  styleUrls: ['./asset-addition.component.css']
})
export class AssetAdditionComponent implements OnInit {
AssetAdditionForm:FormGroup;
assetNumber:number;
description:string;
tagNumber:number;
serialNumber:number;
attributeCategoryCode:string;
assetCategoryId:number;
assetKeyCcid:number;
assetType:string;
currentUnits:number;
parentAssetId:number;
modelNumber:number;
inUseFlag:string;
inventorial:string;
propertyTypeCode:string;
property12451250Code:string;
ownedLeased:string;
newUsed:string;
assNumber:number;
  lstcomment: any=null;
  costToClear:number;
  originalCost:number;
  netBookValue:number;
  method:string;
  lifeYearMonth:number;
  datePlacedInService:Date;
  salvageAmt:number;
  recoverableCost:number;
  manufacturerName:string;
  segment11:string;
  lookupValueDesc2:string;
  category:string;
  subCode:string;
  lookupValueDesc3:string;
  lookupValueDesc4:string;
  lookupValueDesc5:string;
  locationCode:string;
  companyCode:string;
  public MainorCat:Array<string>=[];
  public BranchList:Array<string>=[];
  public locIdList:Array<string>=[];
  public CompanyList:Array<string>=[];
  public Saltyp:any[];
  public MajorCat:any[];
  branch: any;
  lookupValueDesc1:string;
  showModal:boolean;
  segmentNameList: any;
  assetkey:string;
  keyList: any;
  OwnerList: any;
  BoughtList: any;
  assetTypeList: any;
  bookTypeCode:string;
  comment:string;  
  ytdDeprc:number;
  accDeprc:number;
  salValType:string;
  saleValPer:number;
  month:number;
  prorateConc:string;
  prorateDate:Date;
  limitAmt:number;
  percent:number;
  amortDate:Date;
  ceil:string;
  amortlife:string;
  employeeName:string;
  employeeNo:number;
  segmentName:string;
  locationName:string;
  codeCombinationId:number;
  locationId:number;
  title: string;
  content: number;
  segment2:number;
  postedDate:Date;
  segment3:number;
  segment4:number;
   segment5:string;
   userList2: any[] = [];
  lastkeydown1: number = 0;
  userList3: any[] = [];
  lastkeydown2: number = 0;
  public InterBrancList:Array<string>=[];
  faDistributionId:number;
  transactionUnits:number;
  tranDate:Date;
  basicRate:number;
  adjustedRate:number;

  public CostCenterList:Array<string>=[];
  public NaturalAccountList:Array<string>=[];
  public emplList:Array<string>=[];
  public suppList:Array<string>=[];
  unitsAssigned:number;
  depreciateFlag:string
  lstDepriciation: any[];
  lifeInMonth:number;

constructor(private fb: FormBuilder, private router: Router, private fixedAssetservice:FixedAssetService,private service: MasterService) {
  this.AssetAdditionForm=fb.group({ 
    assetNumber:[],
    description:[],
    tagNumber:[],
    serialNumber:[],
    attributeCategoryCode:[],
    assetCategoryId:[],
    assetKeyCcid:[],
    assetType:[],
    currentUnits:[],
    modelNumber:[],
    parentAssetId:[],
    inUseFlag:[],
    inventorial:[],
    propertyTypeCode:[],
    property12451250Code:[],
    ownedLeased:[],
    newUsed:[],
    assNumber:[],
    costToClear:[],
    originalCost:[],
    netBookValue:[],
    method:[],
    lifeYearMonth:[],
    datePlacedInService:[],
    salvageAmt:[],
    recoverableCost:[],
    manufacturerName:[],
    segment11:[],
    lookupValueDesc1:[],
    lookupValueDesc2:[],
    category:[],
    subCode:[],
    lookupValueDesc3:[],
    lookupValueDesc4:[],
    lookupValueDesc5:[],
    locationCode:[],
    companyCode:[],
    assetkey:[],
    bookTypeCode:[],
    comment:[],
    ytdDeprc:[],
    accDeprc:[],
    salValType:[],
    saleValPer:[],
    month:[],
    prorateConc:[],
    prorateDate:[],
    limitAmt:[],
    percent:[],
    amortDate:[],
    ceil:[],
    amortlife:[],
        segment2:[''],
      segment3:[''],
      segment4:[''],
    
      segment5:[''],
      depreciateFlag:[],
      lifeInMonth:[],
      basicRate:[],
      adjustedRate:[],
      faDisHisLst:this.fb.array([]),
  })
}
faDisHisLst():FormArray{
  return this.AssetAdditionForm.get("faDisHisLst") as FormArray
}
newfaDisHisLst():FormGroup{
  return this.fb.group({
    employeeName:[],
    employeeNo:[],
    segmentName:[],
    locationName:[],
    unitsAssigned:[],
    codeCombinationId:[],
    locationId:[],
    faDistributionId:[],
    transactionUnits:[],
    tranDate:[],
  })
}

addnewfaDisHisLst(){
  this.faDisHisLst().push(this.newfaDisHisLst());
  var len=this.faDisHisLst().length;
//   var patch=this.JournalVoucherForm.get('glLines') as FormArray
//   (patch.controls[len - 1]).patchValue(
//    {
//      jeLineNum: len,
//    }
//  );

  }
  removefaDisHisLst(assLineIndex){
    this.faDisHisLst().removeAt(assLineIndex);
    
  }
assetAddition(AssetAdditionForm:any){}
  ngOnInit(): void {
    this.service.BranchList()
    .subscribe(
      data => {
        this.BranchList = data;
        console.log(this.BranchList);
      }
    );
    this.fixedAssetservice.MainCatList()
    .subscribe(
      data => {
        this.MajorCat = data;
        console.log(this.MajorCat);
      }
    );
    this.fixedAssetservice.salTypeList()
    .subscribe(
      data => {
        this.Saltyp = data;
        console.log(this.MajorCat);
      }
    );

    this.fixedAssetservice.MinorCatList()
    .subscribe(
      data => {
        this.MainorCat = data;
        console.log(this.MajorCat);
      }
    );
    this.service.locationCodeList()
      .subscribe(
        data => {
          this.locIdList = data;
          console.log(this.locIdList);
        }
      );
      this.fixedAssetservice.companyCodeList()
      .subscribe(
        data => {
          this.CompanyList = data;
          console.log(this.MajorCat);
        }
      );
      this.fixedAssetservice.ownershipList()
      .subscribe(
        data => {
          this.OwnerList = data;
          console.log(this.OwnerList);
        }
      );
      this.fixedAssetservice.boughtList()
      .subscribe(
        data => {
          this.BoughtList = data;
          console.log(this.MajorCat);
        }
      );
      this.fixedAssetservice.assTypeList()
      .subscribe(
        data => {
          this.assetTypeList = data;
          console.log(this.MajorCat);
        }
      );
      this.service.CostCenterList()
    .subscribe(
      data => {
        this.CostCenterList = data;
        console.log(this.CostCenterList);
      }
    );
    this.service.empIdListFn().subscribe(
      data=>{
        this.emplList=data;
      }
    )
    this.service.supplierCodeList().subscribe(
      data=>{
        this.suppList=data;
      }
    )
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
  
      this.addnewfaDisHisLst();
  }
  
onOptionsSelectedBranch(segment: any, lType: string) {
  if(segment!=undefined)
  {var temp1 = segment.split('--');
  // alert(temp1[0]);
var segment = temp1[0];}
  this.service.getInterBranch(segment, lType).subscribe(
    data => {
      this.branch = data;
      console.log(this.branch);
      if (this.branch != null) {
       
        if (lType === 'SS_Branch') {
          this.lookupValueDesc1 = this.branch.lookupValueDesc;
        }
        if (lType === 'SS_Main') {
          this.lookupValueDesc2 = this.branch.lookupValueDesc;
        }
        if (lType === 'SS_Minor') {
          this.lookupValueDesc3 = this.branch.lookupValueDesc;
        }
        if (lType === 'SS_Location') {
          this.lookupValueDesc4 = this.branch.lookupValueDesc;
        }
        if (lType === 'SS_CompanyCode') {
          this.lookupValueDesc5= this.branch.lookupValueDesc;
        }
      }

    }
  );

    }
    openCodeCombination()
    {
   
      let SegmentName1=this.AssetAdditionForm.get('attributeCategoryCode').value;
      // alert(SegmentName1);
      
      if(SegmentName1===null)
      {this.AssetAdditionForm.get('segment11').reset();
      this.AssetAdditionForm.get('category').reset();
      this.AssetAdditionForm.get('subCode').reset();
      

      this.AssetAdditionForm.get('lookupValueDesc1').reset();
      this.AssetAdditionForm.get('lookupValueDesc2').reset();
      this.AssetAdditionForm.get('lookupValueDesc3').reset();
    }
    if(SegmentName1!=null)
    {
      var temp = SegmentName1.split('.');
      // alert(temp[0]);
      this.segment11 = temp[0];
      this.category = temp[1];
      this.subCode= temp[2];
      
    }
      // this.showModal = true;

    }
    fnCancatination()
    {
      this.attributeCategoryCode=this.AssetAdditionForm.get('segment11').value+'.'+
                       this.AssetAdditionForm.get('category').value+'.'+
                       this.AssetAdditionForm.get('subCode').value;
                    

      // alert(this.attributeCategoryCode);

      this.fixedAssetservice.categoryExist(this.attributeCategoryCode)
      .subscribe(
        data => {
          console.log(data.obj);
          this.segmentNameList = data.obj;
          console.log(this.segmentNameList);
          // alert(data.obj.length);
          if (data.code === 200) {
            // this.AccountEnquiryForm.patchValue({codeCombinationId:this.segmentNameList.obj.codeCombinationId});
            if (this.segmentNameList.length === 0) {
              alert('Invalid Code Combination');
            } else {
              // alert('else Loop');
              console.log(this.segmentNameList);
              // this.assetCategoryId = Number(data.obj.categoryId)
              this.AssetAdditionForm.patchValue({assetCategoryId:data.obj.categoryId});
              this.AssetAdditionForm.patchValue({method:data.obj.deprnMethod,ownedLeased:data.obj.ownedLeased,inventorial:data.obj.inventorial,
                bookTypeCode:data.obj.bookTypeCode,prorateConc:data.obj.prorateConventionCode,depreciateFlag:data.obj.depreciateFlag,
                salValType:data.obj.salValType,saleValPer:data.obj.percent,lifeInMonth:data.obj.lifeInMonth,lifeYearMonth:data.obj.lifeYearMonth});
                this.segment4=this.segmentNameList.deprnExpenseAcct;
                // alert(this.segment4+'seg');
              // this.method=this.segmentNameList.deprnMethod;
              
            }
          } else if (this.segmentNameList.code === 400) {
            this.AssetAdditionForm.patchValue({attributeCategoryCode:''});
      

          }
        }
      );
      
    }
    openkeycombination(){
      let keyName1=this.AssetAdditionForm.get('assetkey').value;
      // alert(keyName1);
      
      if(keyName1===null)
      {this.AssetAdditionForm.get('locationCode').reset();
      this.AssetAdditionForm.get('companyCode').reset();
      this.AssetAdditionForm.get('segment3').reset();
      this.AssetAdditionForm.get('lookupValueDesc4').reset();
      this.AssetAdditionForm.get('lookupValueDesc5').reset();
          }
    if(keyName1!=null)
    {
      var temp = keyName1.split('.');
      // alert(temp[0]);
      this.companyCode = temp[0];
      this.locationCode = temp[1];
      this.segment3=temp[2];
           
    }
      // this.showModal = true;

    }
    keyConcatenate(){
      this.assetkey=this.AssetAdditionForm.get('companyCode').value+'.'+
      this.AssetAdditionForm.get('locationCode').value+'.'+this.AssetAdditionForm.get('segment3').value;
                                           

      // alert(this.assetkey);

      this.fixedAssetservice.keyExist(this.assetkey)
      .subscribe(
        data => {

          this.keyList = data;
          if (this.keyList.code === 200) {
            // this.AccountEnquiryForm.patchValue({codeCombinationId:this.segmentNameList.obj.codeCombinationId});
            if (this.keyList.length == 0) {
              alert('Invalid Code Combination');
            } else {
              console.log(this.keyList);
              // this.assetKeyCcid = Number(this.keyList.faCodeCombinationId)
              this.AssetAdditionForm.patchValue({assetKeyCcid:this.keyList.obj.faCodeCombinationId});
              var patcharr=this.AssetAdditionForm.get('faDisHisLst') as FormArray;
              patcharr.controls[0].patchValue ({locationName:this.keyList.obj.segment4,locationId:this.keyList.obj.faLocationId,
                segmentName:this.keyList.obj.segmentName,codeCombinationId:this.keyList.obj.assetKeyCcid})
              // this.AssetAdditionForm.patchValue({locationName:this.keyList.obj.segment4,faLocationId:this.keyList.obj.faLocationId,
              //   segmentName:this.keyList.obj.segmentName,codeCombinationId:this.keyList.obj.assetKeyCcid})
            }
          } else if (this.keyList.code === 400) {
            this.AssetAdditionForm.patchValue({assetkey:''});
      

          }
        }
      );
      
    }
  resetMast() {  window.location.reload();   }

 
  closeMast() {  this.router.navigate(['admin']);  }

  search(assNumber){
      // alert(assNumber+'ty');
      this.faDisHisLst().clear;
      this.fixedAssetservice.getAssetSearch(assNumber).subscribe
      (data =>
       {
         console.log(data);
         this.lstcomment=data;
         this.lstDepriciation=data.faDprnLst
         console.log(this.lstcomment);
         
        //  console.log(this.lstcomment.bookTypeCode);
        //  for(let i=0;i< this.lstDepriciation.length)
        //  this.AssetAdditionForm.patchValue({ownedLeased:this.lstcomment.ownedLeased});
        //  this.AssetAdditionForm.disable()  ;
        var len = this.faDisHisLst().length;
        // alert('len ' + len)
        // alert('anita' + data.jobCardMatLines.length)
        let faDisHisLstpush= this.AssetAdditionForm.get('faDisHisLst') as FormArray;
        this.faDisHisLst().clear;
        alert(data.faDisHisLst.length);
        for (let i = 0; i < data.faDisHisLst.length-len; i++) {
          var faTransfer: FormGroup = this.newfaDisHisLst();
          faDisHisLstpush.push(faTransfer);
        }
        this.AssetAdditionForm.patchValue(this.lstcomment);
       this.AssetAdditionForm.get('faDisHisLst').patchValue(data.faDisHisLst);
       }
       );
    
  }
  fnCancat(i)
  {
    var Code=this.AssetAdditionForm.get('faDisHisLst').value;
    var patch =this.AssetAdditionForm.get('faDisHisLst') as FormArray;
    // patch.controls[i].patchValue({segment4:this.segmentNameList.deprnExpenseAcct});
    // alert(this.segment4);
    var natacc =this.AssetAdditionForm.get('segment4').value;
    // alert(natacc1[0]);
    // var natacc=natacc1[0];
    Code[i].segmentName=this.AssetAdditionForm.get('segment11').value+'.'+
                        this.AssetAdditionForm.get('segment2').value+'.'+
                        this.AssetAdditionForm.get('segment3').value+'.'+
                    //  this.JournalVoucherForm.get('segment4').value+'.'+
                        natacc+'.'+
                        this.AssetAdditionForm.get('segment5').value;

    // alert(this.segmentName);
    var segmentName=Code[i].segmentName;
    // alert(segmentName+"before patch");
    patch.controls[i].patchValue({'segmentName':segmentName});
    // alert(segmentName+"after patch");
    this.service.segmentNameList(segmentName)
    .subscribe(
      data => {

        this.segmentNameList = data;
        if (this.segmentNameList.code === 200) {
          // this.AssetAdditionForm.patchValue({codeCombinationId:this.segmentNameList.obj.codeCombinationId});
          if (this.segmentNameList.length == 0) {
            alert('Invalid Code Combination');
          } else {
            console.log(this.segmentNameList);
            // this.codeCombinationId = Number(this.segmentNameList.codeCombinationId)
            patch.controls[i].patchValue({codeCombinationId:this.segmentNameList.obj.codeCombinationId});
          }
        } else if (this.segmentNameList.code === 400) {
          // var arraycontrol =this.JournalVoucherForm.get('glLines').value;
          patch.controls[i].patchValue({segmentName : ''});
          // alert(this.segmentNameList.message);

        }
      }
    );
    // this.JournalVoucherForm.get('segment11').reset();
    // this.JournalVoucherForm.get('segment2').reset();
    // this.JournalVoucherForm.get('segment3').reset();
    // this.JournalVoucherForm.get('segment4').reset();
    // this.JournalVoucherForm.get('segment5').reset();

    // this.JournalVoucherForm.get('lookupValueDesc1').reset();
    // this.JournalVoucherForm.get('lookupValueDesc2').reset();
    // this.JournalVoucherForm.get('lookupValueDesc3').reset();
    // this.JournalVoucherForm.get('lookupValueDesc4').reset();
    // this.JournalVoucherForm.get('lookupValueDesc5').reset();
    // // alert('Code Combination search complete')
  }

  openCombination(i)
  {
    var natacc =this.AssetAdditionForm.get('segment4').value;
    // alert(natacc1[0]);
    // var natacc=natacc1[0];

    let SegmentName1=this.faDisHisLst().controls[i].get('segmentName').value;

    if(SegmentName1===null)
    {
      this.AssetAdditionForm.get('segment11').reset();
    this.AssetAdditionForm.get('segment2').reset();
    this.AssetAdditionForm.get('segment3').reset();
    // this.AssetAdditionForm.get('segment4').reset();
    this.AssetAdditionForm.get('segment5').reset();

    this.AssetAdditionForm.get('lookupValueDesc1').reset();
    this.AssetAdditionForm.get('lookupValueDesc2').reset();
    this.AssetAdditionForm.get('lookupValueDesc3').reset();
    this.AssetAdditionForm.get('lookupValueDesc4').reset();
    this.AssetAdditionForm.get('lookupValueDesc5').reset();
   }
  if(SegmentName1!=null)
  {
    var temp = SegmentName1.split('.');
    // alert(temp[0]);
    this.segment11 = temp[0];
    this.segment2 = temp[1];
    this.segment3 = temp[2];
    this.segment4 = temp[3];
    // natacc=temp[3];
    this.segment5 = temp[4];
  }
  this.content = i;
  let a = i + 1
  this.title = "Account Code Combination :" + a;


  }
  fnlocCancat(i)
  {
    var Code=this.AssetAdditionForm.get('faDisHisLst').value;
    var patch =this.AssetAdditionForm.get('faDisHisLst') as FormArray;
    Code[i].locationName=this.AssetAdditionForm.get('segment2').value+'.'+
                        this.AssetAdditionForm.get('segment3').value;
                    
    // alert(this.segmentName);
    var segmentName=Code[i].locationName;
    // alert(segmentName+"before patch");
    patch.controls[i].patchValue({'locationName':segmentName});
    // alert(segmentName+"after patch");
    this.fixedAssetservice.locationExist(segmentName)
    .subscribe(
      data => {

        this.segmentNameList = data;
        if (this.segmentNameList.code === 200) {
          // this.AssetAdditionForm.patchValue({codeCombinationId:this.segmentNameList.obj.codeCombinationId});
          if (this.segmentNameList.length == 0) {
            alert('Invalid Code Combination');
          } else {
            console.log(this.segmentNameList);
            // this.codeCombinationId = Number(this.segmentNameList.codeCombinationId)
            patch.controls[i].patchValue({locationId:this.segmentNameList.obj.faLocationId});
          }
        } else if (this.segmentNameList.code === 400) {
          // var arraycontrol =this.JournalVoucherForm.get('glLines').value;
          patch.controls[i].patchValue({locationName : ''});
          // alert(this.segmentNameList.message);

        }
      }
    );
    // this.JournalVoucherForm.get('segment11').reset();
    // this.JournalVoucherForm.get('segment2').reset();
    // this.JournalVoucherForm.get('segment3').reset();
    // this.JournalVoucherForm.get('segment4').reset();
    // this.JournalVoucherForm.get('segment5').reset();

    // this.JournalVoucherForm.get('lookupValueDesc1').reset();
    // this.JournalVoucherForm.get('lookupValueDesc2').reset();
    // this.JournalVoucherForm.get('lookupValueDesc3').reset();
    // this.JournalVoucherForm.get('lookupValueDesc4').reset();
    // this.JournalVoucherForm.get('lookupValueDesc5').reset();
    // // alert('Code Combination search complete')
  }

  openlocationCombination(i)
  {
     let SegmentName1=this.faDisHisLst().controls[i].get('locationName').value;

    if(SegmentName1===null)
    {
    this.AssetAdditionForm.get('segment2').reset();
    this.AssetAdditionForm.get('segment3').reset();
   

    this.AssetAdditionForm.get('lookupValueDesc2').reset();
    this.AssetAdditionForm.get('lookupValueDesc3').reset();
   }
  if(SegmentName1!=null)
  {
    var temp = SegmentName1.split('.');
    // alert(temp[0]);
   
    this.segment2 = temp[1];
    this.segment3 = temp[2];
   }
  this.content = i;
  let a = i + 1
  this.title = "Location Code Combination :" + a;


  }
  getEmplData($event)
  {
    let userId=(<HTMLInputElement>document.getElementById('EmpDataFirstWay')).value;
   this.userList2=[];
   if (userId.length > 2) {
    if ($event.timeStamp - this.lastkeydown1 > 200) {
      this.userList2 = this.searchFromArray2(this.emplList, userId);
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
  searchFromArray2(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };
  getSuppData($event)
  {
    let userId=(<HTMLInputElement>document.getElementById('SuppDataFirstWay')).value;
   this.userList3=[];
   if (userId.length > 2) {
    if ($event.timeStamp - this.lastkeydown2 > 200) {
      this.userList3 = this.searchFromArray1(this.suppList, userId);
    }
  }
  }

  assAddSave()
  {
         const formValue:IAssetAddition=this.AssetAdditionForm.value;
      this.fixedAssetservice.assAddPost(formValue).subscribe((res:any)=>{
        if(res.code===200)
        {
          alert("Asset Addition Done Successfully");
          console.log(res.obj);
          
          this.AssetAdditionForm.patchValue({'assetNumber':res.obj})
          this.AssetAdditionForm.disable();
        }
        else
       {
          if (res.code === 400) 
          {
            alert("Code already present in data base");
            // this.AssetAdditionForm.reset();
          }
        }
     })
    }


    costCalculation(event:any)
    {
        // alert(event.target.value);
        var cost=event.target.value;
          var assetKeyId=this.AssetAdditionForm.get('assetCategoryId').value
        this.fixedAssetservice.AmtCalc(cost,assetKeyId).subscribe(
          data=>{
         
            this.AssetAdditionForm.patchValue({recoverableCost:data.recovCost,salvageAmt:data.salAmt,originalCost:cost,
              netBookValue:data.netBookValue,accDeprc:data.accDeprc,ytdDeprc:data.ytdDeprc})
          }
        )       
      }
      AssetTransfer() {
        const formValue:IAssetAddition = this.AssetAdditionForm.value;
        this.fixedAssetservice.AssetTransfer(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            alert('Asset Transfer SUCCESSFULLY');
            // window.location.reload();
            this.AssetAdditionForm.disable();
          } else {
            if (res.code === 400) {
              alert('ERROR OCCOURED IN PROCEESS');
              this.AssetAdditionForm.reset();
            }
          }
        });
      };
  
}
