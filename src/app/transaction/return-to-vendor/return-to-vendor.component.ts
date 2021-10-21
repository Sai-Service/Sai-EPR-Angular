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


interface IRtnToVendor {
  searchReceiptNo:number;
  ouName:string;
  poNumber:string;
  supplier:string;
  item:string;
  segment1:string;
  ouId:number;
  totalAmt:number;
  supplierName:string;
  PoRctTotalAmt:number;
  baseAmount:number;
  taxAmt:number;
  recDate:Date;
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
  // poLineId:number;
  suppNo:number;
  supplierSiteId:number;
  emplId:number;
  totAmount:number;
  invItemId:number;
  billToLocId:number;
  categoryId:number;
  qtyReceived:number;
  polineNum:number;
  // locatorId:number;
  poType:string;
  poStatus:string;
  // locatorDesc:any[];
  locatorDesc:string;
  shipmentNumber:string;
  // qtyReturn:number;
  
 }

@Component({
  selector: 'app-return-to-vendor',
  templateUrl: './return-to-vendor.component.html',
  styleUrls: ['./return-to-vendor.component.css']
})
export class ReturnToVendorComponent implements OnInit {
  returntoVendorForm : FormGroup;
  pipe = new DatePipe('en-US');
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
  
  // public ItemLocatorList: Array<string> = [];

  ItemLocatorList:any;
  OnHandQty1:any;

      // locatorId:string;
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
      // public emplId =6;

      // searchReceiptNo: number;
      searchBypoNumber:number;
      locatorDesc:string;
      
      // searchBypoNumber=2181211101212100;
      // searchReceiptNo=1000158;

      // searchReceiptNo=22111720;
      searchReceiptNo=52121101142;
      // searchReceiptNo:number;

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

      rtnDocNo:string;
      rtnDocDate=this.pipe.transform(Date.now(), 'y-MM-dd');
      rtnFromDate=this.pipe.transform(Date.now(), 'y-MM-dd');
      rtnToDate=this.pipe.transform(Date.now(), 'y-MM-dd');
      // remarks:string;
      remarks="52121101142";
               
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

      userList2: any[] = [];
      lastkeydown1: number = 0;
     


