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

  public AmcCouponLst :Array<string> = [];

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

  schemeNumber:string;
  startDate:Date;
  endDate:Date;
  schemeName:string;
  schemePrd:number;
  gracePrd:number;
  totalPrd:number;
  schemeKms:number;
  schemeGrp:string;
  schMatDisPer:number;
  schLabDisPer:number;

  

  amcLabBasicAmt:number=0;
  amcLabDiscount:number=0;
  amdLabTax:number=0;
  amcLabToal:number=0;
  amcMatBasicAmt:number=0;
  amcMatDiscount:number=0;
  amdMatTax:number=0;
  amcMatToal:number=0;
  amcSchemeTotal:number=0;

  displayButton=true;

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

    schemeNumber:[],
    startDate:[],
    endDate:[],
    schemeName:[],
    schemePrd:[],
    gracePrd:[],
    totalPrd:[],
    schemeKms:[],
    schemeGrp:[],
    schMatDisPer:[],
    schLabDisPer:[],

    amcLabBasicAmt:[],
    amcLabDiscount:[],
    amdLabTax:[],
    amcLabToal:[],
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
    itemId:[],
    couponId:[],
    couponNumber:[''],
    couponDesc :['', [Validators.required]],    
    quantity:['', [Validators.required]],
    value:['', [Validators.required]],
    total:['', [Validators.required]],
    couponCode:[],
    gstpercentage:[],
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
  if( amcLineArr[index].cpnId>0  &&  amcLineArr[index].cpnQty>0 &&  
    amcLineArr[index].cpnPrice>0  &&  amcLineArr[index].cpnAmount>0  ) {
 
  this.lineDetailsArray().push(this.lineDetailsGroup()); 
  
 }else {alert ("Incomplete Line - Check Line Details .... ");}
 
}

newMast(){alert("Save ....wip");}

updateMast(){alert("Save ....wip");}


}
