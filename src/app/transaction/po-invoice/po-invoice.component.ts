// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { DateRangePickerComponent } from 'ngx-daterange';
import { IDateRange, IDateRangePickerOptions } from 'ngx-daterange';
import { MasterService } from 'src/app/master/master.service';

interface IpoInvoice {

}

@Component({
  selector: 'app-po-invoice',
  templateUrl: './po-invoice.component.html',
  styleUrls: ['./po-invoice.component.css']
})
export class PoInvoiceComponent implements OnInit {

    poInvoiceForm: FormGroup;
    showModal: boolean;
    content: number;
    title: string;
  
    ouId:number;
  
    submitted = false;
    public OUIdList: Array<string> = [];
    public TypeList: Array<string> =[];
    
    // @ViewChild('dateRangePicker', { static: true })
    // dateRangePicker: DateRangePickerComponent;
  
    // firstFieldEmittedValue: IDateRange;
    // firstFieldOptions: IDateRangePickerOptions = {
    //   autoApply: false,
    //   format: 'MM/DD/YYYY',
    //   icons: 'material',
    //   minDate: moment().subtract(10, 'years'),
    //   maxDate: moment().add(3, 'years'),
    //   preDefinedRanges: [
    //     {
    //       name: 'Last Week',
    //       value: {
    //         start: moment().subtract(1, 'week').startOf('week'),
    //         end: moment().subtract(1, 'week').endOf('week')
    //       }
    //     },
    //     {
    //       name: 'Two Weeks Ago',
    //       value: {
    //         start: moment().subtract(2, 'week').startOf('week'),
    //         end: moment().subtract(2, 'week').endOf('week')
    //       }
    //     }
    //   ],
    //   validators: Validators.required,
    // }
  
    // secondFieldOptions: IDateRangePickerOptions = {
    //   autoApply: false,
    //   clickOutsideAllowed: false,
    //   format: 'MM/DD/YYYY',
    //   icons: 'font-awesome',
    //   minDate: moment().subtract(10, 'years'),
    //   maxDate: moment().add(1, 'year'),
    // }
  
    // rightFieldOptions: IDateRangePickerOptions = {
    //   format: 'MM/DD/YYYY',
    //   icons: 'material',
    //   minDate: moment().subtract(2, 'years'),
    //   maxDate: moment().add(1, 'year'),
    //   position: 'right',
    // }
  
    // singleFieldOptions: IDateRangePickerOptions = {
    //   autoApply: true,
    //   clickOutsideAllowed: false,
    //   format: 'MM/DD/YYYY',
    //   icons: 'material',
    //   labelText: 'Single Picker',
    //   minDate: moment().subtract(2, 'years'),
    //   maxDate: moment().add(1, 'year'),
    //   singleCalendar: true,
    // }
  
    // form: FormGroup = null;
  
    
    // @ViewChild('dateRangePicker', { static: true })
    // dateRangePicker: DateRangePickerComponent;
  
    // secondFieldOptions: IDateRangePickerOptions = {
    //   autoApply: false,
    //   clickOutsideAllowed: false,
    //   format: 'MM/DD/YYYY',
    //   icons: 'font-awesome',
    //   minDate: moment().subtract(10, 'years'),
    //   maxDate: moment().add(1, 'year'),
    // }
    
    // form: FormGroup = null;
  
    constructor (private fb: FormBuilder, private service :MasterService) {
       this.poInvoiceForm = fb.group({
        ouId:[''],
    });
  }
  
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
  
    fnCancatination(content){}
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
  }
  