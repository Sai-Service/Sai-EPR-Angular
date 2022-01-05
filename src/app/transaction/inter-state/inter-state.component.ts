import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { data } from 'jquery';
import { v4 as uuidv4 } from 'uuid';
import { MasterService } from 'src/app/master/master.service';
// import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { DatePipe } from '@angular/common';


interface IinterState{
  InterStateNo:number;
  orderNumber:number;
  transactionTypeName:number;
  BillLocName:string;
  billToLocId:number;
  paymentType:string;
  paymentTermId: number;
  priceListName:string;
  priceListId:number;
  issuedBy:string;
  orderStatus:string;
  remarks:string;
  custAccountNo:number;
  itemId:number;
  custtaxCategoryName:string;
}


export class StockTransferRow {
  segment: string;
  Locator: string;
  quantity: number;
}

export class reserveLine {
  transactionType: string;
  transactionNumber: string;
  locId: number;
  reservedQty: number;
  invItemId: number;
  locatorId: number;
  rate: number;
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
transactionTypeName:string;
public orderTypeList:any;
public priceListNameList: any;
createOrderTypeList:any=[];
createOrderType:string='Direct Invoice'
BillLocName:string;
paymentType:string;
paymentTermId: number;
priceListName:string;
priceListId:number;
issuedBy:string;
orderStatus:string;
remarks:string;
trxNumber:number;
orderedDate= new Date();
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
public allTaxCategoryList: any = [];
lastkeydown1: number = 0;
locId :number;
deptId:number;
divisionId:number;
ouId:number;
deptName:string;
public ItemIdList:any= [];
itemId:number;
public subInvCode: any;
taxCategoryId:number;
  baseAmt: number;
  public taxCalforItem:any;
  public addonDescList: any[];
  indexVal: number;
  public taxCategoryList: any[];
  lstInvLineDeatails1: any[];
  taxCategoryName:string;
  segment:string;
  selectedLine = 0;
  orderedItem: string;
  billToLocId: number;
  subInventoryId:number;
  public minDate = new Date();
  getshiplist: any=[];
  frmLocatorId:number;
  locData:any =[];
  Avalqty:number;
  onhand1: any;
  resveQty:number;
  onHandQty:number;
  id:number;
  emplId: number;
  validday:number;
  invType:string;
  locationId:number;
  locCode:string;
  public op:string;
  lstgetOrderLineDetails: any[];
  lstgetOrderTaxDetails: any[];
  displayLineflowStatusCode:Array<boolean>=[];
  flowStatusCode:string;
  displayCounterSaleLine: Array<boolean> = [];
  resrveqty: any;
  getItemDetail: any;
  getfrmSubLoc: any;
  custtaxCategoryName:string;