   constructor(private service: MasterService,private orderManagementService:OrderManagementService,private  fb: FormBuilder, private router: Router) {
          this.returntoVendorForm = fb.group({ 

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
          
            rcvLines: this.fb.array([this.lineDetailsGroup()]), 
            // poLines: this.fb.array([this.lineDetailsGroup()]),

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
          return <FormArray>this.returntoVendorForm.get('rcvLines')
        }

        get f() { return this.returntoVendorForm.controls; }

        returntoVendor(returntoVendorForm:any) {  }

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
          this.orgId=this.ouId;
          console.log(this.loginArray);
          console.log(this.locId);

           this.service.locationIdList()
            .subscribe(
              data => {
                this.locIdList = data;
                console.log(this.locIdList);
              }
            );

          this.service.DepartmentList()
          .subscribe(
            data => {
              this.DepartmentList = data;
              console.log(this.DepartmentList);
            }
          ); }



      //  SearchByRcptNumber1(mRcptNumber)   {
      //   alert("WIP-RCPTNUMBER: "+mRcptNumber);
      //   this.service.getPOReceiptSearchByRcptNo(mRcptNumber)
      //   .subscribe(
      //     data => {
      //      this.lstcomments = data.obj;
      //      console.log(this.lstcomments);

      //      alert(data.obj.suppId);
      //   }
      //  );
    
      //  }

      onKey(event: any) {}

   
        SearchByPONumber(mPoNumber){
          alert("WIP-PO: "+mPoNumber);
          this.service.getPOReceiptSearchByPONo(mPoNumber)
          .subscribe(
            data => {
             this.lstcomments = data.obj;
             console.log(this.lstcomments);
          }   );}
    

        validateQty(index: any){

          var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
          var qtyLineArr = this.returntoVendorForm.get('rcvLines').value;
          var lineRtnQty = qtyLineArr[index].qtyReturn;
          var lineRcdQty  = qtyLineArr[index].qtyReceived;
          var uPrice= qtyLineArr[index].unitPrice;
          var taxP= qtyLineArr[index].taxPercentage;
          var avlQty = qtyLineArr[index].qtyOnHand;
          var  mUom = qtyLineArr[index].uom;
          this.showLocator=true;
          this.validQtyEntered=true;
          
        
           
        
          if ((mUom==='NO' && lineRtnQty < 1)  || lineRtnQty>lineRcdQty || lineRtnQty > avlQty ) 
          {
             alert ("Invalid Quantity.\n[RETURN QTY] should be as per UOM  Or \nShould not be grater than [QTY RECEIVED] Or [ON HAND QTY]")
      
             patch.controls[index].patchValue({qtyReturn:''})
             patch.controls[index].patchValue({baseAmount:0})
             patch.controls[index].patchValue({taxAmount:0})
             patch.controls[index].patchValue({totAmount:0})
             patch.controls[index].patchValue({selectFlag:''})

            //  this.showQtyRtncol=false;
             this.lineDetailsArray.controls[index].get('qtyReturn').disable();
             this.showLocator=false;
             this.validQtyEntered=false;
            } 
            else 
            {
              var baseAmt =lineRtnQty *uPrice;
              var taxAmt   =baseAmt * taxP/100;
              var totAmt   =baseAmt+taxAmt;
            // alert ("base amt,taxamt.totamt :" +baseAmt+","+taxAmt +","+totAmt);
            patch.controls[index].patchValue({baseAmount:baseAmt})
            patch.controls[index].patchValue({taxAmount:taxAmt})
            patch.controls[index].patchValue({totAmount:totAmt})
            }

                var rtnLineArr = this.returntoVendorForm.get('rcvLines').value;
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
        }


        CalculateTotal() {

          var rtnLineArr = this.returntoVendorForm.get('rcvLines').value;
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
        }


        SelectFlag1(e,index) {
          this.rtnLineValidation=true;
        //  if ( e.target.checked) {alert("Checked...");} else {alert("Unchecked...");}

         if ( e.target.checked) {

         var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
         var rtnLineArr = this.returntoVendorForm.get('rcvLines').value;
         var len1=rtnLineArr.length;
         for (let i = 0; i < len1 ; i++)  {

          var rcdQty =rtnLineArr[index].qtyReceived;
          var rtnQty =rtnLineArr[index].qtyReturn;
          var itmId =rtnLineArr[index].itemId;

            alert("Rtn qty :" + rtnQty);
           if(rtnQty ===null ||rtnQty ===undefined || rtnQty<=0 || rtnQty>rcdQty ) {
            alert("Line-"+(index+1)+ "RETURN QTY :  Should be above Zero And should not be above Received Qty .");
            this.rtnLineValidation=false;
            e.target.checked=false;
            return;}
           } }
       }

       resetMast() {
        window.location.reload();
      }
    
      closeMast() {
        this.router.navigate(['admin']);
      }

      Select(rcptNo: any) {

        return;

        // alert("Select >> :"+rcptNo);
        this.returntoVendorForm.reset();
        this.display1= false;
        let select = this.lstcomments.find(d => d.receiptNo === rcptNo);
       
        for(let i=0; i<this.lineDetailsArray.length; i++){ 
          this.lineDetailsArray.removeAt(i);
        }
    
        // alert("rcvLines LENGTH: "+ select.rcvLines.length);
        if(select.rcvLines1.length>0){
    
           this.lineDetailsArray.clear();
    
          if (select) {
              var control = this.returntoVendorForm.get('rcvLines') as FormArray;
             
              for (let i=0; i<select.rcvLines.length;i++) 
                {
                 var rcvLines:FormGroup=this.lineDetailsGroup();
                  control.push(rcvLines);
                }
              }
        }
          this.receiptNo = select.receiptNo;
          this.displayButton = false;
          this.display = false;
          // this.showItemSearch=true;
          this.returntoVendorForm.patchValue(select);
        }
     
       SearchByPoRcptNumberHeader(mRcptNumber:any){
          // this.resetMast();
          // this.lineDetailsArray.reset();
          if(mRcptNumber==undefined || mRcptNumber==null)
          {
            alert ("Please Enter Receipt No.");
            return;
          }

          this.returntoVendorForm.get("searchReceiptNo").disable();
          
          // this.lineDetailsArray.controls[0].get('itemName').disable();
          this.service.getsearchByReceiptNo(mRcptNumber,this.locId)
          .subscribe(
            data => {
              this.lstReceiptHeader = data.obj;
              this.lstReceiptItemLines=data.obj.rcvLines;
              console.log(this.lstReceiptHeader);

             if(data.code===200){
              
                this.dispReceiptLines=true;
              // alert("PO /Receipt Number :"+this.lstReceiptHeader.segment1+"," +mRcptNumber);
              // if(this.lstReceiptHeader !=null) {
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
                  this.returntoVendorForm.disable();

                }
                this.originalReceiptNo=this.lstReceiptHeader.originalReceiptNo;
                this.segment1=this.lstReceiptHeader.segment1;
                this.poDate=this.lstReceiptHeader.poDate;
                this.receiptNo=this.lstReceiptHeader.receiptNo;
                this.receiptDate=this.lstReceiptHeader.receiptDate;
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
                // this.returntoVendorForm.patchValue(this.lstReceiptHeader);
                // this.shipHeaderId=null;
              } 
              
              else{alert ("PO Reeceipt Number : "+mRcptNumber +" Not Found in this Location\nOr Return process already done for this Receipt No.");
                this.headerFound=false;
                this.resetMast();
                // this.returntoVendorForm.get("showAllItem").disable();
                // this.returntoVendorForm.get("rcvLines").disable();
              
            }
          } );  
         }


