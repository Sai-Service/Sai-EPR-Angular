// import { Component, OnInit } from '@angular/core';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
 import * as moment from 'moment';
//import {moment} from 'moment';

 import { DateRangePickerComponent } from 'ngx-daterange';
 import { IDateRange, IDateRangePickerOptions } from 'ngx-daterange';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { DatePipe } from '@angular/common';

interface IpoInvoice {
  suppInvDate:Date;
  invoiceDate:Date;
  termsDate:Date;
  title: string;
  suppNo:number;
  suppId:number;
  ouName:string;
  invoiceNum:string;
  invoiceAmt:number;
  termsId:number;
  glDate:Date;
  currency:string;
  segment1:string;
  name:string;
  siteName:string;
  taxAmt:number;
  paymentRateDate:Date;
  distributionSet:number;
  matchAction:string;
  terms:string;
  paymentMethod:string;
  payGroup:string;
  prepayType:string;
  settlementDate:Date;
  taxationCountry:string;
  remitToSuppName:string;
  remitToBankAccount:string;
  remitToBankAccountNo:string;
  debitMemoReason:string;
  remitToSuppSite:string;
  invoiceId:number;
  ouId:number;
  description:string;
  totalDistAmt:number;
  totalDistBaseAmt:number;
  distLineNumber:number;
  invTransferStatus:string;
lineNumber:number;
lineTypeLookupCode:string;
}

@Component({
  selector: 'app-po-invoice',
  templateUrl: './po-invoice.component.html',
  styleUrls: ['./po-invoice.component.css']
})
export class PoInvoiceComponent implements OnInit {
  // public start: Date = new Date ("10/07/2017"); 
  // public end: Date = new Date ("11/25/2017");

  @ViewChild('dateRangePicker', { static: true })
  dateRangePicker: DateRangePickerComponent;

  firstFieldEmittedValue: IDateRange;
  firstFieldOptions: IDateRangePickerOptions = {
    autoApply: false,
    format: 'MM/DD/YYYY',
    icons: 'material',
    minDate: moment().subtract(10, 'years'),
    maxDate: moment().add(3, 'years'),
    preDefinedRanges: [
      {
        name: 'Last Week',
        value: {
          start: moment().subtract(1, 'week').startOf('week'),
          end: moment().subtract(1, 'week').endOf('week')
        }
      },
      {
        name: 'Two Weeks Ago',
        value: {
          start: moment().subtract(2, 'week').startOf('week'),
          end: moment().subtract(2, 'week').endOf('week')
        }
      }
    ],
    validators: Validators.required,
  }

  secondFieldOptions: IDateRangePickerOptions = {
    autoApply: false,
    clickOutsideAllowed: false,
    format: 'MM/DD/YYYY',
    icons: 'font-awesome',
    minDate: moment().subtract(10, 'years'),
    maxDate: moment().add(1, 'year'),
  }

  rightFieldOptions: IDateRangePickerOptions = {
    format: 'MM/DD/YYYY',
    icons: 'material',
    minDate: moment().subtract(2, 'years'),
    maxDate: moment().add(1, 'year'),
    position: 'right',
  }

  singleFieldOptions: IDateRangePickerOptions = {
    autoApply: true,
    clickOutsideAllowed: false,
    format: 'MM/DD/YYYY',
    icons: 'material',
    labelText: 'Single Picker',
    minDate: moment().subtract(2, 'years'),
    maxDate: moment().add(1, 'year'),
    singleCalendar: true,
  }