  public itemMap2 = new Map<number, any[]>();
  public itemMap3 = new Map<string, StockTransferRow>();
  public taxMap = new Map<string, any>();



  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private orderManagementService: OrderManagementService) {
    this.InterStateForm=fb.group({
      orderNumber:[],
      InterStateNo:[],
      subInventoryId:[],
      transactionTypeName:[],
      paymentType:[],
      paymentTermId: [],
      priceListName:[],
      priceListId:[],
      BillLocName: [''],
      billToLocId:[],
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
      validday:[],
      ouId:[],
      emplId:[],
      locationId:[],
      createOrderType:[],
      locCode:[],
      custtaxCategoryName:[],
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
      frmLocatorId:['',[Validators.required]],
      Avalqty:[],
      resveQty:[],
      onHandQty:[],
      id:[],
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
    this.deptId = Number(sessionStorage.getItem('deptId'));
    this.locationId=Number(sessionStorage.getItem('locId'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.deptName=(sessionStorage.getItem('deptName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locCode=(sessionStorage.getItem('locCode'));
    this.paymentType='IMMEDIATE';
    this.emplId = Number(sessionStorage.getItem('emplId'));
    // this.flowStatusCode='BOOKED';

     this.service.iotOrderTypeList()
    .subscribe(
      data1 => {
        this.createOrderTypeList = data1;
        console.log(this.createOrderTypeList);
        // data1 = this.createOrderTypeList;
        // this.InterStateForm.patchValue({transactionTypeName:this.createOrderTypeList.transactionTypeName});
        this.transactionTypeName=this.createOrderTypeList[0].transactionTypeName;

      }
    );
    this.service.getShiptoLoc(this.locId)
      .subscribe(
        data => {
          this.getshiplist = data;
          // this.custAccountNo=this.getshiplist[0].custAccountNo;
      // this.custName=this.getshiplist[0].custName;
      // this.mobile1=this.getshiplist[0].mobile1;
      // this.custAddress=this.getshiplist[0].address1+this.getshiplist[0].address2+this.getshiplist[0].address3;
      // this.state=this.getshiplist[0].state;
      // this.gstNo=this.getshiplist[0].gstNo
        });

    this.orderManagementService.priceListNameList()
    .subscribe(
      data => {
        this.priceListNameList = data;
        console.log(this.priceListNameList);
      }
    );
    this.service.subInvCode(this.deptId,this.divisionId).subscribe(
      data => {
        this.subInvCode = data;
        console.log(this.subInventoryId);
         this.subInventoryId=this.subInvCode.subInventoryId;
        // alert(this.subInventoryId);
      });

      this.service.taxCategoryIgstListForSALES()
    .subscribe(
      data1 => {
        this.taxCategoryList = data1;
        console.log(this.taxCategoryList);
        data1 = this.taxCategoryList;
      }
    );

    this.orderManagementService.priceListNameList1(sessionStorage.getItem('ouId'), (sessionStorage.getItem('divisionId')))
      .subscribe(
        data => {
          this.priceListNameList = data;
          console.log(this.priceListNameList);
          this.InterStateForm.patchValue({ priceListName: data[0].priceListName })
          this.InterStateForm.patchValue({ priceListId: data[0].priceListHeaderId })
        }
      );
    this.orderlineDetailsGroup();
    var patch=this.InterStateForm.get('oeOrderLinesAllList') as FormArray
     (patch.controls[0]).patchValue(
      {
        lineNumber: 1,
      }
    );
    this.orderlineDetailsArray().controls[0].patchValue({ flowStatusCode: 'BOOKED' });
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


  // addRow(i){
  //   if(i>-1)
  //   {
  //   this.reservePos(i);
  //   }
  //   this.orderlineDetailsArray().push(this. orderlineDetailsGroup());
  //   var len=this.orderlineDetailsArray().length;
  //   // alert(len);
  //   var patch=this.InterStateForm.get('oeOrderLinesAllList') as FormArray
  //   (patch.controls[len-1]).patchValue(
  //    {
  //     lineNumber: len,
  //     flowStatusCode: 'BOOKED',
  //    }
  //  );
  //   }

  addRow(i) {
    var trxLnArr1 = this.InterStateForm.get('oeOrderLinesAllList').value;
    if (this.op == 'Search') {
      i = trxLnArr1.length;
      // this.isDisabled10 = true;
    }
    if (i > -1) {
      var len1 = i;
      if (trxLnArr1[len1] != undefined) {
        // this.isDisabled10=false;
        console.log(trxLnArr1[len1].pricingQty);
        var itemqty = trxLnArr1[len1].pricingQty;
        var item = trxLnArr1[len1].segment;
        var itemid = trxLnArr1[len1].itemId;
        // debugger;
        if (item === '' || itemqty === '') {
          alert('Please enter data in blank field');
          return;
        }
        if (!this.itemMap3.has(item)) {
          this.reservePos(i);
        }
        else {
          // debugger;
          // this.deleteReserveLinewise(i,itemid);COMMENT BY VINITA
          this.reservePos(i);
        }
        // this.displayRemoveRow.push(true);
        this.displayCounterSaleLine.push(true);
        this.displayLineflowStatusCode.push(true);
      }
    }

    this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
    var len = this.orderlineDetailsArray().length;
    var patch = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
    // var currentLn = patch.controls[i].get('lineNumber').value;
    // alert(currentLn);
    var refId = uuidv4();
    (patch.controls[len - 1]).patchValue(
      {
        lineNumber: len,
        flowStatusCode: 'BOOKED',
        invType: 'SS_SPARES',
        uuidRef: refId
      }
    );

    this.displayCounterSaleLine.push(true);
    this.displayLineflowStatusCode.push(true);
    this.taxCategoryList = this.allTaxCategoryList;
    var ln = len - 1;
    // this.setFocus('itemSeg' + ln);
    // var arrayControl = this.InterStateForm.get('oeOrderLinesAllList').value;


  }

    RemoveRow(OrderLineIndex){
      this.orderlineDetailsArray().removeAt(OrderLineIndex);
    }


  onOptiongetItem(event){
    alert(event);
    if(this.subInventoryId!=undefined){
    this.service.ItemIdListDept(this.deptId,this.locId,this.subInventoryId).subscribe(
      data => {
        this.ItemIdList = data;
        console.log(this.ItemIdList);
      });
      var select1=this.getshiplist.find(d=>d.toLocation===event);
      // alert(select1.custAccountNo);
      this.custAccountNo=select1.custAccountNo;
      this.custName=select1.custName;
      this.mobile1=select1.mobile1;
      this.custAddress=select1.address1+select1.address2+select1.address3;
      this.state=select1.state;
      this.gstNo=select1.gstNo;
      this.billToLocId=select1.toLocationId;
      this.InterStateForm.patchValue({custtaxCategoryName:select1.taxCategoryName})
  }}
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
      // alert('Hi');
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
    onOptionsSelectedDescription(event: any, k) {
      // alert(event)
      let controlinv = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
      let select=this.ItemIdList.find(d=>d.SEGMENT===event);
      alert(select.itemId)
      // this.InterStateForm.patchValue({itemId:select.itemId})
      var custtaxCategoryName=this.InterStateForm.get('custtaxCategoryName').value;
      controlinv.controls[k].patchValue({ itemId: select.itemId });
      // this.itemId = select.itemId;
      // this.service.getItemDetail(select.itemId).subscribe
      // (data => {this.getItemDetail = data;
      //   // alert("this.getItemDetail.description" + this.getItemDetail.description);
      //   controlinv.controls[k].patchValue({orderedItem: this.getItemDetail.description});
      // }
      // );
      if (this.custtaxCategoryName === 'Sales-IGST') {
        // alert(custtaxCategoryName);
        this.orderManagementService.addonDescList1(event,custtaxCategoryName, this.priceListId)
          .subscribe(
            data => {
              if (data.code === 200) {
                this.addonDescList = data.obj;
                for (let i = 0; i < data.obj.length; i++) {
                  var itemtaxCatNm: string = data.obj[i].taxCategoryName;
                  if (itemtaxCatNm.includes('Sale-I-GST')) {
                    // alert(itemtaxCatNm);
                    (controlinv.controls[k]).patchValue({
                      itemId: data.obj[i].itemId,
                      orderedItem: data.obj[i].description,
                      hsnSacCode: data.obj[i].hsnSacCode,
                      uom: data.obj[i].uom,
                      // unitSellingPrice: data.obj[0].priceValue,by vinita
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
                if (select.itemId != null) {
                  this.service.getfrmSubLocPrice(this.locId, select.itemId, this.subInventoryId).subscribe(
            data => {
              console.log(data);
              if (data.length === 0) {
                // alert('1')
                alert('Item Not Found In Stock!.');
                var lotList = [{ locatorId: 0, segmentName: 'Not Found' }]
                controlinv.controls[k].patchValue({ frmLocatorId: lotList });
                controlinv.controls[k].patchValue({ onHandQty: 0 });
                controlinv.controls[k].get('frmLocatorId').disable()
                return;
              } else {
                this.getfrmSubLoc = data;
                console.log(this.getfrmSubLoc);
                this.locData[k] = data;
                var selLocator = this.locData[k];
                controlinv.controls[k].get('frmLocatorId').enable();
                if (this.getfrmSubLoc.length == 1) {
                  controlinv.controls[k].patchValue({ onHandId: selLocator[0].segmentName });
                  controlinv.controls[k].patchValue({ locatorId: selLocator[0].ROWNUM });
                  controlinv.controls[k].patchValue({ frmLocator: selLocator[0].segmentName });
                  controlinv.controls[k].patchValue({ onHandQty: selLocator[0].onHandQty });
                  controlinv.controls[k].patchValue({ id: selLocator[0].id });
                  controlinv.controls[k].patchValue({ unitSellingPrice: selLocator[0].prc });
                }
                else {
                  // alert('2');
                  // alert(selLocator[0].segmentName);
                  alert('Please check Item has old stock with price');
                  controlinv.controls[k].patchValue({ locatorId: selLocator[0].ROWNUM });
                  controlinv.controls[k].patchValue({ frmLocator: selLocator[0].segmentName });
                  // controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].locatorId });
                  controlinv.controls[k].patchValue({ onHandQty: selLocator[0].onHandQty })
                  controlinv.controls[k].patchValue({ id: selLocator[0].id });
                  controlinv.controls[k].patchValue({ unitSellingPrice: selLocator[0].prc });
                }}
              });

                }
                if(this.deptName=='Spares')
                {
                  controlinv.controls[k].patchValue({invType:'SS_SPARES'});
                }
                this.service.getreserqty(this.locId,select.itemId).subscribe
                (data=>{
                  this.resrveqty=data;
                  controlinv.controls[k].patchValue({resveQty:this.resrveqty});
                });

              }
              else if (data.code === 400) {
                alert(data.message)
              }
            })
          ;
      }
      else {
        this.orderManagementService.addonDescList1(event,custtaxCategoryName, this.priceListId)
          .subscribe(
            data => {
              if (data.code === 200) {
                this.addonDescList = data.obj; //// item iformation
                for (let i = 0; i < data.obj.length; i++) {
                  var taxCatNm: string = data.obj[i].taxCategoryName;
                  if (taxCatNm.includes('Sale-S&C')) {
                    (controlinv.controls[k]).patchValue({
                      itemId: data.obj[i].itemId,
                      orderedItem: data.obj[i].description,
                      hsnSacCode: data.obj[i].hsnSacCode,
                      uom: data.obj[i].uom,
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
                if (select.itemId != null) {
                  this.service.getfrmSubLocPrice(this.locId, select.itemId, this.subInventoryId).subscribe(
            data => {
              console.log(data);
              if (data.length === 0) {
                // alert('1')
                alert('Item Not Found In Stock!.');
                var lotList = [{ locatorId: 0, segmentName: 'Not Found' }]
                controlinv.controls[k].patchValue({ frmLocatorId: lotList });
                controlinv.controls[k].patchValue({ onHandQty: 0 });
                controlinv.controls[k].get('frmLocatorId').disable()
                return;
              } else {
                this.getfrmSubLoc = data;
                console.log(this.getfrmSubLoc);
                this.locData[k] = data;
                var selLocator = this.locData[k];
                controlinv.controls[k].get('frmLocatorId').enable();
                if (this.getfrmSubLoc.length == 1) {
                  controlinv.controls[k].patchValue({ onHandId: selLocator[0].segmentName });
                  controlinv.controls[k].patchValue({ locatorId: selLocator[0].ROWNUM });
                  controlinv.controls[k].patchValue({ frmLocator: selLocator[0].segmentName });
                  controlinv.controls[k].patchValue({ onHandQty: selLocator[0].onHandQty });
                  controlinv.controls[k].patchValue({ id: selLocator[0].id });
                  controlinv.controls[k].patchValue({ unitSellingPrice: selLocator[0].prc });
                }
                else {
                  // alert('2');
                  // alert(selLocator[0].segmentName);
                  alert('Please check Item has old stock with price');
                  controlinv.controls[k].patchValue({ locatorId: selLocator[0].ROWNUM });
                  controlinv.controls[k].patchValue({ frmLocator: selLocator[0].segmentName });
                  // controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].locatorId });
                  controlinv.controls[k].patchValue({ onHandQty: selLocator[0].onHandQty })
                  controlinv.controls[k].patchValue({ id: selLocator[0].id });
                  controlinv.controls[k].patchValue({ unitSellingPrice: selLocator[0].prc });
                }}
              });


                }
                if(this.deptName=='Spares')
                {
                  controlinv.controls[k].patchValue({invType:'SS_SPARES'});
                }
                this.service.getreserqty(this.locId,select.itemId).subscribe
                (data=>{
                  this.resrveqty=data;
                  controlinv.controls[k].patchValue({resveQty:this.resrveqty});
                });
              }
              else if (data.code === 400) {
                alert(data.message);
              }
            }

          );
      }

          // this.service.getfrmSubLocPrice(this.locId, select.itemId, this.subInventoryId).subscribe(
          //   data => {
          //     console.log(data);
          //     if (data.length === 0) {
          //       // alert('1')
          //       alert('Item Not Found In Stock!.');
          //       var lotList = [{ locatorId: 0, segmentName: 'Not Found' }]
          //       controlinv.controls[k].patchValue({ frmLocatorId: lotList });
          //       controlinv.controls[k].patchValue({ onHandQty: 0 });
          //       controlinv.controls[k].get('frmLocatorId').disable()
          //       return;
          //     } else {
          //       this.getfrmSubLoc = data;
          //       console.log(this.getfrmSubLoc);
          //       this.locData[k] = data;
          //       var selLocator = this.locData[k];
          //       controlinv.controls[k].get('frmLocatorId').enable();
          //       if (this.getfrmSubLoc.length == 1) {
          //         controlinv.controls[k].patchValue({ onHandId: selLocator[0].segmentName });
          //         controlinv.controls[k].patchValue({ locatorId: selLocator[0].ROWNUM });
          //         controlinv.controls[k].patchValue({ frmLocator: selLocator[0].segmentName });
          //         controlinv.controls[k].patchValue({ onHandQty: selLocator[0].onHandQty });
          //         controlinv.controls[k].patchValue({ id: selLocator[0].id });
          //         controlinv.controls[k].patchValue({ unitSellingPrice: selLocator[0].prc });
          //       }
          //       else {
          //         // alert('2');
          //         // alert(selLocator[0].segmentName);
          //         alert('Please check Item has old stock with price');
          //         controlinv.controls[k].patchValue({ locatorId: selLocator[0].ROWNUM });
          //         controlinv.controls[k].patchValue({ frmLocator: selLocator[0].segmentName });
          //         // controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].locatorId });
          //         controlinv.controls[k].patchValue({ onHandQty: selLocator[0].onHandQty })
          //         controlinv.controls[k].patchValue({ id: selLocator[0].id });
          //         controlinv.controls[k].patchValue({ unitSellingPrice: selLocator[0].prc });
          //       }}
          //     });

      }
   AvailQty(event:any,i)
{
  alert(i+'I');
  var trxLnArr =this.InterStateForm.get('oeOrderLinesAllList').value;
  console.log(trxLnArr);

  var itemid=trxLnArr[i].itemId;
  var locId=trxLnArr[i].frmLocatorId;
  var onhandid=trxLnArr[i].id;
  this.service.getonhandqty(Number(sessionStorage.getItem('locId')),this.subInventoryId,locId,itemid).subscribe
      (data =>{
      this.onhand1 = data;
      console.log(this.onhand1);
      var trxLnArr1=this.InterStateForm.get('oeOrderLinesAllList')as FormArray;
      trxLnArr1.controls[i].patchValue({onHandQty:data.obj});
    // var trxLnArr=this.moveOrderForm.get('trxLinesList').value;
  let onHand=data.obj;
  // alert(onHand+'ONHAND');
  let reserve=trxLnArr[i].resveQty;
  // alert(reserve+'Reserve');
  // alert(onHand+'OnHand');
  // alert(reserve+'reserve');
  let avlqty1=0;
  avlqty1= onHand-reserve;
  // alert(avlqty1+'avail');
  var trxLnArr1=this.InterStateForm.get('oeOrderLinesAllList')as FormArray;
  trxLnArr1.controls[i].patchValue({Avalqty: avlqty1});
    })
}
      // onKey(index) {
      //   console.log(index);

      //   var arrayControl = this.InterStateForm.get('oeOrderLinesAllList').value
      //   var patch = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
      //   console.log(arrayControl);
      //   var itemId=arrayControl[index].itemId;
      //  var baseAmt = arrayControl[index].unitSellingPrice * arrayControl[index].pricingQty;
      //   // alert(arrayControl[index].baseAmtLineWise);
      //      var diss = 0;
      //   var sum = 0;
      //   // var baseAmount = this.sum;
      //   this.service.taxCalforItem(itemId, this.taxCategoryId, diss, baseAmt)
      //     .subscribe(
      //       (data: any[]) => {
      //         this.taxCalforItem = data;
      //         console.log(this.taxCalforItem);

      //         for (let i = 0; i < this.taxCalforItem.length; i++) {

      //           if (this.taxCalforItem[i].totTaxPer != 0) {
      //             sum = sum + this.taxCalforItem[i].totTaxAmt
      //           }
      //         }
      //         (patch.controls[index]).patchValue({
      //           baseAmt: Math.round((baseAmt / 100 + Number.EPSILON) * 100) / 100,
      //           // baseAmtLineWise: arrayControl[index].baseAmtLineWise,
      //           taxAmt: Math.round((sum / 100 + Number.EPSILON) * 100) / 100,
      //           totAmt: Math.round((baseAmt + sum / 100 + Number.EPSILON) * 100) / 100,
      //         });


      //         let controlinv1 = this.InterStateForm.get('taxAmounts') as FormArray;
      //         this.TaxDetailsArray().clear();
      //         // alert(data.length);
      //         for (let i = 0; i < data.length; i++) {
      //           var invLnGrp: FormGroup = this.TaxDetailsGroup();
      //           // this.TaxDetailsArray().push(invLnGrp);
      //           controlinv1.push(invLnGrp);
      //         }
      //         this.InterStateForm.get('taxAmounts').patchValue(data);
      //       });
      //       var itemId1 = arrayControl[index].itemId;
      //       var item = arrayControl[index].segment;
      //       var pricingQty = arrayControl[index].pricingQty;
      //       if (itemId1 != null ) {
      //         this.addRow(index);

      //       }
      // }

      onKey(index) {
        // alert(index +'Onkey Alert' +'---'+fldName)
        var arrayControl = this.InterStateForm.get('oeOrderLinesAllList').value;
        var pricingQty = arrayControl[index].pricingQty;
        var Avalqty = arrayControl[index].Avalqty;
        // alert(pricingQty)
        if (pricingQty === null || pricingQty === undefined || pricingQty === '') {
          return;
        }
        if (pricingQty <= 0) {
          alert("Please enter quantity more than zero");
          return;
        }

        if (pricingQty > Avalqty) {
          var bckOrd = pricingQty - Avalqty;
          pricingQty = Avalqty;
        }

        console.log(index);
        var patch = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
        console.log(arrayControl);
        var itemId = arrayControl[index].itemId;
        var taxcatName = arrayControl[index].taxCategoryName;
        // alert(taxcatName)
        console.log(taxcatName);
        let select;
        var taxCategoryId = arrayControl[index].taxCategoryId;
        // alert(taxCategoryId);
        if (taxCategoryId === null) {

          select = this.taxCategoryList[index].find(d => d.taxCategoryName === taxcatName.taxCategoryName);
          taxCategoryId = select.taxCategoryId;
          patch.controls[index].patchValue({ taxCategoryId: taxCategoryId });
          patch.controls[index].patchValue({ taxCategoryName: select });
        } else {
          // alert("2" + taxCategoryId)
          // select = [{ taxCategoryId: taxCategoryId, taxCategoryName: taxcatName }];
          // console.log(select);
          // taxCategoryId = select.taxCategoryId;
          patch.controls[index].patchValue({ taxCategoryId: taxCategoryId });
          patch.controls[index].patchValue({ taxCategoryName: taxcatName });
        }

        patch.controls[index].patchValue({ disAmt: 0 });
        var baseAmt = arrayControl[index].unitSellingPrice * pricingQty;

        var disAmt1 = arrayControl[index].disAmt;
        var invLineNo1 = index + 1;
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
                // disAmt: (disPer / 100) * baseAmt,
              });
              let controlinv1 = this.InterStateForm.get('taxAmounts') as FormArray;
              let distAmtArray = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
              console.log(controlinv1);
              this.TaxDetailsArray().clear();
              for (let i = 0; i < data.length; i++) {
                var invLnGrp: FormGroup = this.TaxDetailsGroup();
                controlinv1.push(invLnGrp);
                (controlinv1.controls[i]).patchValue({
                  invLineNo: index + 1,
                });
              }
              this.InterStateForm.get('taxAmounts').patchValue(data);
              var disValue = data[0].totTaxAmt;
              if (disValue > 0 && data[0].taxTypeName.includes('Discount')) {
                patch.controls[index].patchValue({ disAmt: data[0].totTaxAmt });
              }
              else {
                patch.controls[index].patchValue({ disAmt: 0 });
              }
              let taxMapData = this.InterStateForm.get('taxAmounts').value;
              this.taxMap.set(index, taxMapData);


            });

        var itemId1 = arrayControl[index].itemId;
        var item = arrayControl[index].segment;
        var pricingQty = arrayControl[index].pricingQty;
        // alert(itemId1)
        if (itemId1 != null ) {
          this.addRow(index);

        }
        else {
          // this.displayRemoveRow.push(true);
          // alert(this.displayRemoveRow)
        }

      }

      onOptionTaxCatSelected(taxCategoryName, i) {
        //  alert('******** ITEM *******');
          // var taxCategoryName = taxCategory.taxCategoryName;
          // var taxCategoryId = taxCategoryId;
          this.indexVal = i;
          var arrayControl = this.InterStateForm.get('oeOrderLinesAllList').value;

          var amount = arrayControl[i].unitSellingPrice;

          let select = this.taxCategoryList.find(d => d.taxCategoryName === taxCategoryName);

          this.taxCategoryId= select.taxCategoryId;
        console.log(this.taxCategoryId);

          let controlinv = this.InterStateForm.get('taxAmounts') as FormArray;
          var diss = 0;
          if (this.baseAmt !=undefined){
          this.service.taxCalforItem(this.itemId, this.taxCategoryId, diss, this.baseAmt)
            .subscribe(
              (data: any[])  => {
                this.lstInvLineDeatails1 = data;
                console.log(this.lstInvLineDeatails1);
                let controlinv1 = this.InterStateForm.get('taxAmounts') as FormArray;
                this.TaxDetailsArray().clear();
                // alert(data.length);
                for (let i = 0; i < data.length; i++) {
                  var invLnGrp: FormGroup = this.TaxDetailsGroup();
                  controlinv1.push(invLnGrp);
                }
                this.InterStateForm.get('taxAmounts').patchValue(data);
              }
            )
          }
        }
        validateNum(index, j) {
          var arrayControl = this.InterStateForm.get('taxAmounts').value
          // this.TaxDetailsArray().controls[index].get('taxAmounts').value;
          // this.poMasterDtoForm.get('poLines').value
          var value = arrayControl[index].totTaxAmt
          if (value.charAt(0) === '-') {
            alert('Valid Number: ' + value);
          } else {
            alert('Invalid Number: ' + value + ' ' + 'Kindly enter negetive value');
          }
        }
        addDiscount(i) {
          var invLine = this.InterStateForm.get('oeOrderLinesAllList').value
          var arrayControl = this.InterStateForm.get('taxAmounts').value
          const invItemId = arrayControl[0].taxItemId
          const lineNo = arrayControl[0].invLineNo
          this.taxCategoryName = this.taxCategoryList.find(d => d.taxCategoryName === this.taxCategoryName);
          // alert(this.taxCategoryId);
          var arrayControltaxAmounts = this.InterStateForm.get('taxAmounts').value;
          // var diss = arrayControltaxAmounts[0].taxAmt;
          var diss = 0;
          // this.baseAmt =0;
          this.segment=this.ItemIdList.find(d => d.SEGMENT === this.segment);
          this.itemId;
          // alert(this.itemId);
          let control = this.InterStateForm.get('taxAmounts') as FormArray;
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
                  this.InterStateForm.get('taxAmounts').patchValue(this.taxCalforItem);
                }
                // this.patchResultList(this.poLineTax, this.taxCalforItem);
              });
        }
        transData(val) {
          return val;
        }
        IntterstateSaleOrderSave(){
          const formValue = this.transData(this.InterStateForm.value);
          console.log(formValue);

        //   var orderLines1 = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
        // var orderLines= orderLines1.getRawValue();
          // formValue.flowStatusCode = 'BOOKED';
          this.ouId = Number(sessionStorage.getItem('ouId'));
          // this.emplId = Number(sessionStorage.getItem('emplId'));
          for (let i = 0; i < formValue.oeOrderLinesAllList.length; i++) {
            formValue.oeOrderLinesAllList[i].taxCategoryName = formValue.oeOrderLinesAllList[i].taxCategoryName.taxCategoryName;
            // orderLines[i].frmLocatorId = orderLines[i].frmLocatorName;
            }
          this.orderManagementService.SaveCounterSaleOrder(formValue).subscribe((res: any) => {
            if (res.code === 200) {
              this.orderNumber = res.obj;
              console.log(this.orderNumber);
              alert(res.message);
              this.orderNumber = res.obj;
              // this.orderNumber=this.CounterSaleOrderBookingForm.get('orderNumber').value;
              console.log(this.orderNumber);
              this.OrderFind(this.orderNumber);
            } else {
              if (res.code === 400) {
                alert(res.message);
                // this.SalesOrderBookingForm.reset();
              }
            }
          });
        }

        OrderFind(orderNumber){
          // alert(orderNumber+'Hi')
          this.op = 'Search';
          this.emplId = Number(sessionStorage.getItem('emplId'))
          this.orderlineDetailsArray().clear();
          this.TaxDetailsArray().clear();
          // this.displaycustAccountNo=false;
          // // this.displaysegment=false;
          // this.displaycreateOrderType=false;

          // this.displaysegmentInvType[0]=false;
          this.orderManagementService.counterSaleOrderSearch(orderNumber)
          .subscribe(
            data => {
              this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
              this.lstgetOrderTaxDetails = data.obj.taxAmounts;
              this.allDatastore=data.obj;
              // console.log(this.lstgetOrderLineDetails[0].taxAmounts);
              let control = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
              let control1 = this.InterStateForm.get('taxAmounts') as FormArray;
              for (let i = 0; i <= this.lstgetOrderLineDetails.length - 1; i++) {
                var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
                control.push(oeOrderLinesAllList1);
                // this.displaysegmentInvType[i]=false;
                // this.displaysegmentInvType[i]=false;
                this.displayLineflowStatusCode.push(true);
                this.displayCounterSaleLine.push(false);
            }
            for (let j = 0; j <= this.lstgetOrderTaxDetails.length-1 ; j++) {
              var orderTaxLinesList: FormGroup=this.TaxDetailsGroup();
              control1.push(orderTaxLinesList);
          }
          this.InterStateForm.patchValue(data.obj);
          // this.salesRepName=data.obj.salesRepName;
          this.createOrderType=data.obj.createOrderType;
          this.priceListName=data.obj.priceListName;
          this.transactionTypeName=data.obj.transactionTypeName;
          // for (let k=0; k<this.lstgetOrderLineDetails.length; k++){
          //   let selectTaxCate = this.taxCategoryList.find(d => d.taxCategoryName === this.lstgetOrderLineDetails[k].taxCategoryName);
          //   this.CounterSaleOrderBookingForm.patchValue({taxCategoryName:selectTaxCate.taxCategoryName})
          //   let selectInvType = this.categoryList.find(d => d.type === data.obj.oeOrderLinesAllList[k].invType);
          //   this.CounterSaleOrderBookingForm.patchValue({invType:selectInvType.invType});
          //   var curInvType=selectInvType.invType;

          // }

          for (let k=0; k<this.lstgetOrderLineDetails.length; k++){
            // alert(this.lstgetOrderLineDetails[k].baseAmt);
            this.InterStateForm.patchValue({baseAmt:this.lstgetOrderLineDetails[k].baseAmt});
          }
          this.InterStateForm.patchValue({orderedDate:data.obj.orderedDate});
          this.InterStateForm.get('orderedDate').disable();
          this.InterStateForm.controls['emplId'].patchValue(Number(sessionStorage.getItem('emplId')));



         if (this.allDatastore.createOrderType === 'Pick Ticket Invoice' || this.allDatastore.createOrderType === 'Direct Invoice' || this.allDatastore.createOrderType === 'Sales Order') {
          // alert('Pick to Invoice');
          // this.displaycounterSaleOrderSave=false;
          // // this.displaycounterSaleOrderSave=false;
          // this.displaycounterSaleAllButtons=false;
          // this.displayaddRow=false;
          // this.displaypickTicketUpdate=false;
          this.InterStateForm.disable();
          this.TaxDetailsArray().disable();
          // alert(this.allDatastore.flowStatusCode);
        //   if (this.allDatastore.flowStatusCode==='BOOKED' && this.allDatastore.paymentType==='IMMEDIATE'){
        //     alert('Hi..')
        //     this.PaymentButton=false;
        //   }
        // }
        // else{
        //   this.CounterSaleOrderBookingForm.enable();
        //   this.displaycounterSaleOrderSave=true;
        //   this.displayaddRow=true;
        //   // this.displayRemoveRow=true;
        //   this.displaysalesRepName=true;
        //   // this.displaytaxCategoryName=true;
        //     this.CounterSaleOrderBookingForm.get('custName').disable();
        //   this.CounterSaleOrderBookingForm.get('mobile1').disable();
        //   this.CounterSaleOrderBookingForm.get('custAccountNo').disable();
        //   this.CounterSaleOrderBookingForm.get('custAddress').disable();
        //   if (this.createOrderType==='Sales Order'){
        //     this.displaysalesRepName=false;
        //   }
        //   else{
        //     this.displaysalesRepName=true;
        //   }
        // }
        // if (this.allDatastore.flowStatusCode==='BOOKED' && this.allDatastore.paymentType==='IMMEDIATE'){
        //   this.PaymentButton=false;
        // }
            }});

      }

      reservePos(i) {
        var len = i;
        var trxLnArr1 = this.InterStateForm.get('oeOrderLinesAllList').value;
        console.log(trxLnArr1);
        var locId1 = this.InterStateForm.get('locId').value;
        var prqty = trxLnArr1[len].pricingQty;
        var itemId = trxLnArr1[len].itemId;
        var transactionNumber = trxLnArr1[len].uuidRef;
        var locatorId = trxLnArr1[len].frmLocatorName;
        var rate = trxLnArr1[len].unitSellingPrice;
        var transactionType = this.InterStateForm.get('transactionTypeName').value;

        var resLn: reserveLine = new reserveLine();
        resLn.transactionType = transactionType;
        resLn.transactionNumber = transactionNumber;
        resLn.locId = locId1;
        resLn.reservedQty = prqty;
        resLn.invItemId = itemId;
        resLn.locatorId = locatorId;
        resLn.rate = rate;
        this.service.reservePost(resLn).subscribe((res: any) => {
          if (res.code === 200) {
            var stkRow: StockTransferRow = new StockTransferRow();
            stkRow.segment = (trxLnArr1[i].segment);
            stkRow.Locator = (trxLnArr1[i].frmLocator);
            stkRow.quantity = (trxLnArr1[i].quantity);
            this.itemMap3.set(trxLnArr1[i].segment, stkRow);
          }
          else {
            if (res.code === 400) {
              alert(res.message);
              this.InterStateForm.reset();
            }
          }
        }
        );
      }

      deleteReserve() {
        // alert('delete reserve')
        // var transferId = this.CounterSaleOrderBookingForm.get('uuidRef').value;
        var trxLnArr2 = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
         var   trxLnArr1=trxLnArr2.getRawValue();
        for (let j = 0; j < trxLnArr1.length; j++) {
          var transferId = trxLnArr1[j].uuidRef;
          this.service.reserveDelete(transferId, Number(sessionStorage.getItem('locId'))).subscribe((res: any) => {
            if (res.code === 200) {
            }
          });
        }
      }

      deleteReserveLinewise(i, itemid, transferId) {
        // alert(i+'----'+itemid)
        //var transferId = this.CounterSaleOrderBookingForm.get('uuidRef').value;
        // var trxLnArr1 = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
        // console.log(trxLnArr1);
        // var transferId = trxLnArr1[i].uuidRef;
        // console.log(transferId);

        if (itemid != null) {
          // alert(i+'----'+itemid+'---'+transferId);
          this.service.reserveDeleteLine(transferId, Number(sessionStorage.getItem('locId')), itemid).subscribe((res: any) => {
            //  var obj=res.obj;
            if (res.code === 200) {
            }
          });
        }
      }
close() {
  this.router.navigate(['admin']);
}
refresh() {
  window.location.reload();
}
}
