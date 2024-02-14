import { Component, VERSION } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { PumpService } from 'src/app/pump/pump.service';
import { DatePipe } from '@angular/common';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { compileDirectiveFromRender2 } from '@angular/compiler/src/render3/view/compiler';



interface IPumpShiftSale{

  shiftentryid:number;
  shiftentryno :string;
  shiftentrydate:Date;
  shifttype:number;
  employeeid:number;

  shiftCode :string;
  nozzleId :number;
  islandCode :string;
  openMRS:number;
  closeMRS:number;
  closeMRM:number;
  diffValue:Number;

  totalSale :number;
  totalCashSale:number;
  totalCreditSale:number;
  totalotherSale:number;
  totalexpenses:number;
  CashSubmitted:number;
  CashDifference:number;

}

@Component({
  selector: 'app-testing-dynamic',
  templateUrl: './testing-dynamic.component.html',
  styleUrls: ['./testing-dynamic.component.css']
})

export class TestingDynamicComponent  {
  pumpShiftSalesForm: FormGroup;
  shiftentryno:string;
  shiftentryid:number;
  shipEntrySt:string;
  shifttypeName:string;
  shifttype:number;
  shifttypCode:string;
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
  public minDate = new Date();
  pipe = new DatePipe('en-US');
  now = new Date();
  // shiftentrydate :string;
  shiftentrydate = this.pipe.transform(this.now, 'y-MM-dd');

  subInvCode:any=[];
  subInventoryId:number;

  shiftList :any=[];
  salesPersonList :any=[];
  nozzleList:any=[];
  nozzleListshift:any=[];

  IslandDetails:any=[];
  segmentList:any=[];
  ItemSegmentList: Array<string> = [];
  // segmentList:any;
  PaymentModeList: any=[];
  accountNoSearch: any=[];
  nozzleListData:any=[];
 
  isDisabled3 = false;
  lineValidation=false;
  duplicateLineItem=false;
  displayButton = true;
  displaysegment: Array<boolean> = [];
  displaysegmentInvType: Array<boolean> = [];
  displaylineDetUpdate: Array<boolean> = [];
  displaylineDetUpdate1: Array<boolean> = [];
  displaylineSubDetadd: Array<boolean> = [];
  displaylineSubDetadd1: Array<boolean> = [];
  displayRemovelineDet: Array<boolean> = [];
  displayRemovelineDet1: Array<boolean> = [];
  // displayRemoveSubLineDet: Array<boolean> = [];
  displayRemoveSubLineDet: any[][] = [];
  displayRemoveSubLineDet1: Array<boolean> = [];
  displayVoucherRemove: Array<boolean> = [];
  isVisibleShiftPretolSave:boolean=true;
  isVisibleShiftPretolUpdate:boolean=false;
  isVisibleshipFinalConfirm:boolean=false;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  display = 'none';
  customerNameSearch:any=[];
  public sub: any;
  totalCalculation:number;
  totalQty:number;
  userList1: any[] = [];
  lastkeydown1: number = 0;
  Nzd_enableQtyAmtFld =false;
  // NZHLlineValidation=false;
  NZLlineValidation=false;
  NZHLineValidation=false;
  headerValidation=false;
  NZRComplete=false;
  AddNozzleButtonDisabled=true;
  NZLineDelButtonDisabled=false;
  NZHLineAddDetButtonDisabled=false;
  lineItemRepeated=false;


   constructor(private fb: FormBuilder,private service: MasterService, private router: Router,private PumpService1: PumpService,private orderManagementService: OrderManagementService,private router1: ActivatedRoute) {
    this.pumpShiftSalesForm = fb.group({
      shiftentryno:[],
      shiftentryid:[],
      shiftentrydate:[],
      shipEntrySt:[],
      shifttypeName:[],
      shifttype:[],
      subInventoryId:[],
      shifttypCode:[],
      emplName:[],
      employeeid:[],
      totalothersale:[0],
      totalcreditsale:[0],
      totalcashsale:[0],
      totalsale:[0],
      totalCalculation:[0],
      totalQty:[0],
      finalconfirm:[],
      finalconfirmdate:[],
      lastupdateby:[],
      creationdate:[],
      createdby:[],
      lastupdatedate:[],
      cashdifference:[0],
      totalrate:[0],
      totalexpenses:[0],
      cashsubmitted:[],
      locid:[],
      ppShiftNozzleDetailList: this.fb.array([]),
      ppShiftVoucherList: this.fb.array([this.voucherDetailsGroup()]),
    })
   }


 ngOnInit() {
  $("#wrapper").toggleClass("toggled");
 
  this.isVisibleShiftPretolUpdate=false;
  this.displaylineSubDetadd1[0]=true;
  this.displaylineDetUpdate1[0]=true;
  this.displayRemovelineDet1[0]=true;
  this.pumpShiftSalesForm.patchValue({createdby:sessionStorage.getItem('emplId'),lastupdateby:sessionStorage.getItem('emplId'),
       creationdate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),lastupdatedate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),
       locid:sessionStorage.getItem('locId')})

      var patch = this.pumpShiftSalesForm.get('ppShiftVoucherList') as FormArray;
      patch.controls[0].patchValue({ createdby: sessionStorage.getItem('emplId'),
      creationdate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),lasstupdatedby:sessionStorage.getItem('emplId'),
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

this.service.NozzleList()
.subscribe(
  data => {
    this.nozzleList = data;
    console.log(this.nozzleList);
  });

  

  this.service.PaymentModeListPP()
  .subscribe(
    data => {
      this.PaymentModeList = data;
      console.log(this.PaymentModeList);
    }
  );

  var patch = this.pumpShiftSalesForm.get('ppShiftVoucherList') as FormArray;
  patch.controls[0].patchValue({ createdby: sessionStorage.getItem('emplId'),
  creationdate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),lastupdateby:sessionStorage.getItem('emplId'),
  lastupdatedate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),  locid:sessionStorage.getItem('locId')});


  this.sub = this.router1.params.subscribe(params => {
    this.shiftentryno = params['shiftEntryNo'];
    if (this.shiftentryno != undefined) {
      this.search(this.shiftentryno);
    }
  });

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

nozTotAmt =0;
nozTotQty=0;

