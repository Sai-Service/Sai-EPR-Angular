import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { ReportServiceService } from '../report-service.service'
import { DatePipe,Location } from '@angular/common';
import { MasterService } from '../../master/master.service';
import { saveAs } from 'file-saver';
import { data } from 'jquery';
import { TransactionService } from '../../transaction/transaction.service';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

@Component({
  selector: 'app-accounts-report',
  templateUrl: './accounts-report.component.html',
  styleUrls: ['./accounts-report.component.css']
})
export class AccountsReportComponent implements OnInit {
  reportForm: FormGroup;
  public minDate = new Date();
  pipe = new DatePipe('en-US');
  now = new Date();
  // fromDate:Date;
  // toDate:Date;
  fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  toDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  OUCode:string;
  locCode:string;
  locId:number;
  userName: string;
  public sourceList: Array<string> = [];
  public BillShipToList: Array<string> = [];
  periodNameList: any=[];
  glYearNameList: any=[];
  supSiteList :any=[];
  accountName1:string;
  public DepartmentList: any=[];
 
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  deptId:number;
  deptName:string;
  spInvAging1:number;
  spInvAging2:number;
  spInvAging3:number;
  periodName:string;
  glPeriodYear :number;
  isDisabled1 = false;
  accountName:string;
  isVisibleGSTSaleRegister: boolean = false;
  isVisibleGSTPurchaseRegister: boolean=false;
  isVisibleSparesdebtors:boolean=false;
  isVisiblespInvAgging:boolean=false;
  isVisiblepanelgltrialBalance:boolean=false;
  isVisiblePeriodName=false;
  isVisiblePeriodYear=false;
  panelCashBank:boolean=false;
  accountNameList:any=[];
  accountNameList1:any=[];
  isVisiblepanelAPGLUnpainAging:boolean=false;
  isVisiblepanelaccountName:boolean=false;
  isVisiblegstsaiDebtors:boolean=false;
  supplierNo:string;
  supNo:number;
  suppId:number;
  supSiteId:number;
  supSiteName:string;

  isVisiblepanelprePayment:boolean=false;
  isVisiblecustomerLedger:boolean=false;
  isVisiblepanelcashName:boolean=false;
  public NaturalAccountList: any = [];
  public InterBrancList: any = [];
  segment4:string;
  isVisibleLocation:boolean=false;
  isVisibleLocation1:boolean=false;
  ispanelTolocationOu:boolean=false;
  isVisiblespPurRegDownLoad: boolean = false;
  isVisibleVendorLedgerReport:boolean=false;
  source:string;

  age1: number=20;
  age2: number=30;
  age3: number=45;
  age4: number=60;
  isVisibleDepartmentList: boolean = false;
  custAccNo: string;
  isVisiblelocationLOV: boolean = false;
  isVisiblelocationInput: boolean = false;

  isVisibleSaleIND: boolean = false;
isVisiblepanelfromtolocation: boolean = false;
  rptValidation=true;
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService,private transactionService: TransactionService) {
    this.reportForm = this.fb.group({
      fromDate:[''],
      toDate:[''],
      OUCode:[''],
      locCode:[''],
      locId:[''],
      deptId:[],
      deptName:[],
      source:[],
      spInvAging1:[''],
      spInvAging2:[''],
      spInvAging3:[''],
      age4:[],
      age1:[],
      age2:[],
      age3:[],
      department:[],
      periodName:[''],
      glPeriodYear:[],
      accountName:[''],
      supplierNo:[''],
      supNo:[''],
      accountName1:[''],
      segment4:[''],
      userName: [''],
      supSiteId:[''],
      supSiteName:[''],
      suppId:[''],
      custAccNo:[''],
    })
   }
   
  ngOnInit(): void {
    this.reportForm.patchValue({OUCode:sessionStorage.getItem('ouId')+'-'+sessionStorage.getItem('ouName')})
    this.reportForm.patchValue({locCode:sessionStorage.getItem('locId')+'-'+sessionStorage.getItem('locName')});
    // this.reportForm.patchValue({accountName:sessionStorage.getItem('ticketNo')});
   // Prevent closing from click inside dropdown
$(document).on('click', '.dropdown-menu', function (e) {
  e.stopPropagation();
});

// make it as accordion for smaller screens
if ($(window).width() < 992) {
  $('.dropdown-menu a').click(function(e){
    e.preventDefault();
      if($(this).next('.submenu').length){
        $(this).next('.submenu').toggle();
      }
      $('.dropdown').on('hide.bs.dropdown', function () {
     $(this).find('.submenu').hide();
  })
  });
}
  
this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
.subscribe(
  data => {
    this.BillShipToList = data;
  }
);

this.transactionService.sourceListFn().subscribe(data => {
  this.sourceList = data;
  console.log(this.sourceList);

})


this.service.accountNameList()
.subscribe(
  data => {
    this.accountNameList = data;
  }
);

this.service.accountNameListbank().subscribe(
  data=> {
    this.accountNameList1 = data;
  }
)

this.service.DepartmentListNew()
.subscribe(
  data => {
    this.DepartmentList = data;
  }
);


this.service.supplierCodeWithEmplListNew()
.subscribe(
  data1 => {
    this.supplierCodeList = data1;
    console.log(this.supplierCodeList);
    data1 = this.supplierCodeList;
  }
);

this.service.FinancialPeriod()
.subscribe(
  data => {
    this.periodNameList = data.obj;
  }
);

this.service.glPeriodYear()
.subscribe(
  data => {
    this.glYearNameList = data.obj;
  }
);


this.service.getInterBranchNatural()
.subscribe(
  data => {
    this.NaturalAccountList = data.obj;
    console.log(data.obj);
    console.log(this.NaturalAccountList);
  }
);

this.reportForm.patchValue({ userName: sessionStorage.getItem('ticketNo') })

}

  report(reportForm) {
  }

  onOptionsLocation(event){
    // alert(event);
    this.reportForm.patchValue({locId:event})
  }


  onOptionsDepartmentList(event:string){
   
    if(event==null || event ==undefined || event.trim()=='') {
      // alert(event + "dept event ");
      this.reportForm.patchValue({deptId:''})
      this.reportForm.patchValue({deptName :''})
      return;
    }
    
    var deptList = this.DepartmentList.find(d => d.code === event);
    console.log(deptList);
    
    this.reportForm.patchValue({deptId:deptList.cmnTypeId})
    this.reportForm.patchValue({deptName :deptList.code})
  }


  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }
