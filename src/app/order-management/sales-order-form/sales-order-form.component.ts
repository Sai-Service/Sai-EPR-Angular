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
import { saveAs } from 'file-saver';


const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

interface ISalesBookingForm {
  divisionName: string,
  ouName: string,
  fuelType:string;
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
  locationId:number;
  subtotal: number,
  totTax: number,
  totAmt: number,
  custAddress: string,
  model: string,
  variant: string,
  locId:number;
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
  selector: 'app-sales-order-form',
  templateUrl: './sales-order-form.component.html',
  styleUrls: ['./sales-order-form.component.css']
})
export class SalesOrderFormComponent implements OnInit {
  SalesOrderBookingForm: FormGroup;
  public op:string;
  lstInvLineDeatails1: any[];
  indexVal:number;
  allDatastore:any;
  divisionName: string;
  dept:number;
  poLineTax: number;
  category: string;
  itemId:number;
  ouName: string;
  locId:number;
  locCode: string;
  locationId:number;
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
  fuelType:string;
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
  public payTermDescList: any;
  public salesRepNameList: any;
  public taxCategoryList: any[];
  public ticketNoSearch: any;
  public priceListNameList: any;
  public mainModelList: Array<string>[];
  public VariantSearch:  Array<string>[];
  public ColourSearch: any;
  public financeTypeList: any;
  public financerNameList: any;
  invItemList1: any[];
  public taxCalforItem:any;
  categoryList: any[];
  public addonDescList: any[];
  lstgetOrderLineDetails: any[];
  lstgetOrderTaxDetails: any[];
  displayorderDetails=true;
  displayaccountNo=true;
  displayAllButtons=true;
  displaycustAccountNo=true;
  currentOpration:string;
  displayVehicleDetails=true;
  displayCreateOrderButton=false;
  displayLineTaxDetails=false;
  displaySalesLines=true;
  displayAdditonalDetails=true;


  displaysegmentInvType:Array<boolean>=[];
  displayLineflowStatusCode:Array<boolean>=[];
  displaytaxCategoryName:Array<boolean>=[];
  displayRemoveRow:Array<boolean>=[];
  displayTaxCategoryupdate:Array<boolean>=[];
  displayCounterSaleLine: Array<boolean> = [];

  constructor(private fb: FormBuilder, private location: Location, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.SalesOrderBookingForm = fb.group({
      divisionName: [''],
      ouName: [''],
      locCode: [''],
      locId:[''],
      locationId:[''],
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
      fuelType:[''],
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
      itemId: [],
      invLineNo: [],
     // taxAmounts: [],
    });
  }

  TaxDetailsArray(): FormArray {
    return <FormArray>this.SalesOrderBookingForm.get('taxAmounts')
  }