  form: FormGroup = null;
    poInvoiceForm: FormGroup;
    showModal: boolean;
    content: number;
    title: string;
    suppNo:number;
    suppId:number;
    ouName:string;
    invoiceNum:string;
    invoiceAmt:number;
    // invoiceDate:Date;
    pipe = new DatePipe('en-US');
    now = Date.now();
    invoiceDate = this.pipe.transform(this.now, 'd-M-y h:mm:ss');
    suppInvDate:Date;
    termsDate:Date;
    termsId:number;
    glDate:Date;
    currency:'INR';
    segment1:string;
    name:string;
    siteName:string;
    taxAmt:number;
    paymentRateDate:Date;
    distributionSet:number;
    matchAction:string;
    terms:string;
    paymentMethod:string;
    payGroup:string;
    prepayType:string;
    settlementDate:Date;
    taxationCountry:string;
    remitToSuppName:string;
    remitToBankAccount:string;
    remitToBankAccountNo:string;
    debitMemoReason:string;
    remitToSuppSite:string;
    displayinvoiceLine:Array<boolean>=[];
    hideArray: Array<boolean> = [];
    lstInvLineDeatails :any=[];
    distLinesDeatails:any[];
    // lines Details start
  

    lessThanValue:number;
    greaterThanValue:number;

    invoiceId:number;
    ouId:number;
    description:string;
    totalDistAmt:number;
    totalDistBaseAmt:number;
    distLineNumber:number;
    invTransferStatus:string;

lineNumber:number;
lineTypeLookupCode:string;

    // ouId:number;
  
    submitted = false;
    public OUIdList: Array<string> = [];
    public TypeList: Array<string> =[];
    public lstsearchapinv:any;
    // nverValidedCnd:false;
    // ValidedCnd:true;
    public paymentMethodList: Array<string> = [];
    public prepayTypeList: Array<string> = [];
    public poTypeList: Array<string> = [];
    public suppIdList: any

    displayOUName=false;
    displaypoType=false;
    displaysegment1=false;
    displayname=false;
    displaysuppNo=false;
    displaysiteName=false;
    displaycurrency=false;

    userList1: any[] = [];
    userList2: any[] = [];
    lastkeydown1: number = 0;
    public supplierCodeList: any[];
    public supplierCodeList1: any[];
    siteIdList: any;
    
    constructor (private fb: FormBuilder, private transactionService :TransactionService,private service :MasterService,private router: Router) {
       this.poInvoiceForm = fb.group({
        ouId:[''],
        suppNo:[''],
        suppId:[''],
        invoiceNum:[''],
        invoiceAmt:[''],
        invoiceDate:[''],
        secondDateRange:[''],
        totalDistAmt:[],
        totalDistBaseAmt:[],
        poChargeAcCode:[],
        invTransferStatus:[],
        distLineNumber:[],
        description:[],
        // ouId:[],
        // ouName:[''],
        // suppInvDate:[''],
        // termsDate:[''],
        // termsId:[''],
        // glDate:[''],
        // currency:[''],
        obj: this.fb.array([this.lineDetailsGroup()]),
        invLines:this.fb.array([this.invLineDetails()]),
        distribution:this.fb.array([this.distLineDetails()]),
    });
  }

  distLineDetails(){
    return this.fb.group({
      distLineNumber:[],
      amount:[],
      accountingDate:[],
      baseAmount:[],
      poSegment:[],
      poChargeAc:[],
      poChargeDesc:[],
      poChargeCode:[],
      lineTypeLookupCode:[],
      description:[],
      invTransferStatus:[],
      poChargeAcCode:[],
      // totalDistAmt:[],
      // totalDistBaseAmt:[],
      // poChargeAcCode:[],
      // invTransferStatus:[],
    })
  }

  invLineDetails(){
    return this.fb.group({
      invoiceId:[],
      lineNumber:[],
      lineTypeLookupCode:[],
      segment1:[],
      amount:[],
      poNumber:[],
      poLineId:[],
      matchType:[],
      defaultDisAcc:[],
      receiptNumber:[],
      qtyInvoiced:[],
      baseAmount:[],
      itemName:[],
      description:[],
      glDate:[],
    })
  }

  invLineDetailsArray() : FormArray{
    return <FormArray>this.poInvoiceForm.get('invLines')
  }


