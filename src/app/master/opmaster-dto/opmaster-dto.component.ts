import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
// import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';
import { DatePipe } from '@angular/common';
import { get } from 'jquery';
// import Keyboard from 'keyboard-events';
// import Keyboard from 'keyboard';
// import MyActions from 'my-actions.js';



// import { Query } from '@syncfusion/ej2-data';
// import { EmitType } from '@syncfusion/ej2-base';
// import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
// import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
// import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
// import { EmitType } from '@syncfusion/ej2-base';




interface IpostPO {
  poHeaderId: number;
  poLineId: number;
  ouId: number;
  poDate: Date;
  poType: string;
  supplierSiteId: number;
  supplierCode: number;
  supplierName: string;
  billToLoc: string;
  shipToLoc: string;
  currencyCode: string;
  authorizationStatus: string;
  segment1: string;
  totalAmt: number;
  ewayBillNo: string;
  iRNNo: string;
  approveDate: Date;
  dept: number;
  ouName: string;
  empId: any,
  description: string;
  baseAmount: number;
  suppInvNo: string;
  TransactionNature: string;
  purchaseLocation: string;
  evaluatorName: string;
  exchangeBonusShare: string;
  ewayBillDate: Date;
  GSTDocumentNo: string
  GSTDocumentDate: Date;
  address: string;
  mobileNo: number;
  kilometer: number;
  transferToNewCarACNo: string;
  paymentToBank: string;
  paymentToCustomer: string;
  holdforPendingDoc: string;
  polineNum: number;
  invItemId: number;
  invDescription: string;
  invCategory: string;
  uom: string;
  hsnSacCode: string;
  // taxCategoryName: string;
  taxCategoryName: any;
  itemType: string;
  unitPrice: number;
  orderedQty: number;
  baseAmtLineWise: number;
  delearCode: string;
  poChargeAcc: number;
  taxAmtLineWise: number;
  totAmtLineWise: number;

  lineNumber: number;
  taxRateName: string;
  taxTypeName: string;
  taxPointBasis: string;
  precedence1: number;
  precedence2: number;
  precedence3: number;
  precedence4: number;
  precedence5: number;
  precedence6: number;
  precedence7: number;
  precedence8: number;
  precedence9: number;
  precedence10: number;
  // currencyCode:string;
  totTaxAmt: number;
  totTaxPer: number;
  recoverableFlag: string;
  selfAssesedFlag: string;
  inclusiveFlag: string;
  taxCategoryId: number;
}

const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;
FormControlName.prototype.ngOnChanges = function () {
  const result = originFormControlNameNgOnChanges.apply(this, arguments);
  this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
  return result;
};

@Component({
  selector: 'app-opmaster-dto',
  templateUrl: './opmaster-dto.component.html',
  styleUrls: ['./opmaster-dto.component.css']
})
export class OPMasterDtoComponent implements OnInit {
  // @ViewChild('poMasterDtoForm') poMasterDtoForm: ElementRef;
  supSelCnt: number;
  selectedLine = 0;
  clicked = false;
  public currentOp: string;
  showModal: boolean;
  content: number;
  title: string;
  mainType: string;
  userList1: any[] = [];
  userList2: any[] = [];

  lastkeydown1: number = 0;
  subscription: any;


  poMasterDtoForm: FormGroup;
  poHeaderId: number;
  poLineId: number;
  ouId: number;
  // public poDate = new Date();
  pipe = new DatePipe('en-US');
  now = Date.now();
  // poDate = this.pipe.transform(this.now, 'short');
  poDate = this.pipe.transform(this.now, 'd-M-y h:mm:ss');



  deptName: any;
  public poType = 'Standard Purchase Order'
  supplierSiteId: number;
  supplierCode: number;
  supplierName: string;
  billToLoc: string;
  shipToLoc: string;
  public currencyCode = 'INR'
  authorizationStatus: string;
  segment1: string;
  totalAmt: number;
  approveDate: Date;
  dept: string;
  empId: any;
  name: string;
  ouName: string;
  description: string;
  totTaxAmt: number;
  baseAmount: number;
  suppInvNo: string;
  TransactionNature: string;
  purchaseLocation: string;
  evaluatorName: string;
  exchangeBonusShare: string;
  ewayBillDate: Date;
  GSTDocumentNo: string
  GSTDocumentDate: Date;
  address: string;
  mobileNo: number;
  kilometer: number;
  transferToNewCarACNo: string;
  paymentToBank: string;
  paymentToCustomer: string;
  holdforPendingDoc: string;
  poChargeAcc: number;
  ewayBillNo: string;
  iRNNo: string;
  uom: string;
  invDescription: string;
  invCategory: string;
  hsnSacCode: string;
  // taxCategoryName: string;
  taxCategoryName: any;
  divisionName: string;
  taxCategoryId: number;
  itemType: string;
  unitPrice: number;
  orderedQty: number;
  baseAmtLineWise: number;
  delearCode: string;
  polineNum: number;
  taxAmtLineWise: number;
  totAmtLineWise: number;
  contextValue: string;
  startDate: Date;
  endDate: Date;
  status: string;
  poNo: string;
  segment: string;
  segment11: string;
  segment2: number;
  segment3: number;
  segment4: number;
  segment5: number;
  diss1: number = 0;
  // segment6: number;
  // segment7: number;
  // segment8: number;
  // segment9: number;
  segmentName: string;
  invItemId: number;
  public searchInput: String = '';
  public searchResult: Array<any> = [];
  public seriesList: Array<any> = [];
  public delearCodeList: Array<string> = [];
  public taxCategoryList: any;
  public dispbut = true;
  lineNumber: number;
  taxRateName: string;
  taxTypeName: string;
  taxPointBasis: string;
  precedence1: number;
  precedence2: number;
  precedence3: number;
  precedence4: number;
  precedence5: number;
  precedence6: number;
  precedence7: number;
  precedence8: number;
  precedence9: number;
  precedence10: number;
  totTaxPer: number;
  recoverableFlag: string;
  taxCatId: number;
  selfAssesedFlag: string;
  inclusiveFlag: string;
  displayOnStatus = true;
  displayNewButton = true;
  displaytaxDisscountButton = true;
  displayTaxDetailForm = true;
  displaysupplierSiteId = true;
  displayModal = true;
  displayContexValue = true;
  displayDept = true;
  displaySuppcode = true;
  dispDivision = true;
  totAmtDiss = true;
  displayButton = true;
  displayLine = true;
  displayHSN = true;
  displayinvDesc = true;
  displayBillShipList = true;
  displayBillShipList1 = true;
  // displayPoLine =true;
  displayTaxDetailData = true;
  DissRecoverableFlag = false;
  DissinclusiveFlag = false;
  DissselfAssesedFlag = false;
  displayNewButtonApprove = false;
  displayNewButtonUpdate = false;
  displayNewButtonSave = true;
  displayNewButtonReset = true;
  displaygetInvItemId = true;
  disTaxDiss: Array<boolean> = [];
  taxCat: string;
  taxCat1: string;
  sum = 0;
  segmentName1: string;
  poLineTax: number;
  private mdlSampleIsOpen: boolean = false;
  branch: any;
  lookupValueDesc4: string;
  lookupValueDesc1: string;
  lookupValueDesc2: string;
  lookupValueDesc3: string;
  lookupValueDesc5: string;
  submitted = false;
  lstcomments: any[];
  taxList: any[];
  lstcomments1: any;
  invItemList = new Array();
  siteIdList: any;
  supplierCodeSelected: any;
  public OUIdList: Array<string> = [];
  public DepartmentList: Array<string> = [];
  DepartmentListById: any;
  public supplierCodeList: any[];
  // public suppIdList: Array<string> = [];
  public approvedArray: any[];
  public suppIdList: any
  public BillShipList: Array<string> = [];
  public BillShipList1: Array<string> = [];
  public DivisionIDList: Array<string> = [];
  public locIdList: Array<string> = [];
  public companyCodeList: Array<string> = [];
  public BranchList: Array<string> = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: Array<string> = [];
  public InterBrancList: Array<string> = [];
  public FutureList: Array<string> = [];
  public SubAccountList: Array<string> = [];
  public statusList: Array<string> = [];
  public poTypeList: Array<string> = [];
  public YesNoList: Array<string> = [];
  public TransactionNatureList: any[];
  public purchaseLocationList: any[];
  public taxCalforItem: any[];
  public ItemDetailsList: any;
  public segmentNameList: any;
  public TaxDetailData: any[];
  hideArray: Array<boolean> = [];
  displayPoLine: Array<boolean> = [];
  public maxDate = new Date();
  public today = new Date();
  public priorDate = new Date().setDate(this.today.getDate() - 30)
  public data1: any[];
  public selectedInvItem = new Array();

