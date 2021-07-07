import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';
// import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { DatePipe } from '@angular/common';


interface IinterState{
  InterStateNo:number;
  orderNumber:number;
  transactionTypeName:number;
  BillLocName:string;
  paymentType:string;
  paymentTermId: number;
  priceListName:string;
  priceListId:number;
  issuedBy:string;
  orderStatus:string;
  remarks:string;
  custAccountNo:number;
}
@Component({
  selector: 'app-inter-state',
  templateUrl: './inter-state.component.html',
  styleUrls: ['./inter-state.component.css']
})
export class InterStateComponent implements OnInit {
InterStateForm:FormGroup;
InterStateNo:number;
orderNumber:number;
transactionTypeName:number;
public orderTypeList:any;
public priceListNameList: any;
createOrderTypeList:any;
BillLocName:string;
paymentType:string;
paymentTermId: number;
priceListName:string;
priceListId:number;
issuedBy:string;
orderStatus:string;
remarks:string;
trxNumber:number;
orderedDate:Date;
subtotal:number;
totTax:number;
totAmt:number;
custAccountNo:number;
custName:string;
mobile1:number;
custAddress:string;
state:string;
gstNo:string;
allDatastore:any;
poLineTax: number;
userList2: any[] = [];
lastkeydown1: number = 0;
locId :number;
deptId:number;
divisionId:number;
deptName:string;
public ItemIdList:any= [];
itemId:number;
public subInvCode: any;
taxCategoryId:number;
  baseAmt: number;
  public taxCalforItem:any;
  public addonDescList: any[];

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private orderManagementService: OrderManagementService) {
    this.InterStateForm=fb.group({
      orderNumber:[],
      transactionTypeName:[],
      paymentType:[],
      paymentTermId: [],
      priceListName:[],
      priceListId:[],
      issuedBy:[],
      orderStatus:[],
      remarks:[],
      trxNumber:[],
      orderedDate:[],
      subtotal:[],
      totTax:[],
      totAmt:[],
      custAccountNo:[],
      custName:[],
      mobile1:[],
      custAddress:[],
      state:[],
      gstNo:[],
      oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
      taxAmounts: this.fb.array([this.TaxDetailsGroup()]),
    })
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
      baseAmt:[],
      taxAmt:[''],
      totAmt:[''],
      flowStatusCode:[''],
      category:[''],
      invType:[''],
      hsnSacCode:[''],
      // invType:[''],
      taxCategoryId:[''],
      displaysegment: false,
      lineNumber: [''],
      orderNumber: [''],
      segment: [''],
      orgId: [''],
      
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
    });
  }
  orderlineDetailsArray(): FormArray {
    return <FormArray>this.InterStateForm.get('oeOrderLinesAllList')
  }
  TaxDetailsArray(): FormArray {
    return <FormArray>this.InterStateForm.get('taxAmounts')
  }
   InterState(InterStateForm:any){}
  ngOnInit(): void {
    this.issuedBy=(sessionStorage.getItem('ticketNo'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.deptName=(sessionStorage.getItem('deptName'));

    this.service.createOrderTypeListFn()
    .subscribe(
      data1 => {
        this.createOrderTypeList = data1;
        console.log(this.createOrderTypeList);
        // data1 = this.createOrderTypeList;
      }
    );
    this.orderManagementService.priceListNameList()
    .subscribe(
      data => {
        this.priceListNameList = data;
        console.log(this.priceListNameList);
      }
    );
    this.service.subInvCode(this.deptId).subscribe(
      data => {
        this.subInvCode = data;
        // console.log(this.subInventoryId);
        // this.subInventoryCode=this.subInvCode.subInventoryCode;
        // alert('subInventoryCode');
      });
    this.service.ItemIdListDept(this.deptName,this.locId,this.subInvCode.subInventoryId).subscribe(
      data => {
        this.ItemIdList = data;
        // console.log(this.invItemId);
      });
  }
  getInvItemId($event)
  {
    // alert('in getInvItemId')
     let userId=(<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
     this.userList2=[];
     if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList2 = this.searchFromArray1(this.ItemIdList, userId);
      }
    }
  }
  searchFromArray1(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };
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
    // var itemId = this.invItemList1[i].itemId;
      var taxCategoryId = taxCategoryId;
      this.taxCategoryId = taxCategoryId;
      // var diss = 0;
      var arrayControl = this.InterStateForm.get('oeOrderLinesAllList').value
      var diss = arrayControl[i].diss1;
      var baseAmount = arrayControl[this.poLineTax].baseAmtLineWise;
      // this.service.taxCalforItem(itemId, taxCategoryId, diss, baseAmount)
      //   .subscribe(
      //     (data: any[]) => {
      //       this.taxCalforItem = data;

      //       console.log(this.taxCalforItem);
      //       this.patchResultList(i, this.taxCalforItem);

      //     }
      //   );
      // }
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
            this.InterStateForm.get('taxAmounts').patchValue(this.taxCalforItem);
          }
         
        });
      }
    }
    onOptionsSelectedDescription(segment: any, k) {
    //let select = this.invItemList1.find(d => d.segment === segment);
      let controlinv = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
      var itemType = (controlinv.controls[k]).get('invType').value;
      let select=this.ItemIdList.find(d=>d.SEGMENT===event);
      this.InterStateForm.patchValue({itemId:select.itemId})
      this.itemId = select.itemId;
      this.orderManagementService.addonDescList(segment)
        .subscribe(
          data => {
            this.addonDescList = data;
          
            for(let i=0; i <data.length; i++){
              var taxCatNm : string = data[i].taxCategoryName;
              alert(taxCatNm);
              if(taxCatNm.includes('Sale')){
                alert('sale' + '-'+k);
                (controlinv.controls[k]).patchValue({
                  itemId: data[i].itemId,                
                  orderedItem: data[i].description,
                  hsnSacCode: data[i].hsnSacCode,
                  taxCategoryId: data[i].taxCategoryId,
                  taxCategoryName: data[i].taxCategoryName,
                  unitSellingPrice:data[i].priceValue,
                  });
              }
            //   const hsnSacCode1 = data[i].hsnSacCode.substr(0, 8);
            //  if (this.hsnSacCode ===null || hsnSacCode1.length <8){
            //    alert('please confirm HSN/SAC Code!');
            //  return;
            //  }f
            }
        }
        );
      }
      onKey(index) {
        console.log(index);
      
        var arrayControl = this.InterStateForm.get('oeOrderLinesAllList').value
        var patch = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
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
              let controlinv1 = this.InterStateForm.get('taxAmounts') as FormArray;
              this.TaxDetailsArray().clear();
              // alert(data.length);
              for (let i = 0; i < data.length; i++) {
                var invLnGrp: FormGroup = this.TaxDetailsGroup();
                // this.TaxDetailsArray().push(invLnGrp);
                controlinv1.push(invLnGrp);
              }
              this.InterStateForm.get('taxAmounts').patchValue(data);
            });
      
      }    
      // onOptionTaxCatSelected(taxCategoryName, i) {
      //   //  alert('******** ITEM *******');
      //     // var taxCategoryName = taxCategory.taxCategoryName;
      //     // var taxCategoryId = taxCategoryId;
      //     this.indexVal = i;
      //     var arrayControl = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
        
      //     var amount = arrayControl[i].unitSellingPrice;
          
      //     let select = this.taxCategoryList.find(d => d.taxCategoryName === taxCategoryName);
          
      //     this.taxCategoryId= select.taxCategoryId;
      //   console.log(this.taxCategoryId);
        
      //     let controlinv = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
      //     var diss = 0;
      //     if (this.baseAmt !=undefined){
      //     this.service.taxCalforItem(this.itemId, this.taxCategoryId, diss, this.baseAmt)
      //       .subscribe(
      //         (data: any[])  => {
      //           this.lstInvLineDeatails1 = data;
      //           console.log(this.lstInvLineDeatails1);
      //           let controlinv1 = this.CounterSaleOrderBookingForm.get('taxAmounts') as FormArray;
      //           this.TaxDetailsArray().clear();
      //           // alert(data.length);
      //           for (let i = 0; i < data.length; i++) {
      //             var invLnGrp: FormGroup = this.TaxDetailsGroup();
      //             controlinv1.push(invLnGrp);
      //           }
      //           this.CounterSaleOrderBookingForm.get('taxAmounts').patchValue(data);
      //         }
      //       )
      //     }
      //   }
}
