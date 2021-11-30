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
        unreconamt:number;
        unreconcnt:number;
        avlBalance:number;
        valueDtdBalance:number;

        stDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
        glDate=this.pipe.transform(Date.now(), 'y-MM-dd');  

        transNo1:string;
        transNo2:string;
        date1=this.pipe.transform(Date.now(), 'y-MM-dd');  ;
        date2=this.pipe.transform(Date.now(), 'y-MM-dd');  ;
        amount1:number;
        amount2:number;




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
            unreconamt:[],
            unreconcnt:[],
            avlBalance:[],
            valueDtdBalance:[],

            transNo1:[],
            transNo2:[],
            date1:[],
            date2:[],
            amount1:[],
            amount2:[],


            ceLineList: this.fb.array([this.invLineDetails()]),
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


        bnkStatementFind(){

          var bnkAcId=this.bankReconcillationForm.get("bankAccountId").value
          this.service.getBankReconStatement1(bnkAcId, this.ouId)
            .subscribe(
              data => {
                this.lstStatementList = data;
                if(this.lstStatementList.length==0) {
                  alert (bnkAcId +" - " + "No Record Found.");return;
                }
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
                this.unreconamt=data.obj.unreconamt;
                this.unreconcnt=data.obj.unreconcnt;

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

       reconciledBnk(){alert ("Bank Statement -Reconciled -wip");}
       availableBnk(){alert ("Bank Statement -Availiable -wip");}

       avlTrans(){}

       FindAvl(){

        var bnkAcNo=this.bankReconcillationForm.get("bankAccountNo").value
        var dt1=this.pipe.transform(this.date1, 'dd-MMM-y');
        var dt2=this.pipe.transform(this.date2, 'dd-MMM-y');

        

        this.service.getAvlBankReconLines(bnkAcNo, this.transNo1,dt1,dt2,this.amount1,this.amount2)
          .subscribe(
            data => {
              this.lstAvlBnkLines = data;
              if(this.lstAvlBnkLines.length==0) {
                alert (bnkAcNo +" - " + "No Record Found.");return;
              }
              console.log(this.lstAvlBnkLines);
        });

       }

       getTrans(index){
         var patch = this.bankReconcillationForm.get('ceLineList') as FormArray;
         var LineArr = this.bankReconcillationForm.get('ceLineList').value;
         var tranNum = LineArr[index].bankTrxNumber;
         var tranAmt = LineArr[index].amount;
         alert ("Line selected :"+index +","+tranNum);
         this.transNo1=tranNum;this.transNo2=tranNum
         this.amount1=tranAmt;this.amount2=tranAmt
      }

}