  @ViewChild("myinput") myInputField: ElementRef;
  @ViewChild("suppCode1") suppCode1: ElementRef;
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.poMasterDtoForm = this.fb.group({

      poHeaderId: [],
      ouId: ['', [Validators.required]],
      poDate: ['', [Validators.required]],
      poType: ['', [Validators.required]],
      segment1: [''],
      supplierSiteId: [],
      // segmentName: [],
      // polineNum:[],
      supplierCode: ['', [Validators.required]],
      supplierName: [],
      billToLoc: [],
      shipToLoc: [],
      currencyCode: [],
      authorizationStatus: [],
      totalAmt: [],
      suppInvNo: ['', [Validators.nullValidator, Validators.minLength(3), Validators.maxLength(30)]],
      ewayBillNo: [],
      iRNNo: [],
      approveDate: ['', [Validators.nullValidator]],
      TransactionNature: [],
      dept: [],
      baseAmount: [],
      empId: [],
      purchaseLocation: [],
      evaluatorName: [],
      exchangeBonusShare: [],
      delearCode: [''],
      // delearCode: ['', [Validators.nullValidator, Validators.minLength(6), Validators.maxLength(8)]],
      ewayBillDate: [],
      GSTDocumentNo: [],
      GSTDocumentDate: [],
      poNo: [],
      recoverableFlag: [],
      selfAssesedFlag: [],
      inclusiveFlag: [],
      description: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z 0-9]*')]],
      totTaxAmt: [],
      ouName: [],
      name: [],
      contextValue: [],
      divisionName: [],
      address: [],
      mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      kilometer: [],
      transferToNewCarACNo: [],
      paymentToBank: [],
      paymentToCustomer: [],
      holdforPendingDoc: [],
      deptName: [],
      segment11: [],
      segment2: [],
      segment3: [],
      segment4: [],
      segment5: [],
      // segment6: [],
      // segment7: [],
      // segment8: [],
      // segment9: [],
      lookupValueDesc4: [],
      lookupValueDesc1: [],
      lookupValueDesc2: [],
      lookupValueDesc3: [],
      lookupValueDesc5: [],
      poLines: this.fb.array([this.lineDetailsGroup()]),

    });
  }
  get f() { return this.poMasterDtoForm.controls; }

  ngOnInit(): void {
    this.currentOp = 'insert';
    this.hideArray[0] = true;

    console.log(sessionStorage.getItem('emplId'));
    this.empId = Number(sessionStorage.getItem('emplId'));
    this.dept = (sessionStorage.getItem('dept'));
    this.deptName = (sessionStorage.getItem('deptName'));
    var locCODE = sessionStorage.getItem('locCode')
    var temp = locCODE.split('.');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.name = (sessionStorage.getItem('name'));
    if (this.deptName === 'Sales' || this.deptName === 'Service' || this.deptName === 'DP' || this.deptName === 'Spares') {
      this.displayDept = true;
      //  this.dept = this.deptName
    } else {
      this.displayDept = false;
    }
    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );

    this.service.OUIdList()
      .subscribe(
        data => {
          this.OUIdList = data;
          console.log(this.OUIdList);
        }
      );
    this.service.DepartmentList()
      .subscribe(
        data => {
          this.DepartmentList = data;
          console.log(this.DepartmentList);
        }
      );
    this.service.DepartmentListById(this.dept)
      .subscribe(
        data => {
          this.DepartmentListById = data;
          console.log(this.DepartmentListById);
          console.log(this.DepartmentListById.divisionName);
          this.poMasterDtoForm.patchValue(this.DepartmentListById.divisionName);
          this.divisionName = this.DepartmentListById.divisionName
        }
      );

    // this.service.invItemList()
    //   .subscribe(
    //     data => {
    //       this.invItemList = data;
    //       console.log(this.invItemList);
    //     }
    //   );
    this.service.taxCategoryList()
      .subscribe(
        data1 => {
          this.taxCategoryList = data1;
          console.log(this.taxCategoryList);
          data1 = this.taxCategoryList;
        }
      );

    this.service.supplierCodeList()
      .subscribe(
        data1 => {
          this.supplierCodeList = data1;
          console.log(this.supplierCodeList);
          data1 = this.supplierCodeList;
        }
      );
    this.service.poTypeList()
      .subscribe(
        data => {
          this.poTypeList = data;
          console.log(this.poTypeList);
        }
      );
    this.service.getLocationSearch1(this.ouId)
      .subscribe(
        data => {
          this.BillShipList = data;
          console.log(this.BillShipList);
        }
      );
    this.service.getLocationSearch1(this.ouId)
      .subscribe(
        data => {
          this.BillShipList1 = data;
          console.log(this.BillShipList1);
        }
      );
    this.service.locationCodeList()
      .subscribe(
        data => {
          this.locIdList = data;
          console.log(this.locIdList);
        }
      );
    this.service.DivisionIDList()
      .subscribe(
        data => {
          this.DivisionIDList = data;
          console.log(this.DivisionIDList);
        }
      );
    this.service.companyCodeList()
      .subscribe(
        data => {
          this.companyCodeList = data;
          console.log(this.companyCodeList);
        }
      );
    this.service.BranchList()
      .subscribe(
        data => {
          this.BranchList = data;
          console.log(this.BranchList);
        }
      );
    this.service.CostCenterList()
      .subscribe(
        data => {
          this.CostCenterList = data;
          console.log(this.CostCenterList);
        }
      );
    this.service.NaturalAccountList()
      .subscribe(
        data => {
          this.NaturalAccountList = data;
          console.log(this.NaturalAccountList);
        }
      ); this.service.InterBrancList()
        .subscribe(
          data => {
            this.InterBrancList = data;
            console.log(this.InterBrancList);
          }
        );
    // this.service.FutureList()
    //   .subscribe(
    //     data => {
    //       this.FutureList = data;
    //       console.log(this.FutureList);
    //     }
    //   );
    // this.service.SubAccountList()
    //   .subscribe(
    //     data => {
    //       this.SubAccountList = data;
    //       console.log(this.SubAccountList);
    //     }
    //   );

    this.service.TransactionNatureList()
      .subscribe(
        data => {
          this.TransactionNatureList = data;
          console.log(this.TransactionNatureList);
        }
      );
    this.service.purchaseLocationList(temp[0])
      .subscribe(
        data => {
          this.purchaseLocationList = data;
          console.log(data);
        }
      );

    this.service.YesNoList()
      .subscribe(
        data => {
          this.YesNoList = data;
          console.log(this.YesNoList);
        }
      )
    if (this.authorizationStatus == null) {

    }
    this.service.delearCodeList()
      .subscribe(
        data => {
          this.delearCodeList = data;
          console.log(this.delearCodeList);
        }
      );


    // // this.onChanges();
    // var patch = this.poMasterDtoForm.get('poLines') as FormArray;
    // if (patch.length >= 1) {
    //   for (let val of patch.controls) {
    //     val.get('itemType').valueChanges.subscribe(data => {
    //       alert("inside forof blur");
    //       console.log("itemType " + patch.controls.indexOf(val) + ': ', val.get('itemType').value)
    //       this.onOptioninvitemTypeSelected(val.get('itemType').value, patch.controls.indexOf(val));
    //     })
    //   }
    // }
  }
  //   onChanges(): void {
  //     this.poMasterDtoForm.valueChanges.subscribe(val => {
  //     // alert('form event');
  //   });
  // }
  // public fields: Object = { text: 'name', value: 'suppNo' };
  // // set the height of the popup element
  // public height: string = '220px';
  // // set the placeholder to DropDownList input element
  // public watermark: string = 'Select a supplier code';
  // // set the placeholder to filter search box input element
  // public filterPlaceholder: string = 'Search';
  // // filtering event handler to filter a Country
  // public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
  //     let query: Query = new Query();
  //     //frame the query based on search string with filter type.
  //     query = (e.text !== '') ? query.where('name', 'startswith', e.text, true) : query;
  //     //pass the filter data source, filter query to updateData method.
  //     e.updateData(this.supplierCodeList, query);
  // }


  newLineS(): FormGroup {
    return this.fb.group({

      poLines: this.fb.array([])
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
    });
  }


  TaxDetailsArray(i: number): FormArray {
    return this.lineDetailsArray.controls[i].get('taxAmounts') as FormArray
  }

  lineDetailsGroup() {
    return this.fb.group({
      poLineId: [],
      polineNum: [],
      segment: ['', [Validators.required]],
      invItemId: [],
      invDescription: [],
      invCategory: [],
      uom: [],
      hsnSacCode: [],
      taxCategoryName: [],
      diss1: [],

      itemType: [],
      unitPrice: [],
      orderedQty: ['', [Validators.required, Validators.pattern("^[-]{1}[0-9]*$")]],    //^[0-9]\d*(\.\d+)?$
      baseAmtLineWise: [],
      poChargeAcc: [],
      taxCategoryId: [],
      segmentName: [],

      taxAmtLineWise: [],
      totAmtLineWise: [],

      taxAmounts: this.fb.array([])

    });
  }

  get lineDetailsArray() {
    var patch = this.poMasterDtoForm.get('poLines') as FormArray;
    (patch.controls[0]).patchValue(
      {
        polineNum: 1,
      }
    );
    this.displayPoLine[0] = true;
    // this.displayPoLine.push(true);
    // this.hideArray.push(true);
    // this.hideArray[0] = false;
    return <FormArray>this.poMasterDtoForm.get('poLines')
  }

  patchResultList(i, taxCalforItem) {

    let control = this.lineDetailsArray.controls[i].get('taxAmounts') as FormArray
    // alert(control);


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
      }));
    });
    console.log(control);
  }

  removeTaxAmount(i: number) {

  }

  addRow1(index, totxt) {
    // totxt.focus();
    // alert(index);
    // const lineGr =  this.lineDetailsGroup();
    this.lineDetailsArray.push(this.lineDetailsGroup());
    var aa = index + 1;
    // alert(aa);

    this.lineDetailsArray.at[index].patchValue([{
      polineNum: aa,
    }])
  }

  addRow(index) {
    var arrayControl = this.poMasterDtoForm.get('poLines').value

    var invItemId = arrayControl[index].invItemId;

    if (invItemId != null) {
      this.lineDetailsArray.push(this.lineDetailsGroup());
      // arrayControl[index].itemType.focus();
      //  alert
    } else { ('Kindly Insert the line-Details first'); }
    var index = index + 1

    var aa = index + 1;
    var patch = this.poMasterDtoForm.get('poLines') as FormArray;
    (patch.controls[index]).patchValue(
      {
        polineNum: aa,
      }
    );
    // this.displayPoLine[aa] = true;
    this.displayPoLine.push(true);
    this.hideArray[index] = true;
    // val1+index.focus();


  }
  RemoveRow(index) {
    if (index === 0) {

    } else {
      this.lineDetailsArray.removeAt(index);
    }
    this.lineDetailsArray.removeAt(index);
    this.displayPoLine[index] = true;
    this.hideArray[index] = true;
  }



  Search(poNo) {

    this.poMasterDtoForm.reset();
    this.currentOp = 'Search';
    console.log(this.poMasterDtoForm.value);
    this.service.getsearchByPOHeder(poNo)
      .subscribe(
        data => {
          console.log(data);
          if (data.code === 400) {
            this.displayNewButtonApprove = false;
            this.displayNewButtonUpdate = false;
            this.displayNewButtonSave = false;
            this.displayNewButtonReset = false;
            alert(data.message);
            window.location.reload();
          } if (data.code === 200) {
            let control3 = this.poMasterDtoForm.get('poLines') as FormArray;
            var lenC = control3.length
            // alert(lenC);
            this.lstcomments1 = data.obj;
            const status = this.lstcomments1.authorizationStatus;
            if (status === 'Inprogress') {
              this.displayNewButtonApprove = true;
              this.displayNewButtonUpdate = true;
              this.displayNewButtonSave = false;
              this.displayNewButtonReset = false;

              this.displayOnStatus = true;
              this.displayButton = false;
              this.displayNewButton = false;
              this.displayTaxDetailForm = true;
              let control = this.poMasterDtoForm.get('poLines') as FormArray;
              for (let i = 0; i <= this.lstcomments1.poLines.length - lenC; i++) {
                var poLine: FormGroup = this.lineDetailsGroup();
                let control1 = this.lineDetailsArray.controls[i].get('taxAmounts') as FormArray
                this.displayPoLine[i] = false;
                this.hideArray[i] = true;
                control.push(poLine);
              }
              // alert('PO LINE LENGTH '+ this.lstcomments1.poLines.length)
              
              var len = this.lstcomments1.poLines.length - 1
              this.lineDetailsArray.removeAt(len);
              for (var j = 0; j < this.lstcomments1.poLines.length; j++) {
                //var aa =j+1;
                // alert('aa '+j);
                console.log(control);

                (control.controls[j]).patchValue(
                  {
                    diss1: this.lstcomments1.poLines[j].taxAmounts[0].totTaxAmt,
                  });

                  (control.controls[j]).patchValue({ taxCategoryName:this.lstcomments1.poLines[j].taxCategoryName })
                  taxCategoryName:this.lstcomments1.poLines[j].taxCategoryName,
                  console.log(this.lstcomments1.poLines[j].taxCategoryName);
              }
              
              this.poMasterDtoForm.patchValue(this.lstcomments1);

              // alert('displayPoLine.length ' + this.displayPoLine.length);
              for (let x = 0; x < this.displayPoLine.length; x++) {
                // alert(this.displayPoLine[x] + '--' + this.hideArray[x]);
              }
              for (let i = 0; i <= this.lstcomments1.poLines.length - 1; i++) {
                let taxControl = this.lineDetailsArray.controls[i].get('taxAmounts') as FormArray
                taxControl.clear();
                var taxItems: any[] = this.lstcomments1.poLines[i].taxAmounts;
                // alert(taxItems);

                taxItems.forEach(x => {
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
                });
                // this.taxDetails('Search',i, 'taxCategoryId');
              }
              // this.lineDetailsArray.removeAt(this.lstcomments1.poLines.length - 1);
            }
            if (status === "APPROVED") {
              // alert('in approve')

              this.displayNewButtonApprove = false;
              this.displayNewButtonUpdate = false;
              this.displayNewButtonSave = false;
              this.displayNewButtonReset = false;

              this.displayOnStatus = false;
              this.displayButton = false;
              this.dispbut = false;
              this.displayLine = false;
              this.displayNewButton = false;
              this.approvedArray = this.lstcomments1.poLines;
              console.log(this.approvedArray);

              // let control = this.poMasterDtoForm.get('poLines') as FormArray;
              // for (let i = 0; i < data.poLines.length - 1; i++) {
              //   var poLine: FormGroup = this.lineDetailsGroup();
              //   control.push(poLine);
              //   this.displayPoLine[i] = false;
              //   this.hideArray[i] = true;
              // }
              // this.poMasterDtoForm.patchValue(this.lstcomments1);
              let control = this.poMasterDtoForm.get('poLines') as FormArray;
              // for (let i = 0; i <= this.lstcomments1.poLines.length - 1; i++) {
              for (let i = 0; i <= this.lstcomments1.poLines.length - lenC; i++) {
                var poLine: FormGroup = this.lineDetailsGroup();
                let control1 = this.lineDetailsArray.controls[i].get('taxAmounts') as FormArray
                this.displayPoLine[i] = false;
                this.hideArray[i] = true;
                control.push(poLine);
              }
              var len = this.lstcomments1.poLines.length - 1
              this.lineDetailsArray.removeAt(len);
              this.poMasterDtoForm.patchValue(this.lstcomments1);

              // alert('displayPoLine.length ' + this.displayPoLine.length);
              for (let x = 0; x < this.displayPoLine.length; x++) {
                // alert(this.displayPoLine[x] + '--' + this.hideArray[x]);
              }
              for (let i = 0; i <= this.lstcomments1.poLines.length - 1; i++) {
                let taxControl = this.lineDetailsArray.controls[i].get('taxAmounts') as FormArray
                taxControl.clear();
                var taxItems: any[] = this.lstcomments1.poLines[i].taxAmounts;
                // alert(taxItems);

                taxItems.forEach(x => {
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
                });
                // this.taxDetails('Search',i, 'taxCategoryId');
              }
            }
          }
        }
      );
  }
  transData(val) {
    delete val.id;
    delete val.poNo;
    delete val.poHeaderId;
    delete val.poLineId;
    delete val.segment1;
    delete val.posegment11;
    delete val.segment2;
    delete val.segment3;
    delete val.segment4;
    delete val.segment5;
    // delete val.segment6;
    // delete val.segment7;
    // delete val.segment8;
    // delete val.segment9;
    delete val.lookupValueDesc4;
    delete val.lookupValueDesc1;
    delete val.lookupValueDesc2;
    delete val.lookupValueDesc3;
    delete val.lookupValueDesc5;
    delete val.segmentName;
    delete val.recoverableFlag;
    delete val.selfAssesedFlag;
    delete val.inclusiveFlag;
    delete val.totTaxPer;
    // delete val.ouName;
    // delete val.name;
    console.log(val);
    return val;
  }
  transUData(val) {
    delete val.id;
    delete val.poNo;
    delete val.authorizationStatus;
    delete val.approveDate;
    delete val.posegment11;
    delete val.poHeaderId;
    delete val.poLineId;
    delete val.ouId;
    delete val.poDate;
    delete val.poType;
    delete val.supplierSiteId;
    delete val.supplierCode;
    delete val.billToLoc;
    delete val.shipToLoc;
    delete val.currencyCode;
    delete val.totalAmt;
    delete val.ewayBillNo;
    delete val.iRNNo;
    delete val.dept;
    delete val.empId;
    delete val.baseAmount;
    delete val.suppInvNo;
    delete val.TransactionNature;
    delete val.purchaseLocation;
    delete val.evaluatorName;
    delete val.exchangeBonusShare;
    delete val.polineNum;
    delete val.invItemId;
    delete val.uom;
    delete val.itemType;
    delete val.unitPrice;
    delete val.orderedQty;
    delete val.baseAmtLineWise;
    delete val.cancelFlag;
    delete val.cancelBy;
    delete val.cancelDate;
    delete val.cancelReason;
    delete val.delearCode;
    delete val.closedCode;
    delete val.poChargeAcc;
    delete val.startDate;
    delete val.endDate;
    delete val.status;
    delete val.recoverableFlag;
    delete val.selfAssesedFlag;
    delete val.inclusiveFlag;
    delete val.totTaxPer;
    delete val.ouName;
    delete val.name;
    delete val.lookupValueDesc4;
    delete val.lookupValueDesc1;
    delete val.lookupValueDesc2;
    delete val.lookupValueDesc3;
    delete val.lookupValueDesc5;

    return val;
  }
  transUpdateData(val) {
    let control = val.poLines as FormArray;
    var len = control.length - 1
    if (control[len].invItemId === null) {
      delete val.poLines[len];
    }
    // control.removeAt(2);
    // console.log(control);
    delete val.id;
    delete val.poNo;
    // delete val.authorizationStatus;
    // delete val.approveDate;
    delete val.posegment11;
    // delete val.poHeaderId;
    // delete val.ouId;
    // delete val.poDate;
    // delete val.poType;
    // delete val.supplierSiteId;
    // delete val.supplierCode;
    // delete val.billToLoc;
    // delete val.shipToLoc;
    // delete val.currencyCode;
    // delete val.totalAmt;
    // delete val.ewayBillNo;
    // delete val.iRNNo;
    // delete val.dept;
    // delete val.empId;
    // delete val.baseAmount;
    // delete val.suppInvNo;
    // delete val.TransactionNature;
    // delete val.purchaseLocation;
    // delete val.evaluatorName;
    // delete val.exchangeBonusShare;

    delete val.startDate;
    delete val.endDate;
    delete val.status;
    delete val.segment11;
    delete val.segment2;
    delete val.segment3;
    delete val.segment4;
    delete val.segment5;
    // delete val.segment6;
    // delete val.segment7;
    // delete val.segment8;
    // delete val.segment9;
    delete val.lookupValueDesc4;
    delete val.lookupValueDesc1;
    delete val.lookupValueDesc2;
    delete val.lookupValueDesc3;
    delete val.lookupValueDesc5;
    // delete val.recoverableFlag;
    // delete val.selfAssesedFlag;
    // delete val.inclusiveFlag;
    // delete val.totTaxPer;
    // delete val.ouName;
    // delete val.name;
    return val;
  }
  newPOMast() {
    this.displayNewButtonApprove = true;
    this.displayNewButtonUpdate = true;
    this.displayNewButtonSave = false;
    this.displayNewButtonReset = false;
    this.authorizationStatus = 'Inprogress';
    const formValue: IpostPO = this.transData(this.poMasterDtoForm.value);
    formValue.authorizationStatus = 'Inprogress';
    formValue.ouId = this.ouId;
    formValue.currencyCode = 'INR';
    var arrayControl = this.poMasterDtoForm.get('poLines').value
    this.baseAmount = 0;
    this.totTaxAmt = 0;
    this.totalAmt = 0;

    for (var i = 0; i < arrayControl.length; i++) {
      this.baseAmount = this.baseAmount + arrayControl[i].baseAmtLineWise;
      this.totTaxAmt = this.totTaxAmt + arrayControl[i].taxAmtLineWise;
    }
    this.totalAmt = (this.baseAmount + this.totTaxAmt);
    formValue.totalAmt = this.totalAmt;
    formValue.baseAmount = this.baseAmount;
    formValue.totTaxAmt = this.totTaxAmt;
    formValue.poType = this.poType;
    formValue.dept = Number(this.dept);
    formValue.supplierCode = this.supplierCode;
    this.service.poSubmit(formValue).subscribe((res: any) => {
      var obj = res.obj;
      sessionStorage.setItem('poNo', obj);

      if (res.code === 200) {
        alert('PO INSERTED SUCCESSFUILY');
        this.segment1 = sessionStorage.getItem('poNo');
        this.Search(this.segment1);
        // this.displayNewButtonApprove =true;
        // this.displayNewButtonUpdate= true;
        // this.displayNewButtonSave=false;
        // this.displayNewButtonReset=false;

        // this.displayButton = false;
        // this.displayNewButton = false;
        // this.displaySuppcode = false;
        // this.dispDivision = false;
      }

      if (res.code === 400) {
        // alert('Code already present in the data base');
        alert(res.message);
        // this.poMasterDtoForm.reset();
        // window.location.reload();
        // alert(res.message);

      }

    });
  }
  // saveButton(){
  //   this.displayNewButtonSave=true;
  // }
  onSupplierCodeSelected(supp: string) {

    // this.displayNewButtonSave=true;
    //let value = $event.target.value.split("-")[1].trim();
    var value = supp.substr(supp.indexOf('@') + 1, supp.length);
    let selectedValue = this.supplierCodeList.find(v => v.suppNo == value);
    // alert(selectedValue.suppId);
    console.log(selectedValue, value);
    this.supplierCode = selectedValue.suppId;
    this.service.suppIdList(selectedValue.suppId, this.ouId)
      .subscribe(
        data => {

          this.suppIdList = data;
          if (this.suppIdList.length == 0) {
            alert('Supplier site not attached to supplier');
          } else {
            console.log(this.suppIdList);
          }
        }
      );
  }
  onOptionTaxCatSelected(i, taxCategoryName) {
    // alert(taxCategoryName);
    // let val = this.poMasterDtoForm.get('taxCategoryName').value;
    // alert('val ' +val);
    // alert('taxCategoryName '+taxCategoryName);
    let selectedValue = this.taxCategoryList.find(v => v.taxCategoryName == taxCategoryName);
    // alert(selectedValue);
    this.taxCategoryId = selectedValue.taxCategoryId
    // alert('selectedValue.taxCategoryId '+ selectedValue.taxCategoryId)
    // alert(' this.taxCategoryId ' + this.taxCategoryId)
    var patch = this.poMasterDtoForm.get('poLines') as FormArray;
    (patch.controls[i]).patchValue(
      {
        taxCategoryId: Number(this.taxCategoryId),
      });
    // alert(this.taxCategoryId);
    /////////TAX DETAIL CALCULATION//////
    var arrayControl = this.poMasterDtoForm.get('poLines').value
    var patch = this.poMasterDtoForm.get('poLines') as FormArray;
    var itemId = this.ItemDetailsList.itemId;
    var diss = 0;
    var sum = 0;
    var baseAmount = arrayControl[i].baseAmtLineWise
    this.service.taxCalforItem(itemId, this.taxCategoryId, diss, baseAmount)
      .subscribe(
        (data: any[]) => {
          this.taxCalforItem = data;
          console.log(this.taxCalforItem);
          // alert(this.taxCalforItem.length);
          for (let i = 0; i < this.taxCalforItem.length; i++) {

            if (this.taxCalforItem[i].totTaxPer != 0) {
              sum = sum + this.taxCalforItem[i].totTaxAmt
            }
          }
          (patch.controls[i]).patchValue({
            baseAmtLineWise: arrayControl[i].baseAmtLineWise,
            taxAmtLineWise: sum,
            totAmtLineWise: arrayControl[i].baseAmtLineWise + sum,
          });
        });

    this.patchResultList(i, this.taxCalforItem);
  }
  onOptioninvItemIdSelected(itemId, index) {
    // alert(itemId);
    let selectedValue = this.invItemList.find(v => v.segment == itemId);
    // debugger;
    // alert(selectedValue);
    console.log(selectedValue);

    this.selectedInvItem.push(selectedValue);
    var arrayControl = this.poMasterDtoForm.get('poLines').value
    var patch = this.poMasterDtoForm.get('poLines') as FormArray;
    this.itemType = arrayControl[index].itemType
    this.invItemId = selectedValue.itemId;
    // alert(this.invItemId);
    console.log(this.invItemId, this.taxCat);
    if (this.itemType === "GOODS") {

      this.service.ItemDetailsList(this.invItemId, this.taxCat, this.billToLoc).subscribe((res: any) => {
        if (res.code === 200) {
          this.ItemDetailsList = res.obj;

          var patch = this.poMasterDtoForm.get('poLines') as FormArray;

          this.taxCategoryId = this.ItemDetailsList.taxCategoryId
          if (this.ItemDetailsList.segmentName === null) {
            (patch.controls[index]).patchValue(
              {
                diss1: 0,
                invDescription: this.ItemDetailsList.invDescription,
                invCategory: this.ItemDetailsList.invCategory,
                uom: this.ItemDetailsList.uom,
                hsnSacCode: this.ItemDetailsList.hsnSacCode,
                taxCategoryName: this.ItemDetailsList.taxCategoryName,
                segmentName: this.segmentName1,
                poChargeAcc: Number(this.ItemDetailsList.codeCombinationId),
                taxCategoryId: Number(this.ItemDetailsList.taxCategoryId),
                invItemId: this.invItemId,

              }

            );
          }
          else {

            const invCategory = this.ItemDetailsList.invCategory.substr(0, 3);
            if (invCategory === 'MCH') {
              
              (patch.controls[index]).patchValue(
                {
                  diss1: 0,
                  uom: this.ItemDetailsList.uom,
                  orderedQty: 1,
                  invDescription: this.ItemDetailsList.invDescription,
                  invCategory: this.ItemDetailsList.invCategory,
                  hsnSacCode: this.ItemDetailsList.hsnSacCode,
                  taxCategoryName: this.ItemDetailsList.taxCategoryName,
                  segmentName: this.ItemDetailsList.segmentName,
                  poChargeAcc: Number(this.ItemDetailsList.codeCombinationId),
                  taxCategoryId: Number(this.ItemDetailsList.taxCategoryId),
                  invItemId: this.invItemId,
                }
              );
            }
            else {
              // alert('segment value is not null');
              (patch.controls[index]).patchValue(
                {
                  diss1: 0,
                  uom: this.ItemDetailsList.uom,
                  invDescription: this.ItemDetailsList.invDescription,
                  invCategory: this.ItemDetailsList.invCategory,
                  hsnSacCode: this.ItemDetailsList.hsnSacCode,
                  taxCategoryName: this.ItemDetailsList.taxCategoryName,
                  segmentName: this.ItemDetailsList.segmentName,
                  poChargeAcc: Number(this.ItemDetailsList.codeCombinationId),
                  taxCategoryId: Number(this.ItemDetailsList.taxCategoryId),
                  invItemId: this.invItemId,
                }
              );
            }
          }
        }
        else {
          if (res.code === 400) {
            alert(res.message);
          }
        }
      });

    }
    if (this.itemType === "EXPENCE") {

      // alert('in expence');
      this.service.expenceItemDetailsList(this.invItemId)
        .subscribe(
          data => {
            this.ItemDetailsList = data;
            console.log(this.ItemDetailsList);
            var patch = this.poMasterDtoForm.get('poLines') as FormArray;
            this.taxCategoryId = this.ItemDetailsList.taxCategoryId
           
              (patch.controls[index]).patchValue(
                {
                  diss1: 0,
                  uom: this.ItemDetailsList.uom,
                  invDescription: this.ItemDetailsList.invDescription,
                  invCategory: this.ItemDetailsList.invCategory,
                  hsnSacCode: this.ItemDetailsList.hsnSacCode,
                  taxCategoryName: this.ItemDetailsList.taxCategoryName,
                  segmentName: this.ItemDetailsList.segmentName,
                  poChargeAcc: Number(this.ItemDetailsList.codeCombinationId),
                  taxCategoryId: Number(this.ItemDetailsList.taxCategoryId),
                  invItemId: this.invItemId,
                }
              );


          }
        );
    }
  }
  onContextValueSelected(contextValue: any) {
    if (contextValue === 'TrueValue') {
      this.displayContexValue = false;
    } if (contextValue === 'Select') {

      this.displayContexValue = true;
    }
  }
  onSiteSelected(siteId: any) {
    // alert(siteId);
    this.service.siteIdList(siteId)
      .subscribe(
        data => {
          this.siteIdList = data;
          console.log(this.siteIdList);
          this.taxCat = this.siteIdList.taxCategoryName
          // alert(this.taxCat);
          if (this.taxCat == null) {
            alert("Tax not attached to site")
            this.displayNewButton = false;
            const sitWithOutTax = 'y';
          }
        }
      );
  }


  Submit() { }

  fnCancatination(index) {
    // alert(index);


    var arrayControl = this.poMasterDtoForm.get('poLines').value
    var patch = this.poMasterDtoForm.get('poLines') as FormArray;
    // arrayControl[index].segmentName = arrayControl[index].segment11 + '.' + arrayControl[index].segment2 + '.' + arrayControl[index].segment3 + '.' + arrayControl[index].segment4 + '.' + arrayControl[index].segment5 + '.' + arrayControl[index].segment6 + '.' + arrayControl[index].segment7 + '.' + arrayControl[index].segment8 + '.' + arrayControl[index].segment9;
    arrayControl[index].segmentName = this.poMasterDtoForm.get('segment11').value + '.'
      + this.poMasterDtoForm.get('segment2').value + '.'
      + this.poMasterDtoForm.get('segment3').value + '.'
      + this.poMasterDtoForm.get('segment4').value + '.'
      + this.poMasterDtoForm.get('segment5').value;
    // + this.poMasterDtoForm.get('segment6').value;
    //  + this.poMasterDtoForm.get('segment7').value + '.'
    //  + this.poMasterDtoForm.get('segment8').value + '.' 
    //  + this.poMasterDtoForm.get('segment9').value  ;
    this.segmentName1 = arrayControl[index].segmentName
    console.log(this.segmentName1);
    (patch.controls[index]).patchValue({ segmentName: arrayControl[index].segmentName })

    this.service.segmentNameList(this.segmentName1)
      .subscribe(
        data => {

          this.segmentNameList = data;
          if (this.segmentNameList.code === 200) {
            (patch.controls[index]).patchValue({ poChargeAcc: this.segmentNameList.obj.codeCombinationId })
            if (this.segmentNameList.length == 0) {
              alert('Invalid Code Combination');
            } else {
              console.log(this.segmentNameList);
              this.poChargeAcc = Number(this.segmentNameList.codeCombinationId)
            }
          } else if (this.segmentNameList.code === 400) {
            var arrayControl = this.poMasterDtoForm.get('poLines').value
              (patch.controls[index]).patchValue({ segmentName: '' })
            // alert(this.segmentNameList.message);

          }
        }
      );
    this.poMasterDtoForm.get('segment11').reset();
    this.poMasterDtoForm.get('segment2').reset();
    this.poMasterDtoForm.get('segment3').reset();
    this.poMasterDtoForm.get('segment4').reset();
    this.poMasterDtoForm.get('segment5').reset();
    // this.poMasterDtoForm.get('segment6').reset();
    this.poMasterDtoForm.get('lookupValueDesc1').reset();
    this.poMasterDtoForm.get('lookupValueDesc2').reset();
    this.poMasterDtoForm.get('lookupValueDesc3').reset();
    this.poMasterDtoForm.get('lookupValueDesc4').reset();
    this.poMasterDtoForm.get('lookupValueDesc5').reset();
  }


  onKey(index) {
    console.log(index);
    // alert(index+ ' index')
    var arrayControl = this.poMasterDtoForm.get('poLines').value
    var patch = this.poMasterDtoForm.get('poLines') as FormArray;
    console.log(arrayControl);
    arrayControl[index].baseAmtLineWise = arrayControl[index].unitPrice * arrayControl[index].orderedQty;

    var baseAmount = arrayControl[index].baseAmtLineWise

    console.log(arrayControl[index].baseAmtLineWise);

    console.log((this.poMasterDtoForm.controls['poLines'][index]));

    var itemId = this.ItemDetailsList.itemId;
    // var taxCategoryId = taxCategoryId;
    // this.taxCatId = taxCategoryId;
    var diss = 0;
    var sum = 0;
    // var baseAmount = this.sum;
    this.service.taxCalforItem(itemId, this.taxCategoryId, diss, baseAmount)
      .subscribe(
        (data: any[]) => {
          this.taxCalforItem = data;
          console.log(this.taxCalforItem);
          // alert(this.taxCalforItem.length);
          for (let i = 0; i < this.taxCalforItem.length; i++) {

            if (this.taxCalforItem[i].totTaxPer != 0) {
              sum = sum + this.taxCalforItem[i].totTaxAmt
            }
          }
          (patch.controls[index]).patchValue({
            baseAmtLineWise: arrayControl[index].baseAmtLineWise,
            taxAmtLineWise: sum,
            totAmtLineWise: arrayControl[index].baseAmtLineWise + sum,
          });
          this.patchResultList(index, this.taxCalforItem);
        });
    console.log(this.poMasterDtoForm.value);


    // alert('for '+this.taxCalforItem.length);


    // index = index+1 
    this.baseAmountCal(baseAmount);
  }
  baseAmountCal(baseAmount) {

    this.sum = this.sum + baseAmount;
    // alert(this.sum)
  }

  UpdatePOMast() {
    this.supplierCode = this.poMasterDtoForm.get('supplierCode').value
    // alert(this.supplierCode);
    const formValue: IpostPO = this.transUpdateData(this.poMasterDtoForm.value);
    console.log(formValue);
    // alert(formValue.supplierCode);
    formValue.supplierCode = this.supplierCode;
    formValue.ouId = this.ouId;
    formValue.currencyCode = 'INR';
    var arrayControl = this.poMasterDtoForm.get('poLines').value
    this.baseAmount = 0;
    this.totTaxAmt = 0;
    this.totalAmt = 0;

    for (var i = 0; i < arrayControl.length; i++) {
      this.baseAmount = this.baseAmount + arrayControl[i].baseAmtLineWise;
      this.totTaxAmt = this.totTaxAmt + arrayControl[i].taxAmtLineWise;
    }
    this.totalAmt = (this.baseAmount + this.totTaxAmt);
    formValue.totalAmt = this.totalAmt;
    formValue.baseAmount = this.baseAmount;
    formValue.totTaxAmt = this.totTaxAmt;


    this.service.UpdatePoDetails(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('PO UPDATED SUCCESSFUILY');
        // this.authorizationStatus = 'APPROVED';
        this.displayNewButton = false;
        this.displayNewButtonApprove = true;
        this.displayNewButtonUpdate = false;
        this.displayNewButtonSave = false;
        this.displayNewButtonReset = false;
        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.poMasterDtoForm.reset();
        }
      }
    });
  }
  Approve() {
    this.displayNewButtonApprove = false;
    this.displayNewButtonUpdate = false;
    this.displayNewButtonSave = false;
    this.displayNewButtonReset = false;
    const formValue: IpostPO = this.transUData(this.poMasterDtoForm.value);
    formValue.ouId = this.ouId;
    formValue.dept = Number(this.dept);
    formValue.currencyCode = 'INR';
    this.service.ApprovePo(formValue, formValue.segment1).subscribe((res: any) => {
      if (res.code === 200) {
        alert('PO APPROVED SUCCESSFUILY');
        this.displayNewButtonApprove = false;
        this.displayNewButtonUpdate = false;
        this.displayNewButtonSave = false;
        this.displayNewButtonReset = false;
        this.authorizationStatus = 'APPROVED';
        this.approveDate = new Date();
        this.displayNewButton = false;
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.poMasterDtoForm.reset();
        }
      }
    });
  }

  DeletePo(segment1) {
    alert(segment1)
  }


  UpdatetaxDetails() {

  }




  taxDetails(op, i, taxCategoryId) {
    // this.selectedLine = i;
    // alert(taxCategoryId);
    // alert(this.currentOp+ i);
    // alert('taxCategoryId ' + taxCategoryId);
    this.poLineTax = i;
    this.displaytaxDisscountButton = false;
    this.displayTaxDetailForm = false;
    var displayTaxPanel: Boolean = this.hideArray[i];
    this.hideArray[i] = !displayTaxPanel;
    //  alert('  alert(this.hideArray[i]) '+this.hideArray[i]);
    if (this.currentOp === 'Search') {
      // alert('in if')
      // let control = this.poMasterDtoForm.get('poLines') as FormArray;

      // for (let i = 0; i < this.lstcomments1.poLines.length - 1; i++) {
      // var poLine: FormGroup = this.lineDetailsGroup();
      // this.displayLine=false;
      // control.push(poLine);
      let taxControl = this.lineDetailsArray.controls[i].get('taxAmounts') as FormArray
      taxControl.clear();
      var TaxLine: FormGroup = this.TaxDetailsGroup();

      var taxItems: any[] = this.lstcomments1.poLines[i].taxAmounts;
      // alert(taxItems);

      taxItems.forEach(x => {
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
      });
      // }
    } else {
      // this.hideArray[i] = false;
      // if(i === 0 && this.hideArray[i]=== false){
      //   this.hideArray[i] = false;
      // }else{
      // // this.hideArray[i] = false;
      // this.hideArray[i] = !displayTaxPanel;
      // }
      // this.poLineTax = i;
      // this.displaytaxDisscountButton = false;
      // this.displayTaxDetailForm = false;
      // alert('hi')
      var itemId = this.ItemDetailsList.itemId;
      var taxCategoryId = taxCategoryId;
      this.taxCatId = taxCategoryId;
      // var diss = 0;
      var arrayControl = this.poMasterDtoForm.get('poLines').value
      var diss = arrayControl[i].diss1;
      var baseAmount = arrayControl[this.poLineTax].baseAmtLineWise;
      this.service.taxCalforItem(itemId, taxCategoryId, diss, baseAmount)
        .subscribe(
          (data: any[]) => {
            this.taxCalforItem = data;
            // alert(this.taxCalforItem.length);
            console.log(this.taxCalforItem);
            this.patchResultList(i, this.taxCalforItem);

          }
        );

    }
  }

  addDiscount(i) {
    const formValue: IpostPO = this.poMasterDtoForm.value;
    formValue.polineNum = this.poLineTax;
    const aa = this.poLineTax;
    // alert(aa);
    var arrayControl = this.poMasterDtoForm.get('poLines').value
    const invItemId = arrayControl[this.poLineTax].invItemId
    this.taxCat1 = arrayControl[this.poLineTax].taxCategoryId
    console.log(this.taxCat);
    var arrayControltaxAmounts = this.lineDetailsArray.controls[aa].get('taxAmounts').value
    // alert(arrayControltaxAmounts[aa])
    var diss = arrayControltaxAmounts[0].totTaxAmt;
    // alert(arrayControltaxAmounts[aa].totTaxAmt);
    var arrayControl = this.poMasterDtoForm.get('poLines').value
    var baseAmount = arrayControl[this.poLineTax].baseAmtLineWise;
    // alert(baseAmount);
    // alert(this.poLineTax);

    console.log(invItemId, this.taxCat, diss, baseAmount);

    let control = this.lineDetailsArray.controls[aa].get('taxAmounts') as FormArray;
    control.clear();
    // this.taxCatId
    this.service.taxCalforItem(invItemId, this.taxCat1, diss, baseAmount)
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
          const TotAmtLineWise1 = arrayControl[this.poLineTax].baseAmtLineWise
          var tolAmoutLine = sum + TotAmtLineWise1
          // alert(this.taxCalforItem[0].totTaxAmt);
          var patch = this.poMasterDtoForm.get('poLines') as FormArray;
          (patch.controls[aa]).patchValue(
            {
              diss1: this.taxCalforItem[0].totTaxAmt,
              taxAmtLineWise: sum,
              totAmtLineWise: tolAmoutLine,
            }
          );
          this.patchResultList(this.poLineTax, this.taxCalforItem);
        });
  }


  addDiscount1() {
    // alert('indisscount '+i);
    for (let i = 0; i <= this.taxCalforItem.length; i++) {
      var taxRate = this.taxCalforItem[i].totTaxPer;
      var taxTypeName = this.taxCalforItem[i].taxTypeName;
      if (taxRate == 0) {
        // alert(i + 'taxRate=' + taxRate + ',' + 'taxTypeName=' + taxTypeName);
        this.service.addDiscount(this.totTaxAmt, taxTypeName).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD INSERTED SUCCESSFUILY');
            // this.operatingUnitMasterForm.reset();
          } else {
            if (res.code === 400) {
              alert('Data already present in the data base');
              // this.operatingUnitMasterForm.reset();
            }
          }
        });
      }

    }
  }

  // checked
  onOptioninvitemTypeSelected(e: any, lineNum) {
    alert('---' + e.target.value);
    var itemType = e.target.value;
    if (this.poMasterDtoForm.get('supplierCode').value === '') {
      alert('Please Select Supplier Code First !');
      this.lineDetailsArray.controls[lineNum].get('segment').disable();
      this.lineDetailsArray.controls[lineNum].get('itemType').setValue('--Select--');
      (<any>this.poMasterDtoForm.get('supplierCode')).nativeElement.focus();
    }
    else {
      if (itemType === 'GOODS') {
        this.lineDetailsArray.controls[lineNum].get('segment').enable();
        this.displaygetInvItemId = true;
        // this.displaysupplierSiteId = false;
        //this.displayBillShipList = false;
        //this.displayBillShipList1 = false
        var deptName1 = this.poMasterDtoForm.get('dept').value;
        // alert(deptName1+" "+(sessionStorage.getItem('deptName')))
        // alert(this.deptName);
        if (this.invItemList.length <= 0) {


          this.service.invItemList(itemType, (sessionStorage.getItem('deptName')))
            .subscribe(
              data => {
                this.invItemList = data;
                console.log(this.invItemList);
              }
            );
        }
        // this.lineDetailsArray.controls[lineNum].get('invDescription').disable();
        // this.lineDetailsArray.controls[lineNum].get('hsnSacCode').disable();
        // this.poMasterDtoForm.get('supplierSiteId').disable();
        // this.poMasterDtoForm.get('shipToLoc').disable();
        // this.poMasterDtoForm.get('billToLoc').disable();

        // this.displaysupplierSiteId=false;
        alert('check 1');
        var ids = new Set(this.selectedInvItem.map(({ itemId }) => itemId));
        alert('check 2' + ids);
        this.invItemList = this.invItemList.filter(({ itemId }) => !ids.has(itemId));
        console.log(this.invItemList);
      }
      if (itemType === 'EXPENCE') {
        this.displaygetInvItemId = true;
        this.displayHSN = false;
        this.displayinvDesc = false;
        (document.getElementById("invDescription") as any).disabled = false;
        var deptName = 'NA';
        this.service.invItemList(itemType, deptName)
          .subscribe(
            data => {
              this.invItemList = data;
              console.log(this.invItemList);
            }
          );
        // (document.getElementById("invDescription")as any).disabled= false;
        // (document.getElementById("hsnSacCode")as any).disabled= false;

      }

    }
  }

  onOptioninvItemIdSelected1($event) {

    let select = this.invItemList.find(d => d.invItemId === this.invItemId);
    // alert(select)
    if (select) {
      // alert(select);

      // this.ouId= select.taxCategoryLinesCollection
      var index = 0;
      for (let ele of select.taxCategoryLinesCollection) {
        // alert("hi")
        if (ele.taxCategoryName.orgId === this.ouId) {
          // alert("hi1")
          if (ele.taxCategoryName.taxCategoryName === null) {
            // alert("hi3")
            alert("Tax not attached to item")
          }
        }
      }


    }
  }


  fetchSeries(value: String) {
    // alert('xyz' + value);
    if (value === '') {
      return this.searchResult = [];
    }

    this.searchResult = this.seriesList.filter((series) => {
      return series.name.startsWith(value);
    })
  }

  Apply() {
    const formValue: IpostPO = this.transData(this.poMasterDtoForm.value);
    // formValue.polineNum =this.poLineTax + 1;
    formValue.ouId = this.ouId;
    formValue.dept = Number(this.dept);
    formValue.currencyCode = 'INR';
    this.service.applyPOTax(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.poMasterDtoForm.reset();
      } else {
        if (res.code === 400) {
          alert('Error while insertion -- ' + res.obj);
          // this.poMasterDtoForm.reset();
        }
      }
    });
  }

  clearFormArray() {
    this.poMasterDtoForm.reset();
    // this.lineDetailsArray.controls[i].get('taxAmounts')
    // this.poMasterDtoForm.lineDetailsGroup.TaxDetailsArray.clear();
    this.lineDetailsArray.clear();
    window.location.reload();
  }
  closeMast() {
    this.router.navigate(['admin']);
  }
  poMasterDto(poMasterDtoForm) { }

  getUserIdsFirstWay($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList1 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.supplierCodeList, userId);
      }
    }
  }

  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };

  getInvItemId($event) {
    let userId = (<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
    this.userList2 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList2 = this.searchFromArray1(this.invItemList, userId);
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

  // openCodeComb(i) {

  // this.displayModal =false;
  //   this.showModal = true; // Show-Hide Modal Check
  //   this.content = i; // Dynamic Data
  //   this.title = "PoLine :" + i + 1;    // Dynamic Data
  // }

  openCodeComb(i) {
    let segmentName1 = this.lineDetailsArray.controls[i].get('segmentName').value;
    if (segmentName1 === null) {
      this.poMasterDtoForm.get('segment11').reset();
      this.poMasterDtoForm.get('segment2').reset();
      this.poMasterDtoForm.get('segment3').reset();
      this.poMasterDtoForm.get('segment4').reset();
      this.poMasterDtoForm.get('segment5').reset();
      // this.poMasterDtoForm.get('segment6').reset();
      this.poMasterDtoForm.get('lookupValueDesc1').reset();
      this.poMasterDtoForm.get('lookupValueDesc2').reset();
      this.poMasterDtoForm.get('lookupValueDesc3').reset();
      this.poMasterDtoForm.get('lookupValueDesc4').reset();
      this.poMasterDtoForm.get('lookupValueDesc5').reset();
    }
    if (segmentName1 != null) {
      // this.service.segmentNameList(this.segmentName1)
      // .subscribe(
      //   data => {

      //     this.segmentNameList = data;
      //     if (this.segmentNameList.code === 200) {
      //       if (this.segmentNameList.length == 0) {
      //         alert('Invalid Code Combination');
      //       } else {
      //         console.log(this.segmentNameList);
      //         this.poChargeAcc = Number(this.segmentNameList.codeCombinationId)
      //       }
      //     } else if (this.segmentNameList.code === 400) {
      //       var arrayControl = this.poMasterDtoForm.get('poLines').value
      //      F
      //       (patch.controls[i]).patchValue({ segmentName: ''})
      //       alert(this.segmentNameList.message);

      //     }
      //   }
      // );
      var temp = segmentName1.split('.');
      // alert(temp[0]);
      this.segment11 = temp[0];
      this.segment2 = temp[1];
      this.segment3 = temp[2];
      this.segment4 = temp[3];
      this.segment5 = temp[4];
      // this.segment6 = temp[5];
    }
    // alert(segmentName1);
    this.displayModal = false;
    this.showModal = true; // Show-Hide Modal Check
    this.content = i; // Dynamic Data
    let a = i + 1
    this.title = "PoLine :" + a;    // Dynamic Data

  }
  onOptionsSelectedBranch(segment: any, lType: string) {
    // alert(segment);
    // var InterBranch1=this.GlCodeCombinaionForm.get('segment1').value;
    this.service.getInterBranch(segment, lType).subscribe(
      data => {
        this.branch = data;
        console.log(this.branch);
        // if(this.branch.code === 200){
        if (this.branch != null) {
          // this.poMasterDtoForm.patchValue(this.branch);
          if (lType === 'SS_Interbranch') {
            this.lookupValueDesc5 = this.branch.lookupValueDesc;
          }
          if (lType === 'NaturalAccount') {
            this.lookupValueDesc4 = this.branch.lookupValueDesc;
            //   // this.GlCodeCombinaionForm.patchValue(this.branch);
            //  this.accountType=this.branch.accountType;
          }
          if (lType === 'CostCentre') {
            this.lookupValueDesc3 = this.branch.lookupValueDesc;
          }
          if (lType === 'SS_Location') {
            this.lookupValueDesc2 = this.branch.lookupValueDesc;
          }
          if (lType === 'SS_Branch') {
            this.lookupValueDesc1 = this.branch.lookupValueDesc;
          }
        }
        // }else if(this.branch.code === 400){
        //   alert(this.branch.message);

        // }


      }
    );

  }

  // Keyboard({
  //   actions: [
  //     ['backspace', {}],
  //     ['ctrl+alt+backspace', {}]
  //   ]
  // });

  //   Keyboard({
  //     elm: document.querySelector('#input'),
  //     props: {},                             
  //     use: MyActions,    // import the actions from my-actions.js
  //     actions: [            // extend/overwrite the imported actions with your own              
  //       ['enter', {                          
  //         fn: process
  //       }]
  //     ]
  //   }); keydown.control
  @HostListener("window:keyup.control.s", ["$event"]) s(e: KeyboardEvent) {
    console.log("control+ s", e);
    // alert('control+s' + e);
  }
  @HostListener("window:keyup.control.v", ["$event"]) v(e: KeyboardEvent) {
    console.log("control+ v", e);
    // alert('control+v' + e);
    this.authorizationStatus = 'Inprogress';
    const formValue: IpostPO = this.transData(this.poMasterDtoForm.value);
    formValue.authorizationStatus = 'Inprogress';
    formValue.ouId = this.ouId;
    formValue.currencyCode = 'INR';
    var arrayControl = this.poMasterDtoForm.get('poLines').value
    this.baseAmount = 0;
    this.totTaxAmt = 0;
    this.totalAmt = 0;

    for (var i = 0; i < arrayControl.length; i++) {
      this.baseAmount = this.baseAmount + arrayControl[i].baseAmtLineWise;
      this.totTaxAmt = this.totTaxAmt + arrayControl[i].taxAmtLineWise;
    }
    this.totalAmt = (this.baseAmount + this.totTaxAmt);
    formValue.totalAmt = this.totalAmt;
    // alert(this.totalAmt);
    formValue.baseAmount = this.baseAmount;
    formValue.totTaxAmt = this.totTaxAmt;
    // formValue.poType = 'Standard Purchase Orde';
    formValue.poType = this.poType;
    formValue.dept = Number(this.dept);
    formValue.supplierCode = this.supplierCode;
    this.service.poSubmit(formValue).subscribe((res: any) => {
      var obj = res.obj;
      sessionStorage.setItem('poNo', obj);
      this.segment1 = sessionStorage.getItem('poNo');
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        this.displayButton = false;
        this.displayNewButton = false;
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          // this.poMasterDtoForm.reset();
        }
      }
    });
  }
  // @HostListener("window:keyup.w", ["$event"]) w(e: KeyboardEvent) {
  //   console.log("w captured", e);
  //   alert('w captured' + e);
  // }
  // @HostListener("window:keyup.Shift.w", ["$event"]) sw(e: KeyboardEvent) {
  //   console.log("shift w captured", e);
  //   alert("shift w captured " + e);
  // }

  // @HostListener("window:keyup", ["$event"]) keyUp(e: KeyboardEvent) {
  //   console.log("key up", e);
  // }
  triggerKeyboardEvent(el: any, keyString: string) {
    var eventObj = document.createEvent("Events") as any;

    if (eventObj.initEvent) {
      eventObj.initEvent("keyup", true, true);
    }

    eventObj.shiftKey = true;
    eventObj.ctrlKey = false;
    eventObj.metaKey = false;
    eventObj.altKey = false;
    eventObj.key = keyString;

    el.dispatchEvent
      ? el.dispatchEvent(eventObj)
      : el.fireEvent("onkeyup", eventObj);
  }

  // press(keyString: string) {
  //   this.triggerKeyboardEvent(window, keyString);
  // }


  // actionMethod(event: any) {
  //   event.target.disabled = true;
  //   setTimeout(() => {
  //     event.target.disabled = false;
  //    }, 30000);
  // }
  validateNum(index, j) {
    var arrayControl = this.lineDetailsArray.controls[index].get('taxAmounts').value;
    // this.poMasterDtoForm.get('poLines').value
    var value = arrayControl[index].totTaxAmt
    if (value.charAt(0) === '-') {
      alert('Valid Number: ' + value);
    } else {
      alert('Invalid Number: ' + value + ' ' + 'Kindly enter negetive value');
      // this.lineDetailsArray.controls[index].get('orderedQty').reset();
      // this.poMasterDtoForm.controls['poLines'].controls[index].controls['taxAmounts'].controls[j].controls.totTaxPer.value
      // this.TaxDetailsArray.controls[j].get('orderedQty').reset();
      // arrayControl[index].totTaxAmt = 00;
      // this.lineDetailsArray.controls[j].get('taxAmounts').controls
    }
  }

  move(fromText, totxt) {
    // alert('in move')
    totxt.focus();
  }
  // var array = [];
  // array.push({
  // formdate : fromvalue.formdate,
  // });
  Select(polineNum: number) {
    let select = this.approvedArray.find(d => d.polineNum === polineNum);
    this.TaxDetailData = select.taxAmounts;
    console.log(this.TaxDetailData);
    this.displayTaxDetailData = false;
  }

}
