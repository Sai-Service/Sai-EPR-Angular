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
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) { 
    this.serviceReportForm = this.fb.group({
      jobSumFromDt:[''],
      jobSumToDt:[''],
      joblocCode:[''],
      servindFromDt:[''],
      servindToDt:[''],
    })
  }

  serviceReport(serviceReportForm) {
  }

  ngOnInit(): void {
    this.serviceReportForm.patchValue({joblocCode:sessionStorage.getItem('locCode')});
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

  
  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }
}
