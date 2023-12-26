
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';


interface IPumpShiftSale{

  ShiftEntryId:number;
  ShiftEntryNo :number;
  ShiftEntryDate:Date;
  ShiftType:number;
  employeeId:number;

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
  NozFuelTpDetails:any;

  shiftCode :string;
  nozzleId :number;
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

  

  //////////////////////////////////
  vchModal=true;
  headerValidation=false;
  lineValidation=false;
  duplicateLineItem=false;
  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display1=true;
  display = true;
  displayButton = true;

  
  constructor(private service: MasterService,private   fb: FormBuilder, private router: Router) {
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
      nozzleId:[],

      totalSale :[],
      totalCashSale:[],
      totalCreditSale:[],
      totalotherSale:[],
      totalexpenses:[],
      CashSubmitted:[],
      CashDifference:[],

      nozzleDtlsList: this.fb.array([this.lineDetailsGroup()]),
      nozzleLineDtlsList: this.fb.array([this.nozzlelineDetailsGroup()]),
      shiftVoucherList: this.fb.array([this.voucherDetailsGroup()]),


    });
  }
  lineDetailsGroup() {
    return this.fb.group({
      ShiftEntryId:[''],
      NozzlidId :[''],
      nozzFuelType:[''],
      nozzIsland :[''],
      OpeningReading:[],
      SystemClosingReading:[],
      ManualClosingReading:[],
      TotalSaleReading:[],
      Difference:[],
      Remarks:[],
      locid:[],
     });
  }

  nozzlelineDetailsGroup() {
    return this.fb.group({
      ShiftEntryId:[''],
      NozzlidId :[''],
      nozzFuelType:[''],
      nozzIsland :[''],
      OpeningReading:[],
      SystemClosingReading:[],
      ManualClosingReading:[],
      TotalSaleReading:[],
      Difference:[],
      Remarks:[],
      locid:[],
     });
  }

  voucherDetailsGroup() {
    return this.fb.group({
      ShiftEntryId:[],
      ShiftVoucherNo:[],
      locid:[],
      Description:[],
      Amount:[],
      
     });
  }

 



 lineDetailsArray() :FormArray{
    return <FormArray>this.pumpShiftSalesForm .get('nozzleDtlsList')
  }

  nozzlelineDetailsArray() :FormArray{
    return <FormArray>this.pumpShiftSalesForm .get('nozzleLineDtlsList')
  }

  voucherDetailsArray() :FormArray{
    return <FormArray>this.pumpShiftSalesForm .get('shiftVoucherList')
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


 
this.service.ShiftList()
.subscribe(
  data => {
    this.shiftList = data;
    console.log(this.shiftList);
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

  }

  search(shiftno){
    alert ("Shift no:"+shiftno);
  }

  
  

  voucherFormLoad(){
    this.checkHeaderValidations();
    if (this.headerValidation ==false) {
      alert ("Header Details not Entered.Please check and proceed...");
     }
  }

  saveSale1(){}


  closeSale() {
    this.router.navigate(['admin']);
  }

  resetSale() {
    window.location.reload();
  }

  onSelectedNozzle(index){
    var patch = this.pumpShiftSalesForm.get('nozzleDtlsList') as FormArray;
    var qtyLineArr = this.pumpShiftSalesForm.get('nozzleDtlsList').value;
    var nozId =qtyLineArr[index].NozzlidId;
    var nozCode = qtyLineArr[index].nozzleCode;

    (patch.controls[index]).patchValue({ nozzIsland: "" ,nozzFuelType:""});

    // alert ("nozzle id :"+ nozId + " index : "+index);

     let select = this.nozzleList.find(d => d.nozzleId === nozId);
      this.pumpShiftSalesForm.patchValue(select);
      if (select != undefined) {
        console.log(select);
        // (patch.controls[index]).patchValue({ nozzFuelType: select.pumpName});
        // alert ("Nozzle Code :" +select.nozzleCode + " noz id :" +nozId);
        
      }


    this.service.NozzleIslandPick(nozId)
    .subscribe(
      data => {
        this.IslandDetails = data
        console.log(this.IslandDetails);
        // alert( this.IslandDetails.islandCode);
        (patch.controls[index]).patchValue({ nozzIsland: this.IslandDetails.islandCode +"-"+this.IslandDetails.description});
      });

      this.service.NozzleFuelTypePick(select.nozzleCode)
      .subscribe(
        data => {
          this.NozFuelTpDetails = data
          console.log(this.NozFuelTpDetails);
          // alert( this.NozFuelTpDetails.pumpName);
          (patch.controls[index]).patchValue({ nozzFuelType: this.NozFuelTpDetails.pumpName});
        });

   
     


      // alert( this.IslandDetails.islandCode);
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
    var VchLineArr1 = this.pumpShiftSalesForm.get('shiftVoucherList').value;
    var lineValue1=VchLineArr1[index].ShiftVoucherNo;

    this.CheckForDuplicateLineItem(lineValue1,index)

    // alert("Addrow duplicate item status :"+this.duplicateLineItem);
    if(this.duplicateLineItem ===false) {
  
    this.CheckVoucherLineValidations(index);
    if (this.lineValidation)
      { this.voucherDetailsArray().push(this.voucherDetailsGroup());}

    } else {alert("Duplicate Line Item Found : Remove Duplicate line and Proceed..." + this.duplicateLineItem);
  }
  }
  
  
  
  RemoveRowV(index) {
    if (index===0){ } else { this.voucherDetailsArray().removeAt(index); }
    }

  


  CheckVoucherLineValidations(i) {

     this.checkHeaderValidations();
     if (this.headerValidation) {
  
    var VchLineArr1 = this.pumpShiftSalesForm.get('shiftVoucherList').value;
    var lineValue1=VchLineArr1[i].ShiftVoucherNo;
    var lineValue2=VchLineArr1[i].Description;
    var lineValue3=VchLineArr1[i].Amount;
     var j=i+1;
    if(lineValue1===undefined || lineValue1===null || lineValue1==='' ){
      alert("Line-"+j+ " VOUCHER NO :  Should not be null value");
      this.lineValidation=false;
      return; }

    if(lineValue2===undefined || lineValue2===null || lineValue2==='' ){
      alert("Line-"+j+ " DESCRIPTION:  Should not be null value");
      this.lineValidation=false;
      return; }

    if(lineValue3===undefined || lineValue3===null || lineValue3<=0){
      alert("Line-"+j+ " AMOUNT :  Should  be grater than Zero");
      this.lineValidation=false;
      return;}

    if(this.duplicateLineItem===true) {this.lineValidation=false;}else{this.lineValidation=true;}
    } 

    else { alert ("Header Details not Entered .Please check");}
  }



    CheckForDuplicateLineItem(mVchNo,mIndex){
      var vchLineArr = this.pumpShiftSalesForm.get('shiftVoucherList').value;
      var patch = this.pumpShiftSalesForm.get('shiftVoucherList') as FormArray;
      var len1=vchLineArr.length;

      for (let i = 0; i < len1 ; i++)
        {
          var linevchNo=vchLineArr[i].ShiftVoucherNo;
           if(mIndex != i) {
           if (linevchNo===mVchNo) {
             this.duplicateLineItem=true;
             alert(linevchNo+" DUPLICATE line item. Please check item in Line - " +(i+1));
              break;
            }

            }else{this.duplicateLineItem=false;}
             this.duplicateLineItem=false; }
      }

      checkHeaderValidations()  {
        const formValue: IPumpShiftSale = this.pumpShiftSalesForm.value

        if (formValue.ShiftType===undefined || formValue.ShiftType===null )
        {
           this.headerValidation=false;
           alert ("SHIFT TYPE : Should not be null....");
            return;
         }

         if (formValue.employeeId===undefined || formValue.employeeId===null )
         {
            this.headerValidation=false;
            alert ("SALES PERSON : Should not be null....");
             return;
          }
            this.headerValidation=true;
      }


}