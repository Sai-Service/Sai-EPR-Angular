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
  lstOrderList:any;
  lstItemDetails:any;

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

  orderNumber='TestOrder'
  fromDate=this.pipe.transform(Date.now(), 'y-MM-dd');
  toDate=this.pipe.transform(Date.now(), 'y-MM-dd');

  orderDate=this.pipe.transform(Date.now(), 'y-MM-dd');
  orderStatus:string;
  noMonths:number=3;
  currMonthYN:string='Yes';
  orderValue:number;

  displayButton=true;
  spinIcon=false;
  dispGenOrdButton=true;
  dispShowOrdButton=true;

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
    orderValue:[],



    orderList: this.fb.array([this.lineDetailsGroup()])   

  });
}

lineDetailsGroup() {
  return this.fb.group({ 
    itemId:[''],
    segment :['', [Validators.required]],    
    description:['', [Validators.required]],
    unitPrice:['', [Validators.required]],

    mth1ConWsQty:['', [Validators.required]],
    mth2ConWsQty:['', [Validators.required]],
    mth3ConWsQty:['', [Validators.required]],
    mth1ConsSaleQty:['', [Validators.required]],
    mth2ConsSaleQty:['', [Validators.required]],
    mth3ConsSaleQty:['', [Validators.required]],
    currWsQty:['', [Validators.required]],
    currSaleQty:['', [Validators.required]],
    wsTotCons:['', [Validators.required]],
    csTotCons:['', [Validators.required]],
 
    currentStock: ['', [Validators.required]],
    backOrderQty: ['', [Validators.required]],
    intransitQty: ['', [Validators.required]],
    custBackOrder:['', [Validators.required]],

    orderQty: ['', [Validators.required]],
    totalValue: ['', [Validators.required]],

    // consumption: ['', [Validators.required]],
    // avgConsumption:[],
    // deadStock:[],
   });
}

lineDetailsArray() :FormArray{
  return <FormArray>this.orderGenerationForm.get('orderList')
}


  get f() { return this.orderGenerationForm.controls; }

  orderGeneration(orderGenerationForm:any) {  }

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

transeData(val) {
  delete val.loginArray;
  delete val.loginName;
  delete val.divisionId;
  delete val.division;
  delete val.ouName;
  delete val.locName;
  delete val.locationId;
  delete val.orgId;

  delete val.fromDate;
  delete val.toDate;
  delete val.orderDate;
 
 
 
  delete val.orderList;

  return val;
}


CreateOrder() {
  // this.CheckDataValidations();
  // if (this.checkValidation === true) {
  
    const formValue: IOrderGen = this.transeData(this.orderGenerationForm.value);
    var ordMonths =this.orderGenerationForm.get('noMonths').value

    // alert (  "ts>> Loc Id :" +this.locId + " ," +ordMonths);
    this.dispGenOrdButton=false;

    this.service.orderGenBajaj(formValue,this.locId,ordMonths).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.orderNumber = res.obj;
        this.orderGenerationForm.disable();
         this.displayButton = false;
      } else {
        if (res.code === 400) {
          
          alert('Error While Saving Record:-' + res.obj);
           }
      }
    });
  } 

  ShowOrder(){
    this.spinIcon=true;
    this.dispShowOrdButton=false;
    var mOrderNumber =this.orderGenerationForm.get('orderNumber').value
    this.service.getOrderListBajaj(mOrderNumber)
    .subscribe(
      data => {
        this.lstOrderList = data;
        alert ("Total order lines :" +data.length);
        if(data.length >0) {
         
        console.log(this.lstOrderList);
        var len = this.lineDetailsArray().length;
        var y = 0;
        // alert("this.lstinvoices.length  >>" +this.lstinvoices.length);
       
        for (let i = 0; i < this.lstOrderList.length - len; i++) {
          var ordLnGrp: FormGroup = this.lineDetailsGroup();
          this.lineDetailsArray().push(ordLnGrp);

        }
        this.orderGenerationForm.get('orderList').patchValue(this.lstOrderList);
       } 
        });

        
        
      }


      UpdateTotalConsumption() {

        var len1 = this.lineDetailsArray().length;
        var ordArr =this.orderGenerationForm.get('orderList').value;
        var patch = this.orderGenerationForm.get('orderList') as FormArray;
        for (let i = 0; i < len1; i++) { 
          // alert ("in for :"+ordArr[i].mth1ConWsQty);
          var wsTotCons1=ordArr[i].mth1ConWsQty+ordArr[i].mth2ConWsQty+ordArr[i].mth3ConWsQty+ordArr[i].currWsQty
          var csTotCons1=ordArr[i].mth1ConsSaleQty+ordArr[i].mth1ConsSaleQty+ordArr[i].mth1ConsSaleQty+ordArr[i].currSaleQty
                  
          patch.controls[i].patchValue({wsTotCons:wsTotCons1});
          patch.controls[i].patchValue({csTotCons:csTotCons1});
        }
      }
      

      getItemDetails(itmId){
         this.service.getItemDetail(itmId)
        .subscribe(
          data => {
            this.lstItemDetails = data;
            console.log(this.lstItemDetails);
          });
        }
      

}