         SearchByPoRcptNumberLine(){
          // alert("PO / Receipt Number :"+this.segment1 +","+this.receiptNo);
          this.enableCheckBox=true;
          
           this.service.getsearchByReceiptNoLine(this.segment1,this.receiptNo)
           .subscribe(
             data => {
               this.lstReceiptLines = data.obj;
               console.log(this.lstReceiptLines);

              //  alert(this.lstReceiptLines);
             
               if(this.lstReceiptLines !=null) {
                let control = this.returntoVendorForm.get('rcvLines') as FormArray;
             
                // var length1=this.lstReceiptLines.rcvLines.length-1;
                var length1=this.lstReceiptLines.length-1;
                // alert(length1);

                this.lineDetailsArray.removeAt(length1);
                  var len=this.lineDetailsArray.length;
                  // alert ("this.lstReceiptLines.length.length :"+this.lstReceiptLines.length);
                  for ( let i=0;i<this.lstReceiptLines.length-len;i++){
                    var rcvLines:FormGroup=this.lineDetailsGroup();
                      control.push(rcvLines);
                    }
                   
                    this.returntoVendorForm.get('rcvLines').patchValue(this.lstReceiptLines);
                    var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
                    var varLineArr = this.returntoVendorForm.get('rcvLines').value;
            
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

                  } else {alert ( "No Line Items Found in this PO Receipt.");}
                  this.updateShipId()
              } );    
            }
         


          OnhandQtyCheck(mItemId,subinvId,mLocatorId,index) {
            // alert (mItemId +","+subinvId +","+index);
              var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
              var rtvLineArr = this.returntoVendorForm.get('rcvLines').value;
              // this.service.getfrmSubLoc(this.locId,mItemId,subinvId)
              this.service.getonhandqty(this.locId,subinvId,mLocatorId,mItemId)
                .subscribe(
                data => {
                  // this.ItemLocatorList = data;
                  // console.log(this.ItemLocatorList);
                  // var avlQty=this.ItemLocatorList[0].onHandQty
                  // alert("Available Qty :" +avlQty)
                  // patch.controls[index].patchValue({qtyOnHand:avlQty})

                  this.ItemLocatorList = data.obj;
                  console.log(this.ItemLocatorList);
                  var avlQty=this.ItemLocatorList;
                  patch.controls[index].patchValue({qtyOnHand:avlQty})


                  }
              
              ); }
          


