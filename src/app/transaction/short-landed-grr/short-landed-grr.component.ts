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
import { trigger } from '@angular/animations';
import { McpEnquiryComponent } from '../mcp-enquiry/mcp-enquiry.component';


interface IShortLandGrr { }

@Component({
  selector: 'app-short-landed-grr',
  templateUrl: './short-landed-grr.component.html',
  styleUrls: ['./short-landed-grr.component.css']
})
export class ShortLandedGrrComponent implements OnInit {
  shortLandGrrForm : FormGroup;

  message: string;
  msgType:string ="Close";
  pipe = new DatePipe('en-US'); 

  ItemLocatorList:any;
  OnHandQty1:any;

  public DepartmentList: Array<string> = [];
  public locIdList: Array<string> = [];
  PoRcptLineItemList: any;
  lstReceiptHeader: any;
  lstReceiptItemLines:any;
  lstReceiptLines: any;
  lstcomments: any;
  lstcompolines: any;
  getPoReceiptDetails:  Array<any> = [];
  lstReceiptRtnHeader: any;
  lstReceiptRtnItemLines:any;
  lstRtnDetails:any;
  lstDebtiNotes:any;


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

  

  poStatus:string;
      shipHeaderId:number
      poHeaderId:number;
      segment1:string;
      suppId:number;
      suppNo:number;
      supplierName:string;
      shipmentNo:number;
      receiptNo:number;
      originalReceiptNo:number;
      totalAmt:number;
      poRcptBaseAmt:number;
      poRcptTaxAmt:number;
      PoRctTotalAmt:number;
      billToLocId:number;
      shipmentDate:Date;
      receiptDate:Date;
      shipToLocId:number;
      ewayBillNo:string;
      ewayBillDate:Date;
      gstDocNo:string;
      gstDocDate:Date;
      baseAmount:number;
      apInvNum:string;
      apInvDate:Date;

      poDate:Date;
      suppInvNo:string;
      suppInvDate:Date;
      taxAmt:number;
      public itemType= 'RETURN';

      debitNoteNo:string;
      debitNoteDate=this.pipe.transform(Date.now(), 'dd-MM-yyyy');
      debitNoteAmt:number;

      rtnDocNo:string;
      rtnDocDate=this.pipe.transform(Date.now(), 'dd-MM-yyyy');
      rtnFromDate=this.pipe.transform(Date.now(), 'y-MM-dd');
      rtnToDate=this.pipe.transform(Date.now(), 'y-MM-dd');
      remarks:string;
      // remarks="52121101175";
               
      returnTo='Supplier'

      displayButton = true;
      validateStatus = false;
      saveButton = false;
      rtnLineValidation=true;
      rtnChkboxValidation=true;
      public minDate = new Date();
      frmDate= this.pipe.transform(Date.now(), 'y-MM-dd');
      toDate= this.pipe.transform(Date.now(), 'y-MM-dd');

      display1=true;
      display = true;
      displaySaveButton =false;

      disabled = true;
      disabledLine =true;
      disabledViewAccounting=true;
      DisplayqtyReceived=true; 
      TRUER=false; recFagDiss=true; 
      showLocator=false;
      validQtyEntered=false;
      showAllLines=false;
     
      headerFound=false;
      showQtyRtncol=false;
      lineValidation=false;
      lineItemRepeated=false;
      checkBoxAllItem=true;
      enableCheckBox=true;
      showAllItem=false;
      returnReceipt=false;
      
      lineStatus = false;
      dispReceiptLines=false;
      indReturn=false;
      searchButton=true;
      integerNum=true;

      rtnSearch=false;
      fullReturnFlag=false;
      fullRtnCheckBoxYes=true;

      sRcptNo:number;

      userList2: any[] = [];
      lastkeydown1: number = 0;
      dataDisplay :string;
      dataDisplay1 :string;
      spinIcon=true;
      spinIcon1=true;

