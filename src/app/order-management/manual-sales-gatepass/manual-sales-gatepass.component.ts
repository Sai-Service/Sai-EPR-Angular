import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderManagementService } from '../order-management.service';
import { MasterService } from '../../master/master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { Location } from '@angular/common';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};


@Component({
  selector: 'app-manual-sales-gatepass',
  templateUrl: './manual-sales-gatepass.component.html',
  styleUrls: ['./manual-sales-gatepass.component.css']
})
export class ManualSalesGatepassComponent implements OnInit {
SalesGatepassForm: FormGroup;
  orderNumber!: number;
  // locIdList:
    public locIdList:Array<string>=[];
   isKmRequired: boolean = false;
isReceivedEnabled: boolean = false;
isUpdateEnabled: boolean = false;
isGenerateEnabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private router1: ActivatedRoute,
    private service: MasterService,
    private orderManagementService: OrderManagementService,
    private location: Location,
    private location1: Location
  ) {
    this.SalesGatepassForm = this.fb.group({
      gatepassNo: [],
      gatepassDate: [new Date()],
      orderNumber: [Validators.required],
      vhInvoiceNo: [''],
      model: [''],
      variant: [''],
      color: [''],
      gpType: ['', Validators.required],
      custName: [''],
      contactNo: [''],
      regNo: [''],
      authorizedBy: ['', Validators.required],
      driverName: [''],
      salesExe: [''],
      fromLocId: [],
      actualDelvLocId: [],
      reason: [''],
      remarks: [''],
      dept: [],
      creationDate: [new Date()],
      createdBy: [],
      orderStatus: [''],
      locName: [''],
      headerId: [],
      locId: [],
      km:[]
    });
  }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('emplId');
    const ouId = sessionStorage.getItem('ouId');
      const locId = sessionStorage.getItem('locId');

    if (userId) {
      this.SalesGatepassForm.patchValue({
        createdBy: Number(userId)
      });
    }

    if (locId)
      {
      this.SalesGatepassForm.patchValue({
        fromLocId: Number(locId)
      });
    }

    this.SalesGatepassForm.patchValue({
      gatepassDate: new Date(),
      creationDate: new Date()
    });


        this.service.locationCodeList()
      .subscribe(
        data => {
          this.locIdList = data;
          console.log(this.locIdList);
        }
      );
  }

  get f() {
    return this.SalesGatepassForm.controls;
  }

  SalesGatepass(formData: any): void {
    if (this.SalesGatepassForm.invalid) {
      this.SalesGatepassForm.markAllAsTouched();
      // alert('Please enter all required details');
      return;
    }

    console.log('Gate Pass Request:', formData);
  }


// gatePassOrderNo(orderNumber: any): void {
//   if (!orderNumber) {
//     alert('Please Enter Order Number');
//     return;
//   }
//   console.log('Searching Order Number:', orderNumber);

//   this.orderManagementService.getOrderDetails(orderNumber).subscribe(
//     (response: any) => {

//       console.log('Order Details Response:', response);

//       if (!response || !response.obj || response.obj.length === 0) {
//         alert('Order details not found');
//         return;
//       }

//       const data = response.obj[0];

//       console.log('Data to Patch:', data);

//       this.SalesGatepassForm.patchValue({
//         orderNumber: data.orderNumber,
//         vhInvoiceNo: data.vhInvoiceNo,
//         model: data.model,
//         variant: data.variant,
//         color: data.color,
//         custName: data.custName,
//         contactNo: data.contactNo,
//         regNo: data.regNo,
//         salesExe: data.salesExe,
//         orderStatus: data.orderStatus,
//         locName: data.locName,
//         locId: data.locId,
//         actualDelvLocId: data.actualDelvLocId,
//         headerId: data.headerId,
//         gatepassDate: new Date(),
//         creationDate: new Date(),
//         gpType:data.gpType,
//         driverName:data.driverName,
//         reason:data.reason,
//         remarks:data.remarks,
//         km:data.km,
//         authorizedBy:data.authorizedBy,

       
//       });

//       if (
//         data.actualDelvLocId !== null &&
//         data.actualDelvLocId !== undefined &&
//         String(data.actualDelvLocId).trim() !== ''
//       ) {

//         this.isKmRequired = true;
//         this.isReceivedEnabled = true;
//         this.SalesGatepassForm.get('km')?.enable();
//         this.SalesGatepassForm.get('km')?.setValidators([
//           Validators.required
//         ]);

//         this.SalesGatepassForm.get('km')?.updateValueAndValidity();

