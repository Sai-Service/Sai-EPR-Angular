import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderManagementService } from '../order-management.service';
import { MasterService } from '../../master/master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};

@Component({
  selector: 'app-manua-sales-gatepass',
  templateUrl: './manua-sales-gatepass.component.html',
  styleUrls: ['./manua-sales-gatepass.component.css']
})
export class ManuaSalesGatepassComponent implements OnInit {
  SalesGatepassForm: FormGroup;
  orderNumber!: number;
  gatepassNo!:string;
    referenceNo: string = '';
    dept:string='';
  // locIdList:
    public locIdList:Array<string>=[];
    public driversNameList:Array<string>=[];
    public autherizeNameList:Array<string>=[];
     public DepartmentListFn:Array<string>=[];
     public BillShipToList: Array<string> = [];
   isReceivedRequired: boolean = false;
isReceivedEnabled: boolean = false;
isUpdateEnabled: boolean = false;
isGenerateEnabled: boolean = false;
gatepassList: any[] = [];
  public minDate = new Date();
  pipe = new DatePipe('en-US');
  now = new Date();
    private sub: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private router1: ActivatedRoute,
    private service: MasterService,
    private orderManagementService: OrderManagementService,
    private location: Location
  ) {
    this.SalesGatepassForm = this.fb.group({
      gatepassNo: [],
      gatepassDate: [new Date()],
      orderNumber: ['',Validators.required],
      vhInvoiceNo: [''],
      model: [''],
      variant: [''],
      color: [''],
      gpType: ['', Validators.required],
      custName: [''],
      contactNo: [''],
      regNo: [''],
      locCode:[],
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
      km:[],
      subType:[],
        referenceNo:[],
        receivedBy:[],
        receivedDate:[],
        receivedRemark:[],
        fromDate: [''],
toDate: ['']
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


        this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.BillShipToList = data;
        }
      );


      this.sub = this.router1.params.subscribe(params => {
      this.gatepassNo = params['gatepassNo'];
      if (this.gatepassNo != undefined) {
        this.getGatepassByNo(this.gatepassNo);
      }
    });

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

        this.service.DepartmentList()
      .subscribe(
        data => {
          this.DepartmentListFn = data;
          console.log(this.DepartmentListFn);
        }
      );

        this.service.DriversNameList(locId)
      .subscribe(
        data => {
          this.driversNameList = data.obj;
          console.log(this.driversNameList);
        }
      );
          this.service.authorizedNameList(locId)
      .subscribe(
        data => {
          this.autherizeNameList = data.obj;
          console.log(this.autherizeNameList);
        }
      );
  }

  get f() {
    return this.SalesGatepassForm.controls;
  }

  SalesGatepass(formData: any): void {
    if (this.SalesGatepassForm.invalid) {
      this.SalesGatepassForm.markAllAsTouched();
      alert('Please enter all required details');
      return;
    }

    console.log('Gate Pass Request:', formData);
  }


  resetMast(): void {
    this.SalesGatepassForm.reset();
     this.SalesGatepassForm.enable();
    this.SalesGatepassForm.patchValue({
      gatepassDate: new Date(),
      creationDate: new Date()
    });

    this.orderNumber = null as any;
  }

  downloadGatePass() {
    debugger;
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
    this.orderManagementService.downloadManualGatePass(gatepassNo)
      .subscribe(data => {
        // saveAs(new Blob([data], { type: MIME_TYPES[EXT] }));
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
      });
  }


