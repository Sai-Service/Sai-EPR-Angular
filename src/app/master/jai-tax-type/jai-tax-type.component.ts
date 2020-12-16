import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from '../master.service';

interface IJaiTaxType {
  taxTypeId: number;
  taxTypeName: string;
  taxTypeCode: string;
  recoverableFlag: string;
  offsetFlag: string;
  selfAssesedFlag: string;
  reportingOnlyFlag: string;
  updVendorOnTran: string;
  allowAbatement: string;
  reverseCreditOnShipment: string;
  creditBasisSelfAssesed: string;
  recordTypeCode: string;
  wthldTrxApplicableFlag: string;
  startDate: Date;
  endDate: Date;
  status: string;
  regimeId: number;
}

@Component({
  selector: 'app-jai-tax-type',
  templateUrl: './jai-tax-type.component.html',
  styleUrls: ['./jai-tax-type.component.css']
})
export class JaiTaxTypeComponent implements OnInit {
  jaiTaxTypeMasterForm: FormGroup;
  taxTypeId: number;
  taxTypeName: string;
  taxTypeCode: string;
  recoverableFlag: string;
  offsetFlag: string;
  selfAssesedFlag: string;
  reportingOnlyFlag: string;
  updVendorOnTran: string;
  allowAbatement: string;
  reverseCreditOnShipment: string;
  creditBasisSelfAssesed: string;
  recordTypeCode: string;
  wthldTrxApplicableFlag: string;
  startDate: Date;
  endDate: Date;
  regimeId: number;

  public status = "Active";
  public minDate = new Date();
  displayButton = true;
  displayInactive = true;
  Status1: any;
  display = true;
  submitted = false;
  lstcomments: any[];

  public statusList: Array<string> = [];
  public regimeIdList: Array<string> = [];
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.jaiTaxTypeMasterForm = fb.group({
      taxTypeId: [''],
      taxTypeName: ['', [Validators.required]],
      taxTypeCode: ['', [Validators.required]],
      recoverableFlag: ['', [Validators.required]],
      offsetFlag: ['', [Validators.required]],
      selfAssesedFlag: ['', [Validators.required]],
      reportingOnlyFlag: ['', [Validators.required]],
      updVendorOnTran: ['', [Validators.required]],
      allowAbatement: ['', [Validators.required]],
      reverseCreditOnShipment: ['', [Validators.required]],
      creditBasisSelfAssesed: ['', [Validators.required]],
      recordTypeCode: ['', [Validators.required]],
      wthldTrxApplicableFlag: ['', [Validators.required]],
      regimeId: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.nullValidator]],
      status: ['', [Validators.required]],

    });
  }

  get f() { return this.jaiTaxTypeMasterForm.controls; }
  ngOnInit(): void {
    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );

    this.service.getJaiRegimeSearch()
      .subscribe(
        data => {
          this.regimeIdList = data;
          console.log(this.regimeIdList);
        }
      );
  }

  jaiTaxTypeMaster(jaiTaxTypeMasterForm) { }

  onOptionsSelected(event: any) {
    this.Status1 = this.jaiTaxTypeMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.jaiTaxTypeMasterForm.get('endDate').reset();
    }
  }

  Select(taxTypeId: number) {
    // alert(companyCode);
    let select = this.lstcomments.find(d => d.taxTypeId === taxTypeId);
    if (select) {
      this.jaiTaxTypeMasterForm.patchValue(select);
      this.displayButton = false;
      this.display = false;
    }
  }

  transData(val) {
    // delete val.ouId;
    return val;
  }

  newMast() {
    const formValue: IJaiTaxType = this.transData(this.jaiTaxTypeMasterForm.value);
    this.service.jaiTaxTypeMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.jaiTaxTypeMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          this.jaiTaxTypeMasterForm.reset();
        }
      }
    });
  }

  updateMast() {
    const formValue: IJaiTaxType = this.jaiTaxTypeMasterForm.value;
    this.service.UpdateJaiTaxTypeMasterById(formValue, formValue.taxTypeId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUILY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.jaiTaxTypeMasterForm.reset();
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
    this.service.getTaxTypeSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };


}
