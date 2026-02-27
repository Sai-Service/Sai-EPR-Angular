import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';

import { MasterService } from '../../master/master.service';
import{ BankService} from '../bank.service';

interface IbankBranchUse{
bankAccountId: number;
customerId:number;
ouId: number;
    orgPartyId: number;
    apUseEnableFlag:string;
    arUseEnableFlag:string;
    apAssetCcid:string;
    arAssetCcid:string;
    cashClearingCcid: string;
    bankChargesCcid: string;
    bankErrorsCcid: string;
    gainCodeCombId: string;
    lossCodeCombId: string;
    onAccountCcid: string;
    unappliedCcid: string;
    factorCcid: string;
    receiptClearingCcid:string;
    remittanceCcid:string;
    arShrtTermDepositCcid: string;
    apShrtTermDepositCcid: string;
    futureDatedPaymentCcid: string;
    brRemittanceCcid: string;
    brFactorCcid: string;
    bankInterestExpenseCcid:  string;
    bankInterestIncomeCcid:  string;
    xtrAssetCcid:  string;
    arBankChargesCcid:  string;
}

@Component({
  selector: 'app-bank-account-uses',
  templateUrl: './bank-account-uses.component.html',
  styleUrls: ['./bank-account-uses.component.css']
})
export class BankAccountUsesComponent implements OnInit {
   bankAccUsesForm: FormGroup;
  bankAccountId?: number;
  customerId?: number;
  custName?: string;
  ouId?: number;
  orgPartyId?: number;
  apUseEnableFlag?: string;
  arUseEnableFlag?: string;
  apAssetCcid?: string;
  arAssetCcid?: string;
  cashClearingCcid?: string;
  bankChargesCcid?: string;
  bankErrorsCcid?: string;
  gainCodeCombId?: string;
  lossCodeCombId?: string;
  onAccountCcid?: string;
  unappliedCcid?: string;
  factorCcid?: string;
  receiptClearingCcid?: string;
  remittanceCcid?: string;
  arShrtTermDepositCcid?: string;
  apShrtTermDepositCcid?: string;
  futureDatedPaymentCcid?: string;
  brRemittanceCcid?: string;
  brFactorCcid?: string;
  bankInterestExpenseCcid?: string;
  bankInterestIncomeCcid?: string;
  xtrAssetCcid?: string;
  arBankChargesCcid?: string;
  branchNO?: string;
  displayModal = true;
  showModal?: boolean;
  content?: string;
  title?: string;
  submitted = false;
  segment11?: string;
  segment2?: number;
  segment3?: number;
  segment4?: number;
  segment5?: number;
  lookupValueDesc4?: string;
  lookupValueDesc1?: string;
  lookupValueDesc2?: string;
  lookupValueDesc3?: string;
  lookupValueDesc5?: string;
  branch: any;
  bankAccountNo?: string;
  bkBranchName?: string;
  bkName?: string;
  public BranchSearch: any;
  public BankBranchList: any=[];
  public BankAcDtlsList: any=[];
  public segmentNameList: any=[];
  public BranchList: any=[];
  public CostCenterList:any=[];
  public NaturalAccountList:any=[];
  public InterBrancList:any=[];
  public locIdList:any=[];
  public BankNameList:any=[];
   public BankNameList1:any=[];
  public OUIdList:any=[];
   selectedId!: number; 
   isSave = false;
  isUpdate = true;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private service1:BankService) {
    this.bankAccUsesForm = fb.group({
      bankAccountNo: [''],
      bkBranchName: [''],
      bankAccountId: [''],
      ouId: [''],
      bkName: [''],
      customerId: [],
      orgPartyId: [''],
      apUseEnableFlag: [''],
      arUseEnableFlag: [''],
      apAssetCcid: [''],
      arAssetCcid: [''],
      cashClearingCcid: [''],
      bankChargesCcid: [''],
      bankErrorsCcid: [''],
      gainCodeCombId: [''],
      lossCodeCombId: [''],
      onAccountCcid: [''],
      unappliedCcid: [''],
      factorCcid: [''],
      receiptClearingCcid: [''],
      remittanceCcid: [''],
      arShrtTermDepositCcid: [''],
      apShrtTermDepositCcid: [''],
      futureDatedPaymentCcid: [''],
      brRemittanceCcid: [''],
      brFactorCcid: [''],
      bankInterestExpenseCcid: [''],
      bankInterestIncomeCcid: [''],
      xtrAssetCcid: [''],
      arBankChargesCcid: [''],
      branchNO: [''],
      segment11: [],
      segment2: [],
      segment3: [],
      segment4: [],
      segment5: [],
      lookupValueDesc4: [],
      lookupValueDesc1: [],
      lookupValueDesc2: [],
      lookupValueDesc3: [],
      lookupValueDesc5: [],
    });
  }

  get f() { return this.bankAccUsesForm.controls; }
  Orgmaster(bankAccUsesForm: any) {
    this.submitted = true;
    console.log(bankAccUsesForm);
    if (this.bankAccUsesForm.invalid) {
      return;
    }
  }

  bankAccUses(bankAccUsesForm:any) { }

  ngOnInit(): void {

    ////////////////////////////////////////////




    ///////////////////////////////////

      this.service1.BankNameList()
      .subscribe(
        data => {
          this.BankNameList1 = data;
          console.log(this.BankNameList1);
        }
      );
    this.service.OUIdList()
      .subscribe(
        data => {
          this.OUIdList = data;
          console.log(this.OUIdList);
        }
      );
    this.service.BankNameListFn()
      .subscribe(
        data => {
          this.BankNameList = data;
          console.log(this.BankNameList);
          this.customerId = data.customerId;
        }
      );
    this.service.locationCodeList()
      .subscribe(
        data => {
          this.locIdList = data;
          console.log(this.locIdList);
        }
      );
    this.service.BranchList()
      .subscribe(
        data => {
          this.BranchList = data;
          console.log(this.BranchList);
        }
      );
    this.service.CostCenterList()
      .subscribe(
        data => {
          this.CostCenterList = data;
          console.log(this.CostCenterList);
        }
      );
    this.service.NaturalAccountList()
      .subscribe(
        data => {
          this.NaturalAccountList = data;
          console.log(this.NaturalAccountList);
        }
      ); this.service.InterBrancList()
        .subscribe(
          data => {
            this.InterBrancList = data;
            console.log(this.InterBrancList);
          }
        );

        this.bankAccUsesForm.get('bkBranchName')?.valueChanges.subscribe(branchName => {

  if (!branchName) return;

  this.service1.BankAcDtlsList(branchName).subscribe((res:any) => {
    this.BankAcDtlsList = res.obj || [];
  });

});
  }

  apUseEnableFlag1(e:any) {
    if (e.target.checked === true) {
      this.apUseEnableFlag = 'Y'
    }
    if (e.target.checked === false) {
      this.apUseEnableFlag = 'N'
    }
  }

  arUseEnableFlag1(e:any) {
    if (e.target.checked === true) {
      this.arUseEnableFlag = 'Y'
    }
    if (e.target.checked === false) {
      this.arUseEnableFlag = 'N'
    }
  }

  onOptionsSelectedBranch(segment: any, lType: string) {
    this.service1.getInterBranch(segment, lType).subscribe(
      data => {
        this.branch = data;
        console.log(this.branch);
        if (this.branch != null) {
          if (lType === 'SS_Interbranch') {
            this.lookupValueDesc5 = this.branch.lookupValueDesc;
          }
          if (lType === 'NaturalAccount') {
            this.lookupValueDesc4 = this.branch.lookupValueDesc;
          }
          if (lType === 'CostCentre') {
            this.lookupValueDesc3 = this.branch.lookupValueDesc;
          }
          if (lType === 'SS_Location') {
            this.lookupValueDesc2 = this.branch.lookupValueDesc;
          }
          if (lType === 'SS_Branch') {
            this.lookupValueDesc1 = this.branch.lookupValueDesc;
          }
        }
      }
    );
  }

  close() { this.router.navigate(['admin']); }

  refresh() { window.location.reload(); }

  TransData(val:any) {
    delete val.segment11
    delete val.segment2
    delete val.segment3
    delete val.segment4
    delete val.segment5
    delete val.lookupValueDesc4
    delete val.lookupValueDesc1
    delete val.lookupValueDesc2
    delete val.lookupValueDesc3
    delete val.lookupValueDesc5
    return val;
  }

  BankAccUseSave() {
    const formValue: IbankBranchUse = this.TransData(this.bankAccUsesForm.value);
    this.service1.BankAccUseFun(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('BANK ACCOUNT USE DETAILS INSERTED SUCCESSFULLY');
        this.isSave = true;
      } else {
        if (res.code === 400) {
          alert('Error occurred during data inserting');
        }
      }
      this.isSave = false;
    });
  }

  bankAccUseList: any[] = [];