generateGatepass(): void {
  const formData = this.SalesGatepassForm.value;
  if (formData.gpType === undefined || formData.gpType === null || formData.gpType === '') {
  alert('Please Select Gate Pass Type!');
  return;
}

if (formData.authorizedBy === undefined || formData.authorizedBy === null || formData.authorizedBy === '') {
  alert('Please Enter Authorized By!');
  return;
}

if (formData.driverName === undefined || formData.driverName === null || formData.driverName === '') {
  alert('Please Enter Driver Name!');
  return;
}

if (formData.referenceNo === undefined || formData.referenceNo === null || formData.referenceNo === '') {
  alert('Please Enter Reference No!');
  return;
}

if (formData.subType === undefined || formData.subType === null || formData.subType === '') {
  alert('Please Select Sub Type!');
  return;
}

if (formData.locCode === undefined || formData.locCode === null || formData.locCode === '') {
  alert('Please Select Actual Delivery Location!');
  return;
}

if (formData.reason === undefined || formData.reason === null || formData.reason === '') {
  alert('Please Enter Reason!');
  return;
}

if (formData.remarks === undefined || formData.remarks === null || formData.remarks === '') {
  alert('Please Enter Remarks!');
  return;
}

  const payload = {
    gpType: formData.gpType,
    authorizedBy: formData.authorizedBy,
    driverName: formData.driverName,
    referenceNo: formData.referenceNo,
    subType:formData.subType,
    fromLocId: sessionStorage.getItem('locId'),
    actualDelvLocId: Number(formData.actualDelvLocId),
    reason: formData.reason,
    remarks: formData.remarks,
    dept: Number(sessionStorage.getItem('dept')),
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
            gatepassNo: response.obj.gatepassNo,
          });
            this.isGenerateEnabled = false;
            this.isUpdateEnabled = false;
        }
         this.SalesGatepassForm.disable();
      } 
      else {
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
  const gatepassNo = formData.gatepassNo;
  const receivedBy = sessionStorage.getItem('fullName');
  const receivedRemark = formData.receivedRemark;

  if (!receivedBy || String(receivedBy).trim() === '') {
    alert('Please enter Received By');
    return;
  }
  if (!receivedRemark) {
    alert('KM cannot be Null');
    return;
  }
  
  this.orderManagementService.updateGatepass( Number(gatepassNo),String(receivedBy).trim(),receivedRemark).subscribe(
    (response: any) => {
      console.log('Update Gatepass Response:', response);
      if (response && response.code === 200) {
        alert(
          response.message || 'Gate Pass Updated Successfully'
        );
        this.SalesGatepassForm.patchValue({
          receivedRemark: receivedRemark
        });
         this.isGenerateEnabled = false;
  this.isUpdateEnabled = false;
     this.SalesGatepassForm.disable();

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

cmnCodeList: any[] = [];   
selectedDept: string = '';
selectedCmnCode: string = '';
searchValue: string = '';

onDeptChange(dept: string) {
  this.selectedCmnCode = '';
  this.searchValue = '';
  this.cmnCodeList = [];
  this.selectedDept = dept;
  // alert(dept)
  if (!dept) {
    return;
  }
  this.orderManagementService.getDeptWiseLOV(dept) 
    .subscribe(
      (data:any) => {
        this.cmnCodeList = data.obj || data;
      },
      (err) => {
        console.error('Failed to load department-wise LOV', err);
      }
    );
}



gatePassSearchNew(): void {
  const formData = this.SalesGatepassForm.getRawValue();
  const dept = formData.dept;
  const subType = formData.subType;
  const referenceNo = formData.referenceNo;
  if (!dept || !subType || !referenceNo) {
    alert('Please select Department, Search By and enter a Value');
    return;
  }

  this.orderManagementService.getOrderDetailsGeneric(referenceNo, subType, dept).subscribe(
    (response: any) => {
      const code = response?.code;
      const data = response?.obj;
      const item = Array.isArray(data) ? data[0] : data;
      // debugger;
      if (code === 200 && item) {
        this.SalesGatepassForm.enable();
        this.isGenerateEnabled = true;
        this.isUpdateEnabled = false;
        this.isReceivedRequired=true;
        if (data.gatepassNo !=null){
          this.SalesGatepassForm.get('receivedRemark')?.enable();
        }
        if (data.gatepassNo ===null){
          this.SalesGatepassForm.get('receivedRemark')?.disable();
        }
      } 
      else {
        this.SalesGatepassForm.disable();
        this.isGenerateEnabled = false;
        this.isUpdateEnabled = false;
        alert(response?.message || 'Order details not found');
      }
    },
    (error: any) => {
      console.error('Get Order Details Error:', error);
      this.SalesGatepassForm.disable();
      this.isGenerateEnabled = false;
      this.isUpdateEnabled = false;
      alert(error?.error?.message || 'Error while fetching Order Details');
    }
  );
}

gatePassSearchTable() {
  const dept = this.SalesGatepassForm.get('dept')?.value;
  const subType = this.SalesGatepassForm.get('subType')?.value;
  const referenceNo = this.SalesGatepassForm.get('referenceNo')?.value;
  const fromDate = this.SalesGatepassForm.get('fromDate')?.value;
  const toDate = this.SalesGatepassForm.get('toDate')?.value;
  const fromDt = fromDate? this.pipe.transform(fromDate, 'dd-MMM-yyyy')?.toUpperCase(): '';
  const toDt = toDate? this.pipe.transform(toDate, 'dd-MMM-yyyy')?.toUpperCase() : '';
  const locId = sessionStorage.getItem('locId');
  this.orderManagementService.searchGatepassList(fromDt, toDt,locId)
    .subscribe(
      (data) => {
        this.gatepassList = data.obj || data || [];
      },
      (err) => {
        console.error('Gate pass search failed', err);
        this.gatepassList = [];
      }
    );
}


getGatepassByNo(gatepassNo: string) {
  if (!gatepassNo) {
    return;
  }
  this.orderManagementService.getGatepassByNo(gatepassNo).subscribe(
    (data: any) => {
      const list = data?.obj;
      const item = Array.isArray(list) ? list[0] : list;
      if (!item) {
        console.warn('No gate pass found for', gatepassNo);
        return;
      }

      this.selectedDept = item.deptName;
      this.SalesGatepassForm.patchValue({
        gatepassNo: item.gatepassNo,
        referenceNo: item.referenceNo,
        gpType: item.gpType,
        authorizedBy: item.authorizedBy,
        driverName: item.driverName,
        reason: item.reason,
        remarks: item.remarks,
        fromLocId: item.fromLocId,
        actualDelvLocId: item.actualDelvLocId
      });
      this.SalesGatepassForm.patchValue({ dept: item.dept });
      this.orderManagementService.getDeptWiseLOV(item.dept).subscribe(
        (res: any) => {
          this.cmnCodeList = res.obj || res || [];
          this.SalesGatepassForm.patchValue({ subType: item.subType });
            this.isGenerateEnabled = false;
        this.isUpdateEnabled = true;
        this.isReceivedRequired=true;
        [
        'gatepassNo',
        'referenceNo',
        'gpType',
        'dept',
        'subType',
        'referenceNo',
        'authorizedBy',
        'driverName',
        'reason',
        'remarks',
        'fromLocId',
        'actualDelvLocId'
].forEach(field => {
  this.SalesGatepassForm.get(field)?.disable();
});
this.SalesGatepassForm.get('receivedRemark')?.enable();

        },
        (err) => {
          console.error('Failed to load department-wise LOV', err);
          this.cmnCodeList = [];
        }
      );
      const hasReceivedBy =
        item.receivedBy !== null &&
        item.receivedBy !== undefined &&
        String(item.receivedBy).trim() !== '';
      if (hasReceivedBy) {
        this.isUpdateEnabled = false;
      } else {
        this.isUpdateEnabled = true;
      }
      this.isGenerateEnabled = false;
    },
    (err) => {
      console.error('Failed to fetch gate pass by number', err);
    }
  );
}

  onOptionsLocation(event:any) {
  
   
   


  }

}
