import { Component, OnInit } from '@angular/core';
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
  selector: 'app-service-report',
  templateUrl: './service-report.component.html',
  styleUrls: ['./service-report.component.css']
})
export class ServiceReportComponent implements OnInit {
  serviceReportForm:FormGroup;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  jobSumFromDt:Date;
  jobSumToDt:Date;
  public minDate = new Date();
  joblocCode:string;
  pipe = new DatePipe('en-US');
  now = new Date();
  servindFromDt:Date;
  servindToDt:Date;

  isDisabled1 = false;
  isDisabled2=false;

// new code statred /////
isVisiblepanelfromtolocation:boolean=false;
fromDate:Date;
toDate:Date;
locCode:string;
locId:number;
isVisiblelocationLOV:boolean=false;
isVisiblelocationInput:boolean=false;
public BillShipToList: Array<string> = [];
isVisiblefromtolocationdepartment:boolean=false;
isVisibleDepartmentList: boolean = false;
deptId:number;
department:string;
isVisiblegstsaiDebtors:boolean=false;
custAccNo:number;
isVisiblepaneltolocation:boolean=false;
isVisibleGSTPurchaseRegister:boolean=false;
isVisiblespPurRegDownLoad: boolean = false;
isVisiblecustomerLedger:boolean=false;
isVisibleGSTSaleRegister:boolean=false;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) { 
    this.serviceReportForm = this.fb.group({
      jobSumFromDt:[''],
      jobSumToDt:[''],
      joblocCode:[''],
      servindFromDt:[''],
      servindToDt:[''],
      serPendingVehicleFromDt:[],
      serPendingVehicleToDt:[],
      OUCode:[''],

      fromDate:[''],
      toDate:[''],
      locCode:[''],
      locId:[''],
      department:[''],
      deptId:[''],
      custAccNo:[''],
    })
  }

  serviceReport(serviceReportForm) {
  }

  ngOnInit(): void {
    this.serviceReportForm.patchValue({joblocCode:sessionStorage.getItem('locCode')});
    this.serviceReportForm.patchValue({ department: 'Service' });
    this.serviceReportForm.patchValue({ deptId: 2 });
    this.serviceReportForm.patchValue({ OUCode: sessionStorage.getItem('ouId') + '-' + sessionStorage.getItem('ouName') })
    // Prevent closing from click inside dropdown
    $(document).on('click', '.dropdown-menu', function (e) {
      e.stopPropagation();
    });

    // make it as accordion for smaller screens
    if ($(window).width() < 992) {
      $('.dropdown-menu a').click(function (e) {
        e.preventDefault();
        if ($(this).next('.submenu').length) {
          $(this).next('.submenu').toggle();
        }
        $('.dropdown').on('hide.bs.dropdown', function () {
          $(this).find('.submenu').hide();
        })
      });
    }

    this.serviceReportForm.patchValue({ OUCode: sessionStorage.getItem('ouId') + '-' + sessionStorage.getItem('ouName') })
    this.serviceReportForm.patchValue({ locCode: sessionStorage.getItem('locId') + '-' + sessionStorage.getItem('locName') })

    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.isVisiblelocationLOV = true;
      this.isVisiblelocationInput = false;
      // this.salesReportForm.patchValue({ subInventory: 'SP' })
    }
    else {
      this.isVisiblelocationLOV = false;
      this.isVisiblelocationInput = true;
    }


    this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
    .subscribe(
      data => {
        this.BillShipToList = data;
      }
    );
  }









  
  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }


  onOptionsLocation(event) {
    // alert(event);
    this.serviceReportForm.patchValue({ locId: event })
  }


  reportName: string;
  reportDetails(reportName) {
    if (reportName === 'jobcardsummary') {
      this.reportName='Job Card Summary';
      this.isVisiblepanelfromtolocation=true;
      this.isVisiblefromtolocationdepartment=false;
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblepaneltolocation=false;
      this.isVisiblecustomerLedger=false;
      this.isVisibleGSTSaleRegister=false;
     
    }
    else if (reportName ==='serviceInvNotDelivery'){
      this.reportName='Service Invoice Not Delivered';
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblefromtolocationdepartment=false;
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblepaneltolocation=true;
      this.isVisiblecustomerLedger=false;
      this.isVisibleGSTSaleRegister=false;
      
    }
    else if (reportName==='servicePendingVehicle'){
      this.reportName='Service Pending Vehicle Report';
      this.isVisiblepanelfromtolocation=true;
      this.isVisiblefromtolocationdepartment=false;
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblepaneltolocation=false;
      this.isVisiblecustomerLedger=false;
      this.isVisibleGSTSaleRegister=false;
    }
    else if (reportName==='serviceDeliverySummary'){
      this.reportName='Service Delivery Summary';
      this.isVisiblepanelfromtolocation=true;
      this.isVisiblefromtolocationdepartment=false;
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblepaneltolocation=false;
      this.isVisiblecustomerLedger=false;
      this.isVisibleGSTSaleRegister=false;
    }
    else if (reportName==='gstReceiptRegister'){
      this.reportName='Receipt Register';
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblefromtolocationdepartment=true;
      this.isVisiblepaneltolocation=false;
      this.isVisiblecustomerLedger=false;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
        this.isVisiblegstsaiDebtors=false;
      }
      this.isVisibleGSTSaleRegister=false;
    }
    else if (reportName === 'gstsaiDebtors') {
      this.reportName = 'Sai Debtors';
      if (Number(sessionStorage.getItem('deptId'))===4){
        this.isVisibleDepartmentList=true;
      }
      this.isVisiblegstsaiDebtors=true;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblefromtolocationdepartment=false;
      this.isVisiblepaneltolocation=false;
      this.isVisiblecustomerLedger=false;
      this.isVisibleGSTSaleRegister=false;
    }
    else if (reportName === 'customerLedger') {
      this.reportName = 'Customer Ledger Report';
      if (Number(sessionStorage.getItem('deptId'))===4){
        this.isVisibleDepartmentList=false;
      }
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblefromtolocationdepartment=false;
      this.isVisiblepaneltolocation=false;
      this.isVisiblecustomerLedger=true;
      this.isVisibleGSTSaleRegister=false;
    }
    else if (reportName==='gSTSaleRegister'){
      this.reportName='GST Sales Register';
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblefromtolocationdepartment=false;
      this.isVisiblepaneltolocation=false;
      this.isVisiblecustomerLedger=false;
      this.isVisibleGSTSaleRegister=true;
    }
    else if (reportName==='laborChargeSummary'){
      this.reportName='Labour Charge Summary Report';
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblepanelfromtolocation=true;
      this.isVisiblefromtolocationdepartment=false;
      this.isVisiblepaneltolocation=false;
      this.isVisiblecustomerLedger=false;
      this.isVisibleGSTSaleRegister=false;
    }
    else if (reportName==='technicianSummary'){
      this.reportName='Technician  Summary Report';
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblepanelfromtolocation=true;
      this.isVisiblefromtolocationdepartment=false;
      this.isVisiblepaneltolocation=false;
      this.isVisiblecustomerLedger=false;
      this.isVisibleGSTSaleRegister=false;
    }
    else if (reportName==='amcSaleRegister'){
      this.reportName='AMC Sales Register';
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblepanelfromtolocation=true;
      this.isVisiblefromtolocationdepartment=false;
      this.isVisiblepaneltolocation=false;
      this.isVisiblecustomerLedger=false;
      this.isVisibleGSTSaleRegister=false;
    }
    else if (reportName==='EWSaleRegister'){
      this.reportName='EW Sales Register';
      this.isVisiblegstsaiDebtors=false;
      this.isVisiblepanelfromtolocation=true;
      this.isVisiblefromtolocationdepartment=false;
      this.isVisiblepaneltolocation=false;
      this.isVisiblecustomerLedger=false;
      this.isVisibleGSTSaleRegister=false;
    }
  }


  reportParameter(reportName) {
    this.isDisabled1 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.serviceReportForm.get('fromDate').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var toDate1 = this.serviceReportForm.get('toDate').value;
    var toDate = this.pipe.transform(toDate1, 'dd-MMM-yyyy');
    var locId = this.serviceReportForm.get('locId').value;
    var deptId=this.serviceReportForm.get('deptId').value;
    if (locId === null) {
      alert('Please Select location Code.!');
      return;
    }
    if (reportName === 'Job Card Summary'){
      const fileName = 'Job-Card-Summary-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.jobSummaryReport(fromDate, toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      else   if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.jobSummaryReport(fromDate, toDate, sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
      }
    }
    else if (reportName ==='Service Invoice Not Delivered'){
      const fileName = 'Invoice-Not-Delivery-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
        const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.servindToDtReport(toDate, locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled2 = false;
        })
      }
      else  if (Number(sessionStorage.getItem('deptId')) != 4) {       
        this.reportService.servindToDtReport(toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled2 = false;
          })
      }
    }
    else if (reportName==='Service Pending Vehicle Report'){
      const fileName = 'Service Pending Vehicle Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId'))===4){
        this.reportService.serPendingVehicleReport(toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled2 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId'))!=4){
        this.reportService.serPendingVehicleReport(toDate, sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled2 = false;
        })
      }
    }
    else if (reportName === 'Receipt Register') {
      const fileName = 'Receipt Register-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.spReceiptRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId, deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.spReceiptRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Sai Debtors') {
      // alert(toDate)
      var custAccNo = this.serviceReportForm.get('custAccNo').value;
      if (custAccNo === undefined || custAccNo === null) {
        custAccNo = '';
      }
      const fileName = 'SP-Debtors-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.SPDebtorReport(toDate, sessionStorage.getItem('ouId'), locId,custAccNo,deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.SPDebtorReport(toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'),custAccNo,deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName==='Service Delivery Summary'){
      const fileName = 'Service Delivery Summary-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.seviceDeliverySummaryReport(fromDate, toDate,sessionStorage.getItem('ouId'), locId)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled2 = false;
      })
    }
    else if(Number(sessionStorage.getItem('deptId'))!=4){
      this.reportService.seviceDeliverySummaryReport(fromDate, toDate,sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled2 = false;
      })
    } 
    }
   else     if (reportName === 'Sales Register'){
    const fileName = 'Sales Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
 const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.vhslRegisterReport(fromDate, toDate, locId)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
    }
    else  if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.reportService.vhslRegisterReport(fromDate, toDate, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
    }
  }

  else if (reportName === 'Customer Ledger Report') {
    var custAccNo = this.serviceReportForm.get('custAccNo').value;
    if (custAccNo === undefined || custAccNo === '' || custAccNo === null) {
      alert('First Enter customer Account No.!');
      return;
    }
    const fileName = 'Customer Ledger Report.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 4) {     
      this.reportService.customerLedger(custAccNo,sessionStorage.getItem('ouId'),deptId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        });
    }
    else if ((Number(sessionStorage.getItem('deptId'))!=4)){
      this.reportService.customerLedger(custAccNo,sessionStorage.getItem('ouId'),sessionStorage.getItem('deptId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      });
    }
  }

  else if (reportName==='GST Sales Register'){
    const fileName = 'GST Sales Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId'))===4){
    this.reportService.gstSaleRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'),locId)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
    }
    if (Number(sessionStorage.getItem('deptId'))!=4){
      this.reportService.gstSaleRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'),sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
      }
  }
  else if (reportName==='Labour Charge Summary Report'){
    const fileName = 'Labour Charge Summary Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId'))===4){
    this.reportService.laborChargeSummary(fromDate, toDate, sessionStorage.getItem('ouId'),locId)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
    }
    if (Number(sessionStorage.getItem('deptId'))!=4){
      this.reportService.laborChargeSummary(fromDate, toDate, sessionStorage.getItem('ouId'),sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
      }
  }
  else if (reportName==='Technician  Summary Report'){
    const fileName = 'Technician  Summary Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId'))===4){
    this.reportService.technicianSummary(fromDate, toDate, sessionStorage.getItem('ouId'),locId)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
    }
    if (Number(sessionStorage.getItem('deptId'))!=4){
      this.reportService.technicianSummary(fromDate, toDate, sessionStorage.getItem('ouId'),sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
      }
  }
  else if (reportName==='AMC Sales Register'){
    const fileName = 'AMC Sales Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId'))===4){
    this.reportService.amcSaleRegister(fromDate, toDate, sessionStorage.getItem('ouId'),locId)
    .subscribe(data => {
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      this.dataDisplay = ''
      this.closeResetButton = true;
      this.isDisabled1 = false;
    })
    }
    if (Number(sessionStorage.getItem('deptId'))!=4){
      this.reportService.amcSaleRegister(fromDate, toDate, sessionStorage.getItem('ouId'),sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
    }
  }
  else if (reportName==='AMC Sales Register'){
    const fileName = 'AMC Sales Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId'))===4){
    this.reportService.EWSaleRegister(fromDate, toDate, sessionStorage.getItem('ouId'),locId)
    .subscribe(data => {
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      this.dataDisplay = ''
      this.closeResetButton = true;
      this.isDisabled1 = false;
    })
    }
    if (Number(sessionStorage.getItem('deptId'))!=4){
      this.reportService.EWSaleRegister(fromDate, toDate, sessionStorage.getItem('ouId'),sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
    }
  }
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
