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


  // New Code Started//////////////
  public BillShipToList: Array<string> = [];
  public DepartmentList: any = [];
  isVisibleVehicleSaleRegister:boolean=false;
  isVisiblelocationLOV:boolean=false;
  isVisiblelocationInput:boolean=false;
  fromDate:Date;
  toDate:Date;
  locId:number;
  isVisibleSaleIND:boolean=false;
  isSaleClosingStock:boolean=false;
  OUCode:string;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.salesReportForm = this.fb.group({
      fromDate:[''],
      toDate:[''],
      locId:[''],
      OUCode:[''],


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
    this.salesReportForm.patchValue({ OUCode: sessionStorage.getItem('ouId') + '-' + sessionStorage.getItem('ouName') })
    this.salesReportForm.patchValue({ locCode: sessionStorage.getItem('locId') + '-' + sessionStorage.getItem('locName') })
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

    this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.BillShipToList = data;
        }
      );

    this.service.DepartmentListNew()
      .subscribe(
        data => {
          this.DepartmentList = data;
        }
      );



      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.isVisiblelocationLOV = true;
        this.isVisiblelocationInput = false;
        this.salesReportForm.patchValue({ subInventory: 'SP' })
      }
      else {
        this.isVisiblelocationLOV = false;
        this.isVisiblelocationInput = true;
      }
  }

  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }



  reportName: string;
  reportDetails(reportName) {
    if (reportName === 'gstVehicleSaleRegister') {
      this.reportName='Vehicle Sales Register'
      this.isVisibleVehicleSaleRegister=true;
      this.isVisibleSaleIND=false;
      this.isSaleClosingStock=false;
    }
  else  if (reportName === 'gstSaleIND') {
      this.reportName='Sales Invoiced Not Delivered'
      this.isVisibleVehicleSaleRegister=false;
      this.isVisibleSaleIND=true;
      this.isSaleClosingStock=false;
    }
    else if (reportName==='gstVehicleBookingReg'){
      this.reportName='Vehicle Booking Register'
      this.isVisibleVehicleSaleRegister=true;
      this.isVisibleSaleIND=false;
      this.isSaleClosingStock=false;
    }
    else if (reportName==='gstSaleAllotNotInv'){
      this.reportName='Sales Alloted Not Invoiced Report'
      this.isVisibleVehicleSaleRegister=false;
      this.isVisibleSaleIND=true;
      this.isSaleClosingStock=false;
    }
    else if (reportName==='gstSaleClosingStock'){
      this.reportName='Vehicle Closing Stock'
      this.isVisibleVehicleSaleRegister=false;
      this.isVisibleSaleIND=false;
      this.isSaleClosingStock=true;
    }
    else if (reportName==='gstSaleRegister'){
      this.reportName='GST Sales Register'
      this.isVisibleVehicleSaleRegister=true;
      this.isVisibleSaleIND=false;
      this.isSaleClosingStock=false;
    }
    else if (reportName==='gstSparesSaiDebtors'){
      this.reportName='Spares Sai Debtors'
      this.isVisibleVehicleSaleRegister=false;
      this.isVisibleSaleIND=true;
      this.isSaleClosingStock=false;
    }
  }



  reportParameter(reportName) {
    this.isDisabled1 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.salesReportForm.get('fromDate').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var toDate1 = this.salesReportForm.get('toDate').value;
    var toDate = this.pipe.transform(toDate1, 'dd-MMM-yyyy');
    var locId = this.salesReportForm.get('locId').value;
    if (locId === null) {
      alert('Please Select location Code.!');
      return;
    }
    if (reportName === 'Vehicle Sales Register'){
      const fileName = 'Vehicle Sales Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
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
   else if (reportName==='Sales Invoiced Not Delivered'){
      const fileName = 'Sales Invoiced Not Delivered-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.salesINDReport(toDate, locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
      }
      else  if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.salesINDReport(toDate, sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
      } 
    }
    else if (reportName==='Vehicle Booking Register'){
      const fileName = 'Sales Booking Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.salesbookingregReport(fromDate, toDate, locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.salesbookingregReport(fromDate, toDate, sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
      }
    }
    else if (reportName==='Sales Alloted Not Invoiced Report'){
      const fileName = 'Sales Alloted Not Invoiced Report-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.salesAltnotInvReport(toDate, locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
      }
      else   if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.salesAltnotInvReport(toDate, sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
      }
    }
    else if (reportName==='Vehicle Closing Stock'){
      const fileName = 'Vehicle Closing Stock-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.vehicleClosingStockReport(sessionStorage.getItem('ouId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.vehicleClosingStockReport(sessionStorage.getItem('ouId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
      }
    }
    else if (reportName==='GST Sales Register'){
      const fileName = 'GST Sales Register-' + sessionStorage.getItem('locName').trim() + '-' + '-TO-' + '.xls';
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
      else   if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.gstSaleRegisterReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
      } 
    }
    else if (reportName==='Spares Sai Debtors'){
      const fileName = 'Spares Sai Debtors-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.SPDebtorReport(fromDate, sessionStorage.getItem('ouId'), locId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
      }
      else  if (Number(sessionStorage.getItem('deptId')) != 4) {
        this.reportService.SPDebtorReport(fromDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled2 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
      }
    }
  }


  onOptionsLocation(event) {
    // alert(event);
    this.salesReportForm.patchValue({ locId: event })
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
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        this.isDisabled2 = false;
        this.closeResetButton = true;
        this.dataDisplay = ''
      })
  }
}
