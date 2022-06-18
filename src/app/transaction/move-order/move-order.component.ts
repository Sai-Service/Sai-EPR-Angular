// import { Component, OnInit } from '@angular/core';
import { Component, OnInit,HostListener} from '@angular/core';
import { FormArray, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { ServiceService } from 'src/app/service/service.service';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';


interface ImoveOrder{
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
    priceValue:number;
    batchCode:string;
    regNo:string;
    segment:string;
    fromLocator:string;
    uuidRef: string;
    attribute10:number;
    totalval:number;
    totalAmt:number;
}

export class reserveLine {

  transactionType: string;
  transactionNumber: string;
  locId: number;
  reservedQty: number;
  invItemId: number;
  locatorId: number;
  rate: number;
}
export  class StockTransferRow {
  segment:string;
  Locator:string;
  quantity:number;

}

@Component({
  selector: 'app-move-order',
  templateUrl: './move-order.component.html',
  styleUrls: ['./move-order.component.css']
})
export class MoveOrderComponent implements OnInit {
  moveOrderForm:FormGroup;
  submitted = false;
  public transType:any;
  public subInvCode:any;
  public issueByList:Array<string>=[];
  public workshopIssue:any[];
  lstcomment1:any[];
  // displaytransactionTypeName=true;
  repairNo:string;
  locId:number;
  divId:number;
  transactionTypeName:string;
  transactionTypeId:number;
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
  public ItemIdList:any=[];
  // public getfrmSubLoc:Array<string>=[];
  getfrmSubLoc:any[];
  public headerStatus:string='OPEN';
  invItemId:number;
  subInventoryId:number;
  toSubInvCode:string;
  subInventoryCode:string;
  locData:any =[];
  // {
  //   "locatorId": 999,
  //   "segmentName": "D.U.01.D.01",
  //   "id": 7,
  //   "onHandQty": 40
  // }
  JobNo:string;
  itemId:number;
  onHandQty:number;
  requestNumber:string;
  frmLocatorId:number;
  deptName:string;
  reqNo:string;
  name:string;
  lstcomment:any;
  _isDisabled=true;
  disabled=true;
  display = true;
 displayButton= true;
 displaySegment=true;
 displayLocator:boolean=true;
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
 priceValue:number;
 batchCode:string;
 public batchdata = [];
 pricedata:any[];
 regNo:string;
 segment:string;
 userList2: any[] = [];
  lastkeydown1: number = 0;
  userList1: any[] = [];
  lastkeydown2: number = 0;
  attribute10:number;
  fromLocator:string;
  totalval:number;
  displaybuttons:boolean=true;
  totalAmt:number;

  public itemMap = new Map<string, StockTransferRow >();
  total: any;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private serviceService: ServiceService) {
   this.moveOrderForm=fb.group({
    requestNumber:[],
    transactionTypeId:['',[Validators.required]],
    repairNo:['',[Validators.required]],
    headerStatus:[],
    transactionTypeName:[],
    creationDate:[],
    issueBy:['',[Validators.required]],
    remarks:[],
    frmSubInvCode:['',[Validators.required]],
    toSubInvCode:[''],
    description:[''],
    locId:[''],
    billable:['',[Validators.required]],
    divId:[''],
    deptId:[''],
    divisionId:[''],
    reqNo:[''],
    JobNo:[''],
    issueTo:['',[Validators.required]],
    deptName:[],
    regNo:[],
    totalval:[],
    totalAmt:[],
    // subInventoryId:[],
    trxLinesList:this.fb.array([]),


   });
  }
  trxLinesList():FormArray{
   
    return this.moveOrderForm.get("trxLinesList") as FormArray
  }

  newtrxLinesList(): FormGroup{
    return this.fb.group({
      lineNumber:[''],
      invItemId:['',[Validators.required]],
      // frmSubInvCode:[''],
      frmLocatorId:[],
      uom:[''],
      segmentName:[],
      // quantity:[],
      quantity:['',[Validators.required]],
      reason:[''],
      toSubInvCode:[],
      toLocatorId:[],
      description:[],
      segment:[],
      fromLocator:['',[Validators.required]],
      frmLocator:[],
      resveQty:[],
      avlqty:[''],
      toLocator:[],
      onHandQty:[],
      id:[],
      priceValue:[],
      batchCode:[],
      uuidRef: [],
      attribute10:[],
    });
  }
  addnewtrxLinesList(i:number){
    
    if(i>-1)
    {
      var trxLnArr1 = this.moveOrderForm.get('trxLinesList').value;
      var itemqty=trxLnArr1[i].quantity;
      var uuidref = trxLnArr1[i].uuidRef;
      var item=trxLnArr1[i].segment;
      // alert(itemqty);
      if(itemqty===''|| item==='')
     { alert('Please enter data in blank field');
     return;
    }
    if(!this.itemMap.has(item))
    {
      this.reservePos(i);
    }
    else{
      // debugger;
      // this.deleteReserveLinewise(i,trxLnArr1[i].itemId,uuidref);
      this.reservePos(i);
    }
    }
        this.trxLinesList().push(this.newtrxLinesList());
      
  var len = this.trxLinesList().length;
  var refId = uuidv4();
  var patch = this.moveOrderForm.get('trxLinesList') as FormArray;
  (patch.controls[len - 1]).patchValue(
    {
      lineNumber: len,
      uuidRef: refId
    }
  );
    // this.reservePos();
  }
  removenewtrxLinesList(trxLineIndex){
    var len1=this.trxLinesList().length;
    if(len1===1){
      alert('You can not delete the line');
      return;}
       var trxLnArr1 = this.moveOrderForm.get('trxLinesList').value;
    var itemid=trxLnArr1[trxLineIndex].invItemId;

    var uuidref = trxLnArr1[trxLineIndex].uuidRef;
    // alert((trxLnArr1[trxLineIndex].segment)+'Delete');
    if((trxLnArr1[trxLineIndex].segment)!='')
    {
    // this.deleteReserveLinewise(trxLineIndex);
    this.itemMap.delete(trxLnArr1[trxLineIndex].segment);
    this.deleteReserveLinewise(trxLineIndex, itemid, uuidref);
    this.locData.splice(trxLineIndex,1)
    }
    this.trxLinesList().removeAt(trxLineIndex);
    
    var patch = this.moveOrderForm.get('trxLinesList') as FormArray;
    var len = this.trxLinesList().length;
    (patch.controls[len - 1]).patchValue(
      {
        lineNumber: len,
      }
    );

     
   
  }


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.locId=Number(sessionStorage.getItem('locId'));
    // alert(this.locId);
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.issueBy=(sessionStorage.getItem('name'));
    this.deptName=(sessionStorage.getItem('deptName'));
    
    
    // alert(this.issueBy);
    console.log(this.divisionId);

 
    
    this.service.transType().subscribe(
      data =>{ this.transType = data;
        console.log(this.transType);
        this.transactionTypeId=this.transType[0].transactionTypeId;
        this.transactionTypeName=this.transType[0].transactionTypeName;

       } );
       

    this.service.subInvCode2(this.deptId,this.divisionId).subscribe(
      data => {this.subInvCode = data;
        console.log(this.subInventoryId);
        // alert('subInventoryCode');
        this.frmSubInvCode=this.subInvCode.subInventoryCode;
    
       });

    
    // this.service.ItemIdList().subscribe(
    //   data =>{ this.ItemIdList = data;
    //     console.log(this.invItemId);
    //     });
   this.service.WorkShopIssue(this.locId).subscribe(
     data=>{
      this.workshopIssue=data;
      console.log(data);
     }
   );
  //  this.service.BillableType().subscribe(
  //   data=>{
  //     this.Billabletype=data;
  //   }
  //  )
   this.service.issueByList(this.locId,this.deptId,this.divisionId).subscribe
      (data => {this.issueByList = data;
          console.log(this.issueByList);
        });
        
   this.addnewtrxLinesList(-1);
   var patch = this.moveOrderForm.get('trxLinesList') as  FormArray
      (patch.controls[0]).patchValue(
     {
       lineNumber: 1,
     }
   );
   this.toSubInvCode="WIP";
  }


  MoveOrder(moveOrderForm:any)
{}
transdata(val)
{
}
newmoveOrder(){ 
 
  if (this.moveOrderForm.valid) {
 var trans=this.transType.find(d=>d.transactionTypeId===this.moveOrderForm.get('transactionTypeId').value);
//  var loc=this.getfrmSubLoc.find(d=>d.locatorId===this.moveOrderForm.get('frmLocatorId').value);
//  alert(trans.transactionTypeName+'tra');
 console.log(trans);
  const formValue:ImoveOrder=this.moveOrderForm.value;
  var lineLevelData=this.moveOrderForm.get('trxLinesList').value;
  console.log(lineLevelData);
  for (let i=0;i<lineLevelData.length;i++){
    if (lineLevelData[i].segment.length >8){
      alert('Line No' + ' ' + lineLevelData[i].segment + ' ' + 'Select Item Is Wrong... Please confirm');
      return;
    }
  }
  var subCode=this.moveOrderForm.get('frmSubInvCode').value;
  formValue.frmSubInvCode = subCode;
  var itemcode1=this.moveOrderForm.get('repairNo').value.split(' -- ');
  formValue.repairNo=itemcode1[0];
  this.service.moveOrderSubmit(formValue).subscribe((res:any)=>{
    var obj = res.obj;
        sessionStorage.setItem('requestNumber', obj);
        this.moveOrderForm.patchValue({transactionTypeId:trans.transactionTypeName})
    if(res.code===200)
    {
      // this.trxLinesList().clear();
      // this.moveOrderForm.patchValue({requestNumber:res.obj});
      this.requestNumber=obj.requestNumber;
      this.headerStatus=obj.headerStatus;
      this.frmSubInvCode=obj.frmSubInvCode;
      this.transactionTypeId=trans.transactionTypeName;
      this.subInventoryCode=subCode.subInventoryCode;
      alert(res.message);
      this.display=false;
      this.moveOrderForm.patchValue({frmSubInvCode:subCode});
     
      for (let i = 1; i < res.obj.trxLinesList.length-1 ; i++) {
        var trxList:FormGroup=this.newtrxLinesList();
        this.trxLinesList().push(trxList);

      }
      // this.moveOrderForm.get('trxLinesList').patchValue({fromLocator:'obj.fromLocator'})
      // this.displayButton=false;
      this.moveOrderForm.disable();
      this.displayButton=false;
      // this.displaytransactionTypeName=false;
      
      // this.moveOrderForm.reset();
    }
    else
    {
      if (res.code === 400) {
        alert(res.message);
        this.moveOrderForm.reset();
      }
    }
  })
}
else{
  
    // alert('else');
    this.HeaderValidation();
  
}
}



