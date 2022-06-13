import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { MasterService } from 'src/app/master/master.service';
import { Location } from "@angular/common";
import { ActivatedRoute, ParamMap } from '@angular/router';


interface IPaymentRcpt {
  deptId: number;
  deptName: string;
  customerId: number;
  orderNumber: number;
  ayType: string;
  receiptMethodId: number;
  paymentAmt: number;
  bankName: string;
  bankBranch: string;
  checkNo: string;
  checkDate: string;
  receiptMethodName: string;
  custGst: string;
  custPan: string;
}


@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.css']
})
export class PaymentReceiptComponent implements OnInit {
  paymentReceiptForm: FormGroup;
  deptName: string;
  public DivisionIDList: Array<string> = [];
  public OUIdList: Array<string> = [];
  public DepartmentList: Array<string> = [];
  public statusList: Array<string> = [];
  showreceiptMethodName=true;
  isDisabledSave = false;
  custGst: string;
  custPan: string;
  public locIdList: Array<string> = [];
  public PaymentModeList: Array<string> = [];
  buttonviewReceipt = true;
  // public ReceiptMethodList: Array<string> = [];
  ReceiptMethodList: any = [];
  public ReverseReasonList: Array<string> = [];
  lstcomments: any[];

  ouId: number;
  deptId: number;
  checkNo: string;
  // checkDate: Date;
  bankName: string;
  bankBranch: string;
  paymentAmt: number;
  methodType: string;
  // payType : string; 
  rmStatus: string
  payType: string;
  // paymentMethod : string;
  receiptNumber: number;
  receiptMethodName: string;
  receiptMethodId: number;
  orderNumber: number;
  emplId: number;
  custName: string;
  customerId: number;
  // paymentCollection: string;

  balancePay: number;
  // refNumber:number;


  pipe = new DatePipe('en-US');
  now = Date.now();
  receiptDate = this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
  // checkDate = this.pipe.transform(this.now, 'dd-MM-yyyy');
  checkDate: Date;
  cancelDate = null;

  comment: string

  searchBy: string
  searchValue: string;
  // public searchValue=2111242154;
  // public  searchBy ="ORDER NUMBER"

  searchByRcptNo: number;
  searchByOrderNo: number;
  searchByCustNo: number;

  // public searchByRcptNo =2111202105;
  // public searchByOrderNo =2111202148;
  // public searchByCustNo =1212;

  // searchByOrderNo:number;
  // searchByCustNo:number;
  // searchByRcptNo:number;

  cancelReason: string;
  loginName: string;
  loginArray: string;
  name: string;
  ouName: string;
  locId: number;
  locName: string;
  customerName: string;

  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  showOrg = false;
  showReason = false;
  showBankDetails = false;
  private sub: any;






  get f() { return this.paymentReceiptForm.controls; }

  paymentReceipt(paymentReceiptForm: any) { }

  constructor(private fb: FormBuilder, private location: Location, private service: MasterService, private router: Router, private orderManagementService: OrderManagementService, private router1: ActivatedRoute) {

    this.paymentReceiptForm = fb.group({
      divisionId: [],
      division: [],
      ouId: [],
      deptId: [],
      paymentAmt: [],
      receiptDate: [],
      receiptMethodId: [],
      // paymentCollection: [],
      searchValue: [],
      searchBy: [],
      balancePay: [],
      comment: ['', [Validators.required]],
      cancelReason: [],
      cancelDate: [],
      custGst: [],
      custPan: [],
      receiptNumber: [],
      payType: [],
      // methodType:[],
      bankName: ['', Validators.required],
      bankBranch: ['', Validators.required],
      checkNo: ['', [Validators.required, Validators.pattern('[a-zA-Z,. 0-9/-]*')]],
      checkDate: ['', Validators.required],
      searchByRcptNo: [],
      searchByOrderNo: [],
      searchByCustNo: [],
      loginArray: [''],
      loginName: [''],
      ouName: [''],
      locId: [''],
      locName: [''],
      emplId: [''],
      // refNumber:[''],
      orderNumber: [''],
      receiptMethodName: [''],
      customerId: [''],
      // customerName:['']
      custName: [''],
    });


  }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name');
    this.loginArray = sessionStorage.getItem('divisionName');
    this.loginName = sessionStorage.getItem('name')
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.deptId = Number(sessionStorage.getItem('dept'))
    // this.locName=(sessionStorage.getItem('locName'));
    // this.paymentReceiptForm.patchValue({checkDate:(this.pipe.transform(this.now, 'dd-MM-yyyy'))});
    // console.log(this.pipe.transform(this.now, 'dd-MM-yyyy'));