search(shiftNo){
  this.closeResetButton = false;
  this.progress = 0;
  this.pumpShiftSalesForm.patchValue({shipEntrySt:'Search'})
  this.dataDisplay = 'Data Searching is progress....Do not refresh the Page';
  this.voucherDetailsArray().clear();
  this.ppShiftNozzleDetailList().clear();
  var patch = this.pumpShiftSalesForm.get('ppShiftVoucherList') as FormArray;
  let control1 = this.pumpShiftSalesForm.get('ppShiftVoucherList') as FormArray;
  var nozListArr = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
  let nozListArrContr = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
  var lineNozListArr = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
  let lineNozListArrContr = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
  console.log(lineNozListArr.value); 
  this.isVisibleShiftPretolUpdate=true;
  this.isVisibleShiftPretolSave=false;
  this.PumpService1.getSearchShiftNo(shiftNo)
  .subscribe(
    data => {
      console.log(data);
    if (data===null){
      alert('Data Not Found.!... Please Check Shipment Number.!')
      this.closeResetButton = true;
      this.progress = 0;
      this.dataDisplay = 'Data Not Found.!... Please Check Shipment Number.!';
    } 
    else{
      this.closeResetButton = true;
      this.progress = 0;
      this.dataDisplay = 'Data Searching Completed....Do not refresh the Page';
      var selectShiftTyep =  this.shiftList.find((shiftList: any) => shiftList.cmnId == data.obj.shifttype);  
      var emplList = this.salesPersonList.find((empList: any) => empList.emplId == data.obj.employeeid);
      console.log(emplList);
      this.pumpShiftSalesForm.patchValue({shifttypeName:selectShiftTyep.codeDesc , shifttype:selectShiftTyep.cmnId, shifttypCode:selectShiftTyep.code,
        emplName:emplList.ticketNo+'-'+emplList.fullName , employeeid:emplList.emplId}) 
      for (let v=0; v< data.obj.ppShiftVoucherList.length ; v++){
      var voucherListAllList1: FormGroup = this.voucherDetailsGroup();
      control1.push(voucherListAllList1);
        patch.controls[v].patchValue({
          shiftvoucherno:data.obj.ppShiftVoucherList[v].shiftvoucherno,
          description:data.obj.ppShiftVoucherList[v].description,
          amount:data.obj.ppShiftVoucherList[v].amount,
          shiftvoucherid:data.obj.ppShiftVoucherList[v].shiftvoucherid,
          shiftentryid:data.obj.ppShiftVoucherList[v].shiftentryid,
        })
        this.displayVoucherRemove[v]=false;
      }
      for (let n=0; n< data.obj.ppShiftNozzleDetailList.length ; n++){
        this.displaysegment[n] = false;
        this.displaylineSubDetadd[n]=true;
        this.displaylineDetUpdate[n]=false;
        this.displayRemovelineDet[n]=false;
        var ppShiftNozzleAllList1: FormGroup = this.newEmployee();
        nozListArrContr.push(ppShiftNozzleAllList1);
        nozListArr.controls[n].patchValue({
          shiftnozzleid:data.obj.ppShiftNozzleDetailList[n].shiftnozzleid,
          shiftentryid:data.obj.ppShiftNozzleDetailList[n].shiftentryid,
          nozzleid:data.obj.ppShiftNozzleDetailList[n].nozzleid,
          nozzle:data.obj.ppShiftNozzleDetailList[n].nozzlecode,
          nozzFuelType:data.obj.ppShiftNozzleDetailList[n].fuelType,
          nozzIsland:data.obj.ppShiftNozzleDetailList[n].islandName,
          openingreading:data.obj.ppShiftNozzleDetailList[n].openingreading,
          systemclosingreading:data.obj.ppShiftNozzleDetailList[n].systemclosingreading,
          manualclosingreading:data.obj.ppShiftNozzleDetailList[n].manualclosingreading,
          totalsalereading:data.obj.ppShiftNozzleDetailList[n].totalsalereading,
          difference:data.obj.ppShiftNozzleDetailList[n].difference,
          remarks:data.obj.ppShiftNozzleDetailList[n].remarks,
          creationdate:data.obj.ppShiftNozzleDetailList[n].creationdate,
          createdby:data.obj.ppShiftNozzleDetailList[n].createdby,
          lasstupdatedby:data.obj.ppShiftNozzleDetailList[n].lasstupdatedby,
          lastupdatedate:data.obj.ppShiftNozzleDetailList[n].lastupdatedate,
          locid:data.obj.ppShiftNozzleDetailList[n].locid,
        });

        this.nozTotAmt=this.nozTotAmt+data.obj.ppShiftNozzleDetailList[n].totalrate;
        this.nozTotQty=this.nozTotQty+data.obj.ppShiftNozzleDetailList[n].difference;
        this.displayRemoveSubLineDet[n]=[];
        for (let subln=0;subln<data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList.length;subln++){
          var ppShiftNozzleAllList1: FormGroup = this.newSkill();
          this.employeeSkills(n).push(ppShiftNozzleAllList1);
          // debugger;
          console.log(this.displayRemoveSubLineDet+'-----empIndex--'+n+'------empSkill---'+subln);
          this.displayRemoveSubLineDet[n][subln]=false;
          this.PumpService1.segmentListFn1(data.obj.ppShiftNozzleDetailList[n].fuelType)
.subscribe(
  res => {
    console.log(res);   
    this.segmentList = res;
    console.log(this.segmentList);
    var letSelectSegmentList = this.segmentList.find((segmentList: any) => segmentList.itemId == data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].itemid);  
    console.log(letSelectSegmentList);
  this.employeeSkills(n).controls[subln].patchValue({nozzleid:data.obj.ppShiftNozzleDetailList[n].nozzleid,
    nozzle:data.obj.ppShiftNozzleDetailList[n].nozzlecode,segment:letSelectSegmentList.segment,
    customercode:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].customercode, 
    customerid:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].customerid,
     payType:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].payType,
     saletypeid:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].saletypeid,
     shiftnozzlelinesid:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].shiftnozzlelinesid,
     shiftnozzleid:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].shiftnozzleid,
     shiftentryid:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].shiftentryid,
     itemid:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].itemid,
     qty:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].qty,
     rate:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].rate,
    vehicleno:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].vehicleno,
    creditslipno:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].creditslipno,
    locatorid:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].locatorid,
    lineAmt:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].lineAmt,
    invoicegen:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].invoicegen,
    creationdate:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].creationdate,
    createdby:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].createdby,
    lasstupdatedby:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].lasstupdatedby,
    lastupdatedate:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].lastupdatedate,
    locid:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].locid,
    locator:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].segmentName,
    custName:data.obj.ppShiftNozzleDetailList[n].ppShiftNozleLinesList[subln].customerName})
  });
 
      }
        }
        
          this.pumpShiftSalesForm.patchValue(data.obj); 
          if (data.obj.finalconfirm=='YES'){
            this.isVisibleShiftPretolSave=false;
            this.isVisibleShiftPretolUpdate=false;
            this.isVisibleshipFinalConfirm=false;
            this.pumpShiftSalesForm.disable();
            this.newEmployee().disable();
            this.voucherDetailsArray().disable();
            
          }
          else{
            this.isVisibleshipFinalConfirm=true;
          }

          var shipConDt = this.pipe.transform(data.obj.finalconfirmdate, 'dd-MM-yyyy');
          this.pumpShiftSalesForm.patchValue({finalconfirmdate:shipConDt,totalCalculation:this.nozTotAmt,totalQty:this.nozTotQty})

    }
  })  
    
}

onSelectShiftTypeId(event){
  var shftName=event.target.value;
  // alert('----'+shftName+'----');
  var selectShiftList = this.shiftList.find((shiftList: any) => shiftList.codeDesc == shftName);
  console.log(selectShiftList);
  this.pumpShiftSalesForm.patchValue({shifttype:selectShiftList.cmnId,shifttypCode:selectShiftList.code})
  
}


ppShiftNozzleDetailList(): FormArray {
  return this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
}

newEmployee(): FormGroup {
  return this.fb.group({
    
    shiftentryid:[],
    shiftnozzleid:[],
    nozzle:[],
    nozzleid:[],
    nozzFuelType:[],
    nozzrate:[],
    nozzIsland:[],
    openingreading:[],
    systemclosingreading:[],
    manualclosingreading:[],
    totalsalereading:[],
    difference:[],
    totalrate:[0],
    remarks:[],
    creationdate:[],
    createdby:[],
    lasstupdatedby:[],
    lastupdatedate:[],
    locid:[],
    ppShiftNozleLinesList: this.fb.array([])
  });
}



