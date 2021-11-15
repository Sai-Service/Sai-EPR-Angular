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
import { MasterService } from 'src/app/master/master.service'
import { DatePipe } from '@angular/common';
import { data, get } from 'jquery';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-bulk-upload-pricelist',
  templateUrl: './bulk-upload-pricelist.component.html',
  styleUrls: ['./bulk-upload-pricelist.component.css']
})
export class BulkUploadPricelistComponent implements OnInit {
  bulkUploadPriceListForm: FormGroup;


  loginName:string;
  loginArray:string;
  name:string;
  ouName : string;
  ouId:number;
  deptId:number;
  locId: number;
  locName : string;
  emplId :number;
  orgId:number;
  divisionId : number;
  divisionName:string;


  progress = 0;
  message = '';
  selectFile?: File;
  pipe = new DatePipe('en-US');
  now = Date.now();
  resMsg : string;
  lstMessage: any;

  fileName :string; 
  docType :string;
  public PriceListIdList : Array<string> = [];
  upldPricelistName : string;
  
  @ViewChild('fileInput') fileInput;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.bulkUploadPriceListForm = this.fb.group({

     
      loginArray:[''],
      loginName:[''],
      ouName :[''],
      ouId:[],
      deptId:[],
      locId:[''],
      locName :[''],
      emplId:[''],
      divisionId :[''],
      divisionName:[''],

      fileName:['',Validators.required],
      docType:['',Validators.required],
      upldPricelistName :[],
      


    });
  
  }

  
  bulkUploadPriceList(bulkUploadPriceListForm:any){}
  get f() { return this.bulkUploadPriceListForm.controls; }
  
  ngOnInit(): void {

    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
    this.divisionName=sessionStorage.getItem('divisionName');
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.loginName=sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    this.locName=(sessionStorage.getItem('locName'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    // this.emplId= Number(sessionStorage.getItem('emplId'));
   
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);
    
    
    this.service.PriceListIdList()
    .subscribe(
      data => {
        this.PriceListIdList = data;
        console.log(this.PriceListIdList);
      }
    );
  }

  uploadFile() {
   
    this.progress = 0;

    var upldPlName =this.bulkUploadPriceListForm.get('upldPricelistName').value;
    var event=this.fileInput.nativeElement.files[0];
    console.log('doctype-check'+this.docType)
    let formData = new FormData();
    // formData.append('file', this.fileInput.nativeElement.files[0])
    formData.append('file', event)

      // this.service.UploadExcel(formData,this.docType,upldPlName).subscribe(result => {
      // this.message = result.toString();

      if (event.type === HttpEventType.UploadProgress) {
      this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.message = event.body.message;
       
      }
      // alert ( "this.message :" + this.message);

       this.service.UploadExcel(formData,this.docType,upldPlName).subscribe((res: any) => {
   
        if (res.code === 200) {
          alert('FILE UPLOADED SUCCESSFULLY');
           this.resMsg = res.message+",  Code : "+res.code;;
           this.lstMessage=res.obj.priceListDetailList;
             
        } else {
          if (res.code === 400) {
            alert('FILE UPLOAD FAILED');
            this.resMsg = res.message +",  Code : "+res.code;
            this.lstMessage=res.obj.priceListDetailList;
          }

         

        }
      });
    // } );
   
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
    if (msgType.includes("Reset")) {
      this.message = "Do you want to Reset the Form(Yes/No)?"
    }
    
    if (msgType.includes("Close")) {
      this.message = "Do you want to Close the Form(Yes/No)?"
    }
    return;
  }

 executeAction() {

    if (this.msgType.includes("Reset")) {
      window.location.reload();
    }
    
    if (this.msgType.includes("Close")) {
      this.router.navigate(['admin']);
  }
    return;
  }

progressBarTesting(){

  for (let i = 0; i <=100; i++) {
    var x=0;
    this.progress=i;
   }
}

// ------------------------------------------------------
}