  constructor(private service: MasterService,private orderManagementService:OrderManagementService,private  fb: FormBuilder, private router: Router) {
    this.shortLandGrrForm = fb.group({ 

      loginArray:[''],
      loginName:[''],
      ouName :[''],
      locId:[''],
      locName :[''],
      ouId :[],
      deptId :[],
      emplId:[''],
      orgId:[''],
      searchReceiptNo:[],
      searchBypoNumber:[],
      frmDate:[],
      toDate:[],

      debitNoteNo:[],
      debitNoteDate:[],
      debitNoteAmt:[],

      poStatus:[],
      shipHeaderId:[],
      poHeaderId:[],
      segment1:[],
      suppId:[],
      suppNo:[],
      supplierName:[],
      shipmentNo:[],
      receiptNo:[],
      originalReceiptNo:[],
      totalAmt:[],
      billToLocId:[],
      shipmentDate:[],
      receiptDate:[],
      shipToLocId:[],
      ewayBillNo:[],
      ewayBillDate:[],
      gstDocNo:[],
      gstDocDate:[],
      baseAmount:[],
      poRcptBaseAmt:[],
      poRcptTaxAmt:[],
      PoRctTotalAmt:[],
      apInvNum:[],
      apInvDate:[],

      poDate:[],
      suppInvNo:[],
      suppInvDate:[],
      taxAmt:[],

      showAllLines:[],
      itemType:[],

      rtnDocNo:[],
      rtnDocDate:[],
      rtnFromDate:[],
      rtnToDate:[],
      remarks:[],
      sRcptNo:[],

      rcvLines: this.fb.array([this.lineDetailsGroup()]), 

    });

    }

    lineDetailsGroup() {
      return this.fb.group({
      shipLineId:[],
      parentShipHeaderId:[],
      parentShipLineId:[],
      poLineId:[],
      poHeaderId:[],

      orderedQty: [],
      itemType:[],
      itemName:[],
      defaultTaxCategory:[],
      taxCategoryName:[],
      ctgDescription:[],
      itemDesc:[],
      subInvDesc:[],
      subInventoryId:[],
      locatorId:[],
      locatorDesc:[],
      uom:[],
      unitPrice:[],
      taxPercentage:[],
      taxAmount:[],
      hsnCode:[],
      sacCode:[],
     
      poChargeAcc:[],
      qtyReceived:[],
      qtyReturn:[],
      qtyOnHand:[],
      locId:[],
      baseAmount:[],
      totAmount:[],
      invItemId:[],
      billToLocId:[],
      // categoryId:[''],
      polineNum:[],
      selectFlag:[],
     
  } );
}


  // lineDetailsArray() :FormArray{
  //   return <FormArray>this.returntoVendorForm .get('rcvLines')
  // }

