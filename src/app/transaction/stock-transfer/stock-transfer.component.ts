// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { data } from 'jquery';
import { MasterService } from '../../master/master.service';
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
  segment:string;

  emplId:number;

}
interface IEway{
  ewayBill: string;
  ewayBillDate: Date;
  ShipmentNo: String;
  transferOrgId: number;
}
export  class StockTransferRow {
  segment:string;
  Locator:string;
  quantity:number;

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
  public ItemIdList:any= [];
  transactionTypeId:number=27;
  public subInvCode: any;
  public issueByList: Array<string> = [];
  public locIdList: any[];
  onHandId:number;
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
  displayOp=true;
  displayUp=true;
  displayButton = true;
  // transDate: Date;
  lstcomment: any;
  remarks: string;
  segment: string;
  locator: string;
  transCost:number;
  lineNumber:number;
  pipe = new DatePipe('en-US');
  now=new Date();
  transDate=this.pipe.transform(this.now,'dd-MM-yyyy')
  displayremakdata=true;
  pendingatother:any;
  transferLoc:string;
  currentOp:string;
  displayRemoveRow: Array<boolean> = [];
  public minewayBillDate = new Date().setDate(new Date().getDate()+7);
  userList2: any[] = [];
  lastkeydown1: number = 0;
  public itemMap = new Map<string, StockTransferRow >();