addEmployee() {
  // @@@@
          var shifttp = this.pumpShiftSalesForm.get('shifttypCode').value
          var dt0=this.pumpShiftSalesForm.get('shiftentrydate').value

          // var dt1 = this.pipe.transform(dt0, 'dd-MMM-y');
          // var dt2=dt1;
          // var dt3= this.pipe.transform(this.now, 'y-MM-dd');
           var dt1;
          if (shifttp==='I'){
            var startDt1 = new Date(dt0);
            startDt1.setDate(startDt1.getDate() -1);
             dt1=this.pipe.transform(startDt1, 'dd-MMM-yyyy');
          } else{  dt1 = this.pipe.transform(dt0, 'dd-MMM-yyyy');   }

          var tDate = this.pipe.transform(dt0, 'dd-MMM-yyyy');

          this.service.NozzleListShift(shifttp,dt1,tDate)
          .subscribe(
          data => {
            this.nozzleListshift = data.obj;
            console.log(this.nozzleListshift);
          });



   this.NZHLineValidation=true;
  var arrline1 = this.ppShiftNozzleDetailList().length;
  var arrline = this.ppShiftNozzleDetailList();
  var lineDetArrlen=0;
  var x=arrline1-1
  if(arrline1>0) {

    var hedaerDet = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
    var hedaerDet1=hedaerDet.getRawValue();
    var nzName = hedaerDet1[x].nozzle;
   
     var lineDetArr = arrline.value[x].ppShiftNozleLinesList;
      lineDetArrlen = arrline.value[x].ppShiftNozleLinesList.length;
      var y=lineDetArrlen-1;
      this.nozHeaderLineValidation(x);

      // alert ("Nozzle Line Count : "+arrline1)
      // alert ("Nozzle LineDetails Count : "+lineDetArrlen)

      // if(lineDetArrlen>0) {this.validateNozzleSublineData(x,y)} 
      // else { alert ("Srl No:"+arrline1+" Nozzle: "+ nzName +" : Line details not added...");this.NZLlineValidation=false;return;};

      // alert ("Nozzle NZLlineValidation : "+this.NZLlineValidation)

  //     if(this.NZLlineValidation===true) { alert ("Srl No:"+arrline1+" Nozzle:"+nzName +" Line :"+(y+1) + " Validated...ok")}
  //      else {alert ("Srl No:"+arrline1+" Nozzle:" +nzName +" : Line :"+(y+1) + " Incomplete...Add new Nozzle not possible");return;}
  // }
  }

   // ====================================================
   if(this.NZHLineValidation) {
  this.ppShiftNozzleDetailList().push(this.newEmployee());
  this.displaylineSubDetadd[this.ppShiftNozzleDetailList().length-1]=true;
  this.displaylineDetUpdate[this.ppShiftNozzleDetailList().length-1]=true;
  this.displayRemovelineDet[this.ppShiftNozzleDetailList().length-1]=true;
  this.displaysegment[this.ppShiftNozzleDetailList().length-1]=true;
   }
}



removeEmployee(empIndex: number) {
  this.ppShiftNozzleDetailList().removeAt(empIndex);
  this.headerLineCalculation(0,0);
}

employeeSkills(empIndex: number): FormArray {
  return this.ppShiftNozzleDetailList()
    .at(empIndex)
    .get('ppShiftNozleLinesList') as FormArray;
}

