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
// import { now } from 'jquery';


interface IMcpitemMaster {
 
  itemId:number;
  itemNumber:string;
  itemType:number;
  itemName:string;
  itemDesc:string;
  discount:number;
  startDate:Date;
  endDate:Date;

  }

@Component({
  selector: 'app-mcp-item-master',
  templateUrl: './mcp-item-master.component.html',
  styleUrls: ['./mcp-item-master.component.css']
})


export class McpItemMasterComponent implements OnInit {
  mcpItemMasterForm : FormGroup;

  pipe = new DatePipe('en-US');


        public OUIdList           : Array<string> = [];
        public ItemTypeList1       :Array<string> = [];

        lstcomments: any;

        loginName:string;
        divisionId:number;
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

        itemId:number;
        itemNumber: string;
        itemName:string;
        itemDesc:string;
        itemType:string;
        discount:number;
        // startDate:Date;
        startDate = this.pipe.transform(Date.now(), 'y-MM-dd');
        endDate:Date;
            
    // startDate = Date.now();
        

       
        // receiptDate = this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
        

        //////////////////////////////////
        checkValidation=false;
        displayInactive = true;
        Status1: any;
        inactiveDate: Date;
        display = true;
        displayButton = true;
        displaySuccess=false;
        //////////////////////////////////
        isAlert=false;
        title1="Alert Message Testing..."
        alertMsg : string;
        alertMsgTitle : string;


        ///////////////////////////////
  

  get f() { return this.mcpItemMasterForm.controls; }
  mcpItemMaster(mcpItemMasterForm:any) {  }

        constructor(private service: MasterService,private orderManagementService:OrderManagementService,private  fb: FormBuilder, private router: Router) {
          this.mcpItemMasterForm = fb.group({ 

            loginArray:[''],
            loginName:[''],
            ouName :[''],
            divisionId:[],
            locId:[''],
            locName :[''],
            ouId :[],
            deptId :[],
            emplId:[''],
            orgId:[''],


            itemId:[],
            itemNumber:[],
            itemName:[],
            itemDesc:[],
            itemType:[],
            discount:[],
            startDate:[],
            endDate:[],

          });
        }

          ngOnInit(): void 
          {
            this.name=  sessionStorage.getItem('name');
            this.loginArray=sessionStorage.getItem('divisionName');
            this.divisionId=Number(sessionStorage.getItem('divisionId'));
            this.loginName=sessionStorage.getItem('name');
            this.ouName = (sessionStorage.getItem('ouName'));
            this.ouId=Number(sessionStorage.getItem('ouId'));
            this.locId=Number(sessionStorage.getItem('locId'));
            // this.locName=(sessionStorage.getItem('locName'));
            this.deptId=Number(sessionStorage.getItem('dept'));
            this.emplId= Number(sessionStorage.getItem('emplId'));
            this.orgId=this.ouId;
            console.log(this.loginArray);
            console.log(this.locId);


            this.service.itemTypeList()
            .subscribe(
            data => {
              this.ItemTypeList1 = data;
              console.log(this.ItemTypeList1);
            }
          );

          }
         
          searchMast() {
            this.service.getMcpItemSearch()
              .subscribe(
                data => {
                  this.lstcomments = data;
                  console.log(this.lstcomments);
                }
              );
             }

             Select(itemId: number) {
       
              this.mcpItemMasterForm.reset();
              // this.mviewFlag=1;
              // alert( "mviewFlag :" +this.mviewFlag);
              let select = this.lstcomments.find(d => d.itemId === itemId);
              if (select) {
                this.mcpItemMasterForm.patchValue(select);
                this.itemId = select.itemId;
                this.displayButton = false;
             
             }
             
            }

          transeData(val) {
            delete val.loginArray;
            delete val.loginName;
            delete val.ouName;
            delete val.divisionId;
            delete val.locId;
            delete val.locName;
            delete val.ouId;
            delete val.deptId;
            delete val.orgId;
            // delete val.emplId;
     
            return val;
          }

