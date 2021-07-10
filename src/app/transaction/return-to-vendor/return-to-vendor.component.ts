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
  poLineId:number;
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
  lstReceiptLines: any;
  lstcomments: any;
  lstcompolines: any;
  getPoReceiptDetails:  Array<any> = [];
  public locIdList: Array<string> = [];
  public ItemLocatorList: Array<string> = [];

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
      searchReceiptNo=1000155;

      billToLocId:number;
      shipmentDate:Date;
      shipToLocId:number;
      ewayBillNo:string;
      ewayBillDate:Date;
      gstDocNo:string;
      gstDocDate:Date;
      apInvNum:string;
      apInvDate:Date;

            poNumber:number;
            segment1:number;
            poDate:Date;
            receiptNo:number;
            receiptDate:Date;
            orderType:string;
            supplierName:string;
            suppNo:string;
            suppInvNo:string;
            suppInvDate:Date;
            baseAmount:number;
            taxAmt:number;
            totalAmt:number
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
         

            poNumber:[],
            segment1:[],
            poDate:[],
            receiptNo:[],
            receiptDate:[],
            orderType:[],
            suppNo:[],
            supplierName:[],
            suppInvNo:[],
            suppInvDate:[],
            baseAmount:[],
            taxAmt:[],
            totalAmt:[],

            frmDate:[],
            toDate:[],

            billToLocId:[],
            shipmentDate:[],
            shipToLocId:[],
            ewayBillNo:[],
            ewayBillDate:[],
            gstDocNo:[],
            gstDocDate:[],
            apInvNum:[],
            apInvDate:[],


            // rcvLines: this.fb.array([this.lineDetailsGroup()]), 
            poLines: this.fb.array([this.lineDetailsGroup()]),

          });
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
            subInventoryId:[],
            locatorDesc:[],
            uom:[],
            unitPrice:[],
            taxPercentage:[],
            taxAmount:[],
            sacCode:[],
            totalAmt:[],
            poChargeAcc:[],
            qtyReceived:[],
            qtyReturn:[],
            locId:[],
            baseAmount:[],
            totAmount:[],
            invItemId:[],
            billToLoc:[''],
            categoryId:[''],
            // segment11:['',[Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
            // segment2:['',[Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
            // segment3:['',[Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
            // segment4:['',[Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
            // segment5:['',[Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
            polineNum:[''],
            locatorId:[''],
            selectFlag:[],
          });
        }


        // lineDetailsArray() :FormArray{
        //   return <FormArray>this.returntoVendorForm .get('rcvLines')
        // }

        get lineDetailsArray() {
          return <FormArray>this.returntoVendorForm.get('poLines')
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

           this.service.getLocationSearch()
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



       SearchByRcptNumber1(mRcptNumber)   {
        alert("WIP-RCPTNUMBER: "+mRcptNumber);
        this.service.getPOReceiptSearchByRcptNo(mRcptNumber)
        .subscribe(
          data => {
           this.lstcomments = data.obj;
           console.log(this.lstcomments);

           alert(data.obj.suppId);
        }
       );
    
       }

         
     


        SearchByPONumber(mPoNumber)   {
          alert("WIP-PO: "+mPoNumber);
          this.service.getPOReceiptSearchByPONo(mPoNumber)
          .subscribe(
            data => {
             this.lstcomments = data.obj;
             console.log(this.lstcomments);
          }
         );
      
         }

         


        validateQty(index: any){
   
          var qtyLineArr = this.returntoVendorForm.get('poLines').value;
          var lineRtnQty = qtyLineArr[index].qtyReturn;
          var lineRcdQty  = qtyLineArr[index].qtyReceived;
          
          // alert("qty validation-index ,qnty >> " +index +","+lineQty);
      
          if (lineRtnQty <=0 || lineRtnQty>lineRcdQty ) 
          {
             alert ("Invalid Quantity.[RETURN QTY] should be above zero and Should not be grater than [QTY RECEIVED]")
      
             var patch = this.returntoVendorForm.get('poLines') as FormArray;
             patch.controls[index].patchValue({qtyReturn:''})
          }
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

        
        SearchByRcptNumberxxx(mRcptNumber:any) {
          alert("SearchByRcptNumber>>WIP-RCPT:"+mRcptNumber );
          this.service.getPOReceiptSearchByRcptNo(mRcptNumber)
          .subscribe(
           data => {
            //  this.getPoReceiptDetails = data;
            this.getPoReceiptDetails.push(data);
            console.log(this.getPoReceiptDetails);
            // data.totalAmt=100;
            // this.returntoVendorForm.get('lstcomments').patchValue({totAmt:data.totalAmt})
            // alert("lenght:" +this.lstcomments.length);

            this.returntoVendorForm.patchValue({
              segment1:data.segment1 ,
              receiptNo:data.receiptNo,
              receiptDate:data.receiptDate,
              suppName:data.supplierName, });
                        
         });
       
     }

   

       SearchByRcptNumber(mRcptNumber:any){
        // this.lineDetailsArray.clear();
        this.displaySaveButton =false;
        // alert(segment1);
        console.log(this.returntoVendorForm.value);
        this.service.getsearchByReceiptNo(mRcptNumber)
          .subscribe(
            data => {
              this.lstReceiptLines = data;
              
              if(this.lstReceiptLines !=null) {
              let control = this.returntoVendorForm.get('poLines') as FormArray;
              var poLines:FormGroup=this.lineDetailsGroup();
              var length1=this.lstReceiptLines.rcvLines.length-1;
              this.lineDetailsArray.removeAt(length1);
             
                var len=this.lineDetailsArray.length;
                for ( var i=0;i<this.lstReceiptLines.rcvLines.length-len;i++){
                    control.push(poLines);
                  }
              this.disabled = false;
              this.disabledLine=false;
              this.disabledViewAccounting=false;
              this.returntoVendorForm.get('poLines').patchValue(this.lstReceiptLines.rcvLines);
              this.returntoVendorForm.patchValue(this.lstReceiptLines);

          } else{alert ("PO Reeceipt Number : "+mRcptNumber +" Not Found / doesn't exists.");this.resetMast();}
        } 
          
          );  
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

         
         return val;
        }


        CheckRtnLineValidations(index) {

          // alert('addrow index '+i);
         var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
         var rtnLineArr = this.returntoVendorForm.get('rcvLines').value;
         var len1=rtnLineArr.length;

         for (let i = 0; i < len1 ; i++)  {

          var rcdQty =rtnLineArr[index].qtyReceived;
          var rtnQty =rtnLineArr[index].qtyReturn;
          var itmId =rtnLineArr[index].itemId;
          var chkFlag   = rtnLineArr[index].selectFlag;

          if(chkFlag===true) {
            if(rtnQty ===null ||rtnQty ===undefined || rtnQty<=0 || rtnQty>rcdQty ) {
              alert("Line-"+(index+1)+ "RETURN QTY :  Should be above Zero And should not be above Received Qty .");
              this.rtnLineValidation=false;
              // e.target.checked=false;
              return;}
           }

          }
        
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


        newMast() {

          this.selectFlagCheck()

          if(this.rtnChkboxValidation) {
      
          var rtnLineArr = this.returntoVendorForm.get('rcvLines').value;
          var len1=rtnLineArr.length;

          
          for (let i = 0; i < len1 ; i++) 
            {
              this.CheckRtnLineValidations(i);
            }

        }

            if(this.rtnLineValidation===false ) { 
              alert("Line Validation Failed... \nPlease check all  line data fileds are updated properly..")
              return;
            }
          
        
          alert("nLine Validation : "+this.rtnLineValidation);
          
          if (this.rtnLineValidation) 
          {
            alert("Data Validation Sucessfull....\nPosting data  ")

            const formValue: IRtnToVendor =this.transeData(this.returntoVendorForm.value);
            // var pkId = formValue.packageNumber;
            //  alert(pkId.substr(3, pkId.length));
            // formValue.packageId = Number (pkId.substr(3, pkId.length)); 

            this.service.PoReceiptReturnSubmit(formValue).subscribe((res: any) => {
              if (res.code === 200) {

                
                alert('RECORD INSERTED SUCCESSFUILY');
                this.returntoVendorForm.reset();
              } else {
                if (res.code === 400) {
                  alert('ERROR WHILE INSERTING');
                  this.returntoVendorForm.reset();
                }
              }
            });
          }else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }
    } 


    LineSelectFlag(e,index) {

      if ( e.target.checked) { alert("item Selected..")} else {alert("Item Unselected..");}

      var patch = this.returntoVendorForm.get('poLines') as FormArray;
      var tdsLineArr = this.returntoVendorForm.get('poLines').value;
      var len1=tdsLineArr.length;

      // for (let i = 0; i < len1 ; i++)  {

        var mItemId =tdsLineArr[0].invItemId;
        var subinvId =tdsLineArr[0].subInventoryId;
    
        alert("inv item id :"+ mItemId +","+subinvId +","+this.locId);

        // this.service.getfrmSubLoc(this.locId,mItemId,subinvId)

        this.service.getfrmSubLoc(120,42,1)
        .subscribe(
          data => {
            this.ItemLocatorList = data;
            console.log(this.ItemLocatorList);
          }
        );

    }


    rtvSave(){

      alert("RTV pposting....wip");
     
      const formValue: IRtnToVendor = this.transeData(this.returntoVendorForm.value);
      this.locId=Number(sessionStorage.getItem('locId'));
      console.log(this.lstReceiptLines);
   
  this.service.rtvSaveSubmit(formValue).subscribe((res: any) => {
    if (res.code === 200) {
      this.receiptNo=res.obj;
      this.disabled = false;
      this.disabledLine=false;
      alert(res.message);
      // this.poReceiptForm.reset();
    } else {
      if (res.code === 400) {
        alert('Data already present in the data base');
        // this.poReceiptForm.reset();
      }
    }
  });
    }



  

 
}