search() {
  this.service1.getBankAccUsesList().subscribe((res: any) => {
    this.bankAccUseList = Array.isArray(res) ? res : [res];
  });
}





selectRow(id: number) {

  this.selectedId = id;
  console.log("Selected ID => ", this.selectedId);

  this.isSave = true;
  this.isUpdate = false;

  this.service1.getBankAccUseById(id).subscribe(res => {

   // const branchName = res.bankAccountId?.branchId?.branchName;
    const accountName = res.bankAccountId?.bankAccountName;
    const branchName = res.bankAccountId?.branchId?.branchName;
const bankName   = res.bankAccountId?.bankId?.custName;

    // STEP 1: Patch simple fields FIRST
    this.bankAccUsesForm.patchValue({
      bkName: bankName || '',
     //  bkBranchName: branchName || '',
      ouId: res.ouId,
      orgPartyId: res.orgPartyId,
      apUseEnableFlag: res.apUseEnableFlag,
      arUseEnableFlag: res.arUseEnableFlag,
      apAssetCcid: res.apAssetCcid,
      arAssetCcid: res.arAssetCcid,
      cashClearingCcid: res.cashClearingCcid,
      bankChargesCcid: res.bankChargesCcid,
      bankErrorsCcid: res.bankErrorsCcid,
      gainCodeCombId: res.gainCodeCombId,
      lossCodeCombId: res.lossCodeCombId,
      onAccountCcid: res.onAccountCcid,
      unappliedCcid: res.unappliedCcid,
      factorCcid: res.factorCcid,
      receiptClearingCcid: res.receiptClearingCcid,
      remittanceCcid: res.remittanceCcid,
      arShrtTermDepositCcid: res.arShrtTermDepositCcid,
      apShrtTermDepositCcid: res.apShrtTermDepositCcid,
      futureDatedPaymentCcid: res.futureDatedPaymentCcid,
      brRemittanceCcid: res.brRemittanceCcid,
      brFactorCcid: res.brFactorCcid,
      bankInterestExpenseCcid: res.bankInterestExpenseCcid,
      bankInterestIncomeCcid: res.bankInterestIncomeCcid,
      xtrAssetCcid: res.xtrAssetCcid
    });
//alert(branchName)

    this.service1.BankBranchList(bankName).subscribe(branchRes => {

      this.BankBranchList = branchRes.obj || [];
    // STEP 2: Patch branch
    this.bankAccUsesForm.patchValue({
      bkBranchName: branchName
    });
  
    });
    // STEP 3: Load account list
    this.service1.BankAcDtlsList(branchName).subscribe(accRes => {

      this.BankAcDtlsList = accRes.obj || [];

      const matchedAcc = this.BankAcDtlsList.find(
        (acc: any) => acc.name?.trim() === accountName?.trim()
      );

      // STEP 4: Patch account
      this.bankAccUsesForm.patchValue({
        bankAccountId: matchedAcc?.id || null
      });

    });
  

  });


}


