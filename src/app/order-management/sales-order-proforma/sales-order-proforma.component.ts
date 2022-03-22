import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MasterService } from 'src/app/master/master.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { DatePipe, Location } from '@angular/common';
import { saveAs } from 'file-saver';



const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};


@Component({
  selector: 'app-sales-order-proforma',
  templateUrl: './sales-order-proforma.component.html',
  styleUrls: ['./sales-order-proforma.component.css']
})
export class SalesOrderProformaComponent implements OnInit {
  CounterSaleOrderBookingForm: FormGroup;
  itemSeg: string = "";
  orderNumber: number;
  emailId: string;
  classCodeType: string;
  public salesRepNameList: any;
  allDatastore: any;
  custtaxCategoryName: string;
  emailId1: string;
  locationId: number;
  birthDate: Date;
  subInventoryId: number;
  weddingDate: Date;
  gstNo: string;
  panNo: string;
  custAccountNo: number;
  creditAmt: number;
  name: string;
  msRefNo: string;
  msRefCustNo: string;
  customerSiteId: number;
  taxCategoryName: string;
  custName: string;
  custClassCode: string;
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
  customerId: number;
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
  deptName: string;
  invType: string;
  locCode: string;
  subtotal: number;
  discAmt: number;
  totTax: number;
  totAmt: number;
  discType: string;
  disPer: number;
  pipe = new DatePipe('en-US');
  now = new Date();
  itemId: number;
  segment: string;
  Avalqty: number;
  pricingQty: number;
  orderedItem: string;
  unitSellingPrice: number;
  baseAmt: number;
  disAmt: number;
  taxAmt: number;
  hsnSacCode: string;
  taxPer: number;
  sgst: number;
  cgst: number;
  igst: number;
  mrp: number;
  creditDays: string;
  daysMsg: string;

  // orderedDate = this.pipe.transform(this.now, 'dd-MM-yyyy');
  // custPoDate = this.pipe.transform(this.now, 'dd-MM-yyyy');

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
  lstgetOrderLineDetails: any[];
  public priceListNameList: any;
  displayCSOrderAndLineDt = true;
  displaysegmentHeader = true;
  displaysegmentInvType: Array<boolean> = [];
  categoryList: any[];
  public itemMap = new Map<string, any[]>();
  public itemMap2 = new Map<number, any[]>();
  invItemList1: any[];
  displayorderHedaerDetails = true;
  displayaddRemoveBtn = true;
  public addonDescList: any[];
  displayaddRow = true;
  displayRemoveRow: Array<boolean> = [];
  public op: string;
  displayCounterSaleLine: Array<boolean> = [];
  displayLineflowStatusCode: Array<boolean> = [];
  isDisabled = false;
  isDisabled1 = true;
  isDisabled4 = true;
  public taxCalforItem: any;
  public mainModelList: Array<string>[];
  public VariantSearch: Array<string>[];
  public ColourSearch: any;

  displayVehicleDetails = true;

  @ViewChild('aForm') aForm: ElementRef;
  getfrmSubLoc: any;
  locData: any = [];
  resrveqty: any;
  onhand1: any;
  public subInvCode: any;
  onHandQty: number;
  id: number;
  resveQty: number;
  frmLocatorId: number;
  model: string;
  fuelType: string;
  variant: string;
  color: string;
  basicValue: number;

  constructor(private fb: FormBuilder, private location1: Location, private service: MasterService, private orderManagementService: OrderManagementService) {
    this.CounterSaleOrderBookingForm = fb.group({
      orderNumber: [],
      emailId: [],
      classCodeType: [],
      emailId1: [],
      custtaxCategoryName: [],
      birthDate: [],
      weddingDate: [],
      customerId: [],
      gstNo: [],
      panNo: [],
      custAccountNo: ['', [Validators.required]],
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
      subtotal: [],
      discAmt: [],
      totTax: [],
      totAmt: [],
      discType: [],
      disPer: [],
      creditDays: [],
      daysMsg: [],
      msRefNo: [],
      msRefCustNo: [],
      model: [],
      fuelType: [],
      variant: [],
      color: [],
      basicValue: [],
      oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
    })
  }

