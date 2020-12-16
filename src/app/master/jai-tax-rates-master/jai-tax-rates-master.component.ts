import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from '../master.service';

interface IJaiTaxRates {
  taxRateId: number;
  orgId:number;
taxRateName:string;
taxRateCode :string;
taxRateType:string;
taxStatus:string;
recoveryPercentage : number;
taxPercentage: number;
inclusiveFlag :string;
attributeCategory :string;
recordTypeCode :string;
startDate:Date;
endDate:Date;
status:string;
}

@Component({
  selector: 'app-jai-tax-rates-master',
  templateUrl: './jai-tax-rates-master.component.html',
  styleUrls: ['./jai-tax-rates-master.component.css']
})
export class JaiTaxRatesMasterComponent implements OnInit {
  jaiTaxRatesMasterForm: FormGroup;
  taxRateId: number;
  orgId:number;
  taxRateName:string;
  taxRateCode :string;
  taxRateType:string;
  taxStatus:string;
  recoveryPercentage : number;
  taxPercentage: number;
  inclusiveFlag :string;
  attributeCategory :string;
  recordTypeCode :string;
  startDate:Date;
  endDate:Date;

  public statusList: Array<string> = [];
  public OUIdList :Array<string> =[];

  public status = "Active";
  public minDate = new Date();
  displayButton = true;
  displayInactive = true;
  Status1: any;
  display = true;
  submitted = false;
  lstcomments: any[];

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.jaiTaxRatesMasterForm = fb.group({
      taxRateId: [''],
      orgId: ['', [Validators.required]],
      taxRateName: ['', [Validators.required]],
      taxRateCode : ['', [Validators.required]],
      taxRateType: ['', [Validators.required]],
      taxStatus: ['', [Validators.required]],
      recoveryPercentage :['', [Validators.required]],
      taxPercentage: ['', [Validators.required]],
      inclusiveFlag :['', [Validators.required]],
      attributeCategory :['', [Validators.required]],
      recordTypeCode :['', [Validators.required]],
      startDate:['', [Validators.required]],
      endDate:['', [Validators.nullValidator]],
      status:['', [Validators.required]],
    });
  }


  get f() { return this.jaiTaxRatesMasterForm.controls; }
  ngOnInit(): void {
    this.service.statusList()
    .subscribe(
      data => {
        this.statusList = data;
        console.log(this.statusList);
      }
    );
    
    this.service.OUIdList()
      .subscribe(
        data => {
          this.OUIdList = data;
          console.log(this.OUIdList);
        }
      );
  }
  jaiTaxRatesMaster(jaiTaxRatesMasterForm){}

  onOptionsSelected(event: any) {
    this.Status1 = this.jaiTaxRatesMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.jaiTaxRatesMasterForm.get('endDate').reset();
    }
  }

  Select(taxRateId: number) {
    // alert(companyCode);
    let select = this.lstcomments.find(d => d.taxRateId === taxRateId);
    if (select) {
      this.jaiTaxRatesMasterForm.patchValue(select);
      this.displayButton = false;
      this.display = false;
    }
  }

  transData(val) {
    // delete val.ouId;
    return val;
  }

  newMast() {
    const formValue: IJaiTaxRates = this.transData(this.jaiTaxRatesMasterForm.value);
    this.service.jaiTaxRatesMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.jaiTaxRatesMasterForm.reset();   
      } else {                                  
        if (res.code === 400) {
          alert('Data already present in the data base');
          this.jaiTaxRatesMasterForm.reset();
        }
      }
    });
  }

  updateMast() {
    const formValue: IJaiTaxRates = this.jaiTaxRatesMasterForm.value;
    this.service.UpdateJaiTaxRatesMasterById(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUILY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.jaiTaxRatesMasterForm.reset();
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
    this.service.getTaxRateSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };

}
