import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { trigger } from '@angular/animations';
import * as xlsx from 'xlsx';

interface IOrderGen {
  segment: string;
  orderQty: number;
}


export class orderGenList {
  segment: string;
  orderQty: number;
}

@Component({
  selector: 'app-order-generation',
  templateUrl: './order-generation.component.html',
  styleUrls: ['./order-generation.component.css']
})

export class OrderGenerationComponent implements OnInit {
  orderGenerationForm: FormGroup;
  @ViewChild('aForm') aForm: ElementRef;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild('epltable1', { static: false }) epltable1: ElementRef;
  @ViewChild('orderList', { static: false }) orderList: ElementRef;


  pipe = new DatePipe('en-US');
  public minDate = new Date();

  lstClearBackOrder: any;
  lstOrderList: any;
  lstLatestOrder: any;
  public lstItemDetails: any;

  dataDisplay: any;
  loginName: string;
  loginArray: string;
  divisionId: number;
  name: string;
  ouName: string;
  locId: number;
  locationId: number;
  locName: string;
  orgId: number;
  ouId: number;
  deptId: number;
  emplId: number;

  orderNumber='BJ-2102100037'
  // orderNumber: string;

  fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  toDate = this.pipe.transform(Date.now(), 'y-MM-dd');

  orderDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  // order
  status: string; //='Active';
  consCriteria: number = 3;
  currMonthYN: string = 'Yes';
  orderValue: number;
  dlrCode: string = '15209';
  cdmsRefNo: string; //='TEST-CDMS-123';

  mth1ConWsQty: number;
  mth2ConWsQty: number;
  mth3ConWsQty: number;

  mth1ConsSaleQty: number;
  mth2ConsSaleQty: number;
  mth3ConsSaleQty: number;

  currSaleQty: number;
  consSaleQty: number;
  currWsQty: number;
  conWsQty: number;

  partNumber: string;
  partDesc: string;

  displayButton = false;
  spinIcon = false;
  dispGenOrdButton = true;
  dispShowOrdButton = true;
  addNewLine = false;
  lineItemRepeated = false;
  lineValidation = false;
  viewLogFile = false;
  orderUpdateStatus =true;

  // epltable1: any;

  constructor(private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService, private fb: FormBuilder, private router: Router) {
    this.orderGenerationForm = fb.group({

      loginArray: [''],
      loginName: [''],
      divisionId: [],
      ouName: [''],
      locId: [''],
      locationId: [],
      locName: [''],
      ouId: [],
      deptId: [],
      emplId: [''],
      orgId: [''],

      orderNumber: [],
      fromDate: [],
      toDate: [],

      status: [],
      orderDate: [],
      consCriteria: [],
      currMonthYN: [],
      orderValue: [],
      dlrCode: [],
      cdmsRefNo: [],

      mth1ConWsQty: [],
      mth2ConWsQty: [],
      mth3ConWsQty: [],
      mth1ConsSaleQty: [],
      mth2ConsSaleQty: [],
      mth3ConsSaleQty: [],


      partNumber: [],
      partDesc: [],

      currSaleQty: [],
      consSaleQty: [],
      currWsQty: [],
      conWsQty: [],



      orderList: this.fb.array([this.lineDetailsGroup()])

    });
  }

  lineDetailsGroup() {
    return this.fb.group({
      sprOrderId: [''],
      itemId: [''],
      segment: ['', [Validators.required]],
      description: ['', [Validators.required]],
      unitPrice: ['', [Validators.required]],

      mth1ConWsQty: ['', [Validators.required]],
      mth2ConWsQty: ['', [Validators.required]],
      mth3ConWsQty: ['', [Validators.required]],
      currWsQty: ['', [Validators.required]],
      conWsQty: ['', [Validators.required]],

      mth1ConsSaleQty: ['', [Validators.required]],
      mth2ConsSaleQty: ['', [Validators.required]],
      mth3ConsSaleQty: ['', [Validators.required]],
      currSaleQty: ['', [Validators.required]],
      consSaleQty: ['', [Validators.required]],

      lastOrderQty: [],
      mth1TotalCons: [],
      mth2TotalCons: [],
      mth3TotalCons: [],
      mth4TotalCons: [],
      totalCons: [],



      currentStock: ['', [Validators.required]],
      backOrderQty: ['', [Validators.required]],
      intransitQty: ['', [Validators.required]],
      custBackOrder: ['', [Validators.required]],

      orderQty: ['', [Validators.required]],
      totalValue: ['', [Validators.required]],
      uom: [],
      setQty: [],
      // consumption: ['', [Validators.required]],
      // avgConsumption:[],
      // deadStock:[],
    });
  }

