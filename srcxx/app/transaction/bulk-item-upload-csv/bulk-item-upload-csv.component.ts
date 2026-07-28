import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-bulk-item-upload-csv',
  templateUrl: './bulk-item-upload-csv.component.html',
  styleUrls: ['./bulk-item-upload-csv.component.css']
})


export class BulkItemUploadCSVComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild('epltable1', { static: false }) epltable1: ElementRef;
  
  bulkUploadCSVForm: FormGroup;
  location:string;
  userName:string;
  itemList: any = [];
  itemUploadedList:any=[];
  files:string;
  public maxDate = new Date();
  itemButton1=true;


  @ViewChild('fileInput') fileInput;
  message: string;
  allUsers: Observable<BulkItemUploadCSVComponent[]>;

  closeResetButton =true;
  dataDisplay: any;
  progress = 0;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.bulkUploadCSVForm = this.fb.group({
      location:[],
      userName:[],
      files:[],
    })
   }

  ngOnInit(): void {
    this.bulkUploadCSVForm.patchValue({ location: sessionStorage.getItem('locCode') });
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
      this.service.bulkpouploadSalesNew(formData).subscribe((res: any) => {
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

  exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
   }


   exportToExcel1() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable1.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable1.xlsx');
   }

  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }

 message1: string = "Please Fix the Errors !";
  msgType:string ="Close";
  getMessage(msgType: string) {
    this.msgType = msgType;
//     if (msgType.includes("Save")) {
//       this.submitted = true;
//       (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
//       if (this.bulkUploadCSVForm.invalid) {
//         
//         //this.submitted = false;
//         (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '');
//         return;
//       }
//       this.message = "Do you want to SAVE the changes(Yes/No)?"
//       
//     }

    if (msgType.includes("Reset")) {
      this.message = "Do you want to Reset the changes(Yes/No)?"
    }
    
    if (msgType.includes("Close")) {
      this.message = "Do you want to Close the Form(Yes/No)?"
    }
    return;
  }

 executeAction() {
//     if(this.msgType.includes("Save")) {
//      
//       this.newMast();
//     }

    if (this.msgType.includes("Reset")) {
      // this.resetItemCatMast();
      window.location.reload();
    }
    
    if (this.msgType.includes("Close")) {
      // this.closeItemCatMast();
      this.router.navigate(['admin']);
  }
    return;
  }

}