newSkill(): FormGroup {
  return this.fb.group({
   
    NozzlidId :[''],
    shiftnozzlelinesid:[],
    shiftnozzleid:[],
    nozzle:[],
    shiftentryid:[],
    nozzleid:[''],
    itemid:[],
    locator:[],
    locatorid:[],
    segment:[],
    nozzleDetLineNo:[],
    qty:[],
    rate:[0],
    redingAvailQty:[0],
    selectedLine:[],
    saletypeid:[],
    customerid:[],
    custName:[],
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



validateShiftDate(shftDate) {
  var currDate = new Date();
  var shDate = new Date(shftDate);
  if (shDate > currDate) {
    alert("SHIFT ENTRY DATE :" + "Should not be above Today's Date");
    this.shiftentrydate = this.pipe.transform(this.now, 'y-MM-dd');
  }

}

checkHeaderValidations()  {
  const formValue: IPumpShiftSale = this.pumpShiftSalesForm.value

  if (formValue.shiftentrydate===undefined || formValue.shiftentrydate===null )
  {
     this.headerValidation=false;
     alert ("Header Details : SHIFT DATE Should not be null....");
      return;
   }

  if (formValue.shifttype===undefined || formValue.shifttype===null )
  {
     this.headerValidation=false;
     alert ("Header Details : SHIFT TYPE Should not be null....");
      return;
   }

   if (formValue.employeeid===undefined || formValue.employeeid===null )
   {
      this.headerValidation=false;
      alert ("Header Details : SALES PERSON Should not be null....");
       return;
    }
      this.headerValidation=true;
}

ShiftHeaderCheck(){

  var fnlConfirm = this.pumpShiftSalesForm.get('finalconfirm').value;
  // alert ("header validation ---"+this.headerValidation +" fnlConfirm : " +fnlConfirm);
// if (fnlConfirm ===undefined || fnlConfirm===null || fnlConfirm==='') {}
if(fnlConfirm != 'YES') {
  this.NZLineDelButtonDisabled=false;
  this.NZHLineAddDetButtonDisabled=false;

if(this.headerValidation==false) {
  this.checkHeaderValidations();
  if (this.headerValidation ==false) {
   
    this.AddNozzleButtonDisabled=true;
    this.pumpShiftSalesForm.get('ppShiftNozzleDetailList').disable();
   }
   else { 
          
          this.pumpShiftSalesForm.get('shiftentrydate').disable();
          this.pumpShiftSalesForm.get('shifttypeName').disable();
          this.pumpShiftSalesForm.get('emplName').disable();
          this.AddNozzleButtonDisabled=false;
          this.pumpShiftSalesForm.get('ppShiftNozzleDetailList').enable();
  }} 
}  else { this.NZLineDelButtonDisabled=true;this.NZHLineAddDetButtonDisabled=true;}
}


validateNozzleSublineData(empIndex,i){
  // alert ("emp index ,skillindex :"+empIndex +","+ i);
  // var NZLLineArr1 = this.pumpShiftSalesForm.get('nozzleLineDtlsList').value;
  var NZLLineArr1 = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList').value
  var arrline = this.ppShiftNozzleDetailList();
  var lineDetArr = arrline.value[empIndex].ppShiftNozleLinesList;
          // totQty=totQty+lineDetArr[k].qty;

  // alert (lineDetArr[i].itemid+","+lineDetArr[i].rate+","+lineDetArr[i].payType+","+lineDetArr[i].customercode);

  var lineValue1=lineDetArr[i].itemid;
  var lineValue2=lineDetArr[i].rate;
  var lineValue3=lineDetArr[i].qty;
  var lineValue4=lineDetArr[i].lineAmt;
  var lineValue5=lineDetArr[i].payType;
  var lineValue6=lineDetArr[i].customerid;

   var j=i+1;

  if(lineValue1===undefined || lineValue1===null || lineValue1<1 ){
    alert("Line-"+j+ " ITEM CODE :  Should not be null value " +lineValue1);
    this.NZLlineValidation=false;
    return;
  }
  if(lineValue2===undefined || lineValue2===null || lineValue2<=0 ){
    alert("Line-"+j+ " RATE:  Invalid Input");
    this.NZLlineValidation=false;
    return;
  }
  if(lineValue3===undefined || lineValue3===null || lineValue3<=0 ){
    alert("Line-"+j+ " QTY : Invalid Input");
    this.NZLlineValidation=false;
    return;
  }

  if(lineValue4===undefined || lineValue4===null || lineValue4<=0 ){
    alert("Line-"+j+ " LINE AMT : Invalid Input");
    this.NZLlineValidation=false;
    return;
  }

  if(lineValue5===undefined || lineValue5===null || lineValue5==='' ){
    alert("Line-"+j+ " PAY TYPE : Invalid Input");
    this.NZLlineValidation=false;
    return;
  }

  if(lineValue6===undefined || lineValue6===null || lineValue6<=0 ){
    alert("Line-"+j+ " CUSTOMER CODE : Invalid Input");
    this.NZLlineValidation=false;
    return;
  }

  this.NZLlineValidation=true;
  // if(this.duplicateLineItem===true) {this.NZLlineValidation=false;}else{this.NZLlineValidation=true;}


}

nozHeaderLineValidation(empIndex){
  var hedaerDet = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
  var hedaerDet1=hedaerDet.getRawValue();
  var nozzleid = hedaerDet1[empIndex].nozzleid;
  var nozzCloseReadingManual =hedaerDet1[empIndex].manualclosingreading;
  var nozzTotSaleQty =hedaerDet1[empIndex].totalsalereading;

  // alert("Nozzle Id main :" +nozzleid);
  if(nozzleid <0 || nozzleid===null || nozzleid ===undefined)
  {
    this.NZHLineValidation=false;
    alert("Nozzle Not Selected.Pls Select Nozzle code and Continue...");return;
  }

  // alert("nozzCloseReadingManual: "+nozzCloseReadingManual);

  if(nozzCloseReadingManual<=0 || nozzCloseReadingManual===null || nozzCloseReadingManual===undefined)
  {
    this.NZHLineValidation=false;
    alert("[Close Qty(Manual)]: Please enter valid input..");return;
  }

  if(nozzTotSaleQty<0 || nozzTotSaleQty===null || nozzTotSaleQty===undefined)
  {
    this.NZHLineValidation=false;
    alert("[Total Qty]:Invalid Sale Qty.");return;
  }
  this.NZHLineValidation=true;

}

addEmployeeSkill(empIndex: number) {

  var hedaerDet = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
  var hedaerDet1=hedaerDet.getRawValue();
  var nozzleid = hedaerDet1[empIndex].nozzleid;
  var nozzCloseReadingManual =hedaerDet1[empIndex].manualclosingreading;
  var nozzTotSaleQty =hedaerDet1[empIndex].totalsalereading;

  // alert("Nozzle Id main :" +nozzleid);
  if(nozzleid <0 || nozzleid===null || nozzleid ===undefined)
  {
    alert("Nozzle Not Selected.Pls Select Nozzle code and Continue...");return;
  }

  // alert("nozzCloseReadingManual: "+nozzCloseReadingManual);

  if(nozzCloseReadingManual<=0 || nozzCloseReadingManual===null || nozzCloseReadingManual===undefined)
  {
    alert("[Close Qty(Manual)]: Please enter valid input..");return;
  }

  if(nozzTotSaleQty<0 || nozzTotSaleQty===null || nozzTotSaleQty===undefined)
  {
    alert("[Total Qty]:Invalid Sale Qty.");return;
  }

  this.ppShiftNozzleDetailList().controls[empIndex].get('nozzle').disable();
  // this.ppShiftNozzleDetailList().controls[empIndex].get('manualclosingreading').disable();


  this.displayRemoveSubLineDet[empIndex]=[];
  var subln=this.employeeSkills(empIndex).length;
  // alert (" Subarray lines :"+subln);

  this.NZLlineValidation=true;
  if(subln>0) { this.validateNozzleSublineData(empIndex,subln-1)  }

  if (this.NZLlineValidation) {

  this.employeeSkills(empIndex).push(this.newSkill());
  var hedaerDet = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
  var hedaerDet1=hedaerDet.getRawValue();
  var nozzFuelType = hedaerDet1[empIndex].nozzFuelType;
  var totAvlQty = (hedaerDet1[empIndex].manualclosingreading-hedaerDet1[empIndex].openingreading);
  var nozzleid = hedaerDet1[empIndex].nozzleid;
  var segmentList1 = this.nozzleList.find((nozzleList: any) => nozzleList.nozzleId == nozzleid);
  console.log(segmentList1);
  var len=this.employeeSkills(empIndex).length;
  // alert(len)
  this.employeeSkills(empIndex).controls[len-1].patchValue({createdby: sessionStorage.getItem('emplId'),
  creationdate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),lasstupdatedby:sessionStorage.getItem('emplId'),
 lastupdatedate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),  locid:sessionStorage.getItem('locId'),
  nozzleid:nozzleid,nozzle:segmentList1.nozzleCode,nozzleDetLineNo:1,segment:nozzFuelType});
  // ,segment:nozzFuelType
  // this.displayRemoveSubLineDet[len-1]=true;
  this.displayRemoveSubLineDet[empIndex][len-1]=true;
  // alert ("main Index ,sub Index :"+empIndex +","+(len-1));


// this.PumpService1.segmentListFn1(nozzFuelType)
// .subscribe(
//   data => {
//     this.segmentList = data;
//     console.log(this.segmentList);
//   });

  this.onSelectSegmentNew(empIndex,(len-1),nozzFuelType)

  // [{"SRL":1,"itemId":89902,"segment":"PP-PETROL","subInventoryId":191}]
  // alert ("itemId,segemnt,suninvid:"+this.segmentList[0].itemId +","+this.segmentList[0].segment+","+this.segmentList[0].subInventoryId)
 
 
    // alert(empIndex+'-----'+hedaerDet1.length);
    //   if (hedaerDet1[len-1].segment == null || hedaerDet1[len-1].segment == undefined){
    //     this.displayRemoveSubLineDet[len-1]=true;
    // }

} else { alert ("Incomplete line... Not possible to add lines below..");}
  
}



removeEmployeeSkill(empIndex: number, skillIndex: number) {
  this.employeeSkills(empIndex).removeAt(skillIndex);
  
}

onSubmit() {
  console.log(this.pumpShiftSalesForm.value);
}


onSelectEmplName(event){
  var emlName=event.target.value;
  // alert(emlName)
  var emplList = emlName.substr(emlName.indexOf('-') + 1, emlName.length);
  // emlName.indexOf
  console.log('------'+emplList+'------');
  var emplList1 = this.salesPersonList.find((salesPersonList:any)=>salesPersonList.fullName==emplList);
  
  console.log(emplList1);
  // alert(emplList1.emplId)
  this.pumpShiftSalesForm.patchValue({employeeid:emplList1.emplId})
  
}


addRowV(index) {
  var voucherContr1 = this.pumpShiftSalesForm.get('ppShiftVoucherList').value;
  var shiftvoucherno = voucherContr1[index].shiftvoucherno;
  var description = voucherContr1[index].description;
  var amount = voucherContr1[index].amount;
  if (shiftvoucherno===null && description==null && amount==0){
    alert('Please Enter Value And Then Add New Line.!');
    return;
  }
  if(this.duplicateLineItem ===false) {
  this.lineValidation=true;
  if (this.lineValidation) 
  { 
    this.voucherDetailsArray().push(this.voucherDetailsGroup());
    var patch = this.pumpShiftSalesForm.get('ppShiftVoucherList') as FormArray;
    var voucherContr = this.pumpShiftSalesForm.get('ppShiftVoucherList') as FormArray;
    var voucherControl = voucherContr.getRawValue();
    patch.controls[index+1].patchValue({ createdby: sessionStorage.getItem('emplId'),
    creationdate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),lasstupdatedby:sessionStorage.getItem('emplId'),
    lastupdatedate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),  locid:sessionStorage.getItem('locId')});
    this.displayVoucherRemove[index+1]=true;
    if (index>1){
    patch.controls[index+1].patchValue({ 
      shiftentryid:voucherControl[1].shiftentryid
    })
   }
  }
} 
  else {alert("Duplicate Line Item Found : Remove Duplicate line and Proceed..." + this.duplicateLineItem);
}
}