  orderlineDetailsGroup() {
    return this.fb.group({
      lineNumber:[''],
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

  SalesOrderBooking(SalesOrderBookingForm: any) {}


  ngOnInit(): void {
    this.op = 'insert';
    this.displayLineTaxDetails=true;
    this.currentOpration='NewOrder';
    this.displaysegmentInvType[0]=true;
    this.displayLineflowStatusCode[0]=true;
    this.displayRemoveRow[0]=true;
    this.displayTaxCategoryupdate[0]=true;
    this.displaytaxCategoryName[0]=true;
    // for ( let i=0;this.lstgetOrderLineDetails[i].length;i++){
    //   // alert('ngOnit lenght'+' '+ this.lstgetOrderLineDetails[i].length)
    //   this.displayCounterSaleLine[i]=true;
    //   if (this.lstgetOrderLineDetails[i].flowStatusCode != null){
    //     // this.displayRemoveRow[i]=true;
    //   }
    //   }

    this.divisionName = sessionStorage.getItem('divisionName');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.locCode = (sessionStorage.getItem('locCode'));
    this.ticketNo = (sessionStorage.getItem('ticketNo'));
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.deptId = Number(sessionStorage.getItem('deptId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.locationId=Number(sessionStorage.getItem('locId'));


    this.orderlineDetailsGroup();
    var patch=this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray
     (patch.controls[0]).patchValue(
      {
        lineNumber: 1,
      }
    );


    this.service.taxCategoryListForSALES()
    .subscribe(
      data1 => {
        this.taxCategoryList = data1;
        console.log(this.taxCategoryList);
        data1 = this.taxCategoryList;
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

    this.service.salesRepNameList(this.ouId, this.locId, this.deptId)
    .subscribe(
      data => {
        this.salesRepNameList = data.obj;
        console.log(this.salesRepNameList);
      }
    );

    this.orderManagementService.priceListNameList()
    .subscribe(
      data => {
        this.priceListNameList = data;
        console.log(this.priceListNameList);
      }
    );

    
    this.service.mainModelList()
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

      this.orderManagementService.getFinNameSearch()
      .subscribe(
        data => {
          this.financerNameList = data;
          console.log(this.financerNameList);
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

      
   
  }


  onOptionsSelectedDescription(segment: any, k) {
    // alert(segment +'*****');
    // let select = this.invItemList1.find(d => d.SEGMENT === segment);
    let select = this.invItemList1.find(d => d.segment === segment);
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
              // alert('sale');
              (controlinv.controls[k]).patchValue({
                itemId: data[i].itemId,                
                orderedItem: data[i].description,
                hsnSacCode: data[i].hsnSacCode,
                taxCategoryId: data[i].taxCategoryId,
                taxCategoryName: data[i].taxCategoryName,
                unitSellingPrice:data[i].priceValue,
                });
            }
            // alert(this.orderedItem);
          }
      }
      );
  }
  


  onOptionsSelectedCategory(category: any,rownum) {
    // if (category === 'SS_ADDON_EW') {
    //   this.displayEWDetails = false;
    // }
    // else if (category === 'SS_ADDON_INS') {
    //   this.displayInsDetails = false;
    // }
    this.orderManagementService.getItemByCatType(category,1 )
      .subscribe(
        data => {
          this.invItemList1=data;
          this.orderedItem=data.description;
        }
      );
  }


  onOptionsSelectedTL(ticketNo:any) {
    this.dept = Number(sessionStorage.getItem('deptId'));
    this.orderManagementService.ticketNoSearchFn(ticketNo,this.dept)
      .subscribe(
        data => {
          this.ticketNoSearch = data.obj;
          console.log(this.ticketNoSearch);
          // this.tlName = this.ticketNoSearch.leadTicketNo;
        }
      );
  }

  onOptionsSelectedColor(variant) {
    if (  this.currentOpration !='orderSearch'){
      alert('variant')
    this.orderManagementService.ColourSearchFn(variant)
      .subscribe(
        data => {
          this.ColourSearch = data;
          console.log(this.ColourSearch);
          let select = this.ColourSearch.find(d => d.variant === variant);
      this.fuelType=select.fuelType;
      // alert(this.fuelType)
        }
      );
      }
  }

  onOptionsSelectedVariant(mainModel) {
    // alert('mainModel' + this.VariantSearch);
    // console.log(this.VariantSearch);
    
    if (  this.currentOpration !='orderSearch'){
      alert('mainModel')
    this.orderManagementService.VariantSearchFn(mainModel)
      .subscribe(
        data => {
          this.VariantSearch = data;
          console.log(this.VariantSearch);
        }
      );
    }
  }



  accountNoSearch(accountNo) {
    this.orderManagementService.accountNoSearchFn(accountNo, this.ouId)
      .subscribe(
        data => {
          this.accountNoSearch = data.obj;
          console.log(this.accountNoSearch);
          this.SalesOrderBookingForm.patchValue(this.accountNoSearch);
        }
      );
  }

  onOptionsSelectedlncategoryType(orderType){
    alert(orderType);
    // alert(this.invType);
    this.orderManagementService.getItemByCatType(orderType,1 )
          .subscribe(
            data => {
              this.invItemList1=data;
              this.orderedItem=data.description;
            }
          );
    }


  addDiscount(i) {
    var invLine = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value
    var arrayControl = this.SalesOrderBookingForm.get('taxAmounts').value
    const invItemId = arrayControl[0].taxItemId
    const lineNo = arrayControl[0].invLineNo
    this.taxCategoryName = this.taxCategoryList.find(d => d.taxCategoryName === this.taxCategoryName);
    alert(this.taxCategoryId);
    var arrayControltaxAmounts = this.SalesOrderBookingForm.get('taxAmounts').value;
    // var diss = arrayControltaxAmounts[0].taxAmt;
    var diss = 0;
    this.baseAmt =0;
    this.segment=this.invItemList1.find(d => d.segment === this.segment);
    this.itemId;
    alert(this.itemId);
    let control = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
    control.clear();
    this.service.taxCalforItem(this.itemId, this.taxCategoryId, diss, this.baseAmt)
      .subscribe(
        (data: any[]) => {
          this.taxCalforItem = data;
          // this.patchResultList(this.poLineTax, this.taxCalforItem);
          var sum = 0;
         
          for (i = 0; i < this.taxCalforItem.length; i++) {

            if (this.taxCalforItem[i].totTaxPer != 0) {
              sum = sum + this.taxCalforItem[i].totTaxAmt
            }
          }
          // const TotAmtLineWise1 = arrayControl[this.cntLineTax].baseAmtLineWise
          // var tolAmoutLine = sum + TotAmtLineWise1;
          this.TaxDetailsArray().clear()
          for (let i = 0; i < this.taxCalforItem.length; i++) {
            var invLnGrp: FormGroup = this.TaxDetailsGroup();
            this.TaxDetailsArray().push(invLnGrp);
            this.SalesOrderBookingForm.get('taxAmounts').patchValue(this.taxCalforItem);
          }
          // this.patchResultList(this.poLineTax, this.taxCalforItem);
        });
  }


  onKey(index) {
    console.log(index);
  
    var arrayControl = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value
    var patch = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
    console.log(arrayControl);
    var itemId=arrayControl[index].itemId;
   var baseAmt = arrayControl[index].unitSellingPrice * arrayControl[index].pricingQty;
    // alert(arrayControl[index].baseAmtLineWise);
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
          let controlinv1 = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
          this.TaxDetailsArray().clear();
          // alert(data.length);
          for (let i = 0; i < data.length; i++) {
            var invLnGrp: FormGroup = this.TaxDetailsGroup();
            // this.TaxDetailsArray().push(invLnGrp);
            controlinv1.push(invLnGrp);
          }
          this.SalesOrderBookingForm.get('taxAmounts').patchValue(data);
        });
  
  }
  
  addRow(){
    this.displaysegmentInvType.push(true);
    this.displayCounterSaleLine.push(true);
    this.displayRemoveRow.push(true);
    this.orderlineDetailsArray().push(this. orderlineDetailsGroup());
    var len=this.orderlineDetailsArray().length;
    alert(len);
    var patch=this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray
    (patch.controls[len-1]).patchValue(
     {
      lineNumber: len,
     }
   );
    this.displaysegmentInvType.push(true);
    this.displayLineflowStatusCode.push(false);
  
    this.displaytaxCategoryName.push(true);
    this.displayTaxCategoryupdate.push(true);
    }
  
    // RemoveRow(OrderLineIndex){
    //   this.orderlineDetailsArray().removeAt(OrderLineIndex);   
    // }

    RemoveRow(index) {
      if (index === 0) {
        alert('first alert')
      } else {
        alert('second alert')
        for (let i=0;this.lstgetOrderLineDetails.length;i++){
        alert(this.lstgetOrderLineDetails[0].lineNumber);
        this.lstgetOrderLineDetails[i].removeAt(this.lineNumber);
      }
      }
      // index=index+1;
      // this.TaxDetailsArray().delete(index);
     
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
  // this.flowStatusCode='BOOKED';
  const formValue: ISalesBookingForm = this.transData(this.SalesOrderBookingForm.value);
  formValue.flowStatusCode = 'BOOKED';
  this.orderManagementService.OrderBook(formValue).subscribe((res: any) => {
    if (res.code === 200) {
      this.orderNumber = res.obj;
      console.log(this.orderNumber);
      alert(res.message);
      this.SalesOrderBookingForm.get('accountNo').disable();
      this.displayorderDetails=false;
      this.displayVehicleDetails=false;
      this.OrderFind(this.orderNumber);
      // this.SalesOrderBookingForm.reset();
    } else {
      if (res.code === 400) {
        alert(res.message);
        // this.SalesOrderBookingForm.reset();
      }
    }
  });
}




// OrderFind1(orderNumber){
//   alert(orderNumber)
//   // this.displayorderDetails=true;
//   // this.displayaccountNo=false;
//   this.emplId = Number(sessionStorage.getItem('emplId'))
//   this.orderlineDetailsArray().clear();
//   this.TaxDetailsArray().clear();
  
//   this.orderManagementService.getsearchByOrderNo(orderNumber)
//   .subscribe(
//     data => {
//       this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
//       this.lstgetOrderTaxDetails = data.obj.taxAmounts;
//       // console.log(this.lstgetOrderLineDetails[0].taxAmounts);
//       let control = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
//       let control1 = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
//       for (let i = 0; i <= this.lstgetOrderLineDetails.length - 1; i++) {
//         var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
//         control.push(oeOrderLinesAllList1);
//     }
//     for (let j = 0; j <= this.lstgetOrderTaxDetails.length-1 ; j++) {        
//       var orderTaxLinesList: FormGroup=this.TaxDetailsGroup();
//       control1.push(orderTaxLinesList);
//   }
//   this.SalesOrderBookingForm.patchValue(data.obj);
//   this.salesRepName=data.obj.salesRepName;
//   // this.taxCategoryName=data.obj.
//   this.SalesOrderBookingForm.patchValue({orderedDate:data.obj.orderedDate});
//   this.SalesOrderBookingForm.controls['emplId'].patchValue(Number(sessionStorage.getItem('emplId')));
//   alert('find disable value');
//   this.SalesOrderBookingForm.get('accountNo').disable();
// });

// // this.SalesOrderBookingForm.controls['emplId'].patchValue(Number(sessionStorage.getItem('emplId')));

// }




OrderFind(orderNumber) {
  alert(orderNumber);
  this.op = 'Search';
  this.displaySalesLines=false;
  this.displayAllButtons=false;
  this.displayCreateOrderButton=true;
  this.currentOpration='orderSearch';
  this.emplId = Number(sessionStorage.getItem('emplId'))
  this.orderlineDetailsArray().clear();
  this.orderManagementService.getsearchByOrderNo(orderNumber)
    .subscribe(
      data => {
        this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
        this.lstgetOrderTaxDetails = data.obj.taxAmounts;
        this.allDatastore=data.obj;
        // console.log(data.obj.oeOrderLinesAllList[0].taxAmounts);

        let control = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
        let control1 = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
        alert(this.lstgetOrderLineDetails.length)
        if (this.lstgetOrderLineDetails.length === 0 && this.lstgetOrderTaxDetails.length ===0 ) {
          this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
          this.TaxDetailsArray().push(this.TaxDetailsGroup());
          this.displayLineTaxDetails=true;
          
        }
        else{
        for (let i = 0; i <= this.lstgetOrderLineDetails.length - 1; i++) {
          var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
          control.push(oeOrderLinesAllList1);
          this.displaysegmentInvType[i]=false;
          this.displayCounterSaleLine.push(false);
          // this.displayLineflowStatusCode[i]=true;
          if (this.lstgetOrderLineDetails[i].flowStatusCode==='Invoiced' || this.lstgetOrderLineDetails[i].flowStatusCode==='BOOKED'|| this.lstgetOrderLineDetails[i].flowStatusCode==='CANCELLED'){
            this.displayLineflowStatusCode[i]=true;
            this.displayRemoveRow[i]=false;
            this.displayTaxCategoryupdate[i]=true;  
            this.displaytaxCategoryName[i]=false;
    
          }
          else if (this.lstgetOrderLineDetails[i].flowStatusCode==='Invoiced' && this.lstgetOrderLineDetails[i].flowStatusCode==='SS_VEHICLE' && this.lstgetOrderLineDetails[i].flowStatusCode==='CANCELLED' || this.lstgetOrderLineDetails[i].flowStatusCode==='BOOKED'){
            this.displayTaxCategoryupdate[i]=true;
          }
          else{
            alert(this.displayTaxCategoryupdate[i]);
            this.displayLineflowStatusCode[i]=false;
            this.displayRemoveRow[i]=false;
            this.displayTaxCategoryupdate[i]=false; 
            this.displaytaxCategoryName[i]=true;
          }
          // for (let j; this.lstgetOrderLineDetails.length;j++){
          //   if (this.lstgetOrderLineDetails[j].invType==='SS_ADDON_EW' && this.lstgetOrderLineDetails[j].invType==='CANCELLED' && this.lstgetOrderLineDetails[j].baseAmt===0 ){
          //     alert('hi');
          //   }
          //   // alert('*** Hi ****'+' '+ this.lstgetOrderLineDetails.length)
          // }
      }
  }
        this.SalesOrderBookingForm.patchValue(data.obj);
        this.salesRepName=data.obj.salesRepName;
        
        if (this.flowStatusCode='BOOKED'){
          this.displayLineTaxDetails=false;
        }
      }
    )
   
    this.SalesOrderBookingForm.get('accountNo').disable();
    this.displayorderDetails=false;
    this.displayVehicleDetails=false;
    this.displayCreateOrderButton=true;
}


TaxCategoryupdate(TaxCategoryupdate,i){
  const formValue: AccOrderLinesPost1 = this.transData(this.SalesOrderBookingForm.value);
    var accLines = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
    var taxAmounts:FormArray = this.SalesOrderBookingForm.get('taxAmounts').value ;
    var taxAmounts1= this.SalesOrderBookingForm.get('taxAmounts')  ;
    var req = new Array();
    // var req;
  
  for(let i=0  ; i <accLines.length ; i++){
    for (let j=0;j<taxAmounts.length;j++){
      taxAmounts[j].invLineNo=accLines[i].lineNumber;
    }
    var accArr1 = accLines[i];
    accArr1['orderNumber'] = formValue.orderNumber;
    accArr1['taxAmounts'] = taxAmounts;
    // accArr1['invLineNo'] = formValue.lineNumber;
    req.push(accArr1); 
  }
  for (let i=0; this.lstgetOrderLineDetails.length;i++){
  if (this.lstgetOrderLineDetails[i].invType==='SS_VEHICLE' && this.lstgetOrderLineDetails[i].flowStatusCode==='ALLOTED'){
   
    this.orderManagementService.UpdateTaxCategoryLineWise(req[0]).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFUlLY');
        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          // this.CompanyMasterForm.reset();
          // window.location.reload();
        }
      }
    });
  }
  else{
    alert('Vehicle already Invoice');
  }
    }
}

