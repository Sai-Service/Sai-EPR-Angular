// import { Component, OnInit } from '@angular/core';
import { PathLocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener, ElementRef } from '@angular/core';
import { FormArray, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
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
}


export class wsIssueTrans {
  segment: string;
  Locator: string;
  quantity: number;
}

@Component({
  selector: 'app-move-order',
  templateUrl: './move-order.component.html',
  styleUrls: ['./move-order.component.css']
})
export class MoveOrderComponent implements OnInit {
  moveOrderForm:FormGroup;
  public transType:any;
  public subInvCode:any;
  public issueByList:Array<string>=[];
  public workshopIssue:any[];
  public lstcomment1:any[];
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
 displayLocator=true;
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
 uuidRef: string;

 userList2: any[] = [];
  lastkeydown1: number = 0;
  displayaddButton:boolean=true;

  public itemMap = new Map<string, wsIssueTrans>();

  @ViewChild('mvForm') mvForm: ElementRef;

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
      invItemId:[''],
      // frmSubInvCode:[''],
      frmLocatorId:[''],
      uom:[''],
      segmentName:[],
      // quantity:[],
      quantity:[],
      reason:[''],
      toSubInvCode:[],
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
      priceValue:[],
      batchCode:[],
      uuidRef: [''],
    });
  }
  addnewtrxLinesList(i:number){

    if(i>-1)
    {
      var trxLnArr1 = this.moveOrderForm.get('trxLinesList').value;
      var itemqty = trxLnArr1[i].quantity;
      var item1 = trxLnArr1[i].segment;
      var loca = trxLnArr1[i].frmLocatorId;
      // var uuidref = trxLnArr1[trxLineIndex].uuidRef;

      //  alert(item1+itemqty+loca);
      if (
        item1 === '' ||
        itemqty === undefined ||
        loca === undefined ||
        loca === '' ||
        itemqty === ''
      ) {
        alert('Please enter Blank Data');
        return;
      }
      if (!this.itemMap.has(item1)) {
        this.reservePos(i);
      }
      // else {
      //   // debugger;
      //   this.deleteReserveLinewise(i);
      //   this.reservePos(i);
      // }

     }
        this.trxLinesList().push(this.newtrxLinesList());
        var refId = uuidv4();
  var len = this.trxLinesList().length;
  var patch = this.moveOrderForm.get('trxLinesList') as FormArray;
  (patch.controls[len - 1]).patchValue(
    {
      lineNumber: len,
      uuidRef: refId,
    }
  );
    // this.reservePos();
  }
  removenewtrxLinesList(trxLineIndex){
    var len1 = this.trxLinesList().length;
    if (len1 === 1) {
      alert('You can not delete the line');
      return;
    }
    var trxLnArr1 = this.moveOrderForm.get('trxLinesList').value;
    var uuidref = trxLnArr1[trxLineIndex].uuidRef;
    var itemid = trxLnArr1[trxLineIndex].segment;
    this.trxLinesList().removeAt(trxLineIndex);

    if (itemid != null || itemid !=undefined) {
      this.deleteReserveLinewise(trxLineIndex,itemid,uuidref);
      this.itemMap.delete(itemid);
    }
    var formVal = this.moveOrderForm.get('trxLinesList').value;
    var patch = this.moveOrderForm.get('trxLinesList') as FormArray;
    var len = this.trxLinesList().length;
    for (let x=0; x<formVal.length; x++){
      patch.controls[x].patchValue({
        lineNumber: x+1,
      });
    }

  }


  ngOnInit(): void {
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
       uuidRef: uuidv4()
     }
   );
   this.toSubInvCode="WIP";
  }


  MoveOrder(moveOrderForm:any)
{}
transdata(val)
{
}
newmoveOrder()
{
    // alert(this.moveOrderForm.valid+'status');
    // alert(this.trxLinesList().status);
    // (<FormArray>this.moveOrderForm.get('trxLinesList')).controls.forEach((group: FormGroup) => {
    //   (<any>Object).values(group.controls).forEach((control: FormControl) => {
    //       if(control.valid){
    //       console.log(control.value+'---'+control.valid);
    //       }else{
    //         // debugger;
    //         console.log('invalid ---' +control.value);
    //       }
    //   })
    //   console.log('*******'  );
    // });
  if (this.moveOrderForm.valid) {
 var trans=this.transType.find(d=>d.transactionTypeId===this.moveOrderForm.get('transactionTypeId').value);
//  var loc=this.getfrmSubLoc.find(d=>d.locatorId===this.moveOrderForm.get('frmLocatorId').value);
//  alert(trans.transactionTypeName+'tra');
 console.log(trans);
  const formValue:ImoveOrder=this.moveOrderForm.value;
  var subCode=this.moveOrderForm.get('frmSubInvCode').value;
  formValue.frmSubInvCode = subCode;
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
      alert("Record inserted Successfully");
      // this.display=false;
      this.moveOrderForm.patchValue({frmSubInvCode:subCode});

      for (let i = 1; i < res.obj.trxLinesList.length-1 ; i++) {
        var trxList:FormGroup=this.newtrxLinesList();
        this.trxLinesList().push(trxList);

      }
      // this.moveOrderForm.get('trxLinesList').patchValue({fromLocator:'obj.fromLocator'})
      // this.displayButton=false;
      this.moveOrderForm.disable();
      this.displayaddButton=false;
      // this.displaytransactionTypeName=false;

      // this.moveOrderForm.reset();
    }
    else
    {
      if (res.code === 400) {
        alert("Code already present in data base");
        this.moveOrderForm.reset();
      }
    }
  })
}
else{

    alert('Valedation failed');
    this.HeaderValidation();

}
}

