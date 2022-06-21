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

interface IRtnToVendor { 
  searchCntrSaleOrderNo:number;
}

@Component({
  selector: 'app-counter-sale-return',
  templateUrl: './counter-sale-return.component.html',
  styleUrls: ['./counter-sale-return.component.css']
})
export class CounterSaleReturnComponent implements OnInit {
  counterSaleReturnOrderForm : FormGroup;

  lstOrderHeader: any;
  lstOrderItemLines:any;

  viewAccounting1: any[];
  viewAccounting2: any[];
  
  lstOrderLines: any;
  lstCntrRtnDetails:any;
  lstCreditNotes:any;

  pipe = new DatePipe('en-US');

  searchCntrSaleOrderNo:number;
  // searchCntrSaleOrderNo=2021101121169;

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
  orderedDate :Date;
  orderTypeId:number;
  trxNumber:number;
  customerId: number;
  custType: string;
  custAccountNo:number;
  custName:string;
  custAddress:string;

  subtotal:number;
  totTax:number;
  totAmt:number;
  disAmt:number;
  disPer:number;
  discType :string;

  rtnDocNo:string;
  rtnDocDate=this.pipe.transform(Date.now(), 'dd-MM-yyyy');
  rtnBaseAmt:number;
  rtnTaxAmt:number;
  rtnTotAmt:number;
  rtnDisAmt:number;

  rtnFromDate=this.pipe.transform(Date.now(), 'y-MM-dd');
  rtnToDate=this.pipe.transform(Date.now(), 'y-MM-dd');
  public minDate = new Date();

  compId :number;
  headerId :number;
  transactionTypeName :string;
  createOrderType:string;
  priceListId :number;
  priceListName :string;
  paymentTermId :number;
  paymentType :string;
  billToLocId :number;
  shipToLocId :number;
  billLocName :string;
  shipLocName :string;
  locCode :string;
  salesRepId:number;
  salesRepName:string;
  flowStatusCode :string;
  tlName :string;
  remarks :string;
  // remarks='2021101121227';

  othRefNo :string;
  issuedBy:string;
  mobile1 :number;
  orderStatus :string;
  invType :string;
  refCustNo 
  issueCodeType :string;
  siteName :string;
  gatePassYN :string;
  customerSiteId :number;
  custPoNumber :string;
  custPoDate :Date

  ledgerId:number;
  docSeqValue:string;
  description: string;
  periodName: string;
  postedDate: Date;
  jeCategory: string;
  name1: string;
  runningTotalCr: number;
  runningTotalDr: number;


  displayButton = true;
  validateStatus = false;
  saveButton = false;
  enableCheckBox=true;
  showAllItem=false;
  rtnLineValidation=true;
  indReturn=false;
  checkBoxAllItem=true;
  lineStatus=false;
  dispOrderDetails=false;
  headerFound=false;
  lineItemRepeated=false;

  showQtyRtncol=false;
  lineValidation=false;
  searchButton=true;

  rtnSearch=false;

  constructor(private service: MasterService,private orderManagementService:OrderManagementService,private transactionService: TransactionService , private  fb: FormBuilder, private router: Router) {
    this.counterSaleReturnOrderForm = fb.group({ 

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
      orderedDate :[],
      orderTypeId:[],
      trxNumber:[],

      customerId: [],
      custType: [],
      custAccountNo:[],
      custName:[],
      custAddress:[],

      subtotal:[],
      totTax:[],
      totAmt:[],
      disAmt:[],
      disPer:[],
      disType:[],

      rtnDocNo:[],
      rtnDocDate:[],
      rtnBaseAmt:[],
      rtnTaxAmt:[],
      rtnTotAmt:[],
      rtnDisAmt:[],

      compId :[],
      headerId :[],
      transactionTypeName:[],
      createOrderType:[],
      priceListId :[],
      priceListName :[],
      paymentTermId :[],
      paymentType :[],
      billToLocId :[],
      shipToLocId :[],
      billLocName :[],
      shipLocName :[],
      locCode :[],
      salesRepId:[],
      salesRepName:[],
      flowStatusCode :[],
      tlName :[],
      remarks :[],
      othRefNo :[],
      issuedBy:[],
      mobile1 :[],
      orderStatus :[],
      invType :[],
      refCustNo :[],
      issueCodeType :[],
      siteName :[],
      gatePassYN :[],
      customerSiteId :[],
      custPoNumber :[],
      custPoDate :[],

      ledgerId:[],
      docSeqValue:[],
      description: [],
      periodName: [],
      postedDate: [],
      jeCategory: [],
      name1: [],
      runningTotalCr: [],
      runningTotalDr:[],
    





      rtnFromDate:[],
      rtnToDate:[],
      searchCntrSaleOrderNo:['',Validators.pattern('[0-9]*')],

      // mobile2: ['', [Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]],

      oeOrderLinesAllList: this.fb.array([this.lineDetailsGroup()]), 

    }); 
  }


