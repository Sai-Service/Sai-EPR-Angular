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


interface IRtnToVendor { }

@Component({
  selector: 'app-return-to-vendor',
  templateUrl: './return-to-vendor.component.html',
  styleUrls: ['./return-to-vendor.component.css']
})
export class ReturnToVendorComponent implements OnInit {
  returntoVendorForm : FormGroup;
  pipe = new DatePipe('en-US');
  public DepartmentList: Array<string> = [];

  lstcomments: any[];

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

      // searchByreceiptNo: number;
      // searchBypoNumber:number;

      
      searchBypoNumber=2181211101212100;
      searchByreceiptNo=1000155;

            poNumber:number;
            poDate:number;
            receiptNumber:Date;
            receiptDate:Date;
            orderType:string;
            supNumber:string;
            supInvNumber:string;
            supinvDate:Date;
            baseAmount:number;
            taxAmt:number;
            totalAmt:number

            displayButton = true;
            rtnLineValidation=true;

            frmDate= this.pipe.transform(Date.now(), 'y-MM-dd');
            toDate= this.pipe.transform(Date.now(), 'y-MM-dd');

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

            searchByreceiptNo:[],
            searchBypoNumber:[],
         

            poNumber:[],
            poDate:[],
            receiptNumber:[],
            receiptDate:[],
            orderType:[],
            supNumber:[],
            supInvNumber:[],
            supinvDate:[],
            baseAmount:[],
            taxAmt:[],
            totalAmt:[],

            frmDate:[],
            toDate:[],


            PoReceiptLines: this.fb.array([this.lineDetailsGroup()]), 

          });
        }

        lineDetailsGroup() {
          return this.fb.group({
            poLineId:[],
            poHeaderId:[],
            receivedQty: [],
            returnQty:[],
            itemId:[],
            itemDesc:[],
            returnTo:[],
            supplier:[],
            selectFlag:[],
          });
        }

        lineDetailsArray() :FormArray{
          return <FormArray>this.returntoVendorForm .get('PoReceiptLines')
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

          this.service.DepartmentList()
          .subscribe(
            data => {
              this.DepartmentList = data;
              console.log(this.DepartmentList);
            }
          );


        }


        SearchByRcptNumber(mRcptNumber:any) {

          alert("WIP-RCPT:"+mRcptNumber );
          this.service.getPOReceiptSearchByRcptNo(mRcptNumber)
          .subscribe(
           data => {
            this.lstcomments = data;
            console.log(this.lstcomments);
         }
        );

        alert("lenght:" +this.lstcomments.length);
      
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
   
          var qtyLineArr = this.returntoVendorForm.get('PoReceiptLines').value;
          var lineQty = qtyLineArr[index].returnQty;
          
          // alert("qty validation-index ,qnty >> " +index +","+lineQty);
      
          if (lineQty <=0 ) 
          {
             alert ("Invalid Quantity.Quantity should be above 0")
      
             var patch = this.returntoVendorForm.get('PoReceiptLines') as FormArray;
             patch.controls[index].patchValue({returnQty:''})
          }
        }

        SelectFlag1(e,index) {
          this.rtnLineValidation=true;
        //  if ( e.target.checked) {alert("Checked...");} else {alert("Unchecked...");}

         if ( e.target.checked) {

         var patch = this.returntoVendorForm.get('PoReceiptLines') as FormArray;
         var rtnLineArr = this.returntoVendorForm.get('PoReceiptLines').value;
         var len1=rtnLineArr.length;
         for (let i = 0; i < len1 ; i++)  {

           var rtnQty =rtnLineArr[index].returnQty;
           var itmId =rtnLineArr[index].itemId;

           if(rtnQty ===null ||rtnQty ===undefined || rtnQty<=0 ) {
            alert("Line-"+(index+1)+ "RETURN QTY :  Should be above Zero.");
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
 
}
