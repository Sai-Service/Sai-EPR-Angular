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
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

interface IBankRecon { }

@Component({
  selector: 'app-bank-reconcillation',
  templateUrl: './bank-reconcillation.component.html',
  styleUrls: ['./bank-reconcillation.component.css']
})

export class BankReconcillationComponent implements OnInit {
    bankReconcillationForm : FormGroup;
  
        pipe = new DatePipe('en-US');
        now = Date.now();
        public minDate = new Date();
        public OUIdList            : Array<string> = [];
        public BankList            : Array<string> = [];
        lstStatementList :any;
        lstStatementLines:any
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

        bankAccountId :string;
        docNumber:number;
        stNumber:number;
        complete:string;

        bankAccountNo:string;
        bankAccountName:string;
        branchName :string;
        statementHeaderId:number;
        statementNumber:number;
        statementDate:Date;
        autoLoadedFlag:string;
        controlBeginBalance:number;
        controlTotalCr:number;
        controlTotalDr:number=0;
        controlEndBalance:number;
        controlDrLineCount:number;
        controlCrLineCount:number;
        currencyCode:string;

        stDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
        glDate=this.pipe.transform(Date.now(), 'y-MM-dd');  



        get f() { return this.bankReconcillationForm.controls; }
        bankReconcillation(bankReconcillationForm:any) {  }
  
        constructor(private service: MasterService,private orderManagementService:OrderManagementService,private  fb: FormBuilder, private router: Router) {
          this.bankReconcillationForm = fb.group({ 
  
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

           
            stDate:[],
            docNumber:[],
            stNumber:[],
            glDate:[],
            complete:[],

            bankAccountName:[],
            branchName :[],
            statementHeaderId:[],
            bankAccountId:[],
            bankAccountNo:[],

            statementNumber:[],
            statementDate:[],
            autoLoadedFlag:[],
            controlBeginBalance:[],
            controlTotalCr:[],
            controlTotalDr:[],
            controlEndBalance:[],
            controlDrLineCount:[],
            controlCrLineCount:[],
           
            currencyCode:[],


            ceLineList: this.fb.array([this.invLineDetails()]),
          });
        }
      
        invLineDetails() {
          return this.fb.group({
            statementLineId:[],
            trxType:[],
            trxCode:[],
            bankTrxNumber:[],
            transDate:[],
            valueDate:[],
            amount:[],
            amtRecon:[],
            charges:[],
            status:[],
           
           
      
          })
        }
      
        invLineArray(): FormArray {
          return <FormArray>this.bankReconcillationForm.get('ceLineList')
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


        SearchByBankAcNo(){
          var bnkAcNo=this.bankReconcillationForm.get("bankAccountNo").value
          alert ("Search By Bank Account No -WIP  :" +bnkAcNo);
        }

        clearSearch(){

        this.bankReconcillationForm.get('bankAccountNo').reset();
        this.bankReconcillationForm.get('docNumber').reset();
        this.bankReconcillationForm.get('stNumber').reset();
        this.bankReconcillationForm.get('complete').reset();
        // this.bankReconcillationForm.get('stDate').reset();
        // this.bankReconcillationForm.get('glDate').reset();
        this.stDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
        this.glDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
        // this.lstcomments = null;

        }


        bnkFind(){

          var bnkAcId=this.bankReconcillationForm.get("bankAccountId").value
          this.service.getBankReconStatement1(bnkAcId, this.ouId)
            .subscribe(
              data => {
                this.lstStatementList = data;
                console.log(this.lstStatementList);
          });
       }

       Select(hdrId) {
        //  alert("Statement Header Id :"+hdrId);

        let select = this.lstStatementList.find(d => d.statementHeaderId === hdrId);
        this.branchName=select.branchName;
        this.bankAccountName=select.bankAccountName;
        this.bankAccountNo=select.bankAccountNo;
        this.branchName=select.branchName;
        this.statementNumber=select.statementNumber;
        this.statementDate=select.statementDate;
        this.controlBeginBalance=select.controlBeginBalance;
        this.controlTotalCr=select.controlTotalCr;
        this.controlTotalDr=select.controlTotalDr;
        this.controlEndBalance=select.controlEndBalance;
        this.controlDrLineCount=select.controlDrLineCount;
        this.controlCrLineCount=select.controlCrLineCount;
        this.currencyCode=select.currencyCode;

        this.invLineArray().reset();
           this.service.getBankStatementDetails(hdrId)
            .subscribe(
              data => {
                this.lstStatementLines = data.obj.ceLineList;
                console.log(this.lstStatementLines);
                var len = this.invLineArray().length;
                for (let i = 0; i < this.lstStatementLines.length - len; i++) {
                  var invLnGrp: FormGroup = this.invLineDetails();
                  this.invLineArray().push(invLnGrp);
    
                }
                this.bankReconcillationForm.get('ceLineList').patchValue(this.lstStatementLines);
          });
         
       }



       LoadValues(){}

}