//       } else {

     
//         this.isKmRequired = false;
//         this.isReceivedEnabled = false;
//         this.SalesGatepassForm.get('km')?.disable();
//         this.SalesGatepassForm.get('km')?.clearValidators();
//         this.SalesGatepassForm.get('km')?.updateValueAndValidity();
//       }

//       console.log('Patched Form:', this.SalesGatepassForm.value);
//     },
//     (error: any) => {

//       console.error('Get Order Details Error:', error);

//       alert('Error while fetching Order Details');
//     }
//   );
// }


// gatePassOrderNo(orderNumber: any): void {
//   if (!orderNumber) {
//     alert('Please Enter Order Number');
//     return;
//   }

//   console.log('Searching Order Number:', orderNumber);

//   this.orderManagementService.getOrderDetails(orderNumber).subscribe(
//     (response: any) => {

//       console.log('Order Details Response:', response);
//       if (!response || !response.obj || response.obj.length === 0) {
//         alert('Order details not found');
//         return;
//       }
//       const data = response.obj[0];
//       console.log('Data to Patch:', data);
//       this.SalesGatepassForm.patchValue({
//         orderNumber: data.orderNumber,
//         vhInvoiceNo: data.vhInvoiceNo,
//         model: data.model,
//         variant: data.variant,
//         color: data.color,
//         custName: data.custName,
//         contactNo: data.contactNo,
//         regNo: data.regNo,
//         salesExe: data.salesExe,
//         orderStatus: data.orderStatus,
//         locName: data.locName,
//         locId: data.locId,
//         actualDelvLocId: data.actualDelvLocId,
//         headerId: data.headerId,
//         gatepassDate: data.gatepassDate ? new Date(data.gatepassDate) : new Date(),
//         creationDate: data.creationDate ? new Date(data.creationDate) : new Date(),
//         gpType: data.gpType,
//         driverName: data.driverName,
//         reason: data.reason,
//         remarks: data.remarks,
//         km: data.km,
//         authorizedBy: data.authorizedBy,
//         gatepassNo: data.gatepassNo
//       });
//       if (
//         data.gatepassNo !== null &&
//         data.gatepassNo !== undefined &&
//         String(data.gatepassNo).trim() !== ''
//       ) {
//         this.isUpdateEnabled = true;
//         this.isGenerateEnabled = false;
//       } else {
//         this.isUpdateEnabled = false;
//         this.isGenerateEnabled = true;
//       }
//       console.log('KM:', data.km);
//       console.log('Gatepass No:', data.gatepassNo);
//       console.log('Received Enabled:', this.isReceivedEnabled);
//       console.log('Update Enabled:', this.isUpdateEnabled);
//       console.log('Generate Enabled:', this.isGenerateEnabled);
//       console.log('Patched Form:', this.SalesGatepassForm.value);
//     },
//     (error: any) => {
//       console.error('Get Order Details Error:', error);
//       alert('Error while fetching Order Details');
//     }
//   );
// }


gatePassOrderNo(orderNumber: any): void {

  if (!orderNumber) {
    alert('Please Enter Order Number');
    return;
  }

  console.log('Searching Order Number:', orderNumber);

  this.orderManagementService.getOrderDetails(orderNumber).subscribe(
    (response: any) => {

      console.log('Order Details Response:', response);

      if (!response || !response.obj || response.obj.length === 0) {
        alert('Order details not found');
        return;
      }

      const data = response.obj[0];

      console.log('Data to Patch:', data);

      this.SalesGatepassForm.patchValue({
        orderNumber: data.orderNumber,
        vhInvoiceNo: data.vhInvoiceNo,
        model: data.model,
        variant: data.variant,
        color: data.color,
        custName: data.custName,
        contactNo: data.contactNo,
        regNo: data.regNo,
        salesExe: data.salesExe,
        orderStatus: data.orderStatus,
        locName: data.locName,
        locId: data.locId,
        actualDelvLocId: data.actualDelvLocId,
        headerId: data.headerId,
        gatepassDate: data.getepassDate
          ? new Date(data.getepassDate)
          : new Date(),
        creationDate: new Date(),
        gpType: data.gpType,
        driverName: data.driverName,
        reason: data.reason,
        remarks: data.remarks,
        km: data.km,
        authorizedBy: data.authorizedBy,
        gatepassNo: data.gatepassNo
      });
            if (
  data.gatepassNo !== null &&
  data.gatepassNo !== undefined &&
  String(data.gatepassNo).trim() !== ''
) {
  this.isGenerateEnabled = false;
  this.isUpdateEnabled = true;
  this.isKmRequired = true;
  const kmControl = this.SalesGatepassForm.get('km');
  kmControl?.enable();
  kmControl?.setValidators([
    Validators.required
  ]);
  kmControl?.updateValueAndValidity();

} else {

  this.isGenerateEnabled = true;
  this.isUpdateEnabled = false;
  this.isKmRequired = false;

  const kmControl = this.SalesGatepassForm.get('km');

  kmControl?.disable();

  kmControl?.clearValidators();
  kmControl?.updateValueAndValidity();

}
    },
    (error: any) => {

      console.error('Get Order Details Error:', error);

      alert('Error while fetching Order Details');
    }
  );
}


  resetMast(): void {
    this.SalesGatepassForm.reset();

    this.SalesGatepassForm.patchValue({
      gatepassDate: new Date(),
      creationDate: new Date()
    });

    this.orderNumber = null as any;
  }

  downloadGatePass() {
  const formData = this.SalesGatepassForm.getRawValue();
  const orderNumber = formData.orderNumber;
    const gatepassNo = formData.gatepassNo;
   if (!orderNumber) {
    alert('Order Number is required');
    return;
  }
   if (!gatepassNo) {
    alert('Gate Pass Number is required');
    return;
  }
    this.orderManagementService.downloadManualGatePass(gatepassNo,orderNumber)
      .subscribe(data => {
        // saveAs(new Blob([data], { type: MIME_TYPES[EXT] }));
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        // printWindow.open
      });
  }


