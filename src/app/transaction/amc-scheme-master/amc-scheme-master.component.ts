import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { trigger } from '@angular/animations';

interface IAmcScheme { 
  schemeId:number;
  schemeNumber:string;
  startDate:string;
  endDate:Date;
  schemeDesc:string;
  schemeValidYears:number;
  totalPeriod:number;
  gracePeriod:number;
  schemeValidKm:number;
  schemeGrp:string;
  discOnMatrl:number;
  discOnLabour:number;
  disAmount:number;
  totAmtlab:number;
  totAmtmat:number;
 }

@Component({
  selector: 'app-amc-scheme-master',
  templateUrl: './amc-scheme-master.component.html',
  styleUrls: ['./amc-scheme-master.component.css']
})
export class AmcSchemeMasterComponent implements OnInit {

  amcSchemeMasterForm : FormGroup;

  pipe = new DatePipe('en-US');
  public minDate = new Date();

  // public AmcCouponLst :Array<string> = [];
  AmcCouponLst:any[];
  public McpPackageCategoryList :Array<string> = [];
  public McpPackageList:Array<string> = [];

  lstcomments: any;

  loginName:string;
  loginArray:string;
  divisionId:number;
  name:string;
  ouName : string;
  locId: number;
  locationId:number;
  locName : string;
  orgId:number;
  ouId :number;
  deptId:number; 
  emplId :number;

  schemeId:number;
  schemeNumber:string;
  // startDate:Date;
  startDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  
  endDate:Date;
  schemeDesc:string;
  schemeValidYears:number;
  totalPeriod:number;
  gracePeriod:number;
  schemeValidKm:number;
  schemeGrp:string;
  discOnMatrl:number;
  discOnLabour:number;

  

  amcLabBasicAmt:number=0;
  amcLabDiscount:number=0;
  amcLabTax:number=0;
  amcLabTotal:number=0;
  amcMatBasicAmt:number=0;
  amcMatDiscount:number=0;
  amdMatTax:number=0;
  amcMatToal:number=0;
  amcSchemeTotal:number=0;

  disAmount:number;
  totAmtlab:number;
  totAmtmat:number;

  displayButton=true;
  duplicateLineItem=false;
  amcSchLineValidation=false;
  amcHeaderValidation =false;

  userList2: any[] = [];
  lastkeydown1: number = 0;