  lineDetailsArray(): FormArray {
    return <FormArray>this.orderGenerationForm.get('orderList')
  }


  get f() { return this.orderGenerationForm.controls; }

  orderGeneration(orderGenerationForm: any) { }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.name = sessionStorage.getItem('name');
    this.loginArray = sessionStorage.getItem('divisionName');
    this.loginName = sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.locName = (sessionStorage.getItem('locName'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.orgId = this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);


  }



  SearchByDate(dt1, dt2) {
    alert("Search by Date..." + dt1 + "," + dt2);
  }

  // clearBackOrder1(){

  //     this.service.clearBakcOrder(this.locId)
  //       .subscribe(
  //         data => {
  //           this.lstClearBackOrder = data;
  //           console.log(this.lstClearBackOrder);
  //         }
  //       );
  //    }


  clearBackOrder() {
    this.service.clearBakcOrder(this.locId).subscribe((res: any) => {
      if (res.code === 200) {
        // alert('RECORD UPDATED SUCCESSFULLY');
        alert(res.message);
        // window.location.reload();
      } else {
        if (res.code === 400) {
          // alert('ERROR OCCOURED IN PROCEESS');
          alert(res.message);
        }
      }
    });
  }




  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  addRow(index) {
   
    var ordLineArr = this.orderGenerationForm.get('orderList').value;
    var len1 = this.lineDetailsArray().length - 1;
    if (len1 === index) {
      if (ordLineArr[index].itemId > 0 && ordLineArr[index].orderQty >= 0) {
        this.lineDetailsArray().push(this.lineDetailsGroup());
      } else {

        if(index>0) {
        alert("Incomplete Line - Order Part No / Order Qty not updated ....Line will be deleted ");
        this.lineDetailsArray().removeAt(index);
        }

        // if(index===0) {
        //   alert("Incomplete Line - Order Part No / Order Qty not updated .... ");
        // }

      }


    }
  }

  RemoveRow(index) {
    if (index === 0) { }
    else {


      this.deleteOrderLine(index)

      this.lineDetailsArray().removeAt(index);
      this.CalculateOrdValue();
    }

  }

  orderHedaerList = [[
    'Part No',
    'Order Qty	',
  ]]



