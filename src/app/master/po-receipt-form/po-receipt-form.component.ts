import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { ThemeService } from 'ng2-charts';
import { MasterService } from '../master.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from "@angular/common";
import { data } from 'jquery';
import { formatDate } from '@angular/common'


interface IpoReceipt{
  ouName:string;
  poNumber:string;
  supplier:string;
  item:string;
  segment1:string;
  ouId:number;
  totalAmt:number;
  supplierName:string;
  // totalAmt:number;
  baseAmount:number;
  taxAmt:number;
  subInventoryId:number;
  recDate:Date;
  // recDate: new Date()
  Comments:string;
  suppInvDate:Date;
  suppInvNo:string;
  gstDocNo:string;
  // EwayBill:string;
  ewayBillNo:string;
  docDate:Date;
  ewayBillDate:Date;
  locId:number;
  poHeaderId:number;
  poLineId:number;
    suppNo:number;
  supplierSiteId:number;
  emplId:number;
  totAmount:number;
  invItemId:number;
  billToLoc:number;
  categoryId:number;
  qtyReceived:number;
  polineNum:number;
  locatorId:number;
  poType:string;
  poStatus:string;
  // locatorDesc:any[];
  locatorDesc:string;
  shipmentNumber:string;
}

interface Ilocator {
  segment11:string;
  segment2:string;
  segment3:number;
  segment4:string;
  segment5:number;
}

interface IPODateWise{
frmDate:Date,
toDate:Date,
billToLocId:number;
}

@Component({
  selector: 'app-po-receipt-form,number-pipe', 
  templateUrl: './po-receipt-form.component.html',
  styleUrls: ['./po-receipt-form.component.css']
})
export class PoReceiptFormComponent implements OnInit {
  poReceiptForm: FormGroup;
  ouName:string;
  poNumber:string;
  content:Number;
  subInventory:number;
  title:string;
  submitted = false;
  private sub: any;
  private sub1:any;
  supplier:string;
  item:string;
  segment1:string;
  shipmentNumber:string;
  ouId:number;
  totalAmt:number;
  name:string;
  divisionName:string;
  supplierName:string;
  baseAmount:number;
  taxAmt:number;
  frmDate1:Date;
  shipmentNo:string;
  disabled = true;
  disabledLine =true;
  disabledViewAccounting=true;
  DisplayqtyReceived=true;
  displaylocatorDesc:Array<boolean>=[];;
  // recDate=new Date();
  pipe = new DatePipe('en-US');
  now = Date.now();
  recDate = this.pipe.transform(this.now,'dd-MM-yyyy');
  Comments:string;
  suppInvDate:Date;
  suppInvNo:string;
  gstDocNo:string;
  user:any[];
  // EwayBill:string;
  ewayBillNo:string;
  docDate:Date;
  ewayBillDate:Date;  
  locId:number;
  poHeaderId:number;
  suppNo:number;
  supplierSiteId:number;
  emplId:number;
  totAmount:number;
  invItemId:number;
  billToLoc:number;
  categoryId:number;
  polineNum:number;
  // segment1:string;
  segment2:string;
  segment3:number;
  segment4:string;
  segment5:number;
  segment11:string;
  // locatorDesc:any[];
  locatorDesc:string;
  locatorId:number;
  poType:string;
  poStatus:string;
  receiptNo:number;
  ledgerId:number;
  runningTotalDr:number;
  ctgDescription:string;


  selectAllFlag:string;
  selectFlag:string;
  rcvSupp1:number;
  description:string;
  periodName:string;
  postedDate:Date;
  jeCategory:string;
  name1:string;
  runningTotalCr:number;
  // poStatus:string;
  

  // loginArray: any[];
  loginArray:string;
  public cityList: Array<string>[];
  public poAllRecFind:any[];
  lstcompolines: any;
  public poLines:any[];
   public lstlocationwise:any[];
   public lstcompolines1:any=[];
   public rcvTaxDeatils:[];
   public poTaxDeatils:[];
   public lstSupLineDetails:any[];
   public lstPODateWiseData:any[];
   public lstReceiptDateWiseData:any[];
   public lstPOApproveDateWise:any;
   public ApproveDateWise:any[];
   supplierList:any[];
   lstcomments2: any[];
   lstcomments: any;
   lstcomments1:any[];
   divisionId:any[];
   loginName:string;
   poLineId:number;
   viewAccounting1:any[];
   viewAccounting2:any[];
   displayrecDate=false;
  