  lineDetailsGroup() {
    return this.fb.group({
    headerId:[],
    lineId:[],
    parentLineId:[],
    lineNumber:[],

    itemId:[],
    orderedItem:[],

    segment:[],
    itemDesc:[],

    pricingQty:[],
    unitSellingPrice:[],
    uom:[],
    cancelledQty:[],

    taxCategoryId:[],
    taxCategoryName:[],
    taxPer:[],
    priceListId:[],
    priceListName:[],
    flowStatusCode:[],

    baseAmt:[],
    taxAmt:[],
    totAmt:[],
    
    invType:[],
    hsnSacCode:[],
    frmLocatorId:[],
    frmLocatorName:[],
    onHandQty:[],
    resveQty:[],
    orderedQty:[],
    avalqty:[],
    disPer:[],
    disAmt:[],
    selectFlag:[],
   
   
} );
}


    get lineDetailsArray() {
      return <FormArray>this.counterSaleReturnOrderForm.get('oeOrderLinesAllList')
    }

    get f() { return this.counterSaleReturnOrderForm.controls; }

    counterSaleReturnOrder(counterSaleReturnOrderForm:any) {  }





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

  onKey(event: any) {}
  

  addRow(index) {
    if(this.showAllItem==false) 
    {
    this.CheckLineValidations(index);
    // this.rtnLineValidation=true;
     if (this.lineValidation==true) 
     { this.lineDetailsArray.push(this.lineDetailsGroup());}
    }
   }
  
      RemoveRow(index) {
        if (index===0){
        }
        else {
          this.lineDetailsArray.removeAt(index);
          this.CalculateTotal();
        }
      
      }

  clearSearch() {
    this.resetMast();
    this.counterSaleReturnOrderForm.get("searchReceiptNo").enable();
   }

   resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  SearchByCntrSaleOrderNoHeader(mOrderNumber) {
     // this.resetMast();
      // this.lineDetailsArray.reset();
      if(mOrderNumber==undefined || mOrderNumber==null)
          {
            alert ("Please Enter Order No.");
            return;
          }
      this.counterSaleReturnOrderForm.get("searchCntrSaleOrderNo").disable();
      // this.lineDetailsArray.controls[0].get('itemName').disable();
      this.orderManagementService.counterSaleReturnSearchHeader(mOrderNumber)
      .subscribe(
        data => {
          this.lstOrderHeader = data.obj;
            if (data.code==400 && data.message=="Order Number Not Found ") {
            alert(data.message + "-" + data.obj);
            this.dispOrderDetails=false;
             this.headerFound=false;
            return;
          } else {
          this.lstOrderItemLines=data.obj.oeOrderLinesAllList;
          this.lstCreditNotes=data.obj.cmList;
          console.log(this.lstOrderHeader);
            this.dispOrderDetails=true;
            this.searchButton=false;
            this.showLineLov(this.lstOrderHeader.orderNumber);
            this.orderedDate=this.lstOrderHeader.orderedDate;
            this.headerFound=true;
            this.orderNumber=this.lstOrderHeader.orderNumber;
            this.transactionTypeName=this.lstOrderHeader.transactionTypeName;
            this.trxNumber=this.lstOrderHeader.trxNumber;
            this.orderStatus=this.lstOrderHeader.orderStatus;
            this.refCustNo=this.lstOrderHeader.refCustNo;
            this.paymentType=this.lstOrderHeader.paymentType;
            this.issueCodeType=this.lstOrderHeader.issueCodeType;
            this.issuedBy=this.lstOrderHeader.issuedBy;
            this.priceListName=this.lstOrderHeader.priceListName;
            this.subtotal=this.lstOrderHeader.subtotal;
            this.totTax=this.lstOrderHeader.totTax;
            this.totAmt=this.lstOrderHeader.totAmt;
            this.disPer=this.lstOrderHeader.disPer;
            this.disAmt=this.lstOrderHeader.disAmt;
            this.discType=this.lstOrderHeader.discType;
            this.billToLocId=this.lstOrderHeader.billToLocId;
            this.shipToLocId=this.lstOrderHeader.shipToLocId;
            this.compId=this.lstOrderHeader.compId;
            this.divisionId=this.lstOrderHeader.divisionId;
            this.deptId=this.lstOrderHeader.deptId;
            // this.emplId=this.lstOrderHeader.emplId;
            this.headerId=this.lstOrderHeader.headerId;
            this.ouId=this.lstOrderHeader.ouId;
            this.orderTypeId=this.lstOrderHeader.orderTypeId;
            this.customerId=this.lstOrderHeader.customerId;
            this.custType=this.lstOrderHeader.custType;
            this.custAccountNo=this.lstOrderHeader.custAccountNo;
            this.custName=this.lstOrderHeader.custName;
            this.custAddress=this.lstOrderHeader.custAddress;
            this.customerSiteId=this.lstOrderHeader.customerSiteId;
            this.siteName=this.lstOrderHeader.siteName;
            this.mobile1=this.lstOrderHeader.mobile1;
          
           }
          
      } );  }


