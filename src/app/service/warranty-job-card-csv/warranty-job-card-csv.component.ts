import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
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
    @ViewChild('fileInput') fileInput;
  message: string;
  allUsers: Observable<WarrantyJobCardCSVComponent[]>;



  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.bulkUploadCSVForm = this.fb.group({
      location:[],
      userName:[],
      files:[],
    })
   }

  ngOnInit(): void {
     this.bulkUploadCSVForm.patchValue({ userName: sessionStorage.getItem('ticketNo') });
  }

    bulkUploadCSV(bulkUploadCSVForm) { }


      uploadFile(event:any) {
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
      this.service.bulkpouploadwarrantyClaim(formData).subscribe((res: any) => {
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
}
