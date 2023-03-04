import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as xlsx from 'xlsx';
import { ActivatedRoute, ParamMap } from '@angular/router';
// import * as converter from 'number-to-words';

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
      receiptMethodId:number;
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

  export class cntrRcptList 
  {
    srlNo:number;
    receiptNumber:string;
    receiptDate: string;
    receiptMethodId:number;
    locId:number;
    checkNo: string;
    checkDate: string;
    bankName: string;
    branchName: string;
    amount:number;
    actTrfDocNo:string;
    printDateTime:string;

  }

@Component({
  selector: 'app-cash-bank-transfer',
  templateUrl: './cash-bank-transfer.component.html',
  styleUrls: ['./cash-bank-transfer.component.css']
})
export class CashBankTransferComponent implements OnInit {
  cashBankTransferForm : FormGroup;
  private sub: any;
      @ViewChild('aForm') aForm: ElementRef;

      @ViewChild('epltable', { static: false }) epltable: ElementRef;
      @ViewChild('epltable1', { static: false }) epltable1: ElementRef;
      @ViewChild('orderList', { static: false }) orderList: ElementRef;

      pipe = new DatePipe('en-US');
      now = Date.now();
      public minDate = new Date();
      public OUIdList            : Array<string> = [];
      public locIdList: Array<string> = [];
      // public TransferTypeList    : Array<string> = [];
      public PeriodList          : Array<string> = [];
      // public fromAcctList        : Array<string> = [];
      // public toAcctList          : Array<string> = [];
      public bnkHeaderList       : Array<string> = [];
      public statusList          : Array<string> = [];
          
      viewAccountingBankTrf: any;
      viewAccountingBnkTrfLines: any;
     
      fromAcctList :any;
      toAcctList:any;
      TransferTypeList:any;
      payAccountCode :any;
      recAccountCode :any;

      lstcomments: any;
      lstChequeList: any;

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
      openPeriod:string;
      docTrfNo:string;
      transferCode:number;
      transferDescp:string;
      transferDate = this.pipe.transform(Date.now(), 'y-MM-dd');
     
     
      clearingDate = this.pipe.transform(Date.now(), 'y-MM-dd');
      
      status:string='Save';

      fromAcctDescp:string;
      toAcctDescp:string;

      receiptMethodId:number;
      bankId:number;
      bankAccountId:number;
      toAcctDescpId:number;

      trfAmount:number;
      amtInWords:string;

      toAcctCode:string;
      fromAcctCode:string;

      toGlCodeId:number;
      fromGlCodeId:number;

      trfHeader:string;
      trfNarration:string;
      chqTrfAmt:number=0;

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
      selectAllFlag=false;

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
      showChqListModal =false;
      viewAct=false;
      selectAllButton=true;
      updateButton=false;
      

      showViewActLine =false;

      totalDr:number;
      totalCr:number;
      runningTotalCr:number;
      runningTotalDr:number;

      docSeqValue:string;
      description:string;
      name1:string;
      jeCategory:string;
      jeSource:string;
      periodName:string;
      exportExcel=false;

      get f() { return this.cashBankTransferForm.controls; }

      cashBankTransfer(cashBankTransferForm:any) {  }

