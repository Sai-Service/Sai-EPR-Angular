import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';
// import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
// import { freemem } from 'os';


interface IinterState {
  InterStateNo: number;
  orderNumber: number;
  transactionTypeName: number;
  divisionId: number;
  customerSiteId: number;
  BillLocName: string;
  billToLocId: number;
  paymentType: string;
  paymentTermId: number;
  priceListName: string;
  priceListId: number;
  issuedBy: string;
  orderStatus: string;
  remarks: string;
  custAccountNo: number;
  locatorId:number;
}


export class StockTransferRow {
  segment: string;
  Locator: string;
  quantity: number;
  customerId: number;
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
  InterStateForm: FormGroup;
  InterStateNo: number;
  orderNumber: number;
  transactionTypeName: string;
  public orderTypeList: any;
  public priceListNameList: any;
  createOrderTypeList: any = [];
  createOrderType: string = 'Direct Invoice'
  BillLocName: string;
  paymentType: string;
  paymentTermId: number;
  priceListName: string;
  priceListId: number;
  issuedBy: string;
  orderStatus: string;
  remarks: string;
  trxNumber: number;
  orderedDate = new Date();
  subtotal: number;
  totTax: number;
  totAmt: number;
  custAccountNo: number;
  custName: string;
  mobile1: number;
  lineNumber:number;
  custAddress: string;
  state: string;
  gstNo: string;
  allDatastore: any;
  poLineTax: number;
  userList2: any[] = [];
  lastkeydown1: number = 0;
  locId: number;
  deptId: number;
  divisionId: number;
  ouId: number;
  deptName: string;
  public ItemIdList: any = [];
  itemId: number;
  public subInvCode: any;
  taxCategoryId: number;
  baseAmt: number;
  public taxCalforItem: any;
  public addonDescList: any[];
  indexVal: number;
  public taxCategoryList: any[];
  lstInvLineDeatails1: any[];
  taxCategoryName: string;
  segment: string;
  selectedLine = 0;
  orderedItem: string;
  billToLocId: number;
  subInventoryId: number;
  public minDate = new Date();
  getshiplist: any = [];
  frmLocatorId: number;
  locData  :any= [];
  // {
  //   "locatorId": 999,
  //   "segmentName": "D.U.01.D.01",
  //   "id": 7,
  //   "onHandQty": 40
  // }
  Avalqty: number;
  onhand1: any;
  resveQty: number;
  onHandQty: number;
  id: number;
  emplId: number;
  validday: number;
  invType: string;
  locationId: number;
  locCode: string;
  public op: string;
  lstgetOrderLineDetails: any[];
  lstgetOrderTaxDetails: any[];
  displayLineflowStatusCode: Array<boolean> = [];
  displayCounterSaleLine: Array<boolean> = [];
  resrveqty: any;
  getItemDetail: any;
  getfrmSubLoc: any;
  custtaxCategoryName: string;

  public itemMap2 = new Map<number, any[]>();
  public itemMap3 = new Map<string, StockTransferRow>();
  public taxMap = new Map<string, any>();
  customerSiteId: number;
  customerId: number;
  pipe: any;
  displayfrmLocatorName=true;
  frmLocatorName:string;
  displaytaxCategoryName=true;
  isVisible11: boolean = true;
  uuidRef: string;
  displayaddButton: boolean = true;
  locatorId:number;

