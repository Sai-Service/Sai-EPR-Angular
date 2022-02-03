import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { data } from 'jquery';
import { DatePipe } from '@angular/common';
import { Location } from "@angular/common";
import { saveAs } from 'file-saver';
import { SalesOrderobj } from './sales-orderobj'
import { identifierModuleUrl } from '@angular/compiler';
const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

interface ISalesBookingForm {
  divisionName: string,
  ouName: string,
  divisionId: number,
  deptId: number;
  priceListHeaderId: number;
  fuelType: string;
  locCode: string,
  basicValue: number;
  ticketNo: string,
  emplId: number;
  orderNumber: number,
  accountNo: number,
  custName: string,
  orderedDate: Date,
  transactionTypeName: string,
  // broker:string;
  subDealerId: number;
  subDealerName: string;
  flowStatusCode: string,
  payTermDesc: string,
  salesRepName: string,
  tlName: string,
  remarks: string,
  locationId: number;
  subtotal: number,
  totTax: number,
  totAmt: number,
  custAddress: string,
  model: string,
  variant: string,
  locId: number;
  color: string,
  financeType: string,
  mobile1: number;
  financerName: string,
  financeAmt: number,
  emi: number;
  tenure: number;
  downPayment: number;
  lineNumber: number;
  segment: string;
  orderedItem: string;
  pricingQty: number;
  unitSellingPrice: number;
  taxCategoryName: string;
  baseAmt: number;
  taxAmt: number;
  totAmt1: number;
  flowStatusCode1: string;
  category: string;
  hsnSacCode: string;
  priceListName: string;
  billLocName: string;
  shipLocName: string;
  ouId: number;
  // loginOuId1:number;
  customerId: string;
  // locName:string;
  billToAddress: string;
  shipToAddress: string;
  gstNo: string;
  panNo: string;
  custTaxCat: string;
  invType: string;
  taxAmounts: IterableIterator<any[]>;
}

interface AccOrderLinesPost1 {
  lineNumber: number;
  orderNumber: number;
  segment: string;
  pricingQty: number;
  taxCategoryId: number;
  orgId: number;
  adhocDiscount: number;
  adhocConsu: number;
  additionalDisc: number;
  adhocExchBonus: number;
  adhocFinanceOffer: number;
  adhocISL: number;
  itemType: string;
  subDealerDesc: string;
}

interface IFinanaceExchangeDetails {
  orderNumber: number;
  financeType: string;
  financerName: string;
  financeAmt: number;
  emi: number;
  tenure: number;
  downPayment: number;
  taxiYN: string;
  exchangeYN: string;
  loyaltyBonus: number;
  exRegNo: string;
  insCharges: string;
  advEMI: number;
  finCommPercnt: number;
  finPerCaseIncentive: number;
  custPoNumber: number;
  custPoDate: Date;
}

interface IModelDetails{
  model:string;
  variant:string;
  color:string;
  fuelType:string;
  basicValue:number;
}

export class IFinanaceExchangeForm {
  orderNumber: number;
  financeType: string;
  financerName: string;
  financeAmt: number;
  emi: number;
  tenure: number;
  downPayment: number;
  taxiYN: string;
  exchangeYN: string;
  loyaltyBonus: number;
  exRegNo: string;
  insCharges: string;
  advEMI: number;
  finCommPercnt: number;
  finPerCaseIncentive: number;
  custPoNumber: number;
  custPoDate: Date;
}

@Component({
  selector: 'app-sales-order-form',
  templateUrl: './sales-order-form.component.html',
  styleUrls: ['./sales-order-form.component.css'],
  template: `<pdf-viewer [src]="pdfSrc"
              [render-text]="true"
              style="display: block;"></pdf-viewer>`
})
export class SalesOrderFormComponent implements OnInit {
  SalesOrderBookingForm: FormGroup;
  public op: string;
  private sub: any;
  invLineNo: number;
  variantDesc: string;
  subDealerDesc: string;
  birthDate: Date;
  emailId1: string;
  basicValue: number;
  isTaxable: string;
  priceListHeaderId: number;
  emailId: string;
  state: string;
  divisionId: number;
  weddingDate: Date;
  paymentTermId: number;
  deptName: string;
  exchange: string;
  loyaltyBonus: string;
  taxiYN: string;
  exRegNo: string;
  insCharges: string;
  offerPrice: string;
  custOuId: number;
  loginOuId1: number;
  tcs = false;
  selectedLine = 0;
  invLineItemId: number;
  lstInvLineDeatails1: any[];
  indexVal: number;
  allDatastore: any;
  activeLineNo: number = 1;
  divisionName: string;
  dept: number;
  poLineTax: number;
  category: string;
  itemId: number;
  ouName: string;
  locId: number;
  locCode: string;
  locationId: number;
  ticketNo: string;
  orderNumber: number;
  accountNo: number;
  custName: string;
  mobile1: number;
  orderedDate = new Date();
  transactionTypeName: string;
  flowStatusCode: string;
  payTermDesc: string;
  salesRepName: string;
  tlName: string;
  remarks: string;
  subtotal: number;
  totTax: number;
  totAmt: number;
  fuelType: string;
  custAddress: string;
  model: string;
  variant: string;
  color: string;
  financeType: string;
  financerName: string;
  financeAmt: number;
  emi: number;
  tenure: number;
  downPayment: number;
  segment: string;
  orderedItem: string;
  lineNumber: number;
  pricingQty: number;
  priceListName: string;
  unitSellingPrice: number;
  taxCategoryName: string;
  baseAmt: number;
  taxAmt: number;
  totAmt1: number;
  flowStatusCode1: string;
  lstgetOrderDetails: any;
  invItemId: number;
  description: string;
  hsnSacCode: string;
  emplId: number;
  billLocName: string;
  shipLocName: string;
  ouId: number;
  customerId: string;
  billToAddress: string;
  shipToAddress: string;
  deptId: number;
  gstNo: string;
  panNo: string;
  invType: string;
  taxAmounts: number;
  taxCategoryId: number;
  // locCode:string;
  adhocDiscount: number;
  adhocConsu: number;
  additionalDisc: number;
  adhocExchBonus: number;
  adhocFinanceOffer: number;
  adhocISL: number;
  public transactionTypeNameList: any;
  brokerList: any;
  public payTermDescList: any;
  public salesRepNameList: any;
  public taxCategoryList: any = [];
  public viewAllInvoiceData: any[];
  public ticketNoSearch: any;
  priceListNameList: Array<string>[];
  public mainModelList: Array<string>[];
  public VariantSearch: Array<string>[];
  public allTaxCategoryList: any = [];
  public ColourSearch: any;
  public financeTypeList: any;
  public financerNameList: any;
  public lineLevelOrderStatusList: any = [];
  invItemList1: any[];
  public taxCalforItem: any;
  categoryList: any[];
  accountNoSearch: any[];
  public addonDescList: any[];
  lstgetOrderLineDetails: any[];
  lstgetOrderTaxDetails: any[];
  displayorderDetails = true;
  displayaccountNo = true;
  displayAllButtons = true;
  displaycustAccountNo = true;
  currentOpration: string;
  displayVehicleDetails = true;
  displayCreateOrderButton = false;
  displayLineTaxDetails = true;
  public YesNoList: Array<string> = [];
  displaySalesLines = true;
  displayAdditonalDetails = true;
  // payTermDesc:string;
  selCustomer: any;
  custSiteList: any = [];
  paymentType: string;
  display = 'none';
  accountNoSearchdata: any[];
  displayCustomerSite = true;
  customerNameSearch: any[];
  name: string;
  customerSiteId: number;
  custPoNumber: string;
  custPoDate: Date;
  refCustNo: string;
  isDisabled3 = false;
  isDisabled4 = false;
  isDisabled5 = false;
  isDisabled6 = false;
  isDisabled7 = false;
  isDisabled8 = false;
  isDisabled9 = false;
  isDisabled10 = false;
  isDisabled11 = false;
  isDisabledtaxbtn : Array<boolean> = [];
  // isDisabledtaxbtn=false;

  displaysegmentInvType: Array<boolean> = [];
  displayLineflowStatusCode: Array<boolean> = [];
  displaytaxCategoryName: Array<boolean> = [];
  displayRemoveRow: Array<boolean> = [];
  // displayTaxCategoryupdate:Array<boolean>=[];
  displayCounterSaleLine: Array<boolean> = [];
  public itemMap = new Map<string, any[]>();
  public taxMap = new Map<string, any>();

  isDisabled = true;
  displayDMSCDMS: boolean;
  isVisible1: boolean = false;
  DisplayfinanceSelectionYes = true;
  DisplayfinanceSelectionYes1 = true;
  Displayexchange = true;
  @ViewChild("myinput") myInputField: ElementRef;


  isVisible2: boolean = false;
  isVisible3: boolean = true;
  isVisible4: boolean = false;
  isVisible5: boolean = false;
  isVisible6: boolean = false;
  isVisible7: boolean = false;

  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  colorCode: string;

