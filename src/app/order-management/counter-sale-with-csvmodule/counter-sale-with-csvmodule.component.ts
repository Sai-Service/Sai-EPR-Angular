import { Component, OnInit, HostListener, ViewChild, ElementRef ,NgModule} from '@angular/core';
import { FormGroup, FormControl, FormBuilder,NgForm,Validators, FormArray,FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { ActivatedRoute, ParamMap ,Router} from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { data } from 'jquery';
import { SalesOrderobj } from 'src/app/order-management/sales-order-form/sales-orderobj'
import { DatePipe,Location } from '@angular/common';
import { escapeRegExp } from '@angular/compiler/src/util';
import { saveAs } from 'file-saver';

interface ISalesBookingForm {
  emplId: number;
  issueCodeType: string;
  headerId: number;
  divisionId: number;
  transactionTypeId: number;
  customerSiteId: number;
  ouId: number;
  orderTypeId: string;
  transactionTypeName: string;
  createOrderType: string;
  custPoNumber: number;
  // orderedDate: Date;
  frmLocatorId: number;
  priceListId: number;
  priceListName: string;
  paymentTermId: number;
  payTermDesc: string;
  locationId: number;
  billToLocId: number;
  shipToLocId: number;
  billLocName: string;
  shipLocName: string;
  locCode: string;
  customerId: number,
  custType: string;
  custAccountNo: number;
  custName: string;
  custAddress: string;
  salesRepName: string;
  flowStatusCode: string;
  tlName: string;
  remarks: string;
  subtotal: number;
  totTax: number;
  refCustNo: string;
  totAmt: number;
  othRefNo: number;
  orderNumber: number;
  itemId: number;
  taxCategoryId: number;
  mobile1: number;
  paymentType: string;
  issuedBy: string;
}

@Component({
  selector: 'app-counter-sale-with-csvmodule',
  templateUrl: './counter-sale-with-csvmodule.component.html',
  styleUrls: ['./counter-sale-with-csvmodule.component.css']
})
export class CounterSaleWithCSVModuleComponent implements OnInit {
  CounterSaleOrderBookingForm: FormGroup;
  orderNumber:number;

  constructor(private fb: FormBuilder, private location1: Location, private router1: ActivatedRoute, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.CounterSaleOrderBookingForm = fb.group({
      orderNumber:[''],
    })
   }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
  }

  CounterSaleOrderBooking(CounterSaleOrderBookingForm: any) {
  }

  OrderFind(orderNumber){}
}
