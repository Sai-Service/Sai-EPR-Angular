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

interface ICashBankTransfer {
      openPeriod:string;
      docTrfNo:string;
      transferCode:number;
      transferDescp:string;
      transferDate:string;
      clearingDate:string;
      status:string;

      fromAcctDescp:string;
      toAcctDescp:string;
      fromAcctDescpId:number;
      toAcctDescpId:number;
      trfAmount:number;
      amtInWords:string;
      toAcctCode:string;
      fromAcctCode:string;
      toGlCodeId:number;
      fromGlCodeId:number;
      trfHeader:string;
      trfNarration:string;
      reversalPeriod:string;
      reversalStatus:string;
      reversalDate:string;
      reversalDocNo:string;
      reversalDocDt:string;
      toReceiptId:number;
      fromReceiptId:number;
}

@Component({
  selector: 'app-cash-bank-transfer',
  templateUrl: './cash-bank-transfer.component.html',
  styleUrls: ['./cash-bank-transfer.component.css']
})
export class CashBankTransferComponent implements OnInit {
  cashBankTransferForm : FormGroup;

      pipe = new DatePipe('en-US');
      now = Date.now();
      public minDate = new Date();
      public OUIdList            : Array<string> = [];
      // public TransferTypeList    : Array<string> = [];
      public PeriodList          : Array<string> = [];
      // public fromAcctList        : Array<string> = [];
      // public toAcctList          : Array<string> = [];
      public bnkHeaderList       : Array<string> = [];
      public statusList          : Array<string> = [];
          
      fromAcctList :any;
      toAcctList:any;
      TransferTypeList:any;
      payAccountCode :any;
      recAccountCode :any;

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

      // branch:number;
      // period:number;
      openPeriod:string;
      docTrfNo:string;
      transferCode:number;
      transferDescp:string;
      transferDate = this.pipe.transform(Date.now(), 'y-MM-dd');
     
     
      clearingDate = this.pipe.transform(Date.now(), 'y-MM-dd');
     
      status:string='Save';

      fromAcctDescp:string;
      toAcctDescp:string;

      fromAcctDescpId:number;
      toAcctDescpId:number;

      trfAmount:number;
      amtInWords:string;

      toAcctCode:string;
      fromAcctCode:string;

      toGlCodeId:number;
      fromGlCodeId:number;

      trfHeader:string;
      trfNarration:string;

     reversalPeriod:string=null;
     reversalStatus='N';
     reversalDate:string;
     reversalDocNo:string=null;
     reversalDocDt:string=null;
     toReceiptId:number=null;
     fromReceiptId:number=null;

      fromDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
      toDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
      searchDocNo:string;

      display = true;
      displayButton = true;
      displaySuccess=false;
      statusPost =false;
      statusSave=false;
      statusReversal=false;
      selectdisp=false;
      revButton=false;
      copyButton=true;
      checkValidation=false;

      get f() { return this.cashBankTransferForm.controls; }
      cashBankTransfer(cashBankTransferForm:any) {  }

      constructor(private service: MasterService,private orderManagementService:OrderManagementService,private  fb: FormBuilder, private router: Router) {
        this.cashBankTransferForm = fb.group({ 

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

          // branch:[],
          // period:[],
          openPeriod:[],
          docTrfNo:[],
          transferCode:[],
          transferDescp:[],
          transferDate:[],
          reversalDate:[],
          clearingDate:[],
          reversalPeriod:[],
          reversalStatus:[],
          fromAcctDescp:[],
          toAcctDescp:[],
          fromAcctDescpId:[],
          toAcctDescpId:[],
    
          status:[],

          trfAmount:[],
          amtInWords:[],
          toAcctCode:[],
          fromAcctCode:[],

          toGlCodeId:[],
          fromGlCodeId:[],

          trfHeader:[],
          trfNarration:[],

          reversalDocNo:[],
          reversalDocDt:[],
          toReceiptId:[],
          fromReceiptId:[],

          searchDocNo:[],
          fromDate:[],
          toDate:[],
      
        });
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


          this.service.OUIdList()
          .subscribe(
            data => {
              this.OUIdList = data;
              console.log(this.OUIdList);
            }
          );

          this.service.TransferTypeLst()
          .subscribe(
            data => {
              this.TransferTypeList = data;
              console.log(this.TransferTypeList);
            }
          );

          this.service.PeriodLst()
          .subscribe(
            data => {
              this.PeriodList = data;
              console.log(this.PeriodList);
            }
          );

          // this.service.fromAcctLst(this.locId)
          // .subscribe(
          //   data => {
          //     this.fromAcctList = data;
          //     console.log(this.fromAcctList);
          //   }
          // );

          // this.service.toAcctLst(this.locId)
          // .subscribe(
          //   data => {
          //     this.toAcctList = data;
          //     console.log(this.toAcctList);
          //   }
          // );


          this.service.bnkHeaderList(this.locId)
          .subscribe(
            data => {
              this.bnkHeaderList = data;
              console.log(this.bnkHeaderList);
            }
          );

          this.service.statusList()
          .subscribe(
            data => {
              this.statusList = data;
              console.log(this.statusList);
            }
          );
       

        }

