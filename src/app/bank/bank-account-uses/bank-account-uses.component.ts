import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { MasterService } from 'src/app/master/master.service';
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
branchNO:string;
displayModal = true;
showModal: boolean;
content: string;
title: string;
submitted = false;
segment11: string;
segment2: number;
segment3: number;
segment4: number;
segment5: number;
lookupValueDesc4: string;
  lookupValueDesc1: string;
  lookupValueDesc2: string;
  lookupValueDesc3: string;
  lookupValueDesc5: string;
  branch: any;
  bankAccountNo:string;
bkBranchName:string;
bkName:string;
  public BranchSearch : any;
  public BankBranchList:any[];
  public BankAcDtlsList:any[];
  public segmentNameList:any[];
public BranchList: Array<string> = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: Array<string> = [];
  public InterBrancList: Array<string> = [];
  public locIdList: Array<string> = [];
public BankNameList: any;
public OUIdList: Array<string> = [];

constructor(private fb: FormBuilder, private router: Router, private bankService: BankService,  private service: MasterService) { 
  this.bankAccUsesForm = fb.group({
    bankAccountNo: [''],
bkBranchName: [''],
    bankAccountId: [''],
ouId:  [''],
bkName:[''],
customerId:[],
    orgPartyId: [''],
    apUseEnableFlag: [''],
    arUseEnableFlag: [''],
    apAssetCcid:  [''],
    arAssetCcid: [''],
    cashClearingCcid:  [''],
    bankChargesCcid:  [''],
    bankErrorsCcid: [''],
    gainCodeCombId: [''],
    lossCodeCombId:  [''],
    onAccountCcid:  [''],
    unappliedCcid:  [''],
    factorCcid:  [''],
    receiptClearingCcid: [''],
    remittanceCcid: [''],
    arShrtTermDepositCcid: [''],
    apShrtTermDepositCcid:  [''],
    futureDatedPaymentCcid:  [''],
    brRemittanceCcid:  [''],
    brFactorCcid:  [''],
    bankInterestExpenseCcid:  [''],
    bankInterestIncomeCcid:   [''],
    xtrAssetCcid:   [''],
    arBankChargesCcid:  [''],
branchNO:[''], 
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
  bankAccUses(bankAccUsesForm){}
  ngOnInit(): void {
    this.service.OUIdList()
    .subscribe(
      data => {
        this.OUIdList = data;
        console.log(this.OUIdList);
      }
    );
    this.bankService.BankNameListFn()
    .subscribe(
      data => {
        this.BankNameList = data;
        console.log(this.BankNameList);
        this.customerId= this.BankNameList.customerId;
     //   alert(this.BankNameList.customerId);
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
  }
  
  apUseEnableFlag1(e) {
    if (e.target.checked=== true) {
      this.apUseEnableFlag = 'Y'
   } 
   if (e.target.checked=== false) {
     this.apUseEnableFlag='N'
   }
  }
  arUseEnableFlag1(e) {
    if (e.target.checked=== true) {
      this.arUseEnableFlag = 'Y'
   } 
   if (e.target.checked=== false) {
     this.arUseEnableFlag='N'
   }
  }
  onOptionsSelectedBranch(segment: any, lType: string) {
    // alert(segment);
    // var InterBranch1=this.GlCodeCombinaionForm.get('segment1').value;
    this.service.getInterBranch(segment, lType).subscribe(
      data => {
        this.branch = data;
        console.log(this.branch);
        // if(this.branch.code === 200){
        if (this.branch != null) {
          // this.poMasterDtoForm.patchValue(this.branch);
          if (lType === 'SS_Interbranch') {
            this.lookupValueDesc5 = this.branch.lookupValueDesc;
          }
          if (lType === 'NaturalAccount') {
            this.lookupValueDesc4 = this.branch.lookupValueDesc;
            //   // this.GlCodeCombinaionForm.patchValue(this.branch);
            //  this.accountType=this.branch.accountType;
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
        // }else if(this.branch.code === 400){
        //   alert(this.branch.message);

        // }


      }
    );

  }
  close(){this.router.navigate(['admin']); }
  refresh() { window.location.reload();}
  TransData(val){
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
  BankAccUseSave(){
    const formValue: IbankBranchUse =this.TransData(this.bankAccUsesForm.value);
    this.bankService.BankAccUseFun(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('BANK ACCOUNT USE DETAILS INSERTED SUCCESSFULLY');
        //window.location.reload();
      } else {
        if (res.code === 400) {
          alert('Error occurred during data inserting');
          //window.location.reload();
        }
      }
    });
  }
  openCodeComb(i, apAssetCcid){
    alert('apAssetCcid '+apAssetCcid);
    
    // let segmentName1 = this.lineDetailsArray.controls[i].get('segmentName').value;
    if (apAssetCcid === null) {
      this.bankAccUsesForm.get('segment11').reset();
      this.bankAccUsesForm.get('segment2').reset();
      this.bankAccUsesForm.get('segment3').reset();
      this.bankAccUsesForm.get('segment4').reset();
      this.bankAccUsesForm.get('segment5').reset();
      // this.poMasterDtoForm.get('segment6').reset();
      this.bankAccUsesForm.get('lookupValueDesc1').reset();
      this.bankAccUsesForm.get('lookupValueDesc2').reset();
      this.bankAccUsesForm.get('lookupValueDesc3').reset();
      this.bankAccUsesForm.get('lookupValueDesc4').reset();
      this.bankAccUsesForm.get('lookupValueDesc5').reset();
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
    this.showModal = true; // Show-Hide Modal Check
    this.content = i; // Dynamic Data
  }
  openCodeComb1(i) {
    
    // let segmentName1 = this.lineDetailsArray.controls[i].get('segmentName').value;
    if (i === null) {
      this.bankAccUsesForm.get('segment11').reset();
      this.bankAccUsesForm.get('segment2').reset();
      this.bankAccUsesForm.get('segment3').reset();
      this.bankAccUsesForm.get('segment4').reset();
      this.bankAccUsesForm.get('segment5').reset();
      // this.poMasterDtoForm.get('segment6').reset();
      this.bankAccUsesForm.get('lookupValueDesc1').reset();
      this.bankAccUsesForm.get('lookupValueDesc2').reset();
      this.bankAccUsesForm.get('lookupValueDesc3').reset();
      this.bankAccUsesForm.get('lookupValueDesc4').reset();
      this.bankAccUsesForm.get('lookupValueDesc5').reset();
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
    this.showModal = true; // Show-Hide Modal Check
    this.content = i; // Dynamic Data
  }
  fnCancatination(index) {
   const abc = this.bankAccUsesForm.get('segment11').value + '.'
      + this.bankAccUsesForm.get('segment2').value + '.'
      + this.bankAccUsesForm.get('segment3').value + '.'
      + this.bankAccUsesForm.get('segment4').value + '.'
      + this.bankAccUsesForm.get('segment5').value; 
      // alert(this.content +"  "+this.bankChargesCcid);
      if(this.content === "apAssetCcid" ){
        this.apAssetCcid =abc;
      }
      if(this.content === "arAssetCcid" ){
        this.arAssetCcid =abc;
      }
      if(this.content === "arAssetCcid" ){
        this.arAssetCcid =abc;
      }    
      if(this.content === "bankChargesCcid" ){
        this.bankChargesCcid =abc;
      }
      if(this.content === "cashClearingCcid" ){
        this.cashClearingCcid =abc;
      }     
      if(this.content === "bankErrorsCcid" ){
        this.bankErrorsCcid =abc;
      }
      if(this.content === "gainCodeCombId" ){
        this.gainCodeCombId =abc;
      }      
      if(this.content === "lossCodeCombId" ){
        this.lossCodeCombId =abc;
      } 
      if(this.content === "onAccountCcid" ){
        this.onAccountCcid =abc;
      }     
      if(this.content === "unappliedCcid" ){
        this.unappliedCcid =abc;
      }  
      if(this.content === "factorCcid" ){
        this.factorCcid =abc;
      }   
      if(this.content === "receiptClearingCcid" ){
        this.receiptClearingCcid =abc;
      } 
      if(this.content === "remittanceCcid" ){
        this.remittanceCcid =abc;
      }    
      if(this.content === "arShrtTermDepositCcid" ){
        this.arShrtTermDepositCcid =abc;
      }
      if(this.content === "apShrtTermDepositCcid" ){
        this.apShrtTermDepositCcid =abc;
      }
      if(this.content === "futureDatedPaymentCcid" ){
        this.futureDatedPaymentCcid =abc;
      }    
      if(this.content === "bankInterestExpenseCcid" ){
        this.bankInterestExpenseCcid =abc;
      } 
      if(this.content === "brFactorCcid" ){
        this.brFactorCcid =abc;
      } 
      if(this.content === "brRemittanceCcid" ){
        this.brRemittanceCcid =abc;
      }       
      if(this.content === "xtrAssetCcid" ){
        this.xtrAssetCcid =abc;
      }
      if(this.content === "bankInterestExpenseCcid" ){
        this.bankInterestExpenseCcid =abc;
      }
      if(this.content === "bankInterestIncomeCcid" ){
        this.bankInterestIncomeCcid =abc;
      }
     
    this.bankAccUsesForm.get('segment11').reset();
    this.bankAccUsesForm.get('segment2').reset();
    this.bankAccUsesForm.get('segment3').reset();
    this.bankAccUsesForm.get('segment4').reset();
    this.bankAccUsesForm.get('segment5').reset();
    this.bankAccUsesForm.get('lookupValueDesc1').reset();
    this.bankAccUsesForm.get('lookupValueDesc2').reset();
    this.bankAccUsesForm.get('lookupValueDesc3').reset();
    this.bankAccUsesForm.get('lookupValueDesc4').reset();
    this.bankAccUsesForm.get('lookupValueDesc5').reset();
  }
  serchByBranchNo(branchNO){
    this.bankService.BranchNumberSearchFn(branchNO)
    .subscribe(
      data => {
        this.BranchSearch = data;
        console.log(this.BranchSearch);
        // this.bankBranchForm.patchValue(this.BranchSearch);
      }
    );
  }
  onBankNameSelected(BkName) {
    alert(BkName);
     let selectedValue = this.BankNameList.find(v => v.custName == BkName);
     alert(selectedValue.custName+" "+selectedValue.customerId);
     this.bankAccountId = selectedValue.customerId;
    //  this.bankId=selectedValue.customerId;
    //  this.custName =selectedValue.custName;
  }
  onBankNameSelected1(BkName) {
    alert(BkName);
    this.bankService.BankBranchList(BkName)
    .subscribe(
      data => {
        this.BankBranchList = data.obj;
        console.log(this.BankBranchList);
      //  this.customerId= this.BankNameList.customerId;
      // this.branchId = this.BankBranchList.name2;
      }
    );
  }

  onBranchNameSelected(bkBranchName) {
    alert(bkBranchName);
    this.bankService.BankAcDtlsList(bkBranchName)
    .subscribe(
      data => {
        this.BankAcDtlsList = data;
        console.log(this.BankAcDtlsList);
       //this.customerId= this.BankNameList.customerId;
       //this.branchId = this.BankBranchList.name2;
      }
    );
  }

  onbranchIdSelected(branchName){
    let select = this.BankBranchList.find(d => d.name=== branchName);
    console.log(select);
    console.log(select.name2);
    // this.bankAccountNo = select.name2;
    this.bankService.BankAcDtlsList(branchName)
    .subscribe(
      data => {
        this.BankAcDtlsList = data.obj;
        console.log(this.BankAcDtlsList);
       this.bankAccountId= this.BankNameList.id;
      console.log(this.BankNameList.id);
      
      // this.branchId = this.BankBranchList.name2;
      }
    );
  }

  onBankAccIdSelected(accountName){
    let select = this.BankAcDtlsList.find(d => d.name=== accountName);
    console.log(select);
    console.log(select.name1);
    this.bankAccountNo = select.name1;
  }

  BreanchNameSearch(bkBranchName){
    this.bankService.BranchSearchFn(bkBranchName)
    .subscribe(
      data => {
        this.BranchSearch = data;
        console.log(this.BranchSearch);
        // this.bankBranchForm.patchValue(this.BranchSearch);
      }
    );
  }
}