RemoveRowV(index) {
  if (index===0){}
  else { 
    this.voucherDetailsArray().removeAt(index);
    this.voucherLineAmt(index)
  }
}

pumpShiftSales(pumpShiftSalesForm:any) {  }


CheckForitemRepeat(mNzzId,index) {
  // alert ("Selected Nozzle Id :"+mNzzId+" ,Index :"+index);
  

   var arrayControlNew = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
    var arrayControl = arrayControlNew.getRawValue();
    // alert ("this.ppShiftNozzleDetailList.length--"+arrayControl.length);
  

    for (let i=0;i<arrayControl.length;i++){
{
  var x=arrayControl[i].nozzleid;
  // alert ("x="+x);
  if( i !=index && x===mNzzId) {
    alert("Nozzle Already Added .Check Line :"+(i+1));
    this.lineItemRepeated=true;

    // var patch = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
    // patch.controls[i].patchValue({nozzleid:null,nozzle:null});
    // patch.controls[i].patchValue({nozzFuelType: '',nozzIsland:'',segment:'',nozzrate:''});
    
    this.ppShiftNozzleDetailList().controls[index].get('nozzle').reset();

    break;
  } 
  }
}
}


onSelectedNozzle(i,event){
  var segment=event.target.value;
  var segmentList = segment.substr(segment.indexOf('-') + 1, segment.length);
  var  segcode =segment.substr(0, 4);

  // alert("segment.substr(segment.indexOf('-') + 1>>> "+ segment.substr(segment.indexOf('-')) + 1);
  // alert("segment,seglist,nozzleid:"+segment+","+segmentList+",---"+segcode);
  
  // alert(segmentList1.nozzleId);

  if(segment==='--Select--') {
   var patch = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
   patch.controls[i].patchValue({nozzleid:null});
   patch.controls[i].patchValue({nozzFuelType: '',nozzIsland:'',segment:'',nozzrate:'', openingreading:''});
  return;
    
  }


  // if(value==='--Select--') {
  //   this.employeeSkills(i).controls[k].patchValue({rate: null});
  //   this.employeeSkills(i).controls[0].patchValue({redingAvailQty: null});
  //   this.employeeSkills(i).controls[k].patchValue({locator: null});
  //   this.employeeSkills(i).controls[k].patchValue({qty: null});
  //   this.employeeSkills(i).controls[k].patchValue({lineAmt: null});
  //   this.employeeSkills(i).controls[k].get('qty').disable();
  //   this.employeeSkills(i).controls[k].get('lineAmt').disable();
  //   return;
  //  }

  var shiftCode = this.pumpShiftSalesForm.get('shifttypCode').value;
  var todate = this.now;

  // this.shiftentrydate =  this.pumpShiftSalesForm.get('shiftentrydate').value;
  // this.shiftentrydate  = this.pipe.transform(this.shiftentrydate , 'dd-MMM-yyyy');
 
    var shiftdt=this.pumpShiftSalesForm.get('shiftentrydate').value;
     shiftdt=this.pipe.transform(this.shiftentrydate , 'dd-MMM-yyyy');
  // alert(this.shiftentrydate )

  var days=1;
  ////new Date(this.now);
  if (shiftCode==='I'){
    // var startDt1 = new Date(this.shiftentrydate);
      var startDt1 = new Date(shiftdt);

    startDt1.setDate(startDt1.getDate() -1);
    var tDate = this.pipe.transform(startDt1, 'dd-MMM-yyyy');

  }
  else{
    // var tDate = this.pipe.transform(this.shiftentrydate, 'dd-MMM-yyyy');
    var tDate = this.pipe.transform(shiftdt, 'dd-MMM-yyyy');

  }

  // var segmentList1 = this.nozzleList.find((nozzleList: any) => nozzleList.nozzleCode == segmentList);
  var segmentList1 = this.nozzleList.find((nozzleList: any) => nozzleList.nozzleCode == segcode);

  console.log(segmentList1);

  this.CheckForitemRepeat(segmentList1.nozzleId,i)


  var patch = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
  patch.controls[i].patchValue({nozzleid:segmentList1.nozzleId,createdby: sessionStorage.getItem('emplId'),
  creationdate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),lasstupdatedby:sessionStorage.getItem('emplId'),
  lastupdatedate:this.pipe.transform(this.now, 'yyyy-MM-dd hh:mm:ss'),  locid:sessionStorage.getItem('locId')});
 
  this.service.NozzleIslandPick(segmentList1.nozzleId)
  .subscribe(
    data => {
      this.IslandDetails = data;
      (patch.controls[i]).patchValue({
        nozzFuelType: data.description,
        nozzIsland: data.islandCode,
        segment: data.description,
        nozzrate:data.rate
      })
    });
    // this.service.nozzleBalaCheck(segmentList,shiftCode,tDate)
    this.service.nozzleBalaCheck(segcode,shiftCode,tDate)
    .subscribe(
      data => {
        this.IslandDetails = data;
        alert(data.message);
        (patch.controls[i]).patchValue({
          openingreading: data.obj.opRead,
          systemclosingreading: data.obj.clRead
        });
        if (data.message.includes('Previous Shift Not Final Confimred')){
          this.closeResetButton = false;
          this.progress = 0;
          this.dataDisplay = data.message;
          this.isVisibleShiftPretolSave=false;
         return;
        }
        else if (data.message.includes('Already Shift Entry Done for this Nozzle')){
          this.closeResetButton = false;
          this.progress = 0;
          this.dataDisplay = data.message;
          this.isVisibleShiftPretolSave=false;
        }
        else{
          this.isVisibleShiftPretolSave=true;
        }
      });
}