update() {

  if (this.bankAccUsesForm.invalid) {
    this.bankAccUsesForm.markAllAsTouched();
    return;
  }

  const formValue = this.bankAccUsesForm.value;

  const payload = {
    bankAccUseId: this.selectedId,   // store this when selectRow() is called

    ouId: formValue.ouId,
    orgPartyId: formValue.orgPartyId,

    apUseEnableFlag: formValue.apUseEnableFlag,
    arUseEnableFlag: formValue.arUseEnableFlag,

    apAssetCcid: formValue.apAssetCcid,
    arAssetCcid: formValue.arAssetCcid,
    cashClearingCcid: formValue.cashClearingCcid,
    bankChargesCcid: formValue.bankChargesCcid,
    bankErrorsCcid: formValue.bankErrorsCcid,
    gainCodeCombId: formValue.gainCodeCombId,
    lossCodeCombId: formValue.lossCodeCombId,
    onAccountCcid: formValue.onAccountCcid,
    unappliedCcid: formValue.unappliedCcid,
    factorCcid: formValue.factorCcid,
    receiptClearingCcid: formValue.receiptClearingCcid,
    remittanceCcid: formValue.remittanceCcid,
    arShrtTermDepositCcid: formValue.arShrtTermDepositCcid,
    apShrtTermDepositCcid: formValue.apShrtTermDepositCcid,
    futureDatedPaymentCcid: formValue.futureDatedPaymentCcid,
    brRemittanceCcid: formValue.brRemittanceCcid,
    brFactorCcid: formValue.brFactorCcid,
    bankInterestExpenseCcid: formValue.bankInterestExpenseCcid,
    bankInterestIncomeCcid: formValue.bankInterestIncomeCcid,
    xtrAssetCcid: formValue.xtrAssetCcid,

    // 👇 Important IDs
    branchId: formValue.bkBranchName,
    bankAccountId: formValue.bankAccountId
  };

  console.log("Update Payload => ", payload);

  this.service1.updateBankAccUses(payload).subscribe({
    next: (res: any) => {

      if (res.code === 200) {
        alert("Record Updated Successfully ✅");
        this.search();   // reload table
        this.isUpdate = true;
        this.bankAccUsesForm.reset();
      } else {
        alert(res.message || "Update Failed ❌");
      }
      this.isSave = false;
    },
    error: (err) => {
      console.error(err);
      alert("Server Error ❌");
    }
  });

}


