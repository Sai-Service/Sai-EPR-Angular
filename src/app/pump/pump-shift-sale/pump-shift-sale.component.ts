
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { PumpService } from 'src/app/pump/pump.service';


interface IPumpShiftSale{

  ShiftEntryId:number;
  ShiftEntryNo :number;
  ShiftEntryDate:Date;
  ShiftType:number;
  employeeId:number;

  shiftCode :string;
  nozzleid :number;
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
  selector: 'app-pump-shift-sale',
  templateUrl: './pump-shift-sale.component.html',
  styleUrls: ['./pump-shift-sale.component.css']
})
export class PumpShiftSaleComponent implements OnInit {
  pumpShiftSalesForm: FormGroup;
  pipe = new DatePipe('en-US');
  now = new Date();
  ShiftEntryDate = this.pipe.transform(this.now, 'dd-MM-yyyy')
  ShiftEntryId:number;
  ShiftEntryNo :number;
  ShiftType:number;
  employeeId:number;

  loginName:string;
  loginArray:string;
  name:string;
  ouName : string;
  locId: number;
  locName : string;
  orgId:number;
  ouId :number;
  deptId:number;
  emplId :number;
  // public emplId =6;

  public shiftList :any[];
  public salesPersonList :any[];
  public nozzleList :any[];
  IslandDetails:any;
  shiftCode :string;
  nozzleid :number;
  islandCode:string;
  openMRS:number;
  closeMRS:number;
  closeMRM:number;
  diffValue:Number;

  lstcomments: any;

  totalSale :number;
  totalCashSale:number;
  totalCreditSale:number;
  totalotherSale:number;
  totalexpenses:number;
  CashSubmitted:number;
  CashDifference:number;


  userList2: any[] = [];
  lastkeydown1: number = 0;
  showItemSearch=false;
  segmentList:any=[];

  

  //////////////////////////////////
  headerValidation=false;
  lineValidation=false;
  duplicateLineItem=false;
  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display1=true;
  display = true;
  displayButton = true;
  PaymentModeList: any;
  accountNoSearch:any=[];
  
  constructor(private service: MasterService,private   fb: FormBuilder, private router: Router,private PumpService1: PumpService) {
    this.pumpShiftSalesForm = fb.group({

      loginArray:[''],
      loginName:[''],
      ouName :[''],
      locId:[''],
      locName :[''],
      ouId :[],
      deptId :[],
      emplId:[''],
      orgId:[''],

      ShiftEntryId:[],
      ShiftEntryNo :[],
      ShiftEntryDate:[],
      ShiftType:[],
      employeeId:[],
      shiftCode:[],
      nozzleid:[],
      totalSale :[],
      totalCashSale:[],
      totalCreditSale:[],
      totalotherSale:[],
      totalexpenses:[],
      CashSubmitted:[],
      CashDifference:[],

      ppShiftNozzleDetailList: this.fb.array([this.lineDetailsGroup()]),
      
      ppShiftVoucherList: this.fb.array([this.voucherDetailsGroup()]),


    });
  }
  lineDetailsGroup() {
    return this.fb.group({
      ShiftEntryId:[''],
      nozzleid :[''],
      NozzlidId:[],
      nozzFuelType:[''],
      nozzIsland :[''],
      OpeningReading:[0],
      SystemClosingReading:[0],
      ManualClosingReading:[0],
      TotalSaleReading:[0],
      Difference:[0],
      locId:[],
      Remarks:[],
      locid:[],
      ppShiftNozleLinesList: this.fb.array([]),
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
      payType:[]
     });
  }

  voucherDetailsGroup() {
    return this.fb.group({
      shiftvoucherid:[],
      shiftentryid:[],
      shiftvoucherno:[],
      locid:[],
      description:[],
      amount:[],
     });
  }

 



 lineDetailsArray() :FormArray{
    return <FormArray>this.pumpShiftSalesForm .get('ppShiftNozzleDetailList')
  }

  nozzlelineDetailsArray(i:number) :FormArray{
    // return <FormArray>this.lineDetailsArray().at(i).get('ppShiftNozleLinesList') as FormArray;
    return this.lineDetailsArray().at(i).get("ppShiftNozleLinesList") as FormArray
  }

  voucherDetailsArray() :FormArray{
    return <FormArray>this.pumpShiftSalesForm .get('ppShiftVoucherList')
  }
 


  get f() { return this.pumpShiftSalesForm.controls; }

  pumpShiftSales(pumpShiftSalesForm:any) {  }



  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
    this.loginName=sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    // this.locName=(sessionStorage.getItem('locName'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    // this.emplId= Number(sessionStorage.getItem('emplId'));
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);


 
this.service.ShiftList().subscribe(
  data => {
    this.shiftList = data;
    console.log(this.shiftList);
  }
);

this.service.PaymentModeList()
.subscribe(
  data => {
    this.PaymentModeList = data;
    console.log(this.PaymentModeList);
  }
);

this.service.PPEmplIdList(2501,3)
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

  this.PumpService1.segmentListFn()