  constructor(private service: MasterService,private orderManagementService:OrderManagementService,private transactionService: TransactionService , private  fb: FormBuilder, private router: Router) {
    this.amcSchemeMasterForm = fb.group({

    loginArray:[''],
    loginName:[''],
    divisionId:[],
    ouName :[''],
    locId:[''],
    locationId:[],
    locName :[''],
    ouId :[],
    deptId :[],
    emplId:[''],
    orgId:[''],

    schemeId:[],
    schemeNumber:[],
    startDate:[],
    endDate:[],
    schemeDesc:[],
    schemeValidYears:[],
    gracePeriod:[],
    totalPeriod:[],
    schemeValidKm:[],
    schemeGrp:[],
    discOnMatrl:[],
    discOnLabour:[],

    amcLabBasicAmt:[],
    amcLabDiscount:[],
    amcLabTax:[],
    amcLabTotal:[],
    amcMatBasicAmt:[],
    amcMatDiscount:[],
    amdMatTax:[],
    amcMatToal:[],
    amcSchemeTotal:[],

    disAmount:[],
    totAmtlab:[],
    totAmtmat:[],

    amcItemList: this.fb.array([this.lineDetailsGroup()])   

  });
}

lineDetailsGroup() {
    return this.fb.group({ 
    itemId:[''],
    schCoupId:[],
    couponId:[''],
    couponNumber:[''],
    couponDesc :['', [Validators.required]],    
    quantity:['', [Validators.required]],
    unitPrice:['', [Validators.required]],
    amount:['', [Validators.required]],
    disc:[],
    net:[],
    tax:[],
    total:['', [Validators.required]],
    couponCode:[],
    gstpercentage:[],
    couponActualCode:[],
   });
}

lineDetailsArray() :FormArray{
  return <FormArray>this.amcSchemeMasterForm.get('amcItemList')
}


get f() { return this.amcSchemeMasterForm.controls; }

amcSchemeMaster(amcSchemeMasterForm:any) {  }

ngOnInit(): void {
  $("#wrapper").toggleClass("toggled");
  this.name=  sessionStorage.getItem('name');
  this.loginArray=sessionStorage.getItem('divisionName');
  this.loginName=sessionStorage.getItem('name');
  this.ouName = (sessionStorage.getItem('ouName'));
  this.ouId=Number(sessionStorage.getItem('ouId'));
  this.locId=Number(sessionStorage.getItem('locId'));
  this.locName=(sessionStorage.getItem('locName'));
  this.deptId=Number(sessionStorage.getItem('dept'));
  this.emplId= Number(sessionStorage.getItem('emplId'));
  this.divisionId = Number(sessionStorage.getItem('divisionId'));
  this.orgId=this.ouId;
  console.log(this.loginArray);
  console.log(this.locId);


  this.service.AmcCouponList()
  .subscribe(
  data => {
    this.AmcCouponLst = data;
    console.log(this.AmcCouponLst);
  }
);
}



resetMast() {
  window.location.reload();
}

closeMast() {
  this.router.navigate(['admin']);
}


RemoveRow(index) {
  if (index===0){
  }
  else {
    this.lineDetailsArray().removeAt(index);
  }

}

addRow(index) {
  var amcLineArr = this.amcSchemeMasterForm.get('amcItemList').value;
  var len1 = this.lineDetailsArray().length-1;

  if(len1===index){

    this.checkAmcSchLineValidation(index);
    
    if(this.amcSchLineValidation ) {
        if( amcLineArr[index].couponId>0) {
        this.lineDetailsArray().push(this.lineDetailsGroup()); 
        }else {alert ("Incomplete Line - Check Line Details .... ");}
      }
  }
 }

checkAmcSchLineValidation(index){
 
  var arrayControl = this.amcSchemeMasterForm.get('amcItemList').value
  var cpnId = arrayControl[index].couponId;
  this.amcSchLineValidation=false

  if(Number(arrayControl[index].billableTyId)<=0)
  { this.amcSchLineValidation=false;return; }

  if(cpnId===null || cpnId==undefined || cpnId<=0)
  { this.amcSchLineValidation=false;return; }

  if(Number(arrayControl[index].quantity)<=0 ||arrayControl[index].quantity===null || arrayControl[index].quantity===undefined )
   { this.amcSchLineValidation=false;return; }

   if(Number(arrayControl[index].unitPrice)<=0 ||arrayControl[index].unitPrice===null || arrayControl[index].unitPrice===undefined )
   { this.amcSchLineValidation=false;return; }

  this.amcSchLineValidation=true;

}

transeData(val) {

  delete val.loginArray;
  delete val.loginName;
  delete val.locName;
  delete val.ouName;
  delete val.locId;
  delete val.ouId;
  delete val.deptId;
  delete val.emplId;
  delete val.orgId;

 return val;
}

