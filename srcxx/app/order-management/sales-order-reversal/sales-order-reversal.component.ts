import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { TransactionService } from '../../transaction/transaction.service';
import { OrderManagementService } from '../order-management.service';
import { Location, DatePipe } from "@angular/common";
import { data } from 'jquery';
import { relativeTimeRounding } from 'moment';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

@Component({
  selector: 'app-sales-order-reversal',
  templateUrl: './sales-order-reversal.component.html',
  styleUrls: ['./sales-order-reversal.component.css']
})
export class SalesOrderReversalComponent implements OnInit {
  SalesOrderReversalForm: FormGroup;
  panNo: string = ''; // initialized
  gstNo: string = '';
  state: string = '';
  emailId: string = '';
  emailId1: string = '';
  birthDate: string = '';
  weddingDate: string = '';
  perAdd: string = '';
  accountNo: string = '';
  billToAddress: string = '';
  shipToAddress: string = '';
  mobile1: string = '';
  custName: string = '';
  custTaxCat: string = '';
  name: string = '';
  orderNumber!: number;

  isDisabledOrderFind = false;
  viewAllInvoiceData: any = [];
  isDisabled11 = false;
  isVisible2: boolean = false;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  constructor(private fb: FormBuilder, private router1: ActivatedRoute, private location: Location, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.SalesOrderReversalForm = fb.group({
      panNo: [],
      gstNo: [],
      state: [],
      emailId: [],
      emailId1: [],
      birthDate: [],
      weddingDate: [],
      perAdd: [],
      accountNo: [],
      billToAddress: [],
      shipToAddress: [],
      mobile1: [],
      custName: [],
      custTaxCat: [],
      name: [],
      orderNumber: [],
    })

  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
  }

  SalesOrderReversal(SalesOrderReversalForm: any) { }
  OrderFind(orderNumber: any) {
  this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Order Serach is progress....Do not refresh the Page';
    this.isDisabled11 = true;
    this.orderManagementService.getsearchByOrderNo1(orderNumber, Number(sessionStorage.getItem('locId')))
      .subscribe(
        data => {
          if (data != null) {
            this.dataDisplay = ' ';
            this.closeResetButton = true;
            this.isDisabled11 = false;
            this.isVisible2 = true;
            var colorCode = data.obj.color;
            this.SalesOrderReversalForm.patchValue({
              billToAddress: data.obj.custAddress,
              shipToAddress: data.obj.custAddress,
              accountNo: data.obj.accountNo,
              priceListHeaderId: data.obj.priceListId, custTaxCat: data.obj.taxCategoryName, fuelType: data.obj.fuelType,
              name: data.obj.billLocName, custName: data.obj.custName, mobile1: data.obj.mobile1
            });
            this.panNo = data.obj.custPan;
            this.gstNo = data.obj.custGst;
            this.orderManagementService.viewAllInvoice(orderNumber)
              .subscribe(
                data1 => {
                  this.viewAllInvoiceData = data1;
                }
              );
          }
        });

  }


  refresh() {
    window.location.reload();
  }

  close() {
    this.router.navigate(['admin']);
  }

  reversalSalesOrder() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Order Line Save is progress....Do not refresh the Page';
    this.isDisabled11 = true;
    var orderNumber = this.SalesOrderReversalForm.get('orderNumber')?.value;
    this.orderManagementService.reversalSalesOrderFn(orderNumber, sessionStorage.getItem('emplId')).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message + ' ' + 'Credit Memo Generated Successefully.!');
        this.isDisabled11 = true;
        this.closeResetButton = false;
        this.progress = 0;
        this.dataDisplay = 'Credit Memo Generated Successefully.!';
      }
      else{
        // alert(res.message);
        // alert(res.obj[*].trxNumber);
        let trxNumbers = '';
        res.obj.forEach((item:any )=> {
        trxNumbers += item.trxNumber + '\n';
        });
        alert(res.message+'\n'+trxNumbers);
        this.closeResetButton = false;
        this.progress = 0;
        this.dataDisplay = res.message+'\n'+trxNumbers;
      }
    })

  }
}