reservePos(i)
{
  // alert("Hello");
  var len=i;
var trxLnArr1 = this.moveOrderForm.get('trxLinesList').value;
  // var trxLnArr2 = this.moveOrderForm.get('trxLinesList') as FormArray;
  const formValue: ImoveOrder = this.moveOrderForm.value;
    let variants = <FormArray>this.trxLinesList();
    var transtypeid = this.moveOrderForm.get('transactionTypeId').value;
    var jobno1=this.moveOrderForm.get('repairNo').value;
    var transactionNumber = trxLnArr1[len].uuidRef;
    var locId1=this.moveOrderForm.get('locId').value

      let variantFormGroup = <FormGroup>variants.controls[i];
      variantFormGroup.addControl('transactionTypeId', new FormControl(transtypeid, Validators.required));
      variantFormGroup.addControl('locId', new FormControl(locId1, Validators.required));
      // variantFormGroup.addControl('itemId', new FormControl(trxLnArr1[i].invItemId, Validators.required));
      variantFormGroup.addControl('reservedQty', new FormControl(trxLnArr1[i].quantity, Validators.required));
      // variantFormGroup.addControl('onHandId', new FormControl(trxLnArr1[i].id, Validators.required));
      variantFormGroup.addControl('onHandId', new FormControl(trxLnArr1[i].id,[]));
      variantFormGroup.addControl('transactionNumber', new FormControl(transactionNumber, Validators.required));

  // var reserveinfo=formValue[0];

  this.service.reservePost(variants.value[i]).subscribe((res:any)=>{
  //  var obj=res.obj;
   if(res.code===200)
   {
    // alert("Record inserted Successfully");
   }
   else{
    if(res.code === 400) {
      // alert("Code already present in data base");
      this.moveOrderForm.reset();
    }
   }
  }
  );
}
onChangeRepairNo(event)
{
  var selregno=this.workshopIssue.find(d=>d.jobCardNum===event)
  this.moveOrderForm.patchValue({regNo:selregno.regNo});
  this.serviceService.billableTyIdLstFN(event, selregno.regNo)
  .subscribe(
    data1 => {

      this.Billabletype = data1;
      console.log(data1);
      console.log(this.Billabletype);
    }
     )
     this.service.ItemIdListDept(this.deptId,this.locId,this.subInvCode.subInventoryId).subscribe(
      data => {
        this.ItemIdList = data;
        // console.log(this.invItemId);
      });
}

 onOptionSelectedSubInv(event:any,i)
 {
  //  alert('----' + event +'*****');
  var trxLnArr2 = this.moveOrderForm.get('trxLinesList') as FormArray;
   if(event==='')
   {
    trxLnArr2.controls[i].reset();
    trxLnArr2.controls[i].patchValue({lineNumber:i+1});
    return;
   }
   let selItem= this.ItemIdList.find(d=>d.SEGMENT===event);
   if(selItem!=undefined){
  var subInv=this.subInvCode.subInventoryId;
  var repNo=this.moveOrderForm.get('repairNo').value;

  let locId1=this.moveOrderForm.get('locId');
  var trxLnArr1 = this.moveOrderForm.get('trxLinesList').value;

  var itemid =selItem.itemId;
  trxLnArr2.controls[i].patchValue({invItemId:selItem.itemId})


  var subInv=this.subInvCode.subInventoryId;
  this.service.getItemDetail(itemid).subscribe
  (data => {this.getItemDetail = data;
    // alert("this.getItemDetail.description" + this.getItemDetail.description);
    trxLnArr2.controls[i].patchValue({description: this.getItemDetail.description});
    trxLnArr2.controls[i].patchValue({uom:this.getItemDetail.uom});
    this.setFocus('frmLocatorId');
    // trxLnArr2.controls[i].patchValue({segment:this.getItemDetail.segment});
    // trxLnArr1.controls[i].patchValue({frmSubInvCode:this.subInvCode.subInventoryCode});
  }
  );
    this.service.getfrmSubLoc(this.locId,itemid,subInv).subscribe(
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
          trxLnArr2.controls[i].patchValue({frmLocatorId:getfrmSubLoc[0].locatorId});
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
     this.service.getreserqty(this.locId,itemid).subscribe
    (data=>{
      this.resrveqty=data;
      trxLnArr2.controls[i].patchValue({resveQty:this.resrveqty});
    });
    this.service.getPriceDetail(this.locId,itemid,subInv,repNo,this.divisionId).subscribe
    ((res: any) => {
      if (res.code === 200)
      {
         this.pricedata=res.obj;
         console.log(this.pricedata);
        // for(let j=0;j<res.obj.length;j++)
        // {
        //   this.batchdata.push({'batchCode': res.obj[j].batchCode});
        // }
        trxLnArr2.controls[i].patchValue({batchCode:res.obj[0].batchCode});
        trxLnArr2.controls[i].patchValue({priceValue:res.obj[0].priceValue});;
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
onOptionBatchCode(event,i)
{
  // alert(event);
  var selbatchCode=this.pricedata.find(d=>d.batchCode===event);
  var trxLnArr2 = this.moveOrderForm.get('trxLinesList') as FormArray;
  // alert(selbatchCode.priceValue+'Price');
  trxLnArr2.controls[i].patchValue({priceValue:selbatchCode.priceValue});;
}
AvailQty(event,i:number)
{
  // alert(event+'Loca');
  var trxLnArr =this.moveOrderForm.get('trxLinesList').value;
  var itemid=trxLnArr[i].invItemId;
  // var locId=trxLnArr[i].frmLocatorId;
  var locId=event;
  var onhandid=trxLnArr[i].id;
  // trxLnArr1.controls[i].patchValue({locatorId:locId});
  // alert(locId+'locatorID');
  var subcode=this.moveOrderForm.get('frmSubInvCode').value;
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
  // this.reservePos(i);
}
 search(reqNo)
 {
  this.trxLinesList().clear();
  this.display=true;
    var reqNo=(this.moveOrderForm.get('reqNo').value);
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
        this.lstcomment=data.obj;
        let control=this.moveOrderForm.get('trxLinesList') as FormArray;
        data.obj.trxLinesList.forEach(f => {
          var trxList:FormGroup=this.newtrxLinesList();
          this.trxLinesList().push(trxList);

        });
        this.moveOrderForm.patchValue(data.obj);
        this.moveOrderForm.patchValue(data.obj.trxLinesList);
        this.moveOrderForm.disable();
        this.displayaddButton=false;
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
 searchByJobNo(JobNo)
 {

   var jobno=(this.moveOrderForm.get('JobNo').value);
   this.service.getsearchByJob(jobno).subscribe(
     data=>{
          this.lstcomment1=data;
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
setFocus(name) {

  const ele = this.mvForm.nativeElement[name];
  if (ele) {
    ele.focus();
  }
}

deleteReserveLinewise(i ,itemid, transferId) {

  // var transtypeid = this.moveOrderForm.get('transactionTypeId').value;
  // var seltranstyp = this.transType.find(
  //   (d) => d.transactionTypeId === transtypeid
  // );
  // var trxLnArr1 = this.moveOrderForm.get('trxLinesList').value;
  // var itemid = trxLnArr1[i].invItemId;
  // alert(itemid+'Item')
  this.service
    .reserveDeleteLine(
      transferId,
      Number(sessionStorage.getItem('locId')),
      itemid
    )
    .subscribe((res: any) => {
      //  var obj=res.obj;
      if (res.code === 200) {
        // alert(res.message);
      }
    });
}

deleteReserve() {
  var transtypeid = this.moveOrderForm.get('transactionTypeId').value;
  var seltranstyp = this.transType.find(
    (d) => d.transactionTypeId === transtypeid
  );
  this.service
    .reserveDelete(
      seltranstyp.transactionTypeName,
      Number(sessionStorage.getItem('locId'))
    )
    .subscribe((res: any) => {
      //  var obj=res.obj;
      if (res.code === 200) {
        // alert(res.message);
      }
    });
}

ngOnDestroy(): void {
  alert('Window Closed Directely.!');
  this.deleteReserve();
  return;
}
@HostListener('window:unload', ['$event'])
keyEvent1(event: KeyboardEvent) {
  this.deleteReserve();
  console.log(event);}
}