  lineDetailsGroup(){
    return this.fb.group({
      ouId:[],
      ouName:[],
      poType:[],
      segment1:[],
      name:[],  
      suppInvNo:[],
      suppInvDate:[],
      suppNo:[],
      siteName:[],
      taxAmt:[],
      invoiceNum:[],
      invoiceAmt:[''],
      invoiceDate:[''],
      termsDate:[''],
      termsId:[''],
      glDate:[''],
      currency:[''],
      paymentRateDate:[],
      distributionSet:[],
      matchAction:[],
      terms:[],
      paymentMethod:[],
      payGroup:[],
      prepayType:[],
      settlementDate:[],
      taxationCountry:[],
      remitToSuppName:[],
      remitToBankAccount:[],
      remitToBankAccountNo:[],
      debitMemoReason:[],
      remitToSuppSite:[],
    })
  }
  
   lineDetailsArray() : FormArray{
    return <FormArray>this.poInvoiceForm.get('obj')
  }


  lineDistributionArray(): FormArray{
    return <FormArray>this.poInvoiceForm.get('distribution')
  }

  // get lineDetailsArray() {
  //   return <FormArray>this.poInvoiceForm.get('poLines')
  // }


  get g() { return this.poInvoiceForm.controls; }
  
    ngOnInit(): void {

      this.ouId = Number(sessionStorage.getItem('ouId'));

      // this.form = this.formBuilder.group({});
      this.service.OUIdList()
        .subscribe(
          data => {
            this.OUIdList = data;
            console.log(this.OUIdList);
          }
        );



        this.transactionService.paymentMethodList()
        .subscribe(
          data => {
            this.paymentMethodList = data;
            console.log(this.paymentMethodList);
          }
        );

        this.transactionService.prepayTypeList()
        .subscribe(
          data => {
            this.prepayTypeList = data;
            console.log(this.prepayTypeList);
          }
        );

        this.service.poTypeList()
        .subscribe(
          data => {
            this.poTypeList = data;
            console.log(this.poTypeList);
          }
        );
        

        this.service.supplierCodeList()
        .subscribe(
          data1 => {
            this.supplierCodeList = data1;
            console.log(this.supplierCodeList);
            data1 = this.supplierCodeList;
          }
        );
  //   var   segmentName1=  "COMPLETE [success:10, Error:0]"
  // var temp = segmentName1.split(',');
  //        var segment11 = temp[0];
  //      var segment2 = temp[1];
  //   var temp2 =segment11.split(':');
  //       var segment4 = temp2[1];
  //      alert(segment4)
  //       var temp3 =segment2.split(':');
  //       var segment6 = temp3[1];
  //       var temp4 =segment6.split(']');
  //       var segment7 = temp4[0];
  //       alert(segment7);
    }
  
    // onRangeSelected(value: IDateRange): void {
    //   this.firstFieldEmittedValue = value;
    // }
  
    // onReset(event: Event): void {
    //   this.dateRangePicker.reset(event);
    // }