  orderlineDetailsArray(): FormArray {
    return <FormArray>this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList')
  }

  orderlineDetailsGroup() {
    return this.fb.group({
      displaysegment: false,
      lineNumber: [''],
      invType: [''],
      isTaxable: [''],
      taxCategoryId: [''],
      itemSeg: [''],
      segment: ['', [Validators.required]],
      itemId: [''],
      orderedItem: [''],
      hsnSacCode: [''],
      Avalqty: [''],
      pricingQty: [''],
      unitSellingPrice: [''],
      baseAmt: [''],
      disPer: [''],
      disAmt: [0],
      taxPer: [''],
      sgst: [0],
      cgst: [0],
      igst: [''],
      taxAmt: [0],
      totAmt: [0],
      mrp: [''],
      flowStatusCode: [''],
      uom: [''],
      onHandQty: [''],
      id: [''],
      resveQty: [''],
      frmLocatorId: ['']
    })
  }

  CounterSaleOrderBooking(CounterSaleOrderBookingForm: any) {
  }

  get f() { return this.CounterSaleOrderBookingForm.controls }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.isDisabled4 = false;
    if (Number(sessionStorage.getItem('divisionId')) === 1) {
      this.displayDMSCDMS = true;
      this.showApplyDiscount = false;
    }
    this.transactionTypeName = 'Proforma Invoice';
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
    // this.locationId = Number(sessionStorage.getItem('locId'));
    this.deptName = (sessionStorage.getItem('deptName'));
    this.orderlineDetailsArray().controls[0].patchValue({ flowStatusCode: 'BOOKED' });


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

    this.service.mainModelListDivisionWise(sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          this.mainModelList = data;
          console.log(this.mainModelList);
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


    this.service.salesRepNameList(this.ouId, this.locId, sessionStorage.getItem('deptId'))
      .subscribe(
        data => {
          this.salesRepNameList = data.obj;
          console.log(this.salesRepNameList);
        }
      );

    this.orderManagementService.priceListNameList1(sessionStorage.getItem('ouId'), (sessionStorage.getItem('divisionId')))
      .subscribe(
        data => {
          this.priceListNameList = data;
          // console.log(this.priceListNameList);
          for (let i = 0; i < data.length; i++) {
            if (Number(sessionStorage.getItem('deptId')) != 1) {
              if (data[i].ouId === 999) {
                this.CounterSaleOrderBookingForm.patchValue({ priceListName: data[i].priceListName })
                this.CounterSaleOrderBookingForm.patchValue({ priceListId: data[i].priceListHeaderId })
              }
            }
            else if (Number(sessionStorage.getItem('deptId')) === 1) {
              if (data[i].priceListName.includes('Sales')) {
                this.CounterSaleOrderBookingForm.patchValue({ priceListName: data[i].priceListName })
                this.CounterSaleOrderBookingForm.patchValue({ priceListId: data[i].priceListHeaderId })
              }
            }
          }
        }
      );
    this.orderlineDetailsGroup();
    var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray
    (patch.controls[0]).patchValue(
      {
        lineNumber: 1,
      }
    );

    this.displaysegmentInvType[0] = true;

    this.orderManagementService.categoryList1()
      .subscribe(
        data1 => {
          this.categoryList = data1;
          if (this.deptName === 'TrueValue') { }
          else {
            for (let i = 0; i < data1.length; i++) {
              if (data1[i].itemType === 'SS_VEHICLE') {
                this.categoryList.splice(i, 1)
              }
            }

          }
        }
      );



    this.service.subInvCode2(this.deptId, this.divisionId).subscribe(
      data => {
        this.subInvCode = data;
        console.log(this.subInventoryId);
        this.subInventoryId = this.subInvCode.subInventoryId;
      });

    this.orderManagementService.categoryList()
      .subscribe(
        data1 => {
          this.categoryList = data1;
          for (let i = 0; i < data1.length; i++) {
            if (data1[i].itemType === 'SS_VEHICLE') {
              this.categoryList.splice(i, 1)
            }
          }
        }
      );

  }

