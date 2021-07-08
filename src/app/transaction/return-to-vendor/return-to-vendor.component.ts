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
  getPoReceiptDetails:  Array<any> = [];
  public locIdList: Array<string> = [];

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

      searchReceiptNo: number;
      // searchBypoNumber:number;

      
      searchBypoNumber=2181211101212100;
      // searchByreceiptNo=1000155;

            poNumber:number;
            segment1:number;
            poDate:number;
            receiptNo:number;
            receiptDate:Date;
            orderType:string;
            suppName:string;
            supInvNumber:string;
            supinvDate:Date;
            baseAmount:number;
            taxAmt:number;
            totalAmt:number
            returnTo='Supplier'

            displayButton = true;
            rtnLineValidation=true;

            frmDate= this.pipe.transform(Date.now(), 'y-MM-dd');
            toDate= this.pipe.transform(Date.now(), 'y-MM-dd');

            display1=true;
            display = true;
            displaySaveButton =false;

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
            suppName:[],
            supInvNumber:[],
            supinvDate:[],
            baseAmount:[],
            taxAmt:[],
            totalAmt:[],

            frmDate:[],
            toDate:[],


            rcvLines: this.fb.array([this.lineDetailsGroup()]), 

          });
        }

        lineDetailsGroup() {
          return this.fb.group({
            poLineId:[],
            poHeaderId:[],
            invItemId:[],
            itemName:[],
            itemDesc:[],
            qtyReceived: [],
            qtyReturn:[],
            returnTo:[],
            // supplier:[],
            selectFlag:[],
          });
        }

        lineDetailsArray() :FormArray{
          return <FormArray>this.returntoVendorForm .get('rcvLines')
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
   
          var qtyLineArr = this.returntoVendorForm.get('rcvLines').value;
          var lineQty = qtyLineArr[index].qtyReturn;
          
          // alert("qty validation-index ,qnty >> " +index +","+lineQty);
      
          if (lineQty <=0 ) 
          {
             alert ("Invalid Quantity.Quantity should be above 0")
      
             var patch = this.returntoVendorForm.get('rcvLines') as FormArray;
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
          this.lineDetailsArray().removeAt(i);
        }
    
        // alert("rcvLines LENGTH: "+ select.rcvLines.length);
        if(select.rcvLines1.length>0){
    
           this.lineDetailsArray().clear();
    
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
       
        //  var control = this.returntoVendorForm.get('rcvLines') as FormArray;
        //  var rcvLines:FormGroup=this.lineDetailsGroup();
        //  control.push(rcvLines);
           
   
       }


       SearchByRcptNumber(mRcptNumber:any){
          // this.lineDetailsArray.clear();
          this.displaySaveButton =false;
          // alert(segment1);
          alert("REceipt number:"+mRcptNumber);
          this.returntoVendorForm.reset();
         
          this.service.getsearchByReceiptNo(mRcptNumber)
            .subscribe(
              data => {
                this.lstReceiptLines = data;
                console.log(this.returntoVendorForm.value);
                alert("this.lstReceiptLines.length ="+this.lstReceiptLines.length);

                let control = this.returntoVendorForm.get('rcvLines') as FormArray;
                var rcvLines:FormGroup=this.lineDetailsGroup();
                var length1=this.lstReceiptLines.rcvLines.length-1;
                alert("this.lstReceiptLines.length ="+this.lstReceiptLines.length);

                this.lineDetailsArray().removeAt(length1);
               

                var len=this.lineDetailsArray.length;
            
                for ( var i=0;i<this.lstReceiptLines.rcvLines.length-len;i++){
                  control.push(rcvLines);
                }
            
                this.returntoVendorForm.get('rcvLines').patchValue(this.lstReceiptLines.rcvLines);
                this.returntoVendorForm.patchValue(this.lstReceiptLines);
               
            }
            
            );  
        }


 
}
