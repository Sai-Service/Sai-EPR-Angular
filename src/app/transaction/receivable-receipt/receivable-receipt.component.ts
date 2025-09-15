import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { DatePipe } from '@angular/common';
import { OrderManagementService } from '../../order-management/order-management.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from "@angular/common";
import { relativeTimeRounding } from 'moment';
import { ServiceService } from '../../service/service.service';
import { ReturnStatement, ThrowStmt } from '@angular/compiler';


interface IPaymentRcptAr {
  referenceNo: string;
  referenceDate: string;
  refType: string;
  ouId: number;
  locId: number;
  deptId: number;
  custAccountNo: number;
  billToSiteId: number;
  billToCustId: number;
  glDate: Date;
  // glDateLine:Date
  receiptNumber: number;
  receiptDate: Date;
  receiptStatus: string;
  payType: string;
  receiptMethodId: number;
  paymentAmt: number;
  bankName: string;
  bankBranch: string;
  checkNo: string;
  checkDate: string;
  reversalDate: string;
  reversalComment: string;
  reversalReasonCode: string;
  bounceReasonCode: string;
  reversalCategory: string;
  status: string;
  chqBounceCharge: number;
  tdsAmount: number;
  tdstrxNumber: string;
  policyTerm: number;
  customerSiteId: number;
}

@Component({
  selector: 'app-receivable-receipt',
  templateUrl: './receivable-receipt.component.html',
  styleUrls: ['./receivable-receipt.component.css']
})
export class ReceivableReceiptComponent implements OnInit {
  paymentArForm: FormGroup;
  orgId: number;
  divisionId: number;
  locationId: number;
  locId: number;
  emplId: number;
  customerId: number;
  ouId: number;
  deptId: number;
  cashReceiptId: number;
  ouName: string;
  deptName: string;
  locName: string;
  vehNo: string;
  custName: string | null;
  custAccountNo: number;
  custSiteAddress: string | null;
  custTdsPer: number;
  tdsAmount: number;
  paymentAmt: number|null;
  loginArray: string;
  custSiteName:string;
  customerSiteId:number;
  receiptNumber:number;
  pipe = new DatePipe('en-US');
  now = Date.now();
  public minDate = new Date();
  receiptDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  glDate = this.pipe.transform(this.now, 'y-MM-dd');
  billToLocId:number;
  refType:string;
  referenceNo:string;
  referenceDate:Date;
  receiptStatus:string;
  payType:string;
  tdstrxNumber:number;
  receiptMethodId:number|null;
  bankName :string|null;
  bankBranch :string|null;
  checkNo :string|null;
  checkDate :string|null;
 




  OUIdList: any = [];
  locIdList: any = [];
  accountsLogin = false;
  DepartmentList: any = [];
  accountNoSearch: any = []=[];
  ReceiptMethodList:any=[];
  ReceiptTypeArList:any=[];
  ReceiptStatusList:any=[];
  PaymentModeList:any=[];
  displayglDateDisabled = true;
  displayButton = true;
  enableCustAccount = true;
  fromJc = false;
  showRefYellow = false;
  reInsurance = false;
  showOTHERModal = false;
  showBankDetails = false;
 