  @ViewChild("myinput") myInputField: ElementRef;
  emplId: number;
  // @ViewChild("segment") segment: ElementRef;
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.stockTranferForm = fb.group({
      ShipmentNo: [''],
      locId: [''],
      deptName:[''],
      shipmentNumber: [''],
      transferOrgId: ['',[Validators.required]],
      transactionTypeId:[''],
      issueTo: ['',[Validators.required]],
      ewayBill: [''],
      ewayBillDate: [''],
      remarks: [''],
      issueBy: [''],
      transDate: [''],
      subInventoryCode: ['',[Validators.required]],
      transferLoc:[],
      status: ['', [Validators.required]],
      transReference:[''],
      emplId:[],
      trxLinesList: this.fb.array([]),

    }

    )
  }
  trxLinesList(): FormArray {
    return this.stockTranferForm.get("trxLinesList") as FormArray
  }
  newtrxLinesList(): FormGroup {
    return this.fb.group({

      itemId: ['',[Validators.required]],
          // shipmentNumber:[''],
      // IssueTo:[''],
      resveQty:[''],
      frmLocator: ['',[Validators.required]],
      description: [''],
      uom: [''],
      primaryQty: ['',[Validators.required]],
      locatorId: [''],
      segment: [''],
      locator: [''],
      transCost: [],
      avlqty:[''],
      onHandQty:[],
      lineNumber:[],
      onHandId:[],
    })
  }

  addnewtrxLinesList(i:number) {
    // alert(i+'I Value');
    if(i>-1)
    {
      var trxLnArr1 = this.stockTranferForm.get('trxLinesList').value;
      var itemqty=trxLnArr1[i].primaryQty;
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
      this.deleteReserveLinewise(i);
      this.reservePos(i);
    }
    }
    var len1 = this.trxLinesList().length;
    // alert(len1+'Length'+i);
    if(len1==i+1){

    this.trxLinesList().push(this.newtrxLinesList());


    // (<any>this.stockTranferForm.get('segment')).nativeElement.focus();
    var patch = this.stockTranferForm.get('trxLinesList') as FormArray;
    var len = this.trxLinesList().length;
    (patch.controls[len - 1]).patchValue(
      {
        lineNumber: len,

      }

    );
     var btnrm =document.getElementById("btnrm"+i) as HTMLInputElement;
     if(document.contains(btnrm)){
    (document.getElementById("btnrm"+i) as HTMLInputElement).disabled = false;
    this.stockTranferForm.get('transferOrgId').disable();
    // (document.getElementById('btnrm'+i+1) as HTMLInputElement).disabled = true;
    }
    }
    // this.displayRemoveRow[i]=true;
    // alert(i);

  }
  removenewtrxLinesList(trxLineIndex:number) {
    var len1=this.trxLinesList().length;
    if(len1===1){
      alert('You can not delete the line');
      return;}
       var trxLnArr1 = this.stockTranferForm.get('trxLinesList').value;
    var itemid=trxLnArr1[trxLineIndex].segment;
    // alert(itemid+'Delete');
    if(itemid!=null)
    {
    this.deleteReserveLinewise(trxLineIndex);
    this.itemMap.delete(itemid);
    }
    this.trxLinesList().removeAt(trxLineIndex);
    var patch = this.stockTranferForm.get('trxLinesList') as FormArray;
    var len = this.trxLinesList().length;
    (patch.controls[len - 1]).patchValue(
      {
        lineNumber: len,
      }
    );

    var btnrm =document.getElementById("btnrm"+(trxLineIndex-1)) as HTMLInputElement;
     if(document.contains(btnrm)){
    (document.getElementById("btnrm"+(trxLineIndex-1)) as HTMLInputElement).disabled = true;
    // (document.getElementById('btnrm'+i+1) as HTMLInputElement).disabled = true;
    }
    // }
  }

  ngOnInit(): void {
    this.locId = Number(sessionStorage.getItem('locId'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.deptName=(sessionStorage.getItem('deptName'));
    this.issueBy=(sessionStorage.getItem('name'));
    this.emplId=Number(sessionStorage.getItem('emplId'));
    // this.transCost=0.00;
    // alert(this.deptName+'Depart');
    // alert(this.locId+'locID'+Number(sessionStorage.getItem('locId')));

    this.service.searchall(this.locId).subscribe(
      data=>{
        this.pendingrec=data;
       console.log(this.pendingrec);
        //  this.displayremakdata=true;
        }

    )

    this.service.searchallatother(Number(sessionStorage.getItem('locId'))).subscribe(
      data=>{
        this.pendingatother=data;
       console.log(this.pendingrec);
        //  this.displayremakdata=true;
        }

    )



    this.service.subInvCode2(this.deptId,this.divisionId).subscribe(
      data => {
        this.subInvCode = data;
        console.log(this.subInventoryId);
        this.subInventoryCode=this.subInvCode.subInventoryCode;
        // alert('subInventoryCode');
      });

    this.service.TolocationIdList(this.locId).subscribe
      (data => {
        this.locIdList = data;
        console.log(this.locIdList);
      });

  // this.addnewtrxLinesList(-1);


    //   var patch = this.stockTranferForm.get('trxLinesList') as  FormArray
    //   (patch.controls[0]).patchValue(
    //  {
    //    lineNumber: 1,
    //  }
  //  );
  //  this.displayRemoveRow[-1] = false;
  // (document.getElementById('btnadd'+i) as HTMLInputElement).disabled = true;
  }
  stockTransfer(stockTranferForm: any) { }
  onOptionSelect(event: any, i) {
    if(this.currentOp==='SEARCH'){
      return;
    }

   // alert(event);
    //alert(this.locId);
    console.log(this.subInvCode);
    let select1 = this.subInvCode.find(d => d.subInventoryCode === event);
    console.log(select1);
    var trxLnArr = this.stockTranferForm.get('trxLinesList').value;
    var itemid = trxLnArr[i].itemId;
    //alert(itemid + "itemId")

    this.service.getfrmSubLoc(this.locId, itemid, select1.subInventoryId).subscribe(
      data => {
        this.getfrmSubLoc = data;
        console.log(data);
      });

  }
  onOptionItemDetails(event: any, i) {
    // alert(event+'Item');
    if(this.currentOp==='SEARCH'){
      return;
    }
    // alert(event);
    // if(event.key==='Tab')
    // {


        // if(event != null)
        // {
        //   // alert(event.length);
        //   this.displayRemoveRow[i] = true;
        // }
    var subcode=this.stockTranferForm.get('subInventoryCode').value;
   // alert(subcode+'Subinventory')
    // let subcode1=this.subInvCode.find(d=>d.subInventoryCode===subcode);
   // alert(subcode1.subInventoryId);
   let select1=this.ItemIdList.find(d=>d.SEGMENT===event);
   if(select1!=undefined){
   var trxLnArr = this.stockTranferForm.get('trxLinesList').value;
   var trxLnArr1 = this.stockTranferForm.get('trxLinesList') as FormArray;
  //  trxLnArr1.controls[i].patchValue({itemId:select1.itemId})
    var itemId =select1.itemId;
    trxLnArr1.controls[i].patchValue({itemId:itemId})
  //  alert( itemId);
        // trxLnArr1.controls[i].patchValue({locatorId:this.getfrmSubLoc.locatorId})
    this.service.getItemDetail(select1.itemId).subscribe
      (data => {
        this.getItemDetail = data;
       // alert("this.getItemDetail.description" + this.getItemDetail.description);
        if (this.getItemDetail.description != undefined) {
          trxLnArr1.controls[i].patchValue({ description: this.getItemDetail.description });
          trxLnArr1.controls[i].patchValue({ uom: this.getItemDetail.uom });
        }
      }
      );
      this.service.getCostDetail(Number(sessionStorage.getItem('locId')),itemId).subscribe
          (data =>{
            this.CostDetail=data;
            trxLnArr1.controls[i].patchValue({transCost:this.CostDetail.rate});
            // this.transCost[i]=this.CostDetail.rate;
          });
      this.service.getfrmSubLoc(this.locId, itemId, this.subInvCode.subInventoryId).subscribe(
        data => {
          this.getfrmSubLoc = data;
          console.log(data);
          var getfrmSubLoc =data;
            this.locData[i] = data;
            if(getfrmSubLoc.length==1)
            {
            trxLnArr1.controls[i].patchValue({frmLocator:getfrmSubLoc[0].segmentName});
            trxLnArr1.controls[i].patchValue({locatorId:getfrmSubLoc[0].locatorId});
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
        this.service.getreserqty( this.locId,itemId).subscribe
        (data=>{
          this.resrveqty=data;
          trxLnArr1.controls[i].patchValue({resveQty:this.resrveqty});
        });
      }
  }
  AvailQty(event:any,i:number)
{
  if(this.currentOp==='SEARCH'){
    return;
  }
  // alert(event+'Loca');
  var trxLnArr1=this.stockTranferForm.get('trxLinesList')as FormArray;
  var trxLnArr = this.stockTranferForm.get('trxLinesList').value;
  var itemid=trxLnArr[i].itemId;
  var locId=trxLnArr[i].frmLocator;
  var onhandid=trxLnArr[i].id;
  trxLnArr1.controls[i].patchValue({locatorId:locId});
//  alert(locId+'locatorID');
  var subcode=this.stockTranferForm.get('subInventoryCode').value;
 // alert(subcode);
  // let select2= this.subInvCode.find(d=>d.subInventoryCode===subcode);
 // alert(select2.subInventoryId+'Id')
 this.service.getonhandqty(Number(sessionStorage.getItem('locId')),this.subInvCode.subInventoryId,locId,itemid).subscribe
    (data =>{
      this.onhand1 = data;
      console.log(this.onhand1);
      // alert(this.onHandId);
      // alert(this.onhand1);
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
  if(avlqty1<0)
  {
    alert("Transfer is not allowed,Item has Reserve quantity - "+reserve);
    this.trxLinesList().clear();
    this.addnewtrxLinesList(i);
  }
    })

}
transdata(val){
  delete val.trxLinesList.itemId;
  return val;
}
EwayUpdate(){
 // const formValue:IStockTransfer = this.transdata(this.stockTranferForm.value);
 const formValue:IEway = this.stockTranferForm.value;
 debugger;
    this.service.UpdateStkEway(formValue).subscribe((res: any) => {
    if (res.code === 200) {
      alert('RECORD UPDATED SUCCESSFULLY');
      this.displayUp=true;
      // window.location.reload();
    } else {
      if (res.code === 400) {
        alert('ERROR OCCOURED IN PROCEESS');
        // this.customerMasterForm.reset();
      }
    }
  });
}
validate(i:number,qty1)
{
  // alert("Validate");
  // if(qty1)
  var trxLnArr=this.stockTranferForm.get('trxLinesList').value;
  var trxLnArr1=this.stockTranferForm.get('trxLinesList') as FormArray
  let avalqty=trxLnArr[i].avlqty;
  let qty=trxLnArr[i].primaryQty;
  let uomCode=trxLnArr[i].uom;
//  alert(avalqty+'avalqty');
//  alert(trxLnArr[i].primaryQty +' qty');
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
  if(uomCode==='NO')
  {
    // alert(Number.isInteger(qty)+'Status');
    if(!(Number.isInteger(qty)))
    {
    alert('Please enter correct No');
    trxLnArr1.controls[i].patchValue({primaryQty:''});
  }}

}
reservePos(i)
{
  // alert("Hello");

var trxLnArr1 = this.stockTranferForm.get('trxLinesList').value;
  // var trxLnArr2 = this.moveOrderForm.get('trxLinesList') as FormArray;
  const formValue: IStockTransfer = this.stockTranferForm.value;
    let variants = <FormArray>this.trxLinesList();
    var transtypeid = this.stockTranferForm.get('transactionTypeId').value;
    let toorg=this.stockTranferForm.get('transferOrgId').value;
    // alert(toorg+'toOrg');
    let todesc=this.locIdList.find(d=>d.toLocationId===toorg);
    var locId1=this.stockTranferForm.get('locId').value;
    var prqty=trxLnArr1[i].primaryQty
    // alert(prqty+'QTY');
    // if(variants.controls[i].get('reservedQty')!=undefined)
    // {
    //   alert('In if');
    //   variants.controls[i].get('reservedQty').reset();

    // }

      let variantFormGroup = <FormGroup>variants.controls[i];
      variantFormGroup.removeControl('reservedQty');
      variantFormGroup.removeControl('invItemId');
      variantFormGroup.removeControl('transactionNumber');
      variantFormGroup.addControl('transactionTypeId', new FormControl(1, []));
      variantFormGroup.addControl('locId', new FormControl(locId1, []));
      variantFormGroup.addControl('reservedQty', new FormControl(trxLnArr1[i].primaryQty, []));
      // variantFormGroup.addControl('onHandId', new FormControl(trxLnArr1[i].onHandId, Validators.required));
       variantFormGroup.addControl('invItemId', new FormControl(trxLnArr1[i].itemId, []));
       variantFormGroup.addControl('transactionNumber',new FormControl(todesc.toLocationId,[]));
       console.log(variants);
  // var reserveinfo=formValue[0];
  // alert('reservecall2'+i);
  this.service.reservePost(variants.value[i]).subscribe((res:any)=>{
  //  var obj=res.obj;
   if(res.code===200)
   {
    // alert(res.message);
    // (document.getElementById('btnadd'+i) as HTMLInputElement).disabled = true;
    var stkRow:StockTransferRow=new StockTransferRow();
    stkRow.segment=(trxLnArr1[i].segment);
    stkRow.Locator=(trxLnArr1[i].frmLocator);
    stkRow.quantity=(trxLnArr1[i].quantity);
    this.itemMap.set(trxLnArr1[i].segment,stkRow);

// variants.controls[i].get('reservedQty').reset();
   }
   else{
    if(res.code === 400) {
      alert(res.message);
      this.stockTranferForm.reset();
    }
   }
  }
  );
}
deleteReserve()
{
  var transferId=this.stockTranferForm.get('transferOrgId').value
  this.service.reserveDelete(transferId,Number(sessionStorage.getItem('locId'))).subscribe((res:any)=>{
    //  var obj=res.obj;
     if(res.code===200)
     {
      // alert(res.message);
     }});
}
deleteReserveLinewise(i)
{
  var trxLnArr1 = this.stockTranferForm.get('trxLinesList').value;
  var transferId=this.stockTranferForm.get('transferOrgId').value
  var itemid=trxLnArr1[i].itemId;
  this.service.reserveDeleteLine(transferId,Number(sessionStorage.getItem('locId')),itemid).subscribe((res:any)=>{
    //  var obj=res.obj;
     if(res.code===200)
     {
      // alert(res.message);
     }});
}
  newStkTransfer() {

    if (this.stockTranferForm.valid) {
    var trxLnArr1 = this.stockTranferForm.get('trxLinesList').value;
    const formValue: IStockTransfer = this.stockTranferForm.value;
    let variants = <FormArray>this.trxLinesList();
    console.log(variants);
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
      variantFormGroup.addControl('transferOrgId', new FormControl(tranorgid, []));
      variantFormGroup.addControl('issueTo', new FormControl(isso, []));
      variantFormGroup.addControl('ewayBill', new FormControl(ewaybil, []));
      variantFormGroup.addControl('ewayBillDate', new FormControl(ewaydate, []));
      variantFormGroup.addControl('remarks', new FormControl(rmark, []));
      variantFormGroup.addControl('issueBy', new FormControl(issb, []));
      variantFormGroup.addControl('transDate', new FormControl(tranda, []));
      variantFormGroup.addControl('status', new FormControl(staus, []));
      variantFormGroup.addControl('orgId', new FormControl(this.locId, []));
      variantFormGroup.addControl('subInventoryCode',new FormControl(subInv,[]));
      // variantFormGroup.addControl('locatorId', new FormControl(trxLnArr1[i].frmLocator,[]));
    }
    console.log(variants.value);
    this.service.stockTransferSubmit(variants.value).subscribe((res: any) => {
      //  var obj=res;
      // sessionStorage.setItem('shipmentNumber',obj[0].shipmentNumber);
      if (res.code === 200) {
        alert(res.message);
        this.shipmentNumber =res.obj[0].shipmentNumber;
        this.transferLoc=res.obj[0].transReference;
        this.stockTranferForm.patchValue({transDate:res.obj[0].transDate})
        // this.search(this.shipmentNumber);
        //  this.stockTranferForm.patchValue({
        //    'transferLoc':res.obj[0].transReference,
        //  'issueTo':res.obj[0].issueTo,
        //  'shipmentNumber':res.obj[0].shipmentNumber})
        // 'transReference':res.obj[0].transReference
        // 'transferOrgId':res.obj[0].transReference });
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
        this.displayOp=false;
        this.displayUp=false;

        this.stockTranferForm.get('ewayBill').disable();
      this.stockTranferForm.get('ewayBillDate').disable();
      }
      else {
        if (res.code === 400) {
          alert(res.message);
          //this.stockTranferForm.reset();
        }
      }
    });
  }
  else{

      // alert('else');
      this.HeaderValidation();

  }
  }

  search(ShipmentNo) {
    if(ShipmentNo!=undefined){
    this.currentOp='SEARCH';
    // alert('1'+ShipmentNo);
    this.display = true;
    this.stockTranferForm.get('ewayBill').disable();
      this.stockTranferForm.get('ewayBillDate').disable();
    // var shipNo = (this.stockTranferForm.get('ShipmentNo').value);
    // alert('2'+shipNo)
    this.service.getsearchByShipmentNo(ShipmentNo).subscribe
      (data => {
        this.lstcomment = data;
        let control = this.stockTranferForm.get('trxLinesList') as FormArray;
        var len = this.trxLinesList().length;
        for (let i = 0; i < data.length - len; i++) {
          var trxlist: FormGroup = this.newtrxLinesList();
          this.trxLinesList().push(trxlist);
        }
        this.stockTranferForm.patchValue(this.lstcomment[0]);
        var ewaydate=this.lstcomment[0].ewayBillDate;
        // alert(ewaydate.substr(0,ewaydate.indexOf('T'))+'Time');
        // this.stockTranferForm.patchValue({'ewayBillDate':ewaydate.substr(0,ewaydate.indexOf('T'))});
        this.stockTranferForm.patchValue({'ewayBillDate':ewaydate});
        this.transferLoc=this.lstcomment[0].transferLoc;
        this.displayButton = false;
        this.display = false;
        this.stockTranferForm.get('trxLinesList').patchValue(this.lstcomment);
        var patch = this.stockTranferForm.get('trxLinesList') as FormArray;
        for (let i = 0; i < this.trxLinesList().length; i++) {
          patch.controls[i].patchValue({
            lineNumber: i + 1
          })
        }
        var eway=this.stockTranferForm.get('ewayBill').value;
        alert(eway);
        if(eway===''){
          alert('In If');
          this.stockTranferForm.get('ewayBill').enable();
          this.stockTranferForm.get('ewayBillDate').enable();
          this.displayUp=false;
        }
        this.currentOp='INSERT';
        this.displayOp=false;
        // (document.getElementById('btnUpdate') as HTMLInputElement).disabled = false;
        this.displayUp=true;
      }
      );
    }
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
    this.deleteReserve();
  }
  resetMoveOrder() {
    window.location.reload();
    this.deleteReserve();
  }
searchAll()
{
  //alert(this.locId+'Location');

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
  //alert(shipmentNumber);
  let shipno=this.lstcomment.find(d=>d.shipmentNumber===shipmentNumber);
  console.log(shipno);
  //alert(shipno.shipmentNumber+'after')
  // this.stockTranferForm.patchValue(shipno);

}

onlocationissueselect(event){
  // alert(event);
  if(this.currentOp==='SEARCH'){
    return;
  }
  var loc=this.stockTranferForm.get('transferOrgId').value;
  if(loc===undefined){}
  else{
    // alert('event');
    this.addnewtrxLinesList(-1);

    var patch = this.stockTranferForm.get('trxLinesList') as  FormArray
      (patch.controls[0]).patchValue(
     {
       lineNumber: 1,
     });
    this.service.Shipmentdue(Number(sessionStorage.getItem('locId')),loc,this.subInvCode.subInventoryCode).subscribe
    ((res:any)=>{
      //  var obj=res.obj;
       if(res.code===200)
       {
        alert(res.message);
       }
       else{
        if(res.code === 400) {
          alert(res.message);
          // this.stockTranferForm.reset();
          // window.location.reload();
        }
       }
      }
    )

    this.service.issueByList(loc, this.deptId, this.divisionId).subscribe
  (data => {
    this.issueByList = data;
    console.log(this.issueByList);
  });
  this.service.ItemIdListDept(this.deptId,Number(sessionStorage.getItem('locId')),this.subInvCode.subInventoryId).subscribe(
    data => {
      this.ItemIdList = data;
      (document.getElementById('btnrm0') as HTMLInputElement).disabled = true;
      // console.log(this.invItemId);
    });


}

}

HeaderValidation() {
  var isValid:boolean=false;
Object.keys(this.stockTranferForm.controls).forEach(
  (key) => {
    const control=this.stockTranferForm.controls[key] as FormControl|FormArray|FormGroup

    if(control instanceof FormControl){
      control.markAsTouched();
    }
    else if (control instanceof FormArray){

(<FormArray>this.stockTranferForm.get('trxLinesList')).controls.forEach((group: FormGroup) => {
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
  return(this.stockTranferForm.get(fieldName));
}

getGroupControllinewise(index,fieldName) {
  // alert('nam'+fieldName);
  return (<FormArray>this.stockTranferForm.get('trxLinesList')).at(index).get(fieldName);

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

viewStocknote() {
  var shipNumber = this.stockTranferForm.get('shipmentNumber').value;
  const fileName = 'download.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.service.viewStocknote(shipNumber)
    .subscribe(data => {
      var blob = new Blob([data], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      var printWindow = window.open(url, '', 'width=800,height=500');
      printWindow.open
    })
}

viewStockgatePass() {
  const formValue:IStockTransfer = this.stockTranferForm.value;
  var shipNumber = this.stockTranferForm.get('shipmentNumber').value;
  const fileName = 'download.pdf';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.service.StockgatePassSubmit(formValue).subscribe(
    (res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.service.viewStockgatePass(shipNumber,this.emplId)
        .subscribe(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          var printWindow = window.open(url, '', 'width=800,height=500');
          printWindow.open
        })
    }
     else {
        if (res.code === 400) {
          alert( res.message);
          // this.CounterSaleOrderBookingForm.reset();
          // window.location.reload();
        }

    }}
  )
  }
}
