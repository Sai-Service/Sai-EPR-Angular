import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';
import { OrderManagementService } from 'src/app/order-management/order-management.service';


@Component({
  selector: 'app-order-cancellation-upload',
  templateUrl: './order-cancellation-upload.component.html',
  styleUrls: ['./order-cancellation-upload.component.css']
})
export class OrderCancellationUploadComponent implements OnInit {
  orderCancellationUploadForm: FormGroup;
  selectFile?: File;
  progress = 0;
  message = '';
  updStatus =false;
  closeResetButton =true;
  fileValidation=false;
  backorderStatus=false;
  msg:string;
  dataDisplay: any;
  docType :string;
  public PaymentModeList: Array<string> = [];
  resMsg : string;
  payType:string;
  receiptMethodName:string;
  @ViewChild('fileInput') fileInput;
  ReceiptMethodList: any = [];
  constructor(private fb: FormBuilder, private router: Router, private orderManagementService: OrderManagementService,private location1: Location,private router1: ActivatedRoute, private service: MasterService) { 
    this.orderCancellationUploadForm = this.fb.group({
      fileName:['',Validators.required],
      docType:['',Validators.required],
      receiptMethodName:['',Validators.required],
      payType:['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.orderManagementService.PaymentModeList()
    .subscribe(
      data => {
        this.PaymentModeList = data;
        console.log(this.PaymentModeList);
      }
    );

  }
  orderCancellationUpload(orderCancellationUploadForm:any){}
  get f() { return this.orderCancellationUploadForm.controls; }

  CheckValidations() {

    
    var csvFileName=this.fileInput.nativeElement.files[0];
    var payType = this.orderCancellationUploadForm.get('payType').value;
    var receiptMethodName=this.orderCancellationUploadForm.get('receiptMethodName').value;
    if(csvFileName==null || csvFileName==undefined) {
      alert ("Select CSV File Name..."+csvFileName );
      this.fileValidation=false;
      return;
    }
    if (payType==null|| payType==undefined|| payType==''){
      alert ('Select Payment Mode.!' );
      this.fileValidation=false;
      return;
    }
    if (receiptMethodName==null|| receiptMethodName==undefined|| receiptMethodName==''){
      alert ('Select Payment Method.!' );
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
    var payType = this.orderCancellationUploadForm.get('payType').value;
    var receiptMethodName=this.orderCancellationUploadForm.get('receiptMethodName').value;
       this.service.orderCancellationUpload(formData,sessionStorage.getItem('emplId'),receiptMethodName).subscribe((res: any) => {
   
        if (res.code === 200) {
            res.message+",  Code : "+res.code;;
          //  this.lstMessage=res.obj.priceListDetailList;
            this.dataDisplay ='File Uploaded Sucessfully....'
           this.closeResetButton=true;
             
        } else {
          // if (res.code === 400) {
             this.resMsg = res.message +",  Code : "+res.code;
            this.dataDisplay ='File Uploading Failed....'
            this.closeResetButton=true;
          // }

        } 
      });
     } 
   
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



    onPayTypeSelected(payType: any, rmStatus: any) {
      var payType = payType.target.value;
      // alert(payType)
    
        this.service.ReceiptMethodListNew(payType, rmStatus, sessionStorage.getItem('deptId'), sessionStorage.getItem('ouId'))
          .subscribe(
            data => {
              this.ReceiptMethodList = data.obj;
              console.log(this.ReceiptMethodList);
              
            });
    }


  
  

}
