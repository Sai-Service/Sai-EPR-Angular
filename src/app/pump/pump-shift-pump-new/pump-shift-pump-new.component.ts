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

  constructor(private service: MasterService,private   fb: FormBuilder, private router: Router,private PumpService1: PumpService) { 
    this.pumpShiftSalesForm = fb.group({
      shiftentryno:[],
      shiftentryid:[],
      shiftentrydate:[],
      shifttypeName:[],
      shifttyp:[],
      emplName:[],
      employeeid:[],
      totalothersale:[],
      totalcreditsale:[],
      totalcashsale:[],
      totalsale:[],
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
      ppShiftNozleLinesList: this.fb.array([this.nozzlelineDetailsGroup()])
      // ppShiftNozleLinesList: this.fb.array([]),
     });
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
      qty:[0],
      rate:[0],
      saletypeid:[],
      customerid:[],
      customercode:[],
      vehicleno:[],
      creditslipno:[],
      locid:[],
      lineAmt:[],
      payType:[],
      creationdate:[],
      createdby:[],
      lasstupdatedby:[],
      lastupdatedate:[],
     });
  }

  lineDetailsArray() :FormArray{
    return <FormArray>this.pumpShiftSalesForm .get('ppShiftNozzleDetailList')
  }

  nozzlelineDetailsArray(i:number) :FormArray{
    // return <FormArray>this.pumpShiftSalesForm .get('ppShiftNozleLinesList')
    return this.lineDetailsArray().at(i).get("ppShiftNozleLinesList") as FormArray;
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

  addRowPPLineDet(index){
    alert(index)
    this.nozzlelineDetailsArray(index).push(this.nozzlelineDetailsGroup());
    var arrline = this.nozzlelineDetailsArray(index)
    // alert(arrline.length+'----Len')
    var hedaerDet = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
    var hedaerDet1=hedaerDet.getRawValue();
    var nozzleid = hedaerDet1[index].nozzleid;
    alert(nozzleid)
    var segmentList1 = this.nozzleList.find((nozzleList: any) => nozzleList.nozzleId == nozzleid);
    this.nozzlelineDetailsArray(index).controls[arrline.length-1].patchValue({createdby: sessionStorage.getItem('emplId'),
    creationdate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),lasstupdatedby:sessionStorage.getItem('emplId'),
   lastupdatedate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),  locid:sessionStorage.getItem('locId'),
    nozzleid:nozzleid,nozzle:segmentList1.nozzleCode});
  }


  RemoveRowV(index) {
    if (index===0){}
    else { this.voucherDetailsArray().removeAt(index);}
  }

  openSunDetailsFn(index){
    
      var hedaerDet = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
      var hedaerDet1=hedaerDet.getRawValue();
    
            var nozzleid = hedaerDet1[index].nozzleid;
    
      var segmentList1 = this.nozzleList.find((nozzleList: any) => nozzleList.nozzleId == nozzleid);
      console.log(segmentList1);
      var patch = this.pumpShiftSalesForm.get('ppShiftNozleLinesList') as FormArray;
      this.nozzlelineDetailsArray(index).controls[index].patchValue({createdby: sessionStorage.getItem('emplId'),
         creationdate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),lasstupdatedby:sessionStorage.getItem('emplId'),
        lastupdatedate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),  locid:sessionStorage.getItem('locId'),
         nozzleid:nozzleid,nozzle:segmentList1.nozzleCode});
     }

  onSelectSegment(index,event){
   
    var seg = event.target.value;
        var value = seg.substr(seg.indexOf(':') + 1, seg.length).trim();
        // alert(value)
        var selectitemList = this.segmentList.find((segList)=>segList.segment=value);
        console.log(selectitemList);
        this.nozzlelineDetailsArray(index).controls[index].patchValue({itemid: selectitemList.itemId})
        // var patch = this.pumpShiftSalesForm.get('ppShiftNozleLinesList') as FormArray;
        // patch.controls[i].patchValue({ itemid: selectitemList.itemId });
        // this.nozzlelineDetailsArray(i).controls[i].patchValue({itemid: selectitemList.itemId })
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



  lineCalculationFn(index){
    // alert(index+'--------')
    var arr1= this.nozzlelineDetailsArray(index);
    console.log(arr1.value[index].qty);
    var qty=arr1.value[index].qty;
    var rate=arr1.value[index].rate;
    // alert(qty)
    var totAmt = qty*rate;
    this.nozzlelineDetailsArray(index).controls[index].patchValue({lineAmt: totAmt})
  }


  addRow(index) {
    if(this.duplicateLineItem ===false) {
    this.lineValidation=true;
    if (this.lineValidation)
      {
          this.lineDetailsArray().push(this.lineDetailsGroup());
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
      if (res.code === 200) {}
    })
  }


  closeSale(){}


  resetSale(){}
  CustAccountNoSearch(i,event){
    // alert(i+'---------'+event.target.value)
    var accountNo=event.target.value;
    this.service.custAccountNoSearch(accountNo, sessionStorage.getItem('ouId'), sessionStorage.getItem('divisionId'))
    .subscribe(
      data => {
        this.accountNoSearch = data.obj;
        var patch = this.pumpShiftSalesForm.get('ppShiftNozleLinesList') as FormArray;
        // patch.controls[i].patchValue({ customerid: data.obj[0].customerId });
        this.nozzlelineDetailsArray(i).controls[i].patchValue({customerid: data.obj[0].customerId })
      }
    )

  }


}
