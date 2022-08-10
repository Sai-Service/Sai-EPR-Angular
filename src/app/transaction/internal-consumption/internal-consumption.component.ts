import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';


interface InternalConsumption {
  invItemId: number;
  compNo: string;
  codeCombinationId: number;
  compileId: number;
  segmentName: string;
  adjustmentQty: number;
  physicalQty: number;
  systemQty: number;
  locatorId: number;
  subInventory: string;
  itemUnitCost: number;
  uom: string;
  description: string;
  locId: number;
  deptId: number;
  divisionId: number;
  lookupValueDesc1: string;
  segment2: number;
  lookupValueDesc2: string;
  segment3: number;
  lookupValueDesc3: string;
  segment4: number;
  lookupValueDesc4: string;
  segment5: string;
  lookupValueDesc5: string;
  compileStatus: string;
  compileType: number;
  reason: string;
  reasonName: string;
  entryStatusCode: number;
  LocatorSegment: string;
  Floor: string;
  Rack: string;
  RackNo: number;
  Row: string;
  RowNo: number;
  itemId: number;
  onHandQty: number;
  subInventoryCode: string;
  LocatorSegment1: string;
  compileName: string;
  approvedBy: string;
  totalCompileItems: number;
  totalItemValue: number;
  compileDate: Date;
  compileLineId: number;
  Adjustment: string;
  Approve: string;
  View1: string;
  trans: string;
  CostDetail: number;
  attribute1: number;
  attribute2: Date;
}

export class IcTrans {
  segment: string;
  Locator: string;
  quantity: number;
}

@Component({
  selector: 'app-internal-consumption',
  templateUrl: './internal-consumption.component.html',
  styleUrls: ['./internal-consumption.component.css']

})
export class InternalConsumptionComponent implements OnInit {
  InternalConsumptionForm: FormGroup;
  public ItemIdList: any[];
  public subInvCode: any;
  compNo: string;
  onHandQty: number;
  JobNo:string;
  id: number;
  public transType: any = [];
  invItemId: number;
  userList2: any[] = [];
  lastkeydown1: number = 0;
  
  segmentName: string;
  adjustmentQty: number;
  physicalQty: number;
  // locData =[ {
  //   "locatorId": 999,
  //   "segmentName": "D.U.01.D.01",
  //   "id": 7,
  //   "onHandQty": 40
  // }];
  compileId: number;
  acccodedesc: any;
  systemQty: number;
  locatorId: number;
  subInventory: string;
  itemUnitCost: number;
  uom: string;
  avlqty: number;
  description: string;
  locId: number;
  deptId: number;
  divisionId: number;
  getItemDetail: any;
  resveQty: number;
  CostDetail: any;
  subInventoryId: number;
  processItemList: any;
  getfrmSubLoc: any = [];
  public onhand: any;
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
  branch: any;
  display: true;
  displayheader: boolean = true;
  displayLocator: Array<boolean> = [];
  displayButton: boolean = true;
  displayaddButton: boolean = true;
  addRow: boolean = true;
  public InterBrancList: Array<string> = [];
  public BranchList: Array<string> = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: Array<string> = [];
  public locIdList: Array<string> = [];
  public TypeList: Array<string> = [];
  public issueByList: Array<string> = [];
  public workshopIssue: any[];
  segmentNameList: any;
  codeCombinationId: number;
  compileType: number;
  reason: string;
  reasonlist: any;
  compileStatus: string = "OPEN"
  entryStatusCode: number;
  LocatorSegment: string;
  Floor: string;
  Rack: string;
  RackNo: number;
  showModal: boolean;
  Row: string;
  RowNo: number;
  itemId: number;
  onHnQty: number;
  subInventoryCode: string;
  getItemDetail1: any;
  LocatorSegment1: string;
  LocatorList: any;
  compileName: string;
  approvedBy: string;
  click: boolean = false;
  totalCompileItems: number;
  totalItemValue: number;
  // compileDate:Date;
  lstcomment: any;
  segment: string;
  lineNumber: number;
  compileLineId: number;
  resrveqty: number;
  Adjustment: string;
  Approve: string;
  View1: string;
  content: number;
  title: string;
  sub: string;
  attribute1: number;
  attribute2: Date;

  jobData:any=[];

  type1: string;
  dispheader: boolean = false;
  displable: boolean = false;
  pipe = new DatePipe('en-US');
  now = new Date();
  compileDate = this.pipe.transform(this.now, 'dd-MM-yyyy')
  currentOp: string;
  dispRow: boolean = true;
  displayRemoveRow: Array<boolean> = [];
  name:string;

  public itemMap = new Map<string, IcTrans>();

