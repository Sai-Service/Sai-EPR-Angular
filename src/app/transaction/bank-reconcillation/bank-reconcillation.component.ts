import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
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

interface IBankRecon { 
  stNumber : string;
  bankAccountId:number;
}

@Component({
  selector: 'app-bank-reconcillation',
  templateUrl: './bank-reconcillation.component.html',
  styleUrls: ['./bank-reconcillation.component.css']
})

export class BankReconcillationComponent implements OnInit {
    bankReconcillationForm : FormGroup;
  
        spinIcon=false;
        importButton=true;
        dataDisplay: any;
        msg:any;
        updStatus=true;
        fileValidation=false;
        fileName :string; 
        docType :string;
        resMsg : string;
        lstMessage: any;
        viewLogFile=false;
        

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

        bankAccountId :number;
        docNumber:number;
        stNumber:string;
        complete:string ='No';

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
        showReconButton3=false;
        showValidateButton=false;
        fndButton3=true;
        showReconciledGrid =false;
        optType:string;
        transType:string='apPymt';
        showImportModalForm=false;

        statementHeaderId1:number;
        statementLineId:number;
        referenceType:string;
        referenceId:number;
        amount :number;
       


        get f() { return this.bankReconcillationForm.controls; }
        bankReconcillation(bankReconcillationForm:any) {  }

        @ViewChild('fileInput') fileInput;
  
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
            optType:[],
            transType:[],
            amount:[],

            statementHeaderId1:[],
            statementLineId:[],
            referenceType:[],
            referenceId:[],

