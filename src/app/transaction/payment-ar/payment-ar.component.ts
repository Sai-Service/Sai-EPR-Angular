import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { DatePipe } from '@angular/common';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { relativeTimeRounding } from 'moment';
import { ServiceService } from 'src/app/service/service.service';
import { ReturnStatement } from '@angular/compiler';

interface IPaymentRcptAr {

  referenceNo: string;
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





}

@Component({
  selector: 'app-payment-ar',
  templateUrl: './payment-ar.component.html',
  styleUrls: ['./payment-ar.component.css']
})
export class PaymentArComponent implements OnInit {
  paymentArForm: FormGroup;
  applyRcptFlag1: boolean
  pipe = new DatePipe('en-US');
  now = Date.now();
  public minDate = new Date();

  message: string = "PleaseFixtheErrors!";
  msgType: string = "Close";
  // public DivisionIDList : Array<string>=[];
  // public OUIdList: Array<string> = [];

  public OUIdList: Array<string> = [];
  public DepartmentList: Array<string> = [];
  public statusList: Array<string> = [];
  public locIdList: Array<string> = [];
  // public PaymentModeList: Array<string> = [];
  // public ReceiptMethodList: Array<string> = [];
  ReceiptMethodList: any = [];
  public ReceiptStatusList: Array<string> = [];
  public ReceiptStateList: Array<string> = [];
  public ReverseReasonList: Array<string> = [];
  public ReceiptTypeArList: Array<string> = [];
  public VehRegNoList: Array<string> = [];
  public RefReasonList: Array<string> = [];

  PaymentModeList: any;
  ChqBounceReasonList: any;
  viewAccountingArRcpt: Array<string> = [];
  viewAccountingLines: Array<string> = [];

  receiptDetails: Array<string> = [];
  customerNameSearch: any;
  accountNoSearch: any;
  getVehRegDetails: any;
  CustomerDetailsList: any;
  CustomerSiteDetails: any;
  GLPeriodCheck: any;
  glPrdStartDate: string;
  glPrdEndDate: string;

  userList1: any[] = [];
  lastkeydown1: number = 0;

  lstcomments: any[];
  lstinvoices: any[];
  lstCustomer: any[];
  lstApplyHistory: any[];



  ouId: number;
  deptId: number;

  checkNo: string;
  // checkDate: Date;


  bankName: string;
  bankBranch: string;
  paymentAmt: number;

  payType: string;
  rmStatus: string
  paymentMethod: string;
  receiptAmount: number;
  tdsAmount: number;
  tdstrxNumber: string;
  receiptStatus = 'Open';
  status = 'UNAPP';

  receiptMethodId: number;
  // paymentCollection: string;
  receiptMethodName: string;
  receiptNumber: number;
  orderNumber: string;
  // referenceNo:string ;
  // referenceDate:Date;

  referenceNo = null;
  referenceDate = null;

  // customerId:number=8
  // custId:number;
  customerId: number;
  dmsCustNo: number;
  custName: string;
  customerSiteId: number;
  customerSiteAddress: string;
  custCity: string;
  custState: String;
  custPincode: string;
  CustomerGstNo: string
  customerPanNo: string
  customerTanNo: string
  custAccountNo: number;
  custPhone: string;
  customerType: string;
  custTaxCategoryName: string;
  custTdsPer: number;

  accountNo: number;
  vehRegNo: string;
  attribute1: string;
  vehNo: string;

  // billToSiteId:number;
  custAddr: string;
  custSiteAddress: string
  mobileNo: string;

  // glDate:Date;

  // checkDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  checkDate: string;
  receiptDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  // jobCardDate = this.pipe.transform(Date.now(), 'dd-MM-y');
  // trxDate= this.pipe.transform(this.now, 'dd-MM-y');
  // trxDate=this.pipe.transform(this.now, 'y-MM-dd');
  // trxDate :Date;
  // applDate:string;
  glDate = this.pipe.transform(this.now, 'y-MM-dd');
  glDateLine = this.pipe.transform(this.now, 'y-MM-dd');
  applDate = this.pipe.transform(this.now, 'y-MM-dd');
  // reversalDate= this.pipe.transform(this.now, 'dd-MM-y');
  reversalDate: string;
  reversalComment: string;
  reversalReasonCode: string;
  reversalCategory: string;
  bounceReasonCode: string;
  chqBounceCharge: number;
  chqBncTrxNo: number;
  // status : string;

  cancelDate = null;


  comments: string

  searchBy: string
  searchValue: string;

  public srlNo = 1;

  // public searchByRcptNo =211100020000022;
  // public searchByOrderNo =2111202148;
  // public searchByCustNo =1212;
  searchByRcptNo: number;
  searchByCustNo: number;

  // searchByDate: Date;
  searchByDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  ordNumber: number;
  cancelReason: string;

  totApplAmt: number;
  totUnApplAmt: number;
  onAccountAmt: number;
  // applyrcptFlag:string;  
  selectAllflag1 = false;

  // newBal:number;
  prePayment: number;
  totalUnappliedAmt: number;
  totalAppliedAmt: number;
  totalOnAccountAmt: number;
  // invoiceBalnaceAmt : number;
  balanceAmount: number;
  totAppliedtAmount: number;
  totUnAppliedtAmount: number;

  tApplAmt: number;
  tUapplAmt: number;

  enableCustAccount = true;
  checkValidation = false;
  applLineValidation = false;
  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  showOrg = false;
  showReason = false;
  showBankDetails = false;
  showModalForm = true;
  enableCancelButton = true;
  showReasonDetails = false;
  enableApplyButton = true;
  cancelValidation = false;
  applySaveButton = false;
  validateStatus = false;
  showRefYellow = false;
  applHistory=false;
  chqBounceStatus=false;
  printButton=true;
  fromJc=false;
  fromOrderChetak=false;
  accountsLogin=false;

  showInvoiceGrid = false;
  showRefundGrid = false;
  showRefundHist = false;
  showOnAcGrid = false;
  insuranceFlag: string;
  refType: string;


  loginName: string;
  loginArray: string;
  name: string;
  ouName: string;
  locId: number;
  locationId: Number;
  locName: string;
  emplId: number;
  roleId: number;
  orgId: number;
  divisionId: number;

  // public emplId =26;
  // customerId:number;
  // public billToSiteId = 101;
  billToSiteId: number;
  billToCustId: number;

  // public billToSiteId=107; 

  public applyTo = 'INVOICE'

  showViewActLine = false;

  totalDr: number;
  totalCr: number;
  runningTotalCr: number;
  runningTotalDr: number;
  private sub: any;

  // applyTo: string;

  get f() { return this.paymentArForm.controls; }

  paymentAr(paymentArForm: any) { }


  constructor(private service: MasterService, private orderManagementService: OrderManagementService, private fb: FormBuilder, private router: Router, private router1: ActivatedRoute, private router2: ActivatedRoute) {


    this.paymentArForm = fb.group({

      divisionId: [],
      division: [],
      orgId: [],
      ouId: [],
      deptId: [],

      loginArray: [''],
      loginName: [''],
      ouName: [''],
      locId: [''],
      locationId: [],
      locName: [''],
      emplId: [],
      roleId: [],

      receiptNumber: [],
      receiptDate: [],
      glDate: [],
      paymentAmt: [],
      payType: [],
      receiptMethodId: [],
      receiptMethodName: [],
      receiptStatus: [],
      status: [],
      insuranceFlag: [],
      receiptAmount: [],
      tdsAmount: [],
      tdstrxNumber: [],

      searchByRcptNo: [],
      searchByCustNo: [],
      searchByDate: [],

      orderNumber: [],
      referenceNo: [],
      referenceDate: [],
      custAddr: [],
      accountNo: [],
      vehRegNo: [],
      attribute1: [],
      vehNo: [],

      checkNo: [],
      checkDate: [],
      bankName: [],
      bankBranch: [],
      comments: [],

      customerId: [],
      dmsCustNo: [],
      custName: [],
      customerSiteId: [],
      customerSiteAddress: [],
      custCity: [],
      custState: [],
      custPincode: [],
      CustomerGstNo: [],
      customerPanNo: [],
      customerTanNo: [],
      custAccountNo: [],
      custPhone: [],
      customerType: [],
      custTaxCategoryName: [],
      custTdsPer: [],

      srlNo: [],
      refType: [],
      customerSite: [],
      mobileNo: [],
      searchBy: [],
      searchValue: [],
      billToSiteId: [],
      billToCustId: [],
      custSiteAddress: [],
      applyTo: [],

      totApplAmt: [],
      totUnApplAmt: [],
      onAccountAmt: [],

      reversalComment: [],
      reversalReasonCode: [],
      reversalDate: [],
      reversalCategory: [],
      bounceReasonCode: [],
      chqBounceCharge: [],
      chqBncTrxNo: [],

      cancelReason: [],
      cancelDate: [],
      prePayment: [],
      totalUnappliedAmt: [],
      totalAppliedAmt: [],
      totalOnAccountAmt: [],
      invoiceBalnaceAmt: [],
      selectAllflag1: [],
      applyrcptFlag1: ['', [Validators.required]],


      balanceAmount: [],
      totAppliedtAmount: [],
      totUnAppliedtAmount: [],

      tApplAmt: [],
      tUapplAmt: [],

      glPrdStartDate: [],
      glPrdEndDate: [],

      totalDr: [],
      totalCr: [],
      runningTotalCr: [],
      runningTotalDr: [],

      // applyrcptFlag: ['', [Validators.required]],

      invLine: this.fb.array([this.invLineDetails()]),
    });
  }

  invLineDetails() {
    return this.fb.group({
      // selectAllflag: [],
      applyTo: [],
      applyrcptFlag: [],
      custTrxId: [],
      trxNumber: [],
      trxDate: [],
      invoiceAmount: [],
      applAmt: [],
      balDueAmt: [],
      balance1: [],
      applAmtNew: [],
      paymentAmt: [],
      applDate: [],
      glDate: [],
      glDateLine: [],
      billToCustId: [],
      billToSiteId: [],
      invCurrancyCode: [],
      refReasonCode: [],
      insurance: [],
      // emplId:[],

    })
  }

  invLineArray(): FormArray {
    return <FormArray>this.paymentArForm.get('invLine')
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.name = sessionStorage.getItem('name');
    this.loginArray = sessionStorage.getItem('divisionName');
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.loginName = sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.locId = Number(sessionStorage.getItem('locId'));

    this.locationId = Number(sessionStorage.getItem('locId'));
    // this.locName=(sessionStorage.getItem('locName'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.roleId = Number(sessionStorage.getItem('roleId'));
    this.orgId = this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);

    ////////////// Navigate from JobCard form /////////

    // this.sub = this.router1.params.subscribe(params => {
    //   this.vehRegNo = params['regNo'];
    //   this.attribute1=this.vehRegNo;
    //   if (this.vehRegNo != undefined){
    //     this.fromJc=true;
    //     this.refType='Service-Order'
    //   this.serchByRegNo(this.attribute1);
    //      }
    // });

if (Number(sessionStorage.getItem('dept')) ===4)  {this.accountsLogin=true;}else {this.accountsLogin=false;}

// alert ("DeptId : " +this.deptId + " accountsLogin="+this.accountsLogin);

if(this.deptId==1){
  this.sub = this.router1.params.subscribe(params => {
     var  ordNumChetak = params['orderNumber'];
    if (ordNumChetak != undefined){
      this.fromOrderChetak=true;
      this.refType='Sales-Order'
    this.GetOrderDetails(ordNumChetak);
  }
});
}

if(this.deptId==2){
    this.sub = this.router1.params.subscribe(params => {
       var jcNum = params['jobCardNum'];
      if (jcNum != undefined){
        this.fromJc=true;
        this.refType='Service-Order'
      this.GetJobCardDetails(jcNum);}
  });
  }


