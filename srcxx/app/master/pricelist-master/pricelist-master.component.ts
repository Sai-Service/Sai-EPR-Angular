import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from '../master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemeService } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import * as xlsx from 'xlsx';
// import { now } from 'jquery';
// import { saveAs } from 'file-saver';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

interface IPriceList {

  // priceListId :number;
  // priceListName:string;
  // priceDesc:string;

  // status:string;
  // startDate:Date;

  // ouId: number; 
  // ouName : string;
  // description : string; 
  priceListType: string;
  priceListName: string;
  description: string;
  ouId: number;
  divisionId: number;
  deptId: number;
  status: string;
  priceSubType: string;
  startDate: Date;
  endDate: string;
  priceListHeaderId: number;
  fileName: string;
  docType: string;
  itemId: number;
  searchByItemCode: string;
  searchByItemDesc: string;
}


export class pricelistGeneration {
  segment: string;
  itemDescription: string;
  itemCategory: string;
  priceValue: number;
  uom:string;
  batchCode:number;
}


@Component({
  selector: 'app-pricelist-master',
  templateUrl: './pricelist-master.component.html',
  styleUrls: ['./pricelist-master.component.css']
})
export class PricelistMasterComponent implements OnInit {
  priceListMasterForm: FormGroup;
  isVisible1: boolean = false;
  isVisible: boolean = false;
  progress = 0;
  cusrOpraion: string;
  // message = '';
  selectFile?: File;

  pipe = new DatePipe('en-US');
  now = Date.now();
  resMsg: string;
  lstMessage: any;



  fileName: string;
  docType: string;

  priceListId: number;
  priceListName: string;
  priceListDesc: string;
  priceListType: string;
  priceSubType: string;
  priceListHeaderId: number;
  ouId: number;
  // ouName : string;

  deptId: number;
  description: string;

  itemId: number;
  itemDescription: string;
  priceDesc: string;
  segment: string;

  // searchBy : string;
  searchValue: string;

  startDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  endDate: Date;

  upldPricelistName: string;
  public PriceListIdList: Array<string> = [];
  priceListLineDetails: any = [];
  priceListLineDetails1: any = [];
  priceListLineDetails2: any = [];
  displayLineDetails = true;
  lineItemRepeated = false;
  // startDate = this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');

  // startDate= Date.now();


  showOu = false;
  showItemSearch = false;
  showPriceListLov = true;
  display = true;
  lstcomments: any;
  lstcomments1: any;
  lstcomments2: any;
  public statusList: Array<string> = [];
  invItemList: any = [];
  public PriceTypeList: Array<string> = [];
  public PriceSubTypeList: Array<string> = [];
  public DepartmentList: Array<string> = [];


  public priceDescList: any;

  public OUIdList: Array<string> = [];

  public DivisionIDList: Array<string> = [];
  public itemIdList: Array<string> = [];

  public itemNameList: any;
  public priceListNameList: any;

  itemDetailsList: any;

  // priceValue:number;

  // public emplId =6;
  // display= true;
  headerValidation = false;
  lineValidation = false;
  enableDesc = false;
  // public status = "Active";
  status: string = 'Active'
  displayInactive = true;
  Status1: any;
  display1 = true;
  displayButton = true;
  updateButton = false;
  updateHeaderButton = false;
  plsearch = false;
  displayItemDetails = true;
  addNew = true;
  itemFoundInPLmaster = false;
  mrpPriceList=true;
  userList2: any[] = [];
  lastkeydown1: number = 0;

  loginName: string;
  loginArray: string;
  name: string;
  ouName: string;
  locId: number;
  locName: string;
  emplId: number;
  orgId: number;
  divisionId: number;
  divisionName: string;
  primaryPriceListId: number;

  searchItemId: string;
  searchByItemNumber: string;
  searchItemName: string;
  searchBy: string = 'ITEM NUMBER';
  searchByItemDesc: string;
  searchByItemCode: string;
  selectItemName: string;
  searchByItem = true;
  searchByDesc = false;
  showDescList = true;
  recordCnt: number;

  @ViewChild('fileInput') fileInput;
  message: string;


  public ItemIdList: any[];

  closeResetButton =true;
  dataDisplay: any;
  // progress = 0;

  constructor(private service: MasterService, private fb: FormBuilder, private router: Router) {
    this.priceListMasterForm = fb.group({


      orgId:[''],
      fileName: ['', Validators.required],
      docType: ['', Validators.required],

      loginArray: [''],
      loginName: [''],
      ouName: [''],
      locId: [''],
      locName: [''],
      emplId: [''],
      divisionId: [''],
      divisionName: [''],

      primaryPriceListId: [],
      searchItemId: [],
      searchItemName: [],
      searchByItemNumber: [],

      priceListHeaderId: [],
      priceListType: [],
      priceSubType: [],
      deptId: [],
      ouId: [],
      status: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      // itemId: ['', [Validators.required]],
      description: [],
      itemDescription: [],
      priceDesc: [],
      priceListId: ['', [Validators.required]],
      priceListName: ['', [Validators.required]],
      searchBy: ['', [Validators.required]],
      searchValue: ['', [Validators.required]],
      upldPricelistName: [],

      searchByItemDesc: [],
      searchByItemCode: [],
      searchByItem: [],
      selectItemName: [],
      recordCnt:[],

      priceListDetailList: this.fb.array([this.lineDetailsGroup()])
    });
  }

