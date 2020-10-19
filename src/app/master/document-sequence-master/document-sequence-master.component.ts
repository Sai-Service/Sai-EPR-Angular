import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { MasterService } from '../master.service';


interface IserialMaster {
  docSrlId: number;
  docSrlNo: number;
  deptId: string;
  // locId:string;
  divisionId: number;
  recvTypeId: number;
  financialYear: string;
  docSrlPrefix: string;
  status: string
  docSrlType: string;
  docSrlOu: number;
  docSrlLoc: number;
  startDate: Date;
  endDate: Date
}

@Component({
  selector: 'app-document-sequence-master',
  templateUrl: './document-sequence-master.component.html',
  styleUrls: ['./document-sequence-master.component.css']
})
export class DocumentSequenceMasterComponent implements OnInit {

  DocSeriealMasterForm: FormGroup;
  submitted = false;
  docSrlId: number;
  docSrlNo: number;
  deptId: string;
  // locId:string;
  divisionId: number;
  recvTypeId: number;
  financialYear: string;
  docSrlPrefix: string;
  docSrlType: string;
  docSrlOu: number;
  docSrlLoc: number;
  startDate: Date;
  endDate: Date

  public status = "Active";
  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  lstcomments: any[];
  display = true;
  displayButton = true;
  public minDate = new Date();
  public statusList: Array<string> = [];
  public recvTypeIdList: Array<string> = [];
  public DepartmentList: Array<string> = [];
  public locIdList: Array<string> = [];
  public DivisionIDList: Array<string> = [];
  public ouIdList: Array<string>[];

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.DocSeriealMasterForm = fb.group({
      docSrlId: [''],
      docSrlNo: ['', [Validators.required]],
      deptId: ['', [Validators.required]],
      // locId: ['', [Validators.required]],
      divisionId: ['', [Validators.required]],
      recvTypeId: ['', [Validators.required]],
      financialYear: ['', [Validators.required]],
      docSrlPrefix: ['', [Validators.required]],
      status: ['', [Validators.required]],
      docSrlType: ['', [Validators.required]],
      docSrlOu: ['', [Validators.required]],
      docSrlLoc: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: [],
    })
  }

  get f() { return this.DocSeriealMasterForm.controls; }

  ngOnInit(): void {
    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );
    this.service.recvTypeIdList()
      .subscribe(
        data => {
          this.recvTypeIdList = data;
          console.log(this.recvTypeIdList);
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
    this.service.DepartmentList()
      .subscribe(
        data => {
          this.DepartmentList = data;
          console.log(this.DepartmentList);
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

  DocSeriealMaster(DocSeriealMasterForm: any) {
  }
  onOptionsSelected(event: any) {
    this.Status1 = this.DocSeriealMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.DocSeriealMasterForm.get('endDate').reset();
    }
  }
  transData(val) {
    delete val.docSrlId;
    return val;
  }

  newMast() {
    const formValue: IserialMaster = this.transData(this.DocSeriealMasterForm.value);
    this.service.docSeqMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.DocSeriealMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          this.DocSeriealMasterForm.reset();
        }
      }
    });
  }

  updateMast() {
    const formValue: IserialMaster = this.DocSeriealMasterForm.value;
    this.service.UpdatedocSeqMasterById(formValue, formValue.docSrlId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUILY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.DocSeriealMasterForm.reset();
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
    this.service.getdocSeqSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };

  Select(docSrlId: number) {
    let select = this.lstcomments.find(d => d.docSrlId === docSrlId);
    if (select) {
      this.DocSeriealMasterForm.patchValue(select);
      this.displayButton = false;
      this.display = false;
    }
  }


}