  @ViewChild("myinput") myinput: ElementRef;
  @ViewChild("input1") input1: ElementRef;
  @ViewChild("input2") input2: ElementRef;
  @ViewChild("input3") input3: ElementRef;
  @ViewChild("input4") input4: ElementRef;
  @ViewChild("input5") input5: ElementRef;
  @ViewChild("input6") input6: ElementRef;
  @ViewChild("Item") Item: ElementRef;
  getVehRegDetails: any;

  // @ViewChild("suppCode1") suppCode1: ElementRef;
  ngAfterViewInit() {
    this.myinput.nativeElement.focus();
  }

  constructor(private fb: FormBuilder, private router: Router, private route1: ActivatedRoute, private service: MasterService) {
    this.InternalConsumptionForm = fb.group({
      compNo: [''],
      compileName: [''],
      compileId: [''],
      locId: [''],
      subInventory: ['', Validators.required],
      segmentName: ['', Validators.required],
      segment11: [''],
      segment2: [''],
      segment3: [''],
      segment4: [''],
      lookupValueDesc1: [''],
      lookupValueDesc2: [''],
      lookupValueDesc3: [''],
      lookupValueDesc4: [''],
      segment5: [''],
      trans: [''],
      lookupValueDesc5: [''],
      codeCombinationId: [''],
      JobNo:[],
      compileType: ['', Validators.required],
      reason: ['', Validators.required],
      compileStatus: [''],
      approvedBy: ['', Validators.required],
      description: [''],
      totalCompileItems: [''],
      totalItemValue: [''],
      compileDate: ['', Validators.required],
      segment: [''],
      itemId: [''],
      Adjustment: [''],
      Approve: [''],
      View1: [''],
      Floor: [''],
      Rack: [''],
      RackNo: [''],
      Row: [''],
      RowNo: [''],
      attribute1: [],
      attribute2: [],
      name:[],
      cycleLinesList: this.fb.array([]),

    })
  }
  cycleLinesList(): FormArray {
    return this.InternalConsumptionForm.get("cycleLinesList") as FormArray
  }
  newcycleLinesList(): FormGroup {
    return this.fb.group({
      compileId: [''],
      compileLineId: [''],
      LinNo: [''],
      invItemId: [''],
      adjustmentQty: [''],
      physicalQty: ['', Validators.required],
      systemQty: [''],
      locatorId: [''],
      subInventory: [''],
      avlqty: [''],
      itemUnitCost: [''],
      uom: [''],
      onHandQty: [''],
      id: [''],
      description: [''],
      divisionId: [''],
      entryStatusCode: [''],
      LocatorSegment: ['', Validators.required],
      resveQty: [''],
      locId: [''],
      itemId: [''],
      onHnQty: [''],
      segment: ['', Validators.required],
      lineNumber: [''],
    })
  }

  addnewcycleLinesList(i: number) {
    if (i > -1) {
      var trxLnArr1 = this.InternalConsumptionForm.get('cycleLinesList').value;
      var itemqty = trxLnArr1[i].physicalQty;
      var item1 = trxLnArr1[i].segment;
      // alert(item1);
      if (item1 === '') {
        alert('Please enter Blank Data');
        return;
      }


      if (!this.itemMap.has(item1)) {
        this.reservePos(i);
      }
      else {
        this.deleteReserveLinewise(i);
        this.reservePos(i);
      }
    }
    var len1 = this.cycleLinesList().length;
    if (len1 == i + 1) {

      this.cycleLinesList().push(this.newcycleLinesList());
      var patch = this.InternalConsumptionForm.get('cycleLinesList') as FormArray;
      var len = this.cycleLinesList().length;
      (patch.controls[len - 1]).patchValue(
        {
          lineNumber: len,

        }

      );
      var btnrm = document.getElementById("btnrm" + i) as HTMLInputElement;
      if (document.contains(btnrm)) {
        (document.getElementById("btnrm" + i) as HTMLInputElement).disabled = false;
        this.InternalConsumptionForm.get('compileType').disable();
        this.InternalConsumptionForm.get('reason').disable();
        // this.Item[i+1].nativeElement.focus();
        // (document.getElementById('btnrm'+i+1) as InputElement).disabled = true;
      }
    }

    // this.displayRemoveRow[i]=true;
    // alert(i);
  }
  removenewcycleLinesList(trxLineIndex) {
    var len1 = this.cycleLinesList().length;
    if (len1 === 1) {
      alert('You can not delete the line');
      return;
    }
    var trxLnArr1 = this.InternalConsumptionForm.get('cycleLinesList').value;
    var itemid = trxLnArr1[trxLineIndex].segment;
    // alert(itemid+'Delete');
    if (itemid != null) {
      this.deleteReserveLinewise(trxLineIndex);
      this.itemMap.delete(itemid);
    }
    this.cycleLinesList().removeAt(trxLineIndex);
    var patch = this.InternalConsumptionForm.get('cycleLinesList') as FormArray;
    var len = this.cycleLinesList().length;
    (patch.controls[len - 1]).patchValue(
      {
        lineNumber: len,
      }
    );

    var btnrm = document.getElementById("btnrm" + (trxLineIndex - 1)) as HTMLInputElement;
    if (document.contains(btnrm)) {
      (document.getElementById("btnrm" + (trxLineIndex - 1)) as HTMLInputElement).disabled = true;
      // (document.getElementById('btnrm'+i+1) as HTMLInputElement).disabled = true;
    }

    this.displayLocator[trxLineIndex] = true;
  }


