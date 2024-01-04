import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { PumpService } from 'src/app/pump/pump.service';


@Component({
  selector: 'app-pump-shift-pump-new',
  templateUrl: './pump-shift-pump-new.component.html',
  styleUrls: ['./pump-shift-pump-new.component.css']
})
export class PumpShiftPumpNewComponent implements OnInit {
  pumpShiftSalesForm: FormGroup;
  shiftentryno:string;
  shiftentryid:number;
  // shiftentrydate:Date;
  shifttypeName:string;
  shifttyp:number;
  selectedLine = 0;
  emplName:string;
  employeeid:number;
  totalsale:number;
  totalcashsale:number;
  totalcreditsale:number;
  totalothersale:number;
  finalconfirm:string;
  finalconfirmdate:Date;
  lastupdateby:number;
  creationdate:Date;
  createdby:number;
  pipe = new DatePipe('en-US');
  now = new Date();
  shiftentrydate = this.pipe.transform(this.now, 'yyyy-MM-dd')

 

  shiftList :any=[];
  salesPersonList :any=[];
  nozzleList:any=[];
  IslandDetails:any=[];
  segmentList:any=[];
  PaymentModeList: any=[];
  accountNoSearch: any=[];
 

  lineValidation=false;
  duplicateLineItem=false;
  displayButton = true;
  displaysegment: Array<boolean> = [];


  constructor(private service: MasterService,private   fb: FormBuilder, private router: Router,private PumpService1: PumpService) { 
    this.pumpShiftSalesForm = fb.group({
      shiftentryno:[],
      shiftentryid:[],
      shiftentrydate:[],
      shifttypeName:[],
      shifttyp:[],
      emplName:[],
      employeeid:[],
      totalothersale:[0],
      totalcreditsale:[0],
      totalcashsale:[0],
      totalsale:[0],
      finalconfirm:[],
      finalconfirmdate:[],
      lastupdateby:[],
      creationdate:[],
      createdby:[],
      lastupdatedate:[],
      cashdifference:[],
      totalexpenses:[],
      cashsubmitted:[],
      locid:[],
      ppShiftVoucherList: this.fb.array([this.voucherDetailsGroup()]),
      ppShiftNozzleDetailList: this.fb.array([this.lineDetailsGroup()]),
      // ppShiftNozleLinesList: this.fb.array([this.nozzlelineDetailsGroup()]),
      // ppShiftNozleLinesList:this.fb.array([this.nozzlelineDetailsGroup()]),
    })
  }

  voucherDetailsArray() :FormArray{
    return <FormArray>this.pumpShiftSalesForm .get('ppShiftVoucherList')
  }
 

  voucherDetailsGroup() {
    return this.fb.group({
      shiftvoucherid:[],
      shiftentryid:[],
      shiftvoucherno:[],
      locid:[],
      description:[],
      amount:[],
      creationdate:[],
      createdby:[],
      lastupdateby:[],
      lastupdatedate:[],
     });
  }

  lineDetailsGroup() {
    return this.fb.group({
      shiftnozzleid:[],
      shiftentryid:[],
      nozzle:[],
      nozzleid:[],
      openingreading:[],
      manualclosingreading:[],
      systemclosingreading:[],
      totalsalereading:[],
      difference:[],
      creationdate:[],
      createdby:[],
      lasstupdatedby:[],
      lastupdatedate:[],
      remarks:[],
      locid:[],
      nozzFuelType:[],
      nozzIsland:[],
      ppShiftNozleLinesList: this.fb.array([])
      // ppShiftNozleLinesList: this.fb.array([]),this.nozzlelineDetailsGroup()
     });
  }

  

  lineDetailsArray() :FormArray{
    return <FormArray>this.pumpShiftSalesForm .get('ppShiftNozzleDetailList')
  }

  // nozzlelineDetailsArray(i:number) :FormArray{
  //   // console.log(i+'------ I Value ...');
  //   return this.lineDetailsArray().at(i).get("ppShiftNozleLinesList") as FormArray;
  // }

  nozzlelineDetailsArray(i: number): FormArray {
    console.log(i);
    // debugger;
    return this.lineDetailsArray().at(i).get('ppShiftNozleLinesList') as FormArray;    
  }

