// import { Component, OnInit } from '@angular/core';
import { PathLocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';


interface ImoveOrder{
  requestNumber:string;
  transactionTypeId:number;
  repairNo:number;
  headerStatus:string;
  creationDate:Date;
  issueBy:string;
  remarks:string;
    frmSubInvCode:string;
    toSubInvCode:string;
    description:string;
    trxLineId:number;
    locId:number;
    // divId:number;
    deptId:number;
    divisionId:number;
    invItemId:number;
    subInventoryCode:string;
    itemId:number;
}

@Component({
  selector: 'app-move-order',
  templateUrl: './move-order.component.html',
  styleUrls: ['./move-order.component.css']
})
export class MoveOrderComponent implements OnInit {
  moveOrderForm:FormGroup;
  public transType:Array<string>=[];
  public subInvCode:any[];
  public issueByList:Array<string>=[];
  locId:number;
  divId:number;
  deptId:number;
  divisionId:number;
  public ItemIdList:Array<string>=[];
  public getfrmSubLoc:Array<string>=[];
  public headerStatus:string='OPEN';
  invItemId:number;
  subInventoryId:number;
  subInventoryCode:string;
  itemId:number;
  requestNumber:string;
  reqNo:string;
  lstcomment:any;
  _isDisabled=true;
  disabled=true;
  display = true;
 displayButton= true;
 getItemDetail:any;
 description:string;
 uom:string;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private transactionService :TransactionService) {
   this.moveOrderForm=fb.group({
    requestNumber:['',[Validators.required]],
    transactionTypeId:['',[Validators.required]],
    repairNo:['',[Validators.required]],
    headerStatus:['',[Validators.required]],
    creationDate:[],
    issueBy:['',[Validators.required]],
    remarks:[],
    frmSubInvCode:['',[Validators.required]],
    toSubInvCode:[''],
    description:[''],
    locId:[''],
    divId:[''],
    deptId:[''],
    divisionId:[''],
    reqNo:[''],
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
      frmSubInvCode:[''],
      frmLocatorId:[''],
      uom:[''],
      quantity:[''],
      reason:[''],
      toSubInvCode:[],
      toLocatorId:[],
      description:[],
    });
  }
  addnewtrxLinesList(){
    this.trxLinesList().push(this.newtrxLinesList());
  }
  removenewtrxLinesList(trxLineIndex){
    this.trxLinesList().removeAt(trxLineIndex);
  }


  ngOnInit(): void {
    this.locId=Number(sessionStorage.getItem('locId'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    console.log(this.divisionId);


    this.addnewtrxLinesList();

    this.transactionService.transType().subscribe(
      data =>{ this.transType = data;
       } );

    this.transactionService.subInvCode().subscribe(
      data => {this.subInvCode = data;
        console.log(this.subInventoryId);
        // alert('subInventoryCode');
       });

    this.transactionService.issueByList(this.locId,this.deptId,this.divisionId).subscribe
      (data => {this.issueByList = data;
          console.log(this.issueByList);
        });

    this.transactionService.ItemIdList().subscribe(
      data =>{ this.ItemIdList = data;
        console.log(this.invItemId);
        });


  }


  MoveOrder(moveOrderForm:any)
{}
transdata(val)
{

}
newmoveOrder()
{

  const formValue:ImoveOrder=this.moveOrderForm.value;
  var subCode=this.moveOrderForm.get('frmSubInvCode').value;
  formValue.frmSubInvCode = subCode.subInventoryCode;
  this.transactionService.moveOrderSubmit(formValue).subscribe((res:any)=>{
    var obj = res.obj;
        sessionStorage.setItem('requestNumber', obj);
    if(res.code===200)
    {
      // this.moveOrderForm.patchValue({requestNumber:res.obj});
      this.requestNumber=obj;

      alert("Record inserted Successfully");
      this.display=false;
      this.displayButton=false;
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

 onOptionSelectedSubInv(event:any,i)
 {
   alert('1');
    var subCode=this.moveOrderForm.get('frmSubInvCode').value;
    var subCodeto=this.moveOrderForm.get('toSubInvCode').value;
    // alert("subbCodeto"+subCodeto);
    var trxLnArr = this.moveOrderForm.get('trxLinesList') as FormArray;
    trxLnArr.controls[i].patchValue({frmSubInvCode:subCode.subInventoryCode});
    trxLnArr.controls[i].patchValue({toSubInvCode:subCodeto});
    this.onOptionSelectedSubLoc(subCode,i);


   // this.newtrxLinesList().controls[i].get('frmSubInvCode').patchValue(subCode);
 }


 onOptionSelectedSubLoc(subCode:any,i)
 {
  alert('2');
  // alert(subCode.subInventoryId);
  alert('LocID'+this.locId);
  let select1= this.subInvCode.find(d=>d.subInventoryId===subCode.subInventoryId);

  let locId1=this.moveOrderForm.get('locId');
  var trxLnArr1 = this.moveOrderForm.get('trxLinesList').value;
  var itemid=trxLnArr1[i].invItemId;
  // var frmSubCode=trxLnArr1[i].frmSubInvCode;
  // alert("FromSub"+frmSubCode);
  alert(select1);
  // alert(trxLnArr1.get +"item");
  this.transactionService.getfrmSubLoc(this.locId,itemid,select1.subInventoryId).subscribe(
    data =>{ this.getfrmSubLoc = data;
    });
    alert('Item'+itemid);
    var trxLnArr2 = this.moveOrderForm.get('trxLinesList') as FormArray;
    this.transactionService.getItemDetail(itemid).subscribe
    (data => {this.getItemDetail = data;
      alert("this.getItemDetail.description" + this.getItemDetail.description);
      trxLnArr2.controls[i].patchValue({description: this.getItemDetail.description});
      trxLnArr2.controls[i].patchValue({uom:this.getItemDetail.uom});
    }
    );





 }

 search(reqNo)
 {
    var reqNo=(this.moveOrderForm.get('reqNo').value);
    // alert(reqNo);
  //  this.moveOrderForm.reset();
   this.transactionService.getSearchByTrans(reqNo).subscribe
   (data =>
    {
      console.log(data);
      if(data.code === 400){
        alert(data.message);
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
        this.displayButton=false;
       this.display=false;
      }
    }
    );

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
    this.router.navigate(['admin']);
  }
  resetMoveOrder()
  {
    window.location.reload();
  }

}
