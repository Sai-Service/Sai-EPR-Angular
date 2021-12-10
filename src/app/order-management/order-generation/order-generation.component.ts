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

interface IOrderGen {  }

@Component({
  selector: 'app-order-generation',
  templateUrl: './order-generation.component.html',
  styleUrls: ['./order-generation.component.css']
})

export class OrderGenerationComponent implements OnInit {
  orderGenerationForm : FormGroup;

  pipe = new DatePipe('en-US');
  public minDate = new Date();

  lstClearBackOrder:any;

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

  orderNumber:number;
  fromDate=this.pipe.transform(Date.now(), 'y-MM-dd');
  toDate=this.pipe.transform(Date.now(), 'y-MM-dd');

  orderDate:Date;
  orderStatus:string;
  noMonths:number;
  currMonthYN:string;

  displayButton=true;


  constructor(private service: MasterService,private orderManagementService:OrderManagementService,private transactionService: TransactionService , private  fb: FormBuilder, private router: Router) {
    this.orderGenerationForm = fb.group({

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

    orderNumber:[],
    fromDate:[],
    toDate:[],

    orderStatus:[],
    orderDate:[],
    noMonths:[],
    currMonthYN:[],


    orderList: this.fb.array([this.lineDetailsGroup()])   

  });
}

lineDetailsGroup() {
  return this.fb.group({ 
    itemId:[''],
    // custAccountNo:[],
    segment :['', [Validators.required]],    
    description:['', [Validators.required]],
    currQty: ['', [Validators.required]],
    orderQty: ['', [Validators.required]],
    ordValue: ['', [Validators.required]],
    consumption: ['', [Validators.required]],
    avgConsumption:[],
    deadStock:[],
   });
}

lineDetailsArray() :FormArray{
  return <FormArray>this.orderGenerationForm.get('orderList')
}


  get f() { return this.orderGenerationForm.controls; }

  orderGeneration(orderGenerationForm:any) {  }

  ngOnInit(): void {

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

  SearchByOrderNo(ordNo){
    alert("Search by order number..."+ordNo);
  }

  SearchByDate(dt1,dt2){
    alert("Search by Date..."+dt1 +","+dt2);
  }

  // clearBackOrder1(){
    
  //     this.service.clearBakcOrder(this.locId)
  //       .subscribe(
  //         data => {
  //           this.lstClearBackOrder = data;
  //           console.log(this.lstClearBackOrder);
  //         }
  //       );
  //    }


     clearBackOrder() {
       this.service.clearBakcOrder(this.locId).subscribe((res: any) => {
        if (res.code === 200) {
          // alert('RECORD UPDATED SUCCESSFULLY');
          alert(res.message);
          // window.location.reload();
        } else {
          if (res.code === 400) {
            // alert('ERROR OCCOURED IN PROCEESS');
            alert(res.message);
          }
        }
      });
    }


  newMast() {alert("Create/Update/Cancel/Print order....");}

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }
  addRow(index) {
   var ordLineArr = this.orderGenerationForm.get('orderList').value;
   if( ordLineArr[index].itemId>0) {
    this.lineDetailsArray().push(this.lineDetailsGroup()); 
   }else {alert ("Incomplete Line ");}
}

RemoveRow(index) {
if (index===0){ }
else {
   this.lineDetailsArray().removeAt(index);
}

}

}
