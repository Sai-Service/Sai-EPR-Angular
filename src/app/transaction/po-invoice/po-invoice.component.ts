// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
 import * as moment from 'moment';
//import {moment} from 'moment';

 import { DateRangePickerComponent } from 'ngx-daterange';
 import { IDateRange, IDateRangePickerOptions } from 'ngx-daterange';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service'

interface IpoInvoice {
  suppNo : number;
  suppInvDate:Date;
  invoiceDate:Date;
  invoiceAmt:number;
  termsDate:Date;
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
    invoiceNum:string;
    invoiceAmt:number;
    invoiceDate:Date;
    suppInvDate:Date;
    termsDate:Date;
    termsId:number;
    glDate:Date;
    currency:string;
    segment1:string;
    displayinvoiceLine:Array<boolean>=[];
    hideArray: Array<boolean> = [];
    lstInvLineDeatails :any=[];
    // lines Details start


    lessThanValue:number;
    greaterThanValue:number;

lineNumber:number;
lineTypeLookupCode:string;

    ouId:number;
  
    submitted = false;
    public OUIdList: Array<string> = [];
    public TypeList: Array<string> =[];
    public lstsearchapinv:any;
    
    
    constructor (private fb: FormBuilder, private transactionService :TransactionService,private service :MasterService) {
       this.poInvoiceForm = fb.group({
        ouId:[''],
        suppNo:[''],
        suppId:[''],
        invoiceNum:[''],
        invoiceAmt:[''],
        invoiceDate:[''],
        // suppInvDate:[''],
        // termsDate:[''],
        // termsId:[''],
        // glDate:[''],
        // currency:[''],
        obj: this.fb.array([this.lineDetailsGroup()]),
        invLines:this.fb.array([this.invLineDetails()]),
    });
  }

  invLineDetails(){
    return this.fb.group({
      lineNumber:[],
      lineTypeLookupCode:[],
      segment1:[],
    })
  }

  invLineDetailsArray() : FormArray{
    return <FormArray>this.poInvoiceForm.get('invLines')
  }


  lineDetailsGroup(){
    return this.fb.group({
      ouId:[],
      poType:[],
      segment1:[],  
      suppInvNo:[],
      suppInvDate:[],
      suppNo:[],
      invoiceNum:[],
        invoiceAmt:[''],
        invoiceDate:[''],
        termsDate:[''],
        termsId:[''],
        glDate:[''],
        currency:[''],
    })
  }
  
   lineDetailsArray() : FormArray{
    return <FormArray>this.poInvoiceForm.get('obj')
  }


  // get lineDetailsArray() {
  //   return <FormArray>this.poInvoiceForm.get('poLines')
  // }


  get g() { return this.poInvoiceForm.controls; }
  
    ngOnInit(): void {
      // this.form = this.formBuilder.group({});
      this.service.OUIdList()
        .subscribe(
          data => {
            this.OUIdList = data;
            console.log(this.OUIdList);
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
    transData(val){
      return val;
    }
    apInvFind(content){
      // alert(content);
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
            window.location.reload();
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
      alert('control+ f'+e);

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

  selectINVLineDtl(i){
    // alert(i);
    // alert(invoiceNum);
    // var poControls=this.poInvoiceForm.get('obj').value;

    var invoiceNum=this.lineDetailsArray().controls[i].get('invoiceNum').value;
    alert(invoiceNum);
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
          this.poInvoiceForm.get('invLines').patchValue(data.invLines);
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
}