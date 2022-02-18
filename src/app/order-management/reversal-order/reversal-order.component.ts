import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';

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
import { saveAs } from 'file-saver';


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
  disAmt :number;
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

@Component({
  selector: 'app-reversal-order',
  templateUrl: './reversal-order.component.html',
  styleUrls: ['./reversal-order.component.css']
})
export class ReversalOrderComponent implements OnInit {
  reversalOrderForm: FormGroup;
  invLineNo: number;
  variantDesc: string;
  headerFound=false;
  indReturn=false;
  checkBoxAllItem=true;
  displayLineDetails=true;
  // checkBoxAllItem=true;
  showAllItem=false;
  subDealerDesc: string;
  birthDate: Date;
  cancelledQty:number;
  gstPercentage:Text;
  reversalReason:string;
  emailId1: string;
  colorDesc:string;
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
  disAmt :number;
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
  // accountNoSearch: any[];
  public addonDescList: any[];
  lstgetOrderLineDetails: any[];
  lstgetOrderTaxDetails: any[];
  reversalReasonList:any=[]

  rtnSearch = false;


  rtnDocNo: number;
  rtnDocDate: Date;
  rtnBaseAmt: number;
  rtnDisAmt: number;
  rtnTaxAmt: number;
  rtnTotAmt: number;

  displayButton = true;
  saveButton = false;
  validateStatus = false;
  showQtyRtncol = false;
  lineValidation = false;
  lstOrderItemLines:any=[];
  lineItemRepeated=false;


  constructor(private fb: FormBuilder, private location: Location, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.reversalOrderForm = fb.group({
      orderNumber: [''],
      reversalReason: [''],
      divisionName: [''],
      ouName: [''],
      colorDesc:[''],
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
      rtnDocNo:[''],
      rtnDocDate:[''],
      rtnBaseAmt:[''],
      rtnDisAmt:[''],
      rtnTaxAmt:[''],
      rtnTotAmt:[''],
      oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
    })
  }

  orderlineDetailsGroup() {
    return this.fb.group({
      selectFlag:[''],
      cancelledQty:[''],
      lineNumber: [''],
      tcs: [''],
      itemId: [],
      taxPer:[''],
      gstPercentage:[''],
      uom:[''],
      disPer:[''],
      orderedItem: [''],
      headerId:[''],
      lineId:[''],
      priceListId:[''],
      pricingQty: [''],
      unitSellingPrice: [''],
      isTaxable: [''],
      taxCategoryName: [''],
      baseAmt: [''],
      disAmt : [''],
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
      orgId: [''],
      adhocDiscount: [''],
      adhocConsu: [''],
      additionalDisc: [''],
      adhocExchBonus: [''],
      adhocFinanceOffer: [''],
      adhocISL: [''],
    })
  }


  get lineDetailsArray() {
    return <FormArray>this.reversalOrderForm.get('oeOrderLinesAllList')
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
    this.locationId = Number(sessionStorage.getItem('locId'));



    this.orderManagementService.reversalReasonList()
      .subscribe(
        data1 => {
          this.reversalReasonList = data1;
          console.log(this.reversalReasonList);

        }
      );

  }

  closeMast() {
    this.router.navigate(['admin']);
  }
  resetMast() {
    window.location.reload();
  }

  orderFind(orderNumber) {
    // alert('hi')
    this.orderManagementService.SaleReturnSearchHeader(orderNumber)
    .subscribe(
      data => {
        if (data.code===200){
        if (data != null) {
          this.lstOrderItemLines=data.obj.oeOrderLinesAllList;
          this.reversalOrderForm.patchValue(data.obj);
         this.headerFound=true;
        }
      }
      else if (data.code===400){
        alert(data.message)
      }
      })
  }

  reversalOrder(reversalOrderForm: any) { }



  accountNoSearch(accountNo) { }


