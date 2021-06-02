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


interface IMcpitemMaster {
 
  itemId:number;
  
  }

@Component({
  selector: 'app-mcp-item-master',
  templateUrl: './mcp-item-master.component.html',
  styleUrls: ['./mcp-item-master.component.css']
})


export class McpItemMasterComponent implements OnInit {
  mcpItemMasterForm : FormGroup;

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
       // emplId :number;
        public emplId =6;

        itemId:number;
        itemNumber: string;
        itemName:string;
        itemDesc:string;
        itemType:string;
        discount:number;
        startDate:Date;
        endDate:Date;

        //////////////////////////////////
        displayInactive = true;
        Status1: any;
        inactiveDate: Date;
        display = true;
        displayButton = true;
        displaySuccess=false;
        //////////////////////////////////
  

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
            // this.emplId= Number(sessionStorage.getItem('emplId'));
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
            alert ("Posting data  to MCP ITEM MASTER.....")
           
            // const formValue: IPaymentRcpt =this.paymentReceiptForm.value;
            const formValue: IMcpitemMaster =this.transeData(this.mcpItemMasterForm.value);
            // debugger;
            this.service.McpItemMasterSubmit(formValue).subscribe((res: any) => {
              if (res.code === 200) {
                alert('RECORD INSERTED SUCCESSFUILY');
                this.displaySuccess=true;
                this.mcpItemMasterForm.reset();
              } else {
                if (res.code === 400) {
                  alert('Code already present in the data base');
                  this.displaySuccess=false;
                  this.mcpItemMasterForm.reset();
                }
              }
            });
          }


          updateMast() {
            // alert ("Putting data  to mcp ite master......")
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

}



