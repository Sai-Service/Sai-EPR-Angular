import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ItCorrectionService } from '../it-correction.service';


@Component({
  selector: 'app-it-correction-for-all',
  templateUrl: './it-correction-for-all.component.html',
  styleUrls: ['./it-correction-for-all.component.css'],
  
})
export class ItCorrectionForAllComponent implements OnInit {

  itCorrectionForm!: FormGroup;

  ticketNo!: string;
  issueTypeLovList: any[] = [];
  referenceTypeLovList: any[] = [];
  customerNameSearch: any[] = [];
  custName!: string;
  selectedIssueType: string | null = null;

  showAccountsApproval = false;
  orderStatus: string | null = null;

  irnGenerated = false;
  approverNameLovList: any[] = [];

  titleLovList: any[] = [];

  stateGstCodeMap: any = {
    'MAHARASHTRA': '27',
    'GOA': '30',
    'KARNATAKA': '29',
    'GUJARAT': '24',
    'DELHI': '07',
    'TAMIL NADU': '33'
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ItCorrectionService
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.ticketNo = sessionStorage.getItem('ticketNo') || '';

    this.itCorrectionForm.get('issueType')?.valueChanges.subscribe(val => {
      this.selectedIssueType = val;

      const firstNameCtrl = this.itCorrectionForm.get('newFirstName');
      const middleNameCtrl = this.itCorrectionForm.get('newMiddleName');
      const lastNameCtrl = this.itCorrectionForm.get('newLastName');

      if (val === 'Name Correction') {

        firstNameCtrl?.setValidators([
          Validators.required,
          Validators.maxLength(12),
          Validators.pattern(/^[A-Za-z ]+$/)
        ]);

        lastNameCtrl?.setValidators([
          Validators.required,
          Validators.maxLength(12),
          Validators.pattern(/^[A-Za-z ]+$/)
        ]);

        middleNameCtrl?.setValidators([
          Validators.maxLength(12),
          Validators.pattern(/^[A-Za-z ]+$/)
        ]);

      } else {

        firstNameCtrl?.clearValidators();
        middleNameCtrl?.clearValidators();
        lastNameCtrl?.clearValidators();

      }

      firstNameCtrl?.updateValueAndValidity();
      middleNameCtrl?.updateValueAndValidity();
      lastNameCtrl?.updateValueAndValidity();


      // this.service.getReferenceTypes().subscribe({
      //   next: (res: { code: number; obj: any[]; message: any; }) => {
      //     if (res.code === 200) {
      //       this.referenceTypeLovList = res.obj;
      //     } else {
      //       alert(res.message);
      //     }
      //   },
      //   error: () => {
      //     alert('Reference Type API failed');
      //   }
      // });
      if (this.selectedIssueType) {
        this.service.getReferenceTypes(this.selectedIssueType).subscribe({
          next: (res: { code: number; obj: any[]; message: any; }) => {
            if (res.code === 200) {
              this.referenceTypeLovList = res.obj;
            } else {
              alert(res.message);
            }
          },
          error: () => {
            alert('Reference Type API failed');
          }
        });
      }

      if (val === 'GST Updation' || val === 'PAN No Updation') {
        this.showAccountsApproval = true;
      } else {
        if (this.orderStatus !== 'INVOICED') {
          this.showAccountsApproval = false;
        }
      }
      this.syncCustomerToCorrection();
      this.applyGstValidationByState();
    });

    this.service.getIssueTypes().subscribe({
      next: (res: { code: number; obj: any[]; message: any; }) => {
        if (res.code === 200) {
          this.issueTypeLovList = res.obj;
        } else {
          alert(res.message);
        }
      },
      error: () => {
        alert('Issue Type API failed');
      }
    });

    // this.service.getReferenceTypes().subscribe({
    //   next: (res: { code: number; obj: any[]; message: any; }) => {
    //     if (res.code === 200) {
    //       this.referenceTypeLovList = res.obj;
    //     } else {
    //       alert(res.message);
    //     }
    //   },
    //   error: () => {
    //     alert('Reference Type API failed');
    //   }
    // });

    this.service.getAccApproverNames().subscribe({
      next: (res: any) => {
        if (res.code === 200) {
          this.approverNameLovList = res.obj;
        } else {
          alert(res.message);
        }
      },
      error: () => {
        alert('Approver Name LOV API failed');
      }
    });

    this.service.getTitleLov().subscribe({
      next: (res: any) => {

        console.log('Title LOV Response:', res);
        this.titleLovList = res.filter((x: any) => x.status === 'Active');
      },
      error: () => {
        alert('Title LOV API failed');
      }
    });

  }