  nozzlelineDetailsGroup() {
    return this.fb.group({
      NozzlidId :[''],
      shiftnozzlelinesid:[],
      shiftnozzleid:[],
      nozzle:[],
      shiftentryid:[],
      nozzleid:[''],
      itemid:[],
      segment:[],
      nozzleDetLineNo:[],
      qty:[0],
      rate:[0],
      selectedLine:[],
      saletypeid:[],
      customerid:[],
      customercode:[],
      vehicleno:[],
      creditslipno:[],
      locid:[],
      lineAmt:[],
      payType:[],
      // saletypeid:[],
      creationdate:[],
      createdby:[],
      lasstupdatedby:[],
      lastupdatedate:[],
     });
  }

  // nozzlelineDetailsArray() :FormArray{
  
  //   // return <FormArray>this.lineDetailsArray().at(i).get('ppShiftNozleLinesList') as FormArray;
  //   // return this.lineDetailsArray().at(i).get("ppShiftNozleLinesList") as FormArray
  // }


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");

    this.pumpShiftSalesForm.patchValue({createdby:sessionStorage.getItem('emplId'),lastupdateby:sessionStorage.getItem('emplId'),
      creationdate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),lastupdatedate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),
      locid:sessionStorage.getItem('locId')})

      var patch = this.pumpShiftSalesForm.get('ppShiftVoucherList') as FormArray;
      patch.controls[0].patchValue({ createdby: sessionStorage.getItem('emplId'),
      creationdate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),lastupdateby:sessionStorage.getItem('emplId'),
      lastupdatedate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),  locid:sessionStorage.getItem('locId')});
      // this.displaysegment[0]=true;
    this.service.ShiftList().subscribe(
      data => {
        this.shiftList = data;
        console.log(this.shiftList);
      }
    );

    this.service.PPEmplIdList(sessionStorage.getItem('locId'),sessionStorage.getItem('divisionId'))
.subscribe(
  data => {
    this.salesPersonList = data;
    console.log(this.salesPersonList);
  }
);

this.PumpService1.segmentListFn()
.subscribe(
  data => {
    this.segmentList = data;
    console.log(this.segmentList);
  });