  ngOnInit(): void {


    this.locId = Number(sessionStorage.getItem('locId'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    // document.getElementById("processButton").setAttribute("disabled","disabled");
    this.approvedBy = (sessionStorage.getItem('name'));

    this.displayLocator[0] = false;



    this.service.subInvCode2(this.deptId, this.divisionId).subscribe(
      data => {
        this.subInvCode = data;
        console.log(data);
        this.subInventory = this.subInvCode.subInventoryCode;
        // alert('subInventoryCode');
      });
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
    this.service.TransactionTypeIC().subscribe(
      data => {
        this.transType = data;
        this.InternalConsumptionForm.patchValue({
          compileType: data[0].transactionTypeName,
          compileId: data[0].transactionTypeId
        })
      }
    );
    this.service.ReasonList().subscribe(
      data => {
        this.reasonlist = data;
        let selreasonlist: any = [];
        for (let i = 0; i < this.reasonlist.length; i++) {
          if (this.reasonlist[i].reasonName.includes('IC')) {
            selreasonlist.push(this.reasonlist[i]);
          }
        }
        this.reasonlist = selreasonlist;
      }
    )
    this.service.TypeList().subscribe(
      data => {
        this.TypeList = data;
      }
    )

    this.service.issueByList(this.locId, this.deptId, this.divisionId).subscribe
      (data => {
        this.issueByList = data;
        console.log(this.issueByList);
      });


    this.addnewcycleLinesList(-1);

    var patch = this.InternalConsumptionForm.get('trxLinesList') as FormArray

    (patch.controls[0]).patchValue(
      {
        lineNumber: 1,
      }

    );
    this.displayRemoveRow[0] = false;
  }
  InternalConsumption(InternalConsumptionForm: any) { }

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

  close() {
    this.router.navigate(['admin']);
  }

  onOptiongetItem(event: any, i) {
    if (this.currentOp === 'SEARCH') {
      return;
    }

    let select1 = this.ItemIdList.find(d => d.SEGMENT === event);
    if (select1 != undefined) {
      var trxLnArr1 = this.InternalConsumptionForm.get('cycleLinesList') as FormArray;
      var trxLnArr = this.InternalConsumptionForm.get('cycleLinesList').value;
      trxLnArr1.controls[i].patchValue({ invItemId: select1.itemId })
      var compId = this.InternalConsumptionForm.get('compileId').value;
      var compileType1 = this.InternalConsumptionForm.get('compileType').value;
      var subcode = this.InternalConsumptionForm.get('subInventory').value;
      this.displayheader = false;
      this.service.getItemDetail(select1.itemId).subscribe
        (data => {
          this.getItemDetail = data;
          // alert("this.getItemDetail.description" + this.getItemDetail.description);
          if (this.getItemDetail.description != undefined) {
            trxLnArr1.controls[i].patchValue({ description: this.getItemDetail.description });
            trxLnArr1.controls[i].patchValue({ uom: this.getItemDetail.uom });
            // trxLnArr1.controls[i].patchValue({entryStatusCode:2});
            trxLnArr1.controls[i].patchValue({ subInventory: subcode })
            trxLnArr1.controls[i].patchValue({ locId: Number(sessionStorage.getItem('locId')) })
          }
        });
        var reasonArr1 =this.InternalConsumptionForm.get('reason').value;
        var valOp =this.InternalConsumptionForm.get('name').value;
        if(valOp!=undefined){
        var reasonArray=reasonArr1.split('-');
        var op=valOp.split('-');
        var value1=op[1];
        
        // alert(reasonArray[2]);
        // if(reasonArray[2]!=undefined){
        if(reasonArray[2].includes('OEM') && value1=='MRP'){
          this.service.getCostDetailforWarranty(Number(sessionStorage.getItem('locId')), select1.itemId).subscribe
          (data => {
            this.CostDetail = data;
            trxLnArr1.controls[i].patchValue({ itemUnitCost: this.CostDetail.rate });
            if (this.CostDetail.rate === 0.0) {
              alert(this.CostDetail.segment);
            }
          });
        }
        else if(reasonArray[2].includes('OEM') && value1=='NDP'){
          this.service.getCostDetail(Number(sessionStorage.getItem('locId')), select1.itemId).subscribe
        (data => {
          this.CostDetail = data;
          trxLnArr1.controls[i].patchValue({ itemUnitCost: this.CostDetail.rate });
          if (this.CostDetail.rate === 0.0) {
            alert(this.CostDetail.segment);
          }
        });
        }
        else if(reasonArray[2].includes('EW')){
          this.service.getCostDetailforWarranty(Number(sessionStorage.getItem('locId')), select1.itemId).subscribe
          (data => {
            this.CostDetail = data;
            trxLnArr1.controls[i].patchValue({ itemUnitCost: this.CostDetail.rate });
            if (this.CostDetail.rate === 0.0) {
              alert(this.CostDetail.segment);
            }
          });
        }}
      // }
        else{
      this.service.getCostDetail(Number(sessionStorage.getItem('locId')), select1.itemId).subscribe
        (data => {
          this.CostDetail = data;
          trxLnArr1.controls[i].patchValue({ itemUnitCost: this.CostDetail.rate });
          if (this.CostDetail.rate === 0.0) {
            alert(this.CostDetail.segment);
          }
        });
      }
    
      this.service.getreserqty(Number(sessionStorage.getItem('locId')), select1.itemId).subscribe
        (data => {
          this.resrveqty = data;
          trxLnArr1.controls[i].patchValue({ resveQty: this.resrveqty });
        });
      this.service.getfrmSubLoc(Number(sessionStorage.getItem('locId')), select1.itemId, this.subInvCode.subInventoryId).subscribe(
        data => {
          //  this.getfrmSubLoc = data;
          var getfrmSubLoc = data;
          // alert(getfrmSubLoc.segmentName+'SegmentName')


          // alert(i +'i');
          // this.locData[i] = data;
          if (getfrmSubLoc.length == 0) {
            this.displayLocator[i] = false;
          }
          else if (getfrmSubLoc.length == 1) {
            this.displayLocator[i] = false;
            trxLnArr1.controls[i].patchValue({ LocatorSegment: getfrmSubLoc[0].segmentName });
            trxLnArr1.controls[i].patchValue({ locatorId: getfrmSubLoc[0].locatorId })
            trxLnArr1.controls[i].patchValue({ onHandQty: getfrmSubLoc[0].onHandQty });
            trxLnArr1.controls[i].patchValue({ id: getfrmSubLoc[0].id });
            let reserve = trxLnArr[i].resveQty;
            // alert(onHand1+'OnHand');
            //alert(reserve+'reserve');
            let avlqty1 = 0;
            avlqty1 = getfrmSubLoc[0].onHandQty - reserve;
            trxLnArr1.controls[i].patchValue({ avlqty: avlqty1 });
            trxLnArr1.controls[i].patchValue({ resveQty: reserve });

          }
          else {
            // debugger;
            this.getfrmSubLoc = data;
            console.log(this.getfrmSubLoc);
            // trxLnArr1.controls[i].patchValue({LocatorSegment:getfrmSubLoc[0].segmentName});
            // trxLnArr1.controls[i].patchValue({onHandQty:getfrmSubLoc[0].onHandQty});
            trxLnArr1.controls[i].patchValue({ id: getfrmSubLoc[0].id });
            this.displayLocator[i] = true;

          }

        });
    }

  }
  AvailQty(event: any, i) {

    // alert(event.target.value);
    var trxLnArr1 = this.InternalConsumptionForm.get('cycleLinesList') as FormArray;
    var trxLnArr = this.InternalConsumptionForm.get('cycleLinesList').value;
    var itemid = trxLnArr[i].invItemId;
    var locId = trxLnArr[i].LocatorSegment;
    trxLnArr1.controls[i].patchValue({ locatorId: locId });
    //alert(locId+'locatorID');
    var onhandid = trxLnArr[i].id;
    var subcode = trxLnArr[i].subInventory;
    this.service.getonhandqty(Number(sessionStorage.getItem('locId')), this.subInvCode.subInventoryId, locId, itemid).subscribe
      (data => {
        this.onhand = data;
        console.log(this.onhand);
        trxLnArr1.controls[i].patchValue({ onHandQty: data.obj });
        // onHand1=data.obj.onHandQty;


        let reserve = trxLnArr[i].resveQty;
        // alert(onHand1+'OnHand');
        // alert(reserve+'reserve');
        let avlqty1 = 0;
        // alert(data.obj+'qty');
        avlqty1 = data.obj - reserve;
        trxLnArr1.controls[i].patchValue({ avlqty: avlqty1 });
        trxLnArr1.controls[i].patchValue({ resveQty: reserve });
        if (avlqty1 < 0) {
          alert("Transfer is not allowed,Item has Reserve quantity - " + reserve);
          this.cycleLinesList().clear();
          this.addnewcycleLinesList(i);
        }

      });
    console.log(this.onhand);
    //  var trxLnarronha = this.InternalConsumptionForm.get('cycleLinesList').value;

  }
  resetMiscTrans() {
    window.location.reload();
  }

  onLocatorSelection(event: any, i) {
    var trxLnArr1 = this.InternalConsumptionForm.get('cycleLinesList') as FormArray;
    var trxLnArr = this.InternalConsumptionForm.get('cycleLinesList').value;
    var itemid = trxLnArr[i].invItemId;
    var locId = trxLnArr[i].locatorId;
    var onhandid = trxLnArr[i].id;
    var subcode = this.InternalConsumptionForm.get('subInventory').value;
    // let select2= this.subInvCode.find(d=>d.subInventoryCode===subcode);
    let selloc = this.getfrmSubLoc.find(d => d.segmentName === event);
    // alert(selloc.locatorId+'Id')

    this.service.getonhandqty(Number(sessionStorage.getItem('locId')), this.subInvCode.subInventoryId, locId, itemid).subscribe
      (data => {
        this.onhand = data
        trxLnArr1.controls[i].patchValue({ systemQty: this.onhand.onHandQty });
      });

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
  OpenLocator(i) {

    var LocSegment = this.cycleLinesList().controls[i].get('LocatorSegment').value;

    if (LocSegment === null) {
      this.InternalConsumptionForm.get('Floor').reset();
      this.InternalConsumptionForm.get('Rack').reset();
      this.InternalConsumptionForm.get('RackNo').reset();
      this.InternalConsumptionForm.get('Row').reset();
      this.InternalConsumptionForm.get('RowNo').reset();
    }
    if (LocSegment != null) {
      var temp = LocSegment.split('.');
      // alert(temp[0]);
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

    // alert(i);
    var LocSegment = this.InternalConsumptionForm.get('cycleLinesList').value;
    var patch = this.InternalConsumptionForm.get('cycleLinesList') as FormArray;
    LocSegment[i].LocatorSegment = this.InternalConsumptionForm.get('Floor').value + '.' +
      this.InternalConsumptionForm.get('Rack').value + '.' +
      this.InternalConsumptionForm.get('RackNo').value + '.' +
      this.InternalConsumptionForm.get('Row').value + '.' +
      this.InternalConsumptionForm.get('RowNo').value;


    var LocatorSegment1 = LocSegment[i].LocatorSegment;
    // alert(this.LocatorSegment1);
    patch.controls[i].patchValue({ 'LocatorSegment': LocSegment[i].LocatorSegment })

    this.service.LocatorNameList(LocatorSegment1, Number(sessionStorage.getItem('locId')), this.subInvCode.subInventoryId).subscribe
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
          var arraycontrol = this.InternalConsumptionForm.get('cycleLinesList').value;
          patch.controls[i].patchValue({ LocatorSegment: '' });
        }

      });
    this.InternalConsumptionForm.get('Floor').reset();
    this.InternalConsumptionForm.get('Rack').reset();
    this.InternalConsumptionForm.get('RackNo').reset();
    this.InternalConsumptionForm.get('Row').reset();
    this.InternalConsumptionForm.get('RowNo').reset();
    alert('locator search complete')
  }

  openCodeCombination() {
    let SegmentName1 = this.InternalConsumptionForm.get('SegmentName').value;
    if (SegmentName1 === null) {
      this.InternalConsumptionForm.get('segment11').reset();
      this.InternalConsumptionForm.get('segment2').reset();
      this.InternalConsumptionForm.get('segment3').reset();
      this.InternalConsumptionForm.get('segment4').reset();
      this.InternalConsumptionForm.get('segment5').reset();

      this.InternalConsumptionForm.get('lookupValueDesc1').reset();
      this.InternalConsumptionForm.get('lookupValueDesc2').reset();
      this.InternalConsumptionForm.get('lookupValueDesc3').reset();
      this.InternalConsumptionForm.get('lookupValueDesc4').reset();
      this.InternalConsumptionForm.get('lookupValueDesc5').reset();
    }
    if (SegmentName1 != null) {
      var temp = SegmentName1.split('.');
      // alert(temp[0]);
      this.segment11 = temp[0];
      this.segment2 = temp[1];
      this.segment3 = temp[2];
      this.segment4 = temp[3];
      this.segment5 = temp[4];
    }
    this.showModal = true;

  }
  fnCancatination() {
    this.segmentName = this.InternalConsumptionForm.get('segment11').value + '.' +
      this.InternalConsumptionForm.get('segment2').value + '.' +
      this.InternalConsumptionForm.get('segment3').value + '.' +
      this.InternalConsumptionForm.get('segment4').value + '.' +
      this.InternalConsumptionForm.get('segment5').value;

    // alert(this.segmentName);

    this.service.segmentNameList(this.segmentName)
      .subscribe(
        data => {

          this.segmentNameList = data;
          if (this.segmentNameList.code === 200) {
            this.InternalConsumptionForm.patchValue({ codeCombinationId: this.segmentNameList.obj.codeCombinationId });
            if (this.segmentNameList.length == 0) {
              alert('Invalid Code Combination');
            } else {
              console.log(this.segmentNameList);
              this.codeCombinationId = Number(this.segmentNameList.codeCombinationId)
            }
          } else if (this.segmentNameList.code === 400) {
            this.InternalConsumptionForm.patchValue({ segmentName: '' });
            // alert(this.segmentNameList.message);

          }
        }
      );
    this.InternalConsumptionForm.get('segment11').reset();
    this.InternalConsumptionForm.get('segment2').reset();
    this.InternalConsumptionForm.get('segment3').reset();
    this.InternalConsumptionForm.get('segment4').reset();
    this.InternalConsumptionForm.get('segment5').reset();

    this.InternalConsumptionForm.get('lookupValueDesc1').reset();
    this.InternalConsumptionForm.get('lookupValueDesc2').reset();
    this.InternalConsumptionForm.get('lookupValueDesc3').reset();
    this.InternalConsumptionForm.get('lookupValueDesc4').reset();
    this.InternalConsumptionForm.get('lookupValueDesc5').reset();
  }

  reservePos(i) {//alert("Hello");
    var trxLnArr1 = this.InternalConsumptionForm.get('cycleLinesList').value;
    const formValue: InternalConsumption = this.InternalConsumptionForm.value;
    let variants = <FormArray>this.cycleLinesList();
    // alert( this.InternalConsumptionForm.get('compileType').value)
    var transtypeid = this.InternalConsumptionForm.get('compileType').value;
    // alert(transtypeid +'trans')
    // var seltranstyp = this.transType.find(d => d.transactionTypeId === transtypeid);
    // alert(seltranstyp.transactionTypeName);
    var locId1 = this.InternalConsumptionForm.get('locId').value

    let variantFormGroup = <FormGroup>variants.controls[i];
    variantFormGroup.removeControl('reservedQty');
    variantFormGroup.removeControl('transactionNumber');
    variantFormGroup.addControl('transactionTypeId', new FormControl(transtypeid, []));
    variantFormGroup.addControl('locId', new FormControl(locId1, []));
    // variantFormGroup.addControl('itemId', new FormControl(trxLnArr1[i].invItemId, Validators.required));
    variantFormGroup.addControl('reservedQty', new FormControl(trxLnArr1[i].physicalQty, []));
    variantFormGroup.addControl('onHandId', new FormControl(trxLnArr1[i].id, []));
    variantFormGroup.addControl('transactionNumber', new FormControl(transtypeid, []));


    // var reserveinfo=formValue[0];

    this.service.reservePost(variants.value[i]).subscribe((res: any) => {
      //  var obj=res.obj;
      if (res.code === 200) {
        // alert("Record inserted Successfully");
        var IcRow: IcTrans = new IcTrans();
        IcRow.segment = (trxLnArr1[i].segment);
        IcRow.Locator = (trxLnArr1[i].LocatorSegment);
        IcRow.quantity = (trxLnArr1[i].physicalQty);
        this.itemMap.set(trxLnArr1[i].segment, IcRow);
        // (document.getElementById('btnadd'+i) as HTMLInputElement).disabled = true;
      }
      else {
        if (res.code === 400) {
          alert("Code already present in data base");
          this.InternalConsumptionForm.reset();
        }
      }
    }
    );
  }

  validate(i: number, qty1) {//alert("Validate");
    var trxLnArr = this.InternalConsumptionForm.get('cycleLinesList').value;
    var trxLnArr1 = this.InternalConsumptionForm.get('cycleLinesList') as FormArray
    let avalqty = trxLnArr[i].avlqty;
    let qty = trxLnArr[i].physicalQty;
    let uomCode = trxLnArr[i].uom;
    //alert(avalqty+'avalqty');
    //alert(trxLnArr[i].physicalQty +' qty');
    if (qty > avalqty && this.InternalConsumptionForm.get('compileType').value !== 13) {
      alert("You can not enter more than available quantity");
      trxLnArr1.controls[i].patchValue({ physicalQty: '' });
      qty1.focus();
    }
    if (qty <= 0) {
      alert("Please enter quantity more than zero");
      trxLnArr1.controls[i].patchValue({ physicalQty: '' });
      qty1.focus();
    }
    if (uomCode === 'NO') {
      // alert(Number.isInteger(qty)+'Status');
      if (!(Number.isInteger(qty))) {
        alert('Please enter correct No');
        trxLnArr1.controls[i].patchValue({ physicalQty: '' });
      }
    }
  }

  searchByCompileID(itemId) {

    // alert(itemId+'ID')
    var compileId = this.InternalConsumptionForm.get('compileId').value;
    // alert(compileId+'CompileID');
    // let select1=this.ItemIdList.find(d=>d.itemid===itemId);
    // var itemId= select1.itemId
    // alert(itemId+'Item');
    this.service.getsearchByCompId(compileId, itemId).subscribe(
      data => {
        if (data.code === 400) {
          // window.location.reload();
          // alert('hELLO');

        }
        if (data.code === 200) {
          var xx = data.obj;
          console.log(data.obj);
          console.log(xx);
          let patch = this.InternalConsumptionForm.get('cycleLinesList') as FormArray;
          var control = this.InternalConsumptionForm.get('cycleLinesList').value;
          var len = this.cycleLinesList().length;
          // alert(control[0].segment );
          if (len === 1) {
            if (control[0].segment == undefined) {
              // alert('blankline')
            } else {
              var trxlist: FormGroup = this.newcycleLinesList();
              this.cycleLinesList().push(trxlist);
            }
          }

          if (len > 1) {
            var trxlist: FormGroup = this.newcycleLinesList();
            this.cycleLinesList().push(trxlist);
          }

          // alert(len+'len'+xx.segment)
          var i = len - 1;
          // alert('patching at line ' +i);
          patch.controls[i].patchValue(xx[0]);
          // }
          console.log(data.obj);
        }
      }
    )
  }
  search(compNo) {
    // alert('In Search' + compNo);
    if (compNo != undefined) {
      this.currentOp = 'SEARCH';
      var compno = this.InternalConsumptionForm.get('compNo').value;
      var appflag = this.InternalConsumptionForm.get('trans').value;
      this.service.getSearchViewByIc(compno).subscribe
        (data => {
          if (data.code === 400) {
            alert("Can not View data");
          }
          if (data.code === 200) {
            //       // this.lstcomment=data.obj;
            let control = this.InternalConsumptionForm.get('cycleLinesList') as FormArray;
            var len = this.cycleLinesList().length;
            for (let i = 0; i < data.obj.cycleLinesList.length - len; i++) {
              var trxlist: FormGroup = this.newcycleLinesList();
              this.cycleLinesList().push(trxlist);

            }
            // for(let j=0; j<data.obj.cycleLinesList.length-len; j++){
            //  control.controls[j].patchValue(data.obj.cycleLinesList);
            // }

            for (let i = 0; i < this.cycleLinesList().length; i++) {

              control.controls[i].patchValue({
                lineNumber: i + 1
              })
            }

            this.InternalConsumptionForm.patchValue(data.obj);
            this.currentOp = 'INSERT';
            // this.InternalConsumptionForm.get('cycleLinesList').patchValue(data.obj.cycleLinesList);
            this.InternalConsumptionForm.disable();
            // this.dispRow=false;
            this.displayaddButton = false;
            this.displayButton = false;
            // this.InternalConsumptionForm.get('cycleLinesList').disable();
          }
        })
    }
  }

  saveMisc() {
    this.displayButton = true;
    this.displayaddButton = true;
    if (this.InternalConsumptionForm.valid) {
      // this.displayButton=true;
      // this.displayaddButton=true;
      const formValue: InternalConsumption = this.InternalConsumptionForm.getRawValue();
      formValue.attribute2 = this.InternalConsumptionForm.get('compileDate').value;
      formValue.compileType = this.InternalConsumptionForm.get('compileId').value;
      // alert(this.InternalConsumptionForm.get('attribute1').value+'In save')
      var itemCode = this.InternalConsumptionForm.get('attribute1').value;
      // alert(itemCode+'after')
      // debugger;
      if (itemCode != null || itemCode != undefined) {
        var itemCode1=itemCode.split('--');
        formValue.attribute1 = itemCode1[0];
      }
    
      this.service.miscSubmit(formValue).subscribe
        ((res: any) => {
          if (res.code === 200) {
            this.compileName = res.obj.compileName;
            this.totalCompileItems = res.obj.totalCompileItems;
            this.totalItemValue = res.obj.totalItemValue;
            this.compileStatus = res.obj.compileStatus;
            // this.lstcomment=data.obj;
            alert(res.message);
            // this.InternalConsumptionForm.patchValue(obj);
            // let control =this.InternalConsumptionForm.get('cycleLinesList') as FormArray;
            // var len = this.cycleLinesList().length;
            // for(let i=0; i<res.obj.cycleLinesList.length-len; i++){
            //   var trxlist:FormGroup=this.newcycleLinesList();
            //   this.cycleLinesList().push(trxlist);

            this.InternalConsumptionForm.disable();
            this.displayButton = false;
            this.displayaddButton = false;
          }
          else {
            if (res.code === 400) {
              alert(res.message);
              this.InternalConsumptionForm.reset();
            }
          }
        })
    }
    else {

      // alert('else');
      this.HeaderValidation();

    }
  }


  onSelectReason(event) {
    var reasonArr = event.split('-');
    // alert(reasonArr)
    this.service.reasonaccCode(this.locId, reasonArr[0], reasonArr[1]).subscribe(

      data => {
        this.acccodedesc = data;
        // this.InternalConsumptionForm.patchValue({reason:this.acccodedesc.segmentName});
        this.segmentName = this.acccodedesc.segmentName;

      }
    );
    var selreason = this.reasonlist.find(d => d.reasonName === reasonArr[0])
    this.service.WorkShopIcIssue(this.locId, selreason.attribute2).subscribe(
      data => {
        this.workshopIssue = data;
        console.log(data);
      }
    );
    this.service.ItemIdListDept(this.deptId, Number(sessionStorage.getItem('locId')), this.subInvCode.subInventoryId).subscribe(
      data => {
        this.ItemIdList = data;
        // console.log(this.invItemId);
      });

  }
  keytab(event, maxLength, nxtEle) {
    console.log(event);
    // let sib=event.srcElement.nextElementSibling;
    // alert(sib);
    // alert(event.target.value+'Event'+event.target.value.length);
    if (event.target.value.length === maxLength) {
      // alert('Focus'+nxtEle);
      if (nxtEle === 'input2') {
        // alert('Input2');
        this.input2.nativeElement.focus();
      }
      if (nxtEle === 'input3') {
        this.input3.nativeElement.focus();
      }
      if (nxtEle === 'input4') {
        this.input4.nativeElement.focus();
      }
      if (nxtEle === 'input5') {
        this.input5.nativeElement.focus();
      }
      if (nxtEle === 'input6') {
        this.input6.nativeElement.focus();
      }
    }


  }


  HeaderValidation() {
    var isValid: boolean = false;
    Object.keys(this.InternalConsumptionForm.controls).forEach(
      (key) => {
        const control = this.InternalConsumptionForm.controls[key] as FormControl | FormArray | FormGroup

        if (control instanceof FormControl) {
          control.markAsTouched();
        }
        else if (control instanceof FormArray) {

          (<FormArray>this.InternalConsumptionForm.get('cycleLinesList')).controls.forEach((group: FormGroup) => {
            (<any>Object).values(group.controls).forEach((control: FormControl) => {
              control.markAsTouched();
            })
          });
        }
        else if (control instanceof FormGroup) { }

      });

  }



  getGroupControl(fieldName) {
    return (this.InternalConsumptionForm.get(fieldName));
  }

  getGroupControllinewise(index, fieldName) {
    // alert('nam'+fieldName);
    return (<FormArray>this.InternalConsumptionForm.get('cycleLinesList')).at(index).get(fieldName);

  }
  deleteReserve() {
    var transtypeid = this.InternalConsumptionForm.get('compileType').value;
    var seltranstyp = this.transType.find(d => d.transactionTypeId === transtypeid);
    this.service.reserveDelete(seltranstyp.transactionTypeName, Number(sessionStorage.getItem('locId'))).subscribe((res: any) => {
      //  var obj=res.obj;
      if (res.code === 200) {
        // alert(res.message);
      }
    });
  }
  deleteReserveLinewise(i) {
    var transtypeid = this.InternalConsumptionForm.get('compileType').value;
    var seltranstyp = this.transType.find(d => d.transactionTypeId === transtypeid);
    var trxLnArr1 = this.InternalConsumptionForm.get('cycleLinesList').value;
    var itemid = trxLnArr1[i].itemId;
    this.service.reserveDeleteLine(transtypeid, Number(sessionStorage.getItem('locId')), itemid).subscribe((res: any) => {
      //  var obj=res.obj;
      if (res.code === 200) {
        // alert(res.message);
      }
    });
  }



  userList1: any[] = [];
 lastkeydown2: number = 0;

 getUserIdsFirstWay($event) {
  let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
  this.userList1 = [];

  if (userId.length > 2) {
    if ($event.timeStamp - this.lastkeydown2 > 200) {
      this.userList1 = this.searchFromArray(this.workshopIssue, userId);
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


searchByJobNo(){
   alert(this.JobNo);
  //  var jobno=(this.InternalConsumptionForm.get('JobNo').value);
  if(this.JobNo==null || this.JobNo==undefined || this.JobNo.trim()=='') {
   alert ("Enter a Valid Job Card No."); return;}
   this.JobNo=this.JobNo.toUpperCase();

  this.service.getsearchByIC(this.JobNo).subscribe(
    data=>{
      // if (data.code==200){
         this.jobData=data;
         console.log(this.jobData);
         
        // } 
        // else if (data.code==400){
        //   alert(data.message)
        // }  
    }
  )
}

calculatewarranty(event){
  alert(event.target.value+'warr');
  var value=event.target.value.split('--');
  var jobNo=value[0]
var wIregNum=this.workshopIssue.find(d=>d.jobCardNum===jobNo);
console.log(wIregNum);
var regNum=wIregNum.regNo;
this.service.getVehRegDetail(regNum).subscribe(
  data=>{
    this.getVehRegDetails = data;
    // debugger;
     this.name=this.getVehRegDetails.name
  }
);
}

}
