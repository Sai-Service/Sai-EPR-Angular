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
  selector: 'app-spares-reports',
  templateUrl: './spares-reports.component.html',
  styleUrls: ['./spares-reports.component.css']
})
export class SparesReportsComponent implements OnInit {
  sparesReportForm: FormGroup;
  public minDate = new Date();
  fromDate: Date;
  toDate: Date;
  OUCode: string;
  locCode: string;
  locId: number;
  public BillShipToList: Array<string> = [];
  periodNameList: any = [];

  public DepartmentList: any = [];
  pipe = new DatePipe('en-US');
  now = new Date();
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  deptId: number;
  isVisibleGSTPurchaseRegister: boolean = false;
  isVisiblelocationInput: boolean = false;
  isVisiblelocationLOV: boolean = false;
  isVisiblespPurRegDownLoad: boolean = false;
  isDisabled1 = false;
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.sparesReportForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      OUCode: [''],
      locCode: [''],
      locId: [''],
      deptId: [],
    })
  }


  sparesReport(sparesReportForm) {
  }

  ngOnInit(): void {
    this.sparesReportForm.patchValue({ OUCode: sessionStorage.getItem('ouId') + '-' + sessionStorage.getItem('ouName') })
    this.sparesReportForm.patchValue({ locCode: sessionStorage.getItem('locId') + '-' + sessionStorage.getItem('locName') })
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

    this.service.FinancialPeriod()
      .subscribe(
        data => {
          this.periodNameList = data.obj;
        }
      );

    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.isVisiblelocationLOV = true;
      this.isVisiblelocationInput = false;
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
    if (reportName === 'gstPurRegister') {
      this.reportName = 'Purchase Register Details';
      if (this.reportName === 'Purchase Register Details') {
        this.isVisiblespPurRegDownLoad = true;
      }
      this.isVisibleGSTPurchaseRegister = true;
    }
    else if (reportName === 'gstpurRegSumm') {
      this.reportName = 'Spares Purchase Register - Summary';
      this.isVisibleGSTPurchaseRegister = true;
    }
  }



  onOptionsLocation(event) {
    // alert(event);
    this.sparesReportForm.patchValue({ locId: event })
  }


  onOptionsDepartmentList(event: string) {
    // alert(event);
    var deptList = this.DepartmentList.find(d => d.code === event);
    console.log(deptList);

    this.sparesReportForm.patchValue({ deptId: deptList.cmnTypeId })
  }


  reportParameter(reportName) {
    this.isDisabled1 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.sparesReportForm.get('fromDate').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var toDate1 = this.sparesReportForm.get('toDate').value;
    var toDate = this.pipe.transform(toDate1, 'dd-MMM-yyyy');
    var locId = this.sparesReportForm.get('locId').value;
    var deptId = this.sparesReportForm.get('deptId').value;
    alert(locId)
    if (locId === null) {
      alert('Please Select location Code.!');
      return;
    }
    // alert(fromDate+'----'+toDate+'---'+locId)
    if (fromDate === null) {
      alert('Please Select From Date.!');
      this.isDisabled1 = false;
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select From Date.!';
      return;
    }
    if (toDate === null) {
      alert('Please Select To Date.!');
      this.isDisabled1 = false;
      this.closeResetButton = false;
      this.progress = 0;
      this.dataDisplay = 'Please Select To Date.!';
      return;
    }
    if (reportName === 'Purchase Register Details') {
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        const fileName = 'Purchase Register Details-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
        const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
        this.reportService.sppurRegidetailReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId, sessionStorage.getItem('deptId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
      else if (Number(sessionStorage.getItem('deptId')) != 4) {
        const fileName = 'Purchase Register Details-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
        const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
        this.reportService.sppurRegidetailReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.dataDisplay = ''
            this.closeResetButton = true;
            this.isDisabled1 = false;
          })
      }
    }
    if (reportName === 'Spares Purchase Register - Summary') {
      const fileName = 'Spares Purchase Register - Summary-' + sessionStorage.getItem('locName').replace(' ', '') + '-' + fromDate + '-TO-' + toDate + '.xls';
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      if (Number(sessionStorage.getItem('deptId')) === 4) {
        this.reportService.sppurRegiSummReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId, sessionStorage.getItem('deptId'))
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.isDisabled1 = false;
          this.closeResetButton = true;
          this.dataDisplay = ''
        })
      }
      else if ((Number(sessionStorage.getItem('deptId'))) != 4) {
        this.reportService.sppurRegiSummReport(fromDate, toDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
          .subscribe(data => {
            saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
            this.isDisabled1 = false;
            this.closeResetButton = true;
            this.dataDisplay = ''
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