.subscribe(
  data => {
    this.segmentList = data;
    console.log(this.segmentList);
  });

  

  }

  search(shiftno){
    alert ("Shift no:"+shiftno);
    
  }


 

  
  saveSale1(){
    let jsonData = this.pumpShiftSalesForm.getRawValue();
    this.PumpService1.savePetrolPump(JSON.stringify(jsonData)).subscribe((res: any) => {
      if (res.code === 200) {}
    })
  }

  closeSale(){}

  resetSale(){}

  onSelectedNozzle(index){
    alert(index)
    var patch = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
    var qtyLineArr = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList').value;
    var nozId =qtyLineArr[index].NozzlidId
    alert ("nozzle id :"+ nozId + " index : "+index);

    this.service.NozzleIslandPick(nozId)
    .subscribe(
      data => {
        this.IslandDetails = data
        console.log(this.IslandDetails);
        alert( this.IslandDetails.islandCode);
        (patch.controls[index]).patchValue({
          nozzFuelType: data.description,
          nozzIsland: data.islandCode,
        })
      });
     
      // (patch.controls[index]).patchValue({ nozzIsland: this.IslandDetails.islandCode +"-"+this.IslandDetails.description});
      // this.pumpShiftSalesForm.patchValue(this.IslandDetails);
 
  }

  addRow(index) {

    // alert("Addrow duplicate item status :"+this.duplicateLineItem);
    if(this.duplicateLineItem ===false) {
  
    // this.CheckLineValidations(index);
    this.lineValidation=true;
    if (this.lineValidation)
      {
  
          this.lineDetailsArray().push(this.lineDetailsGroup());
  
      }
    } else {alert("Duplicate Line Item Found : Remove Duplicate line and Proceed..." + this.duplicateLineItem);
  }
  }
  
  
  
  RemoveRow(index) {
    if (index===0){
  
    }
    else {
      this.lineDetailsArray().removeAt(index);
    }
  
  }

  addRowV(index) {

    // alert("Addrow duplicate item status :"+this.duplicateLineItem);
    if(this.duplicateLineItem ===false) {
  
    // this.CheckLineValidations(index);
    this.lineValidation=true;
    if (this.lineValidation)
      {
  
          this.voucherDetailsArray().push(this.voucherDetailsGroup());
  
      }
    } else {alert("Duplicate Line Item Found : Remove Duplicate line and Proceed..." + this.duplicateLineItem);
  }
  }
  
  
  
  RemoveRowV(index) {
    if (index===0){
  
    }
    else {
      this.voucherDetailsArray().removeAt(index);
    }
  
  }

  calculationFn(i){
    // alert(i);
    // debugger;
    var arrayControlNew = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
      var arrayControl = arrayControlNew.getRawValue();
      var openQtySys = arrayControl[i].OpeningReading;
      var closeQtyMan = arrayControl[i].ManualClosingReading;
      var SystemClosingReading = arrayControl[i].SystemClosingReading;
      // alert(pricingQty)
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
    patch.controls[i].patchValue({ TotalSaleReading: totaQty,Difference:diffQty });
  }

  public mapProducts = new Map<string, any[]>();
  openSunDetailsFn(i){
    // alert(i)
    console.log(this.nozzleList);
    
    var arrayControlNew = this.pumpShiftSalesForm.get('ppShiftNozzleDetailList') as FormArray;
    var arrayControl = arrayControlNew.getRawValue();
    var nozId= arrayControl[i].NozzlidId;
    // alert(nozId);
    var selectNozzle = this.nozzleList.find((nozList)=>nozList.nozzleId=nozId);
    console.log(selectNozzle);
        this.nozzlelineDetailsArray(i).push(this.nozzlelineDetailsGroup());
    this.nozzlelineDetailsArray(i).controls[i].patchValue({nozzle: selectNozzle.nozzleCode});
    console.log(this.pumpShiftSalesForm.controls.ppShiftNozleLinesList);
    const courseControl = this.pumpShiftSalesForm.get('ppShiftNozleLinesList') as FormArray;
    const course = courseControl.at(i).get('segment').value;
    console.log(course);
    const products = this.mapProducts.get(course);
    alert(products)
    console.log(products);
  }


  onSelectSegment(i,event){
   
var seg = event.target.value;
    var value = seg.substr(seg.indexOf(':') + 1, seg.length).trim();
    var selectitemList = this.segmentList.find((segList)=>segList.segment=value);
    console.log(selectitemList);
    
    var patch = this.pumpShiftSalesForm.get('ppShiftNozleLinesList') as FormArray;
    // patch.controls[i].patchValue({ itemid: selectitemList.itemId });
    this.nozzlelineDetailsArray(i).controls[i].patchValue({itemid: selectitemList.itemId })
  }

  lineCalculationFn(i){
    alert(i+'--------')
    var arrayControlNew = this.pumpShiftSalesForm.get('ppShiftNozleLinesList') as FormArray;
    var arrayControl = arrayControlNew.getRawValue();
    // var arrayControl= this.lineDetailsArray().at(i).get("ppShiftNozleLinesList") as FormArray;
    console.log(arrayControl);
    
    var qty = arrayControl[i].qty;
    // alert(qty)
    var rate = arrayControl[i].rate;
    var totAmt = qty*rate;
    var patch = this.pumpShiftSalesForm.get('ppShiftNozleLinesList') as FormArray;
    // patch.controls[i].patchValue({ lineAmt: totAmt });
    this.nozzlelineDetailsArray(i).controls[i].patchValue({lineAmt: totAmt})
  }


  CustAccountNoSearch(i,event){
    alert(i+'---------'+event.target.value)
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

  voucherDetails(){

  }

}