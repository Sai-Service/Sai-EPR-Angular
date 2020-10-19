import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, RequiredValidator } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';
import { valHooks } from 'jquery';

interface IsupplierMaster {
  suppId: number;
  suppNo: number;
  name: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  pinCode: string;
  state: string;
  mobile1: number;
  mobile2: number;
  emailId: string;
  contactPerson: string;
  contactNo:number;
  taxCategoryName: string;
  ticketNo: string;
  creditDays: number;
  creditLimit: number;
  remarks: string;
  gstNo: string;
  panNo: string;
  tanNo: string;
  ouId: string;
  existing: string;
  ExeAddress: string;
  saddress1: string;
  saddress2: string;
  saddress3: string;
  saddress4: string;
  scity: string;
  pinCd: string;
  sstate: string;
  smobile1:string
  smobile2:string
  // aadharNo:string;
}


@Component({
  selector: 'app-supplier-master',
  templateUrl: './supplier-master.component.html',
  styleUrls: ['./supplier-master.component.css']
})
export class SupplierMasterComponent implements OnInit {

  supplierMasterForm: FormGroup;
  suppId: number;
  suppNo: number;
  name: string;
  submitted = false;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  pinCode: string;
  state: string;
  mobile1: number;
  mobile2: number;
  emailId: string;
  contactPerson: string;
  contactNo:number;
  taxCategoryName: string;
  ticketNo: string;
  creditDays: number;
  creditLimit: number;
  remarks: string;
  gstNo: string;
  panNo: string;
  tanNo: string;
  supplierSiteMasterList:any[];
  lstcomments: any[];
  array:any[];
  lstcommentsId: any[];
  displayButton = true;
  ouId: string;
  existing: string;
  ExeAddress: string;
  saddress1:string;
  saddress2: string;
  saddress3:string;
  saddress4:string;
  scity: string;
  pinCd:string;
  sstate:string;
  smobile1:string
  smobile2:string
  // aadharNo:string;
  ouIdSelected:number;
  public cityList: Array<string>[];
  public pinCodeList: Array<string>[];
  public stateList: Array<string>[];
  public taxCategoryList: Array<string>[];
  public ouIdList: Array<string>[];
public lstcommentsTax: any[];
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.supplierMasterForm = fb.group({
      suppId: [],
      suppNo: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      name: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      address3: ['', [Validators.required]],
      address4: [''],
      city: ['', [Validators.required]],
      contactNo: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      mobile1: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      mobile2: ['', [Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      emailId: ['', [Validators.required, Validators.email]],
      contactPerson: [''],
      taxCategoryName: ['', Validators.required],
      ticketNo: ['', Validators.required],
      creditDays: ['',[Validators.required, Validators.pattern('[0-9]*')]],
      creditLimit: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      remarks: [''],
      state: ['', [Validators.required]],
      gstNo: [],
      // gstNo: ['', [Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}$"), Validators.maxLength(15)]],
      panNo: ['', [Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$"), Validators.maxLength(10)]],
      tanNo: [''],
      pinCode: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]{6}$")]],
      ouId: ['', [Validators.required]],
      ExeAddress: [],
      saddress1: [],
      saddress2: [],
      saddress3: [],
      saddress4: [],
      scity: [],
      pinCd: [],
      sstate: [],
      smobile1:[],
      smobile2:[],
      // aadharNo:[],

      // address1E: ['', [Validators.required]],
      // address2E: ['', [Validators.required]],
      // address3E: ['', [Validators.required]],
      // address4E: [],
      // cityE: ['', [Validators.required]],
      // pinCodeE: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]{6}$")]],
      // stateE: ['', [Validators.required]],
    });
  }

  get f() { return this.supplierMasterForm.controls; }

  ngOnInit(): void {

    this.service.cityList()
      .subscribe(
        data => {
          this.cityList = data;
          console.log(this.cityList);
        }
      );

    // this.service.pinCodeList()
    //   .subscribe(
    //     data => {
    //       this.pinCodeList = data;
    //       console.log(this.pinCodeList);
    //     }
    //   );
    this.service.StateList()
      .subscribe(
        data => {
          this.stateList = data;
          console.log(this.stateList);
        }
      );

    this.service.OUIdList()
      .subscribe(
        data => {
          this.ouIdList = data;
          console.log(this.ouIdList);
        }
      );
  }

  supplierMaster(supplierMaster: any) {
  }
  
  transData(val) {
    // delete val.divisionId;
    // delete val.suppId;
    delete val.existing;
    delete val.ExeAddress;
    delete val.saddress1;
    delete val.saddress2;
    delete val.saddress3;
    delete val.saddress4;
    delete val.scity;
    delete val.pinCd;
    delete val.sstate;  
    delete val.smobile1; 
    delete val.smobile2; 
    delete val.aadharNo;
    
    // delete val.suppNo;
    // delete val.name;
    // delete val.address1;
    // delete val.address2;
    // delete val.address3;
    // delete val.address4;
    // delete val.city;
    // delete val.pinCode;
    // delete val.state;
    // delete val.mobile1;
    // delete val.mobile2;
    // delete val.emailId;
    // delete val.contactPerson;
    // // taxCategoryName: string;
    // delete val.contactPerson;
    // delete val.ticketNo;
    // delete val.creditDays;
    // delete val.creditLimit;
    // delete val.remarks;
    // delete val.existing;
    // delete val.ExeAddress;
    return val;
  }
  transDataforS(val) {
    // delete val.suppId;
    delete val.suppNo;
    delete val.name;
    delete val.address1;
    delete val.address2;
    delete val.address3;
    delete val.address4;
    delete val.city;
    delete val.pinCode;
    delete val.state;
    delete val.mobile1;
    delete val.mobile2;
    delete val.ticketNo;
    delete val.creditDays;
    delete val.creditLimit;
    delete val.remarks;
    delete val.existing;
    delete val.ExeAddress;
    delete val.existing;
    delete val.ExeAddress;
    return val;
  }

  newsupplierMast() {
    const formValue: IsupplierMaster = this.transData(this.supplierMasterForm.value);
    this.service.SupliMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.supplierMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          this.supplierMasterForm.reset();
        }
      }
    });     
  }  

  updatesupplierMast() {
    const formValue: IsupplierMaster = this.transData(this.supplierMasterForm.value);
    this.service.UpdateSupliMasterById(formValue, formValue.suppId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUILY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.supplierMasterForm.reset();
        }
      }
    });
  };

  resetsupplierMast() {
    window.location.reload();
  }

  closesupplierMast() {
    this.router.navigate(['admin']);
  }

  createSitesupplierMast() { 
    const formValue: IsupplierMaster = this.transDataforS(this.supplierMasterForm.value);
    this.service.SupliMasterSubmitForSite(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.supplierMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          this.supplierMasterForm.reset();
        }
      }
    });     
  }

  Select(suppId: number) {
    let select = this.lstcomments.find(d => d.suppId === suppId);
    if (select) {
      alert(select);
      this.supplierMasterForm.patchValue(select);
      // this.contactPerson = select.supplierSiteMasterList.contactPerson;
      // this.ouId = select.supplierSiteMasterList.ouId;
      this.displayButton = false;
    }
  }
  ExeAddressEvent(e) {
    if (e.target.checked) {
      this.saddress1 = this.address1
      this.saddress2 = this.address2
      this.saddress3 = this.address3
      this.saddress4 = this.address4
      this.scity = this.city
      this.pinCd = this.pinCode
      this.sstate = this.state
    }
    else {
      this.saddress1 = null;
      this.saddress2 = null;
      this.saddress3 = null;
      this.saddress4 = null;
      this.scity = null;
      this.pinCd = null;
      this.sstate = null;
    }
  }

  searchsupplierMast() {
    this.service.getsupplierMastSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  }

  searchBySuppCode(suppNo) {
    this.service.getsearchBySuppCode(suppNo)
      .subscribe(
        data => {
          this.lstcomments = data;
          // this.supplierSiteMasterList= this.lstcomments[0].supplierSiteMasterList
          // console.log(this.supplierSiteMasterList);
                 //  this.array = this.lstcomments.this.supplierSiteMasterList;
                    console.log(this.lstcomments);
          this.supplierMasterForm.patchValue(this.lstcomments);
        }
      );
  }
  searchBySuppId(suppId) {
    this.service.getsearchBySuppCode(suppId)
      .subscribe(
        data => {
          this.lstcommentsId = data;
          console.log(this.lstcommentsId);
          this.supplierMasterForm.patchValue(this.lstcommentsId);
        }
      );
  }
  onOuIdSelected(ouId: any) {
    console.log(ouId);
    this.SearchTaxCat(ouId);

  }
  SearchTaxCat(ouId) {
    // alert(locId);
    this.service.getTaxCat(ouId)
      .subscribe(
        data => {
          this.taxCategoryList = data;
          console.log(this.taxCategoryList);
          // this.allFunction(locId);
        }
      );
  }
}
