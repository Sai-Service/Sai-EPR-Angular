import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';


@Component({
  selector: 'app-bulk-upload-pricelist',
  templateUrl: './bulk-upload-pricelist.component.html',
  styleUrls: ['./bulk-upload-pricelist.component.css']
})
export class BulkUploadPricelistComponent implements OnInit {
  bulkUploadPriceListForm: FormGroup;

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
  
  updStatus =false;
  closeResetButton =true;
  fileValidation=false;
  viewLogFile=false;
  
  @ViewChild('fileInput') fileInput;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location,
     private router1: ActivatedRoute, private service: MasterService) {
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
    
    
    this.service.PriceListIdList(this.ouId,this.divisionId)
    .subscribe(
      data => {
        this.PriceListIdList = data;
        console.log(this.PriceListIdList);
      }
    );

    // ---------------------------------------Spinner----------------------------
   
          
          // ---------------------------------------------------------------------------

  }

  CheckValidations() {

    var upldPlName =this.bulkUploadPriceListForm.get('upldPricelistName').value;
    var csvFileName=this.fileInput.nativeElement.files[0];

    if(upldPlName==null || upldPlName==undefined) {
      alert ("Select Price List Name..."+upldPlName)  ;
      this.fileValidation=false;
      return;
    }
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

    var upldPlName =this.bulkUploadPriceListForm.get('upldPricelistName').value;
    var event=this.fileInput.nativeElement.files[0];
    console.log('doctype-check'+this.docType)
    let formData = new FormData();
    formData.append('file', event)

      // this.service.UploadExcel(formData,this.docType,upldPlName).subscribe(result => {
      // this.message = result.toString();

      // if (event.type === HttpEventType.UploadProgress) {
      // this.progress = Math.round(100 * event.loaded / event.total);
      // } else if (event instanceof HttpResponse) {
      //   this.message = event.body.message;
      // }

      // alert ( "this.message :" + this.message);

       this.service.UploadExcel(formData,this.docType,upldPlName).subscribe((res: any) => {
   
        if (res.code === 200) {
          // alert('FILE UPLOADED SUCCESSFULLY');
           this.resMsg = res.message+",  Code : "+res.code;;
           this.lstMessage=res.obj.priceListDetailList;
          //  this.updStatus=false;
           this.dataDisplay ='File Uploaded Sucessfully....'
           this.closeResetButton=true;
           this.viewLogFile=true;
             
        } else {
          if (res.code === 400) {
            // alert('FILE UPLOAD FAILED');
            this.resMsg = res.message +",  Code : "+res.code;
            this.lstMessage=res.obj.priceListDetailList;
            this.updStatus=false;
            this.dataDisplay ='File Uploading Failed....'
            this.closeResetButton=true;
            this.viewLogFile=false;
          }

         

        }
      });
    // } );
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

progressBarTesting(){

  // for (let i = 0; i <=100; i++) {
  //   var x=0;
  //   this.progress=i;
  //  }

  // this.updStatus=true;
  // var upldPlName =this.bulkUploadPriceListForm.get('upldPricelistName').value;
  // var event=this.fileInput.nativeElement.files[0];
  // console.log('doctype-check'+this.docType)
  // let formData = new FormData();
  //  formData.append('file', event)

  // this.service.UploadExcel(formData,this.docType,upldPlName).subscribe((res: any) => {
   

  //   if (res.code === 200) {
  //     alert('FILE UPLOADED SUCCESSFULLY');
  //      this.resMsg = res.message+",  Code : "+res.code;;
  //      this.lstMessage=res.obj.priceListDetailList;
  //     this.updStatus=false;
         
  //   } else {
  //     if (res.code === 400) {
  //       alert('FILE UPLOAD FAILED');
  //       this.resMsg = res.message +",  Code : "+res.code;
  //       this.lstMessage=res.obj.priceListDetailList;
  //       this.updStatus=false;
  //     }
  //   }
  // });

//  this.updStatus=true;
//   this.http.get('http://www.mocky.io/v2/5ec6a61b3200005e00d75058')
//   .subscribe(Response => {
        
//       if (Response) {
//           hideloader();
//       }
//       console.log(Response)
//       this.dt = Response;
//       this.dataDisplay = this.dt.data;
//   });

//       function hideloader() {
//         alert("in hide loader...")
//        document.getElementById('loading') .style.display = 'none';
//       }

}

// ------------------------------------------------------

exportToExcel1() {
  const ws: xlsx.WorkSheet =   
  xlsx.utils.table_to_sheet(this.epltable1.nativeElement);
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, 'epltable1.xlsx');
 }

}
