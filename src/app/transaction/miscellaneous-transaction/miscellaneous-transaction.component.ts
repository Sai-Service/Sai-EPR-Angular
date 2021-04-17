
import { PathLocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';

interface Imiscellaneous
{
  invItemId:number;
  compNo:string;
  codeCombinationId:number;
  compileId:number;
  segmentName:string;
  adjustmentQty:number;
  physicalQty:number;
  systemQty:number;
  locatorId:number;
  subInventory:string;
  itemUnitCost:number;
  uom:string;
  description:string;
  locId:number;
  deptId:number;
  divisionId:number;
  lookupValueDesc1:string;
  segment2:number;
  lookupValueDesc2:string;
  segment3:number;
  lookupValueDesc3:string;
  segment4:number;
  lookupValueDesc4:string;
  segment5:string;
  lookupValueDesc5:string;
  compileStatus:string;
  compileType:number;
  reason:string;
  reasonName:string;
  entryStatusCode:number;
  LocatorSegment:string;
  Floor:string;
  Rack:string;
  RackNo:number;
  Row:string;
  RowNo:number;
  itemId:number;
  subInventoryCode:string;
  LocatorSegment1:string;
  compileName:string;
  approvedBy:string;
  totalCompileItems:number;
  totalItemValue:number;
  compileDate:Date;
  compileLineId:number;
  Adjustment:string;
  Approve:string;
  trans:string;
  CostDetail:number;
}
@Component({
  selector: 'app-miscellaneous-transaction',
  templateUrl: './miscellaneous-transaction.component.html',
  styleUrls: ['./miscellaneous-transaction.component.css']
})
export class MiscellaneousTransactionComponent implements OnInit {
  miscellaneousForm:FormGroup;
  public ItemIdList:any[];
  public subInvCode:any[];
  compNo:string;
  public transType:Array<string>=[];
  invItemId:number;
  userList2: any[] = [];
  lastkeydown1: number = 0;
  segmentName:string;
  adjustmentQty:number;
  physicalQty:number;
  compileId:number;
  systemQty:number;
  locatorId:number;
  subInventory:string;
  itemUnitCost:number;
  uom:string;
  description:string;
  locId:number;
  deptId:number;
  divisionId:number;
  getItemDetail:any;
  CostDetail:any;
  subInventoryId:number;
  processItemList:any;
  segment11:string;
  lookupValueDesc1:string;
  segment2:number;
  lookupValueDesc2:string;
  segment3:number;
  trans:string;
  lookupValueDesc3:string;
  segment4:number;
  lookupValueDesc4:string;
  segment5:string;
  lookupValueDesc5:string;
  branch:any;
  public InterBrancList:Array<string>=[];
  public BranchList:Array<string>=[];
  public CostCenterList:Array<string>=[];
  public NaturalAccountList:Array<string>=[];
  public locIdList:Array<string>=[];
  public TypeList:Array<string>=[];
  public issueByList:Array<string>=[];
  segmentNameList:any;
  codeCombinationId:number;
  compileType:number;
  reason:string;
  reasonlist:any;
  compileStatus:string="OPEN"
  entryStatusCode:number;
  LocatorSegment:string;
  Floor:string;
  Rack:string;
  RackNo:number;
  showModal:boolean;
  Row:string;
  RowNo:number;
  itemId:number;
  onHnQty:number;
  subInventoryCode:string;
  getItemDetail1:any;
  LocatorSegment1:string;
  LocatorList:any;
  compileName:string;
  approvedBy:string;
  click : boolean = false;
  totalCompileItems:number;
  totalItemValue:number;
  compileDate:Date;
  lstcomment:any;
  segment:string;
  srlNo:number;
  compileLineId:number;
  Adjustment:string;
  Approve:string;
  content: number;
  title: string;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService)
  {
    this.miscellaneousForm=fb.group({
      compNo:[''],
      compileName:[''],
      compileId:[''],
      locId:[''],
      subInventory:[''],
      segmentName:[''],
      segment11:[''],
      segment2:[''],
      segment3:[''],
      segment4:[''],
      lookupValueDesc1:[''],
      lookupValueDesc2:[''],
      lookupValueDesc3:[''],
      lookupValueDesc4:[''],
      segment5:[''],
      trans:[''],
      lookupValueDesc5:[''],
      codeCombinationId:[''],
      compileType:[''],
      reason:[''],
      compileStatus:[''],
      approvedBy:[''],
      description:[''],
      totalCompileItems:[''],
      totalItemValue:[''],
      compileDate:[''],
      segment:[''],
      itemId:[''],
      Adjustment:[''],
      Approve:[''],
      Floor:[''],
    Rack:[''],
    RackNo:[''],
    Row:[''],
    RowNo:[''],
      cycleLinesList:this.fb.array([]),

    })
  }
  cycleLinesList():FormArray{
    return this.miscellaneousForm.get("cycleLinesList") as FormArray
 }
 newcycleLinesList(): FormGroup{
  return this.fb.group({
    compileId:[''],
    compileLineId:[''],
    LinNo:[''],
    invItemId:[''],
    adjustmentQty:[''],
    physicalQty:[''],
    systemQty:[''],
    locatorId:[''],
    subInventory:[''],
    itemUnitCost:[''],
    uom:[''],
    description:[''],
    divisionId:[''],
    entryStatusCode:[''],
    LocatorSegment:[''],

    locId:[''],
    itemId:[''],
    onHnQty:[''],
    segment:[''],
    srlNo:[''],
  })}

  addnewcycleLinesList(){

    this.cycleLinesList().push(this.newcycleLinesList());

   }
  removenewcycleLinesList(trxLineIndex){
    this.cycleLinesList().removeAt(trxLineIndex);
  }
  ngOnInit(): void {

    this.locId=Number(sessionStorage.getItem('locId'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    document.getElementById("processButton").setAttribute("disabled","disabled");
     this.addnewcycleLinesList();



        this.service.subInvCode().subscribe(
          data => {this.subInvCode = data;
             console.log(data);
            // alert('subInventoryCode');
           });
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
      this.service.TransactionType().subscribe(
        data=>{
          this.transType=data;
        }
      );
       this.service.ReasonList().subscribe(
         data=>{
           this.reasonlist=data;
         }
       )
       this.service.TypeList().subscribe(
        data=>{
          this.TypeList=data;
        }
      )

      this.service.ItemIdList().subscribe(
            data =>{ this.ItemIdList = data;
              console.log(this.ItemIdList);

         });
         this.service.issueByList(this.locId,this.deptId,this.divisionId).subscribe
      (data => {this.issueByList = data;
          console.log(this.issueByList);
        });


  }
  miscellaneous(miscellaneousForm:any){}

  getInvItemId($event)
  {
    // alert('in getInvItemId')
     let userId=(<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
     this.userList2=[];
     if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList2 = this.searchFromArray1(this.ItemIdList, userId);
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
  postAdjustment(e)
  {
    if(e.target.checked){
      this.Adjustment='Y'
    }
    else{
      this.Adjustment='N';
    }
  }
  postApprove(e)
  {
    if(e.target.checked){
      this.Approve='Y'
    }
    else{
      this.Approve='N';
    }
  }
  onOptionItemDetails(event:any,i){

     var trxLnArr=this.miscellaneousForm.get('cycleLinesList').value;
    // var itemid=trxLnArr[i].itemId;
    alert(event);
    let select1=this.ItemIdList.find(d=>d.SEGMENT===event);
     if(select1!=undefined)
     {
    console.log(select1);
    // alert(select1.itemId+"itemId")
    var itemId= select1.itemId
    var trxLnArr1=this.miscellaneousForm.get('cycleLinesList')as FormArray;
    trxLnArr1.controls[i].patchValue({invItemId:select1.itemId});
    var subcode=this.miscellaneousForm.get('subInventory').value;
    alert(subcode+'Subcode');
   this.service.getItemDetail(select1.itemId).subscribe
  (data => {this.getItemDetail = data;
    alert("this.getItemDetail.description" + this.getItemDetail.description);
    if(this.getItemDetail.description !=undefined){
      trxLnArr1.controls[i].patchValue({description: this.getItemDetail.description});
      trxLnArr1.controls[i].patchValue({uom:this.getItemDetail.uom});
      trxLnArr1.controls[i].patchValue({entryStatusCode:"Manual"});
      trxLnArr1.controls[i].patchValue({subInventory:subcode})
      trxLnArr1.controls[i].patchValue({locId:Number(sessionStorage.getItem('locId'))})
    }
  } );
  alert(itemId +'ItemName');
  this.service.getCostDetail(Number(sessionStorage.getItem('locId')),itemId).subscribe
  (data =>{
    this.CostDetail=data;
    trxLnArr1.controls[i].patchValue({itemUnitCost:this.CostDetail.rate});
  });
  //   ////////////////
  //   alert(this.locId +"Loc");
  //   alert('this.itemId '+this.itemId )
  //   var subInvCode = this.miscellaneousForm.get('subInventory').value;
  //   // var itemId = this.miscellaneousForm.get('itemId').value;
  //   alert(select1.itemId)
  //   alert(subInvCode);
  //   this.service.getItemDetail11(Number(sessionStorage.getItem('locId')),itemId,subInvCode).subscribe
  //   (data =>{ this.getItemDetail1 = data
  // var sysQty = this.getItemDetail1.onHnQty
  // var LocName=this.getItemDetail1.locatorName
  //      trxLnArr1.controls[i].patchValue({systemQty: sysQty });
  //      trxLnArr1.controls[i].patchValue({LocatorSegment:LocName});
  //      trxLnArr1.controls[i].patchValue({entryStatusCode:'Process'});
  //     })

    }
  }

  onOptiongetItem(event:any,i)
  {
    let select1=this.ItemIdList.find(d=>d.SEGMENT===event);
    var trxLnArr1=this.miscellaneousForm.get('cycleLinesList')as FormArray;
    var trxLnArr=this.miscellaneousForm.get('cycleLinesList').value;
    trxLnArr1.controls[i].patchValue({invItemId:select1.itemId})
    var compId= this.miscellaneousForm.get('compileId').value;
    // var compLnId=trxLnArr.controls[i].get('compileLineId').value;
    var compileType1=this.miscellaneousForm.get('compileType').value;
    var subcode=this.miscellaneousForm.get('subInventory').value;
    // alert(subcode+'Subcode');
    // alert(compId);
    // alert(compLnId+'CompileLineId')
    if(compileType1 == 37)
    {
      this.service.getsearchByCompId(compId,select1.itemId).subscribe(
        data=>{
          if(data.code===400)
          {
            // window.location.reload();
            // alert('hELLO');
            this.service.getItemDetail(select1.itemId).subscribe
          (data => {this.getItemDetail = data;
            alert("this.getItemDetail.description" + this.getItemDetail.description);
            if(this.getItemDetail.description !=undefined){
              trxLnArr1.controls[i].patchValue({description: this.getItemDetail.description});
              trxLnArr1.controls[i].patchValue({uom:this.getItemDetail.uom});
              trxLnArr1.controls[i].patchValue({entryStatusCode:"Manual"});
              trxLnArr1.controls[i].patchValue({subInventory:subcode})
              trxLnArr1.controls[i].patchValue({locId:Number(sessionStorage.getItem('locId'))})
            }
          } );
          this.service.getCostDetail(Number(sessionStorage.getItem('locId')),select1.itemId).subscribe
          (data =>{
            this.CostDetail=data;
            trxLnArr1.controls[i].patchValue({itemUnitCost:this.CostDetail.rate});
          });

          }
          if(data.code===200)
          {
            //  trxLnArr1.controls[i].patchValue(data.obj[0]);
            trxLnArr1.controls[i].patchValue({'compileLineId':data.obj[0].compileLineId,'uom':data.obj[0].uom,'itemUnitCost':data.obj[0].itemUnitCost,'description':data.obj[0].description,'LocatorSegment':data.obj[0].LocatorSegment,'systemQty':data.obj[0].systemQty,'entryStatusCode':data.obj[0].entryStatusCode})

            // alert(data.obj.length);

            if(data.obj.length>1)
            {
              for(let j=1;j<data.obj.length;j++)
              {
                var trxlist:FormGroup=this.newcycleLinesList();
                this.cycleLinesList().push(trxlist);
                 trxLnArr1.controls[i+j].patchValue(data.obj[j]);
            //     //  trxLnArr1.controls[i+j].patchValue({'compileLineId':data.obj[j].compileLineId,'uom':data.obj[j].uom,'itemUnitCost':data.obj[j].itemUnitCost});

              }


            // trxLnArr1.controls[i].patchValue({'compileLineId':data.obj.compileLineId});
        //  return;
            }
          }
        });

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

      }
    );

      }
      OpenLocator(i)
      {
        var LocSegment=this.cycleLinesList().controls[i].get('LocatorSegment').value;

        if (LocSegment===null)
        {
          this.miscellaneousForm.get('Floor').reset();
          this.miscellaneousForm.get('Rack').reset();
          this.miscellaneousForm.get('RackNo').reset();
          this.miscellaneousForm.get('Row').reset();
          this.miscellaneousForm.get('RowNo').reset();
        }
        if(LocSegment!=null)
        {
          var temp = LocSegment.split('.');
          // alert(temp[0]);
          this.Floor= temp[0];
          this.Rack = temp[1];
          this.RackNo = temp[2];
          this.Row = temp[3];
          this.RowNo = temp[4];
        }
            // this.showModal = true;
            this.content = i;
            let a = i + 1
            this.title = "Locator :" + a;


      }

      okLocator(i)
      {

        alert(i);
        var LocSegment=this.miscellaneousForm.get('cycleLinesList').value;
        var patch = this.miscellaneousForm.get('cycleLinesList') as FormArray;
        LocSegment[i].LocatorSegment=this.miscellaneousForm.get('Floor').value+'.'+
                                     this.miscellaneousForm.get('Rack').value+'.'+
                                     this.miscellaneousForm.get('RackNo').value+'.'+
                                     this.miscellaneousForm.get('Row').value+'.'+
                                     this.miscellaneousForm.get('RowNo').value;


        var LocatorSegment1=LocSegment[i].LocatorSegment;
        alert(this.LocatorSegment1);
        patch.controls[i].patchValue({'LocatorSegment': LocSegment[i].LocatorSegment})

        this.service.LocatorNameList(LocatorSegment1,Number(sessionStorage.getItem('locId'))).subscribe
        (data =>{
           this.LocatorList = data

           if(this.LocatorList.code===200)
           {
            (patch.controls[i]).patchValue({ locatorId: this.LocatorList.obj.locatorId })

           if(this.LocatorList.lengh==0)
           {
             alert('Invalid Code Combination');
           }
           else{
             this.locatorId=(this.LocatorList.locatorId);
           }
          }
          else if (this.LocatorList.code===400) {
            var arraycontrol =this.miscellaneousForm.get('cycleLinesList').value;
            patch.controls[i].patchValue({LocatorSegment : ''});
          }

          });
          this.miscellaneousForm.get('Floor').reset();
          this.miscellaneousForm.get('Rack').reset();
          this.miscellaneousForm.get('RackNo').reset();
          this.miscellaneousForm.get('Row').reset();
          this.miscellaneousForm.get('RowNo').reset();
          alert('locator search complete')
       }

      openCodeCombination()
      {
        let SegmentName1=this.miscellaneousForm.get('SegmentName').value;
        if(SegmentName1===null)
        {this.miscellaneousForm.get('segment11').reset();
        this.miscellaneousForm.get('segment2').reset();
        this.miscellaneousForm.get('segment3').reset();
        this.miscellaneousForm.get('segment4').reset();
        this.miscellaneousForm.get('segment5').reset();

        this.miscellaneousForm.get('lookupValueDesc1').reset();
        this.miscellaneousForm.get('lookupValueDesc2').reset();
        this.miscellaneousForm.get('lookupValueDesc3').reset();
        this.miscellaneousForm.get('lookupValueDesc4').reset();
        this.miscellaneousForm.get('lookupValueDesc5').reset();
      }
      if(SegmentName1!=null)
      {
        var temp = SegmentName1.split('.');
        // alert(temp[0]);
        this.segment11 = temp[0];
        this.segment2 = temp[1];
        this.segment3 = temp[2];
        this.segment4 = temp[3];
        this.segment5 = temp[4];
      }
        this.showModal = true;

      }
      fnCancatination()
      {
        this.segmentName=this.miscellaneousForm.get('segment11').value+'.'+
                         this.miscellaneousForm.get('segment2').value+'.'+
                         this.miscellaneousForm.get('segment3').value+'.'+
                         this.miscellaneousForm.get('segment4').value+'.'+
                         this.miscellaneousForm.get('segment5').value;

        alert(this.segmentName);

        this.service.segmentNameList(this.segmentName)
        .subscribe(
          data => {

            this.segmentNameList = data;
            if (this.segmentNameList.code === 200) {
              this.miscellaneousForm.patchValue({codeCombinationId:this.segmentNameList.obj.codeCombinationId});
              if (this.segmentNameList.length == 0) {
                alert('Invalid Code Combination');
              } else {
                console.log(this.segmentNameList);
                this.codeCombinationId = Number(this.segmentNameList.codeCombinationId)
              }
            } else if (this.segmentNameList.code === 400) {
              this.miscellaneousForm.patchValue({segmentName:''});
              alert(this.segmentNameList.message);

            }
          }
        );
        this.miscellaneousForm.get('segment11').reset();
        this.miscellaneousForm.get('segment2').reset();
        this.miscellaneousForm.get('segment3').reset();
        this.miscellaneousForm.get('segment4').reset();
        this.miscellaneousForm.get('segment5').reset();

        this.miscellaneousForm.get('lookupValueDesc1').reset();
        this.miscellaneousForm.get('lookupValueDesc2').reset();
        this.miscellaneousForm.get('lookupValueDesc3').reset();
        this.miscellaneousForm.get('lookupValueDesc4').reset();
        this.miscellaneousForm.get('lookupValueDesc5').reset();
      }

      CalculateAdjQuantity(i:number)
      {
        var trxLnArr=this.miscellaneousForm.get('cycleLinesList').value;
        let sysquan=trxLnArr[i].systemQty;
        let phyquan=trxLnArr[i].physicalQty;
        alert(sysquan);
        alert(phyquan);
        let adjqty=0;
        adjqty=phyquan-sysquan;
        var trxLnArr1=this.miscellaneousForm.get('cycleLinesList')as FormArray;
        trxLnArr1.controls[i].patchValue({adjustmentQty: adjqty});
      }
      // onOptionTypeSelected()
      // {
      //   var arrayControl=this.miscellaneousForm.get('cycleLinesList').value;
      //   var patch =this.miscellaneousForm.get('cycleLinesList') as FormArray;
      //   var entryStatusCode=arrayControl[0].entryStatusCode;
      //   var compileType1=this.miscellaneousForm.get('compileType').value;
      //   var locationId=this.miscellaneousForm.get('locId').value;
      //   var subInv=this.miscellaneousForm.get("subInventory").value

      //    if(compileType1==37 )
      //    {
      //      this.service.ItemIdList1(Number(sessionStorage.getItem('locId')),subInv).subscribe(
      //       data =>{ this.processItemList = data;
      //         console.log(this.ItemIdList);
      //         });
      //         patch.controls[0].patchValue({'entryStatusCode':'Process'});
      //    }
      //    else
      //    {
      //   //   this.service.ItemIdList().subscribe(
      //   //     data =>{ this.ItemIdList = data;
      //   //       console.log(this.ItemIdList);

      //   //  });
      //   //  patch.controls[0].patchValue({entryStatusCode:'Manual'});

      //   }

      //   ///remove proccessitemIds from this.itemIdlist and set
      // }
      onOptionInvSelected(i)
      {
        var arrayControl=this.miscellaneousForm.get('cycleLinesList').value;
        var patch =this.miscellaneousForm.get('cycleLinesList') as FormArray;
        var entryStatusCode=arrayControl[i].entryStatusCode;
        var compileType1=this.miscellaneousForm.get('compileType').value;
        // var locationId=this.miscellaneousForm.get('locId').value;
        // var subInv=this.miscellaneousForm.get("subInventoryCode").value


          this.service.ItemIdList().subscribe(
            data =>{ this.ItemIdList = data;
              console.log(this.ItemIdList);
         });


      }
      UpdateMiscData(){
        const formValue:Imiscellaneous=this.miscellaneousForm.get('cycleLinesList').value
        var comId=this.miscellaneousForm.get('compileId').value;
        this.service.miscellaneousUpdate(comId,formValue).subscribe
        ((res:any) => {
           if(res.code===200)
          {
            // this.compileName=obj;
            alert("Record Updated Successfully");
            window.location.reload();
          }
          else
          {
            if (res.code === 400) {
              alert("ERROR OCCOURED IN PROCEESS");
              this.miscellaneousForm.reset();

            }
      }
    })
  }
  transData(val){
   delete val.segment11;
   delete val.segment2;
   delete val.segment3;
   delete val.segment4;
   delete val.lookupValueDesc1;
   delete val.lookupValueDesc2;
   delete val.lookupValueDesc3;
   delete val.lookupValueDesc4;
   delete val.segment5;
   delete val.lookupValueDesc5;
   delete val.segmentName;
    delete val.cycleLinesList;

    return val;
  }
      process()
      {
        // if(compileType1==37 )

        const formValue:Imiscellaneous=this.transData(this.miscellaneousForm.value);
        this.service.miscellaneousSubmit(formValue).subscribe
        ((res:any) => {
          var obj=res.obj.compileName;
          this.compileId=res.obj.compileId
          sessionStorage.setItem('compileName', obj);
          // sessionStorage.setItem('compileId',objId);
          if(res.code===200)
          {
            this.compileName=obj;
            // this.lstcomment=data.obj;
            alert("Record Inserted Successfully");
            // this.miscellaneousForm.patchValue(obj);
            let control =this.miscellaneousForm.get('cycleLinesList') as FormArray;
            var len = this.cycleLinesList().length;
            for(let i=0; i<res.obj.cycleLinesList.length-len; i++){
              var trxlist:FormGroup=this.newcycleLinesList();
              this.cycleLinesList().push(trxlist);

            }


            this.miscellaneousForm.patchValue(res.obj);
            for(let i=0; i<this.cycleLinesList().length; i++){
              alert(res.obj.cycleLinesList[i].segment+'segment');
            this.miscellaneousForm.patchValue({'srlNo':i+1})
            control.controls[i].patchValue({srlNo:i+1  })
            this.miscellaneousForm.patchValue({'segment':res.obj.cycleLinesList[i].segment});
            this.miscellaneousForm.patchValue({'subInventory':res.obj.cycleLinesList[i].subInventory});
            }
            this.miscellaneousForm.disable();
            // document.getElementById("processButton").setAttribute("disabled");
            document.getElementById("processButton").removeAttribute("Enabled");
          }
          else
          {
            if (res.code === 400) {
              alert("Code already present in data base");
              this.miscellaneousForm.reset();

            }
      }
    })
      // this.onOptionTypeSelected();
      }
      onButtonClick(event){

        var compileType1=this.miscellaneousForm.get('compileType').value;
        var compileName1=this.miscellaneousForm.get('compileName').value;
        alert("compile"+compileName1);
        if(compileType1==37 && compileName1==undefined)
        {
        document.getElementById("processButton").removeAttribute("disabled");
        //(event.target as HTMLButtonElement).disabled = false;
        }
      }

      AddAmount()
      {
        // const formValue:Imiscellaneous=this.miscellaneousForm.value;
        var arrayControl=this.miscellaneousForm.get('cycleLinesList').value;
        var patch=this.miscellaneousForm.get('cycleLinesList')as FormArray;
        this.totalItemValue=0;
        this.totalCompileItems=0;
        this.totalCompileItems=patch.length;
        for(var i=0;i<arrayControl.length;i++)
        {
          this.totalItemValue=Number(this.totalItemValue+arrayControl[i].AverageRate);
        }
        this.miscellaneousForm.patchValue({'totalItemValue':this.totalItemValue});
        this.miscellaneousForm.patchValue({'totalCompileItems':this.totalCompileItems});
      }
      Approval()
      {
        const formValue:Imiscellaneous=this.transData(this.miscellaneousForm.value);
        this.service.approve(formValue).subscribe((res:any)=>{
          if(res.code===200)
          {
            alert("Cycle Count Approve Successfully");
            window.location.reload();
          }
          else
          {
            if(res.code===400)
            {
              alert('ERROR OCCOURED IN PROCEESS');
              this.miscellaneousForm.reset();
            }
          }
        })
      }
      searchByCompileID(itemId)
      {

        // alert(itemId+'ID')
        var compileId=this.miscellaneousForm.get('compileId').value;
        // alert(compileId+'CompileID');
        // let select1=this.ItemIdList.find(d=>d.itemid===itemId);
        // var itemId= select1.itemId
        // alert(itemId+'Item');
        this.service.getsearchByCompId(compileId,itemId).subscribe(
          data=>
          {
            if(data.code===400)
            {
              // window.location.reload();
              alert('hELLO');

            }
            if(data.code===200)
            {
              var xx=data.obj;
              console.log(data.obj);
              console.log(xx);
              let patch =this.miscellaneousForm.get('cycleLinesList') as FormArray;
              var control=this.miscellaneousForm.get('cycleLinesList').value;
              var len = this.cycleLinesList().length;
              // alert(control[0].segment );
              if(len === 1 ){
                if(control[0].segment == undefined){
                  // alert('blankline')
                }else{
                  var trxlist:FormGroup=this.newcycleLinesList();
                  this.cycleLinesList().push(trxlist);
                }}

               if(len >1){
                var trxlist:FormGroup=this.newcycleLinesList();
                this.cycleLinesList().push(trxlist);
               }

                // alert(len+'len'+xx.segment)
                var i = len-1;
                // alert('patching at line ' +i);
                patch.controls[i].patchValue(xx[0]);
            // }
            console.log(data.obj);
            // for(let i= 0 ; i<data.obj.length; i++){
            //   control.controls[i].patchValue(data.obj);
            // }
          //  alert(data.obj.compileLineId)
            // this.miscellaneousForm.get('cycleLinesList').patchValue(data.obj);
            //  for(let i=0; i< data.obj.length; i++){
            //   //   alert(data.obj.cycleLinesList[i].subInventory+'subInventory');
              // this.miscellaneousForm.patchValue({'srlNo':i+1})
              // control.controls[i].patchValue({srlNo:i+1  })

              // this.miscellaneousForm.patchValue({'segment':data.obj.segment});
              // this.miscellaneousForm.patchValue({'subInventory':data.obj[i].subInventory});
              // this.miscellaneousForm.patchValue({'compileLineId':data.obj[i].compileLineId})
              // }
          }
          }
        )
      }
      search(compNo)
      {

        var compno=this.miscellaneousForm.get('compNo').value;
        var appflag=this.miscellaneousForm.get('trans').value;
        // var adjFlag=this.miscellaneousForm.get('Adjustment').value;
        // alert(appflag+'flag');
        // alert(adjFlag+'flag');
         if('Adjustment'===appflag)
         {
            this.service.getSearchByNo(compno)
            .subscribe( data =>
             {
                if(data.code===400)
                {
                    window.location.reload();
                 }
                 if(data.code===200)
                 {
        //       this.lstcomment=data.obj;
                    this.miscellaneousForm.patchValue(data.obj);
                 }
              })
          }
          else if('Approve'===appflag)
          {
            this.service.getSearchBycompNo(compno)
            .subscribe( data =>
            {
              if(data.code===400)
              {
                // window.location.reload();
                alert("Hello");
              }
              if(data.code===200)
              {
        //       // this.lstcomment=data.obj;
        let control =this.miscellaneousForm.get('cycleLinesList') as FormArray;
        var len = this.cycleLinesList().length;
        for(let i=0; i<data.obj.cycleLinesList.length-len; i++){
          var trxlist:FormGroup=this.newcycleLinesList();
          this.cycleLinesList().push(trxlist);

        }


        this.miscellaneousForm.patchValue(data.obj);
        for(let i=0; i<this.cycleLinesList().length; i++){
          // alert(data.obj.cycleLinesList[i].segment+'segment');
        this.miscellaneousForm.patchValue({'srlNo':i+1})
        control.controls[i].patchValue({srlNo:i+1  })
        this.miscellaneousForm.patchValue({'segment':data.obj.cycleLinesList[i].segment});
        this.miscellaneousForm.patchValue({'subInventory':data.obj.cycleLinesList[i].subInventory});
        }
        // this.miscellaneousForm.disable();
          }
           })
          }




      }
      resetMiscTrans()
      {
        window.location.reload();
      }
}
