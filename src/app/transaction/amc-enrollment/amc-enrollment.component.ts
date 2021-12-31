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

interface IAmcEnroll {  }

@Component({
  selector: 'app-amc-enrollment',
  templateUrl: './amc-enrollment.component.html',
  styleUrls: ['./amc-enrollment.component.css']
})
export class AmcEnrollmentComponent implements OnInit {

  amcEnrollmentForm : FormGroup;

  pipe = new DatePipe('en-US');
  public minDate = new Date();

  lstClearBackOrder:any;
  lstOrderList:any;
  public lstItemDetails:any;

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

  amcNumber :string;
  amcDate:Date;
  saName:string;
  regNo:string;
  custNo :string;
  custName:string;
  contactNo:string;
  custAddress:string;

  schemeGrp:string;
  schemeNo :string;
  startDate:Date;
  endDate :Date;
  startKms:number;
  endKms:number;

  

  displayButton=true;

  constructor(private service: MasterService,private orderManagementService:OrderManagementService,private transactionService: TransactionService , private  fb: FormBuilder, private router: Router) {
    this.amcEnrollmentForm = fb.group({

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

    amcNumber :[],
    amcDate:[],
    saName:[],
    regNo:[],

    custNo :[],
    custName:[],
    contactNo:[],
    custAddress:[],

    schemeGrp:[],
    schemeNo :[],
    startDate:[],
    endDate :[],
    startKms:[],
    endKms:[],
  



    amcItemList: this.fb.array([this.lineDetailsGroup()])   

  });
}

lineDetailsGroup() {
  return this.fb.group({ 
    cpnId:[],
    cpnNumber:[''],
    cpnDesc :['', [Validators.required]],    
    cpnQty:['', [Validators.required]],
    cpnPrice:['', [Validators.required]],
    cpnUtilQty:['', [Validators.required]],
    cpnBalQty:['', [Validators.required]],
    cpnAmount:['', [Validators.required]],
   });
}

lineDetailsArray() :FormArray{
  return <FormArray>this.amcEnrollmentForm.get('amcItemList')
}


get f() { return this.amcEnrollmentForm.controls; }

amcEnrollment(amcEnrollmentForm:any) {  }

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
}



resetMast() {
  window.location.reload();
}

closeMast() {
  this.router.navigate(['admin']);
}


}
