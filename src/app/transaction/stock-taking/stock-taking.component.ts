import { DatePipe } from '@angular/common';
import { Component, OnInit,ViewChild} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


interface IStockaking {
  compileId1: number;
  compileName: String;
  compileDate: Date;
  compNo: string;
  compileId: number;
  compileType: number;
  subInventory: string;
  reason: string;
  segmentName: string;
  codeCombinationId: number;
  compileStatus: string;
  totalCompileItems: number;
  totalItemValue: number;
  approvedBy: string;
  locId: number;
  deptId: number;
  locatorId: number;
  divisionId: number;
  description: string;
  Adjustment: string;
  Approve: string;
  trans: string;
  Floor: string;
  Rack: string;
  RackNo: number;
  Row: string;
  RowNo: number;
  lookupValueDesc5: string;
}

@Component({
  selector: 'app-stock-taking',
  templateUrl: './stock-taking.component.html',
  styleUrls: ['./stock-taking.component.css']
})
export class StockTakingComponent implements OnInit {
  StockTakingForm: FormGroup;
  compileName: String;
  compNo: string;
  // compileDate: Date;
  segmentName: string;
  public minDate = new Date();
  compileId: number;
  compileType: number;
  subInventory: string;
  reason: string;
  reasonlist: any;
  CostDetail: any;
  codeCombinationId: number;
  public ItemIdList: any[];
  public InterBrancList: Array<string> = [];
  public BranchList: Array<string> = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: Array<string> = [];
  public locIdList: Array<string> = [];
  userList2: any[] = [];
  lastkeydown1: number = 0;
  LocatorList: any;
  segmentNameList: any;
  segment11: string;
  lookupValueDesc1: string;
  segment2: number;
  lookupValueDesc2: string;
  segment3: number;
  trans: string;
  lookupValueDesc3: string;
  segment4: number;
  lookupValueDesc4: string;
  segment5: string;
  lookupValueDesc5: string;
  showModal: boolean;
  branch: any;
  compileStatus: string = "OPEN";
  totalCompileItems: number;
  totalItemValue: number;
  Adjustment: string;
  Approve: string;
  approvedBy: string;
  public issueByList: Array<string> = [];
  public TypeList: Array<string> = [];
  displayLocator: Array<boolean> = [];
  public transType: Array<string> = [];
  displayButton: boolean = false;
  getfrmSubLoc: any;
  locId: number;
  deptId: number;
  locatorId: number;
  divisionId: number;
  description: string;
  subInvCode: any;
  displayheader: boolean = true;
  getItemDetail: any;
  Floor: string;
  Rack: string;
  RackNo: number;
  Row: string;
  RowNo: number;
  content: number;
  title: string;
  acccodedesc: any;
  displayprocess: boolean = true;
  compileId1: number;
  currentop: string = 'process';
  invItemId: number;
  itemId: number;

  pipe = new DatePipe('en-US');
  now=new Date();
  compileDate=this.pipe.transform(this.now,'dd-MM-yyyy')

  @ViewChild('fileInput') fileInput;
  itemUploadedList:any;
  // dataDisplay1: any;
  files:string;
  displaydata:boolean=true;
  dataList: any;
  lstData: any;
  isVisiblePro:boolean=false;
  uploadButton:boolean=false;
  