          newMast() {
            this.CheckDataValidations();

            if (this.checkValidation===true) {
              alert("Data Validation Sucessfull....\nPosting data  to MCP ITEM MASTER TABLE")
           
            // const formValue: IPaymentRcpt =this.paymentReceiptForm.value;
            const formValue: IMcpitemMaster =this.transeData(this.mcpItemMasterForm.value);
            // debugger;
            var mcpItmId = formValue.itemNumber;
            alert(mcpItmId);
            alert(mcpItmId.length);
            alert(mcpItmId.substr(3, mcpItmId.length));
            formValue.itemId = Number (mcpItmId.substr(3,mcpItmId.length)); 
            this.service.McpItemMasterSubmit(formValue).subscribe((res: any) => {
              if (res.code === 200) {
                alert('RECORD INSERTED SUCCESSFUILY');
                this.displaySuccess=true;
                // this.mcpItemMasterForm.reset();
                this.mcpItemMasterForm.disable();
              } else {
                if (res.code === 400) {
                  alert('Code already present in the data base');
                  this.displaySuccess=false;
                  // this.mcpItemMasterForm.reset();
                }
              }
            });
          }else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }
          }


          updateMast() {
            this.CheckDataValidations();

            if (this.checkValidation===true) {
              alert("Data Validation Sucessfull....\nPutting data to MCP ITEM MASTER  TABLE")

              const formValue: IMcpitemMaster =this.transeData(this.mcpItemMasterForm.value);
              this.service.UpdateMcpItemMaster(formValue,formValue.itemId).subscribe((res: any) => {
              if (res.code === 200) {
             
                this.displaySuccess=true;
                // alert('RECORD UPDATED SUCCESSFUILY');
                // window.location.reload();
              } else {
                if (res.code === 400) {
                
                  this.displaySuccess=false;
                  alert('ERROR OCCOURED IN PROCEESS');
                  this.mcpItemMasterForm.reset();
                }
              }
            });
          }else{ alert("Data Validation Not Sucessfull....\nData not Saved...")  }
          }

         

          resetMast() {
            window.location.reload();
          }
        
          closeMast() {
            this.router.navigate(['admin']);
          }

          closeAlert(){
             window.location.reload();
          }

          CheckDataValidations(){
    
            const formValue: IMcpitemMaster = this.mcpItemMasterForm.value;

            if (formValue.itemNumber===undefined || formValue.itemNumber===null || formValue.itemNumber.trim()==='')
            {
               this.checkValidation=false; 
               alert ("ITEM NO : Should not be null....");
              //  this.isAlert=true;
                return;
             } 

             if (formValue.itemType===undefined || formValue.itemType===null)
            {
               this.checkValidation=false; 
               alert ("ITEM TYPE: Should not be null....");
                return;
             } 

              if (formValue.itemName===undefined || formValue.itemName===null || formValue.itemName.trim()==='')
              {
                  this.checkValidation=false; 
                  alert ("ITEM NAME : Should not be null....");
                  return;
                } 

                if (formValue.itemDesc===undefined || formValue.itemDesc===null || formValue.itemDesc.trim()==='')
                {
                    this.checkValidation=false; 
                    alert ("ITEM DESCRIPTION : Should not be null....");
                    return;
                  } 

                if (formValue.discount < 0 || formValue.discount===undefined || formValue.discount===null )
                {
                    this.checkValidation=false;  
                    alert ("DISCOUNT: Should not be below Zero");
                    return;
                } 
                 
                if(formValue.startDate===undefined || formValue.startDate===null ) 
                {
                    this.checkValidation=false;
                    alert ("START DATE: Should not be null value");
                    
                    return; 
                 }

                 //if(formValue.endDate===undefined || formValue.endDate===null || formValue.endDate<=formValue.startDate ) 
                 if(formValue.endDate===undefined || formValue.endDate<=formValue.startDate ) 
                 {
                     this.checkValidation=false;
                     alert ("END DATE: Should not be null value/grater than Start Date.");
                     return; 
                  }

               
              this.checkValidation=true

          }

          AlertDialog(){
            // this.isAlert=true;
            // this.alertMsgTitle="MCP ITEM MASTER"
            // this.alertMsg="Record Updated Successfully..."
            // // alert(this.alertMsg);
            // let msg1 =alert("enter your name" );
            // console.log(msg1);
            // alert(msg1);

            
            // let msg1=prompt("Enter Name:","myname");
        
            // alert(msg1);

            // let deletePost=confirm("Delete?");
            // if(deletePost){
            // alert("Deleted successfully");

            // } else {
            // alert("not Deleted ")


          }
 
}



