import { PathLocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormArray, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';
import { DatePipe } from '@angular/common';


interface IworkshopReturn
{
  reqNo:string;
  requestNumber:string;
  transactionTypeId:number;
  repairNo:string;
  resveQty:number;
  headerStatus:string;
  creationDate:Date;
  issueBy:string;
  issueTo:string
  remarks:string;
    frmSubInvCode:string;
    toSubInvCode:string;
    description:string;
    trxLineId:number;
    locId:number;
    // divId:number;
    billable:string;
    deptId:number;
    divisionId:number;
    invItemId:number;
    subInventoryCode:string;
    id:number;
    itemId:number;
    frmLocator:string;
    avlqty:number;
    JobNo:string;
}

@Component({
  selector: 'app-work-shop-return',
  templateUrl: './work-shop-return.component.html',
  styleUrls: ['./work-shop-return.component.css']
})
export class WorkShopReturnComponent implements OnInit {
WorkshopReturnForm:FormGroup;
reqNo:string;
  lstcomment: any;

  public transType:any[];
  public subInvCode:any;
  public issueByList:Array<string>=[];
  public issueReturn:Array<string>=[];
  public lstcomment1:any[];
  repairNo:string;
  locId:number;
  divId:number;
  transactionTypeName:string;
  resrveqty:any[];
  frmSubInvCode:string;
  deptId:number;
  id:number;
  divisionId:number;
  Billabletype:any;
  resveQty:number;
  public  onhand1:any;
  billable:string;
  issueTo:string;
  issueBy:string;
  public ItemIdList:Array<string>=[];
  public getfrmSubLoc:Array<string>=[];
  public headerStatus:string='OPEN';
  invItemId:number;
  subInventoryId:number;
  transactionTypeId:number;
  subInventoryCode:string;
  locData =[ {
    "locatorId": 999,
    "segmentName": "D.U.01.D.01",
    "id": 7,
    "onHandQty": 40
  }];
  JobNo:string;
  itemId:number;
  onHandQty:number;
  requestNumber:string;
    name:string;
    toSubInvCode:string;
  disabled=true;
  display = true;
 displayButton= true;
 getItemDetail:any;
 description:string;
 uom:string;
 frmLocator:string;
 avlqty:number;
//  transactionTypeName:string;
 quantity:number;
 pipe = new DatePipe('en-US');
 now=new Date();
 creationDate=this.pipe.transform(this.now,'dd-MM-yyyy')
  subInvdetail: any;


  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) { 
    this.WorkshopReturnForm=fb.group({
      reqNo:[],
      requestNumber:['',[Validators.required]],
      transactionTypeId:['',[Validators.required]],
      repairNo:['',[Validators.required]],
      headerStatus:['',[Validators.required]],
      transactionTypeName:[],
      creationDate:[],
      issueBy:['',[Validators.required]],
      remarks:[],
      frmSubInvCode:['',[Validators.required]],
      toSubInvCode:[''],
      description:[''],
      locId:[''],
      billable:[''],
      divId:[''],
      deptId:[''],
      divisionId:[''],
      
      JobNo:[''],
      issueTo:[],
      trxLinesList:this.fb.array([]),
  
  
     });
    }
    trxLinesList():FormArray{
     
      return this.WorkshopReturnForm.get("trxLinesList") as FormArray
    }
  
    newtrxLinesList(): FormGroup{
      return this.fb.group({
        lineNumber:[''],
        invItemId:[''],
        frmLocatorId:[''],
        uom:[''],
        segmentName:[],
        // quantity:[],
        quantity:['',[Validators.required,Validators.pattern('[0-9]*')]],
        reason:[''],
        // toSubInvCode:[],
        toLocatorId:[],
        description:[],
        segment:[],
        fromLocator:[],
        frmLocator:[],
        resveQty:[],
        avlqty:[''],
        toLocator:[],
        onHandQty:[],
        id:[],
    })
  }

  ngOnInit(): void {
    this.locId=Number(sessionStorage.getItem('locId'));
    // alert(this.locId);
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.issueBy=(sessionStorage.getItem('name'));
    // alert(this.issueBy);
    console.log(this.divisionId);
    this.frmSubInvCode='WIP';
    if(this.frmSubInvCode==='WIP')
    {
      alert('Hello');
      this.service.getsubInv(this.frmSubInvCode).subscribe(
        data=>{
          this.subInvdetail=data;
        }
      );
    }
    
    this.service.transTypereturn().subscribe(
      data =>{ this.transType = data;
        this.transactionTypeId=this.transType[0].transactionTypeId;
       } );

    this.service.subInvCode2(this.deptId,this.divisionId).subscribe(
      data => {this.subInvCode = data;
        console.log(this.subInvCode);
        this.toSubInvCode=this.subInvCode.subInventoryCode;
        // alert('subInventoryCode');
       });

    this.service.issueByList(this.locId,this.deptId,this.divisionId).subscribe
      (data => {this.issueByList = data;
          console.log(this.issueByList);
        });

    // this.service.ItemIdList().subscribe(
    //   data =>{ this.ItemIdList = data;
    //     console.log(this.invItemId);
    //     });
   this.service.issueReturn(this.locId).subscribe(
     data=>{
      this.issueReturn=data;
      console.log(data);
     }
   );
   
   this.addnewtrxLinesList();
   var patch = this.WorkshopReturnForm.get('trxLinesList') as  FormArray
      (patch.controls[0]).patchValue(
     {
       lineNumber: 1,
     }
   );
  }
workshopReturn(WorkshopReturnForm:any){}



addnewtrxLinesList(){
  this.trxLinesList().push(this.newtrxLinesList());
    
var len = this.trxLinesList().length;
var patch = this.WorkshopReturnForm.get('trxLinesList') as FormArray;
(patch.controls[len - 1]).patchValue(
  {
    lineNumber: len,
  }
);
  // this.reservePos();
}
removenewtrxLinesList(trxLineIndex){
  this.trxLinesList().removeAt(trxLineIndex);
}

onSelectjob(event)
{
  alert(event);
  // var jobno=event.target.value;
  this.service.returnBillableType(event).subscribe(
    data=>{
      this.Billabletype=data;
    }
   )
}
onSelectType(event)
{
  var jobno=this.WorkshopReturnForm.get('repairNo').value;
  alert(jobno+'job'+event);
  this.service.itemLst(jobno,event).subscribe(
    data=>{
      this.ItemIdList=data;
    }
  )
}

search(reqNo)
{
 this.trxLinesList().clear();
//  this.display=true;
   var reqNo=(this.WorkshopReturnForm.get('reqNo').value);
   // alert(reqNo);
 //  this.moveOrderForm.reset();
  this.service.getSearchByTrans(reqNo).subscribe
  (data =>
   {
     console.log(data);
     if(data.code === 400){
       // alert(data.message);
       window.location.reload();
     }
     if(data.code===200)
     {
       this.lstcomment=data.obj;
       let control=this.WorkshopReturnForm.get('trxLinesList') as FormArray;
       data.obj.trxLinesList.forEach(f => {
         var trxList:FormGroup=this.newtrxLinesList();
         this.trxLinesList().push(trxList);

       });
       this.WorkshopReturnForm.patchValue(data.obj);
       this.WorkshopReturnForm.patchValue(data.obj.trxLinesList);
      //  this.displayButton=false;
      // this.display=false;
     }
   }
   );
}
newmoveOrder()
{
 var trans=this.transType.find(d=>d.transactionTypeId===this.WorkshopReturnForm.get('transactionTypeId').value);
//  alert(trans.transactionTypeName+'tra');
 console.log(trans);
  const formValue:IworkshopReturn=this.WorkshopReturnForm.value;
  // var subCode=this.WorkshopReturnForm.get('frmSubInvCode').value;
  // formValue.frmSubInvCode = subCode.subInventoryCode;
  this.service.moveOrderSubmit(formValue).subscribe((res:any)=>{
    var obj = res.obj;
        sessionStorage.setItem('requestNumber', obj);
    if(res.code===200)
    {
      // this.moveOrderForm.patchValue({requestNumber:res.obj});
      this.requestNumber=obj.requestNumber;
      this.headerStatus=obj.headerStatus;
      this.frmSubInvCode=obj.frmSubInvCode;
      this.transactionTypeId=trans.transactionTypeName;
      // this.subInventoryCode=subCode.subInventoryCode;
      alert("Record inserted Successfully");
      // this.display=false;
      // this.moveOrderForm.patchValue({frmSubInvCode:subCode});
      for (let i = 0; i < res.obj.trxLinesList.length-1 ; i++) {
        var trxList:FormGroup=this.newtrxLinesList();
        this.trxLinesList().push(trxList);

      }
      this.displayButton=false;
      this.WorkshopReturnForm.disable();
      
      // this.moveOrderForm.reset();
    }
    else
    {
      if (res.code === 400) {
        alert("Code already present in data base");
        this.WorkshopReturnForm.reset();
      }
    }
  })
}

closeReurn()
  {
    this.router.navigate(['admin']);
  }
  resetReturn()
  {
    window.location.reload();
  }
  onOptionSelectedSubInv(event:any,i)
 {
  // alert('2');
  // alert(subCode.subInventoryId);
  // alert('LocID'+this.locId);
  // var subCode=this.moveOrderForm.get('frmSubInvCode').value;
  // let select1= this.subInvCode.find(d=>d.subInventoryCode===this.frmSubInvCode);
  // alert(this.subInvCode.subInventoryId+'ID');
  var subInv=this.subInvdetail.subInventoryId;
  alert(subInv+'sub');
  

  let locId1=this.WorkshopReturnForm.get('locId');
  var jobno=this.WorkshopReturnForm.get('repairNo').value;
  var trxLnArr1 = this.WorkshopReturnForm.get('trxLinesList').value;
  var trxLnArr2 = this.WorkshopReturnForm.get('trxLinesList') as FormArray;
  var itemid=trxLnArr1[i].invItemId;
  alert (itemid);
  // var frmSubCode=trxLnArr1[i].frmSubInvCode;
  // alert("FromSub"+frmSubCode);
  // alert(select1);
  // alert(trxLnArr1.get +"item");

    // alert('Item'+itemid);
  // var subInv=this.subInvCode.subInventoryId;
    this.service.getretfrmSubLoc(this.locId,itemid,subInv,jobno).subscribe(
      data =>{
        //  this.getfrmSubLoc = data;
        console.log(data);
        var getfrmSubLoc =data;
        //   // alert(getfrmSubLoc.segmentName+'SegmentName')
  
  
          // alert(i +'i');
          this.locData[i] = data;
          if(getfrmSubLoc.length==1)
          {
          // this.displayLocator[i]=false;
          trxLnArr2.controls[i].patchValue({onHandId:getfrmSubLoc[0].segmentName});
          trxLnArr2.controls[i].patchValue({locatorId:getfrmSubLoc[0].locatorId});
          trxLnArr2.controls[i].patchValue({frmLocator:getfrmSubLoc[0].segmentName});
          trxLnArr2.controls[i].patchValue({onHandQty:getfrmSubLoc[0].onHandQty});
          trxLnArr2.controls[i].patchValue({id:getfrmSubLoc[0].id});
          }
          else
          {
           // this.getfrmSubLoc=data;;
         //  trxLnArr2.controls[i].patchValue({onHandId:getfrmSubLoc});
         trxLnArr2.controls[i].patchValue({frmLocator:getfrmSubLoc[0].segmentName});
         trxLnArr2.controls[i].patchValue({onHandQty:getfrmSubLoc[0].onHandQty})
         trxLnArr2.controls[i].patchValue({id:getfrmSubLoc[0].id});
          }
  
      });
  

    this.service.getItemDetail(itemid).subscribe
    (data => {this.getItemDetail = data;
      // alert("this.getItemDetail.description" + this.getItemDetail.description);
      trxLnArr2.controls[i].patchValue({description: this.getItemDetail.description});
      trxLnArr2.controls[i].patchValue({uom:this.getItemDetail.uom});
      trxLnArr2.controls[i].patchValue({segment:this.getItemDetail.segment});
      // trxLnArr1.controls[i].patchValue({frmSubInvCode:this.subInvCode.subInventoryCode});
    }
    );
    
 }

 AvailQty(event:any,i:number) 
 {
   alert(event);
   var trxLnArr1=this.WorkshopReturnForm.get('trxLinesList')as FormArray;
   var trxLnArr = this.WorkshopReturnForm.get('trxLinesList').value;
   var itemid=trxLnArr[i].invItemId;
   var locId=trxLnArr[i].frmLocatorId;
   var onhandid=trxLnArr[i].id;
   // trxLnArr1.controls[i].patchValue({locatorId:locId});
  alert(locId+'locatorID');
  //  var subcode=this.WorkshopReturnForm.get('subInventoryCode').value;
   var subInv=this.subInvdetail.subInventoryId;
  // alert(subcode);
   // let select2= this.subInvCode.find(d=>d.subInventoryCode===subcode);
  // alert(select2.subInventoryId+'Id')
  this.service.getonhandqty(Number(sessionStorage.getItem('locId')),subInv,locId,itemid).subscribe
     (data =>{ 
       this.onhand1 = data;
       console.log(this.onhand1);
      //  alert(this.onHandId);
       alert(this.onhand1);
       trxLnArr1.controls[i].patchValue({onHandQty:data.obj});
     // var trxLnArr=this.stockTranferForm.get('trxLinesList').value;
     let onHand=data.obj;
   let reserve=trxLnArr[i].resveQty;
   //alert(onHand+'OnHand');
   //alert(reserve+'reserve');
   let avlqty1=0;
   avlqty1= onHand-reserve;
   // var trxLnArr1=this.stockTranferForm.get('trxLinesList')as FormArray;
   trxLnArr1.controls[i].patchValue({avlqty: avlqty1});
     })
   
 }
}
