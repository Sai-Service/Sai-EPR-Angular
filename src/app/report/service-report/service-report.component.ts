
import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReportServiceService } from 'src/app/report/report-service.service'
import { DatePipe } from '@angular/common';
import { data, get } from 'jquery';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';
import { MasterService } from 'src/app/master/master.service';
import { saveAs } from 'file-saver';

interface iServiceReport{}

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
  public minDate = new Date();
  JobCardSummaryfromDate:Date;
  JobCardSummarytoDate:Date;
  JobCardSummaryToLocName:string;


  closeResetButton = true;
  dataDisplay: any;
  progress = 0;


  isDisabled1 = false;
  isDisabled2 = false;
  isDisabled3 = false;
  isDisabled4 = false;
  isDisabled5 = false;
  isDisabled6 = false;

  pipe = new DatePipe('en-US');
  now = new Date();

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.serviceReportForm = this.fb.group({
      JobCardSummaryfromDate:[],
      JobCardSummarytoDate:[],
      JobCardSummaryToLocName:[],
    });

  }
 

  ngOnInit(): void {
      $('.link').click(function () {
        var id = $(this).attr("rel");
  
        $('#' + id).slideToggle('slow');
      });

      this.serviceReportForm.patchValue({JobCardSummaryToLocName:sessionStorage.getItem('locCode')})
  }


  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }

  report(servicereportForm) {
  }

  JobCardSummary(){
    this.isDisabled1 = true;
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Report Is Running....Do not refresh the Page';
  var invcDt2 = this.serviceReportForm.get('JobCardSummaryfromDate').value;
  var fromDate = this.pipe.transform(invcDt2, 'dd-MMM-yyyy');
  var invcDt3 = this.serviceReportForm.get('JobCardSummarytoDate').value;
  var invcDt4 = this.pipe.transform(invcDt3, 'dd-MMM-yyyy');  
  const fileName = 'Job-Card-Summary-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '.xls';
  const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
  this.reportService.JobCardSummaryReport(fromDate,invcDt4,sessionStorage.getItem('locId'))
    .subscribe(data => {
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      this.isDisabled1 = false;
      this.closeResetButton = true;
      this.dataDisplay = ''
    })
  }

}