  constructor(private service: MasterService, private location: Location, private orderManagementService: OrderManagementService, private fb: FormBuilder, private router: Router, private router1: ActivatedRoute, private router2: ActivatedRoute, private router3: ActivatedRoute, private router4: ActivatedRoute) {
    this.paymentArForm = fb.group({
      orgId: [],
      divisionId: [],
      locationId: [],
      locId: [],
      emplId: [],
      customerId: [],
      ouId: [],
      deptId: [],
      cashReceiptId: [],
      ouName: [],
      deptName: [],
      locName: [],
      vehNo: [],
      custName: [],
      custAccountNo: [],
      custSiteName:[],
      customerSiteId:[],
      receiptNumber:[],
      receiptDate:[],
      glDate:[],
      paymentAmt:[0],
      billToLocId:[],
      refType:[],
      referenceNo:[],
      referenceDate:[],
      tdsAmount:[],
      receiptStatus:[],
      payType:[],
      tdstrxNumber:[],
      receiptMethodId:[],
      bankName :[],
      bankBranch :[],
      checkNo :[],
      checkDate :[],
    })
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.paymentArForm.patchValue({
      name: sessionStorage.getItem('name'), loginArray: sessionStorage.getItem('divisionName'),
      divisionId: Number(sessionStorage.getItem('divisionId')), loginName: sessionStorage.getItem('name'),
      ouName: (sessionStorage.getItem('ouName')), ouId: Number(sessionStorage.getItem('ouId')), locId: Number(sessionStorage.getItem('locId')),
      locationId: Number(sessionStorage.getItem('locId')), orgId: Number(sessionStorage.getItem('ouId')),
      deptId: (sessionStorage.getItem('dept')), deptName: (sessionStorage.getItem('deptName')),
      locName: (sessionStorage.getItem('locCode'))
    });

    this.service.OUIdListDiv(Number(sessionStorage.getItem('divisionId')))
      .subscribe(
        data => { this.OUIdList = data; }
      );

    this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
      .subscribe(data => { this.locIdList = data; }
      );

    this.service.DepartmentList()
      .subscribe(
        data => { this.DepartmentList = data; }
      );

    this.service.ReceiptTypeArList()
      .subscribe(
        data => {this.ReceiptTypeArList = data;
        }
      );

  this.service.ReceiptStatusList()
      .subscribe(data => { this.ReceiptStatusList = data; }
      );

   this.service.PaymentModeList()
      .subscribe( data => { this.PaymentModeList = data; }
      );


    if (Number(sessionStorage.getItem('deptId')) === 4) {
      this.accountsLogin = true;
      this.displayglDateDisabled = false;
    }
    else {
      this.accountsLogin = false;
      this.accountsLogin = false;
      this.displayglDateDisabled = true;
      this.paymentArForm.get('deptId')?.disable();
    }
  }


  get f() { return this.paymentArForm.controls; }

  paymentAr(paymentArForm: any) { }



  CustAccountNoSearch(accountNo) {
    if (accountNo <= 0) {
      this.custName = null;
      this.custSiteAddress = null;
    } else {

      this.service.custAccountNoSearch(accountNo, sessionStorage.getItem('ouId'), sessionStorage.getItem('divisionId'))
        .subscribe(
          data => {
            this.accountNoSearch = data.obj;
            if (data.obj.length === 0) {
              this.custName = null;
              this.custSiteAddress = null;
              this.paymentArForm.patchValue({ custAccountNo: '' });
              alert("Customer Account doesn't Exists OR Not attached to \nDivision/OpUnit -" + this.loginArray + "(" + this.divisionId + ") / " + this.ouName + "(" + this.ouId + ")")
            }
            else {
              this.paymentArForm.patchValue({ custAccountNo: data.obj[0].accountNo });
              console.log(this.accountNoSearch);
              this.enableCustAccount = false;
              this.paymentArForm.patchValue({
                customerId: this.accountNoSearch[0].customerId,
                custName: this.accountNoSearch[0].custName,
                billToSiteId: this.accountNoSearch[0].billToLocId,
                billToCustId: this.accountNoSearch[0].billToLocId,
                customerSiteAddress: this.accountNoSearch[0].billToAddress,
                custCity: this.accountNoSearch[0].siteName,
                custState: this.accountNoSearch[0].state,
                CustomerGstNo: this.accountNoSearch[0].gstNo,
                customerPanNo: this.accountNoSearch[0].panNo,
                customerTanNo: this.accountNoSearch[0].tanNo,
                custPhone: this.accountNoSearch[0].mobile1,
                custTdsPer: this.accountNoSearch[0].tdsPer,
              });

              // this.GetCustomerSiteDetails(this.accountNoSearch.customerId);
              this.getTdsAmount(this.accountNoSearch.tdsPer)

            }

          });
    }


  }

  getTdsAmount(t) {
    var tdsP = this.paymentArForm.get('custTdsPer')?.value;
    if (tdsP == null || tdsP == undefined) { tdsP = 0; this.custTdsPer = 0; this.tdsAmount = 0; }
    if (Number(this.paymentAmt) > 0) {
      this.tdsAmount = (Number(this.paymentAmt) * tdsP / 100);
    } else { this.tdsAmount = 0; }
  }


 onOptionsSelectedcustSiteName(event: Event) {
  const selectedValue = (event.target as HTMLSelectElement).value;
  console.log('Selected Value:', selectedValue);

  let selSite = this.accountNoSearch.find(d => d.siteName === selectedValue);
  if (selSite) {
    this.paymentArForm.patchValue({
      customerSiteId: selSite.billToLocId,
    });
  } else {
    console.warn('Site not found in accountNoSearch');
  }
}