            ceLineList: this.fb.array([this.invLineDetails()]),
            avlList: this.fb.array([this.avlLineDetails()]),
          });
        }
      
        invLineDetails() {
          return this.fb.group({
            lineNumber:[],
            statementHeaderId:[],
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
            // reconDate:[],
            accountingDate:[],
          });
        }

        avlLineDetails() {
          return this.fb.group({
            selectFlag:[],
            checkId:[],
            invTypeLookupCode:[],
            bankAccountNo:[],
            glDate:[],
            date1:[],
            docNo:[],
            voucherNo:[],
            reconcileDate:[],
            name:[],
            statementReconId:[],
            // statementHeaderId:[],
            // statementLineId:[],
            // referenceType:[],
            // referenceId:[],
            // createdBy:[],
            // creationDate:[],
            // lastUpdatedBy:[],
            // lastUpdateDate:[],
            jeHeaderId:[],
            // orgId:[],
            referenceStatus:[],
            statusFlag:[]='M',
            actionFlag:[],
            currentRecordFlag:[]='Y',
            autoReconciledFlag:[]='N',
            appAmt:[],
            requestId:[],
            programApplicationId:[],
            programId:[],
            programUpdateDate:[],
            legalEntityId:[],
            // emplId:[],
                
          })
        }

        invLineArray(): FormArray {
          return <FormArray>this.bankReconcillationForm.get('ceLineList')
        }
        avlLineArray(): FormArray {
          return <FormArray>this.bankReconcillationForm.get('avlList')
        }
        
        ngOnInit(): void {
          $("#wrapper").toggleClass("toggled");
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


          this.service.bankList('RTGS/NEFT',Number(sessionStorage.getItem('ouId')))
          .subscribe(
            data => {
              this.BankList = data.obj;
              console.log(this.BankList);
            }
          );



        }


        SearchByBankAcNo(){
          var bnkAcNo=this.bankReconcillationForm.get("bankAccountNo").value
          alert ("Search By Bank Account No -WIP  :" +bnkAcNo);
        }

        resetMast() {
          window.location.reload();
        }
      
        closeMast() {
          this.router.navigate(['admin']);
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
        this.invLineArray().clear();
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

      

       availableBnk(){alert ("Bank Statement -Availiable -wip");}

       radioEvent(event:any){
        // alert(event.target.value);
        
        if( event.target.value==='payment')   { this.bankReconcillationForm.patchValue({transType  : 'PAYMENT' }); }
        if( event.target.value==='receipt')   { this.bankReconcillationForm.patchValue({transType  : 'RECEIPT' }); }
        if( event.target.value==='cashflow')  { this.bankReconcillationForm.patchValue({transType  : 'CASHFLOW'}); }
        // alert ("this.transType : " +this.transType);
      }

       FindAvl(event:any){
        // var avlType =this.bankReconcillationForm.controls['optType'].value;
        this.showReconciledGrid=false;
        var refType =this.bankReconcillationForm.get('referenceType').value;
        var ptype =this.bankReconcillationForm.get('transType').value;

        // alert ("refType ,ptype: " +refType  + "," + ptype);

        if(ptype===refType) {
          // alert ("if refType ,ptype: " +refType  + "," + ptype);

        var trnType=this.bankReconcillationForm.get("transType").value
        var bnkAcNo=this.bankReconcillationForm.get("bankAccountNo").value
        var dt1=this.pipe.transform(this.date1, 'dd-MMM-y');
        var dt2=this.pipe.transform(this.date2, 'dd-MMM-y');

       
        this.service.getAvlBankReconLines(bnkAcNo, this.transNo1,dt1,dt2,this.amount1,this.amount2,trnType)
          .subscribe(
            data => {
              this.lstAvlBnkLines = data.obj;
              if(this.lstAvlBnkLines.length==0) {
                alert (bnkAcNo +" - " + "No Record Found.");
                this.showValidateButton=false;
                return;
              }
              console.log(this.lstAvlBnkLines);

              var len = this.avlLineArray().length;
              for (let i = 0; i < this.lstAvlBnkLines.length - len; i++) {
                var avlLnGrp: FormGroup = this.avlLineDetails();
                this.avlLineArray().push(avlLnGrp);
              }
              this.bankReconcillationForm.get('avlList').patchValue(this.lstAvlBnkLines);

              // this.addHeaderDetails();

              this.showValidateButton=true;
              this.fndButton3=false;
        });

      } else { alert ("Transaction Type Mismatch.\nPlease Select Correct Search Parameters.");}
       }


       reconciledBnk(){
        var stLineId=this.bankReconcillationForm.get("statementLineId").value
        // alert (" stLineId :"+  stLineId);

        this.service.getReconciledDetails(stLineId)
        .subscribe(
          data => {
            this.lstAvlBnkLines = data.obj;
            if(this.lstAvlBnkLines.length==0) {
              alert ("No Record Found.");
                return;
            }
            console.log(this.lstAvlBnkLines);
            this.showReconciledGrid=true;
            this.showValidateButton=false;
            this.fndButton3=false;

            var len = this.avlLineArray().length;
            for (let i = 0; i < this.lstAvlBnkLines.length - len; i++) {
              var avlLnGrp: FormGroup = this.avlLineDetails();
              this.avlLineArray().push(avlLnGrp);
            }
            this.bankReconcillationForm.get('avlList').patchValue(this.lstAvlBnkLines);
            // this.showValidateButton=true;
            // this.fndButton3=false;
          });
       }

     
       


       avlTrans(){
        this.getTrans(0);
      }

       getTrans(index){
         this.fndButton3=true;
         this.showReconButton3=false;
         this.showValidateButton=false
         this.avlLineArray().clear();
         this.date1=this.pipe.transform(Date.now(), 'y-MM-dd');  ;
         this.date2=this.pipe.transform(Date.now(), 'y-MM-dd');  ;
         var patch = this.bankReconcillationForm.get('ceLineList') as FormArray;
         var LineArr = this.bankReconcillationForm.get('ceLineList').value;
         var tranNum = LineArr[index].bankTrxNumber;
         var tranAmt = LineArr[index].amount;
         this.transNo1=tranNum;this.transNo2=tranNum
         this.amount1=tranAmt;this.amount2=tranAmt

         this.statementHeaderId1=LineArr[index].statementHeaderId;
         this.statementLineId=LineArr[index].statementLineId;
         this.referenceType=LineArr[index].trxType;
         this.referenceId=LineArr[index].checkId;
         this.amount=LineArr[index].amount;

        //  this.showValidateButton=true;
      }

      LineSelectFlag(e,index){ }

      ValidatebnkRecon(){

     
        var avlLineArr = this.bankReconcillationForm.get('avlList').value;
        var len1 = avlLineArr.length;
        // alert ("avlLineArr.length :"+ avlLineArr.length);
        var lineTot =0;
         for (let i = 0; i < len1; i++) { 
         var sFlag= this.avlLineArray().controls[i].get('selectFlag').value
         if(sFlag===true) {
          lineTot =lineTot+this.avlLineArray().controls[i].get('appAmt').value
         }
        }

        var headerAmt= this.amount;
        // alert ("Header Amt :" +headerAmt  + " ,  Line Total :" +lineTot);

        if(headerAmt === lineTot) { 
          this.showReconButton3 = true; } 
        else {
          this.showReconButton3 = false; 
          alert ("Amount Mismatch......\nStatement Amount not matching with Line Amount.");
        return;  } 

  
        var lrm=0;
        for (let i = len1 - 1; i >= 0; i--) {
          if (this.avlLineArray().controls[i].get('selectFlag').value != true) {
            this.avlLineArray().removeAt(i);
            lrm=lrm+1;
          } 
        }

          if (lrm===len1) {  
            this.showReconButton3 = false; this.showValidateButton=false;this.fndButton3=true; } 
          else { this.showReconButton3 = true; this.showValidateButton=false; }

            var avlLineArr1 = this.bankReconcillationForm.get('avlList').value;
            var len2 = avlLineArr1.length;
              
          for (let i = 0; i < len2; i++) {
            this.avlLineArray().controls[i].get('selectFlag').disable();     
          }

          // this.showReconButton3=true;
          // this.fndButton3=false;

      }


      selectAvlFlag(evnt,index){
        alert("Selected ...avl..."+evnt +" , "+index);
      }

      validateDate(){
        var frmDate =this.bankReconcillationForm.get("date1").value
        var toDate =this.bankReconcillationForm.get("date2").value

        if(frmDate > toDate) { this.date1=this.date2;}
        if(toDate  < frmDate) { this.date2=this.date1;}

      }


      bnkReconcilePost() {
        // alert("SAVE TDS DETAILS.....WIP")
        const formValue: IBankRecon = this.bankReconcillationForm.value;
        this.showReconButton3=false;
        var avlLines = this.bankReconcillationForm.get('avlList').value;
        var patch = this.bankReconcillationForm.get('avlList') as FormArray;
        var len1 = avlLines.length;

          let variants = <FormArray>this.avlLineArray();

          var stHdrId = this.bankReconcillationForm.get('statementHeaderId1').value;
          var stLineId = this.bankReconcillationForm.get('statementLineId').value;
          var refType = this.bankReconcillationForm.get('referenceType').value;
    
          for (let i = 0; i < this.avlLineArray().length; i++) {
            let variantFormGroup = <FormGroup>variants.controls[i];
            var refId = avlLines[i].checkId;
            variantFormGroup.addControl('statementHeaderId', new FormControl(stHdrId, Validators.required));
            variantFormGroup.addControl('statementLineId', new FormControl(stLineId, Validators.required));
            variantFormGroup.addControl('referenceType', new FormControl(refType, Validators.required));
            variantFormGroup.addControl('referenceId', new FormControl(refId, Validators.required));
            variantFormGroup.addControl('emplId', new FormControl(Number(sessionStorage.getItem('emplId')), Validators.required));
            variantFormGroup.addControl('orgId', new FormControl(Number(sessionStorage.getItem('ouId')), Validators.required));
            variantFormGroup.addControl('amount', new FormControl(avlLines[i].appAmt, Validators.required));
          }
          
          console.log(variants.value);
          // console.log(avlLines);
          this.service.bankReconPostSubmit(variants.value).subscribe((res: any) => {
            if (res.code === 200) {
              alert(res.message);
              // this.poInvoiceForm.reset();
            } else {
              if (res.code === 400) {
                alert(res.message);
                // this.displayTdsButton = true;
                // this.poInvoiceForm.reset();
              }
            }
          });
      }

      ImportBankStmnt(bankAccountId){
        this.dataDisplay='';
        const formValue: IBankRecon = this.bankReconcillationForm.value;
        // alert(formValue.bankAccountId +","+formValue.stNumber);

        if (formValue.bankAccountId === undefined || formValue.bankAccountId === null || formValue.bankAccountId<=0) {
          this.fileValidation=false;
          alert("ACCOUNT NO : Should not be null....");
          this.showImportModalForm=false;
          return;
        }

        if (formValue.stNumber === undefined || formValue.stNumber === null || formValue.stNumber.trim() === '') {
          this.fileValidation=false;
          alert("STATEMENT NO : Should not be null....");
          this.showImportModalForm=false;
          return;
        }

          this.showImportModalForm=true;
      }

      CheckValidations() {
        const formValue: IBankRecon = this.bankReconcillationForm.value;
   
        var csvFileName=this.fileInput.nativeElement.files[0];

        if (formValue.stNumber === undefined || formValue.stNumber === null || formValue.stNumber.trim() === '') {
          this.fileValidation=false;
          alert("STATEMENT NO : Should not be null....");
          return;
        }
    
        if(csvFileName==null || csvFileName==undefined) {
          alert ("Select CSV File Name..."+csvFileName );
          this.fileValidation=false;
          this.importButton=false;
          return;
        }



          this.fileValidation=true;
          this.importButton=true;
      }

      uploadFile() {
        this.CheckValidations()
       
        if (this.fileValidation===true) {
          this.updStatus=true; 
          this.importButton=false;
          this.spinIcon=true;
          // this.progress = 0;

        this.dataDisplay ='File Upload in progress....Do not refresh the Page'
        var bnkAcId=this.bankReconcillationForm.get("bankAccountId").value
        var stNum=this.bankReconcillationForm.get("stNumber").value

        var event=this.fileInput.nativeElement.files[0];
        console.log('doctype-check'+this.docType)
        let formData = new FormData();
        formData.append('file', event)
           this.service.UploadExcelBankStatement(formData,this.docType,this.ouId,bnkAcId,stNum).subscribe((res: any) => {
            if (res.code === 200) {
               this.resMsg = res.message+",  Code : "+res.code;;
              //this.lstMessage=res.obj.priceListDetailList;
               this.dataDisplay ='File Uploaded Sucessfully....'
              //  this.importButton=false;
               this.viewLogFile=true;
               this.spinIcon=false;
            } else {
              // if (res.code === 400) {
                 this.resMsg = res.message +",  Code : "+res.code;
                // this.lstMessage=res.obj.priceListDetailList;
                this.updStatus=false;
                this.dataDisplay ='File Uploading Failed....'
                this.importButton=true;
                this.spinIcon=false;
                // this.viewLogFile=false;
              // }
            } });
         } else { alert ( "Please Select Upload File ...");}
        }




}