  @ViewChild('instateForm') instateForm: ElementRef;
  // instateForm: any;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService) {
    this.InterStateForm = fb.group({
      orderNumber: [],
      InterStateNo: [],
      subInventoryId: [],
      transactionTypeName: [],
      paymentType: [],
      paymentTermId: [],
      priceListName: [],
      priceListId: [],
      BillLocName: [''],
      billToLocId: [],
      issuedBy: [],
      orderStatus: [],
      remarks: [],
      trxNumber: [],
      orderedDate: [],
      customerSiteId: [],
      subtotal: [],
      totTax: [],
      totAmt: [],
      custAccountNo: [],
      custName: [],
      mobile1: [],
      custAddress: [],
      state: [],
      gstNo: [],
      validday: [],
      ouId: [],
      emplId: [],
      locationId: [],
      createOrderType: [],
      locCode: [],
      custtaxCategoryName: [],
      customerId: [],
      oeOrderLinesAllList: this.fb.array([this.orderlineDetailsGroup()]),
      taxAmounts: this.fb.array([this.TaxDetailsGroup()]),
    })
  }

  orderlineDetailsGroup() {
    return this.fb.group({
      // lineNumber:[''],
      // segment:[''],
      itemId: [],
      uuidRef: [''],
      orderedItem: [''],
      pricingQty: [''],
      unitSellingPrice: [''],
      taxCategoryName: [''],
      baseAmt: [],
      taxAmt: [''],
      totAmt: [''],
      flowStatusCode: [''],
      category: [''],
      invType: [''],
      hsnSacCode: [''],
      // invType:[''],
      taxCategoryId: [''],
      displaysegment: false,
      lineNumber: [''],
      orderNumber: [''],
      segment: [''],
      orgId: [''],
      frmLocatorId: ['', [Validators.required]],
      Avalqty: [],
      resveQty: [],
      onHandQty: [],
      id: [],
      frmLocatorName:[],
      locatorId:[],
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

  InterState(InterStateForm: any) { }


  ngOnInit(): void {
    this.issuedBy = (sessionStorage.getItem('ticketNo'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.deptId = Number(sessionStorage.getItem('deptId'));
    this.locationId = Number(sessionStorage.getItem('locId'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.deptName = (sessionStorage.getItem('deptName'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.locCode = (sessionStorage.getItem('locCode'));
    this.paymentType = 'IMMEDIATE';
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.orderlineDetailsArray().controls[0].patchValue({ flowStatusCode: 'BOOKED' });

    this.service.iotOrderTypeList()
      .subscribe(
        data1 => {
          this.createOrderTypeList = data1;
          console.log(this.createOrderTypeList);
          // data1 = this.createOrderTypeList;
          // this.InterStateForm.patchValue({transactionTypeName:this.createOrderTypeList.transactionTypeName});
          this.transactionTypeName = this.createOrderTypeList[0].transactionTypeName;
          alert(this.transactionTypeName);
          this.InterStateForm.patchValue({transactionTypeName:this.transactionTypeName});
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

    this.orderManagementService.priceListNameList1(sessionStorage.getItem('ouId'), (sessionStorage.getItem('divisionId')))
      .subscribe(
        data => {
          this.priceListNameList = data;
          console.log(this.priceListNameList);
          for (let i = 0; i < data.length; i++) {
            if (data[i].ouId === 999) {
              this.InterStateForm.patchValue({ priceListName: data[i].priceListName })
              this.InterStateForm.patchValue({ priceListId: data[i].priceListHeaderId })
            }
          }
        }
      );
//subInvCode2(deptId, divisionId) {
  this.service.subInvCode2(this.deptId, this.divisionId).subscribe(
      data => {
        this.subInvCode = data;
        console.log(this.subInventoryId);
        this.subInventoryId = this.subInvCode.subInventoryId;
        this.InterStateForm.patchValue({ subInventoryId: this.subInvCode.subInventoryId })

        // alert(this.subInventoryId);
      });

      this.taxCategoryList=[{taxCategoryId: 0, 
        taxCategoryName: "Sample", ouId: 0, gstPercentage: 0}
    ];
    //   this.service.taxCategoryIgstListForSALES()
    // .subscribe(
    //   data1 => {
    //     this.taxCategoryList = data1;
    //     console.log(this.taxCategoryList);
       
    //   }
    // )
    //;comment by vinita

    this.orderlineDetailsGroup();
    var patch = this.InterStateForm.get('oeOrderLinesAllList') as FormArray
    (patch.controls[0]).patchValue(
      {
        lineNumber: 1,
        uuidRef: uuidv4()
      }
    );

  }


  getInvItemId($event) {
    // alert('in getInvItemId')
    let userId = (<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
    this.userList2 = [];
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


  addRow(i) {
    if (i > -1) {
      this.reservePos(i);
    }
    this.orderlineDetailsArray().push(this.orderlineDetailsGroup());
    var len = this.orderlineDetailsArray().length;
    // alert(len);
    var patch = this.InterStateForm.get('oeOrderLinesAllList') as FormArray
    var refId = uuidv4();
    (patch.controls[len - 1]).patchValue(
      {
        lineNumber: len,
        flowStatusCode:'BOOKED',
        uuidRef: refId
      }
    );
  }

  RemoveRow(OrderLineIndex) {
    var trxLnArr2 = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
    var trxLnArr1=trxLnArr2.getRawValue();
    var itemid = trxLnArr1[OrderLineIndex].segment;
    var itemid1 = trxLnArr1[OrderLineIndex].itemId;
    var uuidref = trxLnArr1[OrderLineIndex].uuidRef;
    if (itemid != null || itemid != undefined) {
      this.deleteReserveLinewise(OrderLineIndex, itemid1, uuidref);
      this.itemMap3.delete(itemid);
    }
    this.orderlineDetailsArray().removeAt(OrderLineIndex);
    this.locData.splice(OrderLineIndex,1)

  }

  onOptiongetItem(event) {
    
    if(event != undefined){
    if (this.subInventoryId != undefined) {
      this.service.ItemIdListDept(this.deptId, this.locId, this.subInventoryId).subscribe(
        data => {
          this.ItemIdList = data;
          console.log(this.ItemIdList);
        });
    }
    // alert('get  Item ' +  this.getshiplist.length);
    var select1 = this.getshiplist.find(d => d.toLocation === event);
    // alert(select1.custAccountNo);
    if (select1 != undefined) {
      this.custAccountNo = select1.custAccountNo;
      this.custName = select1.custName;
      this.mobile1 = select1.mobile1;
      this.custAddress = select1.address1 + select1.address2 + select1.address3;
      this.state = select1.state;
      this.gstNo = select1.gstNo;
      this.billToLocId = select1.toLocationId;
      this.InterStateForm.patchValue({
        custtaxCategoryName: select1.taxCategoryName,
        customerSiteId: select1.customerSiteId,
        customerId: select1.customerId
      })
    }
  }
  }
  taxDetails(op, i, taxCategoryId) {
    // alert('hi'+' ' +op+'-' +i);
    // alert(this.displayCounterSaleLine[i]);
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

          }));
        }
      });
    }
    else {
      // alert('Hi');
      this.poLineTax = i;
      // var itemId = this.invItemList1[i].itemId;
      var taxCategoryId = taxCategoryId;
      //this.taxCategoryId = taxCategoryId;
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
      this.service.taxCalforItem(this.itemId, taxCategoryId, diss, this.baseAmt)
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
    let controlinv = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;

   let select = this.ItemIdList.find(d => d.SEGMENT === event);
   if(select!=undefined){
   controlinv.controls[k].patchValue({ itemId: select.itemId});
    if (event != undefined) {
   this.orderManagementService.addonDescList1(event, this.custtaxCategoryName, this.priceListId)
        .subscribe(
          data => {
            if (data.code === 200) {
              this.addonDescList = data.obj; //// item iformation
              console.log(data.obj);
              
              for (let i = 0; i < data.obj.length; i++) {
                var taxCatNm: string = data.obj[i].taxCategoryName;
                // alert(taxCatNm.includes)
                if (taxCatNm.includes('Sale-S&C')) {
                  (controlinv.controls[k]).patchValue({
                    itemId: data.obj[i].itemId,
                    orderedItem: data.obj[i].description,
                    hsnSacCode: data.obj[i].hsnSacCode,
                    uom: data.obj[i].uom,
                    taxCategoryName:data.obj[i].taxCategoryName,
                    taxCategoryId:data.obj[i].taxCategoryId,
                    // unitSellingPrice: data.obj[0].priceValue,by vinita
                  });
                  this.InterStateForm.get('BillLocName').disable();
                  // alert(this.custtaxCategoryName+'--'+ data.obj[i].taxCategoryId)
           
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
                    }
                    else {
                      this.getfrmSubLoc = data;
                      console.log(this.getfrmSubLoc);
                      this.locData[k] = data;
                      var selLocator = this.locData[k];
                      controlinv.controls[k].get('frmLocatorId').enable();
                      if (this.getfrmSubLoc.length == 1) {
                        controlinv.controls[k].patchValue({ onHandId: selLocator[0].segmentName });
                        controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].ROWNUM });
                        controlinv.controls[k].patchValue({locatorId:selLocator[0].locatorId});
                        controlinv.controls[k].patchValue({ frmLocator: selLocator[0].segmentName });
                        controlinv.controls[k].patchValue({ onHandQty: selLocator[0].onHandQty });
                        controlinv.controls[k].patchValue({ id: selLocator[0].id });
                        controlinv.controls[k].patchValue({ unitSellingPrice: selLocator[0].prc });
                      }
                      else {
                        // alert('2');
                        // alert(selLocator[0].segmentName);
                        alert('Please check Item has old stock with price');
                        controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].ROWNUM });
                        controlinv.controls[k].patchValue({ frmLocator: selLocator[0].segmentName });
                        controlinv.controls[k].patchValue({locatorId:selLocator[0].locatorId});
                        // controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].locatorId });
                        controlinv.controls[k].patchValue({ onHandQty: selLocator[0].onHandQty })
                        controlinv.controls[k].patchValue({ id: selLocator[0].id });
                        controlinv.controls[k].patchValue({ unitSellingPrice: selLocator[0].prc });
                      }
                    }
                  });


              }
              if (this.deptName == 'Spares') {
                controlinv.controls[k].patchValue({ invType: 'SS_SPARES' });
              }
              this.service.getreserqty(this.locId, select.itemId).subscribe
                (data => {
                  this.resrveqty = data;
                  controlinv.controls[k].patchValue({ resveQty: this.resrveqty });
                  this.AvailQty(select.itemId,k);
                });
            }
            else  if (taxCatNm.includes('Sale-I-GST')) {
              (controlinv.controls[k]).patchValue({
                itemId: data.obj[i].itemId,
                orderedItem: data.obj[i].description,
                hsnSacCode: data.obj[i].hsnSacCode,
                uom: data.obj[i].uom,
                taxCategoryName:data.obj[i].taxCategoryName,
                taxCategoryId:data.obj[i].taxCategoryId,
                // unitSellingPrice: data.obj[0].priceValue,by vinita
              });
           
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
                    }
                    else {
                      this.getfrmSubLoc = data;
                      console.log(this.getfrmSubLoc);
                      this.locData[k] = data;
                      var selLocator = this.locData[k];
                      controlinv.controls[k].get('frmLocatorId').enable();
                      if (this.getfrmSubLoc.length == 1) {
                        controlinv.controls[k].patchValue({ onHandId: selLocator[0].segmentName });
                        controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].ROWNUM });
                        controlinv.controls[k].patchValue({locatorId:selLocator[0].locatorId});
                        controlinv.controls[k].patchValue({ frmLocator: selLocator[0].segmentName });
                        controlinv.controls[k].patchValue({ onHandQty: selLocator[0].onHandQty });
                        controlinv.controls[k].patchValue({ id: selLocator[0].id });
                        controlinv.controls[k].patchValue({ unitSellingPrice: selLocator[0].prc });
                      }
                      else {
                        // alert('2');
                        // alert(selLocator[0].segmentName);
                        alert('Please check Item has old stock with price');
                        controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].ROWNUM });
                        controlinv.controls[k].patchValue({ frmLocator: selLocator[0].segmentName });
                        controlinv.controls[k].patchValue({locatorId:selLocator[0].locatorId});
                        // controlinv.controls[k].patchValue({ frmLocatorId: selLocator[0].locatorId });
                        controlinv.controls[k].patchValue({ onHandQty: selLocator[0].onHandQty })
                        controlinv.controls[k].patchValue({ id: selLocator[0].id });
                        controlinv.controls[k].patchValue({ unitSellingPrice: selLocator[0].prc });
                      }
                    }
                  });


              }
              if (this.deptName == 'Spares') {
                controlinv.controls[k].patchValue({ invType: 'SS_SPARES' });
              }
              this.service.getreserqty(this.locId, select.itemId).subscribe
                (data => {
                  this.resrveqty = data;
                  controlinv.controls[k].patchValue({ resveQty: this.resrveqty });
                  this.AvailQty(select.itemId,k);
                });
            }
          }
          }
        });
    }
  }
  }
  AvailQty (event: any, i){
    alert(i+'I');
    var trxLnArr = this.InterStateForm.get('oeOrderLinesAllList').value;
    console.log(trxLnArr);
    
    var itemid = trxLnArr[i].itemId;
    var locId1 = trxLnArr[i].frmLocatorId;
    // alert(locId1);
    console.log(this.getfrmSubLoc);
    var locId = this.getfrmSubLoc.find(d => d.ROWNUM === locId1);
    alert(locId.locatorId);
    var onhandid = trxLnArr[i].id;
    this.service.getonhandqty(Number(sessionStorage.getItem('locId')), this.subInventoryId, locId.locatorId, itemid).subscribe
      (data => {
        this.onhand1 = data;
        console.log(this.onhand1);
        var trxLnArr1 = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
        trxLnArr1.controls[i].patchValue({ onHandQty: data.obj });
        // var trxLnArr=this.moveOrderForm.get('trxLinesList').value;
        let onHand = data.obj;
        // alert(onHand+'ONHAND');
        let reserve = trxLnArr[i].resveQty;
        let avlqty1 = 0;
        alert(data.obj+'qty');
        avlqty1 = data.obj - reserve;
        alert(avlqty1+'avlqty');
        // trxLnArr1.controls[i].patchValue({ avlqty: avlqty1 });
        // trxLnArr1.controls[i].patchValue({ resveQty: reserve });
        if (avlqty1 <= 0) {
          alert(
            'Transfer is not allowed,Item has Reserve quantity - ' + reserve
          );

        var trxLnArr3 = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
        trxLnArr3.controls[i].patchValue({segment:'',orderedItem:'',frmLocatorId:'',unitSellingPrice:'',taxCategoryName:'',hsnSacCode:'',locatorId:''});
        // trxLnArr3[i].reset();
       }
      else
    {
      var trxLnArr1 = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
        trxLnArr1.controls[i].patchValue({ Avalqty: avlqty1 });
        trxLnArr1.controls[i].patchValue({ resveQty: reserve });
         return avlqty1
    } })
  }

  onKey(index) {
    console.log(index);

    var arrayControl = this.InterStateForm.get('oeOrderLinesAllList').value
    var patch = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
    console.log(arrayControl);
    var itemId = arrayControl[index].itemId;
    var taxcatName = arrayControl[index].taxCategoryName;
    // var arrayControl = arrayControl.getRawValue();
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
    var isvalidqty = this.validate(index, pricingQty);

    if (isvalidqty == false) {
      return;
    }

    // alert(taxcatName)
    console.log(taxcatName);
    let select;
    var taxCategoryId = arrayControl[index].taxCategoryId;
    // alert(taxCategoryId);
    if (taxCategoryId === null) {

      select = this.taxCategoryList[index].find(d => d.taxCategoryName === taxcatName.taxCategoryName);
      // taxCategoryId = select.taxCategoryId;
      patch.controls[index].patchValue({ taxCategoryId: select.taxCategoryId });
      patch.controls[index].patchValue({ taxCategoryName: select.taxCategoryName });
    } else {
      // alert("2" + taxCategoryId)
      // select = [{ taxCategoryId: taxCategoryId, taxCategoryName: taxcatName }];
      // console.log(select);
      // taxCategoryId = select.taxCategoryId;
      patch.controls[index].patchValue({ taxCategoryId: taxCategoryId });
      patch.controls[index].patchValue({ taxCategoryName: taxcatName });
    }

    patch.controls[index].patchValue({ disAmt: 0 });
    var baseAmt = arrayControl[index].unitSellingPrice * arrayControl[index].pricingQty;

    // var disAmt1 = arrayControl[index].disAmt;
    var disAmt1 = 0;
    var invLineNo1 = index + 1;
    console.log(invLineNo1);
    var sum = 0;
    // var baseAmount = this.sum;
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
          (patch.controls[index]).patchValue({
            baseAmt: Math.round((baseAmt + Number.EPSILON) * 100) / 100,
            // baseAmtLineWise: arrayControl[index].baseAmtLineWise,
            taxAmt:Math.round((sum + Number.EPSILON) * 100) / 100,
            totAmt: Math.round((baseAmt + sum + Number.EPSILON) * 100) / 100,
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
        var itemId1 = arrayControl[index].itemId;
        // if (event.keyCode != 13) {
          if (itemId1 != null ) {
            this.addRow(index);
          }
        // }
        else {
          // this.displayRemoveRow.push(true);
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

    //this.taxCategoryId = select.taxCategoryId;
    console.log(this.taxCategoryId);

    let controlinv = this.InterStateForm.get('taxAmounts') as FormArray;
    var diss = 0;
    if (this.baseAmt != undefined) {
      this.service.taxCalforItem(this.itemId, select.taxCategoryId, diss, this.baseAmt)
        .subscribe(
          (data: any[]) => {
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
    this.segment = this.ItemIdList.find(d => d.SEGMENT === this.segment);
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

  IntterstateSaleOrderSave() {
    const formValue = this.transData(this.InterStateForm.value);
    // var orderLine = this.InterStateForm.get('oeOrderLinesAllList').value;
    // formValue.flowStatusCode = 'BOOKED';
    this.ouId = Number(sessionStorage.getItem('ouId'));
    // this.emplId = Number(sessionStorage.getItem('emplId'));
    formValue.divisionId=this.divisionId;
    for (let i = 0; i < formValue.oeOrderLinesAllList.length; i++) {
    //  alert(formValue.oeOrderLinesAllList[i].taxCategoryId);
      formValue.oeOrderLinesAllList[i].frmLocatorId =  formValue.oeOrderLinesAllList[i].locatorId;
    }
    this.orderManagementService.SaveCounterSaleOrder(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        this.orderNumber = res.obj;
        (document.getElementById('btnOrder') as HTMLInputElement).disabled = true;    
        console.log(this.orderNumber);
        alert(res.message);
        this.orderNumber = res.obj;
        // this.orderNumber=this.CounterSaleOrderBookingForm.get('orderNumber').value;
        console.log(this.orderNumber);
        this.displayaddButton = false;
        this.OrderFind(this.orderNumber);
      } else {
        if (res.code === 400) {
          alert(res.message);
          // this.SalesOrderBookingForm.reset();
        }
      }
    });
  }

 
  OrderFind(orderNumber) {
    this.op = 'Search';
    // this.isDisabled10=false;
    this.isVisible11=false;
    this.emplId = Number(sessionStorage.getItem('emplId'))
    this.orderlineDetailsArray().clear();
    this.orderlineDetailsArray().disable();
    this.TaxDetailsArray().clear();
    this.displayfrmLocatorName=false;
    this.displaytaxCategoryName=false;
       this.orderManagementService.counterSaleOrderSearchNew(orderNumber, sessionStorage.getItem('locId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.lstgetOrderLineDetails = data.obj.oeOrderLinesAllList;
            this.lstgetOrderTaxDetails = data.obj.taxAmounts;
            this.allDatastore = data.obj;
            this.InterStateForm.disable();
            let control = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
            let control1 = this.InterStateForm.get('taxAmounts') as FormArray;
            for (let i = 0; i <= this.lstgetOrderLineDetails.length - 1; i++) {
              var oeOrderLinesAllList1: FormGroup = this.orderlineDetailsGroup();
              control.push(oeOrderLinesAllList1);
              this.displayLineflowStatusCode.push(true);
              this.displayCounterSaleLine.push(false);
              control.controls[i].get('segment').disable();
              control.controls[i].get('Avalqty').disable();
              control.controls[i].get('pricingQty').disable();
            }
            for (let j = 0; j <= this.lstgetOrderTaxDetails.length; j++) {
              var orderTaxLinesList: FormGroup = this.TaxDetailsGroup();
              control1.push(orderTaxLinesList);
            }
            this.InterStateForm.patchValue(data.obj);
           
            this.createOrderType = data.obj.createOrderType;
            this.priceListName = data.obj.priceListName;
            this.paymentType = data.obj.paymentType;
            this.paymentTermId = data.obj.paymentTermId;
            this.InterStateForm.patchValue({ trxNumber: data.obj.trxNumber })
            this.totTax = Math.round((data.obj.totTax + Number.EPSILON) * 100) / 100;
            this.totAmt = Math.round((data.obj.totAmt + Number.EPSILON) * 100) / 100;
            this.subtotal = Math.round((data.obj.subtotal + Number.EPSILON) * 100) / 100;

            this.InterStateForm.patchValue({ name: data.obj.billLocName });
            this.InterStateForm.patchValue({ trxNumber: data.obj.trxNumber })
            var orderedDate1 = data.obj.orderedDate;
            var orderedDate2 = this.pipe.transform(orderedDate1, 'dd-MM-yyyy');
            this.InterStateForm.patchValue(({ orderedDate: orderedDate2 }));
            this.transactionTypeName = data.obj.transactionTypeName;
            for (let k = 0; k < data.obj.oeOrderLinesAllList.length; k++) {
              this.InterStateForm.patchValue({ baseAmt: this.lstgetOrderLineDetails[k].baseAmt });
              let controlinv = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
              (controlinv.controls[k]).patchValue({
                baseAmt: Math.round((data.obj.oeOrderLinesAllList[k].baseAmt + Number.EPSILON) * 100) / 100,
                taxAmt: Math.round((data.obj.oeOrderLinesAllList[k].taxAmt + Number.EPSILON) * 100) / 100,
                totAmt: Math.round((data.obj.oeOrderLinesAllList[k].totAmt + Number.EPSILON) * 100) / 100,
                unitSellingPrice: Math.round((data.obj.oeOrderLinesAllList[k].unitSellingPrice + Number.EPSILON) * 100) / 100,
                disPer: data.obj.oeOrderLinesAllList[k].disPer,
                taxCategoryId: data.obj.oeOrderLinesAllList[k].taxCategoryId,
                frmLocatorId:data.obj.oeOrderLinesAllList[k].frmLocatorId,
                taxCategoryName:data.obj.oeOrderLinesAllList[k].taxCategoryName,
              });
            }

            for (let k = 0; k < data.obj.taxAmounts.length; k++) {
              let controlinv = this.InterStateForm.get('taxAmounts') as FormArray;
              (controlinv.controls[k]).patchValue({
                totTaxAmt: data.obj.taxAmounts[k].totTaxAmt,
              });
              this.TaxDetailsArray().disabled;
            }
            this.InterStateForm.patchValue({ orderedDate: data.obj.orderedDate });
            this.InterStateForm.get('orderedDate').disable();
            // alert( data.obj.orderStatus +'-----' + data.obj.trxNumber);
            if (data.obj.orderStatus != 'BOOKED' && data.obj.trxNumber != null) {
              // this.isVisible = true;
            }
            else {
              // this.isVisible = false;
            }
            this.InterStateForm.controls['emplId'].patchValue(Number(sessionStorage.getItem('emplId')));

         
        }
        this.displayaddButton = false;
      });
  }

  reservePos(i) {
    var len = i;
    var trxLnArr1 = this.InterStateForm.get('oeOrderLinesAllList').value;
    console.log(trxLnArr1);
    var locId1 = Number(sessionStorage.getItem('locId'));
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
  close() {
    this.deleteReserve();
    this.router.navigate(['admin']);
  }
  refresh() {
    this.deleteReserve();
    window.location.reload();
  }
  deleteReserveLinewise(i, itemid, transferId) {
     if (itemid != null) {
      // alert(i+'----'+itemid+'---'+transferId);
      this.service.reserveDeleteLine(transferId, Number(sessionStorage.getItem('locId')), itemid).subscribe((res: any) => {
        //  var obj=res.obj;
        if (res.code === 200) {
        }
      });
    }
  }

  validate(index: number, qty1) {
    // var trxLnArr = this.CounterSaleOrderBookingForm.get('oeOrderLinesAllList').value;
    var trxLnArr1 = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
    var trxLnArr = trxLnArr1.getRawValue();

    var locator = trxLnArr[index].frmLocatorId;

    var Avalqty = trxLnArr[index].Avalqty;
    let uomCode = trxLnArr[index].uom;
    let unitSellingPrice = trxLnArr[index].unitSellingPrice;
    // if (this.orderNumber === undefined && Avalqty != null || Avalqty != undefined) {
    if (qty1 > Avalqty) {
      alert('Please enter available quantity')
      trxLnArr1.controls[index].patchValue({ pricingQty: Avalqty });
    }
    
    let selloc = this.locData[index].find(d => Number(d.ROWNUM) === Number(locator));
    console.log(this.locData[index]);

    
    if (qty1 > selloc.onHandQty) {
      alert("Item available with multiple price , Please check price and available quantity!!")
      qty1 = selloc.onHandQty;
      trxLnArr1.controls[index].patchValue({ pricingQty: selloc.onHandQty });

    }

 if (this.orderNumber === undefined && Avalqty != null || Avalqty != undefined) {
      if (qty1 <= 0) {
        alert("Please enter quantity more than zero");
        trxLnArr1.controls[index].patchValue({ quantity: '' });
        this.setFocus('pricingQty');
        return false;
      }

      if (uomCode === 'NO') {
        if (!(Number.isInteger(qty1))) {
          alert('Please enter correct No');
          trxLnArr1.controls[index].patchValue({ pricingQty: '' });
          return;
        }
      }
      if (unitSellingPrice <= 0) {
        alert("Please enter more than zero amount");
        trxLnArr1.controls[index].patchValue({ unitSellingPrice: '' });
        trxLnArr1.controls[index].patchValue({ baseAmt: '' });
        trxLnArr1.controls[index].patchValue({ taxAmt: '' });
        trxLnArr1.controls[index].patchValue({ totAmt: '' });
        (<any>trxLnArr[index].get('unitSellingPrice')).nativeElement.focus();
        return false;
      }
    }
  } 
  setFocus(name) {

    const ele = this.instateForm.nativeElement[name];
    if (ele) {
      ele.focus();
    }
  }
  ngOnDestroy(): void {
    alert('Window Closed Directely.!');
    this.deleteReserve();
    return;
  }
  deleteReserve() {
    // alert('delete reserve')
    // var transferId = this.CounterSaleOrderBookingForm.get('uuidRef').value;
    var trxLnArr2 = this.InterStateForm.get('oeOrderLinesAllList') as FormArray;
    var trxLnArr1 = trxLnArr2.getRawValue();
    for (let j = 0; j < trxLnArr1.length; j++) {
      var transferId = trxLnArr1[j].uuidRef;
      this.service.reserveDelete(transferId, Number(sessionStorage.getItem('locId'))).subscribe((res: any) => {
        if (res.code === 200) {
        }
      });
    }
  }
  @HostListener('window:unload', ['$event'])
  keyEvent1(event: KeyboardEvent) {
    this.deleteReserve();
    console.log(event);
  }
}