  orderListExport() {
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet([]);
    xlsx.utils.sheet_add_aoa(ws, this.orderHedaerList);
    var orList = this.orderGenerationForm.get('orderList').value;
    var xlOrdList: any = [];
    for (let i = 0; i < orList.length; i++) {
      var ordLn = new orderGenList();
      ordLn.segment = orList[i].segment;
      ordLn.orderQty = orList[i].orderQty;
      xlOrdList.push(ordLn);
    }
    xlsx.utils.sheet_add_json(ws, xlOrdList, { origin: 'A2', skipHeader: true });
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'orderGenerationList.xlsx');
  }





  deleteOrderLine(i) {
    // alert ("Deleting line")
    var ordArr = this.orderGenerationForm.get('orderList').value;
    var orderItemId = ordArr[i].itemId;
    var ordNum = this.orderGenerationForm.get('orderNumber').value;
    if (orderItemId > 0) {

      this.service.orderLineDelete(ordNum, orderItemId).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
        } else {
          if (res.code === 400) {
            alert(res.message);
          }
        }
      });
    }
  }

  transeData(val) {
    delete val.loginArray;
    delete val.loginName;
    delete val.divisionId;
    delete val.division;
    delete val.ouName;
    delete val.locName;
    delete val.locationId;
    delete val.orgId;

    delete val.fromDate;
    delete val.toDate;
    delete val.orderDate;



    delete val.orderList;

    return val;
  }

  transeData1(val) {
    delete val.loginArray;
    delete val.loginName;
    delete val.divisionId;
    delete val.division;
    delete val.ouName;
    delete val.locName;
    delete val.locationId;
    delete val.orgId;
    delete val.fromDate;
    delete val.toDate;
    delete val.orderDate;
    return val;
  }


  CreateOrder() {

    const formValue: IOrderGen = this.transeData(this.orderGenerationForm.value);
    var ordMonths = this.orderGenerationForm.get('consCriteria').value
    var dlrCd = this.orderGenerationForm.get('dlrCode').value

    // alert (  "ts>> Loc Id :" +this.locId + " ," +ordMonths);
    this.dispGenOrdButton = false;
    this.spinIcon = true;
    this.dataDisplay = 'Creating Order....Do not refresh the Page';

    this.service.orderGenBajaj(formValue, this.locId, ordMonths, dlrCd, '').subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.orderNumber = res.obj;
        this.orderGenerationForm.disable();
        this.displayButton = false;
        this.spinIcon = false;
        this.getLatestOrderNumber(this.locId);
        
      } else {
        if (res.code === 400) {
          // alert('Error While Saving Record:-' + res.obj);
          this.getLatestOrderNumber(this.locId);
          this.spinIcon = false;
          this.dataDisplay = '';
        }
      }
    });


  }


  getLatestOrderNumber(mlocId) {
    this.service.getOrderNumberLatest(mlocId)
      .subscribe(
        data => {
          alert("Order Number : " + data.obj +" Created...");
          this.orderNumber = data.obj;
          // if(data.obj !=null) { this.ShowOrder(data.obj) }
        });
  }


  SearchByOrderNo(ordNo) {
    var mOrderNumber = this.orderGenerationForm.get('orderNumber').value
     this.ShowOrder(mOrderNumber);
  }

  ShowOrder(mOrderNumber) {
    this.dispShowOrdButton = false;
    this.dispGenOrdButton = false;
    this.spinIcon=true;
    this.dataDisplay ='Loading Order Details....Pls wait';
    // var mOrderNumber = this.orderGenerationForm.get('orderNumber').value

    this.service.getOrderListBajaj(mOrderNumber)
      .subscribe(
        data => {
          this.lstOrderList = data;
          // alert ("Total order lines :" +data.length);
          if (data.length > 0) {
           this.orderGenerationForm.get('orderNumber').disable();
            this.viewLogFile = true;
           
            this.cdmsRefNo = data[0].cdmsRefNo;
            this.dlrCode = data[0].dlrCode;
            this.status = data[0].status;
            this.orderDate = data[0].orderDate;
            this.consCriteria = data[0].consCriteria;

            if(data[0].cdmsRefNo ==null || data[0].cdmsRefNo ==undefined || data[0].cdmsRefNo.trim() =='' ){
            this.displayButton = true; this.orderUpdateStatus=true;
            } else { 
               this.displayButton = false;
               this.orderUpdateStatus=false;
               this.orderGenerationForm.disable();
              
              }

            console.log(this.lstOrderList);
            var len = this.lineDetailsArray().length;
            var y = 0;
            for (let i = 0; i < this.lstOrderList.length - len; i++) {
              var ordLnGrp: FormGroup = this.lineDetailsGroup();
              this.lineDetailsArray().push(ordLnGrp);
              y = i;

            }

            this.orderGenerationForm.get('orderList').patchValue(this.lstOrderList);

           
            this.CalculateOrdValue();

          } else { alert (mOrderNumber+ "  - Order Number doesn't exists");
                   this.orderGenerationForm.get('orderNumber').enable();}
        });



  }


  // UpdateTotalConsumption() {

  //   var len1 = this.lineDetailsArray().length;
  //   var ordArr =this.orderGenerationForm.get('orderList').value;
  //   var patch = this.orderGenerationForm.get('orderList') as FormArray;
  //   for (let i = 0; i < len1; i++) { 
  //     // alert ("in for :"+ordArr[i].mth1ConWsQty);
  //     var wsTotCons1=ordArr[i].mth1ConWsQty+ordArr[i].mth2ConWsQty+ordArr[i].mth3ConWsQty+ordArr[i].currWsQty
  //     var csTotCons1=ordArr[i].mth1ConsSaleQty+ordArr[i].mth1ConsSaleQty+ordArr[i].mth1ConsSaleQty+ordArr[i].currSaleQty

  //     patch.controls[i].patchValue({wsTotCons:wsTotCons1});
  //     patch.controls[i].patchValue({csTotCons:csTotCons1});
  //   }
  // }


  getItemDetails(itmId) {
    this.service.getItemDetail(itmId)
      .subscribe(
        data => {
          this.lstItemDetails = data;
          console.log(this.lstItemDetails);
          // alert ("this.lstItemDetails.segment :"+this.lstItemDetails.segment);
        });
  }

  validateConsMth() {
    var conMth = this.orderGenerationForm.get('consCriteria').value
    if (Number.isInteger(conMth) === false || conMth < 0 || conMth > 12) {
      alert("CONSUMPTION MONTHS : Value Range is 1 - 12 .Enter Integer value only")
      this.orderGenerationForm.patchValue({ consCriteria: 3 });
    }

  }

  validateOrdQty(index: any) {
    var patch = this.orderGenerationForm.get('orderList') as FormArray;
    var orderLineArr = this.orderGenerationForm.get('orderList').value;
    var lineQty = orderLineArr[index].orderQty;
    // if ((mUom=='NO' && Number.isInteger(lineRtnQty)==false ) || lineRtnQty<=0 || lineRtnQty>lineRcdQty || lineRtnQty > avlQty ) 
    if (Number.isInteger(lineQty) === false || lineQty < 0) {
      alert(lineQty + " << Invalid Order Qty.Enter Valid Order Qty")
      patch.controls[index].patchValue({ orderQty: 0 })
    } else {

      var lineValue = orderLineArr[index].orderQty * orderLineArr[index].unitPrice;
      //  lineValue=Math.round((lineValue+Number.EPSILON)*100)/100,
      //  alert (index+"-index :"+  lineValue);
      //  patch.controls[index].patchValue({totalValue:lineValue})
      this.CalculateOrdValue();

    }

  }

  updateOrder() {
    const formValue: IOrderGen = this.transeData1(this.orderGenerationForm.value);
    var cdmsNum = this.orderGenerationForm.get('orderList').value;
    this.displayButton = false;
    this.lineValidation = false;
    var orderLineArr = this.orderGenerationForm.get('orderList').value;
    var len1 = orderLineArr.length;

    for (let i = 0; i < len1; i++) {
      this.CheckLineValidations(i);
      if (this.lineValidation === false) { break; }
    }

    if (this.lineValidation) {
      let variants = <FormArray>this.lineDetailsArray();
      var orderNum = this.orderGenerationForm.get('orderNumber').value;
      var dlrCd = this.orderGenerationForm.get('dlrCode').value;
      var cdmsNo = this.orderGenerationForm.get('cdmsRefNo').value;

      for (let i = 0; i < this.lineDetailsArray().length; i++) {
        let variantFormGroup = <FormGroup>variants.controls[i];
        variantFormGroup.addControl('orderNumber', new FormControl(orderNum, Validators.required));
        variantFormGroup.addControl('dlrCode', new FormControl(dlrCd, Validators.required));
        variantFormGroup.addControl('cdmsRefNo', new FormControl(cdmsNo, Validators.required));

      }
      console.log(variants.value);

      // this.service.OrderLineAddUpdate(formValue).subscribe((res: any) => {
      this.service.OrderLineAddUpdate(variants.value).subscribe((res: any) => {
        if (res.code === 200) { alert(res.message); } else {
          if (res.code === 400) { alert(res.message); this.displayButton = true; }
        }

      });
    } else { alert("Incomplete line details. Save Failed....") }
  }

  CalculateOrdValue() {
    var patch = this.orderGenerationForm.get('orderList') as FormArray;
    var orderLineArr = this.orderGenerationForm.get('orderList').value;
    var len = this.lineDetailsArray().length;
    var orderTotal = 0;

    for (let i = 0; i < len; i++) {
      var lineValue = orderLineArr[i].orderQty * orderLineArr[i].unitPrice;

      lineValue = Math.round((lineValue + Number.EPSILON) * 100) / 100,
        patch.controls[i].patchValue({ totalValue: lineValue });
      orderTotal = orderTotal + lineValue

    }


    orderTotal = Math.round((orderTotal + Number.EPSILON) * 100) / 100,
      this.orderGenerationForm.patchValue({ orderValue: orderTotal })
      this.spinIcon=false;
      this.dataDisplay=null;

  }



  validateItem(index) {
    var ordLineArr = this.orderGenerationForm.get('orderList').value;
    var patch = this.orderGenerationForm.get('orderList') as FormArray;


    var mths = this.orderGenerationForm.get('consCriteria').value;
    var ordNum = this.orderGenerationForm.get('orderNumber').value;

    var mSegment = ordLineArr[index].segment;
    var sprOrdId = ordLineArr[index].sprOrderId;


    mSegment = mSegment.toUpperCase();
    // this.lineDetailsArray().controls[index].get('orderQty').disable();

    // alert (index+" << sprOrdId.."+sprOrdId);

    if (sprOrdId > 0 && mSegment === null || mSegment === undefined || mSegment.trim() === '') {
      var mItemId = ordLineArr[index].itemId;

      if (mItemId > 0) {
        var segment1;
        this.service.getItemDetail(mItemId).subscribe(data => {
          segment1 = data.segment;
          patch.controls[index].patchValue({ segment: segment1 });
          // this.lineDetailsArray().controls[index].get('orderQty').enable();
          return;
        });

      }
      return;
    }

    if (mSegment === null || mSegment === undefined || mSegment.trim() === '') {
      alert("Please Enter Item Code");
      this.lineDetailsArray().controls[index].get('orderQty').reset();
      return;
    }




    var segId;
    var prc;
    this.service.getItemDetailsByCode(mSegment)
      .subscribe(
        data => {
          if (data != null) {
            this.lineDetailsArray().controls[index].get('orderQty').enable();
            segId = data.itemId;
            this.duplicateLineCheck(index, segId, mSegment);
            if (this.lineItemRepeated === false) {

              // this.service.getLineDetailsSingleItem('12MU - Bajaj Distributorship NDP',segId) .subscribe( data => { prc= data[0].priceValue;
              //   patch.controls[index].patchValue({ unitPrice: prc})
              // });

              // posting newly added line item consuption to order table
              this.service.OrderGenNewItemSubmit(sessionStorage.getItem('locId'), mSegment, mths, ordNum).subscribe((res: any) => {
                if (res.code === 200) { // alert(res.message); 
                  this.service.getNewLineConsDetails(segId, ordNum)
                    .subscribe(
                      data => {
                        if (data.length > 0) {

                          (patch.controls[index]).patchValue(
                            {

                              unitPrice: data[0].unitPrice,
                              itemId: data[0].itemId,
                              segment: data[0].segment,
                              description: data[0].description,
                              mth1ConWsQty: data[0].mth1ConWsQty,
                              mth2ConWsQty: data[0].mth2ConWsQty,
                              mth3ConWsQty: data[0].mth3ConWsQty,
                              mth1ConsSaleQty: data[0].mth1ConsSaleQty,
                              mth2ConsSaleQty: data[0].mth2ConsSaleQty,
                              mth3ConsSaleQty: data[0].mth3ConsSaleQty,
                              currWsQty: data[0].currWsQty,
                              currSaleQty: data[0].currSaleQty,
                              conWsQty: data[0].conWsQty,
                              consSaleQty: data[0].consSaleQty,
                              currentStock: data[0].currentStock,
                              backOrderQty: data[0].backOrderQty,
                              intransitQty: data[0].intransitQty,
                              custBackOrder: data[0].custBackOrder,
                              totalValue: data[0].totalValue,
                              lastOrderQty: data[0].lastOrderQty,
                              mth1TotalCons: data[0].mth1TotalCons,
                              mth2TotalCons: data[0].mth2TotalCons,
                              mth3TotalCons: data[0].mth3TotalCons,
                              mth4TotalCons: data[0].mth4TotalCons,
                              totalCons: data[0].totalCons,
                              setQty: data[0].setQty,
                              orderQty: data[0].orderQty,

                            });
                        } else {
                          alert(mSegment + " : Consumption Details Not Found....");
                          this.lineDetailsArray().controls[index].get('orderQty').disable();
                        }

                      });


                } else {
                  if (res.code === 400) {
                    alert(res.message);
                    this.lineDetailsArray().controls[index].get('orderQty').disable();
                  }
                }
              });

              // fetch newwly added line consumption from table

              // this.service.getNewLineConsDetails(segId,ordNum)
              // .subscribe(
              //   data => {
              //        if(data.length >0) {

              //       (patch.controls[index]).patchValue(
              //           {

              //           unitPrice: data[0].unitPrice,
              //           itemId: data[0].itemId,
              //           segment : data[0].segment,
              //           description: data[0].description,
              //           mth1ConWsQty: data[0].mth1ConWsQty,
              //           mth2ConWsQty: data[0].mth2ConWsQty,
              //           mth3ConWsQty: data[0].mth3ConWsQty,
              //           mth1ConsSaleQty: data[0].mth1ConsSaleQty,
              //           mth2ConsSaleQty: data[0].mth2ConsSaleQty,
              //           mth3ConsSaleQty: data[0].mth3ConsSaleQty,
              //           currWsQty: data[0].currWsQty,
              //           currSaleQty: data[0].currSaleQty,
              //           conWsQty: data[0].conWsQty,
              //           consSaleQty: data[0].consSaleQty,
              //           currentStock: data[0].currentStock,
              //           backOrderQty: data[0].backOrderQty,
              //           intransitQty: data[0].intransitQty,
              //           custBackOrder: data[0].custBackOrder,
              //           totalValue: data[0].totalValue,

              //         }); }  });


              //  (patch.controls[index]).patchValue(
              //   {

              //     itemId: data.itemId,
              //     segment : mSegment,
              //     description: data.description,
              //     uom: data.uom,
              //     unitPrice: prc,
              //     mth1ConWsQty: 0,
              //     mth2ConWsQty: 0,
              //     mth3ConWsQty: 0,
              //     mth1ConsSaleQty: 0,
              //     mth2ConsSaleQty: 0,
              //     mth3ConsSaleQty: 0,
              //     currWsQty: 0,
              //     currSaleQty: 0,
              //     conWsQty: 0,
              //     consSaleQty: 0,
              //     currentStock: 0,
              //     backOrderQty: 0,
              //     intransitQty: 0,
              //     custBackOrder: 0,
              //     totalValue: 0,
              //   });



            } else {
              this.lineDetailsArray().controls[index].get('orderQty').disable();
              this.lineDetailsArray().removeAt(index);
            }

          } else {
            alert(mSegment + " - Item Not Found in Master");
            // this.lineDetailsArray().controls[index].get('itemId').reset();
            var mItemId = ordLineArr[index].itemId;

            if (mItemId > 0) {
              var segment1;
              this.service.getItemDetail(mItemId).subscribe(data => {
                segment1 = data.segment;
                patch.controls[index].patchValue({ segment: segment1 })
              });
              this.lineDetailsArray().controls[index].get('orderQty').enable();

            } else {
              this.lineDetailsArray().controls[index].reset();
            }
            return;
          }
        }
      );
  }



  duplicateLineCheck(index, mItem, itemSeg) {
    this.lineItemRepeated = false;
    var ordLineArr = this.orderGenerationForm.get('orderList').value;
    for (let i = 0; i < this.lineDetailsArray().length; i++) {
      var x = ordLineArr[i].itemId;

      if (i != index && (x === mItem)) {
        alert(itemSeg + " - Item Already in the List .Check Line :" + (i + 1));
        this.lineItemRepeated = true;
        break;
      }
    }
  }

  CheckLineValidations(i) {
    var patch = this.orderGenerationForm.get('orderList') as FormArray;
    var ordLineArr1 = this.orderGenerationForm.get('orderList').value;
    var lineValue1 = ordLineArr1[i].itemId;
    var lineValue2 = ordLineArr1[i].segment;
    var lineValue3 = ordLineArr1[i].orderQty;

    var j = i + 1;
    if (lineValue1 === undefined || lineValue1 === null || lineValue1 === '') {
      this.lineValidation = false;
      return;
    }

    if (lineValue2 === undefined || lineValue2 === null || lineValue2.trim() === '') {
      alert("Line-" + j + " ITEM CODE :  Enter valid Item Code");
      this.lineValidation = false;
      return;
    }

    if (lineValue1 > 0) {
      if (lineValue3 === undefined || lineValue3 === null || lineValue3 < 0) {
        patch.controls[i].patchValue({ orderQty: 0 })
        alert("Line-" + j + " ORDER QTY :  should be above Zero");
        this.lineValidation = false;
        return;
      }
    }

    this.lineValidation = true;

  }

  enterKeyLock(i) {
    alert('Enter Not Allowed.!');
    this.setFocus('orderQty' + i);
    return;
  }

  // setFocus(name) {

  //   const ele = this.aForm.nativeElement[name];
  //   if (ele) {
  //     ele.focus();
  //   }
  // }


  exportToExcel1() {
    const ws: xlsx.WorkSheet =
    xlsx.utils.table_to_sheet(this.epltable1.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable1.xlsx');
  }



  getTrans(index: any) {
    var patch = this.orderGenerationForm.get('orderList') as FormArray;
    var orderLineArr = this.orderGenerationForm.get('orderList').value;
    var lineSegId = orderLineArr[index].itemId;
    this.partNumber = orderLineArr[index].segment;
    this.partDesc = orderLineArr[index].description;

    this.mth1ConWsQty = orderLineArr[index].mth1ConWsQty;
    this.mth2ConWsQty = orderLineArr[index].mth2ConWsQty;
    this.mth3ConWsQty = orderLineArr[index].mth3ConWsQty;
    this.mth1ConsSaleQty = orderLineArr[index].mth1ConsSaleQty;
    this.mth2ConsSaleQty = orderLineArr[index].mth2ConsSaleQty;
    this.mth3ConsSaleQty = orderLineArr[index].mth3ConsSaleQty;

    this.currWsQty = orderLineArr[index].currWsQty;
    this.conWsQty = orderLineArr[index].conWsQty;
    this.currSaleQty = orderLineArr[index].currSaleQty;
    this.consSaleQty = orderLineArr[index].consSaleQty;



    // alert (index +"  Item Id : "+lineSegId + "  ItemCode : "+orderLineArr[index].segment + " m3sale :"+orderLineArr[index].mth3ConsSaleQty)

  }


  setFocus(name) {

    const ele = this.aForm.nativeElement[name];
    if (ele) {
      ele.focus();
    }
  }

  NextLineCall(index) {
    alert ("index1 :"+index)
    var ln=index+1;
    alert ("index2 :"+ln)
    this.setFocus('orderQty'+index+1);
  }

}
