import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../master.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {  OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-receipt-method',
  templateUrl: './receipt-method.component.html',
  styleUrls: ['./receipt-method.component.css']
})
export class ReceiptMethodComponent implements OnInit {
receiptForm: FormGroup;
  locId!: number;
  ouId!: number;
  createdBy!:number;
  public CostCenterList:any=[];
  public NaturalAccountList: any=[];
  public MethodTypeList: any=[];
  methodList: any[] = [];
  suggestions: string[] = [];
  methodTypeSearch = '';
  isEditMode = false;
  selectedReceiptMethodId: number | null = null;
  public BankNameList:any=[];
  customerId!: number;


  

  constructor(private fb: FormBuilder,private service: MasterService,private router: Router) {
    this.receiptForm = this.fb.group({
      methodName: ['',Validators.required],
      methodType: ['',Validators.required],
      methodTypeSearch: [''],
      costCentre: ['',Validators.required],
      receiptclassCode: [''],
      Status: ['ACTIVE',Validators.required],
      startDate: ['',Validators.required],
      endDate: [{ value: '', disabled: true }],
      posttoGl: [''],
      earnedccId: ['',Validators.required],
      unearnedccId: ['',Validators.required],
      onaccountccId: ['',Validators.required],
      receiptclearingccId: ['',Validators.required],
      remittanceccId: ['',Validators.required],
      unidentifiedccId: ['',Validators.required],
      unappliedccId: ['',Validators.required],
      refundccId: ['',Validators.required],
      bankMethod:['',Validators.required],
      bankAccName: [''],
      locId: [],
      ouId:[],
      createdBy:[]
    });
  }

