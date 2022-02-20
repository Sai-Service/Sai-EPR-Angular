import { Component, OnInit} from '@angular/core';
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
  selector: 'app-accounts-report',
  templateUrl: './accounts-report.component.html',
  styleUrls: ['./accounts-report.component.css']
})
export class AccountsReportComponent implements OnInit {
  reportForm: FormGroup;
  public minDate = new Date();
  fromDate:Date;
  toDate:Date;
  OUCode:string;
  locCode:string;
  locId:number;
  public BillShipToList: Array<string> = [];

  pipe = new DatePipe('en-US');
  now = new Date();

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private location1: Location, private router1: ActivatedRoute, private reportService: ReportServiceService) {
    this.reportForm = this.fb.group({
      fromDate:[''],
      toDate:[''],
      OUCode:[''],
      locCode:[''],
      locId:[''],
    })
   }
   
  ngOnInit(): void {
    this.reportForm.patchValue({OUCode:sessionStorage.getItem('ouId')+'-'+sessionStorage.getItem('ouName')})
    this.reportForm.patchValue({locCode:sessionStorage.getItem('locId')+'-'+sessionStorage.getItem('locName')})
   // Prevent closing from click inside dropdown
$(document).on('click', '.dropdown-menu', function (e) {
  e.stopPropagation();
});

// make it as accordion for smaller screens
if ($(window).width() < 992) {
  $('.dropdown-menu a').click(function(e){
    e.preventDefault();
      if($(this).next('.submenu').length){
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

}

  report(reportForm) {
  }

  onOptionsLocation(event){
    // alert(event);
    this.reportForm.patchValue({locId:event})
  }

  gstPurRegister(){
    // this.isDisabled1 = true;
    // this.closeResetButton = false;
    // this.progress = 0;
    // this.dataDisplay = 'Report Is Running....Do not refresh the Page';
    var purStDt = this.reportForm.get('fromDate').value;
    var fromDate = this.pipe.transform(purStDt, 'dd-MMM-yyyy');
    var spreceipttoDate2 = this.reportForm.get('toDate').value;
    var toDate = this.pipe.transform(spreceipttoDate2, 'dd-MMM-yyyy');
    var locId = this.reportForm.get('locId').value;
    alert(locId);
    if (locId === ''){
      alert('hiiii  ')
      locId === null;
    }
    alert(locId);
    const fileName = 'GST Purchase Register-' + sessionStorage.getItem('locName').trim() + '-' + fromDate + '-TO-' + toDate + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.reportService.gstPurchaeReport(fromDate, toDate, sessionStorage.getItem('ouId'), locId,sessionStorage.getItem('deptId'))
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
        // this.dataDisplay = ''
        // this.closeResetButton = true;
        // this.isDisabled1 = false;
      })
  }

}
