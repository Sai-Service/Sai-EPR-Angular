import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportServiceService } from 'src/app/report/report-service.service'
import { DatePipe, Location, CommonModule } from '@angular/common';
import { MasterService } from 'src/app/master/master.service';
import { saveAs } from 'file-saver';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

@Component({
  selector: 'app-sales-reports',
  templateUrl: './sales-reports.component.html',
  styleUrls: ['./sales-reports.component.css']
})
export class SalesReportsComponent implements OnInit {
  salesReportForm: FormGroup;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  public minDate = new Date();
  pipe = new DatePipe('en-US');
  now = new Date();
  vhslRegisterFromDt: Date;
  vhslRegisterToDt: Date;
  locCode: string;
  salesINDFromDt: Date;
  salesINDToDt: Date;
  salesbkregFromDt: Date;
  salesbkregToDt: Date;
  salesAltnotInvToDt: Date;
  ouName: string;
  frGstSaleReg: Date;
  toGstSaleReg: Date;
  invcDt1: Date;
  location: string;

  isDisabled1 = false;
  isDisabled2 = false;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.salesReportForm = this.fb.group({
      vhslRegisterFromDt: [''],
      vhslRegisterToDt: [''],
      locCode: [''],
      salesINDFromDt: [''],
      salesINDToDt: [''],
      ouName: [''],
      salesbkregToDt: [''],
      salesbkregFromDt: [''],
      salesAltnotInvToDt: [''],
      frGstSaleReg: [''],
      toGstSaleReg: [''],
      invcDt1: [''],
      location: [''],
    })
  }

  salesReport(salesReportForm) {
  }

  ngOnInit(): void {
    this.salesReportForm.patchValue({ locCode: sessionStorage.getItem('locCode') });
    this.salesReportForm.patchValue({ ouName: sessionStorage.getItem('ouName') + '-' + sessionStorage.getItem('ouId') })
  }

  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }


  vhslRegister() {
    this.isDisabled1 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.salesReportForm.get('vhslRegisterFromDt').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.salesReportForm.get('vhslRegisterToDt').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'Vehicle Sales Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
    // alert(fromDate+'----'+ toDate+'-----'+ sessionStorage.getItem('locId'))
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.vhslRegisterReport(fromDate, toDate, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled1 = false;
      })
  }



  salesIND() {
    this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    // var purStDt = this.salesReportForm.get('salesINDFromDt').value;
    // var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.salesReportForm.get('salesINDToDt').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'Sales Invoiced Not Delivered-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + toDate + '.xls';

    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.salesINDReport(toDate, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled2 = false;
      })
  }



  salesbookingreg() {
    this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.salesReportForm.get('salesbkregFromDt').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.salesReportForm.get('salesbkregToDt').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'Sales Booking Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';

    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.salesbookingregReport(fromDate, toDate, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled2 = false;
      })
  }



  salesAltnotInv() {
    this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    // var purStDt = this.salesReportForm.get('salesbkregFromDt').value;
    // var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.salesReportForm.get('salesAltnotInvToDt').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'Sales Alloted Not Invoiced Report-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + toDate + '.xls';

    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.salesAltnotInvReport(toDate, sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled2 = false;
      })
  }



  vehicleClosingStock() {
    this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    // var purStDt = this.salesReportForm.get('salesbkregFromDt').value;
    // var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    // var spreceipttoDate2 = this.salesReportForm.get('salesAltnotInvToDt').value;
    // var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    const fileName = 'Vehicle Closing Stock-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + '.xls';

    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.vehicleClosingStockReport(sessionStorage.getItem('ouId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled2 = false;
      })
  }

  gstSaleRegister() {
    this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var fromDate1 = this.salesReportForm.get('frGstSaleReg').value;
    var fromDate = this.pipe.transform(fromDate1, 'dd-MMM-yyyy');
    var toDate1 = this.salesReportForm.get('toGstSaleReg').value;
    var toDate = this.pipe.transform(toDate1, 'dd-MMM-yyyy');
    const fileName = 'Vehicle Closing Stock-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + '.xls';

    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.gstSaleRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.dataDisplay = ''
        this.closeResetButton = true;
        this.isDisabled2 = false;
      })
  }


  SPdebtorsReport() {
    this.isDisabled2 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var invcDt2 = this.salesReportForm.get('invcDt1').value;
    var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
    //const fileName = 'download.pdf';
    const fileName = 'SP-Debtors-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.SPDebtorReport(fromDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
      .subscribe(data => {
        // var blob = new Blob([data], { type: 'application/pdf' });
        // var url = URL.createObjectURL(blob);
        // var printWindow = window.open(url, '', 'width=800,height=500');
        // printWindow.open
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled2 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }
}