calculationFn(i){
  var arrayControlNew = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
    var arrayControl = arrayControlNew.getRawValue();
    var openQtySys = arrayControl[i].openingreading;
    var closeQtyMan = arrayControl[i].manualclosingreading;
    var rate = arrayControl[i].nozzrate;
    var totalsalereading = arrayControl[i].totalsalereading;
    // alert(totalsalereading)
    var SystemClosingReading = arrayControl[i].systemclosingreading;
    if (openQtySys === null || openQtySys === undefined || openQtySys === '') {
      return;
    }
    if (openQtySys <= 0) {
      alert("Please enter quantity more than zero");
      return;
    }


    var totaQty = Math.round(((closeQtyMan-openQtySys) + Number.EPSILON) * 100) / 100;
    var diffQty= Math.round(((closeQtyMan-SystemClosingReading) + Number.EPSILON) * 100) / 100;
    var totaRate = Math.round(((closeQtyMan-openQtySys)*rate + Number.EPSILON) * 100) / 100;
    var patch = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
    patch.controls[i].patchValue({ totalsalereading: totaQty,difference:diffQty,totalrate:totaRate });
    this.headerLineCalculation(i,totaRate)
  }


  headerLineCalculation(i,totaRate){
    var totRate =0;
    var totQty=0;
    var arrayControlNew = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
    var arrayControl = arrayControlNew.getRawValue();
    for (let l=0;l<arrayControl.length;l++){
      totRate=totRate+arrayControl[l].totalrate;
      totQty=totQty+arrayControl[l].totalsalereading;
    }
    
    this.pumpShiftSalesForm.patchValue({totalCalculation:totRate,totalQty:totQty})
  }


  onSelectSegment(i,k,event){
  
   
     var seg = event.target.value;
     this.Nzd_enableQtyAmtFld=false;
    var value = seg.substr(seg.indexOf(':') + 1, seg.length).trim();

        //  alert ("i,k,seg,value :"+i+","+k+","+seg +","+value);

         if(value==='--Select--') {
          this.employeeSkills(i).controls[k].patchValue({rate: null});
          this.employeeSkills(i).controls[0].patchValue({redingAvailQty: null});
          this.employeeSkills(i).controls[k].patchValue({locator: null});
          this.employeeSkills(i).controls[k].patchValue({qty: null});
          this.employeeSkills(i).controls[k].patchValue({lineAmt: null});
          this.employeeSkills(i).controls[k].get('qty').disable();
          this.employeeSkills(i).controls[k].get('lineAmt').disable();
          return;
         }

         console.log(this.segmentList);
         var selectitemList = this.segmentList.find((segList)=>segList.segment===value);
         console.log(selectitemList);

        //  alert ("ItemId :"+selectitemList.itemId);
    

         if(selectitemList.itemId>0) {
          this.employeeSkills(i).controls[k].get('qty').enable();
          this.employeeSkills(i).controls[k].get('lineAmt').enable();
         } else {
          this.employeeSkills(i).controls[k].get('qty').disable();
          this.employeeSkills(i).controls[k].get('lineAmt').disable();

         }
      
            this.employeeSkills(i).controls[k].patchValue({itemid: selectitemList.itemId});
       
            this.PumpService1.locatorFn(sessionStorage.getItem('locId'),selectitemList.itemId,selectitemList.subInventoryId)
            .subscribe(
              data => {
                console.log(data);
              
                this.employeeSkills(i).controls[k].patchValue({locator: data[0].segmentName,locatorid:data[0].locatorid});
              });
          var priceListName = 'Petrol Pump 12PU.2501';
              this.PumpService1.priceListFn(priceListName,selectitemList.itemId)
              .subscribe(
                data => {
                  console.log(data);
               
                  this.employeeSkills(i).controls[k].patchValue({rate: data[0].priceValue});
                })
                var patch = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList').value;
               
                var len = (this.employeeSkills(i).controls.length-1);
                var totreadingQty =  Math.round(((patch[i].manualclosingreading-patch[i].openingreading) + Number.EPSILON) * 100) / 100;
                if (patch[i].nozzFuelType===value){
                  this.employeeSkills(i).controls[0].patchValue({redingAvailQty: totreadingQty});
                }
                if (patch[i].nozzFuelType===value){
                  if (len >0){
                    var arrline = this.ppShiftNozzleDetailList();
                    var lineDetArr = arrline.value[i].ppShiftNozleLinesList;
                    var lastLineReadQty =  Math.round(((lineDetArr[len-1].redingAvailQty)-Number(lineDetArr[len-1].qty) + Number.EPSILON) * 100) / 100;
                    // Number(lineDetArr[len-1].redingAvailQty)-Number(lineDetArr[len-1].qty);
                    this.employeeSkills(i).controls[k].patchValue({redingAvailQty:lastLineReadQty});
                  }
                }
                var totQty =0;
                if (this.pumpShiftSalesForm.get('shipEntrySt').value==='Search'){
                  if (patch[i].nozzFuelType===value){
                    var lineDetArr = arrline.value[i].ppShiftNozleLinesList;
                    for (let k=0;k<lineDetArr.length;k++){
                      totQty=totQty+lineDetArr[k].qty;
                    }
                    var lastLineReadQty =   Math.round(((patch[i].manualclosingreading-patch[i].openingreading)-Number(totQty) + Number.EPSILON) * 100) / 100;
                    // (patch[i].manualclosingreading-patch[i].openingreading)-Number(totQty);
                    this.employeeSkills(i).controls[k].patchValue({redingAvailQty:lastLineReadQty});
                  }
                }
 }

 
 onSelectSegmentNew(i,k,x){
     
  // var seg = event.target.value;
  this.Nzd_enableQtyAmtFld=false;
  // var value = seg.substr(seg.indexOf(':') + 1, seg.length).trim();
  var value =x
      // alert ("i,k,value :"+i+","+k+","+value);

        var segmentItemId;
        var segmentName;
        var segInvItmId;
      
      this.PumpService1.segmentListFn1(value)
      .subscribe(
        data => {
          this.segmentList = data[0];
          segmentItemId=data[0].itemId;
          segmentName=data[0].segment;
          segInvItmId=data[0].subInventoryId;

          console.log(this.segmentList);

           
         this.employeeSkills(i).controls[k].patchValue({itemid: data[0].itemId});
    
         this.PumpService1.locatorFn(sessionStorage.getItem('locId'),data[0].itemId,segInvItmId)
         .subscribe(
           data => {
             console.log(data);
           
             this.employeeSkills(i).controls[k].patchValue({locator: data[0].segmentName,locatorid:data[0].locatorid});
           });
       var priceListName = 'Petrol Pump 12PU.2501';
           this.PumpService1.priceListFn(priceListName,segmentItemId)
           .subscribe(
             data => {
               console.log(data);
            
               this.employeeSkills(i).controls[k].patchValue({rate: data[0].priceValue});
             })
             var patch = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList').value;
            //  var patch=patch1.getRawValue();

            //  var hedaerDet = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;

            //  alert ("patch[i].manualclosingreading >>"+patch[i].manualclosingreading);
            //  alert ("patch[i].openingreading >>"+patch[i].openingreading);

             var len = (this.employeeSkills(i).controls.length-1);
             var totreadingQty =  Math.round(((patch[i].manualclosingreading-patch[i].openingreading) + Number.EPSILON) * 100) / 100;
            //  alert ("totradqty ="+totreadingQty);
             if (patch[i].nozzFuelType===value){
               this.employeeSkills(i).controls[0].patchValue({redingAvailQty: totreadingQty});
             }
             if (patch[i].nozzFuelType===value){
               if (len >0){
                 var arrline = this.ppShiftNozzleDetailList();
                 var lineDetArr = arrline.value[i].ppShiftNozleLinesList;
                 var lastLineReadQty =  Math.round(((lineDetArr[len-1].redingAvailQty)-Number(lineDetArr[len-1].qty) + Number.EPSILON) * 100) / 100;
                 // Number(lineDetArr[len-1].redingAvailQty)-Number(lineDetArr[len-1].qty);
                 this.employeeSkills(i).controls[k].patchValue({redingAvailQty:lastLineReadQty});
               }
             }
             var totQty =0;
             if (this.pumpShiftSalesForm.get('shipEntrySt').value==='Search'){
               if (patch[i].nozzFuelType===value){
                 var lineDetArr = arrline.value[i].ppShiftNozleLinesList;
                 for (let k=0;k<lineDetArr.length;k++){
                   totQty=totQty+lineDetArr[k].qty;
                 }
                 var lastLineReadQty =   Math.round(((patch[i].manualclosingreading-patch[i].openingreading)-Number(totQty) + Number.EPSILON) * 100) / 100;
                 // (patch[i].manualclosingreading-patch[i].openingreading)-Number(totQty);
                 this.employeeSkills(i).controls[k].patchValue({redingAvailQty:lastLineReadQty});
               }  }
            });
}



 readingQtyFn(i,k){
  
  var arrline = this.ppShiftNozzleDetailList();
  var totReadValue =0;
  for (let i=0;i<arrline.length;i++){
    var lineDetArr = arrline.value[i].ppShiftNozleLinesList;
    for (let l=0;l<lineDetArr.length;l++){
      totReadValue =   Math.round(((Number(lineDetArr[l].redingAvailQty)-Number(lineDetArr[l].qty)) + Number.EPSILON) * 100) / 100;
      //  Number(lineDetArr[l].redingAvailQty)-Number(lineDetArr[l].qty);     
      this.employeeSkills(i).controls[k].patchValue({redingAvailQty:totReadValue});
    }     
  }

  
 }


 lineCalculationFn(index,k){

  var arr1= this.employeeSkills(index);
  console.log(arr1);
  var len =this.employeeSkills(index).length;
  var rate1=arr1.value[k].rate;
  var balQty =arr1.value[k].redingAvailQty

  if (rate1<=0|| rate1 ===null)  { alert ("Please Check RATE column"); return;}
  // redingAvailQty
      
   var qty=arr1.value[k].qty;

   if(qty>balQty) { 
    alert ("Qty Entered is more than available Qty ...Please Enter valid Qty");
    this.employeeSkills(index).controls[k].patchValue({qty: ''});
    this.employeeSkills(index).controls[k].patchValue({lineAmt: ''});
     return;
    }

   var totAmt = qty*rate1;
   var  totAmt1 = Math.round(((totAmt) + Number.EPSILON) * 100) / 100;
    this.employeeSkills(index).controls[k].patchValue({lineAmt: totAmt1});
    var payType = null;
    this.addlineCalculation(index,k,payType)
    
}


