import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import{ BankService} from '../bank.service';
import { DatePipe, Location } from '@angular/common';

interface IbankDetails{
  custName:string;
branchId:number;  
branchNumber:string;
branchName:string;
  customerId:number;
  bankAccountName:string;
  status :string ;
  bankAccountNo:number;
  currancyCode: string;
 description:string;
  shortAccountName:string;
  multiCurrAllowedFlag:string;
  paymentMultiCurrFlag:string;
receiptMultiCurrFlag:string;
 zeroAmtAllowed:string;
 maxCheckAmt:number;
 minCheckAmt:number;
  bankAccountType:string;
  ownerPartyId:number;
  startDate:number;
  endDate:string;
}

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {
  bankCreationForm: FormGroup;
  custName?: string;
  branchId?: number;
  branchNo?: string;
  branchName?: string;
  bankAccountName?: string;
  status: string = 'Active';
  bankAccountNo?: number;
  currancyCode?: "INR";
  description?: string;
  shortAccountName?: string;
  multiCurrAllowedFlag?: string;
  paymentMultiCurrFlag?: string;
  receiptMultiCurrFlag?: string;
  zeroAmtAllowed?: string;
  maxCheckAmt?: number;
  minCheckAmt?: number;
  bankAccountType?: string;
  ownerPartyId?: number;
  startDate?: number;
  endDate?: string;
  customerId?: number;
  bankId?: number;
  bkName?: string;
  bkBranchName?: string;
    private datePipe = new DatePipe('en-US');
  minDate: string;

  public BankAcccount: Array<string> = [];
  public BankBranchList: any=[];
  public BankBranchListHeder: any=[];
  public BankNameList: any;
  public BankNameList1: any;
  bankAccountSearchList: any[] = [];
  isSave = false;
  isUpdate = true;

  constructor(private fb: FormBuilder, private router: Router, private service: BankService) {
    this.bankCreationForm = fb.group({
      bankAccountId: [''], 
      custName: ['', [Validators.required]],
      branchId: ['', [Validators.required]],
      branchNo: [],
      branchName: ['', [Validators.required]],
      customerId: [''],
      bankId: [''],
      bkName: [''],
      bkBranchName: [''],
      bankAccountName: ['', [Validators.required]],
      status: ['Active', Validators.required],
      bankAccountNo: ['', Validators.required],
      currancyCode: ['', Validators.required],
      description: ['', Validators.required],
      shortAccountName: ['', Validators.nullValidator],
      multiCurrAllowedFlag: [''],
      paymentMultiCurrFlag: [''],
      receiptMultiCurrFlag: [''],
      zeroAmtAllowed: [''],
      maxCheckAmt: [''],
      minCheckAmt: [''],
      bankAccountType: [''],
      ownerPartyId: [''],
      startDate:     [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      endDate: ['', Validators.nullValidator],
    })
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
  }

  ngOnInit(): void {
    this.service.BankNameList()
      .subscribe(
        data => {
          this.BankNameList1 = data;
          console.log(this.BankNameList1);
        }
      );

    this.service.BankNameListFn()
      .subscribe(
        data => {
          this.BankNameList = data;
          console.log(this.BankNameList);
        }
      );
  }

  multiCurrAllowedFlagFn(e: any) {
    if (e.target.checked === true) {
      this.multiCurrAllowedFlag = 'Y'
    }
    if (e.target.checked === false) {
      this.multiCurrAllowedFlag = 'N'
    }
  }

  paymentMultiCurrFlagFn(e: any) {
    if (e.target.checked === true) {
      this.paymentMultiCurrFlag = 'Y'
    }
    if (e.target.checked === false) {
      this.paymentMultiCurrFlag = 'N'
    }
  }

  receiptMultiCurrFlagFn(e: any) {
    if (e.target.checked === true) {
      this.receiptMultiCurrFlag = 'Y'
    }
    if (e.target.checked === false) {
      this.receiptMultiCurrFlag = 'N'
    }
  }

  zeroAmtAllowedFn(e: any) {
    if (e.target.checked === true) {
      this.zeroAmtAllowed = 'Y'
    }
    if (e.target.checked === false) {
      this.zeroAmtAllowed = 'N'
    }
  }

  BreanchAccountSearch(bkBranchName: any, bkName: any) {
    alert('bkBranchName ' + bkBranchName + ' bkName' + bkName)
    this.service.BankAcccountList(bkBranchName, bkName)
      .subscribe(
        data => {
          this.BankAcccount = data;
          console.log(this.BankAcccount);
        }
      );
  }

  // selectCustId(bankName: any) {
  //   const selectedBank = this.BankNameList.find(
  //     (d: any) => d.custName === bankName
  //   );

  //   this.bankCreationForm
  //     .get('bankId')
  //     ?.setValue(selectedBank.customerId);
  // }

  selectCustId(bankName: any) {
  // ✅ Guard: skip if list not ready or empty value
  if (!this.BankNameList || !bankName || bankName === '--Select--') return;

  const selectedBank = this.BankNameList.find(
    (d: any) => d.custName === bankName
  );

  if (!selectedBank) return; // ✅ Guard: skip if not found

  this.bankCreationForm
    .get('bankId')
    ?.setValue(selectedBank.customerId);
}

onbranchIdSelected(branchName: any) {
  // ✅ Guard: skip if list not ready or empty value
  if (!this.BankBranchList || !branchName || branchName === '--Select--') return;

  const select = this.BankBranchList.find((d: any) => d.name === branchName);

  if (!select) return; // ✅ Guard: skip if not found

  console.log(select);
  this.branchNo = select.name2;
  this.branchId = select.id;
}

  // onBankNameSelectedHeder(BkName: any) {
  //   this.service.BankBranchList(BkName)
  //     .subscribe(
  //       data => {
  //         this.BankBranchListHeder = data.obj;
  //         console.log(this.BankBranchListHeder);
  //       }
  //     );
  // }
 // BankBranchListHeder: any[] = [];

onBankNameSelectedHeder(bankId: any) {

  if (!bankId) return;

  this.service.BankBranchList1(bankId)
    .subscribe(res => {

      if (res.code === 200) {
        this.BankBranchListHeder = res.obj;
      }

      console.log(this.BankBranchListHeder);
    });
}

  onBankNameSelected1(BkName: any) {
    this.service.BankBranchList(BkName)
      .subscribe(
        data => {
          this.BankBranchList = data.obj;
          console.log(this.BankBranchList);
        }
      );
  }

//   searchBankAccount() {

//   const accountName = this.bankCreationForm.get('bkBranchName')?.value;

//   if (!accountName) {
//     alert("Please select Account Name");
//     return;
//   }

//   this.service.getBankAccountDetails(accountName)
//     .subscribe(res => {

//       console.log("Account Details:", res);

//       // Example: patch form
//       if (res && res.length > 0) {
//         const data = res[0];

//         this.bankCreationForm.patchValue({
//           accountNo: data.bankAccountNo,
//           currency: data.currancyCode,
//           status: data.status
//         });
//       }
//     });
// }

searchBankAccount() {

  const accountName = this.bankCreationForm.get('bkBranchName')?.value;

  if (!accountName) {
    alert("Please select Account Name");
    return;
  }

  this.service.getBankAccountDetails(accountName)
    .subscribe((res: any[]) => {

      this.bankAccountSearchList = res;   // store full list

      console.log("Search Result:", this.bankAccountSearchList);
    });
}



selectAccount(acc: any) {


  console.log("Selected Row:", acc);

  this.isSave = true;
  this.isUpdate = false;

  this.custName = acc.bankId?.custName;
  this.bankId   = acc.bankId?.customerId;

  // ✅ Patch bank without triggering ngModelChange events
  this.bankCreationForm.patchValue({
    custName: acc.bankId?.custName,
    bankId:   acc.bankId?.customerId,
  }, { emitEvent: false });

  this.service.BankBranchList(acc.bankId?.custName)
    .subscribe(data => {
      this.BankBranchList = data.obj;

      const matchedBranch = this.BankBranchList.find(
        (b: any) => b.name === acc.branchId?.branchName
      );
      console.log("Matched Branch:", matchedBranch);

      this.branchName = matchedBranch?.name || acc.branchId?.branchName || '';
      this.branchNo   = acc.branchId?.branchNo || '';
      this.branchId   = matchedBranch?.id || '';

      // ✅ Patch all fields with emitEvent: false to prevent cascading triggers
      this.bankCreationForm.patchValue({
        branchName: this.branchName,
        branchNo:   this.branchNo,
        branchId:   this.branchId,
        bankAccountId: acc.bankAccountId,
        bankAccountName:  acc.bankAccountName,
        bankAccountNo:    acc.bankAccountNo,
        bankAccountType:  acc.bankAccountType,
        currancyCode:     acc.currancyCode,
        description:      acc.description,
        maxCheckAmt:      acc.maxCheckAmt,
        minCheckAmt:      acc.minCheckAmt,
        status:           acc.status,
        startDate:        acc.startDate,
        endDate:          acc.endDate,
        shortAccountName: acc.shortAccountName,
        ownerPartyId:     acc.ownerPartyId,

        multiCurrAllowedFlag: acc.multiCurrAllowedFlag === 'Y',
        paymentMultiCurrFlag: acc.paymentMultiCurrFlag === 'Y',
        receiptMultiCurrFlag: acc.receiptMultiCurrFlag === 'Y',
        zeroAmtAllowed:       acc.zeroAmtAllowed === 'Y',

      }, { emitEvent: false }); // ✅ prevents ngModelChange from firing
    });
}


  // onbranchIdSelected(branchName: any) {
  //   let select = this.BankBranchList.find(d => d.name === branchName);
  //   console.log(select);
  //   console.log(select.name2);
  //   this.branchNo = select.name2;
  //   this.branchId = select.id;
  // }

 


//   onbranchIdSelected(selectedName: string) {

//   const branch = this.BankBranchList.find(
//     b => b.name === selectedName
//   );

//   if (!branch) {
//     return;
//   }

//   this.bankCreationForm.patchValue({
//     branchId: branch.branchId || '',
//     branchNumber: branch.branchNo || ''
//   });

// }

  SelectbranchId(branchId: any) { }

  bankCreation(bankCreationForm: any) { }

  BankCreation() {
    const formValue: IbankDetails = this.bankCreationForm.value;

    this.service.bankCreationFun(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('Bank account created successfully');
        this.isSave = true;
        this.bankCreationForm.reset();
      } else {
        alert('Error occurred during data inserting');
      }

      this.isSave = false;
    });
  }

 BankUpdation() {
  const formValue = this.bankCreationForm.value;

const payload = {
  bankAccountId:    formValue.bankAccountId,
  bankAccountName:  formValue.bankAccountName,
  bankAccountNo:    formValue.bankAccountNo,
  bankAccountType:  formValue.bankAccountType,
  currancyCode:     formValue.currancyCode,
  description:      formValue.description,
  shortAccountName: formValue.shortAccountName,
  maxCheckAmt:      formValue.maxCheckAmt,
  minCheckAmt:      formValue.minCheckAmt,
  status:           formValue.status,
  startDate:        formValue.startDate,
  endDate:          formValue.endDate,
  ownerPartyId:     formValue.ownerPartyId,

  bankId:   formValue.bankId,                      // ✅ plain number
  branchId: formValue.branchId,   // plain number    // ✅ object

  multiCurrAllowedFlag: formValue.multiCurrAllowedFlag ? 'Y' : 'N',
  paymentMultiCurrFlag: formValue.paymentMultiCurrFlag ? 'Y' : 'N',
  receiptMultiCurrFlag: formValue.receiptMultiCurrFlag ? 'Y' : 'N',
  zeroAmtAllowed:       formValue.zeroAmtAllowed       ? 'Y' : 'N',
};

  console.log("Final Payload:", JSON.stringify(payload));

  this.service.bankUpdationFun(payload).subscribe((res: any) => {
    if (res.code === 200) {
      alert('Bank account updated successfully');
      this.bankAccountSearchList = [];
      this.isUpdate = true;
      this.bankCreationForm.reset();
    } else {
      alert('Error: ' + res.message);
    }
    this.isSave = false;
  });
}

  close() { this.router.navigate(['admin']); }

  refresh() { window.location.reload(); }

}

