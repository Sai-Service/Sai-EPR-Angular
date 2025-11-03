import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MastersService } from '../masters.service';

@Component({
  selector: 'app-comapany-master',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './comapany-master.component.html',
  styleUrl: './comapany-master.component.css'
})
export class ComapanyMasterComponent {
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
  public statusList:any [];
  public cityList: any [];
  public cityList1: any;


  constructor(private fb: FormBuilder, private router: Router, private service: MastersService) {
    this.CompanyMasterForm = fb.group({
      compId: [],
      compCode: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(10),Validators.pattern('[a-zA-Z 0-9]*')]],
      compName: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(50),Validators.pattern('[a-zA-Z 0-9]*')]],
      address1: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(100)]],
      address2: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(100)]],
      address3: ['', [Validators.maxLength(45)]],
      address4: ['', [Validators.maxLength(45)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      pinCd: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(6),Validators.pattern('[0-9]*')]],
      state: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email,Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      webSite: ['', [Validators.required,Validators.pattern('([\\DA-Zda-z.-]+)\\.([A-Za-z.]{2,6})[/\\wW .-]*/?')]],
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
      (data:any) => {
        this.statusList = data;
        console.log(this.statusList);
      }
    );
    this.service.StateList()  
    .subscribe(
      (data:any) => {
        this.StateList = data;
        console.log(this.StateList);
        this.country = 'INDIA';
      }
    );  
    this.service.cityList()  
    .subscribe(
      (data:any) => {
        this.cityList = data;
        console.log(this.cityList);
        this.country = 'INDIA';
      }
    ); 
  }


  CompanyMaster(val:any) {

  }
  transData(val:any) {
    delete val.RegNo;
    delete val.RegNo1;
    delete val.RegNo2;
    delete val.mcpId;
    return val;
  }

  newMast() {
    this.submitted = true;
    if(this.CompanyMasterForm.invalid){
    return;
    }
    const formValue= this.transData(this.CompanyMasterForm.value);
    this.service.CompanyMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
        // this.CompanyMasterForm.reset();
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          // this.CompanyMasterForm.reset();
          window.location.reload();
        }
      }
    });
  }

  updateMast() {
    const formValue= this.CompanyMasterForm.value;
    this.service.UpdateCompanyMasterById(formValue, formValue.compId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          // this.CompanyMasterForm.reset();
          window.location.reload();
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
        (data:any) => {
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
    this.Status1 = this.CompanyMasterForm.get('status')?.value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.CompanyMasterForm.get('endDate')?.reset();
    }
  }

  onOptionsSelectedCity (city: any){
    // alert(city);
    this.service.cityList1(city.target.value)
    .subscribe(
      (data:any) => {
        this.cityList1 = data;
        console.log(this.cityList1);
        this.state=this.cityList1.attribute1;
        console.log(this.cityList1.attribute1);
        // this.country = 'INDIA';
      }
    );
  }
}
