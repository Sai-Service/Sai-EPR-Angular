import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-backorder-spares-import-bajaj',
  templateUrl: './backorder-spares-import-bajaj.component.html',
  styleUrls: ['./backorder-spares-import-bajaj.component.css']
})

export class BackorderSparesImportBajajComponent implements OnInit {
  backorderSparesImportBajajForm: FormGroup;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild('epltable1', { static: false }) epltable1: ElementRef;

  dataDisplay: any;
  dt: any;

  loginName:string;
  loginArray:string;
  name:string;
  ouName : string;
  ouId:number;
  deptId:number;
  locId: number;
  locName : string;
  locCode:string;
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
  viewLogFile=false;

  fileName :string; 
  docType :string;
  lstBackOrder : any;
  
  
  updStatus =false;
  closeResetButton =true;
  fileValidation=false;
  backorderStatus=false;
  msg:string;
  
  @ViewChild('fileInput') fileInput;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location,
     private router1: ActivatedRoute, private service: MasterService) {
    this.backorderSparesImportBajajForm = this.fb.group({

     
      loginArray:[''],
      loginName:[''],
      ouName :[''],
      ouId:[],
      deptId:[],
      locId:[''],
      locName :[''],
      locCode:[],
      emplId:[''],
      divisionId :[''],
      divisionName:[''],

      msg:[],
      fileName:['',Validators.required],
      docType:['',Validators.required],
      
      


    });
  
  }

  
  backorderSparesImportBajaj(backorderSparesImportBajajForm:any){}
  get f() { return this.backorderSparesImportBajajForm.controls; }
  
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
    this.locCode=(sessionStorage.getItem('locCode'));  
    this.deptId=Number(sessionStorage.getItem('dept'));
    // this.emplId= Number(sessionStorage.getItem('emplId'));
   
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);
    
    
    this.service.getBackOrderStatusBajaj(this.locId)
    .subscribe(
      data => {
        console.log(data);
        // alert ("data.obj :"+ data.obj);
        if(data.obj===null) { this.backorderStatus =false; this.msg=data.message;} 
        else {this.backorderStatus=true;this.msg="Back order Found."}
      }
    );

  // alert ("Bakc order Status :" +this.backorderStatus);

    // ---------------------------------------Spinner----------------------------
   
  
  }

  CheckValidations() {

    
    var csvFileName=this.fileInput.nativeElement.files[0];

    if(csvFileName==null || csvFileName==undefined) {
      alert ("Select CSV File Name..."+csvFileName );
      this.fileValidation=false;
      return;
    }
      this.fileValidation=true;
  }

  uploadFile() {
    this.CheckValidations()
   
    if (this.fileValidation===true) {
      this.updStatus=true; 
      this.closeResetButton=false;
      this.progress = 0;
      this.dataDisplay ='File Upload in progress....Do not refresh the Page'

    var event=this.fileInput.nativeElement.files[0];
    console.log('doctype-check'+this.docType)
    let formData = new FormData();
    formData.append('file', event)

       this.service.UploadExcelBackOrderBajaj(formData,this.docType,this.locId).subscribe((res: any) => {
   
        if (res.code === 200) {
            this.resMsg = res.message+",  Code : "+res.code;;
           this.lstMessage=res.obj.priceListDetailList;
            this.dataDisplay ='File Uploaded Sucessfully....'
           this.closeResetButton=true;
           this.viewLogFile=true;
             
        } else {
          // if (res.code === 400) {
             this.resMsg = res.message +",  Code : "+res.code;
            this.lstMessage=res.obj.priceListDetailList;
            this.updStatus=false;
            this.dataDisplay ='File Uploading Failed....'
            this.closeResetButton=true;
            this.viewLogFile=false;
          // }

        } 
      });
     } 
   
     }

  exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
   }

  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }


  message1:string="PleaseFixtheErrors!";
  msgType:string="Close";
  getMessage(msgType:string){
  this.msgType=msgType;
  if(msgType.includes("Reset")){
  this.message="DoyouwanttoResettheForm(Yes/No)?"
  }
  
  if(msgType.includes("Close")){
  this.message="DoyouwanttoClosetheForm(Yes/No)?"
  }
  return;
  }
  
  
  executeAction(){
  
  if(this.msgType.includes("Reset")){
  window.location.reload();
  }
  
  if(this.msgType.includes("Close")){
  this.router.navigate(['admin']);
  }
  return;
  }

// ------------------------------------------------------

exportToExcel1() {
  const ws: xlsx.WorkSheet =   
  xlsx.utils.table_to_sheet(this.epltable1.nativeElement);
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, 'epltable1.xlsx');
 }


 clearBackOrder() {
  this.service.clearBakcOrder(this.locId).subscribe((res: any) => {
   if (res.code === 200) {
      alert(res.message);
   } else {
     if (res.code === 400) {
       alert(res.message);
     }
   }
 });
}

}