      showLineLov(mOrderNumber) {
        // alert("Line details :"+mOrderNumber);
          this.orderManagementService.counterSaleReturnSearchLines(mOrderNumber)
        .subscribe(
          data => {
            this.lstOrderLines = data.obj.oeOrderLinesAllList;
            // alert("this.lstOrderLines :"+this.lstOrderLines.length);
              if(this.lstOrderLines.length==0 ) {
               alert(" Order Fully Returned....");
                // alert("in if part...");
               this.lineStatus=false;
               this.validateStatus=false;
               this.checkBoxAllItem=false;
             } else {
              //  alert("in else part...");
                console.log(this.lstOrderLines);
                this.lineStatus=true;
                this.validateStatus=true;
                
           } } );}



           showAll(e) {
            if(this.headerFound) {
                if ( e.target.checked === true){
                  this.indReturn=false;
                  this.validateStatus=false;
                  this.SearchOrderLine();
                  this.checkBoxAllItem=false;
                  this.showAllItem=true;
                  this.validateStatus=true;
                
                  
                   }
                else { 
                    this.showAllItem=false;
                   } 
            }else {alert("Order Header Details Not Found...Please check"); e.target.checked=false;}
        }

        SearchOrderLine(){
          // alert("PO / Receipt Number :"+this.segment1 +","+this.receiptNo);
          this.enableCheckBox=true;
        
          
           this.orderManagementService.counterSaleReturnSearchLines(this.orderNumber)
           .subscribe(
             data => {
               this.lstOrderLines = data.obj.oeOrderLinesAllList;
               console.log(this.lstOrderLines);
 
               if(this.lstOrderLines !=null) {
                let control = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList') as FormArray;
                 var length1=this.lstOrderLines.length-1;
                 this.lineDetailsArray.removeAt(length1);
                  var len=this.lineDetailsArray.length;

                   for ( let i=0;i<this.lstOrderLines.length-len;i++){
                    var oeOrderLinesAllList:FormGroup=this.lineDetailsGroup();
                      control.push(oeOrderLinesAllList);
                    }
                   
                    this.counterSaleReturnOrderForm.get('oeOrderLinesAllList').patchValue(this.lstOrderLines);
                    var patch = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList') as FormArray;
                    var varLineArr = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList').value;
            
                    for (let i = 0; i <  this.lineDetailsArray.length ; i++) 
                    {
                      this.lineDetailsArray.controls[i].get('cancelledQty').disable();
                      var pLineId =varLineArr[i].lineId;
                      patch.controls[i].patchValue({baseAmt:0})
                      patch.controls[i].patchValue({taxAmt:0})
                      patch.controls[i].patchValue({totAmt:0})
                      patch.controls[i].patchValue({disAmt:0})
                      patch.controls[i].patchValue({parentLineId:pLineId})
                     
                   
                    
                      this.lineDetailsArray.controls[i].get('selectFlag').enable();
                    }
               

                  } else {alert ( "No Line Items Found in this PO Receipt.");}
                  // this.updateShipId()
              } );    
            }
       
     

