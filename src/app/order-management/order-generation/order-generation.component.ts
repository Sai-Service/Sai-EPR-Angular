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

  orderNumber='TestOrder'
  fromDate=this.pipe.transform(Date.now(), 'y-MM-dd');
  toDate=this.pipe.transform(Date.now(), 'y-MM-dd');

  orderDate=this.pipe.transform(Date.now(), 'y-MM-dd');
  orderStatus:string;
  noMonths:number=3;
  currMonthYN:string='Yes';
  orderValue:number;

  displayButton=false;
  spinIcon=false;
  dispGenOrdButton=true;
  dispShowOrdButton=true;
  addNewLine=false;
  lineItemRepeated=false;
  lineValidation=false;
 
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
    sprOrderId:[''],
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
    conWsQty:['', [Validators.required]],
    consSaleQty:['', [Validators.required]],
 
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


 

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }
  addRow(index) {
    this.addNewLine=true;
   var ordLineArr = this.orderGenerationForm.get('orderList').value;
   var len = this.lineDetailsArray().length;
    if( ordLineArr[index].itemId>0  &&  ordLineArr[index].orderQty>0 ) {
   
    this.lineDetailsArray().push(this.lineDetailsGroup()); 
    
   }else {alert ("Incomplete Line - Check Order Part No , Order Qty .... ");}
   
}

RemoveRow(index) {
if (index===0){ }
else {
   this.lineDetailsArray().removeAt(index);
   this.deleteOrderLine(index)

}

}

