import { Component, OnInit, HostListener, ViewChild, ElementRef ,NgModule} from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe ,Location} from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import * as xlsx from 'xlsx';

export class glTbReport 
{
  srlNo:number;
  divName: string;
  ouName:string;
  natAccount:string;
  natAccountDesc: string;
  debitAmt:number;
  creditAmt:number;
  openBalance: number;
  closeBalance: number;
  printDateTime:string;

}


@Component({
  selector: 'app-gl-trial-balance',
  templateUrl: './gl-trial-balance.component.html',
  styleUrls: ['./gl-trial-balance.component.css']
})
export class GlTrialBalanceComponent implements OnInit {
  glTrialBalanceForm: FormGroup;

  @ViewChild('aForm') aForm: ElementRef;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild('epltable1', { static: false }) epltable1: ElementRef;
  @ViewChild('orderList', { static: false }) orderList: ElementRef;

  pipe = new DatePipe('en-US');

  periodNameList: any=[];
  lstTBList :any;
  lstTBActLineDet :any;

  loginName: string;
  loginArray: string;
  name: string;
  ouId:number;
  ouName: string;
  locId: number;
  locName: string;
  deptId:number;
  emplId: number;
  roleId: number;
  orgId: number;
  divisionId: number;
  periodName:string;
  natAccount:string;
  natActDesc:string;
  glDebitAmt :number;
  glCreditAmt :number;

  exportExcel=false;

  get f() { return this.glTrialBalanceForm.controls; }
  glTrialBalance(glTrialBalanceForm:any) {  }


  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) { 
    this.glTrialBalanceForm = this.fb.group({
      divisionId: [],
      division: [],
      orgId: [],
      loginArray: [''],
      loginName: [''],
      ouId: [],
      ouName: [''],
      locId: [''],
      locName: [''],
      emplId: [],
      roleId: [],
      deptId: [],

      periodName:[],
      natAccount:[],
      natActDesc:[],
      glDebitAmt :[],
      glCreditAmt :[],
    })
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


    this.service.FinancialPeriod()
      .subscribe(
      data => {
      this.periodNameList = data.obj;
  }
);
  }




  resetMast() {
    window.location.reload();
  }

  expExcel(){}

  SearchTB(){

    var prdName =this.glTrialBalanceForm.get("periodName").value;
    if(prdName==null || prdName==undefined || prdName.trim()=='') {
      alert ("Please Select Period..."); return;
    }
      //  alert ("Period Selected  : " +prdName);

    var ou='12MU'
    this.service.getGLTrialBalanceList(ou, prdName)
      .subscribe(
        data => {
          this.lstTBList = data;
          if(this.lstTBList.length==0) {
            alert (ou +" - " + "No Record Found.");
            this.exportExcel=false;
            return;
          }
          this.exportExcel=true;
          console.log(this.lstTBList);
    });
 }

 SelectTbAct(natAct,natDesc,drAmt,crAmt){

  var prdName =this.glTrialBalanceForm.get("periodName").value;
  var ou='12MU'

  this.natAccount=natAct;
  this.natActDesc=natDesc;
  this.glDebitAmt=drAmt;
  this.glCreditAmt=crAmt;

  if(prdName==null || prdName==undefined || prdName.trim()=='') {
    alert ("Please Select Period..."); return;
  }
  this.lstTBActLineDet=null;
   
  this.service.getGLTrialBalanceActSelect(ou, prdName,natAct)
    .subscribe(
      data => {
        this.lstTBActLineDet = data;
        if(this.lstTBActLineDet.length===0) {
          alert (natAct +" - " + "Line Details Not Found.");
          return;
        }
        console.log(this.lstTBActLineDet);
  });
}

        
 glTbHeaderList = [[
  'SrlNo',
  'DIVISION',
  'OPERATING UNIT',
  'NATURAL ACCOUNT',
  'ACCOUNT DESCIEPTION',
  'OPENING BALANCE',
  'DEBITS',
  'CREDITS',
  'CLOSING BALANCE',
  'PRINT DATE TIME',
]]


 glTbReportExport() {
  // var docNum =this.glTrialBalanceForm.get('docTrfNo').value;
  // var status1 =this.cashBankTransferForm.get('status').value;

  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet([]);
  xlsx.utils.sheet_add_aoa(ws, this.glTbHeaderList);
  // var orList = this.cashBankTransferForm.get('rcptLine').value;
  var orList = this.lstTBList
  var xlOrdList: any = [];

  for (let i = 0; i < orList.length; i++) {
    var ordLn = new glTbReport();

    ordLn.srlNo=i+1;
    ordLn.divName = sessionStorage.getItem('divisionName');
    ordLn.ouName = sessionStorage.getItem('ouName');
    // ordLn.receiptDate = this.pipe.transform(orList[i].receiptDate, 'dd-MM-y');
    // ordLn.receiptMethodId = orList[i].receiptMethodId;
    ordLn.natAccount = orList[i].naturalAccount;
    ordLn.natAccountDesc = orList[i].accountDesc;
    ordLn.openBalance = orList[i].openingBal;
    ordLn.debitAmt = orList[i].periodNetDr;
    ordLn.creditAmt = orList[i].periodNetCR;
    ordLn.closeBalance = orList[i].closingBal;
    ordLn.printDateTime = this.pipe.transform(Date.now(), 'dd-MM-y hh:mm:ss');  
    xlOrdList.push(ordLn);
    // }
  }

  xlsx.utils.sheet_add_json(ws, xlOrdList, { origin: 'A2', skipHeader: true });
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, 'gltbreport.xlsx');
}

}
