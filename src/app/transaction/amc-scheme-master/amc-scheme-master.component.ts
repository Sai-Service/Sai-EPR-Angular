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

interface IAmcScheme {  }

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
  schemePrd:number;
  gracePrd:number;
  totalPrd:number;
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

  displayButton=true;
  duplicateLineItem=false;

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
    schemePrd:[],
    gracePrd:[],
    totalPrd:[],
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


    amcItemList: this.fb.array([this.lineDetailsGroup()])   

  });
}

lineDetailsGroup() {
    return this.fb.group({ 
    itemId:[''],
    couponId:[''],
    couponNumber:[''],
    couponDesc :['', [Validators.required]],    
    quantity:['', [Validators.required]],
    value:['', [Validators.required]],
    total:['', [Validators.required]],
    couponCode:[],
    gstpercentage:[],
    couponActualCode:[],
    discount:[],
    taxableAmt:[],
    taxAmt:[],
    netAmt:[],

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
 var len = this.lineDetailsArray().length;
//  alert(amcLineArr[index].couponId);
  if( amcLineArr[index].couponId>0) {
 
  this.lineDetailsArray().push(this.lineDetailsGroup()); 
  
 }else {alert ("Incomplete Line - Check Line Details .... ");}
 
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
    }
  


updateMast(){alert("Save ....wip");}


    onOptionAmcCoupenSelected(cpnNumber :any, index) {
    
      let selectedValue = this.AmcCouponLst.find(v => v.couponNumber === cpnNumber);
      if( selectedValue != undefined){

      console.log(selectedValue);
      // alert (selectedValue.couponNumber);
      var arrayControl = this.amcSchemeMasterForm.get('amcItemList').value
      var patch = this.amcSchemeMasterForm.get('amcItemList') as FormArray;
      
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
                value: selectedValue.value,
                total: selectedValue.total,
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
           
             var lineTotal=(arrayControl[i].quantity * arrayControl[i].value);
            
             if(arrayControl[i].couponCode==='Labor') { lineDiscountp= this.discOnLabour;}
             if(arrayControl[i].couponCode==='Material') {lineDiscountp=this.discOnMatrl;}

             var lineDisAmt =lineTotal *lineDiscountp/100;
             var lineTaxable =lineTotal-lineDisAmt;
             var lineTax=(lineTotal-lineDisAmt)* arrayControl[i].gstpercentage/100;
             var lineNetTotal  =lineTaxable+lineTax;

            (patch.controls[i]).patchValue(
              {
                discount: lineDisAmt,
                taxableAmt : lineTaxable,
                taxAmt: lineTax,
                netAmt: lineNetTotal,
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
      for (let i = 0; i < len2 ; i++)
      { 
        if(arrayControl[i].couponCode==='Labor') {

          labTotal=labTotal+(arrayControl[i].quantity * arrayControl[i].value);
          labDisc=labDisc+arrayControl[i].discount;
          labTax=labTax+arrayControl[i].taxAmt;
          glabTotal=glabTotal+arrayControl[i].netAmt;
         
        }
        if(arrayControl[i].couponCode==='Material') {
          matTotal=matTotal+(arrayControl[i].quantity * arrayControl[i].value);
          matDisc=matDisc+arrayControl[i].discount;
          matTax=matTax+arrayControl[i].taxAmt;
          gmatTotal=gmatTotal+arrayControl[i].netAmt;
        }
      }
//  alert ("labTax :"+labTax);
          this.amcSchemeMasterForm.patchValue({
            amcLabBasicAmt:labTotal ,
            amcLabDiscount: labDisc,
            amcLabTax:labTax,
            amcLabTotal:glabTotal,
            amcSchemeTotal:(glabTotal+gmatTotal),
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

}