          updateShipId() {

            var billToLoc = this.returntoVendorForm.get('billToLocId').value;
            // var pShipHeaderId = this.returntoVendorForm.get('shipHeaderId').value;
            var pShipHeaderId=this.lstReceiptHeader.shipHeaderId;
            var pHeaderId= this.returntoVendorForm.get('poHeaderId').value;
            // alert("billToLocId :"+billToLoc +" parentShipHeaderId :"+pShipHeaderId);
    
            var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
            var varLineArr = this.returntoVendorForm.get('rcvLines').value;
    
            for (let i = 0; i <  this.lineDetailsArray.length ; i++) 
            {
              var x=varLineArr[i].shipLineId;
              patch.controls[i].patchValue({parentShipHeaderId:pShipHeaderId})
              patch.controls[i].patchValue({parentShipLineId:x})
              patch.controls[i].patchValue({billToLocId:billToLoc})
              patch.controls[i].patchValue({shipLineId:null})
              patch.controls[i].patchValue({poHeaderId:pHeaderId})
              patch.controls[i].patchValue({baseAmount:0})
              patch.controls[i].patchValue({taxAmount:0})
              patch.controls[i].patchValue({totAmount:0})
              patch.controls[i].patchValue({totAmount:0})
              patch.controls[i].patchValue({locId:billToLoc})
         
            }
          }
     
     



        transeData(val) {
    
          delete val.loginArray;
          delete val.loginName;
          delete val.locName;
          delete val.ouName;
          // delete val.locId;
          delete val.ouId;
          delete val.deptId;
          // delete val.emplId;
          delete val.orgId;

          delete val.searchReceiptNo;
          delete val.searchBypoNumber;

          delete val.suppInvNo;
          delete val.suppInvDate;
          delete val.poDate;
          delete val.poNumber;
          delete val.orderType;
          delete val.frmDate;
          delete val.toDate;
          delete val.showAllLines;
          delete val.itemType;

         
         return val;
        }


        CheckRtnLineValidations(index) {

        //  alert('addrow index '+index);
         var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
         var rtnLineArr = this.returntoVendorForm.get('rcvLines').value;
         var len1=rtnLineArr.length;

          var rcdQty =rtnLineArr[index].qtyReceived;
          var rtnQty =rtnLineArr[index].qtyReturn;
          var avlQty=rtnLineArr[index].qtyOnHand;
          var itmName =rtnLineArr[index].itemName;
          var chkFlag   = rtnLineArr[index].selectFlag;

          if(itmName ===null ||itmName ===undefined ) {
            alert("Line-"+(index+1)+ " ITEM NUMBER :  Should not be null");
            this.rtnLineValidation=false;
            return;}

             if(rtnQty ===null ||rtnQty ===undefined || rtnQty<=0 || rtnQty>rcdQty || rtnQty>avlQty) {
              alert("Line-"+(index+1)+ " RETURN QTY :  Should be above Zero And should not be above Received Qty/Onhand Qty ."+rtnQty +","+itmName);
              this.rtnLineValidation=false;
              return;}
              this.rtnLineValidation=true;
        
          }


        selectFlagCheck() {

        var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
         var rtnLineArr = this.returntoVendorForm.get('rcvLines').value;
         var len1=rtnLineArr.length;
         for (let i = 0; i < len1 ; i++)  {
          var chkFlag   = rtnLineArr[i].selectFlag;
          if (chkFlag===true) {
            this.rtnChkboxValidation===true;
             return;
          }else{ this.rtnChkboxValidation===false;}
        } }



