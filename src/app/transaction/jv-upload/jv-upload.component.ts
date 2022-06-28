import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe, Location, } from "@angular/common";
import * as xlsx from 'xlsx';

interface IjvUpload{
  jeSource:string;
  period:string;
  glDate:string;
  orgId:number;
  
}
@Component({
  selector: 'app-jv-upload',
  templateUrl: './jv-upload.component.html',
  styleUrls: ['./jv-upload.component.css']
})
export class JvUploadComponent implements OnInit {

  JvUploadForm: FormGroup;
  period:string;
  glDate:string;
  OUName:string;
  orgId:number;
  jeSource:string;

  files:string;
  public JournalType:any=[];
  public PeriodName:any;

  displaydata:boolean=true;

  itemUploadedList:any;
  @ViewChild('fileInput') fileInput;
  dataDisplay: any;
  pipe = new DatePipe('en-US');

   constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.JvUploadForm = this.fb.group({
      files:[],
      OUName:[],
      orgId:[],
      glDate:[],
      period:[],
      jeSource:[],
    })
  }

  JvUpload(JvUploadForm){}

  ngOnInit(): void {
    this.OUName=(sessionStorage.getItem('ouName'));
    this.orgId=Number((sessionStorage.getItem('ouId')));
    this.service.JournalType().subscribe(
      data=>{this.JournalType=data;
      }
    );

    this.service.FinancialPeriod()
    .subscribe(
      data => {this.PeriodName = data.obj;
        console.log(this.PeriodName);
      }
      );
  }

  uploadFile(event:any) {
    var file =this.JvUploadForm.get('files').value;
    if (file===undefined){
      alert('First Select CSV & Then Click upload Button !..');
      return;
    }
    event.target.disabled = true;
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0]);
    var orgId=this.JvUploadForm.get('orgId').value;
    var jeSrc=this.JvUploadForm.get('jeSource').value;
    var periodName=this.JvUploadForm.get('period').value;
    var glDate=this.pipe.transform(this.JvUploadForm.get('glDate').value,'dd-MM-yyyy');
    // if ((sessionStorage.getItem('deptName'))=== 'Sales') {
      this.service.bulkjvuploadCsv(formData,orgId,jeSrc,periodName,glDate).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.itemUploadedList=res.obj;  
          this.dataDisplay ='File Uploaded Sucessfully....'
          this.displaydata=false;
          // this.closeResetButton=true;
         this.JvUploadForm.get('files').reset();
        }
        else{
          if (res.code===400){    
            alert(res.message);
            this.itemUploadedList = res.obj;
            this.dataDisplay ='File Uploading Failed....'
            // this.closeResetButton=true;
            this.JvUploadForm.get('files').reset();
            // this.itemButton1=false;
          }
        }
      })

      setTimeout(() => {
        event.target.disabled = false;
       }, 60000);
  }

  onOptionGlPeriod(event){

    var selPer=this.PeriodName.find(d=>d.periodName===event);
    if(selPer!=undefined){
   (document.getElementById('postedDate') as HTMLInputElement).setAttribute('min',selPer.startDate);
   (document.getElementById('postedDate') as HTMLInputElement).setAttribute('max',selPer.endDate);
 }
}

refresh() {
  window.location.reload();
}

close() {
  this.location1.back();
}

}
