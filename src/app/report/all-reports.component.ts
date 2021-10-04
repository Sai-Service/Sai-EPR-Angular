import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReportServiceService} from 'src/app/report/report-service.service'
import { DatePipe } from '@angular/common';
import { data, get } from 'jquery';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';


@Component({
  selector: 'app-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.css']
})
export class AllReportsComponent implements OnInit {
  reportForm: FormGroup;
  public minDate = new Date();
  // invcDt1:Date;
  location:number;
  decimal_value:number;

  pipe = new DatePipe('en-US');
  now = new Date();
  invcDt1 = this.pipe.transform(this.now, 'dd-MM-yyyy');

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.reportForm = this.fb.group({ 
      invcDt1:[],
      location:[],
    })
  }

  report(reportForm) {   
  }

  ngOnInit(): void {
   this.decimal_value=100.8999777789; 
   this.reportForm.patchValue({ location: sessionStorage.getItem('locId') });
  }
  SPdebtorsReport(){
    var invcDt2 = this.reportForm.get('invcDt1').value;
    var invcDt1 = this.pipe.transform(invcDt2, 'dd-MM-yyyy');
    alert(invcDt1)
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.SPDebtorReport(invcDt1,sessionStorage.getItem('locId'))
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }

  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }
}