    onOptionsSelectedsuppName (name: any){
      alert(name);
      this.service.supplierCodeList1()
      .subscribe(
        data => {
          this.supplierCodeList1 = data;
          console.log(this.supplierCodeList1);
          this.suppNo=name;
          console.log(this.supplierCodeList1);
         
        }
      );
      // var value = supp.substr(supp.indexOf('@') + 1, supp.length);
      let selectedValue = this.supplierCodeList.find(v => v.suppNo == name);
      this.currency='INR';
      // var patch = this.poInvoiceForm.get('obj').value;
      // patch.controls[0].patchValue({
      //   currency:'IRN'
      // })
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


    transData(val){
      return val;
    }
    apInvFind(content){
      this.lineDetailsArray().clear();
      this.displayOUName=true;
      this.displaypoType=true;
      this.displaysegment1=true;
      this.displayname=true;
      this.displaysuppNo=true;
      this.displaysiteName=true;
      this.displaycurrency=true;
      const formValue: IpoInvoice = this.transData(this.poInvoiceForm.value);
      this.transactionService.getsearchByApINV(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          this.lstsearchapinv=res.obj;
          this.lstsearchapinv.forEach(f => {
            var invLnGrp: FormGroup = this.lineDetailsGroup();
            this.lineDetailsArray().push(invLnGrp);
          });
          this.poInvoiceForm.get('obj').patchValue(this.lstsearchapinv);
        }
         else {
          if (res.code === 400) {
            alert('Data already present in the data base');
            // this.LocationMasterForm.reset();
            // window.location.reload();
          }
        }
      });
    }

   
    
    apInvFind1(content){
      // alert(content);
      const formValue: IpoInvoice = this.transData(this.poInvoiceForm.value);
      this.transactionService.getsearchByApINV(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          this.lstsearchapinv=res.obj;
          let control=this.poInvoiceForm.get('obj') as FormArray;
          for (let i=0;i<=this.lstsearchapinv.length-1;i++){
            var poLine : FormGroup=this.lineDetailsGroup();
            control.push(poLine);
            // this.poInvoiceForm.patchValue(this.lstsearchapinv);
          }
          this.poInvoiceForm.patchValue(this.lstsearchapinv);
        }
         else {
          if (res.code === 400) {
            alert('Data already present in the data base');
            // this.LocationMasterForm.reset();
            window.location.reload();
          }
        }
      });
    }
    @HostListener("window:keyup.control.f", ["$event"]) f(e: KeyboardEvent) {
      console.log("control+ f", e);
      // alert('control+ f'+e);

    }
    triggerKeyboardEvent(el: any, keyString: string) {
      var eventObj = document.createEvent("Events") as any;
  
      if (eventObj.initEvent) {
        eventObj.initEvent("keyup", true, true);
      }
  
      eventObj.shiftKey = true;
      eventObj.ctrlKey = false;
      eventObj.metaKey = false;
      eventObj.altKey = false;
      eventObj.key = keyString;
  
      el.dispatchEvent
        ? el.dispatchEvent(eventObj)
        : el.fireEvent("onkeyup", eventObj);
    }
  
    openCodeComb(i) {
    this.showModal = true; // Show-Hide Modal Check
    this.content = i; // Dynamic Data
    let a =i+1
    this.title = "PoLine :" + a;    // Dynamic Data
  }
  poInvoice(poInvoiceForm){
  
  }
 
  invoiceDetails(i){
    var displayinvoiceLine: Boolean = this.hideArray[i];
    this.hideArray[i] = !displayinvoiceLine;
  }

  // public today = new Date();
  // public priorDate = new Date().setDate(this.today.getDate() - 30)
  // selected: {startDate: Moment, endDate: Moment};

  selectDisLineDtl(k){
    // alert('k'+k)
    var lineNumber=this.invLineDetailsArray().controls[k].get('lineNumber').value;
    var invoiceId=this.invLineDetailsArray().controls[k].get('invoiceId').value;
    this.lineDistributionArray().clear();  
    alert(lineNumber+' '+invoiceId);
    this.invoiceId=this.lstInvLineDeatails.invoiceId;
    alert(this.invoiceId);
    this.transactionService.distLinesDeatailsfa(this.invoiceId,lineNumber)
    .subscribe(
      data => {
        this.distLinesDeatails = data.distribution;
        console.log(this.distLinesDeatails);
        data.distribution.forEach(f => {
          var distLineDet: FormGroup = this.distLineDetails();
          this.lineDistributionArray().push(distLineDet);  
      });
      this.poInvoiceForm.get('distribution').patchValue(this.distLinesDeatails);
      }
    );

  }


  selectINVLineDtl(i){
    this.invLineDetailsArray().clear();
    var invoiceNum=this.lineDetailsArray().controls[i].get('invoiceNum').value;
    // alert(invoiceNum);
    this.transactionService.getApInvLineDetails(invoiceNum)
    .subscribe(
      data => {
        this.lstInvLineDeatails = data;
        console.log(this.lstInvLineDeatails);
        // if (res.code === 200) {
          // this.lstsearchapinv=res.obj;
          data.invLines.forEach(f => {
            var invLnGrp: FormGroup = this.invLineDetails();
            this.invLineDetailsArray().push(invLnGrp);
          // });
          // this.poInvoiceForm.get('invLines').patchValue(data);
          this.poInvoiceForm.get('invLines').patchValue(data.invLines);
         
          // this.poInvoiceForm.get('invLines').get('invoiceId').patchValue(data.invoiceId);
          // var length1=this.lstInvLineDeatails.invLines.length-1;
        }
        
        //  else {
        //   if (res.code === 400) {
        //     alert('Data already present in the data base');
        //     // this.LocationMasterForm.reset();
        //     window.location.reload();
          // }
        // }
      // }
    );
  }


    )}


   

    public onChange1(event) {
      this.greaterThanValue = event.target.value;
    }
  
    public onChange(event) {
      this.lessThanValue=event.target.value;
      // alert('$event ' +event.target.value);
      // var aa = this.poInvoiceForm.get('greaterThanValue').value;
      // alert(aa+'aa');
      if (this.greaterThanValue > this.lessThanValue) {
        alert('Plese enter correct value')
        this.poInvoiceForm.get('greaterThanValue').reset();
      }
      // if (this.greaterThanValue > this.lessThanValue) {
      //   // console.log('Incorrect');
      //   this.greaterThanValue = this.lessThanValue - 1;
      // }
    }


    apInvoiceSave(){
      // const formValue: IpoInvoice = this.transData(this.poInvoiceForm.value);
      
      console.log(this.poInvoiceForm.value.obj[0]);
      var reqArr: any[];
      // reqArr = formValue;
      console.log(reqArr);
      
//     reqArr.push({
//       supplierSiteId: 
//       frmDate: formValue.frmDate,
//        toDate: formValue.frmDate,
//       // toDate:'2021-02-05',
//        billToLocId:this.locId
// });
      this.transactionService.apInvSaveSubmit(this.poInvoiceForm.value).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
        } else {
          if (res.code === 400) {
            alert('Data already present in the data base');
          }
        }
      });
    }

    close(){
      // this.router.navigate(['login']);
      this.router.navigate(['admin']);
    }

    refresh()
      {
        window.location.reload();
      }