getBankAccountIdFromList(accountName: string) {

  const acc = this.BankAcDtlsList.find(
    (x: any) => x.name === accountName
  );

  return acc ? acc.id : null;
}

  openCodeComb(i:any, apAssetCcid:any) {
    alert('apAssetCcid ' + apAssetCcid);
    if (apAssetCcid === null) {
      this.bankAccUsesForm.get('segment11')?.reset();
      this.bankAccUsesForm.get('segment2')?.reset();
      this.bankAccUsesForm.get('segment3')?.reset();
      this.bankAccUsesForm.get('segment4')?.reset();
      this.bankAccUsesForm.get('segment5')?.reset();
      this.bankAccUsesForm.get('lookupValueDesc1')?.reset();
      this.bankAccUsesForm.get('lookupValueDesc2')?.reset();
      this.bankAccUsesForm.get('lookupValueDesc3')?.reset();
      this.bankAccUsesForm.get('lookupValueDesc4')?.reset();
      this.bankAccUsesForm.get('lookupValueDesc5')?.reset();
    }
    if (apAssetCcid != null) {
      var temp = apAssetCcid.split('.');
      this.segment11 = temp[0];
      this.segment2 = temp[1];
      this.segment3 = temp[2];
      this.segment4 = temp[3];
      this.segment5 = temp[4];
    }
    this.displayModal = false;
    this.showModal = true; 
    this.content = i; 
  }

  openCodeComb1(i:any) {
    if (i === null) {
      this.bankAccUsesForm.get('segment11')?.reset();
      this.bankAccUsesForm.get('segment2')?.reset();
      this.bankAccUsesForm.get('segment3')?.reset();
      this.bankAccUsesForm.get('segment4')?.reset();
      this.bankAccUsesForm.get('segment5')?.reset();
      this.bankAccUsesForm.get('lookupValueDesc1')?.reset();
      this.bankAccUsesForm.get('lookupValueDesc2')?.reset();
      this.bankAccUsesForm.get('lookupValueDesc3')?.reset();
      this.bankAccUsesForm.get('lookupValueDesc4')?.reset();
      this.bankAccUsesForm.get('lookupValueDesc5')?.reset();
    }
    if (i != null) {
      alert(i);
      var temp = i.split('.');
      this.segment11 = temp[0];
      this.segment2 = temp[1];
      this.segment3 = temp[2];
      this.segment4 = temp[3];
      this.segment5 = temp[4];
    }
    this.displayModal = false;
    this.showModal = true; 
    this.content = i; 
  }
  fnCancatination(index:any) {
    const abc = this.bankAccUsesForm.get('segment11')?.value + '.'
      + this.bankAccUsesForm.get('segment2')?.value + '.'
      + this.bankAccUsesForm.get('segment3')?.value + '.'
      + this.bankAccUsesForm.get('segment4')?.value + '.'
      + this.bankAccUsesForm.get('segment5')?.value;
    if (this.content === "apAssetCcid") {
      this.apAssetCcid = abc;
    }
    if (this.content === "arAssetCcid") {
      this.arAssetCcid = abc;
    }
    if (this.content === "arAssetCcid") {
      this.arAssetCcid = abc;
    }
    if (this.content === "bankChargesCcid") {
      this.bankChargesCcid = abc;
    }
    if (this.content === "cashClearingCcid") {
      this.cashClearingCcid = abc;
    }
    if (this.content === "bankErrorsCcid") {
      this.bankErrorsCcid = abc;
    }
    if (this.content === "gainCodeCombId") {
      this.gainCodeCombId = abc;
    }
    if (this.content === "lossCodeCombId") {
      this.lossCodeCombId = abc;
    }
    if (this.content === "onAccountCcid") {
      this.onAccountCcid = abc;
    }
    if (this.content === "unappliedCcid") {
      this.unappliedCcid = abc;
    }
    if (this.content === "factorCcid") {
      this.factorCcid = abc;
    }
    if (this.content === "receiptClearingCcid") {
      this.receiptClearingCcid = abc;
    }
    if (this.content === "remittanceCcid") {
      this.remittanceCcid = abc;
    }
    if (this.content === "arShrtTermDepositCcid") {
      this.arShrtTermDepositCcid = abc;
    }
    if (this.content === "apShrtTermDepositCcid") {
      this.apShrtTermDepositCcid = abc;
    }
    if (this.content === "futureDatedPaymentCcid") {
      this.futureDatedPaymentCcid = abc;
    }
    if (this.content === "bankInterestExpenseCcid") {
      this.bankInterestExpenseCcid = abc;
    }
    if (this.content === "brFactorCcid") {
      this.brFactorCcid = abc;
    }
    if (this.content === "brRemittanceCcid") {
      this.brRemittanceCcid = abc;
    }
    if (this.content === "xtrAssetCcid") {
      this.xtrAssetCcid = abc;
    }
    if (this.content === "bankInterestExpenseCcid") {
      this.bankInterestExpenseCcid = abc;
    }
    if (this.content === "bankInterestIncomeCcid") {
      this.bankInterestIncomeCcid = abc;
    }

    this.bankAccUsesForm.get('segment11')?.reset();
    this.bankAccUsesForm.get('segment2')?.reset();
    this.bankAccUsesForm.get('segment3')?.reset();
    this.bankAccUsesForm.get('segment4')?.reset();
    this.bankAccUsesForm.get('segment5')?.reset();
    this.bankAccUsesForm.get('lookupValueDesc1')?.reset();
    this.bankAccUsesForm.get('lookupValueDesc2')?.reset();
    this.bankAccUsesForm.get('lookupValueDesc3')?.reset();
    this.bankAccUsesForm.get('lookupValueDesc4')?.reset();
    this.bankAccUsesForm.get('lookupValueDesc5')?.reset();
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

  onBankNameSelected(BkName:any) {
    alert(BkName);
  }

   onBankNameSelected1(BkName:any) {
    alert(BkName);
  //   console.log("Selected Customer Id :", this.customerId);

  //     this.bankAccUsesForm.patchValue({
  //   customerId: this.customerId
  // });

    this.service1.BankBranchList(BkName)
      .subscribe(
        data => {
          this.BankBranchList = data.obj;
          console.log(this.BankBranchList);
        }
      );

      
  }

// onBankNameSelected1(customerId: any) {

//   console.log("Selected CustomerId:", customerId);

//   this.bankAccUsesForm.patchValue({
//     customerId: customerId
//   });

//   this.service.BankBranchList(customerId)
//     .subscribe(res => {
//       this.BankBranchList = res.obj;
//     });
// }




  onBranchNameSelected(bkBranchName:any) {
    alert(bkBranchName);
    this.service1.BankAcDtlsList(bkBranchName)
      .subscribe(
        data => {
          this.BankAcDtlsList = data.obj;
          console.log(this.BankAcDtlsList);
        }
      );
  }

  // onbranchIdSelected(branchName:any) {

  //   if (!branchName) return;
  // if (!this.BankBranchList || !this.BankBranchList.length) return;

  // const branch = this.BankBranchList.find(
  //     (b:any) => b.branchName === branchName || b.branchId === branchName
  // );

  // console.log("Selected Branch => ", branch);
  //   let select = this.BankBranchList.find(d => d.name === branchName);
  //   console.log(select);
  //   console.log(select.name2);
  //   this.service.BankAcDtlsList(branchName)
  //     .subscribe(
  //       data => {
  //         this.BankAcDtlsList = data.obj;
  //         console.log(this.BankAcDtlsList);
  //         this.bankAccountId = data.obj.id;
  //         console.log(data.obj.id);
  //       }
  //     );
  // }

  onbranchIdSelected(branchName: any) {

  if (!branchName) return;
  if (!this.BankBranchList?.length) return;

  const selectedBranch = this.BankBranchList.find(
    (b: any) => b.name === branchName
  );

  console.log("Selected Branch => ", selectedBranch);

  this.service1.BankAcDtlsList(branchName)
    .subscribe(res => {

      this.BankAcDtlsList = res.obj || [];

      console.log("Account List => ", this.BankAcDtlsList);

      // DO NOT set bankAccountId here automatically
      // Let user select it OR patch it during selectRow()

    });
}

  



  onBankAccIdSelected(accountName:any) {
    let select = this.BankAcDtlsList.find((d:any) => d.name === accountName);
    console.log(select);
    console.log(select.name1);
    this.bankAccountNo = select.name1;
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

}
