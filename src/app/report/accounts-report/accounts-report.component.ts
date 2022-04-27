import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { ReportServiceService } from 'src/app/report/report-service.service'
import { DatePipe,Location } from '@angular/common';
import { MasterService } from 'src/app/master/master.service';
import { saveAs } from 'file-saver';


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
  public BillShipToList: Array<string> = [];
  periodNameList: any=[];
  
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
  isDisabled1 = false;
  accountName:string;
  isVisibleGSTSaleRegister: boolean = false;
  isVisibleGSTPurchaseRegister: boolean=false;
  isVisibleSparesdebtors:boolean=false;
  isVisiblespInvAgging:boolean=false;
  isVisiblepanelgltrialBalance:boolean=false;
  panelCashBank:boolean=false;
  accountNameList:any=[];

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.reportForm = this.fb.group({
      fromDate:[''],
      toDate:[''],
      OUCode:[''],
      locCode:[''],
      locId:[''],
      deptId:[],
      spInvAging1:[''],
      spInvAging2:[''],
      spInvAging3:[''],
      periodName:[''],
      accountName:[''],
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

this.service.accountNameList()
.subscribe(
  data => {
    this.accountNameList = data;
  }
);


this.service.DepartmentListNew()
.subscribe(
  data => {
    this.DepartmentList = data;
  }
);

this.service.FinancialPeriod()
.subscribe(
  data => {
    this.periodNameList = data.obj;
  }
);


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
  }
  else if (reportName==='sparesdebtors'){
    this.reportName='Spares Debtors';
    this.reportForm.get('fromDate').reset();
    this.reportForm.get('toDate').reset();
    this.reportForm.get('locCode').reset();
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleSparesdebtors=true;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
  }
  else if (reportName==='spInvAgging'){
    this.reportName='Spares Inventory Aging';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=true;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=false;
  }
  else if (reportName==='gltrialBalance'){
    this.reportName='GL Trial Balance';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=true;
    this.panelCashBank=false;
  }
  else if (reportName==='cashBank'){
    this.reportName='Cash Bank Reports';
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleGSTPurchaseRegister=false;
    this.isVisibleGSTSaleRegister=false;
    this.isVisibleSparesdebtors=false;
    this.isVisiblespInvAgging=false;
    this.isVisiblepanelgltrialBalance=false;
    this.panelCashBank=true;
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
    var locId = this.reportForm.get('locId').value;
    var deptId=this.reportForm.get('deptId').value;
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
    this.reportService.sspInvAgingReport(spInvAging1,spInvAging2,spInvAging3,sessionStorage.getItem('ouId'),locId)
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
      var periodName= this.reportForm.get('periodName').value;
      const fileName = 'GL Trial Balance-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.gltrialBalanceReport(ouCode,periodName)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.closeResetButton = true;
        this.dataDisplay = ''
        this.isDisabled1=false;
      })      
    }
    else if (reportName ==='Cash Bank Reports'){
      var accountName=this.reportForm.get('accountName').value;
       const fileName = 'Cash Bank Reports-' + sessionStorage.getItem('locName').trim() + '-' + '.xls';
     const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
     this.reportService.cashBankReport(fromDate,toDate,sessionStorage.getItem('ouId'),accountName)
       .subscribe(data => {
         saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
         this.closeResetButton = true;
         this.dataDisplay = ''
         this.isDisabled1=false;
       })      
     }
  }

}