 validateAmt(rcptAmt: any) {
  // alert(rcptAmt)
    if (rcptAmt === null || rcptAmt === undefined || rcptAmt <= 0) {
      alert("RECEIPT AMOUNT :  Should be above Zero.");
      this.paymentAmt = null;
      return;
    }

    if (rcptAmt > 3000000) {
      alert("RECEIPT AMOUNT :  Should  not above 3000000.");
      this.paymentArForm.get('paymentAmt')?.reset();
    }

    if (this.paymentArForm.get('payType')?.value == null || this.paymentArForm.get('payType')?.value == undefined) {
      var paytype = this.paymentArForm.get('payType')?.value;
      var customerId = this.paymentArForm.get('customerId')?.value;
      var frmRecAmt = Number(this.paymentArForm.get('paymentAmt')?.value);
      this.service.methodWiseAmountCheckVal(customerId, sessionStorage.getItem('locId'), sessionStorage.getItem('ouId'), paytype)
        .subscribe(
          data => {
            this.ReceiptMethodList = data.obj;
            if (paytype === 'CASH') {
              var apiAmt = frmRecAmt + Number(data.obj);
              if (apiAmt > 150000) {
                alert("RECEIPT AMT: Should Be Less Than Rs.150000 ");
                this.paymentArForm.get('paymentAmt')?.reset();
              }
            }
            if (paytype === 'WALLET') {

              var apiAmt = frmRecAmt + Number(data.obj);
              if (apiAmt > 200000) {
                alert("RECEIPT AMT: Should Be Less Than Rs.200000");
                this.paymentArForm.get('paymentAmt')?.reset();
              }
            }
            if (paytype === 'RTGS/NEFT') {

              var apiAmt = frmRecAmt + Number(data.obj);
              if (apiAmt > 2000000) {
                alert("RECEIPT AMT: Should Be Less Than Rs.2000000");
                this.paymentArForm.get('paymentAmt')?.reset();
              }
            }
            if (paytype === 'CREDIT CARD') {

              var apiAmt = frmRecAmt + Number(data.obj);
              if (apiAmt > 500000) {
                alert("RECEIPT AMT: Should Be Less Than Rs. 500000");
                this.paymentArForm.get('paymentAmt')?.reset();
              }
            }
            if (paytype === 'DEBIT CARD') {

              var apiAmt = frmRecAmt + Number(data.obj);
              if (apiAmt > 500000) {
                alert("RECEIPT AMT: Should Be Less Than Rs.500000");
                this.paymentArForm.get('paymentAmt')?.reset();
              }
            }
          }
        )
    }

    this.getTdsAmount(this.custTdsPer);

  }

    onKey(event: any) {
    if (this.custAccountNo == null || this.custAccountNo == undefined) {
      alert("CUSTOMER :  Select Customer.");
      this.paymentAmt = null;
      return;
    }
    this.getTdsAmount(this.custTdsPer);
  }

  validateTdsAmt(rcptAmt: any) {
    var tdsAmt = this.paymentArForm.get('tdsAmount')?.value
    if (tdsAmt < 0) {
      alert("TDS AMOUNT :  Should not be below Zero.");
      this.paymentArForm.patchValue({ tdsAmount: 0 })
      return;
    }
  }
    onRefTypeSelected(mRefType) {
    this.referenceNo = '';
    if (mRefType === 'Advance' || mRefType === undefined) { this.showRefYellow = false; }
    else { this.showRefYellow = true; }
    if (mRefType === 'ReIns-Renewal') { this.reInsurance = true; this.showRefYellow = true; } else { this.reInsurance = false; }
  }

  
  onPayTypeSelected(event: any, rmStatus: any) {
    // alert(event.target.value);
    var value=event.target.value;
     var payType1 = value.substr(value.indexOf(':') + 1, value.length);
     var payType=payType1.trim();
    //  alert(payType)
    this.ReceiptMethodList = null;
    this.showOTHERModal = false;
    
      this.service.ReceiptMethodListNew(payType, rmStatus, sessionStorage.getItem('deptId'), sessionStorage.getItem('ouId'))
        .subscribe(
          data => {
            debugger;
            this.ReceiptMethodList = data.obj;
            console.log(this.ReceiptMethodList+'------');
            this.showBankDetails = true;
            if (this.displayButton == true) {
              this.checkDate = this.pipe.transform(Date.now(), 'y-MM-dd');
            }
            
          });
    
      console.log(this.ReceiptMethodList+'--------');
      
  }
onReceiptMethodSelected(receiptId){
  alert(receiptId)
    let selectReceiptmethodList = this.ReceiptMethodList.find(d => d.receiptMethodId === receiptId);
    console.log(selectReceiptmethodList);
    
}
}
