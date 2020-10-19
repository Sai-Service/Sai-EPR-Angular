import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { MasterService } from '../master.service';

interface ILocationMaster {
  locId: number;
  locCode: string;
  locName: string;
  ouId: number;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  pinCd: number;
  state: string;
  country: string;
  phone1: number;
  phone2: number;
  emailId: string;
  region: string;
  gstNo: string;
  panNo: string;
  tanNo: string;
  startDate: Date;
  status: string;
  endDate: Date;
}

@Component({
  selector: 'app-location-master',
  templateUrl: './location-master.component.html',
  styleUrls: ['./location-master.component.css']
})
export class LocationMasterComponent implements OnInit {
  LocationMasterForm: FormGroup;
  locId: number;
  locCode: string;
  locName: string;
  ouId: number;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  pinCd: number;
  state: string;
  public country = 'INDIA';
  phone1: number;
  phone2: number;
  emailId: string;
  region: string;
  gstNo: string;
  panNo: string;
  tanNo: string;
  ouName: string;
  startDate: Date;
  public status = "Active";
  lstcomments: any[];
  submitted = false;
  displayInactive = true;
  display = true;
  Status1: any;
  endDate: Date;
  displayButton = true;
  public minDate = new Date();
  public OUIdList: Array<string> = [];
  public StateList: Array<string> = [];
  public statusList: Array<string> = [];
  public cityList: Array<string> = [];
  public regionList: Array<string> = [];

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.LocationMasterForm = fb.group({
      locId: [],
      locCode: ['', [Validators.required, Validators.maxLength(10)]],
      locName: ['', [Validators.required, Validators.maxLength(50)]],
      ouId: ['', [Validators.required]],
      address1: ['', [Validators.required, Validators.maxLength(50)]],
      address2: [''],
      address3: [''],
      address4: [''],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      pinCd: ['', [Validators.required, Validators.maxLength(6)]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required, Validators.maxLength(50)]],
      phone1: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      phone2: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
      emailId: ['', [Validators.required, Validators.email]],
      region: [],
      // gstNo: ['', [Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}$"), Validators.maxLength(15)]],
      gstNo: [],
      panNo: ['', [Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$"), Validators.maxLength(10)]],
      tanNo: [],
      startDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
      endDate: [],
    });
  }
  get f() { return this.LocationMasterForm.controls; }
  Orgmaster(LocationMasterForm: any) {
    this.submitted = true;
    console.log(LocationMasterForm);
    if (this.LocationMasterForm.invalid) {
      return;
    }
  }
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
        }
      );

    this.service.OUIdList()
      .subscribe(
        data => {
          this.OUIdList = data;
          console.log(this.OUIdList);
        }
      );

    this.service.cityList()
      .subscribe(
        data => {
          this.cityList = data;
          console.log(this.cityList);
          // this.country = 'INDIA';
        }
      );

    this.service.regionList()
      .subscribe(
        data => {
          this.regionList = data;
          console.log(this.regionList);
        }
      );
  }

  LocationMaster(val) {

  }
  transData(val) {
    delete val.locId;
    return val;
  }

  newMast() {
    const formValue: ILocationMaster = this.transData(this.LocationMasterForm.value);
    this.service.LocationMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.LocationMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          this.LocationMasterForm.reset();
        }
      }
    });
  }

  updateMast() {
    const formValue: ILocationMaster = this.LocationMasterForm.value;
    this.service.UpdateLocationMasterById(formValue, formValue.locId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUILY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.LocationMasterForm.reset();
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
    this.service.getLocationSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };

  Select(locId: number) {
    // alert(companyCode);
    let select = this.lstcomments.find(d => d.locId === locId);
    if (select) {
      console.log(select);
      this.LocationMasterForm.patchValue(select);
      this.displayButton = false;
      this.display = false;
      this.ouId = select.ouId.divisionId.ouId;
    }
  }

  onOptionsSelected(event: any) {
    this.Status1 = this.LocationMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.LocationMasterForm.get('endDate').reset();
    }
  }

}