  createForm() {
    this.itCorrectionForm = this.fb.group({

      issueType: [null],
      referenceType: [null],
      customerId: [null],
      customerSiteId: [null],
      custName: [null],
      customerName: [null],
      customerType: [null],
      title: [null],
      firstName: [null],
      middleName: [null],
      lastName: [null],
      address1: [null],
      address2: [null],
      address3: [null],
      address4: [null],
      area: [null],
      city: [null],
      state: [null],
      pinCode: [null],
      gstNo: [null],
      panNo: [null],
      email1: [null],
      mobile1: [null],
      soNumber: [null],
      discountPercent: [null],
      customerAccNo: [null],
      newTitle: [null],
      newFirstName: [null],
      newMiddleName: [null],
      newLastName: [null],
      // newFirstName: [null,[Validators.required, Validators.maxLength(12), Validators.pattern(/^[A-Za-z ]+$/)]],
      // newMiddleName: [null,[Validators.maxLength(12), Validators.pattern(/^[A-Za-z ]+$/)]],
      // newLastName: [ null, [Validators.required, Validators.maxLength(12), Validators.pattern(/^[A-Za-z ]+$/)]],
      newAddress1: [null],
      newAddress2: [null],
      newAddress3: [null],
      newAddress4: [null],
      newCity: [null],
      newState: [null],
      newPinCode: [null],
      newMobileNo: [null],
      // ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      newEmailId: [null],
      newPanNo: [null],
      // , [Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]
      newGstNo: [null],
      newDiscountPercent: [null],
      newCustomerName: [null],
      accountsApproval: [null],
      approverName: [null],
      itReason: [null],
      jobCardNo: [null],
      vehicleNo: [null],
      newVehicleNo: [''],
      newJobCardStatus: [''],
      chassisNo: [''],
      vinNo: [''],
      engineNo: [''],
      model: [''],
      jobCardStatus: [''],
      newCustAccountNo: [''],
    });
  }

  itcorrectionform(val: any) {

    if (this.itCorrectionForm.invalid) {
      alert('Please fill required fields');
      return;
    }

    const payload = {
      ...val,
      customerSiteId: this.itCorrectionForm.get('customerSiteId')?.value,
      issueType: this.selectedIssueType,
      referenceType: this.itCorrectionForm.get('referenceType')?.value,
      createdBy: this.ticketNo
    };

    console.log('FINAL PAYLOAD:', payload);

    this.service.updateItCorrection(payload).subscribe({
      next: (res: any) => {
        if (res.code === 200) {
          alert('Correction Updated Successfully');
          this.itCorrectionForm.reset();
        } else {
          alert(`${res.message}\n${res.obj}`);
        }
      },
      error: () => {
        alert('Update API failed');
      }
    });
  }

  custNameSearch() {
    const custName = this.itCorrectionForm.get('custName')?.value;

    if (!custName) {
      alert('Please enter customer name');
      return;
    }

    this.service
      .custNameSearchFn1(custName)
      .subscribe(data => {
        if (data.code === 200) {
          this.customerNameSearch = data.obj;
        } else {
          alert(data.message);
        }
      });
  }

  selectCustomerForCorrection(com: any) {
    this.itCorrectionForm.patchValue({

      customerId: com.customerId,
      customerAccNo: com.customerAccNo,
      customerSiteId: com.customerSiteId,
      customerName: com.newCustomerName,
      customerType: com.customerType,
      title: com.newTitle,
      firstName: com.newFirstName,
      middleName: com.newMiddleName,
      lastName: com.newLastName,
      address1: com.saddress1,
      address2: com.saddress2,
      address3: com.saddress3,
      address4: com.newAddress4 || '-',
      city: com.scity,
      state: com.sstate,
      pinCode: com.spinCd,
      mobile1: com.smobile1,
      email1: com.semailId,
      panNo: com.newPanNo,
      gstNo: com.newGstNo,
      discountPercent: com.discountPercent
    });
    this.syncCustomerToCorrection();
    this.applyGstValidationByState();
  }

