import { Component, OnInit, HostListener, ViewChild, ElementRef, NgModule, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormControlName, NgForm, Validators, FormArray, FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { data } from 'jquery';
import { SalesOrderobj } from 'src/app/order-management/sales-order-form/sales-orderobj'
import { DatePipe, Location } from '@angular/common';
import { escapeRegExp } from '@angular/compiler/src/util';
import { saveAs } from 'file-saver';
import { SelectorMatcher } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { v4 as uuidv4 } from 'uuid';
import { enableDebugTools } from '@angular/platform-browser';
import { ReturnToVendorComponent } from 'src/app/transaction/return-to-vendor/return-to-vendor.component';


const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};


interface ISalesBookingForm {
  state: string;
  emailId: string;
  emailId1: string;
  birthDate: Date;
  weddingDate: Date;
  gstNo: string;
  panNo: string;
  custAccountNo: number;
  creditAmt: number;
  name: string;
  customerSiteId: number;
  taxCategoryName: string;
  custName: string;
  mobile1: number;
  custAddress: string;
  walkCustName: string;
  walkCustPan: string;
  walkCustaddres: string;
  cntrOrdCustName: string;
  refCustNo: string;
  custPoNumber: string;
  custPoDate: Date;
  transactionTypeName: string;
  issueCodeType: string;
  priceListName: string;
  priceListId: number;
  orderedDate: Date;
  flowStatusCode: string;
  issuedBy: string;
  dept: number;
  loginArray: string;
  ouName: string;
  ticketNo: string;
  divisionId: number;
  emplId: number;
  ouId: number;
  deptId: number;
  locId: number;
  locationId: number;
  deptName: string;
  invType: string;
  locCode: string;
  subtotal:number;
  discAmt:number;
  totTax:number;
  totAmt:number;
}

@Component({
  selector: 'app-counter-sale-performa-inv',
  templateUrl: './counter-sale-performa-inv.component.html',
  styleUrls: ['./counter-sale-performa-inv.component.css']
})
export class CounterSalePerformaInvComponent implements OnInit {
  CounterSaleOrderBookingForm: FormGroup;
  orderNumber: number;
  emailId: string;
  emailId1: string;
  birthDate: Date;
  weddingDate: Date;
  gstNo: string;
  panNo: string;
  custAccountNo: number;
  creditAmt: number;
  name: string;
  customerSiteId: number;
  taxCategoryName: string;
  custName: string;
  mobile1: number;
  custAddress: string;
  walkCustName: string;
  walkCustPan: string;
  walkCustaddres: string;
  cntrOrdCustName: string;
  refCustNo: string;
  custPoNumber: string;
  custPoDate: Date;
  state: string;
  transactionTypeName: string;
  issueCodeType: string;
  issueCode: string;
  issueCodeType1: string;
  priceListName: string;
  priceListId: number;
  orderedDate: Date;
  flowStatusCode: string;
  issuedBy: string;
  dept: number;
  loginArray: string;
  ouName: string;
  ticketNo: string;
  divisionId: number;
  emplId: number;
  ouId: number;
  deptId: number;
  locId: number;
  locationId: number;
  deptName: string;
  invType: string;
  locCode: string;
  subtotal:number;
  discAmt:number;
  totTax:number;
  totAmt:number;

  selCustomer: any;
  custSiteList: any = [];
  displaytcsYN = true;
  displaytcsBuuton = false;
  public payTermDescList: any = [];
  displaywalkingCustomer = true;
  displaydisPer = true;
  isDisabled3 = false;
  customerNameSearch: any = [];
  display = 'none';
  exicutiveNameByCustNameList: any = [];
  displayDMSCDMS: boolean;
  showApplyDiscount = true;
  accountNoSearchdata: any[];
  submitted = false;
  displayCustomerSite = true;
  createOrderTypeList: any[];
  public orderTypeList: any;
  public issueCodeTypeList: any[];
  public priceListNameList: any;

