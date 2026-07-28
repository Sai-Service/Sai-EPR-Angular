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



interface ItdsInvoice {}

@Component({
  selector: 'app-tds-invoice',
  templateUrl: './tds-invoice.component.html',
  styleUrls: ['./tds-invoice.component.css']
})
export class TdsInvoiceComponent implements OnInit {
  form: FormGroup = null;
  tdsInvoiceForm: FormGroup;
  constructor(private fb: FormBuilder, private transactionService: TransactionService, private service: MasterService, private router: Router) {
    this.tdsInvoiceForm = fb.group({})
   }


   get g() { return this.tdsInvoiceForm.controls; }

   tdsInvoice(tdsInvoiceForm) {

  }

  ngOnInit(): void {
  }

}