  // PO wise Date Paratemeter//////
  frmDate : Date;
  toDate:Date;
 

  xyzdis=false;

  //  supplierSiteId:number;
  //  check box selection
  names: any;
  selectedAll: any;
  selectedNames: any;
  poDate:Date;

  displaySaveButton =false;
  displaysubInvDesc:Array<boolean>=[];
  TRUER=false; recFagDiss=true; 

 
  // recDate=this.pipe.transform(this.recDate,'dd-MM-yyyy');

  constructor(private fb: FormBuilder,private location: Location, private router: Router, private service: MasterService,private router1: ActivatedRoute) {
    this.poReceiptForm = fb.group({
      ouName : [''],
      poNumber:['', Validators.required],
      supplier:[''],
      item:[''],
      segment1:[''],
      shipmentNumber:[],
      ouId:[''],
      totalAmt:[''],
      divisionName:[''],
      supplierName:[''],
      baseAmount:[''],
      taxAmt:[''],
      recDate:[''],
      Comments:['',Validators.required],
      suppInvDate:[''],
      suppInvNo:[''],
      gstDocNo:[''],
      ewayBillNo:[''],
      docDate:[''],
      ewayBillDate:[''],
      locId:[''],
      poHeaderId:[''],
      suppNo:[''],
      supplierSiteId:[''],
      emplId:[''],
      loginArray:[''],
      loginName:[''],
      poType:[''],
      poStatus:[''],
      receiptNo:[''],
      selectAllFlag:[''],
      rcvSupp1:[''],
      frmDate :[''],
      toDate:[''],
      frmDate1:[''],
      poDate:[''],
      description:[''],
      periodName:[''],
      postedDate:[''],
      jeCategory:[''],
      ledgerId:[''],
      name1:[''],
      runningTotalDr:[''],
      runningTotalCr:[''],
      shipmentNo:[''],
      segment3:[],
      segment11:[],
      segment2:[],
      segment4:[],
      segment5:[],
      locatorDesc:[],
      poLines: this.fb.array([this.lineDetailsGroup()]),
    })
   }

