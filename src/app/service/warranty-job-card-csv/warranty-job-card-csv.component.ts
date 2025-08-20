import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import { DatePipe } from '@angular/common';

import * as xlsx from 'xlsx';

@Component({
  selector: 'app-warranty-job-card-csv',
  templateUrl: './warranty-job-card-csv.component.html',
  styleUrls: ['./warranty-job-card-csv.component.css']
})
export class WarrantyJobCardCSVComponent implements OnInit {
  bulkUploadCSVForm: FormGroup;
  closeResetButton =true;
  dataDisplay: any;
  progress = 0;
  itemButton1=true;
  files:string;
  userName:string;
  itemList: any = [];
  itemUploadedList:any=[];
  pipe = new DatePipe('en-US');
  now = Date.now();
  MonthList:any;
  currDate   = this.pipe.transform(Date.now(), 'y-MM-dd');
  monthNam : string;
  mnthYear:number;
    @ViewChild('fileInput') fileInput;
  message: string;
  allUsers: Observable<WarrantyJobCardCSVComponent[]>;
    fileupld :string;
    fileupdt:string;

    showFileUpldWind=true;
    showFileUpdtWind=false;  
    caption1="File Upload";

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.bulkUploadCSVForm = this.fb.group({
      location:[],
      userName:[],
      files:[],
      monthNam:[],
      mnthYear:[],
      fileupld :[],
      fileupdt:[],
      caption1:[],
    })
   }

  ngOnInit(): void {
     this.bulkUploadCSVForm.patchValue({ userName: sessionStorage.getItem('ticketNo') });

     this.service.MonthNameList()
    .subscribe(
      data => {this.MonthList = data;
        console.log(this.MonthList);
      }
      );

      const d = new Date();
      let myear = d.getFullYear();
      this.mnthYear = myear;
  }

    bulkUploadCSV(bulkUploadCSVForm) { }


    uploadFile(event:any) {
    var file =this.bulkUploadCSVForm.get('files')?.value;
    var mth=this.bulkUploadCSVForm.get('monthNam')?.value;
    var yr=this.bulkUploadCSVForm.get('mnthYear')?.value;

     if (mth === undefined || mth === null  || mth.trim()=='') {
     var msg1 = "MONTH: Should not be null....";
      alert(msg1);
      return;
    }

    if (file===undefined){
      alert('First Select CSV & Then Click upload Button !..');
      return;
    }

    var  resp=confirm("Do You Want to Continue ???"); if(resp==false) { return;}
      this.closeResetButton=false;
    this.progress = 0;
    this.dataDisplay ='File Upload in progress....Do not refresh the Page'
    event.target.disabled = true;
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0])
    // if ((sessionStorage.getItem('deptName'))=== 'Sales') {
      this.service.bulkpouploadwarrantyClaimNew(formData,mth,yr).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.itemUploadedList=res.obj;  
          this.dataDisplay =res.message;
          this.closeResetButton=true;
         this.bulkUploadCSVForm.get('files')?.reset();
        }
        else{
          if (res.code===400){    
            alert(res.message);
            this.itemList = res.obj;
            this.dataDisplay =res.message;
            this.closeResetButton=true;
            this.bulkUploadCSVForm.get('files')?.reset();
            this.itemButton1=false;
          }
        }
      })

      setTimeout(() => {
        event.target.disabled = false;
       }, 60000);
  }

updateFile(event:any) {
    var file =this.bulkUploadCSVForm.get('files').value;
    if (file===undefined){
      alert('First Select CSV & Then Click upload Button !..');
      return;
    }
    this.closeResetButton=false;
    this.progress = 0;
    this.dataDisplay ='File Upload in progress....Do not refresh the Page'
    event.target.disabled = true;
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0])
    // if ((sessionStorage.getItem('deptName'))=== 'Sales') {
      this.service.bulkpoUpdatewarrantyClaim(formData).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.itemUploadedList=res.obj;  
          this.dataDisplay ='File Uploaded Sucessfully....'
          this.closeResetButton=true;
         this.bulkUploadCSVForm.get('files').reset();
        }
        else{
          if (res.code===400){    
            alert(res.message);
            this.itemList = res.obj;
            this.dataDisplay ='File Uploading Failed....'
            this.closeResetButton=true;
            this.bulkUploadCSVForm.get('files').reset();
            this.itemButton1=false;
          }
        }
      })

      setTimeout(() => {
        event.target.disabled = false;
       }, 60000);
  }

  radioEvent(event:any){
  // alert(event.target.value);

    if( event.target.value==='fileupld') {
      this.showFileUpldWind=true;this.showFileUpdtWind=false;
      // alert ("upload Selected....")
      this.caption1="File Upload"

    }
    else {this.showFileUpldWind=false;this.showFileUpdtWind=true;
      // alert ("Update Selected....")
      this.caption1="File Update"


    }

  // this.clearForm();
  // if( event.target.value==='genGp') {this.showGenForm=true;this.showPrintForm=false;
  //         this.dateOfDelv=this.pipe.transform(Date.now(), 'y-MM-dd');   }
  //  else {this.showPrintForm=true;this.showGenForm=false;}
  }
  clearFormArray() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }
}
