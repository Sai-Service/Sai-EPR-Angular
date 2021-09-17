import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// import { MasterService } from '../master.service';
import{MasterService} from 'src/app/master/master.service'
import { DatePipe } from '@angular/common';
import { get } from 'jquery';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-bulk-upload-with-csv',
  templateUrl: './bulk-upload-with-csv.component.html',
  styleUrls: ['./bulk-upload-with-csv.component.css']
})
export class BulkUploadWithCsvComponent implements OnInit {
  bulkUploadCSVForm: FormGroup;
  docType:string;
  deptName: any;
  public poDetails: any[];
  private sub: any;
  segment1:string;
    

  @ViewChild('fileInput') fileInput;
  message: string;
  allUsers: Observable<BulkUploadWithCsvComponent[]>;
  constructor(private fb: FormBuilder, private router: Router, private router1: ActivatedRoute,private service: MasterService) { 
    this.bulkUploadCSVForm = this.fb.group({
      deptName: [],
      segment1:[],
    })
  }
  bulkUploadCSV(bulkUploadCSVForm) {}
  ngOnInit(): void {
    this.deptName = (sessionStorage.getItem('deptName'));
  }

  closeMast() {
    this.router.navigate(['admin']);
  }
  // loadAllUser() {
  //   this.allUsers = this.service.BindUser();
  // }

  uploadFile() {
    console.log('doctype-check'+this.docType)
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0])
      // alert(this.deptName);
      if (this.deptName==='Sales'){
      this.service.bulkpouploadSales(formData).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.poDetails=res.obj;
          this.segment1=res.obj.segment1;
          // this.Search(this.segment1);
        } else {
          if (res.code === 400) {
            alert('Error In File : \n' + res.obj);
          }
        }
      });
    }
    else{
        this.service.bulkpouploadSpares(formData).subscribe((res: any) => {
          if (res.code === 200) {
            alert(res.obj);
          } else {
            if (res.code === 400) {
              alert('Error In File : \n' + res.obj);
            }
          }
        });
      // }
    }
    // });
  }
}