  constructor(private fb: FormBuilder, private router1: ActivatedRoute, private location: Location, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.SalesOrderBookingForm = fb.group({
      divisionName: [''],
      ouName: [''],
      subDealerDesc: [],
      variantDesc: [''],
      colorCode: [''],
      exchange: ['', [Validators.required]],
      priceListHeaderId: [''],
      taxiYN: [''],
      basicValue: [''],
      weddingDate: [''],
      name: [''],
      customerSiteId: [''],
      custTaxCat: [''],
      taxCategoryName: [''],
      birthDate: [''],
      emailId1: [''],
      emailId: [''],
      state: [''],
      loyaltyBonus: [''],
      exRegNo: [''],
      insCharges: [''],
      offerPrice: [''],
      mobile1: ['', [Validators.required]],
      paymentTermId: [],
      locCode: [''],
      locId: [''],
      locationId: [''],
      ticketNo: [''],
      orderNumber: [''],
      accountNo: ['', [Validators.required]],
      custName: ['', [Validators.required]],
      orderedDate: [''],
      transactionTypeName: ['', [Validators.required]],
      // broker:[],
      subDealerId: [],
      subDealerName: [],
      flowStatusCode: [''],
      payTermDesc: ['', [Validators.required]],
      salesRepName: ['', [Validators.required]],
      tlName: [''],
      remarks: [''],
      subtotal: [''],
      fuelType: [''],
      totTax: [''],
      totAmt: [''],
      custAddress: [''],
      model: ['', [Validators.required]],
      variant: ['', [Validators.required]],
      color: ['', [Validators.required]],
      financeType: ['', [Validators.required]],
      financerName: [''],
      financeAmt: [''],
      emi: [''],
      tenure: [''],
      downPayment: [''],
      emplId: [''],
      priceListName: [''],
      billLocName: [''],
      shipLocName: [''],
      ouId: [''],
      customerId: [''],
      billToAddress: [''],
      shipToAddress: [''],
      custPoNumber: [''],
      custPoDate: [''],
      refCustNo: [''],
      gstNo: [''],
      panNo: [''],
      tcs: [''],
      oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
      taxAmounts: this.fb.array([this.TaxDetailsGroup()])
    })
  }

  TaxDetailsGroup() {
    return this.fb.group({
      totTaxAmt: [],
      lineNumber: [],
      taxRateName: [],
      taxTypeName: [],
      taxPointBasis: [],
      precedence1: [],
      precedence2: [],
      precedence3: [],
      precedence4: [],
      precedence5: [],
      precedence6: [],
      precedence7: [],
      precedence8: [],
      precedence9: [],
      precedence10: [],
      currencyCode: [],
      totTaxPer: [],
      recoverableFlag: [],
      selfAssesedFlag: [],
      inclusiveFlag: [],
      itemId: [],
      invLineNo: [],
      invLineItemId: [],
      // taxAmounts: [],
    });
  }

  TaxDetailsArray(): FormArray {
    return <FormArray>this.SalesOrderBookingForm.get('taxAmounts')
  }



  orderlineDetailsGroup() {
    return this.fb.group({
      lineNumber: [''],
      tcs: [''],
      itemId: [],
      orderedItem: [''],
      pricingQty: [''],
      unitSellingPrice: [''],
      isTaxable: [''],
      taxCategoryName: [''],
      baseAmt: [''],
      taxAmt: [''],
      totAmt: [''],
      flowStatusCode: [''],
      category: [''],
      itemType: [''],
      hsnSacCode: [''],
      invType: [''],
      taxCategoryId: [''],
      displaysegment: false,
      orderNumber: [''],
      segment: [''],
      // pricingQty: [''],
      // taxCategoryId: [''],
      orgId: [''],
      adhocDiscount: [''],
      adhocConsu: [''],
      additionalDisc: [''],
      adhocExchBonus: [''],
      adhocFinanceOffer: [''],
      adhocISL: [''],
    })
  }


  orderlineDetailsArray(): FormArray {
    return <FormArray>this.SalesOrderBookingForm.get('oeOrderLinesAllList')
  }

