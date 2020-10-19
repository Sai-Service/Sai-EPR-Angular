import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { MasterService } from '../master.service';

interface ICompany {
  compId: number;
  compCode: string;
  compName: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  pinCd: number;
  state: string;
  emailId: string;
  webSite: string;
  startDate: Date;
  country: string;
  endDate: Date;
  status: string;
}

@Component({
  selector: 'app-company-master',
  templateUrl: './company-master.component.html',
  styleUrls: ['./company-master.component.css']
})
export class CompanyMasterComponent implements OnInit {
  CompanyMasterForm: FormGroup;
  compId: number;
  compCode: string;
  compName: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  pinCd: number;
  state: string;
  emailId: string;
  webSite: string;
  startDate: Date;
  public status ="Active"; 
  public country = 'INDIA';
  public minDate = new Date();
  endDate: Date;
  submitted = false;

  displayButton = true;
  displayInactive = true;
  display = true;
  Status1: any;
  lstcomments: any[];
  public StateList: Array<string> = []; 
  public statusList: Array<string> = [];
  public cityList: Array<string> = [];


  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.CompanyMasterForm = fb.group({
      compId: [],
      compCode: ['', [Validators.required, Validators.maxLength(30)]],
      compName: ['', [Validators.required, Validators.maxLength(30)]],
      address1: ['', [Validators.required, Validators.maxLength(30)]],
      address2: ['', [Validators.required, Validators.maxLength(30)]],
      address3: ['', [Validators.required, Validators.maxLength(30)]],
      address4: ['', [Validators.required, Validators.maxLength(30)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      pinCd: ['', [Validators.required, , Validators.pattern('[0-9]*'), Validators.maxLength(6)]],
      state: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email]],
      webSite: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      country: ['', [Validators.required]],
      status: ['', [Validators.required]],
      endDate: [],
    });
  }

  get f() { return this.CompanyMasterForm.controls; }

  ngOnInit(): void {
    this.service.statusList()
    .subscribe(
      data => {
        this.statusList = data;
        console.log(this.statusList);
      }
    );
    this.service.StateList()  
    .subscribe(
      data => {
        this.StateList = data;
        console.log(this.StateList);
        this.country = 'INDIA';
      }
    );  
    this.service.cityList()  
    .subscribe(
      data => {
        this.cityList = data;
        console.log(this.cityList);
        this.country = 'INDIA';
      }
    ); 
  }


  CompanyMaster(val) {

  }
  transData(val) {
    delete val.compId;
    return val;
  }

  newMast() {
    const formValue: ICompany = this.transData(this.CompanyMasterForm.value);
    this.service.CompanyMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.CompanyMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          this.CompanyMasterForm.reset();
        }
      }
    });
  }

  updateMast() {
    const formValue: ICompany = this.CompanyMasterForm.value;
    this.service.UpdateCompanyMasterById(formValue, formValue.compId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUILY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.CompanyMasterForm.reset();
        }
      }
    });
  };

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  searchMast() {
    this.service.getcompanySearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };

  Select(compId: number) {
    // alert(companyCode);
    let select = this.lstcomments.find(d => d.compId === compId);
    if (select) {
      this.CompanyMasterForm.patchValue(select);
      this.displayButton = false;
      this.display = false;
    }
  }

  onOptionsSelected(event: any) {
    this.Status1 = this.CompanyMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.CompanyMasterForm.get('endDate').reset();
    }
  }
}
