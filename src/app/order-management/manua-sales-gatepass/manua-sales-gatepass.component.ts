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
  gatepassNo!: string;
  referenceNo: string = '';
  dept: string = '';
  // locIdList:
  public locIdList: Array<string> = [];
  public driversNameList: Array<string> = [];
  public autherizeNameList: Array<string> = [];
  public DepartmentListFn: Array<string> = [];
  public BillShipToList: Array<string> = [];
  isReceivedRequired: boolean = false;
  isReceivedEnabled: boolean = false;
  isUpdateEnabled: boolean = false;
  isGenerateEnabled: boolean = false;
  displayAuthorizedBy: boolean = true;
  displaydriverName: boolean = true;
  displayReceivedGate: boolean = true;
  gatepassList: any[] = [];
  public minDate = new Date();
  pipe = new DatePipe('en-US');
  now = new Date();
  private sub: any;
  isSearchDone: boolean = false;

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
      orderNumber: ['', Validators.required],
      vhInvoiceNo: [''],
      model: [''],
      variant: [''],
      color: [''],
      gpType: ['', Validators.required],
      custName: [''],
      contactNo: [''],
      regNo: [''],
      locCode: [],
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
      km: [],
      subType: [],
      referenceNo: [],
      receivedBy: [],
      receivedDate: [],
      receivedRemark: [],
      fromDate: [''],
      toDate: [''],
      attribute1:[],
      attribute2:[],
      attribute3:[],
      attribute4:[],
      attribute5:[]
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

    if (locId) {
      this.SalesGatepassForm.patchValue({
        fromLocId: Number(locId)
      });
    }


    this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          // this.BillShipToList = data;
          //  console.log(this.BillShipToList);
          const loginLocId = sessionStorage.getItem('locId');

          this.BillShipToList = data.filter((location: any) =>
            String(location.locId) !== String(loginLocId)
          );
        }
      );


    this.sub = this.router1.params.subscribe(params => {
      this.gatepassNo = params['GatepassNo'];
      // alert(this.gatepassNo)
      if (this.gatepassNo != undefined) {
        this.getGatepassByNo(this.gatepassNo);
        this.displayAuthorizedBy = false;
        this.displaydriverName = false;

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

    this.SalesGatepassForm.patchValue({ dept: sessionStorage.getItem('deptId') })
    if (Number(sessionStorage.getItem('deptId')) == 1 || Number(sessionStorage.getItem('deptId')) == 2
      || Number(sessionStorage.getItem('deptId')) == 3 || Number(sessionStorage.getItem('deptId')) == 5
      || Number(sessionStorage.getItem('deptId')) == 6 || Number(sessionStorage.getItem('deptId')) == 7
      || Number(sessionStorage.getItem('deptId')) == 12) {
      // this.SalesGatepassForm.get('dept')?.disable();
      this.onDeptChange(Number(sessionStorage.getItem('deptId')))
    }
    else {
      this.SalesGatepassForm.get('dept')?.enable();
    }

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
    const formData = this.SalesGatepassForm.getRawValue();
    const orderNumber = formData.orderNumber;
    const gatepassNo = formData.gatepassNo;
    if (!gatepassNo) {
      alert('Gate Pass Number is required');
      return;
    }
    this.orderManagementService.downloadManualGatePass(gatepassNo)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
      });
  }


  generateGatepass(): void {
    const formData = this.SalesGatepassForm.getRawValue();
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

    if (formData.actualDelvLocId === undefined || formData.actualDelvLocId === null || formData.locCode === '') {
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
      subType: formData.subType,
      fromLocId: sessionStorage.getItem('locId'),
      actualDelvLocId: Number(formData.actualDelvLocId),
      reason: formData.reason,
      remarks: formData.remarks,
      dept: formData.dept,
      createdBy: Number(formData.createdBy),
      attribute1:formData.attribute1,
      attribute2:formData.attribute2,
      attribute3: formData.attribute3,
      attribute4: formData.attribute4,
      attribute5: formData.attribute5,
      variant:formData.variant,
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
    // sessionStorage.getItem('emplId');
    const receivedRemark = formData.receivedRemark;

    if (!receivedBy || String(receivedBy).trim() === '') {
      alert('Please enter Received By');
      return;
    }
    if (!receivedRemark) {
      alert('Received Remark cannot be Null');
      return;
    }

    this.orderManagementService.updateGatepass(Number(gatepassNo), String(receivedBy).trim(), receivedRemark).subscribe(
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




  onDeptChange(dept: any) {
    this.selectedCmnCode = '';
    this.searchValue = '';
    this.cmnCodeList = [];
    this.selectedDept = dept;

    if (!dept) {
      return;
    }
    if (dept === '1' || dept === '2') {
      this.isGenerateEnabled = false;
      this.isUpdateEnabled = false;
      this.isReceivedRequired = false;
    } else {
      this.isGenerateEnabled = true;
      this.isUpdateEnabled = false;
      this.isReceivedRequired = false;
    }
    this.orderManagementService.getDeptWiseLOV(dept).subscribe(
      (data: any) => {
        this.cmnCodeList = data.obj || data;
      },
      (err) => {
        console.error('Failed to load department-wise LOV', err);
      }
    );
  }


private lockSearchFields(): void {
  ['dept', 'subType', 'referenceNo'].forEach(field =>
    this.SalesGatepassForm.get(field)?.disable({ emitEvent: false })
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
    this.SalesGatepassForm.get('dept')?.disable();
    this.orderManagementService
      .getOrderDetailsGeneric(referenceNo, subType, dept,sessionStorage.getItem('locId'))
      .subscribe(
        (response: any) => {
          const code = response?.code;
          const data = response?.obj;
          const item = Array.isArray(data) ? data[0] : data;
          if (code !== 200 || !item) {
            this.lockSearchFields();
            this.SalesGatepassForm.disable();
            this.isGenerateEnabled = false;
            this.isUpdateEnabled = false;
            this.isReceivedRequired = false;
            this.isSearchDone = true;
            alert(response?.message || 'Order details not found');
            return;
          }
          if (item.gatepassNo == null || item.gatepassNo == 0) {
            this.SalesGatepassForm.patchValue({
              dept: formData.dept,
              subType: formData.subType,
              referenceNo: formData.referenceNo,
              gatepassNo: null,
              gatepassDate: null,
              gpType: null,
              authorizedBy: null,
              driverName: null,
              reason: null,
              remarks: null,
              fromLocId: item.locId,
              receivedBy: null,
              receivedDate: null,
              receivedRemark: null,
               attribute1: item.attribute1,
            attribute2: item.attribute2,
            attribute3: item.attribute3,
            attribute4: item.attribute4,
            attribute5: item.attribute5,
            variant:item.variant
            });
            this.SalesGatepassForm.enable();
            this.SalesGatepassForm.get('attribute1')?.disable();
            this.SalesGatepassForm.get('attribute2')?.disable();
            this.SalesGatepassForm.get('attribute3')?.disable();
            this.SalesGatepassForm.get('attribute4')?.disable();
            this.SalesGatepassForm.get('attribute5')?.disable();
            this.SalesGatepassForm.get('variant')?.disable();
            this.isGenerateEnabled = true;
            this.isUpdateEnabled = false;

            this.isReceivedRequired = false;

            return;
          }
         
          this.SalesGatepassForm.patchValue({

            dept: item.dept,
            subType: item.subType,
            referenceNo: item.referenceNo,
            gatepassNo: item.gatepassNo,
            gatepassDate: item.gatepassDate,
            gpType: item.gpType,
            authorizedBy: item.authorizedBy,
            driverName: item.driverName,
            reason: item.reason,
            remarks: item.remarks,
            fromLocId: item.fromLocId,
            actualDelvLocId: item.actualDelvLocId,
            receivedBy: item.receivedBy,
            receivedDate: item.receivedDate,
            receivedRemark: item.receivedRemark,
            attribute1: item.attribute1,
            attribute2: item.attribute2,
            attribute3: item.attribute3,
            attribute4: item.attribute4,
            attribute5: item.attribute5,
            variant:item.variant
          });

          // Disable complete form first
          this.SalesGatepassForm.disable();
          if (item.receivedBy == null) {

            // Generate button DISABLED
            this.isGenerateEnabled = false;

            // Receive/Update button ENABLED
            this.isUpdateEnabled = true;

            this.isReceivedRequired = true;

            // Only received remark should be editable
            this.SalesGatepassForm.get('receivedRemark')?.enable();

            return;
          }

          // =========================================================
          // Gate Pass generated AND received
          // =========================================================
          if (item.receivedBy != null) {

            // Generate button DISABLED
            this.isGenerateEnabled = false;

            // Update/Receive button DISABLED
            this.isUpdateEnabled = false;

            this.isReceivedRequired = true;

            // Nothing should be editable
            this.SalesGatepassForm.get('receivedRemark')?.disable();

            return;
          }
        },

        (error: any) => {

          console.error('Get Order Details Error:', error);

          this.SalesGatepassForm.disable();

          this.isGenerateEnabled = false;
          this.isUpdateEnabled = false;
          this.isReceivedRequired = false;

          alert(
            error?.error?.message ||
            'Error while fetching Order Details'
          );
        }
      );
  }


  gatePassSearchTable() {
    const dept = this.SalesGatepassForm.get('dept')?.value;
    const subType = this.SalesGatepassForm.get('subType')?.value;
    const referenceNo = this.SalesGatepassForm.get('referenceNo')?.value;
    const fromDate = this.SalesGatepassForm.get('fromDate')?.value;
    const toDate = this.SalesGatepassForm.get('toDate')?.value;
    const fromDt = fromDate ? this.pipe.transform(fromDate, 'dd-MMM-yyyy')?.toUpperCase() : '';
    const toDt = toDate ? this.pipe.transform(toDate, 'dd-MMM-yyyy')?.toUpperCase() : '';
    const locId = sessionStorage.getItem('locId');
    this.orderManagementService.searchGatepassList(fromDt, toDt, locId)
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
  select: any = [];

  getGatepassByNo(gatepassNo: string) {
    alert(gatepassNo)
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
          actualDelvLocId: item.actualDelvLocId,
           attribute5:item.attribute5,
          attribute1:item.attribute1,
              attribute2:item.attribute2,
              attribute3:item.attribute3,
              attribute4:item.attribute4,
              variant:item.variant,
        });
        //     this.select = this.BillShipToList.find((d:any) => d.locId === item.actualDelvLocId);
        //  console.log(this.select);
        //  this.SalesGatepassForm.patchValue({
        //   locCode:this.select.locCode+'--'+this.select.locName
        //  })
        this.SalesGatepassForm.patchValue({ dept: item.dept });
        this.orderManagementService.getDeptWiseLOV(item.dept).subscribe(
          (res: any) => {
            this.cmnCodeList = res.obj || res || [];
            this.SalesGatepassForm.patchValue({ subType: item.subType });
            this.isGenerateEnabled = false;
            this.isUpdateEnabled = true;
            this.isReceivedRequired = true;
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
              'actualDelvLocId',
              'attribute5',
              'attribute1',
              'attribute2',
              'attribute3',
              'attribute4',
              'variant'
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
        const hasReceivedDate = item.receivedDate !== null && item.receivedDate !== undefined && String(item.receivedDate).trim() !== '';
        if (hasReceivedDate) {
          this.isUpdateEnabled = false;
          this.displayReceivedGate = false;
        } else {
          this.isUpdateEnabled = true;
          this.displayReceivedGate = true;
        }
        // this.isGenerateEnabled = false;

      },
      (err) => {
        console.error('Failed to fetch gate pass by number', err);
      }
    );
  }

  onOptionsLocation(event: any) {
    this.SalesGatepassForm.patchValue({ actualDelvLocId: event })
  }

  close() {
    this.location.back();
  }
}