  SalesOrderBooking(SalesOrderBookingForm: any) { }


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.op = 'insert';
    // this.displayLineTaxDetails=true;
    this.currentOpration = 'NewOrder';
    // this.displaysegmentInvType[0] = true;
    this.divisionName = sessionStorage.getItem('divisionName');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.locCode = (sessionStorage.getItem('locCode'));
    this.ticketNo = (sessionStorage.getItem('ticketNo'));
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.deptId = Number(sessionStorage.getItem('deptId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.locationId = Number(sessionStorage.getItem('locId'));
    this.deptName = (sessionStorage.getItem('deptName'));
    this.loginOuId1 = Number(sessionStorage.getItem('loginOuId1'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'))
    this.orderlineDetailsArray().controls[0].patchValue({ flowStatusCode: 'BOOKED' });
    this.SalesOrderBookingForm.patchValue({ financeType: 'None' });
    this.SalesOrderBookingForm.patchValue({ exchange: 'N' });

    if (Number(sessionStorage.getItem('divisionId')) === 1) {
      this.displayDMSCDMS = true;
      this.isVisible1 = true;
    }
    else if (Number(sessionStorage.getItem('divisionId')) === 2) {
      this.displayDMSCDMS = false;
      this.isVisible1 = false;
    }

    this.orderlineDetailsGroup();
    var patch = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray
    (patch.controls[0]).patchValue(
      {
        lineNumber: 1,
        flowStatusCode: 'BOOKED'
      }
    );


    // this.service.taxCategoryListForSALES()
    //   .subscribe(
    //     data1 => {
    //       this.taxCategoryList = data1;
    //     }
    //   );


    // this.orderManagementService.lineLevelOrderStatus()
    //   .subscribe(
    //     data1 => {
    //       this.lineLevelOrderStatusList = data1;
    //       console.log(this.lineLevelOrderStatusList);
    //       for (let i=0; i< data1.length;i++){
    //         let select = this.lineLevelOrderStatusList.find(d => d.code === 'BOOKED');
    //         this.orderlineDetailsArray().controls[0].patchValue({ flowStatusCode: 'BOOKED' });
    //       }
    //     }
    //   );



    this.service.transactionTypeNameListNew(this.deptId, this.ouId)
      .subscribe(
        data => {
          this.transactionTypeNameList = data;
          console.log(this.transactionTypeNameList);
        }
      );

    this.service.brokerListFn()
      .subscribe(
        data => {
          this.brokerList = data;
          console.log(this.brokerList);
        }
      );

    this.service.payTermDescList()
      .subscribe(
        data => {
          this.payTermDescList = data;
          console.log(this.payTermDescList);
        }
      );

    this.service.salesRepNameList(this.ouId, this.locId, sessionStorage.getItem('deptId'))
      .subscribe(
        data => {
          this.salesRepNameList = data.obj;
          console.log(this.salesRepNameList);
        }
      );

    this.orderManagementService.priceListNameListDeptWise(sessionStorage.getItem('divisionId'), sessionStorage.getItem('ouId'), sessionStorage.getItem('deptId'))
      .subscribe(
        data => {
          this.priceListNameList = data;
          console.log(this.priceListNameList);
          this.SalesOrderBookingForm.patchValue({ priceListName: data.priceListName })
          this.SalesOrderBookingForm.patchValue({ priceListHeaderId: data.priceListHeaderId })
        }
      );


    this.service.mainModelListDivisionWise(sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          this.mainModelList = data;
          console.log(this.mainModelList);
        }
      );


    this.orderManagementService.getFinTypeSearch1()
      .subscribe(
        data => {
          this.financeTypeList = data;
          console.log(this.financeTypeList);
        }
      );



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

    this.service.YesNoList()
      .subscribe(
        data => {
          this.YesNoList = data;
          console.log(this.YesNoList);
        }
      );


    this.sub = this.router1.params.subscribe(params => {
      this.orderNumber = params['orderNumber'];
      // alert(this.orderNumber)
      if (this.orderNumber != undefined) {
        this.OrderFind(this.orderNumber);
      }
    });

  }


  // onOptionsSelectedDescription(segment: any, k) {
  //   // alert('HII Item Desc')
  //   let select = this.invItemList1.find(d => d.segment === segment);
  //   this.SalesOrderBookingForm.patchValue({ itemId: select.itemId })
  //   this.itemId = select.itemId;
  //   this.orderManagementService.addonDescList(segment)
  //     .subscribe(
  //       data => {
  //         this.addonDescList = data;
  //         let controlinv = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
  //         for (let i = 0; i < data.length; i++) {
  //           var taxCatNm: string = data[i].taxCategoryName;
  //           // alert('FOR LOOP ENTER'+' '+ taxCatNm);
  //           if (taxCatNm === null) {
  //             // alert(taxCatNm);
  //             (controlinv.controls[k]).patchValue({
  //               itemId: data[i].itemId,
  //               orderedItem: data[i].description,
  //               hsnSacCode: data[i].hsnSacCode,
  //               // taxCategoryId: data[i].taxCategoryId,
  //               // taxCategoryName: data[i].taxCategoryName,
  //               unitSellingPrice: data[i].priceValue,
  //               flowStatusCode: 'BOOKED',
  //             });
  //           }
  //           if (taxCatNm.includes('Sale')) {
  //             (controlinv.controls[k]).patchValue({
  //               itemId: data[i].itemId,
  //               orderedItem: data[i].description,
  //               hsnSacCode: data[i].hsnSacCode,
  //               taxCategoryId: data[i].taxCategoryId,
  //               taxCategoryName: data[i].taxCategoryName,
  //               unitSellingPrice: data[i].priceValue,
  //               flowStatusCode: 'BOOKED',
  //             });
  //           }
  //         }
  //       }
  //     );
  // }

  // this.lstgetOrderLineDetails[i].segment,,this.allDatastore.taxCategoryName,this.allDatastore.priceListId,i
  onGstPersantage(custtaxCategoryName, taxPercentage, itemtaxCategotyName, k) {
    // alert(itemtaxCategotyName)
    //  alert(custtaxCategoryName+'----'+taxPercentage+'----'+itemtaxCategotyName+'---'+k)
    let controlinv = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    this.orderManagementService.getTaxCategoriesForSales(custtaxCategoryName, taxPercentage)
      .subscribe(
        data1 => {
          console.log(data1);
          this.taxCategoryList[k] = data1;
          this.allTaxCategoryList = data1;
          let itemCateNameList = this.taxCategoryList[k].find(d => d.taxCategoryName === itemtaxCategotyName);
          console.log(itemCateNameList);
          (controlinv.controls[k]).patchValue({
            taxCategoryId: itemCateNameList.taxCategoryId,
            taxCategoryName: itemCateNameList.taxCategoryName,
          })
        }
      );
      // debugger;
  }


  onOptionsSelectedDescription(segment: string, k) {
    // alert(segment +'---'+ k)
    // alert('HI')
    let controlinv = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var itemType = (controlinv.controls[k]).get('invType').value;
    console.log(this.invItemList1);
    let select = this.invItemList1.find(d => d.segment === segment);
    console.log(select);
    this.SalesOrderBookingForm.patchValue({ itemId: select.itemId })
    this.itemId = select.itemId;
    var custtaxCategoryName = this.SalesOrderBookingForm.get('custTaxCat').value;
    var priceListId = this.SalesOrderBookingForm.get('priceListHeaderId').value;
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
                  this.orderManagementService.getTaxCategoriesForSales(custtaxCategoryName, data.obj[i].taxPercentage)
                    .subscribe(
                      data1 => {
                        this.taxCategoryList[k] = data1;
                        console.log(this.taxCategoryList[k]);
                        console.log(data.obj[i].taxCategoryName);
                        this.allTaxCategoryList[k] = data1;
                        let itemCateNameList = this.taxCategoryList[k].find(d => d.taxCategoryName === data.obj[i].taxCategoryName);
                        console.log(itemCateNameList);
                        (controlinv.controls[k]).patchValue({
                          taxCategoryId: itemCateNameList.taxCategoryId,
                          taxCategoryName: itemCateNameList,
                        })
                      }
                    );
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
                        // unitSellingPrice: data.obj[0].priceValue,by vinita
                      });

                      this.orderManagementService.getTaxCategoriesForSales(custtaxCategoryName, data.obj[i].taxPercentage)
                        .subscribe(
                          data1 => {
                            this.taxCategoryList[k] = data1;
                            this.allTaxCategoryList[k] = data1;
                            let itemCateNameList = this.taxCategoryList[k].find(d => d.taxCategoryName === data.obj[i].taxCategoryName);
                            (controlinv.controls[k]).patchValue({
                              taxCategoryId: itemCateNameList.taxCategoryId,
                              taxCategoryName: itemCateNameList,
                            })
                          }
                        );
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
              let controForPrice = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
              // alert(controForPrice[k].pricingQty)
              this.onKey(k, controForPrice[k].pricingQty)
            }
            else if (data.code === 400) {
              alert(data.message);
            }
          }

        );
    }


  }






  public itemMap2 = new Map<number, any[]>();


  onOptionsSelectedCategory(orderType: string, lnNo: number) {
    this.invType = orderType;
    // this.flowStatusCode='BOOKED';
    // alert(this.flowStatusCode);
    if (this.itemMap.has(orderType)) {
      var itemsList = this.itemMap.get(orderType);
      this.itemMap2.set(lnNo, this.itemMap.get(orderType));
    } else {
    }
    this.invItemList1 = this.itemMap.get(orderType);
    this.isVisible2 = true;
    // alert(this.isVisible2)
    var variant = this.SalesOrderBookingForm.get('variant').value;
    this.orderManagementService.getItemByCatTypeNew(orderType, sessionStorage.getItem('divisionId'), variant)
      .subscribe(
        data => {
          this.invItemList1 = data;
          // this.orderedItem=data.description;
          this.itemMap.set(orderType, data);
          this.itemMap2.set(lnNo, this.itemMap.get(orderType));
        }
      );
    if (orderType.includes('VEHICLE')) {
      this.displaytaxCategoryName[lnNo] = true;
    }
    else {
      this.displaytaxCategoryName[lnNo] = false;
    }
  }


  onOptionsSelectedTL(ticketNo: any) {
    this.dept = Number(sessionStorage.getItem('deptId'));
    if (ticketNo != null) {
      this.orderManagementService.ticketNoSearchFn(ticketNo, this.dept)
        .subscribe(
          data => {
            this.ticketNoSearch = data.obj;
            console.log(this.ticketNoSearch);
            this.tlName = this.ticketNoSearch.leadTicketNo;
          }
        );
    }
  }


  onOptionsSelectedColor(variant) {
    // if (this.currentOpration != 'orderSearch') {
      // alert('variant')
      this.orderManagementService.ColourSearchFn(variant)
        .subscribe(
          data => {
            this.ColourSearch = data;
            console.log(this.ColourSearch);
            let select = this.ColourSearch.find(d => d.variant === variant);
            this.fuelType = select.fuelType;
          }
        );
      if (Number(sessionStorage.getItem('divisionId')) === 2) {
        var model = this.SalesOrderBookingForm.get('model').value;
        var variant = this.SalesOrderBookingForm.get('variant').value;
        this.orderManagementService.dealerShipBaseAmt(model, variant)
          .subscribe(
            data => {
              this.SalesOrderBookingForm.patchValue({ basicValue: data.obj[0].basicValue })
            }
          );
      }
    // }
  }

  onOptionsSelectedVariant(mainModel) {
    // if (this.currentOpration != 'orderSearch') {
    // alert('mainModel')
    this.orderManagementService.VariantSearchFn(mainModel)
      .subscribe(
        data => {
          this.VariantSearch = data;
          console.log(this.VariantSearch);
        }
      );
    // }
  }



  // public  searchByAccountNo(accountNo) {
  //     this.orderManagementService.accountNoSearchFn(accountNo, this.ouId,this.divisionId)
  //       .subscribe(
  //         data => {
  //           this.accountNoSearch = data.obj;
  //           console.log(this.accountNoSearch);
  //           this.SalesOrderBookingForm.patchValue(this.accountNoSearch);
  //           this.paymentTermId = data.obj.termId;
  //           this.payTermDesc = data.obj.paymentType;
  //         }
  //       );
  //   }

  onOptionsSelectedlncategoryType(orderType) {
    // alert(orderType);
    // alert(this.invType);
    this.orderManagementService.getItemByCatType(orderType, 1)
      .subscribe(
        data => {
          this.invItemList1 = data;
          this.orderedItem = data.description;
        }
      );
  }



  addDiscount(i) {
    // alert(i);
    console.log(this.SalesOrderBookingForm.get('oeOrderLinesAllList').value);
    let controlinv1 = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
    let controlinv = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
    var invLineNo = controlinv1[i].lineNumber;
    var invLineItemId = controlinv1[i].itemId;
    var taxCategoryId = controlinv1[i].taxCategoryId;
    // alert(taxCategoryId)
    console.log(controlinv1[i].taxCategoryId);
    // this.activeLineNo = invLineNo;
    var baseAmt = controlinv1[i].baseAmt;
    // alert(baseAmt);
    var patch = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
    var arrayControlTax = this.SalesOrderBookingForm.get('taxAmounts').value;
    var index = Number(arrayControlTax[1].invLineNo);
    var diss1 = 0;
    var diss2 = 0;
    var diss3 = 0;
    var diss4 = 0;
    var diss5 = 0;
    if (arrayControlTax[0] != undefined && arrayControlTax[0].taxTypeName.includes('Disc')) {
      diss1 = arrayControlTax[0].totTaxAmt;
    }
    if (arrayControlTax[1] != undefined && arrayControlTax[1].taxTypeName.includes('Disc')) {
      diss2 = arrayControlTax[1].totTaxAmt;
    }
    if (arrayControlTax[2] != undefined && arrayControlTax[2].taxTypeName.includes('Disc')) {
      diss3 = arrayControlTax[2].totTaxAmt;
    }
    if (arrayControlTax[3] != undefined && arrayControlTax[3].taxTypeName.includes('Disc')) {
      diss4 = arrayControlTax[3].totTaxAmt;
    }
    if (arrayControlTax[4] != undefined && arrayControlTax[4].taxTypeName.includes('Disc')) {
      diss5 = arrayControlTax[4].totTaxAmt;
    }
    // var itemId = controlinv1[index - 1].itemId;
    this.service.taxCalforItemwithMulDisc(sessionStorage.getItem('ouId'), taxCategoryId, baseAmt, diss1, diss2, diss3, diss4, diss5)
      .subscribe(
        (data: any[]) => {
          this.taxCalforItem = data;
          for (let i = 0, j = index; i < this.taxCalforItem.length; i++, j++) {
            (patch.controls[i]).patchValue(
              {
                amount: this.taxCalforItem[i].totTaxAmt,
                invLineNo: Number(i + 1),
              }
            );
          }
          // alert('Invoice Line Number' +'--' + invLineNo)
          this.patchResultList(i, this.taxCalforItem, invLineNo, invLineItemId);
          var arrayupdateTaxLine = this.SalesOrderBookingForm.get('taxAmounts').value;
          // this.taxMap.set(i, arrayupdateTaxLine);
          // alert('map'+''+ this.taxMap.size)
        });
  }



  patchResultList(i, taxCalforItem, invLineNo, invLineItemId) {
    // alert( 'Discount Add Inv Line Number' +'--- '+ invLineNo)
    alert('Tax has been applied.')
    let control = this.SalesOrderBookingForm.get('taxAmounts') as FormArray
    control.clear();
    // alert('in patch' + this.taxCalforItem);
    taxCalforItem.forEach(x => {
      console.log('in patch' + taxCalforItem);
      console.log(x.taxRateName);
      control.push(this.fb.group({
        totTaxAmt: x.totTaxAmt,
        lineNumber: x.lineNumber,
        taxRateName: x.taxRateName,
        taxTypeName: x.taxTypeName,
        taxPointBasis: x.taxPointBasis,
        precedence1: x.precedence1,
        precedence2: x.precedence2,
        precedence3: x.precedence3,
        precedence4: x.precedence4,
        precedence5: x.precedence5,
        precedence6: x.precedence6,
        precedence7: x.precedence7,
        precedence8: x.precedence8,
        precedence9: x.precedence9,
        precedence10: x.precedence10,
        currencyCode: x.currencyCode,
        totTaxPer: x.totTaxPer,
        recoverableFlag: x.recoverableFlag,
        selfAssesedFlag: x.selfAssesedFlag,
        inclusiveFlag: x.inclusiveFlag,
        invLineNo: invLineNo,
        // invLineItemId: itemId
      }));
    });
    console.log(control);
  }

  selTaxCatNm: string = '';




  onKey(index, pricingQty) {
    // alert(index +'Onkey Alert' +'---'+fldName)
    var arrayControl = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
    var pricingQty = arrayControl[index].pricingQty;
    console.log(pricingQty);
    var patch = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    console.log(arrayControl);
    var itemId = arrayControl[index].itemId;
    var taxcatName = arrayControl[index].taxCategoryName;
    // alert(index + '-----' + taxcatName)
    // alert(arrayControl[index].invType);
    // alert(arrayControl[index].invType.includes('ADDON_INS'))
    if (arrayControl[index].isTaxable === 'N') {
      // alert('addon')
      var baseAmt = arrayControl[index].unitSellingPrice * arrayControl[index].pricingQty;
      (patch.controls[index]).patchValue({
        baseAmt: baseAmt,
        taxAmt: 0,
        totAmt: baseAmt,
      });
      (patch.controls[index]).patchValue({
        flowStatusCode: 'BOOKED'
      });
    }
    if (arrayControl[index].isTaxable != 'N' && (taxcatName != null || taxcatName != '')) {
      console.log(taxcatName);
      var taxCategoryId = arrayControl[index].taxCategoryId;
      // alert(taxCategoryId)
      patch.controls[index].patchValue({ disAmt: 0 });
      var baseAmt = arrayControl[index].unitSellingPrice * pricingQty;
      var disAmt1 = 0;
      var invLineNo1 = Number(index + 1);
      console.log(invLineNo1);
      var sum = 0;
      var lineTotAmt = 0;
      // alert(itemId+'---'+ taxCategoryId+'----'+disAmt1+'----'+baseAmt);
      this.service.taxCalforItem(itemId, taxCategoryId, disAmt1, baseAmt)
        .subscribe(
          (data: any[]) => {
            this.taxCalforItem = data;
            console.log(this.taxCalforItem);

            for (let i = 0; i < this.taxCalforItem.length; i++) {

              if (this.taxCalforItem[i].totTaxPer != 0) {
                sum = sum + this.taxCalforItem[i].totTaxAmt
              }
            }
            lineTotAmt = Math.round(((baseAmt + sum - disAmt1) + Number.EPSILON) * 100) / 100;
            (patch.controls[index]).patchValue({
              baseAmt: Math.round((baseAmt + Number.EPSILON) * 100) / 100,
              taxAmt: Math.round((sum + Number.EPSILON) * 100) / 100,
              totAmt: Math.round(((baseAmt + sum - disAmt1) + Number.EPSILON) * 100) / 100,
            });
            let controlinv1 = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
            let distAmtArray = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
            console.log(controlinv1);
            this.TaxDetailsArray().clear();
            for (let i = 0; i < data.length; i++) {
              var invLnGrp: FormGroup = this.TaxDetailsGroup();
              controlinv1.push(invLnGrp);
              (controlinv1.controls[i]).patchValue({
                invLineNo: Number(index + 1),
              });
            }
            this.SalesOrderBookingForm.get('taxAmounts').patchValue(data);
            var disValue = data[0].totTaxAmt;
            if (disValue > 0 && data[0].taxTypeName.includes('Discount')) {
              patch.controls[index].patchValue({ disAmt: data[0].totTaxAmt });
            }
            else {
              patch.controls[index].patchValue({ disAmt: 0 });
            }
            let taxMapData = this.SalesOrderBookingForm.get('taxAmounts').value;
            var ln: string = String(index);
            this.taxMap.set(ln, taxMapData);
            // alert('added to map onkey' + index)
            console.log(this.taxMap.get(ln));
            this.updateTotAmtPerline(index);
            // this.updateTotAmtPerline(index);

          });

    }
    else {
      this.updateTotAmtPerline(index);
    }




  }


  ontaxCateChange(i, event) {
    alert('in tax Catgeory' + event)
    if (event === this.selTaxCatNm) {
      alert('same tax Catgeory')
    }
    else {
      this.onKey(i, 'tax');
    }

  }


  //   addRow(i) {
  //     this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
  //     var len = this.orderlineDetailsArray().length;
  //      this.isVisible2 = true;
  //     this.displaysegmentInvType.push(true);
  //     this.displaytaxCategoryName.push(true);
  //     var patch = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
  //     (patch.controls[len - 1]).patchValue(
  //       {
  //         lineNumber: len,
  //         flowStatusCode: 'BOOKED'
  //       }
  //     );
  //     this.displayCounterSaleLine.push(true);
  //     this.displaysegmentInvType.push(true);
  //     this.displayLineflowStatusCode.push(false);
  //     this.displaytaxCategoryName.push(true);
  //     this.displayRemoveRow.push(true);
  //   // }
  // }
  // RemoveRow(OrderLineIndex){
  //   this.orderlineDetailsArray().removeAt(OrderLineIndex);   
  // }

  // RemoveRow(index) {
  //   if (index === 0) {
  //     alert('first alert')
  //   } else {
  //     alert('second alert')
  //     for (let i=0;this.lstgetOrderLineDetails.length;i++){
  //     alert(this.lstgetOrderLineDetails[0].lineNumber);
  //     this.lstgetOrderLineDetails[i].removeAt(this.lineNumber);
  //   }
  //   }
  //   // index=index+1;
  //   // this.TaxDetailsArray().delete(index);

  // }







  addRow(i) {
    // alert(i);
    var trxLnArr1 = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
    if (i > -1) {
      var len1 = i;
      if (trxLnArr1[len1] != undefined) {
        // this.isDisabled10=false;
        console.log(trxLnArr1[len1].pricingQty);
        var itemqty = trxLnArr1[len1].pricingQty;
        var item = trxLnArr1[len1].segment;
        var itemid = trxLnArr1[len1].itemId;
        if (item === '' || itemqty === '') {
          alert('Please enter data in blank field');
          return;
        }
        this.displayRemoveRow.push(true);
        this.displayCounterSaleLine.push(true);
        this.displayLineflowStatusCode.push(true);
      }
    }
    this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
    var len = this.orderlineDetailsArray().length;
    var patch = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;

    (patch.controls[len - 1]).patchValue(
      {
        lineNumber: len,
        flowStatusCode: 'BOOKED',
      }
    );
    this.isVisible2 = true;
    // this.displaysegmentInvType.push(true);
    // this.displaytaxCategoryName.push(true);
    this.displayRemoveRow[len - 1] = true;
    this.displayCounterSaleLine.push(true);
    this.displaysegmentInvType.push(true);
    this.displayLineflowStatusCode.push(false);
    this.displaytaxCategoryName.push(true);
    this.displayRemoveRow.push(true);
    // var ln = len - 1;
    // this.setFocus('itemSeg' + ln);
  }




  refresh() {
    window.location.reload();
  }
  close() {
    this.router.navigate(['admin']);
  }


  // order Save Function 
  transData(val) {
    // delete val.categoryId;
    return val;
  }


  OrderBooked() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Order Creation is progress....Do not refresh the Page'
    this.ouId = Number(sessionStorage.getItem('ouId'))
    const formValue: ISalesBookingForm = this.transData(this.SalesOrderBookingForm.getRawValue());
    formValue.flowStatusCode = 'BOOKED';
    formValue.accountNo = this.SalesOrderBookingForm.get('accountNo').value;
    formValue.ouId = Number(sessionStorage.getItem('ouId'));
    formValue.divisionId = Number(sessionStorage.getItem('divisionId'));
    formValue.deptId = Number(sessionStorage.getItem('deptId'));
    this.orderManagementService.OrderBook(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.orderNumber = res.obj;
        console.log(this.orderNumber);
        this.isDisabled = false;
        alert(res.message);
        this.SalesOrderBookingForm.get('accountNo').disable();
        this.displayorderDetails = false;
        this.displayVehicleDetails = false;
        this.OrderFind(this.orderNumber);
        this.dataDisplay = ''
        this.closeResetButton = true;
        // this.SalesOrderBookingForm.reset();
      } else {
        if (res.code === 400) {
          this.isDisabled = true;
          alert(res.message);
          this.dataDisplay = 'Order Creation Failed...!'
          this.closeResetButton = true;
          // this.SalesOrderBookingForm.reset();
        }
      }
    });
  }







  OrderFind(orderNumber) {
    // alert(orderNumber)
    this.displaySalesLines = false;
    this.displayAllButtons = false;
    this.displayCreateOrderButton = true;
    this.displayCustomerSite = false;
    this.isDisabled3 = true;
    this.isDisabled4 = true;
    this.isDisabled8= false;
    this.currentOpration = 'orderSearch';
    this.SalesOrderBookingForm.get('custName').disable();
    this.SalesOrderBookingForm.get('mobile1').disable();
    this.emplId = Number(sessionStorage.getItem('emplId'))
    this.orderlineDetailsArray().clear();
    this.TaxDetailsArray().clear();
    this.orderManagementService.getsearchByOrderNo(orderNumber)
      .subscribe(
        data => {
          if (data != null) {
            this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
            this.lstgetOrderTaxDetails = data.obj.taxAmounts;
            this.allDatastore = data.obj;
            var colorCode = data.obj.color;
            this.SalesOrderBookingForm.patchValue({ billToAddress: data.obj.custAddress });
            this.SalesOrderBookingForm.patchValue({ shipToAddress: data.obj.custAddress });
            this.SalesOrderBookingForm.patchValue({ priceListHeaderId: data.obj.priceListId });
            this.SalesOrderBookingForm.patchValue({ custTaxCat: data.obj.taxCategoryName });
            this.SalesOrderBookingForm.patchValue({ fuelType: data.obj.fuelType });
            this.SalesOrderBookingForm.patchValue({ name: data.obj.billLocName });
            this.isVisible6 = true;
            if (data.obj.financeType != 'None') {
              this.DisplayfinanceSelectionYes = false;
              this.DisplayfinanceSelectionYes1 = false;
              this.SalesOrderBookingForm.patchValue({ financerName: data.obj.financerName });
              this.SalesOrderBookingForm.patchValue({ financeAmt: data.obj.financeAmt });
              this.SalesOrderBookingForm.patchValue({ tenure: data.obj.tenure });
              this.SalesOrderBookingForm.patchValue({ emi: data.obj.emi });
              this.SalesOrderBookingForm.patchValue({ downPayment: data.obj.emi });
              this.orderManagementService.finananceList(data.obj.financeType, sessionStorage.getItem('divisionId'))
                .subscribe(
                  data => {
                    this.financerNameList = data;
                    console.log(this.financerNameList);
                  }
                );
            }
            if (data.obj.orderStatus === 'INVOICED') {
              this.isVisible2 = true;
            }
            if (data.obj.flowStatusCode === 'CLOSED') {
              this.isVisible2 = false;
              this.isVisible6 = false;
              this.isDisabled6 = true;
            }
            if (data.obj.exchangeYes === 'Y') {
              this.Displayexchange = false;
            }
            let control = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
            // alert(this.lstgetOrderLineDetails.length);
            if (this.lstgetOrderLineDetails.length === 0 && this.lstgetOrderTaxDetails.length === 0) {
              this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
              this.TaxDetailsArray().push(this.TaxDetailsGroup());
              this.displayLineTaxDetails = true;
              this.displaysegmentInvType[0] = true;
              if (data.obj.flowStatusCode === 'BOOKED') {
                this.op = 'insert';
                this.displayLineTaxDetails = false;
                this.orderlineDetailsGroup();
                var patch = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray
                (patch.controls[0]).patchValue(
                  {
                    lineNumber: 1,
                  }
                );
                this.isVisible2 = true;
                this.isVisible3 = false;
                this.isVisible5 = true;
              }

              this.displayVehicleDetails = true;
              var variantNew = data.obj.variant;
              this.SalesOrderBookingForm.patchValue({ color: data.obj.color });
              this.orderManagementService.ColourSearchFn(variantNew)
                .subscribe(
                  data => {
                    this.ColourSearch = data;
                    console.log(this.ColourSearch);
                    let selectColo = this.ColourSearch.find(d => d.ColorCode === colorCode);
                    this.SalesOrderBookingForm.patchValue({ color: selectColo.ColorCode })
                  }
                );
            }
            else {
              for (let i = 0; i < this.lstgetOrderLineDetails.length; i++) {
                var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
                control.push(oeOrderLinesAllList1);
                this.op = 'Search';
                this.displayLineTaxDetails = false;
                this.displaysegmentInvType[i] = false;
                this.displayCounterSaleLine.push(false);
                if (data.obj.flowStatusCode === 'ENTERED') {
                  this.isVisible2 = true;
                  // this.isVisible3 = true;
                  this.isVisible3 = false;
                }

                if (this.lstgetOrderLineDetails[i].flowStatusCode === 'BOOKED' || this.lstgetOrderLineDetails[i].flowStatusCode === 'ALLOTED') {
                  this.displaytaxCategoryName[i] = true;
                  this.displayLineflowStatusCode[i] = false;
                  this.isVisible2 = true;
                }
                if (this.lstgetOrderLineDetails[i].flowStatusCode === 'BOOKED') {
                  this.isVisible2 = true;
                  // this.isVisible5 = false;
                }
                if (this.lstgetOrderLineDetails[i].flowStatusCode === 'CANCELLED' || this.lstgetOrderLineDetails[i].flowStatusCode==='DE-ALLOTED'){
               
                  this.isDisabledtaxbtn[i]=true;
                  this.isVisible4 = true;
                  this.isVisible3 = false;
                  this.isVisible5 = false;
                  this.displayLineflowStatusCode[i] = true;
                  this.displayRemoveRow[i] = false;
                  this.displaytaxCategoryName[i] = false;
                  this.SalesOrderBookingForm.get('financeType').disable();
                  this.SalesOrderBookingForm.get('financerName').disable();
                  this.SalesOrderBookingForm.get('financeAmt').disable();
                  this.SalesOrderBookingForm.get('emi').disable();
                  this.SalesOrderBookingForm.get('tenure').disable();
                  this.SalesOrderBookingForm.get('downPayment').disable();
                  this.SalesOrderBookingForm.get('exchange').disable();
                  this.SalesOrderBookingForm.get('loyaltyBonus').disable();
                  this.SalesOrderBookingForm.get('exRegNo').disable();
                  this.SalesOrderBookingForm.get('insCharges').disable();
                  this.SalesOrderBookingForm.get('offerPrice').disable();
                }
                if (this.lstgetOrderLineDetails[i].flowStatusCode === 'INVOICED') {
                  this.isVisible4 = true;
                  this.isVisible3 = false;
                  // this.isVisible3 = false;
                  this.isVisible5 = false;
                  this.displayLineflowStatusCode[i] = true;
                  this.displayRemoveRow[i] = false;
                  this.displaytaxCategoryName[i] = false;
                  this.isDisabledtaxbtn[i]=false;
                  this.SalesOrderBookingForm.get('financeType').disable();
                  this.SalesOrderBookingForm.get('financerName').disable();
                  this.SalesOrderBookingForm.get('financeAmt').disable();
                  this.SalesOrderBookingForm.get('emi').disable();
                  this.SalesOrderBookingForm.get('tenure').disable();
                  this.SalesOrderBookingForm.get('downPayment').disable();
                  this.SalesOrderBookingForm.get('exchange').disable();
                  this.SalesOrderBookingForm.get('loyaltyBonus').disable();
                  this.SalesOrderBookingForm.get('exRegNo').disable();
                  this.SalesOrderBookingForm.get('insCharges').disable();
                  this.SalesOrderBookingForm.get('offerPrice').disable();

                }
                else {
                  this.displayRemoveRow[i] = false;
                  this.displayCounterSaleLine[i] = false;
                  this.isDisabledtaxbtn[i]=false;
                }
                if (this.lstgetOrderLineDetails[i].invType.includes('VEHICLE') === false && this.lstgetOrderLineDetails[i].isTaxable === 'Y' || this.lstgetOrderLineDetails[i].isTaxable === 'N') {
                  this.displaytaxCategoryName[i] = false;
                }
              }
            }
            let control1 = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
            for (let x = 0; x < this.lstgetOrderTaxDetails.length; x++) {
              var invLnNo = (this.lstgetOrderTaxDetails[x].invLineNo);
              var invLn = Number(invLnNo-1);
              // alert(this.lstgetOrderLineDetails[invLn].flowStatusCode)
              if (this.lstgetOrderLineDetails[invLn].flowStatusCode != 'DE-ALLOTED' || this.lstgetOrderLineDetails[invLn].flowStatusCode !='CANCELLED'){
                control1.push(this.TaxDetailsGroup());
                var lenNo = x + 1;
                let taxes = this.lstgetOrderTaxDetails.filter((customer) => (customer.invLineNo === lenNo));
                this.taxMap.set(String(x), taxes);
              }
            }
            this.SalesOrderBookingForm.patchValue(data.obj);
            for (let k = 0; k < this.lstgetOrderLineDetails.length; k++) {
              // alert(this.lstgetOrderLineDetails[k].flowStatusCode)
              if (this.lstgetOrderLineDetails[k].flowStatusCode === 'READY FOR INVOICE') {
                this.displaytaxCategoryName[k] = false;
                this.displayLineflowStatusCode[k] = true;
                this.isVisible3 = true;
                this.isVisible5 = false;
              }
              // else {
              //   this.isVisible3 = false;
              // }
              if (this.lstgetOrderLineDetails[k].invType.includes('SS_ADDON') ===true ||this.lstgetOrderLineDetails[k].invType != 'SS_VEHICLE' && this.lstgetOrderLineDetails[k].flowStatusCode != 'ALLOTED' || this.lstgetOrderLineDetails[k].flowStatusCode != 'READY FOR INVOICE' || this.lstgetOrderLineDetails[k].flowStatusCode != 'INVOICED') {
                this.displayVehicleDetails = true;
                var variantNew = data.obj.variant;
                this.SalesOrderBookingForm.patchValue({ color: data.obj.color })
                this.orderManagementService.ColourSearchFn(variantNew)
                  .subscribe(
                    data => {
                      this.ColourSearch = data;
                      console.log(this.ColourSearch);
                      let selectColo = this.ColourSearch.find(d => d.ColorCode === colorCode);
                      this.SalesOrderBookingForm.patchValue({ color: selectColo.ColorCode })
                    }
                  );
              }
              if (this.lstgetOrderLineDetails[k].invType === 'SS_VEHICLE' ||this.lstgetOrderLineDetails[k].invType.includes('SS_ADDON') ===false || this.lstgetOrderLineDetails[k].flowStatusCode === 'READY FOR INVOICE' || this.lstgetOrderLineDetails[k].flowStatusCode === 'INVOICED' || this.lstgetOrderLineDetails[k].flowStatusCode === 'ALLOTED'|| this.lstgetOrderLineDetails[k].flowStatusCode != 'BOOKED') {
                this.SalesOrderBookingForm.patchValue({ colorCode: data.obj.colorDesc })
                this.displayVehicleDetails=false;
              }
            }
            for (let x = 0; x < this.lstgetOrderLineDetails.length; x++) {
              // alert('hi')
              if (this.lstgetOrderLineDetails[x].flowStatusCode === 'INVOICED' && data.obj.gatepassYN === 'N') {
                this.isVisible7 = true;
              }
              if (this.lstgetOrderLineDetails[x].flowStatusCode === 'ALLOTED' && this.lstgetOrderLineDetails[x].invType === 'SS_VEHICLE') {
                //  this.onOptionsSelectedDescription(this.lstgetOrderLineDetails[i].segment,i)
                this.onGstPersantage(this.allDatastore.taxCategoryName, this.lstgetOrderLineDetails[x].gstPercentage, this.lstgetOrderLineDetails[x].taxCategoryName, x)
              }
            }

            this.salesRepName = data.obj.salesRepName;
          }
        }
      )

    this.SalesOrderBookingForm.get('accountNo').disable();
    this.displayorderDetails = false;
    // this.displayVehicleDetails = false;
    this.displayCreateOrderButton = true;
  }

  lineTaxdetails: any = [];
  selTaxLn = '';
  openTaxDetails(i: number) {
    // debugger;
    this.selTaxLn = String(i);
    var i = Number(i + 1);
    this.lineTaxdetails = this.TaxDetailsArray() as FormArray;
    this.lineTaxdetails.clear();
    if (this.taxMap.has(this.selTaxLn)) {
      var taxValues: any = this.taxMap.get(this.selTaxLn);
      for (let x = 0; x < taxValues.length; x++) {
        if (taxValues[x].invLineNo === i) {
          this.lineTaxdetails.push(this.TaxDetailsGroup());
          this.lineTaxdetails.controls[x].patchValue(taxValues[x]);
        }
      }
    }
  }

  closeTaxModal() {
    console.log(this.lineTaxdetails.value);
      // debugger;
    this.SalesOrderBookingForm.get('taxAmounts').patchValue(this.lineTaxdetails.value);
    this.taxMap.set(this.selTaxLn, this.lineTaxdetails.value);
    // alert('added to map closeTaxModal..' + this.selTaxLn)
    this.display = 'none'; //set none css after close dialog
    this.myInputField.nativeElement.focus();
    // debugger;
    var taxValues = this.SalesOrderBookingForm.get('taxAmounts').value;
    var totDisc = 0;
    var totTax = 0;
    for (let i = 0; i < taxValues.length; i++) {
      if (taxValues[i].taxTypeName.includes('Disc')) {
        totDisc = totDisc + taxValues[i].totTaxAmt
      }
      if (taxValues[i].totTaxPer != 0) {
        totTax = totTax + this.taxCalforItem[i].totTaxAmt
      }
    }
    var controlinv1 = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
    var controlinv2 = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var baseAmt = controlinv1[this.selTaxLn].baseAmt;
    var lineTotAmt = Math.round(((baseAmt - totDisc + totTax) + Number.EPSILON) * 100) / 100;
    (controlinv2.controls[this.selTaxLn]).patchValue({
      baseAmt: Math.round((baseAmt + Number.EPSILON) * 100) / 100,
      taxAmt: Math.round((totTax + Number.EPSILON) * 100) / 100,
      totAmt: lineTotAmt,
    });

  }
  transDatafin(val) {
    delete val.basicValue;
    delete val.billLocName;
    delete val.billToAddress;
    delete val.color;
    delete val.custAddress;
    delete val.custTaxCat;
    delete val.customerId;
    delete val.customerSiteId;
    delete val.divisionName;
    delete val.emplId;
    delete val.flowStatusCode;
    delete val.fuelType;
    delete val.locCode;
    delete val.locId;
    delete val.locationId;
    delete val.offerPrice;
    delete val.orderedDate;
    delete val.ouId;
    delete val.ouName;
    delete val.name;
    delete val.payTermDesc;
    delete val.paymentTermId;
    delete val.priceListHeaderId;
    delete val.priceListName;
    delete val.remarks;
    delete val.salesRepName;
    delete val.shipLocName;
    delete val.shipToAddress;
    delete val.subDealerDesc;
    delete val.subDealerId;
    delete val.subDealerName;
    delete val.subtotal;
    delete val.taxCategoryName;
    delete val.tcs;
    delete val.ticketNo;
    delete val.tlName;
    delete val.totAmt;
    delete val.totTax;
    delete val.transactionTypeName;
    delete val.variant;
    delete val.taxAmounts;
    delete val.oeOrderLinesAllList;
    return val;
  }

  finexchangeUpdate() {
    const formValue: IFinanaceExchangeDetails = this.transDatafin(this.SalesOrderBookingForm.value);
    // var finexDetails = new IFinanaceExchangeForm();
    this.isDisabled5 = true;
    this.orderManagementService.finexchangeUpdate(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.OrderFind(this.orderNumber);
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.isDisabled5 = false;
        }
      }
    });
  }

  TaxCategoryupdate(index) {
    // alert(this.orderNumber)
    const formValue: AccOrderLinesPost1 = this.transData(this.SalesOrderBookingForm.value);
    formValue.orderNumber = this.orderNumber;
    var accLines = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
    var taxAmounts: FormArray = this.SalesOrderBookingForm.get('taxAmounts').value;
    var taxAmounts1 = this.SalesOrderBookingForm.get('taxAmounts');
    var req = new Array();
    for (let i = 0; i < accLines.length; i++) {
      for (let j = 0; j < taxAmounts.length; j++) {
        taxAmounts[j].invLineNo = accLines[i].lineNumber;
      }
      var accArr1 = accLines[index];
      accArr1['orderNumber'] = formValue.orderNumber;
      accArr1['taxAmounts'] = taxAmounts;
      accArr1['invLineNo'] = Number(index + 1);
      req.push(accArr1);
    }

    if (this.lstgetOrderLineDetails[index].invType === 'SS_VEHICLE' && this.lstgetOrderLineDetails[index].flowStatusCode === 'ALLOTED') {
      this.orderManagementService.UpdateTaxCategoryLineWise(req[0]).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.OrderFind(this.orderNumber);
          this.orderLineUpdate()
        } else {
          if (res.code === 400) {
            alert(res.message);
          }
        }
      });
    }
    else {
      alert('Vehicle already Invoice');
    }
  }




  onOptionTaxCatSelected(event: any, i) {
    // alert(event)
    console.log(event);
    var taxObj = event.target.value;
    this.indexVal = i;
    var arrayControl = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
    let controlinv = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
    let controlinv2 = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var baseAmt = arrayControl[i].baseAmt;
    var itemId = arrayControl[i].itemId;
    let select = this.taxCategoryList[i].find(d => d.taxCategoryName === taxObj);
    console.log(this.taxCategoryList[i]);


    console.log(select);

    var taxCategoryId = select.taxCategoryId;
    console.log(taxCategoryId);
    // controlinv.controls[i].patchValue({taxCategoryId:select.taxCategoryId});
    // debugger;
    (controlinv2.controls[i]).patchValue({
      taxCategoryId: taxCategoryId,
    });
    var diss = 0;
    var sum = 0;
    if (baseAmt != undefined) {
      this.service.taxCalforItem(itemId, taxCategoryId, diss, baseAmt)
        .subscribe(
          (data: any[]) => {
            this.lstgetOrderTaxDetails = data;
            console.log(this.lstgetOrderTaxDetails);
            let controlinv1 = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
            this.TaxDetailsArray().clear();
            // alert(data.length);
            for (let j = 0; j < data.length; j++) {
              var invLnGrp: FormGroup = this.TaxDetailsGroup();
              controlinv1.push(invLnGrp);
              controlinv1.controls[j].patchValue({
                invLineNo: Number(i + 1),
              })
              this.lstgetOrderTaxDetails[j].invLineNo = Number(i + 1);
            }
            //  = Math.round(((baseAmt + sum - disAmt1) + Number.EPSILON) * 100) / 100;
            (controlinv1.controls[i]).patchValue({
              baseAmt: Math.round((baseAmt + Number.EPSILON) * 100) / 100,
              taxAmt: Math.round((sum + Number.EPSILON) * 100) / 100,
              totAmt: Math.round(((baseAmt + sum - diss) + Number.EPSILON) * 100) / 100,
            });
            this.SalesOrderBookingForm.get('taxAmounts').patchValue(data);
            this.invLineNo = Number(i + 1);
            let taxMapData = this.SalesOrderBookingForm.get('taxAmounts').value;
            this.taxMap.set(String(i), this.lstgetOrderTaxDetails);
            //alert('Added to map key '+String(i));
            //this.openTaxDetails(i)
          }
        )
    }
    // }
  }




  orderLineUpdate() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Order Line Save is progress....Do not refresh the Page'
    var orderLines = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
    let jsonData = this.SalesOrderBookingForm.value;
    let salesObj = Object.assign(new SalesOrderobj(), jsonData);
    salesObj.setoeOrderLinesAllList(orderLines);
    var taxStr = [];
    // debugger;
    this.isDisabled11 = true;
    for (let k = 0; k < orderLines.length; k++) {
      if (orderLines[k].isTaxable === 'Y') {
        orderLines[k].taxCategoryName = orderLines[k].taxCategoryName.taxCategoryName;
      }
     if (orderLines[k].invType === 'SS_VEHICLE' && orderLines[k].flowStatusCode != 'INVOICED' ){
      // alert('hhh222')
        if (orderLines[k].invType.includes('SS_ADDON') && orderLines[k].flowStatusCode === 'READY FOR INVOICE') {
          alert('First Create Vehicle Invoice!.');
          this.dataDisplay = 'First Create Vehicle Invoice!.....Do not refresh the Page';
          this.isDisabled11 = false;
          this.OrderFind(this.orderNumber)
          return;
        }
      }
    }
    console.log(this.taxMap.values());
    // return;
    for (let taxlinval of this.taxMap.values()) {
      // alert(taxlinval.length +'---')
      for (let i = 0; i < taxlinval.length; i++) {
        taxStr.push(taxlinval[i]);
      }
    }
    salesObj.settaxAmounts(taxStr);
    this.orderManagementService.UpdateSalesUpdateLine(JSON.stringify(salesObj)).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.OrderFind(this.orderNumber);
        this.isDisabled11 = false;
        this.dataDisplay = ''
        this.closeResetButton = true;
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.isDisabled11 = false;
          this.dataDisplay = ''
          this.closeResetButton = true;
          // this.SalesOrderBookingForm.reset();
        }
      }
    });
  }


  downloadInvoice() {
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.orderManagementService.downloadVehicleINV(this.orderNumber)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      });
  }

  SOA() {
    this.isDisabled7 = true;
    const fileName = 'download.pdf';
    // const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.orderManagementService.downloadSoa(this.orderNumber)
      .subscribe(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
        // saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      });
  }


  downloadAddonInvoice() {
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.orderManagementService.downloadAddonINV(this.orderNumber)
      .subscribe(data => {
        saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
      });
  }


  taxDetails(op, i, taxCategoryId) {
    // alert('hi'+' ' +op+'-' +i);
    // alert(this.displayCounterSaleLine[i]);
    this.selectedLine = i;
    if (op === 'Search') {
      // alert('Serach Of item Category')
      // .controls[i].get('taxAmounts')
      let taxControl = this.TaxDetailsArray() as FormArray
      if (taxControl != undefined) {
        taxControl.clear();
      }
      var taxItems: any[] = this.allDatastore.taxAmounts;
      var k = Number(i) + 1

      taxItems.forEach(x => {
        // alert(x.invLineNo +'--'+k);
        if (x.invLineNo === k) {
          console.log('in patch' + taxItems);
          console.log(x.totTaxAmt);
          taxControl.push(this.fb.group({
            totTaxAmt: x.totTaxAmt,
            lineNumber: x.lineNumber,
            taxRateName: x.taxRateName,
            taxTypeName: x.taxTypeName,
            taxPointBasis: x.taxPointBasis,
            precedence1: x.precedence1,
            precedence2: x.precedence2,
            precedence3: x.precedence3,
            precedence4: x.precedence4,
            precedence5: x.precedence5,
            precedence6: x.precedence6,
            precedence7: x.precedence7,
            precedence8: x.precedence8,
            precedence9: x.precedence9,
            precedence10: x.precedence10,
            currencyCode: x.currencyCode,
            totTaxPer: x.totTaxPer,
            recoverableFlag: x.recoverableFlag,
            selfAssesedFlag: x.selfAssesedFlag,
            inclusiveFlag: x.inclusiveFlag,
            invLineNo: x.invLineNo,
          }));
        }
      });
    }
    else {
      // alert('Hi');
      this.poLineTax = i;
      var itemId = this.invItemList1[i].itemId;
      // var taxCategoryId = taxCategoryId;
      // this.taxCategoryId = taxCategoryId;
      // var diss = 0;
      var arrayControl = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value
      var dissAmt1 = 0;
      var taxCatNm: string = arrayControl[i].taxCategoryName;
      var taxCategoryId = arrayControl[i].taxCategoryId;
      // alert(taxCatNm);
      console.log(arrayControl);
      var itemId = arrayControl[i].itemId;
      var baseAmt = arrayControl[i].unitSellingPrice * arrayControl[i].pricingQty;
      this.service.taxCalforItem(itemId, taxCategoryId, dissAmt1, baseAmt)
        .subscribe(
          (data: any[]) => {
            this.taxCalforItem = data;
            var sum = 0;
            for (i = 0; i < this.taxCalforItem.length; i++) {
              if (this.taxCalforItem[i].totTaxPer != 0) {
                sum = sum + this.taxCalforItem[i].totTaxAmt
              }
            }
            this.TaxDetailsArray().clear()
            for (let i = 0; i < this.taxCalforItem.length; i++) {
              var invLnGrp: FormGroup = this.TaxDetailsGroup();
              this.TaxDetailsArray().push(invLnGrp);
              this.SalesOrderBookingForm.get('taxAmounts').patchValue(this.taxCalforItem);
            }

          });
    }
  }

  viewAllInvoice() {
    this.isDisabled9 = true;
    this.orderManagementService.viewAllInvoice(this.orderNumber)
      .subscribe(
        data1 => {
          this.viewAllInvoiceData = data1;
          console.log(this.taxCategoryList);
          this.isDisabled9 = false;
        }
      );
  }

  downloadAllInvoice(invType, trxNumber) {
    // alert(invType)
    if (invType === 'SS_VEHICLE') {
      this.orderManagementService.downloadVehicleINV(this.orderNumber)
        .subscribe(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          var printWindow = window.open(url, '', 'width=800,height=500');
          printWindow.open
        });
    }
    else {
      // alert(invType);
      this.orderManagementService.downloadAddonINV(trxNumber)
        .subscribe(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          var printWindow = window.open(url, '', 'width=800,height=500');
          printWindow.open
        });
    }
  }

  RemoveRow(index) {
    if (index === 0) {
    }
    else {
      this.orderlineDetailsArray().removeAt(index);
      this.TaxDetailsArray().removeAt(index);
    }
  }
  createInvoice() {
    this.closeResetButton = false;
    this.progress = 0;
    this.dataDisplay = 'Invoice Creation is progress....Do not refresh the Page'
    this.isDisabled8 = true;
    this.orderManagementService.createInvoiceAll(this.orderNumber, (sessionStorage.getItem('emplId'))).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.OrderFind(this.orderNumber);
        this.isDisabled8 = true;
        this.dataDisplay = ''
        this.closeResetButton = true;
      } else {
        if (res.code === 400) {
          alert(res.message);
          this.isDisabled8 = false;
          this.dataDisplay = ''
          this.closeResetButton = true;
        }
      }
    }
    );
  }
  searchByContact(contactNo) {
    this.service.searchCustomerByContact(contactNo)
      .subscribe(
        data => {
          this.accountNoSearch = data.obj;
          console.log(this.accountNoSearch);
          this.SalesOrderBookingForm.patchValue(this.accountNoSearch[0]);
          // this.city = this.lstcomments.city
          this.SalesOrderBookingForm.patchValue({
            panNo: this.accountNoSearch[0].customerSiteMasterList[0].panNo,
            gstNo: this.accountNoSearch[0].customerSiteMasterList[0].gstNo
          });
          // var title1=this.titleList.find(d=>d.code===this.accountNoSearch[0].title);
          var payTerm = this.payTermDescList.find(d => d.lookupValueId === this.accountNoSearch[0].termId);
          this.SalesOrderBookingForm.patchValue({ title: this.accountNoSearch[0].title, paymentType: payTerm.lookupValueId });
        }
      );
  }

  // Select(custAccountNo) {
  //   // alert(custAccountNo)
  //   if (custAccountNo !=undefined){
  //   this.searchByAccountNo(custAccountNo)
  // }
  // }



  accountNoSearchNew(custAccountNo) {
    this.service.searchCustomerByAccount(custAccountNo)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.selCustomer = data.obj;
            this.custSiteList = data.obj.customerSiteMasterList;
            this.SalesOrderBookingForm.patchValue({ tcsYN: data.obj.tcsYN });
            this.SalesOrderBookingForm.patchValue({ tcsPer: data.obj.tcsPer });
            this.SalesOrderBookingForm.patchValue({ accountNo: custAccountNo });
            let select = this.payTermDescList.find(d => d.lookupValueId === this.selCustomer.termId);
            // this.payTermDesc = select.lookupValue;
            this.SalesOrderBookingForm.patchValue({ payTermDesc: select.lookupValue })
            this.SalesOrderBookingForm.get('custName').disable();
            this.SalesOrderBookingForm.get('mobile1').disable();
            for (let i = 0; i < this.custSiteList.length; i++) {
              // alert(this.custSiteList.length + '----' + this.custSiteList[i].ouId + '-----' + sessionStorage.getItem('ouId'));
              if (this.custSiteList.length === 1 && Number(this.custSiteList[i].ouId) === Number(sessionStorage.getItem('ouId'))) {
                this.SalesOrderBookingForm.patchValue({ name: this.custSiteList[0].siteName });
                this.onOptionsSelectedcustSiteName(this.custSiteList[0].siteName);
              }
              if (this.custSiteList.length > 1) {
                if (Number(this.custSiteList[i].ouId) === Number(sessionStorage.getItem('ouId'))) {
                  this.SalesOrderBookingForm.patchValue({ name: this.custSiteList[i].siteName });
                  //  this.onOptionsSelectedcustSiteName(this.custSiteList[i].siteName);
                }
              }
              else if (this.custSiteList[i].ouId != (sessionStorage.getItem('ouId'))) {
                alert('Please Create/Select Operating Unit wise Site to continue process!')
              }
            }
            var custName = data.obj.custName;
            this.isDisabled3 = true;
            this.customerNameSearch.splice(0, this.customerNameSearch.length);
            console.log(this.customerNameSearch);

            this.SalesOrderBookingForm.get('accountNo').disable();
          }
          else {
            if (data.code === 400) {
              // alert('Error :' + data.message);
              this.display = 'block';
              // this.displaycreateCustomer = false;
            }
          }
        });


  }


  onOptionsSelectedcustSiteName(siteName) {
    //  alert(siteName);
    //  alert(sessionStorage.getItem('ouId'));
    let selSite = this.custSiteList.find(d => d.siteName === siteName);
    console.log(selSite);
    // alert(selSite.ouId);

    if (selSite.ouId != (sessionStorage.getItem('ouId'))) {
      alert('First Create OU wise Site to continue process!')
    }
    else {
      this.SalesOrderBookingForm.patchValue(selSite);
      this.custName = this.selCustomer.custName;
      this.customerId = this.selCustomer.customerId;
      this.billToAddress = (this.selCustomer.address1 + ', '
        + this.selCustomer.address2 + ', '
        + this.selCustomer.address3 + ', '
        + this.selCustomer.address4 + ', '
        + this.selCustomer.city + ', '
        + this.selCustomer.pinCd + ', '
        + this.selCustomer.state);
      this.shipToAddress = this.billToAddress;
      this.birthDate = this.selCustomer.birthDate;
      this.weddingDate = this.selCustomer.weddingDate;
      // this.taxCategoryName = this.selCustomer.taxCategoryName;
      if (selSite.disPer != null) {
        // alert(selSite.disPer)
        this.SalesOrderBookingForm.patchValue({ discType: 'Header Level Discount' })
        this.SalesOrderBookingForm.patchValue({ disPer: selSite.disPer });
        this.SalesOrderBookingForm.patchValue({ custTaxCat: selSite.taxCategoryName })
        this.orderlineDetailsGroup().patchValue({ disPer: selSite.disPer })
        // this.displaydisPer = false;
        var patch = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
        // alert(patch.length)
        for (let i = 0; i < patch.length; i++) {
          (patch.controls[i]).patchValue({
            disPer: selSite.disPer,
          });
        }
      }
    }


  }

  custNameSearch(custName) {
    // alert(custName)
    this.orderManagementService.custNameSearchFn1(custName, sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.customerNameSearch = data.obj;
            console.log(this.accountNoSearch);
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

  financeSelectionYes(event: any) {
    // alert(event.target.value)
    if (event.target.value != 'None') {
      this.DisplayfinanceSelectionYes = false;
      this.DisplayfinanceSelectionYes1 = false;
      this.orderManagementService.finananceList(event.target.value, sessionStorage.getItem('divisionId'))
        .subscribe(
          data => {
            this.financerNameList = data;
            console.log(this.financerNameList);
          }
        );
    }
    else {
      this.DisplayfinanceSelectionYes = true;
      this.DisplayfinanceSelectionYes1 = true;
    }
    if (event.target.value === 'None') {
      this.SalesOrderBookingForm.get('financerName').reset();
      this.SalesOrderBookingForm.get('financeAmt').reset();
      this.SalesOrderBookingForm.get('emi').reset();
      this.SalesOrderBookingForm.get('tenure').reset;
      this.SalesOrderBookingForm.get('downPayment').reset();
      this.SalesOrderBookingForm.get('tenure').reset();
    }


  }

  exchangeYes(event: any) {
    //  alert(event.target.value);
    if (event.target.value === 'Y') {
      this.Displayexchange = false;
    }
    else {
      this.Displayexchange = true;
    }
    if (event.target.value === 'N') {
      this.SalesOrderBookingForm.get('loyaltyBonus').reset();
      this.SalesOrderBookingForm.get('exRegNo').reset();
      this.SalesOrderBookingForm.get('insCharges').reset();
      this.SalesOrderBookingForm.get('offerPrice').reset();
    }
  }




  updateTotAmtPerline(lineIndex) {
    // alert(lineIndex);
    // var formVal = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var formArr = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var formVal = formArr.getRawValue();
    console.log(formVal);

    // var tcsPer = this.SalesOrderBookingForm.get('tcsPer').value;
    var basicAmt = 0;
    var taxAmt1 = 0;
    var totAmt = 0;
    var disAmt = 0;
    var tcsAmt1 = 0;
    for (let i = 0; i < formVal.length; i++) {
      // debugger;
      if (formVal[i].flowStatusCode === 'BOOKED' || formVal[i].flowStatusCode === 'INVOICED' || formVal[i].flowStatusCode === 'READY FOR INVOICE' || formVal[i].flowStatusCode === 'ALLOTED') {
        if (formVal[i].baseAmt == undefined || formVal[i].baseAmt == null || formVal[i].baseAmt == '') {

        } else {
          basicAmt = basicAmt + Number(formVal[i].baseAmt);
          // alert(basicAmt);
        }

        if (formVal[i].disAmt == undefined || formVal[i].disAmt == null || formVal[i].disAmt == '') {

        } else {
          disAmt = disAmt + Number(formVal[i].disAmt);
        }

        if (formVal[i].taxAmt == undefined || formVal[i].taxAmt == null || formVal[i].taxAmt == '') {
        } else {
          taxAmt1 = taxAmt1 + Number(formVal[i].taxAmt);
        }
        if (formVal[i].totAmt == undefined || formVal[i].totAmt == null || formVal[i].totAmt == '') {

        } else {
          totAmt = totAmt + Number(formVal[i].totAmt);

          // tcsAmt1 = Math.round((totAmt * tcsPer / 100 + Number.EPSILON) * 100) / 100;
          //totAmt = totAmt + tcsAmt1;
        }

      }
      console.log(formArr);
    }

    basicAmt = Math.round(((basicAmt) + Number.EPSILON) * 100) / 100;
    this.SalesOrderBookingForm.patchValue({ 'subtotal': basicAmt });
    disAmt = Math.round(((disAmt) + Number.EPSILON) * 100) / 100;
    this.SalesOrderBookingForm.patchValue({ 'discAmt': disAmt });
    taxAmt1 = Math.round(((taxAmt1) + Number.EPSILON) * 100) / 100;
    this.SalesOrderBookingForm.patchValue({ 'totTax': taxAmt1 });
    totAmt = Math.round(((totAmt) + Number.EPSILON) * 100) / 100;
    this.SalesOrderBookingForm.patchValue({ 'totAmt': totAmt });
    // this.SalesOrderBookingForm.patchValue({ 'tcsAmt': tcsAmt1 });
  }


  updateLineOnCancel(i) {
    var trxArrVal = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
    var trxArr = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    var taxArrVal = this.SalesOrderBookingForm.get('taxAmounts').value;
    var taxArrValpatch = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
    // alert(i+'----'+ trxArrVal[i].flowStatusCode);
    if (trxArrVal[i].flowStatusCode === 'CANCELLED') {
      trxArr.controls[i].patchValue({ 'baseAmt': 0, 'disAmt': 0, 'taxAmt': 0, 'totAmt': 0 });
      for (let j=0; j<taxArrVal.length; j++ ){
        // alert(taxArrVal[j].invLineNo +'-----' + (i+1))
        if (taxArrVal[j].invLineNo=== Number(i+1)){
          // alert('in If')
          taxArrVal[j].totTaxAmt=0;
          taxArrValpatch.controls[i].patchValue({'totTaxAmt': 0});
        }
      }
    }
    this.updateTotAmtPerline(i)
  }

  modelDetailsUpdate(){
    var model= this.SalesOrderBookingForm.get('model').value; 
    var variant= this.SalesOrderBookingForm.get('variant').value; 
    var color= this.SalesOrderBookingForm.get('color').value; 
    var fuelType= this.SalesOrderBookingForm.get('fuelType').value; 
    var basicValue= this.SalesOrderBookingForm.get('basicValue').value;  
    // alert(model+'---'+variant+'----'+color+'---'+fuelType+'---'+basicValue);
    this.orderManagementService.variantDetailsUpdate(this.orderNumber,model,variant,color,basicValue)
    .subscribe(
      res => {
        // if (res.code === 200) {

        // }
      }
    );
  }
}
