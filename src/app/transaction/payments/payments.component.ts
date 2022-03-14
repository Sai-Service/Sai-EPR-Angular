import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DateRangePickerComponent } from 'ngx-daterange';
import { IDateRange, IDateRangePickerOptions } from 'ngx-daterange';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InvSearchNew } from './inv-search-new';
import { PaymentObj } from './payment-obj';
import { Location } from "@angular/common";

interface Ipayment {
  suppNo: number;
  invoiceNum: string;
  ouId: number;
  name: string;
  payDate: Date;
  totAmt: number;
  totAmount: number,
  suppId: number,
  supplierSiteId: number,
  // ouId: number,
  partyId: number,
  bankAccountNo: string,
  // suppNo:number;
  docCategoryCode: string,
  paymentMehtodId: number,
  paymentNarration: string,
  paymentDocName: string,
  invoiceId: number,
  amount: number;
  statusLookupCode: string;
  appAmt: number;
  searchByToDate: Date;
  searchByFrmDate: Date;
  searchBySuppName: string;
}


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  form: FormGroup = null;
  paymentForm: FormGroup;
  suppNo: number;
  content: number;
  invoiceNum: string;
  ouId: number;
  payStatus: string;
  currency: 'INR';
  ouName: string;
  name: string;
  supplierSiteId: number;
  suppId: number;
  country: 'India';
  payDate = new Date();
  invTypeLookupCode: string;
  invoiceAmt: number;
  // invoiceNum:string;
  paymentAmt: number;
  totAmt: number;
  bankAccountId: number;
  docCategoryCode: number;
  invoiceId: number;
  partyId: number;
  totAmount: number;
  unPaidAmt: number;
  statusLookupCode: string;
  INVNO: string;
  public lstsearchpayminv: any;
  public lstsearchpayminvNew: any = [];
  public lstinvoiceDetls: any;
  // public invPayment:any[];
  public supplierCodeList1: any[];
  public supplierCodeList: any[];
  public docCategoryCodeList: any[];
  public suppIdList: any;
  public suppIdList1: any;
  siteIdList: any;
  selectFlag: string;
  paymentMethodId: string;
  displaytype = false;
  displaysuppNo = false;
  displayouId = false;
  displaysiteAddress = false;
  displaystatus = false;
  TRUER = false; recFagDiss = true;
  public bankAccountNumList: any;
  public paymentDocNameList: Array<string> = [];
  public statusLookupCodeList: any = [];
  public paymentIdListList: Array<string> = [];
  public PaymentReturnArr: any;
  appAmt: number;
  searchByToDate: Date;
  searchByFrmDate: Date;
  searchBySuppName: string;
  paymentData: any[] = [];
  displayselect: boolean = false;
  pipe = new DatePipe('en-US');
  displaysiteName = false;
  displayname = false;
  // invoiceNum:number;
  // public invAmtArr : any [];
  private sub: any;
  constructor(private fb: FormBuilder, private router1: ActivatedRoute, private transactionService: TransactionService, private location: Location, private service: MasterService, private router: Router) {
    this.paymentForm = fb.group({
      suppNo: [],
      ouName: [],
      docNo: [],
      payStatus: [],
      paymentAmt: [],
      totAmt: [],
      INVNO: [],
      appAmt: [],
      searchByToDate: [],
      searchByFrmDate: [],
      searchBySuppName: [],
      obj1: this.fb.array([this.payHeaderLineDtl()]),
      obj: this.fb.array([this.payInvoiceLineDtl()]),
    })
  }
  payHeaderLineDtlArray(): FormArray {
    return <FormArray>this.paymentForm.get('obj1')
  }
  payInvoiceLineDtlArray(): FormArray {
    return <FormArray>this.paymentForm.get('obj')
  }

  payInvoiceLineDtl() {
    return this.fb.group({
      invoiceNum: [],
      invoiceAmt: [],
      selectFlag: [],
      invoiceId: [],
      unPaidAmt: [],
      docNo: [],
      payStatus: [],
      // appAmt:[],
    })
  }

  payHeaderLineDtl() {
    return this.fb.group({
      // invoiceNum:[],
      paymentTypeFlag: [],
      ouId: [],
      suppNo: [],
      // bankAccountNum:[],
      currency: [],
      paymentDocName: [],
      paymentNarration: [],
      name: [],
      ouName: [],
      supplierSiteId: [],
      suppId: [],
      country: [],
      paymentMethodId: [],
      statusLookupCode: [],
      payDate: [],
      invTypeLookupCode: [],
      suppSiteId: [],
      siteName: [],
      PayAmount: [],
      docNo: [],
      payAddress: [],
      // docCategory:[],
      voucherNo: [],
      // bankAccountId:[],
      docCategoryCode: [],
      bankAccountNo: [],
      partyId: [],
      totAmount: [],
      // appAmt:[],
      docCategory: [],
      payStatus: [],

    });
  }

  get g() { return this.paymentForm.controls; }

  ngOnInit(): void {
    // this.currency='INR';
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId = Number(sessionStorage.getItem('ouId'));


    // alert(currentOP)  
    this.service.supplierCodeList()
      .subscribe(
        data1 => {
          this.supplierCodeList = data1;
          console.log(this.supplierCodeList);
          data1 = this.supplierCodeList;
        }
      );


    this.transactionService.bankAccountNumList(this.ouId)
      .subscribe(
        data => {
          this.bankAccountNumList = data;
          console.log(this.bankAccountNumList);
        }
      );

    this.transactionService.statusLookupCodeList()
      .subscribe(
        data => {
          this.statusLookupCodeList = data;
          console.log(this.statusLookupCodeList);

          let selectStatus = this.statusLookupCodeList.find(v => v.lookupValue === 'NEGOTIABLE');
          console.log(selectStatus);
          var patch = this.paymentForm.get('obj1') as FormArray;
          (patch.controls[0]).patchValue(
            {
              statusLookupCode: selectStatus.lookupValue,
            }
          );
        }
      );
    this.transactionService.paymentIdListList()
      .subscribe(
        data => {
          this.paymentIdListList = data;
          console.log(this.paymentIdListList);
        }
      );

  
    this.sub = this.router1.params.subscribe(params => {
      this.INVNO = params['invNumber'];
      var searchObj: InvSearchNew = new InvSearchNew();
      { searchObj.invoiceNum = this.INVNO }
      if (this.INVNO != undefined) {
        this.displaysiteName = true;
        this.displaysiteAddress = true;
        this.displayname = true;
        this.displaytype = true;
        this.transactionService.getsearchByApINV(JSON.stringify(searchObj)).subscribe((res: any) => {
          if (res.code === 200) {
            this.payHeaderLineDtlArray().clear();
            this.payInvoiceLineDtlArray().clear();
            if (res.obj.length === 0) {
              alert('AP Invoice Details not Find !...');
              window.location.reload();
            }
            else if (res.obj.length != 0) {
              this.lstsearchpayminvNew = res.obj;
              console.log(res.obj);
              var x = 0;
              var payLnGrp: FormGroup = this.payHeaderLineDtl();
              this.payHeaderLineDtlArray().push(payLnGrp);
              var arrcontrol = this.payHeaderLineDtlArray() as FormArray;
              arrcontrol.controls[x].patchValue(this.lstsearchpayminvNew[x]);
              arrcontrol.controls[x].patchValue({ paymentTypeFlag: 'Quick' });
              arrcontrol.controls[x].patchValue({ PayAmount: this.lstsearchpayminvNew[x].invoiceAmt });
            }
          }
        });
      }
    })
  }
  SearchINVNO(INVNO) {
    // alert(INVNO +'---SearchINVNO')
    // alert(this.paymentForm.get('INVNO').value);
    this.payInvoiceLineDtlArray().clear();
    let control = this.paymentForm.get('obj') as FormArray;
    var lenC = this.payInvoiceLineDtlArray().length;
    console.log(this.lstinvoiceDetls);
    let select = this.lstinvoiceDetls.find(d => d.invoiceNum === INVNO);
    var pyLine: FormGroup = this.payInvoiceLineDtl();
    // for (let i = 0; i <= select.length - lenC; i++) {
    control.push(pyLine);
    this.totAmt = select.invoiceAmt;
    // }
    // this.paymentForm.get('obj').patchValue(select);
    // var patch = this.poMasterDtoForm.get('poLines') as FormArray;
    (control.controls[0]).patchValue(
      {
        // totAmt : 0,
        invoiceNum: select.invoiceNum,
        invoiceAmt: select.invoiceAmt,
        unPaidAmt: select.invoiceAmt,
      });
  }


  payment(paymentForm) {
  }

  transData(val) {
    return val;
  }

  paymentFind(suppNo: number) {
    // alert('--paymentFind---')
    this.payHeaderLineDtlArray().clear();
    this.displaytype = true;
    this.displaysuppNo = true;
    this.displayouId = true;
    this.displaysiteAddress = true;
    this.displaystatus = true;
    //  this.transactionService.getsearchByPayment(suppNo).subscribe((res: any) => {

    this.transactionService.getsearchByInvDtls(suppNo, sessionStorage.getItem('ouId')).subscribe((res: any) => {
      this.lstsearchpayminv = res.obj;
      console.log(res.obj);
      this.lstsearchpayminv.forEach(f => {
        var payLnGrp: FormGroup = this.payHeaderLineDtl();
        this.payHeaderLineDtlArray().push(payLnGrp);
      });
      this.paymentForm.get('obj1').patchValue(this.lstsearchpayminv);
    }
    )
  }


  selectedPayment: any;

  paymentdispSearch(docNo, i) {

    // alert(docNo);

    var arr = this.paymentForm.get('obj1').value;
    console.log(arr);
    var docNo1 = arr[i].docNo;


    this.transactionService.paymentDocSearch(docNo1).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.PaymentReturnArr = res.obj;

      } else {
        if (res.code === 400) {
          alert(res.msg);
          // this.poReceiptForm.reset();
        }
      }
    });


  }

  paymentInvoiceFind(suppNo: number, ouId: number) {
    //  alert('--paymentInvoiceFind---')
    //  var arr=this.paymentForm.get('obj1').value;
    //  console.log(arr);
    //  var docNo1=arr[i].docNo;
    //  alert(docNo1)
    // console.log(docNo1);
    // if(docNo1===''){
    var suppNo1 = this.paymentForm.get('obj1').value;
    this.payInvoiceLineDtlArray().clear();
    this.transactionService.getsearchByInvDtls(suppNo1[0].suppNo, this.ouId).subscribe((res: any) => {
      this.lstinvoiceDetls = res.obj;
      var sum = 0;
      for (let i = 0; i < this.lstinvoiceDetls.length; i++) {
        sum = sum + this.lstinvoiceDetls[i].invoiceAmt;
        // this.invAmtArr.push(this.lstinvoiceDetls[i].invoiceAmt);
      }
      //  alert(sum);
      this.totAmt = sum;
      this.lstinvoiceDetls.forEach(f => {
        var payInvGrp: FormGroup = this.payInvoiceLineDtl();
        this.payInvoiceLineDtlArray().push(payInvGrp);

      });
      this.paymentForm.get('obj').patchValue(this.lstinvoiceDetls);

    }
    );
    // (document.getElementById('btnSave') as HTMLInputElement).disabled = true;comment by vinita
    // }
    // else{
    //   // this.transactionService.paymentDocSearch(docNo1).subscribe((res: any) =>
    // {
    //   if (res.code === 200) {
    //    alert(res.message);
    //    this.PaymentReturnArr=res.obj;

    //   } else {
    //     if (res.code === 400) {
    //       alert(res.msg);
    //       // this.poReceiptForm.reset();
    //     }
    //   }
    // });

    // }

  }

  changeAmount(i) {
    //  alert('---changeAmount---')
    var totlCalControls = this.paymentForm.get('obj').value;
    var sum = 0;

    for (let i = 0; i < this.payInvoiceLineDtlArray().length; i++) {
      sum = sum + Number(totlCalControls[i].invoiceAmt);
      //  alert(totlCalControls[i].invoiceAmt);
    }
    // alert(totlCalControls[i].unPaidAmt);
    this.totAmt = sum;
    var unPaidAmt1 = Number(totlCalControls[i].unPaidAmt) - Number(totlCalControls[i].invoiceAmt)
    // alert('unPaidAmt1 '+ unPaidAmt1)
    var patch = this.paymentForm.get('obj') as FormArray;
    (patch.controls[i]).patchValue(
      {
        unPaidAmt: unPaidAmt1,
      }
    );
    //  }
  }


  onOptionsSelected(bankAccountNo, index) {
    // alert('---bankAccountNo---')
    var bankAccountNo = bankAccountNo.target.value;
    // add  check for cash payment
    if (bankAccountNo != undefined) {
      // alert(bankAccountNo);
      var value = bankAccountNo.split('/');
      // alert(value[0]);
      let selectedValue = this.bankAccountNumList.find(v => v.bankAccountNo == (value[0]));
      // var bankId=this.paymentForm.get('obj1').value;
      var patch = this.paymentForm.get('obj1') as FormArray;
      var address = (selectedValue.address1 + " " + selectedValue.address2 + " " + selectedValue.address3 + " " + selectedValue.city + " " + selectedValue.pinCode + " " + selectedValue.state);
      (patch.controls[index]).patchValue({ payAddress: address });
      this.transactionService.docCategoryCodeList(selectedValue.bankAccountId)
        .subscribe(
          data => {
            this.docCategoryCodeList = data;
            console.log(this.docCategoryCodeList);
          }
        );
    }

  }


  onOptionsSelectedDocCat(docCategoryCode) {
    var docCategoryCode = docCategoryCode.target.value;
    // alert('---onOptionsSelectedDocCat----');
    this.transactionService.paymentDocNameList(docCategoryCode)
      .subscribe(
        data => {
          this.paymentDocNameList = data;
          console.log(this.paymentDocNameList);
        }
      );
  }


  onOptionsSelectedsuppName(name: any) {
    var name = name.target.value;
    // alert(name);
    let selectedValue = this.supplierCodeList.find(v => v.name == name);
    var dataobj1 = this.paymentForm.get('obj1') as FormArray;
    dataobj1.controls[0].patchValue(
      {
        suppNo: selectedValue.suppNo,
        suppId: selectedValue.suppId,
        partyId: selectedValue.suppId
      });
    // alert(selectedValue);
    this.currency = 'INR';
    this.country = 'India';
    this.suppId = selectedValue.suppId;
    this.service.suppIdList(selectedValue.suppId, this.ouId)
      .subscribe(
        data => {
          this.suppIdList = data;
          if (this.suppIdList.length == 0) {
            alert('Supplier site not attached to supplier');
          } else {
            console.log(this.suppIdList);
          }
        }
      );
  }

  onAddressSelected(name: any) {
    var name = name.target.value;
    // alert(name);
    this.service.supplierCodeList1()
      .subscribe(
        data => {
          this.supplierCodeList1 = data;
          console.log(this.supplierCodeList1);
          this.suppNo = name;
          console.log(this.supplierCodeList1);

        }
      );
    let selectedValue = this.supplierCodeList.find(v => v.suppNo == name);
    this.suppId = selectedValue.suppId;
    this.service.suppIdList1(selectedValue.suppId, this.ouId)
      .subscribe(
        data => {

          this.suppIdList1 = data;
          if (this.suppIdList1.length == 0) {
            alert('Supplier site not attached to supplier');
          } else {
            console.log(this.suppIdList1);
          }
        }
      );
  }

  onSiteSelected(siteId: any) {
    // alert(siteId);
    var siteId = siteId.target.value;
    this.service.siteIdList(siteId)
      .subscribe(
        data => {
          this.siteIdList = data;
          console.log(this.siteIdList);
        }
      );
  }


  selectFlag1(e) {
    // alert(e + '----checkbox')
    if (e.target.checked === true) {
      this.selectFlag = 'Y'
    }
    if (e.target.checked === false) {
      this.selectFlag = 'N'
    }
    this.appAmt = 0;
    var arrayControle = this.paymentForm.get('obj').value;
    for (let i = 0; i < this.payInvoiceLineDtlArray().length; i++) {
      // alert(arrayControle[i].selectFlag+'SelectFlag');
      if (arrayControle[i].selectFlag == true) {
        // alert('yyyy '+arrayControle[i].invoiceAmt)
        this.appAmt = this.appAmt + Number(arrayControle[i].invoiceAmt);
        //  alert(this.appAmt);
        // invPayment.push(id)
        //
      }
    }
    const totlPayHeaderControls = this.paymentForm.get('obj1').value;
    // if(this.appAmt>totlPayHeaderControls[0].PayAmount || this.appAmt<totlPayHeaderControls[0].PayAmount)
    // {
    //   alert('in If');
    //   (document.getElementById('btnSave') as HTMLInputElement).disabled = true;
    //   alert("You can not apply payment where actual amount is greater than selected Amount");

    // }
    // else{
    //   alert('in else');
    //   (document.getElementById('btnSave') as HTMLInputElement).disabled = false;
    // }comment by vinita

  }

  paymentSave() {
    this.totAmt = 0;
    const totlCalControls = this.paymentForm.get('obj').value;
    for (var k = 0; k < this.payInvoiceLineDtlArray.length; k++) {
      this.totAmt = this.totAmt + totlCalControls[k].totAmt;
    }
    const formValue: Ipayment = this.paymentForm.value;
    console.log(formValue.suppId);
    var jsonData = this.paymentForm.value.obj1[0];
    if (jsonData.bankAccountNo != undefined) {
      var value = jsonData.bankAccountNo.split('/');
      jsonData.bankAccountNo = value[0];
    }
    jsonData.country = 'India';
    jsonData.currency = 'INR';
    jsonData.ouId = this.ouId;
    // jsonData.bankAccountNum.delete;
    // jsonData.bankAccountId.delete;
    var invPayment: any = [];
    this.totAmount = 0;
    var arrayControle = this.paymentForm.get('obj').value;
    var patch = this.paymentForm.get('obj1') as FormArray;
    for (let i = 0; i < this.payInvoiceLineDtlArray().length; i++) {
      // alert(arrayControle[i].selectFlag);
      if (arrayControle[i].selectFlag == true) {
        //  alert('yyyy '+arrayControle[i].invoiceAmt)
        this.totAmount = this.totAmount + Number(arrayControle[i].invoiceAmt);
        // alert(this.totAmount);
        var id = { "invoiceId": arrayControle[i].invoiceId }
        var id2 = { "amount": arrayControle[i].invoiceAmt }
        // invPayment.push(id)
        //
        invPayment.push({
          invoiceId: arrayControle[i].invoiceId,
          amount: arrayControle[i].invoiceAmt,
        })
      }
    }

    jsonData.totAmount = this.totAmount;
    jsonData.appAmt = this.appAmt;
    // alert(this.totAmount);
    jsonData.invPayment = invPayment;
    // let paymentObject=Object.assign(new PaymentObj(),jsonData);
    // paymentObject.setInvPayment(this.paymentForm.value.)
    console.log(jsonData);

    this.transactionService.paymentSaveSubmit(JSON.stringify(jsonData)).subscribe((res: any) => {
      if (res.code === 200) {
        // alert(res.message);
        // alert(res.obj);
        console.log(res.obj);

        this.PaymentReturnArr = res.obj;
        console.log(this.PaymentReturnArr);
        patch.controls[0].patchValue({ docNo: this.PaymentReturnArr.docSeqValue })
        this.paymentForm.get('obj1').disable();
        (document.getElementById('btnSelect') as HTMLInputElement).disabled = true;
      } else {
        if (res.code === 400) {
          alert(res.msg);
          // this.poReceiptForm.reset();
        }
      }
    });
  }
  closeRefresh() {
    this.paymentForm.get('appAmt').reset();
  }

  close() {
    this.location.back();
  }

  refresh() {
    window.location.reload();
  }
  cancelPayment() {
    var arr = this.paymentForm.get('obj1').value;
    // alert(this.PaymentReturnArr[0].documentNo);
    console.log(this.paymentData);
    this.selectedPayment = this.paymentData.find(d => Number(d.docNo) === this.PaymentReturnArr[0].documentNo);
    console.log(this.selectedPayment);
    this.transactionService.paymentCancel(this.selectedPayment).subscribe((res: any) => {
      if (res.code === 200) {
        // alert(res.message);
        // alert(res.obj);
        console.log(res.obj);
      } else {
        if (res.code === 400) {
          alert(res.msg);
          // this.poReceiptForm.reset();
        }
      }
    });

  }


  searchPayment(searchBySuppName, searchByFrmDate, searchByToDate) {
    // alert('searchPayment')
    // frmDate = this.pipe.transform(searchByFrmDate, 'dd-MMM-yyyy');
    // toDate = this.pipe.transform(searchByToDate, 'dd-MMM-yyyy');
    var suppNo = this.supplierCodeList.find(d => d.name === searchBySuppName)
    console.log(suppNo);
    var suppNo1 = suppNo.suppNo;
    console.log(suppNo1);

    this.transactionService.paymentSearch(suppNo1, this.pipe.transform(searchByFrmDate, 'dd-MMM-yyyy'), this.pipe.transform(searchByToDate, 'dd-MMM-yyyy'), sessionStorage.getItem('divisionId'))
      .subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.paymentData = res.obj;
          for (let i = 0; i < this.paymentData.length; i++) {
            var payLnGrp: FormGroup = this.payHeaderLineDtl();
            this.payHeaderLineDtlArray().push(payLnGrp);
          }

          this.paymentForm.get('obj1').patchValue(this.paymentData);
          // this.paymentForm.patchValue(this.paymentData);
          console.log(this.paymentData);

        } else {
          if (res.code === 400) {
            alert(res.msg);
            // this.poReceiptForm.reset();
          }
        }
      });
  }

  Select(documentNo: number) {
    // alert ("receipt Number :" +documentNo);

    let select = this.paymentData.find(d => d.documentNo === documentNo);
    console.log(select);
    if (select != undefined) {
      // alert('In select');
      this.paymentForm.patchValue(select);
      this.paymentForm.patchValue({ paymentTypeFlag: select.paymentTypeFlag });
      this.paymentForm.disable();
    }
  }

}