deleteOrderLine(i) {
  var ordArr = this.orderGenerationForm.get('orderList').value;
  var orderItemId = ordArr[i].itemId;
  var ordNum = this.orderGenerationForm.get('orderNumber').value;
  alert (orderItemId +","+ordNum);

  this.service.orderLineDelete(ordNum,orderItemId).subscribe((res: any) => {
   if (res.code === 200) {
      alert(res.message);
   } else {
     if (res.code === 400) {
       alert(res.message);
     }
   }
 });
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

transeData1(val) {
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
    this.dispGenOrdButton=false;
    var mOrderNumber =this.orderGenerationForm.get('orderNumber').value
    this.service.getOrderListBajaj(mOrderNumber)
    .subscribe(
      data => {
        this.lstOrderList = data;
        // alert ("Total order lines :" +data.length);
        if(data.length >0) {
         this.displayButton=true;
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


      // UpdateTotalConsumption() {

      //   var len1 = this.lineDetailsArray().length;
      //   var ordArr =this.orderGenerationForm.get('orderList').value;
      //   var patch = this.orderGenerationForm.get('orderList') as FormArray;
      //   for (let i = 0; i < len1; i++) { 
      //     // alert ("in for :"+ordArr[i].mth1ConWsQty);
      //     var wsTotCons1=ordArr[i].mth1ConWsQty+ordArr[i].mth2ConWsQty+ordArr[i].mth3ConWsQty+ordArr[i].currWsQty
      //     var csTotCons1=ordArr[i].mth1ConsSaleQty+ordArr[i].mth1ConsSaleQty+ordArr[i].mth1ConsSaleQty+ordArr[i].currSaleQty
                  
      //     patch.controls[i].patchValue({wsTotCons:wsTotCons1});
      //     patch.controls[i].patchValue({csTotCons:csTotCons1});
      //   }
      // }
      

      getItemDetails(itmId){
         this.service.getItemDetail(itmId)
        .subscribe(
          data => {
            this.lstItemDetails = data;
            console.log(this.lstItemDetails);
            // alert ("this.lstItemDetails.segment :"+this.lstItemDetails.segment);
          });
        }

        validateOrdQty(index: any){
          var patch = this.orderGenerationForm.get('orderList') as FormArray;
          var orderLineArr = this.orderGenerationForm.get('orderList').value;
          var lineQty = orderLineArr[index].orderQty;
          if (lineQty <=0 ) 
          {
             alert (lineQty+" << Invalid Order Qty.Order Qty should be above 0")
             patch.controls[index].patchValue({orderQty:0})
          } else {

           var lineValue =orderLineArr[index].orderQty * orderLineArr[index].unitPrice;
          //  alert (index+"-index :"+  lineValue);
           patch.controls[index].patchValue({totalValue:lineValue})
            this.CalculateOrdValue();

          }
                    
        }

        updateOrder() {
          const formValue: IOrderGen = this.transeData1(this.orderGenerationForm.value);

          this.lineValidation=false;
          var orderLineArr = this.orderGenerationForm.get('orderList').value;
          var len1=orderLineArr.length;
          
          for (let i = 0; i < len1 ; i++) 
            {
              this.CheckLineValidations(i);
              if(this.lineValidation===false) {break;}
            }
            
          if(this.lineValidation){
          let variants = <FormArray>this.lineDetailsArray();
          var orderNum = this.orderGenerationForm.get('orderNumber').value;
          for (let i = 0; i < this.lineDetailsArray().length; i++) {
            let variantFormGroup = <FormGroup>variants.controls[i];
            variantFormGroup.addControl('orderNumber', new FormControl(orderNum, Validators.required));
          } 
          console.log(variants.value);

          // this.service.OrderLineAddUpdate(formValue).subscribe((res: any) => {
          this.service.OrderLineAddUpdate(variants.value).subscribe((res: any) => {
           if (res.code === 200) { alert(res.message);  } else  {
           if (res.code === 400) { alert(res.message); }
           }
   
         });
         }  else {alert ("Incomplete line details. Save Failed....")}
        }

         CalculateOrdValue(){
          // var patch = this.orderGenerationForm.get('orderList') as FormArray;
          var orderLineArr = this.orderGenerationForm.get('orderList').value;
          var len = this.lineDetailsArray().length;
          var orderTotal = 0;
        
          for (let i = 0; i < len; i++) {
            var lineValue =orderLineArr[i].orderQty * orderLineArr[i].unitPrice;
             orderTotal=orderTotal+lineValue
           }
          this.orderGenerationForm.patchValue({orderValue:orderTotal})

         }

         

  validateItem(index){  
    var ordLineArr = this.orderGenerationForm.get('orderList').value;
    var patch = this.orderGenerationForm.get('orderList') as FormArray;
    var mSegment = ordLineArr[index].segment;
    mSegment=mSegment.toUpperCase();
    this.lineDetailsArray().controls[index].get('orderQty').disable();
  
    // alert (index+" << in validate itemcode.."+mSegment);
    if(mSegment===null || mSegment===undefined  || mSegment.trim() === '') {
       alert("Please Enter Item Code");
          this.lineDetailsArray().controls[index].get('orderQty').reset();
      return; 
    }

   
    var segId ; 
  
     this.service.getItemDetailsByCode(mSegment)
      .subscribe(
        data => {
           if (data !=null){
            this.lineDetailsArray().controls[index].get('orderQty').enable();
             segId =data.itemId;
             this.duplicateLineCheck(index,segId,mSegment);
             if(this.lineItemRepeated===false) {
             (patch.controls[index]).patchValue(
              {
               
                itemId: data.itemId,
                segment : mSegment,
                description: data.description,
                unitPrice: 1,
                mth1ConWsQty: 0,
                mth2ConWsQty: 0,
                mth3ConWsQty: 0,
                mth1ConsSaleQty: 0,
                mth2ConsSaleQty: 0,
                mth3ConsSaleQty: 0,
                currWsQty: 0,
                currSaleQty: 0,
                conWsQty: 0,
                consSaleQty: 0,
                currentStock: 0,
                backOrderQty: 0,
                intransitQty: 0,
                custBackOrder: 0,
                totalValue: 0,

              }
            );} else {this.lineDetailsArray().controls[index].get('orderQty').disable();
                      this.lineDetailsArray().removeAt(index);
                      }

        } else {
            alert (mSegment + " - Item Not Found in Master"); 
            // this.lineDetailsArray().controls[index].get('itemId').reset();
             var mItemId = ordLineArr[index].itemId;
           
            if(mItemId>0) {
              var segment1;
              this.service.getItemDetail(mItemId) .subscribe( data => { segment1= data.segment;
              patch.controls[index].patchValue({segment:segment1})
            });
            this.lineDetailsArray().controls[index].get('orderQty').enable();

            } else {
            this.lineDetailsArray().controls[index].reset();}
            return;}
        }
      );
  }

  duplicateLineCheck(index,mItem,itemSeg) {
    this.lineItemRepeated=false;
    var ordLineArr = this.orderGenerationForm.get('orderList').value;
    for (let i = 0; i <  this.lineDetailsArray().length ; i++) 
    {
       var x=ordLineArr[i].itemId;
     
       if( i !=index && (x===mItem)) {
        alert(itemSeg+" - Item Already in the List .Check Line :"+(i+1));
        this.lineItemRepeated=true;
        break;
      } 
      }
    }

    CheckLineValidations(i) {
     
      var ordLineArr1 = this.orderGenerationForm.get('orderList').value;
      var lineValue1=ordLineArr1[i].itemId;
      var lineValue2=ordLineArr1[i].segment;
      var lineValue3=ordLineArr1[i].orderQty;
       
     var j=i+1;
      if(lineValue1===undefined || lineValue1===null || lineValue1==='' ){
         this.lineValidation=false;
        return;
      } 
    
      if(lineValue2===undefined || lineValue2===null || lineValue2.trim()===''){
        alert("Line-"+j+ " ITEM CODE :  Enter valid Item Code");
        this.lineValidation=false;
        return;
      } 
    
      if(lineValue3===undefined || lineValue3===null  || lineValue3 <=0){
        alert("Line-"+j+ " ORDER QTY :  should be above Zero");
        this.lineValidation=false;
        return;
      } 
       
      this.lineValidation=true;
    
      }
      

}