  constructor(private fb: FormBuilder, private location1: Location, private router1: ActivatedRoute, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService,) {
    this.CounterSaleOrderBookingForm = fb.group({
      orderNumber: [],
      emailId: [],
      emailId1: [],
      birthDate: [],
      weddingDate: [],
      gstNo: [],
      panNo: [],
      custAccountNo: ['',[Validators.required]],
      creditAmt: [],
      name: [],
      customerSiteId: [],
      taxCategoryName: [],
      custName: [],
      mobile1: [],
      custAddress: [],
      walkCustName: [],
      walkCustPan: [],
      walkCustaddres: [],
      cntrOrdCustName: [],
      refCustNo: [],
      custPoNumber: [],
      custPoDate: [],
      state: [],
      transactionTypeName: [],
      issueCodeType: [],
      issueCode: [],
      issueCodeType1: [],
      priceListName: [],
      priceListId: [],
      orderedDate: [],
      flowStatusCode: [],
      issuedBy: [],
      dept: [],
      loginArray: [],
      ouName: [],
      ticketNo: [],
      divisionId: [],
      emplId: [],
      ouId: [],
      deptId: [],
      locId: [],
      locationId: [],
      deptName: [],
      invType: [],
      subtotal:[],
  discAmt:[],
  totTax:[],
  totAmt:[],
      oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
    })
  }