this.service.NozzleList()
.subscribe(
  data => {
    this.nozzleList = data;
    console.log(this.nozzleList);
  });

  this.service.PaymentModeList()
  .subscribe(
    data => {
      this.PaymentModeList = data;
      console.log(this.PaymentModeList);
    }
  );

  }

  get f() { return this.pumpShiftSalesForm.controls; }

  pumpShiftSales(pumpShiftSalesForm:any) {  }

  search(shiftNo){
    this.PumpService1.getSearchShiftNo(shiftNo)
    .subscribe(
      data => {
        this.pumpShiftSalesForm.patchValue(data.obj); 
      })
  }

  onSelectShiftTypeId(event){
    var shftName=event.target.value;
    // alert('----'+shftName+'----');
    var selectShiftList = this.shiftList.find((shiftList: any) => shiftList.codeDesc == shftName);
    console.log(selectShiftList);
    this.pumpShiftSalesForm.patchValue({shifttyp:selectShiftList.cmnId})
    
  }

  onSelectEmplName(event){
    var emlName=event.target.value;
    // alert('----'+emlName+'----');
    var emplList = emlName.substr(emlName.indexOf('-') + 1, emlName.length);
    // alert(emplList)
    var emplList1 = this.salesPersonList.find((salesPersonList:any)=>salesPersonList.fullName=emplList);
    console.log(emplList1);
    this.pumpShiftSalesForm.patchValue({employeeid:emplList1.emplId})
    
  }

  addRowV(index) {
    if(this.duplicateLineItem ===false) {
    this.lineValidation=true;
    if (this.lineValidation) 
    { 
      this.voucherDetailsArray().push(this.voucherDetailsGroup());
      var patch = this.pumpShiftSalesForm.get('ppShiftVoucherList') as FormArray;
      patch.controls[index+1].patchValue({ createdby: sessionStorage.getItem('emplId'),
      creationdate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),lastupdateby:sessionStorage.getItem('emplId'),
      lastupdatedate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),  locid:sessionStorage.getItem('locId')});
    }
  } 
    else {alert("Duplicate Line Item Found : Remove Duplicate line and Proceed..." + this.duplicateLineItem);
  }
  }

  addRowPPLineDet(index,k){
    alert(index+'-----Main Line Index')
    var arrline = this.nozzlelineDetailsArray(index)
    console.log(arrline.value);
    var values = arrline.value;
    this.nozzlelineDetailsArray(index).push(this.nozzlelineDetailsGroup());
    var len =this.nozzlelineDetailsArray(index).length;
    var hedaerDet = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
    var hedaerDet1=hedaerDet.getRawValue();
    var nozzleid = hedaerDet1[index].nozzleid;
    var segmentList1 = this.nozzleList.find((nozzleList: any) => nozzleList.nozzleId == nozzleid);
    this.nozzlelineDetailsArray(this.selectedLine).controls[k].patchValue({createdby: sessionStorage.getItem('emplId'),
    creationdate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),lasstupdatedby:sessionStorage.getItem('emplId'),
   lastupdatedate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),  locid:sessionStorage.getItem('locId'),
    nozzleid:nozzleid,nozzle:segmentList1.nozzleCode,nozzleDetLineNo:len});
    this.addlineCalculation(index,k,null)
      // alert(len+1)
    // this.displaysegment.push(true);
  }


  addlineCalculation(index,k,event){
    var arrline = this.nozzlelineDetailsArray(index);
    console.log(arrline);
    var len =this.nozzlelineDetailsArray(index).length;
    var paymentType = arrline.value[k].payType;
    var cashlineAmt = 0;
    var totalSaleAmt =0;
    var totalCreditAmt=0;
    var otherSaleAmt=0;
    var payType=event.target.value;
    var payType1= payType.substr(payType.indexOf(':') + 1, payType.length).trim();
    console.log(this.PaymentModeList);
    var payTypeList = this.PaymentModeList.find((payTyList)=>payTyList.lookupValue===payType1);
    console.log(payTypeList);
    for (let  i=0;i<arrline.length;i++){
      if (arrline.value[i].payType === 'CASH' ) {
        if (arrline.value[i].lineAmt == undefined || arrline.value[i].lineAmt == null || arrline.value[i].lineAmt == '') {
        } else {
          cashlineAmt = cashlineAmt + Number(arrline.value[i].lineAmt);
        }
    }
    if (arrline.value[i].payType === 'CREDIT CARD' ) {
      if (arrline.value[i].lineAmt == undefined || arrline.value[i].lineAmt == null || arrline.value[i].lineAmt == '') {

      } else {
        totalCreditAmt = totalCreditAmt + Number(arrline.value[i].lineAmt);
      }
  }

  if (arrline.value[i].payType === 'CHEQUE' || arrline.value[i].payType === 'CHEQUE' ||
  arrline.value[i].payType === 'CONTROL ACCOUNT' || arrline.value[i].payType === 'DEBIT CARD' || 
  arrline.value[i].payType === 'OLD PENDING' || arrline.value[i].payType === 'OTHER' ||
  arrline.value[i].payType === 'RTGS/NEFT'||arrline.value[i].payType === 'WALLET' ) {
    if (arrline.value[i].lineAmt == undefined || arrline.value[i].lineAmt == null || arrline.value[i].lineAmt == '') {

    } else {
      otherSaleAmt = otherSaleAmt + Number(arrline.value[i].lineAmt);
    }
}
  }
  cashlineAmt = Math.round(((cashlineAmt) + Number.EPSILON) * 100) / 100;
  otherSaleAmt = Math.round(((otherSaleAmt) + Number.EPSILON) * 100) / 100;
  totalCreditAmt = Math.round(((totalCreditAmt) + Number.EPSILON) * 100) / 100;
  totalSaleAmt=(cashlineAmt+otherSaleAmt+totalCreditAmt);
  this.pumpShiftSalesForm.patchValue({ 'totalcashsale': cashlineAmt,'totalsale':totalSaleAmt,'totalcreditsale':totalCreditAmt,
'totalothersale': otherSaleAmt});
this.nozzlelineDetailsArray(this.selectedLine).controls[k].patchValue({saletypeid:payTypeList.lookupValueId});
  }


  voucherLineAmt(i){
    var totalVoucherAmt = 0;
    var arrline=this.voucherDetailsArray()
    for (let  i=0;i<arrline.length;i++){
        if (arrline.value[i].amount == undefined || arrline.value[i].amount == null || arrline.value[i].amount == '') {
        } else {
          totalVoucherAmt = totalVoucherAmt + Number(arrline.value[i].amount);
        }
  }
  totalVoucherAmt = Math.round(((totalVoucherAmt) + Number.EPSILON) * 100) / 100;
  this.pumpShiftSalesForm.patchValue({ 'totalexpenses': totalVoucherAmt});
  }


  RemoveRowPPLineDet(i,k){
    alert(i+'---'+k)
    if (k===0){
      alert('First Line Able To delete. Please confirm.!')
      return;
    }
    else{
      this.nozzlelineDetailsArray(i).removeAt(k);
    }

  }

  RemoveRowV(index) {
    if (index===0){}
    else { this.voucherDetailsArray().removeAt(index);}
  }

  lineTaxdetails: any = [];
  selTaxLn = '';

  openSunDetailsFn(index){
      alert(index+'----Selected Line Index')
     
      this.nozzlelineDetailsArray(index).clear();
      this.nozzlelineDetailsArray(index).push(this.nozzlelineDetailsGroup()); 
      this.selTaxLn = String(index);

    var invLnNo = Number(index + 1);
    this.lineTaxdetails = this.nozzlelineDetailsArray(invLnNo) as FormArray;
    this.lineTaxdetails.clear();
  //     if (index >0){
  //     var firstFormArrayFormGroup= this.nozzlelineDetailsArray(0).controls[0];
   
  // }
    }




    openSunDetailsFnOld(index){
      this.selectedLine=index;
    // var arraNew=  this.nozzlelineDetailsArray(index).value;
    // arraNew.clear();
    //   this.nozzlelineDetailsArray(index).push(this.nozzlelineDetailsGroup());
      var hedaerDet = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
      var hedaerDet1=hedaerDet.getRawValue();
      var nozzleid = hedaerDet1[this.selectedLine].nozzleid;
      var segmentList1 = this.nozzleList.find((nozzleList: any) => nozzleList.nozzleId == nozzleid);
      console.log(segmentList1);
      var len=this.nozzlelineDetailsArray(this.selectedLine).length;
    alert('details click I ref-- '+ (this.selectedLine) +'   k ref value- '+ len)

      this.nozzlelineDetailsArray(this.selectedLine).controls[len-1].patchValue({createdby: sessionStorage.getItem('emplId'),
         creationdate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),lasstupdatedby:sessionStorage.getItem('emplId'),
        lastupdatedate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),  locid:sessionStorage.getItem('locId'),
         nozzleid:nozzleid,nozzle:segmentList1.nozzleCode,nozzleDetLineNo:1});
       
  }

    closeModel(){
      console.log(this.lineDetailsArray());
      
    }


  onSelectSegment(i,k,event){
     alert(this.selectedLine+'---'+k+'----'+event)
      var seg = event.target.value;
      // alert(seg)
          var value = seg.substr(seg.indexOf(':') + 1, seg.length).trim();
          // alert('-----'+value+'------');
          console.log(this.segmentList);
          var selectitemList = this.segmentList.find((segList)=>segList.segment===value);
          console.log(selectitemList);
          var len =this.nozzlelineDetailsArray(k).length;
             this.nozzlelineDetailsArray(i).controls[k].patchValue({itemid: selectitemList.itemId});
  }

 

 


  onSelectedNozzle(i,event){
    var segment=event.target.value;
    // alert(i+'-----'+segment);
    var segmentList = segment.substr(segment.indexOf('-') + 1, segment.length);
    // alert(segmentList)
    var segmentList1 = this.nozzleList.find((nozzleList: any) => nozzleList.nozzleCode == segmentList);
    console.log(segmentList1);
    // alert('segmentList1.nozzleId----'+segmentList1.nozzleId)
    var patch = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
    patch.controls[i].patchValue({nozzleid:segmentList1.nozzleId,createdby: sessionStorage.getItem('emplId'),
    creationdate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),lasstupdatedby:sessionStorage.getItem('emplId'),
    lastupdatedate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),  locid:sessionStorage.getItem('locId')});
    this.service.NozzleIslandPick(segmentList1.nozzleId)
    .subscribe(
      data => {
        this.IslandDetails = data;
        // console.log(this.IslandDetails);
        // alert( this.IslandDetails.islandCode);
        (patch.controls[i]).patchValue({
          nozzFuelType: data.description,
          nozzIsland: data.islandCode
        })
      });
  }



  calculationFn(i){
    // alert(i);
    // debugger;
    var arrayControlNew = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
      var arrayControl = arrayControlNew.getRawValue();
      var openQtySys = arrayControl[i].openingreading;
      var closeQtyMan = arrayControl[i].manualclosingreading;
      var SystemClosingReading = arrayControl[i].systemclosingreading;
      // alert(pricingQty)
      // alert('openQtySys---'+openQtySys+'   closeQtyMan---'+closeQtyMan+'     SystemClosingReading--'+SystemClosingReading)
      if (openQtySys === null || openQtySys === undefined || openQtySys === '') {
        return;
      }
      if (openQtySys <= 0) {
        alert("Please enter quantity more than zero");
        return;
      }
     

    var totaQty = closeQtyMan-openQtySys;
    var diffQty= closeQtyMan-SystemClosingReading;
    var patch = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
    patch.controls[i].patchValue({ totalsalereading: totaQty,difference:diffQty });
  }



  lineCalculationFn(index,k){
    // alert(index+'--------')
    var arr1= this.nozzlelineDetailsArray(index);
    console.log(arr1);
    var len =this.nozzlelineDetailsArray(index).length;
    // alert(len)
    var qty=arr1.value[len-1].qty;
    var rate1=arr1.value[len-1].rate;
    // alert('--qty---'+qty+'--rate--'+rate1)
    var totAmt = qty*rate1;
  var  totAmt1 = Math.round(((totAmt) + Number.EPSILON) * 100) / 100;
    this.nozzlelineDetailsArray(index).controls[k].patchValue({lineAmt: totAmt1})
  }


  addRow(index) {
    alert(index)
    // this.selectedLine=index;
    if(this.duplicateLineItem ===false) {
    this.lineValidation=true;
    if (this.lineValidation)
      {
          this.lineDetailsArray().push(this.lineDetailsGroup());
          this.selectedLine=(index+1);
      }
     } else {alert("Duplicate Line Item Found : Remove Duplicate line and Proceed..." + this.duplicateLineItem);
   }
  

  }
  
  
  
  RemoveRow(index) {
    if (index===0){}
    else {
      this.lineDetailsArray().removeAt(index);
    }
  
  }

  saveSale1(){
    let jsonData = this.pumpShiftSalesForm.getRawValue();
    this.PumpService1.savePetrolPump(JSON.stringify(jsonData)).subscribe((res: any) => {
      if (res.code === 200) {
        this.pumpShiftSalesForm.patchValue({shiftentryno:res.obj.shiftentryno,shiftentrydate:res.obj.creationdate})
      }
    })
  }


  closeSale(){}


  resetSale(){}
  CustAccountNoSearch(i,event){
    // alert(i+'---------'+event.target.value)
    var accountNo=event.target.value;
    var len =this.nozzlelineDetailsArray(i).length;
    this.service.custAccountNoSearch(accountNo, sessionStorage.getItem('ouId'), sessionStorage.getItem('divisionId'))
    .subscribe(
      data => {
        this.accountNoSearch = data.obj;
        var patch = this.pumpShiftSalesForm.get('ppShiftNozleLinesList') as FormArray;
        // patch.controls[i].patchValue({ customerid: data.obj[0].customerId });
        this.nozzlelineDetailsArray(i).controls[len-1].patchValue({customerid: data.obj[0].customerId })
      }
    )

  }


}
