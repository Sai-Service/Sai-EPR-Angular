import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { MasterService } from '../master.service';
import {Location} from '@angular/common';

interface IOperatingUnit {
  ouId: number;
  ouName: string;
  ouDesc: string;
  divisionId: number;
  // divId:number;
  compId: number;
  mainBrAdd: string;
  mState: string;
  country:string;
  startDate: Date;
  uheadCeo:string;
  status:string;
  endDate: Date;
}

@Component({
  selector: 'app-organization-master',
  templateUrl: './organization-master.component.html',
  styleUrls: ['./organization-master.component.css']
})
export class OrganizationMasterComponent implements OnInit {
  operatingUnitMasterForm: FormGroup;
  lstcomments: any[];
  submitted = false;
  ouId: number;
  ouName: string;
  ouDesc: string;
  // divId:number;
  divisionId: number;
  compId: number;
  mainBrAdd: string;
  mState: string;
  startDate: Date;
  uheadCeo:string;
  
  public status ="Active"; 
  public country = 'INDIA';
  public minDate = new Date();
  displayButton = true;
  displayInactive = true;
  Status1: any;
  display = true;
  
  endDate: Date;

  public statusList: Array<string> = [];
  public StateList: Array<string> = [];
  public companyCodeList: Array<string> = [];
  public DivisionIDList: Array<string> = [];
  public divisionName : any;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private _location: Location) {
    this.operatingUnitMasterForm = fb.group({
      ouId: [],
      ouName: ['', [Validators.required, Validators.maxLength(50),Validators.pattern('[a-zA-Z ]*')]],
      ouDesc: ['', [Validators.required, Validators.maxLength(50),Validators.pattern('[a-zA-Z ]*')]],
      divisionId: ['', [Validators.required]],
      compId: ['', [Validators.required]],
      mainBrAdd: ['', [Validators.required, Validators.maxLength(35),Validators.pattern('[a-zA-Z ]*')]],
      mState: ['', [Validators.required]],
      country:[],
      startDate: ['', [Validators.required]],
      uheadCeo:['', [Validators.nullValidator,Validators.maxLength(35),Validators.pattern('[a-zA-Z ]*')]],
      status: ['', [Validators.required]],
      endDate:[],
    });
  }
  get f() { return this.operatingUnitMasterForm.controls; }


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
    this.service.companyCodeList()   
    .subscribe(
      data => {
        this.companyCodeList = data;
        console.log(this.companyCodeList);
      }
    );
    this.service.DivisionIDList()  
    .subscribe(
      data => {
        this.DivisionIDList = data;
        console.log(this.DivisionIDList);
      }
    );
  }
  operatingUnitMaster(val) {

  }
  transData(val) {
    // delete val.ouId;
    return val;
  }

  newMast() {
    const formValue: IOperatingUnit = this.transData(this.operatingUnitMasterForm.value);
    this.service.operatingUnitMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.operatingUnitMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          this.operatingUnitMasterForm.reset();
        }
      }
    });
  }

  transUpdateData(val) {
    // delete val.ouId;
    delete val.ouName;
    delete val.ouDesc;
    delete val.divisionId;
    delete val.compId;
    delete val.mainBrAdd;
    delete val.mState;
    delete val.country;
    delete val.startDate;
    delete val.uheadCeo;
    // delete val.status;
    // delete val.endDate;
    return val;
  }
  updateMast() {
    const formValue: IOperatingUnit =this.operatingUnitMasterForm.value;
    this.service.UpdateoperatingUnitMasterById(formValue, formValue.ouId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUILY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.operatingUnitMasterForm.reset();
        }
      }
    });
  };

  resetMast() {
    // alert ('Please Confirm Do you want to Reset')
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }


  backClicked() {
        this._location.back();
      }

  searchMast() {
    this.service.getoperatingUnitSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };

  Select(ouId: number) {
    // alert(companyCode);
    let select = this.lstcomments.find(d => d.ouId === ouId);
    if (select) {
      this.operatingUnitMasterForm.patchValue(select);
      this.divisionId= select.divisionId.divisionId;
      this.compId= select.compId.compId;
      this.mState =select.mState;
      this.displayButton = false;
      this.display = false;
      // this.DivisionIDList=select.divisionId.divisionName;
      this.divisionName=select.divisionId.divisionName;
    }
  }
  onOptionsSelected(event: any) {
    this.Status1 = this.operatingUnitMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.operatingUnitMasterForm.get('endDate').reset();
    }
  }

  
  close(){
    this.router.navigate(['login']);
  }
}
