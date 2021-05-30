import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
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



interface ISalesBookingForm {
  divisionName: string,
  ouName: string,
  locCode: string,
  ticketNo: string,
  emplId: number;
  orderNumber: number,
  accountNo: number,
  custName: string,
  orderedDate: Date,
  transactionTypeName: string,
  flowStatusCode: string,
  payTermDesc: string,
  salesRepName: string,
  tlName: string,
  remarks: string,
  subtotal: number,
  totTax: number,
  totAmt: number,
  custAddress: string,
  model: string,
  variant: string
  color: string,
  financeType: string,
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
  customerId: string;
  // locName:string;
  billToAddress: string;
  gstNo: string;
  panNo: string;
  invType: string;
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
}

@Component({
  selector: 'app-sales-order-booking',
  templateUrl: './sales-order-booking.component.html',
  styleUrls: ['./sales-order-booking.component.css']
})
export class SalesOrderBookingComponent implements OnInit {
  SalesOrderBookingForm: FormGroup;
  divisionName: string;
  itemId:number;
  ouName: string;
  locCode: string;
  ticketNo: string;
  orderNumber: number;
  accountNo: number;
  custName: string;
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
  category: string;
  hsnSacCode: string;
  emplId: number;
  billLocName: string;
  shipLocName: string;
  ouId: number;
  customerId: string;
  billToAddress: string;
  deptId: number;
  locId: number;
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
  lstgetOrderLineDetails: any[];
  lstgetOrderTaxDetails: any[];
  public financeTypeList: any;
  public financerNameList: any;
  public VariantSearch: any;
  public ticketNoSearch: any;
  public priceListNameList: any;
  public ColourSearch: any;
  public transactionTypeNameList: any;
  public payTermDescList: any;
  public salesRepNameList: any;
  public taxCategoryList: any;

  indexVal: number;
  public orderLines: any[];
  hideArray: Array<boolean> = [];
  displayOrderLine: Array<boolean> = [];
  public ItemIdList: Array<string> = [];
  public mainModelList: Array<string>[];
  // public addonItemList:Array<string>=[];
  public addonItemList: any[];
  public addonDescList: any[];
  public colorCodeList: Array<string>[];
  public taxCalforItem:any;
  displayInsDetails = true;
  displayEWDetails = true;
  lstInvLineDeatails1: any;
  displayfinanceType = true;
  displayfinancerName = true;
  displayfinanceAmt = true;
  displayemi = true;
  displaytenure = true;
  displaydownPayment = true;
  displayorderedDate = true;
  displaytransactionTypeName = true;
  displayflowStatusCode = true;
  displaypayTermDesc = true;
  displaysalesRepName = true;
  displaytlName = true;
  displayremarks = true;
  displayallotmentFlag = true;
  displaymodel = true;
  displayvariant = true;
  displaycolor = true;
  displaysegment = true;
  displaycategory = true;
  displaypricingQty = true;
  displaytaxCategoryName = true;
  displayorderedItem = true;
  displayPrice = true;
  displaypriceListName = true;

  displayorderLineDetailsPart = true;
  lstcommentsbyorderNo: any[];
  taxDetaileSendArr: any = [];
  invItemList1: any[];
  categoryList: any[];

  constructor(private fb: FormBuilder, private location: Location, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.SalesOrderBookingForm = fb.group({
      divisionName: [''],
      ouName: [''],
      locCode: [''],
      ticketNo: [''],
      orderNumber: [''],
      accountNo: [''],
      custName: [''],
      orderedDate: [''],
      transactionTypeName: [''],
      flowStatusCode: [''],
      payTermDesc: [''],
      salesRepName: [''],
      tlName: [''],
      remarks: [''],
      subtotal: [''],
      totTax: [''],
      totAmt: [''],
      custAddress: [''],
      model: [''],
      variant: [''],
      color: [''],
      financeType: [''],
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
      gstNo: [''],
      panNo: [''],
      oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
      // taxAmounts: this.fb.array([this.TaxDetailsArray()])
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
      invLineItemId: [],
      invLineNo: [],
     // taxAmounts: [],
    });
  }

  TaxDetailsArray(): FormArray {
    // return this.lineDetailsArray.controls[].get('taxAmounts') as FormArray
    return <FormArray>this.SalesOrderBookingForm.get('taxAmounts')
  }




  orderlineDetailsGroup() {
    return this.fb.group({
      // lineNumber:[''],
      // segment:[''],
      itemId:[],
      orderedItem: [''],
      pricingQty:[''],
      unitSellingPrice: [''],
      taxCategoryName: [''],
      baseAmt:[''],
      taxAmt:[''],
      totAmt:[''],
      flowStatusCode:[''],
      category:[''],
      itemType:[''],
      hsnSacCode:[''],
      invType:[''],
      taxCategoryId:[''],
      displaysegment: false,
      lineNumber: [''],
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
      // itemType: [''],
      // hsnSacCode: [''],
      // taxAmt: [''],
      // baseAmt: [''],
      // flowStatusCode: [''],
      // totAmt: ['']
    })
  }