    // alert(this.paymentReceiptForm.get('checkDate').value);
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.buttonviewReceipt = true;

    console.log(this.loginArray);
    console.log(this.locId);
    console.log(this.emplId);

    if (Number(sessionStorage.getItem('deptId')) == 4) {
      this.isDisabledSave = true;
    }

    this.service.OUIdList()
      .subscribe(
        data => {
          this.OUIdList = data;
          console.log(this.OUIdList);
        }
      );

    this.service.getLocationSearch()
      .subscribe(
        data => {
          this.locIdList = data;
          console.log(this.locIdList);
        }
      );


    this.service.DepartmentList()
      .subscribe(
        data => {
          this.DepartmentList = data;
          console.log(this.DepartmentList);
          // this.displayButton=true;
        }
      );


    this.orderManagementService.PaymentModeList()
      .subscribe(
        data => {
          this.PaymentModeList = data;
          console.log(this.PaymentModeList);
        }
      );

    this.service.ReverseReasonList()
      .subscribe(
        data => {
          this.ReverseReasonList = data;
          console.log(this.ReverseReasonList);
        }
      );

    this.sub = this.router1.params.subscribe(params => {
      this.orderNumber = params['orderNumber'];
      // alert(this.orderNumber);
      this.orderManagementService.getOmReceiptSearchByOrdNo(this.orderNumber)
        .subscribe(
          data => {
            this.lstcomments = data.obj.oePayList;
            this.custName = data.obj.custName;
            this.customerId = data.obj.customerId;
            this.custPan = data.obj.custPan;
            this.custGst = data.obj.custGst;
            this.paymentReceiptForm.patchValue({ balancePay: data.obj.balancePay })
            // this.lstcomments = data.obj;
            // this.lstcomments = data;
            console.log(this.lstcomments);
            if (data.obj.oePayList.length > 0) {
              this.buttonviewReceipt = false;
            }
          }

        );
      // this.paymentReceiptForm.patchValue( this.lstcomments );
    });


  }




  onPayTypeSelected(payType: any, rmStatus: any) {
    var payType = payType.target.value;
    // alert(payType)
    if (payType === 'CASH') {
      var cashsum = 0;
      var paymentAmt = this.paymentReceiptForm.get('paymentAmt').value;
      console.log(this.lstcomments);
      var panNo = this.paymentReceiptForm.get('custPan').value;
      if (this.lstcomments.length != 0) {
        for (let k = 0; k < this.lstcomments.length; k++) {
          if (panNo != 'APPLIEDFOR') {
            if (this.lstcomments[k].payType == 'CASH') {
              cashsum = paymentAmt + this.lstcomments[k].paymentAmt;
              // alert(cashsum)
              if (cashsum > 150000) {
                alert('Total cash Amount 150000 please confirm.!');
                return;
              }
            }
          }
          if (panNo == 'APPLIEDFOR') {
            if (this.lstcomments[k].payType == 'CASH') {
              cashsum = paymentAmt + this.lstcomments[k].paymentAmt;
              if (cashsum > 25000) {
                alert('Please check Pan Number Not updated And Total cash Amount 25000 please confirm.!');
                return;
              }
            }
          }

        }
        if (panNo == 'APPLIEDFOR') {
          cashsum = this.paymentAmt + cashsum;
          if (cashsum > 25000) {
            alert(' Please check Pan Number Not updated And Total cash Amount 25000 please confirm.!');
            return;
          }
        }
      }
      this.service.ReceiptMethodListNew(payType, rmStatus, sessionStorage.getItem('deptId'), sessionStorage.getItem('ouId'))
        .subscribe(
          data => {
            this.ReceiptMethodList = data.obj;
            console.log(this.ReceiptMethodList);
            this.showBankDetails = false;
            this.paymentReceiptForm.get('checkNo').reset();
            this.paymentReceiptForm.get('bankName').reset();
            this.paymentReceiptForm.get('bankBranch').reset();
            this.paymentReceiptForm.get('checkDate').reset();
          }
        );
    } else {
      this.service.ReceiptMethodListNew(payType, rmStatus, sessionStorage.getItem('deptId'), sessionStorage.getItem('ouId'))
        .subscribe(
          data => {
            this.ReceiptMethodList = data.obj;
            console.log(this.ReceiptMethodList);
            this.showBankDetails = true;
          });
    }

  }

  searchMastNew(rcptNo: any, ordNo: any, custNo: any) {
    // alert("Receipt No : "+ rcptNo + " Order no :"+ordNo + " Cust Ac No :" + custNo);
    this.orderManagementService.getOmReceiptSearchBy(rcptNo, ordNo, custNo)
      .subscribe(
        data => {
          this.lstcomments = data.obj;
          console.log(this.lstcomments);
        }
      );
  }


  searchMast(refNumber: any, searchBy: any) {
    alert("Search Value: " + refNumber + "  Search Type : " + searchBy);

    if (searchBy === 'ORDER NUMBER') {
      this.orderManagementService.getOmReceiptSearchByOrdNo(refNumber)
        .subscribe(
          data => {
            this.lstcomments = data.obj.oePayList;
            this.paymentReceiptForm.patchValue({ balancePay: data.obj.balancePay })
            console.log(this.lstcomments);
          }
        );
    }

    if (searchBy === 'RECEIPT NUMBER') {
      this.orderManagementService.getOmReceiptSearchByRcptNo(refNumber)
        .subscribe(
          data => {
            this.lstcomments = data.obj.oePayList;
            console.log(this.lstcomments);
          }
        );
    }

    if (searchBy === 'CUSTOMER NUMBER') {
      this.orderManagementService.getOmReceiptSearchByCustAcNo(refNumber)
        .subscribe(
          data => {
            this.lstcomments = data.obj.oePayList;
            console.log(this.lstcomments);
          }
        );
    }

  }


  Select(receiptNumber: number) {
    // alert ("receipt Number :" +receiptNumber);

    let select = this.lstcomments.find(d => d.receiptNumber === receiptNumber);
    if (select) {
      this.paymentReceiptForm.patchValue(select);
      this.receiptNumber = select.receiptNumber;
      // alert(select.receiptMethodName);
      // let recValue =this.ReceiptMethodList.find(d => d.methodName === select.receiptMethodName);
      // console.log(recValue);
      this.paymentReceiptForm.patchValue({ receiptMethodName: select.receiptMethodName });
      this.displayButton = false;
      this.display = false;
      this.paymentReceiptForm.disable();
      this.showreceiptMethodName=false;
    }
  }

  transeData(val) {
    delete val.searchValue;
    delete val.searchBy;
    delete val.division;
    delete val.divisionId;
    // delete val.locId;
    delete val.ouId;
    // delete val.paymentCollection;
    delete val.cancelReason;
    delete val.cancelDate;
    // delete val.emplId;
    delete val.locName;
    delete val.loginArray;
    delete val.loginName;
    delete val.ouName;
    delete val.receiptDate;
    delete val.searchByCustNo;
    delete val.searchByOrderNo;
    delete val.searchByRcptNo;
    // delete val.receiptMethodId;

    return val;
  }


  onmethodNameSelected(event) {
    let selectReceipt = this.ReceiptMethodList.find(d => d.methodName === event);
    this.paymentReceiptForm.patchValue({ receiptMethodId: selectReceipt.receiptMethodId })
  }


  newMast() {
    this.isDisabledSave = true;
    const formValue: IPaymentRcpt = this.transeData(this.paymentReceiptForm.value);
    var payType = this.paymentReceiptForm.get('payType').value;
    if (this.paymentReceiptForm.get('paymentAmt').value === undefined || payType === undefined) {
      alert('Please Fill-UP  blank Details...!');
      this.isDisabledSave = false;
      return;
    }
    if (payType.includes("CASH") === false) {
      if (this.paymentReceiptForm.get('receiptMethodName').value === undefined ||
        this.paymentReceiptForm.get('checkNo').value === undefined ||
        this.paymentReceiptForm.get('bankName').value === undefined ||
        this.paymentReceiptForm.get('bankBranch').value === undefined ||
        this.paymentReceiptForm.get('checkDate').value === undefined) {
        alert('Select Bank details And then Save...!');
        this.isDisabledSave = false;
        return;
      }
    }
    if (payType === 'CASH') {
      var cashsum = 0;
      var paymentAmt = this.paymentReceiptForm.get('paymentAmt').value;
      var panNo = this.paymentReceiptForm.get('custPan').value;
      console.log(this.lstcomments);
      if (this.lstcomments.length != 0) {
        for (let k = 0; k < this.lstcomments.length; k++) {
          if (panNo != 'APPLIEDFOR') {
            if (this.lstcomments[k].payType == 'CASH') {
              cashsum = paymentAmt + this.lstcomments[k].paymentAmt;
              if (cashsum > 150000) {
                alert('Total cash Amount 150000 please confirm.!');
                this.isDisabledSave = false;
                return;
              }
            }
          }
          else if (panNo == 'APPLIEDFOR') {
            if (this.lstcomments[k].payType == 'CASH') {
              cashsum = paymentAmt + this.lstcomments[k].paymentAmt;
              if (cashsum > 25000) {
                alert('Please check Pan Number Not updated And Total cash Amount 25000 please confirm.!');
                this.isDisabledSave = false;
                return;
              }
            }
          }
        }
        if (panNo == 'APPLIEDFOR') {
          cashsum = this.paymentAmt + cashsum;
          if (cashsum > 25000) {
            alert('Please check Pan Number Not updated And Total cash Amount 25000 please confirm.!');
            this.isDisabledSave = false;
            return;
          }
        }
      }
    }
    formValue.deptName = (sessionStorage.getItem('deptName'));
    // alert(selectReceipt.methodName +'----'+ this.receiptMethodId );
    this.orderManagementService.OrderReceiptSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.displayButton = false;
        // this.paymentReceiptForm.reset();
        this.paymentReceiptForm.disable();
        this.orderManagementService.getOmReceiptSearchByOrdNo(this.orderNumber)
          .subscribe(
            data => {
              this.lstcomments = data.obj.oePayList;
              this.custName = data.obj.custName;
              this.customerId = data.obj.customerId;
              this.paymentReceiptForm.patchValue({ balancePay: data.obj.balancePay })
              // this.lstcomments = data.obj;
              // this.lstcomments = data;
              console.log(this.lstcomments);
              this.showBankDetails = false;
            }

          );
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.isDisabledSave = false;
          // this.paymentReceiptForm.reset();
        }
      }
    });
  }

  updateMast() { }

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    // this.router.navigate(['admin']);
    this.location.back();
  }


  routeOMAndCSPage() {
    if (this.orderNumber != null) {
      if (Number(sessionStorage.getItem('deptId')) == 1) {
        // alert(Number(sessionStorage.getItem('deptId'))+'----'+ this.orderNumber)
        this.router.navigate(['/admin/OrderManagement/SalesOrderForm', this.orderNumber]);
      }
      else if (Number(sessionStorage.getItem('deptId')) == 6) {
        this.router.navigate(['/admin/OrderManagement/CounterSaleOrder', this.orderNumber]);
      }
      else if (Number(sessionStorage.getItem('deptId')) == 5) {
        this.router.navigate(['/admin/OrderManagement/CounterSaleOrder', this.orderNumber]);
      }
    }
    else {
      this.location.back();
    }
  }

  reverseReceipt() {


    this.cancelDate = this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
    this.showReason = true;

  }


  // ------------------------Validatiopns------------------------------------

  // CheckDataValidations(){

  //   const formValue: IPaymentRcpt = this.paymentReceiptForm.value;

  //   if (formValue.ouId===undefined || formValue.ouId===null)
  //   {
  //      this.checkValidation=false; 
  //      alert ("OPERATING UNIT: Should not be null....");
  //       return;
  //    } 

  //   if (formValue.ouId===undefined || formValue.ouId===null)
  //   {
  //      this.checkValidation=false; 
  //      alert ("LOCATION: Should not be null....");
  //       return;
  //    } 

  //    if (formValue.ouId===undefined || formValue.ouId===null)
  //   {
  //      this.checkValidation=false; 
  //      alert ("DEPT: Should not be null....");
  //       return;
  //    } 


  //    if (formValue.custAccountNo===undefined || formValue.custAccountNo===null)
  //    {
  //       this.checkValidation=false; 
  //       alert ("CUST NO : Should not be null....");
  //        return;
  //     } 


  //     if (formValue.billToSiteId===undefined || formValue.billToSiteId===null)
  //     {
  //         this.checkValidation=false; 
  //         alert ("BILL TO SITE : Should not be null....");
  //         return;
  //       } 


  //       if(formValue.glDate===undefined || formValue.glDate===null ) 
  //       {
  //           this.checkValidation=false;
  //           alert ("GL DATE: Should not be null value");
  //           return; 
  //        }

  //       if (formValue.paymentAmt <=0 || formValue.paymentAmt===undefined || formValue.paymentAmt===null )
  //       {
  //           this.checkValidation=false;  
  //           alert ("RECEIPT AMT: Should be above Zero");
  //           return;
  //       } 

  //     if (formValue.refType===undefined || formValue.refType===null)
  //     {
  //         this.checkValidation=false; 
  //         alert ("REF TYPE: Should not be null....");
  //         return;
  //       } 

  //     if(formValue.refType !='Advance' && (formValue.referenceNo==null || formValue.referenceNo.trim()=='' ))
  //     {
  //       alert("REFERENCE NO\nRef.number to be entered for Non-Advance Receipts");
  //       return;
  //     }

  //     if (formValue.payType===undefined || formValue.payType===null)
  //     {
  //        this.checkValidation=false;   
  //        alert ("PAY MODE: Please Select payment Type....");
  //         return;
  //      } 

  //      if (formValue.receiptMethodId===undefined || formValue.receiptMethodId===null)
  //      {
  //        this.checkValidation=false;  
  //        alert ("PAY METHOD: Please Select Receipt Method....");

  //        return;
  //       } 

  //       if (formValue.payType !==null) {
  //         if (formValue.payType != 'CASH') {

  //          if (formValue.bankName===undefined || formValue.bankName===null)
  //          {
  //              this.checkValidation=false;  
  //              alert ("BANK : Please Enter Bank Name....");
  //              return;
  //           } 

  //           if (formValue.bankBranch===undefined || formValue.bankBranch===null)
  //           {
  //               this.checkValidation=false;  
  //               alert ("BANK BRANCH : Please Enter Bank Branch....");
  //               return;
  //            } 

  //            if (formValue.checkNo===undefined || formValue.checkNo===null)
  //            {
  //                this.checkValidation=false;  
  //                alert ("CHECK/DD/CRD/NEFT NO: Please Enter Cheq/dd no...");
  //                return;
  //             } 

  //             if (formValue.checkDate===undefined || formValue.checkDate===null)
  //             {
  //                 this.checkValidation=false;  
  //                 alert ("CHECK/DD/CRD/NEF DATE: Please Select Chq/dd.. Date....");
  //                 return;
  //              } 
  //         }

  //        }

  //        if (formValue.receiptStatus===undefined || formValue.receiptStatus===null)
  //        {
  //           this.checkValidation=false; 
  //           alert ("RECEIPT STATUS: Should not be null....");
  //            return;
  //         } 
  //     this.checkValidation=true

  // }


  viewReceipt() {
    var orderNumber = this.paymentReceiptForm.get('orderNumber').value;
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (Number(sessionStorage.getItem('deptId')) === 1) {
      this.orderManagementService.viewSalesReceipt(orderNumber)
        .subscribe(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          var printWindow = window.open(url, '', 'width=800,height=500');
          printWindow.open
        })
    }
    else {
      this.orderManagementService.viewReceipt(orderNumber)
        .subscribe(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          var printWindow = window.open(url, '', 'width=800,height=500');
          printWindow.open
        })
    }
  }


  receiptView(receiptNo) {
    this.orderManagementService.receiptView(receiptNo)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      })
  }

}