reservePos(i) {
  var len = i;
  var trxLnArr1 = this.moveOrderForm.get('trxLinesList').value;
  console.log(trxLnArr1);
  var locId1 = this.moveOrderForm.get('locId').value;
  var prqty = trxLnArr1[len].quantity;
  var itemId = trxLnArr1[len].invItemId;
  var transactionNumber = trxLnArr1[len].uuidRef;
  var locatorId = trxLnArr1[len].frmLocatorId;
  var rate = trxLnArr1[len].priceValue;
  var transactionType = 'Workshop Issue'

  var resLn: reserveLine = new reserveLine();
  resLn.transactionType = transactionType;
  resLn.transactionNumber = transactionNumber;
  resLn.locId = locId1;
  resLn.reservedQty = prqty;
  resLn.invItemId = itemId;
  resLn.locatorId = locatorId;
  resLn.rate = rate;
  this.service.reservePost(resLn).subscribe((res: any) => {
    if (res.code === 200) {
      var stkRow: StockTransferRow = new StockTransferRow();
      stkRow.segment = (trxLnArr1[i].segment);
      stkRow.Locator = (trxLnArr1[i].frmLocatorId);
      stkRow.quantity = (trxLnArr1[i].quantity);
      this.itemMap.set(trxLnArr1[i].segment, stkRow);
    }
    else {
      if (res.code === 400) {
        alert(res.message);
        this.moveOrderForm.reset();
      }
    }
  }
  );
}
onChangeRepairNo(event)
{

  var itemCode2 = event.split(' -- ');
    var    jobNo = itemCode2[0];
    // alert(jobNo);
  var selregno=this.workshopIssue.find(d=>d.jobCardNum===jobNo)
  this.serviceService.billableTyIdLstFN(jobNo, selregno.regNo)
  .subscribe(
    data1 => {
     
      this.Billabletype = data1;
      console.log(data1);
      console.log(this.Billabletype);
      this.moveOrderForm.patchValue({billable:data1[0].billableTyName});
    }
     )
     this.moveOrderForm.patchValue({issueTo:selregno.srvAdvisorName});
    //  this.issueTo=selregno.srvAdvisorName;
     this.service.ItemIdListDept(this.deptId,this.locId,this.subInvCode.subInventoryId).subscribe(
      data => {
        this.ItemIdList = data;
        // console.log(this.invItemId);
      });
}
getInvItemId($event)
{
  // alert('in getInvItemId')
   let userId=(<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
   this.userList2=[];
   if (userId.length > 2) {
    if ($event.timeStamp - this.lastkeydown1 > 200) {
      // this.userList2 = this.searchFromArray1(this.ItemIdList, userId);
    }
  }
}
getrepairOrder($event)
{
  // alert('in getInvItemId')
   let userId=(<HTMLInputElement>document.getElementById('repairFirstWay')).value;
   this.userList2=[];
   if (userId.length > 2) {
    if ($event.timeStamp - this.lastkeydown1 > 200) {
      // this.userList2 = this.searchFromArray1(this.ItemIdList, userId);
    }
  }
}

 onOptionSelectedSubInv(event:any,i)
 {

 if (event.length > 8){
   alert('Please check Item not valid.!');
   return;
 }
   console.log(this.ItemIdList);
   let select1=this.ItemIdList.find(d=>d.SEGMENT===event);
   console.log(select1);
   if(select1!=undefined){
    //  alert(select1.itemId+'1st alert')
  var subInv=this.subInvCode.subInventoryId;
  var repNo1=this.moveOrderForm.get('repairNo').value.split(' -- ');
  var repNo=repNo1[0];
    // alert(repNo+'rep');
  let locId1=this.moveOrderForm.get('locId');
  var trxLnArr1 = this.moveOrderForm.get('trxLinesList').value;
  var trxLnArr2 = this.moveOrderForm.get('trxLinesList') as FormArray;
  // var itemid=trxLnArr1[i].invItemId;
  // var itemid =select1.itemId;
  trxLnArr2.controls[i].patchValue({invItemId:select1.itemId})
   var subInv=this.subInvCode.subInventoryId;
  // debugger;
    this.service.getfrmSubLoc(this.locId,select1.itemId,subInv).subscribe(
      data =>{
        //  this.getfrmSubLoc = data;
        console.log(data);
        var getfrmSubLoc =data;
          this.locData[i] = data;
          var selLocator = this.locData[i]
          if(getfrmSubLoc.length==1)
          {
          // this.displayLocator[i]=false;
          // trxLnArr2.controls[i].patchValue({onHandId:getfrmSubLoc[0].segmentName});
          trxLnArr2.controls[i].patchValue({frmLocatorId:selLocator[0].locatorId});
          trxLnArr2.controls[i].patchValue({fromLocator:selLocator[0].locatorId});
          trxLnArr2.controls[i].patchValue({onHandQty:selLocator[0].onHandQty});
          // trxLnArr2.controls[i].patchValue({id:getfrmSubLoc[0].id});
          }
          else
          {
           // this.getfrmSubLoc=data;;
         //  trxLnArr2.controls[i].patchValue({onHandId:getfrmSubLoc});
         trxLnArr2.controls[i].patchValue({frmLocator:selLocator[0].segmentName});
         trxLnArr2.controls[i].patchValue({onHandQty:selLocator[0].onHandQty})
         trxLnArr2.controls[i].patchValue({id:selLocator[0].id});
          }
  
      });
  

    this.service.getItemDetail(select1.itemId).subscribe
    (data => {this.getItemDetail = data;
      // alert("this.getItemDetail.description" + this.getItemDetail.description);
      trxLnArr2.controls[i].patchValue({description: this.getItemDetail.description});
      trxLnArr2.controls[i].patchValue({uom:this.getItemDetail.uom});
      // trxLnArr2.controls[i].patchValue({segment:this.getItemDetail.segment});
      // trxLnArr1.controls[i].patchValue({frmSubInvCode:this.subInvCode.subInventoryCode});
    }
    );
    this.service.getreserqty(this.locId,select1.itemId).subscribe
    (data=>{
      this.resrveqty=data;
      trxLnArr2.controls[i].patchValue({resveQty:this.resrveqty});
    });
    // this.service.getPriceDetail(this.locId,select1.itemId,subInv,repNo,this.divisionId).subscribe
    this.service.getWIPrice(this.locId,select1.itemId,subInv,repNo,this.divisionId,this.deptId).subscribe
    ((res: any) => {
      if (res.code === 200)
      {
         this.pricedata=res.obj;
        // for(let j=0;j<res.obj.length;j++)
        // { 
        //   this.batchdata.push({'batchCode': res.obj[j].batchCode});
        // }
      
        trxLnArr2.controls[i].patchValue({batchCode:res.obj.batchCode,
        priceValue:res.obj.priceValue,attribute10:res.obj.attribute10});
      
      }
      else {
        if (res.code === 400) {
          alert(res.message);
          trxLnArr2.controls[i].patchValue({invItemId:'',description:'',frmLocatorId:''});
        }
      }
    });
  }
 }
AvailQty(event:any,i:number) 
{
  // alert(event);
  var trxLnArr =this.moveOrderForm.get('trxLinesList').value;
  var trxLnArr1 =this.moveOrderForm.get('trxLinesList') as FormArray;
  var itemid=trxLnArr[i].invItemId;
  var locId=event;
  var onhandid=trxLnArr[i].id;
  trxLnArr1.controls[i].patchValue({frmLocatorId:locId});
  // alert(locId+'locatorID');
  var subcode=this.moveOrderForm.get('frmSubInvCode').value;
  // alert(subcode.subInventoryId);
  // let select2= this.subInvCode.find(d=>d.subInventoryCode===subcode.subInventoryCode);
  // alert(select2.subInventoryId+'Id')
  this.service.getonhandqty(Number(sessionStorage.getItem('locId')),this.subInvCode.subInventoryId,locId,itemid).subscribe
      (data =>{ 
      this.onhand1 = data;
      console.log(this.onhand1);
      var trxLnArr1=this.moveOrderForm.get('trxLinesList')as FormArray;
      trxLnArr1.controls[i].patchValue({onHandQty:data.obj});
    // var trxLnArr=this.moveOrderForm.get('trxLinesList').value;
  let onHand=data.obj;
  let reserve=trxLnArr[i].resveQty;
  // alert(onHand+'OnHand');
  // alert(reserve+'reserve');
  let avlqty1=0;
  avlqty1= onHand-reserve;
  var trxLnArr1=this.moveOrderForm.get('trxLinesList')as FormArray;
  trxLnArr1.controls[i].patchValue({avlqty: avlqty1});
    })
}

validate(i:number,qty1)
{
  // alert("Validate");
  var trxLnArr=this.moveOrderForm.get('trxLinesList').value;
  var trxLnArr1=this.moveOrderForm.get('trxLinesList') as FormArray
  let avalqty=trxLnArr[i].avlqty;
  let qty=trxLnArr[i].quantity;  
  let uomCode=trxLnArr[i].uom;
//  alert(avalqty+'avalqty');
//  alert(trxLnArr[i].quantity +' qty');
  if(qty>avalqty)
  {
    alert("You can not enter more than available quantity");
    trxLnArr1.controls[i].patchValue({quantity:''});
    qty1.focus();
  }
  if(qty<=0)
  {
    alert("Please enter quantity more than zero");
    trxLnArr1.controls[i].patchValue({quantity:''});
    qty1.focus();
  }
  if(uomCode==='NO')
  {
    // alert(Number.isInteger(qty)+'Status');
    if(!(Number.isInteger(qty)))
    {
    alert('Please enter correct No');
    trxLnArr1.controls[i].patchValue({quantity:''});
  }}
 
  this.updateTotAmtPerline(i);
}
 search(reqNo)
 {
    
  // this.trxLinesList().reset();

  this.trxLinesList().clear();
  // this.trxLinesList().push(this.newtrxLinesList());

  this.display=true;
  var reqNo=(this.moveOrderForm.get('reqNo').value);

      if(reqNo==null || reqNo==undefined || reqNo.trim()=='') {
      alert ("Enter a Valid Requisition No."); return;}
      reqNo=reqNo.toUpperCase();
      reqNo=reqNo.trim();
      this.reqNo=reqNo;
    
    // alert(reqNo);
  //  this.moveOrderForm.reset();
  var control = this.moveOrderForm.get('trxLinesList') as FormArray;
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
        // this.trxLinesList().clear();
        this.lstcomment=data.obj;
        let control=this.moveOrderForm.get('trxLinesList') as FormArray;
        data.obj.trxLinesList.forEach(f => {
          var trxList:FormGroup=this.newtrxLinesList();
          this.trxLinesList().push(trxList);

        });
        this.moveOrderForm.patchValue(data.obj);
        this.moveOrderForm.patchValue(data.obj.trxLinesList);
        this.moveOrderForm.disable();
        this.displaybuttons=false;
        // for(var i=0;i<data.obj.trxLinesList.length;i++)
        // {
        // var select1=this.ItemIdList.find(d=>d.itemId===data.obj.trxLinesList[i].invItemId)
        // this.moveOrderForm.get('trxLinesList').patchValue({invItemId:select1.SEGMENT})
        // // (control.controls[i]).patchValue({ invItemId: select1.SEGMENT });
        // }
        
        this.displayButton=false;
        this.displaySegment=false;
        this.displayLocator=false;
       this.display=false;
      }
    }
    );
 }
 searchByJobNo(JobNo){
   
   var jobno=(this.moveOrderForm.get('JobNo').value);
   if(jobno==null || jobno==undefined || jobno.trim()=='') {
    alert ("Enter a Valid Job Card No."); return;}
      jobno=jobno.toUpperCase();
      jobno=jobno.trim();
      this.JobNo=jobno;
  
   this.service.getsearchByJob(jobno).subscribe(
     data=>{
          this.lstcomment1=data;    
     }
   )
   this.service.gettotalAmt(jobno).subscribe(
    data=>{
         this.total=data; 
        //  alert(data[0].totalAmt);
         this.totalAmt=data[0].totalAmt;
    }
  )
  
 }

 set isDisabled(value: boolean) {
  this._isDisabled = value;
  if(value) {
   this.moveOrderForm.controls['description'].disable();
  } else {
     this.moveOrderForm.controls['description'].enable();
   }
 }

 closeMoveOrder()
  {
    this.deleteReserve();
    this.router.navigate(['admin']);
  }
  resetMoveOrder()
  {
    this.deleteReserve();
    window.location.reload();
  }
  HeaderValidation() {
    var isValid:boolean=false;
  Object.keys(this.moveOrderForm.controls).forEach(
    (key) => { 
      const control=this.moveOrderForm.controls[key] as FormControl|FormArray|FormGroup
      
      if(control instanceof FormControl){
        control.markAsTouched();
      }
      else if (control instanceof FormArray){
          
  (<FormArray>this.moveOrderForm.get('trxLinesList')).controls.forEach((group: FormGroup) => {
    (<any>Object).values(group.controls).forEach((control: FormControl) => { 
        control.markAsTouched();
    }) 
  });
      }
      else if  (control instanceof FormGroup){}
      // isValid=this.hasRequiredField(control);
      
  }) ;

  // return isValid;
   
  }
  
  
  
  getGroupControl(fieldName) {
    // alert('nam'+fieldName);
    // return (<FormArray>this.poInvoiceForm.get('obj')).at(index).get(fieldName);
    return(this.moveOrderForm.get(fieldName));
  }
   
  getGroupControllinewise(index,fieldName) {
    // alert('nam'+fieldName);
    return (<FormArray>this.moveOrderForm.get('trxLinesList')).at(index).get(fieldName);
    
  }
  deleteReserveLinewise(i, itemid, transferId) {
    if (itemid != null) {
      // alert(i+'----'+itemid+'---'+transferId);
      this.service.reserveDeleteLine(transferId, Number(sessionStorage.getItem('locId')), itemid).subscribe((res: any) => {
        //  var obj=res.obj;
        if (res.code === 200) {
        }
      });
    }
  }

  deleteReserve() {
    // alert('delete reserve')
    // var transferId = this.CounterSaleOrderBookingForm.get('uuidRef').value;
    var trxLnArr2 = this.moveOrderForm.get('trxLinesList') as FormArray;
    var trxLnArr1 = trxLnArr2.getRawValue();
    for (let j = 0; j < trxLnArr1.length; j++) {
      var transferId = trxLnArr1[j].uuidRef;
      this.service.reserveDelete(transferId, Number(sessionStorage.getItem('locId'))).subscribe((res: any) => {
        if (res.code === 200) {
        }
      });
    }
  }
  @HostListener('window:unload', ['$event'])
  keyEvent1(event: KeyboardEvent) {
    this.deleteReserve();
    console.log(event);
  }
  ngOnDestroy(): void {
    alert('Window Closed Directely.!');
    this.deleteReserve();
    return;
  }

  updateTotAmtPerline(lineIndex) {
    var formArr = this.moveOrderForm.get('trxLinesList') as FormArray;
    var formVal = formArr.getRawValue();
    var basicAmt = 0;
    var totAmt = 0;
    for (let i = 0; i < formVal.length; i++) {
       
        if (formVal[i].attribute10 == undefined || formVal[i].attribute10 == null || formVal[i].attribute10 == '') {

        } else {
          totAmt = totAmt + Number((formVal[i].attribute10)*(formVal[i].quantity));
         
        }

      }
     
     totAmt = Math.round(((totAmt) + Number.EPSILON) * 100) / 100;
    this.moveOrderForm.patchValue({ 'totalval': totAmt });
  
  }


message: string = "Please Fix the Errors !";
   msgType:string ="Close";
   getMessage(msgType: string) {
     this.msgType = msgType;
     if (this.msgType.includes("Save")) {
       this.submitted= true;
      //  alert('1');
       (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
       if (this.moveOrderForm.invalid) {
 //         //this.submitted = false;
         alert('Please enter all mandatory details');
         (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '');
         return;
       }
       this.message = "Do you want to SAVE the changes(Yes/No)?"
       
     }
     
    
     if (this.msgType.includes("Reset")) {
       this.message = "Do you want to Reset the changes(Yes/No)?"
     }
     
     if (this.msgType.includes("Close")) {
       this.message = "Do you want to Close the Form(Yes/No)?"
     }
     return;
   }
 
  executeAction() {
     if(this.msgType.includes("Save")) {
      
       this.newmoveOrder();
     }
     if (this.msgType.includes("Reset")) {
          // this.resetItemCatMast();
       this.resetMoveOrder();
     }
     
     if (this.msgType.includes("Close")) {
       this.closeMoveOrder();
      //  this.router.navigate(['admin']);
     }
     return;
   }
 
}
 