  lineDetailsGroup() {
    return this.fb.group({
      priceListLineId: [''],
      itemId: ['', [Validators.required]],
      itemName: ['', [Validators.required]],
      itemDescription: ['', [Validators.required]],
      itemCategory: ['', [Validators.required]],
      uom: ['', [Validators.required]],
      // batchCode: ['', [Validators.required]],
      batchCode: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern('[A-Z0-9.-]*')]],
      priceValue: ['', [Validators.required]],
      // startDate: ['', [Validators.required]],
      // endDate: ['', [Validators.required]],
      segment: ['', [Validators.required]],
      mrp:[],
      // startDate:[],
      // lastUpdatedDate:[],
      attribute10:[],
      tax:[],
      lastUpdatedDate:[],
    });
  }

  lineDetailsArray(): FormArray {
    return <FormArray>this.priceListMasterForm.get('priceListDetailList')
  }


  get f() { return this.priceListMasterForm.controls; }
  priceListMaster(priceListMasterForm: any) { }


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.displayLineDetails = false;
    this.name = sessionStorage.getItem('name');
    this.loginArray = sessionStorage.getItem('divisionName');
    this.divisionName = sessionStorage.getItem('divisionName');
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.loginName = sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    // this.locName=(sessionStorage.getItem('locName'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    // this.emplId= Number(sessionStorage.getItem('emplId'));

    this.orgId = this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);



    this.service.getPriceListSearchNew(sessionStorage.getItem('ouId'), sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );

    //  this.service.invItemList1()
    //   .subscribe(
    //     data => {
    //       this.invItemList = data;
    //       console.log(this.invItemList);
    //     }
    //   );

    //  this.service.invItemListNew(sessionStorage.getItem('divisionId'))
    //       .subscribe(
    //         data => {
    //           this.invItemList = data;
    //           console.log(this.invItemList);
    //         }
    //       );

    // this.service.ItemIdDivisionList(sessionStorage.getItem('divisionId')).subscribe(
    //   data =>{ this.ItemIdList = data;
    //     console.log(this.ItemIdList);

    // });


    this.service.PriceListIdList(this.ouId, this.divisionId)
      .subscribe(
        data => {
          this.PriceListIdList = data;
          console.log(this.PriceListIdList);
        }
      );

    this.service.OUIdList()
      .subscribe(
        data => {
          this.OUIdList = data;
          console.log(this.OUIdList);
        }
      );

    // this.service.DivisionIDList()
    // .subscribe(
    //   data => {
    //     this.DivisionIDList = data;
    //     console.log(this.DivisionIDList);
    //   }
    // );

    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );

    this.service.DepartmentList()
      .subscribe(
        data => {
          this.DepartmentList = data;
          console.log(this.DepartmentList);
        }
      );

    this.service.PriceTypeList()
      .subscribe(
        data => {
          this.PriceTypeList = data;
          console.log(this.PriceTypeList);
        }
      );

    this.service.PriceSubTypeList()
      .subscribe(
        data => {
          this.PriceSubTypeList = data;
          console.log(this.PriceSubTypeList);
        }
      );


    // this.service.itemIdList()
    // .subscribe(
    //   data => {
    //     this.itemIdList = data;
    //     console.log(this.itemIdList);
    //   }
    // );

  }



  onOptionsSelectedStatus(event: any) {
    this.Status1 = this.priceListMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.priceListMasterForm.get('endDate').reset();
      this.displayInactive = true;
    }
  }




  onItemSelected(itemId: any) {
    // alert("ITEM ID :" + itemId);
    if (itemId > 0) {
      this.enableDesc = false
      this.service.itemNameList(itemId)
        .subscribe(
          data => {
            this.itemNameList = data;
            console.log(this.itemNameList);
            this.priceListMasterForm.patchValue(this.itemNameList.description);
            this.itemDescription = this.itemNameList.description;
            // alert("item desc :" + this.description);
          }
        );
    }
    else {
      this.enableDesc = true;
      this.priceListMasterForm.get("description").reset();
    }
    // alert ("enable Desc="+this.enableDesc);
  }


  onPLSelected(priceListId: any) {
    //  alert("price list ID :" + priceListId);

    this.service.priceDescList(priceListId)
      .subscribe(
        data => {
          this.priceDescList = data;
          console.log(this.priceDescList);

          this.priceListMasterForm.patchValue(this.priceDescList.priceListType);
          this.priceListMasterForm.patchValue(this.priceDescList.priceListName);
          this.priceListMasterForm.patchValue(this.priceDescList.description);
          this.priceListMasterForm.patchValue(this.priceDescList.divisionId);
          this.priceListMasterForm.patchValue(this.priceDescList.deptId);
          this.priceListMasterForm.patchValue(this.priceDescList.ouId);
          this.priceListMasterForm.patchValue(this.priceDescList.status);

          this.priceListType = this.priceDescList.priceListType;
          this.priceListName = this.priceDescList.priceListName;
          this.description = this.priceDescList.description;
          this.divisionId = this.priceDescList.divisionId;
          this.ouId = this.priceDescList.ouId;
          this.deptId = this.priceDescList.deptId;
          this.status = this.priceDescList.status;

          this.priceListMasterForm.patchValue(this.priceDescList.endDate);
          this.endDate = this.priceDescList.endDate;
          this.priceListMasterForm.patchValue(this.priceDescList.startDate);
          this.startDate = this.priceDescList.startDate;

          this.displayButton = false;
          this.display = false;
          this.plsearch = true;


          if (priceListId > 0) {
            this.showItemSearch = true;
            this.showPriceListLov = false
          } else {
            this.showItemSearch = false;
            // this.showPriceListLov=false
          }


          //  alert("PL Name : " + this.priceListName + " PL ouid:  "+this.ouId );
          //  alert( " on pl select >>"+ this.status + " Start Date: " + this.startDate  + " End Date : " + this.endDate);
          // alert("pricelist type: "+this.priceListType);
          // alert("Show item search : "+this.showItemSearch);



        }
      );

  }



  onPLTSelected(plTypeId: string) {
    // alert("price Type ID :" + plTypeId  + " PL type Name : " + plTypeName );
    if (plTypeId == 'LOCAL') {
      this.showOu = true;
    } else {
      this.showOu = false;
    }

    // alert("price Type ID :" + plTypeId  + " PL type Name : " + plTypeName + " Show OU : " + this.showOu );

  }



  addRow(index) {

    var len1 = this.lineDetailsArray().length - 1;

    if (len1 === index) {

      this.CheckLineValidations(index);
      if (this.lineValidation == true) {
        this.addNew = true;

        var prcLineArr = this.priceListMasterForm.get('priceListDetailList').value;
        this.lineItemRepeated = false;
        var mItemId = prcLineArr[index].itemId;
        var mSegment = prcLineArr[index].segment;
        var bCode = prcLineArr[index].batchCode;
        this.duplicateLineCheck(index, mItemId, mSegment, bCode);
        if (this.lineItemRepeated) {
          this.lineDetailsArray().removeAt(index);
        } else {
          this.displayLineDetails = false;
          this.lineDetailsArray().push(this.lineDetailsGroup());
        }
      }
    }
  }



  duplicateLineCheck(index, mItem, itemSeg, bCode) {
    // alert ("index/itemid/segment,this.lineDetailsArray().length :" +index +","+mItem+","+itemSeg +","+this.lineDetailsArray().length);
    var varLineArr = this.priceListMasterForm.get('priceListDetailList').value;
    for (let i = 0; i < this.lineDetailsArray().length; i++) {
      var x = varLineArr[i].itemId;
      var y = varLineArr[i].batchCode;

      if (i != index && (x === mItem && y === bCode)) {
        alert(itemSeg + " - Item Already in the List .Check Line :" + (i + 1));
        this.lineItemRepeated = true;
        this.lineValidation = false;
        break;
      }
    }
  }


  RemoveRow(index) {
    // alert(index)
    if (index === 0) {

    }
    else {
      // alert(index)
      this.lineDetailsArray().removeAt(index);
    }

  }



  ////////////////////////// Reset Button module
  resetMast() { window.location.reload(); }

  ////////////////////////// Close Button module
  closeMast() { this.router.navigate(['admin']); }

  //////////////////////////////////////New Button 
  transeData(val) {
    delete val.priceDesc;
    delete val.itemDescription;
    delete val.priceListId;
    // delete val.divisionId;
    delete val.loginArray;
    delete val.loginName;
    delete val.locName;
    delete val.ouName;
    delete val.searchBy;
    delete val.searchValue;
    delete val.searchItemId;
    // delete val.lastUpdatedDate;
    // delete val.startDate


    return val;
  }

  newMast() {
    this.cusrOpraion = 'Save';
    this.CheckHeaderValidations();
    if (this.headerValidation == true) { alert("Header Validation Sucessfull...") }
    else { alert("Header Validation Failed... Please Check"); return; }

    this.lineValidation = false;
    var prcLineArr = this.priceListMasterForm.get('priceListDetailList').value;
    var len1 = prcLineArr.length;

    for (let i = 0; i < len1; i++) {
      this.CheckLineValidations(i);
    }

    // alert("Line Validation :" + this.lineValidation);

    if (this.lineValidation === false) {
      alert("Line Validation Failed...\nPlease check all  line data fileds are updated properly..")
      return;
    }
    alert("Heder Validation : " + this.headerValidation + "\nLine Validation : " + this.lineValidation);
    if (this.headerValidation && this.lineValidation) {
      alert("Data Validation Sucessfull....\nPosting data  to PRICE LIST TABLE")
      const formValue: IPriceList = this.transeData(this.priceListMasterForm.value);
      this.service.PriceListMasterSubmit(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          // this.priceListMasterForm.reset();
          this.priceListMasterForm.disable()
        } else {
          if (res.code === 400) {
            alert(res.message);
            // this.priceListMasterForm.reset();
          }
        }
      });


    } else { alert("Data Validation Not Sucessfull....\nPosting Not Done...") }
  }

  //  ------------------------Line updattion..........................
  updateMastLine() {
    this.updateButton = false;
    this.lineValidation = false;
    var prcLineArr = this.priceListMasterForm.get('priceListDetailList').value;
    var len1 = prcLineArr.length;

    for (let i = 0; i < len1; i++) {
      this.CheckLineValidations(i);
      if (this.lineValidation === false) { break; }
    }


    if (this.lineValidation) {
      for (let i = 0; i < len1; i++) {
        var prcLineArr = this.priceListMasterForm.get('priceListDetailList').value;
        this.lineItemRepeated = false;
        var mItemId = prcLineArr[i].itemId;
        var mSegment = prcLineArr[i].segment;
        var mBatchCode = prcLineArr[i].batchCode;
        this.duplicateLineCheck(i, mItemId, mSegment, mBatchCode)
      }
    }

    // alert("Line Validation :" + this.lineValidation);

    if (this.lineValidation === false) {
      alert("Line Validation Failed...\nPlease check all  line data fields are updated properly..\nCheck for Duplicate line items.")
      this.updateButton = true;
      return;
    }

    if (this.lineValidation) {
      // alert("Line Validation Sucessfull....\nPutting Line data  to PRICE LIST TABLE")


      const formValue: IPriceList = this.transeData(this.priceListMasterForm.value);
      this.service.UpdatePriceListById(formValue, formValue.priceListHeaderId).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD UPDATED SUCCESSFULLY');
          this.addNew = false;
          this.priceListMasterForm.disable();

        } else {
          if (res.code === 400) {
            alert('ERROR OCCOURED IN PROCEESS');
            // this.priceListMasterForm.reset();
            this.updateButton = true;
          }
        }
      });
    } else { alert("Line Validation Not Sucessfull....\nData not Saved...") }
  }

  //  ------------------------Header updattion..........................
  // updateMastHeader() {
  //   alert ("Putting data  to PL mater header.part .....")
  //   // const formValue: IPriceList = this.priceListMasterForm.value;
  //   const formValue: IPriceList =this.transeData(this.priceListMasterForm.value);
  //   this.service.UpdatePriceListByIdHeader(formValue, formValue.priceListHeaderId).subscribe((res: any) => {
  //     if (res.code === 200) {
  //       alert('RECORD UPDATED SUCCESSFULLY');
  //       window.location.reload();
  //     } else {
  //       if (res.code === 400) {
  //         alert('ERROR OCCOURED IN PROCEESS');
  //         this.priceListMasterForm.reset();
  //       }
  //     }
  //   });
  // };

  //  ------------------------Header updattion..........................
  updateMastHeader() {
    this.updateButton = false;
    this.CheckHeaderValidations();
    if (this.headerValidation === true) {
      // alert("Data Validation Sucessfull....\nPutting data to PRICE LIST MASTER  TABLE") 

      const formValue: IPriceList = this.transeData(this.priceListMasterForm.value);
      this.service.UpdatePriceListByIdHeader(formValue, formValue.priceListHeaderId).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD UPDATED SUCCESSFUILY');
          // window.location.reload();
          this.updateHeaderButton = false;

        } else {
          if (res.code === 400) {
            alert('ERROR OCCOURED IN PROCEESS');
            // this.priceListMasterForm.reset();
            this.updateHeaderButton = true;
          }
        }
      });
    } else { alert("Data Validation Not Sucessfull....\nData not Saved...") }
  }

  // ============================================================

  Select(priceListHeaderId: number) {
    // alert(priceListHeaderId);
    // this.isVisible=true;
    // this.isVisible1=false;
    this.priceListMasterForm.reset();
    this.display1 = false;
    this.displayLineDetails = true;
    let select = this.lstcomments.find(d => d.priceListHeaderId === priceListHeaderId);
    this.priceListMasterForm.patchValue(select);
    // console.log(select.priceListDetailList[0]);

    for (let i = 0; i < this.lineDetailsArray.length; i++) {
      this.lineDetailsArray().removeAt(i);
    }
    this.lineDetailsArray().clear();

    this.service.getLineDetails(priceListHeaderId).subscribe(
      data => {
        console.log(data);
        this.priceListLineDetails = data;
        console.log(this.priceListLineDetails);

        var control = this.priceListMasterForm.get('priceListDetailList') as FormArray;

        this.priceListMasterForm.patchValue(data);
      }

    )
    this.displayButton = false;
    this.display = false;
    this.showItemSearch = true;

  }








  // searchMast() {

  //   this.service.getPriceListSearchNew(sessionStorage.getItem('ouId'),sessionStorage.getItem('divisionId'))
  //     .subscribe(
  //       data => {
  //         this.lstcomments = data;
  //         console.log(this.lstcomments);
  //       }
  //     );
  // }


  loadHistModal() {
    this.primaryPriceListId = null;
    this.searchByItemNumber = null;
    this.searchItemName = null;
    this.lstcomments2 = null;

  }

  priceHistory(priceListId, itemSeg) {

    this.lstcomments2 = null;

    if (this.primaryPriceListId === undefined || this.primaryPriceListId === null) {
      alert("PRICE LIST NAME : Select Price List Name");
      return;
    }

    if (this.searchByItemNumber === undefined || this.searchByItemNumber === null || this.searchByItemNumber.trim() == '') {

      alert("ITEM NUMBER : Enter Valid Item Code");
      return;
    }


    var segId;
    this.service.getItemDetailsByCode(itemSeg)
      .subscribe(
        data => {
          if (data != null) {
            segId = data.itemId;
            this.searchItemName = data.description;
            // -----------------------------------------------
            this.service.getPriceListHistorySearch(priceListId, segId)
              .subscribe(
                data1 => {
                  if (data1.length > 0) {
                    this.lstcomments2 = data1;
                    console.log(this.lstcomments2);
                  } else { alert(itemSeg + " - No Price Revision History Available"); }
                }
              );
            // -----------------------------------------------

          } else { alert(itemSeg + "- Item Number Not Found"); }
        });
  }


  validatePrice(index: any) {
    var priceLineArr = this.priceListMasterForm.get('priceListDetailList').value;
    var linePrice = priceLineArr[index].priceValue;
    var lineTax = priceLineArr[index].tax;
    var newMrp=linePrice + (linePrice*lineTax/100);
    newMrp=Math.round((Number(newMrp)+Number.EPSILON)*100)/100;

    var patch = this.priceListMasterForm.get('priceListDetailList') as FormArray;
    patch.controls[index].patchValue({ attribute10: newMrp });
    if (linePrice <= 0) {
      alert(linePrice + " << Invalid Price Rate.Price value should be above 0")
        patch.controls[index].patchValue({ priceValue: '' });
        patch.controls[index].patchValue({ attribute10: '' })
    }
   }
   
  

  // ===============================================================================

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





  onOptioninvItemIdSelectedNew(itemSeg, index) {

    this.CheckHeaderValidations();
    if (this.headerValidation == false) {
      alert('Please Select Header Deatils !');
      return;
    }

    this.itemFoundInPLmaster = false;

    var priceLineArr = this.priceListMasterForm.get('priceListDetailList').value;
    var mSegment = priceLineArr[index].segment;
    mSegment = mSegment.toUpperCase();
    var plName = this.priceListMasterForm.get("priceListName").value
    // alert ("Item Code :"+mSegment);

    if (mSegment == null || mSegment == undefined || mSegment.trim() == '') {
      alert("Please Enter Item Code");
      this.lineDetailsArray().controls[index].get('batchCode').disable();
      this.lineDetailsArray().controls[index].get('priceValue').disable();
      this.lineDetailsArray().controls[index].get('itemDescription').reset();
      this.lineDetailsArray().controls[index].get('itemCategory').reset();
      this.lineDetailsArray().controls[index].get('uom').reset();
      return;
    }


    var segId; var bCode; var x;
    var patch = this.priceListMasterForm.get('priceListDetailList') as FormArray;
    // this.service.searchByItemDetails(mSegment)
    this.service.getItemDetailsByCode(mSegment)
      .subscribe(
        data => {
          if (data != null) {
            segId = data.itemId;
            (patch.controls[index]).patchValue(
              {
                uom: data.uom,
                itemDescription: data.description,
                itemCategory: data.categoryId.description,
                itemId: data.itemId,
                itemName: data.segment,
                segment: mSegment,
              }
            );



            var mbCode = this.lineDetailsArray().controls[index].get('batchCode').value;

            // mbCode=mbCode.toUpperCase();
            // patch.controls[index].patchValue({batchCode:mbCode});
            // if(mbCode ===null || mbCode ===undefined || mbCode.trim()==='') {mbCode='';}
            // alert("Pl,itmid ,bcode : "+plName+" , "+segId +" , "+mbCode);
            //  this.service.getLineDetailsSingleItem(plName,segId)  .subscribe(
            this.service.getLineDetailsWithItemBatchCode(plName, segId, mbCode).subscribe(
              data1 => {
                console.log(data1);
                if (data1.length > 0) {
                  this.itemFoundInPLmaster = true;

                  alert(mSegment + "(" + segId + ") - Item Already exists in the Price List Master with Batch Code : " + data1[0].batchCode);
                  x = 1;
                  patch.controls[index].patchValue({ batchCode: '' })
                  return;
                } else {
                  this.lineDetailsArray().controls[index].get('batchCode').enable();
                  this.lineDetailsArray().controls[index].get('priceValue').enable();



                }
              });


          } else {
            alert(mSegment + " - Item Not Found in Master");
            this.lineDetailsArray().controls[index].get('batchCode').disable();
            this.lineDetailsArray().controls[index].get('priceValue').disable();
            this.lineDetailsArray().controls[index].get('itemDescription').reset();
            this.lineDetailsArray().controls[index].get('itemCategory').reset();
            this.lineDetailsArray().controls[index].get('uom').reset();

            return;
          }
        }
      );
  }




  validateitemWithBatchCode(index) {

    this.CheckHeaderValidations();
    if (this.headerValidation == false) {
      alert('Please Select Header Deatils !');
      return;
    }

    this.itemFoundInPLmaster = false;
    var priceLineArr = this.priceListMasterForm.get('priceListDetailList').value;
    var mSegment = priceLineArr[index].segment; mSegment = mSegment.toUpperCase();
    var plName = this.priceListMasterForm.get("priceListName").value
    
    if (mSegment === null || mSegment === undefined || mSegment.trim() === '') {
      alert("Please Enter Item Code");
      this.lineDetailsArray().controls[index].get('batchCode').disable();
      this.lineDetailsArray().controls[index].get('priceValue').disable();
      this.lineDetailsArray().controls[index].get('itemDescription').reset();
      this.lineDetailsArray().controls[index].get('itemCategory').reset();
      this.lineDetailsArray().controls[index].get('uom').reset();
      return;
    } 


    var segId; var bCode; var x;
    var patch = this.priceListMasterForm.get('priceListDetailList') as FormArray;
    this.service.getItemDetailsByCode(mSegment)
      .subscribe(
        data => {
          if (data != null) {
            segId = data.itemId;
            (patch.controls[index]).patchValue(
              {
                uom: data.uom,
                itemDescription: data.description,
                itemCategory: data.categoryId.description,
                itemId: data.itemId,
                itemName: data.segment,
                segment: mSegment,
                tax : data.attribute1,
              } );



            var mbCode = this.lineDetailsArray().controls[index].get('batchCode').value;
            mbCode = mbCode.toUpperCase();
            patch.controls[index].patchValue({ batchCode: mbCode });
           
            this.duplicateLineCheck(index, segId, mSegment, mbCode);
            if (this.lineItemRepeated) {
              this.lineDetailsArray().removeAt(index);
            }

            //  this.service.getLineDetailsSingleItem(plName,segId)  .subscribe(

            this.service.getLineDetailsWithItemBatchCode(plName, segId, mbCode).subscribe(
              data1 => {
                console.log(data1);
                if (data1.length > 0) {
                  this.itemFoundInPLmaster = true;

                  alert(mSegment + "(" + segId + ") - Item Already exists in the Price List Master with Batch Code : " + data1[0].batchCode);
                  x = 1;
                  patch.controls[index].patchValue({ batchCode: '' })
                  this.lineDetailsArray().controls[index].get('priceValue').disable();

                  return;
                } else {

                  this.lineDetailsArray().controls[index].get('priceValue').enable();
                  this.lineDetailsArray().controls[index].get('batchCode').enable();
                }
              });


          } else {
            alert(mSegment + " - Item Not Found in Master");
            this.lineDetailsArray().controls[index].get('batchCode').disable();
            this.lineDetailsArray().controls[index].get('priceValue').disable();
            this.lineDetailsArray().controls[index].get('itemDescription').reset();
            this.lineDetailsArray().controls[index].get('itemCategory').reset();
            this.lineDetailsArray().controls[index].get('uom').reset();
            this.lineDetailsArray().controls[index].get('tax').reset();
            return;
          }
        }
      );
  }






  onOptioninvItemIdSelected(itemId, index) {
    // alert(itemId)
    //  alert('item function-'+itemId);
    let selectedValue = this.ItemIdList.find(v => v.SEGMENT == itemId);
    console.log(selectedValue);

    if (selectedValue != undefined) {
      // alert('Item Id :' +selectedValue.itemId);
      console.log(selectedValue);

      var arrayControl = this.priceListMasterForm.get('priceListDetailList').value
      var patch = this.priceListMasterForm.get('priceListDetailList') as FormArray;
      // this.itemType = arrayControl[index].itemType
      // alert(this.itemType)
      this.itemId = selectedValue.itemId;
      // console.log(this.invItemId, this.taxCat);
      (patch.controls[index]).patchValue(
        {
          uom: selectedValue.uom,
          itemDescription: selectedValue.itemDescription,
          itemCategory: selectedValue.itemCategory,
          itemId: selectedValue.itemId,
          itemName: selectedValue.segment,
        }
      );

    }
  }

  onOptioninvItemIdSelectedSingle(itemId) {

    //  alert('item function');
    let selectedValue = this.invItemList.find(v => v.segment == itemId);
    if (selectedValue != undefined) {
      // alert(selectedValue.itemId);
      console.log(selectedValue);
      this.searchItemId = selectedValue.itemId;
      this.searchItemName = selectedValue.description;
      this.segment = selectedValue.segment;
    }
  }


  findByCode(searchBy, searchValue) {
    // alert(searchValue)
    this.displayLineDetails = false;
    // this.isVisible=true;
    // var arrayControl = this.priceListMasterForm.get('priceListDetailList').value
    var priceListHeaderId = this.priceListMasterForm.get('priceListHeaderId').value;
    // alert(priceListHeaderId);
    let select1 = this.priceListLineDetails.find(d => d.segment === searchValue);
    // console.log('(select1.priceListDetailList) ' +select1.priceListDetailList);
    console.log(select1);
    var data: any = [];
    if (searchBy == 'ITEM DESCRIPTION') {
      for (let i = 0; i < select1.length; i++) {
        if (select1.priceListLineDetails[i].itemDescription.includes(searchValue)) {
          data.push(select1.priceListDetailList[i])
        }
      }
    }
    if (searchBy == 'ITEM CODE') {
      // alert(select1 + '-----' +'hi' + searchBy);
      // for(let i=0; i<select1.length; i++){
      if (select1.segment.includes(searchValue)) {
        data.push(select1)
        // }
      }
    }
    console.log(data);
    // let select = (select1.priceListDetailList).find(d => d.itemDescription.includes(searchValue));
    // console.log(select);
    for (let i = 0; i < this.lineDetailsArray.length; i++) {
      this.lineDetailsArray().removeAt(i);
    }
    this.lineDetailsArray().clear();
    // alert(this.lineDetailsArray.length);
    var control = this.priceListMasterForm.get('priceListDetailList') as FormArray;
    for (let i = 0; i < data.length; i++) {
      var priceListDetailList: FormGroup = this.lineDetailsGroup();
      control.push(priceListDetailList);
    }
    this.priceListMasterForm.get('priceListDetailList').patchValue(data);
  }

  /////////////////////////////////////////

  // loadAllUser() {
  //   this.allUsers = this.service.BindUser();
  // }

  plUpload() {
    this.priceListMasterForm.get('upldPricelistName').reset();
    this.lstMessage = null;
    this.resMsg = null;
  }

  uploadFile() {

    this.progress = 0;

    var upldPlName = this.priceListMasterForm.get('upldPricelistName').value;
    var event = this.fileInput.nativeElement.files[0];
    console.log('doctype-check' + this.docType)
    let formData = new FormData();
    // formData.append('file', this.fileInput.nativeElement.files[0])
    formData.append('file', event)

    // this.service.UploadExcel(formData,this.docType,upldPlName).subscribe(result => {
    // this.message = result.toString();

    // if (event.type === HttpEventType.UploadProgress) {
    // this.progress = Math.round(100 * event.loaded / event.total);
    // } else if (event instanceof HttpResponse) {
    //   this.message = event.body.message;

    // }
    // alert ( "this.message :" + this.message);

    this.service.UploadExcel(formData, this.docType, upldPlName).subscribe((res: any) => {

      if (res.code === 200) {
        alert('FILE UPLOADED SUCCESSFULLY');
        this.resMsg = res.message + ",  Code : " + res.code;;
        this.lstMessage = res.obj.priceListDetailList;

      } else {
        if (res.code === 400) {
          alert('FILE UPLOAD FAILED');
          this.resMsg = res.message + ",  Code : " + res.code;
          this.lstMessage = res.obj.priceListDetailList;
        }



      }
    });
    // } );

  }

  refershForm() {
    alert("....WIP");
  }

  CheckHeaderValidations() {

    const formValue: IPriceList = this.priceListMasterForm.value;

    if (formValue.priceListType === undefined || formValue.priceListType === null) {
      this.headerValidation = false;
      alert("PRICE LIST TYPE : Should not be null....");
      return;
    }

    if (formValue.priceListName === undefined || formValue.priceListName === null || formValue.priceListName.trim() === '') {
      this.headerValidation = false;
      alert("PRICE LIST NAME: Should not be null....");
      return;
    }

    if (formValue.description === undefined || formValue.description === null || formValue.description.trim() === '') {
      this.headerValidation = false;
      alert("DESCRIPTION : Should not be null....");
      return;
    }

    if (formValue.divisionId === undefined || formValue.divisionId === null) {
      this.headerValidation = false;
      alert("DIVISION : Should not be null....");
      return;
    }

    if (formValue.deptId === undefined || formValue.deptId === null) {
      this.headerValidation = false;
      alert("DEPT : Should not be null....");
      return;
    }

    if (formValue.ouId === undefined || formValue.ouId === null) {
      this.headerValidation = false;
      alert("OPERATING UNIT : Should not be null....");
      return;
    }

    if (formValue.status === undefined || formValue.status === null) {
      this.headerValidation = false;
      alert("STATUS: Should not be null value");
      return;
    }

    if (formValue.startDate === undefined || formValue.startDate === null) {
      this.headerValidation = false;
      alert("START DATE: Should not be null value");
      return;
    }



    if (formValue.status === 'Inactive') {
      if (formValue.endDate === undefined || formValue.endDate === null) {
        this.headerValidation = false;
        alert("END DATE: Should not be null value");
        return;
      }
    }

    if (formValue.priceSubType === undefined || formValue.priceSubType === null) {
      this.headerValidation = false;
      alert("PRICE SUB TYPE : Should not be null....");
      return;
    }



    this.headerValidation = true

  }

  CheckLineValidations(i) {
    // alert(this.priceListLineDetails[i].itemId)
    // alert('addrow index '+i);
    // alert(this.cusrOpraion);
    // var prcLineArr = this.priceListMasterForm.get('priceListDetailList').value;
    // let select1=this.priceListLineDetails1.find(d=>d.itemId===prcLineArr1[i].itemId);
    //  if (select1!=undefined) { alert ("Please select valid Item Code ....") ;return; }



    if (this.cusrOpraion === 'Save') {
      var prcLineArr1 = this.priceListMasterForm.get('priceListDetailList').value;
      var lineValue1 = prcLineArr1[i].itemId;
      var lineValue2 = prcLineArr1[i].batchCode;
      var lineValue3 = prcLineArr1[i].priceValue;
    }
    else {
      // var prcLineArr1=  (this.priceListLineDetails)
      // alert(prcLineArr1[i].itemId);
      // var lineValue1=prcLineArr1[i].itemId;
      // var lineValue2=prcLineArr1[i].batchCode;
      // var lineValue3=prcLineArr1[i].priceValue;
      var prcLineArr1 = this.priceListMasterForm.get('priceListDetailList').value;
      var lineValue1 = prcLineArr1[i].itemId;
      var lineValue2 = prcLineArr1[i].batchCode;
      var lineValue3 = prcLineArr1[i].priceValue;
    }

    var j = i + 1;
    if (lineValue1 === undefined || lineValue1 === null || lineValue1 === '') {
      alert("Line-" + j + " ITEM NUMBER :  should not be null value/ Select valid item from the list");
      this.lineValidation = false;
      return;
    }

    if (lineValue2 === undefined || lineValue2 === null || lineValue2.trim() === '') {
      alert("Line-" + j + " BATCH CODE :  should not be null value");
      this.lineValidation = false;
      return;
    }

    if (lineValue3 === undefined || lineValue3 === null || lineValue3 <= 0) {
      alert("Line-" + j + " PRICE :  should be above Zero");
      this.lineValidation = false;
      return;
    }

    this.lineValidation = true;

  }


  priceHedaerList = [[
    'Part No',
    'Description',
    'Item Category',
    'UOM',
    'Batch Code',
    'Price Value',
  ]]




  exportToExcel(plHeader) {
    // alert("Export Price List to Excel...wip..." + plHeader);
    this.closeResetButton=false;
    this.progress = 0;
    this.dataDisplay ='Data Exporting in progress....Do not refresh the Page'
    this.service.getLineDetails(plHeader).subscribe(
      data => {
        console.log(data);
        this.dataDisplay =''
        this.closeResetButton=true;
        this.priceListLineDetails = data;
        console.log(this.priceListLineDetails);
        const wb: xlsx.WorkBook = xlsx.utils.book_new();
        const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet([]);
        xlsx.utils.sheet_add_aoa(ws, this.priceHedaerList);
        // var orList = this.priceListMasterForm.get('priceListDetailList').value;
        var orList = data;
        var xlOrdList: any = [];
        for (let i = 0; i < orList.length; i++) {
          var ordLn = new pricelistGeneration();
          ordLn.segment = orList[i].segment;
          ordLn.itemDescription = orList[i].itemDescription;
          ordLn.itemCategory = orList[i].itemCategory;
          ordLn.uom = orList[i].uom;
          ordLn.batchCode=orList[i].batchCode;
          ordLn.priceValue = orList[i].priceValue;  
          xlOrdList.push(ordLn);
        }
        xlsx.utils.sheet_add_json(ws, xlOrdList, { origin: 'A2', skipHeader: true });
        xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
        xlsx.writeFile(wb, 'pricelist.xlsx');
      }

    )


  }

  onSearchTypeSelected(evnt) {
    //  this.lstcomments=null;
    //  this.lstcomments1=null;
    this.searchByItemDesc = null;

    if (evnt == 'ITEM NUMBER') { this.searchByItem = true; this.searchByDesc = false; }
    if (evnt == 'ITEM DESCRIPTION') { this.searchByDesc = true; this.searchByItem = false; }
  }





  SelectPL(priceListHeaderId: number) {
    // alert ("priceListHeaderId :"+priceListHeaderId);
    // this.addNew=false;
    // this.priceListMasterForm.reset();
    this.searchBy = 'ITEM NUMBER';
    this.updateHeaderButton = true;
    this.display1 = false;
    this.displayLineDetails = false;
    this.updateButton = false;
    this.addNew = true;
    let select = this.lstcomments.find(d => d.priceListHeaderId === priceListHeaderId);
    this.priceListMasterForm.patchValue(select);
    this.lineDetailsArray().clear();
    this.lineDetailsArray().push(this.lineDetailsGroup());
    this.priceListMasterForm.get('searchByItemDesc').reset();
    this.priceListMasterForm.get('searchByItemCode').reset();

    var plSubType =this.priceListMasterForm.get('priceSubType').value;
    if(plSubType==='MRP') {this.mrpPriceList=true;} else {this.mrpPriceList=false;}
    // alert ("Price list subType :" +plSubType);

    // this.service.getLineDetails(priceListHeaderId)  .subscribe(
    //   data => {
    //     console.log(data);
    //     this.priceListLineDetails1=data;
    //     console.log(this.priceListLineDetails1);
    //  });

    this.displayButton = false;
    this.display = false;
    this.showItemSearch = true;

  }

  F9Search() {
    this.selectItemName = null;
    this.lstcomments1 = null;
    this.addNew = false;
    var sType = this.priceListMasterForm.get('searchBy').value
    if (sType === null || sType === undefined) {
      alert("Please select Search Parameters."); return;
    }

    if (sType == 'ITEM NUMBER') { this.F9SearchItemCodeNew("itmCode"); }
    if (sType == 'ITEM DESCRIPTION') { this.F9SearchItemDesc(); }
  }

  

  F9SearchItemCodeNew(itemSeg) {

    this.CheckHeaderValidations();
    if (this.headerValidation == false) {
      alert('Please Select Header Deatils !');
      return;
    }
    var sType = this.priceListMasterForm.get('searchBy').value
    var mSegment;
    if (sType == 'ITEM NUMBER') {
      mSegment = this.priceListMasterForm.get('searchByItemCode').value
    }
    if (sType == 'ITEM DESCRIPTION') {
      mSegment = itemSeg;
      this.selectItemName = mSegment;
    }

    mSegment = mSegment.toUpperCase();
    var plName = this.priceListMasterForm.get("priceListName").value
    if (mSegment === null || mSegment === undefined || mSegment.trim() === '') {
      alert("Please Enter valid Item Code");
      return;
    }

       this.service.getLineDetailsSingleItemNew(plName, mSegment).subscribe(
              data1 => {
                console.log(data1);
                if (data1.length > 0) {
                  this.priceListLineDetails2 = data1;
                  this.itemFoundInPLmaster = true;
                  this.updateButton = true;
                  this.updateHeaderButton = false;
                  this.addNew = false;
                  console.log(data1);

                  var len = this.lineDetailsArray().length;
                  for (let i = 0; i < this.priceListLineDetails2.length - len; i++) {
                    var avlLnGrp: FormGroup = this.lineDetailsGroup();
                    this.lineDetailsArray().push(avlLnGrp);
                  }
                  this.priceListMasterForm.get('priceListDetailList').patchValue(this.priceListLineDetails2);

                } else { alert(mSegment + " - Item Not Found in Price List Master - " + plName) }
              });
  }
  


  F9SearchItemCodeNew_Old(itemSeg) {   // not in use

    this.CheckHeaderValidations();
    if (this.headerValidation == false) {
      alert('Please Select Header Deatils !');
      return;
    }
    var sType = this.priceListMasterForm.get('searchBy').value
    var mSegment;
    if (sType == 'ITEM NUMBER') {
      mSegment = this.priceListMasterForm.get('searchByItemCode').value
    }
    if (sType == 'ITEM DESCRIPTION') {
      mSegment = itemSeg;
      this.selectItemName = mSegment;
    }

    mSegment = mSegment.toUpperCase();
    var plName = this.priceListMasterForm.get("priceListName").value
    if (mSegment === null || mSegment === undefined || mSegment.trim() === '') {
      alert("Please Enter valid Item Code");
      return;
    }

    var segId;
    this.service.getItemDetailsByCode(mSegment)
      .subscribe(
        data => {
          if (data != null) {
            segId = data.itemId;
            this.service.getLineDetailsSingleItem(plName, segId).subscribe(
              data1 => {
                console.log(data1);
                if (data1.length > 0) {
                  this.priceListLineDetails2 = data1;
                  this.itemFoundInPLmaster = true;
                  this.updateButton = true;
                  this.updateHeaderButton = false;
                  this.addNew = false;
                  console.log(data1);

                  var len = this.lineDetailsArray().length;
                  for (let i = 0; i < this.priceListLineDetails2.length - len; i++) {
                    var avlLnGrp: FormGroup = this.lineDetailsGroup();
                    this.lineDetailsArray().push(avlLnGrp);
                  }
                  this.priceListMasterForm.get('priceListDetailList').patchValue(this.priceListLineDetails2);

                } else { alert(mSegment + " - Item Not Found in Price List Master - " + plName) }
              });

          } else { alert(mSegment + " - Item Not Found in Master"); return; }

        });
  }








  F9SearchItemCode(mSegment) {
    const formValue: IPriceList = this.priceListMasterForm.value;

    var sType = this.priceListMasterForm.get('searchBy').value

    var plId = this.priceListMasterForm.get('priceListHeaderId').value
    var plName = this.priceListMasterForm.get('priceListName').value
    if (sType == 'ITEM NUMBER') {
      var segment1 = this.priceListMasterForm.get('searchByItemCode').value

      segment1 = segment1.toUpperCase();
      // alert("Segment1: "+segment1);
    }
    if (sType == 'ITEM DESCRIPTION') {
      var segment1 = mSegment;
    }

    this.selectItemName = segment1;

    // var segment2=segment1.toUpperCase();
    //  alert ("plid/plname/segment1 : "+plId+" , "+plName +" , "+segment1 +"," + formValue.searchByItemCode);
    if (segment1 == undefined || segment1 == null) { alert("Please select Item Code ...."); return; }


    // let select1=this.ItemIdList.find(d=>d.SEGMENT===segment1);

    let select1 = this.priceListLineDetails1.find(d => d.segment === segment1);

    if (select1 == undefined) { alert("Please select valid Item Code ...."); return; }
    var mItemId = select1.itemId;

    // alert ("plid/plname/segment1/itemid : "+plId+" , "+plName +" , "+segment1 +"," + mItemId);



    for (let i = 0; i < this.lineDetailsArray.length; i++) {
      this.lineDetailsArray().removeAt(i);
    }
    this.lineDetailsArray().reset();


    this.service.getLineDetailsSingleItem(plName, mItemId).subscribe(
      data => {
        console.log(data);
        this.priceListLineDetails = data;
        if (this.priceListLineDetails.length <= 0) {
          alert(segment1 + " - Item Number not found in Price List - " + plName); return;
        }
        console.log(this.priceListLineDetails);


        var len = this.lineDetailsArray.length;
        // alert (" len =" +len +" , "+this.priceListLineDetails.length); 

        for (let i = 0; i < this.priceListLineDetails.length - 1; i++) {
          var invLnGrp: FormGroup = this.lineDetailsGroup();
          this.lineDetailsArray().push(invLnGrp);
        }

        this.priceListMasterForm.get('priceListDetailList').patchValue(this.priceListLineDetails);
        // var control = this.priceListMasterForm.get('priceListDetailList') as FormArray;

        // this.priceListMasterForm.patchValue(data);
      }
    );





  }




  F9SearchItemDesc() {

    const formValue: IPriceList = this.priceListMasterForm.value;
    var itemDesc = this.priceListMasterForm.get('searchByItemDesc').value
    itemDesc = itemDesc.toUpperCase();

    if (itemDesc == undefined || itemDesc == null) {
      alert("Enter Item Description ...."); return;
    }

    this.service.searchByItemDescf9(this.divisionId, itemDesc).subscribe(
      data => {
        this.lstcomments1 = data;
        this.recordCnt =data.length;
        if (this.lstcomments1.length <= 0) {
          this.showDescList = false;
          // alert("Item Description contains " + itemDesc + " not found in Master"); 
        } else {
        this.showDescList = true;
        console.log(data); }
      });

  }

  SelectByDesc(segment) { }

  LoadPList() { }



}
