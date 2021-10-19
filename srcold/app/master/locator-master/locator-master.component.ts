import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';

interface ILocatorMaster {
  locatorId: number;
  locId: number;
  subinventoryId: string;
  segment1: string;
  segment2: string;
  segment3: string;
  segment4: string;
  segment5: string;
  segmentName: string;
  status: string;
  endDate: Date;
  // copyAddv:string;
}

@Component({
  selector: 'app-locator-master',
  templateUrl: './locator-master.component.html',
  styleUrls: ['./locator-master.component.css']
})
export class LocatorMasterComponent implements OnInit {
  locatorMasterForm: FormGroup;
  submitted = false;
  locatorId: number;
  locId: number;
  subinventoryId: string;
  segment1: string;
  segment2: string;
  segment3: string;
  segment4: string;
  segment5: string;
  segmentName: string;
  // copyAddv:string;

  endDate: Date;
  public status = "Active";
  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  lstcomments: any[];
  display = true;
  displayButton = true;
  public minDate = new Date();
  public statusList: Array<string> = [];
  public locationIdList: Array<string> = [];
  public subinventoryIdList: Array<string> = [];

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.locatorMasterForm = fb.group({
      locatorId :[],
      locId: ['', [Validators.required]],
      subinventoryId: ['', [Validators.required]],
      segment1: ['', [Validators.required], [ Validators.maxLength(5)], Validators.pattern('[A-Z0-9.]*')],
      segment2: ['', [Validators.required], [ Validators.maxLength(5)], Validators.pattern('[A-Z0-9.]*')],
      segment3: ['', [Validators.required], [ Validators.maxLength(5)], Validators.pattern('[A-Z0-9.]*')],
      segment4: ['', [Validators.required], [ Validators.maxLength(5)], Validators.pattern('[A-Z0-9.]*')],
      segment5: ['', [Validators.required], [ Validators.maxLength(5)], Validators.pattern('[A-Z0-9.]*')],
      status: ['', [Validators.required]],
      endDate: ['', [Validators.nullValidator]],
      segmentName:[],
      // copyAddv:[],
    });
  }

  get f() { return this.locatorMasterForm.controls; }


  ngOnInit(): void {
    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );

    this.service.locationIdList1(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.locationIdList = data;
          console.log(this.locationIdList);
        }
      );
    this.service.subinventoryIdList1(sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          this.subinventoryIdList = data;
          console.log(this.subinventoryIdList);
        }
      );
  }

  locatorMaster(locatorMasterForm: any) {

  }

  // copyAdd(e) {
  //   if (e.target.checked) {
  //   this.copyAddv='Y'
  //   }
  //   else{
  //     this.copyAddv = 'N';
  //   }
  // }

  onOptionsSelected(event: any) {
    this.Status1 = this.locatorMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.locatorMasterForm.get('endDate').reset();
    }
  }

  onKey(event: any) {
    var segment1=this.locatorMasterForm.get('segment1').value;
    var segment2=this.locatorMasterForm.get('segment2').value;
    var segment3=this.locatorMasterForm.get('segment3').value;
    var segment4=this.locatorMasterForm.get('segment4').value;
    var segment5=this.locatorMasterForm.get('segment5').value;
    // alert(segment1 + '.' + segment2 + '.' + segment3 + '.' + segment4 + '.' + segment5);
    // var segment1=this.locatorMasterForm.get('')
    const aaa = segment1 + '.' + segment2 + '.' + segment3 + '.' + segment4 + '.' + segment5;
    // this.segmentName = aaa;
    this.locatorMasterForm.patchValue({segmentName:aaa})
  }
  transData(val) {
    delete val.locatorId;
    return val;
  }

  newMast() {
    this.submitted = true;
    if(this.locatorMasterForm.invalid){
      return;
    }
    const formValue: ILocatorMaster = this.transData(this.locatorMasterForm.value);
    this.service.LocatorMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
        // this.locatorMasterForm.reset();
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          // this.locatorMasterForm.reset();
          // window.location.reload();
        }
      }
    });
  }

  updateMast() {
    const formValue: ILocatorMaster = this.locatorMasterForm.value;
    this.service.UpdateLocatorMasterById(formValue, formValue.locatorId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.locatorMasterForm.reset();
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
    this.service.getLocatorMasterSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };

  Select(locatorId: number) {
    let select = this.lstcomments.find(d => d.locatorId === locatorId);
    if (select) {
      this.locatorMasterForm.patchValue(select);
      this.displayButton = false;
      this.display = false;
    }
  }




}
