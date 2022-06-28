import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-jv-upload',
  templateUrl: './jv-upload.component.html',
  styleUrls: ['./jv-upload.component.css']
})
export class JvUploadComponent implements OnInit {

  JvUploadForm: FormGroup;
  files:string;

  itemUploadedList:any=[];
  @ViewChild('fileInput') fileInput;
  dataDisplay: any;

   constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.JvUploadForm = this.fb.group({
      files:[],
    })
  }

  JvUpload(JvUploadForm){}

  ngOnInit(): void {
  }

  uploadFile(event:any) {
    var file =this.JvUploadForm.get('files').value;
    if (file===undefined){
      alert('First Select CSV & Then Click upload Button !..');
      return;
    }
    event.target.disabled = true;
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0])
    // if ((sessionStorage.getItem('deptName'))=== 'Sales') {
      this.service.bulkjvuploadCsv(formData).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.itemUploadedList=res.obj;  
          this.dataDisplay ='File Uploaded Sucessfully....'
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

}
