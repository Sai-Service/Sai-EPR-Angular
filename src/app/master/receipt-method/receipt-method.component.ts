import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../master.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {  OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-receipt-method',
  // imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './receipt-method.component.html',
  styleUrls: ['./receipt-method.component.css']
})
export class ReceiptMethodComponent implements OnInit {
 receiptForm: FormGroup;
  searchForm: FormGroup;
  locId: number;
  ouId: number;
  createdBy:number;
  public CostCenterList:any[];
  public NaturalAccountList: any[];
  public MethodTypeList: any[];
  // methodList: any[] = [];
  methodNameList: any[] = [];

  methods: any[]=[];
  suggestions: string[] = [];
  methodTypeSearch = '';
  methodSearch = '';
  isEditMode = false;
  isSave = true;
  selectedReceiptMethodId: number | null = null;
  public BankNameList:any[];
  customerId: number;
  lastSearchedMethodType!: string;
  todayDate: string = '';


  

  constructor(
    private fb: FormBuilder,
    private service: MasterService,
    private router: Router
  ) {
    this.receiptForm = this.fb.group({
      methodName: ['',Validators.required],
      methodType: ['',Validators.required],
      // methodTypeSearch: [''],
      // methodSearch: [''],
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

     this.searchForm = this.fb.group({
       methodTypeSearch: [''],
      methodSearch: [''],
     })
  }
  

      ngOnInit(): void {

    this.locId = Number(sessionStorage.getItem('locId'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.createdBy = Number(sessionStorage.getItem('emplId'));

    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
    this.receiptForm.patchValue({
      startDate: this.todayDate
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

      this.searchForm.get('methodSearch')?.valueChanges.subscribe(type => {
  if (!type) {
    this.methodNameList = [];
    this.searchForm.get('methodTypeSearch')?.reset();
    return;
  }

  this.loadMethodNames(type);
});


}

loadMethodNames(type: string) {
  this.service.MethodtypeSearch(type).subscribe({
    next: (res: any) => {
      this.methodNameList = res?.obj || [];
    },
    error: () => {
      this.methodNameList = [];
    }
  });
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



// searchMethod() {
//   const methodName = this.receiptForm.get('methodTypeSearch')?.value?.trim();

//   if (!methodName) {
//     alert('Please enter Method Name');
//     return;
//   }

//   this.service.Methodtype(methodName).subscribe({
//     next: (res: any) => {
//       console.log('FULL RESPONSE:', res);

//       if (res?.code !== 200 || !res?.obj) {
//         this.methodList = [];
//         alert(res?.message || 'No data found');
//         return;
//       }

      
//       this.methodList = [res.obj];
//     },
//     error: (err) => {
//       console.error('HTTP error', err);
//       alert('Server error occurred');
//     }
//   });
// }

searchMethod() {
  const methodName = this.receiptForm.get('methodTypeSearch')?.value?.trim();

  if (!methodName) {
    alert('Please enter Method Name');
    return;
  }

  this.methods = []; // clear old data

  this.service.Methodtype(methodName).subscribe({
    next: (res: any) => {
      if (res?.code === 200 && res?.obj) {
        this.methods = [res.obj]; // single row
      } else {
        this.methods = [];
        alert(res?.message || 'No data found');
      }
    }
  });
}




// searchMethodType() {
//   const methodType = this.receiptForm.get('methodSearch')?.value?.trim();

//   if (!methodType) {
//     alert('Please enter Method Type');
//     return;
//   }

//   this.lastSearchedMethodType = methodType;

//   this.service.MethodtypeSearch(methodType).subscribe({
//     next: (res: any) => {
//       console.log('FULL RESPONSE:', res);

//       if (res?.code === 200 && Array.isArray(res.obj)) {
//         this.method = res.obj;   
//       } else {
//         this.method = [];
//         alert(res?.message || 'No data found');
//       }
//     },
//     error: (err) => {
//       console.error('HTTP error', err);
//       alert('Server error occurred');
//       this.method = [];
//     }
//   });
// }

searchMethodType() {
  const methodType = this.receiptForm.get('methodSearch')?.value?.trim();

  if (!methodType) {
    alert('Please enter Method Type');
    return;
  }

  this.methods = []; // clear old data

  this.service.MethodtypeSearch(methodType).subscribe({
    next: (res: any) => {
      if (res?.code === 200 && Array.isArray(res.obj)) {
        this.methods = res.obj; // multiple rows
      } else {
        this.methods = [];
        alert(res?.message || 'No data found');
      }
    }
  });
}

search() {
  const methodType = this.searchForm.get('methodSearch')?.value?.trim();
  const methodName = this.searchForm.get('methodTypeSearch')?.value?.trim();

  this.methods = [];

  // BOTH → exact match filter
  if (methodType && methodName) {
    this.service.MethodtypeSearch(methodType).subscribe(res => {
      const list = res?.obj || [];

      this.methods = list.filter((x: any) =>
        x.methodName?.toLowerCase().trim() === methodName.toLowerCase().trim()
      );
    });
    return;
  }

  // ONLY TYPE
  if (methodType) {
    this.service.MethodtypeSearch(methodType).subscribe(res => {
      this.methods = res?.obj || [];
    });
    return;
  }

  // ONLY NAME
  if (methodName) {
    this.service.Methodtype(methodName).subscribe(res => {
      this.methods = res?.obj ? [res.obj] : [];
    });
    return;
  }

  alert('Enter Method Type or Method Name');
}





refreshTableAfterUpdate() {
  if (!this.lastSearchedMethodType) return;

  this.service.MethodtypeSearch(this.lastSearchedMethodType).subscribe({
    next: (res: any) => {
      if (res?.code === 200) {
        this.methods = [...res.obj]; 
      }
    }
  });
}



 

  save() {

    
  if (this.receiptForm.invalid) {
    this.receiptForm.markAllAsTouched();
    console.log(this.receiptForm.controls); 
    Object.keys(this.receiptForm.controls).forEach(key => {
  if (this.receiptForm.get(key)?.invalid) console.log(key);
});

    alert( 'Enter Required Fields'); 
    return; 
  }

    const payload = {
      methodName: this.receiptForm.getRawValue().methodName,
      methodType: this.receiptForm.getRawValue().methodType,
      costCenter: this.receiptForm.getRawValue().costCentre,
      receiptClassCode: this.receiptForm.getRawValue().receiptclassCode,
      status: this.receiptForm.getRawValue().Status,
      startDate: this.receiptForm.getRawValue().startDate,
      postToGl: this.receiptForm.getRawValue().posttoGl,

      earnedCcid: this.receiptForm.getRawValue().earnedccId,
      unEarnedCcid:this.receiptForm.getRawValue().unearnedccId,
      onAccountCcid: this.receiptForm.getRawValue().onaccountccId,
      receiptClearingCcid: this.receiptForm.getRawValue().receiptclearingccId,
      remittanceCcid: this.receiptForm.getRawValue().remittanceccId,
      unIdentifiedCcid: this.receiptForm.getRawValue().unidentifiedccId,
      unappliedCcid: this.receiptForm.getRawValue().unappliedccId,
      refundCcid: this.receiptForm.getRawValue().refundccId,

      // backend fixed fields
      createdBy: this.createdBy,
      locId:this.locId ,
      //cashCcid: null,
      //bankChargesCcid: null,
      orgId: this.ouId,
     // bankAccountId: null,
      endDate: null,
      bankMethodYn: this.receiptForm.getRawValue().bankMethod,
      bankAccountId:this.receiptForm.getRawValue().bankAccName
    };
      //this.isEditMode = true;
    this.service.saveReceiptMethod(payload).subscribe(
      (res: any) => {
        console.log(res);
        alert(res.message || 'Saved Successfully');
        this.isEditMode = true;
        this.isSave = false;
       this.receiptForm.reset({
  Status: 'ACTIVE',
  startDate: new Date().toISOString().substring(0,10),
  bankMethod: '',
  
});
      this.receiptForm.enable();
      this.isEditMode = false;
      this.isSave = true;

      },
      err => {
        console.error(err);
        alert('Error while saving');
        this.isEditMode = true;
      }
    );
  }

  selectMethod(m: any) {

     this.selectedReceiptMethodId = m.receiptMethodId;
     const status = (m.status || '').toString().toUpperCase();
  this.isEditMode = true;
  this.isSave = false;
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
  this.receiptForm.get('Status')?.setValue(
  (m.status || '').toString().toUpperCase());
  this.receiptForm.get('bankAccName')?.setValue(m.bankAccountId);

  window.scrollTo({ top: 0, behavior: 'smooth' });
  this.disableFieldsAfterSelect();

}

disableFieldsAfterSelect() {
  this.receiptForm.get('methodType')?.disable();
  this.receiptForm.get('methodName')?.disable();
  this.receiptForm.get('costCentre')?.disable();
  this.receiptForm.get('startDate')?.disable();
  this.receiptForm.get('refundccId')?.disable();
  this.receiptForm.get('earnedccId')?.disable();
  this.receiptForm.get('onaccountccId')?.disable();
  this.receiptForm.get('receiptclearingccId')?.disable();
  this.receiptForm.get('remittanceccId')?.disable();
  this.receiptForm.get('unearnedccId')?.disable();
  this.receiptForm.get('unidentifiedccId')?.disable();
  this.receiptForm.get('unappliedccId')?.disable();
  this.receiptForm.get('bankMethod')?.disable();
  this.receiptForm.get('bankAccName')?.disable();
  
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
      this.isSave = true;
      this.selectedReceiptMethodId = null;
      this.receiptForm.reset();
      this.searchForm.reset();
      this.receiptForm.enable(); 
      this.refreshTableAfterUpdate();
      // this.searchMethod();
      // this.searchMethodType();
      this.methods = [];
    },
    error: () => {
      alert('Update failed');
    }
  });
}



   close() { this.router.navigate(['admin']); }

  clear() {
    this.receiptForm.reset();
    this.searchForm.reset();
      this.isEditMode = false;
  this.selectedReceiptMethodId = null;
  }

}