      constructor(private service: MasterService,private router1: ActivatedRoute,private orderManagementService:OrderManagementService,private  fb: FormBuilder, private router: Router) {
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
          receiptMethodId:[],
          toAcctDescpId:[],
          bankId:[],
          bankAccountId:[],
    
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
          chqTrfAmt:[],

          totalDr:[],
          totalCr:[],
          runningTotalCr:[],
          runningTotalDr:[],

          docSeqValue:[],
          description:[],
          name1:[],
          jeCategory:[],
          jeSource:[],
          periodName:[],

          rcptLine: this.fb.array([this.rcptLineDetails()]),
      
        });
      }

      rcptLineDetails() {
        return this.fb.group({
          selectFlag: [],
          receiptNumber:[],
          receiptDate: [],
          receiptMethodId: [],
          locId: [],
          checkNo: [],
          checkDate: [],
          bankName: [],
          branchName: [],
          amount: [],
          actTrfDocNo:[],
         })
      }
    
      rcptLineArray(): FormArray {
        return <FormArray>this.cashBankTransferForm.get('rcptLine')
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


          this.service.OUIdListDiv(this.divisionId)
          .subscribe(
            data => {
              this.OUIdList = data;
              console.log(this.OUIdList);
            }
          );
    
        this.service.getLocationSearch1(this.ouId)
        .subscribe(
          data => {
            this.locIdList = data;
            console.log(this.locIdList);
    
          }
            );


          // this.service.OUIdList()
          // .subscribe(
          //   data => {
          //     this.OUIdList = data;
          //     console.log(this.OUIdList);
          //   }
          // );

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
       

        
            this.sub = this.router1.params.subscribe(params => {
               var  mDocNo = params['mDocNo'];
              //  alert(mDocNo)
              if (mDocNo != undefined){
              this.SearchByDocNo(mDocNo);
            }
          });
        

        }


        onOuIdSelected1(ouId) {
          
          if (ouId > 0) {
             this.service.getLocationSearch1(ouId)
              .subscribe(
                data => {
                  this.locIdList = data;
                  console.log(this.locIdList);
                } );
          } }
        

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

          // delete val.fromAcctDescpId;
          // delete val.toAcctDescpId;
          delete val.chqTrfAmt;
          delete val.rcptLine;

          return val;
        }
       
     
         cashBnkTrfSave() {
          const formValue: ICashBankTransfer =this.transeData(this.cashBankTransferForm.value);
          this.CheckDataValidations();
          // alert ("Validation Status :"+this.checkValidation);
          if (this.checkValidation===true) {
            this.displayButton=false;
        
          this.service.CashBankTrfSaveSubmit(formValue,this.emplId).subscribe((res: any) => {
            if (res.code === 200) {
              alert('RECORD INSERTED SUCCESSFUILY');
              this.docTrfNo=res.obj;
              // this.cashBankTransferForm.disable();
              this.statusSave=false;
              this.statusPost=true;
              this.updateArReceipt(res.obj);

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
          
            cashBnkTrfUpdate() {
            var docNum =this.cashBankTransferForm.get('docTrfNo').value;
            this.CheckDataValidations();
            if (this.checkValidation===true) {
              this.displayButton=false;
                alert("Data Validation Sucessfull....");
                const formValue: ICashBankTransfer = this.cashBankTransferForm.value;
                this.service.UpdateCashBankTrf(formValue ,docNum).subscribe((res: any) => {
                  if (res.code === 200) {
                    alert('RECORD UPDATED SUCCESSFULLY');
                    // this.updateButton=false;
                    // window.location.reload();
                    this.updateArReceipt(this.docTrfNo);
                    this.cashBankTransferForm.disable();
                  } else {
                    if (res.code === 400) {
                      alert('ERROR OCCOURED IN PROCEESS');
                    }
                  }
                  
                });
              }else{ alert("Data Validation Not Sucessfull....\nData not Saved...")  }
          }



      updateArReceipt(docTrfNum) {
        let variants = <FormArray>this.rcptLineArray();
        var dTrfNum = docTrfNum;

        for (let i = 0; i < this.rcptLineArray().length; i++) {
      
           let variantFormGroup = <FormGroup>variants.controls[i];
            variantFormGroup.addControl('docTrfNo', new FormControl(dTrfNum, Validators.required));
        }

        console.log(variants.value);

        this.service.arRcptUpdate(variants.value, dTrfNum).subscribe((res: any) => {
          if (res.code === 200) {
            alert('Receipt Updated Successfully');
    
            this.cashBankTransferForm.disable();
    
          } else {
            if (res.code === 400) {
              alert('Error While Saving Record:-' + res.obj);  } 
            }
        });
      }


      cashBnkTrfPost() {
        // this.CheckDataValidations();

        // if (this.checkValidation===true) {
        //   alert("Data Validation Sucessfull....\nPosting data  to MCP ITEM MASTER TABLE")
        var postEmplId=Number(sessionStorage.getItem('emplId'));
        const formValue: ICashBankTransfer =this.transeData(this.cashBankTransferForm.value);
        this.statusPost=false;
        this.updateButton=false;
        
        this.service.CashBankTrfPostSubmit(formValue,postEmplId).subscribe((res: any) => {
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

    cashBnkTrfCopy() {
      // this.CheckDataValidations();
      // if (this.checkValidation===true) {
      //   alert("Data Validation Sucessfull....\nPosting data  to MCP ITEM MASTER TABLE")
      var copyEmplId=Number(sessionStorage.getItem('emplId'));
      this.cashBankTransferForm.patchValue({status :'Save'});
      this.cashBankTransferForm.patchValue({trfAmount :0});

      this.viewAct=false;
      this.revButton=false;
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


    SearchByDocNo(mDocNo){
      // alert ("Document Num :" +mDocNo);
      this.service.getBnkTrfSearchByDocNum(mDocNo,sessionStorage.getItem('ouId'))
        .subscribe(
          data => {
            this.lstcomments = data.obj;
            console.log(this.lstcomments);
            this.exportExcel=true;
            this.selectdisp=true;
            this.cashBankTransferForm.patchValue(this.lstcomments);
            this.docTrfNo = this.lstcomments.docTrfNo;
            this.fromAcctDescp=this.lstcomments.fromAcctDescp;
            this.toAcctDescp=this.lstcomments.toAcctDescp;
            this.trfAmount=this.lstcomments.trfAmount;
            var inWords =this.number2text(this.lstcomments.trfAmount);
            this.amtInWords=inWords;
            this.displayButton = false;
            this.buttonStatus();
            // alert ("Chq list :" +this.showChqListModal);
        } ); 

        }


        SearchByDate() {
          var frmDt=this.cashBankTransferForm.get('fromDate').value;
          var toDt=this.cashBankTransferForm.get('toDate').value;
            //  alert("SearchByRcptNo-Receipt date : "+ frmDt+","+toDt  );
          this.service.getBnkTrfSearchByDate(frmDt, toDt,sessionStorage.getItem('ouId'))
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
                 this.selectdisp=true;
                // this.statusSave=false;
                // this.cashBankTransferForm.reset();
                // this.fromDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
                // this.toDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
              let select = this.lstcomments.find(d => d.tranId === trnId);
             
              if (select) {
                this.cashBankTransferForm.patchValue(select);
                this.docTrfNo = select.docTrfNo;
                this.trfAmount=select.trfAmount;
                var inWords =this.number2text(select.trfAmount);
                this.amtInWords=inWords;
                // this.fromAcctDescp=select.fromAcctDescp;
                // this.toAcctDescp=select.toAcctDescp;
                this.displayButton = false;
                this.exportExcel=true;
                this.buttonStatus();
                // var stat1=this.cashBankTransferForm.get("status").value;
                // var revStat1=this.cashBankTransferForm.get("reversalStatus").value;
               
                // if(stat1=='Save') {
                //   this.statusPost=true;
                //   this.statusSave=false;
                //   this.revButton=false;
                //   this.copyButton=true;
                //   this.viewAct=false;
                //  }
                // if(stat1=='Post') {
                //   this.statusPost=false;
                //   this.statusSave=false;
                //   this.revButton=true;
                //   this.copyButton=true;
                //   this.viewAct=true;
                //  }

                //  if(revStat1=='Y') {
                //   this.statusPost=false;
                //   this.statusSave=false;
                //   this.revButton=false;
                //   this.copyButton=false;
                //  }
               
                }
                // this.cashBankTransferForm.disable();
                // this.fromDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
                // this.toDate=this.pipe.transform(Date.now(), 'y-MM-dd');  
            }

            buttonStatus() {
              this.displayButton = false;
              var stat1=this.cashBankTransferForm.get("status").value;
              var revStat1=this.cashBankTransferForm.get("reversalStatus").value;
             
              if(stat1=='Save') {
                this.statusPost=true;
                this.statusSave=false;
                this.revButton=false;
                this.copyButton=true;
                this.viewAct=false;
                this.updateButton=true;
                // this.showChqListModal=false;
               
               }
              if(stat1=='Post') {
                this.statusPost=false;
                this.statusSave=false;
                this.revButton=true;
                this.copyButton=true;
                this.viewAct=true;
                this.showChqListModal=false;
                this.updateButton=false;
               }

               if(revStat1=='Y') {
                this.statusPost=false;
                this.statusSave=false;
                this.revButton=false;
                this.copyButton=false;
                this.showChqListModal=false;
                this.updateButton=false;
               }

            }

            
      
        onSelectionTrfcode(mEvent :number) {
          // alert ("Transfer Type :"+mEvent);
         let selectedValue = this.TransferTypeList.find(v => v.lookupValueId == mEvent);
          if( selectedValue != undefined){
            console.log(selectedValue);
            var lookupValue1=selectedValue.lookupValue;
            // this.fromAcctDescp=lookupValue1;
            this.transferDescp=selectedValue.lookupValueDesc;
           
           this.service.getFromAcList(lookupValue1,sessionStorage.getItem('ouId'))
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
            var trfCode =this.cashBankTransferForm.get('transferCode').value;
            var trfDesc =this.cashBankTransferForm.get('transferDescp').value;
            var prdNam  =this.cashBankTransferForm.get('openPeriod').value;

            let selectedValue = this.fromAcctList.find(v => v.receiptMethodId == methodId);
            if( selectedValue != undefined){
              console.log(selectedValue);
              var methodName =selectedValue.methodName;
              var mthdPrfx= methodName.substring(0,12)
            }

            // alert ("From A/c Method  Name : "+  methodId +"-"+methodName + " , "+mthdPrfx);

            // if(prdNam===undefined || prdNam===null || prdNam.trim()==='') {
            //   this.cashBankTransferForm.get('fromAcctDescpId').reset()
            // }
            
            if (methodId>0) {

              // if(methodId===58) {this.showChqListModal=true;} else {
              //   this.showChqListModal=false;
              //   this.trfAmount=null;
              //   this.amtInWords=null;
              // }

              if(mthdPrfx==='Counter Coll') {this.showChqListModal=true;} else {
                this.showChqListModal=false;
                this.trfAmount=null;this.amtInWords=null;
              }



              var x=this.cashBankTransferForm.get('receiptMethodId').value;
              var y=this.cashBankTransferForm.get('toAcctDescpId').value;
            
              if(x===y) {alert ("From A/c and To A/c Should not be Same...");
               this.cashBankTransferForm.get('receiptMethodId').reset();
              return;
            }
            
            
            let selectedValue = this.fromAcctList.find(v => v.receiptMethodId == methodId);
            if( selectedValue != undefined){
              console.log(selectedValue);
             this.fromAcctDescp=selectedValue.methodName;
             this.bankId=selectedValue.bankId;
             
            }


             this.service.getPayRecAccountCode(methodId,this.ouId,this.divisionId,this.locId)
             .subscribe(
               data => {
                 this.payAccountCode = data.obj;
                 console.log(this.payAccountCode);

                 this.fromAcctCode =this.payAccountCode.name;
                 this.fromGlCodeId=this.payAccountCode.id;
                //  if(trfCode===180) { 
                  //  this.glCodeBalance(this.fromAcctCode,prdNam);
                  // }
  
               });
              }  
            }
         
          xxxglCodeBalance(gcode,prd) {
            const formValue: ICashBankTransfer =this.transeData(this.cashBankTransferForm.value);
             this.service.getGlAccountBalance(gcode,prd).subscribe((res: any) => {
              if (res.code === 200) {
                alert('RECORD UPDATED SUCCESSFUILY');
                var x=res.obj;
                alert(x);
               } else {
                if (res.code === 400) {
                  var x=res.obj;
                  alert(x);
                    
                }
              }
            });
        }


        glCodeBalance(){
         var glCode=this.cashBankTransferForm.get('fromAcctCode').value;
        var prdName=this.cashBankTransferForm.get('openPeriod').value;
        this.service.getGlAccountBalanceNew(glCode,prdName)
        .subscribe(
          data => {
            this.payAccountCode = data.obj;
            console.log(this.payAccountCode);
            this.fromAcctCode =this.payAccountCode.name;
            this.fromGlCodeId=this.payAccountCode.id;
         });
        
        }

          onSelectionToAc(methodId :number) { 
            if (methodId>0) {
              // alert ("To ac:"+methodId);
              var x=this.cashBankTransferForm.get('receiptMethodId').value;
              var y=this.cashBankTransferForm.get('toAcctDescpId').value;
             
              if(x===y) {alert ("From A/c and To A/c Should not be Same...");
              this.cashBankTransferForm.get('toAcctDescpId').reset();
             return;
            }

              let selectedValue = this.toAcctList.find(v => v.receiptMethodId == methodId);
              if( selectedValue != undefined){
                console.log(selectedValue);
               this.toAcctDescp=selectedValue.methodName 
              //  +'-'+selectedValue.bankAccountNo;
               this.bankAccountId=selectedValue.bankAccountId;
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
                
                // this.toAcctCode='12PU.101.21.13998.0001';
                // this.toGlCodeId=10651;
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

              //  alert ("formValue.fromAcctDescpId :" +formValue.fromAcctDescpId);
            
              if (formValue.receiptMethodId <=0  || formValue.receiptMethodId===undefined || formValue.receiptMethodId===null)
              {
                  this.checkValidation=false;
                  alert ("FROM A/C: Should not be null....");
                  return;
               } 

              //  alert ("formValue.toAcctDescpId :" +formValue.toAcctDescpId);
              //  if (formValue.toAcctDescpId <=0  || formValue.toAcctDescpId===undefined || formValue.toAcctDescpId===null)
              //  {
              //      this.checkValidation=false;
              //      alert ("TO A/C: Should not be null....");
              //      return;
              //   } 

                if (formValue.toAcctDescp.trim()==='' || formValue.toAcctDescp===undefined || formValue.toAcctDescp===null)
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

                // if (formValue.toAcctDescp===undefined || formValue.toAcctDescp===null)
                // {
                //    this.checkValidation=false;   
                //    alert ("TO A/C DESC: Should not be null value....");
                //     return;
                //  } 
    
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

        
          LoadRcptList(){ 
            var status1 =this.cashBankTransferForm.get('status').value;
            var docNo=this.cashBankTransferForm.get('docTrfNo').value;
            this.showChqListModal=true;

            if(status1==='Save') { this.LoadRcptList1();this.selectAllButton=true;  } else
            {
             this.selectAllButton=false;
              this.service.getBnkChqListPosted(docNo)
              .subscribe(
                data => {
                  this.lstChequeList = data;
                  console.log(this.lstChequeList);
                  var len = this.rcptLineArray().length;
                  // alert("this.lstChequeList.length :"+this.lstChequeList.length);
                  for (let i = 0; i < this.lstChequeList.length - len; i++) {
                    var invLnGrp: FormGroup = this.rcptLineDetails();
                    this.rcptLineArray().push(invLnGrp);
                  }
                  this.cashBankTransferForm.get('rcptLine').patchValue(this.lstChequeList);
                  this.cashBankTransferForm.get('rcptLine').disable();
                 
                 
               }); 
            }
          }


          LoadRcptList1(){
            // var frmDt=this.cashBankTransferForm.get('fromDate').value;
            // var toDt=this.cashBankTransferForm.get('toDate').value;
             var rcptMethidId =this.cashBankTransferForm.get('receiptMethodId').value;
             var bnkId =this.cashBankTransferForm.get('bankId').value;
             var docNo=this.cashBankTransferForm.get('docTrfNo').value;
             var loc=this.cashBankTransferForm.get('locId').value;
             
            //  if(rcptMethidId !=58) {this.showChqListModal=false; return;}
            //  else {this.showChqListModal=true;     }
            //  this.showChqListModal=false;  

             if(this.displayButton===true){

              this.service.getBnkChqList(bnkId,rcptMethidId,loc)
              .subscribe(
                data => {
                  this.lstChequeList = data.obj;
                  console.log(this.lstChequeList);
                  var len = this.rcptLineArray().length;
                  // alert("this.lstChequeList.length :"+this.lstChequeList.length);
                  if(data.obj ===null ){alert ("Cheque List Details Not Found....") ;  return;}
                  if(data.obj.length >0 ){
                  
                  for (let i = 0; i < this.lstChequeList.length - len; i++) {
                    var invLnGrp: FormGroup = this.rcptLineDetails();
                    this.rcptLineArray().push(invLnGrp);
                  }
                  this.cashBankTransferForm.get('rcptLine').patchValue(this.lstChequeList);
                } else {alert ("Cheque List Details Not Found....") ;  return;}
                }); 

              } else
              {

                this.service.getBnkChqListDocNum(loc,rcptMethidId,docNo)
                .subscribe(
                  data => {
                    this.lstChequeList = data;
                    console.log(this.lstChequeList);
                    var len = this.rcptLineArray().length;
                    // alert("this.lstChequeList.length :"+this.lstChequeList.length);
                    for (let i = 0; i < this.lstChequeList.length - len; i++) {
                      var invLnGrp: FormGroup = this.rcptLineDetails();
                      this.rcptLineArray().push(invLnGrp);
                    }

                    this.cashBankTransferForm.get('rcptLine').patchValue(this.lstChequeList);
                  

                  var rcptLineArr = this.cashBankTransferForm.get('rcptLine').value;
                  var patch = this.cashBankTransferForm.get('rcptLine') as FormArray;
                
                  //  alert( "this.rcptLineArray().length :"+this.lstChequeList.length);

                  for (let i = 0; i < this.rcptLineArray().length; i++) 
                  {
                    if(rcptLineArr[i].actTrfDocNo===this.docTrfNo){
                        patch.controls[i].patchValue({ selectFlag: true });   }
                 }

                } ); 

              }
            }


              
              selectAllFlagEvent(e) {
               
                var rcptLineArr = this.cashBankTransferForm.get('rcptLine').value;
                var patch = this.cashBankTransferForm.get('rcptLine') as FormArray;
                if (e.target.checked) { 
                for (let i = 0; i < this.rcptLineArray().length; i++) {
                patch.controls[i].patchValue({ selectFlag: true })    }
                } 
                else 
                {
                  for (let i = 0; i < this.rcptLineArray().length; i++) {
                    patch.controls[i].patchValue({ selectFlag: '' }) 
                  }
                }

              this.CalculateValue(0);
              }


              selectFlagEvent(e, index) {
                if (e.target.checked) { }
                  this.CalculateValue(index);
              }


              CalculateValue(i) {

                var rcptLineArr = this.cashBankTransferForm.get('rcptLine').value;
                var patch = this.cashBankTransferForm.get('rcptLine') as FormArray;
                var totAmt=0;
                
                for (let i = 0; i < this.rcptLineArray().length; i++) {
            
                  if (rcptLineArr[i].selectFlag === true) {
                    totAmt = totAmt + Number(rcptLineArr[i].amount);
                  }
                         
                }
                  
                // alert (" totAmt : "+totAmt);
                this.cashBankTransferForm.patchValue({trfAmount:totAmt});
                var inWords =this.number2text(totAmt);
                this.amtInWords=inWords;
              }


              onKey(event: any) {
                var trfAmt=this.cashBankTransferForm.get('trfAmount').value
                var inWords =this.number2text(trfAmt);
                this.amtInWords=inWords;
                     
              }

              validateTrfDate(trfDate) {
                var currDate = new Date();
                var trfDate1 = new Date(trfDate);
                if (trfDate1 > currDate) {
                  alert("TRANSFER DATE :" + "Should not be above Today's Date");
                  this.transferDate = this.pipe.transform(this.now, 'y-MM-dd');
                }
            
            
              }


              validateTrfAmt(x) {

                var trfAmt=this.cashBankTransferForm.get('trfAmount').value
                if(trfAmt <=0) {  alert ("Transfer Amount should by above zero");
                 this.cashBankTransferForm.patchValue({trfAmount:''});
                 this.cashBankTransferForm.patchValue({amtInWords:''});
                return;
              }
                
              var inWords =this.number2text(trfAmt);
              this.amtInWords=inWords;
               
            }

               number2text(value) {
                var fraction = Math.round(this.frac(value)*100);
                var f_text  = "";
            
                if(fraction > 0) {
                    f_text = "AND "+this.convert_number(fraction)+" PAISE";
                }
                return this.convert_number(value)+" RUPEE "+f_text+" ONLY";
               }
            
                frac(f) {
                    return f % 1;
                }

          convert_number(number)
          {
              if ((number < 0) || (number > 999999999)) 
              { 
                  return "NUMBER OUT OF RANGE!";
              }
              var Gn = Math.floor(number / 10000000);  /* Crore */ 
              number -= Gn * 10000000; 
              var kn = Math.floor(number / 100000);     /* lakhs */ 
              number -= kn * 100000; 
              var Hn = Math.floor(number / 1000);      /* thousand */ 
              number -= Hn * 1000; 
              var Dn = Math.floor(number / 100);       /* Tens (deca) */ 
              number = number % 100;               /* Ones */ 
              var tn= Math.floor(number / 10); 
              var one=Math.floor(number % 10); 
              var res = ""; 

              if (Gn>0) 
              { 
                  res += (this.convert_number(Gn) + " CRORE"); 
              } 
              if (kn>0) 
              { 
                      res += (((res=="") ? "" : " ") + 
                      this.convert_number(kn) + " LAKH"); 
              } 
              if (Hn>0) 
              { 
                  res += (((res=="") ? "" : " ") +
                  this.convert_number(Hn) + " THOUSAND"); 
              } 

              if (Dn) 
              { 
                  res += (((res=="") ? "" : " ") + 
                  this.convert_number(Dn) + " HUNDRED"); 
              } 


              var ones = Array("", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX","SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN","FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN","NINETEEN"); 
              var tens = Array("", "", "TWENTY", "THIRTY", "FOURTY", "FIFTY", "SIXTY","SEVENTY", "EIGHTY", "NINETY"); 

                  if (tn>0 || one>0) 
                  { 
                      if (!(res=="")) 
                      { 
                          res += " AND "; 
                      } 
                      if (tn < 2) 
                      { 
                          res += ones[tn * 10 + one]; 
                      } 
                      else 
                     { 

                      res += tens[tn];
                      if (one>0) 
                      { 
                          res += ("-" + ones[one]); 
                      } 
                    } 
                  }

                    if (res=="")
                    { 
                        res = "zero"; 
                    } 
                    return res;
            }

            removeRcptLines(){
              var applLineArr = this.cashBankTransferForm.get('rcptLine').value;
              var len1 = applLineArr.length;
              for (let i = len1 - 1; i >= 0; i--) {
               if (this.rcptLineArray().controls[i].get('selectFlag').value != true) {
                 this.rcptLineArray().removeAt(i);   } 
             }
            }
              
            
           
      viewAccounting() {

        this.viewAccountingBankTrf=null;
        this.viewAccountingBnkTrfLines=null;
        this.showViewActLine=false;
        var docNo =this.cashBankTransferForm.get("docTrfNo").value;
      this.service.viewAccountingBankTransfer(docNo).subscribe((res: any) => {
      if (res.code === 200) {
        this.viewAccountingBankTrf = res.obj;
        console.log(this.viewAccountingBankTrf);

        this.docSeqValue=this.viewAccountingBankTrf.docSeqValue;
        this.description=this.viewAccountingBankTrf.description;
        this.name1=this.viewAccountingBankTrf.name;
        this.jeCategory=this.viewAccountingBankTrf.jeCategory;
        this.jeSource=this.viewAccountingBankTrf.jeSource;
        this.periodName=this.viewAccountingBankTrf.periodName;
        this.runningTotalDr=this.viewAccountingBankTrf.runningTotalDr;
        this.runningTotalCr=this.viewAccountingBankTrf.runningTotalCr;
        
        // alert(this.viewAccountingBankTrf.name);
       
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
      }

      ViewActSelect(index) {
        // alert ("View Act Line ..."+index);
        this.showViewActLine=true;
        var docNo =this.cashBankTransferForm.get("docTrfNo").value;
        this.service.viewAccountingBankTransfer(docNo).subscribe((res: any) => {
          if (res.code === 200) {
            this.viewAccountingBnkTrfLines = res.obj.glLines;
            console.log(this.viewAccountingBnkTrfLines);
            this.runningTotalDr=res.obj.runningTotalDr;
            this.runningTotalCr=res.obj.runningTotalCr;
            // this.paymentArForm.patchValue({totalDr:res.obj[index].runningTotalDr})
            // this.paymentArForm.patchValue({totalCr:res.obj[index].runningTotalCr})
            // alert(this.runningTotalDr +","+this.runningTotalCr);
            } 
            else {
            if (res.code === 400) {
              alert(res.message);
            }
          }
        });
      }

           
  cntrRcptHeaderList = [[
    // 'SrlNo',
    'Receipt Number',
    'Receipt Date',
    // 'receiptMethodId',
    'Loc Code',
    'ChequeNo',
    'Cheque Date',
    'Bank Name',
    'Branch Name',
    'Amount',
    'ActTrf DocNo',
    'Print DateTime',
  ]]


  


  rcptListExport() {
    var docNum =this.cashBankTransferForm.get('docTrfNo').value;
    var status1 =this.cashBankTransferForm.get('status').value;
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet([]);
    xlsx.utils.sheet_add_aoa(ws, this.cntrRcptHeaderList);
    var orList = this.cashBankTransferForm.get('rcptLine').value;
    var xlOrdList: any = [];

    for (let i = 0; i < orList.length; i++) {
      var ordLn = new cntrRcptList();

      // ordLn.srlNo=i+1;
      // ordLn.division=sessionStorage.getItem('divisionName');
      // ordLn.ouName=sessionStorage.getItem('ouName');
      // ordLn.ouId = orList[i].ouId;
      // if( orList[i].actTrfDocNo === docNum) {
      ordLn.receiptNumber = orList[i].receiptNumber.toString();
      ordLn.receiptDate = this.pipe.transform(orList[i].receiptDate, 'dd-MM-y');
      // ordLn.receiptMethodId = orList[i].receiptMethodId;
      ordLn.locId = orList[i].locId;
      ordLn.checkNo = orList[i].checkNo;
      ordLn.checkDate = this.pipe.transform(orList[i].checkDate, 'dd-MM-y');
      ordLn.bankName = orList[i].bankName;
      ordLn.branchName = orList[i].branchName;
      ordLn.amount = orList[i].amount;
      ordLn.actTrfDocNo = orList[i].actTrfDocNo;
      ordLn.printDateTime = this.pipe.transform(Date.now(), 'dd-MM-y hh:mm:ss');  
      xlOrdList.push(ordLn);
      // }
    }

    xlsx.utils.sheet_add_json(ws, xlOrdList, { origin: 'A2', skipHeader: true });
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'rcptCntrList.xlsx');
  }
 
}