        onOptionsSelected(event: any) {
        var status1 = this.cashBankTransferForm.get('status').value;
        // alert ("Status :"+status1);
        if(status1=='Save') {
           this.statusSave=true;
           this.statusPost=false;
        }
        if(status1=='Post') {
          this.statusPost=true;
          this.statusSave=false;
       } }


       onSelectionRevStatus(event: any) {
        var status1 = this.cashBankTransferForm.get('reversalStatus').value;
        // alert ("Status :"+status1);
        if(status1=='Y') {
           this.statusReversal=true;
            this.reversalDate = this.pipe.transform(Date.now(), 'y-MM-dd');
            this.reversalDocDt =this.reversalDate;
         }
        if(status1=='N') {
          this.statusReversal=false;
          this.reversalDate =null;
          this.reversalDocDt=null;
       } }



        resetMast() {
          window.location.reload();
        }
      
        closeMast() {
          this.router.navigate(['admin']);
        }
        transeData(val) {
          delete val.loginArray;
          delete val.loginName;
          delete val.ouName;
          delete val.divisionId;
          delete val.locName;
          delete val.deptId;
          delete val.orgId;

          // delete val.ouId;
          // delete val.locId;

          delete val.fromAcctDescpId;
          delete val.toAcctDescpId;
          return val;
        }
       
         

