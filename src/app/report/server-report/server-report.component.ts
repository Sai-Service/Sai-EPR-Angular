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
  selector: 'app-server-report',
  templateUrl: './server-report.component.html',
  styleUrls: ['./server-report.component.css']
})
export class ServerReportComponent implements OnInit {
  serverReportForm: FormGroup;

  dataDisplay: any;

  abc2 : any;
  abc:any;
  requestId:any;
  requestor:any;
  reportlist:Array<any>=[];
  isDisabled1 = false;
  closeResetButton = false;

 constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.serverReportForm = this.fb.group({
    })
  }

  get f() {return this.serverReportForm.controls;}
  serverReport(serverReportForm: any){}

  ngOnInit(): void {

    this.requestor=String(sessionStorage.getItem('ticketNo')); 
    var tkt ='M2152'
    this.reportService.getServerReportById(tkt)  
    .subscribe(data => {
        this.reportlist = data;
        console.log(this.requestor);
      }
    );
  }

}
