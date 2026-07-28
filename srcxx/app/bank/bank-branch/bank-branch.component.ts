import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../../master/master.service';
import { BankService } from '../bank.service';
import { DatePipe, Location } from '@angular/common';

interface IbankBranch {
  branchId: number;
  branchName: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  county: string;
  pinCode: number;
  state: string;
  contact1: number;
  contact2: number;
  startDate: Date;
  endDate: Date;
  status: string;
  customerId: number;
  custName: string;
  branchNo: string;
  bankType: string;
  emailId: string;
}

@Component({
  selector: 'app-bank-branch',
  templateUrl: './bank-branch.component.html',
  styleUrls: ['./bank-branch.component.css']
})
export class BankBranchComponent implements OnInit {
  bankBranchForm: FormGroup;
  branchId?: number;
  branchName?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  county: string = 'India';
  pinCode?: number;
  state?: string;
  contact1?: number;
  contact2?: number;
  startDate?: number;
  endDate?: Date;
  public status = "Active";
  customerId?: number;
  custName?: string;
  bankId?: number;
  bkName?: string;
  bkBranchName?: string;
  branchNO?: string;
  branchNo?: string;
  bankType: string = 'OTHER';
  emailId?: string;
  submitted = false;
  displayInactive = true;

     private datePipe = new DatePipe('en-US');
  minDate: string;
  public cityList:any=[];
  public statusList: any=[];
  public BranchSearch: any;
  public BankNameList: any;
  public statList: any;
  Status1: any;
  branchList: any[] = [];
  isSaving = false;
  isUpdating = true;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private service1: BankService) {
    this.bankBranchForm = fb.group({
      bkName: ['', [Validators.nullValidator]],
      bankId: ['', Validators.nullValidator],
      bkBranchName: ['', [Validators.nullValidator]],
      branchNO: ['', [Validators.nullValidator]],
      branchId: ['', [Validators.nullValidator]],
      branchName: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.nullValidator]],
      address3: ['', [Validators.nullValidator]],
      city: ['', [Validators.required]],
      county: ['', [Validators.required]],
      pinCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]*')]],
      state: ['', [Validators.required]],
      contact1: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(12)]],
      contact2: ['', [Validators.nullValidator, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(12)]],
      startDate:     [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      endDate: ['', [Validators.nullValidator]],
      status: ['', [Validators.required]],
      customerId: ['', [Validators.nullValidator]],
      custName: ['', [Validators.required]],
      branchNo: ['', [Validators.required]],
      bankType: ['', [Validators.required]],
    });
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
  }

  get f() { return this.bankBranchForm.controls; }

  Orgmaster(bankBranchForm: any) {
    this.submitted = true;
    console.log(bankBranchForm);
    if (this.bankBranchForm.invalid) {
      return;
    }
  }

  ngOnInit(): void {
    this.service.cityList()
      .subscribe(
        data => {
          this.cityList = data;
          console.log(this.cityList);
        }
      );
    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );

    this.service1.BankNameListFn()
      .subscribe(
        data => {
          this.BankNameList = data;
          console.log(this.BankNameList)
        }
      );
  }

  

onBankNameSelected(bankId: any) {

  if (!bankId) return;

  this.bankId = Number(bankId);
   


  console.log("Selected Bank ID:", this.bankId);
    const selectedBank = this.BankNameList.find(
    (bank: any) => Number(bank.customerId) === this.bankId
  );

  if (selectedBank) {
    // ✅ Patch custName into form
    this.bankBranchForm.patchValue({
      custName: selectedBank.custName
    });

    console.log("Patched Bank Name:", selectedBank.custName);
  }

  this.service1.getBranchesByBankId(this.bankId)
    .subscribe((res: any) => {

      if (res?.code === 200) {
        this.branchList = res.obj;
        console.log("Branches:", this.branchList);
      }

    });
}