  get lineDetailsArray() {
    return <FormArray>this.shortLandGrrForm.get('rcvLines')
  }

  
    get f() { return this.shortLandGrrForm.controls; }
    shortLandGrr(shortLandGrrForm:any) {  }

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
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);

  }


  SearchByPoRcptNumberHeader(mRcptNumber:any){
   
    if(mRcptNumber==undefined || mRcptNumber==null) {alert ("Please Enter Receipt No.");return;}
   
    this.spinIcon=false;
    this.dataDisplay='Loading...Please Wait...'
    this.service.getsearchByReceiptNo(mRcptNumber,this.locId)
    .subscribe(
      data => {

        if(data.code===400) {alert (data.message) ;this.spinIcon=true;this.dataDisplay='';return; }
        
        this.lstReceiptHeader = data.obj;
        this.lstReceiptItemLines=data.obj.rcvLines;
        this.lstDebtiNotes=data.obj.rtvLines;
        console.log(this.lstReceiptHeader);

       if(data.code===200){
        
          this.dispReceiptLines=true;
          this.searchButton=false;
          this.shortLandGrrForm.get("receiptNo").disable();
      
          if(this.lstReceiptHeader.originalReceiptNo===null) 
          {
            this.headerFound=true;
            this.showLineLov(this.lstReceiptHeader.segment1,mRcptNumber);
            this.returnReceipt=false;
          }
           else 
          { this.rtnDocNo=this.lstReceiptHeader.receiptNo;
            this.headerFound=false;
            this.returnReceipt=true;
            this.displayButton=false;
            this.shortLandGrrForm.disable();

          }
          this.originalReceiptNo=this.lstReceiptHeader.originalReceiptNo;
          this.segment1=this.lstReceiptHeader.segment1;
          this.poDate=this.lstReceiptHeader.poDate;
          this.receiptNo=this.lstReceiptHeader.receiptNo;
          this.receiptDate=this.lstReceiptHeader.receiptDate;
          this.poRcptBaseAmt=this.lstReceiptHeader.baseAmount.toFixed(2);
          this.poRcptTaxAmt=this.lstReceiptHeader.totalTax.toFixed(2);
          this.PoRctTotalAmt=this.lstReceiptHeader.totalAmt.toFixed(2);
          this.suppNo=this.lstReceiptHeader.suppNo;
          this.suppInvNo=this.lstReceiptHeader.suppInvNo;
          this.suppInvDate=this.lstReceiptHeader.suppInvDate;
          this.supplierName=this.lstReceiptHeader.supplierName;
          this.apInvNum=this.lstReceiptHeader.apInvNum;
          this.apInvDate=this.lstReceiptHeader.apInvDate;
          this.billToLocId=this.lstReceiptHeader.billToLocId;
          this.shipToLocId=this.lstReceiptHeader.shipToLocId;
          this.poHeaderId=this.lstReceiptHeader.poHeaderId;
          this.ewayBillNo=this.lstReceiptHeader.ewayBillNo;
          this.ewayBillDate=this.lstReceiptHeader.ewayBillDate;
          this.gstDocNo=this.lstReceiptHeader.gstDocNo;
          this.gstDocDate=this.lstReceiptHeader.gstDocDate;
          this.shipHeaderId=this.lstReceiptHeader.shipHeaderId;
          this.spinIcon=true;this.dataDisplay='';
        } 
        
        else{
          (document.getElementById('findBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
           this.message = "PO Reeceipt Number : "+mRcptNumber +" Not Found in this Location\nOr Return process already done for this Receipt No."
           return;
          
          this.headerFound=false;
          this.resetMast();
         
      }
    } );  
   
   }

   showLineLov(mPonumber,mRcptNumber) {
    this.service.getsearchByReceiptNoLine(mPonumber,mRcptNumber)
    .subscribe(
      data => {
        this.PoRcptLineItemList = data.obj;
         if(this.PoRcptLineItemList==null ) {
           this.lineStatus=false;
         } else {
            console.log(this.PoRcptLineItemList);
            this.lineStatus=true;
            this.validateStatus=true;
         }});
    }

    showAll(e) {
      this.fullReturnFlag=false;

          if(this.headerFound) {
              if ( e.target.checked === true){
                this.indReturn=false;
                this.SearchByPoRcptNumberLine();
                // this.returntoVendorForm.patchValue({ showAllLines: true })
                // this.showAllLines=true;
                this.checkBoxAllItem=false;
                this.showAllItem=true;
              
                 }
              else { 
                  this.showAllItem=false;
                 } 
          }else {alert("Receipt Header Details Not Found...Please check"); e.target.checked=false;}
      }


      SearchByPoRcptNumberLine(){
        this.enableCheckBox=true;
        this.spinIcon1=false;
        this.dataDisplay1='Loading Line Details...Please Wait...'

         this.service.getsearchByReceiptNoLine(this.segment1,this.receiptNo)
         .subscribe(
           data => {
             this.lstReceiptLines = data.obj;
             console.log(this.lstReceiptLines);

                               
             if(this.lstReceiptLines !=null) {
             
              let control = this.shortLandGrrForm.get('rcvLines') as FormArray;
              var length1=this.lstReceiptLines.length-1;
              this.lineDetailsArray.removeAt(length1);
                var len=this.lineDetailsArray.length;
                for ( let i=0;i<this.lstReceiptLines.length-len;i++){
                  var rcvLines:FormGroup=this.lineDetailsGroup();
                    control.push(rcvLines);
                  }
                 
                  this.shortLandGrrForm.get('rcvLines').patchValue(this.lstReceiptLines);
                  var patch = this.shortLandGrrForm.get('rcvLines') as FormArray;
                  var varLineArr = this.shortLandGrrForm.get('rcvLines').value;
          
                  for (let i = 0; i <  this.lineDetailsArray.length ; i++) 
                  {
                    this.lineDetailsArray.controls[i].get('qtyReturn').disable();
                    patch.controls[i].patchValue({itemType:'RETURN'})
                    var x=varLineArr[i].invItemId;
                    var y=varLineArr[i].subInventoryId;
                    var z=varLineArr[i].locatorId;
                    this.OnhandQtyCheck(x,y,z,i)
                    this.lineDetailsArray.controls[i].get('selectFlag').enable();
                  }
                  this.spinIcon1=true;this.dataDisplay1=''

                } else {alert ( "No Line Items Found in this PO Receipt.");this.spinIcon1=true;this.dataDisplay1=''}
                this.updateShipId();
                
            } );    
            
          }
       


        OnhandQtyCheck(mItemId,subinvId,mLocatorId,index) {
          // alert (mItemId +","+subinvId +","+index);
            var patch = this.shortLandGrrForm.get('rcvLines') as FormArray;
            var rtvLineArr = this.shortLandGrrForm.get('rcvLines').value;
            // this.service.getfrmSubLoc(this.locId,mItemId,subinvId)

            // this.service.getonhandqty(this.locId,subinvId,mLocatorId,mItemId)
             // this.service.getfrmSubLoc(this.locId,mItemId,subinvId)
             this.service.getonhandqtySubinvLoc(this.locId,subinvId,mItemId)
             .subscribe(
              data => {
                // this.ItemLocatorList = data;
                // console.log(this.ItemLocatorList);
                // var avlQty=this.ItemLocatorList[0].onHandQty
                // alert("Available Qty :" +avlQty)
                // patch.controls[index].patchValue({qtyOnHand:avlQty})

                this.ItemLocatorList = data;
                console.log(this.ItemLocatorList);
                var avlQty=this.ItemLocatorList[0].onHandQty
                // var avlQty=this.ItemLocatorList;
                patch.controls[index].patchValue({qtyOnHand:avlQty})


                }
            
            ); }
        


        updateShipId() {

          this.spinIcon1=true;this.dataDisplay1=''
          var billToLoc = this.shortLandGrrForm.get('billToLocId').value;
          // var pShipHeaderId = this.returntoVendorForm.get('shipHeaderId').value;
          var pShipHeaderId=this.lstReceiptHeader.shipHeaderId;
          var pHeaderId= this.shortLandGrrForm.get('poHeaderId').value;
          // alert("billToLocId :"+billToLoc +" parentShipHeaderId :"+pShipHeaderId);
  
          var patch = this.shortLandGrrForm.get('rcvLines') as FormArray;
          var varLineArr = this.shortLandGrrForm.get('rcvLines').value;
  
          for (let i = 0; i <  this.lineDetailsArray.length ; i++) 
          {
            var x=varLineArr[i].shipLineId;
            patch.controls[i].patchValue({parentShipHeaderId:pShipHeaderId})
            patch.controls[i].patchValue({parentShipLineId:x})
            patch.controls[i].patchValue({billToLocId:billToLoc})
            patch.controls[i].patchValue({shipLineId:null})
            patch.controls[i].patchValue({poHeaderId:pHeaderId})
            patch.controls[i].patchValue({locId:billToLoc})
           
            if(this.fullReturnFlag==false){
              patch.controls[i].patchValue({baseAmount:0})
              patch.controls[i].patchValue({taxAmount:0})
              patch.controls[i].patchValue({totAmount:0})
              patch.controls[i].patchValue({totAmount:0}) 
           } else 
           {
            patch.controls[i].patchValue({qtyReturn:varLineArr[i].qtyReceived})
           }
       
          }
        }

        LineSelectFlag(e,index) {
          var patch = this.shortLandGrrForm.get('rcvLines') as FormArray;
          var rtvLineArr = this.shortLandGrrForm.get('rcvLines').value;
          this.lineItemRepeated=false;
    
          var mItemId =rtvLineArr[index].invItemId;
          var subinvId =rtvLineArr[index].subInventoryId;
          var mLocatorId=rtvLineArr[index].locatorId;
          var rtnQty=rtvLineArr[index].qtyReturn;
    
          // alert ("Qty to be rtnd :" + rtnQty);
    
           if(mItemId >0) {
    
           this.CheckForitemRepeat(mItemId,index)
           if(this.lineItemRepeated) { 
            this.lineDetailsArray.removeAt(index);
            this.CalculateTotal();
             return;
            }
    
    
          if ( e.target.checked) {
            // this.showQtyRtncol =true;
            this.lineDetailsArray.controls[index].get('qtyReturn').enable();
            var len1=rtvLineArr.length;
           
    
            // this.service.getfrmSubLoc(this.locId,mItemId,subinvId)
              // this.service.getonhandqty(this.locId,subinvId,mLocatorId,mItemId)
              this.service.getonhandqtySubinvLoc(this.locId,subinvId,mItemId)
              .subscribe(
              data => {
                // this.ItemLocatorList = data;
                this.ItemLocatorList = data;
                console.log(this.ItemLocatorList);
    
                var avlQty=this.ItemLocatorList[0].onHandQty
                
                // var avlQty=this.ItemLocatorList;
                // alert ("Onhand Quantity Available in Locator :" +mLocatorId+" - Avaialable Qty : " +avlQty);
                patch.controls[index].patchValue({qtyOnHand:avlQty})
    
                if (avlQty <=0 || avlQty<rtnQty ) {
                  if(avlQty==null) {avlQty=0;}
                  alert ("Onhand Quantity not Available/Return Qty grater than Available Qty - Avaialable Qty : " +avlQty);
                  patch.controls[index].patchValue({qtyOnHand:avlQty})
                  patch.controls[index].patchValue({selectFlag:''})
                  patch.controls[index].patchValue({qtyReturn:''})
                  patch.controls[index].patchValue({selectFlag:''})
                  patch.controls[index].patchValue({baseAmount:0})
                  patch.controls[index].patchValue({taxAmount:0})
                  patch.controls[index].patchValue({totAmount:0})
                  this.lineDetailsArray.controls[index].get('qtyReturn').disable();
                  this.CalculateTotal();
                  return;
                 }
    
                }
            );
            this.CalculateTotal();
                
        } else { 
             
          patch.controls[index].patchValue({qtyReturn:''})
          patch.controls[index].patchValue({baseAmount:0})
          patch.controls[index].patchValue({taxAmount:0})
          patch.controls[index].patchValue({totAmount:0})
          
          this.CalculateTotal();
         
          // this.showQtyRtncol =false;
          this.lineDetailsArray.controls[index].get('qtyReturn').disable();
          // this.ItemLocatorList=null;
          
        
            }
          } else {
            alert ( "Line :"+(index+1) + " - Select ITEM NUMBER first and click on Checkbox...");
            patch.controls[index].patchValue({selectFlag:''})
            }
           
    
      }

      CalculateTotal() {

        var rtnLineArr = this.shortLandGrrForm.get('rcvLines').value;
        var len1=rtnLineArr.length;
        var len2 = this.lineDetailsArray.length;

        var totBaseAmt =0;
        var totTaxAmt =0;
        var netTotalAmt =0;

        
        for (let i = 0; i < len1 ; i++)  {
         if (this.lineDetailsArray.controls[i].get('selectFlag').value == true) {
          totBaseAmt =totBaseAmt+rtnLineArr[i].baseAmount;
          totTaxAmt =totTaxAmt+rtnLineArr[i].taxAmount;
          netTotalAmt =netTotalAmt+rtnLineArr[i].totAmount; 
        }

        }

              var bAmt=totBaseAmt.toFixed(2);
              var tAmt=totTaxAmt.toFixed(2);
              var nAmt=netTotalAmt.toFixed(2);

              this.baseAmount=Number(bAmt);
              this.taxAmt=Number(tAmt);
              this.totalAmt=Number(nAmt);
              this.debitNoteAmt=Number(nAmt);
      }


      validateQty(index: any){

        var patch = this.shortLandGrrForm.get('rcvLines') as FormArray;
        var qtyLineArr = this.shortLandGrrForm.get('rcvLines').value;
        var lineRtnQty = qtyLineArr[index].qtyReturn;
        var lineRcdQty  = qtyLineArr[index].qtyReceived;
        var uPrice= qtyLineArr[index].unitPrice;
        var taxP= qtyLineArr[index].taxPercentage;
        var avlQty = qtyLineArr[index].qtyOnHand;
        var  mUom = qtyLineArr[index].uom;
        this.showLocator=true;
        this.validQtyEntered=true;
          
        if ((mUom=='NO' && Number.isInteger(lineRtnQty)==false ) || lineRtnQty<=0 || lineRtnQty>lineRcdQty || lineRtnQty > avlQty ) 
        {
           alert ("Invalid Quantity.\n[SHORT QTY] should be as per UOM  Or \nShould not be grater than [QTY RECEIVED] Or [ON HAND QTY]")
    
           patch.controls[index].patchValue({qtyReturn:''})
           patch.controls[index].patchValue({baseAmount:0})
           patch.controls[index].patchValue({taxAmount:0})
           patch.controls[index].patchValue({totAmount:0})
           patch.controls[index].patchValue({selectFlag:''})

           this.lineDetailsArray.controls[index].get('qtyReturn').disable();
           this.showLocator=false;
           this.validQtyEntered=false;
           this.validateStatus=true;
           this.saveButton=false;
          } 
          else 
          {
            var baseAmt =lineRtnQty *uPrice;
            var taxAmt   = baseAmt * taxP/100;
            var totAmt   =baseAmt+taxAmt;

            baseAmt=Math.round((baseAmt + Number.EPSILON) * 100) / 100
            taxAmt=Math.round((taxAmt + Number.EPSILON) * 100) / 100
            totAmt=Math.round((totAmt + Number.EPSILON) * 100) / 100

            patch.controls[index].patchValue({baseAmount:baseAmt})
            patch.controls[index].patchValue({taxAmount:taxAmt})
            patch.controls[index].patchValue({totAmount:totAmt})
          }

              var rtnLineArr = this.shortLandGrrForm.get('rcvLines').value;
              var len1=rtnLineArr.length;

              var totBaseAmt =0;
              var totTaxAmt =0;
              var netTotalAmt =0;


              for (let i = 0; i < len1 ; i++)  {

         
                totBaseAmt =totBaseAmt+rtnLineArr[i].baseAmount;
                totTaxAmt =totTaxAmt+rtnLineArr[i].taxAmount;
                netTotalAmt =netTotalAmt+rtnLineArr[i].totAmount;
               

              }
                var bAmt=totBaseAmt.toFixed(2);
                var tAmt=totTaxAmt.toFixed(2);
                var nAmt=netTotalAmt.toFixed(2);

                this.baseAmount=Number(bAmt); 
                this.taxAmt=Number(tAmt);
                this.totalAmt=Number(nAmt);
                this.debitNoteAmt=Number(nAmt);
      }

      findPoReceiptItem(index){
        this.checkBoxAllItem=false;
        this.indReturn=true;
        var patch = this.shortLandGrrForm.get('rcvLines') as FormArray;
        var qtyLineArr = this.shortLandGrrForm.get('rcvLines').value;
        var lineRtnItem = qtyLineArr[index].itemName;
        // alert ("Item entered :"+lineRtnItem + ","+index);
        let selectedValue = this.PoRcptLineItemList.find(v => v.itemName === lineRtnItem);
        console.log(selectedValue);
        // alert('selectedValue :' +selectedValue);
        // alert('selectedValue.invItemId :' +selectedValue.invItemId);
  
           
        if( selectedValue != undefined){
       
        var pLineId=selectedValue.poLineId;
        var subInvItemId=selectedValue.subInventoryId;
  
        (patch.controls[index]).patchValue(
          {
            qtyReceived: selectedValue.qtyReceived,
            itemDesc: selectedValue.itemDesc,
            ctgDescription: selectedValue.ctgDescription,
            itemName:selectedValue.itemName,
            subInvDesc: selectedValue.subInvDesc,
            uom: selectedValue.uom,
            taxCategoryName: selectedValue.taxCategoryName,
            taxPercentage: selectedValue.taxPercentage,
            unitPrice: selectedValue.unitPrice,
            baseAmount:0,
            taxAmount: 0,
            totAmount: 0,
            sacCode: selectedValue.hsnCode,
            hsnCode: selectedValue.hsnCode,
            locatorDesc:selectedValue.locatorDesc,
            locatorId:selectedValue.locatorId,
            invItemId:selectedValue.invItemId,
            subInventoryId:subInvItemId,
            defaultTaxCategory: selectedValue.defaultTaxCategory,
            polineNum: selectedValue.polineNum,
            poHeaderId: this.shortLandGrrForm.get('poHeaderId').value,
            poLineId: pLineId,
            poChargeAcc: selectedValue.poChargeAcc,
            billToLocId:this.shortLandGrrForm.get('billToLocId').value,
            parentShipHeaderId:  this.lstReceiptHeader.shipHeaderId,
            parentShipLineId:selectedValue.shipLineId,
           
         }
        );
        } else 
            {alert("Item Code doesnt Exists in this PO Receipt Or\nReturn Already done for this Item Or\nWrong Item Code.");
            patch.controls[index].patchValue({itemName:''});
      
            }
  
      }
  
      addRow(index) {
        if(this.showAllItem==false) 
        {
        this.CheckRtnLineValidations(index);
         if (this.rtnLineValidation==true) { this.lineDetailsArray.push(this.lineDetailsGroup());}
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

    CheckRtnLineValidations(index) {
      var patch = this.shortLandGrrForm.get('rcvLines') as FormArray;
      var rtnLineArr = this.shortLandGrrForm.get('rcvLines').value;
      var len1=rtnLineArr.length;

      var rcdQty =rtnLineArr[index].qtyReceived;
      var shQty =rtnLineArr[index].qtyReturn;
      var avlQty=rtnLineArr[index].qtyOnHand;
      var itmName =rtnLineArr[index].itemName;
      var chkFlag   = rtnLineArr[index].selectFlag;

      if(itmName ===null ||itmName ===undefined ) {
        alert("Line-"+(index+1)+ " ITEM NUMBER :  Should not be null");
        this.rtnLineValidation=false;
        return;}

          if(shQty ===null ||shQty ===undefined || shQty<=0 || shQty>rcdQty || shQty>avlQty) {
          alert("Line-"+(index+1)+ " SHORT QTY :  Should be above Zero And should not be above Received Qty/Onhand Qty ."+shQty +","+itmName);
          this.rtnLineValidation=false;
          return;}
          this.rtnLineValidation=true;
    
      }

      CheckForitemRepeat(mItem,index) {
        var patch = this.shortLandGrrForm.get('rcvLines') as FormArray;
      var varLineArr = this.shortLandGrrForm.get('rcvLines').value;
      for (let i = 0; i <  this.lineDetailsArray.length ; i++) 
      {
        var x=varLineArr[i].invItemId;
        if( i !=index && x===mItem) {
          alert("Item Already in the List .Check Line :"+(i+1));
          this.lineItemRepeated=true;
          break;
        } 
        }
      }
    
    resetMast() {
      window.location.reload();
    }
  
    closeMast() {
      this.router.navigate(['admin']);
    }

    CheckLineValidations(i) {
       
      var rtvLineArr = this.shortLandGrrForm.get('rcvLines').value;
      var itemcd = rtvLineArr[i].itemName;
      var shQty = rtvLineArr[i].qtyReturn;
      var chkFlag = rtvLineArr[i].selectFlag;
      var j = i + 1;
  
      if (itemcd === undefined || itemcd === null) {
        alert("Line-" + j + " ITEM NUMBER :  Please select Item Code");
        this.lineValidation = false;
        return;
      }

      if (shQty === undefined || shQty === null || shQty <=0 ) {
        alert("Line-" + j + " SHORT QTY :  Enter a valid quantity");
        this.lineValidation = false;
        return;
      }
  
       
      this.lineValidation = true;
    }


    validateClaim() 
    {
      var patch = this.shortLandGrrForm.get('rcvLines') as FormArray;
      var rtvLineArr = this.shortLandGrrForm.get('rcvLines').value;
      var len1 = rtvLineArr.length;
     
      for (let i = 0; i < len1; i++) {
            var x=rtvLineArr[i].qtyReturn
              if( x==undefined  || x<=0) {
                patch.controls[i].patchValue({selectFlag:''});
                var  resp=confirm("LINE : " + (i+1) + " : IS INCOMPLETE.PROCEED ???");
                  if(resp==false) { return;}
                }

      }

    
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

        var rtvLineArr1 = this.shortLandGrrForm.get('rcvLines').value;
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
                  alert ("Data Validation Failed . Please check Line Item Number| Return Qty");
                   this.saveButton = false;
                   this.validateStatus=true;
                 }
                   this.CalculateTotal();
        }



   

    shortClaimSave(){
      var rtnLineArr = this.shortLandGrrForm.get('rcvLines').value;

      var len1=rtnLineArr.length;
    
       for (let i = 0; i < len1 ; i++)  {
        this.CheckRtnLineValidations(i)
       }

       if ( this.rtnLineValidation) {

        var  resp=confirm("Confirm Save Short Landed Claim ???");
        if(resp==false) { return;}

      const formValue = this.shortLandGrrForm.value;

      this.locId=Number(sessionStorage.getItem('locId'));

        console.log(this.lstReceiptLines);
        this.shipHeaderId=null;
        this.saveButton=false;
        
   
        this.service.shortLandedClaimSave(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            this.rtnDocNo=res.obj;
            this.disabled = false;
            this.disabledLine=false;
            this.displayButton=false;
            alert(res.message);
            // this.returntoVendorForm.reset();
            this.shortLandGrrForm.disable();
          } else {
            if (res.code === 400) {
              alert(res.message+'--'+ res.obj);
              // this.returntoVendorForm.reset();
            }
          }
        });
    } else { alert ("Validation Failed ... \nPosting not done...");} 
  }


}
