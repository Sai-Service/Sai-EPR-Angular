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

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) { 
    this.serviceReportForm = this.fb.group({
      jobSumFromDt:[''],
      jobSumToDt:[''],
      joblocCode:[''],
      servindFromDt:[''],
      servindToDt:[''],
      serPendingVehicleFromDt:[],
      serPendingVehicleToDt:[],


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
    this.serviceReportForm.patchValue({ deptId: 2 })

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

  jobSummary(){
    this.isDisabled1 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.serviceReportForm.get('jobSumFromDt').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.serviceReportForm.get('jobSumToDt').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'Job-Card-Summary-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.jobSummaryReport(fromDate, toDate, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
  }


  servind(){
    this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.serviceReportForm.get('servindFromDt').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.serviceReportForm.get('servindToDt').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'Invoice-Not-Delivery-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.servindToDtReport(fromDate, toDate, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled2 = false;
      })
  }



  serPendingVehicle(){
    this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.serviceReportForm.get('serPendingVehicleFromDt').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.serviceReportForm.get('serPendingVehicleToDt').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'Service Pending Vehicle Report-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.serPendingVehicleReport(fromDate, toDate, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled2 = false;
      })
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
    }
    else if (reportName ==='serviceInvNotDelivery'){
      this.reportName='Service Invoice Not Delivered';
      this.isVisiblepanelfromtolocation=true;
      this.isVisiblefromtolocationdepartment=false;
      this.isVisiblegstsaiDebtors=false;
    }
    else if (reportName==='servicePendingVehicle'){
      this.reportName='Service Pending Vehicle Report';
      this.isVisiblepanelfromtolocation=true;
      this.isVisiblefromtolocationdepartment=false;
      this.isVisiblegstsaiDebtors=false;
    }
    else if (reportName==='serviceDeliverySummary'){
      this.reportName='Service Delivery Summary';
      this.isVisiblepanelfromtolocation=true;
      this.isVisiblefromtolocationdepartment=false;
      this.isVisiblegstsaiDebtors=false;
    }
    else if (reportName==='gstReceiptRegister'){
      this.reportName='Receipt Register';
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblefromtolocationdepartment=true;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
        this.isVisiblegstsaiDebtors=false;
      }
    }
    else if (reportName === 'gstsaiDebtors') {
      this.reportName = 'Sai Debtors';
      if (Number(sessionStorage.getItem('deptId'))===4){
        this.isVisibleDepartmentList=true;
      }
      this.isVisiblegstsaiDebtors=true;
      this.isVisiblepanelfromtolocation=false;
      this.isVisiblefromtolocationdepartment=false;
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
        this.reportService.servindToDtReport(fromDate, toDate, locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled2 = false;
        })
      }
      else  if (Number(sessionStorage.getItem('deptId')) != 4) {       
        this.reportService.servindToDtReport(fromDate, toDate, sessionStorage.getItem('locId'))
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
        this.reportService.serPendingVehicleReport(fromDate, toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled2 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId'))!=4){
        this.reportService.serPendingVehicleReport(fromDate, toDate, sessionStorage.getItem('locId'))
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
        this.reportService.SPDebtorReport(fromDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'),custAccNo,deptId)
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
  }

}