  rtnSearchByDocNo(xy){
    alert("WIP....."+xy);
  }

  rtnSearchByDate(x,y) {
    alert("WIP.....");
  }

 

  myFunction() {
    alert("Got Focus....");
  }

  
  findOrderItem(index){
    this.checkBoxAllItem=false;
    this.indReturn=true;
   var patch = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList') as FormArray;
   var qtyLineArr = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList').value;
   var lineRtnItem = qtyLineArr[index].orderedItem;
   // alert ("Item entered :"+lineRtnItem + ","+index);
   let selectedValue = this.lstOrderLines.find(v => v.segment === lineRtnItem);
   console.log(selectedValue);
   // alert('selectedValue :' +selectedValue);
   // alert('selectedValue.invItemId :' +selectedValue.invItemId);

      
   if( selectedValue != undefined){
  
  //  var pLineId=selectedValue.poLineId;
  //  var subInvItemId=selectedValue.subInventoryId;

   (patch.controls[index]).patchValue(
     {
       cancelledQty: selectedValue.cancelledQty,
       itemDesc: selectedValue.itemDesc,
       orderedItem:selectedValue.segment,
       uom: selectedValue.uom,
       taxCategoryName: selectedValue.taxCategoryName,
       pricingQty: selectedValue.pricingQty,
       unitSellingPrice: selectedValue.unitSellingPrice,
       baseAmt:0,
       taxAmt: 0,
       totAmt: 0,
       disAmt: 0,
       disPer: selectedValue.disPer,
       hsnSacCode: selectedValue.hsnSacCode,
       frmLocatorName:selectedValue.frmLocatorName,
       taxCategoryId: selectedValue.taxCategoryId,
       taxPer: selectedValue.taxPer,
       frmLocatorId:selectedValue.frmLocatorId,
       headerId: selectedValue.headerId,
       invType: selectedValue.invType,
       priceListId:selectedValue.priceListId,
       lineId:selectedValue.lineId,
       parentLineId:selectedValue.lineId,
       lineNumber:selectedValue.lineNumber,
       itemId:selectedValue.itemId,
      
      
    }
   );
   } else 
       {alert("Item Code doesnt Exists in this Order Or\nReturn Already done for this Item Or\nWrong Item Code.");
       patch.controls[index].patchValue({orderedItem:''});
 
       }

 }

 LineSelectFlag(e,index) {
  var patch = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList') as FormArray;
  var rtvLineArr = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList').value;
  this.lineItemRepeated=false;

  var mItemId =rtvLineArr[index].itemId;
  var arrLen =this.lineDetailsArray.length;
  // alert("Length :"+arrLen);
  // if (arrLen>1) {
   if(mItemId >0) {
      //  this.CheckForitemRepeat(mItemId,index)
      //  if(this.lineItemRepeated) { 
      //   this.lineDetailsArray.removeAt(index);
      //   this.CalculateTotal();
      //    return;
      //   } else  {
          this.lineDetailsArray.controls[index].get('cancelledQty').enable(); }
        // } 

    else {
          alert ( "Line :"+(index+1) + " - Select ITEM NUMBER first and click on Checkbox...");
          patch.controls[index].patchValue({selectFlag:''})
    }
  }

CalculateTotal() {

  var rtnLineArr = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList').value;
  var len1=rtnLineArr.length;

  var totBaseAmt =0;
  var totTaxAmt =0;
  var netTotalAmt =0;
  var totDiscAmt=0;

  
  for (let i = 0; i < len1 ; i++)  {
   
    totBaseAmt =totBaseAmt+rtnLineArr[i].baseAmt;
    totTaxAmt =totTaxAmt+rtnLineArr[i].taxAmt;
    netTotalAmt =netTotalAmt+rtnLineArr[i].totAmt;
    totDiscAmt=totDiscAmt+rtnLineArr[i].disAmt;

  }

        var bAmt=totBaseAmt.toFixed(2);
        var tAmt=totTaxAmt.toFixed(2);
        var nAmt=netTotalAmt.toFixed(2);
        var dAmt=totDiscAmt.toFixed(2);
        this.rtnBaseAmt=Number(bAmt); 
        this.rtnTaxAmt=Number(tAmt);
        this.rtnTotAmt=Number(nAmt);
        this.rtnDisAmt=Number(dAmt);
}

CheckForitemRepeat(mItem,index) {
  // alert ("CheckForitemRepeat - "+mItem +","+index + " Arr Len ="+ this.lineDetailsArray.length)
  // var patch = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList') as FormArray;
var varLineArr = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList').value;
for (let i = 0; i <  this.lineDetailsArray.length ; i++) 
{
  var x=varLineArr[i].itemId;
  if( i !=index && x===mItem) {
    alert("Item Already in the List .Check Line :"+(i+1));
    this.lineItemRepeated=true;
    break;
  } 
  }
}

