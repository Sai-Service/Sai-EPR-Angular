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



@Component({
  selector: 'app-sales-order-form',
  templateUrl: './sales-order-form.component.html',
  styleUrls: ['./sales-order-form.component.css']
})
export class SalesOrderFormComponent implements OnInit {
  SalesOrderBookingForm: FormGroup;
  divisionName: string;
  dept:number;
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
  displaycustAccountNo=true;
  currentOpration:string;
  displayVehicleDetails=true;
  displayCreateOrderButton=false;
  displayLineTaxDetails=false;

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
      invLineItemId: [],
      invLineNo: [],
     // taxAmounts: [],
    });
  }

  TaxDetailsArray(): FormArray {
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
    })
  }


  orderlineDetailsArray(): FormArray {
    return <FormArray>this.SalesOrderBookingForm.get('oeOrderLinesAllList')
  }

  SalesOrderBooking(SalesOrderBookingForm: any) {}


  ngOnInit(): void {
    this.displayLineTaxDetails=true;
    this.currentOpration='NewOrder';

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
          this.tlName = this.ticketNoSearch.leadTicketNo;
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
          this.accountNoSearch = data;
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
    this.orderlineDetailsArray().push(this. orderlineDetailsGroup());
    var len=this.orderlineDetailsArray().length;
    alert(len);
    var patch=this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray
    (patch.controls[len-1]).patchValue(
     {
      lineNumber: len,
     }
   );
    }
  
    RemoveRow(OrderLineIndex){
      this.orderlineDetailsArray().removeAt(OrderLineIndex);   
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
  // alert(orderNumber);
  this.currentOpration='orderSearch';
  this.emplId = Number(sessionStorage.getItem('emplId'))
  this.orderlineDetailsArray().clear();
  this.orderManagementService.getsearchByOrderNo(orderNumber)
    .subscribe(
      data => {
        this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
        this.lstgetOrderTaxDetails = data.obj.taxAmounts;
        // console.log(data.obj.oeOrderLinesAllList[0].taxAmounts);

        let control = this.SalesOrderBookingForm.get('oeOrderLinesAllList') as FormArray;
        let control1 = this.SalesOrderBookingForm.get('taxAmounts') as FormArray;
        if (this.lstgetOrderLineDetails.length === 0) {
          this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
          this.displayLineTaxDetails=true;
        }
        else{
        for (let i = 0; i <= this.lstgetOrderLineDetails.length - 1; i++) {
          var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
          control.push(oeOrderLinesAllList1);
      }
      for (let j = 0; j <= this.lstgetOrderTaxDetails.length-1 ; j++) {        
        var orderTaxLinesList: FormGroup=this.TaxDetailsGroup();
        control1.push(orderTaxLinesList);
    }
  }
        this.SalesOrderBookingForm.patchValue(data.obj);
        //  this.SalesOrderBookingForm.get('variant').setValue(data.obj.variant);
        this.salesRepName=data.obj.salesRepName;
      }
    )
   
    this.SalesOrderBookingForm.get('accountNo').disable();
    this.displayorderDetails=false;
    this.displayVehicleDetails=false;
    this.displayCreateOrderButton=true;
}



}