  searchByAccount1() {
    const accountNo = this.itCorrectionForm.get('customerAccNo')?.value;

    if (!accountNo) {
      alert('Please enter Customer Account Number');
      return;
    }

    this.service.searchCustomerByAccount(accountNo).subscribe({
      next: (res: any) => {

        if (res.code === 200 && res.obj) {

          const o = res.obj;
          this.customerNameSearch = o.customerSiteMasterList.map((site: any) => ({
            customerId: o.customerId,
            customerAccNo: o.custAccountNo,
            customerSiteId: site.customerSiteId,

            newCustomerName: o.custName,
            customerType: o.custType,

            newTitle: o.title,
            newFirstName: o.fName,
            newMiddleName: o.mName,
            newLastName: o.lName,

            saddress1: site.address1,
            saddress2: site.address2,
            saddress3: site.address3,
            newAddress4: o.address4,

            scity: site.city,
            sstate: site.state,
            spinCd: site.pinCd,

            newGstNo: site.gstNo,
            newPanNo: site.panNo,
            smobile1: site.mobile1,
            semailId: site.emailId,

            discountPercent: site.disPer,
            siteName: site.siteName
          }));
        } else {
          alert('Customer not found');
        }

      },
      error: () => {
        alert('Search by Account API failed');
      }
    });
  }

  searchBySalesOrder() {
    const orderNo = this.itCorrectionForm.get('soNumber')?.value;

    if (!orderNo) {
      alert('Please enter Sales Order Number');
      return;
    }

    this.service.getCustomerDetailsByOrderNo(orderNo).subscribe({
      next: (res: any) => {

        if (res.code === 200 && res.obj) {

          const obj = res.obj;
          const addressParts = obj.custAdd ? obj.custAdd.split(',') : [];

          this.itCorrectionForm.patchValue({
            customerId: obj.customerId,
            customerName: obj.custName,
            customerType: obj.custType,
            title: obj.title,
            firstName: obj.fName,
            middleName: obj.mName,
            lastName: obj.lName,
            address1: addressParts[0] || '',
            address2: addressParts[1] || '',
            address3: addressParts[2] || '',
            address4: addressParts[3] || '',
            city: addressParts[addressParts.length - 3] || '',
            pinCode: addressParts[addressParts.length - 2] || '',
            state: addressParts[addressParts.length - 1] || '',
            mobile1: obj.custContact,
            email1: obj.emailId,
            gstNo: obj.custGst,
            panNo: obj.custPan,
            customerSiteId: obj.billToLocId,
            discountPercent: obj.disPer
          });
          this.syncCustomerToCorrection();
          this.applyGstValidationByState();

          this.service.getOrderStatus(orderNo).subscribe({
            next: (statusRes: any) => {
              this.orderStatus = statusRes.obj;

              if (statusRes.obj === 'Y') {
                this.irnGenerated = true;
              } else {
                this.irnGenerated = false;
              }

              if (this.orderStatus === 'INVOICED') {
                this.showAccountsApproval = true;

                this.itCorrectionForm.get('accountsApproval')?.setValidators([]);
                this.itCorrectionForm.get('approverName')?.setValidators([]);

                this.itCorrectionForm.get('accountsApproval')?.updateValueAndValidity();
                this.itCorrectionForm.get('approverName')?.updateValueAndValidity();
              } else {
                this.showAccountsApproval = false;
              }

              alert(
                `Order Number : ${orderNo}\n` +
                `Order Status : ${this.orderStatus}\n` +
                `${statusRes.message}`
              );
            },
            error: () => {
              alert('Order Status API failed');
            }
          });
        } else {
          alert(res.message || 'Sales Order not found');
        }
      },
      error: () => {
        alert('Sales Order search API failed');
      }
    });
  }