      validateQty(index: any){

        var patch = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList') as FormArray;
        var qtyLineArr = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList').value;
        var lineRtnQty = qtyLineArr[index].cancelledQty;
        var lineIssQty  = qtyLineArr[index].pricingQty;
        var uPrice= qtyLineArr[index].unitSellingPrice;
        var dPer = qtyLineArr[index].disPer;
        // var taxP= qtyLineArr[index].taxPercentage;
        var taxP=qtyLineArr[index].taxPer;
        // var avlQty = qtyLineArr[index].qtyOnHand;
        var  mUom = qtyLineArr[index].uom;
        // this.showLocator=true;
        // this.validQtyEntered=true;

        if ((mUom==='NO' && Number.isInteger(lineRtnQty)==false ) || lineRtnQty<=0 || lineRtnQty>lineIssQty  ) 
        {
          alert ("Invalid Quantity.\n[RETURN QTY] should be as per UOM  Or \nShould not be grater than [ISSUED QTY] ")

          patch.controls[index].patchValue({cancelledQty:''})
          patch.controls[index].patchValue({baseAmt:0})
          patch.controls[index].patchValue({taxAmt:0})
          patch.controls[index].patchValue({totAmt:0})
          patch.controls[index].patchValue({disAmt:0})
          patch.controls[index].patchValue({selectFlag:''})

          //  this.showQtyRtncol=false;
          this.lineDetailsArray.controls[index].get('cancelledQty').disable();
          //  this.showLocator=false;
          //  this.validQtyEntered=false;
            this.validateStatus=true;
            this.saveButton=false;
            this.validateStatus=true;
            this.saveButton=false;
          } 
          else 
          {
            var baseAmt =lineRtnQty *uPrice;
            var lineDisAmt =baseAmt*dPer/100; lineDisAmt.toFixed(2);
            var txbleAmt  =baseAmt-lineDisAmt; txbleAmt.toFixed(2);
            var taxAmt   =(txbleAmt * taxP/100); taxAmt.toFixed(2);
            var totAmt   =txbleAmt+taxAmt; totAmt.toFixed(2);

            
            baseAmt=Math.round((baseAmt + Number.EPSILON) * 100) / 100;
            lineDisAmt=Math.round((lineDisAmt + Number.EPSILON) * 100) / 100;
            txbleAmt=Math.round((txbleAmt + Number.EPSILON) * 100) / 100;
            taxAmt=Math.round((taxAmt + Number.EPSILON) * 100) / 100;
            totAmt=Math.round((totAmt + Number.EPSILON) * 100) / 100;

            
          // alert ("base amt,taxamt.totamt :" +baseAmt+","+taxAmt +","+totAmt);
          patch.controls[index].patchValue({baseAmt:baseAmt})
          patch.controls[index].patchValue({disAmt:lineDisAmt})
          patch.controls[index].patchValue({taxAmt:taxAmt})
          patch.controls[index].patchValue({totAmt:totAmt})
          
          }
          
          this.CalculateTotal()
              // var rtnLineArr = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList').value;
              // var len1=rtnLineArr.length;

              // var totBaseAmt =0;
              // var totTaxAmt =0;
              // var netTotalAmt =0;


              // for (let i = 0; i < len1 ; i++)  {

        
              //   totBaseAmt =totBaseAmt+rtnLineArr[i].baseAmt;
              //   totTaxAmt =totTaxAmt+rtnLineArr[i].taxAmt;
              //   netTotalAmt =netTotalAmt+rtnLineArr[i].totAmt;
              

              // }
              //   var bAmt=totBaseAmt.toFixed(2);
              //   var tAmt=totTaxAmt.toFixed(2);
              //   var nAmt=netTotalAmt.toFixed(2);
              //   this.rtnBaseAmt=Number(bAmt); 
              //   this.rtnTaxAmt=Number(tAmt);
              //   this.rtnTotAmt=Number(nAmt);
      }

