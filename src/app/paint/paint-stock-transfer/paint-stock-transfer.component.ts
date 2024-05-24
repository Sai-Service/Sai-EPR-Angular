// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../master/master.service';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';


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
  uuidRef: string;
  totVal:number;

  transferSubInv:string;
}
interface IEway{
  ewayBill: string;
  ewayBillDate: Date;
  ShipmentNo: String;
  transferOrgId: number;
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
  selector: 'app-paint-stock-transfer',
  templateUrl: './paint-stock-transfer.component.html',
  styleUrls: ['./paint-stock-transfer.component.css']
})
export class PaintStockTransferComponent implements OnInit {
  submitted = false;
  paintStockTranferForm: FormGroup;
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
  public tosubInvCode:any;
  public issueByList: Array<string> = [];
  public locIdList: any[];
  onHandId:number;
  locData:any = [];
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
  vin:string;
  engineNo:number;
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
  totVal:number;
  transferSubInv:string;
  isVisibleVinNumber:boolean=false;
  isVisibleEngNumber:boolean=false;
  displayheader:boolean=false;
  displayline:boolean=false;
  // public itemMap3 = new Map<string, StockTransferRow>();


  jeSource: string;
  name: string;
  ledgerName: string;
  jeCategory: string;
  postedDate: Date;
  periodName: string;
  runningTotalDr: number;
  runningTotalCr: number;

  viewAccounting1: any[];
  viewAccounting2: any[];
  docSeqValue: string;
  name1: number;
  ledgerId: number;
  description1: string;