reportName:string;

  reportDetails(reportName){
  
    // alert(reportName);
    if (reportName==='gstPurRegister'){
    this.reportName='GST Purchase Register';
    // this.reportForm.get('fromDate').reset();
    // this.reportForm.get('toDate').reset();
    this.fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    this.toDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    this.reportForm.get('locCode').reset();
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=true;
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisiblepanelfromtolocation=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=false;
  }
  else if (reportName === 'customerLedger') {
    this.reportName = 'Customer Ledger Report';
    this.isVisibleGSTPurchaseRegister = false;
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=true;

    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.isVisibleDepartmentList = true;
    }
    this.isVisiblegstsaiDebtors=false;
    this.isVisiblepanelfromtolocation=false;
  }
  else if (reportName==='chequebounceReport'){
    this.reportName='Cheque Bounce Report';
    this.fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    this.toDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    this.reportForm.get('locCode').reset();
    this.isVisibleGSTSaleRegister=true;
    
    this.isVisibleGSTPurchaseRegister=false;
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false
    this.isVisiblepanelfromtolocation=false;
    this.isVisiblegstsaiDebtors=false;
  }
  else if (reportName==='gstPurSummary'){
    this.reportName='Purchase Register Summary';
    this.fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    this.toDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    this.reportForm.get('locCode').reset();
    this.isVisibleGSTSaleRegister=false;  
    this.isVisibleGSTPurchaseRegister=true;
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblepanelfromtolocation=false;
    this.isVisiblegstsaiDebtors=false;
  }
  else if (reportName === 'gstSparesSaiDebtors') {
    this.reportName = 'Sai Debtors'
    this.isVisibleGSTSaleRegister=false;  
    this.isVisibleGSTPurchaseRegister=false;
    this.isVisibleSaleIND=true;
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.isVisibleDepartmentList = true;
      this.isVisiblelocationLOV=true;
    }

    this.isVisiblegstsaiDebtors=false;
    this.isVisiblepanelfromtolocation=false;
  }
  else if (reportName==='receiptRegisterReport'){
    this.reportName='Receipt Register Report';
    this.fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    this.toDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    this.reportForm.get('locCode').reset();
    this.isVisibleGSTSaleRegister=false;
    
    this.isVisibleGSTPurchaseRegister=true;
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblepanelfromtolocation=false;
    this.isVisiblegstsaiDebtors=false;
  }
  else if (reportName==='gSTSaleRegister'){
    this.reportName='GST Sales Register';
    this.fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    this.toDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    this.reportForm.get('locCode').reset();
    this.isVisibleGSTSaleRegister=true;
    
    this.isVisibleGSTPurchaseRegister=false;
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=false;
    this.isVisiblepanelfromtolocation=false;
  }
  else if (reportName==='sparesdebtors'){
    this.reportName='Spares Debtors';
    this.fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    this.toDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    this.reportForm.get('locCode').reset();
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    
    this.isVisibleSparesdebtors=true;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblepanelfromtolocation=false;
    this.isVisiblegstsaiDebtors=false;
  }
  else if (reportName==='spInvAgging'){
    this.reportName='Spares Inventory Aging';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=true;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.isVisiblepanelfromtolocation=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=false;
  }
  else if (reportName==='gltrialBalance'){
    this.reportName='GL Trial Balance';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=true;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblePeriodName=false;
    this.isVisiblePeriodYear=true;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=false;
    this.isVisiblepanelfromtolocation=false;
  }

  else if (reportName==='cashBank'){
    this.reportForm.get('locCode').reset();
    this.reportForm.get('locId').reset();
    this.reportForm.get('segment4').reset();
    this.reportForm.get('accountName').reset();
    this.reportName='Cash Book Report';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    
    this.isVisibleSparesdebtors=false;
    this.isVisiblepanelaccountName=false;
    this.isVisiblepanelcashName=true;
    this.isVisibleLocation=true;
    this.isVisibleLocation1=true;
    this.isVisiblespInvAgging=false;
    this.reportForm.get('locCode').enable();
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=true;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblepanelfromtolocation=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=false;
  }
  else if (reportName=='bankBook'){
    this.reportName='Bank Book Report';
    this.reportForm.get('locCode').reset();
    this.reportForm.get('locId').reset();
    this.reportForm.get('segment4').reset();
    this.reportForm.get('accountName1').reset();
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    
    this.reportForm.get('locCode').disable();
    // this.reportForm.get('locCode').enable();
    this.isVisibleSparesdebtors=false;
    this.isVisibleLocation=false;
    this.isVisibleLocation1=false;
    this.isVisiblepanelaccountName=true;
    this.isVisiblepanelcashName=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=true;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.isVisiblepanelfromtolocation=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=false;
  }
  else if (reportName==='APGLUnpainAging'){
    this.reportName='AP To GL Unpaid Aging Report';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=true;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblepanelfromtolocation=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=false;
  }
  else if (reportName==='prePayment'){
    this.reportName='Prepayment Status Report';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=true;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblepanelfromtolocation=false;
    this.isVisiblegstsaiDebtors=false;
  }
  else if (reportName=='bankReconciliation'){
    this.reportName='Bank Reconciliation Report';
    this.reportForm.get('locCode').reset();
    this.reportForm.get('locId').reset();
    this.reportForm.get('segment4').reset();
    this.reportForm.get('accountName1').reset();
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    
    this.reportForm.get('locCode').disable();
    this.isVisibleSparesdebtors=false;
    this.isVisibleLocation=false;
    this.isVisibleLocation1=false;
    this.isVisiblepanelaccountName=true;
    this.isVisiblepanelcashName=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=true;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblepanelfromtolocation=false;
    this.isVisiblegstsaiDebtors=false;

  }
  else if (reportName=='tdsRegister'){
    this.reportName='TDS Register';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    
    this.isVisibleSparesdebtors=false;
    this.isVisibleLocation=false;
    this.isVisibleLocation1=false;
    this.isVisiblepanelaccountName=false;
    this.isVisiblepanelcashName=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=true;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblepanelfromtolocation=false;
    this.isVisiblegstsaiDebtors=false;
  }
  else if (reportName=='tcsReport'){
    this.reportName='TCS Reports';
    this.isVisibleGSTPurchaseRegister=false;
    this.isVisibleGSTSaleRegister=true;
    this.isVisibleSparesdebtors=false;
    this.isVisibleLocation=false;
    this.isVisibleLocation1=false;
    this.isVisiblepanelaccountName=false;
    this.isVisiblepanelcashName=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=false;
    this.isVisiblepanelfromtolocation=false;
  }
  else if (reportName=='manualInvoice'){
    this.reportName='Manual Invoice Report';
    this.isVisibleGSTPurchaseRegister=false;
    this.isVisibleGSTSaleRegister=true;
    this.isVisibleSparesdebtors=false;
    this.isVisibleLocation=false;
    this.isVisibleLocation1=false;
    this.isVisiblepanelaccountName=false;
    this.isVisiblepanelcashName=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=false;
    this.isVisiblepanelfromtolocation=false;
  }

  else if (reportName=='vendorLedgerReport'){
    this.reportName='Vendor Ledger Report';

    this.isVisibleGSTPurchaseRegister=false;
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleSparesdebtors=false;
    this.isVisibleLocation=false;
    this.isVisibleLocation1=false;
    this.isVisiblepanelaccountName=false;
    this.isVisiblepanelcashName=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=true;
    this.isVisiblegstsaiDebtors=false;
    this.isVisiblepanelfromtolocation=false;
  } else if (reportName=='jvRegister'){
    this.reportName='JV Register';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    this.isVisibleSparesdebtors=false;
    this.isVisibleLocation=false;
    this.isVisibleLocation1=false;
    this.isVisiblepanelaccountName=false;
    this.isVisiblepanelcashName=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=true;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=false;
    this.isVisiblepanelfromtolocation=false;
  }

  else if (reportName=='refundRegister'){
    this.reportName='Refund Register';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=true;
    this.isVisibleSparesdebtors=false;
    this.isVisibleLocation=false;
    this.isVisibleLocation1=false;
    this.isVisiblepanelaccountName=false;
    this.isVisiblepanelcashName=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblepanelfromtolocation=false;
    this.isVisiblegstsaiDebtors=false;
  }

  else if (reportName=='rtvRegister'){
    this.reportName='Return To Vendor Register';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=true;
    this.isVisibleSparesdebtors=false;
    this.isVisibleLocation=false;
    this.isVisibleLocation1=false;
    this.isVisiblepanelaccountName=false;
    this.isVisiblepanelcashName=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisiblepanelfromtolocation=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=false;
  }

  else if (reportName==='gltrialBalanceYtd'){
    this.reportName='GL Trial Balance-YTD';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=true;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblePeriodName=true;
    this.isVisiblePeriodYear=false;
    this.isVisiblepanelfromtolocation=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=false;
  }
  else if (reportName==='gltrialBalancePtd'){
    this.reportName='GL Trial Balance-PTD';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=true;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblePeriodName=false;
    this.isVisiblePeriodYear=true;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=false;
    this.isVisiblepanelfromtolocation=false;
  }

  else if (reportName==='empLedgerReport'){
    this.reportName='23. Employee Ledger Report';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    this.isVisiblegstsaiDebtors=false;
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=true;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblePeriodName=false;
    this.isVisiblePeriodYear=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblepanelfromtolocation=false;
  }
  else if (reportName==='gstsaiDebtors'){
    this.reportName='24. Spares Debtor Report';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblePeriodName=false;
    this.isVisiblePeriodYear=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=true;
    this.isVisiblepanelfromtolocation=false;
  }
  else if (reportName==='receiptOtherDetails'){
    this.reportName='25. Receipt-Other Details Report';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblePeriodName=false;
    this.isVisiblePeriodYear=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=false;
    this.isVisiblepanelfromtolocation=false;
    this.isVisibleGSTSaleRegister=true;
  }
  else if (reportName=='billHandedoverToActReport'){
    this.reportName='Account Bill Handover Report';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=true;
    this.isVisibleSparesdebtors=false;
    this.isVisibleLocation=false;
    this.isVisibleLocation1=false;
    this.isVisiblepanelaccountName=false;
    this.isVisiblepanelcashName=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
    this.isVisiblepanelAPGLUnpainAging=false;
    this.isVisiblepanelprePayment=false;
    this.ispanelTolocationOu=false;
    this.isVisiblepanelfromtolocation=false;
    this.isVisibleVendorLedgerReport=false;
    this.isVisiblecustomerLedger=false;
    this.isVisiblegstsaiDebtors=false;
  }

  }


  reportParameter(reportName){
    // alert(reportName)
    this.isDisabled1 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.reportForm.get('fromDate').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('toDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    var deptId=this.reportForm.get('deptId').value;
    var depName=this.reportForm.get('deptName').value;
    var locId = this.reportForm.get('locId').value;
    var userName = this.reportForm.get('userName').value;
    var subInventory='SP';
    if (locId===null){ locId='' }
    if (deptId===null){deptId=''}
    var fDate =this.reportForm.get('fromDate').value;
    var tDate =this.reportForm.get('toDate').value;

    if (reportName==='GST Purchase Register'){
    const fileName = 'GST Purchase Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.gstPurchaeReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId,deptId)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
    }
    else if (reportName==='Cheque Bounce Report'){
      const fileName = 'Cheque Bounce Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.chequebounceReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
    }
    else if (reportName==='Purchase Register Summary'){
      const fileName = 'Purchase Register Summary-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.purchaseRegisterSummary(fromDate, toDate, sessionStorage.getItem('ouId'), locId,deptId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
    }
    else if (reportName === 'Sai Debtors') {
      // alert('Hello');
      // var custAccNo = this.reportForm.get('custAccNo').value;
      var custAccNo=' ';
      var deptId = this.reportForm.get('deptId').value;
      if (custAccNo === undefined || custAccNo === null) {
        custAccNo = '';
      }
      // alert(deptId);
      const fileName = 'Sai Debtors-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        if (deptId===null || deptId == undefined || deptId ==''){
          // alert('Please Select Department ID.!');
          // this.dataDisplay = 'Please Select Department ID.....Do not refresh the Page';
          // this.isDisabled1 = false;
          // this.closeResetButton = true;
          // return;
          deptId='';
        }
        this.reportService.SPDebtorReport(toDate, sessionStorage.getItem('ouId'), locId, custAccNo, deptId,this.age1,this.age2,this.age3,this.age4)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
      }
    }
    else if (reportName==='Receipt Register Report'){
      const fileName = 'Receipt Register Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.spReceiptRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId,deptId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
    }

    else if (reportName==='GST Sales Register'){
      const fileName = 'GST Sales Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.gstSaleRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'),locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
    }

    else if (reportName==='Spares Debtors'){
      var custAccNo1 = this.reportForm.get('custAccNo').value;

      // if (custAccNo<=0 || custAccNo==undefined || custAccNo==null ) {
      //   this.closeResetButton=true;
      //   // this.dataDisplay = 'Please check Customer No.'
      //   return; }comment by vinita

      if (custAccNo1 <=0 || custAccNo1==undefined || custAccNo1==null ) {
        custAccNo='';
          }


      var d1= this.reportForm.get('toDate').value;   
      var tDate1 = this.pipe.transform(d1, 'dd-MMM-y');
      var locId= this.reportForm.get('locId').value;
      
      var spDbAg1= this.reportForm.get('age1').value;
      var spDbAg2= this.reportForm.get('age2').value;
      var spDbAg3= this.reportForm.get('age3').value;
      var spDbAg4= this.reportForm.get('age4').value;

      if(spDbAg1<0 || spDbAg1==null || spDbAg1==undefined) {this.rptValidation=false;}
      if(spDbAg2<0 || spDbAg2==null || spDbAg2==undefined) {this.rptValidation=false;}
      if(spDbAg3<0 || spDbAg3==null || spDbAg3==undefined) {this.rptValidation=false;}
      if(spDbAg4<0 || spDbAg4==null || spDbAg4==undefined) {this.rptValidation=false;}

      if (spDbAg1 > spDbAg2) {this.rptValidation=false;}
      else if (spDbAg1 >spDbAg3){this.rptValidation=false;}
      else if (spDbAg1 > spDbAg4){this.rptValidation=false;}
      else if (spDbAg2 > spDbAg3){this.rptValidation=false;}
      else if (spDbAg2 > spDbAg4){this.rptValidation=false;}
      else if (spDbAg3 > spDbAg4){this.rptValidation=false;}


    if(this.rptValidation ==false) {this.closeResetButton=true;this.dataDisplay = 'Please check Aging Values.';  return; }
 
      
      this.isDisabled1=true;


      const fileName = 'SP-Debtors-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
     
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.SPDebtorReport(tDate1, sessionStorage.getItem('ouId'), locId,custAccNo,deptId,spDbAg1,spDbAg2,spDbAg3,spDbAg4)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          });
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.SPDebtorReport(tDate1, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'),custAccNo,deptId,spDbAg1,spDbAg2,spDbAg3,spDbAg4)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }

    else if (reportName ==='Spares Inventory Aging'){
      var spInvAging1= this.reportForm.get('spInvAging1').value;
      var spInvAging2= this.reportForm.get('spInvAging2').value;
      var spInvAging3= this.reportForm.get('spInvAging3').value;
      if ( spInvAging1 > spInvAging2){
        alert('Please check Aging.!');
        this.dataDisplay = 'Please check Aging.';
        return;
      }
      else if (spInvAging1 >spInvAging3){
        alert('Please check Aging.!');
        this.dataDisplay = 'Please check Aging.';
        return;
      }
      else if (spInvAging2 > spInvAging3){
        alert('Please check Aging.!');
        this.dataDisplay = 'Please check Aging.';
        return;
      }
    const fileName = 'Spares Inventory Aging Report-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.sspInvAgingReport(spInvAging1,spInvAging2,spInvAging3,sessionStorage.getItem('ouId'),locId,subInventory,userName)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
        this.isDisabled1=false;
      })
    }
    else if (reportName ==='GL Trial Balance'){
     var ouName = sessionStorage.getItem('locCode');
     var ouCode= ouName.substring(0,4)
      // var periodName= this.reportForm.get('periodName').value;
      var glYearName= this.reportForm.get('glPeriodYear').value;
      const fileName = 'GL Trial Balance-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.gltrialBalanceReport(ouCode,glYearName)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
        this.isDisabled1=false;
      })      
    }

    else if (reportName ==='Cash Book Report'){
      // alert(reportName);
      var accountName=this.reportForm.get('accountName').value;
      var naturalAccct = this.reportForm.get('segment4').value;
      // alert(naturalAccct);
      // var locId = this.reportForm.get('locId').value;
      if (naturalAccct===null || naturalAccct==''){
       alert('Please Select Natural Account');
       this.dataDisplay = 'Please Select Natural Account....Do not refresh the Page';
       return;
      }
       const fileName = 'Cash Bank Reports-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
     const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    //  alert(fromDate+'---'+toDate+'---'+sessionStorage.getItem('ouId')+'----'+locId+'---'+accountName)
     this.reportService.cashBankReport(fromDate,toDate,sessionStorage.getItem('ouId'),locId,accountName,naturalAccct,userName)
       .subscribe(data => {
         saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
         this.closeResetButton = true;
         this.dataDisplay = ''
         this.isDisabled1=false;
       })      
     }
     else if (reportName ==='Bank Book Report'){
      // alert(reportName);
      var accountName=this.reportForm.get('accountName1').value;
      var naturalAccct = this.reportForm.get('segment4').value;
      // alert(naturalAccct);
      // var locId = this.reportForm.get('locId').value;
      if (naturalAccct===null || naturalAccct==''){
       alert('Please Select Natural Account');
       this.dataDisplay = 'Please Select Natural Account....Do not refresh the Page';
       return;
      }
       const fileName = 'Bank Book Report-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
     const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    //  alert(fromDate+'---'+toDate+'---'+sessionStorage.getItem('ouId')+'----'+locId+'---'+accountName)
     this.reportService.cashBankReport(fromDate,toDate,sessionStorage.getItem('ouId'),locId,accountName,naturalAccct,userName)
       .subscribe(data => {
         saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
         this.closeResetButton = true;
         this.dataDisplay = ''
         this.isDisabled1=false;
       })      
     }

     else if (reportName==='AP To GL Unpaid Aging Report'){
      var suppNo=this.reportForm.get('supNo').value;
      if (suppNo ===undefined || suppNo===null|| suppNo===''){
        alert('Please Select Supplier.!')
      }
      const fileName = 'AP To GL Unpaid Aging Report-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.aPGLUnpainAging(sessionStorage.getItem('ouId'),suppNo)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
        this.isDisabled1=false;
      })             
     }
     else if (reportName==='Prepayment Status Report'){
      const fileName = 'Prepayment Status Report-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.prePayment(sessionStorage.getItem('ouId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.closeResetButton = true;
          this.dataDisplay = ''
          this.isDisabled1=false;
        })      
     }
     else if (reportName ==='Bank Reconciliation Report'){
      // alert(reportName);
      var accountName=this.reportForm.get('accountName1').value;
      // var naturalAccct = this.reportForm.get('segment4').value;
      const fileName = 'download.pdf';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
     this.reportService.bankReconciliation(fromDate,toDate,sessionStorage.getItem('ouId'),accountName)
       .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled1 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
       })      
     }
     else if (reportName ==='TDS Register'){
      const fileName = 'TDS Register-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.tdsRegister(fromDate,toDate,sessionStorage.getItem('ouId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.closeResetButton = true;
          this.dataDisplay = ''
          this.isDisabled1=false;
        })     
     }
     else if (reportName=='TCS Reports'){
      var sourceName=this.reportForm.get('source').value;
      const fileName = 'TCS Register-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.tcsRegister(fromDate,toDate,sessionStorage.getItem('ouId'),locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.closeResetButton = true;
          this.dataDisplay = ''
          this.isDisabled1=false;
        })
     }

     else if (reportName=='Manual Invoice Report'){
      var sourceName=this.reportForm.get('source').value;
      const fileName = 'Manual Invoice Report-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.manualInvoice(fromDate,toDate,sessionStorage.getItem('ouId'),locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.closeResetButton = true;
          this.dataDisplay = ''
          this.isDisabled1=false;
        })
     }

     else if (reportName=='Vendor Ledger Report'){
      // var supId=this.reportForm.get('source').value;
      var suppNo=this.reportForm.get('supNo').value;
      var supSite =this.reportForm.get('supSiteName').value;
      const fileName = 'Vendor Ledger Report-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.vendorLedgerRpt(fromDate,toDate,sessionStorage.getItem('ouId'),locId,suppNo,supSite)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.closeResetButton = true;
          this.dataDisplay = ''
          this.isDisabled1=false;
        })
     }
     else if (reportName ==='JV Register'){
      const fileName = 'JV Register-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.jvRegister(fromDate,toDate,sessionStorage.getItem('ouId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.closeResetButton = true;
          this.dataDisplay = ''
          this.isDisabled1=false;
        })     
     }
     else if (reportName=='Refund Register'){
      var sourceName=this.reportForm.get('source').value;
      const fileName = 'Refund Register-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      // if(deptName==='NULL'){
      //   deptName='';
      // }
      this.reportService.refundRegister(fromDate,toDate,sessionStorage.getItem('ouId'),locId,depName)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.closeResetButton = true;
          this.dataDisplay = ''
          this.isDisabled1=false;
        })
     }

     else if (reportName=='Return To Vendor Register'){
      var sourceName=this.reportForm.get('source').value;
      const fileName = 'RTV Register-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      // if(deptName==='NULL'){
      //   deptName='';
      // }
      this.reportService.rtvRegister(fromDate,toDate,sessionStorage.getItem('ouId'),locId,deptId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.closeResetButton = true;
          this.dataDisplay = ''
          this.isDisabled1=false;
        })
     }

     else if (reportName ==='GL Trial Balance-YTD'){
      var ouName = sessionStorage.getItem('locCode');
      var ouCode= ouName.substring(0,4)
       // var periodName= this.reportForm.get('periodName').value;
       var glYearName= this.reportForm.get('glPeriodYear').value;
       var glPrdName= this.reportForm.get('periodName').value;
       const fileName = 'GL Trial Balance YTD-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
       const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
       this.reportService.gltrialBalanceReportYtd(ouCode,glPrdName)
       .subscribe(data => {
         saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
         this.closeResetButton = true;
         this.dataDisplay = ''
         this.isDisabled1=false;
       })      
     }

     else if (reportName ==='GL Trial Balance-PTD'){
      var ouName = sessionStorage.getItem('locCode');
      var ouCode= ouName.substring(0,4)
       // var periodName= this.reportForm.get('periodName').value;
       var glYearName= this.reportForm.get('glPeriodYear').value;
       var glPrdName= this.reportForm.get('periodName').value;
       const fileName = 'GL Trial Balance YTD-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
       const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
       this.reportService.gltrialBalanceReportPtd(ouCode,glYearName)
       .subscribe(data => {
         saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
         this.closeResetButton = true;
         this.dataDisplay = ''
         this.isDisabled1=false;
       })      
     }
     else if (reportName === 'Customer Ledger Report') {
      this.fromToDateValidation(fDate,tDate); 
      if(this.rptValidation==false){return;}
      var custAccNo1 = this.reportForm.get('custAccNo').value;

      // if (custAccNo<=0 || custAccNo==undefined || custAccNo==null ) {
      //   this.closeResetButton=true;
      //   // this.dataDisplay = 'Please check Customer No.'
      //   return; }comment by vinita

      if (custAccNo1 <=0 || custAccNo1==undefined || custAccNo1==null ) {
        custAccNo='';
          }

      const fileName = 'Customer Ledger Report-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {     
        this.reportService.customerLedger(fromDate,toDate,custAccNo1,sessionStorage.getItem('ouId'),deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          });
      }
      else if ((Number(sessionStorage.getItem('deptId'))!=4)){
        this.reportService.customerLedger(fromDate,toDate,custAccNo1,sessionStorage.getItem('ouId'),sessionStorage.getItem('deptId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        });
      }
    }
    else if (reportName ==='Employee Ledger Report'){
      const fileName = '23. Employee Ledger Report-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.empLedgerReport(fromDate,toDate,sessionStorage.getItem('ouId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.closeResetButton = true;
          this.dataDisplay = ''
          this.isDisabled1=false;
        })     
     }
     else if (reportName ==='Spares Debtor Report'){
     
      var custAccNo1 = this.reportForm.get('custAccNo').value;

      // if (custAccNo<=0 || custAccNo==undefined || custAccNo==null ) {
      //   this.closeResetButton=true;
      //   // this.dataDisplay = 'PleagstSparesSaiDebtorsse check Customer No.'
      //   return; }comment by vinita

      if (custAccNo1<=0 || custAccNo1==undefined || custAccNo1==null ) {
        custAccNo='';
          }
      var d1= this.reportForm.get('toDate').value;   
      var tDate1 = this.pipe.transform(d1, 'dd-MMM-y');
      var locId= this.reportForm.get('locId').value;
      var spDbAg1= this.reportForm.get('age1').value;
      var spDbAg2= this.reportForm.get('age2').value;
      var spDbAg3= this.reportForm.get('age3').value;
      var spDbAg4= this.reportForm.get('age3').value;

      if(spDbAg1<0 || spDbAg1==null || spDbAg1==undefined) {this.rptValidation=false;}
      if(spDbAg2<0 || spDbAg2==null || spDbAg2==undefined) {this.rptValidation=false;}
      if(spDbAg3<0 || spDbAg3==null || spDbAg3==undefined) {this.rptValidation=false;}
      if(spDbAg4<0 || spDbAg4==null || spDbAg4==undefined) {this.rptValidation=false;}

      if (spDbAg1 > spDbAg2) {this.rptValidation=false;}
      else if (spDbAg1 >spDbAg3){this.rptValidation=false;}
      else if (spDbAg1 > spDbAg4){this.rptValidation=false;}
      else if (spDbAg2 > spDbAg3){this.rptValidation=false;}
      else if (spDbAg2 > spDbAg4){this.rptValidation=false;}
      else if (spDbAg3 > spDbAg4){this.rptValidation=false;}


    if(this.rptValidation ==false) {this.closeResetButton=true;this.dataDisplay = 'Please check Aging Values.';  return; }
      this.isDisabled1=true;
      const fileName = 'SP-Debtors-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
     
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.SPDebtorReport(tDate1, sessionStorage.getItem('ouId'), locId,custAccNo,deptId,spDbAg1,spDbAg2,spDbAg3,spDbAg4)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          });
      }

     }
     else if (reportName ==='Receipt-Other Details Report'){
      alert(reportName)
      this.isDisabled1=true;
      const fileName = 'Receipt-Other Details Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
     
      this.reportService.receiptOtherDetails(fromDate,toDate,sessionStorage.getItem('ouId'),locId)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
     })
      }
      else if (reportName=='Account Bill Handover Report'){
        var sourceName=this.reportForm.get('source').value;
        const fileName = 'Account Bill Handover Report -' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
        const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
        // if(deptName==='NULL'){
        //   deptName='';
        // }
        this.reportService.actBillHandoverReport(fromDate,toDate,sessionStorage.getItem('ouId'),locId,deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.closeResetButton = true;
            this.dataDisplay = ''
            this.isDisabled1=false;
          })
       }

  }
  fromToDateValidation(fDate,tDate){
    this.rptValidation=true;
   
    if(fDate==null || fDate == undefined || fDate.trim() == ''){this.rptValidation=false;}
    if(tDate==null || tDate == undefined || tDate.trim() == ''){this.rptValidation=false;}

    if (fDate>tDate ) { this.rptValidation=false;}
    if(this.rptValidation==false) {alert ("Please Check From date / To Date..");
    this.closeResetButton=true;
    this.dataDisplay='';
    this.isDisabled1=false; }
  }
  public supplierCodeList: any[];
  lastkeydown1: number = 0;
  userList1: any[] = [];
  getUserIdsFirstWay($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList1 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.supplierCodeList, userId);
      }
    }
  }
  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };

  onSupplierCodeSelected(event){
    alert(event.target.value);
    var suppName=event.target.value;
    let selectedValue = this.supplierCodeList.find(v => v.name == suppName);
    console.log(selectedValue);
    this.reportForm.patchValue({supNo:selectedValue.suppNo})
    this.reportForm.patchValue({suppId:selectedValue.suppId})
    var suplrId=this.reportForm.get('suppId').value;
    this.service.suppSiteList(suplrId)
    .subscribe(
      data => {
        this.supSiteList = data;
        console.log(this.supSiteList);
      }
    );

  }

  userList3: any[] = [];
  lastkeydown3: number = 0;
  lookupValueDesc4: string;
  getNaturalAccount($event) {
    let userId = (<HTMLInputElement>document.getElementById('NaturalAccountFirstWay')).value;
    this.userList3 = [];
    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown3 > 200) {
        this.userList3 = this.searchFromArray2(this.NaturalAccountList, userId);
      }
    }
  }


  searchFromArray2(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      // alert(arr[i] + 'Array i');
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };


  onOptionsSelectedNatural(event) {
    if (event != undefined) {
      let selectnaturalaccount = this.NaturalAccountList.find(v => v.naturalaccount == event);
      console.log(selectnaturalaccount);
      this.lookupValueDesc4 = selectnaturalaccount.description;
      this.service.getInterBranchNewApi(event).subscribe(
        data => {
          this.InterBrancList = data.obj
        })
    }
  }
  cashNameSelection(event){
    // alert(event.target.value);
    var naturalCode = event.target.value;
    let naturalAccountName = this.accountNameList.find(v => v.name == naturalCode);
    console.log(naturalAccountName);
    this.reportForm.patchValue({segment4:naturalAccountName.id})
  }

  accountNameSelection(event){
    var naturalCode = event.target.value;
    let naturalAccountName = this.accountNameList1.find(v => v.name == naturalCode);
    console.log(naturalAccountName);
    this.reportForm.patchValue({segment4:naturalAccountName.id})
  }
  SPdebtorsReport() {
    // this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.reportForm.get('invcDt1').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    //const fileName = 'download.pdf';
    const fileName = 'SP-Debtors-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.SPDebtorReport(fromDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'), sessionStorage.getItem('deptId'),0,0,0,0)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        // this.isDisabled2 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }
  spPurRegDownLoad() {
    const fileName = 'Purchase-Register-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spPurRegDownLoadReport(sessionStorage.getItem('ouId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
  }
}