  confirmUpdate() {

    if (this.selectedIssueType === 'Address Correction') {

      const f = this.itCorrectionForm.value;

      if (!f.newAddress1 || !f.newAddress2 || !f.newCity || !f.newState || !f.newPinCode) {
        alert('Please fill Address1, Address2, City, State and Pin Code before updating');
        return;
      }
    }

    if (this.itCorrectionForm.invalid) {
      alert('Please fill required fields');
      return;
    }

    this.itcorrectionform(this.itCorrectionForm.value);
  }

  searchByJobCard() {
    const jobCardNo = this.itCorrectionForm.get('jobCardNo')?.value;

    if (!jobCardNo) {
      alert('Please enter Job Card Number');
      return;
    }

    this.service.getDetailsByJobCardNo(jobCardNo).subscribe({
      next: (res: any) => {

        console.log('Job Card API response:', res);

        if (res.code === 200 && res.obj && res.obj.length > 0) {

          const jc = res.obj[0];

          this.itCorrectionForm.patchValue({

            customerId: jc.CUSTOMERID,
            customerAccNo: jc.CUSTACCOUNTNO,
            customerSiteId: jc.CUSTOMERSITEID,
            customerName: jc.CUSTNAME,
            customerType: jc.CUSTTYPE,
            title: jc.TITLE,
            firstName: jc.FNAME,
            middleName: jc.MNAME,
            lastName: jc.LNAME,
            address1: jc.ADDRESS1,
            address2: jc.ADDRESS2,
            address3: jc.ADDRESS3,
            address4: jc.ADDRESS4,
            city: jc.CITY,
            state: jc.STATE,
            pinCode: jc.PINCD,
            mobile1: jc.MOBILE1,
            email1: jc.EMAILID,
            panNo: jc.PANNO,
            gstNo: jc.GSTNO,
            discountPercent: jc.DISPER,
            jobCardNo: jc.JOBCARDNUM,
            jobCardStatus: jc.STATUS,
            vehicleNo: jc.REGNO
          });

          this.syncCustomerToCorrection();
          this.applyGstValidationByState();

          alert('Job Card details fetched successfully');

        } else {
          alert(res.message);
        }
      },
      error: () => {
        alert('Job Card search API failed');
      }
    });
  }


  searchByVehicleNo() {
    let vehicleNo = this.itCorrectionForm.get('vehicleNo')?.value;

    if (!vehicleNo) {
      alert('Please enter Vehicle Number');
      return;
    }

    vehicleNo = vehicleNo.toUpperCase();
    this.itCorrectionForm.get('vehicleNo')?.setValue(vehicleNo);

    this.service.getDetailsByVehicleNo(vehicleNo).subscribe({
      next: (res: any) => {

        console.log('Vehicle API response:', res);

        if (res.code === 200 && res.obj && res.obj.length > 0) {

          const v = res.obj[0];

          this.itCorrectionForm.patchValue({

            customerId: v.CUSTOMERID,
            customerAccNo: v.CUSTACCOUNTNO,
            customerName: v.CUSTNAME,
            customerType: v.CUSTTYPE,
            title: v.TITLE,
            firstName: v.FNAME,
            middleName: v.MNAME,
            lastName: v.LNAME,
            address1: v.ADDRESS1,
            address2: v.ADDRESS2,
            address3: v.ADDRESS3,
            address4: v.ADDRESS4,
            city: v.CITY,
            state: v.STATE,
            pinCode: v.PINCD,
            gstNo: v.GSTNO,
            panNo: v.PANNO,
            email1: v.EMAILID,
            mobile1: v.MOBILE1,
            discountPercent: v.DISPER,
            vehicleNo: v.REGNO,
            chassisNo: v.CHASSISNO,
            vinNo: v.VIN,
            engineNo: v.ENGINENO,
            model: v.MAINMODEL
          });

          this.syncCustomerToCorrection();
          this.applyGstValidationByState();

          alert('Vehicle details fetched successfully');

        } else {
          alert('Vehicle details not found');
        }
      },
      error: () => {
        alert('Vehicle search API failed');
      }
    });
  }