   lineDetailsGroup() {
    return this.fb.group({
      poLineId:[],
      poHeaderId:[],
      orderedQty: [],
      itemType:[],
      itemName:[],
      taxCategoryName:[],
      ctgDescription:[],
      itemDesc:[],
      subInvDesc:[],
      subInventoryId:[''],
      cgstAmt:[''],
      sgstAmt:[''],
      igstAmt:[''],
      // subInventoryId:[],
      locatorDesc:['',[Validators.required]],
      uom:[],
      unitPrice:[],
      taxPercentage:[],
      taxAmount:[],
      sacCode:[],
      totalAmt:[],
      poChargeAcc:[],
      qtyReceived:[],
      locId:[],
      baseAmount:[],
      totAmount:[],
      invItemId:[''],
      billToLoc:[''],
      categoryId:[''],
      segment11:['',[Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
      segment2:['',[Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
      segment3:['',[Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
      segment4:['',[Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
      segment5:['',[Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
      polineNum:[''],
      locatorId:[''],
      selectFlag:[],
    });
  }
  get lineDetailsArray() {
    return <FormArray>this.poReceiptForm.get('poLines')
  }


  //  selectAll() {
  //   this.selectedAll = !this.selectedAll;

  //   for (var i = 0; i < this.names.length; i++) {
  //       this.names[i].selected = this.selectedAll;
  //   }
  
  selectAll(e) {
    // alert(e.target.checked);
    let control=this.poReceiptForm.get('poLines') as FormArray;
    
    if ( e.target.checked === true){
        this.recFagDiss=false;
  }
  else {
    this.recFagDiss=true;
  }
  }
  
checkIfAllSelected() {
  var totalSelected =  0;
  for (var i = 0; i < this.names.length; i++) 
    {
        if(this.names[i].selected) totalSelected++;
    } 
      this.selectedAll = totalSelected === this.names.length;
      return true;
}







   get f() { return this.poReceiptForm.controls; }

   poReceipt(poReceiptForm: any) {

  }


  ngOnInit(): void {
    // this.lstPOApproveDateWise.obj= [];
    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
   this.loginName=sessionStorage.getItem('name')
   this.ouName = (sessionStorage.getItem('ouName'));
   this.locId=Number(sessionStorage.getItem('locId'));
    this.emplId= Number(sessionStorage.getItem('emplId'));
    console.log(this.loginArray);
    console.log(this.locId);
    console.log(this.emplId);


    
    // this.poReceiptForm.patchValue(this.lstcomments1.user);
    // var divisionCode = this.lstcomments1.user.divisionCode;
    //  console.log(divisionCode);
    // var locId = this.lstcomments1.user.locId;
    // console.log(locId);


    // this.lstcomments= [];

    this.service.cityList()
    .subscribe(
      data => {
        this.cityList = data;
        console.log(this.cityList);
      }
    );


    this.sub1 = this.router1.queryParams.subscribe(params => { 
      // this.shipmentNumber = params.get('shipmentNumber');
      this.shipmentNumber=this.router1.snapshot.queryParamMap.get('shipmentNumber');
      // alert(this.shipmentNumber);
      this.poReceiptForm.patchValue({shipmentNumber:this.shipmentNumber})
      this.shipmentNoFind(this.shipmentNumber);
    })
    
    
   

    
    this.sub = this.router1.params.subscribe(params => {
      this.segment1 = params['segment1'];
      // alert(this.segment1);
      console.log(this.poReceiptForm.value);
    this.service.getsearchByPOlines(this.segment1)
      .subscribe(
        data => {
          if (data.code===400){
            alert(data.message);
            // alert(data.obj);
          }
          if(data.code ===200){
            this.lstcompolines = data.obj;
            // alert(data.obj.poLines.length)
          if(this.lstcompolines.poStatus==='FULLY RECEIVED'){
            console.log(this.poStatus);
            this.displaySaveButton =true; 
            this.disabled = false;
              this.disabledLine=false;
              let control = this.poReceiptForm.get('poLines') as FormArray;
          var poLines:FormGroup=this.lineDetailsGroup();
          var length1=this.lstcompolines.poLines.length-1;
          this.lineDetailsArray.removeAt(length1);
          control.push(poLines);
          
          this.displaySaveButton =false;
          this.poReceiptForm.patchValue(this.lstcompolines);
          
          }
          else{
            const invCategory = data.obj.poLines[0].ctgDescription.substr(0, 3);
          // alert(invCategory);
          if(this.ctgDescription==='MCH'){
          this.lstcompolines = data.obj;
          this.disabled = true;
          this.disabledLine=true;
          this.DisplayqtyReceived=true;
          let control = this.poReceiptForm.get('poLines') as FormArray;
          var poLines:FormGroup=this.lineDetailsGroup();
          var length1=this.lstcompolines.poLines.length-1;
          this.lineDetailsArray.removeAt(length1);
          control.push(poLines);
          this.displaySaveButton =true;
          this.poReceiptForm.patchValue(this.lstcompolines);
          qtyReceived: 1;
        }
        else{
          this.lstcompolines = data.obj;
          this.disabled = true;
          this.DisplayqtyReceived=false;
          this.disabledLine=true;
          let control = this.poReceiptForm.get('poLines') as FormArray; 
          // var length1=this.lstcompolines.poLines.length-1;
          // this.lineDetailsArray.removeAt(length1);
          this.lineDetailsArray.clear();
          // alert(data.obj.poLines.length);
          for (let i=0 ; i<this.lstcompolines.poLines.length;i++){
            var poLines:FormGroup=this.lineDetailsGroup();
            control.push(poLines);
            if (data.obj.poLines[i].itemType==='EXPENCE'){
              this.displaysubInvDesc[i]=true;
              this.displaylocatorDesc[i]=true;
            }
          }
          this.displaySaveButton =true;
          this.poReceiptForm.patchValue(this.lstcompolines);
          let controlinv = this.poReceiptForm.get('poLines') as FormArray;
         
          for (let j=0; j<data.obj.poLines.length;j++){
            // alert(data.obj.poLines[j].subInventoryId);
            (controlinv.controls[j]).patchValue({
              subInventoryId: data.obj.poLines[j].subInventoryId,    
            });
            // this.lineDetailsGroup().patchValue({subInvetoryId:data.obj.poLines[j].subInventoryId})
          }
        }
        }
      }
    }
  );
  });
alert('dd -' + this.recDate);

this.poReceiptForm.controls.recDate.setValue(formatDate(this.recDate,'dd-MM-yyyy','en'));
    
  }

  currentDate = new Date();

  clear(){}
 

  suppFind(rcvSupp1){
    this.displaySaveButton =false;
    // alert(rcvSupp1);
    console.log(this.poReceiptForm.value);
    this.service.getsearchByRcvSupp(rcvSupp1)
      .subscribe(
        data => {
          if (data.code===400){
            alert(data.message);
            // alert(data.obj);
          }
          if(data.code ===200){
            this.lstSupLineDetails=data.obj;
          this.poReceiptForm.patchValue(this.lstSupLineDetails);
          this.locatorDesc=this.lstcompolines.rcvLines[0].locatorDesc;
          this.recDate=this.lstcompolines.receiptDate;
        }
      }
      );
      
  }

  ReceiptFind(segment1){
    this.lineDetailsArray.clear();
    this.displaySaveButton =false;
    // alert(segment1);
    console.log(this.poReceiptForm.value);
    this.service.getsearchByReceiptNo(segment1,(sessionStorage.getItem('locId')))
      .subscribe(
        data => {
          if (data.code===200){
            this.lstcompolines = data.obj;
            let control = this.poReceiptForm.get('poLines') as FormArray;
            for ( var i=0;i<this.lstcompolines.rcvLines.length;i++){
              var poLines:FormGroup=this.lineDetailsGroup();
              control.push(poLines);
            }
          this.disabled = false;
          this.disabledLine=false;
          this.disabledViewAccounting=false;
            this.poReceiptForm.get('poLines').patchValue(this.lstcompolines.rcvLines);
            this.poReceiptForm.patchValue(this.lstcompolines);
            this.locatorDesc=this.lstcompolines.rcvLines[0].locatorDesc;
            this.recDate=this.lstcompolines.receiptDate;
            this.poReceiptForm.patchValue({taxAmt:this.lstcompolines.totalTax});
            for (let j=0; j<data.obj.poLines.length;j++){
              this.lineDetailsArray[i].patchValue({subInventoryId:data.obj.poLines[i].subInventoryId})
            }
            // this.poReceiptForm.patchValue({subinventoryId:data.obj.poLines[i].subInventoryId})
          }
          else if(data.code===400){
            alert(data.message)
          } 
        }
        
        ); 
          
  }

 

  poFind(segment1) {
    // alert(segment1);

    console.log(this.poReceiptForm.value);
    this.service.getsearchByPOlines(segment1)
      .subscribe(
        data => {
          if (data.code===400){
            alert(data.message);
            // alert(data.obj);
          }
          if(data.code ===200){
            this.lstcompolines = data.obj;
            this.lineDetailsArray.clear();
            // alert( this.lstcompolines.receiptNo);
          if(this.lstcompolines.poStatus==='FULLY RECEIVED'){
            console.log(this.poStatus);
            this.displaySaveButton =true; 
            this.disabled = false;
              this.disabledLine=false;
              let control = this.poReceiptForm.get('poLines') as FormArray;
          // var length1=this.lstcompolines.poLines.length-1;
          // this.lineDetailsArray.removeAt(length1);
          for (let i=0 ; i<this.lstcompolines.poLines.length;i++){
            var poLines:FormGroup=this.lineDetailsGroup();
            control.push(poLines);
            // debugger;
          }
          this.displaySaveButton =false;
          this.poReceiptForm.patchValue(this.lstcompolines);
          }
          else{
            const invCategory = data.obj.poLines[0].ctgDescription.substr(0, 3);
          // alert(invCategory);
          if(this.ctgDescription==='MCH'){
          this.lstcompolines = data.obj;
          this.disabled = true;
          this.disabledLine=true;
          this.DisplayqtyReceived=true;
          let control = this.poReceiptForm.get('poLines') as FormArray;
          // var length1=this.lstcompolines.poLines.length-1;
          // this.lineDetailsArray.removeAt(length1);
          for (let i=0 ; i<this.lstcompolines.poLines.length;i++){
            var poLines:FormGroup=this.lineDetailsGroup();
            control.push(poLines);
          }
          this.displaySaveButton =true;
          this.poReceiptForm.patchValue(this.lstcompolines);
          qtyReceived: 1;
        }
        else{
          this.lstcompolines = data.obj;
          this.disabled = true;
          this.DisplayqtyReceived=false;
          this.disabledLine=true;
          let control = this.poReceiptForm.get('poLines') as FormArray;
          // debugger;
          // var length1=this.lstcompolines.poLines.length-1;
          // this.lineDetailsArray.removeAt(length1);
          for (let i=0 ; i<this.lstcompolines.poLines.length;i++){
            var poLines:FormGroup=this.lineDetailsGroup();
            control.push(poLines);
            if (data.obj.poLines[i].itemType==='EXPENCE'){
              this.displaysubInvDesc[i]=true;
              this.displaylocatorDesc[i]=true;
            }
          }
          this.displaySaveButton =true;
          this.poReceiptForm.patchValue(this.lstcompolines);
          let controlinv = this.poReceiptForm.get('poLines') as FormArray;
         
          for (let j=0; j<data.obj.poLines.length;j++){
            (controlinv.controls[j]).patchValue({
              subInventoryId: data.obj.poLines[j].subInventoryId,    
            });
          }
          // this.locatorDesc.push(this.lstcompolines.rcvLines[0].locatorDesc);
        }
        }
      }
    }
      );
    }

taxDeatils(poHeaderId,poLineId){
  alert(this.lstcompolines.receiptNo);
if(this.lstcompolines.receiptNo != null){
  for (let i=0;i<this.lstcompolines.length;i++ ){
    const rcvtrxLineId=this.lstcompolines.rcvLines[i].shipLineId;
  const rcvtrxId=this.lstcompolines.shipHeaderId;
  alert(rcvtrxId +'-----'+ rcvtrxLineId)
    this.service.receiptdonetaxDeatils(rcvtrxId,rcvtrxLineId)
    .subscribe((res: any) => {
      if (res.code === 200) {
      this.rcvTaxDeatils = res.obj.rcvLines;
      console.log(this.rcvTaxDeatils);
      }
      else  { if (res.code === 400) {
        alert('Error : ' + res.message);
      }
      }
      // this.poReceiptForm.patchValue(this.lstcompolines);
    }
  );
  }
}
else{

}
}
 
    shipmentNoFind(shipmentNumber:String) {
      console.log(this.poReceiptForm.value);
      this.service.getsearchByshipmentNo(shipmentNumber)
        .subscribe(
          data => {
            if (data.code===400){
              alert(data.message);
              // alert(data.obj);
            }
            if(data.code ===200){
              this.lineDetailsArray.clear();
              this.lstcompolines = data.obj;
            if(this.lstcompolines.poStatus==='Receipt Generated'){
              console.log(this.poStatus);
              this.displaySaveButton =true; 
              this.disabled = false;
                this.disabledLine=false;
                let control = this.poReceiptForm.get('poLines') as FormArray;
            // var poLines:FormGroup=this.lineDetailsGroup();
            // var length1=this.lstcompolines.poLines.length-1;
            // this.lineDetailsArray.removeAt(length1);
            // control.push(poLines);
            for (let i=0 ; i<this.lstcompolines.poLines.length;i++){
              var poLines:FormGroup=this.lineDetailsGroup();
              control.push(poLines);
              // debugger;
            }
            this.displaySaveButton =false;
            this.poReceiptForm.patchValue(this.lstcompolines);
            }
            else{
            this.lstcompolines = data.obj;
            this.disabled = true;
            this.disabledLine=true;
            let control = this.poReceiptForm.get('poLines') as FormArray;
            // var poLines:FormGroup=this.lineDetailsGroup();
            // var length1=this.lstcompolines.poLines.length-1;
            // this.lineDetailsArray.removeAt(length1);
            // control.push(poLines);
            for (let i=0 ; i<this.lstcompolines.poLines.length;i++){
              var poLines:FormGroup=this.lineDetailsGroup();
              control.push(poLines);
              // debugger;
            }
            this.displaySaveButton =true;
            this.poReceiptForm.patchValue(this.lstcompolines);
            this.locatorDesc=this.lstcompolines.rcvLines[0].locatorDesc;
            this.recDate=this.lstcompolines.receiptDate;
  
          }
          }
        }
        );
      }
  


  poFind1(segment1) {
    this.displaySaveButton =false;
    // alert(segment1);
    console.log(this.poReceiptForm.value);
    this.service.getsearchByPOlines(segment1)
      .subscribe(
        data => {
          if (data.code===400){
            alert(data.message);
            // alert(data.obj);
          }
          if(data.code ===200){
          // this.lstcompolines = data.obj;
          this.lineDetailsArray.clear();
          this.lstcompolines = data.obj;
          let control = this.poReceiptForm.get('poLines') as FormArray;
          var poLines:FormGroup=this.lineDetailsGroup();
          // var length1=this.lstcompolines.poLines.length-1;
          // this.lineDetailsArray.removeAt(length1);
          this.disabled = false;
          this.disabledLine=false;
          // control.push(poLines);
          for (let i=0 ; i<this.lstcompolines.poLines.length;i++){
            var poLines:FormGroup=this.lineDetailsGroup();
            control.push(poLines);
            // debugger;
          }
          this.poReceiptForm.patchValue(this.lstcompolines);
          let controlinv = this.poReceiptForm.get('poLines') as FormArray;
         
          for (let j=0; j<data.obj.poLines.length;j++){
            (controlinv.controls[j]).patchValue({
              subInventoryId: data.obj.poLines[j].subInventoryId,    
            });
          }
          this.locatorDesc=this.lstcompolines.poLines[0].locatorDesc;
          this.recDate=this.lstcompolines.receiptDate;
        }
      }
      );
      
  }

  poFind11(segment1) {
    this.displaySaveButton =true;
    // alert(segment1);
    console.log(this.poReceiptForm.value);
    this.service.getsearchByPOlines(segment1)
      .subscribe(
        data => {
          if (data.code===400){
            alert(data.message);
            // alert(data.obj);
          }
          if(data.code ===200){
          // this.lstcompolines = data.obj;
          this.lineDetailsArray.clear();
          this.lstcompolines = data.obj;
          let control = this.poReceiptForm.get('poLines') as FormArray;
          // var poLines:FormGroup=this.lineDetailsGroup();
          // var length1=this.lstcompolines.poLines.length-1;
          // this.lineDetailsArray.removeAt(length1);
          this.disabled = false;
          this.disabledLine=false;
          for (let i=0 ; i<this.lstcompolines.poLines.length;i++){
            var poLines:FormGroup=this.lineDetailsGroup();
            control.push(poLines);
            // debugger;
          }
          // control.push(poLines);
          this.poReceiptForm.patchValue(this.lstcompolines);
          let controlinv = this.poReceiptForm.get('poLines') as FormArray;
         
          for (let j=0; j<data.obj.poLines.length;j++){
            (controlinv.controls[j]).patchValue({
              subInventoryId: data.obj.poLines[j].subInventoryId,    
            });
          }
          this.locatorDesc=this.lstcompolines.rcvLines[0].locatorDesc;
          this.recDate=this.lstcompolines.receiptDate;
        }
      }
      );
      
  }

  PODateWise(){
    this.displaySaveButton =false;
    var frmDate=this.poReceiptForm.get('frmDate').value;
    // alert(frmDate);
    const formValue: IPODateWise = (this.poReceiptForm.value);
    formValue.toDate=frmDate;
    formValue.billToLocId=this.locId;
    var reqArr = [];
    reqArr.push({
       frmDate: formValue.frmDate,
       toDate: formValue.frmDate,
      // toDate:'2021-02-05',
       billToLocId:this.locId
});
// then to get the JSON string
var jsonString = JSON.stringify(reqArr);
    this.service.poDateWiseFind(reqArr[0]).subscribe((res: any) => {
      this.lstPODateWiseData=res;
    });
  }


  POApproveDateWise(){
    this.displaySaveButton =false;
    this.service.POApproveDateWise(this.poDate,this.locId)
    .subscribe(
      data => {
        // var ApproveDateWise=data;
        this.lstPOApproveDateWise = data;
        this.ApproveDateWise = this.lstPOApproveDateWise.obj;
    //  this.lstPOApproveDateWise=ApproveDateWise[0].obj;

        console.log(this.lstPOApproveDateWise);
      }
    );
  }



  xyz(e){

if (e.target.value===''){
this.xyzdis=true;
}
  }

  ReceiptDateWiseFind(){
    this.displaySaveButton =false;
    var frmDate=this.poReceiptForm.get('frmDate1').value;
    // alert(frmDate);
    const formValue: IPODateWise = (this.poReceiptForm.value);
    formValue.toDate=frmDate;
    formValue.billToLocId=this.locId;
    var reqArr = [];
    reqArr.push({
       frmDate: frmDate,
       toDate: formValue.toDate,
      // toDate:'2021-02-05',
       billToLocId:this.locId
});
// then to get the JSON string
var jsonString = JSON.stringify(reqArr);
    this.service.receiptDateWiseFind(reqArr[0]).subscribe((res: any) => {
      this.lstReceiptDateWiseData=res;
      this.locatorDesc=this.lstcompolines.rcvLines[0].locatorDesc;
          this.recDate=this.lstcompolines.receiptDate;
    });
  }

  close(){
    // this.router.navigate(['login']);
    // this.router.navigate(['admin']);
    this.location.back();
  }

  okLocator(i){
  // this.lstcompolines.poLines[i].subinvetoryId;
console.log(this.lstcompolines.poLines[0].subInventoryId);

    var poControls=this.poReceiptForm.get('poLines').value;
    // var subinvetoryId = 
    // alert(this.lstcompolines.poLines[0].subInventoryId);
    poControls[i].locatorDesc=
    this.poReceiptForm.get('segment11').value+'.'+
    this.poReceiptForm.get('segment2').value+'.'+
    this.poReceiptForm.get('segment3').value+'.'+
    this.poReceiptForm.get('segment4').value+'.'+
    this.poReceiptForm.get('segment5').value;
    var locatorDesc=poControls[i].locatorDesc;
    this.service.getLocatorPoLines(locatorDesc,this.locId,this.lstcompolines.poLines[0].subInventoryId)
    .subscribe((res: any) => {
          if (res.code === 200) {
            alert(res.message);
          var patch = this.poReceiptForm.get('poLines') as FormArray;
          (patch.controls[i]).patchValue({
            locatorDesc: res.obj.segmentName,
            locatorId:res.obj.locatorId,
          });
          }
          else  { if (res.code === 400) {
            alert('Error : ' + res.message);
          }
          }
          // this.poReceiptForm.patchValue(this.lstcompolines);
        }
      );
  }


  openLocator(i){
    let locatorDesc=this.lineDetailsArray.controls[i].get('locatorDesc').value;
    // alert(locatorDesc);
    if (locatorDesc != null){
      var temp=locatorDesc.split('.');
      this.segment11=temp[0];
      this.segment2=temp[1];
      this.segment3=temp[2];
      this.segment4=temp[3];
      this.segment5=temp[4];
    }
    this.content = i;
    let a = i + 1
    this.title = "Locator :" + a;
  }

  calculation(i,qty){
    // alert(this.lstcompolines.poLines[i].qtyReceived);
    var patch = this.poReceiptForm.get('poLines') as FormArray;
    let quantity=this.lineDetailsArray.controls[i].get('qtyReceived').value;
    // alert(quantity); 
    let unitPrri=this.lineDetailsArray.controls[i].get('unitPrice').value;
    let taxPer=this.lineDetailsArray.controls[i].get('taxPercentage').value;
    // this.lineDetailsArray.controls[i]
  var baseAmt = unitPrri * quantity
var taxAmt =baseAmt*taxPer/100;
   (patch.controls[i]).patchValue({ 
    // baseAmount: baseAmt,  
    // taxAmount : taxAmt,
    // totAmount: baseAmt +taxAmt,
    baseAmount:  Math.round(((baseAmt) + Number.EPSILON) * 100) / 100,
    taxAmount:  Math.round(((taxAmt) + Number.EPSILON) * 100) / 100,
    totAmount:  Math.round(((baseAmt +taxAmt) + Number.EPSILON) * 100) / 100,
   });
  //  alert("Validate");
   var trxLnArr=this.poReceiptForm.get('poLines').value;
   var trxLnArr1=this.poReceiptForm.get('poLines') as FormArray
   let toBeIssuequantity=this.lstcompolines.poLines[i].qtyReceived;
  // var receivedqty=this.poReceiptForm.get('poLines').value.qtyReceived;
  //  let qty=trxLnArr[i].qtyReceived;  
  // alert(quantity+'receivedqty');
  // alert(toBeIssuequantity +' qty');
   if(toBeIssuequantity<quantity)
   {
     alert("You can not enter more than available quantity");
     trxLnArr1.controls[i].patchValue({qtyReceived:''});
     qty.focus();
    // this.displaySaveButton =false;   
   }
   if(quantity<=0)
   {
     alert("Please enter quantity more than zero");
     trxLnArr1.controls[i].patchValue({qtyReceived:''});
     qty.focus();
    //  this.displaySaveButton =false;
   }
// else{
//   this.displaySaveButton =true;
// }
  }

  Select(suppSiteId: number) {
      }

refresh()
      {
        window.location.reload();
      }


     
     

      // onKey(event: any) {
      //   const aaa = this.segment1 + '.' + this.segment2 + '.' + this.segment3 + '.' + this.segment4 + '.' + this.segment5;
      //   this.segmentName = aaa;
      // }

      // onKey(event: any){
      //   alert('only tab')
      // }


//       validate(i:number,qty1)
// {alert("Validate");
//   var trxLnArr=this.poReceiptForm.get('poLines').value;
//   var trxLnArr1=this.poReceiptForm.get('poLines') as FormArray
//   let avalqty=trxLnArr[i].qtyReceived;
//   let qty=trxLnArr[i].qtyReceived;  
//  alert(avalqty+'avalqty');
//  alert(trxLnArr[i].primaryQty +' qty');
//   if(qty>avalqty)
//   {
//     alert("You can not enter more than available quantity");
//     trxLnArr1.controls[i].patchValue({primaryQty:''});
//     qty1.focus();
//   }
//   if(qty<=0)
//   {
//     alert("Please enter quantity more than zero");
//     trxLnArr1.controls[i].patchValue({primaryQty:''});
//     qty1.focus();
//   }
  
// }


      poSave(){
        const loctorDesc=this.poReceiptForm.get('poLines').value;
      //   for (let i=0; i < loctorDesc[i].length;i++){
      //   var locatorDesc=this.lineDetailsArray[i].get('locatorDesc').value;
      //   // if (locatorDesc=== undefined){
      //   //   alert('Please Entered Locator Description !');
      //   //   return
      //   // }
      // }
       
        this.displaySaveButton =false;
        const totlCalControls=this.poReceiptForm.get('poLines').value;
        this.baseAmount=0;
        this.taxAmt=0;
        this.totalAmt=0; 
        for (var i=0;i<totlCalControls.length;i++)   {
          this.baseAmount=this.baseAmount+totlCalControls[i].baseAmount;
          this.taxAmt=this.taxAmt+totlCalControls[i].taxAmount;
          
        }
        this.totalAmt=this.baseAmount+this.taxAmt;
        // const formValue: IpoReceipt = this.transData(this.poReceiptForm.value);
        const formValue: IpoReceipt = this.poReceiptForm.value;
        // formValue.qtyReceived=totlCalControls[i].qtyReceived;
        formValue.baseAmount=this.baseAmount;
        formValue.taxAmt=this.taxAmt;
        formValue.totalAmt=this.totalAmt;
        // formValue.subinvetoryId=this.ls
this.locId=Number(sessionStorage.getItem('locId'));
// alert(this.lstcompolines.poLines[i].qtyReceived)
        // }
        console.log(this.lstcompolines);
        // delete formValue.locatorDesc;
        
    this.service.poSaveSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.receiptNo=res.obj;
        this.ReceiptFind(res.obj)
        // var recDate1= new Date()
      //  this.poReceiptForm.patchValue({recDate:recDate1})
        this.disabled = false;
        this.disabledLine=false;
        this.disabledViewAccounting=false;
        alert(res.message);
        // this.poFind(this.segment1)
        // this.poReceiptForm.reset();
      } else {
        if (res.code === 400) {
          alert(res.message);
          window.location.reload();
          // this.poReceiptForm.reset();
        }
      }
    });
      }

viewAccounting(receiptNo:any){
  // alert(receiptNo);
  this.service.viewAccounting1(receiptNo).subscribe((res: any) => {
    if (res.code === 200) {
      this.viewAccounting2=res.obj;
      this.description=res.obj.description;
      this.periodName=res.obj.periodName;
      this.postedDate=res.obj.postedDate;
      this.jeCategory=res.obj.jeCategory;
      this.name1=res.obj.name;
      this.ledgerId=res.obj.ledgerId;
      this.runningTotalDr=res.obj.runningTotalDr;
      this.runningTotalCr=res.obj.runningTotalCr;
      console.log(this.description);
      
          this.viewAccounting1=res.obj.glLines;
          console.log(this.viewAccounting1);
          alert(res.message);
        } else {
          if (res.code === 400) {
            alert(res.message);
          }
        }
      });
  }

  poInvoiceCreation(segment1:any){
    // alert(this.segment1);
    this.service.poinvCre(segment1).subscribe((res: any) => {
      if(res.code===200){
      alert(res.message);
    }
    else{
      if(res.code===400){
        alert(res.message);
      }
    }
    })
  }


  poAllFind(segment1 : any){
    // alert(this.segment1);
    // this.poNumber=this.poNumber;
    this.service.poAllRecFind(segment1,(sessionStorage.getItem('locId'))).subscribe((res: any) => {
      if (res.code === 200) {
        this.poAllRecFind=res.obj;
        console.log(this.poAllRecFind);
            // alert(res.message);
          } else {
            if (res.code === 400) {
              alert(res.message);
            }
          }
        });

  }  


  grrReceiptPrint(){
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.service.downloadgrrPrint(this.receiptNo)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      });
  }

}