lineCalculationFnAmt(index,k){

  var arr1= this.employeeSkills(index);
  console.log(arr1);
  var len =this.employeeSkills(index).length;
  var rate1=arr1.value[k].rate;
  var balQty =arr1.value[k].redingAvailQty

  if (rate1<=0|| rate1 ===null)  { alert ("Please Check RATE column"); return;}

  var totAmt = arr1.value[k].lineAmt;
  var qty=totAmt/rate1;
  if(qty>balQty) { 

    alert ("Amount Entered is not matching with available Qty ...Please Enter valid Amount");
    this.employeeSkills(index).controls[k].patchValue({qty: ''});
    this.employeeSkills(index).controls[k].patchValue({lineAmt: ''});
     return;
    }

  var  qty1 = Math.round(((qty) + Number.EPSILON) * 100) / 100;
  this.employeeSkills(index).controls[k].patchValue({qty: qty1});
  var payType = null;
  this.addlineCalculation(index,k,payType)
  

}




addlineCalculation(index,k,event){
  var arrline = this.ppShiftNozzleDetailList();
  var arrline1 = this.ppShiftNozzleDetailList().length;
  console.log(arrline);
  var cashlineAmt = 0;
  var totalSaleAmt =0;
  var totalCreditAmt=0;
  var otherSaleAmt=0;
  var len =this.employeeSkills(index).length;
  var totalExpenceAmt= this.pumpShiftSalesForm.get('totalexpenses').value;
  for (let i=0;i<arrline.length;i++){
    var lineDetArr = arrline.value[i].ppShiftNozleLinesList;
    for (let l=0;l<lineDetArr.length;l++){
    
      if (lineDetArr[l].payType === 'CASH' ) {
      if (lineDetArr[l].lineAmt == undefined || lineDetArr[l].lineAmt == null || lineDetArr[l].lineAmt == '') {
      } else {
        cashlineAmt = cashlineAmt + Number(lineDetArr[l].lineAmt);
      }
     }
    if (lineDetArr[l].payType === 'CREDIT CARD' ) {
      if (lineDetArr[l].lineAmt == undefined || lineDetArr[l].lineAmt == null || lineDetArr[l].lineAmt == '') {
      } else {
        totalCreditAmt = totalCreditAmt + Number(lineDetArr[l].lineAmt);
      }
    }


if (lineDetArr[l].payType === 'CHEQUE' || lineDetArr[l].payType === 'CHEQUE' ||
lineDetArr[l].payType === 'CONTROL ACCOUNT' || lineDetArr[l].payType === 'DEBIT CARD' || 
lineDetArr[l].payType === 'OLD PENDING' || lineDetArr[l].payType === 'OTHER' ||
lineDetArr[l].payType === 'RTGS/NEFT'||lineDetArr[l].payType === 'WALLET' ) {
  if (lineDetArr[l].lineAmt == undefined || lineDetArr[l].lineAmt == null || lineDetArr[l].lineAmt == '') {
  }else {
    otherSaleAmt = otherSaleAmt + Number(lineDetArr[l].lineAmt);
  }
}
}
}
cashlineAmt = Math.round(((cashlineAmt) + Number.EPSILON) * 100) / 100;
otherSaleAmt = Math.round(((otherSaleAmt) + Number.EPSILON) * 100) / 100;
totalCreditAmt = Math.round(((totalCreditAmt) + Number.EPSILON) * 100) / 100;
totalSaleAmt= Math.round(((cashlineAmt+otherSaleAmt+totalCreditAmt) + Number.EPSILON) * 100) / 100;
var totalExpenAmt = Math.round(((cashlineAmt-totalExpenceAmt) + Number.EPSILON) * 100) / 100;
this.pumpShiftSalesForm.patchValue({ 'totalcashsale': cashlineAmt,'totalsale':totalSaleAmt,'totalcreditsale':totalCreditAmt,
'totalothersale': otherSaleAmt});
var paymentType = arrline.value[index].ppShiftNozleLinesList[k].payType;
if (event !=null){
var payType=event.target.value;
var payType1= payType.substr(payType.indexOf(':') + 1, payType.length).trim();
console.log(this.PaymentModeList);
var payTypeList = this.PaymentModeList.find((payTyList)=>payTyList.lookupValue===payType1);
console.log(payTypeList);
this.employeeSkills(index).controls[k].patchValue({saletypeid:payTypeList.lookupValueId});
if (payType1==='CASH'){
  this.employeeSkills(index).controls[k].patchValue({customercode:79820,custName:'CASH CUSTOMER',customerid:73620});
  this.employeeSkills(index).controls[k].get('customercode').disable();
  this.addEmployeeSkill(index)
}
if (payType1==='PUMP TESTING'){
  this.employeeSkills(index).controls[k].patchValue({customercode:79869,custName:'PUMP TESTING',customerid:73680});
  this.employeeSkills(index).controls[k].get('customercode').disable();
  this.addEmployeeSkill(index);
}
}
}


