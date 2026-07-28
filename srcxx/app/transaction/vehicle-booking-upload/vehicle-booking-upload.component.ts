import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe, Location, } from "@angular/common";
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-vehicle-booking-upload',
  templateUrl: './vehicle-booking-upload.component.html',
  styleUrls: ['./vehicle-booking-upload.component.css']
})
export class VehicleBookingUploadComponent implements OnInit {
  VehBookUploadForm: FormGroup;
  files:string;
  dataDisplay: any;
  itemUploadedList:any=[];
  @ViewChild('fileInput') fileInput;
  displaydata: boolean;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.VehBookUploadForm = this.fb.group({
      files:[],
    
    })
   }

   VehBookUpload(VehBookUploadForm){}


  ngOnInit(): void {
  }
  uploadFile(event:any) {
    var file =this.VehBookUploadForm.get('files').value;
    if (file===undefined){
      alert('First Select CSV & Then Click upload Button !..');
      return;
    }
    event.target.disabled = true;
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0]);
      this.service.uploadVehBookings(formData).subscribe((res: any) => 
      {
        if (res.code === 200) {
          alert(res.message);
          this.itemUploadedList=res.obj;  
          // this.dataDisplay ='File Uploaded Sucessfully....'
          this.displaydata=false;
          // this.closeResetButton=true;
         this.VehBookUploadForm.get('files').reset();
        }
        else{
          if (res.code===400){    
            alert(res.message);
            this.itemUploadedList = res.obj;
            this.dataDisplay ='File Uploading Failed....'
            // this.closeResetButton=true;
            this.VehBookUploadForm.get('files').reset();
            // this.itemButton1=false;
          }
        }
      })

      setTimeout(() => {
        event.target.disabled = false;
       }, 60000);
  }

  refresh() {
    window.location.reload();
  }
  
  close() {
    this.location1.back();
  }
}
 