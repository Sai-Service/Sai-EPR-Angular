import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-vehicle-and-addon-price-upload',
  templateUrl: './vehicle-and-addon-price-upload.component.html',
  styleUrls: ['./vehicle-and-addon-price-upload.component.css']
})
export class VehicleAndAddonPriceUploadComponent implements OnInit {
  bulkUploadCSVVehilceAndAddonForm: FormGroup;
  userName:string;
  closeResetButton =true;
  dataDisplay: any;
  progress = 0;
  priceListName:string;
  pricelIstList : any;
  pricelIstList1:any=[];
  addonFile:string;
  file:string;
  @ViewChild('fileInput') fileInput;
  @ViewChild('addonFileInput') addonFileInput;
  isDisabledUpload=false;
  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.bulkUploadCSVVehilceAndAddonForm = this.fb.group({
      userName:[],
      priceListName:[],
      file:[],
      addonFile:[],
    })
   }


   bulkUploadCSVVehilceAndAddon(bulkUploadCSVVehilceAndAddonForm) { 
  
  }


  ngOnInit(): void {
    this.bulkUploadCSVVehilceAndAddonForm.patchValue({userName: sessionStorage.getItem('ticketNo')});

    this.service.PriceListIdList(Number(sessionStorage.getItem('ouId')),sessionStorage.getItem('divisionId'))
    .subscribe(
      data1 => {
        this.pricelIstList1 = data1;
        console.log(this.pricelIstList1);
        // let SalePriceList = this.pricelIstList1.find(v => v.deptName == (sessionStorage.getItem('deptName')));
        let SalePriceList = this.pricelIstList1.filter(priceList => (priceList.deptName === (sessionStorage.getItem('deptName'))));
        console.log(SalePriceList);
       this.pricelIstList =SalePriceList;
      }
    );
    
  }


  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }


  updatePriceList() {
    this.router.navigate(['/admin/OrderManagement/modelWisePrice']);
  }


  uploadCSVFile(){
    this.closeResetButton=false;
    this.progress = 0;
    this.dataDisplay ='File Upload in progress....Do not refresh the Page'
    let formData = new FormData();
    this.isDisabledUpload=true;
    var priceListName= this.bulkUploadCSVVehilceAndAddonForm.get('priceListName').value;
    var file=this.fileInput.nativeElement.files[0];
    var addonfile=this.addonFileInput.nativeElement.files[0];
    if (priceListName===undefined|| priceListName===''|| priceListName===null){
      alert('Please Select Price List Name.!');
      return;
    }
    else if (file===undefined || file === '' || file===null){
      alert('Please Select Vehicle CSV.!');
      return;
    }
    else if (addonfile===undefined || addonfile === '' || addonfile===null){
      alert('Please Select Addon CSV.!');
      return;
    }
    
    this.service.bulkpouploadSalesVhiecleAndAddonItem(formData,file,addonfile,sessionStorage.getItem('emplId'),priceListName).subscribe((res: any) => {  
      if (res.code === 200) {        
        //  this.poDetails = res.obj;
        alert(res.message);
         this.dataDisplay ='File Uploaded Sucessfully....'
         this.closeResetButton=true;
         this.isDisabledUpload=true;
       } else {
         if (res.code === 400) {
           alert('Error In File : \n' + res.message+'---'+ res.obj);
           this.dataDisplay ='File Uploading Failed....'
           this.closeResetButton=true;
           this.isDisabledUpload=false;
          //  this.displaySalesErrorList=false
         }
       }
     });
  }

}