  Reverse() {
    alert(this.orderNumber);
    alert(this.reversalReason);
    this.orderManagementService.OrderReversal(this.orderNumber, this.emplId, this.reversalReason).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // this.deAllotmentForm.reset();
      } else {
        if (res.code === 400) {
          alert(res.message);
          // this.deAllotmentForm.reset();
        }
      }
    });
  }
  close() {
    this.router.navigate(['admin']);
  }

  Clear() {
    window.location.reload();
  }


  validateSave() {
    this.emplId = Number(sessionStorage.getItem('emplId'));
    var rtvLineArr = this.reversalOrderForm.get('oeOrderLinesAllList').value;
    var len1 = rtvLineArr.length;
    alert(len1)
    var lrm = 0;
    for (let i = len1 - 1; i >= 0; i--) {
      if (this.lineDetailsArray.controls[i].get('selectFlag').value != true) {
        this.lineDetailsArray.removeAt(i);
        lrm = lrm + 1;
      }
    }

    if (lrm === len1) { this.Clear(); }
    else {
      this.saveButton = true;
      this.validateStatus = false;
      this.showQtyRtncol = false;
    }

    var rtvLineArr1 = this.reversalOrderForm.get('oeOrderLinesAllList').value;
    var len2 = this.lineDetailsArray.length;

    for (let i = 0; i < len2; i++) {

      if (rtvLineArr1[i].selectFlag === true) {
        this.CheckLineValidations(i);
      }

    }

    if (this.lineValidation) {
      for (let i = 0; i < len1; i++) {
        this.lineDetailsArray.controls[i].get('selectFlag').disable();
      }
      this.saveButton = true;
      this.showQtyRtncol = false;
      this.validateStatus = false;

    } else {
      alert("Data Validation Failed.Please check Item Number & Return Qty");
      this.saveButton = false;
      this.validateStatus = true;
    }
    this.CalculateTotal();
  }


  CheckLineValidations(i) {
    alert('Hi')
    var rtvLineArr = this.reversalOrderForm.get('oeOrderLinesAllList').value;
    var itemcd = rtvLineArr[i].itemId;
    var rtnQty = rtvLineArr[i].cancelledQty;
    // var chkFlag = rtvLineArr[i].selectFlag;
    var j = i + 1;

    if (itemcd === undefined || itemcd === null) {
      alert("Line-" + j + " ITEM NUMBER :  Please select Item Code");
      this.lineValidation = false;
      return;
    }

    if (rtnQty === undefined || rtnQty === null || rtnQty <= 0) {
      alert("Line-" + j + " RETURN QTY :  Enter a valid quantity");
      this.lineValidation = false;
      return;
    }
    this.lineValidation = true;
  }


  CalculateTotal() {

    var rtnLineArr = this.reversalOrderForm.get('oeOrderLinesAllList').value;
    var len1 = rtnLineArr.length;

    var totBaseAmt = 0;
    var totTaxAmt = 0;
    var netTotalAmt = 0;
    var totDiscAmt = 0;


    for (let i = 0; i < len1; i++) {

      totBaseAmt = totBaseAmt + rtnLineArr[i].baseAmt;
      totTaxAmt = totTaxAmt + rtnLineArr[i].taxAmt;
      netTotalAmt = netTotalAmt + rtnLineArr[i].totAmt;
      totDiscAmt = totDiscAmt + rtnLineArr[i].disAmt;

    }

    var bAmt = totBaseAmt.toFixed(2);
    var tAmt = totTaxAmt.toFixed(2);
    var nAmt = netTotalAmt.toFixed(2);
    var dAmt = totDiscAmt.toFixed(2);
    this.rtnBaseAmt = Number(bAmt);
    this.rtnTaxAmt = Number(tAmt);
    this.rtnTotAmt = Number(nAmt);
    this.rtnDisAmt = Number(dAmt);
  }



  LineSelectFlag(e,index) {
    var patch = this.reversalOrderForm.get('oeOrderLinesAllList') as FormArray;
    var rtvLineArr = this.reversalOrderForm.get('oeOrderLinesAllList').value;
    this.lineItemRepeated=false;
  
    var mItemId =rtvLineArr[index].itemId;
    var arrLen =this.lineDetailsArray.length;
    // alert("Length :"+arrLen);
    // if (arrLen>1) {
     if(mItemId >0) {
        //  this.CheckForitemRepeat(mItemId,index)
        //  if(this.lineItemRepeated) { 
        //   this.lineDetailsArray.removeAt(index);
        //   this.CalculateTotal();
        //    return;
        //   } else  {
            this.lineDetailsArray.controls[index].get('cancelledQty').enable(); }
          // } 
  
      else {
            alert ( "Line :"+(index+1) + " - Select ITEM NUMBER first and click on Checkbox...");
            patch.controls[index].patchValue({selectFlag:''})
      }
    }

    validateQty(index: any){
      var patch = this.reversalOrderForm.get('oeOrderLinesAllList') as FormArray;
      var qtyLineArr = this.reversalOrderForm.get('oeOrderLinesAllList').value;
      var lineRtnQty = qtyLineArr[index].cancelledQty;
      var lineIssQty  = qtyLineArr[index].pricingQty;
      var uPrice= qtyLineArr[index].unitSellingPrice;
      var dPer = qtyLineArr[index].disPer;
      var taxP=qtyLineArr[index].gstPercentage;
      var  mUom = qtyLineArr[index].uom;
      if ((mUom==='NO' && Number.isInteger(lineRtnQty)==false ) || lineRtnQty<=0 || lineRtnQty>lineIssQty  ) 
      {
        alert ("Invalid Quantity.\n[RETURN QTY] should be as per UOM  Or \nShould not be grater than [ISSUED QTY] ")
        patch.controls[index].patchValue({cancelledQty:''})
        patch.controls[index].patchValue({baseAmt:0})
        patch.controls[index].patchValue({taxAmt:0})
        patch.controls[index].patchValue({totAmt:0})
        patch.controls[index].patchValue({disAmt:0})
        patch.controls[index].patchValue({selectFlag:''})
        this.lineDetailsArray.controls[index].get('cancelledQty').disable();
          this.validateStatus=true;
          this.saveButton=false;
          this.validateStatus=true;
          this.saveButton=false;
        } 
        else 
        {
          var baseAmt =lineRtnQty *uPrice;
          var lineDisAmt =baseAmt*dPer/100; lineDisAmt.toFixed(2);
          var txbleAmt  =baseAmt-lineDisAmt; txbleAmt.toFixed(2);
          var taxAmt   =(txbleAmt * taxP/100); taxAmt.toFixed(2);
          var totAmt   =txbleAmt+taxAmt; totAmt.toFixed(2);
          baseAmt=Math.round((baseAmt + Number.EPSILON) * 100) / 100;
          lineDisAmt=Math.round((lineDisAmt + Number.EPSILON) * 100) / 100;
          txbleAmt=Math.round((txbleAmt + Number.EPSILON) * 100) / 100;
          taxAmt=Math.round((taxAmt + Number.EPSILON) * 100) / 100;
          totAmt=Math.round((totAmt + Number.EPSILON) * 100) / 100;
         alert ("base amt,taxamt.totamt :" +baseAmt+","+taxAmt +","+totAmt);
        patch.controls[index].patchValue({baseAmt:baseAmt})
        patch.controls[index].patchValue({disAmt:lineDisAmt})
        patch.controls[index].patchValue({taxAmt:taxAmt})
        patch.controls[index].patchValue({totAmt:totAmt})
        }
        this.CalculateTotal()  
    }



    showAll(e) {
      alert(e +'---'+e.target.checked)
      if(this.headerFound) {
        alert(e.target.checked)
          if ( e.target.checked === true){
            alert('hi')
            // this.indReturn=false;
            // this.checkBoxAllItem=false;
            // this.showAllItem=true;
            this.displayLineDetails=false;
            this.validateStatus=true; 
             }
          else { 
              this.displayLineDetails=true;
             } 
      }
      else {
        alert("Order Header Details Not Found...Please check"); e.target.checked=false;
      }
  }


}
