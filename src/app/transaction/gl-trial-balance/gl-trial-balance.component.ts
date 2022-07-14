import { Component, OnInit, HostListener, ViewChild, ElementRef ,NgModule} from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe ,Location} from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import * as xlsx from 'xlsx';
import { ReportServiceService } from 'src/app/report/report-service.service'
import { saveAs } from 'file-saver';



const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

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

export class glTbReport_L1
{
  srlNo:number;
  divName: string;
  ouName:string;
  natAccount:string;
  natAccountDesc: string;
  glDocNo: string;
  referenceNo: string;
  glcodeDescription: string;
  jeCategory: string;
  jeSource: string;
  jeDescription: string;
  debitAmt: number;
  creditAmt: number;
  postedDate: string;
  
  printDateTime:string;

}

export class glTbReport_L2 
{
  srlNo:number;
  divName: string;
  ouName:string;
  natAccount:string;
  natAccountDesc: string;
 
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
  lstTBActLineDet1 :any;

  loginName: string;
  loginArray: string;
  name: string;
  ouId:number;
  ouName: string;
  ouCode:string;
  locId: number;
  locCode:string;
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
  jeSource:string;

  glSegment:string;
  glDocNum:string;
  glDocRefNum:string;

  exportExcel=false;
  drilDown3=false;

