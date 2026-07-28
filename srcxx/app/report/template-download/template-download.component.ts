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
  selector: 'app-template-download',
  templateUrl: './template-download.component.html',
  styleUrls: ['./template-download.component.css']
})
export class TemplateDownloadComponent implements OnInit {
  templateForm: FormGroup;


  
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.templateForm = this.fb.group({

    })
  }

  TeplateDownLoad(templateForm) {
  }

  ngOnInit(): void {
  }
  templateDownLoad(name:any){
    this.reportService.templateDownload(name).subscribe(data => {
      saveAs(new Blob([data], { type: MIME_TYPES[".csv"] }), name+".csv");
    
    })
  }
}