  syncCustomerToCorrection() {
    const f = this.itCorrectionForm;
    const issue = this.selectedIssueType;

    if (!issue) return;

    const customerType = f.get('customerType')?.value;

    switch (issue) {
      case 'Name Correction':
        f.patchValue({
          newCustomerName: f.get('customerName')?.value
        });

        if (customerType === 'Person') {
          f.patchValue({
            newTitle: f.get('title')?.value,
            newFirstName: f.get('firstName')?.value,
            newMiddleName: f.get('middleName')?.value,
            newLastName: f.get('lastName')?.value
          });
        } else {
          f.patchValue({
            newTitle: null,
            newFirstName: null,
            newMiddleName: null,
            newLastName: null
          });
        }
        break;

      case 'Address Correction':
        f.patchValue({
          newAddress1: f.get('address1')?.value,
          newAddress2: f.get('address2')?.value,
          newAddress3: f.get('address3')?.value,
          newAddress4: f.get('address4')?.value,
          newCity: f.get('city')?.value,
          newState: f.get('state')?.value,
          newPinCode: f.get('pinCode')?.value
        });
        break;

      case 'Mobile No Updation':
        f.patchValue({
          newMobileNo: f.get('mobile1')?.value
        });
        break;

      case 'Email Id Updation':
        f.patchValue({
          newEmailId: f.get('email1')?.value
        });
        break;

      case 'PAN No Updation':
        f.patchValue({
          newPanNo: f.get('panNo')?.value
        });
        break;

      case 'GST Updation':
        f.patchValue({
          newGstNo: f.get('gstNo')?.value
        });

        f.get('newGstNo')?.markAsTouched();
        f.get('newGstNo')?.updateValueAndValidity();

        break;

      case 'Discount Percent Change':
        f.patchValue({
          newDiscountPercent: f.get('discountPercent')?.value
        });
        break;

      case 'Vehicle No Updation':
        f.patchValue({
          newVehicleNo: f.get('vehicleNo')?.value
        });
        break;

      case 'Job Card Reopen':
        f.patchValue({
          newJobCardStatus: f.get('jobCardStatus')?.value
        });
        break;
    }
  }

  gstStateValidator(expectedStateCode: string) {
    return (control: any) => {

      if (!control.value) return null;

      const gst = control.value.toUpperCase();

      const gstRegex =
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

      if (!gstRegex.test(gst)) {
        return { invalidGSTFormat: true };
      }

      const gstStateCode = gst.substring(0, 2);

      if (gstStateCode !== expectedStateCode) {
        return { gstStateMismatch: true };
      }

      return null;
    };
  }

  applyGstValidationByState() {

    if (this.selectedIssueType !== 'GST Updation') {
      this.itCorrectionForm.get('newGstNo')?.clearValidators();
      this.itCorrectionForm.get('newGstNo')?.updateValueAndValidity();
      return;
    }

    const state = this.itCorrectionForm.get('state')?.value?.toString().trim();
    if (!state) return;

    const stateCode = this.stateGstCodeMap[state.toUpperCase()];
    if (!stateCode) return;

    const gstCtrl = this.itCorrectionForm.get('newGstNo');

    gstCtrl?.setValidators([
      this.gstStateValidator(stateCode)
    ]);

    gstCtrl?.updateValueAndValidity();
  }

  isStateReadonlyForAddressCorrection(): boolean {
    return (
      this.selectedIssueType === 'Address Correction' &&
      this.orderStatus === 'INVOICED'
    );
  }

  validateNewCustAccNo() {

    const custAccNo = this.itCorrectionForm.get('newCustAccountNo')?.value;

    if (!custAccNo) {
      return;
    }

    this.service.getCustAccNoValidation(custAccNo).subscribe({
      next: (res: any) => {

        console.log('Validation response:', res);

        if (res.code === 200) {
          // Valid account
          console.log('Customer Account is valid');
        } else {
          alert('Invalid Customer Account Number');
          this.itCorrectionForm.get('newCustAccountNo')?.setValue('');
        }

      },
      error: () => {
        alert('Customer Account Validation API failed');
      }
    });
  }
}