      ngOnInit(): void {

    this.locId = Number(sessionStorage.getItem('locId'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.createdBy = Number(sessionStorage.getItem('emplId'));

    const today = new Date().toISOString().substring(0,10)
    this.receiptForm.patchValue({
      startDate: today
    })

      this.receiptForm.get('bankMethod')?.valueChanges.subscribe(value => {
    if (value !== 'Y') {
      this.receiptForm.get('bankAccName')?.reset();
    }
  });

  //   this.receiptForm.get('Status')?.valueChanges.subscribe(value => {
  //   if (value === 'ACTIVE') {
  //     this.receiptForm.get('endDate')?.reset();
  //   }
  // });


  this.receiptForm.get('Status')?.valueChanges.subscribe(value => {
  const endDateCtrl = this.receiptForm.get('endDate');

  if (value === 'INACTIVE') {
    endDateCtrl?.enable();
  } else {
    endDateCtrl?.reset();
    endDateCtrl?.disable();
  }
});

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
    );

    this.service.methodTypeList().subscribe(
      data => {
        this.MethodTypeList = data;
        console.log(this.MethodTypeList)
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


}






onMethodTypeInput() {
  const value = this.receiptForm.get('methodType')?.value;

  if (!value || value.length < 2) {
    this.suggestions = [];
    return;
  }

  this.service.Methodtype(value).subscribe(res => {
    const list = res.obj || [];

    // unique method names
  this.suggestions = Array.from(
  new Set(list.map((x: any) => x.methodName as string))
);

  });
}

selectSuggestion(name: string) {
  this.receiptForm.patchValue({ methodType: name });
  this.suggestions = [];
}


// searchMethod() {
//   const methodName = this.receiptForm.value.methodTypeSearch;

//   if (!methodName) {
//     alert('Please enter Method Name');
//     return;
//   }

//   this.service.Methodtype(methodName).subscribe(
//     res => {
//       this.methodList = res.obj || [];
//       this.suggestions = [];
//     },
//     err => {
//       console.error(err);
//       alert('Error fetching data');
//     }
//   );
// }

searchMethod() {
  const methodName = this.receiptForm.get('methodTypeSearch')?.value?.trim();

  if (!methodName) {
    alert('Please enter Method Name');
    return;
  }

  this.service.Methodtype(methodName).subscribe({
    next: (res) => {

      
      if (res.code !== 200) {
        this.methodList = [];
        alert(res.message || 'No data found');
        return;
      }

   
      this.methodList = res.obj || [];
    },
    error: (err) => {
      console.error('HTTP error', err);
      alert('Server error occurred');
    }
  });
}


 

  save() {

    
  if (this.receiptForm.invalid) {
    this.receiptForm.markAllAsTouched();
    alert( 'Enter Required Fields'); 
    return; 
  }

  this.isEditMode = false;

    const payload = {
      methodName: this.receiptForm.value.methodName,
      methodType: this.receiptForm.value.methodType,
      costCenter: this.receiptForm.value.costCentre,
      receiptClassCode: this.receiptForm.value.receiptclassCode,
      status: this.receiptForm.value.Status,
      startDate: this.receiptForm.value.startDate,
      postToGl: this.receiptForm.value.posttoGl,

      earnedCcid: this.receiptForm.value.earnedccId,
      unEarnedCcid:this.receiptForm.value.unearnedccId,
      onAccountCcid: this.receiptForm.value.onaccountccId,
      receiptClearingCcid: this.receiptForm.value.receiptclearingccId,
      remittanceCcid: this.receiptForm.value.remittanceccId,
      unIdentifiedCcid: this.receiptForm.value.unidentifiedccId,
      unappliedCcid: this.receiptForm.value.unappliedccId,
      refundCcid: this.receiptForm.value.refundccId,

      // backend fixed fields
      createdBy: this.createdBy,
      locId:this.locId ,
      //cashCcid: null,
      //bankChargesCcid: null,
      orgId: this.ouId,
     // bankAccountId: null,
      endDate: null,
      bankMethodYn: this.receiptForm.value.bankMethod,
      bankAccountId:this.receiptForm.value.bankAccName
    };

    this.service.saveReceiptMethod(payload).subscribe(
      (res: any) => {
        console.log(res);
        alert(res.message || 'Saved Successfully');
        this.isEditMode = true;
      },
      (err:any) => {
        console.error(err);
        alert('Error while saving');
        this.isEditMode = true;
      }
    );
  }

  selectMethod(m: any) {

     this.selectedReceiptMethodId = m.receiptMethodId;
  this.isEditMode = true;
  this.receiptForm.patchValue({
    methodType: m.methodType,
    methodName: m.methodName,
    Status: m.status,

    startDate: m.startDate,
    endDate: m.endDate,

    costCentre: m.costCenter,

    //earnedccId: m.earnedCcid,
     unearnedccId: m.unEarnedCcid,
    // onaccountccId: m.onAccountCcid,
    earnedccId: m.earnedCcid?.toString(),
onaccountccId: m.onAccountCcid?.toString(),

    receiptclearingccId: m.receiptClearingCcid,
    remittanceccId: m.remittanceCcid,
    unidentifiedccId: m.unIdentifiedCcid,
    unappliedccId: m.unappliedCcid,
    refundccId: m.refundCcid,

    bankMethod: m.bankMethodYn,
    bankAccName: m.bankAccountId
  });

  // Optional: hide search results after selection
  // this.methodList = [];

  window.scrollTo({ top: 0, behavior: 'smooth' });

}

update() {
  if (!this.selectedReceiptMethodId) {
    alert('No record selected for update');
    return;
  }

  const payload = {
    receiptMethodId: this.selectedReceiptMethodId,

    methodType: this.receiptForm.value.methodType,
    methodName: this.receiptForm.value.methodName,

    startDate: this.receiptForm.value.startDate,
    endDate: this.receiptForm.value.endDate,
    status: this.receiptForm.value.Status,

    costCenter: this.receiptForm.value.costCentre,

    earnedCcid: this.receiptForm.value.earnedccId,
    unEarnedCcid: this.receiptForm.value.unearnedccId,
    onAccountCcid: this.receiptForm.value.onaccountccId,
    receiptClearingCcid: this.receiptForm.value.receiptclearingccId,
    remittanceCcid: this.receiptForm.value.remittanceccId,
    unIdentifiedCcid: this.receiptForm.value.unidentifiedccId,
    unappliedCcid: this.receiptForm.value.unappliedccId,
    refundCcid: this.receiptForm.value.refundccId,

    lastUpdatedBy: this.createdBy,
    locId: this.locId,
    orgId: this.ouId,
    bankMethodYn: this.receiptForm.value.bankMethod
  };

  this.service.updateReceiptMethod(payload).subscribe({
    next: (res: any) => {
      alert(res.message || 'Updated successfully');

      // reset to Save mode
      this.isEditMode = false;
      this.selectedReceiptMethodId = null;
      this.receiptForm.reset();
      this.methodList = [];
    },
    error: () => {
      alert('Update failed');
    }
  });
}



   close() { this.router.navigate(['admin']); }

  clear() {
    this.receiptForm.reset();
      this.isEditMode = false;
  this.selectedReceiptMethodId = null;
  }

}

