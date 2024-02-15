
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
  PaymentModeList: any=[];


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
  found1=false;
  isDisableARButtonNZH=true;
  isDisableARButtonNZL=true;
  isDisableARButtonVCH=true;

  NZHlineValidation=false;
  NZLlineValidation=false;
  VCHlineValidation=false;
  saveNozLineButton =false;
  NZRComplete=false;


  
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
      nozzIsland :[''],
      nozzFuelType:[''],
      qty :[''],
      rate:[],
      lineAmt:[],
      payType:[],
      customerId:[],
      slipNumber:[],
      vehicleNumber:[],
      remarks:[],
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

  this.service.PaymentModeList()
  .subscribe(
    data => {
      this.PaymentModeList = data;
      console.log(this.PaymentModeList);
    }
  );

  this.pumpShiftSalesForm.get('nozzleDtlsList').disable();
  this.pumpShiftSalesForm.get('shiftVoucherList').disable();
  this.pumpShiftSalesForm.get('nozzleLineDtlsList').disable();

  }

  search(shiftno){
    alert ("Shift no:"+shiftno);
  }

  
  

  ShiftHeaderCheck(){
    if (this.NZRComplete==false) {
    this.checkHeaderValidations();
    // this.isDisableARButton=false;

    if (this.headerValidation ==false) {
      this.isDisableARButtonNZH=true;
      this.isDisableARButtonNZL=true;
      this.isDisableARButtonVCH=true;
      this.saveNozLineButton=true;
      this.pumpShiftSalesForm.get('nozzleDtlsList').disable();
      this.pumpShiftSalesForm.get('shiftVoucherList').disable();
     }
     else { 
            this.isDisableARButtonNZH=false;
            this.isDisableARButtonVCH=false;
            this.saveNozLineButton=false;
            this.pumpShiftSalesForm.get('nozzleDtlsList').enable();
            this.pumpShiftSalesForm.get('shiftVoucherList').enable();
    }
      }
  }


  transeData(val) {
    delete val.divisionId;
    delete val.loginArray;
    delete val.loginName;
    delete val.locName;
    delete val.ouName;
    delete val.locationId;
    // delete val.locId;
    // delete val.ouId;
    delete val.deptId;
    delete val.orgId;
    return val;
  }

  ValidateArrayLine(){

    var nzLineArr = this.pumpShiftSalesForm.get('nozzleDtlsList').value;
    var patch = this.pumpShiftSalesForm.get('nozzleDtlsList') as FormArray;
    var len1=nzLineArr.length;

    for (let i = 0; i < len1 ; i++)
    {
      this.CheckLineValidations_NZH(i)
    }
    if(this.NZHlineValidation===false ) {
      alert("Nozzle Reading Validation failed. Please check and proceed...")
      return;
    }

    var nzLineArr = this.pumpShiftSalesForm.get('nozzleLineDtlsList').value;
    var patch = this.pumpShiftSalesForm.get('nozzleLineDtlsList') as FormArray;
    var len1=nzLineArr.length;

    for (let i = 0; i < len1 ; i++)
    {
      this.CheckLineValidations_NZL(i)
    }
    if(this.NZLlineValidation===false ) {
      alert("Nozzle Sale Detail Validation failed. Please check and proceed...")
      return;
    }

    var vcLineArr = this.pumpShiftSalesForm.get('shiftVoucherList').value;
    var patch = this.pumpShiftSalesForm.get('shiftVoucherList') as FormArray;
    var vclen1=vcLineArr.length;

    // for (let i = 0; i < vclen1 ; i++)
    // {
    //   this.CheckVoucherLineValidations(i);
    // }
    // if(this.lineValidation===false ) {
    //   alert("Voucher Detail Validation failed. Please check and proceed...")
    //   return;
    // }
  
    }
   
  saveSale1(){

    this.ValidateArrayLine();

    const formValue: IPumpShiftSale =this.transeData(this.pumpShiftSalesForm.getRawValue());
   
    // this.pumpShiftSalesForm.get('nozzleDtlsList').enable();

    this.PumpService1.savePetrolPump(formValue).subscribe((res: any) => {
      if (res.code === 200) {

        alert('RECORD INSERTED SUCCESSFUILY');
        // this.mcpPackageMasterForm.reset();
        this.displayButton=false;
        this.pumpShiftSalesForm.disable();
      } else {
        if (res.code === 400) {
          alert('ERROR WHILE INSERTING');
          this.pumpShiftSalesForm.reset();
        }
  } });

  this.pumpShiftSalesForm.disable();

}
  closeSale() {
    this.router.navigate(['admin']);
  }

  resetSale() {
    window.location.reload();
  }

  onSelectedNozzle_HL(index){
    var patch = this.pumpShiftSalesForm.get('nozzleDtlsList') as FormArray;
    var qtyLineArr = this.pumpShiftSalesForm.get('nozzleDtlsList').value;
    var nozId =qtyLineArr[index].NozzlidId;

    let select = this.nozzleList.find(d => d.nozzleId === nozId);
      this.pumpShiftSalesForm.patchValue(select);
      if (select != undefined) {
        console.log(select);
              
      }
    var nozCode = select.nozzleCode;

    this.CheckForDuplicateLineItemNz(nozId,index,nozCode);

    (patch.controls[index]).patchValue({ nozzIsland: "" ,nozzFuelType:""});


    //  let select = this.nozzleList.find(d => d.nozzleId === nozId);
    //   this.pumpShiftSalesForm.patchValue(select);
    //   if (select != undefined) {
    //     console.log(select);
              
    //   }
    


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

  onSelectedNozzle_LD(index){
    var patch = this.pumpShiftSalesForm.get('nozzleLineDtlsList') as FormArray;
    var qtyLineArr = this.pumpShiftSalesForm.get('nozzleLineDtlsList').value;
    var nozId =qtyLineArr[index].NozzlidId;

    let select = this.nozzleList.find(d => d.nozzleId === nozId);
      this.pumpShiftSalesForm.patchValue(select);
      if (select != undefined) {
        console.log(select);
              
      }
    var nozCode = select.nozzleCode;

    // this.CheckForDuplicateLineItemNz(nozId,index,nozCode);

    (patch.controls[index]).patchValue({ nozzIsland: "" ,nozzFuelType:""});

    this.CheckForNozzleHeaderLineItem(index,nozId,nozCode);
    // alert ('Found status :' +this.found1);
    // this.invLineArray().controls[index].get('applAmtNew').disable();
    if (this.found1) {
    this.service.NozzleIslandPick(nozId)
    .subscribe(
      data => {
        this.IslandDetails = data
        console.log(this.IslandDetails);
        (patch.controls[index]).patchValue({ nozzIsland: this.IslandDetails.islandCode +"-"+this.IslandDetails.description});
      });

// <<<<<<< HEAD
      this.service.NozzleFuelTypePick(select.nozzleCode)
      .subscribe(
        data => {
          this.NozFuelTpDetails = data
          console.log(this.NozFuelTpDetails);
          (patch.controls[index]).patchValue({ nozzFuelType: this.NozFuelTpDetails.pumpName});
        });
// =======
      // this.service.NozzleFuelTypePick(select.nozzleCode)
      // .subscribe(
      //   data => {
      //     this.NozFuelTpDetails = data
      //     console.log(this.NozFuelTpDetails);
      //     // alert( this.NozFuelTpDetails.pumpName);
      //     (patch.controls[index]).patchValue({ nozzFuelType: this.NozFuelTpDetails.pumpName});
      //   });
// >>>>>>> 91e10080b8bb3b1dd02f8a4d7b466f61048cfaa0

        // this.nozzlelineDetailsArray().controls[index].get('qty').enable();
        // this.nozzlelineDetailsArray().controls[index].get('rate').enable();

      // alert( this.IslandDetails.islandCode);
      // (patch.controls[index]).patchValue({ nozzIsland: this.IslandDetails.islandCode +"-"+this.IslandDetails.description});
      // this.pumpShiftSalesForm.patchValue(this.IslandDetails);
   } else {
          alert(nozCode + " Not found in Nozzle Header Line List..Pls Check");
          this.nozzlelineDetailsArray().controls[index].get('NozzlidId').reset();
          // this.nozzlelineDetailsArray().controls[index].get('qty').disable();
          // this.nozzlelineDetailsArray().controls[index].get('rate').disable();
   }

  }


  CheckLineValidations_NZH(i) {
    // alert('addrow index '+i);
    var NZHLineArr1 = this.pumpShiftSalesForm.get('nozzleDtlsList').value;
    var lineValue1=NZHLineArr1[i].NozzlidId;
    var lineValue2=NZHLineArr1[i].OpeningReading;
    var lineValue3=NZHLineArr1[i].SystemClosingReading;
    var lineValue4=NZHLineArr1[i].ManualClosingReading;
     var j=i+1;
    if(lineValue1===undefined || lineValue1===null || lineValue1<1 ){
      alert("Line-"+j+ " NOZZLE CODE :  Should not be null value " +lineValue1);
      this.NZHlineValidation=false;
      return;
    }
    if(lineValue2===undefined || lineValue2===null || lineValue2<0 ){
      alert("Line-"+j+ " OPEN READING:  Invalid Input");
      this.NZHlineValidation=false;
      return;
    }
    if(lineValue3===undefined || lineValue3===null || lineValue3<0 || lineValue3<lineValue2 ){
      alert("Line-"+j+ " CLOSE READING(system) : Invalid Input");
      this.NZHlineValidation=false;
      return;
    }
    if(lineValue4===undefined || lineValue4===null || lineValue4<0 || lineValue4<lineValue2 ){
      alert("Line-"+j+ " CLOSE READING(manual) : Invalid Input");
      this.NZHlineValidation=false;
      return;
    }

    if(this.duplicateLineItem===true) {this.NZHlineValidation=false;}else{this.NZHlineValidation=true;}

    }

    CheckLineValidations_NZL(i) {
      var NZLLineArr1 = this.pumpShiftSalesForm.get('nozzleLineDtlsList').value;
      var lineValue1=NZLLineArr1[i].NozzlidId;
      var lineValue2=NZLLineArr1[i].qty;
      var lineValue3=NZLLineArr1[i].rate;
      var lineValue4=NZLLineArr1[i].payType;
       var j=i+1;
      if(lineValue1===undefined || lineValue1===null || lineValue1<1 ){
        alert("Line-"+j+ " NOZZLE CODE :  Should not be null value " +lineValue1);
        this.NZLlineValidation=false;
        return;
      }
      if(lineValue2===undefined || lineValue2===null || lineValue2<0.1 ){
        alert("Line-"+j+ " QTY:  Invalid Input");
        this.NZLlineValidation=false;
        return;
      }
      if(lineValue3===undefined || lineValue3===null || lineValue3<0 ){
        alert("Line-"+j+ " UNIT RATE : Invalid Input");
        this.NZLlineValidation=false;
        return;
      }
      if(lineValue4===undefined || lineValue4===null || lineValue4<1 ){
        alert("Line-"+j+ " PAY MODE : Invalid Input");
        this.NZLlineValidation=false;
        return;
      }
      this.NZLlineValidation=true;
      // if(this.duplicateLineItem===true) {this.NZLlineValidation=false;}else{this.NZLlineValidation=true;}
  
      }

  addRowNL(index) { 
    this.CheckLineValidations_NZL(index);
    if (this.NZLlineValidation)
    {
      this.nozzlelineDetailsArray().push(this.nozzlelineDetailsGroup());
    }
  }

  RemoveRowNL(index) {
    if (index===0){ }
    else { this.nozzlelineDetailsArray().removeAt(index);  }
    }


  addRow(index) {
    var NozzLineArr1 = this.pumpShiftSalesForm.get('nozzleDtlsList').value;
    var lineValue1=NozzLineArr1[index].NozzlidId;
    var nozCode = NozzLineArr1[index].nozzleCode;

    this.CheckForDuplicateLineItemNz(lineValue1,index,nozCode)

    if(this.duplicateLineItem ===false) {
      this.CheckLineValidations_NZH(index);    

    if (this.NZHlineValidation)
      {
            this.lineDetailsArray().push(this.lineDetailsGroup());
  
      }
    } else {alert("Duplicate Line Item Found : Remove Duplicate line and Proceed...");
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

    this.CheckForDuplicateLineItemVch(lineValue1,index)

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

  CheckForNozzleHeaderLineItem(lineIndex,LineNzId,nozCode){
    var nzLineArr = this.pumpShiftSalesForm.get('nozzleDtlsList').value;
    var patch = this.pumpShiftSalesForm.get('nozzleDtlsList') as FormArray;
    var len1=nzLineArr.length;
    this.found1=false;
    for (let i = 0; i < len1 ; i++)
    {
      var hNozzleLineId=nzLineArr[i].NozzlidId;
      if(hNozzleLineId===LineNzId){this.found1=true;break;}
    }
   }


  CheckForDuplicateLineItemNz(mNzNo,mIndex,nzCode){
    var nzLineArr = this.pumpShiftSalesForm.get('nozzleDtlsList').value;
    var patch = this.pumpShiftSalesForm.get('nozzleDtlsList') as FormArray;
    var len1=nzLineArr.length;

    for (let i = 0; i < len1 ; i++)
      {
        var linevnzNo=nzLineArr[i].NozzlidId;
         if(mIndex != i) {
         if (linevnzNo===mNzNo) {
           this.duplicateLineItem=true;
           alert(linevnzNo+"-"+nzCode+"\nDUPLICATE line item Selected.\nPlease check item in Line - " +(i+1)+ "\nRemoving  duplicate Line. ");
           this.RemoveRow(mIndex);
            break;
          }

          }else{this.duplicateLineItem=false;}
           this.duplicateLineItem=false; }
    }


    CheckForDuplicateLineItemVch(mVchNo,mIndex){
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
             this.duplicateLineItem=false; 
        }
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

      saveNozLine(){
        var NozLineArr = this.pumpShiftSalesForm.get('nozzleDtlsList').value;
        var len1=NozLineArr.length;
        // alert ("Noz Length :"+len1)

        for (let i = 0; i < len1 ; i++)
          {
            this.CheckLineValidations_NZH(i);
          }

          if(this.NZHlineValidation) {
            this.pumpShiftSalesForm.get('nozzleLineDtlsList').enable();
            this.pumpShiftSalesForm.get('nozzleDtlsList').disable();
            this.saveNozLineButton=true;
            this.isDisableARButtonNZH=true;
            this.isDisableARButtonNZL=false;
            this.NZRComplete=true;

          } else { 
            alert ("Enter Nozzle Reading details properly....\nNozzle Sale details entry not allowed.");}

      }


      onKeyCash(cashSubmit){
        var totCash=0;
        if (this.totalCashSale==null||this.totalCashSale==undefined) {
          totCash =0} else { totCash=this.totalCashSale}
        var totExp=this.pumpShiftSalesForm.get('totalexpenses').value;
        var mCashDiff =totCash-(cashSubmit+totExp);
        this.pumpShiftSalesForm.patchValue({ CashDifference: mCashDiff});
      }

      onKeyVCH(index) {
        var arrayControl = this.pumpShiftSalesForm.get('shiftVoucherList').value
        var patch = this.pumpShiftSalesForm.get('shiftVoucherList') as FormArray;
        var len1=arrayControl.length;
        console.log(index);
         var  mVchTotal=0;
        for (let i = 0; i < len1 ; i++)
         {
         mVchTotal =mVchTotal+arrayControl[i].Amount;
         }
         this.pumpShiftSalesForm.patchValue({ totalexpenses: mVchTotal});
      }


      onKeyNZL(index) {
  
        var arrayControl = this.pumpShiftSalesForm.get('nozzleLineDtlsList').value
        var patch = this.pumpShiftSalesForm.get('nozzleLineDtlsList') as FormArray;
        console.log(index);
        var mQty =arrayControl[index].qty;
        var taxP =arrayControl[index].rate;
        var totAmt = arrayControl[index].qty * arrayControl[index].rate;
        (patch.controls[index]).patchValue({ lineAmt: totAmt});
        this.CalculatePayModewiseTotal();

    }

    onKeyNZH(index) {
  
      var arrayControl = this.pumpShiftSalesForm.get('nozzleDtlsList').value
      var patch = this.pumpShiftSalesForm.get('nozzleDtlsList') as FormArray;
      console.log(index);
      var mOpen =arrayControl[index].OpeningReading;
      var mcloseSys =arrayControl[index].SystemClosingReading;
      var mcloseManual =arrayControl[index].ManualClosingReading;
      var mDiff=mcloseManual-mcloseSys
      var totQty = arrayControl[index].SystemClosingReading - arrayControl[index].OpeningReading;
      (patch.controls[index]).patchValue({ TotalSaleReading: totQty});
      (patch.controls[index]).patchValue({ Difference: mDiff});
  }

  onSelectPayType(index){
    this.CalculatePayModewiseTotal();
  }

  CalculatePayModewiseTotal(){
    var patch = this.pumpShiftSalesForm.get('nozzleLineDtlsList') as FormArray;
    var arrayControl = this.pumpShiftSalesForm.get('nozzleLineDtlsList').value
    var len1=arrayControl.length;
    var lineAmt=0;
    var  cashSale=0;
    var  creditSale=0;
    var  otherSale=0;


    for (let i = 0; i < len1 ; i++)
      {
        if (arrayControl[i].payType==='CASH') {cashSale=cashSale+arrayControl[i].lineAmt;}
        else if (arrayControl[i].payType==='OTHER') {otherSale=otherSale+arrayControl[i].lineAmt;}
        else {creditSale=creditSale+arrayControl[i].lineAmt;}
       }
      //  alert ("Line Amt : "+lineAmt);
      var totSale=cashSale+otherSale+creditSale;
      this.pumpShiftSalesForm.patchValue({ totalCashSale: cashSale,totalCreditSale:creditSale,
                                           totalotherSale:otherSale ,totalSale :totSale });

       var mCashSumbit=0;                                     
      if(this.CashSubmitted==null || this.CashSubmitted==undefined) {
        mCashSumbit=0;  } else {mCashSumbit=this.CashSubmitted}
        var totExp=this.pumpShiftSalesForm.get('totalexpenses').value;
        this.pumpShiftSalesForm.patchValue({ CashDifference: this.totalCashSale-(mCashSumbit-totExp)});

  }     
  
  
}