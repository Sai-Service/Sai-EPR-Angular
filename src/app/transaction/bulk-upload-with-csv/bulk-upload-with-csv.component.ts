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
import { Location, } from "@angular/common";

@Component({
  selector: 'app-bulk-upload-with-csv',
  templateUrl: './bulk-upload-with-csv.component.html',
  styleUrls: ['./bulk-upload-with-csv.component.css']
})
export class BulkUploadWithCsvComponent implements OnInit {
  bulkUploadCSVForm: FormGroup;
  docType:string;
  deptName: any;
  poDetails: any=[];
  private sub: any;
  segment1:string;
  location:string;
  invcNo:string;
  supplierNo:string;
  userName:string;  
  supplierSite:string;
  invcDt1:Date;

  // pipe = new DatePipe('en-US');
  // now=new Date();
  // invcDt1=this.pipe.transform(this.now,'dd-MM-yyyy');

  @ViewChild('fileInput') fileInput;
  message: string;
  allUsers: Observable<BulkUploadWithCsvComponent[]>;
  constructor(private fb: FormBuilder, private router: Router,private location1: Location, private router1: ActivatedRoute,private service: MasterService) { 
    this.bulkUploadCSVForm = this.fb.group({
      deptName: [],
      segment1:[''],
      location:[''],
      invcNo:[''],
      supplierNo:[''],
      userName:[''],
      supplierSite:[''],
      invcDt1:[''],
    })
  }
  bulkUploadCSV(bulkUploadCSVForm) {}
  ngOnInit(): void {
    this.deptName = (sessionStorage.getItem('deptName'));
    this.bulkUploadCSVForm.patchValue({location:sessionStorage.getItem('locCode')})
    console.log(sessionStorage.getItem('locCode'));
    
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
          for (let i=0;i<res.obj;i++){
            this.bulkUploadCSVForm.patchValue({ segment1: res[i].obj.segment1 })
          }
          // this.segment1=res.obj.segment1;
          // this.Search(this.segment1);
        } else {
          if (res.code === 400) {
            alert('Error In File : \n' + res.obj);
          }
        }
      });
    }
    else{
      // alert(Number(sessionStorage.getItem('divisionId')));
      if (Number(sessionStorage.getItem('divisionId'))==1){
        this.service.bulkpouploadSpares(formData).subscribe((res: any) => {
          if (res.code === 200) {
            alert(res.obj);
          } else {
            if (res.code === 400) {
              alert('Error In File : \n' + res.obj);
            }
          }
        });
      }
      else if (Number(sessionStorage.getItem('divisionId'))==2){
        // let location=this.bulkUploadCSVForm.get('locCode').value;
        var location= (sessionStorage.getItem('locCode'));
        // alert(location);
        var invcNo=this.bulkUploadCSVForm.get('invcNo').value;
        var supplierNo=this.bulkUploadCSVForm.get('supplierNo').value;
        var supplierSite=this.bulkUploadCSVForm.get('supplierSite').value;
        var userName=this.bulkUploadCSVForm.get('userName').value;
        var invcDt1=this.bulkUploadCSVForm.get('invcDt1').value;
        // alert(location+'  '+invcNo+' '+supplierNo+' '+ supplierSite+' '+ userName+' '+ invcDt1)
        this.service.bulkpouploadSparesBajaj(formData,location,invcNo,supplierNo,supplierSite,userName,invcDt1).subscribe((res: any) => {
          if (res.code === 200) {
            alert(res.message);
            this.poDetails[0]=res.obj;
            console.log(this.poDetails);
          } else {
            if (res.code === 400) {
              alert('Error In File : \n' + res.obj);
            }
          }
        }); 
      }
    }
   
  }

  routeOMAndCSPage(segment1){
    // alert(poNo)
    this.router.navigate(['/OPMasterDto',segment1]);
    // this.router.navigate(['/OPMasterDto',2111022111889]);
  }

  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }
}