  if(this.deptId==4){
    this.sub = this.router1.params.subscribe(params => {
      this.referenceNo = this.router1.snapshot.queryParamMap.get('invNumber');
      // this.searchByRcptNo= Number(this.router1.snapshot.queryParamMap.get('docSequenceValue'));
      // alert(this.searchByRcptNo)
     var methodId =   this.router1.snapshot.queryParamMap.get('methodId');
     var Amt =this.router1.snapshot.queryParamMap.get('recAmt');
     if ( this.referenceNo != undefined){
       this.payType='CONTROL ACCOUNT'
          this.receiptMethodId=Number(methodId);
          this.paymentAmt=Number(Amt);
          // alert(this.receiptMethodId);  
          // if(this.receiptMethodId===143)
          // {
          //   this.refType='Sales-Order'
          // }
          // if(this.receiptMethodId==142)
          // {
          //   this.refType='Service-Order'
          // }
        }
        //  else if (this.searchByRcptNo!=undefined) {
        //    alert('else if ----' + this.searchByRcptNo)
        //    this.SearchByRcptNo(this.searchByRcptNo)
        //  } 
      });
    }

    if (this.deptId == 4) {
      this.sub = this.router2.params.subscribe(params => {
        this.searchByRcptNo = Number(this.router1.snapshot.queryParamMap.get('docSequenceValue'));
        this.locId = Number(this.router1.snapshot.queryParamMap.get('locId'));
        // alert( this.searchByRcptNo+'------'+ this.locId);
        if (this.searchByRcptNo != 0 && this.locId != 0) {
          if (this.searchByRcptNo != undefined) {
            this.SearchByRcptNo(this.searchByRcptNo);
            this.SelectReceipt(this.searchByRcptNo);
          }
        }
      });
    }

    /////////////////////////////////////////////////////

    //  alert ("this.fromJc :" +this.fromJc);

    this.service.RegNoListFN()
      .subscribe(
        data1 => {
          this.VehRegNoList = data1;
          console.log(this.VehRegNoList);
        }
      );


    // this.service.OUIdList()
    //   .subscribe(
    //     data => {
    //       this.OUIdList = data;
    //       console.log(this.OUIdList);
    //     }
    //   );

    // this.service.locationIdList()
    //   .subscribe(
    //     data => {
    //       this.locIdList = data;
    //       console.log(this.locIdList);
    //     }
    //   );

    this.service.OUIdListDiv(this.divisionId)
      .subscribe(
        data => {
          this.OUIdList = data;
          console.log(this.OUIdList);
        }
      );

