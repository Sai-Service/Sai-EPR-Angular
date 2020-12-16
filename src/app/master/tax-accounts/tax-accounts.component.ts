import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from '../master.service';

interface IpostPO {
  taxAccountEntityCode: string;
  ouId: number;
  ledgerId: number;
  organizationType: string;
  interimRecoveryCcid: number;
  divisionId: number;
  compId: number;
  locId: number;
  mstate: string;
  uheadCeo: string;
  recoveryCcid: number;
  interimLiablilityCcid: number;
  liablilityCcid: number;
  expenseCcid: number;
  roundingCcid: number;
  suspenseCcid: number;
  confirmFlag: string;
  recordTypeCode: string;
  advRcptSuspenseCcid: number;
  isoSuspenseCcid: number;
  startDate: Date;
  endDate: Date;
  status: string;
}
@Component({
  selector: 'app-tax-accounts',
  templateUrl: './tax-accounts.component.html',
  styleUrls: ['./tax-accounts.component.css']
})
export class TaxAccountsComponent implements OnInit {
  taxAccountMasterForm: FormGroup;
  taxAccountEntityCode: string;
  ouId: number;
  ledgerId: number;
  organizationType: string;
  interimRecoveryCcid: number;
  divisionId: number;
  compId: number;
  locId: number;
  mstate: string;
  uheadCeo: string;
  recoveryCcid: number;
  interimLiablilityCcid: number;
  liablilityCcid: number;
  expenseCcid: number;
  roundingCcid: number;
  suspenseCcid: number;
  confirmFlag: string;
  recordTypeCode: string;
  advRcptSuspenseCcid: number;
  isoSuspenseCcid: number;
  startDate: Date;
  endDate: Date;
  status: string;


  displayButton = true;
  display = true;
  displayInactive = true;
  Status1: any;
  submitted = false;
  public minDate = new Date();
  lstcomments: any[];
  public OUIdList: Array<string> = [];
  public locIdList: Array<string> = [];
  public DivisionIDList: Array<string> = [];
  public companyCodeList: Array<string> = [];
  public StateList: Array<string> = [];
  public statusList: Array<string> = [];

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.taxAccountMasterForm = fb.group({
      taxAccountEntityCode: ['', [Validators.required]],
      ledgerId: ['', [Validators.required]],
      organizationType: [],
      ouId: ['', [Validators.required]],
      interimRecoveryCcid: [],
      divisionId: [],
      compId: [],
      locId: [],
      mstate: [],
      uheadCeo: [],
      recoveryCcid: [],
      interimLiablilityCcid: [],
      liablilityCcid: [],
      expenseCcid: [],
      roundingCcid: [],
      suspenseCcid: [],
      confirmFlag: [],
      recordTypeCode: [],
      advRcptSuspenseCcid: [],
      isoSuspenseCcid: [],
      startDate: [],
      endDate: [],
      status: [],
    });
  }

  get f() { return this.taxAccountMasterForm.controls; }
  ngOnInit(): void {

    this.service.OUIdList()
      .subscribe(
        data => {
          this.OUIdList = data;
          console.log(this.OUIdList);
        }
      );

    this.service.locationIdList()
      .subscribe(
        data => {
          this.locIdList = data;
          console.log(this.locIdList);
        }
      );
    this.service.DivisionIDList()
      .subscribe(
        data => {
          this.DivisionIDList = data;
          console.log(this.DivisionIDList);
        }
      );

    this.service.companyCodeList()
      .subscribe(
        data => {
          this.companyCodeList = data;
          console.log(this.companyCodeList);
        }
      );

    this.service.StateList()
      .subscribe(
        data => {
          this.StateList = data;
          console.log(this.StateList);
        }
      );

    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );
  }

  onOptionsSelected(event: any) {
    this.Status1 = this.taxAccountMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.taxAccountMasterForm.get('endDate').reset();
    }
  }
  taxAccountMaster(taxAccountMasterForm) { }

  Select(ouId: number) {
    // alert(companyCode);
    let select = this.lstcomments.find(d => d.ouId === ouId);
    if (select) {
      this.taxAccountMasterForm.patchValue(select);
      // this.divisionId= select.divisionId.divisionId;
      // this.compId= select.compId.compId;
      // this.mState =select.mState;
      this.displayButton = false;
      this.display = false;
    }
  }

  transData(val) {
    // delete val.ouId;
    return val;
  }

  newMast() {
    const formValue: IpostPO = this.transData(this.taxAccountMasterForm.value);
    this.service.taxAccountMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.taxAccountMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          this.taxAccountMasterForm.reset();
        }
      }
    });
  }

  updateMast() {
    const formValue: IpostPO = this.taxAccountMasterForm.value;
    this.service.UpdatetaxAccountMasterById(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUILY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.taxAccountMasterForm.reset();
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
    this.service.getTaxAccountSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };

}