  newMast() {
      const formValue: IAmcScheme =this.transeData(this.amcSchemeMasterForm.value);
      this.checkAmcHeaderValidations();
      if(this.amcHeaderValidation) {
      this.service.AmcSchemeMasterSubmit(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD INSERTED SUCCESSFUILY');
          // this.mcpPackageMasterForm.reset();
          this.displayButton=false;
          this.amcSchemeMasterForm.disable();
        } else {
          if (res.code === 400) {
            alert('ERROR WHILE INSERTING');
            // this.amcSchemeMasterForm.reset();
          }
        }
      });
    }}
  

   

    searchMast() {
      // var frmDt=this.amcSchemeMasterForm.get('fromDate').value;
      // var toDt=this.amcSchemeMasterForm.get('toDate').value;
        //  alert("SearchByRcptNo-Receipt date : "+ frmDt+","+toDt  );
   
      this.service.AmcSchemeList()
        .subscribe(
          data => {
            this.lstcomments = data;
            console.log(this.lstcomments);
            
          } ); 
        }

        

        Select(schId: number) {
           
           this.amcSchemeMasterForm.reset();
          for(let i=0; i<this.lineDetailsArray.length; i++){
            this.lineDetailsArray().removeAt(i);
          }
            let select = this.lstcomments.find(d => d.schemeId === schId);
          if (select) {
           
               var control = this.amcSchemeMasterForm.get('amcItemList') as FormArray;
              // alert ("select.amcItemList.length :"+select.amcItemList.length);
              this.lineDetailsArray().clear();
              
              for (let i=0; i<select.amcItemList.length;i++)
                {
                  var amcItemList:FormGroup=this.lineDetailsGroup();
                  control.push(amcItemList);
                }

               this.amcSchemeMasterForm.patchValue(select);
           }

           this.displayButton = false;
           this.schemeId=select.schemeId;
        }

     updateMast(){alert("Update AMC scheme ....wip");}


    onOptionAmcCoupenSelected(cpn :any, index) {
      var arrayControl = this.amcSchemeMasterForm.get('amcItemList').value
      var patch = this.amcSchemeMasterForm.get('amcItemList') as FormArray;
      var cpnNumber = arrayControl[index].couponNumber;
       
      let selectedValue = this.AmcCouponLst.find(v => v.couponNumber === cpnNumber);
      if( selectedValue != undefined){

      console.log(selectedValue);
      // alert (selectedValue.couponNumber);
     
      
      this.CheckForDuplicateLineItem(selectedValue.couponId,index)
      if(this.duplicateLineItem ==false) {
            // this.itemId = selectedValue.itemId;
            (patch.controls[index]).patchValue(
              {
                couponId: selectedValue.couponId,
                couponNumber: selectedValue.couponNumber,
                couponDesc: selectedValue.couponDesc,
                couponCode: selectedValue.couponCode,
                quantity: selectedValue.quantity,
                unitPrice: selectedValue.value,
                amount: selectedValue.total,
                itemId:selectedValue.itemId,
                couponActualCode:selectedValue.couponActualCode,
                gstpercentage:selectedValue.gstpercentage,
               
              });

              }
              this.CalculateAmcLineValues();
        }
    }



      CheckForDuplicateLineItem(mCpnId,mIndex){
        var cpnLineArr = this.amcSchemeMasterForm.get('amcItemList').value;
        var patch = this.amcSchemeMasterForm.get('amcItemList') as FormArray;
        var len1=cpnLineArr.length;
        // alert("line item array length :"+len1 + "," +mItemId);

        for (let i = 0; i < len1 ; i++)
          {
            // alert("inside for loop");
            var lineItemId=cpnLineArr[i].couponId;
            if(mIndex != i) {
            if (lineItemId===mCpnId) {
              this.duplicateLineItem=true;
               alert(lineItemId+" DUPLICATE line item. Please check item in Line - " +(i+1));
               break;
              }

              }else{this.duplicateLineItem=false;}

              this.duplicateLineItem=false;
          }

      }

      validateDisM(){
        var mDis =this.amcSchemeMasterForm.get('discOnMatrl').value;
        if(mDis<0) { alert ("MATERIAL DISCOUNT : Enter Valid Discount Percentage.."); this.amcSchemeMasterForm.patchValue({schMatDisPer:0})}
         this.CalculateAmcLineValues();
      }

      validateDisL(){
        var lDis =this.amcSchemeMasterForm.get('discOnLabour').value;
        if(lDis<0) { alert ("LABOUR DISCOUNT : Enter Valid Discount Percentage.."); this.amcSchemeMasterForm.patchValue({schLabDisPer:0})}
        this.CalculateAmcLineValues(); 
      }

      CalculateAmcLineValues(){
        var arrayControl = this.amcSchemeMasterForm.get('amcItemList').value
        var patch = this.amcSchemeMasterForm.get('amcItemList') as FormArray;

        var len1=arrayControl.length;
     
        var lineDiscountp=0
        

        for (let i = 0; i < len1 ; i++)
          {
           
             var lineTotal=(arrayControl[i].quantity * arrayControl[i].unitPrice);
            
             if(arrayControl[i].couponCode==='Labor') { lineDiscountp= this.discOnLabour;}
             if(arrayControl[i].couponCode==='Material') {lineDiscountp=this.discOnMatrl;}

            if(lineDiscountp==null || lineDiscountp==undefined ) {lineDiscountp=0;}
              // alert ("line disc p :" +lineDiscountp);
          
             var lineDisAmt =lineTotal *lineDiscountp/100;
             var lineTaxable =lineTotal-lineDisAmt;
             var lineTax=(lineTotal-lineDisAmt)* arrayControl[i].gstpercentage/100;
             var lineNetTotal  =lineTaxable+lineTax;

            (patch.controls[i]).patchValue(
              {
                disc: lineDisAmt,
                net : lineTaxable,
                tax: lineTax,
                total: lineNetTotal,
            });
      }
      this.CalculateAmcTotalValues();
    }

    CalculateAmcTotalValues(){

      var arrayControl = this.amcSchemeMasterForm.get('amcItemList').value
      var patch = this.amcSchemeMasterForm.get('amcItemList') as FormArray;

      var len2=arrayControl.length;
      var labTotal=0; var labDisc=0;var labTax=0;var glabTotal=0;
      var matTotal=0; var matDisc=0;var matTax=0;var gmatTotal=0;
      var amcDisAmount =0; var amcTotAmtlab=0; var amcTotAmtmat=0;


      for (let i = 0; i < len2 ; i++)
      { 
        if(arrayControl[i].couponCode==='Labor') {

          labTotal=labTotal+(arrayControl[i].quantity * arrayControl[i].unitPrice);
          labDisc=labDisc+arrayControl[i].disc;
          labTax=labTax+arrayControl[i].tax;
          glabTotal=glabTotal+arrayControl[i].total;
         
        }
        if(arrayControl[i].couponCode==='Material') {
          matTotal=matTotal+(arrayControl[i].quantity * arrayControl[i].unitPrice);
          matDisc=matDisc+arrayControl[i].discount;
          matTax=matTax+arrayControl[i].taxAmt;
          gmatTotal=gmatTotal+arrayControl[i].netAmt;
        }
      }

                        
          this.amcSchemeMasterForm.patchValue({
            amcLabBasicAmt: Math.round((labTotal+Number.EPSILON)*100)/100,
            amcLabDiscount: Math.round((labDisc+Number.EPSILON)*100)/100,
            amcLabTax: Math.round((labTax+Number.EPSILON)*100)/100,
            amcLabTotal:Math.round((glabTotal+Number.EPSILON)*100)/100,
            amcSchemeTotal:Math.round(((glabTotal+gmatTotal)+Number.EPSILON)*100)/100,

            disAmount:Math.round(((labDisc+matDisc)+Number.EPSILON)*100)/100,
            totAmtlab:Math.round(((labTotal-labDisc)+Number.EPSILON)*100)/100,
            totAmtmat:Math.round(((matTotal-matDisc)+Number.EPSILON)*100)/100,

          });

         
         
    }

      
  getInvItemId($event) {
    let userId = (<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
    this.userList2 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList2 = this.searchFromArray(this.AmcCouponLst, userId);
      }
    }
  }

  searchFromArray(arr, regex) {
    let matches = [];
    // alert("in search array")
    for (let i = 0; i < arr.length; i++) {
      // var itemName=arr[i].itemNumber;
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };


  checkAmcHeaderValidations()
  {

      const formValue: IAmcScheme = this.amcSchemeMasterForm.value;
      // alert("mainModel date :" +formValue.mainModel);

      if(formValue.schemeNumber===undefined || formValue.schemeNumber===null  || formValue.schemeNumber.trim()==='' ) {
          this.amcHeaderValidation=false;
          alert ("SCEHME NUMBER: Should not be null value");
          return; 
      }

      if(formValue.schemeDesc===undefined || formValue.schemeDesc===null  || formValue.schemeDesc.trim()==='' ) {
        this.amcHeaderValidation=false;
        alert ("SCEHME DESCREPTION: Should not be null value");
        return; 
      }

      if(formValue.schemeValidYears===undefined || formValue.schemeValidYears===null  || formValue.schemeValidYears<=0 ) {
        this.amcHeaderValidation=false;
        alert ("SCEHME PERIOD (YRS): Should be above zero");
        return; 
      }

      if(formValue.gracePeriod===undefined || formValue.gracePeriod===null  || formValue.gracePeriod<0 ) {
        this.amcHeaderValidation=false;
        alert ("GRACE PERIOD : Enter Valid Grace Period");
        return; 
      }

      if(formValue.totalPeriod===undefined || formValue.totalPeriod===null  || formValue.totalPeriod<=0 ) {
        this.amcHeaderValidation=false;
        alert ("TOTAL PERIOD : Enter Valid Total Period");
        return; 
      }

      if(formValue.schemeValidKm===undefined || formValue.schemeValidKm===null  || formValue.schemeValidKm<=0 ) {
        this.amcHeaderValidation=false;
        alert ("SCEHME VALID KMS: Should be above zero");
        return; 
      }

    

      if(formValue.discOnMatrl===undefined || formValue.discOnMatrl===null  || formValue.discOnMatrl<0 ) {
        this.amcHeaderValidation=false;
        alert ("MATERIAL DISCOUNT : Enter Valid Discount Percentage");
        return; 
      }

      if(formValue.discOnLabour===undefined || formValue.discOnLabour===null  || formValue.discOnLabour<0 ) {
        this.amcHeaderValidation=false;
        alert ("LABOUR DISCOUNT : Enter Valid Discount Percentage");
        return; 
      }

      var sDate = new Date(formValue.startDate);
      var cDate = new Date();
     
     
      if (formValue.startDate === undefined || formValue.startDate === null || sDate >cDate ) {
        this.amcHeaderValidation = false;
        alert("START DATE: Enter valid  date" );
        this.startDate = this.pipe.transform(cDate, 'y-MM-dd');
        return;
      }

      this.amcHeaderValidation=true;
    


    }


}