  get f() { return this.glTrialBalanceForm.controls; }
  glTrialBalance(glTrialBalanceForm:any) {  }


  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService,private reportService: ReportServiceService) { 
    this.glTrialBalanceForm = this.fb.group({
      divisionId: [],
      division: [],
      orgId: [],
      loginArray: [''],
      loginName: [''],
      ouId: [],
      ouName: [''],
      locId: [''],
      locCode:[],
      locName: [''],
      emplId: [],
      roleId: [],
      deptId: [],
      ouCode:[],

      periodName:[],
      natAccount:[],
      natActDesc:[],
      glDebitAmt :[],
      glCreditAmt :[],
      jeSource:[],

      glSegment:[],
      glDocNum:[],
      glDocRefNum:[],
     
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
    this.locCode=sessionStorage.getItem('locCode');
    // this.locName=(sessionStorage.getItem('locName'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.emplId= Number(sessionStorage.getItem('emplId'));
    this.orgId=this.ouId;
    this.ouCode=this.ouName +"(" +this.locCode.substring(0,4)+")";
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
    var opuCode= this.locCode.substring(0,4)
  
    this.service.getGLTrialBalanceList(opuCode, prdName)
      .subscribe(
        data => {
          this.lstTBList = data;
          if(this.lstTBList.length==0) {
            alert (opuCode +" - " + "No Record Found.");
            this.exportExcel=false;
            return;
          }
          this.exportExcel=true;
          console.log(this.lstTBList);
    });
 }

 SelectTbAct(natAct,natDesc,drAmt,crAmt){

  var prdName =this.glTrialBalanceForm.get("periodName").value;
  var opuCode= this.locCode.substring(0,4)

  this.natAccount=natAct;
  this.natActDesc=natDesc;
  this.glDebitAmt=drAmt;
  this.glCreditAmt=crAmt;

  if(prdName==null || prdName==undefined || prdName.trim()=='') {
    alert ("Please Select Period..."); return;
  }
  this.drilDown3=false;
  this.lstTBActLineDet=null;
  this.lstTBActLineDet1=null;
   
  this.service.getGLTrialBalanceActSelect(opuCode, prdName,natAct)
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


SelectTbAct2(trxNum,refNum,catg,source){
  alert ("Trans Number :" + trxNum + "\nReference Number : " +refNum + "\nCategory : "+catg +"\nSource : "+source);
  // Receivable
  if(source==='Receivable'){
  this.router.navigate(['/admin/transaction/ARInvoice', trxNum]);
  } 
  else if(source==='Payables' && catg==='Purchase Invoice'){
    var invNo1=refNum.split('-');
    var invNo=invNo1[0];
    // alert(invNo);
    this.router.navigate(['/admin/transaction/payableInvoice', invNo]);
  }  
  else if(source==='Purchasing' && catg==='Po_Receipt'){
    this.router.navigate(['/admin/master/PoReceiptForm'],{ queryParams: { trxNum: trxNum,catg:catg }});
    alert ("Source - Purchasing , Category - "+catg +" ..Wip...")
  } 
  else if(source==='Payables' && catg==='Payments' ){
    // this.router.navigate(['/admin/transaction/Payment', trxNum]);
    this.router.navigate(['/admin/transaction/Payment'], { queryParams: { trxNum: trxNum,catg:catg } } );
    alert ("Source - Purchasing , Category - "+catg +" ..Wip...")
  } 
  else if(source==='Receivables' && catg==='Receipts' ){
    // this.router.navigate(['/admin/transaction/Payment', trxNum]);
    this.router.navigate(['/admin/transaction/PaymentAr'], { queryParams: { trxNum: trxNum,catg:catg } } );
    // this.router.navigate(['/admin/transaction/PaymentAr',trxNum]);
    alert ("Source - Purchasing , Category - "+catg +" ..Wip...")
  } 
  else if(source==='Inventory' && catg==='STKTRF_Receipt' ){
    // this.router.navigate(['/admin/transaction/Payment', trxNum]);
    this.router.navigate(['/admin/transaction/stockTransfer',refNum] );
    // this.router.navigate(['/admin/transaction/PaymentAr',trxNum]);
    alert ("Source - Purchasing , Category - "+catg +" ..Wip...")
  } 
  else if(catg==='JV Manual Creation' ){
    // this.router.navigate(['/admin/transaction/Payment', trxNum]);
    var docSequenceValue =trxNum;
    this.router.navigate(['/admin/transaction/JournalVoucher',docSequenceValue] );
    alert ("Category - "+catg +" ..Wip...")
  } 

  else {alert ("Work In Progress")}
  
}




SelectTbAct1(segment,glDocNum,refNum,jSource){

  // var prdName =this.glTrialBalanceForm.get("periodName").value;
  // var opuCode= this.locCode.substring(0,4)

  this.glDocNum=glDocNum;
  this.glDocRefNum=refNum;
  this.glSegment=segment;
  this.jeSource=jSource;

  if(segment==null || segment==undefined || segment.trim()=='') {
    alert ("Please Select Period..."); return;
  }

  
  this.lstTBActLineDet1=null;
   
  this.service.getGLTrialBalanceActSelect1(segment, glDocNum,refNum)
    .subscribe(
      data => {
        this.lstTBActLineDet1 = data.obj;
        if(this.lstTBActLineDet1.length===0) {
          this.drilDown3=false;
          alert (glDocNum +" - " + "Line Details Not Found.");
          return;
        }
        this.drilDown3=true;
        console.log(this.lstTBActLineDet1);
  });
}

        
 glTbHeaderList = [[
  'SrlNo',
  'DIVISION',
  'OPERATING UNIT',
  'NATURAL ACCOUNT',
  'ACCOUNT DESCREPTION',
  'OPENING BALANCE',
  'DEBITS',
  'CREDITS',
  'CLOSING BALANCE',
  // 'PRINT DATE TIME',
]]

glTbHeaderList_L1 = [[
  'SrlNo',
  'DIVISION',
  'OPERATING UNIT',
  'NATURAL ACCOUNT',
  'ACCOUNT DESCIEPTION',
  'DOCUMENT NO',
  'REFERENCE NO',
  'GL CODE',
  'CATEGORY',
  'SOURCE',
  'DESCREPTION',
  'DEBIT AMT',
  'CREDIT AMT',
  'POSTED DATE',

  // 'PRINT DATE TIME',
]]

glTbHeaderList_L2 = [[
  'SrlNo',
  'DIVISION',
  'OPERATING UNIT',
  'NATURAL ACCOUNT',
  'ACCOUNT DESCREPTION',
  'OPENING BALANCE',
  'DEBITS',
  'CREDITS',
  'CLOSING BALANCE',
  // 'PRINT DATE TIME',
]]

 glTbReportExport() {
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet([]);
  xlsx.utils.sheet_add_aoa(ws, this.glTbHeaderList);
  var orList = this.lstTBList
  var xlOrdList: any = [];
  // var ordLn = new glTbReport();
 
  for (let i = 0; i < orList.length; i++) {
    var ordLn = new glTbReport();
    ordLn.srlNo=i+1;
    ordLn.divName = sessionStorage.getItem('divisionName');
    ordLn.ouName = sessionStorage.getItem('ouName');
    ordLn.natAccount = orList[i].naturalAccount;
    ordLn.natAccountDesc = orList[i].accountDesc;
    ordLn.openBalance = orList[i].openingBal;
    ordLn.debitAmt = orList[i].periodNetDr;
    ordLn.creditAmt = orList[i].periodNetCR;
    ordLn.closeBalance = orList[i].closingBal;
    // ordLn.printDateTime = this.pipe.transform(Date.now(), 'dd-MM-y hh:mm:ss a');  
    xlOrdList.push(ordLn);
   }
   
  var printdateTime =this.pipe.transform(Date.now(), 'ddMMyThhmmssa');  
  var flName ='gltbreport-'+printdateTime+'.xlsx'
  xlsx.utils.sheet_add_json(ws, xlOrdList, { origin: 'A2', skipHeader: true });
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  // xlsx.writeFile(wb, 'gltbreport.xlsx');
  xlsx.writeFile(wb, flName);
  
}

glTbReport2(){
//'GL Trial Balance'
 
  var opuCode= this.locCode.substring(0,4)
  var periodName =this.glTrialBalanceForm.get("periodName").value;
  // alert(opuCode +","+periodName);

 const fileName = 'GL Trial Balance-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
 const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
 this.reportService.gltrialBalanceReport(opuCode,periodName)
   .subscribe(data => {
     saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
    //  this.closeResetButton = true;
    //  this.dataDisplay = ''
    //  this.isDisabled1=false;
   })      
 }


 glTbReportExport_Level1(){

  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet([]);
  xlsx.utils.sheet_add_aoa(ws, this.glTbHeaderList_L1);
  var orList = this.lstTBActLineDet
  var xlOrdList: any = [];
  // var ordLn = new glTbReport();
 
  for (let i = 0; i < orList.length; i++) {
    var ordLn = new  glTbReport_L1();
    ordLn.srlNo=i+1;
    ordLn.divName = sessionStorage.getItem('divisionName');
    ordLn.ouName = sessionStorage.getItem('ouName');
    ordLn.natAccount=this.natAccount;
    ordLn.natAccountDesc=this.natActDesc;
    ordLn.glDocNo = orList[i].glDocNo.toString();
    ordLn.referenceNo = orList[i].referenceNo.toString();
    ordLn.glcodeDescription = orList[i].glcodeDescription;
    ordLn.jeCategory = orList[i].jeCategory;
    ordLn.jeSource = orList[i].jeSource;
    ordLn.jeDescription = orList[i].jeDescription;
    ordLn.debitAmt = orList[i].debitAmt;
    ordLn.creditAmt = orList[i].creditAmt;
    ordLn.postedDate = this.pipe.transform(orList[i].postedDate, 'dd-MM-y hh:mm:ss a');  
    xlOrdList.push(ordLn);
   }
   
  var printdateTime =this.pipe.transform(Date.now(), 'ddMMyThhmmssa');  
  var flName ='gltbreportDetails-'+printdateTime+'.xlsx'
  xlsx.utils.sheet_add_json(ws, xlOrdList, { origin: 'A2', skipHeader: true });
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  // xlsx.writeFile(wb, 'gltbreport.xlsx');
  xlsx.writeFile(wb, flName);
  

 }

 glTbReportExport_Level2(){
   alert ("Not Available...WIP")
 }


}
