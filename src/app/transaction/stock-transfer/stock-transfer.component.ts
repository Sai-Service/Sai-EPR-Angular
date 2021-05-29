// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';
import { DatePipe } from '@angular/common';



interface IStockTransfer {
  ShipmentNo: String;
  status: string;
  issueTo: string;
  transferOrgId: number;
  itemId: number;
  subInventoryCode: string;
  shipmentNumber: string;
  // IssueTo:number,
  locatorId: number;
  description: string;
  uom: string;
  ewayBill: string;
  pendingrec:any;
  remarks: string;
  ewayBillDate: Date;
  issueBy: string;
  
  deptName:string;
  
  FrmLocator: string;
  primaryQty: number;


}

@Component({
  selector: 'app-stock-transfer',
  templateUrl: './stock-transfer.component.html',
  styleUrls: ['./stock-transfer.component.css']
})
export class StockTransferComponent implements OnInit {
  stockTranferForm: FormGroup;
  ShipmentNo: string;
  shipmentNumber: string;
  locId: number;
  issueBy: string;
  frmLocator: string;
  // status:string;
  pendingrec:any;
  public status: string = 'Active';
  deptId: number;
  resrveqty:number;
  divisionId: number;
  ewayBill: string;
  ewayBillDate: Date;
  CostDetail:any;
  transQuantity: number;
  primaryQty: number;
  public onhand1:any;
  public ItemIdList: Array<string> = [];
  transactionTypeId:number=27;
  public subInvCode: any[];
  public issueByList: Array<string> = [];
  public locIdList: any[];
  locData =[ {
    "locatorId": 999,
    "segmentName": "D.U.01.D.01",
    "id": 7,
    "onHandQty": 40
  }];
  itemId: number;
  onHandQty:number;
  issueTo: string;
  subInventoryId: number;
  deptName:string;
  getfrmSubLoc: any;
  subInventoryCode: string;
  getItemDetail: any;
  transferOrgId: number;
  locatorId: number;
  transReference:string;
  // Locator:any[];
  description: string;
  uom: string;
  display = true;
  displayButton = true;
  // transDate: Date;
  lstcomment: any;
  remarks: string;
  segment: string;
  locator: string;
  transCost: number;
  lineNumber:number;
  pipe = new DatePipe('en-US');
  now=new Date();
  transDate=this.pipe.transform(this.now,'yyyy-MM-dd')
  displayremakdata=true;
  pendingatother:any;
  transferLoc:string;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.stockTranferForm = fb.group({
      ShipmentNo: [],
      locId: [''],
      deptName:[''],
      shipmentNumber: [''],
      transferOrgId: [''],
      transactionTypeId:[''],
      issueTo: [''],
      ewayBill: [''],
      ewayBillDate: [''],
      remarks: [''],
      issueBy: [''],
      transDate: [''],
      subInventoryCode: [''],
      transferLoc:[],
      status: ['', [Validators.required]],
      transReference:[''],
      trxLinesList: this.fb.array([]),

    }

    )
  }
  trxLinesList(): FormArray {
    return this.stockTranferForm.get("trxLinesList") as FormArray
  }
  newtrxLinesList(): FormGroup {
    return this.fb.group({
     
      itemId: [''],
          // shipmentNumber:[''],
      // IssueTo:[''],
      resveQty:[''],
      frmLocator: [''],
      description: [''],
      uom: [''],
      primaryQty: [''],
      locatorId: [''],
      segment: [''],
      locator: [''],
      transCost: [''],
      avlqty:[''],
      onHandQty:[],
      lineNumber:[],
      onHandId:[],
    })
  }

  addnewtrxLinesList(i:number) {
    if(i>-1)
    {
      this.reservePos(i);
    }

    this.trxLinesList().push(this.newtrxLinesList());
    var len = this.trxLinesList().length;
    var patch = this.stockTranferForm.get('trxLinesList') as FormArray;
    (patch.controls[len - 1]).patchValue(
      {
        lineNumber: len,
      }
    );
  }
  removenewtrxLinesList(trxLineIndex) {
    this.trxLinesList().removeAt(trxLineIndex);
  }

  ngOnInit(): void {
    this.locId = Number(sessionStorage.getItem('locId'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.deptName=(sessionStorage.getItem('deptName'));
    this.issueBy=(sessionStorage.getItem('name'))
    // alert(this.deptName+'Depart');
  
    this.service.searchall(this.locId).subscribe(
      data=>{
        this.pendingrec=data;
       console.log(this.pendingrec);
        //  this.displayremakdata=true; 
        }
      
    )

    this.service.searchallatother(this.locId).subscribe(
      data=>{
        this.pendingatother=data;
       console.log(this.pendingrec);
        //  this.displayremakdata=true; 
        }
      
    )

    this.service.ItemIdListDept(this.deptName).subscribe(
      data => {
        this.ItemIdList = data;
        // console.log(this.invItemId);
      });

    this.service.subInvCode().subscribe(
      data => {
        this.subInvCode = data;
        console.log(this.subInventoryId);
        // alert('subInventoryCode');
      });

   

    this.service.locationIdList().subscribe
      (data => {
        this.locIdList = data;

      });
      this.addnewtrxLinesList(-1);
      var patch = this.stockTranferForm.get('trxLinesList') as  FormArray
      (patch.controls[0]).patchValue(
     {
       lineNumber: 1,
     }
   );
  }
  stockTransfer(stockTranferForm: any) { }
  onOptionSelect(event: any, i) {
    alert(event);
    alert(this.locId);
    console.log(this.subInvCode);
    let select1 = this.subInvCode.find(d => d.subInventoryCode === event);
    console.log(select1);
    var trxLnArr = this.stockTranferForm.get('trxLinesList').value;
    var itemid = trxLnArr[i].itemId;
    alert(itemid + "itemId")

    this.service.getfrmSubLoc(this.locId, itemid, select1.subInventoryId).subscribe(
      data => {
        this.getfrmSubLoc = data;
        console.log(data);
      });

  }
  onOptionItemDetails(event: any, i) {
    var subcode=this.stockTranferForm.get('subInventoryCode').value;
    alert(subcode+'Subinventory')
    let subcode1=this.subInvCode.find(d=>d.subInventoryCode===subcode);
    alert(subcode1.subInventoryId);
    var trxLnArr = this.stockTranferForm.get('trxLinesList').value;
    var itemid = trxLnArr[i].itemId;
    alert(itemid + "itemId")
    var trxLnArr1 = this.stockTranferForm.get('trxLinesList') as FormArray;
    // trxLnArr1.controls[i].patchValue({locatorId:this.getfrmSubLoc.locatorId})
    this.service.getItemDetail(itemid).subscribe
      (data => {
        this.getItemDetail = data;
        alert("this.getItemDetail.description" + this.getItemDetail.description);
        if (this.getItemDetail.description != undefined) {
          trxLnArr1.controls[i].patchValue({ description: this.getItemDetail.description });
          trxLnArr1.controls[i].patchValue({ uom: this.getItemDetail.uom });
        }
      }
      );
      this.service.getCostDetail(Number(sessionStorage.getItem('locId')),itemid).subscribe
          (data =>{
            this.CostDetail=data;
            trxLnArr1.controls[i].patchValue({transCost:this.CostDetail.rate});
          });
      this.service.getfrmSubLoc(this.locId, itemid, subcode1.subInventoryId).subscribe(
        data => {
          this.getfrmSubLoc = data;
          console.log(data);
          var getfrmSubLoc =data;
          //   // alert(getfrmSubLoc.segmentName+'SegmentName')
    
    
            alert(i +'i');
            this.locData[i] = data;
            if(getfrmSubLoc.length==1)
            {
            // this.displayLocator[i]=false;
            trxLnArr1.controls[i].patchValue({frmLocator:getfrmSubLoc[0].segmentName});
            trxLnArr1.controls[i].patchValue({locatorId:getfrmSubLoc[0].locatorId});
            // trxLnArr1.controls[i].patchValue({frmLocator:getfrmSubLoc[0].segmentName});
            trxLnArr1.controls[i].patchValue({onHandQty:getfrmSubLoc[0].onHandQty});
            trxLnArr1.controls[i].patchValue({onHandId:getfrmSubLoc[0].id});
            }
            else
            {
             // this.getfrmSubLoc=data;;
           //  trxLnArr2.controls[i].patchValue({onHandId:getfrmSubLoc});
           trxLnArr1.controls[i].patchValue({frmLocator:getfrmSubLoc[0].segmentName});
           trxLnArr1.controls[i].patchValue({onHandQty:getfrmSubLoc[0].onHandQty})
           trxLnArr1.controls[i].patchValue({onHandId:getfrmSubLoc[0].id});
            }
    
        });
        this.service.getreserqty(itemid,this.locId).subscribe
        (data=>{
          this.resrveqty=data;
          trxLnArr1.controls[i].patchValue({resveQty:this.resrveqty});
        });
  }
  AvailQty(event:any,i:number) 
{
  var trxLnArr1=this.stockTranferForm.get('trxLinesList')as FormArray;
  var trxLnArr = this.stockTranferForm.get('trxLinesList').value;
  var itemid=trxLnArr[i].itemId;
  var locId=trxLnArr[i].frmLocator;
  // trxLnArr1.controls[i].patchValue({locatorId:locId});
  alert(locId+'locatorID');
  var subcode=this.stockTranferForm.get('subInventoryCode').value;
  alert(subcode);
  let select2= this.subInvCode.find(d=>d.subInventoryCode===subcode);
  alert(select2.subInventoryId+'Id')
  this.service.getonhandqty(Number(sessionStorage.getItem('locId')),select2.subInventoryId,locId,itemid).subscribe
    (data =>{ 
      this.onhand1 = data;
      console.log(this.onhand1);
      trxLnArr1.controls[i].patchValue({onHandQty:data.obj.onHandQty});
    // var trxLnArr=this.stockTranferForm.get('trxLinesList').value;
    let onHand=data.obj.onHandQty;
  let reserve=trxLnArr[i].resveQty;
  alert(onHand+'OnHand');
  alert(reserve+'reserve');
  let avlqty1=0;
  avlqty1= onHand-reserve;
  // var trxLnArr1=this.stockTranferForm.get('trxLinesList')as FormArray;
  trxLnArr1.controls[i].patchValue({avlqty: avlqty1});
    })
  
}
validate(i:number,qty1)
{alert("Validate");
  var trxLnArr=this.stockTranferForm.get('trxLinesList').value;
  var trxLnArr1=this.stockTranferForm.get('trxLinesList') as FormArray
  let avalqty=trxLnArr[i].avlqty;
  let qty=trxLnArr[i].primaryQty;  
 alert(avalqty+'avalqty');
 alert(trxLnArr[i].primaryQty +' qty');
  if(qty>avalqty)
  {
    alert("You can not enter more than available quantity");
    trxLnArr1.controls[i].patchValue({primaryQty:''});
    qty1.focus();
  }
  if(qty<=0)
  {
    alert("Please enter quantity more than zero");
    trxLnArr1.controls[i].patchValue({primaryQty:''});
    qty1.focus();
  }
  
}
reservePos(i)
{alert("Hello");
var trxLnArr1 = this.stockTranferForm.get('trxLinesList').value;
  // var trxLnArr2 = this.moveOrderForm.get('trxLinesList') as FormArray;
  const formValue: IStockTransfer = this.stockTranferForm.value;
    let variants = <FormArray>this.trxLinesList();
    var transtypeid = this.stockTranferForm.get('transactionTypeId').value;
    let toorg=this.stockTranferForm.get('transferOrgId').value;
    let todesc=this.locIdList.find(d=>d.locId===toorg);
    var locId1=this.stockTranferForm.get('locId').value
   
      let variantFormGroup = <FormGroup>variants.controls[i];
      variantFormGroup.addControl('transactionTypeId', new FormControl(1, Validators.required));
      variantFormGroup.addControl('locId', new FormControl(locId1, Validators.required));
      variantFormGroup.addControl('reservedQty', new FormControl(trxLnArr1[i].primaryQty, Validators.required));
      // variantFormGroup.addControl('onHandId', new FormControl(trxLnArr1[i].onHandId, Validators.required));
       variantFormGroup.addControl('invItemId', new FormControl(trxLnArr1[i].itemId, Validators.required));
       variantFormGroup.addControl('transactionNumber',new FormControl(todesc.locCode,Validators.required));
   
  // var reserveinfo=formValue[0];

  this.service.reservePost(variants.value[i]).subscribe((res:any)=>{
  //  var obj=res.obj;
   if(res.code===200)
   {
    alert("Record inserted Successfully");
   }
   else{
    if(res.code === 400) {
      alert("Code already present in data base");
      this.stockTranferForm.reset();
    }
   }
  }
  );
}
  newStkTransfer() {

    const formValue: IStockTransfer = this.stockTranferForm.value;
    let variants = <FormArray>this.trxLinesList();
    var tranorgid = this.stockTranferForm.get('transferOrgId').value;
    var isso = this.stockTranferForm.get('issueTo').value;
    var ewaybil = this.stockTranferForm.get('ewayBill').value;
    var ewaydate = this.stockTranferForm.get('ewayBillDate').value;
    var rmark = this.stockTranferForm.get('remarks').value;
    var issb = this.stockTranferForm.get('issueBy').value;
    var tranda = this.stockTranferForm.get('transDate').value;
    var staus = this.stockTranferForm.get('status').value;
    var subInv=this.stockTranferForm.get('subInventoryCode').value;
    for (let i = 0; i < this.trxLinesList().length; i++) {
      let variantFormGroup = <FormGroup>variants.controls[i];
      variantFormGroup.addControl('transferOrgId', new FormControl(tranorgid, Validators.required));
      variantFormGroup.addControl('issueTo', new FormControl(isso, Validators.required));
      variantFormGroup.addControl('ewayBill', new FormControl(ewaybil, Validators.required));
      variantFormGroup.addControl('ewayBillDate', new FormControl(ewaydate, Validators.required));
      variantFormGroup.addControl('remarks', new FormControl(rmark, Validators.required));
      variantFormGroup.addControl('issueBy', new FormControl(issb, Validators.required));
      variantFormGroup.addControl('transDate', new FormControl(tranda, Validators.required));
      variantFormGroup.addControl('status', new FormControl(staus, Validators.required));
      variantFormGroup.addControl('orgId', new FormControl(this.locId, Validators.required));
      variantFormGroup.addControl('subInventoryCode',new FormControl(subInv,Validators.required));
    }
    console.log(variants.value);
    this.service.stockTransferSubmit(variants.value).subscribe((res: any) => {
      //  var obj=res;
      // sessionStorage.setItem('shipmentNumber',obj[0].shipmentNumber);
      if (res.code === 200) {
        alert("Record inserted Successfully");
        this.shipmentNumber =res.obj.shipmentNumber;
         this.stockTranferForm.patchValue({'transferOrgId':res.obj[0].transferOrgId,
         'issueTo':res.obj[0].issueTo,
         'shipmentNumber':res.obj[0].shipmentNumber,
        'transReference':res.obj[0].transReference});
         var trxLnArr2 = this.stockTranferForm.get('trxLinesList') as FormArray;
         for(let i=0; i<res.obj.length; i++){
          // trxLnArr2.controls[i].patchValue(res.obj[i]);
        
        trxLnArr2.controls[i].patchValue({'segment':res.obj[i].segment});
        trxLnArr2.controls[i].patchValue({'locator':res.obj[i].locator});
        trxLnArr2.controls[i].patchValue({'avlqty':res.obj[i].avlqty});
        trxLnArr2.controls[i].patchValue({'primaryQty':res.obj[i].primaryQty});
        }
        
        this.display = false;
        this.displayButton = false;
      }
      else {
        if (res.code === 400) {
          alert("Code already present in data base");
          this.stockTranferForm.reset();
        }
      }
    });
  }

  search(ShipmentNo) {
    // alert('1'+ShipmentNo);
    this.display = true;

    var shipNo = (this.stockTranferForm.get('ShipmentNo').value);
    // alert('2'+shipNo)
    this.service.getsearchByShipmentNo(shipNo).subscribe
      (data => {
        this.lstcomment = data;
        let control = this.stockTranferForm.get('trxLinesList') as FormArray;
        // data.forEach(f => {
        //   var trxlist:FormGroup=this.newtrxLinesList();
        //   this.trxLinesList().push(trxlist);
        // });
        var len = this.trxLinesList().length;
        for (let i = 0; i < data.length - len; i++) {
          var trxlist: FormGroup = this.newtrxLinesList();
          this.trxLinesList().push(trxlist);
        }

        this.stockTranferForm.patchValue(this.lstcomment[0]);
        this.transferLoc=this.lstcomment[0].transferLoc;
        this.displayButton = false;
        this.display = false;
        this.stockTranferForm.get('trxLinesList').patchValue(this.lstcomment);
        var patch = this.stockTranferForm.get('trxLinesList') as FormArray;
        for (let i = 0; i < this.trxLinesList().length; i++) {
          patch.controls[i].patchValue({
            LinNo: i + 1
          })
        }

      }
      );

  }
  // onSelectLocaorId(event: any, i) {
  //   alert('locatorSelect' + event);
  //   let select1 = this.getfrmSubLoc.find(d => d.id === event);
  //   console.log(select1);
  //   var patch = this.stockTranferForm.get('trxLinesList') as FormArray;
  //   patch.controls[i].patchValue({ locatorId: select1.locatorId });
  // }
  closeMoveOrder() {
    this.router.navigate(['admin']);
  }
  resetMoveOrder() {
    window.location.reload();
  }
searchAll()
{
  alert(this.locId+'Location');
 
  this.service.searchall(this.locId).subscribe(
    data=>{
      this.pendingrec=data;
     console.log(this.pendingrec);
       this.displayremakdata=true; 
      }
    
  )
    
}

selectByShipNo(shipmentNumber:any)  
{
  alert(shipmentNumber);
  let shipno=this.lstcomment.find(d=>d.shipmentNumber===shipmentNumber);
  console.log(shipno);
  alert(shipno.shipmentNumber+'after')
  // this.stockTranferForm.patchValue(shipno);
  
}

onlocationissueselect(event:any){
  var loc=this.stockTranferForm.get('transferOrgId').value;
  this.service.issueByList(loc, this.deptId, this.divisionId).subscribe
  (data => {
    this.issueByList = data;
    console.log(this.issueByList);
  });
}

}