      validateSave() 
      {
        this.emplId= Number(sessionStorage.getItem('emplId'));
        var rtvLineArr = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList').value;
        var len1 = rtvLineArr.length;
  
        var lrm=0;
        for (let i = len1 - 1; i >= 0; i--) {
          if (this.lineDetailsArray.controls[i].get('selectFlag').value != true) {
            this.lineDetailsArray.removeAt(i);
            lrm=lrm+1;
        
          } }
  
          if (lrm===len1) { this.resetMast();} 
          else {
             this.saveButton = true; 
             this.validateStatus=false;
             this.showQtyRtncol=false;
            }
  
          var rtvLineArr1 = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList').value;
          var len2 = this.lineDetailsArray.length;
            
        for (let i = 0; i < len2; i++) {
                   
          if (rtvLineArr1[i].selectFlag === true) {
            this.CheckLineValidations(i);
          }
  
        }
          
              if (this.lineValidation) {
                for (let i = 0; i < len1; i++) {
                  this.lineDetailsArray.controls[i].get('selectFlag').disable();
                 }
                    this.saveButton = true;
                    this.showQtyRtncol=false;
                    this.validateStatus=false;
                   
                  }   else  {
                    alert ("Data Validation Failed.Please check Item Number & Return Qty");
                     this.saveButton = false;
                     this.validateStatus=true;
                   }
                     this.CalculateTotal();
          }




      validateSave1() 
      {
        this.emplId= Number(sessionStorage.getItem('emplId'));
        var rtvLineArr = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList').value;
        var len1 = rtvLineArr.length;


        var lrm=0;
        for (let i = len1 - 1; i >= 0; i--) {
          if (this.lineDetailsArray.controls[i].get('selectFlag').value != true) {
            this.lineDetailsArray.removeAt(i);
            lrm=lrm+1;
        
          } }
  
        var len2 = rtvLineArr.length;
        for (let i = 0; i < len2; i++) {
                   
          if (rtvLineArr[i].selectFlag === true) {
            this.CheckLineValidations(i);
          }
        
  
        }
          
        // alert("this.lineValidation :"+this.lineValidation);
              if (this.lineValidation) {

                for (let i = 0; i < len2; i++) {
                  this.lineDetailsArray.controls[i].get('selectFlag').disable();
                 }
                    
                    this.saveButton = true;
                    this.showQtyRtncol=false;
                    this.validateStatus=false;
                    if (lrm===len1) { this.resetMast();} 
                    else {
                       this.saveButton = true; 
                       this.validateStatus=false;
                       this.showQtyRtncol=false;
                      }
                  
                   
                  }   else  {
                    alert ("Data validation Failed . Please check Line Item Number/Return Qty");
                     this.saveButton = false;
                   }
                     this.CalculateTotal();
          }




    





        CheckLineValidations(i) {
          
          var rtvLineArr = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList').value;
          var itemcd = rtvLineArr[i].itemId;
          var rtnQty = rtvLineArr[i].cancelledQty;
          // var chkFlag = rtvLineArr[i].selectFlag;
          var j = i + 1;

          if (itemcd === undefined || itemcd === null) {
            alert("Line-" + j + " ITEM NUMBER :  Please select Item Code");
            this.lineValidation = false;
            return;
          }

          if (rtnQty === undefined || rtnQty === null || rtnQty <=0 ) {
            alert("Line-" + j + " RETURN QTY :  Enter a valid quantity");
            this.lineValidation = false;
            return;
          }
          this.lineValidation = true;
        }

