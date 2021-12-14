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
import { ServiceService } from '../service.service';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

interface IjcOpening { }

@Component({
  selector: 'app-jobcard-opening',
  templateUrl: './jobcard-opening.component.html',
  styleUrls: ['./jobcard-opening.component.css']
})

export class JobcardOpeningComponent implements OnInit {
      jobcardOpeningForm : FormGroup;
  
        pipe = new DatePipe('en-US');
        now = Date.now();
        public minDate = new Date();

        public OUIdList            : Array<string> = [];
        public BankList            : Array<string> = [];
        lstJobcardList :any
        lstStatementLines:any
        lstAvlBnkLines:any;

        lstcomments:any;

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

        jcNumber:string;
        jcDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
        regNum:string;
        jStatus:string;
        custName:string;
        custAccount:number;
        contactNo:number;

              
        get f() { return this.jobcardOpeningForm.controls; }
        jobcardOpening(jobcardOpeningForm:any) {  }
  
        constructor(private fb: FormBuilder, private router: Router, private orderManagementService: OrderManagementService, private service: MasterService, private serviceService: ServiceService) {
          this.jobcardOpeningForm = fb.group({ 
  
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

            jcNumber:[],
            jcDate:[],
            regNum:[],
            jStatus:[],
            custName:[],
            custAccount:[],
            contactNo:[],

          

           
            ceLineList: this.fb.array([this.invLineDetails()]),
            avlList: this.fb.array([this.avlLineDetails()]),
          });
        }
      
        invLineDetails() {
          return this.fb.group({
            lineNumber:[],
            statementLineId:[],
            trxType:[],
            trxCode:[],
            bankTrxNumber:[],
            trxDate:[],
            valueDate:[],
            amount:[],
            amtRecon:[],
            charges:[],
            status:[],
           
           
      
          })
        }

        avlLineDetails() {
          return this.fb.group({
            selectFlag:[],
            checkId:[],
            invTypeLookupCode:[],
            bankAccountNo:[],
            appAmt:[],
            glDate:[],
            date1:[],
            docNo:[],
            voucherNo:[],
           
                
          })
        }



      
        invLineArray(): FormArray {
          return <FormArray>this.jobcardOpeningForm.get('ceLineList')
        }

        avlLineArray(): FormArray {
          return <FormArray>this.jobcardOpeningForm.get('avlList')
        }
  




        ngOnInit(): void {

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


          this.service.bankList(this.ouId)
          .subscribe(
            data => {
              this.BankList = data;
              console.log(this.BankList);
            }
          );



        }

        
        clearSearch(){}
        newJob(){}

        jobcardFind() {
          var jcNum=this.jobcardOpeningForm.get('jcNumber').value
          jcNum=jcNum.toUpperCase();
                 
          this.serviceService.getJonCardNoSearch(jcNum)
            .subscribe(
              data => {
                this.lstJobcardList = data;
                console.log(this.lstJobcardList); 
                alert(data.driverName);
                alert( "this.lstJobcardList.driverName :"+ this.lstJobcardList.driverName);
                // if (this.lstJobcardList !=null) {    
                        
                // }  else { alert (jcNum + " Job Card Not Found...")}
              });
            
            }

        
            

}