onBranchSelected(branchName: string) {

  const selectedBranch = this.branchList.find(
    (b: any) => b.branchName === branchName
  );

  if (selectedBranch) {
    this.bankBranchForm.patchValue({
      branchNO: selectedBranch.branchNo || ''
    });
  }
}



  onOptionsSelected(event: any) {
    this.Status1 = this.bankBranchForm.get('status')?.value;
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.displayInactive = true;
      this.bankBranchForm.get('endDate')?.reset();
    }
  }

  // onOptionsSelectedCity(city: any) {
  //   this.service.cityList1(city)
  //     .subscribe(
  //       data => {
  //         this.statList = data;
  //         this.state = this.statList.attribute1;
  //         console.log(this.statList.attribute1);
  //       }
  //     );
  // }

  onOptionsSelectedCity(city: any) {

  this.service.cityList1(city)
    .subscribe((data: any) => {

      if (!data) {
        console.log("No data returned from API");
        return;
      }

      this.statList = data;

      if (this.statList?.attribute1) {
        this.state = this.statList.attribute1;
        console.log(this.statList.attribute1);
      } else {
        console.log("attribute1 not found in response");
      }

    });
}

  

  BreanchNameSearch(bkBranchName:any) {
    this.service1.BranchSearchFn(bkBranchName)
      .subscribe(
        data => {
          this.BranchSearch = data;
          console.log(this.BranchSearch);
        }
      );
  }

  serchByBranchNo(branchNO:any) {
    this.service1.BranchNumberSearchFn(branchNO)
      .subscribe(
        data => {
          this.BranchSearch = data;
          console.log(this.BranchSearch);
        }
      );
  }

  bankBranch(bankBranchForm:any) { }

  serchByBanhName(bkName:any) { }

  serchByBnkBranchName(bkBranchName:any) { }

  SelectBranchNO(branchNo:any) {
    let select = this.BranchSearch.find((d: { branchNo: any; }) => d.branchNo === branchNo);
    if (select) {
      this.bankBranchForm.patchValue(select);
      this.isSaving = true;
      this.isUpdating = false;
    }

   if (select) {
    this.bankBranchForm.patchValue({
      ...select,
      bankId: select.bankId?.customerId   // 👈 THIS IS THE FIX
    });

    console.log("Patched bankId:", select.bankId?.customerId);
  }
  }

  AccountCreation() {
    this.router.navigate(['newBank']);
  }

  close() { this.router.navigate(['admin']); }

  refresh() { window.location.reload(); }

  BankBranch() {

    const formValue: IbankBranch = this.bankBranchForm.value;
    this.service1.BankBranchCreation(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('BRANCH INSERTED SUCCESSFULLY');
        window.location.reload();
        this.isSaving = true;
      } else {
        if (res.code === 400) {
          alert('ERROR WHILE INSERTING BRANCH');
          // window.location.reload();
        }
      }
    });
  }

//   BankBranchupdate() {
//      const formValue: IbankBranch = this.bankBranchForm.value;
//   const payload = {
//     ...formValue,
//     bankId: Number(formValue.bankId)   // ✅ correct
//   };
//     this.service.BankBranchupdation(formValue).subscribe((res: any) => {
//       if (res.code === 200) {
//         alert('BRANCH UPDATED SUCCESSFULLY');
//         window.location.reload();
//       } else {
//         if (res.code === 400) {
//           alert('ERROR WHILE UPDATING BRANCH');
//           // window.location.reload();
//         }
//       }
//     });
  
// }

BankBranchupdate() {

  const form = this.bankBranchForm.value;



  const payload = {
    branchId: form.branchId,
    branchName: form.branchName,
    address1: form.address1,
    address2: form.address2,
    address3: form.address3,
    city: form.city,
    pinCode: Number(form.pinCode),
    state: form.state,
    contact1: form.contact1,
    contact2: form.contact2,
    startDate: form.startDate,
    endDate: form.endDate,
    status: form.status,
    bankType: form.bankType,
    branchNo: form.branchNo,
    emailId: form.emailId,
    country: form.county,
    bankId: Number(form.bankId)   // 🔥 FORCE INTEGER
  };

  console.log("FINAL PAYLOAD:", JSON.stringify(payload));

  this.service1.BankBranchupdation(payload)
    .subscribe((res: any) => {
      if (res.code === 200) {
        alert('BRANCH UPDATED SUCCESSFULLY');
        window.location.reload();
        this.isUpdating = true;
      } else {
        alert('ERROR WHILE UPDATING BRANCH');
      }
    });
}
}
