import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe } from '@angular/common';
import { get } from 'jquery';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";

@Component({
  selector: 'app-bulk-item-upload-csv',
  templateUrl: './bulk-item-upload-csv.component.html',
  styleUrls: ['./bulk-item-upload-csv.component.css']
})


export class BulkItemUploadCSVComponent implements OnInit {
  bulkUploadCSVForm: FormGroup;
  location:string;
  userName:string;

  @ViewChild('fileInput') fileInput;
  message: string;
  allUsers: Observable<BulkItemUploadCSVComponent[]>;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.bulkUploadCSVForm = this.fb.group({
      location:[],
      userName:[],
    })
   }

  ngOnInit(): void {
    this.bulkUploadCSVForm.patchValue({ location: sessionStorage.getItem('locCode') });
    this.bulkUploadCSVForm.patchValue({ userName: sessionStorage.getItem('ticketNo') });
  }
  bulkUploadCSV(bulkUploadCSVForm) { }


  uploadFile() {
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0])
    // if ((sessionStorage.getItem('deptName'))=== 'Sales') {
      this.service.bulkpouploadSalesNew(formData).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          // window.location.reload()
        }
        else{
          if (res.code===400){
            alert(res.message);
            // window.location.reload()
          }
        }
      })

  // }
  }
  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }
}