  orderlineDetailsGroup() {
    return this.fb.group({

    })
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    if (Number(sessionStorage.getItem('divisionId')) === 1) {
      this.displayDMSCDMS = true;
      this.showApplyDiscount = false;
    }
    else if (Number(sessionStorage.getItem('divisionId')) === 2) {
      this.displayDMSCDMS = false;
      this.showApplyDiscount = true;
      this.CounterSaleOrderBookingForm.patchValue({ issueCodeType1: 'Regular Sales' });
      this.CounterSaleOrderBookingForm.patchValue({ issueCode: 'CM03' });
      var concatissuetypecode = this.CounterSaleOrderBookingForm.get('issueCode').value + '-' + this.CounterSaleOrderBookingForm.get('issueCodeType1').value
      this.CounterSaleOrderBookingForm.patchValue({ issueCodeType: concatissuetypecode });
    }


    this.dept = Number(sessionStorage.getItem('deptId'));
    this.loginArray = sessionStorage.getItem('divisionName');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.locCode = (sessionStorage.getItem('locCode'));
    this.ticketNo = (sessionStorage.getItem('ticketNo'));
    this.issuedBy = (sessionStorage.getItem('ticketNo'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'))
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.deptId = Number(sessionStorage.getItem('deptId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.locationId = Number(sessionStorage.getItem('locId'));
    this.deptName = (sessionStorage.getItem('deptName'));
    this.invType = 'SS_SPARES';

    this.service.payTermDescList()
      .subscribe(
        data => {
          this.payTermDescList = data;
          console.log(this.payTermDescList);
        }
      );


    this.service.createOrderTypeListFn()
      .subscribe(
        data1 => {
          this.createOrderTypeList = data1;
          console.log(this.createOrderTypeList);
        }
      );


    this.orderManagementService.orderTypeList((sessionStorage.getItem('deptId')), sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.orderTypeList = data;
          console.log(this.orderTypeList);
        }
      );

    this.service.issueCodeFunction(sessionStorage.getItem('divisionId'))
      .subscribe(
        data1 => {
          this.issueCodeTypeList = data1;
        }
      );

    this.orderManagementService.priceListNameList1(sessionStorage.getItem('ouId'), (sessionStorage.getItem('divisionId')))
      .subscribe(
        data => {
          this.priceListNameList = data;
          console.log(this.priceListNameList);
          this.CounterSaleOrderBookingForm.patchValue({ priceListName: data[0].priceListName })
          this.CounterSaleOrderBookingForm.patchValue({ priceListId: data[0].priceListHeaderId })
        }
      );
  }

  CounterSaleOrderBooking(CounterSaleOrderBookingForm: any) {
  }

  get f() { return this.CounterSaleOrderBookingForm.controls }

  OrderFind(orderNumber) { }

  accountNoSearch(custAccountNo) {
    // alert(custAccountNo);
    this.service.searchCustomerByAccount(custAccountNo)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.selCustomer = data.obj;
            this.custSiteList = data.obj.customerSiteMasterList;
            if (data.obj.tcsYN === 'Y') {
              this.CounterSaleOrderBookingForm.patchValue(data.obj);
              this.displaytcsYN = false;
              this.displaytcsBuuton = false;
              // this.isDisabled = true;
            }
            this.CounterSaleOrderBookingForm.patchValue({ tcsYN: data.obj.tcsYN });
            this.CounterSaleOrderBookingForm.patchValue({ custName: data.obj.custName });
            this.CounterSaleOrderBookingForm.patchValue({ customerId: data.obj.customerId });

            this.CounterSaleOrderBookingForm.patchValue({ tcsPer: data.obj.tcsPer });
            this.CounterSaleOrderBookingForm.patchValue({ custAccountNo: custAccountNo });
            let select = this.payTermDescList.find(d => d.lookupValueId === this.selCustomer.termId);
            // this.paymentType = select.lookupValue;
            this.CounterSaleOrderBookingForm.patchValue({ paymentType: select.lookupValue })
            this.CounterSaleOrderBookingForm.get('custName').disable();
            this.CounterSaleOrderBookingForm.get('mobile1').disable();
            // alert(this.custSiteList.length)
            for (let i = 0; i < this.custSiteList.length; i++) {
              if (this.custSiteList.length === 1) {
                // alert(this.custSiteList.length)
                this.CounterSaleOrderBookingForm.patchValue({ name: this.custSiteList[0].siteName });
                this.onOptionsSelectedcustSiteName(this.custSiteList[0].siteName);
              }
              else if (this.custSiteList.length > 1) {
                // alert('hi')
                this.CounterSaleOrderBookingForm.patchValue({ name: this.custSiteList[0].siteName });
                this.onOptionsSelectedcustSiteName(this.custSiteList[0].siteName);
              }
            }
            var custName = data.obj.custName;
            if (custName.includes(('CSCash Customer')) && Number(sessionStorage.getItem('divisionId')) === 2) {
              this.displaywalkingCustomer = false;
              this.CounterSaleOrderBookingForm.patchValue({ discType: 'Header Level Discount' });
              this.displaydisPer = false;
            }
            else {
              this.CounterSaleOrderBookingForm.get('disPer').disable();
            }
            if (data.obj.tcsYM === 'Y') {
              this.displaytcsYN = false;
              this.displaytcsBuuton = true;
            }
            this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
            this.isDisabled3 = true;
            this.customerNameSearch.splice(0, this.customerNameSearch.length);
            console.log(this.customerNameSearch);
          }
          else {
            if (data.code === 400) {
              // alert('Error :' + data.message);
              this.display = 'block';
              // this.displaycreateCustomer = false;
            }
          }
        });

    this.service.exicutiveNameByCustName(custAccountNo, sessionStorage.getItem('locId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.exicutiveNameByCustNameList = data.obj;
            var salesExicustive = data.obj.ticketNo + '--' + data.obj.fullName;
            this.CounterSaleOrderBookingForm.patchValue({ salesRepId: data.obj.emplId });
            this.CounterSaleOrderBookingForm.patchValue({ salesRepName: salesExicustive })
          }
        })
  }



  onOptionsSelectedcustSiteName(siteName) {
    // alert(siteName);
    //  alert(sessionStorage.getItem('ouId'));
    let selSite = this.custSiteList.find(d => d.siteName === siteName);
    console.log(selSite);
    console.log(this.custSiteList);

    // alert(selSite.ouId);

    if (selSite.ouId != (sessionStorage.getItem('ouId'))) {
      alert('First Create OU wise Site to continue process!')
    }
    else {
      // alert(this.selCustomer)
      console.log(this.selCustomer);

      // alert(this.selCustomer.customerId)
      this.CounterSaleOrderBookingForm.patchValue(selSite);
      // this.custName = this.custSiteList.custName;
      // this.customerId = selSite.customerId;
      this.custAddress = (selSite.address1 + ', '
        + selSite.address2 + ', '
        + selSite.address3 + ', '
        + selSite.address4 + ', '
        + selSite.city + ', '
        + selSite.pinCd + ', '
        + this.selCustomer.state);
      this.birthDate = this.selCustomer.birthDate;
      this.weddingDate = this.selCustomer.weddingDate;
      this.taxCategoryName = this.selCustomer.taxCategoryName;
      this.CounterSaleOrderBookingForm.patchValue({ creditAmt: selSite.creditAmt });
      if (selSite.disPer != null) {
        // alert(selSite.disPer)
        this.CounterSaleOrderBookingForm.patchValue({ discType: 'Header Level Discount' })
        this.CounterSaleOrderBookingForm.patchValue({ disPer: selSite.disPer })
        this.orderlineDetailsGroup().patchValue({ disPer: selSite.disPer })
        this.displaydisPer = false;
        var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
        // alert(patch.length)
        for (let i = 0; i < patch.length; i++) {
          (patch.controls[i]).patchValue({
            disPer: selSite.disPer,
          });
        }
      }
    }
    if (Number(sessionStorage.getItem('divisionId')) === 2) {
      // alert(this.selCustomer.customerId+'----'+selSite.customerSiteId)
      // this.service.crediteLimitFn(this.selCustomer.customerId, selSite.customerSiteId)
      this.service.crediteLimitFn(this.selCustomer.customerId, sessionStorage.getItem('locId'), selSite.customerSiteId)
        .subscribe(
          data => {
            if (data.code === 200) {
              // alert(data.obj);
              var credAmt = this.CounterSaleOrderBookingForm.get('creditAmt').value;
              // var newCrAmt = Number(credAmt) - Number(data.obj.outStandingAmt);
              var newCrmAmt1 = Math.round(((data.obj.outStandingAmt) + Number.EPSILON) * 100) / 100;
              this.CounterSaleOrderBookingForm.patchValue({ creditAmt: newCrmAmt1 });
              this.CounterSaleOrderBookingForm.patchValue({ creditDays: data.obj.creditDays });
              this.CounterSaleOrderBookingForm.patchValue({ daysMsg: data.obj.daysMsg });
            }
          })
    }

  }


  custNameSearch(custName) {
    // alert(custName)
    this.orderManagementService.custNameSearchFn1(custName, sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.customerNameSearch = data.obj;
          }
          else {
            if (data.code === 400) {
              alert(data.message);
              this.display = 'block';
            }
          }
        }
      );
  }




  searchByContact(contactNo) {
    this.service.searchCustomerByContact(contactNo)
      .subscribe(
        data => {
          this.accountNoSearchdata = data.obj;
          this.CounterSaleOrderBookingForm.patchValue({ custAccountNo: data.obj.custAccountNo })

        });
  }


  panCardWalding(event: any) {
    this.orderManagementService.searchByPanNumber(this.CounterSaleOrderBookingForm.get('walkCustPan').value)
      .subscribe(
        data => {
          if (data.code === 200) {
            if (data.obj.length >= 0) {
              alert(data.message + ' ' + 'Customer Account Number' + ' ' + data.obj.accountNo)
              this.CounterSaleOrderBookingForm.get('walkCustPan').reset();
            }
            else if (data.obj.length < 0) {

            }
          }
        })
  }

  walkcustomermerge(event: any) {
    var contactName = this.CounterSaleOrderBookingForm.get('walkCustName').value + '#' + this.CounterSaleOrderBookingForm.get('walkCustPan').value + '#' + this.CounterSaleOrderBookingForm.get('walkCustaddres').value
    this.CounterSaleOrderBookingForm.patchValue({ cntrOrdCustName: contactName })
  }


  onOptionsSelectedissueTypeCode(event: any) {
    let selectIssueCode = this.issueCodeTypeList.find(d => d.codeDesc === event);
    this.CounterSaleOrderBookingForm.patchValue({ issueCode: selectIssueCode.code })
    var concatissuetypecode = this.CounterSaleOrderBookingForm.get('issueCode').value + '-' + this.CounterSaleOrderBookingForm.get('issueCodeType1').value
    this.CounterSaleOrderBookingForm.patchValue({ issueCodeType: concatissuetypecode });
  }

}