onOptionTaxCatSelected(taxCategoryName, i) {
  //  alert('******** ITEM *******');
    // var taxCategoryName = taxCategory.taxCategoryName;
    // var taxCategoryId = taxCategoryId;
    this.indexVal = i;
    var arrayControl = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value;
  
    var amount = arrayControl[i].unitSellingPrice;
    
    let select = this.taxCategoryList.find(d => d.taxCategoryName === taxCategoryName);
    
    this.taxCategoryId= select.taxCategoryId;
  console.log(this.taxCategoryId);
  
    let controlinv = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
    var diss = 0;
    if (this.baseAmt !=undefined){
    this.service.taxCalforItem(this.itemId, this.taxCategoryId, diss, this.baseAmt)
      .subscribe(
        (data: any[])  => {
          this.lstInvLineDeatails1 = data;
          console.log(this.lstInvLineDeatails1);
          let controlinv1 = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
          this.TaxDetailsArray().clear();
          // alert(data.length);
          for (let i = 0; i < data.length; i++) {
            var invLnGrp: FormGroup = this.TaxDetailsGroup();
            controlinv1.push(invLnGrp);
          }
          this.SalesOrderBookingForm.get('taxAmounts').patchValue(data);
        }
      )
    }
  }




  orderLineUpdate(){
    const formValue: ISalesBookingForm = this.transData(this.SalesOrderBookingForm.value);
    this.orderManagementService.UpdateSalesUpdateLine(formValue).subscribe((res: any) => {
    if (res.code === 200) {
      alert(res.message);
      // this.OrderFind(this.orderNumber);
      // window.location.reload();
    } else {
      if (res.code === 400) {
        alert(res.message);
        // this.SalesOrderBookingForm.reset();
      }
    }
  });
  }


  downloadInvoice(){
    const fileName = 'download.pdf';
    const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.orderManagementService.downloadVehicleINV(this.orderNumber)
    .subscribe(data => {
      saveAs(new Blob([data], { type: MIME_TYPES[EXT] }), fileName);
    });
  }


  taxDetails(op, i, taxCategoryId) {
    // alert('hi'+' ' +op+'-' +i);
    // alert(this.displayCounterSaleLine[i]);
    if (op === 'Search' ) {
      // alert('Serach Of item Category')
      // .controls[i].get('taxAmounts')
      let taxControl = this.TaxDetailsArray() as FormArray
     if (taxControl !=undefined){
      taxControl.clear();
    }
        var taxItems: any[] = this.allDatastore.taxAmounts;
        var k=Number(i)+1

      taxItems.forEach(x => {
        // alert(x.invLineNo +'--'+k);
        if (x.invLineNo===k){
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

        }));
      }});
    }
    else{
      alert('Hi');
    this.poLineTax = i;
    var itemId = this.invItemList1[i].itemId;
      var taxCategoryId = taxCategoryId;
      this.taxCategoryId = taxCategoryId;
      // var diss = 0;
      var arrayControl = this.SalesOrderBookingForm.get('oeOrderLinesAllList').value
      var diss = arrayControl[i].diss1;
      var baseAmount = arrayControl[this.poLineTax].baseAmtLineWise;
     
      this.service.taxCalforItem(this.itemId, this.taxCategoryId, diss, this.baseAmt)
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

}