  @ViewChild("myinput") myInputField: ElementRef;
  emplId: number;
  sub: any;
  // @ViewChild("segment") segment: ElementRef;
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }

  constructor(private fb: FormBuilder, private router: Router,private router1:ActivatedRoute, private service: MasterService) {
    this.paintStockTranferForm = fb.group({
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
      transferSubInv:['',[Validators.required]],
      transferLoc:[],
      status: ['', [Validators.required]],
      transReference:[''],
      emplId:[],
      totVal:[],

      jeSource: [],
      name: [],
      ledgerName: [],
      jeCategory: [],
      postedDate: [],
      periodName: [],
      runningTotalDr: [],
      runningTotalCr: [],
      ledgerId: [],
      description1: [],
      docSeqValue: [],
      name1:[],

      trxLinesList: this.fb.array([]),

    }

    )
  }
  trxLinesList(): FormArray {
    return this.paintStockTranferForm.get("trxLinesList") as FormArray
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
      vin:[''],
      engineNo:[''],
      locator: [''],
      transCost: [],
      avlqty:[''],
      onHandQty:[],
      lineNumber:[],
      onHandId:[],
      uuidRef: [''],
    })
  }

  addnewtrxLinesList(i:number) {
    // alert(i+'I Value');
    if(i>-1)
    {
      var trxLnArr1 = this.paintStockTranferForm.get('trxLinesList').value;
      var itemqty=trxLnArr1[i].primaryQty;
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
    var len1 = this.trxLinesList().length;
    // alert(len1+'Length'+i);
    if(len1==i+1){

    this.trxLinesList().push(this.newtrxLinesList());


    // (<any>this.paintStockTranferForm.get('segment')).nativeElement.focus();
    var patch = this.paintStockTranferForm.get('trxLinesList') as FormArray;
    var refId = uuidv4();
    var len = this.trxLinesList().length;
    (patch.controls[len - 1]).patchValue(
      {
        lineNumber: len,
        uuidRef: refId
      }

    );
     var btnrm =document.getElementById("btnrm"+i) as HTMLInputElement;
     if(document.contains(btnrm)){
    (document.getElementById("btnrm"+i) as HTMLInputElement).disabled = false;
    this.paintStockTranferForm.get('transferOrgId').disable();
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
       var trxLnArr1 = this.paintStockTranferForm.get('trxLinesList').value;
    var itemid=trxLnArr1[trxLineIndex].itemId;

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
    
    var patch = this.paintStockTranferForm.get('trxLinesList') as FormArray;
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
    $("#wrapper").toggleClass("toggled");
    this.locId = Number(sessionStorage.getItem('locId'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.deptName=(sessionStorage.getItem('deptName'));
    this.issueBy=(sessionStorage.getItem('name'));
    this.emplId=Number(sessionStorage.getItem('emplId'));
    // this.transCost=0.00;
    // alert(this.deptName+'Depart');
    // alert(this.locId+'locID'+Number(sessionStorage.getItem('locId')));

    if (Number(sessionStorage.getItem('deptId'))==1){
      this.isVisibleVinNumber=true;
      this.displayheader=true;
      this.displayline=true
    }

    else{
      this.isVisibleVinNumber=false;
      this.displayheader=false;
      this.displayline=false;
    }

    this.service.searchall(this.locId,this.divisionId,this.deptId).subscribe(
      data=>{
        this.pendingrec=data;
       console.log(this.pendingrec);
        //  this.displayremakdata=true;
        }

    )

    this.service.searchallatother(Number(sessionStorage.getItem('locId')),this.divisionId,this.deptId).subscribe(
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
     
      this.service
      .getsubTrfSubinventory(this.deptId, this.divisionId)
      .subscribe((data) => {
        this.tosubInvCode = data;
      });

    this.service.TolocationIdList(this.locId).subscribe
      (data => {
        this.locIdList = data;
        console.log(this.locIdList);
      });
      this.sub = this.router1.params.subscribe(params => {
        this.ShipmentNo = params['refNum'];
        //  alert ("orderNumber  :"+this.ShipmentNo);
       if (this.ShipmentNo != undefined){
        
       this.search(this.ShipmentNo);
     }
   });
  // this.addnewtrxLinesList(-1);


    //   var patch = this.paintStockTranferForm.get('trxLinesList') as  FormArray
    //   (patch.controls[0]).patchValue(
    //  {
    //    lineNumber: 1,
    //  }
  //  );
  //  this.displayRemoveRow[-1] = false;
  // (document.getElementById('btnadd'+i) as HTMLInputElement).disabled = true;
  }
  paintStockTranfer(paintStockTranferForm: any) { }

  onOptionSelect(event: any, i) {
    if(this.currentOp==='SEARCH'){
      return;
    }

   // alert(event);
    //alert(this.locId);
    console.log(this.subInvCode);
    let select1 = this.subInvCode.find(d => d.subInventoryCode === event);
    console.log(select1);
    var trxLnArr = this.paintStockTranferForm.get('trxLinesList').value;
    var itemid = trxLnArr[i].itemId;
    //alert(itemid + "itemId")

    this.service.getfrmSubLoc(this.locId, itemid, select1.subInventoryId).subscribe(
      data => {
        this.getfrmSubLoc = data;
        console.log(data);
      });

  }
  onOptionItemDetails(event: any, i) {
    // alert(event.target.value+'Item');
    var event=event.target.value;
    if(this.currentOp==='SEARCH'){
      return;
    }
 
    var subcode=this.paintStockTranferForm.get('subInventoryCode').value;
   // alert(subcode+'Subinventory')
    // let subcode1=this.subInvCode.find(d=>d.subInventoryCode===subcode);
   // alert(subcode1.subInventoryId);
   let select1=this.ItemIdList.find(d=>d.SEGMENT===event);
   if(select1!=undefined){
   var trxLnArr = this.paintStockTranferForm.get('trxLinesList').value;
   var trxLnArr1 = this.paintStockTranferForm.get('trxLinesList') as FormArray;
  //  trxLnArr1.controls[i].patchValue({itemId:select1.itemId})
    var itemId =select1.itemId;
    var vin=select1.vin;
    var eng=select1.engineNo;
    trxLnArr1.controls[i].patchValue({itemId:itemId});
    trxLnArr1.controls[i].patchValue({vin:vin});
    trxLnArr1.controls[i].patchValue({engineNo:eng});
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
            if(this.CostDetail.rate===0.0){
              // alert(this.CostDetail.segment);
            }
            // this.transCost[i]=this.CostDetail.rate;
          });
      this.service.getfrmSubLoc(this.locId, itemId, this.subInvCode.subInventoryId).subscribe(
        data => {
          this.getfrmSubLoc = data;
          console.log(data);
          var getfrmSubLoc =data;
            this.locData[i] = data;
            var selLocator = this.locData[i]

            if(getfrmSubLoc.length==1)
            {
              //  alert('if---------getfrmSubLoc.length'+'---'+ getfrmSubLoc.length);
            // trxLnArr1.controls[i].patchValue({frmLocator:selLocator[0].segmentName});
            trxLnArr1.controls[i].patchValue({frmLocator:selLocator[0].locatorId});
            trxLnArr1.controls[i].patchValue({locatorId:selLocator[0].locatorId});
            trxLnArr1.controls[i].patchValue({onHandQty:selLocator[0].onHandQty});
            trxLnArr1.controls[i].patchValue({onHandId:selLocator[0].id});
            }
            else
            {
              // alert('elseif---------getfrmSubLoc.length'+'---'+ getfrmSubLoc.length);
             // this.getfrmSubLoc=data;;
           //  trxLnArr2.controls[i].patchValue({onHandId:getfrmSubLoc});
           trxLnArr1.controls[i].patchValue({frmLocator:selLocator[0].segmentName});
           trxLnArr1.controls[i].patchValue({onHandQty:selLocator[0].onHandQty})
           trxLnArr1.controls[i].patchValue({onHandId:selLocator[0].id});
            }

        });
        this.service.getreserqty( this.locId,itemId).subscribe
        (data=>{
          this.resrveqty=data;
          trxLnArr1.controls[i].patchValue({resveQty:data});
          // this.AvailQty(this.frmLocator,i);
        });
        
       

      }
  }
  AvailQty(event:any,i:number)
{
  if(this.currentOp==='SEARCH'){
    return;
  }
  // alert(event+'Loca');
  var trxLnArr1=this.paintStockTranferForm.get('trxLinesList')as FormArray;
  var trxLnArr = this.paintStockTranferForm.get('trxLinesList').value;
  var itemid=trxLnArr[i].itemId;
  var locatorId=event;
  trxLnArr1.controls[i].patchValue({locatorId:locatorId});
  // alert(locatorId+'locatorID');
  this.service.getonhandqty(Number(sessionStorage.getItem('locId')),this.subInvCode.subInventoryId,locatorId,itemid).subscribe
    (data =>{
      this.onhand1 = data;
      console.log(this.onhand1);
      trxLnArr1.controls[i].patchValue({onHandQty:data.obj});
    // var trxLnArr=this.paintStockTranferForm.get('trxLinesList').value;
    let onHand=data.obj;
  let reserve=trxLnArr[i].resveQty;
  // alert(onHand+'OnHand');
  // alert(reserve+'reserve');
  let avlqty1=0;
  avlqty1= onHand-reserve;
  trxLnArr1.controls[i].patchValue({avlqty: avlqty1});
  if(avlqty1<0)
  {
    alert("Transfer is not allowed,Item has Reserve quantity - "+reserve);
   }
    })

}
transdata(val){
  delete val.trxLinesList.itemId;
  return val;
}
EwayUpdate(){
 // const formValue:IStockTransfer = this.transdata(this.paintStockTranferForm.value);
 const formValue:IEway = this.paintStockTranferForm.value;
//  debugger;
    this.service.UpdateStkEway(formValue).subscribe((res: any) => {
    if (res.code === 200) {
      alert(res.message);
      this.displayUp=true;
      // window.location.reload();
    } else {
      if (res.code === 400) {
        alert(res.message);
        // this.customerMasterForm.reset();
      }
    }
  });
}
validate(i:number,qty1)
{
  // alert("Validate");
  // if(qty1)
  var trxLnArr=this.paintStockTranferForm.get('trxLinesList').value;
  var trxLnArr1=this.paintStockTranferForm.get('trxLinesList') as FormArray
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
  this.updateTotAmtPerline(i);
}


reservePos(i) {
  var len = i;
  var trxLnArr1 = this.paintStockTranferForm.get('trxLinesList').value;
  console.log(trxLnArr1);
  var locId1 = this.paintStockTranferForm.get('locId').value;
  var prqty = trxLnArr1[len].primaryQty;
  var itemId = trxLnArr1[len].itemId;
  var transactionNumber = trxLnArr1[len].uuidRef;
  var locatorId = trxLnArr1[len].frmLocator;
  var rate = trxLnArr1[len].transCost;
  var transactionType = 'Stock Transfer'

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
      stkRow.Locator = (trxLnArr1[i].frmLocator);
      stkRow.quantity = (trxLnArr1[i].quantity);
      this.itemMap.set(trxLnArr1[i].segment, stkRow);
    }
    else {
      if (res.code === 400) {
        alert(res.message);
        this.paintStockTranferForm.reset();
      }
    }
  }
  );
}

deleteReserve() {
  // alert('delete reserve')
  // var transferId = this.CounterSaleOrderBookingForm.get('uuidRef').value;
  var trxLnArr2 = this.paintStockTranferForm.get('trxLinesList') as FormArray;
  var trxLnArr1 = trxLnArr2.getRawValue();
  for (let j = 0; j < trxLnArr1.length; j++) {
    var transferId = trxLnArr1[j].uuidRef;
    this.service.reserveDelete(transferId, Number(sessionStorage.getItem('locId'))).subscribe((res: any) => {
      if (res.code === 200) {
      }
    });
  }
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
  newStkTransfer() {

    if (this.paintStockTranferForm.valid) {
    var trxLnArr1 = this.paintStockTranferForm.get('trxLinesList').value;
    const formValue: IStockTransfer = this.paintStockTranferForm.value;
    let variants = <FormArray>this.trxLinesList();
    console.log(variants);
    var tranorgid = this.paintStockTranferForm.get('transferOrgId').value;
    var isso = this.paintStockTranferForm.get('issueTo').value;
    var ewaybil = this.paintStockTranferForm.get('ewayBill').value;
    var ewaydate = this.paintStockTranferForm.get('ewayBillDate').value;
    var rmark = this.paintStockTranferForm.get('remarks').value;
    var issb = this.paintStockTranferForm.get('issueBy').value;
    var tranda = this.paintStockTranferForm.get('transDate').value;
    var staus = this.paintStockTranferForm.get('status').value;
    var subInv=this.paintStockTranferForm.get('subInventoryCode').value;
    var tosubInv=this.paintStockTranferForm.get('transferSubInv').value;
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
      variantFormGroup.addControl('transferSubInv', new FormControl(tosubInv,[]));
    }
    console.log(variants.value);
    this.service.stockTransferSubmit(variants.value).subscribe((res: any) => {
      //  var obj=res;
      // sessionStorage.setItem('shipmentNumber',obj[0].shipmentNumber);
      if (res.code === 200) {
        alert(res.message);
        this.shipmentNumber =res.obj[0].shipmentNumber;
        this.transferLoc=res.obj[0].transReference;
        this.paintStockTranferForm.patchValue({transDate:res.obj[0].transDate})
        this.status=res.obj[0].status;
        var trxLnArr2 = this.paintStockTranferForm.get('trxLinesList') as FormArray;
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

        this.paintStockTranferForm.get('ewayBill').disable();
      this.paintStockTranferForm.get('ewayBillDate').disable();
      }
      else {
        if (res.code === 400) {
          alert(res.message);
          //this.paintStockTranferForm.reset();
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
    this.display = false;
    this.paintStockTranferForm.get('ewayBill').disable();
      this.paintStockTranferForm.get('ewayBillDate').disable();
    // var shipNo = (this.paintStockTranferForm.get('ShipmentNo').value);
    // alert('2'+shipNo)
    this.trxLinesList().clear();
    this.service.getsearchByShipmentNo(ShipmentNo).subscribe
      (data => {
        this.lstcomment = data;
        let control = this.paintStockTranferForm.get('trxLinesList') as FormArray;
        var len = this.trxLinesList().length;
        for (let i = 0; i < data.length - len; i++) {
          var trxlist: FormGroup = this.newtrxLinesList();
          this.trxLinesList().push(trxlist);
        }
        this.paintStockTranferForm.patchValue(this.lstcomment[0]);
        var ewaydate=this.lstcomment[0].ewayBillDate;
        // alert(ewaydate.substr(0,ewaydate.indexOf('T'))+'Time');
        // this.paintStockTranferForm.patchValue({'ewayBillDate':ewaydate.substr(0,ewaydate.indexOf('T'))});
        this.paintStockTranferForm.patchValue({'ewayBillDate':ewaydate});
        this.transferLoc=this.lstcomment[0].transferLoc;
        this.displayButton = false;
        this.display = false;
        this.paintStockTranferForm.get('trxLinesList').patchValue(this.lstcomment);
        var patch = this.paintStockTranferForm.get('trxLinesList') as FormArray;
        for (let i = 0; i < this.trxLinesList().length; i++) {
          patch.controls[i].patchValue({
            lineNumber: i + 1
          })
        }
        var eway=this.paintStockTranferForm.get('ewayBill').value;
        // alert(eway);
        if(eway===''){
          // alert('In If');
          this.displayUp=false;
          this.paintStockTranferForm.get('ewayBill').enable();
          this.paintStockTranferForm.get('ewayBillDate').enable();
        }
        this.currentOp='INSERT';
        this.displayOp=false;
        // (document.getElementById('btnUpdate') as HTMLInputElement).disabled = false;
        // this.displayUp=true;
      }
      );
    }
  }
  // onSelectLocaorId(event: any, i) {
  //   alert('locatorSelect' + event);
  //   let select1 = this.getfrmSubLoc.find(d => d.id === event);
  //   console.log(select1);
  //   var patch = this.paintStockTranferForm.get('trxLinesList') as FormArray;
  //   patch.controls[i].patchValue({ locatorId: select1.locatorId });
  // }
  closeMoveOrder() {
    this.deleteReserve();
    this.router.navigate(['admin']);
    
  }
  resetMoveOrder() {
    this.deleteReserve();
    window.location.reload();
    
  }
  onSubInveSelect(event){
    var toSub=event.target.value
    var loc=this.paintStockTranferForm.get('transferOrgId').value;
  // var issTo=this.paintStockTranferForm.get('issueTo').value;
  // alert(event)
  var selData=this.tosubInvCode.find(d=>d.subInventoryCode===toSub)
  
  this.service.issueByList(loc, selData.deptId, this.divisionId).subscribe
  (data => {
    this.issueByList = data;
    console.log(this.issueByList);
  });


//   if (sessionStorage.getItem('deptId')===1){
//   var designation='Sales Manager';
// }
// else{
//   var designation=''
// }

  // this.service.issueByListNew(selData.deptId,this.locId).subscribe
  //  (data => {
  //   this.issueByList = data.obj;
  //    console.log(this.issueByList);
  //  });


  }

searchAll()
{
  //alert(this.locId+'Location');

  this.service.searchall(this.locId,this.divisionId,this.deptId).subscribe(
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
  // this.paintStockTranferForm.patchValue(shipno);

}

onlocationissueselect(event){
  // alert(event);
  if(this.currentOp==='SEARCH'){
    return;
  }
  
  // alert(this.paintStockTranferForm.get('transferOrgId').value)
  // alert(this.paintStockTranferForm.get('issueTo').value)
  var loc=this.paintStockTranferForm.get('transferOrgId').value;
  var issTo=this.paintStockTranferForm.get('issueTo').value;
  
  if((loc===undefined && issTo===undefined) || issTo===''){}
  else{
    // alert('event');
    this.addnewtrxLinesList(-1);

    var patch = this.paintStockTranferForm.get('trxLinesList') as  FormArray
      (patch.controls[0]).patchValue(
     {
       lineNumber: 1,
       uuidRef: uuidv4()
     });
   

   
  this.service.ItemIdListDept(this.deptId,Number(sessionStorage.getItem('locId')),this.subInvCode.subInventoryId).subscribe(
    data => {
      this.ItemIdList = data;
      (document.getElementById('btnrm0') as HTMLInputElement).disabled = true;
      // console.log(this.invItemId);
    });


}

}
onIssueSelect(event){
  if(this.currentOp==='SEARCH'){
    return;
  }
  // alert(event+'--'+event.target.value)
  var loc=this.paintStockTranferForm.get('transferOrgId').value;
  var issTo=this.paintStockTranferForm.get('issueTo').value;
  if(loc===undefined && issTo===undefined){}
  else{
    // alert('event');
    this.addnewtrxLinesList(-1);

    var patch = this.paintStockTranferForm.get('trxLinesList') as  FormArray
      (patch.controls[0]).patchValue(
     {
       lineNumber: 1,
       uuidRef: uuidv4()
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
          // alert(res.message);
          // this.paintStockTranferForm.reset();
          // window.location.reload();
        }
       }
      }
    )

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
Object.keys(this.paintStockTranferForm.controls).forEach(
  (key) => {
    const control=this.paintStockTranferForm.controls[key] as FormControl|FormArray|FormGroup

    if(control instanceof FormControl){
      control.markAsTouched();
    }
    else if (control instanceof FormArray){

(<FormArray>this.paintStockTranferForm.get('trxLinesList')).controls.forEach((group: FormGroup) => {
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
  return(this.paintStockTranferForm.get(fieldName));
}

getGroupControllinewise(index,fieldName) {
  // alert('nam'+fieldName);
  return (<FormArray>this.paintStockTranferForm.get('trxLinesList')).at(index).get(fieldName);

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
  var shipNumber = this.paintStockTranferForm.get('shipmentNumber').value;
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
  const formValue:IStockTransfer = this.paintStockTranferForm.value;
  var shipNumber = this.paintStockTranferForm.get('shipmentNumber').value;
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

  message: string = "Please Fix the Errors !";
  msgType:string ="Close";
  getMessage(msgType: string) {
    this.msgType = msgType;
    if (msgType.includes("Save")) {
      this.submitted = true;
      (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
      if (this.paintStockTranferForm.invalid) {
        
        //this.submitted = false;
        (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '');
        alert('Please enter all Mandatory fields');
        return;
      }
      this.message = "Do you want to SAVE the changes(Yes/No)?"
      
    }

    if (msgType.includes("Reset")) {
      this.message = "Do you want to Reset the changes(Yes/No)?"
    }

    if (msgType.includes("Update")) {
        this.message = "Do you want to Update the changes(Yes/No)?"
      }
    
    if (msgType.includes("Close")) {
      this.message = "Do you want to Close the Form(Yes/No)?"
    }
    return;
  }

 executeAction() {
    if(this.msgType.includes("Save")) {
      this.newStkTransfer();
    }

    if (this.msgType.includes("Reset")) {
      this.resetMoveOrder();
    }

    if (this.msgType.includes("Update")) {
        this.EwayUpdate();
      }
    
    if (this.msgType.includes("Close")) {
      this.router.navigate(['admin']);
    }

    return;
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
      var formArr = this.paintStockTranferForm.get('trxLinesList') as FormArray;
      var formVal = formArr.getRawValue();
      var totAmt = 0;
      for (let i = 0; i < formVal.length; i++) {
         
          if (formVal[i].transCost == undefined || formVal[i].transCost == null || formVal[i].transCost == '') {
  
          } else {
            totAmt = totAmt + Number((formVal[i].transCost)*(formVal[i].primaryQty));
           
          }
  
        }
       
       totAmt = Math.round(((totAmt) + Number.EPSILON) * 100) / 100;
      this.paintStockTranferForm.patchValue({ 'totVal': totAmt });
    
    }
    viewAccounting(trxNumber: any) {
      // alert(receiptNo);
      this.service.viewAccountingST(trxNumber).subscribe((res: any) => {
        if (res.code === 200) {
          this.viewAccounting2 = res.obj;
          this.description1 = res.obj.description;
          this.periodName = res.obj.periodName;
          this.postedDate = res.obj.postedDate;
          this.jeCategory = res.obj.jeCategory;
          this.name = res.obj.name;
          this.ledgerId = res.obj.ledgerId;
          this.runningTotalDr = res.obj.runningTotalDr;
          this.runningTotalCr = res.obj.runningTotalCr;
          this.docSeqValue = res.obj.docSeqValue;
          console.log(this.description);
          this.viewAccounting1 = res.obj.glLines;
          console.log(this.viewAccounting1);
          // alert(res.message);
        } else {
          if (res.code === 400) {
            alert(res.message);
          }
        }
      });
    }
}