        cntrSaleOrderRtnSave(){
          var rtnLineArr = this.counterSaleReturnOrderForm.get('oeOrderLinesAllList').value;
          var len1=rtnLineArr.length;
          for (let i = 0; i < len1 ; i++)  {
            this.CheckLineValidations(i)
          }

          if ( this.lineValidation) {
          const formValue: IRtnToVendor = this.transeData(this.counterSaleReturnOrderForm.value);
            // this.locId=Number(sessionStorage.getItem('locId'));
            // console.log(this.lstReceiptLines);
            // this.shipHeaderId=null;
            this.saveButton=false;
            // this.totAmt=this.rtnTotAmt;
           
            this.orderManagementService.rtnCntrOrderSaveSubmit(formValue).subscribe((res: any) => {
              if (res.code === 200) {
                this.rtnDocNo=res.obj;
                this.displayButton=false;
                alert(res.message);
                this.counterSaleReturnOrderForm.disable();
              } else {
                if (res.code === 400) {
                  alert('Data already present in the data base');
                }
              }
            });
            } else { alert ("Validation Failed ... \nPosting not done...");} 
        }

      transeData(val) {
          
        delete val.loginArray;
        delete val.loginName;
        delete val.locName;
        delete val.ouName;
        delete val.ouId;
        delete val.deptId;
        delete val.orgId;
        return val;
      }

      
    printDoc(){
      var mRtnOrderNumber=this.counterSaleReturnOrderForm.get('rtnDocNo').value
      
      const fileName = 'download.pdf';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.orderManagementService.printCSRtndocument(mRtnOrderNumber)
        .subscribe(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          var printWindow = window.open(url, '', 'width=800,height=500');
          printWindow.open
          
        });
    }


    Select(mrtnNo){
      // alert("PO / Receipt Number :"+this.segment1 +","+this.receiptNo);
      this.enableCheckBox=false;
      this.rtnSearch=true;

      let select = this.lstCreditNotes.find(d => d.trxNumber === mrtnNo);
       this.rtnDocNo=select.trxNumber;
       this.rtnDocDate=select.trxDate;
       this.rtnTotAmt=select.invoiceAmount;

      // alert( "Rtn taxableAmount : "+select.taxableAmount);
      
       this.transactionService.searchByInvoiceNoAROu(mrtnNo,sessionStorage.getItem('ouId'))
       .subscribe(
         data => {
          
          this.rtnBaseAmt=data.obj.taxableAmount;
          this.rtnDisAmt=data.obj.discount;
          this.rtnTaxAmt=data.obj.taxAmount;

           if(data.obj.invLines.length >0) {
            this.lstCntrRtnDetails = data.obj.invLines;
            console.log(this.lstCntrRtnDetails);
            } else {alert ( "No Line Items Found.");}
          } );    
          
        }

        resetValue(){
          this.viewAccounting1=null;
          this.viewAccounting2=null;
          this.description = null;
          this.periodName = null;
          this.postedDate = null;
          this.jeCategory = null;
          this.name1 = null;
          this.ledgerId = null;
          this.runningTotalDr = null;
          this.runningTotalCr = null;
          this.docSeqValue=null;
        }

        viewAccounting() {
          // alert(receiptNo);
          this.resetValue();
          var crMemoNo=this.counterSaleReturnOrderForm.get("rtnDocNo").value;
          // alert(crMemoNo);
          this.service.viewAccountingCSRev(crMemoNo).subscribe((res: any) => {
            if (res.code === 200) {
              this.viewAccounting2 = res.obj;
              this.description = res.obj.description;
              this.periodName = res.obj.periodName;
              this.postedDate = res.obj.postedDate;
              this.jeCategory = res.obj.jeCategory;
              this.name1 = res.obj.name;
              this.ledgerId = res.obj.ledgerId;
              this.runningTotalDr = res.obj.runningTotalDr;
              this.runningTotalCr = res.obj.runningTotalCr;
              this.docSeqValue=res.obj.docSeqValue;
              // console.log(this.description);
              // alert (" this.docSeqValue :"+ this.docSeqValue);
              this.viewAccounting1 = res.obj.glLines;
              console.log(this.viewAccounting1);
              // alert(res.message);
            } else {
              if (res.code === 400) {
                alert(res.message);
              }
            }
          });
        }




      

}