  onOptionsSelectedVariant(mainModel) {
    var issuedBy = this.CounterSaleOrderBookingForm.get('issuedBy').value;
    // alert(issuedBy);
    if (issuedBy === undefined || issuedBy === null || issuedBy === '') {
      alert('First Select Sales Person ...!');
      window.location.reload();
      return;
    }
    this.orderManagementService.VariantSearchFn(mainModel)
      .subscribe(
        data => {
          this.VariantSearch = data;
          console.log(this.VariantSearch);
        }
      );
    // }
  }
  basicChassisPrice: number;

  onOptionsSelectedBasicPrice(color: any) {
    // alert(color)
    if (Number(sessionStorage.getItem('divisionId')) === 2) {
      var model = this.CounterSaleOrderBookingForm.get('model').value;
      var variant = this.CounterSaleOrderBookingForm.get('variant').value;
      this.orderManagementService.dealerShipBaseAmt(model, variant, color)
        .subscribe(
          data => {
            this.CounterSaleOrderBookingForm.patchValue({ basicValue: data.obj[0].basicValue })
            this.basicChassisPrice = data.obj[0].basicValue

            var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
            this.displaysegmentInvType[0] = false;
            var chassisItem = this.CounterSaleOrderBookingForm.get('model').value + '-' +
              this.CounterSaleOrderBookingForm.get('variant').value + '-' +
              this.CounterSaleOrderBookingForm.get('color').value;
            //  alert(chassisItem +'Basic Amt---'+data.obj[0].basicValue);
            (patch.controls[0]).patchValue({
              invType: 'SS_VEHICLE',
              segment: chassisItem,
              orderedItem: chassisItem,
              pricingQty: 1,
              unitSellingPrice: data.obj[0].basicValue,
              baseAmt: this.basicChassisPrice,
              taxPer: (data.obj[0].gstPercentage+data.obj[0].cessPer+data.obj[0].tcsPer),
              taxAmt: (this.basicChassisPrice * data.obj[0].gstPercentage / 100),
              sgst: ((this.basicChassisPrice * data.obj[0].gstPercentage / 100) / 2),
              cgst: ((this.basicChassisPrice * data.obj[0].gstPercentage / 100) / 2),
              totAmt: (this.basicChassisPrice + (this.basicChassisPrice * data.obj[0].gstPercentage / 100))
            });
            this.updateTotAmtPerline(0)
            this.addRow(0)
          }
        );
    }
  }
  OrderFind(orderNumber) {
    this.orderlineDetailsArray().clear();
    this.displaysegmentHeader = false;
    this.displayaddRemoveBtn = false;
    this.displayVehicleDetails = false;
    this.displayaddRow = false;
    this.isDisabled1 = false;
    this.isDisabled = true;
    this.isDisabled4 = true;
    this.CounterSaleOrderBookingForm.disable();
    this.orderManagementService.proformaOrderSearchNew(sessionStorage.getItem('divisionId'), orderNumber)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
            this.displayCustomerSite = false;
            this.displayCSOrderAndLineDt = false;
            let orLineCtrl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
            // debugger;
            for (let i = 0; i < this.lstgetOrderLineDetails.length; i++) {
              var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
              orLineCtrl.push(oeOrderLinesAllList1);
              this.displaysegmentInvType[i] = false;
              this.displayRemoveRow[i] = false;

            }
            this.CounterSaleOrderBookingForm.patchValue(data.obj);
            this.CounterSaleOrderBookingForm.patchValue({ name: data.obj.billLocName });
            var orderedDate1 = data.obj.orderedDate;
            var orderedDate2 = this.pipe.transform(orderedDate1, 'dd-MM-yyyy');
            this.CounterSaleOrderBookingForm.patchValue(({ orderedDate: orderedDate2 }));
            var custPoDate1 = data.obj.custPoDate;
            var custPoDate2 = this.pipe.transform(custPoDate1, 'dd-MM-yyyy');
            this.CounterSaleOrderBookingForm.patchValue(({ custPoDate: custPoDate2 }));
            orLineCtrl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
            for (let i = 0; i < this.lstgetOrderLineDetails.length; i++) {
              orLineCtrl.controls[i].patchValue({
                sgst: this.lstgetOrderLineDetails[i].taxAmt / 2,
                cgst: this.lstgetOrderLineDetails[i].taxAmt / 2,
                igst: '',
                taxAmt: this.lstgetOrderLineDetails[i].taxAmt
              });

            }
          }

        })
  }


  setFocus(name) {

    const ele = this.aForm.nativeElement[name];
    if (ele) {
      ele.focus();
    }
  }

  accountNoSearch(custAccountNo) {
    // alert(custAccountNo);
    this.service.searchCustomerByAccount(custAccountNo)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.selCustomer = data.obj;
            this.displayCSOrderAndLineDt = false;
            this.custSiteList = data.obj.customerSiteMasterList;
            if (data.obj.tcsYN === 'Y') {
              this.CounterSaleOrderBookingForm.patchValue(data.obj);
              this.displaytcsYN = false;
              this.displaytcsBuuton = false;
              // this.isDisabled = true;
            }
            this.custClassCode = this.selCustomer.classCodeType;

            this.CounterSaleOrderBookingForm.patchValue({ tcsYN: data.obj.tcsYN });
            this.CounterSaleOrderBookingForm.patchValue({ custName: data.obj.custName });
            this.CounterSaleOrderBookingForm.patchValue({ customerId: data.obj.customerId });
            this.CounterSaleOrderBookingForm.patchValue({ classCodeType: data.obj.classCodeType });
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
    let selSite = this.custSiteList.find(d => d.siteName === siteName);
    console.log(selSite);
    console.log(this.custSiteList);
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
      this.custClassCode = this.selCustomer.classCodeType;
      this.CounterSaleOrderBookingForm.patchValue({ creditAmt: selSite.creditAmt });
      if (selSite.disPer != null) {
        // alert(selSite.disPer)
        this.CounterSaleOrderBookingForm.patchValue({ discType: 'Header Level Discount' })
        this.CounterSaleOrderBookingForm.patchValue({ disPer: selSite.disPer });
        this.CounterSaleOrderBookingForm.patchValue({ custtaxCategoryName: selSite.taxCategoryName })
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

  onOptionsSelectedColor(variant) {

    this.orderManagementService.ColourSearchFn(variant)
      .subscribe(
        data => {
          this.ColourSearch = data;
          console.log(this.ColourSearch);
          let select = this.ColourSearch.find(d => d.variant === variant);
          this.fuelType = select.fuelType;
        }
      );

    // }
  }

  displaytaxCategoryName: Array<boolean> = [];



  onOptionsSelectedCategory(orderType: string, lnNo: number) {
    // let controlinv1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    let controlInv2 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    let controlinv1 = controlInv2.getRawValue();
    let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    if (controlinv1[lnNo].invType != 'SS_VEHICLE') {
      if (this.CounterSaleOrderBookingForm.get('model').value === undefined || this.CounterSaleOrderBookingForm.get('model').value == null ||
        this.CounterSaleOrderBookingForm.get('variant').value === undefined || this.CounterSaleOrderBookingForm.get('variant').value == null ||
        this.CounterSaleOrderBookingForm.get('fuelType').value === undefined || this.CounterSaleOrderBookingForm.get('fuelType').value == null ||
        this.CounterSaleOrderBookingForm.get('color').value === undefined || this.CounterSaleOrderBookingForm.get('color').value == null ||
        this.CounterSaleOrderBookingForm.get('basicValue').value === undefined || this.CounterSaleOrderBookingForm.get('basicValue').value == null
      ) {
        alert('Select Vehicle Details & then add line item..!');
        return;
      }
      if (this.CounterSaleOrderBookingForm.get('custAccountNo').value === undefined || this.CounterSaleOrderBookingForm.get('custAccountNo').value === null ||
        this.CounterSaleOrderBookingForm.get('name').value === undefined || this.CounterSaleOrderBookingForm.get('name').value === null) {
        alert('Select Customer Details & then add line item..!');
        (controlinv.controls[lnNo]).patchValue({ 'invType': '--Select--' });
        return;
      }
      this.invType = orderType;
      // this.flowStatusCode='BOOKED';
      // alert(this.flowStatusCode);
      if (this.itemMap.has(orderType)) {
        var itemsList = this.itemMap.get(orderType);
        this.itemMap2.set(lnNo, this.itemMap.get(orderType));
      } else {
      }
      this.invItemList1 = this.itemMap.get(orderType);

      var variant = this.CounterSaleOrderBookingForm.get('variant').value;
      this.orderManagementService.getItemByCatTypeNew(orderType, sessionStorage.getItem('divisionId'), variant)
        .subscribe(
          data => {
            this.invItemList1 = data;
            // this.orderedItem=data.description;
            this.itemMap.set(orderType, data);
            this.itemMap2.set(lnNo, this.itemMap.get(orderType));
            // (controlinv.controls[lnNo]).patchValue({ 'segment': '--Select--' });
          }
        );
      // if (orderType.includes('VEHICLE')) {
      //   this.displaytaxCategoryName[lnNo] = true;
      // }

    }
  }

  onOptionsSelectedDescription(segment: string, k) {
    // alert(segment +'---'+ k)
    // alert('HI')
    let controlinv = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var itemType = (controlinv.controls[k]).get('invType').value;
    if (itemType != 'SS_VEHICLE') {
      console.log(this.invItemList1);
      let select = this.invItemList1.find(d => d.segment === segment);
      console.log(select);
      this.CounterSaleOrderBookingForm.patchValue({ itemId: select.itemId })
      this.itemId = select.itemId;
      var custtaxCategoryName = this.CounterSaleOrderBookingForm.get('taxCategoryName').value;
      var priceListId = this.CounterSaleOrderBookingForm.get('priceListId').value;
      // alert(segment +'---'+ custtaxCategoryName+'---'+priceListId)
      console.log(priceListId);
      if (custtaxCategoryName === 'Sales-IGST') {
        this.orderManagementService.addonDescList1(segment, custtaxCategoryName, priceListId)
          .subscribe(
            data => {
              if (data.code === 200) {
                this.addonDescList = data.obj;
                for (let i = 0; i < data.obj.length; i++) {
                  var itemtaxCatNm: string = data.obj[i].taxCategoryName;
                  if (itemtaxCatNm.includes('Sale-I-GST')) {
                    (controlinv.controls[k]).patchValue({
                      itemId: data.obj[i].itemId,
                      orderedItem: data.obj[i].description,
                      hsnSacCode: data.obj[i].hsnSacCode,
                      uom: data.obj[i].uom,
                    });
                    // this.orderManagementService.getTaxCategoriesForSales(custtaxCategoryName, data.obj[i].taxPercentage)
                    //   .subscribe(
                    //     data1 => {
                    //       this.taxCategoryList[k] = data1;
                    //       console.log(this.taxCategoryList[k]);
                    //       console.log(data.obj[i].taxCategoryName);
                    //       this.allTaxCategoryList[k] = data1;
                    //       let itemCateNameList = this.taxCategoryList[k].find(d => d.taxCategoryName === data.obj[i].taxCategoryName);
                    //       console.log(itemCateNameList);
                    //       (controlinv.controls[k]).patchValue({
                    //         taxCategoryId: itemCateNameList.taxCategoryId,
                    //         taxCategoryName: itemCateNameList,
                    //       })
                    //     }
                    //   );
                  }
                }
              }
              else if (data.code === 400) {
                alert(data.message)
              }
            })
          ;
      }
      else {
        this.orderManagementService.addonDescList1(segment, custtaxCategoryName, priceListId)
          .subscribe(
            data => {
              if (data.code === 200) {
                this.addonDescList = data.obj; //// item iformation
                for (let i = 0; i < data.obj.length; i++) {
                  var taxCatNm: string = data.obj[i].taxCategoryName;
                  // alert(taxCatNm);
                  if (itemType.includes('VEHICLE') === true) {
                    if (taxCatNm != '' && taxCatNm != null) {
                      if (taxCatNm.includes('Sale-S&C')) {
                        (controlinv.controls[k]).patchValue({
                          itemId: data.obj[i].itemId,
                          orderedItem: data.obj[i].description,
                          hsnSacCode: data.obj[i].hsnSacCode,
                          uom: data.obj[i].uom,
                          flowStatusCode: 'BOOKED',
                          isTaxable: data.obj[i].isTaxable,
                          pricingQty: 1,
                          taxPer: data.obj[0].taxPercentage,
                          taxCategoryName: data.obj[i].taxCategoryName,
                          taxCategoryId: data.obj[i].taxCategoryId,
                          // unitSellingPrice: data.obj[0].priceValue,by vinita
                        });
                        // this.orderManagementService.getTaxCategoriesForSales(custtaxCategoryName, data.obj[i].taxPercentage)
                        //   .subscribe(
                        //     data1 => {
                        //       this.taxCategoryList[k] = data1;
                        //       this.allTaxCategoryList[k] = data1;
                        //       let itemCateNameList = this.taxCategoryList[k].find(d => d.taxCategoryName === data.obj[i].taxCategoryName);
                        //       (controlinv.controls[k]).patchValue({
                        //         taxCategoryId: itemCateNameList.taxCategoryId,
                        //         taxCategoryName: itemCateNameList,
                        //       })
                        //     }
                        //   );
                      }
                    }
                  }
                  else if (itemType.includes('VEHICLE') === false && data.obj[i].isTaxable === 'Y') {
                    // alert('h2')
                    if (taxCatNm.includes('Sale-S&C')) {
                      (controlinv.controls[k]).patchValue({
                        itemId: data.obj[i].itemId,
                        orderedItem: data.obj[i].description,
                        hsnSacCode: data.obj[i].hsnSacCode,
                        uom: data.obj[i].uom,
                        flowStatusCode: 'BOOKED',
                        isTaxable: data.obj[i].isTaxable,
                        taxCategoryName: data.obj[i].taxCategoryName,
                        taxCategoryId: data.obj[i].taxCategoryId,
                        unitSellingPrice: data.obj[i].priceValue,
                        taxPer: data.obj[0].taxPercentage,
                        pricingQty: 1,
                      });
                    }
                  }
                  else if (data.obj[i].isTaxable === 'N' && taxCatNm === null) {
                    // alert('h3');
                    // alert(data.obj[i].isTaxable);
                    (controlinv.controls[k]).patchValue({
                      itemId: data.obj[i].itemId,
                      orderedItem: data.obj[i].description,
                      hsnSacCode: data.obj[i].hsnSacCode,
                      uom: data.obj[i].uom,
                      unitSellingPrice: data.obj[i].priceValue,
                      isTaxable: data.obj[i].isTaxable,
                      pricingQty: 1
                    });

                  }
                }
                let controForPrice = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
                // alert(controForPrice[k].pricingQty)
                this.onKey(k, 1)
              }
              else if (data.code === 400) {
                alert(data.message);
              }
            }

          );
      }
    }
  }

  onKey(index, fldName) {
    // var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var trxLnArr3 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    let trxLnArr1 = trxLnArr3.getRawValue();
    var custtaxCategoryName = this.CounterSaleOrderBookingForm.get('taxCategoryName').value;
    var baseAmt = Math.round(((trxLnArr1[index].pricingQty * trxLnArr1[index].unitSellingPrice) + Number.EPSILON) * 100) / 100;
    var disAmt = (baseAmt * trxLnArr1[index].disPer) / 100;
    var baseAmtAfterDisc = baseAmt - disAmt;
    var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    // alert(custtaxCategoryName+'---'+baseAmtAfterDisc)
    var arrayControlNew = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var arrayControl = arrayControlNew.getRawValue();
    // alert(arrayControl[index].taxCategoryId) 
    var itemId = arrayControl[index].itemId;
    var taxcatName = arrayControl[index].taxCategoryName;
    var taxCategoryId = arrayControl[index].taxCategoryId;
    var disAmt1 = arrayControl[index].disAmt;
    var sum = 0;
    var lineTotAmt = 0;
    //  alert(trxLnArr1[index].isTaxable)
    if (trxLnArr1[index].isTaxable === 'N') {
      // alert('addon')
      var baseAmt = arrayControl[index].unitSellingPrice * arrayControl[index].pricingQty;
      (patch.controls[index]).patchValue({
        baseAmt: baseAmt,
        taxAmt: 0,
        disAmt: 0,
        totAmt: baseAmt,
      });
      (patch.controls[index]).patchValue({
        flowStatusCode: 'BOOKED'
      });
    }

    // alert(itemId+'----'+taxCategoryId+'----'+disAmt1+'----'+baseAmtAfterDisc)
    if (arrayControl[index].isTaxable != 'N' && (taxcatName != null || taxcatName != '')) {
      this.service.taxCalforItem(itemId, taxCategoryId, disAmt1, baseAmtAfterDisc)
        .subscribe(
          (data: any[]) => {
            this.taxCalforItem = data;
            console.log(this.taxCalforItem);
            for (let i = 0; i < this.taxCalforItem.length; i++) {
              if (this.taxCalforItem[i].totTaxPer != 0) {
                sum = sum + this.taxCalforItem[i].totTaxAmt;
              }
            }
            lineTotAmt = Math.round(((baseAmt + sum - disAmt1) + Number.EPSILON) * 100) / 100;
            (patch.controls[index]).patchValue({
              baseAmt: Math.round((baseAmt + Number.EPSILON) * 100) / 100,
              taxAmt: sum,
              sgst: sum / 2,
              cgst: sum / 2,
              totAmt: Math.round(((baseAmt + sum - disAmt1) + Number.EPSILON) * 100) / 100,
              // disAmt: (disPer / 100) * baseAmt,
            });
            let distAmtArray = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
            var disValue = data[0].totTaxAmt;
            if (disValue > 0 && data[0].taxTypeName.includes('Discount')) {
              patch.controls[index].patchValue({ disAmt: data[0].totTaxAmt });
            }
            else {
              patch.controls[index].patchValue({ disAmt: 0 });
            }
            this.updateTotAmtPerline(index);
          });
    }
    var itemId1 = trxLnArr1[index].itemId;
    if (itemId1 != null && fldName != "locator") {
      this.addRow(index);
    }
    else {
      this.displayRemoveRow.push(true);
    }

  }


  addRow(i) {
    // alert(i)
    var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var trxLnArr2 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var trxLnArr3 = trxLnArr2.getRawValue();
    if (this.op == 'Search') {
      i = trxLnArr1.length;
    }
    if (trxLnArr3[i].invType === '' || trxLnArr3[i].invType === null || trxLnArr3[i].invType === undefined || trxLnArr3[i].segment === '' || trxLnArr3[i].segment === null || trxLnArr3[i].segment === undefined) {
      alert('Please enter data in blank field');
      return;
    }
    var disPer = this.CounterSaleOrderBookingForm.get('disPer').value;
    this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
    var len = this.orderlineDetailsArray().length;
    var patch = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    (patch.controls[len - 1]).patchValue(
      {
        lineNumber: len,
        flowStatusCode: 'BOOKED',
        // disPer: disPer,
        // invType: 'SS_SPARES',
        disAmt: 0
      }
    );
    if (disPer === null) {
      (patch.controls[len - 1]).patchValue(
        {
          disPer: 0,
        }
      );
    }
    this.displaysegmentInvType.push(true);
    this.displayRemoveRow[len - 1] = true;
    this.displayCounterSaleLine.push(true);
    this.displayLineflowStatusCode.push(true);
    this.itemSeg = '';
    var ln = len - 1;
    // alert(ln)
    this.updateTotAmtPerline(ln)
    this.setFocus('itemSeg' + ln);
  }


  updateTotAmtPerline(lineIndex) {
    var formArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var formVal = formArr.getRawValue();
    // var tcsPer = this.CounterSaleOrderBookingForm.get('tcsPer').value;
    var basicAmt = 0;
    var taxAmt1 = 0;
    var totAmt = 0;
    var disAmt = 0;
    var tcsAmt1 = 0;
    for (let i = 0; i < formVal.length; i++) {
      if (formVal[i].flowStatusCode === 'BOOKED') {
        if (formVal[i].baseAmt === 0) {

        } else {
          basicAmt = basicAmt + Number(formVal[i].baseAmt);
        }

        if (formVal[i].disAmt === 0) {

        } else {
          disAmt = disAmt + Number(formVal[i].disAmt);
        }

        if (formVal[i].taxAmt === 0) {

        } else {
          taxAmt1 = taxAmt1 + Number(formVal[i].sgst + formVal[i].cgst + formVal[i].igst);
        }
        if (formVal[i].totAmt === 0) {

        } else {
          totAmt = totAmt + Number(formVal[i].totAmt);
          // tcsAmt1 = Math.round((totAmt * tcsPer / 100 + Number.EPSILON) * 100) / 100;
        }
      }
      console.log(formArr);
      var ln = i;
      if (ln < formArr.length - 1) {
        formArr.controls[i].disable();
        // formArr.controls[i].get('pricingQty').enable();
        // formArr.controls[i].get('flowStatusCode').enable();
      }

    }

    basicAmt = Math.round(((basicAmt) + Number.EPSILON) * 100) / 100;
    this.CounterSaleOrderBookingForm.patchValue({ 'subtotal': basicAmt });
    disAmt = Math.round(((disAmt) + Number.EPSILON) * 100) / 100;
    this.CounterSaleOrderBookingForm.patchValue({ 'discAmt': disAmt });
    taxAmt1 = Math.round(((taxAmt1) + Number.EPSILON) * 100) / 100;
    this.CounterSaleOrderBookingForm.patchValue({ 'totTax': taxAmt1 });
    totAmt = Math.round(((totAmt) + Number.EPSILON) * 100) / 100;
    this.CounterSaleOrderBookingForm.patchValue({ 'totAmt': totAmt });
    this.CounterSaleOrderBookingForm.patchValue({ 'tcsAmt': tcsAmt1 });
    var newln = lineIndex + 1;
    this.setFocus('itemSeg' + newln);
  }


  close() {
    this.location1.back();
  }

  refresh() {
    window.location.reload();
  }

  transeData(val) { }

  createProformaOrder() {
    var formValue = this.transeData(this.CounterSaleOrderBookingForm.value);
    console.log(this.CounterSaleOrderBookingForm.value);
    console.log(formValue);
    let jsonData = this.CounterSaleOrderBookingForm.getRawValue();
    var custPoDate = this.CounterSaleOrderBookingForm.get('custPoDate').value;
    jsonData.orderedDate = this.pipe.transform(this.now, 'yyyy-MM-dd');
    jsonData.refCustNo = this.CounterSaleOrderBookingForm.get('refCustNo').value;
    jsonData.custPoNumber = this.CounterSaleOrderBookingForm.get('custPoNumber').value;
    jsonData.custPoDate = this.pipe.transform(custPoDate, 'yyyy-MM-dd');
    jsonData.emplId = sessionStorage.getItem('emplId');
    jsonData.ouId = Number(sessionStorage.getItem('ouId'));
    jsonData.locationId = Number(sessionStorage.getItem('locId'));
    jsonData.deptId = sessionStorage.getItem('deptId');
    jsonData.divisionId = sessionStorage.getItem('divisionId');
    console.log(jsonData);
    this.orderManagementService.createProformaOrderFFn(jsonData).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.orderNumber = res.obj;
        this.OrderFind(res.obj);
        // window.location.reload();
        this.isDisabled = true;
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.isDisabled = false;
          // this.paymentReceiptForm.reset();
        }
      }
    });
  }

  downloadProformaInv() {
    const fileName = 'Proforma Invoice-' + sessionStorage.getItem('locName').trim() + '.xls';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    // this.orderManagementService.salesproformaInv(this.orderNumber, sessionStorage.getItem('locId'))
    //   .subscribe(data => {
    //     saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
    //   })
    this.orderManagementService.salesproformaInv(this.orderNumber, sessionStorage.getItem('locId'))
      .subscribe(data => {
        // saveAs(new Blob([data], { type: MIME_TYPES[EXT] }));ng 
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      });

  }


  RemoveRow(index) {
    if (index === 0) {
    }
    else {
      var formVal = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
      var formArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
      this.orderlineDetailsArray().removeAt(index);
      // this.TaxDetailsArray().removeAt(index);
      for (let i = 0; i < formVal.length; i++) {
        (formArr.controls[i]).patchValue({
          lineNumber: i + 1,
        });
      }
    }
  }
}
