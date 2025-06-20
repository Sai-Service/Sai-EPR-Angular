import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportServiceService } from 'src/app/report/report-service.service'
import { DatePipe, Location } from '@angular/common';
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
  serviceReportForm: FormGroup;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  jobSumFromDt: Date;

  jobSumToDt: Date;
  public minDate = new Date();
  joblocCode: string;
  pipe = new DatePipe('en-US');
  fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  toDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  now = new Date();
  servindFromDt: Date;
  servindToDt: Date;

  isDisabled1 = false;
  isDisabled2 = false;

  // new code statred /////
  isVisiblepanelfromtolocation: boolean = false;
  // fromDate:Date;
  // toDate:Date;
  locCode: string;
  locId: number;
  isVisiblelocationLOV: boolean = false;
  isVisiblelocationInput: boolean = false;
  public BillShipToList: Array<string> = [];
  isVisiblefromtolocationdepartment: boolean = false;
  isVisibleDepartmentList: boolean = false;
  deptId: number;
  department: string;
  isVisiblegstsaiDebtors: boolean = false;
  custAccNo: number;
  isVisiblepaneltolocation: boolean = false;
  isVisibleGSTPurchaseRegister: boolean = false;
  isVisiblespPurRegDownLoad: boolean = false;
  isVisiblecustomerLedger: boolean = false;
  isVisibleGSTSaleRegister: boolean = false;
  panelamcHistrory: boolean = false;
  isVisiblepanelserviceagingReport: boolean = false;
  regNo: string;
  isVisiblepanelfromtoOuId: boolean = false;
  age1: number = 20;
  age2: number = 30;
  age3: number = 45;
  age4: number = 60;
  rptValidation = true;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.serviceReportForm = this.fb.group({
      jobSumFromDt: [''],
      age1: [],
      age2: [],
      age3: [],
      age4: [],
      jobSumToDt: [''],
      joblocCode: [''],
      servindFromDt: [''],
      servindToDt: [''],
      serPendingVehicleFromDt: [],
      serPendingVehicleToDt: [],
      OUCode: [''],
      regNo: [''],
      fromDate: [''],
      toDate: [''],
      locCode: [''],
      locId: [''],
      department: [''],
      deptId: [''],
      custAccNo: [''],
    })
  }

  serviceReport(serviceReportForm) {
  }

  ngOnInit(): void {
    this.serviceReportForm.patchValue({ joblocCode: sessionStorage.getItem('locCode') });
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
      this.reportName = 'Job Card Summary';
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName === 'serviceInvNotDelivery') {
      this.reportName = 'Service Invoice Not Delivered';
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepaneltolocation = true;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName === 'servicePendingVehicle') {
      this.reportName = 'Service Pending Vehicle Report';
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepaneltolocation = true;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName === 'serviceDeliverySummary') {
      this.reportName = 'Service Delivery Summary';
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName === 'gstReceiptRegister') {
      this.reportName = 'Receipt Register';
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblefromtolocationdepartment = true;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
        this.isVisiblegstsaiDebtors = false;
      }
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName === 'gstsaiDebtors') {
      this.reportName = 'Sai Debtors';
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
      this.isVisiblegstsaiDebtors = true;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName === 'customerLedger') {
      this.reportName = 'Customer Ledger Report';
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = false;
      }
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = true;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName === 'gSTSaleRegister') {
      this.reportName = 'GST Sales Register';
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = true;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName === 'laborChargeSummary') {
      this.reportName = 'Labour Charge Summary Report';
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName === 'technicianSummary') {
      this.reportName = 'Technician  Summary Report';
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName === 'amcSaleRegister') {
      this.reportName = 'AMC Sales Register';
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName === 'EWSaleRegister') {
      this.reportName = 'EW Sales Register';
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName === 'creditNoteReg') {
      this.reportName = 'Credit Note Register';
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName === 'jobIssueDetails') {
      this.reportName = 'Job Issue Details Report';
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName === 'IrnGenerationReport') {
      this.reportName = 'IRN Generation Report';
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblefromtolocationdepartment = true;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisibleDepartmentList = true;
      }
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName == 'invoiceSummary') {
      this.reportName = 'Invoice Summary Report';
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName == 'amcHistrory') {
      this.reportName = 'AMC History Report';
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = true;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName == 'amcUtilisation') {
      this.reportName = 'AMC Utilisation Report';
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = true;
      this.isVisiblepanelserviceagingReport = false;
    }

    else if (reportName == 'amcControlReport') {
      this.reportName = 'Amc Control Report';
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = true;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName == 'fscCouponData') {
      this.reportName = 'FSC Coupon Data Report';
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName == 'receiptOtherDetails') {
      this.reportName = '21. Receipt-Other Details Report';
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = true;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = false;
    }
    else if (reportName == 'gstsaiDebtorsAsOf') {
      this.reportName = '22. Service Debtor Report As Of';
      this.isVisiblegstsaiDebtors = false;
      this.isVisiblepanelfromtolocation = false;
      this.isVisiblefromtolocationdepartment = false;
      this.isVisiblepaneltolocation = false;
      this.isVisiblecustomerLedger = false;
      this.isVisibleGSTSaleRegister = false;
      this.panelamcHistrory = false;
      this.isVisiblepanelfromtoOuId = false;
      this.isVisiblepanelserviceagingReport = true;
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
    var deptId = this.serviceReportForm.get('deptId').value;
    var fDate = this.serviceReportForm.get('fromDate').value;
    var tDate = this.serviceReportForm.get('toDate').value;
    if (locId === null) {
      alert('Please Select location Code.!');
      return;
    }
    if (reportName === 'Job Card Summary') {
      const fileName = 'Job-Card-Summary-' +  fromDate + '-TO-' + toDate + '.xls';
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
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.jobSummaryReport(fromDate, toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'Service Invoice Not Delivered') {
      const fileName = 'Invoice-Not-Delivery-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (locId === null || locId === undefined){
        alert('Please Select Location ID.!');
        return;
      }
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.servindToDtReport(toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled2 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.servindToDtReport(toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled2 = false;
          })
      }
    }
    else if (reportName === 'Service Pending Vehicle Report') {
      const fileName = 'Service Pending Vehicle Report-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.serPendingVehicleReport(toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled2 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
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
      const fileName = 'SP-Debtors-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.SPDebtorReport(toDate, sessionStorage.getItem('ouId'), locId, custAccNo, deptId, 0, 0, 0, 0)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.SPDebtorReport(toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), custAccNo, deptId, 0, 0, 0, 0)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Service Delivery Summary') {
      const fileName = 'Service Delivery Summary-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.seviceDeliverySummaryReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled2 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.seviceDeliverySummaryReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled2 = false;
          })
      }
    }
    else if (reportName === 'Sales Register') {
      const fileName = 'Sales Register-' +  fromDate + '-TO-' + toDate + '.xls';
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
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
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
        this.isDisabled1 = false;
        return;
      }
      const fileName = 'Customer Ledger Report-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.customerLedger(fromDate, toDate, custAccNo, sessionStorage.getItem('ouId'), deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          });
      }
      else if ((Number(sessionStorage.getItem('deptId')) != 4)) {
        this.reportService.customerLedger(fromDate, toDate, custAccNo, sessionStorage.getItem('ouId'), sessionStorage.getItem('deptId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          });
      }
    }

    else if (reportName === 'GST Sales Register') {
      const fileName = 'GST Sales Register-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.gstSaleRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.gstSaleRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'Labour Charge Summary Report') {
      const fileName = 'Labour Charge Summary Report-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.laborChargeSummary(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.laborChargeSummary(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'Technician  Summary Report') {
      const fileName = 'Technician  Summary Report-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.technicianSummary(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.technicianSummary(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'AMC Sales Register') {
      const fileName = 'AMC Sales Register-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.amcSaleRegister(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.amcSaleRegister(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'EW Sales Register') {
      const fileName = 'EW Sales Register-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.EWSaleRegister(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.EWSaleRegister(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'Credit Note Register') {
      const fileName = 'Credit Note Register-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.creditNoteReg(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.creditNoteReg(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === 'Job Issue Details Report') {
      const fileName = 'Job Issue Details Report-' +  fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.jobIssueDetails(fromDate, toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.jobIssueDetails(fromDate, toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === 'IRN Generation Report') {
      const fileName = 'IRN Generation Report-' +  '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        var deptId = this.serviceReportForm.get('deptId').value;
        this.reportService.irnGenerationReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId, deptId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.irnGenerationReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName == 'Invoice Summary Report') {
      const fileName = 'Invoice Summary Report-' +  '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.invoiceSummaryReport(fromDate, toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.invoiceSummaryReport(fromDate, toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName == 'AMC History Report') {
      var regNo = this.serviceReportForm.get('regNo').value;
      if (regNo == undefined || regNo == null) {
        alert('Please Select Vehicle number.!');
        return;
      }
      const fileName = 'download.pdf';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.amcHistory(regNo, sessionStorage.getItem('ouId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (reportName == 'AMC Utilisation Report') {
      const fileName = 'AMC Utilisation Report-' +  '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      // if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.reportService.amcUtilisation(fromDate, toDate, sessionStorage.getItem('ouId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
      // }
    }
    else if (reportName == 'Amc Control Report') {
      const fileName = 'Amc Control Report-' +  '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.amcControlReport(fromDate, toDate, sessionStorage.getItem('ouId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
    }
    else if (reportName == 'FSC Coupon Data Report') {
      const fileName = 'FSC Coupon Data Report-' +  '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) == 4) {
        this.reportService.fscCouponData(fromDate, toDate, locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.fscCouponData(fromDate, toDate, sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          })
      }
    }
    else if (reportName === '21. Receipt-Other Details Report') {
      const fileName = 'Receipt-Other Details Report-' +  '-TO-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.receiptOtherDetails(fromDate, toDate, sessionStorage.getItem('ouId'), locId)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.receiptOtherDetails(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    else if (reportName === '22. Service Debtor Report As Of') {
      // alert('Sale Debtor Report As Of')
      // var tDate =this.salesReportForm.get('toDate').value;
      this.isDisabled1 = false;
      // alert('Hello');
      this.toDateValidation(tDate); if (this.rptValidation == false) { return; }
      var custAccNo = this.serviceReportForm.get('custAccNo').value;

      // if (custAccNo<=0 || custAccNo==undefined || custAccNo==null ) {
      //   this.closeResetButton=true;
      //   // this.dataDisplay = 'Please check Customer No.'
      //   return; }comment by vinita

      if (custAccNo <= 0 || custAccNo == undefined || custAccNo == null) {
        custAccNo = '';
      }


      var d1 = this.serviceReportForm.get('toDate').value;
      var tDate1 = this.pipe.transform(d1, 'dd-MMM-y');
      var locId = this.serviceReportForm.get('locId').value;

      var spDbAg1 = this.serviceReportForm.get('age1').value;
      var spDbAg2 = this.serviceReportForm.get('age2').value;
      var spDbAg3 = this.serviceReportForm.get('age3').value;
      var spDbAg4 = this.serviceReportForm.get('age4').value;

      if (spDbAg1 < 0 || spDbAg1 == null || spDbAg1 == undefined) { this.rptValidation = false; }
      if (spDbAg2 < 0 || spDbAg2 == null || spDbAg2 == undefined) { this.rptValidation = false; }
      if (spDbAg3 < 0 || spDbAg3 == null || spDbAg3 == undefined) { this.rptValidation = false; }
      if (spDbAg4 < 0 || spDbAg4 == null || spDbAg4 == undefined) { this.rptValidation = false; }

      if (spDbAg1 > spDbAg2) { this.rptValidation = false; }
      else if (spDbAg1 > spDbAg3) { this.rptValidation = false; }
      else if (spDbAg1 > spDbAg4) { this.rptValidation = false; }
      else if (spDbAg2 > spDbAg3) { this.rptValidation = false; }
      else if (spDbAg2 > spDbAg4) { this.rptValidation = false; }
      else if (spDbAg3 > spDbAg4) { this.rptValidation = false; }


      if (this.rptValidation == false) { this.closeResetButton = true; this.dataDisplay = 'Please check Aging Values.'; return; }
      this.isDisabled1 = true;
      const fileName = 'Service-Debtors-' +  fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);

      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.gstsaiDebtorsAsOf1(tDate1, sessionStorage.getItem('ouId'), locId, custAccNo, deptId, spDbAg1, spDbAg2, spDbAg3, spDbAg4)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          });
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.gstsaiDebtorsAsOf1(tDate1, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), custAccNo, deptId, spDbAg1, spDbAg2, spDbAg3, spDbAg4)
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
          });
      }
    }
  }


  spPurRegDownLoad() {
    const fileName = 'Purchase-Register-' +  '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.spPurRegDownLoadReport(sessionStorage.getItem('ouId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
  }


  toDateValidation(tDate) {
    this.rptValidation = true;

    if (tDate == null || tDate == undefined || tDate.trim() == '') { this.rptValidation = false; }

    if (this.rptValidation == false) {
      alert("Please Check Date..");
      this.closeResetButton = true;
      this.dataDisplay = '';
      this.isDisabled1 = false;
    }
  }

}