    LineSelectFlag(e,index) {
      var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
      var rtvLineArr = this.returntoVendorForm.get('rcvLines').value;
      this.lineItemRepeated=false;

      var mItemId =rtvLineArr[index].invItemId;
      var subinvId =rtvLineArr[index].subInventoryId;
      var mLocatorId=rtvLineArr[index].locatorId;
      // mLocatorId=101;
      // alert ("Item Id :" +mItemId  + " Index : "+ index + " Repeat Status :" +this.lineItemRepeated);
      
       if(mItemId >0) {
       this.CheckForitemRepeat(mItemId,index)
       if(this.lineItemRepeated) { 
        //  alert ("Item already in the List...."); 
        this.lineDetailsArray.removeAt(index);
        this.CalculateTotal();
         return;
        }


      if ( e.target.checked) {
        // this.showQtyRtncol =true;
        this.lineDetailsArray.controls[index].get('qtyReturn').enable();
        var len1=rtvLineArr.length;

        // this.service.getfrmSubLoc(this.locId,mItemId,subinvId)
          this.service.getonhandqty(this.locId,subinvId,mLocatorId,mItemId)
          .subscribe(
          data => {
            // this.ItemLocatorList = data;
            this.ItemLocatorList = data.obj;
            console.log(this.ItemLocatorList);

            // var avlQty=this.ItemLocatorList[0].onHandQty
            var avlQty=this.ItemLocatorList;
            // alert ("Onhand Quantity Available in Locator :" +mLocatorId+" - Avaialable Qty : " +avlQty);
            patch.controls[index].patchValue({qtyOnHand:avlQty})

            if (avlQty <=0 ) {
              if(avlQty==null) {avlQty=0;}
              alert ("Onhand Quantity not Available - Avaialable Qty : " +avlQty);
               patch.controls[index].patchValue({selectFlag:''})
              this.lineDetailsArray.controls[index].get('qtyReturn').disable();
              return;
             }

            }
        );

            
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


   


  rtvSave(){
      var rtnLineArr = this.returntoVendorForm.get('rcvLines').value;

      var len1=rtnLineArr.length;
    
       for (let i = 0; i < len1 ; i++)  {
        this.CheckRtnLineValidations(i)
       }

       if ( this.rtnLineValidation) {
      const formValue: IRtnToVendor = this.transeData(this.returntoVendorForm.value);
      this.locId=Number(sessionStorage.getItem('locId'));

        console.log(this.lstReceiptLines);
        this.shipHeaderId=null;
        this.saveButton=false;
        
   
        this.service.rtvSaveSubmit(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            this.rtnDocNo=res.obj;
            this.disabled = false;
            this.disabledLine=false;
            this.displayButton=false;
            alert(res.message);
            // this.returntoVendorForm.reset();
            this.returntoVendorForm.disable();
          } else {
            if (res.code === 400) {
              alert('Data already present in the data base');
              // this.returntoVendorForm.reset();
            }
          }
        });
    } else { alert ("Validation Failed ... \nPosting not done...");} 
  }



    onSelectionLocatorId(mLocatorId:number,index:number){

      this.validateQty(index)
      var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
      var qtyLineArr = this.returntoVendorForm.get('rcvLines').value;
      var lineRtnQty = qtyLineArr[index].qtyReturn;
     

      if(this.validQtyEntered) {

      let select = this.ItemLocatorList.find(d => d.locatorId === mLocatorId);
      let controlinv = this.returntoVendorForm.get('rcvLines') as FormArray;
      (controlinv.controls[index]).patchValue({ locatorDesc: select.segmentName });
      var locatorQty = select.onHandQty;

      alert ("Stock Locator :  " +select.segmentName +"\nOnHand Quantity :  "+locatorQty);
      
      if(lineRtnQty>locatorQty) {
        alert("Return Qty > Onhand Qty available in location :"+select.segmentName);
        patch.controls[index].patchValue({selectFlag:''})
        return;
      }

    }  else {
          this.ItemLocatorList=null;
          patch.controls[index].patchValue({selectFlag:''})
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

     showAll(e) {
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



      showLineLov(mPonumber,mRcptNumber) {
        // alert("in showlov...");
        // this.lineDetailsArray.reset()
        this.service.getsearchByReceiptNoLine(mPonumber,mRcptNumber)
        .subscribe(
          data => {
            this.PoRcptLineItemList = data.obj;
            // alert("Line item status :"+this.PoRcptLineItemList);
             if(this.PoRcptLineItemList==null ) {
               this.lineStatus=false;
             } else {
                console.log(this.PoRcptLineItemList);
                this.lineStatus=true;
                this.validateStatus=true;
                // this.lineDetailsArray.controls[0].get('itemName').enable();
                
             }  }   );
        }

      CheckForitemRepeat(mItem,index) {
        var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
      var varLineArr = this.returntoVendorForm.get('rcvLines').value;
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

     


      onItemSelected(mItem, index) {

          this.lineDetailsArray.controls[index].get('qtyReturn').disable();
          let selectedValue = this.PoRcptLineItemList.find(v => v.itemName === mItem);
            if( selectedValue != undefined){

          console.log(selectedValue);
           var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
      
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
              poHeaderId: this.returntoVendorForm.get('poHeaderId').value,
              poLineId: pLineId,
              poChargeAcc: selectedValue.poChargeAcc,
              billToLocId:this.returntoVendorForm.get('billToLocId').value,
              parentShipHeaderId:  this.lstReceiptHeader.shipHeaderId,
              parentShipLineId:selectedValue.shipLineId,
             
        
            }
          );


        } 
      }

    
   

    clearSearch() {
     this.resetMast();
     this.returntoVendorForm.get("searchReceiptNo").enable();
    }

    rtnSearchByDate(mFromDate,mToDate){
      alert ("WIP.... Return List....." + this.pipe.transform(mFromDate,'dd/MMM/yyyy') +" To "+this.pipe.transform(mToDate,'dd/MMM/yyyy'));

    }

    rtnSearchByDocNo(mRtnNumber){
      alert ("WIP.... Return Number....." +mRtnNumber);
      this.service.getsearchByReceiptNo(mRtnNumber,this.locId)
      .subscribe(
        data => {
          this.lstReceiptRtnHeader = data.obj;
          // this.lstReceiptRtnItemLines=data.obj.rcvLines;
          console.log(this.lstReceiptRtnHeader);
        //  if(data.code===200){
        //  }
        });
      }



    

    validateSave() 
    {

      
      var rtvLineArr = this.returntoVendorForm.get('rcvLines').value;
      var len1 = rtvLineArr.length;
    
      for (let i = 0; i < len1; i++) {
                 
        if (rtvLineArr[i].selectFlag === true) {
          this.CheckLineValidations(i);
        }

      }

     
      if (this.lineValidation) {
                var lrm=0;
                for (let i = len1 - 1; i >= 0; i--) {
                  if (this.lineDetailsArray.controls[i].get('selectFlag').value != true) {
                    this.lineDetailsArray.removeAt(i);
                    lrm=lrm+1;
                
                  } 
                  
                  this.saveButton = true;
                  this.showQtyRtncol=false;
                  this.validateStatus=false;
                  // this.lineDetailsArray.controls[i].get('qtyReturn').disable();
                  this.lineDetailsArray.controls[i].get('selectFlag').disable();
                 
                } 
                
                if(lrm===len1) { this.resetMast();} 
                else {
                   this.saveButton = true; 
                   this.validateStatus=false;
                   this.showQtyRtncol=false;
                  }

      } else  {
             alert ("Data validation Failed . Please check Line Item Number/Return Qty");
              this.saveButton = false;
            }
              this.CalculateTotal();
             

    }


    CheckLineValidations(i) {

       
      var rtvLineArr = this.returntoVendorForm.get('rcvLines').value;
      var itemcd = rtvLineArr[i].itemName;
      var rtnQty = rtvLineArr[i].qtyReturn;
      var chkFlag = rtvLineArr[i].selectFlag;
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
  
      // if (chkFlag === false || chkFlag === null || chkFlag === undefined) {
      //   alert("Line-" + j + " : Line not Selected.Pls Select the Line");
      //   this.lineValidation = false;
      //   return;
      // }
  
      this.lineValidation = true;
    }

    getInvItemId($event)
    {
      // alert('in getInvItemId')
       let userId=(<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
       this.userList2=[];
       if (userId.length > 2) {
        if ($event.timeStamp - this.lastkeydown1 > 200) {
          this.userList2 = this.searchFromArray1(this.PoRcptLineItemList, userId);
        }
      }
    }
    searchFromArray1(arr, regex) {
      let matches = [], i;
      for (i = 0; i < arr.length; i++) {
        if (arr[i].match(regex)) {
          matches.push(arr[i]);
        }
      }
      return matches;
    };
   


    findPoReceiptItem(index){
       this.checkBoxAllItem=false;
       this.indReturn=true;
      var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
      var qtyLineArr = this.returntoVendorForm.get('rcvLines').value;
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
          poHeaderId: this.returntoVendorForm.get('poHeaderId').value,
          poLineId: pLineId,
          poChargeAcc: selectedValue.poChargeAcc,
          billToLocId:this.returntoVendorForm.get('billToLocId').value,
          parentShipHeaderId:  this.lstReceiptHeader.shipHeaderId,
          parentShipLineId:selectedValue.shipLineId,
         
       }
      );
      } else 
          {alert("Item Code doesnt Exists in this PO Receipt Or\nReturn Already done for this Item Or\nWrong Item Code.");
          patch.controls[index].patchValue({itemName:''});
    
          }

    }
    

 
}