  orderlineDetailsArray(): FormArray {
    return <FormArray>this.SalesOrderBookingForm.get('oeOrderLinesAllList')
  }

  //  get f() { return this.SalesOrderBookingForm.controls; }

  SalesOrderBooking(SalesOrderBookingForm: any) {

  }

  ngOnInit(): void {
    this.divisionName = sessionStorage.getItem('divisionName');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.locCode = (sessionStorage.getItem('locCode'));
    this.ticketNo = (sessionStorage.getItem('ticketNo'));
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.deptId = Number(sessionStorage.getItem('deptId'));
    this.locId = Number(sessionStorage.getItem('locId'));


    console.log(this.emplId);

    this.service.taxCategoryListForSALES()
      .subscribe(
        data1 => {
          this.taxCategoryList = data1;
          console.log(this.taxCategoryList);
          data1 = this.taxCategoryList;
        }
      );


    this.orderManagementService.categoryList()
      .subscribe(
        data1 => {
          this.categoryList = data1;
          console.log(this.categoryList);
          data1 = this.categoryList;
        }
      );


    this.orderManagementService.getFinTypeSearch1()
      .subscribe(
        data => {
          this.financeTypeList = data;
          console.log(this.financeTypeList);
        }
      );

    this.orderManagementService.getFinNameSearch()
      .subscribe(
        data => {
          this.financerNameList = data;
          console.log(this.financerNameList);
        }
      );

    // this.service.invItemList1()
    //   .subscribe(
    //     data => {
    //       this.invItemList1 = data;
    //       console.log(this.invItemList1);
    //     }
    //   );

    this.service.mainModelList()
      .subscribe(
        data => {
          this.mainModelList = data;
          console.log(this.mainModelList);
        }
      );


    this.service.colorCodeList()
      .subscribe(
        data => {
          this.colorCodeList = data;
          console.log(this.colorCodeList);
        }
      );

    this.service.transactionTypeNameList(this.deptId, this.locId, this.ouId)
      .subscribe(
        data => {
          this.transactionTypeNameList = data;
          console.log(this.transactionTypeNameList);
        }
      );

    this.service.payTermDescList()
      .subscribe(
        data => {
          this.payTermDescList = data;
          console.log(this.payTermDescList);
        }
      );

    this.orderManagementService.priceListNameList()
      .subscribe(
        data => {
          this.priceListNameList = data;
          console.log(this.priceListNameList);
        }
      );


    this.service.salesRepNameList(this.ouId, this.locId, this.deptId)
      .subscribe(
        data => {
          this.salesRepNameList = data.obj;
          console.log(this.salesRepNameList);
        }
      );


  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  OrderFind(orderNumber) {
    alert(orderNumber);
    this.emplId = Number(sessionStorage.getItem('emplId'))
    this.orderlineDetailsArray().clear();
    this.displayfinanceType = false;
    this.displayfinancerName = false;
    this.displayfinanceAmt = false;
    this.displayemi = false;
    this.displaytenure = false;
    this.displaydownPayment = false;
    this.displayorderedDate = false;
    this.displaytransactionTypeName = false;
    this.displayflowStatusCode = false
    this.displaypayTermDesc = false
    this.displaysalesRepName = false;
    this.displaytlName = false;
    this.displayremarks = false;
    this.displayallotmentFlag = false;
    this.displaymodel = false;
    this.displayvariant = false
    this.displaycolor = false;
    this.displaysegment = false;
    this.displaycategory = false;
    this.displaypricingQty = false;
    this.displaytaxCategoryName = false;
    this.displayorderedItem = false;
    this.displayPrice = false;
    this.displaypriceListName = false;
    this.orderManagementService.getsearchByOrderNo(orderNumber)
      .subscribe(
        data => {
          this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
          this.lstgetOrderTaxDetails = data.obj.taxAmounts;
          // console.log(data.obj.oeOrderLinesAllList[0].taxAmounts);

          let control = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
          let control1 = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
          if (data.obj.flowStatusCode === 'ENTERED') {
            this.displayorderLineDetailsPart = false;
            data.obj.emplId = this.emplId;
            data.obj.locCode = this.locCode;
            data.obj.ouId = this.ouId;
            console.log(data.obj.locCode);

          }
          else {
            this.displayorderLineDetailsPart = true;
          }
          if (this.lstgetOrderLineDetails.length === 0) {
            this.displaycategory = true;
            this.displaypricingQty = true;
            this.displaytaxCategoryName = true;
            this.displayorderedItem = true;
            this.displaysegment = true;
            this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
          }
          else {
            for (let i = 0; i <= this.lstgetOrderLineDetails.length - 1; i++) {
              var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
              control.push(oeOrderLinesAllList1);
            }
          
            for (let i = 0; i < data.obj.oeOrderLinesAllList[0].taxAmounts.length - 1; i++) {
              var invLnGrp: FormGroup = this.TaxDetailsGroup();
              this.TaxDetailsArray().push(invLnGrp);
              this.SalesOrderBookingForm.get('taxAmounts').patchValue(data.obj.oeOrderLinesAllList[0].taxAmounts);
            }
          }
          this.SalesOrderBookingForm.patchValue(data.obj);
        }
      )
    this.SalesOrderBookingForm.controls['emplId'].patchValue(Number(sessionStorage.getItem('emplId')));
  }

  addRow() {
    // if (this.segment===null){
    // this.SalesOrderBookingForm.controls.orderlineDetailsArray[i].displaysegment=false;
    this.displaycategory = true;
    this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
    this.displaysegment = true;
    // }
    // else{
    //   this.displaysegment=true;
    // this.displaycategory=true;
    // this.displaypricingQty=true;
    // this.displaytaxCategoryName=true;
    // this.displayorderedItem=true;
    // this.displayPrice=true;
    // this.displaypriceListName=true;
    // this.orderlineDetailsArray().push(this.orderlineDetailsGroup());  

    // }

  }

  RemoveRow(index) {
    this.orderlineDetailsArray().removeAt(index);
  }

  onOptionTaxCatSelected(taxCategory, i) {
    alert(i);


    var taxCategoryName = taxCategory.taxCategoryName;
    var taxCategoryId = taxCategoryId;
    // var orderNumber=this.orderNumber;
    // var orgId= Number(this.ouId=Number(sessionStorage.getItem('ouId')));
    // alert(orgId);
    this.indexVal = i;
    var arrayControl = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;

    var amount = arrayControl[i].unitSellingPrice;
    alert(amount);
    let select = this.taxCategoryList.find(d => d.taxCategoryName === taxCategoryName);
    this.taxCategoryId= select.taxCategoryId;
    let controlinv = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
    // var taxCategoryId = this.taxCategoryList[0].taxCategoryId;
    alert(taxCategoryId);
    // (controlinv.controls[i]).patchValue({ taxCategoryId: select.taxCategoryId });
    var disAm = 0;
    this.transactionService.getTaxDetails(taxCategoryId, sessionStorage.getItem('ouId'), disAm, amount)
      .subscribe(
        data => {
          this.lstInvLineDeatails1 = data;
          console.log(this.lstInvLineDeatails1);
          let controlinv1 = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
          this.TaxDetailsArray().clear();
          for (let i = 0; i < data.taxLines.length; i++) {
            var invLnGrp: FormGroup = this.TaxDetailsGroup();
            this.TaxDetailsArray().push(invLnGrp);
          }

          this.SalesOrderBookingForm.get('taxAmounts').patchValue(data.taxLines);

        }



      )
  }






  onOptionsSelectedCategory(category: any) {
    if (category === 'SS_ADDON_EW') {
      this.displayEWDetails = false;
    }
    else if (category === 'SS_ADDON_INS') {
      this.displayInsDetails = false;
    }


    this.orderManagementService.getItemByCatType(category,1 )
      .subscribe(
        data => {
          this.invItemList1=data;
          console.log(this.invItemList1);
         // this.addonItemList = data;
          // this.orderedItem=data.description;
        }
      );
  }

  onOptionsSelectedDescription(segment: any, k) {
    let select = this.invItemList1.find(d => d.SEGMENT === segment);
    this.SalesOrderBookingForm.patchValue({itemId:select.itemId})
    this.itemId = select.itemId;
    this.orderManagementService.addonDescList(segment)
      .subscribe(
        data => {
          this.addonDescList = data;
          let controlinv = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
          for(let i=0; i <data.length; i++){
            var taxCatNm : string = data[i].taxCategoryName;
            if(taxCatNm.includes('Sale')){
              
              (controlinv.controls[k]).patchValue({
                itemId: data[i].itemId,                
                orderedItem: data[i].description,
                hsnSacCode: data[i].hsnSacCode,
                taxCategoryId: data[i].taxCategoryId,
                taxCategoryName: data[i].taxCategoryName,
                });
            }
          }
        //   console.log(this.addonDescList[0].description);
        //   this.orderedItem = this.addonDescList[0].description;
        //   this.taxCategoryName = this.addonDescList[0].taxCategoryName;
        //   this.hsnSacCode = this.addonDescList[0].hsnSacCode;
        //   // alert(data.description1);
        //   console.log(this.taxCategoryName);
        
        // (controlinv.controls[k]).patchValue(data
       
      }

      );

  }


  InventIdSelected(event, k) {

    let select = this.invItemList1.find(d => d.segment === event);
    this.invItemId = select.itemId;
    // this.invItemId=Number (sessionStorage.getItem('ouId'));
    let controlinv = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
     (controlinv.controls[k]).patchValue({ itemId: select.itemId , orderedItem:select.description});
  }



  refresh() {
    window.location.reload();
  }
  close() {
    this.router.navigate(['admin']);
  }

  transData(val) {
    // delete val.categoryId;
    return val;
  }


  OrderBooked() {
    // this.flowStatusCode='BOOKED';
    const formValue: ISalesBookingForm = this.transData(this.SalesOrderBookingForm.value);
    formValue.flowStatusCode = 'BOOKED';
    this.orderManagementService.OrderBook(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.orderNumber = res.obj;
        console.log(this.orderNumber);
        alert('RECORD INSERTED SUCCESSFULLY');
        // this.SalesOrderBookingForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          // this.SalesOrderBookingForm.reset();
        }
      }
    });
  }


  AccOrderLineSave() {
    const formValue: AccOrderLinesPost1 = this.transData(this.SalesOrderBookingForm.value);
    var accLines = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
    var taxAmounts = this.SalesOrderBookingForm.get('taxAmounts').value;
    var req = new Array();
    for(let i=0  ; i <accLines.length ; i++){
      var accArr1 = accLines[i];
      accArr1['orderNumber'] = formValue.orderNumber;
      accArr1['taxAmounts'] = taxAmounts;
      req.push(accArr1);
    }
    
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.orderManagementService.AccLineSave(req).subscribe((res: any) => {
      if (res.code === 200) {
        this.orderNumber = res.obj;
        console.log(this.orderNumber);
        alert('RECORD INSERTED SUCCESSFULLY');
        // this.SalesOrderBookingForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          // this.SalesOrderBookingForm.reset();
        }
      }
    });
  }
  paymentReceipt(orderNumber) {
    alert(this.orderNumber);
    this.orderManagementService.getOmReceiptSearchByOrdNo(orderNumber)
      .subscribe(
        data => {
          this.lstcommentsbyorderNo = data.obj.oePayList;
          console.log(this.lstcommentsbyorderNo);
        }
      );
  }



  accountNoSearch(accountNo) {
    this.orderManagementService.accountNoSearchFn(accountNo, this.ouId)
      .subscribe(
        data => {
          this.accountNoSearch = data;
          console.log(this.accountNoSearch);
          this.SalesOrderBookingForm.patchValue(this.accountNoSearch);
        }
      );
  }

  onOptionsSelectedVariant(mainModel) {
    this.orderManagementService.VariantSearchFn(mainModel)
      .subscribe(
        data => {
          this.VariantSearch = data;
          console.log(this.VariantSearch);
        }
      );
  }


  onOptionsSelectedTL(ticketNo) {
    this.orderManagementService.ticketNoSearchFn(ticketNo)
      .subscribe(
        data => {
          this.ticketNoSearch = data.obj;
          console.log(this.ticketNoSearch);
          this.tlName = this.ticketNoSearch.leadTicketNo;
        }
      );
  }

  onOptionsSelectedColor(variant) {
    this.orderManagementService.ColourSearchFn(variant)
      .subscribe(
        data => {
          this.ColourSearch = data;
          console.log(this.ColourSearch);
        }
      );
  }


  onKey(index) {
    console.log(index);

    var arrayControl = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value
    var patch = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    console.log(arrayControl);
    var itemId=arrayControl[index].itemId;
   var baseAmt = arrayControl[index].unitSellingPrice * arrayControl[index].pricingQty;
    alert(arrayControl[index].baseAmtLineWise);
       var diss = 0;
    var sum = 0;
    // var baseAmount = this.sum;
    this.service.taxCalforItem(itemId, this.taxCategoryId, diss, baseAmt)
      .subscribe(
        (data: any[]) => {
          this.taxCalforItem = data;
          console.log(this.taxCalforItem);

          for (let i = 0; i < this.taxCalforItem.length; i++) {

            if (this.taxCalforItem[i].totTaxPer != 0) {
              sum = sum + this.taxCalforItem[i].totTaxAmt
            }
          }
          (patch.controls[index]).patchValue({
            baseAmt: baseAmt,
            // baseAmtLineWise: arrayControl[index].baseAmtLineWise,
            taxAmt: sum,
            totAmt: baseAmt + sum,
          });
        });
  }

  
}