generateGatepass(): void {
  if (this.SalesGatepassForm.invalid) {
    this.SalesGatepassForm.markAllAsTouched();
    alert('Please enter all required details');
    return;
  }

  const formData = this.SalesGatepassForm.value;

  const payload = {
    orderNumber: Number(formData.orderNumber),
    vhInvoiceNo: formData.vhInvoiceNo,
    model: formData.model,
    variant: formData.variant,
    color: formData.color,
    gpType: formData.gpType,
    custName: formData.custName,
    contactNo: Number(formData.contactNo),
    regNo: formData.regNo,
    authorizedBy: formData.authorizedBy,
    driverName: formData.driverName,
    salesExe: formData.salesExe,
    fromLocId: Number(formData.fromLocId),
    actualDelvLocId: Number(formData.actualDelvLocId),
    reason: formData.reason,
    remarks: formData.remarks,
    dept: Number(formData.dept),
    createdBy: Number(formData.createdBy)
  };

  console.log('Save Gatepass Payload:', payload);

  this.orderManagementService.saveGatepass(payload).subscribe(
    (response: any) => {
      console.log('Save Gatepass Response:', response);
      if (response && response.code === 200) {
        alert(response.message || 'Gatepass Generated Successfully');
        if (response.obj) {
          this.SalesGatepassForm.patchValue({
            gatepassNo: response.obj.gatepassNo
          });
        }
        this.isGenerateEnabled = false;
        this.isUpdateEnabled = false;
      
      } else {
        alert(response.message || 'Gatepass Generation Failed');
      }
    },
    (error: any) => {
      console.error('Save Gatepass Error:', error);
      alert('Error while generating Gatepass');
    }
  );
}


updateGatepass(): void {
  const formData = this.SalesGatepassForm.getRawValue();
  const orderNumber = formData.orderNumber;
  const receivedBy = sessionStorage.getItem('fullName');
  const km = formData.km;

  if (!orderNumber) {
    alert('Order Number is required');
    return;
  }
  if (!receivedBy || String(receivedBy).trim() === '') {
    alert('Please enter Received By');
    return;
  }
  if (km === null || km === undefined || km === '') {
    this.SalesGatepassForm.get('km')?.markAsTouched();
    alert('Please enter KM');
    return;
  }
  if (Number(km) < 0) {
    alert('KM cannot be negative');
    return;
  }
  console.log('Update Gatepass:', {
    orderNumber: Number(orderNumber), receivedBy: String(receivedBy).trim(),km: Number(km)
  });
  this.orderManagementService.updateGatepass( Number(orderNumber),String(receivedBy).trim(),Number(km) ).subscribe(
    (response: any) => {
      console.log('Update Gatepass Response:', response);
      if (response && response.code === 200) {
        alert(
          response.message || 'Gate Pass Updated Successfully'
        );
        this.SalesGatepassForm.patchValue({
          km: Number(km)
        });
        this.isGenerateEnabled = false;
  this.isUpdateEnabled = false;
      } else {
        alert(
          response?.message || 'Gate Pass Update Failed'
        );
      }
    },
    (error: any) => {
      console.error('Update Gatepass Error:', error);
      alert(
        error?.error?.message ||
        'Error while updating Gate Pass'
      );
    }
  );
}

close() {
    this.location1.back();
  }

}
