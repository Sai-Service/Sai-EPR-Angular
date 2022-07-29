import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { ReportServiceService } from 'src/app/report/report-service.service'
import { DatePipe,Location } from '@angular/common';
import { MasterService } from 'src/app/master/master.service';
import { saveAs } from 'file-saver';
import { data } from 'jquery';
import { TransactionService } from 'src/app/transaction/transaction.service';

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
  fromDate:Date;
  toDate:Date;
  OUCode:string;
  locCode:string;
  locId:number;
  userName: string;
  public sourceList: Array<string> = [];
  public BillShipToList: Array<string> = [];
  periodNameList: any=[];
  glYearNameList: any=[];
  accountName1:string;
  public DepartmentList: any=[];
  pipe = new DatePipe('en-US');
  now = new Date();
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  deptId:number;
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
  panelCashBank:boolean=false;
  accountNameList:any=[];
  accountNameList1:any=[];
  isVisiblepanelAPGLUnpainAging:boolean=false;
  isVisiblepanelaccountName:boolean=false;
  supplierNo:string;
  supNo:number;
  isVisiblepanelprePayment:boolean=false;
  isVisiblepanelcashName:boolean=false;
  public NaturalAccountList: any = [];
  public InterBrancList: any = [];
  segment4:string;
  isVisibleLocation:boolean=false;
  isVisibleLocation1:boolean=false;
  ispanelTolocationOu:boolean=false;
  isVisibleVendorLedgerReport:boolean=false;
  source:string;
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService,private transactionService: TransactionService) {
    this.reportForm = this.fb.group({
      fromDate:[''],
      toDate:[''],
      OUCode:[''],
      locCode:[''],
      locId:[''],
      deptId:[],
      source:[],
      spInvAging1:[''],
      spInvAging2:[''],
      spInvAging3:[''],
      periodName:[''],
      glPeriodYear:[],
      accountName:[''],
      supplierNo:[''],
      supNo:[''],
      accountName1:[''],
      segment4:[''],
      userName: [''],
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

this.service.supplierCodeListNew()
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
    // alert(event);
    var deptList = this.DepartmentList.find(d => d.code === event);
    console.log(deptList);
    
    this.reportForm.patchValue({deptId:deptList.cmnTypeId})
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
    this.reportForm.get('fromDate').reset();
    this.reportForm.get('toDate').reset();
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
  }
  else if (reportName==='chequebounceReport'){
    this.reportName='Cheque Bounce Report';
    this.reportForm.get('fromDate').reset();
    this.reportForm.get('toDate').reset();
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
  }
  else if (reportName==='gstPurSummary'){
    this.reportName='Purchase Register Summary';
    this.reportForm.get('fromDate').reset();
    this.reportForm.get('toDate').reset();
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
  }
  else if (reportName==='receiptRegisterReport'){
    this.reportName='Receipt Register Report';
    this.reportForm.get('fromDate').reset();
    this.reportForm.get('toDate').reset();
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
  }
  else if (reportName==='gSTSaleRegister'){
    this.reportName='GST Sales Register';
    this.reportForm.get('fromDate').reset();
    this.reportForm.get('toDate').reset();
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
  }
  else if (reportName==='sparesdebtors'){
    this.reportName='Spares Debtors';
    this.reportForm.get('fromDate').reset();
    this.reportForm.get('toDate').reset();
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
    this.ispanelTolocationOu=false;
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
    this.ispanelTolocationOu=false;
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
    var locId = this.reportForm.get('locId').value;
    var userName = this.reportForm.get('userName').value;
    var subInventory='SP';
    if (locId===null){
      locId=''
    }
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
      const fileName = 'Spares Debtors-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.SPDebtorReport(toDate,sessionStorage.getItem('ouId'), locId,locId,locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
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
      const fileName = 'Vendor Ledger Report-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.vendorLedgerRpt(fromDate,toDate,sessionStorage.getItem('ouId'),locId,suppNo)
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
}
