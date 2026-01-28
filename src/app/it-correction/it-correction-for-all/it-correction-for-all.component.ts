import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ItCorrectionService } from '../it-correction.service';


@Component({
  selector: 'app-it-correction-for-all',
  templateUrl: './it-correction-for-all.component.html',
  styleUrls: ['./it-correction-for-all.component.css']
})
export class ItCorrectionForAllComponent implements OnInit {
itCorrectionForm!: FormGroup;

  ticketNo!: string;
  issueTypeLovList: any[] = [];
  referenceTypeLovList: any[] = [];
  customerNameSearch: any[] = [];
  custName?: string;
  selectedIssueType: string | null = null;

  showAccountsApproval = false;
  orderStatus: string | null = null;

  irnGenerated = false;
  approverNameLovList: any[] = [];

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

      if (val === 'GST Updation' || val === 'PAN No Updation') {
        this.showAccountsApproval = true;
      } else {
        if (this.orderStatus !== 'INVOICED') {
          this.showAccountsApproval = false;
        }
      }
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

    this.service.getReferenceTypes().subscribe({
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
      newAddress1: [null],
      newAddress2: [null],
      newAddress3: [null],
      newAddress4: [null],
      newCity: [null],
      newState: [null],
      newPinCode: [null],
      newMobileNo: [null],
      newEmailId: [null],
      newPanNo: [null],
      newGstNo: [null],
      newDiscountPercent: [null],
      newCustomerName: [null],
      accountsApproval: [null],
      approverName: [null],
      itReason: [null],
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
  }


  searchByAccount1() {
    const accountNo = this.itCorrectionForm.get('customerAccNo')?.value;

    if (!accountNo) {
      alert('Please enter Customer Account Number');
      return;
    }

    this.service.searchCustomerByAccount(accountNo).subscribe({
      next: (res: any) => {
        const obj = res?.obj;
        if (!obj) {
          alert('Customer not found');
          return;
        }

        this.itCorrectionForm.patchValue({
          customerId: obj.customerId || obj.custAccountNo,
          customerName: obj.custName,
          customerType: obj.custType,
          title: obj.title,
          firstName: obj.fName,
          middleName: obj.mName,
          lastName: obj.lName,
          address1: obj.address1,
          address2: obj.address2,
          address3: obj.address3,
          address4: obj.address4,
          city: obj.city,
          state: obj.state,
          pinCode: obj.pinCd,
          gstNo: obj.gstNo,
          panNo: obj.panNo,
          email1: obj.emailId,
          mobile1: obj.mobile1,
          discountPercent: obj.discountPercent || obj.discountPct
        });

        const site = obj.customerSiteMasterList?.[0];
        if (site) {
          this.itCorrectionForm.patchValue({
            gstNo: site.gstNo,
            panNo: site.panNo,
            customerSiteId: site.customerSiteId,
            discountPercent: site.disPer
          });
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

                // Optional: make fields required
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
    if (this.itCorrectionForm.invalid) {
      alert('Please fill required fields');
      return;
    }
  
    this.itcorrectionform(this.itCorrectionForm.value);
  }
}