         cashBnkTrfSave() {
          this.CheckDataValidations();

          if (this.checkValidation===true) {
            alert("Data Validation Sucessfull....\nPosting data...")
          const formValue: ICashBankTransfer =this.transeData(this.cashBankTransferForm.value);
          this.service.CashBankTrfSaveSubmit(formValue,this.emplId).subscribe((res: any) => {
            if (res.code === 200) {
              alert('RECORD INSERTED SUCCESSFUILY');
              this.docTrfNo=res.obj;
              this.cashBankTransferForm.disable();
              this.statusSave=false;
            } else {
              if (res.code === 400) {
                var x=res.obj;
                // alert('Code already present in the data base');
                alert(x);
                  
              }
            }
          });

        }else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }
        
      }


      cashBnkTrfPost() {
        // this.CheckDataValidations();

        // if (this.checkValidation===true) {
        //   alert("Data Validation Sucessfull....\nPosting data  to MCP ITEM MASTER TABLE")
        var postEmplId=Number(sessionStorage.getItem('emplId'));
        const formValue: ICashBankTransfer =this.transeData(this.cashBankTransferForm.value);
        this.service.CashBankTrfPostSubmit(formValue,postEmplId).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD INSERTED SUCCESSFUILY');
            // this.docTrfNo=res.obj;
            this.cashBankTransferForm.disable();
            this.statusSave=false;
            this.statusPost=false;
          } else {
            if (res.code === 400) {
              var x=res.obj;
              // alert('Code already present in the data base');
              alert(x);
                
            }
          }
        });

      // }else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }
      
    }

    cashBnkTrfCopy() {
      // this.CheckDataValidations();
      // if (this.checkValidation===true) {
      //   alert("Data Validation Sucessfull....\nPosting data  to MCP ITEM MASTER TABLE")
      var copyEmplId=Number(sessionStorage.getItem('emplId'));
      const formValue: ICashBankTransfer =this.transeData(this.cashBankTransferForm.value);
      this.service.CashBankTrfSaveSubmit(formValue,copyEmplId).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD INSERTED SUCCESSFUILY');
          this.docTrfNo=res.obj;
          this.cashBankTransferForm.disable();
          this.statusSave=false;
        } else {
          if (res.code === 400) {
            var x=res.obj;
            // alert('Code already present in the data base');
            alert(x);
              
          }
        }
      });

    // }else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }
    
  }

            cashBnkTrfReversal() {
              this.CheckDataValidationsCancel();
               if (this.checkValidation===true) {
                alert("Data Validation Sucessfull....\nPosting data..")
              var  mEmplId=Number(sessionStorage.getItem('emplId'));
              var  dTrfNo=this.cashBankTransferForm.get("docTrfNo").value
             
              const formValue: ICashBankTransfer =this.transeData(this.cashBankTransferForm.value);
              this.service.CashBankTrfReversalSubmit(formValue,mEmplId,dTrfNo).subscribe((res: any) => {
                if (res.code === 200) {
                  alert('RECORD INSERTED SUCCESSFUILY');
                  this.reversalDocNo=res.obj;
                  this.cashBankTransferForm.disable();
                  this.statusSave=false;
                } else {
                  if (res.code === 400) {
                    var x=res.obj;
                    // alert('Code already present in the data base');
                    alert(x);
                      
                  }
                }
              });

            }else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }
            
          }
      
  


       
       
        searchMast(){}
        SearchByDocNo(mDocNo){alert("Search By Document Number .... ...Wip " +mDocNo);}

        // SearchByDate(mFrmDate,mToDate){alert("Search By Date .... ...Wip " +mFrmDate +","+mToDate);}

        SearchByDate() {
          var frmDt=this.cashBankTransferForm.get('fromDate').value;
          var toDt=this.cashBankTransferForm.get('toDate').value;
            //  alert("SearchByRcptNo-Receipt date : "+ frmDt+","+toDt  );
       
          this.service.getBnkTrfSearchByDate(frmDt, toDt)
            .subscribe(
              data => {
                this.lstcomments = data;
                console.log(this.lstcomments);
                // if (data.message === "Record Not Found ") {
                //   alert("No Receipt Found for this date...")
                //   this.lstcomments = null;
                // }
      
              } ); 
            }

            Select(trnId: number) {
              // alert("Transaction Id :"+trnId);
              this.selectdisp=true;
              // this.statusSave=false;
                // this.cashBankTransferForm.reset();
                // this.fromDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
                // this.toDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
              let select = this.lstcomments.find(d => d.tranId === trnId);
              if (select) {
                this.cashBankTransferForm.patchValue(select);
                this.docTrfNo = select.docTrfNo;
                // this.fromAcctDescp=select.fromAcctDescp;
                // this.toAcctDescp=select.toAcctDescp;
                this.displayButton = false;
                var stat1=this.cashBankTransferForm.get("status").value;
                var revStat1=this.cashBankTransferForm.get("reversalStatus").value;
               
                if(stat1=='Save') {
                  this.statusPost=true;
                  this.statusSave=false;
                  this.revButton=false;
                  this.copyButton=true;
                 }
                if(stat1=='Post') {
                  this.statusPost=false;
                  this.statusSave=false;
                  this.revButton=true;
                  this.copyButton=true;
                 }

                 if(revStat1=='Y') {
                  this.statusPost=false;
                  this.statusSave=false;
                  this.revButton=false;
                  this.copyButton=false;
                 }
               
                }
                // this.cashBankTransferForm.disable();
                // this.fromDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
                // this.toDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
               
            }

            
      
        onSelectionTrfcode(mEvent :number) {
         let selectedValue = this.TransferTypeList.find(v => v.lookupValueId == mEvent);
          if( selectedValue != undefined){
            console.log(selectedValue);
            var lookupValue1=selectedValue.lookupValue;
            // this.fromAcctDescp=lookupValue1;
            this.transferDescp=selectedValue.lookupValueDesc;
          
           
           this.service.getFromAcList(lookupValue1)
           .subscribe(
             data => {
               this.fromAcctList = data.obj.frmAcList;
               this.toAcctList = data.obj.toAcList;
                console.log(this.fromAcctList);
                console.log(this.toAcctList);
             });
            }
          }



        
          onSelectionFromAc(methodId :number) { 
            if (methodId>0) {
            //  alert ("From ac:"+methodId);
            let selectedValue = this.fromAcctList.find(v => v.bankAccountId == methodId);
            if( selectedValue != undefined){
              console.log(selectedValue);
             this.fromAcctDescp=selectedValue.methodName;
            }


             this.service.getPayRecAccountCode(methodId,this.ouId,this.divisionId,this.locId)
             .subscribe(
               data => {
                 this.payAccountCode = data.obj;
                 console.log(this.payAccountCode);

                 this.fromAcctCode =this.payAccountCode.name;
                 this.fromGlCodeId=this.payAccountCode.id;
                 
               });

              }
          }

          onSelectionToAc(methodId :number) { 
            if (methodId>0) {
              // alert ("To ac:"+methodId);
              let selectedValue = this.toAcctList.find(v => v.bankAccountId == methodId);
              if( selectedValue != undefined){
                console.log(selectedValue);
               this.toAcctDescp=selectedValue.methodName+'-'+selectedValue.bankAccountNo;
              }
  
               this.service.getPayRecAccountCode(methodId,this.ouId,this.divisionId,this.locId)
               .subscribe(
                 data => {
                   this.recAccountCode = data.obj;
                   console.log(this.recAccountCode);
                   this.toAcctCode =this.recAccountCode.name;
                   this.toGlCodeId=this.recAccountCode.id;
                });
  
                }
                this.toAcctCode='12PU.101.21.13998.0001';
                this.toGlCodeId=10651;
          }

          clearSearch() {
           
            this.cashBankTransferForm.get('fromDate').enable();
            this.cashBankTransferForm.get('toDate').enable();
            this.cashBankTransferForm.get('searchDocNo').enable();
            this.fromDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
            this.toDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
            this.cashBankTransferForm.get('searchDocNo').reset();
            this.lstcomments = null;
          }

          CheckDataValidationsCancel()
          {
            const formValue: ICashBankTransfer = this.cashBankTransferForm.value;

            if(formValue.reversalStatus==='N'|| formValue.transferCode===null ||formValue.transferCode===undefined ) {
              this.checkValidation=false;
              alert ("REVERSAL STATUS: Should be 'Y' ");
              return; 
          }

          if (formValue.reversalPeriod===undefined || formValue.reversalPeriod===null)
          {
              this.checkValidation=false;
              alert ("REVERSAL PERIOD: Should not be null value...");
              return;
           } 
          
          if (formValue.reversalDate===undefined || formValue.reversalDate===null)
          {
              this.checkValidation=false;
              alert ("REVERSAL DATE: Should not be null value...");
              return;
           } 

              this.checkValidation=true

          }


          CheckDataValidations()
          {
        
              const formValue: ICashBankTransfer = this.cashBankTransferForm.value;
              // alert("mainModel date :" +formValue.mainModel);
      
              if(formValue.transferCode===undefined || formValue.transferCode===null ) {
                  this.checkValidation=false;
                  alert ("TRANSFER TYPE: Should not be null value");
                  return; 
              }
      
              if(formValue.transferDate===undefined || formValue.transferDate===null ) {
                this.checkValidation=false;
                alert ("TRANSFER DATE: Should not be null value");
                return; 
             }
           
               
             if (formValue.openPeriod===undefined || formValue.openPeriod===null)
             {
                this.checkValidation=false; 
                alert ("OPEN PERIOD: Should not be null value");
                 return;
              } 

              if (formValue.trfHeader===undefined || formValue.trfHeader===null)
              {
                 this.checkValidation=false; 
                 alert ("HEADER: Should not be null value");
                  return;
               } 

               if (formValue.trfNarration===undefined || formValue.trfNarration===null || formValue.trfNarration.trim()==='')
              {
                 this.checkValidation=false; 
                 alert ("NARRATION: Should not be null value");
                  return;
               } 
            
              if (formValue.fromAcctDescpId <=0  || formValue.fromAcctDescpId===undefined || formValue.fromAcctDescpId===null)
              {
                  this.checkValidation=false;
                  alert ("FROM A/C: Should not be null....");
                  return;
               } 
               if (formValue.toAcctDescpId <=0  || formValue.toAcctDescpId===undefined || formValue.toAcctDescpId===null)
               {
                   this.checkValidation=false;
                   alert ("TO A/C: Should not be null....");
                   return;
                } 

    
               if (formValue.fromAcctDescp===undefined || formValue.fromAcctDescp===null)
               {
                  this.checkValidation=false;   
                  alert ("FROM A/C DESC: Should not be null value....");
                   return;
                } 

                if (formValue.toAcctDescp===undefined || formValue.toAcctDescp===null)
                {
                   this.checkValidation=false;   
                   alert ("TO A/C DESC: Should not be null value....");
                    return;
                 } 
    
                if (formValue.fromAcctCode===undefined || formValue.fromAcctCode===null )
                {
                    this.checkValidation=false;  
                    alert ("FROM A/C CODE : Should not be null value...");
                    return;
                 } 
                //  alert("Scheme desc "+formValue.ewSchemeDesc);
                if (formValue.toAcctCode===undefined || formValue.toAcctCode===null )
                {
                    this.checkValidation=false;
                    alert ("TO A/C CODE: Should not be null value...");
                    return;
                 } 
  
               
  
                 if (formValue.clearingDate===undefined || formValue.clearingDate===null)
                 {
                     this.checkValidation=false;
                     alert ("CLEARING DATE: Should not be null value...");
                     return;
                  } 

                   
                 if (formValue.status===undefined || formValue.status===null)
                 {
                     this.checkValidation=false;
                     alert ("STATUS: Should not be null value...");
                     return;
                  } 
    
                  // if (formValue.schemeEndDate===undefined || formValue.schemeEndDate===null || formValue.schemeEndDate<=formValue.schemeStartDate)
                  // {
                  //     this.checkValidation=false;  
                  //     alert ("SCHEME END DATE: Should not be null value/grater than Scheme Start Date...");
                  //     return;
                  //  } 
  
                   if (formValue.trfAmount <=0 || formValue.trfAmount===undefined || formValue.trfAmount===null )
                   {
                       this.checkValidation=false;  
                       alert ("TRANSFER AMT: Should be above Zero");
                       return;
                    } 
                    this.checkValidation=true
          }
        
  
 
}
