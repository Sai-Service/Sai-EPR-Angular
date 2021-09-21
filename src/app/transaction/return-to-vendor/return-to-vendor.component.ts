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
  // totalAmt:number;
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
  locatorId:number;
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
  lstReceiptLines: any;
  lstcomments: any;
  lstcompolines: any;
  getPoReceiptDetails:  Array<any> = [];
  
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
    // emplId :number;
      public emplId =6;

      // searchReceiptNo: number;
      // searchBypoNumber:number;
      locatorDesc:string;
      
      searchBypoNumber=2181211101212100;
      // searchReceiptNo=1000158;

      searchReceiptNo=22111727;

      poStatus:string;
      shipHeaderId:number
      poHeaderId:number;
      segment1:string;
      suppId:number;
      suppNo:number;
      supplierName:string;
      shipmentNo:number;
      receiptNo:number;
      billToLocId:number;
      shipmentDate:Date;
      receiptDate:Date;
      shipToLocId:number;
      ewayBillNo:string;
      ewayBillDate:Date;
      gstDocNo:string;
      gstDocDate:Date;
      baseAmount:number;
      totalAmt:number;
      apInvNum:string;
      apInvDate:Date;

      poDate:Date;
      suppInvNo:string;
      suppInvDate:Date;
      taxAmt:number;
      public itemType= 'RETURN';
      

               
      returnTo='Supplier'

      displayButton = true;
      rtnLineValidation=true;
      rtnChkboxValidation=true;

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
      showAllLines: string;
      showAllItem=false;
      headerFound=false;
      showQtyRtncol=false;
      lineValidation=false;
      lineItemRepeated=false;

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
            billToLocId:[],
            shipmentDate:[],
            receiptDate:[],
            shipToLocId:[],
            ewayBillNo:[],
            ewayBillDate:[],
            gstDocNo:[],
            gstDocDate:[],
            baseAmount:[],
            totalAmt:[],
            apInvNum:[],
            apInvDate:[],
      
            poDate:[],
            suppInvNo:[],
            suppInvDate:[],
            taxAmt:[],

            showAllLines:[],
            itemType:[],
          
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
            locatorId:[],
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
          // this.emplId= Number(sessionStorage.getItem('emplId'));
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

   
        SearchByPONumber(mPoNumber){
          alert("WIP-PO: "+mPoNumber);
          this.service.getPOReceiptSearchByPONo(mPoNumber)
          .subscribe(
            data => {
             this.lstcomments = data.obj;
             console.log(this.lstcomments);
          }   );}
    

        validateQty(index: any){
   
          var qtyLineArr = this.returntoVendorForm.get('rcvLines').value;
          var lineRtnQty = qtyLineArr[index].qtyReturn;
          var lineRcdQty  = qtyLineArr[index].qtyReceived;
          var uPrice= qtyLineArr[index].unitPrice;
          var taxP= qtyLineArr[index].taxPercentage;
          var avlQty = qtyLineArr[index].qtyOnHand;
          this.showLocator=true;
          this.validQtyEntered=true;
          
          var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
        
          if (lineRtnQty <=0 || lineRtnQty>lineRcdQty || lineRtnQty > avlQty ) 
          {
             alert ("Invalid Quantity.[RETURN QTY] should be above zero / Should not be grater than [QTY RECEIVED] or [ON HAND QTY]")
      
             patch.controls[index].patchValue({qtyReturn:''})
             patch.controls[index].patchValue({baseAmount:0})
             patch.controls[index].patchValue({taxAmount:0})
             patch.controls[index].patchValue({totAmount:0})
             patch.controls[index].patchValue({selectFlag:''})
            //  this.showQtyRtncol=false;

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
                totBaseAmt =totBaseAmt+rtnLineArr[index].baseAmount;
                totTaxAmt =totTaxAmt+rtnLineArr[index].taxAmount;
                netTotalAmt =netTotalAmt+rtnLineArr[index].totAmount;
                }
               
                  this.baseAmount=totBaseAmt;
                  this.taxAmt=totTaxAmt;
                  this.totalAmt=netTotalAmt;

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
           this.returntoVendorForm.get("searchReceiptNo").disable();
        
          this.service.getsearchByReceiptNo(mRcptNumber)
          .subscribe(
            data => {
              this.lstReceiptHeader = data;
              console.log(this.lstReceiptHeader);
              // alert(this.lstReceiptHeader.receiptNo);
              // alert("PO /Receipt Number :"+this.lstReceiptHeader.segment1+"," +mRcptNumber);
              if(this.lstReceiptHeader !=null) {
                this.showLineLov(this.lstReceiptHeader.segment1,mRcptNumber);
                this.headerFound=true;
                this.segment1=this.lstReceiptHeader.segment1;
                this.poDate=this.lstReceiptHeader.poDate;
                this.receiptNo=this.lstReceiptHeader.receiptNo;
                this.receiptDate=this.lstReceiptHeader.receiptDate;
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
                           
              } else{alert ("PO Reeceipt Number : "+mRcptNumber +" Not Found / doesn't exists.");
                this.headerFound=false;this.resetMast();}
               
          } );  

        
               
         }


         SearchByPoRcptNumberLine(){
          // alert("PO / Receipt Number :"+this.segment1 +","+this.receiptNo);
           this.service.getsearchByReceiptNoLine(this.segment1,this.receiptNo)
           .subscribe(
             data => {
               this.lstReceiptLines = data.obj;
               console.log(this.lstReceiptLines);
              //  alert(this.lstReceiptLines)
              //  if(this.lstReceiptLines !=null) {
                let control = this.returntoVendorForm.get('rcvLines') as FormArray;
                var rcvLines:FormGroup=this.lineDetailsGroup();
                // var length1=this.lstReceiptLines.rcvLines.length-1;
                var length1=this.lstReceiptLines.length-1;

                this.lineDetailsArray.removeAt(length1);
                  var len=this.lineDetailsArray.length;
                  for ( var i=0;i<this.lstReceiptLines.length-len;i++){
                      control.push(rcvLines);
                    }

                    this.returntoVendorForm.get('rcvLines').patchValue(this.lstReceiptLines);


                    var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
                    var varLineArr = this.returntoVendorForm.get('rcvLines').value;
            
                    for (let i = 0; i <  this.lineDetailsArray.length ; i++) 
                    {
                      var x=varLineArr[i].invItemId;
                      var y=varLineArr[i].subInventoryId;
                      this.OnhandQtyCheck(x,y,i)
                      
                    }
                   
 
                 
                  this.updateShipId()

       
             
            // } 
           } );   
          }


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
          delete val.emplId;
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

         for (let i = 0; i < len1 ; i++)  {

          var rcdQty =rtnLineArr[index].qtyReceived;
          var rtnQty =rtnLineArr[index].qtyReturn;
          var avlQty=rtnLineArr[index].qtyOnHand;
          var itmName =rtnLineArr[index].itemName;
          var chkFlag   = rtnLineArr[index].selectFlag;

          if(itmName ===null ||itmName ===undefined ) {
            alert("Line-"+(index+1)+ " ITEM NUMBER :  Should not be null");
            this.rtnLineValidation=false;
            // e.target.checked=false;
            return;}

          // if(chkFlag===true) {
            if(rtnQty ===null ||rtnQty ===undefined || rtnQty<=0 || rtnQty>rcdQty || rtnQty>avlQty) {
              alert("Line-"+(index+1)+ " RETURN QTY :  Should be above Zero And should not be above Received Qty/Onhand Qty .");
              this.rtnLineValidation=false;
              // e.target.checked=false;
              return;}

          //  }

          }
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

      if ( e.target.checked) {
        this.showQtyRtncol =true;

      var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
      var rtvLineArr = this.returntoVendorForm.get('rcvLines').value;
      var len1=rtvLineArr.length;

         // for (let i = 0; i < len1 ; i++)  {

        var mItemId =rtvLineArr[index].invItemId;
        var subinvId =rtvLineArr[index].subInventoryId;
              // alert("itemid,subinvid,locid :"+ mItemId +","+subinvId +","+this.locId);
          // this.service.getfrmSubLoc(120,42,1)
          // alert ("inventoryId ,subInventoryId:" +mItemId  + " , "+subinvId);
        // var avlQty=0;
        this.service.getfrmSubLoc(this.locId,mItemId,subinvId)
          .subscribe(
          data => {
            this.ItemLocatorList = data;
            console.log(this.ItemLocatorList);
            var avlQty=this.ItemLocatorList[0].onHandQty
            // alert("Available Qty :" +avlQty)
            patch.controls[index].patchValue({qtyOnHand:avlQty})
            }
        
        );

       
    } else { this.ItemLocatorList=null;this.showQtyRtncol =false;}
  }


   


    rtvSave(){
      alert("RTV pposting....wip");
      const formValue: IRtnToVendor = this.transeData(this.returntoVendorForm.value);
      this.locId=Number(sessionStorage.getItem('locId'));

        console.log(this.lstReceiptLines);
        this.shipHeaderId=null;
   
        this.service.rtvSaveSubmit(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            this.receiptNo=res.obj;
            this.disabled = false;
            this.disabledLine=false;
            alert(res.message);
            // this.returntoVendorForm.reset();
            this.returntoVendorForm.disable();
          } else {
            if (res.code === 400) {
              alert('Data already present in the data base');
              this.returntoVendorForm.reset();
            }
          }
        });
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
    // alert("locatiorid,segment anme ,Quanty :" +mLocatorId+"  ," +select.segmentName+" ,"+locatorQty);
  

  }

  
 addRow(index) {

  // this.CheckRtnLineValidations(index);

  if (this.rtnLineValidation==true) 
   {
    this.lineDetailsArray.push(this.lineDetailsGroup());
   }
      
  }


    RemoveRow(index) {
      if (index===0){
    
      }
      else {
        this.lineDetailsArray.removeAt(index);
      }
    
    }

     showAll(e) {
          if(this.headerFound) {
              if ( e.target.checked === true){
                this.showAllItem=true;
                this.SearchByPoRcptNumberLine()   }
              else { 
                // this.lineDetailsArray.reset();   
                this.showAllItem=false;
                this.showLineLov(this.segment1,this.receiptNo);
              } 
          }else {alert("Receipt Header Details Not Found...Please check");
           e.target.checked=false;}
      }

      showLineLov(mPonumber,mRcptNumber) {
        // alert("in showlov...");
        // this.lineDetailsArray.reset()
        this.service.getsearchByReceiptNoLine(mPonumber,mRcptNumber)
        .subscribe(
          data => {
            this.PoRcptLineItemList = data.obj;
            console.log(this.PoRcptLineItemList);
          }
        );

      }

      CheckForitemRepeat(mItem,index) {

        alert ("index, itemid :" +index +" ,"+mItem);
        alert("this.lineDetailsArray.length  :" +this.lineDetailsArray.length);

      var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
      var varLineArr = this.returntoVendorForm.get('rcvLines').value;

      for (let i = 0; i <  this.lineDetailsArray.length ; i++) 
      {
        var x=varLineArr[i].itemName;
        if( i !=index && x===mItem) {

          alert("Item Already in the List .Check Line :"+i);
          this.lineItemRepeated=true;
          break;
        } 
        }
                    
      
    }

     


      onItemSelected(mItem, index) {

        // alert ("in ItemSelect....");

       
          let selectedValue = this.PoRcptLineItemList.find(v => v.itemName === mItem);
          // alert('Item Id :' +selectedValue.invItemId);
          if( selectedValue != undefined){
         
         
          console.log(selectedValue);

          // this.OnhandQtyCheck(selectedValue.invItemId,selectedValue.subInventoryId,index);
          // this.CheckForitemRepeat(mItem,index);


          // var arrayControl = this.returntoVendorForm.get('rcvLines').value
          var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
           // this.itemId = selectedValue.itemId;
          // console.log(this.invItemId, this.taxCat);
          // alert("PO line id :"+selectedValue.poLineId);
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

      OnhandQtyCheck(mItemId,subinvId,index) {
          var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
          var rtvLineArr = this.returntoVendorForm.get('rcvLines').value;
          var avlQty=0;
          this.service.getfrmSubLoc(this.locId,mItemId,subinvId)
            .subscribe(
            data => {
              this.ItemLocatorList = data;
              console.log(this.ItemLocatorList);
              avlQty=this.ItemLocatorList[0].onHandQty
              }
          
          );
          patch.controls[index].patchValue({qtyOnHand:avlQty})
      
    }
    clearSearch() {
     this.resetMast();
     this.returntoVendorForm.get("searchReceiptNo").enable();
    }

      
    

 
}