move(val1,val2){
  val2.focus();
}


onOptionsSelected(event: any,k) {
  // alert(event);
  var patch=this.poInvoiceForm.get('distribution') as FormArray;
  if (event === 'Validated') {
    // alert('Validated');
    patch.controls[k].patchValue({
      poChargeDesc:'Processed',
    })
  }
   if (event === 'Never Validated' || event === 'Etc') {
    // alert('Never Validated');
    patch.controls[k].patchValue({
      poChargeDesc:'Unprocessed',
    })
  }
  if (event === '--Select--') {
    // alert('--Select--');
    patch.controls[k].patchValue({
      poChargeDesc:'',
    })
  }
}


getUserIdsFirstWay($event) {
  let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
  this.userList1 = [];

  if (userId.length > 2) {
    if ($event.timeStamp - this.lastkeydown1 > 200) {
      this.userList1 = this.searchFromArray(this.supplierCodeList, userId);
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


onSiteSelected(siteId: any) {
  // alert(siteId);
  this.service.siteIdList(siteId)
    .subscribe(
      data => {
        this.siteIdList = data;
        console.log(this.siteIdList);
        // this.taxCat = this.siteIdList.taxCategoryName
        // alert(this.taxCat);
        // if (this.taxCat == null) {
        //   alert("Tax not attached to site")
        //   // this.displayNewButton = false;
        //   const sitWithOutTax = 'y';
        // }
      }
    );
}

}