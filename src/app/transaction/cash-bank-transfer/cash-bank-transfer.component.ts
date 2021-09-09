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
      public OUIdList           : Array<string> = [];
      public TransferTypeList    : Array<string> = [];
      public PeriodList          : Array<string> = [];
      public fromAcctList          : Array<string> = [];
      public toAcctList          : Array<string> = [];
      
      
      
    
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

      branch:number;
      period:number;
      openPeriod:string;
      docTrfNo:string;
      transferCode:string;
      transferDate = this.pipe.transform(Date.now(), 'y-MM-dd');
      reversalDate = this.pipe.transform(Date.now(), 'y-MM-dd');
      clearingDate = this.pipe.transform(Date.now(), 'y-MM-dd');
      reversalPeriod:string;
      status:string;

      fromAcctDescp:string;
      toAcctDescp:string;
      transferAmt:number;
      amtInWords:string;
      recAcCode:string;
      payAcCode:string;
  
      searchDocNo:string;



      display = true;
      displayButton = true;
      displaySuccess=false;

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

          branch:[],
          period:[],
          openPeriod:[],
          docTrfNo:[],
          transferCode:[],
          transferDate:[],
          reversalDate:[],
          clearingDate:[],
          reversalPeriod:[],
          fromAcctDescp:[],
          toAcctDescp:[],
          status:[],

          transferAmt:[],
          amtInWords:[],
          recAcCode:[],
          payAcCode:[],

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

          this.service.fromAcctLst(this.locId)
          .subscribe(
            data => {
              this.fromAcctList = data;
              console.log(this.fromAcctList);
            }
          );

          this.service.toAcctLst(this.locId)
          .subscribe(
            data => {
              this.toAcctList = data;
              console.log(this.toAcctList);
            }
          );



          
          
          

        }

        resetMast() {
          window.location.reload();
        }
      
        closeMast() {
          this.router.navigate(['admin']);
        }

        cashBnkTrfSave() {alert("Cash Bank Transfer ....Save ...Wip");}
        cashBnkTrfPost(){alert("Cash Bank Transfer ....Post ...Wip");}
        cashBnkTrfCopy(){alert("Cash Bank Transfer ....Copy ...Wip");}
        cashBnkTrfReversal(){alert("Cash Bank Transfer ....Reversal ...Wip");}
        searchMast(){}

        SearchByDocNo(mDocNo){alert("Search By Document Number .... ...Wip " +mDocNo);}

      

}

