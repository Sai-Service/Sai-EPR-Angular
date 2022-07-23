// import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
// import * as moment from 'moment';
// import { DateRangePickerComponent } from 'ngx-daterange';
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
  emplId:number;
  source:string;
  receiptMethodId:number;
  refundStatus:string;
  // partyId:number;
  locId:number;
  paymentNo:number
  payAmount:number;
  
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
  pipe = new DatePipe('en-US');
  todaydate = new Date();
  partyId:number;
  source:string;
  paymentNo:number;

  displayselButton: Array<boolean> = [];

  // payDate = this.pipe.transform(this.todaydate, 'dd-MMM-yyyy');
  // payDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  payDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  invTypeLookupCode: string;
  invoiceAmt: number;
  // invoiceNum:string;
  paymentAmt: number;
  totAmt: number;
  bankAccountId: number;
  docCategoryCode: string;
  invoiceId: number;
  // partyId: number;
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
  public docCategoryCodeList: any=[];
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
  public paymentDocNameList: any = [];
  public statusLookupCodeList: any = [];
  public paymentIdListList: any = [];
  public PaymentReturnArr: any;
  appAmt: number;
  searchByToDate: Date;
  searchByFrmDate: Date;
  searchBySuppName: string;
  paymentData: any[] = [];
  paymentDocdata:any[]=[];
  displayselect: boolean = false;
  // pipe = new DatePipe('en-US');
  viewAccountingApRcpt: any;

  jeSource: string;
  name1: string;
  ledgerName: string;
  jeCategory: string;
  postedDate: Date;
  periodName: string;
  runningTotalDr: number;
  runningTotalCr: number;
  viewAccounting1: any=[];
  description: string;
  ledgerId: string;
  docSeqValue: string;
  // payStatus:string;
  displaysiteName = false;
  displayname = false;
  displayDetail=true;
  payAddress:string;
  emplId:number;
  private sub: any;
  private sub1:any;
  receiptMethodId:number;
  refundStatus:string;
  isarPayment:boolean=false;
  isSelPayment:boolean=true;
  ispayAdvise:boolean=false;
  payAmount:number;
  public locIdList: any = [];
  locId:number;

  constructor(private fb: FormBuilder, private router1: ActivatedRoute,private router2:ActivatedRoute, private transactionService: TransactionService, private location: Location, private service: MasterService, private router: Router) {
    this.paymentForm = fb.group({
      suppNo: [],
      ouName: [],
      paymentAmt:[],
      totAmt:[],
      INVNO:[],
      appAmt:[],
      searchByToDate:[],
searchByFrmDate:[],
searchBySuppName:[],
jeSource: [],
  name1: [],
  ledgerName: [],
  jeCategory: [],
  postedDate: [],
  periodName: [],
  runningTotalDr: [],
  runningTotalCr: [],
  description: [],
  ledgerId: [],
  docSeqValue: [],
  payStatus:[],
      docNo: [],
      emplId:[],
      paymentNo:[],
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
      // partyId:[],
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
      payAmount: [],
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
      source:[],
      receiptMethodId:[],
      refundStatus:[],
      locId:[],
    });
  }

  get g() { return this.paymentForm.controls; }

  ngOnInit(): void {
    // this.currency='INR';
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.emplId=Number(sessionStorage.getItem('emplId'));

    // alert(currentOP)  
    this.service.supplierCodeWithEmplListNew()
      .subscribe(
        data1 => {
          this.supplierCodeList = data1;
          console.log(this.supplierCodeList);
          data1 = this.supplierCodeList;
        }
      );


    // this.transactionService.bankAccountNumList(this.ouId)
    //   .subscribe(
    //     data => {
    //       this.bankAccountNumList = data;
    //       console.log(this.bankAccountNumList);
    //     }
    //   );

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
      this.service.locationIdList1(this.ouId)
      .subscribe(
        data => {
          this.locIdList = data;
          console.log(this.locIdList);
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
              arrcontrol.controls[x].patchValue({ paymentTypeFlag: 'Quick',statusLookupCode:'NEGOTIABLE' });
              arrcontrol.controls[x].patchValue({ payAmount: this.lstsearchpayminvNew[x].invoiceAmt });
              arrcontrol.controls[x].patchValue({ supplierSiteId: this.lstsearchpayminvNew[x].suppSiteId });
              arrcontrol.controls[x].patchValue({partyId:this.lstsearchpayminvNew[x].partyId});
              this.partyId=this.lstsearchpayminvNew[x].partyId;
              this.suppId=this.lstsearchpayminvNew[x].suppId;
              this.source=this.lstsearchpayminvNew[x].source;
              arrcontrol.controls[x].get('payAmount').disable();
              // this.displayselButton[0]=true;
            }
          }
        });
      }
    })
   
    this.sub1 = this.router2.params.subscribe(params => {
      var payNo = this.router2.snapshot.queryParamMap.get('trxNum');
      var categ = Number(this.router1.snapshot.queryParamMap.get('catg'));
      if ( payNo != undefined){
       this.paymentNo=Number(payNo);
         this.searchByPaymentNo(this.paymentNo);
        }
      
      });
    


    this.displayselButton[0]=true;
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
        invoiceId:select.invoiceId,
      });
  }


  payment(paymentForm) {
  }

  transData(val) {
    return val;
  }

  paymentFind(suppNo: number) {
    // alert('--paymentFind---')
    // alert('paymentFind-----')
    this.payHeaderLineDtlArray().clear();
    this.displaytype = true;
    this.displaysuppNo = true;
    this.displayouId = true;
    this.displaysiteAddress = true;
    this.displaystatus = true; 
    // this.transactionService.getsearchByInvDtls(suppNo, sessionStorage.getItem('ouId'),this.partyId).subscribe((res: any) => {
      this.transactionService.getsearchByInvDtls(this.suppId, sessionStorage.getItem('ouId'),this.partyId).subscribe((res: any) => {
      this.lstsearchpayminv = res.obj;
      this.displayDetail=false;
      this.displaystatus=true;
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
  selreeceiptmethod:any;
  selstatus:any;
  selPayStatus:any;
  paymentdispSearch(docNo, i) {

    // alert(docNo);

    var arr = this.paymentForm.get('obj1').value;
    console.log(arr);
    var docNo1 = arr[i].docNo;
    this.selreeceiptmethod=arr[i].receiptMethodId;
    this.selstatus=arr[i].refundStatus;
    this.selPayStatus=arr[i].statusLookupCode;


    this.transactionService.paymentDocSearch(docNo1).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.PaymentReturnArr = res.obj;
        if(this.selstatus=='Y'){
          this.isarPayment=false;
        }
        else{
        this.isarPayment=true;
        }
        this.ispayAdvise=true;
      } else {
        if (res.code === 400) {
          alert(res.msg);
          // this.poReceiptForm.reset();
        }
      }
    });


  }

  selectPayment:number=0;
  paymentInvoiceFind(suppNo: number, ouId: number,index) {
    this.selectPayment=index;
    var suppNo1 = this.paymentForm.get('obj1').value;
     console.log(suppNo1);
    this.payInvoiceLineDtlArray().clear();
    if(suppNo1[index].source==='REFUND')
    {
     var invArr = this.paymentForm.get('obj').value;
      // invArr.controls[0].get('invoiceAmt').disable();
    }
    if(suppNo1[index].invTypeLookupCode==='Prepayment' &&suppNo1[index].docNo===null)
    
{
  for (var j=0;j<this.lstsearchpayminvNew.length;j++){
    
    if(this.lstsearchpayminvNew[j].source!='TDS Invoice' ){
  var payLnGrp: FormGroup = this.payInvoiceLineDtl();
  this.payInvoiceLineDtlArray().push(payLnGrp);
  }
}
  // alert(this.lstsearchpayminvNew[index].invoiceId+'--'+this.lstsearchpayminvNew[index].invoiceAmt)
  // this.paymentForm.patchValue({'invoiceId':this.lstsearchpayminvNew[0].invoiceId,'invoiceAmt':this.lstsearchpayminvNew[0].invoiceAmt});
  var dataobj1 = this.paymentForm.get('obj') as FormArray;
  for(var i=0;i<this.payInvoiceLineDtlArray().length;i++){
    // debugger;
    if(this.lstsearchpayminvNew[i].source!='TDS Invoice' ){
  dataobj1.controls[i].patchValue({'invoiceNum': this.lstsearchpayminvNew[i].invoiceNum,
                                          'invoiceAmt':this.lstsearchpayminvNew[i].invoiceAmt,
                                          'invoiceId':this.lstsearchpayminvNew[i].invoiceId   });
    dataobj1.controls[i].get('invoiceAmt').disable();
    }
    }
}
else{
  // alert(this.partyId+'PartyID');
    // this.transactionService.getsearchByInvDtls(suppNo1[index].suppNo, this.ouId,this.partyId).subscribe((res: any) => {
      if(this.source=='REFUND')
      {
      this.transactionService.getsearchByInvDtls(suppNo1[index].suppId, this.ouId,suppNo1[index].partyId).subscribe((res: any) => {
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
      var paymentLineAmtArray =  this.paymentForm.get('obj') as FormArray;
      // alert(paymentLineAmtArray.length);
      for (let k=0; k<paymentLineAmtArray.length;k++){
        paymentLineAmtArray[k].invoiceAmt.disable(); 
      }
      this.payInvoiceLineDtlArray().get('invoiceAmt').disable();
      // this.payInvoiceLineDtlArray().disable();
      // this.payHeaderLineDtlArray().get('selectFlag').enable();
      

    }
    );
  }
  else{
    var partyId='';
    this.transactionService.getsearchByInvDtls(suppNo1[index].suppId, this.ouId,partyId).subscribe((res: any) => {
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
  }
  
  }
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

  onOptionMethod(event,index){
    // alert(event);
    var methodName=event.target.value;
    // alert(methodName+'methodName')
    console.log(this.paymentIdListList); 
    var selMet=this.paymentIdListList.find(d=>d.lookupValueId == event.target.value);
    console.log(selMet);
    
    // alert(selMet.lookupValue)
    this.transactionService.paymentMethodName(this.ouId,selMet.lookupValue)
    .subscribe(
      data => {
        this.bankAccountNumList = data.obj;
        // console.log(this.docCategoryCodeList);
      }
    );
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
    // alert('---onOptionsSelectedDocCat----'+docCategoryCode);
    console.log(this.bankAccountNumList);
    var sel=this.bankAccountNumList.find(d=>d.methodName==docCategoryCode)
    // alert(sel.receiptMethodId);
    if(sel.receiptMethodId!=undefined){
    var arrCon=this.paymentForm.get('obj1') as FormArray;
    arrCon.controls[0].patchValue({receiptMethodId:sel.receiptMethodId});
    }
    this.transactionService.paymentDocNameList(docCategoryCode)
      .subscribe(
        data => {
          this.paymentDocNameList = data;
          console.log(this.paymentDocNameList);
        }
      );
  }


  onOptionsSelectedsuppName(name: any) {
    // var name = name.target.value;
    // alert(name);
    let selectedValue = this.supplierCodeList.find(v => v.name == name);
    var dataobj1 = this.paymentForm.get('obj1') as FormArray;
    // alert(selectedValue.suppNo)
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
          // this.suppNo = name; 25-Mar-2022
          console.log(this.supplierCodeList1);

        }
      );
    // let selectedValue = this.supplierCodeList.find(v => v.suppNo == name);
    // this.suppId = selectedValue.suppId;
    // this.service.suppIdList1(selectedValue.suppId, this.ouId)
    //   .subscribe(
    //     data => {

    //       this.suppIdList1 = data;
    //       if (this.suppIdList1.length == 0) {
    //         alert('Supplier site not attached to supplier');
    //       } else {
    //         console.log(this.suppIdList1);
    //       }
    //     }
    //   );
  }

  onSiteSelected(event: any) {
    // alert(event);
    var siteId = event.target.value;
    // alert(siteId);
    this.service.siteIdList(siteId)
      .subscribe(
        data => {
          this.siteIdList = data;
          console.log(this.siteIdList);
        }
      );
  }


  selectFlag1(e,k) {
    // alert(k);
    // alert(e + '----checkbox')
    if (e.target.checked === true) {
      this.selectFlag = 'Y'
     }
    if (e.target.checked === false) {
      this.selectFlag = 'N'
    }
    if(this.selectFlag='Y'){
      // alert((this.selectFlag));
      // debugger;
      // var arrcon = this.paymentForm.get('obj').value;
      var objVal=this.paymentForm.getRawValue();
      var arrcon = objVal.obj;
      console.log(objVal);
      // .get('obj').value;
      // var arrobj = this.paymentForm.get('obj1').value;
      var arrobj = objVal.obj1;
      // .get('obj1').value;
      var patch = this.paymentForm.get('obj') as FormArray;
      var invAmt=arrcon[k].invoiceAmt;
      var unAmt=arrcon[k].unPaidAmt;
      
      // alert(arrobj[this.selectPayment].invTypeLookupCode+'----this.selectPayment---'+this.selectPayment)
      if(arrobj[this.selectPayment].invTypeLookupCode==='Prepayment' && arrobj[this.selectPayment].docNo===null)
      {
        
      }
    else{
      // alert(invAmt+'--'+unAmt);
      if(invAmt>unAmt && unAmt<0){
        alert('Can not enter amount more than unpaid ammount')
        patch.controls[k].patchValue({'invoiceAmt':''});
        return;
      }
    }
    }
    this.appAmt = 0;
    var arrayControle = objVal.obj;
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
     const totlPayHeaderControls=this.paymentForm.get('obj1').value;
        // if(this.appAmt>totlPayHeaderControls[0].payAmount || this.appAmt<totlPayHeaderControls[0].payAmount)
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

paymentSave(){
  var applAmt=this.paymentForm.get('appAmt').value;
  // var arrcon=this.paymentForm.get('obj1').value;
  
  var patch=this.paymentForm.get('obj1') as FormArray;
  var arrcon=patch.getRawValue();
  // alert(arrcon[this.selectPayment].payAmount);
  var invTyp=arrcon[this.selectPayment].invTypeLookupCode;
   this.totAmt=0;
   const obj1=this.paymentForm.get('obj') as FormArray;
  const totlCalControls=obj1.getRawValue();
  for (var k=0;k<this.payInvoiceLineDtlArray.length;k++)   {
    this.totAmt=this.totAmt+totlCalControls[k].totAmt;
  }
  // jsonData.statusLookupCode=totlCalControls[0].statusLookupCode;
  // jsonData.bankAccountNum.delete;
  // jsonData.bankAccountId.delete;
  var invPayment:any=[];
  this.totAmount = 0;
  const objarr=this.paymentForm.get('obj') as FormArray;
  var arrayControle=objarr.getRawValue();
  var patch=this.paymentForm.get('obj1') as FormArray;
  for (let i=0;i<this.payInvoiceLineDtlArray().length;i++){
    // alert(arrayControle[i].selectFlag);
    if (arrayControle[i].selectFlag==true)
   {
    //  alert('yyyy '+arrayControle[i].invoiceAmt)
    this.totAmount = this.totAmount + Number(arrayControle[i].invoiceAmt);
    // alert(this.totAmount);
    var id = {"invoiceId": arrayControle[i].invoiceId}
    var id2 = {"amount": arrayControle[i].invoiceAmt}
    // invPayment.push(id)
    // 
    invPayment.push({
      invoiceId:arrayControle[i].invoiceId,
      amount:arrayControle[i].invoiceAmt,
    })
  }
  }
  if(arrcon[this.selectPayment].invTypeLookupCode==='Prepayment' &&arrcon[this.selectPayment].docNo===null)
  {
    this.paymentForm.patchValue({appAmt:arrcon[this.selectPayment].payAmount})
    // this.totAmount=arrcon[this.selectPayment].payAmount
    patch.controls[this.selectPayment].patchValue({payAmount:this.totAmount});
  }
  else{
    if(arrcon[this.selectPayment].invTypeLookupCode==='Prepayment' &&arrcon[this.selectPayment].docNo!=null){
      var appAmt=this.paymentForm.get('appAmt').value;
      // alert(appAmt+'Amt'+arrcon[this.selectPayment].payAmount)
      if(appAmt > arrcon[this.selectPayment].payAmount)
      {
        alert('Please select proper amount')
        return;
      }
    }
else{
  // debugger;
  // alert('Hello'+applAmt);
  patch.controls[this.selectPayment].patchValue({payAmount:applAmt});

  // alert(arrcon[this.selectPayment].payAmount+'amt');
}
  }

  const formValue: Ipayment = this.paymentForm.getRawValue();
  console.log(this.paymentForm.get('emplId').value);
  var jsonData=this.paymentForm.value.obj1[this.selectPayment];
console.log(jsonData);
  if(jsonData.bankAccountNo != undefined){
  var value=jsonData.bankAccountNo.split('/');
  jsonData.bankAccountNo= value[this.selectPayment];
  }
  jsonData.country ='India';
  jsonData.currency='INR';
  jsonData.ouId= this.ouId ;
 jsonData.emplId=Number(sessionStorage.getItem('emplId'));
  

  jsonData.totAmount = this.totAmount;
  jsonData.appAmt=this.appAmt;
  // alert(this.totAmount);
  jsonData.invPayment=invPayment;
  // jsonData.payAmount=arrcon[this.selectPayment].payAmount;
  if(arrcon[this.selectPayment].invTypeLookupCode=== null){
    jsonData.payAmount=this.appAmt;
  }else{
 jsonData.payAmount=arrcon[this.selectPayment].payAmount;
  }
  // let paymentObject=Object.assign(new PaymentObj(),jsonData);
  // paymentObject.setInvPayment(this.paymentForm.value.)
console.log(jsonData);

  this.transactionService.paymentSaveSubmit(JSON.stringify(jsonData)).subscribe((res: any) => {
    if (res.code === 200) {
      alert(res.message);
      // alert(res.obj);
      console.log(res.obj);

      this.PaymentReturnArr =res.obj[0];
      console.log(this.PaymentReturnArr);
      patch.controls[0].patchValue({docNo: this.PaymentReturnArr.docSeqValue})
      this.paymentForm.get('obj1').disable();
      (document.getElementById('btnSelect') as HTMLInputElement).disabled = true;
    } else {
      if (res.code === 400) {
        alert(res.message+'--'+res.obj);
        // this.poReceiptForm.reset();
      }
    }
    const totlPayHeaderControls = this.paymentForm.get('obj1').value;
    // if(this.appAmt>totlPayHeaderControls[0].payAmount || this.appAmt<totlPayHeaderControls[0].payAmount)
    // {
    //   alert('in If');
    //   (document.getElementById('btnSave') as HTMLInputElement).disabled = true;
    //   alert("You can not apply payment where actual amount is greater than selected Amount");

    // }
    // else{
    //   alert('in else');
    //   (document.getElementById('btnSave') as HTMLInputElement).disabled = false;
    // }comment by vinita

  });
}

 
  closeRefresh() {
    this.paymentForm.get('appAmt').reset();
  }

  close() {
    // alert(this.INVNO)
    if (this.INVNO != null){
      this.router.navigate(['/admin/transaction/payableInvoice',this.INVNO]);
    }
    else{
    this.location.back();
  }
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
    // alert('searchPayment----');
    console.log(this.supplierCodeList)
    // frmDate = this.pipe.transform(searchByFrmDate, 'dd-MMM-yyyy');
    // toDate = this.pipe.transform(searchByToDate, 'dd-MMM-yyyy');
    var suppNo = this.supplierCodeList.find(d => d.name === searchBySuppName)
    console.log(suppNo);
    var suppNo1 = suppNo.suppNo;
    console.log(suppNo1);
    this.displaysiteName = true;
    this.displaysiteAddress = true;
    this.displayname = true;
    this.displaytype = true;
    this.payHeaderLineDtlArray().clear();
    this.transactionService.paymentSearch(suppNo1, this.pipe.transform(searchByFrmDate, 'dd-MMM-yyyy'), this.pipe.transform(searchByToDate, 'dd-MMM-yyyy'), sessionStorage.getItem('divisionId'))
      .subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.paymentData = res.obj;
          this.displayDetail=false;
          this.displaystatus=true;
          // alert(this.paymentData.length+'----this.paymentData.length')
          for (let i = 0; i < this.paymentData.length; i++) {
            var payLnGrp: FormGroup = this.payHeaderLineDtl();
            this.payHeaderLineDtlArray().push(payLnGrp);
            
          }
          // alert(this.payHeaderLineDtlArray().length+'len');
          for (let j = 0; j < this.payHeaderLineDtlArray().length; j++) {
            var patch=this.paymentForm.get('obj1') as FormArray;
          //   // var selPay=this.suppIdList.find(d=>d.suppSiteId===res.obj[j])
            patch.controls[j].patchValue(this.paymentData);
            var payDateNew1New = this.pipe.transform(res.obj[j].payDate, 'y-MM-dd');
            this.payDate = payDateNew1New;
            if(this.paymentData[j].statusLookupCode==='CLEARED'){
              this.displayselButton[j] = false;            
          }
          else{
            this.displayselButton[j] = true;   
          }
         
        }
          this.paymentForm.get('obj1').patchValue(this.paymentData);
          var patch=this.paymentForm.get('obj1') as FormArray;
            
          for (let k = 0; k < this.payHeaderLineDtlArray().length; k++) {
          var selloc=this.locIdList.find(d=>d.locId===this.paymentData[k].locId)
          // debugger;
          patch.controls[k].patchValue({locId:selloc.locId});
          }
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

  searchByPaymentNo(paymentNo){
    // alert('searchPayment----'+paymentNo);
      this.displaysiteName = true;
      this.displaysiteAddress = true;
      this.displayname = true;
      this.displaytype = true;
      this.payHeaderLineDtlArray().clear();
      this.transactionService.paymentSearchBydocNo(paymentNo)
        .subscribe((res: any) => {
          if (res.code === 200) {
            alert(res.message);
            this.paymentDocdata = res.obj;
            this.displayDetail=false;
            this.displaystatus=true;
            // alert(this.paymentData.length+'----this.paymentData.length')
            for (let i = 0; i < this.paymentDocdata.length; i++) {
              var payLnGrp1: FormGroup = this.payHeaderLineDtl();
              this.payHeaderLineDtlArray().push(payLnGrp1);
              
            }
            // alert(this.payHeaderLineDtlArray().length+'len');
            for (let j = 0; j < this.payHeaderLineDtlArray().length; j++) {
              // debugger;
              var patch=this.paymentForm.get('obj1') as FormArray;
            //   // var selPay=this.suppIdList.find(d=>d.suppSiteId===res.obj[j])
              patch.controls[j].patchValue(this.paymentDocdata);
              var payDateNew1New = this.pipe.transform(res.obj[j].payDate, 'y-MM-dd');
              this.payDate = payDateNew1New;
              // alert(this.paymentDocdata[j].statusLookupCode)
              // debugger;
              if(this.paymentDocdata[j].statusLookupCode==='CLEARED'){
                this.displayselButton[j] = false;            
            }
            else{
              this.displayselButton[j] = true;   
            }
            if(this.paymentDocdata[j].statusLookupCode==='UNCLEARED' && this.paymentDocdata[j].invTypeLookupCode==='Prepayment')
            {
              this.displayselButton[j] = true; 
            }
           
          }
            this.paymentForm.get('obj1').patchValue(this.paymentDocdata);
            // this.paymentForm.patchValue(this.paymentData);
            console.log(this.paymentData);
            for (let k = 0; k < this.payHeaderLineDtlArray().length; k++) {
              var selloc=this.locIdList.find(d=>d.locId===this.paymentDocdata[k].locId)
              // debugger;
              patch.controls[k].patchValue({locId:selloc.locId});
              }
          } else {
            if (res.code === 400) {
              alert(res.msg);
              // this.poReceiptForm.reset();
            }
          }
        });
    
  }
      viewAcc(documentNo,invoiceId){
        // alert(documentNo)
        var docVal=this.paymentForm.get('obj').value;
        alert(invoiceId);
        // var docNo=docVal[0].docNo
        this.service.viewAccountingbyApReceipt(documentNo,invoiceId).subscribe((res: any) => {
          if (res.code === 200) {
            this.viewAccountingApRcpt = res.obj;
            this.description = res.obj[0].description;
            this.periodName = res.obj[0].periodName;
            this.postedDate = res.obj[0].postedDate;
            this.jeCategory = res.obj[0].jeCategory;
            this.name1 = res.obj[0].name;
            this.ledgerId = res.obj[0].ledgerId;
            this.runningTotalDr = res.obj[0].runningTotalDr;
            this.runningTotalCr = res.obj[0].runningTotalCr;
            this.docSeqValue = res.obj[0].docSeqValue;
            console.log(this.PaymentReturnArr);
            // debugger;
            for(var i=0;i<res.obj.length;i++){
              var gllnArr=res.obj[i].glLines;
              for(var j=0;j<gllnArr.length;j++){
                if(gllnArr[j].invoiceId!=null){
                // var viewAcc=gllnArr[j].find(d=>d.gllnArr[j].invoiceId===invoiceId);

                // console.log(viewAcc);
                this.viewAccounting1=gllnArr;
                }
            }}

            
            // this.viewAccounting1 = viewAcc;
            console.log(this.viewAccounting1);
            console.log(this.viewAccountingApRcpt);
          } else {
            if (res.code === 400) {
              alert(res.message);
            }
          }
        });
      }
      ArPaymentNavigation() {
        // alert('AR Receipt Form')
        var arraybaseNew = this.paymentForm.get('obj1') as FormArray;
        var arraybaseNew1 = arraybaseNew.getRawValue();
        console.log(arraybaseNew1);
        // if (this.PaymentReturnArr.length !=0){
       var invNumber= this.PaymentReturnArr[0].documentNo;
       var recAmt=this.PaymentReturnArr[0].payAmount;
       var methodId=this.selreeceiptmethod
      // }
      // else
        for (let i=0; i<arraybaseNew1.length;i++){
          // var invNumber = arraybaseNew1[i].docNo;
        var sourceType=arraybaseNew1[i].source;  
        // var methodId = arraybaseNew1[i].receiptMethodId;
        if (sourceType==='REFUND') {
          // alert(invNumber+'In If'+methodId);
       
          this.router.navigate(['/admin/transaction/PaymentAr'], { queryParams: { invNumber: invNumber,methodId:methodId,recAmt:recAmt } } );
        }
      }
      }

      paymentAdvice() {
        var arr = this.paymentForm.get('obj1').value;
        // var arraybaseNew1 = arr.getRawValue();
        // console.log(arraybaseNew1);
        // if (this.PaymentReturnArr.length !=0){
      //  var invNumber= this.PaymentReturnArr[0].documentNo;
        var docSeq =  this.PaymentReturnArr[0].documentNo;
        var ouId=arr[0].ouName;
        var docCat=arr[0].docCategoryCode;
        const fileName = 'download.pdf';
        const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
        this.transactionService.viewPaymentAdvice(docSeq,docCat,this.ouId)
          .subscribe(data => {
            var blob = new Blob([data], { type: 'application/pdf' });
            var url = URL.createObjectURL(blob);
            var printWindow = window.open(url, '', 'width=800,height=500');
            printWindow.open
          })
      }

    }
  