voucherLineAmt(i){
  var totalVoucherAmt = 0;
  var totalSalesAmt = 0;
  var arrline=this.voucherDetailsArray()
  for (let  i=0;i<arrline.length;i++){
      if (arrline.value[i].amount == undefined || arrline.value[i].amount == null || arrline.value[i].amount == '') {
      } else {
        totalVoucherAmt = totalVoucherAmt + Number(arrline.value[i].amount);
      }
}
totalVoucherAmt = Math.round(((totalVoucherAmt) + Number.EPSILON) * 100) / 100;
var totCashSaleAmt = this.pumpShiftSalesForm.get('totalcashsale').value;
totalSalesAmt = Math.round(((totCashSaleAmt-totalVoucherAmt) + Number.EPSILON) * 100) / 100;
this.pumpShiftSalesForm.patchValue({ 'totalexpenses': totalVoucherAmt});
}

refresh() {
  window.location.reload();
}
close() {
  this.router.navigate(['admin']);
}

validation(){
  var shiftentrydate1= this.pumpShiftSalesForm.get('shiftentrydate').value;
  var shifttypeName= this.pumpShiftSalesForm.get('shifttypeName').value;
  var emplName= this.pumpShiftSalesForm.get('emplName').value;

  if (shiftentrydate1===undefined || shiftentrydate1===null){
    alert('Please Select Shift Entry Date.!');
    // this.dataDisplay = 'Please Select Shift Type Name.!';
    this.isVisibleShiftPretolSave=true;
    this.headerValidation=false;
    return;
  }

  if (shifttypeName===undefined || shifttypeName===null||shifttypeName===''){
    alert('Please Select Shift Type Name.!');
    // this.dataDisplay = 'Please Select Shift Type Name.!';
    this.isVisibleShiftPretolSave=true;
    this.headerValidation=false;

    return;
  }
  if (emplName===undefined || emplName===null||emplName===''){
    alert('Please Select Employee Name.!');
    // this.dataDisplay = 'Please Select Shift Type Name.!';
    this.isVisibleShiftPretolSave=true;
    this.headerValidation=false;

    return;
  }
  this.headerValidation=true;
  
}


saveSale1(){
  this.isVisibleShiftPretolSave=false;
  let jsonData = this.pumpShiftSalesForm.getRawValue();
  // this.closeResetButton = false;
    this.progress = 0;
    this.validation();
    if (this.headerValidation===false) { alert("Header Validation Failed...Save Error ");return;}
      
    this.dataDisplay = 'Data Saving is progress....Do not refresh the Page';

    this.PumpService1.savePetrolPump(JSON.stringify(jsonData)).subscribe((res: any) => {
    if (res.code === 200) {
      this.pumpShiftSalesForm.patchValue({shiftentryno:res.obj.shiftentryno,shiftentrydate:res.obj.creationdate});
      alert(res.message);
      this.dataDisplay = ''
      this.closeResetButton = true;
      this.isVisibleShiftPretolSave=false;
    }
    else{
      alert(res.message);
      this.dataDisplay = ''
      this.closeResetButton = false;
      this.isVisibleShiftPretolSave=true;
    }
  })

}

CustAccountNoSearch(i,k,event){
  var accountNo=event.target.value;
  this.service.custAccountNoSearch(accountNo, sessionStorage.getItem('ouId'), sessionStorage.getItem('divisionId'))
  .subscribe(
    data => {
      if (data.obj.length !=0){
      this.accountNoSearch = data.obj;
      var patch = this.pumpShiftSalesForm.get('ppShiftNozleLinesList') as FormArray;
    
      var ln= this.employeeSkills(i).length;
      this.employeeSkills(i).controls[ln-1].patchValue({customerid: data.obj[0].customerId ,custName: data.obj[0].custName,customercode:data.obj[0].accountNo})
      this.addEmployeeSkill(i)
    }
    else{
      alert('Data Not Found.!')
    }
   
    }
  )

}

updatePumpDet(){
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Data Saving is progress....Do not refresh the Page';
  this.isVisibleShiftPretolUpdate=false;
  let jsonData = this.pumpShiftSalesForm.getRawValue();
  this.PumpService1.updatePumDet(JSON.stringify(jsonData)).subscribe((res: any) => {
    if (res.code === 200) {
      alert(res.message);
      this.closeResetButton = true;
      this.progress = 0;
      this.dataDisplay = res.message;
      this.isVisibleShiftPretolUpdate=false;
    }
    else{
      alert(res.message)
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = res.message;
      this.isVisibleShiftPretolUpdate=true;
    }
  })


} 


shipFinalConfirm(){
  this.closeResetButton = false;
  this.progress = 0;
  this.dataDisplay = 'Data Saving is progress....Do not refresh the Page';
  let jsonData = this.pumpShiftSalesForm.getRawValue();
  this.PumpService1.shipFinalConfirmFn(JSON.stringify(jsonData)).subscribe((res: any) => {
    if (res.code === 200) {
      alert(res.message);
      this.isVisibleShiftPretolSave=false;
      this.isVisibleShiftPretolUpdate=false;
      this.pumpShiftSalesForm.disable();
      this.newEmployee().disable();
      this.voucherDetailsArray().disable();
      this.search(res.obj.shiftentryno);
      // this.employeeSkills().disable();
    }
    else{
      alert(res.message)
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = res.message;
    }
  })
}



custNameSearch(index,k) {
 
  var arrline = this.ppShiftNozzleDetailList();
  var lineDetArr = arrline.value[index].ppShiftNozleLinesList;
  var custName=lineDetArr[k].custName;
 
  this.orderManagementService.custNameSearchFn1(custName, sessionStorage.getItem('divisionId'))
    .subscribe(
      data => {
        if (data.code === 200) {
          this.customerNameSearch = data.obj;
        }
        else {
          if (data.code === 400) {
            alert(data.message);
            this.display = 'block';
          }
        }
      }
    );
}

selectAccountNo(index,k,accNo,custId,custName){
  var ln = this.employeeSkills(index).length;
  this.employeeSkills(index).controls[ln-1].patchValue({customercode:accNo,customerid:custId,custName:custName});
  this.addEmployeeSkill(index)
  
}

cashSubmiAmt(){
  var totalcashsale = this.pumpShiftSalesForm.get('totalcashsale').value;
  var cashsubmitted = this.pumpShiftSalesForm.get('cashsubmitted').value;
  var totExp=this.pumpShiftSalesForm.get('totalexpenses').value;
  var cashDiff = Math.round(((totalcashsale-(cashsubmitted+totExp)) + Number.EPSILON) * 100) / 100;
  this.pumpShiftSalesForm.patchValue({cashdifference:cashDiff})
}


getUserIdsFirstWay($event) {
  let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
  this.userList1 = [];

  // if (userId.length > 2) {
  //   if ($event.timeStamp - this.lastkeydown1 > 200) {
  //     this.userList1 = this.searchFromArray(this.salesPersonList, userId);
  //   }
  // }
}


searchFromArray(arr, regex) {
  let matches = [], i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i].match(regex)) {
      matches.push(arr[i]);
    }
  }
  return matches;
};

}
