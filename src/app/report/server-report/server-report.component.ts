import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { ReportServiceService } from '../report-service.service'
import { DatePipe,Location } from '@angular/common';
import { MasterService } from '../../master/master.service';
import { saveAs } from 'file-saver';
import { data } from 'jquery';
import { TransactionService } from '../../transaction/transaction.service';

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

    // this.requestor=String(sessionStorage.getItem('ticketNo'));
    var tkt =sessionStorage.getItem('ticketNo');
    this.reportService.getServerReportById(tkt)  
    .subscribe(data => {
        this.reportlist = data;
        console.log(this.requestor);
      }
    );
  }

  DownloadRptFile(requestId,reqName,requestDate,fileNam) {
     // const fileName = reqName + "-RequestId-"+String(requestId) +"-"+ requestDate + '.xls';
      const fileName=fileNam.substr(11,);
      const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
      this.reportService.fndRquestDownload(requestId)
        .subscribe(data => {
          saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
          this.dataDisplay = ''
          this.closeResetButton = true;
          this.isDisabled1 = false;
        })
      }


    }

 

  


