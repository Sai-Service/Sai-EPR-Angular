import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { MasterService } from '../master.service';
import { valHooks } from 'jquery';

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
  // state: string;
  state1:string;
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
  // state: string;
  state1:string;
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
  state:string;
  public status = "Active";
  lstcomments: any[];
  submitted = false;
  displayInactive = true;
  display = true;
  Status1: any;
  endDate: Date;
  attribute1:string;
  // ouName:string;
  displayButton = true;
  public minDate = new Date();
  public OUIdList: Array<string> = [];
  public StateList: Array<string> = [];
  public statusList: Array<string> = [];
  public cityList: Array<string> = [];
  public cityList1: any;
  public regionList: Array<string> = [];

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.LocationMasterForm = fb.group({
      locId: [],
      locCode: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(10),Validators.pattern('[a-zA-Z0-9.]*')]],
      locName: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(240),Validators.pattern('[a-zA-Z 0-9]*')]],
      ouId: ['', [Validators.required]],
      address1: ['',[Validators.required, Validators.minLength(5),Validators.maxLength(100),Validators.pattern('[a-zA-Z 0-9]*')]],
      address2: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(100),Validators.pattern('[a-zA-Z 0-9]*')]],
      address3: ['',[Validators.maxLength(250)]],
      address4: ['',[Validators.maxLength(250),]],
      city: ['', [Validators.required]],
      pinCd: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(6),Validators.pattern('[0-9]*')]],
      state1: ['', [Validators.required]],
      country: ['', [Validators.required, Validators.maxLength(50)]],
      phone1: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10),Validators.maxLength(12)]],
      phone2: ['', [Validators.pattern('[0-9]*'),Validators.minLength(10), Validators.maxLength(12)]],
      emailId: ['', [Validators.required, Validators.email,Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      region: ['',[Validators.required]],
      gstNo: ['',[Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}$"),Validators.minLength(15), Validators.maxLength(15)]],
      panNo: ['', [Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$"), Validators.minLength(10),Validators.maxLength(10)]],
      tanNo: [],
      startDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
      endDate: [],
      ouName:[],
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


  savegstNo() {
    const gstaa=this.LocationMasterForm.get('gstNo').value;
     var res = gstaa.substr(2,10);
 this.panNo = res;
   }


  newMast() {
    this.submitted = true;
    if(this.LocationMasterForm.invalid){
    return;
    } 
    const formValue: ILocationMaster = this.transData(this.LocationMasterForm.value);
    this.service.LocationMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // window.location.reload();
        // this.LocationMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert(res.message);
          // this.LocationMasterForm.reset();
          // window.location.reload();
        }
      }
    });
  }

  updateMast() {
    let select = this.lstcomments.find(d => d.ouId.ouName === this.ouName);
    this.ouId =select.ouId.ouId;
    const formValue: ILocationMaster = this.LocationMasterForm.value;
    formValue.ouId=this.ouId;
    this.service.UpdateLocationMasterById(formValue, formValue.locId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          // this.LocationMasterForm.reset();
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
      this.ouName=select.ouId.ouName;
      // this.compName= select.compId.compName;
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
  
  onKey(event: any) {
    const gstNo1 = this.gstNo.substr(3,10);
    this.panNo = gstNo1;
  }

  onOptionsSelectedCity (city: any){
    // alert(city);
    this.service.cityList1(city)
    .subscribe(
      data => {
        this.cityList1 = data;
        console.log(this.cityList1);
        this.state1=this.cityList1.attribute1;
        console.log(this.cityList1.attribute1);
        // this.country = 'INDIA';
      }
    );
  }

}