  dataDisplay1 :string;
  spinIcon=true;
  dataDisplay :string;
  spinIcon1=true;
  display = 'none';

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.StockTakingForm = fb.group({
      compileName: [''],
      compileDate: [''],
      compileId: [''],
      compNo: [''],
      compileType: ['', Validators.required],
      subInventory: ['', Validators.required],
      locId: ['', Validators.required],
      reason: ['', Validators.required],
      segmentName: [''],
      description: [''],
      segment11: [''],
      segment2: [''],
      segment3: [''],
      segment4: [''],
      segment5: [''],
      lookupValueDesc1: [''],
      lookupValueDesc2: [''],
      lookupValueDesc3: [''],
      lookupValueDesc4: [''],
      lookupValueDesc5: [''],
      codeCombinationId: [''],
      compileStatus: [''],
      totalCompileItems: [''],
      totalItemValue: [''],
      approvedBy: [''],
      Floor: [''],
      Rack: [''],
      RackNo: [''],
      Row: [''],
      RowNo: [''],
      trans: ['Adjustment'],
      files:[],

      cycleLinesList: this.fb.array([]),
    })
  }
  cycleLinesList(): FormArray {
    return this.StockTakingForm.get("cycleLinesList") as FormArray
  }
  newcycleLinesList(): FormGroup {
    return this.fb.group({
      compileId1: [''],
      compileLineId: [''],
      LinNo: [''],
      invItemId: [''],
      adjustmentQty: [''],
      physicalQty: [''],
      systemQty: [''],
      locatorId: [''],
      subInventory: [''],
      itemUnitCost: [''],
      uom: [''],
      description: [''],
      divisionId: [''],
      entryStatusCode: [''],
      LocatorSegment: [''],

      locId: [''],
      itemId: [''],
      onHnQty: [''],
      segment: ['', Validators.required],
      srlNo: [''],
    })
  }

  addnewcycleLinesList() {

    this.cycleLinesList().push(this.newcycleLinesList());
    var len = this.cycleLinesList().length;
    var patch = this.StockTakingForm.get('cycleLinesList') as FormArray;
    (patch.controls[len - 1]).patchValue(
      {
        srlNo: len,
      }
    );
    // this.currentop='search';
  }
  removenewcycleLinesList(trxLineIndex) {
    this.cycleLinesList().removeAt(trxLineIndex);
    // this.displayLocator[trxLineIndex]=true;
  }
  ngOnInit(): void {
    this.locId = Number(sessionStorage.getItem('locId'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.approvedBy = (sessionStorage.getItem('name'));
    this.addnewcycleLinesList();
    this.trans = 'Adjustment';
    this.service.subInvCode2(this.deptId, this.divisionId).subscribe(
      data => {
        this.subInvCode = data;
        console.log(data);
        this.subInventory = this.subInvCode.subInventoryCode;
        // alert('subInventoryCode');
      });
    this.service.ReasonList().subscribe(
      data => {
        this.reasonlist = data;
      }
    )
    this.service.TransactionType().subscribe(
      data => {
        this.transType = data;
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
    this.service.locationCodeList()
      .subscribe(
        data => {
          this.locIdList = data;
          console.log(this.locIdList);
        }
      );
    this.service.issueByList(this.locId, this.deptId, this.divisionId).subscribe
      (data => {
        this.issueByList = data;
        console.log(this.issueByList);
      });
    this.service.TypeList().subscribe(
      data => {
        this.TypeList = data;
      }
    )
    this.service.dataDisplay(this.locId).subscribe((res: any) => {
      if (res.code === 200) {
  
            this.dataList=res.obj;
          }
          console.log(this.dataList);
  
        });
    // this.service.ItemIdDivisionList(this.divisionId).subscribe(
    //   data => {
    //     this.ItemIdList = data;
    //     console.log(this.ItemIdList);

    //   });
    var patch = this.StockTakingForm.get('cycleLinesList') as FormArray

    (patch.controls[0]).patchValue(
      {
        srlNo: 1,
      }
    );

  }
  StockTaking(StockTakingForm: any) { }
  openCodeCombination() {
    let SegmentName1 = this.StockTakingForm.get('SegmentName').value;
    if (SegmentName1 === null) {
      this.StockTakingForm.get('segment11').reset();
      this.StockTakingForm.get('segment2').reset();
      this.StockTakingForm.get('segment3').reset();
      this.StockTakingForm.get('segment4').reset();
      this.StockTakingForm.get('segment5').reset();

      this.StockTakingForm.get('lookupValueDesc1').reset();
      this.StockTakingForm.get('lookupValueDesc2').reset();
      this.StockTakingForm.get('lookupValueDesc3').reset();
      this.StockTakingForm.get('lookupValueDesc4').reset();
      this.StockTakingForm.get('lookupValueDesc5').reset();
    }
    if (SegmentName1 != null) {
      var temp = SegmentName1.split('.');

      this.segment11 = temp[0];
      this.segment2 = temp[1];
      this.segment3 = temp[2];
      this.segment4 = temp[3];
      this.segment5 = temp[4];
    }
    this.showModal = true;

  }
  fnCancatination() {
    this.segmentName = this.StockTakingForm.get('segment11').value + '.' +
      this.StockTakingForm.get('segment2').value + '.' +
      this.StockTakingForm.get('segment3').value + '.' +
      this.StockTakingForm.get('segment4').value + '.' +
      this.StockTakingForm.get('segment5').value;

    this.service.segmentNameList(this.segmentName)
      .subscribe(
        data => {

          this.segmentNameList = data;
          if (this.segmentNameList.code === 200) {
            this.StockTakingForm.patchValue({ codeCombinationId: this.segmentNameList.obj.codeCombinationId });
            if (this.segmentNameList.length == 0) {
              alert('Invalid Code Combination');
            } else {
              console.log(this.segmentNameList);
              this.codeCombinationId = Number(this.segmentNameList.codeCombinationId)
            }
          } else if (this.segmentNameList.code === 400) {
            this.StockTakingForm.patchValue({ segmentName: '' });
            // alert(this.segmentNameList.message);

          }
        }
      );
    this.StockTakingForm.get('segment11').reset();
    this.StockTakingForm.get('segment2').reset();
    this.StockTakingForm.get('segment3').reset();
    this.StockTakingForm.get('segment4').reset();
    this.StockTakingForm.get('segment5').reset();

    this.StockTakingForm.get('lookupValueDesc1').reset();
    this.StockTakingForm.get('lookupValueDesc2').reset();
    this.StockTakingForm.get('lookupValueDesc3').reset();
    this.StockTakingForm.get('lookupValueDesc4').reset();
    this.StockTakingForm.get('lookupValueDesc5').reset();
  }
  onOptionsSelectedBranch(segment: any, lType: string) {

    this.service.getInterBranch(segment, lType).subscribe(
      data => {
        this.branch = data;
        console.log(this.branch);
        if (this.branch != null) {
          if (lType === 'SS_Interbranch') {
            this.lookupValueDesc5 = this.branch.lookupValueDesc;
          }
          if (lType === 'NaturalAccount') {
            this.lookupValueDesc4 = this.branch.lookupValueDesc;
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

      }
    );

  }
  postAdjustment(e, compNo) {
    // alert(e.target.checked + 'Radio');
    if (e.target.checked) {
      this.Adjustment = 'Y'
    }
    else {
      this.Adjustment = 'N';
    }
    this.viewdata(compNo, e.target.value);
  }

  getInvItemId($event) {

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

  onOptiongetItem(event: any, i, op) {

    this.currentop = op;
    let select1 = this.ItemIdList.find(d => d.SEGMENT === event.target.value);

    var trxLnArr1 = this.StockTakingForm.get('cycleLinesList') as FormArray;
    var trxLnArr = this.StockTakingForm.get('cycleLinesList').value;
    trxLnArr1.controls[i].patchValue({ invItemId: select1.itemId })
    var compId = this.StockTakingForm.get('compileId').value;
    var compileType1 = this.StockTakingForm.get('compileType').value;
    var subcode = this.StockTakingForm.get('subInventory').value;
    // let select2= this.subInvCode.find(d=>d.subInventoryCode===subcode);
    this.displayheader = true;

    if (this.currentop === 'search') {

      this.service.getsearchByCompId(compId, select1.itemId).subscribe(
        data => {
          if (data.code === 400) {
            this.service.getItemDetail(select1.itemId).subscribe
              (data => {
                this.getItemDetail = data;
                if (this.getItemDetail.description != undefined) {
                  trxLnArr1.controls[i].patchValue({ description: this.getItemDetail.description });
                  trxLnArr1.controls[i].patchValue({ uom: this.getItemDetail.uom });
                  trxLnArr1.controls[i].patchValue({ entryStatusCode: 2 });
                  trxLnArr1.controls[i].patchValue({ subInventory: subcode })
                  trxLnArr1.controls[i].patchValue({ locId: Number(sessionStorage.getItem('locId')) })
                }
              });
            this.service.getCostDetail(Number(sessionStorage.getItem('locId')), select1.itemId).subscribe
              (data => {
                this.CostDetail = data;
                trxLnArr1.controls[i].patchValue({ itemUnitCost: this.CostDetail.rate });
              });
          }
          if (data.code === 200) {
            // alert(data.obj.length +'Length');
            // trxLnArr1.controls[i].patchValue({'compileLineId':data.obj[0].compileLineId,'uom':data.obj[0].uom,'itemUnitCost':data.obj[0].itemUnitCost,'description':data.obj[0].description,'LocatorSegment':data.obj[0].LocatorSegment,'systemQty':data.obj[0].systemQty,'entryStatusCode':data.obj[0].entryStatusCode})
            if (data.obj.length == 1) {
              trxLnArr1.controls[i].patchValue(data.obj[0]);
            }
            else if (data.obj.length > 1) {
              trxLnArr1.controls[i].patchValue(data.obj[0]);
              for (let j = 1; j < data.obj.length; j++) {
                // debugger;
                var trxlist: FormGroup = this.newcycleLinesList();
                this.cycleLinesList().push(trxlist);
                trxLnArr1.controls[i + j].patchValue(data.obj[j]);

            }}
              this.currentop = 'process';
            }
          });
    }

  }
  OpenLocator(i) {

    var LocSegment = this.cycleLinesList().controls[i].get('LocatorSegment').value;

    if (LocSegment === null) {
      this.StockTakingForm.get('Floor').reset();
      this.StockTakingForm.get('Rack').reset();
      this.StockTakingForm.get('RackNo').reset();
      this.StockTakingForm.get('Row').reset();
      this.StockTakingForm.get('RowNo').reset();
    }
    if (LocSegment != null) {
      var temp = LocSegment.split('.');

      this.Floor = temp[0];
      this.Rack = temp[1];
      this.RackNo = temp[2];
      this.Row = temp[3];
      this.RowNo = temp[4];
    }
    // this.showModal = true;
    this.content = i;
    let a = i + 1
    this.title = "Locator :" + a;


  }

  okLocator(i) {

    var LocSegment = this.StockTakingForm.get('cycleLinesList').value;
    var patch = this.StockTakingForm.get('cycleLinesList') as FormArray;
    LocSegment[i].LocatorSegment = this.StockTakingForm.get('Floor').value + '.' +
      this.StockTakingForm.get('Rack').value + '.' +
      this.StockTakingForm.get('RackNo').value + '.' +
      this.StockTakingForm.get('Row').value + '.' +
      this.StockTakingForm.get('RowNo').value;


    var LocatorSegment1 = LocSegment[i].LocatorSegment;

    patch.controls[i].patchValue({ 'LocatorSegment': LocSegment[i].LocatorSegment })

    this.service.LocatorNameList(LocatorSegment1, Number(sessionStorage.getItem('locId')),this.subInvCode.subinventoryId).subscribe
      (data => {
        this.LocatorList = data

        if (this.LocatorList.code === 200) {
          (patch.controls[i]).patchValue({ locatorId: this.LocatorList.obj.locatorId })

          if (this.LocatorList.lengh == 0) {
            alert('Invalid Code Combination');
          }
          else {
            this.locatorId = (this.LocatorList.obj.locatorId);
          }
        }
        else if (this.LocatorList.code === 400) {
          var arraycontrol = this.StockTakingForm.get('cycleLinesList').value;
          patch.controls[i].patchValue({ LocatorSegment: '' });
        }

      });
    this.StockTakingForm.get('Floor').reset();
    this.StockTakingForm.get('Rack').reset();
    this.StockTakingForm.get('RackNo').reset();
    this.StockTakingForm.get('Row').reset();
    this.StockTakingForm.get('RowNo').reset();
    alert('locator search complete')
  }
  CalculateAdjQuantity(i: number) {
    var compileType1 = this.StockTakingForm.get('compileType').value;
    var trxLnArr = this.StockTakingForm.get('cycleLinesList').value;
    let sysquan = trxLnArr[i].systemQty;
    let phyquan = trxLnArr[i].physicalQty;
    let adjqty = 0;
    adjqty = phyquan - sysquan;
    var trxLnArr1 = this.StockTakingForm.get('cycleLinesList') as FormArray;
    trxLnArr1.controls[i].patchValue({ adjustmentQty: adjqty });
  }
  resetstkTaking() {
    window.location.reload();
  }
  UpdateMiscData() {

    // ( (this.StockTakingForm.get('cycleLinesList'))as FormArray).controls[0].patchValue({'compileId1':comId})
    var formValue: IStockaking = this.StockTakingForm.get('cycleLinesList').value
    var comId = this.StockTakingForm.get('compileId').value;

    // formValue.compileId1=comId;
    this.service.miscellaneousUpdate(comId, formValue).subscribe
      ((res: any) => {
        if (res.code === 200) {
          // this.compileName=obj;
          alert("Record Updated Successfully");
          // window.location.reload();
        }
        else {
          if (res.code === 400) {
            alert("ERROR OCCOURED IN PROCEESS");
            this.StockTakingForm.reset();

          }
        }
      })
  }
  Approval() {
    this.currentop = 'Approval';
    const formValue: IStockaking = this.transData(this.StockTakingForm.value);
    // debugger;
    this.service.approve(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert("Cycle Count Approve Successfully");
        this.displayButton=false;
        // window.location.reload();
      }
      else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.StockTakingForm.reset();
        }
      }
    })
  }
  transData(val) {
    delete val.segment11;
    delete val.segment2;
    delete val.segment3;
    delete val.segment4;
    delete val.lookupValueDesc1;
    delete val.lookupValueDesc2;
    delete val.lookupValueDesc3;
    delete val.lookupValueDesc4;
    delete val.segment5;
    delete val.lookupValueDesc5;
    delete val.segmentName;
    delete val.cycleLinesList;

    return val;
  }
  process() {
    this.currentop = 'process';
     this.spinIcon=false;
    this.dataDisplay1='Data is Processing...Please Wait...'
    const formValue: IStockaking = this.transData(this.StockTakingForm.value);
    this.service.miscellaneousSubmit(formValue).subscribe
      ((res: any) => {
        var obj = res.obj.compileName;
        this.compileId = res.obj.compileId;
        this.StockTakingForm.patchValue({ 'compileId': res.obj.compileId,'totalCompileItems':res.obj.totalCompileItems,
        'totalItemValue': res.obj.totalItemValue })
        sessionStorage.setItem('compileName', obj);
        if (res.code === 200) {
          this.compileName = obj;
          alert("Record Inserted Successfully");
          this.spinIcon=true;
          this.dataDisplay1='';
          // let control = this.StockTakingForm.get('cycleLinesList') as FormArray;
          // var len = this.cycleLinesList().length;
          // for (let i = 0; i < res.obj.cycleLinesList.length - len; i++) {
          //   var trxlist: FormGroup = this.newcycleLinesList();
          //   this.cycleLinesList().push(trxlist);

          // }
          this.StockTakingForm.patchValue(res.obj);
          // for (let i = 0; i < this.cycleLinesList().length; i++) {

          //   this.StockTakingForm.patchValue({ 'srlNo': i + 1 })
          //   control.controls[i].patchValue({ srlNo: i + 1 })
          //   this.StockTakingForm.patchValue({ 'segment': res.obj.cycleLinesList[i].segment });
          //   this.StockTakingForm.patchValue({ 'subInventory': res.obj.cycleLinesList[i].subInventory });
          // }
          this.StockTakingForm.disable();
          document.getElementById("processButton").removeAttribute("Enabled");;
          this.displayButton=false;
          this.isVisiblePro=false;
        }
        else {
          if (res.code === 400) {
            alert("Code already present in data base");
            this.spinIcon=true;
          this.dataDisplay1='';
            this.StockTakingForm.reset();
          }
        }
      })
  }
  search(compNo) {

    var compno = this.StockTakingForm.get('compNo').value;
    var appflag = this.StockTakingForm.get('trans').value;
    this.service.getSearchViewBycompNo(compno).subscribe
      (data => {
        if (data.code === 400) {
          alert("Can not View data");
        }
        if (data.code === 200) {
                this.lstData=data.obj.cycleLinesList;
                console.log(this.lstData);
          let control = this.StockTakingForm.get('cycleLinesList') as FormArray;
          var len = this.cycleLinesList().length;
          for (let i = 0; i < data.obj.cycleLinesList.length - len; i++) {
            var trxlist: FormGroup = this.newcycleLinesList();
            this.cycleLinesList().push(trxlist);

          }
          this.StockTakingForm.patchValue(data.obj);
          //  this.StockTakingForm.disable();
          this.StockTakingForm.get('cycleLinesList').disable();
          this.StockTakingForm.get('subInventory').disable();
          this.StockTakingForm.get('compileDate').disable();
          this.StockTakingForm.get('compileType').disable();
          this.StockTakingForm.get('reason').disable();
          this.StockTakingForm.get('segmentName').disable();
          this.StockTakingForm.get('approvedBy').disable();
          //  this.displayprocess=false;
          if(data.obj.compileStatus==='CLOSED'){
            this.isVisiblePro=false;
            this.displayButton=false;
          }
          if(data.obj.compileStatus==='OPEN'){
            this.isVisiblePro=false;
            this.uploadButton=true;
            this.displayButton=true;
          }
          this.currentop = 'search'
        }
      })

  }
  viewdata(compNo, tranVal) {

    var compno = this.StockTakingForm.get('compileName').value;
    //  var appflag=this.StockTakingForm.get('trans').value;
    // var adjFlag=this.miscellaneousForm.get('Adjustment').value;

    if ('Adjustment' === tranVal) {
      this.service.getSearchByNo(compno)
        .subscribe(data => {
          if (data.code === 400) {
            window.location.reload();
          }
          if (data.code === 200) {
            //       this.lstcomment=data.obj;
            this.cycleLinesList().clear();
            this.addnewcycleLinesList();
            console.log(data.obj);
            this.StockTakingForm.patchValue(data.obj);
          }
        })
    }
    else if ('Approve' === tranVal) {
      this.service.getSearchBycompNo(compno)
        .subscribe(data => {
          if (data.code === 400) {
            // window.location.reload();
            alert("Error Response!!");
          }
          if (data.code === 200) {
            //       // this.lstcomment=data.obj;
            let control = this.StockTakingForm.get('cycleLinesList') as FormArray;
            var len = this.cycleLinesList().length;
            for (let i = 0; i < data.obj.cycleLinesList.length - len; i++) {
              var trxlist: FormGroup = this.newcycleLinesList();
              this.cycleLinesList().push(trxlist);

            }


            this.StockTakingForm.patchValue(data.obj);
            for (let i = 0; i < this.cycleLinesList().length; i++) {

              // this.StockTakingForm.patchValue({'srlNo':i+1})
              // control.controls[i].patchValue({srlNo:i+1  })
              this.StockTakingForm.patchValue({ 'segment': data.obj.cycleLinesList[i].segment });
              this.StockTakingForm.patchValue({ 'subInventory': data.obj.cycleLinesList[i].subInventory });
            }
            // this.miscellaneousForm.disable();
          }
        })
    }
    this.displayButton = false;
  }

  onSelectReason(event) {

    // var reasname=this.miscellaneousForm.get('reason').value;
    // this.service.reasonaccCode(this.locId,reasname).subscribe(
    var reasonArr = event.split('-');

    this.service.reasonaccCode(this.locId, reasonArr[0], reasonArr[1]).subscribe(

      data => {
        this.acccodedesc = data;
        // this.miscellaneousForm.patchValue({reason:this.acccodedesc.segmentName});
        this.segmentName = this.acccodedesc.segmentName;
        // this.codeCombinationId=this.acccodedesc.codeCombinationId;
        this.StockTakingForm.patchValue({ codeCombinationId: this.acccodedesc.codeCombinationId })
      }
    );
    this.isVisiblePro=true;

    alert(this.dataList[0].compileStatus+"this.dataList.compileStatus")
    if(this.dataList.compileStatus==='OPEN')
    {
      alert("You can not create new compile Id");
      this.isVisiblePro=false;
      return;
    }
    else{
    this.isVisiblePro=true;
    }
  }

  validate(i: number, qty1) {//alert("Validate");
    var trxLnArr = this.StockTakingForm.get('cycleLinesList').value;
    var trxLnArr1 = this.StockTakingForm.get('cycleLinesList') as FormArray
    let avalqty = trxLnArr[i].avlqty;
    let qty = trxLnArr[i].physicalQty;

    if (qty >= 0) {
      alert("You can not enter more than available quantity");
      trxLnArr1.controls[i].patchValue({ physicalQty: '' });
      qty1.focus();
    }
    if (qty <= 0) {
      alert("Please enter quantity more than zero");
      trxLnArr1.controls[i].patchValue({ physicalQty: '' });
      qty1.focus();
    }

  }

  close() {
    this.router.navigate(['admin']);
  }

  uploadFile(event:any) {
    var file =this.StockTakingForm.get('files').value;
    if (file===undefined){
      alert('First Select CSV & Then Click upload Button !..');
      return;
    }
    event.target.disabled = true;
    // this.spinIcon1=false;
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0]);
    this.service.bulkstockTakinguploadCsv(formData).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.itemUploadedList=res.obj; 
          // this.spinIcon1=false; 
          this.dataDisplay='File Uploaded Sucessfully....'
          this.displaydata=false;
          // this.closeResetButton=true;
         this.StockTakingForm.get('files').reset();
         var compilNo=this.StockTakingForm.get('compNo').value;
       this.search(compilNo);
        }
        else{
          if (res.code===400){    
            alert(res.message);
            this.itemUploadedList = res.obj;
            this.dataDisplay1='File Uploading Failed....'
            // this.closeResetButton=true;
            this.StockTakingForm.get('files').reset();
            // this.itemButton1=false;
          }
        }
      })

      setTimeout(() => {
        event.target.disabled= false;
       }, 60000);
       
  }

  message: string = "Please Fix the Errors!";
  cnfMsgType: string = "Close";
  // msgType:string ="Navigate";
  getMessage(msgType: string) {
    this.cnfMsgType = msgType;
    if (msgType.includes("Approve")) {
      // this.submitted = true;
      // (document.getElementById('saveBtn') as HTMLInputElement).setAttribute('data-target', '#confirmAlert');
      this.message = "Do you want to Approve the changes (Yes/No)?"
    }
    
  } 


  executeAction() {
    if (this.cnfMsgType.includes("Approve")) {
      this.Approval();
    }
    
  }
  closeModalDialog() {
    this.display = 'none'; //set none css after close dialog
    // this.myInputField.nativeElement.focus();
  }

}