    this.service.getLocationSearch1(this.ouId)
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

        }
      );

    this.service.PaymentModeList()
      .subscribe(
        data => {
          this.PaymentModeList = data;
          console.log(this.PaymentModeList);
        }
      );

    this.service.ReceiptStatusList()
      .subscribe(
        data => {
          this.ReceiptStatusList = data;
          console.log(this.ReceiptStatusList);
        }
      );

    this.service.ReceiptStateLst()
      .subscribe(
        data => {
          this.ReceiptStateList = data;
          console.log(this.ReceiptStateList);
        }
      );



    this.service.ReceiptTypeArList()
      .subscribe(
        data => {
          this.ReceiptTypeArList = data;
          console.log(this.ReceiptTypeArList);
        }
      );




    this.service.RcptReverseReasonList()
      .subscribe(
        data => {
          this.ReverseReasonList = data;
          console.log(this.ReverseReasonList);
        }
      );






    this.service.RefReasonLst()
      .subscribe(
        data => {
          this.RefReasonList = data;
          console.log(this.RefReasonList);
        }
      );

    this.service.GLperiod()
      .subscribe(
        data => {
          this.GLPeriodCheck = data.obj;
          console.log(this.GLPeriodCheck);
        }
      );

    this.glPrdStartDate = this.GLPeriodCheck.startDate;
    this.glPrdEndDate = this.GLPeriodCheck.endDate

  }

      GetOrderDetails(mOderNum){
        alert ("Order Number :"+mOderNum);
        this.orderManagementService.proformaOrderSearchNew(sessionStorage.getItem('divisionId'), mOderNum)
        .subscribe(
          data => {
            if (data.code === 200) {
              this.custAccountNo=data.obj.custAccountNo;
              this.custName=data.obj.custName;
              this.customerId=data.obj.customerId;   // customerId null - need to  check api response
              this.customerSiteId=data.obj.customerSiteId;
              this.referenceNo=data.obj.orderNumber;
              this.referenceDate=data.obj.orderedDate
            }
          }); 
      }

      GetJobCardDetails(jcNum) {
      this.service.getJonCardNoSearch(jcNum)
      .subscribe(
        data => {
          // this.lstcomments = data.obj;
          if (data.code === 200) {
            this.vehNo = data.obj.regNo;
            this.custAccountNo = data.obj.accountNo;
            this.custName = data.obj.custName;
            this.customerId = data.obj.customerId;
            this.customerSiteId = data.obj.customerSiteId;

            // this.serchByRegNo(data.obj.regNo);
            this.CustAccountNoSearch(data.obj.accountNo);
            this.paymentAmt = data.obj.balanceAmt;
            this.referenceNo = data.obj.jobCardNum + '/' + data.obj.invoiceNumber;
            this.referenceDate = data.obj.jobCardDate;

            // console.log(this.lstcomments);
          } else { alert(jcNum + " Job Card Details Not Found..."); return; }

        });
  }


  onKey(event: any) {
    if (this.custAccountNo == null || this.custAccountNo == undefined) {
      alert("CUSTOMER :  Select Customer.");
      this.paymentAmt = null;
      return;
    }
    this.getTdsAmount(this.custTdsPer);
  }


  validateAmt(rcptAmt: any) {
    // if(this.custAccountNo==null || this.custAccountNo==undefined) {
    //   alert("CUSTOMER :  Select Customer.");
    //   this.paymentAmt = null;
    //   return;
    // }

    if (rcptAmt === null || rcptAmt === undefined || rcptAmt <= 0) {
      alert("RECEIPT AMOUNT :  Should be above Zero.");
      this.paymentAmt = null;
      return;
    }

    this.getTdsAmount(this.custTdsPer);

  }

  validateTdsAmt(rcptAmt: any) {

    var tdsAmt = this.paymentArForm.get('tdsAmount').value
    // alert ("in...tds..."+tdsAmt)
    if (tdsAmt < 0) {
      alert("TDS AMOUNT :  Should not be below Zero.");
      this.paymentArForm.patchValue({ tdsAmount: 0 })
      return;
    }

    // this.getTdsAmount(this.custTdsPer);

  }




  validateChqDate(chqDate) {
    var currDate = new Date();
    var chDate = new Date(chqDate);
    if (chDate > currDate) {
      alert("CHEQUE DATE :" + "Should not be above Today's Date");
      this.checkDate = this.pipe.transform(this.now, 'y-MM-dd');
    }


  }

  glPrdValidate(glDt: any) {

    var tglDate = new Date(glDt);
    var sDate = new Date(this.GLPeriodCheck.startDate);
    var tDate = new Date(this.GLPeriodCheck.endDate);
    // alert("GlDate :"+glDt +" GL Period : "+this.GLPeriodCheck.startDate +" - "+ this.GLPeriodCheck.endDate);
    // alert("GlDate :"+tglDate +" GL Period : "+sDate +" - "+ tDate);

    if (tglDate < sDate || tglDate > tDate) {
      alert("GL date is not valid.. should be within GL period.\nGL Period : " + this.GLPeriodCheck.startDate + " - " + this.GLPeriodCheck.endDate);
      this.glDate = this.pipe.transform(this.now, 'y-MM-dd');
      return;
    }

  }

  glPrdValidateLine(i: any) {

    var patch = this.paymentArForm.get('invLine') as FormArray;
    var applLineArr = this.paymentArForm.get('invLine').value;
    var gld = applLineArr[i].glDateLine;
    // alert("index :"+i + "  gl date - " +gld);
    var tglDate = new Date(gld);
    var sDate = new Date(this.GLPeriodCheck.startDate);
    var tDate = new Date(this.GLPeriodCheck.endDate);
    if (tglDate < sDate || tglDate > tDate) {
      alert("Line :" + (i + 1) + " GL date is not valid.. should be within GL period\nGL Period : " + this.pipe.transform(this.GLPeriodCheck.startDate, 'dd-MM-y') + " - " + this.pipe.transform(this.GLPeriodCheck.endDate, 'dd-MM-y'));
      var z = this.pipe.transform(this.now, 'y-MM-dd');
      patch.controls[i].patchValue({ glDateLine: z })
      patch.controls[i].patchValue({ glDate: z })
      return;
    }
  }




  onOuIdSelected(ouId: any) {
    // alert('ouId id =' +ouId );
    if (ouId > 0) {
      // this.locIdList=null;
      // this.showOrg=false;
      this.service.getLocationSearch1(ouId)
        .subscribe(
          data => {
            this.locIdList = data;
            console.log(this.locIdList);
          }
        );
    } else { }
  }


  getUserIdsFirstWay($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList1 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.VehRegNoList, userId);
      }
    }
  }
  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };






  //   GetCustomerDetails(mCustId :any){
  //     // alert("Customer Id: "+mCustId);
  //   this.service.ewInsSiteList(mCustId)
  //   .subscribe(
  //     data1 => {
  //       this.CustomerDetailsList = data1;
  //       console.log(this.CustomerDetailsList);
  //       this.paymentArForm.patchValue({
  //         custAccountNo:this.CustomerDetailsList.custAccountNo,
  //         // custName: this.CustomerDetailsList.custName,

  //     });
  //     this.CustAccountNoSearch(this.custAccountNo)
  //     }
  //   );  
  // }

  GetCustomerDetails(mCustId: any) {
    // alert("Customer Id: "+mCustId);
    this.service.ewInsSiteList(mCustId)
      .subscribe(
        data1 => {
          this.CustomerDetailsList = data1;
          console.log(this.CustomerDetailsList);
          this.paymentArForm.patchValue({
            custAccountNo: this.CustomerDetailsList.custAccountNo,
            custName: this.CustomerDetailsList.custName,
          });
        });
  }


  GetCustomerSiteDetails(mCustId: any) {
    // alert("Customer Id: "+mCustId);
    this.service.GetCustomerSiteDetails(mCustId, this.ouId)
      .subscribe(
        data1 => {
          this.CustomerSiteDetails = data1;

          if (this.CustomerSiteDetails === null) { alert("Customer Site [" + this.ouId + "] Not Found in Site Master.....\nPlease check and try again...."); this.resetMast(); }
          else if (this.CustomerSiteDetails.taxCategoryName === null) { alert("Tax Category not attached to  this customer.Pls Update Tax category for this customer."); this.resetMast(); }
          else {
            // this.dispCustButton=true;
            console.log(this.CustomerSiteDetails);
            // alert("Tds% :"+this.CustomerSiteDetails.customerId.tdsPer);
            this.paymentArForm.patchValue({
              customerSiteId: this.CustomerSiteDetails.customerSiteId,
              customerSiteAddress: this.CustomerSiteDetails.address1 + "," +
                this.CustomerSiteDetails.address2 + "," +
                this.CustomerSiteDetails.address3 + "," +
                this.CustomerSiteDetails.location,
              custCity: this.CustomerSiteDetails.city,
              custState: this.CustomerSiteDetails.state,
              custPincode: this.CustomerSiteDetails.pinCd,
              customerGstNo: this.CustomerSiteDetails.gstNo,
              customerPanNo: this.CustomerSiteDetails.panNo,
              customerTanNo: this.CustomerSiteDetails.tanNo,
              custPhone: this.CustomerSiteDetails.mobile1,
              customerType: this.CustomerSiteDetails.customerId.custType,
              custTaxCategoryName: this.CustomerSiteDetails.taxCategoryName,
              custTdsPer: this.CustomerSiteDetails.customerId.tdsPer,
            });

          }
        });
  }

  onRefTypeSelected(mRefType) {
    if (mRefType === 'Advance' || mRefType === undefined) { this.showRefYellow = false; }
    else { this.showRefYellow = true; }
  }

  onPayTypeSelected(payType: any, rmStatus: any) {
    // alert('paytype =' +payType  + " LocId :"+ this.locId + " Ou Id :"+this.ouId + " Deptid : "+ this.deptId + " Status :"+rmStatus);

    if (this.deptId != 4) {
      if (payType === 'CONTROL ACCOUNT') {
        this.paymentArForm.get('payType').reset();
        this.receiptMethodId = null;
        alert(payType + " : User not authorised to select this Receipt Mode...")
        return;
      }
    }
    if (payType === '--Select--' || payType === 'undefined') {
      return;
    } else if (payType === 'CASH') {
      this.bankName = null;
      this.bankBranch = null;
      this.checkNo = null;
      this.checkDate = null;
      this.service.ReceiptMethodListNew(payType, rmStatus, this.deptId, this.ouId)
        .subscribe(
          data => {
            this.ReceiptMethodList = data.obj;
            console.log(this.ReceiptMethodList);
            this.showBankDetails = false;
            this.paymentArForm.get("checkDate").reset();
          }
        );
    } else {
      // alert("Chq/dd/neft/... selected");
      this.service.ReceiptMethodListNew(payType, rmStatus, this.deptId, this.ouId)
        .subscribe(
          data => {
            this.ReceiptMethodList = data.obj;
            console.log(this.ReceiptMethodList);
            this.showBankDetails = true;
            if (this.displayButton == true) {
              this.checkDate = this.pipe.transform(Date.now(), 'y-MM-dd');
            }
            if (Number(sessionStorage.getItem('deptId')) === 4) {
              // var selectReceiptmethodList= this.receiptMethodId.
              let selectReceiptmethodList = this.ReceiptMethodList.find(d => d.receiptMethodId === this.receiptMethodId);
              console.log(selectReceiptmethodList);
              console.log(selectReceiptmethodList.methodName);
              if (selectReceiptmethodList.methodName.includes('FSC Control')) {
                this.refType = 'Service-Order'
              }
              if (selectReceiptmethodList.methodName.includes('Sales Control')) {
                this.refType = 'Sales-Order'
              }

            }
          });
    }
  }




  insuranceFlag1(e) {
    if (e.target.checked === true) {
      this.insuranceFlag = 'Y'
    }
    if (e.target.checked === false) {
      this.insuranceFlag = 'N'
    }

    // alert ('Insurance flag =' + this.insuranceFlag);
  }

  resetModalMast() {
    // this.invLineArray().clear(); 
    window.location.reload();
  }

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  // resetForm(){
  //   this.modalForm = new FormGroup();
  //  }

  resetSection1() { }


  SearchByRcptNo(rcptNo: any) {
    // alert ("Receipt Num : " +rcptNo);
    // if(rcptNo ===undefined || rcptNo===null || rcptNo<=0 ) {return;}

    this.status = null;
    if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.service.getArReceiptSearchByRcptNoByloc(rcptNo, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
        .subscribe(
          data => {
            this.lstcomments = data.obj;
            console.log(this.lstcomments);
            if (data.code === 400) {
              alert(data.obj)
              this.lstcomments = null;
            }
          });
    }
    else if (Number(sessionStorage.getItem('deptId')) == 4) {
      // alert ('else if ----'+ this.locId)
      this.service.getArReceiptSearchByRcptNoByloc(rcptNo, sessionStorage.getItem('ouId'), this.locId, sessionStorage.getItem('deptId'))
        .subscribe(
          data => {
            this.lstcomments = data.obj;
            console.log(this.lstcomments);
            if (data.code === 400) {
              alert(data.obj)
              this.lstcomments = null;
            }
          });
    }
  }

  SearchRcptByCustNo(custActNo: any) {
    // alert ("custActNo Num : " +custActNo);
    if (custActNo === undefined || custActNo === null || custActNo <= 0) { return; }

    this.status = null;
    // var mDate = this.pipe.transform(rcptdate, 'dd-MMM-y');
    this.service.SearchRcptByCustNo(custActNo, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
      .subscribe(
        data => {
          this.lstcomments = data.obj;
          console.log(this.lstcomments);
          if (data.message === "Record Not Found ") {
            alert("No Receipt Found for this date...")
            this.lstcomments = null;
          }
        });
  }


  SearchRcptByRcptDate(rcptdate: any) {

    // alert ("rcptdate  : " +rcptdate);
    if (rcptdate === undefined || rcptdate === null) { return; }

    this.status = null;
    var mDate = this.pipe.transform(rcptdate, 'dd-MMM-y');
    this.service.SearchRcptByDate(mDate, sessionStorage.getItem('ouId'), sessionStorage.getItem('locId'), sessionStorage.getItem('deptId'))
      .subscribe(
        data => {
          this.lstcomments = data.obj;
          console.log(this.lstcomments);
          if (data.code === 400) {
            alert("No Receipts Found for this date...")
            this.lstcomments = null;
          }
        });
  }


  SelectOld(receiptNumber: any) {
    this.displayButton = false;
    this.display = false;

    this.service.getArReceiptDetailsByRcptNoAndloc(receiptNumber)
      .subscribe(
        data => {
          this.receiptDetails = data.obj.oePayList[0];
          console.log(this.receiptDetails);
          // ---------------------------Applied history
          this.lstApplyHistory = data.obj.invApplyLst;
          console.log(this.lstApplyHistory);

          var len1 = data.obj.invApplyLst.length;

          if (len1 > 0) {
            this.applHistory = true
          } else {
            this.applHistory = false;
          }

          // --------------------------------------------

          this.paymentArForm.patchValue(this.receiptDetails);

          this.vehNo = data.obj.oePayList[0].vehNo;
          this.bounceReasonCode = data.obj.oePayList[0].bounceReasonCode;
          this.chqBounceCharge = data.obj.oePayList[0].chqBounceCharge;
          this.chqBncTrxNo = data.obj.oePayList[0].chqBncTrxNo;
          this.totAppliedtAmount = data.obj.oePayList[0].totAppliedtAmount.toFixed(2);
          this.totUnAppliedtAmount = data.obj.oePayList[0].totUnAppliedtAmount.toFixed(2);
          this.balanceAmount = data.obj.oePayList[0].balanceAmount.toFixed(2);
          this.GetCustomerDetails(data.obj.oePayList[0].customerId)
          this.GetCustomerSiteDetails(data.obj.oePayList[0].customerId)




          if (data.obj.oePayList[0].reversalReasonCode != null) {
            if (data.obj.oePayList[0].reversalReasonCode === 'ChqBounce') { this.chqBounceStatus = true; }
            this.printButton = false;
            this.showModalForm = false;
            this.enableApplyButton = false;
            this.enableCancelButton = false;
            this.showReasonDetails = true;
            this.reversalReasonCode = data.obj.oePayList[0].reversalReasonCode;
            this.reversalComment = data.obj.oePayList[0].reversalComment;
            this.reversalDate = data.obj.oePayList[0].reversalDate;
            this.reversalCategory = data.obj.oePayList[0].reversalCategory;
            this.paymentArForm.disable();
            this.paymentArForm.get('searchByRcptNo').enable();
            this.paymentArForm.get('searchByCustNo').enable();
            this.paymentArForm.get('searchByDate').enable();
            this.paymentArForm.get('applyTo').enable();
            return;

          }

          //  var rcptdt =data.obj.oePayList[0].receiptDate
          //  var tDate = this.pipe.transform(Date.now() ,'y-MM-dd');
          //  var mDays =this.diffDays(rcptdt);
          //  alert ("Receipt Date :"+rcptdt + "  , sys date :"+ tDate + " , mdays :"+mDays);

          // if( data.obj.oePayList[0].reversalReasonCode===null && data.obj.oePayList[0].payType ==='CHEQUE' && mDays<5) {
          //   this.showReasonDetails=true;
          //   this.showModalForm = true;
          //   this.enableApplyButton = true;
          //   this.enableCancelButton = true;
          //   this.paymentArForm.get('reversalReasonCode').enable();
          //   this.paymentArForm.get('reversalCategory').enable();
          //   this.paymentArForm.get('reversalComment').enable();
          // } 


          if (data.obj.oePayList[0].reversalReasonCode === null && data.obj.oePayList[0].payType === 'CASH') {
            if (data.obj.oePayList[0].totAppliedtAmount > 0 && data.obj.oePayList[0].totAppliedtAmount < data.obj.oePayList[0].paymentAmt) {
              this.showReasonDetails = false;
              this.showModalForm = true;
              this.enableApplyButton = true;
              this.enableCancelButton = false;
              return;
            }

            if (data.obj.oePayList[0].paymentAmt === data.obj.oePayList[0].totAppliedtAmount) {
              this.showReasonDetails = false;
              this.showModalForm = false;
              this.enableApplyButton = false;
              this.enableCancelButton = false;
              return;
            }

            if (data.obj.oePayList[0].totAppliedtAmount === 0) {
              this.showReasonDetails = true;
              this.showModalForm = true;
              this.enableApplyButton = true;
              this.enableCancelButton = true;
              this.paymentArForm.get('reversalReasonCode').enable();
              this.paymentArForm.get('reversalCategory').enable();
              this.paymentArForm.get('reversalComment').enable();
              return;
            }
          }



          if (data.obj.oePayList[0].reversalReasonCode === null && data.obj.oePayList[0].payType != 'CASH') {
            this.showModalForm = true;
            this.enableApplyButton = true;
            this.enableCancelButton = true;
            this.showReasonDetails = true;
            this.paymentArForm.get('reversalReasonCode').enable();
            this.paymentArForm.get('reversalCategory').enable();
            this.paymentArForm.get('reversalComment').enable();
            return;
          }

        });

    this.paymentArForm.get('searchByRcptNo').enable();
    this.paymentArForm.get('searchByCustNo').enable();
    this.paymentArForm.get('searchByDate').enable();
    this.paymentArForm.get('applyTo').enable();
  }


  diffDays(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }


  getRevDays(rcptType) {
    // alert ("getRevDays :"+rcptType);
    var revDays = 0;
    let selectedValue = this.PaymentModeList.find(d => d.lookupValue === rcptType);
    if (selectedValue != undefined) { revDays = selectedValue.parentValue; } else { revDays = 0; }
    return revDays;
  }



  SelectReceipt(receiptNumber: any) {
    // alert('selectReceiptMethod'+'---'+receiptNumber)
    this.displayButton = false;
    this.display = false;
    if (Number(sessionStorage.getItem('deptId')) != 4) {
      this.service.getArReceiptDetailsByRcptNoAndloc(receiptNumber)
        .subscribe(
          data => {
            if (data.code === 400) { alert(data.message + data.obj); return; }
            this.receiptDetails = data.obj.oePayList[0];
            console.log(this.receiptDetails);
            // ---------------------------Applied history
            this.lstApplyHistory = data.obj.invApplyLst;
            console.log(this.lstApplyHistory);

            var len1 = data.obj.invApplyLst.length;

            if (len1 > 0) {
              this.applHistory = true
            } else {
              this.applHistory = false;
            }

            // --------------------------------------------

            this.paymentArForm.patchValue(this.receiptDetails);

            this.vehNo = data.obj.oePayList[0].vehNo;
            this.bounceReasonCode = data.obj.oePayList[0].bounceReasonCode;
            this.chqBounceCharge = data.obj.oePayList[0].chqBounceCharge;
            this.chqBncTrxNo = data.obj.oePayList[0].chqBncTrxNo;
            this.totAppliedtAmount = data.obj.oePayList[0].totAppliedtAmount.toFixed(2);
            this.totUnAppliedtAmount = data.obj.oePayList[0].totUnAppliedtAmount.toFixed(2);
            this.balanceAmount = data.obj.oePayList[0].balanceAmount.toFixed(2);

            this.GetCustomerDetails(data.obj.oePayList[0].customerId)
            this.GetCustomerSiteDetails(data.obj.oePayList[0].customerId)

            this.showRefundHist = false;
            if (data.obj.oePayList[0].status === 'REFUND') {
              this.showReasonDetails = false; this.enableCancelButton = false; this.enableApplyButton = false;
              this.showRefundHist = true;
              return;
            }



            if (data.obj.oePayList[0].reversalReasonCode != null) {
              if (data.obj.oePayList[0].reversalReasonCode === 'ChqBounce') { this.chqBounceStatus = true; }
              this.printButton = false;
              this.showModalForm = false;
              this.enableApplyButton = false;
              this.enableCancelButton = false;
              this.showReasonDetails = true;
              this.reversalReasonCode = data.obj.oePayList[0].reversalReasonCode;
              this.reversalComment = data.obj.oePayList[0].reversalComment;
              this.reversalDate = data.obj.oePayList[0].reversalDate;
              this.reversalCategory = data.obj.oePayList[0].reversalCategory;
              this.paymentArForm.disable();
              this.paymentArForm.get('searchByRcptNo').enable();
              this.paymentArForm.get('searchByCustNo').enable();
              this.paymentArForm.get('searchByDate').enable();
              this.paymentArForm.get('applyTo').enable();
              return;

            }


            var rcptdt = data.obj.oePayList[0].receiptDate
            var tDate = this.pipe.transform(Date.now(), 'y-MM-dd');
            var mDays = this.diffDays(rcptdt);
            var reversalDays = this.getRevDays(data.obj.oePayList[0].payType)
            // var reversalDays=30;
            // alert ("Receipt Date :"+rcptdt + "  , sys date :"+ tDate + " , mdays :"+mDays);

            // alert ("Receipt Type :"+ data.obj.oePayList[0].payType+  ". Receipt aging days :"+mDays + ". Reversal Days Limit :" + reversalDays);


            if (data.obj.oePayList[0].payType === 'CHEQUE' && mDays <= reversalDays) {
              this.showReasonDetails = true; this.enableCancelButton = true;
              this.paymentArForm.get('reversalReasonCode').enable();
              this.paymentArForm.get('reversalCategory').enable();
              this.paymentArForm.get('reversalComment').enable();
            }


            if (data.obj.oePayList[0].payType === 'CHEQUE' && mDays > reversalDays) {
              this.showReasonDetails = false; this.enableCancelButton = false;
            }

            if (data.obj.oePayList[0].payType != 'CHEQUE' && mDays < reversalDays) {
              this.showReasonDetails = true; this.enableCancelButton = true;
              this.paymentArForm.get('reversalReasonCode').enable();
              this.paymentArForm.get('reversalCategory').enable();
              this.paymentArForm.get('reversalComment').enable();
            }

            // if( data.obj.oePayList[0].payType !='CHEQUE' && mDays !=0) {
            if (data.obj.oePayList[0].payType != 'CHEQUE' && mDays > reversalDays) {
              this.showReasonDetails = false; this.enableCancelButton = false;
            }


            // if ( data.obj.oePayList[0].totAppliedtAmount>0 && data.obj.oePayList[0].totAppliedtAmount < data.obj.oePayList[0].paymentAmt) {
            //   this.enableApplyButton = true;
            //  } 

            if (data.obj.oePayList[0].totUnAppliedtAmount > 0) {
              this.enableApplyButton = true;
            } else { this.enableApplyButton = false; }



          });
    }
    else if (Number(sessionStorage.getItem('deptId')) === 4) {
      // alert(receiptNumber+'---'+this.locId)
      this.service.getArReceiptDetailsByRcptNoAndlocDeptIDAccou(receiptNumber, this.locId)
        .subscribe(
          data => {
            if (data.code === 400) { alert(data.message + data.obj); return; }
            this.receiptDetails = data.obj.oePayList[0];
            console.log(this.receiptDetails);
            this.enableCancelButton = false;
            this.enableApplyButton = false;
            this.printButton = false;
            // ---------------------------Applied history
            this.lstApplyHistory = data.obj.invApplyLst;
            console.log(this.lstApplyHistory);

            var len1 = data.obj.invApplyLst.length;

            if (len1 > 0) {
              this.applHistory = true
            } else {
              this.applHistory = false;
            }

            // --------------------------------------------

            this.paymentArForm.patchValue(this.receiptDetails);

            this.vehNo = data.obj.oePayList[0].vehNo;
            this.bounceReasonCode = data.obj.oePayList[0].bounceReasonCode;
            this.chqBounceCharge = data.obj.oePayList[0].chqBounceCharge;
            this.chqBncTrxNo = data.obj.oePayList[0].chqBncTrxNo;
            this.totAppliedtAmount = data.obj.oePayList[0].totAppliedtAmount.toFixed(2);
            this.totUnAppliedtAmount = data.obj.oePayList[0].totUnAppliedtAmount.toFixed(2);
            this.balanceAmount = data.obj.oePayList[0].balanceAmount.toFixed(2);

            this.GetCustomerDetails(data.obj.oePayList[0].customerId)
            this.GetCustomerSiteDetails(data.obj.oePayList[0].customerId)

            this.showRefundHist = false;
            if (data.obj.oePayList[0].status === 'REFUND') {
              this.showReasonDetails = false; this.enableCancelButton = false; this.enableApplyButton = false;
              this.showRefundHist = true;
              return;
            }



            if (data.obj.oePayList[0].reversalReasonCode != null) {
              if (data.obj.oePayList[0].reversalReasonCode === 'ChqBounce') { this.chqBounceStatus = true; }
              this.printButton = false;
              this.showModalForm = false;
              this.enableApplyButton = false;
              this.enableCancelButton = false;
              this.showReasonDetails = true;
              this.reversalReasonCode = data.obj.oePayList[0].reversalReasonCode;
              this.reversalComment = data.obj.oePayList[0].reversalComment;
              this.reversalDate = data.obj.oePayList[0].reversalDate;
              this.reversalCategory = data.obj.oePayList[0].reversalCategory;
              this.paymentArForm.disable();
              this.paymentArForm.get('searchByRcptNo').enable();
              this.paymentArForm.get('searchByCustNo').enable();
              this.paymentArForm.get('searchByDate').enable();
              this.paymentArForm.get('applyTo').enable();
              return;

            }


            var rcptdt = data.obj.oePayList[0].receiptDate
            var tDate = this.pipe.transform(Date.now(), 'y-MM-dd');
            var mDays = this.diffDays(rcptdt);
            var reversalDays = this.getRevDays(data.obj.oePayList[0].payType)
            // var reversalDays=30;
            // alert ("Receipt Date :"+rcptdt + "  , sys date :"+ tDate + " , mdays :"+mDays);

            // alert ("Receipt Type :"+ data.obj.oePayList[0].payType+  ". Receipt aging days :"+mDays + ". Reversal Days Limit :" + reversalDays);


            if (data.obj.oePayList[0].payType === 'CHEQUE' && mDays <= reversalDays) {
              this.showReasonDetails = true; this.enableCancelButton = true;
              this.paymentArForm.get('reversalReasonCode').enable();
              this.paymentArForm.get('reversalCategory').enable();
              this.paymentArForm.get('reversalComment').enable();
            }


            if (data.obj.oePayList[0].payType === 'CHEQUE' && mDays > reversalDays) {
              this.showReasonDetails = false; this.enableCancelButton = false;
            }

            if (data.obj.oePayList[0].payType != 'CHEQUE' && mDays < reversalDays) {
              this.showReasonDetails = true; this.enableCancelButton = true;
              this.paymentArForm.get('reversalReasonCode').enable();
              this.paymentArForm.get('reversalCategory').enable();
              this.paymentArForm.get('reversalComment').enable();
            }

            // if( data.obj.oePayList[0].payType !='CHEQUE' && mDays !=0) {
            if (data.obj.oePayList[0].payType != 'CHEQUE' && mDays > reversalDays) {
              this.showReasonDetails = false; this.enableCancelButton = false;
            }


            // if ( data.obj.oePayList[0].totAppliedtAmount>0 && data.obj.oePayList[0].totAppliedtAmount < data.obj.oePayList[0].paymentAmt) {
            //   this.enableApplyButton = true;
            //  } 

            if (data.obj.oePayList[0].totUnAppliedtAmount > 0) {
              this.enableApplyButton = true;
            } else { this.enableApplyButton = false; }



          });
    }
    //  this.paymentArForm.get('searchByRcptNo').enable();
    //  this.paymentArForm.get('searchByCustNo').enable();
    //  this.paymentArForm.get('searchByDate').enable();
    //  this.paymentArForm.get('applyTo').enable();
  }



  LoadValues() {
    this.validateStatus = false;
    this.applySaveButton = false;
    this.paymentArForm.get('applyTo').enable();
    this.invLineArray().clear();

    this.onAccountAmt = 0;

    // this.totAppliedtAmount=0;
    // this.selectAllflag=true;
    this.applyRcptFlag1 = true;
    this.customerSiteId = this.billToSiteId;
    this.custAddr = this.custSiteAddress;
    this.receiptAmount = this.paymentAmt;
    this.tApplAmt = this.totAppliedtAmount;
    this.tUapplAmt = this.totUnAppliedtAmount;

    this.paymentArForm.get('selectAllflag1').disable();


  }

  applyReceiptFlagAll(e) {
    //  alert("e.target.checked :"  +e.target.checked);
    if (e.target.checked === true) { this.selectAllflag1 = true; } else { this.selectAllflag1 = false; }
    var patch = this.paymentArForm.get('invLine') as FormArray;
    var invLineArr = this.paymentArForm.get('invLine').value;

    if (this.selectAllflag1 === true) {

      for (let i = 0; i < this.lstinvoices.length; i++) {

        if (invLineArr[i].applyrcptFlag === true) {

          patch.controls[i].patchValue({ applyrcptFlag: '' })
          //  alert("inner loop");
          this.applyReceiptFlag(e, i);
        } else {
          // alert ("accessing Selact all  ELSE section. marking line applyto to true");
          patch.controls[i].patchValue({ applyrcptFlag: true })
          this.applyReceiptFlag(e, i);
        }
      }
    }
    else {
      // alert ( "in...else apply all");
      for (let i = 0; i < this.lstinvoices.length; i++) {
        patch.controls[i].patchValue({ applyrcptFlag: '' })
        this.applyReceiptFlag(e, i);
      }
    }

  }

  applyReceiptFlagAll101() {

    var patch = this.paymentArForm.get('invLine') as FormArray;
    var invLineArr = this.paymentArForm.get('invLine').value;
    var e = true;
    alert("this.lstinvoices.length :" + this.lstinvoices.length);

    for (let i = 0; i < this.lstinvoices.length; i++) {
      alert("i1=" + i)
      if (invLineArr[i].applyrcptFlag === true) {
        patch.controls[i].patchValue({ applyrcptFlag: '' })
        this.applyReceiptFlag(e, i);
      }
      else {
        patch.controls[i].patchValue({ applyrcptFlag: true })
        this.applyReceiptFlag(e, i);
      }
    }

  }




  applyReceiptFlagRefund(e, index) {
    // alert (".....in Refund fn");
    var patch = this.paymentArForm.get('invLine') as FormArray;
    var invLineArr = this.paymentArForm.get('invLine').value;
    var totUnAppAmt = this.tUapplAmt;
    var totAppAmt = this.tApplAmt;


    if (e.target.checked) {

      if (this.tApplAmt >= 0) { totAppAmt = this.tApplAmt; } else { totAppAmt = 0; }
      if (this.tUapplAmt <= 0) { alert("Unapplied Balance not availabe to Refund"); e.target.checked = false; return }
      patch.controls[index].patchValue({ applAmtNew: totUnAppAmt })
    }
    else {
      patch.controls[index].patchValue({ applAmtNew: '' })
      var ttl = 0;
    }

    this.CalculateRefBalance();

  }

  CalculateRefBalance() {
    // var patch = this.paymentArForm.get('invLine') as FormArray;
    var invLineArr = this.paymentArForm.get('invLine').value;

    var appCount = 0;
    var len = this.invLineArray().length;
    // var len1=this.lstinvoices.length;
    var ttl = 0;
    this.tApplAmt = this.totAppliedtAmount;
    this.tUapplAmt = this.totUnAppliedtAmount;
    // alert("this.invLineArray().length  :"+this.invLineArray().length);

    for (let i = 0; i < this.invLineArray().length; i++) {
      ttl = ttl + Number(invLineArr[i].applAmtNew);
      // alert("ttl :" +ttl);

      if (invLineArr[i].applyrcptFlag === true) { appCount = appCount + 1; }

    }

    this.paymentArForm.patchValue({ selectAllflag1: true })

    // alert("Total Applied Amt :"  +ttl);
    this.tApplAmt = Number(this.tApplAmt) + ttl;
    this.tUapplAmt = Number(this.tUapplAmt) - ttl;
    // this.balanceAmount=   this.tUapplAmt;

  }



  validateLineRefAmt(index) {

    var x = 0;

    if (x == 0) {

      var totUnAppAmt = 0;
      var totAppAmt = 0;
      var patch = this.paymentArForm.get('invLine') as FormArray;
      var invLineArr = this.paymentArForm.get('invLine').value;
      var lineApplAmt = invLineArr[index].applAmtNew;
      var ytotUnAppAmt = this.totUnAppliedtAmount;
      var ytotAppAmt = this.totAppliedtAmount;
      //  alert ("line appl amt : "+lineApplAmt);
      if (lineApplAmt > ytotUnAppAmt || lineApplAmt <= 0) {
        alert("Line: " + (index + 1) + "\nUnApplied  Amt :" + ytotUnAppAmt + "\n Refund Amt :" + lineApplAmt + "\nLine Refund Amt should be > 0 and <= Total Unapplied Amt");

        patch.controls[index].patchValue({ applAmtNew: '' })
        patch.controls[index].patchValue({ applyrcptFlag: '' })
        totUnAppAmt = this.totUnAppliedtAmount;
        totAppAmt = this.totAppliedtAmount;

      }
      else {

        // alert ("line appl amt : "+invLineArr[index].applAmtNew);
        totUnAppAmt = Number(this.totUnAppliedtAmount) - Number(invLineArr[index].applAmtNew);
        totAppAmt = Number(this.totAppliedtAmount) + Number(invLineArr[index].applAmtNew);
        patch.controls[index].patchValue({ applyrcptFlag: true })

      }

      this.tUapplAmt = totUnAppAmt;
      this.tApplAmt = totAppAmt;
    }
  }


  applyReceiptFlag(e, index) {
    //  alert("invoked fn from applyReceiptFlagAll");
    // alert("e  ,index= "+ e +","+index);
    var xyz;
    var tApplAmt;
    var tUappAmt;

    var totUnAppAmt = 0;
    var totAppAmt = 0;
    var LineinvAmt = 0;
    var LineApplAmount = 0;
    var invBalAmt = 0;
    var lineBalDueAmt = 0

    var invLineArr = this.paymentArForm.get('invLine').value;
    var patch = this.paymentArForm.get('invLine') as FormArray;

    lineBalDueAmt = Number(invLineArr[index].balance1);
    totUnAppAmt = Number(this.tUapplAmt);
    totAppAmt = Number(this.tApplAmt);



    if (e.target.checked) {
      // alert("applyReceiptFlag-IF selected ");   
      // alert("applyReceiptFlag>>> e.target.checked :"  +e.target.checked);


      if (this.tApplAmt >= 0) { totAppAmt = this.tApplAmt; } else { totAppAmt = 0; }
      if (this.tUapplAmt <= 0) {
        alert("Unapplied Balance not availabe to apply to Invoice");
        e.target.checked = false;
        patch.controls[index].patchValue({ applyrcptFlag: false })
        this.invLineArray().controls[index].get('applAmtNew').disable();
        this.invLineArray().controls[index].get('glDateLine').disable();
        return;
      }
      this.invLineArray().controls[index].get('applAmtNew').enable();
      // this.invLineArray().controls[index].get('glDateLine').enable();

      if (totUnAppAmt >= lineBalDueAmt) {
        //  alert ("in if section")

        // this.invLineArray().controls[index].get('applAmtNew').enable();
        xyz = LineinvAmt;
        var lbDueAmt = lineBalDueAmt.toFixed(2)
        patch.controls[index].patchValue({ applAmtNew: lbDueAmt })
        LineApplAmount = Number(invLineArr[index].applAmtNew);
        invBalAmt = 0;
        var ibalAmt = invBalAmt.toFixed(2);
        patch.controls[index].patchValue({ balDueAmt: ibalAmt })

        var z1 = this.pipe.transform(this.now, 'y-MM-dd');
        patch.controls[index].patchValue({ glDateLine: z1 })
        // patch.controls[i].patchValue({glDate:z1})
        this.CalculateBalance();
      }
      else {

        var appAmt = Number(totUnAppAmt.toFixed(2));
        patch.controls[index].patchValue({ applAmtNew: appAmt })
        LineApplAmount = Number(invLineArr[index].applAmtNew);

        invBalAmt = lineBalDueAmt - totUnAppAmt;
        var newBal = Number(invBalAmt.toFixed(2));
        patch.controls[index].patchValue({ balDueAmt: newBal })

        var z1 = this.pipe.transform(this.now, 'y-MM-dd');
        patch.controls[index].patchValue({ glDateLine: z1 })
        this.CalculateBalance();
      }

    }
    else {
      // this.applyrcptFlag = 'N';
      // alert("no:"+this.applyrcptFlag);
      // alert("applyReceiptFlag-ELSE selected ");

      this.invLineArray().controls[index].get('applAmtNew').disable();
      this.invLineArray().controls[index].get('glDateLine').disable();
      xyz = LineinvAmt;
      lineBalDueAmt = Number(invLineArr[index].balance1);
      LineApplAmount = Number(invLineArr[index].applAmtNew);
      invBalAmt = Number(invLineArr[index].balDueAmt);
      var b1 = lineBalDueAmt.toFixed(2);
      patch.controls[index].patchValue({ balDueAmt: b1 })
      patch.controls[index].patchValue({ applAmtNew: 0 })
      xyz = 0;

      this.CalculateBalance();

      // invBalAmt=invBalAmt+LineApplAmount;
      // var tApp=Number(this.tApplAmt)-LineApplAmount;
      // this.tApplAmt= tApp;
      // this.tApplAmt.toFixed(2);
      // this.tUapplAmt =Number(this.tUapplAmt)+LineApplAmount;
      // this.tUapplAmt.toFixed(2);
      this.paymentArForm.patchValue({ selectAllflag1: '' });
    }
  }
  ////////////////////////////////////////////////

  CalculateBalance() {

    var patch = this.paymentArForm.get('invLine') as FormArray;
    var invLineArr = this.paymentArForm.get('invLine').value;

    // alert ("CalculateBalance...");
    var appCount = 0;
    var len = this.invLineArray().length;
    var len1 = this.lstinvoices.length;
    var ttl = 0;
    this.tApplAmt = this.totAppliedtAmount;
    this.tUapplAmt = this.totUnAppliedtAmount;

    // alert ("tApplAmt :"+this.tApplAmt + "tUapplAmt : "+this.tUapplAmt + " invLineArray.length : "+this.invLineArray().length)

    for (let i = 0; i < this.invLineArray().length; i++) {

      if (invLineArr[i].applAmtNew > 0) {
        ttl = ttl + Number(invLineArr[i].applAmtNew);
      }

      if (invLineArr[i].applyrcptFlag === true) { appCount = appCount + 1; }

    }

    // alert ("ttl ="+ttl);

    if (len1 == appCount) { this.paymentArForm.patchValue({ selectAllflag1: true }) }

    // alert("Total Applied Amt :"  +ttl);
    this.tApplAmt = Number(this.tApplAmt) + ttl;
    this.tUapplAmt = Number(this.tUapplAmt) - ttl;
    // this.balanceAmount=   this.tUapplAmt;

  }




  validateLineApplAmt(index) {
    var x = 0;
    var totUnAppAmt = 0;
    var totAppAmt = 0;
    var LineinvAmt = 0;
    var LineApplAmount = 0;
    var invBalAmt = 0;
    var applyReceiptFlag;
    var invLineArr = this.paymentArForm.get('invLine').value;
    var patch = this.paymentArForm.get('invLine') as FormArray;

    this.invLineArray().controls[index].get('applyrcptFlag').enable();
    this.applySaveButton = false;
    this.validateStatus = true;

    var lineApplAmt = Number(invLineArr[index].applAmtNew);
    var applyReceiptFlag = invLineArr[index].applyrcptFlag;
    var ytotUnAppAmt = Number(this.totUnAppliedtAmount);
    var ytotAppAmt = Number(this.totAppliedtAmount);

    // patch.controls[index].patchValue({ applyrcptFlag: true })



    if (applyReceiptFlag === true) {

      var LineinvAmt = Number(invLineArr[index].invoiceAmount);
      var LineDueAmt = Number(invLineArr[index].balance1);

      if (lineApplAmt > LineDueAmt || lineApplAmt <= 0 || lineApplAmt > ytotUnAppAmt) {
        alert("Line: " + (index + 1) + "\nInvoice Amt :" + LineDueAmt + "\nApplied Amt :" + lineApplAmt + "\nLine appiled Amt should be > 0 and <= Line balance Amt and  <=Unapplied Amt");
        patch.controls[index].patchValue({ applAmtNew: '' })
        patch.controls[index].patchValue({ applyrcptFlag: '' })
      }
      else {
        LineinvAmt = invLineArr[index].invoiceAmount;
        LineApplAmount = invLineArr[index].applAmtNew;
        invBalAmt = invLineArr[index].balance1;
        var newBal = 0;
        newBal = invBalAmt - LineApplAmount;
        newBal = Number(newBal.toFixed(2));

        patch.controls[index].patchValue({ balDueAmt: newBal })
        x = 0;

      }

      /////////////////////////////////////////////////////////
      this.CalculateBalance();
      // var totAppAmt=0;

      //   for (let i = 0; i < this.invLineArray().length ; i++) 
      // {
      //  totAppAmt=totAppAmt+Number(invLineArr[i].applAmtNew);
      // }
      //  this.tApplAmt=(totAppAmt+ytotAppAmt);
      // this.tApplAmt=Number(this.tApplAmt.toFixed(2));
      // this.tUapplAmt=ytotUnAppAmt-totAppAmt;
      // this.tUapplAmt=Number(this.tUapplAmt.toFixed(2));


      ///////////////////////////////////////////////////////
    }
    else {
      alert("Line-" + index + " : Apply Flag not selected/disabled...Select Apply Flag First.");
      patch.controls[index].patchValue({ applAmtNew: '' });
      patch.controls[index].patchValue({ balDueAmt: invLineArr[index].balance1 });

    }

  }



  AppliedDetails(custActNo: any, billToSiteId: any, applyTp: any, rcptNo: any) {
    alert("Pending...........WIP");
    this.invLineArray().clear();
  }

  SearchInvoices(custActNo: any, billToSiteId: any, applyTp: any, rcptNo: any) {
    this.paymentArForm.get('applyTo').disable();

    this.invLineArray().reset();

    if (applyTp === 'INVOICE') {

      //  this.totUnAppliedtAmount=this.paymentAmt;
      // this.totAppliedtAmount =0;

      this.service.getArReceiptSearchByInvoiceNo(custActNo, this.ouId, rcptNo, sessionStorage.getItem('dept'))
        .subscribe(
          data => {
            this.lstinvoices = data.obj.invLine;
            console.log(this.lstinvoices);
            var len = this.invLineArray().length;
            var y = 0;
            // alert("this.lstinvoices.length  >>" +this.lstinvoices.length);
            if (this.lstinvoices.length > 0) {
              this.validateStatus = true;
              this.paymentArForm.get('selectAllflag1').disable();
            } else {
              this.paymentArForm.get('selectAllflag1').disable();
              this.validateStatus = false; return;
            }

            for (let i = 0; i < this.lstinvoices.length - len; i++) {
              var invLnGrp: FormGroup = this.invLineDetails();
              this.invLineArray().push(invLnGrp);

            }
            this.paymentArForm.get('invLine').patchValue(this.lstinvoices);

            /////////////////////////////////////////////////////////
            var patch = this.paymentArForm.get('invLine') as FormArray;
            var invLineArr = this.paymentArForm.get('invLine').value;

            for (let i = 0; i < this.lstinvoices.length - len; i++) {
              y = invLineArr[i].balDueAmt.toFixed(2);
              patch.controls[i].patchValue({ balDueAmt: y })
              patch.controls[i].patchValue({ balance1: y })
              var x = invLineArr[i].applAmt.toFixed(2);
              patch.controls[i].patchValue({ applAmt: x })

              var invAmt = invLineArr[i].invoiceAmount.toFixed(2);
              patch.controls[i].patchValue({ invoiceAmount: invAmt })

              var z = this.pipe.transform(invLineArr[i].trxDate, 'y-MM-dd');
              var z1 = this.pipe.transform(this.now, 'y-MM-dd');
              // alert(invLineArr[i].trxDate);

              patch.controls[i].patchValue({ trxDate: z })
              //  patch.controls[i].patchValue({glDateLine:z1})
              //  patch.controls[i].patchValue({glDate:z1})
            }
            ///////////////////////////////////////////////////////

            this.applyTo = applyTp;
            // this.applDate=this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');
            //  this.applDate=this.pipe.transform(this.now, 'y-MM-dd');

            //  alert("glDate : "+z1);
            //  alert("trxdate : "+z);
            //  alert("trxdate : "+this.applDate);
          }
        );

    } else {
      // alert ("in Else part....")
      this.paymentArForm.get('selectAllflag1').disable();
      this.invLineArray().clear();

      this.invLineArray().push(this.invLineDetails());
      this.applyTo = applyTp;
      this.applDate = this.pipe.transform(this.now, 'y-MM-dd');
      this.validateStatus = false;
      this.applySaveButton = true;
      // this.glDateLine=this.pipe.transform(this.now, 'y-MM-dd');

      /////////////////////////////////////////////////////////
      var patch = this.paymentArForm.get('invLine') as FormArray;
      var invLineArr = this.paymentArForm.get('invLine').value;

      // alert("this.invLineArray().length  >>"+this.invLineArray().length);

      for (let i = 0; i < this.invLineArray().length; i++) {

        var z1 = this.pipe.transform(this.now, 'y-MM-dd');
        //  patch.controls[i].patchValue({applDate:z1})
        patch.controls[i].patchValue({ glDateLine: z1 })
      }
      ///////////////////////////////////////////////////////


    }

  }


  SearchCustomerAll() {
    // alert("Receipt No : "+ rcptNo );
    // this.lstCustomer = [];
    var data: any = [];
    this.service.CustomerList()
      .subscribe(
        data => {
          this.lstCustomer = data;
          console.log(this.lstCustomer);
        }
      );
  }

  searchCustomer(searchBy: any, searchValue: any) {
    // alert("Searchparam :" +searchBy +","+searchValue);

    this.service.insSiteList(searchValue)
      .subscribe(
        data => {
          this.lstCustomer = data;
          console.log(this.lstCustomer);
        }
      );
    alert(this.lstCustomer);
  }


  serchByRegNo(mRegNo) {
    // alert(mRegNo +'Search vehicle');
    this.service.getVehRegDetailsNew(mRegNo)
      .subscribe(
        data => {
          this.getVehRegDetails = data.obj;
          console.log(this.getVehRegDetails);

          if (this.getVehRegDetails != null) {
            console.log(this.getVehRegDetails);

            this.paymentArForm.patchValue({
              customerId: this.getVehRegDetails.customerId,
              custAccountNo: this.getVehRegDetails.custAccountNo
            });
            this.enableCustAccount = false;
            // this.GetCustomerDetails(this.customerId);
            // this.GetCustomerSiteDetails(this.customerId);
            this.CustAccountNoSearch(this.getVehRegDetails.custAccountNo);

          } else {
            alert("Vehicle Regno. Not Found....");
            // this.resetMast(); 
          }

        });

  }


  CustAccountNoSearch(accountNo) {
    // alert("CustAccountNoSearch:"+accountNo);
    if (accountNo <= 0) {
      this.custName = null;
      this.custSiteAddress = null;
    } else {

      this.service.custAccountNoSearch(accountNo, this.ouId, this.divisionId)
        .subscribe(
          data => {
            this.accountNoSearch = data.obj;
            if (data.obj.length === 0) {
              this.custName = null;
              this.custSiteAddress = null;
              this.paymentArForm.patchValue({ custAccountNo: '' });
              alert("Customer Account no doesn't Exists.\nDivision/OpUnit -" + this.loginArray + "(" + this.divisionId + ") / " + this.ouName + "(" + this.ouId + ")")
            }
            else {
              this.paymentArForm.patchValue({ custAccountNo: data.obj[0].accountNo });
              console.log(this.accountNoSearch);

              this.paymentArForm.patchValue({
                customerId: this.accountNoSearch[0].customerId,
                custName: this.accountNoSearch[0].custName,
                billToSiteId: this.accountNoSearch[0].billToLocId,
                billToCustId: this.accountNoSearch[0].billToLocId,
                customerSiteId: this.accountNoSearch[0].customerSiteId,
                customerSiteAddress: this.accountNoSearch[0].billToAddress,
                custCity: this.accountNoSearch[0].siteName,
                custState: this.accountNoSearch[0].state,
                CustomerGstNo: this.accountNoSearch[0].gstNo,
                customerPanNo: this.accountNoSearch[0].panNo,
                customerTanNo: this.accountNoSearch[0].tanNo,
                custPhone: this.accountNoSearch[0].mobile1,
                // customerType: this.accountNoSearch[0].customerId.custType,
                // custTaxCategoryName: this.accountNoSearch[0].taxCategoryName,
                // custPincode: this.accountNoSearch[0].pinCd,
                custTdsPer: this.accountNoSearch[0].tdsPer,
              });

              // this.GetCustomerSiteDetails(this.accountNoSearch.customerId);
              this.getTdsAmount(this.accountNoSearch.tdsPer)

            }

          });
    }


  }


  getTdsAmount(t) {
    var tdsP = this.paymentArForm.get('custTdsPer').value;
    // alert ("tdsp="+tdsP);
    if (tdsP == null || tdsP == undefined) { tdsP = 0; this.custTdsPer = 0; this.tdsAmount = 0; }
    if (Number(this.paymentAmt) > 0) {
      this.tdsAmount = (Number(this.paymentAmt) * tdsP / 100);
    } else { this.tdsAmount = 0; }
  }



  findSearchByValue(searchBy, searchValue) {
    alert("Not Ready....");

  }


  transeData(val) {

    delete val.searchByCustNo;
    delete val.searchByRcptNo;
    delete val.searchByDate;
    delete val.divisionId;
    delete val.division;
    // delete val.ouId;
    delete val.loginArray;
    delete val.loginName;
    delete val.ouName;
    delete val.locName;
    // delete val.receiptMethodId;
    delete val.receiptDate;

    // delete val.glDate;
    // delete val.receiptStatus;
    // delete val.checkDate;
    delete val.locationId;
    delete val.srlNo;
    delete val.custName;
    delete val.customerSite;
    delete val.accountNo;
    delete val.orderNumber;
    delete val.mobileNo;

    delete val.totalUnappliedAmt;
    delete val.totalAppliedAmt;
    delete val.totalOnAccountAmt;
    delete val.invoiceBalnaceAmt;

    delete val.receiptMethodName;
    delete val.receiptAmount;
    delete val.custAddr;
    delete val.customerSiteId;
    delete val.custSiteAddress;
    delete val.cancelReason;
    // delete val.cancelDate;
    delete val.prePayment;
    delete val.selectAllflag1;
    delete val.applyrcptFlag1;
    delete val.applyTo;
    delete val.totApplAmt;
    delete val.totUnApplAmt;
    delete val.tApplAmt;
    delete val.tUapplAmt;
    delete val.glPrdStartDate;
    delete val.glPrdEndDate;
    delete val.vehRegNo;
    delete val.insuranceFlag;
    delete val.reversalComment;
    delete val.reversalReasonCode;
    delete val.reversalDate;
    delete val.reversalCategory;



    delete val.invLine;

    return val;
  }

  transeData1(val) {

    delete val.searchByCustNo;
    delete val.searchByRcptNo;
    delete val.searchByDate;
    delete val.divisionId;
    delete val.division;
    delete val.ouId;
    delete val.loginArray;
    delete val.loginName;
    delete val.ouName;
    delete val.locName;
    delete val.receiptMethodId;
    delete val.receiptMethodName;
    delete val.comments;
    delete val.billToSiteId;
    delete val.receiptDate;
    delete val.paymentAmt;
    delete val.customerSite;

    delete val.glDate;
    delete val.status;
    delete val.checkDate;
    delete val.locId;
    delete val.srlNo;
    delete val.customerSiteAddress;
    delete val.custSiteAddress;
    delete val.accountNo;
    delete val.orderNumber;
    delete val.mobileNo;
    delete val.totalUnappliedAmt;
    delete val.totalAppliedAmt;
    delete val.totalOnAccountAmt;
    delete val.invoiceBalnaceAmt;
    delete val.balance1;
    delete val.selectAllflag1;
    delete val.applyrcptFlag1;
    delete val.orgId;
    delete val.deptId;
    // delete val.emplId;
    delete val.payType;
    delete val.referenceNo;
    delete val.checkNo;
    // delete val.vehNo;
    delete val.bankName;
    delete val.bankBranch;
    delete val.bankBranch;
    delete val.refType;
    delete val.cancelDate;
    delete val.totApplAmt;
    delete val.totUnApplAmt;
    delete val.onAccountAmt;
    delete val.vehRegNo;
    delete val.custCity;
    delete val.custState;
    delete val.custPincode;
    delete val.customerPanNo;
    delete val.custPhone;
    delete val.customerType;
    delete val.custTaxCategoryName;
    delete val.reversalComment;
    delete val.reversalReasonCode;
    delete val.reversalDate;
    delete val.reversalCategory;
    delete val.cancelReason;
    delete val.prePayment;
    delete val.tApplAmt;
    delete val.tUapplAmt;
    delete val.glPrdStartDate;
    delete val.glPrdEndDate;
    delete val.receiptStatus;
    delete val.insuranceFlag;
    delete val.custAddr;

    return val;
  }

  transeData2(val) {


    delete val.invLine.applyTo;
    delete val.invLine.applyrcptFlag;
    delete val.invLine.trxNumber;
    delete val.invLine.trxDate;
    delete val.invLine.invoiceAmount;
    delete val.invLine.applAmt;



    return val;
  }




  CheckDataValidations1() {
    const formValue: IPaymentRcptAr = this.paymentArForm.value;
    // alert('refType ='+formValue.refType+' '+'referenceNo='+formValue.referenceNo);  // refType undefined null referenceNo

    if (formValue.refType == undefined) {
      alert("REFERENCE TYPE\nRef.Type Not Selected....");
      return;
    }

    if (formValue.refType != 'Advance' && (formValue.referenceNo == null || formValue.referenceNo.trim() == '')) {
      alert("REFERENCE NO\nRef.number to be entered for Non-Advance Receipts");
      return;
    }

    if (formValue.refType == 'Advance') {
      alert("Advance Selected....")
      return;
    }


    // alert("RefNo:"+this.paymentArForm.controls['rfNo'].value);
    // alert("RefType:"+this.paymentArForm.controls['rfType'].value);

    // var refType = this.paymentArForm.get('refType').value;
    // var referenceNo =this.paymentArForm.get('referenceNo: ').value;

    // if(rfType != 'Advance' && (rfNo.trim() == '' || rfNo==null || rfNo== undefined) )
    // {
    //   alert("Ref.number to be entered for Non-Advance Receipts");
    // }
    // if (rfType == undefined){
    //   alert (" Ref.Type Not Selected....")
    // }

  }

  SaveApply(applType) {


    if (applType === 'INVOICE') {
      // alert("Application type :"+applType +" ....wip");


      this.SaveApplyReceipt();
    }
    if (applType === 'REFUND') {
      // alert("Application type :"+applType + " ....wip");
      // this.disableApplySave =false;
      this.SaveRefReceipt();


    }
    if (applType === 'ON ACCOUNT') {
      alert("Application type :" + applType + " ....wip");
      // this.disableApplySave =false;
    }

  }

  CalculateRcptBalances() {
    alert("Calculating balances....")
    this.totUnAppliedtAmount = this.tUapplAmt;
    this.totAppliedtAmount = this.tApplAmt;
    this.balanceAmount = this.tUapplAmt;
  }


  validateSave(mType) {

    if (this.GLPeriodCheck === null) {
      this.checkValidation = false;
      alert("GL PERIOD is null. Please update GL period.");
      return;
    }

    if (mType === 'INVOICE') {

      var applLineArr = this.paymentArForm.get('invLine').value;
      var len1 = applLineArr.length;

      this.validateStatus = false;
      this.applySaveButton = false;

      // for (let i = 0; i < len1 ; i++) 
      for (let i = len1 - 1; i >= 0; i--) {

        if (this.invLineArray().controls[i].get('applyrcptFlag').value != true) {
          this.invLineArray().removeAt(i);
        } else { this.applySaveButton = true; }

      }
    }

    var applLineArr1 = this.paymentArForm.get('invLine').value;
    var patch = this.paymentArForm.get('invLine') as FormArray;

    for (let i = 0; i < applLineArr1.length; i++) {

      patch.controls[i].patchValue({ applAmt: applLineArr1[i].applAmtNew });
      patch.controls[i].patchValue({ glDate: applLineArr1[i].glDateLine });

      this.invLineArray().controls[i].get('applyrcptFlag').disable();
      this.invLineArray().controls[i].get('applAmtNew').disable();
      this.invLineArray().controls[i].get('glDateLine').disable();

      this.CheckLineValidations(i);

    }

    if (this.applLineValidation == true) { this.applySaveButton = true; } else { this.applySaveButton = false; }

  }


  SaveApplyReceipt() {
    // alert ("Posting data  to AR RECEIPT appl......")

    var patch = this.paymentArForm.get('invLine') as FormArray;
    var applLineArr = this.paymentArForm.get('invLine').value;

    this.applLineValidation = false;
    var len1 = applLineArr.length;
    // alert ("this.invLineArray().length  :" +len1);


    for (let i = 0; i < len1; i++) {

      // if (applLineArr[i].applyrcptFlag === true) {
      this.CheckLineValidations(i);
      // } 
    }

    if (this.applLineValidation === false) {
      alert("Apply Validation Failed... \nPosting not done....")
      return;
    }
    this.CalculateRcptBalances();
    this.applySaveButton = false;
    this.enableApplyButton = false;
    this.enableCancelButton = false;

    const formValue: IPaymentRcptAr = this.transeData1(this.paymentArForm.value);


    // alert ("this.invLineArray().length after removing unchecked lines  :" +this.invLineArray().length);

    let variants = <FormArray>this.invLineArray();
    var receiptNumber = this.paymentArForm.get('receiptNumber').value;
    var receiptDate = this.paymentArForm.get('receiptDate').value;
    var customerId = this.paymentArForm.get('customerId').value;
    var custAccountNo = this.paymentArForm.get('custAccountNo').value;
    var customerSiteId = this.paymentArForm.get('customerSiteId').value;
    var custName = this.paymentArForm.get('custName').value;

    for (let i = 0; i < this.invLineArray().length; i++) {
      //  let variants = <FormArray>this.invLineArray();

      let variantFormGroup = <FormGroup>variants.controls[i];
      variantFormGroup.addControl('receiptNumber', new FormControl(receiptNumber, Validators.required));
      variantFormGroup.addControl('receiptDate', new FormControl(receiptDate, Validators.required));
      variantFormGroup.addControl('customerId', new FormControl(customerId, Validators.required));
      variantFormGroup.addControl('custAccountNo', new FormControl(custAccountNo, Validators.required));
      variantFormGroup.addControl('customerSiteId', new FormControl(customerSiteId, Validators.required));
      variantFormGroup.addControl('custName', new FormControl(custName, Validators.required));

      // patch.controls[i].patchValue({ applAmt: applLineArr[i].applAmtNew });
      // patch.controls[i].patchValue({ glDate: applLineArr[i].glDateLine });
      // patch.controls[i].patchValue({trxDate: this.pipe.transform(applLineArr[i].trxDate,'y-MM-dd')});

    }

    console.log(variants.value);

    this.service.ArReceipApplySubmit(variants.value, receiptNumber).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');

        this.paymentArForm.disable();

      } else {
        if (res.code === 400) {
          alert('Error While Saving Record:-' + res.obj);

        }
      }
    });
  }



  SaveRefReceipt() {
    // alert ("Posting data  to AR RECEIPT appl......")

    var patch = this.paymentArForm.get('invLine') as FormArray;
    var applLineArr = this.paymentArForm.get('invLine').value;


    this.applLineValidation = false;
    var len1 = applLineArr.length;

    for (let i = 0; i < len1; i++) {
      this.CheckLineValidationsRef(i);
    }

    if (this.applLineValidation === false) {
      alert("Validation Failed... \nPosting not done....")
      return;
    }

    for (let i = 0; i < applLineArr.length; i++) {
      this.invLineArray().controls[i].get('applyrcptFlag').disable();
    }
    this.CalculateRcptBalances();
    this.applySaveButton = false;
    this.enableApplyButton = false;
    this.enableCancelButton = false;
    const formValue: IPaymentRcptAr = this.transeData2(this.paymentArForm.value);

    // var invLine= this.paymentArForm.get('invLine').value;

    let variants = <FormArray>this.invLineArray();
    var receiptNumber = this.paymentArForm.get('receiptNumber').value;
    var receiptDate = this.paymentArForm.get('receiptDate').value;
    var payType = this.paymentArForm.get('payType').value;
    var receiptMethodId = this.paymentArForm.get('receiptMethodId').value;
    var receiptMethodName = this.paymentArForm.get('receiptMethodName').value;
    // var empId = this.paymentArForm.get('emplId').value;
    var empId = Number(sessionStorage.getItem('emplId'));
    // var empId= 26;
    // alert ("Empid =" +empId);
    // var glDate= this.paymentArForm.get('glDateLine').value;

    for (let i = 0; i < this.invLineArray().length; i++) {
      let variantFormGroup = <FormGroup>variants.controls[i];
      variantFormGroup.addControl('receiptNumber', new FormControl(receiptNumber, Validators.required));
      variantFormGroup.addControl('receiptDate', new FormControl(receiptDate, Validators.required));
      variantFormGroup.addControl('payType', new FormControl(payType, Validators.required));
      variantFormGroup.addControl('receiptMethodId', new FormControl(receiptMethodId, Validators.required));
      variantFormGroup.addControl('receiptMethodName', new FormControl(receiptMethodName, Validators.required));
      variantFormGroup.addControl('emplId', new FormControl(empId, Validators.required));

      patch.controls[i].patchValue({ paymentAmt: applLineArr[i].applAmtNew });
      patch.controls[i].patchValue({ glDate: applLineArr[i].glDateLine });

    }
    console.log(variants.value);

    // console.log();
    // this.service.ArReceiptRefundSubmit(formValue).subscribe((res: any) => {
    this.service.ArReceiptRefundSubmit(variants.value).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY -' + res.obj);
        // this.paymentArForm.reset();
      } else {
        if (res.code === 400) {
          alert('Error While Saving Record:-' + res.obj);
          // this.paymentArForm.reset();
        }
      }
    });
  }



  newMast() {

    // alert ("GL period..." +this.GLPeriodCheck);


    this.CheckDataValidations();

    if (this.checkValidation === true) {
      // alert("Data Validation Sucessfull....\nPosting data  to AR PAYMENT TABLE");

      const formValue: IPaymentRcptAr = this.transeData(this.paymentArForm.value);

      this.service.ArReceiptSubmit(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD INSERTED SUCCESSFUILY');
          this.receiptNumber = res.obj;
          this.paymentArForm.disable();
          this.paymentArForm.get('searchByRcptNo').enable();
          this.paymentArForm.get('searchByCustNo').enable();
          this.paymentArForm.get('searchByDate').enable();
          this.totUnAppliedtAmount = this.paymentAmt;
          this.totAppliedtAmount = 0;
          this.balanceAmount == this.paymentAmt;

          // this.paymentArForm.reset();
          this.displayButton = false;
        } else {
          if (res.code === 400) {
            alert('Error While Saving Record:-' + res.obj);
            // this.paymentArForm.reset();
          }
        }
      });
    }
    // else { alert("Data Validation Not Sucessfull....\nPosting Not Done...") }

  }

  CheckCancelValidation() {

    // let latest_date =this.pipe.transform(new Date(), 'yyyy-MM-dd')
    // let rcptDate=this.pipe.transform(this.receiptDate, 'yyyy-MM-dd')

    // alert("Receipt date : "+rcptDate + " mtoday :" +latest_date)
    // this.cancelValidation = false;

    const formValue: IPaymentRcptAr = this.paymentArForm.value;

    if (formValue.reversalReasonCode === undefined || formValue.reversalReasonCode === null || formValue.reversalReasonCode.trim() == '') {
      this.cancelValidation = false;
      alert("REVERSE REASON: Should not be null....");
      return;
    }

    if (formValue.reversalReasonCode === 'ChqBounce') {

      if (formValue.reversalComment === undefined || formValue.reversalComment === null || formValue.reversalComment.trim() == '') {
        this.cancelValidation = false;
        alert("CHQ BOUNCE REASON: Should not be null....");
        return;
      }

      if (formValue.chqBounceCharge === undefined || formValue.chqBounceCharge === null || formValue.chqBounceCharge < 0) {
        this.cancelValidation = false;
        alert("CHQ BOUNCE CHARGES: Should not be null....");
        return;
      }

    }

    //  alert("formValue.reversalDate :"+formValue.reversalDate);

    if (formValue.reversalDate == undefined || formValue.reversalDate == null) {
      this.cancelValidation = false;
      alert("REVERSAL DATE: Should not be null....");
      return;
    }


    if (formValue.reversalCategory === undefined || formValue.reversalCategory === null) {
      this.cancelValidation = false;
      alert("REVERSAL CATEGORY : Should not be null");
      return;
    }

    // if (formValue.reversalComment === undefined || formValue.reversalComment === null || formValue.reversalComment.trim() == '') {
    //   this.cancelValidation = false;
    //   alert("REVERSAL REMARKS : Should not be null");
    //   return;
    // }

    // alert("Status :" + formValue.status);

    // if (formValue.status === undefined || formValue.status === null) {
    //   alert("STATUS: Should not be null....");
    //   this.cancelValidation = false
    //   return;
    // }

    this.cancelValidation = true;
  }


  reverseReceipt() {

    this.CheckCancelValidation();
    if (this.cancelValidation) {
      // alert("Data Validation Sucessfull....\nCancelling Receipt.")
      this.enableCancelButton = false;

      // const formValue: IPaymentRcptAr =this.transeData(this.paymentArForm.value);
      const formValue: IPaymentRcptAr = this.paymentArForm.value;
      // debugger;
      this.service.ReverseArReceiptSubmit(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          alert('Receipt Reversal done Successfully');
          this.paymentArForm.disable()
          // this.paymentArForm.get('receiptNumber').disable();

          this.paymentArForm.get('searchByRcptNo').enable();
          this.paymentArForm.get('searchByCustNo').enable();
          this.paymentArForm.get('searchByDate').enable();
          // window.location.reload();
        } else {
          if (res.code === 400) {
            // alert('ERROR OCCOURED IN PROCEESS');
            alert(res.message + "\n" + res.obj);
            this.enableCancelButton = true;
            // this.paymentArForm.reset();
          }
        }
      });
    } else { alert("Data Validation Not Sucessfull....\nCancellation not done...") }
  }



  onReasonSelected(mReasonCode1) {
    var mReasonCode = this.paymentArForm.get('reversalReasonCode').value
    var pymtType = this.paymentArForm.get('payType').value

    // alert ("REaseonCode , pytype :"+mReasonCode +","+pymtType);

    if (mReasonCode != null) {

      if (mReasonCode === 'ChqBounce' && pymtType != 'CHEQUE') {
        this.paymentArForm.get('reversalReasonCode').reset();
        this.reversalReasonCode = null;
        alert("Please select proper Reversal Reason...")
        this.reversalComment = '';
        this.reversalCategory = '';
        return;
      }

      this.reversalDate = this.pipe.transform(Date.now(), 'y-MM-dd');
      // receiptDate = this.pipe.transform(Date.now(), 'y-MM-dd');
      this.reversalCategory = 'Receipt Reversed'
      this.status = 'REVERSED'
      this.enableApplyButton = false;
    }

    this.chqBounceStatus = false;
    // this.reversalComment=null;
    if (mReasonCode === 'ChqBounce' && pymtType === 'CHEQUE') {
      // alert ("in Reason fn..chq bounc")
      this.chqBounceStatus = true;
      this.reversalComment = mReasonCode;
      // this.service.RcptChqBounceReasonList('ChqBncRsn')
      this.service.RcptChqBounceReasonListNew(this.ouId)
        .subscribe(
          data => {
            this.ChqBounceReasonList = data;
            console.log(this.ChqBounceReasonList);
          }
        );
    }

  }


  onBounceRsnSelected(bncRsn) {
    let selectedValue = this.ChqBounceReasonList.find(d => d.code === bncRsn);
    var bncCharge;
    if (selectedValue != undefined) { bncCharge = selectedValue.minbouncecharge; } else { bncCharge = 0; }

    this.paymentArForm.patchValue({ chqBounceCharge: bncCharge })

  }



  // ReceiptArApplication(rcptNumber: any, custActNo: any, rcptDate: any,ouId:any) {
  //   alert(this.receiptNumber);
  //   this.service.getArReceiptSearchByRcptNo(rcptNumber, custActNo, rcptDate,ouId)
  //     .subscribe(
  //       data => {
  //         this.lstcomments = data.obj;
  //         console.log(this.lstcomments);
  //       }
  //     );
  // }


  OnApplyTypeSelected(applType: any) {

    this.invLineArray().clear();
    this.applyTo = applType;
    if (applType === 'INVOICE') {
      // alert ("in INVOICE  ...");
      this.showInvoiceGrid = true; this.showRefundGrid = false; this.showOnAcGrid = false;
    }
    else if (applType === 'REFUND') {
      // alert ("in REFUND  ...");
      this.showInvoiceGrid = false; this.showRefundGrid = true; this.showOnAcGrid = false;
    }
    else if (applType === 'ON ACCOUNT') {
      // alert ("in ON ACCOUNT  ...");
      this.showInvoiceGrid = false; this.showRefundGrid = false; this.showOnAcGrid = true;
    }

  }



  CheckDataValidations() {

    const formValue: IPaymentRcptAr = this.paymentArForm.value;

    // alert ("OPERATING UNIT :" +formValue.ouId);
    var msg1;
    if (this.GLPeriodCheck === null) {
      this.checkValidation = false;
      // alert("GL PERIOD is null. Please update GL period.");
      // return;
      msg1 = 'GL PERIOD is null. Please update GL period.';
      // this.executeAlertMsg(msg1);
      alert(msg1);
      // (document.getElementById('saveBtn')asHTMLInputElement).setAttribute('data-target','#confirmAlert');
      // this.message="GL PERIOD is null. Please update GL period."
      return;
    }


    if (formValue.ouId === undefined || formValue.ouId === null) {
      this.checkValidation = false;
      msg1 = "OPERATING UNIT: Should not be null....";
      alert(msg1);
      return;
    }

    if (formValue.locId === undefined || formValue.locId === null) {
      this.checkValidation = false;
      alert("LOCATION: Should not be null....");
      return;
    }

    if (formValue.deptId === undefined || formValue.deptId === null) {
      this.checkValidation = false;
      alert("DEPT: Should not be null....");
      return;
    }


    if (formValue.custAccountNo === undefined || formValue.custAccountNo === null || formValue.custAccountNo <= 0) {
      this.checkValidation = false;
      alert("CUST NO : Should not be null / Enter valid Customer No");
      return;
    }


    if (formValue.billToSiteId === undefined || formValue.billToSiteId === null) {
      this.checkValidation = false;
      alert("BILL TO SITE : Should not be null....");
      return;
    }

    var tglDate = new Date(formValue.glDate);
    var sDate = new Date(this.GLPeriodCheck.startDate);
    var tDate = new Date(this.GLPeriodCheck.endDate);


    if (formValue.glDate === undefined || formValue.glDate === null || tglDate < sDate || tglDate > tDate) {
      this.checkValidation = false;
      alert("GL DATE: " + this.pipe.transform(tglDate, 'y-MM-dd') + " Should not be null / Should be within GL period.\nGL Period : " + this.GLPeriodCheck.startDate + " - " + this.GLPeriodCheck.endDate);
      this.glDate = this.pipe.transform(this.now, 'y-MM-dd');
      return;
    }


    if (formValue.paymentAmt <= 0 || formValue.paymentAmt === undefined || formValue.paymentAmt === null) {
      this.checkValidation = false;
      alert("RECEIPT AMT: Should be above Zero");
      return;
    }

    if (formValue.refType === undefined || formValue.refType === null) {
      this.checkValidation = false;
      alert("REF TYPE: Should not be null....");
      return;
    }

    if (formValue.refType != 'Advance' && (formValue.referenceNo == null || formValue.referenceNo.trim() == '')) {
      alert("REFERENCE NO\nRef.number to be entered for Non-Advance Receipts");
      return;
    }

    if (formValue.payType === undefined || formValue.payType === null) {
      this.checkValidation = false;
      alert("PAY MODE: Please Select payment Type....");
      return;
    }

    if (formValue.receiptMethodId === undefined || formValue.receiptMethodId === null) {
      this.checkValidation = false;
      alert("PAY METHOD: Please Select Receipt Method....");

      return;
    }

    if (formValue.payType !== null) {
      if (formValue.payType != 'CASH') {

        if (formValue.bankName === undefined || formValue.bankName === null || formValue.bankName.trim() === '') {
          this.checkValidation = false;
          alert("BANK : Please Enter Bank Name....");
          return;
        }

        if (formValue.bankBranch === undefined || formValue.bankBranch === null || formValue.bankBranch.trim() === '') {
          this.checkValidation = false;
          alert("BANK BRANCH : Please Enter Bank Branch....");
          return;
        }

        if (formValue.checkNo === undefined || formValue.checkNo === null || formValue.checkNo.trim() === '') {
          this.checkValidation = false;
          alert("CHECK/DD/CRD/NEFT NO: Please Enter Cheq/dd no...");
          return;
        }

        if (formValue.checkDate === undefined || formValue.checkDate === null) {
          this.checkValidation = false;
          alert("CHECK/DD/CRD/NEF DATE: Please Select Chq/dd.. Date....");
          return;
        }
      }

    }



    // if (formValue.receiptStatus === undefined || formValue.receiptStatus === null) {
    //   this.checkValidation = false;
    //   alert("RECEIPT STATUS: Should not be null....");
    //   return;
    // }

    // if (formValue.status === undefined || formValue.status === null) {
    //   this.checkValidation = false;
    //   alert("STATUS: Should not be null....");
    //   return;
    // }


    this.checkValidation = true

  }

  executeAlertMsg(msg1) {
    if (this.checkValidation == false) {
      (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
      this.message = msg1;
    }
  }

  clearSearch() {
    this.paymentArForm.get('searchByRcptNo').reset();
    this.paymentArForm.get('searchByCustNo').reset();
    this.paymentArForm.get('searchByDate').reset();

    this.paymentArForm.get('searchByRcptNo').enable();
    this.paymentArForm.get('searchByCustNo').enable();
    this.paymentArForm.get('searchByDate').enable();
    this.lstcomments = null;
  }

  CheckLineValidations(i) {

    // alert('addrow index '+i);

    var applLineArr = this.paymentArForm.get('invLine').value;
    var lineValue1 = applLineArr[i].applAmt;
    var tglDate = new Date(applLineArr[i].glDate);
    var chkFlag = applLineArr[i].applyrcptFlag;
    var j = i + 1;

    //  alert (lineValue1+","+tglDate +","+chkFlag);
    if (lineValue1 === undefined || lineValue1 === null || lineValue1 <= 0) {
      alert("Line-" + j + " APPL AMT :  Should  be grater than Zero");
      this.applLineValidation = false;
      return;
    }


    var sDate = new Date(this.GLPeriodCheck.startDate);
    var tDate = new Date(this.GLPeriodCheck.endDate);
    if (tglDate === undefined || tglDate === null || tglDate < sDate || tglDate > tDate) {
      // this.checkValidation = false;
      alert("GL DATE: Should not be null / Should be within GL period.\nGL Period : " + this.GLPeriodCheck.startDate + " - " + this.GLPeriodCheck.endDate);
      this.glDate = this.pipe.transform(this.now, 'y-MM-dd');
      this.applLineValidation = false;
      return;
    }


    // if (chkFlag === false || chkFlag === null || chkFlag === undefined) {
    //   alert("Line-" + j + " : Line not Selected.Pls Check Mark the Line");
    //   this.applLineValidation = false;
    //   return;
    // }

    this.applLineValidation = true;
  }


  CheckLineValidationsRef(i) {

    var applLineArr = this.paymentArForm.get('invLine').value;
    var lineValue1 = applLineArr[i].applAmtNew;
    // var lineValue2 = applLineArr[i].refReasonCode;
    var lineValue2 = applLineArr[i].insurance;
    var tglDate = new Date(applLineArr[i].glDateLine);
    var chkFlag = applLineArr[i].applyrcptFlag;
    var j = i + 1;


    if (lineValue1 === undefined || lineValue1 === null || lineValue1 <= 0) {
      alert("Line-" + j + " REFUND AMT :  Should  be grater than Zero");
      this.applLineValidation = false;
      return;
    }

    if (lineValue2 === undefined || lineValue2 === null) {
      alert("Line-" + j + " REFUND REASON :  Should  not be null");
      this.applLineValidation = false;
      return;
    }

    var sDate = new Date(this.GLPeriodCheck.startDate);
    var tDate = new Date(this.GLPeriodCheck.endDate);
    if (tglDate === undefined || tglDate === null || tglDate < sDate || tglDate > tDate) {
      this.checkValidation = false;
      alert("GL DATE: Should not be null / Should be within GL period.\nGL Period : " + this.GLPeriodCheck.startDate + " - " + this.GLPeriodCheck.endDate);
      this.glDate = this.pipe.transform(this.now, 'y-MM-dd');
      return;
    }

    if (chkFlag === false || chkFlag === null || chkFlag === undefined) {
      alert("Line-" + j + " : Line not Selected.Pls Check Mark the Line");
      this.applLineValidation = false;
      return;
    }

    this.applLineValidation = true;
  }



  receiptApplyHist() {
    this.receiptAmount = this.paymentAmt;
    this.tApplAmt = this.totAppliedtAmount;
    this.tUapplAmt = this.totUnAppliedtAmount;

  }


  getMessage(msgType: string) {
    this.msgType = msgType;

    if (msgType.includes("Save")) {
      this.message = "DoyouwanttoSave(Yes/No)?"
    }

    if (msgType.includes("Reset")) {
      this.message = "DoyouwanttoResettheForm(Yes/No)?"
    }

    if (msgType.includes("Close")) {
      this.message = "DoyouwanttoClosetheForm(Yes/No)?"
    }
    return;
  }



  executeAction() {

    if (this.msgType.includes("Save")) {
      this.newMast();
    }

    if (this.msgType.includes("Reset")) {
      window.location.reload();
    }

    if (this.msgType.includes("Close")) {
      this.router.navigate(['admin']);
    }
    return;
  }


  viewAccounting(receiptNo: any) {

    this.viewAccountingArRcpt = null;
    this.viewAccountingLines = null;
    this.showViewActLine = false;
    this.runningTotalCr = null;
    this.runningTotalDr = null;

    this.service.viewAccountingArReceipt(receiptNo).subscribe((res: any) => {
      if (res.code === 200) {
        this.viewAccountingArRcpt = res.obj;
        // this.viewAccountingLines = res.obj[0].glLines;

        console.log(this.viewAccountingArRcpt);

        // alert(res.message);
      } else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });
  }

  ViewActSelect(index) {
    // alert ("View Act Line ..."+index);
    this.showViewActLine = true;
    var rcptNo = this.paymentArForm.get("receiptNumber").value;
    this.service.viewAccountingArReceipt(rcptNo).subscribe((res: any) => {
      if (res.code === 200) {
        this.viewAccountingLines = res.obj[index].glLines;
        console.log(this.viewAccountingLines);
        this.runningTotalDr = res.obj[index].runningTotalDr;
        this.runningTotalCr = res.obj[index].runningTotalCr;
        // this.paymentArForm.patchValue({totalDr:res.obj[index].runningTotalDr})
        // this.paymentArForm.patchValue({totalCr:res.obj[index].runningTotalCr})
        // alert(this.runningTotalDr +","+this.runningTotalCr);
      }
      else {
        if (res.code === 400) {
          alert(res.message);
        }
      }
    });



  }

  custNameSearch(custName) {
    // alert(custName)
    this.orderManagementService.custNameSearchFn1(custName, sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.customerNameSearch = data.obj;
            console.log(this.accountNoSearch);
          }
          else {
            if (data.code === 400) {
              alert(data.message);
              // this.display = 'block';
            }
          }
        }
      );
  }


  printReceipt() {
    var mRtnOrderNumber = this.paymentArForm.get('receiptNumber').value
    var refTp = this.paymentArForm.get('refType').value
    // alert ("Ref Type : "+refTp);
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    var refType = this.paymentArForm.get('refType').value;
    // alert(refType)
    // if (refType != 'ReIns-Renewal'){
    this.orderManagementService.printArReceipt(mRtnOrderNumber, refTp)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open

      });
    // }
    if (refType == 'ReIns-Renewal') {
      this.orderManagementService.reinsuarnceReceiptPrintFn(this.receiptNumber)
        .subscribe(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          var printWindow = window.open(url, '', 'width=800,height=500');
          printWindow.open
        });
    }
  }

  reinsuarnceReceiptPrint() {
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.orderManagementService.reinsuarnceReceiptPrintFn(this.receiptNumber)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      });
  }
}

