import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Observable } from 'rxjs';
import { Data, Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';
import { DatePipe } from '@angular/common';
import { data, get } from 'jquery';
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
  divisionId: number;
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
  suppInvDate: Date;
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

// const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;
// FormControlName.prototype.ngOnChanges = function () {
//   const result = originFormControlNameNgOnChanges.apply(this, arguments);
//   this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
//   return result;
// };

@Component({
  selector: 'app-opmaster-dto',
  templateUrl: './opmaster-dto.component.html',
  styleUrls: ['./opmaster-dto.component.css']
})
export class OPMasterDtoComponent implements OnInit {
  // @ViewChild('poMasterDtoForm') poMasterDtoForm: ElementRef;
  supSelCnt: number;
  isDisabled = true;
  docType: string;
  private sub: any;
  selectedLine = 0;
  compileType: number;
  gstPercentage: number;
  clicked = false;
  public currentOp: string;
  showModal: boolean;
  content: number;
  title: string;
  divisionId: number;
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

  public itemMap = new Map<string, any>();

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
  suppInvDate: Date;
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
  hsnSacCodeList: any = [];
  public taxCategoryList: any = [];
  public taxCategoryListNew: any = [];
  public allTaxCategoryList: any[];
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
  displayHSN: Array<boolean> = [];
  displayinvDesc = true;
  displayBillShipList = true;
  displayBillShipList1 = true;
  // displaysegmentList=true;
  displayTaxDetailData = true;
  DissRecoverableFlag = false;
  DissinclusiveFlag = false;
  DissselfAssesedFlag = false;
  displayNewButtonApprove = false;
  displaygoReceiptForm = true;
  displayNewButtonUpdate = false;
  displayNewButtonSave = true;
  displayNewButtonpoCancel = true;
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
  public minDate = new Date();
  public today = new Date();
  public priorDate = new Date().setDate(this.today.getDate() - 30)
  public data1: any[];
  public selectedInvItem = new Array();

  @ViewChild("myinput") myInputField: ElementRef;
  @ViewChild("suppCode1") suppCode1: ElementRef;
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }


  @ViewChild('fileInput') fileInput;
  message: string;
  allUsers: Observable<OPMasterDtoComponent[]>;

  // buttons display
  displayFirstButtonDisplay = true;
  displaySecondButtonDisplay = true;
  displayThirdButtonDisplay = true;

  isVisible: Boolean = false;
  isVisible1: Boolean = false;
  @ViewChild('poCancel1') poCancel1: ElementRef;
  // @ViewChild("poCancel1") myInputField1: ElementRef;
  @ViewChild("hsnSacCode1") hsnSacCode1: ElementRef;
  displaypoCancel = true;

  constructor(private fb: FormBuilder, private router1: ActivatedRoute, private router: Router, private service: MasterService) {
    this.poMasterDtoForm = this.fb.group({

      poHeaderId: [],
      // ouId: ['', [Validators.required]],
      // poDate: ['', [Validators.required]],
      // poType: ['', [Validators.required]],
      ouId: [''],
      poDate: [''],
      poType: [''],
      segment1: [''],
      supplierSiteId: ['', [Validators.required]],
      // segmentName: [],
      // polineNum:[],
      supplierCode: ['', [Validators.required]],
      // supplierCode: [''],
      supplierName: [],
      billToLoc: [],
      shipToLoc: [],
      currencyCode: [],
      authorizationStatus: [],
      totalAmt: [],
      supplierAddress: [],
      // suppInvNo: ['', [Validators.minLength(3)]],
      suppInvNo: [''],
      suppInvDate: [''],
      // [ Validators.minLength(3), Validators.maxLength(30)]
      ewayBillNo: [],
      iRNNo: [],
      // approveDate: ['', [Validators.nullValidator, Validators.maxLength(30)]],
      approveDate: [''],
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
      // description: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z 0-9]*')]],
      description: [''],
      totTaxAmt: [],
      ouName: [],
      name: [],
      contextValue: [],
      divisionName: [],
      address: [],
      // mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      mobileNo: [''],
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
    $("#wrapper").toggleClass("toggled");
    this.displayFirstButtonDisplay = false;
    this.displaySecondButtonDisplay = true;
    this.displayThirdButtonDisplay = true;
    this.currentOp = 'insert';
    this.hideArray[0] = true;
    // this.loadAllUser();
    console.log(sessionStorage.getItem('emplId'));
    this.empId = Number(sessionStorage.getItem('emplId'));
    this.dept = (sessionStorage.getItem('dept'));
    console.log(this.dept);
    this.deptName = (sessionStorage.getItem('deptName'));
    var locCODE = sessionStorage.getItem('locCode')
    var temp = locCODE.split('.');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.name = (sessionStorage.getItem('name'));
    var divisionName = (sessionStorage.getItem('divisionName'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.poMasterDtoForm.patchValue({ divisionName: (sessionStorage.getItem('divisionName')) })
    // if (this.deptName === 'Sales' || this.deptName === 'Service' || this.deptName === 'DP' || this.deptName === 'Spares') {
    //   this.displayDept = true;
    //   //  this.dept = this.deptName
    // } else {
    //   this.displayDept = false;
    // }
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

    // this.service.taxCategoryList()
    // .subscribe(
    //   data1 => {
    //     this.taxCategoryList = data1;
    //     console.log(this.taxCategoryList);
    //     data1 = this.taxCategoryList;
    //   }
    // );




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
          //   console.log(this.DepartmentListById.divisionName);
          // this.poMasterDtoForm.patchValue(this.DepartmentListById.divisionName);
          // this.divisionName = this.DepartmentListById.divisionName
        }
      );

    // this.service.invItemList()
    //   .subscribe(
    //     data => {
    //       this.invItemList = data;
    //       console.log(this.invItemList);
    //     }
    //   );


    // this.service.taxCategoryList()
    //   .subscribe(
    //     data1 => {
    //       for (let i=0; i<data.length; i++){
    //       this.taxCategoryList[i] = data1;
    //     }
    //     }
    //   );


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
    this.service.hsnSacCodeData('HSN').subscribe(
      data => {
        this.hsnSacCodeList = data;
      }
    )

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

    this.sub = this.router1.params.subscribe(params => {
      //  alert(params);
      this.poNo = params['poNo'];
      this.poMasterDtoForm.patchValue({ segment1: this.poNo })
      // alert(this.poNo+'----Param----'+params['poNo']);
      // alert(this.poNo);
      if (this.poNo != undefined) {
        this.Search(this.poNo);
      }

    });

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
  //
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
      gstPercentage: [],
      taxCategoryName: [],
      diss1: [],
      itemType: [],
      unitPrice: ['', [Validators.required]],
      // orderedQty: ['', [Validators.required, Validators.pattern("^[-]{1}[0-9]*$")]],    //^[0-9]\d*(\.\d+)?$
      // orderedQty: ['', [Validators.pattern("^[-]{1}[0-9]*$")]],    //^[0-9]\d*(\.\d+)?$
      orderedQty: [''],
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
    control.clear();
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

    // const lineGr =  this.lineDetailsGroup();
    this.lineDetailsArray.push(this.lineDetailsGroup());
    var aa = index + 1;


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
    // alert('index value--' + '  '+index+' '+ aa);
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
    // alert(poNo);
    this.currentOp = 'Search';
    console.log(this.poMasterDtoForm.value);
    this.service.getsearchByPOHeder(poNo, (sessionStorage.getItem('locId')))
      .subscribe(
        data => {
          console.log(data);
          if (data.code === 400) {
            alert(data.message)
            window.location.reload();
          } if (data.code === 200) {
            let control3 = this.poMasterDtoForm.get('poLines') as FormArray;
            var lenC = control3.length
            this.lstcomments1 = data.obj;
            for (let i = 0; i < data.obj.poLines.length; i++) {
              if (data.obj.poLines[i].itemType === 'EXPENCE') {
                var hsnSacCode = data.obj.poLines[i].hsnSacCode;
                let hsnSacCodeValue = this.hsnSacCodeList.find(v => v.hsnsaccode == data.obj.poLines[i].hsnSacCode);
                console.log(hsnSacCodeValue);
                this.service.taxCategoryListNew(data.obj.taxCategoryName, hsnSacCodeValue.gstPercentage)
                  .subscribe(
                    data1 => {
                      this.taxCategoryList[i] = data1;
                      console.log(this.taxCategoryList[i]);
                    }
                  );
              }
              else {
                this.service.taxCategoryListNew(data.obj.taxCategoryName, data.obj.poLines[i].gstPercentage)
                  .subscribe(
                    data1 => {
                      this.taxCategoryList[i] = data1;
                      console.log(this.taxCategoryList[i]);
                    }
                  );
              }
            }
            var approveDate1 = data.obj.approveDate;
            var approveDate2 = this.pipe.transform(approveDate1, 'dd-MM-yyyy');
            this.poMasterDtoForm.patchValue({ approveDate: approveDate2 });
            var poDate1 = data.obj.poDate;
            var poDate2 = this.pipe.transform(poDate1, 'dd-MM-yyyy');
            this.poMasterDtoForm.patchValue({ poDate: poDate2 });
            // alert(approveDate2);
            const status = this.lstcomments1.authorizationStatus;
            if (status === 'Inprogress') {
              this.displayFirstButtonDisplay = true;
              this.displaySecondButtonDisplay = false;
              this.displaytaxDisscountButton = true;
              this.displayOnStatus = true;
              this.displayButton = false;
              this.displayNewButton = false;
              this.displayTaxDetailForm = true;
              var control = this.poMasterDtoForm.get('poLines') as FormArray;
              var taxcatecontrol = this.poMasterDtoForm.get('poLines') as FormArray;
              console.log(control);

              for (let i = 0; i <= this.lstcomments1.poLines.length - lenC; i++) {
                var poLine: FormGroup = this.lineDetailsGroup();
                let control1 = this.lineDetailsArray.controls[i].get('taxAmounts') as FormArray
                this.displayPoLine[i] = false;
                this.hideArray[i] = true;
                control.push(poLine);
              }
              var len = this.lstcomments1.poLines.length - 1
              this.lineDetailsArray.removeAt(len);
              this.poMasterDtoForm.patchValue(this.lstcomments1, { emitEvent: false });
              for (var j = 0; j < this.lstcomments1.poLines.length; j++) {
                let selectedtaxValue = this.taxCategoryList[j].find(v => v.taxCategoryName == this.lstcomments1.poLines[j].taxCategoryName);
                console.log(selectedtaxValue);
                console.log(selectedtaxValue.taxCategoryName);
                (taxcatecontrol.controls[j]).patchValue(
                  {
                    taxCategoryName: selectedtaxValue.taxCategoryName,
                    taxCategoryId: selectedtaxValue.taxCategoryId,
                  }
                );
                // this.lineDetailsArray.controls[j].get('taxCategoryId').setValue(this.lstcomments1.poLines[j].taxCategoryId, { emitEvent: false });
                // this.lineDetailsArray.controls[j].get('taxCategoryName').setValue(this.lstcomments1.poLines[j].taxCategoryName), { emitEvent: false };
                (control.controls[j]).patchValue(
                  {
                    diss1: this.lstcomments1.poLines[j].taxAmounts[0].totTaxAmt,
                    // taxCategoryName:selectedtaxValue.taxCategoryName,
                    // taxCategoryId:selectedtaxValue.taxCategoryId,
                  }
                );
                if (data.obj.poLines[j].itemType === 'GOODS') {
                  this.displayHSN[j] = true;
                  this.lineDetailsArray.controls[j].get('segmentName').disable();
                }
                else {
                  this.displayHSN[j] = false;
                  this.lineDetailsArray.controls[j].get('segmentName').enable();
                }
              }
              for (let i = 0; i <= this.lstcomments1.poLines.length - 1; i++) {
                let taxControl = this.lineDetailsArray.controls[i].get('taxAmounts') as FormArray
                taxControl.clear();
                var taxItems: any[] = this.lstcomments1.poLines[i].taxAmounts;

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
              }

            }
            if (status === "APPROVED") {
              this.displaySecondButtonDisplay = true;
              this.displayFirstButtonDisplay = true;
              this.displayThirdButtonDisplay = false;
              this.displayOnStatus = false;
              this.displayButton = false;
              this.dispbut = false;
              this.displayLine = false;
              this.displayNewButton = false;
              this.displaygoReceiptForm = false;
              this.approvedArray = this.lstcomments1.poLines;
              console.log(this.approvedArray);

              if (data.obj.rcvLines.length > 0) {
                // alert(data.obj.rcvLines.length);
                this.isVisible = false;
                this.isVisible1 = true;
                // this.poCancel1.nativeElement.hidden=true;
              }
              else {
                this.isVisible = true;
                this.isVisible1 = true;
                // this.poCancel1.nativeElement.hidden=false;
              }
              let control = this.poMasterDtoForm.get('poLines') as FormArray;
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

              for (let i = 0; i <= this.lstcomments1.poLines.length - 1; i++) {
                let taxControl = this.lineDetailsArray.controls[i].get('taxAmounts') as FormArray
                taxControl.clear();
                var taxItems: any[] = this.lstcomments1.poLines[i].taxAmounts;
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
            if (status === "CANCELLED") {
              this.displaySecondButtonDisplay = true;
              this.displayFirstButtonDisplay = true;
              this.displayThirdButtonDisplay = false;
              this.displayOnStatus = false;
              this.displayButton = false;
              this.dispbut = false;
              this.displayLine = false;
              this.displayNewButton = false;
              this.displaygoReceiptForm = false;
              this.poMasterDtoForm.disable();
              this.approvedArray = this.lstcomments1.poLines;
              console.log(this.approvedArray);
              this.isVisible = false;
              this.isVisible1 = false;
              // this.poCancel1.nativeElement.hidden=false;
              let control = this.poMasterDtoForm.get('poLines') as FormArray;
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

              for (let i = 0; i <= this.lstcomments1.poLines.length - 1; i++) {
                let taxControl = this.lineDetailsArray.controls[i].get('taxAmounts') as FormArray
                taxControl.clear();
                var taxItems: any[] = this.lstcomments1.poLines[i].taxAmounts;
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



  //   searchrelatedCall(invItemId,supplierSiteId, index) {
  //   alert(invItemId +'----' + index);
  //   console.log(this.supplierCodeList);
  //   console.log(this.supplierCodeList[index].supplierSiteMasterList);

  //   let selectedValue = this.supplierCodeList[index].supplierSiteMasterList.find(v => v.suppSiteId == supplierSiteId);
  //   console.log(selectedValue);
  //  this.service.ItemDetailsList(invItemId, selectedValue.taxCategoryName, this.billToLoc).subscribe((res: any) => {
  //   if (res.code === 200) {
  //     this.ItemDetailsList = res.obj;
  //     console.log(this.ItemDetailsList);
  //   }})
  //   }

  goReceiptForm(segment1) {
    this.router.navigate(['/admin/master/PoReceiptForm', segment1]);
    // alert(segment1);
  }

  poCancel(segment1: any) {
    // alert(segment1)
    this.service.cancelledPO(segment1).subscribe((res: any) => {
      // this.service.cancelledPO(segment1)
      // data => {
      if (res.code === 200) {
        // alert('Hi....')
        alert(res.message);
        console.log(res.message);
        window.location.reload();
      }
      else { res.code === 400 }
      window.location.reload();
      // }
    })
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
    delete val.suppInvDate;
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
    // this.displayNewButtonApprove = true;
    // this.displayNewButtonUpdate = true;
    // this.displayNewButtonSave = false;
    // this.displayNewButtonReset = false;
    this.authorizationStatus = 'Inprogress';
    const formValue: IpostPO = this.transData(this.poMasterDtoForm.getRawValue());
    formValue.authorizationStatus = 'Inprogress';
    formValue.ouId = this.ouId;
    formValue.divisionId = this.divisionId;
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
    // debugger;
    this.service.poSubmit(formValue).subscribe((res: any) => {
      var obj = res.obj;
      sessionStorage.setItem('poNo', obj);

      if (res.code === 200) {
        alert(res.message);
        // window.location.reload();
        this.poMasterDtoForm.reset();
        this.segment1 = sessionStorage.getItem('poNo');
        this.Search(this.segment1);
        this.displaySecondButtonDisplay = false;
        this.displayFirstButtonDisplay = true;
        this.displayThirdButtonDisplay = true;
      }

      if (res.code === 400) {
        alert('Error : ' + res.message);
      }

    });
  }
  // saveButton(){
  //   this.displayNewButtonSave=true;
  // }
  onSupplierCodeSelected(supp: string) {

    // this.displayNewButtonSave=true;
    //let value = $event.target.value.split("-")[1].trim();
    // alert('**supp***' + supp);
    if (supp != null) {
      var value = supp.substr(supp.indexOf('@') + 1, supp.length);
      // alert(value)
      let selectedValue = this.supplierCodeList.find(v => v.suppNo == value);

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
  }
  onOptionTaxCatSelected(i) {
    var tacCategoryControl = this.poMasterDtoForm.get('poLines').value;
    var taxCategoryName = tacCategoryControl[i].taxCategoryName;
    let selectedTaxCatId = this.taxCategoryList[i].find(v => v.taxCategoryName == taxCategoryName);
    console.log(selectedTaxCatId);

    var taxCategoryId = selectedTaxCatId.taxCategoryId;
    // var taxCategoryName=this.poMasterDtoForm.get('taxCategoryName').value;
    // alert('******'+ i+'----'+ taxCategoryName);
    if (taxCategoryName != null) {
      // var taxCategoryId=this.poMasterDtoForm.get('taxCategoryId').value;
      var patch = this.poMasterDtoForm.get('poLines') as FormArray;
      (patch.controls[i]).patchValue(
        {
          taxCategoryId: selectedTaxCatId.taxCategoryId,
        });

      /////////TAX DETAIL CALCULATION//////
      var arrayControl = this.poMasterDtoForm.get('poLines').value
      var patch = this.poMasterDtoForm.get('poLines') as FormArray;
      // var itemId = this.ItemDetailsList.itemId;
      // var itemId=this.poMasterDtoForm.get('itemId').value;
      var itemId = arrayControl[i].invItemId;
      var diss = 0;
      var sum = 0;
      var baseAmount = arrayControl[i].baseAmtLineWise

      if (baseAmount != null) {
        this.service.taxCalforItem(itemId, taxCategoryId, diss, baseAmount)
          .subscribe(
            (data: any[]) => {
              this.taxCalforItem = data;
              console.log(this.taxCalforItem);

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
    }
  }
  onOptioninvItemIdSelected(itemId, index) {

    if (itemId != null) {
      let selectedValue = this.invItemList.find(v => v.segment == itemId);
      console.log(selectedValue);

      if (selectedValue != undefined) {
        console.log(selectedValue);
        this.selectedInvItem.push(selectedValue);
        var arrayControl = this.poMasterDtoForm.get('poLines').value
        var patch = this.poMasterDtoForm.get('poLines') as FormArray;
        this.itemType = arrayControl[index].itemType
        this.invItemId = selectedValue.itemId;
        console.log(this.invItemId, this.taxCat);
        this.lineDetailsArray.controls[index].get('taxCategoryName').enable();
        this.lineDetailsArray.controls[index].get('orderedQty').enable();
        this.lineDetailsArray.controls[index].get('unitPrice').enable();
        if (this.itemType === "GOODS") {
          this.service.ItemDetailsList(this.invItemId, this.taxCat, this.billToLoc).subscribe((res: any) => {
            if (res.code === 200) {
              if (res.obj.itemId === null) {
                alert('Item Or PO Charge Account Not Found in Master !')
                var patch = this.poMasterDtoForm.get('poLines') as FormArray;
                (patch.controls[index]).patchValue({
                  segment: ' ',
                });
                this.lineDetailsArray.controls[index].get('invCategory').reset();
                this.lineDetailsArray.controls[index].get('invDescription').reset();
                this.lineDetailsArray.controls[index].get('uom').reset();
                this.lineDetailsArray.controls[index].get('hsnSacCode').reset();
                this.lineDetailsArray.controls[index].get('taxCategoryName').reset();
                this.lineDetailsArray.controls[index].get('segmentName').reset();
                this.lineDetailsArray.controls[index].get('hsnSacCode').disable();
                this.lineDetailsArray.controls[index].get('taxCategoryName').disable();
                return;
              }
              else {
                this.ItemDetailsList = res.obj;

                // alert(this.ItemDetailsList.gstPercentage);
                var patch = this.poMasterDtoForm.get('poLines') as FormArray;

                this.taxCategoryId = this.ItemDetailsList.taxCategoryId;
                var gstPercentage = this.ItemDetailsList.gstPercentage;
                // alert(gstPercentage)
                var supplierSiteId = this.poMasterDtoForm.get('supplierSiteId').value;
                console.log(this.suppIdList);
                let selectedValue = this.suppIdList.find(v => v.suppSiteId == supplierSiteId);
                console.log(selectedValue);
                if (selectedValue.taxCategoryName != null && gstPercentage != null) {
                  this.service.taxCategoryListNew(selectedValue.taxCategoryName, gstPercentage)
                    .subscribe(
                      data1 => {
                        // this.taxCategoryMap.set(index,data1);
                        this.taxCategoryList[index] = data1;
                        console.log(this.taxCategoryList);
                      }
                    );
                }
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
                      gstPercentage: this.ItemDetailsList.gstPercentage
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
                        gstPercentage: this.ItemDetailsList.gstPercentage,
                      }
                    );
                  }
                  else {
                    // alert('not null');
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
                        gstPercentage: this.ItemDetailsList.gstPercentage,
                      }
                    );
                  }
                }
              }
            }
            else {
              if (res.code === 400) {
                alert('Error : ' + res.message);
              }
            }
          });

        }
        if (this.itemType === "EXPENCE") {
          this.service.expenceItemDetailsList(this.invItemId)
            .subscribe(
              data => {
                this.ItemDetailsList = data;
                console.log(this.ItemDetailsList);
                var patch = this.poMasterDtoForm.get('poLines') as FormArray;
                if (this.ItemDetailsList.taxCategoryId != null) {
                  this.taxCategoryId = this.ItemDetailsList.taxCategoryId
                }
                (patch.controls[index]).patchValue(
                  {
                    diss1: 0,
                    uom: this.ItemDetailsList.uom,
                    invDescription: data.invDescription,
                    invCategory: data.invCategory,
                    hsnSacCode: this.ItemDetailsList.hsnSacCode,
                    taxCategoryName: this.ItemDetailsList.taxCategoryName,
                    segmentName: this.ItemDetailsList.segmentName,
                    poChargeAcc: Number(this.ItemDetailsList.codeCombinationId),
                    taxCategoryId: Number(this.ItemDetailsList.taxCategoryId),
                    invItemId: this.invItemId,
                    gstPercentage: this.ItemDetailsList.gstPercentage,
                  }
                );
                this.hsnSacCode1.nativeElement.focus();
              }
            );
        }
      }
      else {
        // alert('Select Proper Item.. This Item Not In Master.!')
        this.lineDetailsArray.controls[index].get('invCategory').reset();
        this.lineDetailsArray.controls[index].get('invDescription').reset();
        this.lineDetailsArray.controls[index].get('uom').reset();
        this.lineDetailsArray.controls[index].get('hsnSacCode').reset();
        this.lineDetailsArray.controls[index].get('taxCategoryName').reset();
        this.lineDetailsArray.controls[index].get('segmentName').reset();
        this.lineDetailsArray.controls[index].get('taxCategoryName').disable();
        this.lineDetailsArray.controls[index].get('orderedQty').disable();
        this.lineDetailsArray.controls[index].get('unitPrice').disable();
      }
    }

    // alert(supplierSiteId +'----'+ selectedValue.taxCategoryName)
  }
  onContextValueSelected(contextValue: any) {
    if (contextValue === 'TrueValue') {
      this.displayContexValue = false;
    } if (contextValue === 'Select') {

      this.displayContexValue = true;
    }
  }

  onSiteSelected(siteId: any) {
    if (siteId != null) {
      this.service.siteIdList(siteId)
        .subscribe(
          data => {
            this.siteIdList = data;
            console.log(this.siteIdList);
            this.taxCat = this.siteIdList.taxCategoryName
            var taxCategoryName = data.taxCategoryName;
            if (this.taxCat == null) {
              alert("Tax not attached to site")
              this.displayNewButton = false;
              const sitWithOutTax = 'y';
            }
            // if (taxCategoryName.includes('Purchase-S&CGST')){
            //   // alert(taxCategoryName);
            //   this.taxCategoryList = this.taxCategoryList.(taxCategoryName.includes('Purchase-S&CGST'));
            // }
            // else if (taxCategoryName.includes('Purchase-I&CGST')){
            //   alert(taxCategoryName);
            //   this.taxCategoryList = this.taxCategoryList.filter(taxCategoryName.includes('Purchase-I&CGST'));
            // }
          }
        );
    }
  }


  Submit() { }

  fnCancatination(index) {
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
            alert(data.message)
            var arrayControl = this.poMasterDtoForm.get('poLines').value
              (patch.controls[index]).patchValue({ segmentName: '' })
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
    // alert('Hi')
    console.log(index);

    var arrayControl = this.poMasterDtoForm.get('poLines').value
    var patch = this.poMasterDtoForm.get('poLines') as FormArray;
    console.log(arrayControl);
    arrayControl[index].baseAmtLineWise = arrayControl[index].unitPrice * arrayControl[index].orderedQty;

    var baseAmount = arrayControl[index].baseAmtLineWise
    var taxCategoryId = arrayControl[index].taxCategoryId;
    // alert(taxCategoryId)
    if (baseAmount != null) {
      console.log(arrayControl[index].baseAmtLineWise);

      console.log((this.poMasterDtoForm.controls['poLines'][index]));

      var itemId = this.ItemDetailsList.itemId;
      // var taxCategoryId = taxCategoryId;
      // this.taxCatId = taxCategoryId;
      var diss = 0;
      var sum = 0;

      var vorAmt: number = 0;
      var drfAmt: number = 0;
      // var baseAmount = this.sum;
      this.service.taxCalforItemWithVOR(itemId, taxCategoryId, diss, baseAmount, vorAmt, drfAmt)
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
              baseAmtLineWise: arrayControl[index].baseAmtLineWise,
              taxAmtLineWise: sum,
              totAmtLineWise: arrayControl[index].baseAmtLineWise + sum,
            });
            this.patchResultList(index, this.taxCalforItem);
          });
      console.log(this.poMasterDtoForm.value);

      this.baseAmountCal(baseAmount);
    }
  }
  baseAmountCal(baseAmount) {

    this.sum = this.sum + baseAmount;

  }

  UpdatePOMast() {
    this.supplierCode = this.poMasterDtoForm.get('supplierCode').value

    const formValue: IpostPO = this.transUpdateData(this.poMasterDtoForm.value);
    console.log(formValue);

    formValue.supplierCode = this.supplierCode;
    formValue.ouId = this.ouId;
    formValue.currencyCode = 'INR';
    formValue.divisionId= Number(sessionStorage.getItem('divisionId'));
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
        alert(res.message);
        // this.authorizationStatus = 'APPROVED';
        this.displayNewButton = false;
        this.displayFirstButtonDisplay = true;
        // this.displayNewButtonApprove = true;
        // this.displayNewButtonUpdate = false;
        // this.displayNewButtonSave = false;
        // this.displayNewButtonReset = false;
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
    // this.displayNewButtonApprove = false;
    // this.displayNewButtonUpdate = false;
    // this.displayNewButtonSave = false;
    // this.displayNewButtonReset = false;
    const formValue: IpostPO = this.transUData(this.poMasterDtoForm.value);
    formValue.ouId = this.ouId;
    formValue.dept = Number(this.dept);
    formValue.currencyCode = 'INR';
    this.service.ApprovePo(formValue, formValue.segment1).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // this.displayNewButtonApprove = false;
        // this.displayNewButtonUpdate = false;
        // this.displayNewButtonSave = false;
        // this.displayNewButtonReset = false;
        this.authorizationStatus = 'APPROVED';
        this.approveDate = new Date();
        this.displayNewButton = false;
        // window.location.reload();
        this.displaySecondButtonDisplay = true;
        this.displayFirstButtonDisplay = true;
        this.displayThirdButtonDisplay = false;
        this.segment1 = sessionStorage.getItem('poNo');
        this.Search(this.segment1);
      } else {
        if (res.code === 400) {
          alert(res.message);
          window.location.reload();
          // this.poMasterDtoForm.reset();
        }
      }
    });
  }

  DeletePo(segment1) {
    alert('Delete PO  ' + segment1)
  }


  UpdatetaxDetails() {

  }




  taxDetails(op, i,taxCategoryId) {
    this.poLineTax = i;
    this.displaytaxDisscountButton = false;
    this.displayTaxDetailForm = false;
    var displayTaxPanel: Boolean = this.hideArray[i];
    this.hideArray[i] = !displayTaxPanel;

    if (this.currentOp === 'Search') {

      let taxControl = this.lineDetailsArray.controls[i].get('taxAmounts') as FormArray
      taxControl.clear();
      var TaxLine: FormGroup = this.TaxDetailsGroup();

      var taxItems: any[] = this.lstcomments1.poLines[i].taxAmounts;

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

      var itemId = this.ItemDetailsList.itemId;
      var taxCategoryId = taxCategoryId;
      this.taxCatId = taxCategoryId;
      // var diss = 0;
      var arrayControl = this.poMasterDtoForm.get('poLines').value
      var diss = arrayControl[i].diss1;
      var taxCategoryId = arrayControl[i].taxCategoryId;
      // alert(arrayControl[i].taxCategoryId)
      var baseAmount = arrayControl[this.poLineTax].baseAmtLineWise;
      this.service.taxCalforItem(itemId, taxCategoryId, diss, baseAmount)
        .subscribe(
          (data: any[]) => {
            this.taxCalforItem = data;

            console.log(this.taxCalforItem);
            this.patchResultList(i, this.taxCalforItem);

          }
        );

    }
  }

  addDiscount(i) {
    // alert('hi')
    const formValue: IpostPO = this.poMasterDtoForm.value;
    formValue.polineNum = this.poLineTax;
    const aa = this.poLineTax;

    var arrayControl = this.poMasterDtoForm.get('poLines').value
    const invItemId = arrayControl[this.poLineTax].invItemId
    this.taxCat1 = arrayControl[this.poLineTax].taxCategoryId
    console.log(this.taxCat);
    var arrayControltaxAmounts = this.lineDetailsArray.controls[aa].get('taxAmounts').value
    var vorAmt: number = 0;
    var drfAmt: number = 0;
    var diss1: number = 0;

    // alert(arrayControltaxAmounts.length)
    for (let j = 0; j < arrayControltaxAmounts.length; j++) {

      if (arrayControltaxAmounts[j].taxRateName.indexOf('VOR Charges') > -1) {
        vorAmt = arrayControltaxAmounts[j].totTaxAmt
      }
      if (arrayControltaxAmounts[j].taxRateName.indexOf('DRF Inventive') > -1) {
        drfAmt = arrayControltaxAmounts[j].totTaxAmt
      }
      if (arrayControltaxAmounts[j].taxRateName.includes('Disc')) {
        diss1 = arrayControltaxAmounts[j].totTaxAmt
      }

    }
    // var diss = arrayControltaxAmounts[0].totTaxAmt;
    var arrayControl = this.poMasterDtoForm.get('poLines').value
    var baseAmount = arrayControl[this.poLineTax].baseAmtLineWise;


    console.log(invItemId, this.taxCat, diss1, baseAmount);

    let control = this.lineDetailsArray.controls[aa].get('taxAmounts') as FormArray;
    control.clear();
    // this.taxCatId
    this.service.taxCalforItemWithVOR(invItemId, this.taxCat1, diss1, baseAmount, vorAmt, drfAmt)
      .subscribe(
        (data: any[]) => {
          this.taxCalforItem = data;

          var sum = 0;
          var vorcharges: number = 0;
          var dissAmt: number = 0;
          for (i = 0; i < this.taxCalforItem.length; i++) {


            if (this.taxCalforItem[i].taxRateName.indexOf('VOR Charges') > -1) {

              vorcharges = this.taxCalforItem[i].totTaxAmt
            } else if (this.taxCalforItem[i].taxRateName.includes('Disc')) {

              dissAmt = dissAmt + this.taxCalforItem[i].totTaxAmt;
            } else {
              sum = sum + this.taxCalforItem[i].totTaxAmt
            }
          }
          var TotAmtLineWise1 = arrayControl[this.poLineTax].baseAmtLineWise;

          var tolAmoutLine = sum + TotAmtLineWise1 + vorcharges;

          var patch = this.poMasterDtoForm.get('poLines') as FormArray;
          (patch.controls[aa]).patchValue(
            {
              diss1: dissAmt,
              taxAmtLineWise: sum,
              totAmtLineWise: tolAmoutLine,
            }
          );
          this.patchResultList(this.poLineTax, this.taxCalforItem);
        });
  }


  addDiscount1() {
    for (let i = 0; i <= this.taxCalforItem.length; i++) {
      var taxRate = this.taxCalforItem[i].totTaxPer;
      var taxTypeName = this.taxCalforItem[i].taxTypeName;
      if (taxRate == 0) {

        this.service.addDiscount(this.totTaxAmt, taxTypeName).subscribe((res: any) => {
          if (res.code === 200) {
            alert(res.message);
            // this.operatingUnitMasterForm.reset();
          } else {
            if (res.code === 400) {
              alert(res.message);
              // this.operatingUnitMasterForm.reset();
            }
          }
        });
      }

    }
  }



  onOptioninvitemTypeSelected(e: any, lineNum) {
    var itemType = e.target.value;


    if (this.itemMap.has(itemType)) {
      this.invItemList = this.itemMap.get(itemType);
    }
    this.lineDetailsArray.controls[lineNum].get('segment').setValue('');
    this.lineDetailsArray.controls[lineNum].get('segment').disable();
    this.lineDetailsArray.controls[lineNum].reset();
    this.lineDetailsArray.controls[lineNum].get('itemType').setValue(itemType);
    this.lineDetailsArray.controls[lineNum].get('polineNum').setValue(lineNum + 1);
    if (this.poMasterDtoForm.get('supplierCode').value === '' || this.poMasterDtoForm.get('shipToLoc').value === null || this.poMasterDtoForm.get('suppInvNo').value === null || this.poMasterDtoForm.get('suppInvDate').value === null || this.poMasterDtoForm.get('billToLoc').value === undefined || this.poMasterDtoForm.get('suppInvNo').value === undefined || this.poMasterDtoForm.get('suppInvDate').value === undefined) {
      alert('Please Select Header Deatils !');
      this.lineDetailsArray.controls[lineNum].get('itemType').setValue('--Select--');
      (<any>this.poMasterDtoForm.get('supplierCode')).nativeElement.focus();
      return;
    }
    else {
      if (itemType === 'GOODS') {

        var deptName1 = this.poMasterDtoForm.get('dept').value;
        this.lineDetailsArray.controls[lineNum].get('segment').disable();
        this.lineDetailsArray.controls[lineNum].get('segmentName').disable();

        this.displayHSN[lineNum] = true;

        this.service.invItemList2New(itemType, (sessionStorage.getItem('deptName')), (sessionStorage.getItem('divisionId')), '36DH1601')
          .subscribe(
            data => {
              this.lineDetailsArray.controls[lineNum].get('segment').disable();
              this.invItemList = data;
              this.itemMap.set(itemType, data);
              console.log(this.invItemList);
              this.lineDetailsArray.controls[lineNum].get('segment').enable();
            }
          );

        this.lineDetailsArray.controls[lineNum].get('invDescription').disable();
        this.lineDetailsArray.controls[lineNum].get('hsnSacCode').disable();
        this.lineDetailsArray.controls[lineNum].get('segment').enable();
        var ids = new Set(this.selectedInvItem.map(({ itemId }) => itemId));
        this.invItemList = this.invItemList.filter(({ itemId }) => !ids.has(itemId));

        this.poMasterDtoForm.get('supplierCode').disable();
        this.poMasterDtoForm.get('supplierSiteId').disable();
        this.poMasterDtoForm.get('shipToLoc').disable();
        this.poMasterDtoForm.get('billToLoc').disable();
        this.poMasterDtoForm.get('suppInvNo').disable();
        this.poMasterDtoForm.get('suppInvDate').disable();
        if (sessionStorage.getItem('deptName') === 'Sales' && itemType === 'GOODS') {
          this.lineDetailsArray.controls[lineNum].patchValue({ orderedQty: 1 })
          this.lineDetailsArray.controls[lineNum].get('orderedQty').disable();
        }

      }

      if (itemType === 'EXPENCE') {
        this.lineDetailsArray.controls[lineNum].get('segmentName').enable();

        this.displayHSN[lineNum] = false;
        var deptName = 'NA';
        this.service.hsnSacCodeData('HSN').subscribe(
          data => {
            this.hsnSacCodeList = data;
          }
        )
        this.service.invItemList(itemType, deptName, (sessionStorage.getItem('divisionId')))
          .subscribe(
            data => {
              this.invItemList = data;
              this.itemMap.set(itemType, data);
              console.log(this.invItemList);
              this.lineDetailsArray.controls[lineNum].get('invDescription').enable();
              this.lineDetailsArray.controls[lineNum].get('hsnSacCode').enable();
              this.lineDetailsArray.controls[lineNum].get('segment').enable();

              this.poMasterDtoForm.get('supplierCode').disable();
              this.poMasterDtoForm.get('supplierSiteId').disable();
              this.poMasterDtoForm.get('shipToLoc').disable();
              this.poMasterDtoForm.get('billToLoc').disable();
            }
          );
      }
    }
  }


  filterRecord(event, i) {
    var itemCode = event.target.value;
    if (itemCode.length === 4) {
      if (event.keyCode == 13) {
        this.service.invItemList2New('GOODS', (sessionStorage.getItem('deptName')), (sessionStorage.getItem('divisionId')), itemCode.toUpperCase())
          .subscribe((data) => {
            if (data.length === 0) {
              alert('Item Not Present in Master');
              return;
            }
            else {
              this.invItemList = data;
            }
          });
      }
    }
    else if (itemCode.length === 3) {
      alert('Please Enter 4 characters of item number!!');
      return;
    }
  }













  onOptioninvItemIdSelected1($event) {

    let select = this.invItemList.find(d => d.invItemId === this.invItemId);

    if (select) {


      // this.ouId= select.taxCategoryLinesCollection
      var index = 0;
      for (let ele of select.taxCategoryLinesCollection) {

        if (ele.taxCategoryName.orgId === this.ouId) {

          if (ele.taxCategoryName.taxCategoryName === null) {

            alert("Tax not attached to item")
          }
        }
      }


    }
  }


  fetchSeries(value: String) {

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
        alert(res.message);
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
    // this.poMasterDtoForm.reset();
    // this.lineDetailsArray.controls[i].get('taxAmounts')
    // this.poMasterDtoForm.lineDetailsGroup.TaxDetailsArray.clear();
    // this.lineDetailsArray.clear();
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

  getInvItemId($event, i) {
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

      this.segment11 = temp[0];
      this.segment2 = temp[1];
      this.segment3 = temp[2];
      this.segment4 = temp[3];
      this.segment5 = temp[4];
      // this.segment6 = temp[5];
    }
    ;
    this.displayModal = false;
    this.showModal = true; // Show-Hide Modal Check
    this.content = i; // Dynamic Data
    let a = i + 1
    this.title = "PoLine :" + a;    // Dynamic Data

  }
  onOptionsSelectedBranch(segment: any, lType: string) {

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

  }
  // @HostListener("window:keyup.control.v", ["$event"]) v(e: KeyboardEvent) {
  //   console.log("control+ v", e);

  //   this.authorizationStatus = 'Inprogress';
  //   const formValue: IpostPO = this.transData(this.poMasterDtoForm.value);
  //   formValue.authorizationStatus = 'Inprogress';
  //   formValue.ouId = this.ouId;
  //   formValue.currencyCode = 'INR';
  //   var arrayControl = this.poMasterDtoForm.get('poLines').value
  //   this.baseAmount = 0;
  //   this.totTaxAmt = 0;
  //   this.totalAmt = 0;

  //   for (var i = 0; i < arrayControl.length; i++) {
  //     this.baseAmount = this.baseAmount + arrayControl[i].baseAmtLineWise;
  //     this.totTaxAmt = this.totTaxAmt + arrayControl[i].taxAmtLineWise;
  //   }
  //   this.totalAmt = (this.baseAmount + this.totTaxAmt);
  //   formValue.totalAmt = this.totalAmt;

  //   formValue.baseAmount = this.baseAmount;
  //   formValue.totTaxAmt = this.totTaxAmt;
  //   // formValue.poType = 'Standard Purchase Orde';
  //   formValue.poType = this.poType;
  //   formValue.dept = Number(this.dept);
  //   formValue.supplierCode = this.supplierCode;
  //   this.service.poSubmit(formValue).subscribe((res: any) => {
  //     var obj = res.obj;
  //     sessionStorage.setItem('poNo', obj);
  //     this.segment1 = sessionStorage.getItem('poNo');
  //     if (res.code === 200) {
  //       alert('RECORD INSERTED SUCCESSFULLY');
  //       this.displayButton = false;
  //       this.displayNewButton = false;
  //     } else {
  //       if (res.code === 400) {
  //         alert('Code already present in the data base');
  //         // this.poMasterDtoForm.reset();
  //       }
  //     }
  //   });
  // }
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

  loadAllUser() {
    this.allUsers = this.service.BindUser();
  }

  uploadFile() {
    console.log('doctype-check' + this.docType)
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0])
    // alert(this.deptName);
    if (this.deptName === 'Sales') {
      this.service.bulkpouploadSales(formData).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.obj);
          // this.Search(this.segment1);
        } else {
          if (res.code === 400) {
            alert('Error In File : \n' + res.obj);
          }
        }
      });
    }
    else {
      this.service.bulkpouploadSpares(formData).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.obj);
        } else {
          if (res.code === 400) {
            alert('Error In File : \n' + res.obj);
          }
        }
      });
      // }
    }
    // });
  }

  message1: string = "Please Fix the Errors !";
  msgType: string = "Close";
  getMessage(msgType: string) {
    this.msgType = msgType;
    // alert("check");
    if (msgType.includes("Save")) {
      this.submitted = true;
      (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
      if (this.poMasterDtoForm.invalid) {
        alert("Validator error");
        //this.submitted = false;
        (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '');
        return;
      }
      this.message1 = "Do you want to SAVE the changes(Yes/No)?"

    }
    if (msgType.includes("Update")) {
      this.message1 = "Do you want to Update the Form(Yes/No)?"
    }
    if (msgType.includes("Approve")) {
      this.message1 = "Do you want to Approve this PO (Yes/No)?"
    }
    if (msgType.includes("poCancel")) {
      this.message1 = "Do you want to Cancel this PO (Yes/No)?"
    }
    if (msgType.includes("goReceiptForm")) {
      this.message1 = "Nevigate to Receipt form (Yes/No)?"
    }
    if (msgType.includes("Reset")) {
      this.message1 = "Do you want to Reset the changes(Yes/No)?"
    }

    if (msgType.includes("Close")) {
      this.message1 = "Do you want to Close the Form(Yes/No)?"
    }
    return;
  }

  executeAction() {
    if (this.msgType.includes("Save")) {
      this.newPOMast();
    }

    if (this.msgType.includes("Update")) {
      //       alert("Update button clicked");
      this.UpdatePOMast();
    }
    if (this.msgType.includes("Approve")) {
      this.Approve();
    }
    if (this.msgType.includes("poCancel")) {
      this.poCancel(this.segment1);
    }
    if (this.msgType.includes("goReceiptForm")) {
      this.goReceiptForm(this.segment1);
    }

    if (this.msgType.includes("Reset")) {
      //       alert("reset clicked");
      this.clearFormArray();
    }

    if (this.msgType.includes("Close")) {
      this.router.navigate(['admin']);
    }
    return;
  }





  onHsnCodeSelected(event, index) {
    // alert(event);
    console.log(event);

    let selectgstPercentage = this.hsnSacCodeList.find(v => v.hsnsaccode == event);
    if (event != null && event != 'NA') {
      if (this.currentOp != 'Search') {
        var gstPercentage = selectgstPercentage.gstPercentage;
        let control = this.poMasterDtoForm.get('poLines') as FormArray;
        (control.controls[index]).patchValue(
          {
            gstPercentage: selectgstPercentage.gstPercentage,
          });
        var supplierSiteId = this.poMasterDtoForm.get('supplierSiteId').value;
        console.log(this.suppIdList);
        let selectedValue = this.suppIdList.find(v => v.suppSiteId == supplierSiteId);
        console.log(selectedValue);
        if (selectedValue.taxCategoryName != null && this.itemType === "EXPENCE") {
          // alert(this.itemType + '---' + gstPercentage);
          this.service.taxCategoryListNew(selectedValue.taxCategoryName, gstPercentage)
            .subscribe(
              data1 => {
                this.taxCategoryList[index] = data1;
                console.log(this.taxCategoryList);
              }
            );
        }
        // }
      }
    }
  }




}