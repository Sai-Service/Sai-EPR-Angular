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

interface ICashBankTransfer {
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
      // reversalDate = this.pipe.transform(Date.now(), 'y-MM-dd');
     
      clearingDate = this.pipe.transform(Date.now(), 'y-MM-dd');
     
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

     reversalPeriod:string=null;
     reversalStatus='NO';
     reversalDate:Date=null;
     reversalDocNo:string=null;
     reversalDocDt:Date=null;
     toReceiptId:number=null;
     fromReceiptId:number=null;

  
      searchDocNo:string;
      display = true;
      displayButton = true;
      displaySuccess=false;
      statusPost =false;
      statusSave=false;

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
        if(status1=='SAVE') {
           this.statusSave=true;
           this.statusPost=false;
        }
        if(status1=='POST') {
          this.statusPost=true;
          this.statusSave=false;
       }
         
       }

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
          // delete val.locId;
          delete val.locName;
          // delete val.ouId;
          delete val.deptId;
          delete val.orgId;
       
          return val;
        }
       
         

         cashBnkTrfSave() {
          // this.CheckDataValidations();

          // if (this.checkValidation===true) {
          //   alert("Data Validation Sucessfull....\nPosting data  to MCP ITEM MASTER TABLE")
         
          
          const formValue: ICashBankTransfer =this.transeData(this.cashBankTransferForm.value);
          this.service.CashBankTrfSaveSubmit(formValue,this.emplId).subscribe((res: any) => {
            if (res.code === 200) {
              alert('RECORD INSERTED SUCCESSFUILY');
              this.docTrfNo=res.obj;
              this.cashBankTransferForm.disable();
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



        cashBnkTrfPost(){alert("Cash Bank Transfer ....Post ...Wip");}
        cashBnkTrfCopy(){alert("Cash Bank Transfer ....Copy ...Wip");}
        cashBnkTrfReversal(){alert("Cash Bank Transfer ....Reversal ...Wip");}
        searchMast(){}
        SearchByDocNo(mDocNo){alert("Search By Document Number .... ...Wip " +mDocNo);}

      
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
               this.toAcctDescp=selectedValue.methodName;
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
 
}
