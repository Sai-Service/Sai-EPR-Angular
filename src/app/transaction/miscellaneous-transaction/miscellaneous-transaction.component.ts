import { DatePipe, PathLocationStrategy } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  HostListener,
  ElementRef,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { controllers } from 'chart.js';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';
import {} from 'rxjs';
import { listenerCount } from 'events';

interface Imiscellaneous {
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
}
export class miscTrans {
  segment: string;
  Locator: string;
  quantity: number;
}

export class ItemLocator {
  public locatorId: number;
  public segmentName: string;
}
@Component({
  selector: 'app-miscellaneous-transaction',
  templateUrl: './miscellaneous-transaction.component.html',
  styleUrls: ['./miscellaneous-transaction.component.css'],
})
export class MiscellaneousTransactionComponent implements OnInit {
  miscellaneousForm: FormGroup;
  public ItemIdList: any[];
  public onHandItemList: any[];
  public subInvCode: any;
  compNo: string;
  onHandQty: number;
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
  displayRemoveRow: Array<boolean> = [];
  displayaddButton: boolean = true;
  displayremButton: boolean = false;
  addRow: boolean = true;
  public InterBrancList: Array<string> = [];
  public BranchList: Array<string> = [];
  public CostCenterList: Array<string> = [];
  public NaturalAccountList: Array<string> = [];
  public locIdList: Array<string> = [];
  public TypeList: Array<string> = [];
  public issueByList: Array<string> = [];
  segmentNameList: any;
  codeCombinationId: number;
  compileType: number;
  reason: string;
  reasonlist: any;
  compileStatus: string = 'OPEN';
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

  type1: string;
  dispheader: boolean = false;
  displable: boolean = false;
  pipe = new DatePipe('en-US');
  now = new Date();
  compileDate = this.pipe.transform(this.now, 'dd-MM-yyyy');
  currentOp: string;
  dispRow: boolean = true;

  public itemMap = new Map<string, miscTrans>();

  @ViewChild('myinput') myinput: ElementRef;
  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;
  @ViewChild('input4') input4: ElementRef;
  @ViewChild('input5') input5: ElementRef;
  @ViewChild('input6') input6: ElementRef;
  @ViewChild('Item') Item: ElementRef;
  @ViewChild('desc') desc: ElementRef;
  @ViewChild('stkAdjForm') stkAdjForm: ElementRef;
  // @ViewChild("suppCode1") suppCode1: ElementRef;
  ngAfterViewInit() {
    this.myinput.nativeElement.focus();
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route1: ActivatedRoute,
    private service: MasterService
  ) {
    this.miscellaneousForm = fb.group({
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
      cycleLinesList: this.fb.array([]),
    });
  }
  cycleLinesList(): FormArray {
    return this.miscellaneousForm.get('cycleLinesList') as FormArray;
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
    });
  }

  addnewcycleLinesList(i: number) {
    // alert(i);
    if (i > -1) {
      var trxLnArr1 = this.miscellaneousForm.get('cycleLinesList').value;
      var itemqty = trxLnArr1[i].physicalQty;
      var item1 = trxLnArr1[i].segment;
      var loca = trxLnArr1[i].LocatorSegment;
      //  alert(item1+itemqty+loca);
      if (
        item1 === '' ||
        itemqty === undefined ||
        loca === undefined ||
        loca === '' ||
        itemqty === ''
      ) {
        alert('Please enter Blank Data');
        return;
      }
    }
    //alert('hi');
    // alert(this.miscellaneousForm.get('compileType').value+'value');
    // this.cycleLinesList().push(this.newcycleLinesList());
    if (i > -1 && this.miscellaneousForm.get('compileType').value === 4) {
      // if(i>-1)
      //alert('hi');

      if (!this.itemMap.has(item1)) {
        this.reservePos(i);
      } else {
        // debugger;
        this.deleteReserveLinewise(i);
        this.reservePos(i);
      }
    }
    var len1 = this.cycleLinesList().length;
    // alert(len1+'Length'+i);
    if (len1 == i + 1) {
      this.cycleLinesList().push(this.newcycleLinesList());

      // (<any>this.stockTranferForm.get('segment')).nativeElement.focus();
      var patch = this.miscellaneousForm.get('cycleLinesList') as FormArray;
      var len = this.cycleLinesList().length;
      patch.controls[len - 1].patchValue({
        lineNumber: len,
      });
      var btnrm = document.getElementById('btnrm' + i) as HTMLInputElement;
      if (document.contains(btnrm)) {
        (document.getElementById('btnrm' + i) as HTMLInputElement).disabled =
          false;
        this.miscellaneousForm.get('compileType').disable();
        this.miscellaneousForm.get('reason').disable();
        this.miscellaneousForm.get('approvedBy').disable();
        // this.miscellaneousForm.get('cycleLinesList').get('LocatorSegment').disable();

        // this.Item[i+1].nativeElement.focus();
        // (document.getElementById('btnrm'+i+1) as HTMLInputElement).disabled = true;`
      }
      var cylArr = this.miscellaneousForm.get('cycleLinesList') as FormArray;
      // alert(cylArr)/
      // debugger;
      // cylArr.controls[i].get('LocatorSegment').disable();
      // cylArr.controls[0].get('physicalQty').disable();
      // this.miscellaneousForm.get('cycleLinesList').at(0).get('physicalQty').disable()
      this.cycleLinesList().controls[len - 1].get('physicalQty').disable();
      this.cycleLinesList().controls[len - 1].get('LocatorSegment').disable();


    }
    var len1 = this.cycleLinesList().length;
    var  ln = i+1
    alert(ln+'line')
      this.setFocus('segment' + ln )
    // this.displayRemoveRow[i]=true;
    // alert(i);
  }
  removenewcycleLinesList(trxLineIndex) {
    alert(trxLineIndex);
    var len1 = this.cycleLinesList().length;
    if (len1 === 1) {
      alert('You can not delete the line');
      return;
    }
    var trxLnArr1 = this.miscellaneousForm.get('cycleLinesList').value;
    var itemid = trxLnArr1[trxLineIndex].segment;
    // debugger;
    this.cycleLinesList().removeAt(trxLineIndex);
    // alert(itemid+'Delete');
    if (itemid != null || itemid !=' ' || itemid !=undefined) {
      this.deleteReserveLinewise(trxLineIndex);
      this.itemMap.delete(itemid);
    }
    this.cycleLinesList().removeAt(trxLineIndex+1);
    var formVal = this.miscellaneousForm.get('cycleLinesList').value;
    var patch = this.miscellaneousForm.get('cycleLinesList') as FormArray;
    var len = this.cycleLinesList().length;
    for (let x=0; x<formVal.length; x++){
      patch.controls[x].patchValue({
        lineNumber: x+1,
      });
    }


    var btnrm = document.getElementById(
      'btnrm' + (trxLineIndex - 1)
    ) as HTMLInputElement;
    if (document.contains(btnrm)) {
      (
        document.getElementById(
          'btnrm' + (trxLineIndex - 1)
        ) as HTMLInputElement
      ).disabled = true;
      // (document.getElementById('btnrm'+i+1) as HTMLInputElement).disabled = true;
    }

    this.displayLocator[trxLineIndex] = false;
  }
  ngOnInit(): void {
    // alert(this.route1.queryParams+'hell')
    console.log(this.route1.queryParams + 'hell');
    this.route1.queryParams.subscribe((params) => {
      console.log(params.type1);
      let id = params.type1;
      // alert(id+'ID');
      if (id != undefined) {
        this.dispheader = true;
        this.displable = true;
      }
    });

    this.locId = Number(sessionStorage.getItem('locId'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    // document.getElementById("processButton").setAttribute("disabled","disabled");
    this.approvedBy = sessionStorage.getItem('name');

    this.displayLocator[0] = false;

    this.service.subInvCode2(this.deptId, this.divisionId).subscribe((data) => {
      this.subInvCode = data;
      console.log(data);
      this.subInventory = this.subInvCode.subInventoryCode;
      // alert('subInventoryCode');
    });
    this.service.BranchList().subscribe((data) => {
      this.BranchList = data;
      console.log(this.BranchList);
    });
    this.service.CostCenterList().subscribe((data) => {
      this.CostCenterList = data;
      console.log(this.CostCenterList);
    });
    this.service.NaturalAccountList().subscribe((data) => {
      this.NaturalAccountList = data;
      console.log(this.NaturalAccountList);
    });
    this.service.InterBrancList().subscribe((data) => {
      this.InterBrancList = data;
      console.log(this.InterBrancList);
    });
    this.service.locationCodeList().subscribe((data) => {
      this.locIdList = data;
      console.log(this.locIdList);
    });
    this.service.TransactionTypemisc().subscribe((data) => {
      this.transType = data;
      if (this.dispheader === true) {
        // this.miscellaneousForm.reset();
        //  alert('In 1st If'+this.transType.length);
        for (let i = 0; i < this.transType.length; i++) {
          //  alert('In For');
          if (this.transType[i].transactionTypeId === 13) {
            //  alert('In If');
            this.transType.splice(i, 1);
          }
        }
      }
    });
    this.service.ReasonList().subscribe((data) => {
      this.reasonlist = data;
      let selreasonlist: any = [];
      for (let i = 0; i < this.reasonlist.length; i++) {
        if (this.reasonlist[i].reasonName.includes('SA')) {
          selreasonlist.push(this.reasonlist[i]);
        }
      }
      this.reasonlist = selreasonlist;
      //  let currReason = this.reasonlist.filter((reasonName:string) => (reasonName.includes('IC')));
      // this.selCustomer = currCustomer[0];
    });
    this.service.TypeList().subscribe((data) => {
      this.TypeList = data;
    });

    this.service
      .issueByList(this.locId, this.deptId, this.divisionId)
      .subscribe((data) => {
        this.issueByList = data;
        console.log(this.issueByList);
      });

    //   this.addnewcycleLinesList(-1);

    //   var patch = this.miscellaneousForm.get('trxLinesList') as  FormArray

    //   (patch.controls[0]).patchValue(
    //  {
    //    lineNumber: 1,
    //  }

    //  );
    //  this.displayRemoveRow[0] = false;
    //  this.route1.queryParams
    //   .filter(params => params.type1)
    //   .subscribe(params => {
    //     console.log(params); // { order: "popular" }

    //     this.type1 = params.type1;
    //     alert('sub'+this.sub)
    //     console.log(this.type1); // popular
    //   }
    // );

    //  alert('sub'+this.sub);
  }
  miscellaneous(miscellaneousForm: any) {}

  onTabkeyPress(event, flag: boolean, component: string) {
    var k;
    k = event.target.value;

    if (flag == true) {
      // alert(k+ '---'+k.includes('Select')+ 'K' +component);
      if (k === '') {
        return;
      } else if (component === 'list' && k.includes('Select')) {
        alert('Please Select ProperValue !!');

        // event.target.focus();
        return;
      }
    }
  }

  onOptionTypeSelect(event) {
    this.addnewcycleLinesList(-1);
    this.compileType = event;
    // alert(event);
    if (event === 13) {
      this.service
        .searchByItemSegmentDiv(this.divisionId, '36DH1601')
        .subscribe((data) => {
          this.ItemIdList = data;
          // this.Select(data[0].itemId);
          //  this.onOptiongetItem(itemCode, i);
        });
    }
    if (event === 4) {
      this.service
        .searchByItemSegmentDiv(this.divisionId, '36DH1601')
        .subscribe((data) => {
          this.ItemIdList = data;
          // this.Select(data[0].itemId);
          //  this.onOptiongetItem(itemCode, i);
        });
    }
    var patch = this.miscellaneousForm.get('trxLinesList') as FormArray;
    if (patch != null) {
      patch.controls[0].patchValue({
        lineNumber: 1,
      });
      this.displayRemoveRow[0] = false;
    }
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
        event.target.value = event.target.value.toUpperCase();
        this.input2.nativeElement.focus();
      }
      if (nxtEle === 'input3') {
        event.target.value = event.target.value.toUpperCase();
        this.input3.nativeElement.focus();
      }
      if (nxtEle === 'input4') {
        event.target.value = event.target.value.toUpperCase();
        this.input4.nativeElement.focus();
      }
      if (nxtEle === 'input5') {
        event.target.value = event.target.value.toUpperCase();
        this.input5.nativeElement.focus();
      }
      if (nxtEle === 'input6') {
        this.input6.nativeElement.focus();
      }
    }
  }

  filterRecord(event, i) {
    var trxType = this.miscellaneousForm.get('compileType').value;

    var itemCode = event.target.value;
    if (event.keyCode == 13) {
      // enter keycode
      if (itemCode.length == 8) {
        if (this.ItemIdList.length <= 1) {
          if (trxType === 4) {
            // alert('inside if--');
            this.service
              .ItemIdListDeptByCode(
                this.deptId,
                Number(sessionStorage.getItem('locId')),
                this.subInvCode.subInventoryId,
                itemCode
              )
              .subscribe((data) => {
                this.ItemIdList = data;
                this.onOptiongetItem(itemCode, i);
              });
          } else {
            this.service
              .searchByItemSegmentDiv(this.divisionId, itemCode.toUpperCase())
              .subscribe((data) => {
                this.ItemIdList = data;
                // this.Select(data[0].itemId);
                this.onOptiongetItem(itemCode, i);
              });
          }
        }else{
          this.onOptiongetItem(itemCode, i);
        }

        return;
      } else if (itemCode.length >= 4) {
        alert(trxType);
        if (trxType === 4) {
          // alert('inside if');
          this.service
            .ItemIdListDeptByCode(
              this.deptId,
              Number(sessionStorage.getItem('locId')),
              this.subInvCode.subInventoryId,
              itemCode
            )
            .subscribe((data) => {
              this.ItemIdList = data;
            });
        } else {
          this.service
            .searchByItemSegmentDiv(this.divisionId, itemCode.toUpperCase())
            .subscribe((data) => {
              this.ItemIdList = data;
              // this.Select(data[0].itemId);
              //  this.onOptiongetItem(itemCode, i);
            });
        }
      } else {
        alert('Please Enter 4 characters of item number!!');
        return;
      }
    }
  }

  getInvItemId($event) {
    // alert('in getInvItemId')
    let userId = (<HTMLInputElement>(
      document.getElementById('invItemIdFirstWay')
    )).value;
    this.userList2 = [];
    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList2 = this.searchFromArray1(this.ItemIdList, userId);
      }
    }
  }
  searchFromArray1(arr, regex) {
    let matches = [],
      i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  }

  close() {
    this.router.navigate(['admin']);
    this.deleteReserve();
  }

  // onOptionItemDetails(event:any,i){

  //    var trxLnArr=this.miscellaneousForm.get('cycleLinesList').value;
  //   // var itemid=trxLnArr[i].itemId;
  //   // alert(event);
  //   let select1=this.ItemIdList.find(d=>d.SEGMENT===event);
  //    if(select1!=undefined)
  //    {
  //   console.log(select1);
  //   // alert(select1.itemId+"itemId")
  //   var itemId= select1.itemId
  //   var trxLnArr1=this.miscellaneousForm.get('cycleLinesList')as FormArray;
  //   trxLnArr1.controls[i].patchValue({invItemId:select1.itemId});
  //   var subcode=this.miscellaneousForm.get('subInventory').value;
  //   // alert(subcode+'Subcode');
  //  this.service.getItemDetail(select1.itemId).subscribe
  // (data => {this.getItemDetail = data;
  //   // alert("this.getItemDetail.description" + this.getItemDetail.description);
  //   if(this.getItemDetail.description !=undefined){
  //     trxLnArr1.controls[i].patchValue({description: this.getItemDetail.description});
  //     trxLnArr1.controls[i].patchValue({uom:this.getItemDetail.uom});
  //     trxLnArr1.controls[i].patchValue({entryStatusCode:"Manual"});
  //     trxLnArr1.controls[i].patchValue({subInventory:subcode})
  //     trxLnArr1.controls[i].patchValue({locId:Number(sessionStorage.getItem('locId'))})
  //   }
  // } );
  // // alert(itemId +'ItemName');
  // this.service.getCostDetail(Number(sessionStorage.getItem('locId')),itemId).subscribe
  // (data =>{
  //   this.CostDetail=data;
  //   trxLnArr1.controls[i].patchValue({itemUnitCost:this.CostDetail.rate});
  // });
  // //   ////////////////
  // //   alert(this.locId +"Loc");
  // //   alert('this.itemId '+this.itemId )
  // //   var subInvCode = this.miscellaneousForm.get('subInventory').value;
  // //   // var itemId = this.miscellaneousForm.get('itemId').value;
  // //   alert(select1.itemId)
  // //   alert(subInvCode);
  // //   this.service.getItemDetail11(Number(sessionStorage.getItem('locId')),itemId,subInvCode).subscribe
  // //   (data =>{ this.getItemDetail1 = data
  // // var sysQty = this.getItemDetail1.onHnQty
  // // var LocName=this.getItemDetail1.locatorName
  // //      trxLnArr1.controls[i].patchValue({systemQty: sysQty });
  // //      trxLnArr1.controls[i].patchValue({LocatorSegment:LocName});
  // //      trxLnArr1.controls[i].patchValue({entryStatusCode:'Process'});
  // //     })

  //   }
  // }

  onOptiongetItem(event: any, i) {
    if (this.currentOp === 'SEARCH') {
      return;
    }
    // alert('onOptiongetItem' + event);
    var trxLnArr1 = this.miscellaneousForm.get('cycleLinesList') as FormArray;
    var trxLnArr = this.miscellaneousForm.get('cycleLinesList').value;
    // trxLnArr1.controls[i].get('LocatorSegment').disable();
    var trxType = this.miscellaneousForm.get('compileType').value;
    let select1 = null;
    if (trxType === 4) {
      select1 = this.ItemIdList.find((d) => d.SEGMENT === event);
    } else {
      select1 = this.ItemIdList.find((d) => d.segment === event);
    }
    if (select1 != null) {
      // var trxLnArr1 = this.miscellaneousForm.get('cycleLinesList') as FormArray;
      // var trxLnArr = this.miscellaneousForm.get('cycleLinesList').value;
      trxLnArr1.controls[i].patchValue({ invItemId: select1.itemId });
      var compId = this.miscellaneousForm.get('compileId').value;
      var compileType1 = this.miscellaneousForm.get('compileType').value;
      var subcode = this.miscellaneousForm.get('subInventory').value;
      // let select2= this.subInvCode.find(d=>d.subInventoryCode===subcode);
      //  alert(select2.subInventoryId+'Subcode');
      // alert(compId);
      // alert(compLnId+'CompileLineId')
      this.displayheader = false;
      this.service.getItemDetail(select1.itemId).subscribe((data) => {
        this.getItemDetail = data;
        // alert("this.getItemDetail.description" + this.getItemDetail.description);
        if (this.getItemDetail.description != undefined) {
          trxLnArr1.controls[i].patchValue({
            description: this.getItemDetail.description,
          });
          trxLnArr1.controls[i].patchValue({ uom: this.getItemDetail.uom });
          // trxLnArr1.controls[i].patchValue({entryStatusCode:2});
          trxLnArr1.controls[i].patchValue({ subInventory: subcode });
          trxLnArr1.controls[i].patchValue({
            locId: Number(sessionStorage.getItem('locId')),
          });
          this.cycleLinesList().controls[i].get('LocatorSegment').enable();
          this.cycleLinesList().controls[i].get('physicalQty').enable();
          this.setFocus('physicalQty'+(i));
        }
      });
      this.service
        .getCostDetail(Number(sessionStorage.getItem('locId')), select1.itemId)
        .subscribe((data) => {
          this.CostDetail = data;
          trxLnArr1.controls[i].patchValue({
            itemUnitCost: this.CostDetail.rate,
          });
          if (this.CostDetail.rate === 0.0) {
            alert(this.CostDetail.segment);
          }
        });
      this.service
        .getreserqty(Number(sessionStorage.getItem('locId')), select1.itemId)
        .subscribe((data) => {
          this.resrveqty = data;
          trxLnArr1.controls[i].patchValue({ resveQty: this.resrveqty });
        });
      this.service
        .getfrmSubLoc(
          Number(sessionStorage.getItem('locId')),
          select1.itemId,
          this.subInvCode.subInventoryId
        )
        .subscribe((data) => {
          //  this.getfrmSubLoc = data;
          var getfrmSubLoc = data;
          // alert(getfrmSubLoc.segmentName+'SegmentName')

          if (getfrmSubLoc != '') {
            // alert(i +'i');
            // this.locData[i] = data;
            if (getfrmSubLoc.length == 0) {
              this.displayLocator[i] = false;
            } else if (getfrmSubLoc.length == 1) {
              this.displayLocator[i] = false;
              trxLnArr1.controls[i].patchValue({
                LocatorSegment: getfrmSubLoc[0].segmentName,
              });
              trxLnArr1.controls[i].patchValue({
                locatorId: getfrmSubLoc[0].locatorId,
              });
              trxLnArr1.controls[i].patchValue({
                onHandQty: getfrmSubLoc[0].onHandQty,
              });
              trxLnArr1.controls[i].patchValue({ id: getfrmSubLoc[0].id });
              let reserve = trxLnArr[i].resveQty;
              // alert(onHand1+'OnHand');
              //alert(reserve+'reserve');
              let avlqty1 = 0;
              avlqty1 = getfrmSubLoc[0].onHandQty - reserve;
              trxLnArr1.controls[i].patchValue({ avlqty: avlqty1 });
              trxLnArr1.controls[i].patchValue({ resveQty: reserve });
            } else {
              // debugger;
              this.getfrmSubLoc = data;
              console.log(this.getfrmSubLoc);
              // trxLnArr1.controls[i].patchValue({LocatorSegment:getfrmSubLoc[0].segmentName});
              // trxLnArr1.controls[i].patchValue({onHandQty:getfrmSubLoc[0].onHandQty});
              trxLnArr1.controls[i].patchValue({ id: getfrmSubLoc[0].id });
              this.displayLocator[i] = true;
            }
          } else {
            this.service
              .getItemLoc(
                this.locId,
                this.subInvCode.subInventoryId,
                select1.itemId
              )
              .subscribe((data) => {
                getfrmSubLoc = data;
                this.displayLocator[i] = false;
                trxLnArr1.controls[i].patchValue({
                  LocatorSegment: getfrmSubLoc[0].segmentName,
                });
                trxLnArr1.controls[i].patchValue({
                  locatorId: getfrmSubLoc[0].locatorId,
                });
              });
          }
          this.setFocus('physicalQty'+(i+1));
        });
        // this.setFocus('physicalQty'+(i+1));
    } else {
      alert('item not found');
    }
  }
  AvailQty(event: any, i) {
    // alert(event.target.value);
    var trxLnArr1 = this.miscellaneousForm.get('cycleLinesList') as FormArray;
    var trxLnArr = this.miscellaneousForm.get('cycleLinesList').value;
    var itemid = trxLnArr[i].invItemId;
    var locId = trxLnArr[i].LocatorSegment;
    trxLnArr1.controls[i].patchValue({ locatorId: locId });
    //alert(locId+'locatorID');
    var onhandid = trxLnArr[i].id;
    var subcode = trxLnArr[i].subInventory;
    //alert(subcode);
    // let select2= this.subInvCode.find(d=>d.subInventoryCode===subcode);
    //alert(select2.subInventoryId+'Id')
    //alert(event);
    // var onHand1:number;
    this.service
      .getonhandqty(
        Number(sessionStorage.getItem('locId')),
        this.subInvCode.subInventoryId,
        locId,
        itemid
      )
      .subscribe((data) => {
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
          alert(
            'Transfer is not allowed,Item has Reserve quantity - ' + reserve
          );
          this.cycleLinesList().clear();
          this.addnewcycleLinesList(i);
        }
      });
    console.log(this.onhand);
    //  var trxLnarronha = this.miscellaneousForm.get('cycleLinesList').value;
  }
  resetMiscTrans() {
    this.deleteReserve();
    window.location.reload();
  }

  onLocatorSelection(event: any, i) {
    var trxLnArr1 = this.miscellaneousForm.get('cycleLinesList') as FormArray;
    var trxLnArr = this.miscellaneousForm.get('cycleLinesList').value;
    var itemid = trxLnArr[i].invItemId;
    var locId = trxLnArr[i].locatorId;
    var onhandid = trxLnArr[i].id;
    var subcode = this.miscellaneousForm.get('subInventory').value;
    // let select2= this.subInvCode.find(d=>d.subInventoryCode===subcode);
    let selloc = this.getfrmSubLoc.find((d) => d.segmentName === event);
    // alert(selloc.locatorId+'Id')

    this.service
      .getonhandqty(
        Number(sessionStorage.getItem('locId')),
        this.subInvCode.subInventoryId,
        locId,
        itemid
      )
      .subscribe((data) => {
        this.onhand = data;
        trxLnArr1.controls[i].patchValue({ systemQty: this.onhand.onHandQty });
      });
  }

  onOptionsSelectedBranch(segment: any, lType: string) {
    this.service.getInterBranch(segment, lType).subscribe((data) => {
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
    });
  }
  OpenLocator(i) {
    var LocSegment =
      this.cycleLinesList().controls[i].get('LocatorSegment').value;

    if (LocSegment === null) {
      this.miscellaneousForm.get('Floor').reset();
      this.miscellaneousForm.get('Rack').reset();
      this.miscellaneousForm.get('RackNo').reset();
      this.miscellaneousForm.get('Row').reset();
      this.miscellaneousForm.get('RowNo').reset();
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
    // this.input1.nativeElement.focus();
    this.content = i;
    let a = i + 1;
    this.title = 'Locator :' + a;
  }
  //   $('#myModal1').on('shown.bs.modal', function () {
  //     $('#input1').focus();
  // }

  okLocator(i) {
    // alert(i);
    var LocSegment = this.miscellaneousForm.get('cycleLinesList').value;
    var patch = this.miscellaneousForm.get('cycleLinesList') as FormArray;
    LocSegment[i].LocatorSegment =
      this.miscellaneousForm.get('Floor').value +
      '.' +
      this.miscellaneousForm.get('Rack').value +
      '.' +
      this.miscellaneousForm.get('RackNo').value +
      '.' +
      this.miscellaneousForm.get('Row').value +
      '.' +
      this.miscellaneousForm.get('RowNo').value;

    var LocatorSegment1 = LocSegment[i].LocatorSegment;
    // alert(this.LocatorSegment1);
    patch.controls[i].patchValue({
      LocatorSegment: LocSegment[i].LocatorSegment,
    });

    this.service
      .LocatorNameList(
        LocatorSegment1,
        Number(sessionStorage.getItem('locId')),
        this.subInvCode.subInventoryId
      )
      .subscribe((data) => {
        this.LocatorList = data;

        if (this.LocatorList.code === 200) {
          patch.controls[i].patchValue({
            locatorId: this.LocatorList.obj.locatorId,
          });

          if (this.LocatorList.lengh == 0) {
            alert('Invalid Code Combination');
          } else {
            this.locatorId = this.LocatorList.obj.locatorId;
          }
        } else if (this.LocatorList.code === 400) {
          var arraycontrol = this.miscellaneousForm.get('cycleLinesList').value;
          patch.controls[i].patchValue({ LocatorSegment: '' });
        }
      });
    this.miscellaneousForm.get('Floor').reset();
    this.miscellaneousForm.get('Rack').reset();
    this.miscellaneousForm.get('RackNo').reset();
    this.miscellaneousForm.get('Row').reset();
    this.miscellaneousForm.get('RowNo').reset();
    alert('locator search complete');
  }

  openCodeCombination() {
    let SegmentName1 = this.miscellaneousForm.get('SegmentName').value;
    if (SegmentName1 === null) {
      this.miscellaneousForm.get('segment11').reset();
      this.miscellaneousForm.get('segment2').reset();
      this.miscellaneousForm.get('segment3').reset();
      this.miscellaneousForm.get('segment4').reset();
      this.miscellaneousForm.get('segment5').reset();

      this.miscellaneousForm.get('lookupValueDesc1').reset();
      this.miscellaneousForm.get('lookupValueDesc2').reset();
      this.miscellaneousForm.get('lookupValueDesc3').reset();
      this.miscellaneousForm.get('lookupValueDesc4').reset();
      this.miscellaneousForm.get('lookupValueDesc5').reset();
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
    this.segmentName =
      this.miscellaneousForm.get('segment11').value +
      '.' +
      this.miscellaneousForm.get('segment2').value +
      '.' +
      this.miscellaneousForm.get('segment3').value +
      '.' +
      this.miscellaneousForm.get('segment4').value +
      '.' +
      this.miscellaneousForm.get('segment5').value;

    // alert(this.segmentName);

    this.service.segmentNameList(this.segmentName).subscribe((data) => {
      this.segmentNameList = data;
      if (this.segmentNameList.code === 200) {
        this.miscellaneousForm.patchValue({
          codeCombinationId: this.segmentNameList.obj.codeCombinationId,
        });
        if (this.segmentNameList.length == 0) {
          alert('Invalid Code Combination');
        } else {
          console.log(this.segmentNameList);
          this.codeCombinationId = Number(
            this.segmentNameList.codeCombinationId
          );
        }
      } else if (this.segmentNameList.code === 400) {
        this.miscellaneousForm.patchValue({ segmentName: '' });
        // alert(this.segmentNameList.message);
      }
    });
    this.miscellaneousForm.get('segment11').reset();
    this.miscellaneousForm.get('segment2').reset();
    this.miscellaneousForm.get('segment3').reset();
    this.miscellaneousForm.get('segment4').reset();
    this.miscellaneousForm.get('segment5').reset();

    this.miscellaneousForm.get('lookupValueDesc1').reset();
    this.miscellaneousForm.get('lookupValueDesc2').reset();
    this.miscellaneousForm.get('lookupValueDesc3').reset();
    this.miscellaneousForm.get('lookupValueDesc4').reset();
    this.miscellaneousForm.get('lookupValueDesc5').reset();
  }

  reservePos(i) {
    //alert("Hello");
    var trxLnArr1 = this.miscellaneousForm.get('cycleLinesList').value;
    const formValue: Imiscellaneous = this.miscellaneousForm.value;
    let variants = <FormArray>this.cycleLinesList();
    var transtypeid = this.miscellaneousForm.get('compileType').value;
    var seltranstyp = this.transType.find(
      (d) => d.transactionTypeId === transtypeid
    );
    var locId1 = this.miscellaneousForm.get('locId').value;

    let variantFormGroup = <FormGroup>variants.controls[i];
    variantFormGroup.removeControl('reservedQty');
    variantFormGroup.removeControl('transactionNumber');
    variantFormGroup.addControl(
      'transactionTypeId',
      new FormControl(transtypeid, [])
    );
    variantFormGroup.addControl('locId', new FormControl(locId1, []));
    // variantFormGroup.addControl('itemId', new FormControl(trxLnArr1[i].invItemId, Validators.required));
    variantFormGroup.addControl(
      'reservedQty',
      new FormControl(trxLnArr1[i].physicalQty, [])
    );
    variantFormGroup.addControl(
      'onHandId',
      new FormControl(trxLnArr1[i].id, [])
    );
    variantFormGroup.addControl(
      'transactionNumber',
      new FormControl(seltranstyp.transactionTypeName, [])
    );

    // var reserveinfo=formValue[0];

    this.service.reservePost(variants.value[i]).subscribe((res: any) => {
      //  var obj=res.obj;
      if (res.code === 200) {
        // alert("Record inserted Successfully");
        var miscRow: miscTrans = new miscTrans();
        miscRow.segment = trxLnArr1[i].segment;
        miscRow.Locator = trxLnArr1[i].LocatorSegment;
        miscRow.quantity = trxLnArr1[i].physicalQty;
        this.itemMap.set(trxLnArr1[i].segment, miscRow);
      } else {
        if (res.code === 400) {
          alert('Code already present in data base');
          this.miscellaneousForm.reset();
        }
      }
    });
  }

  validate(i: number, qty1) {
    //alert("Validate");

    var trxLnArr = this.miscellaneousForm.get('cycleLinesList').value;
    var trxLnArr1 = this.miscellaneousForm.get('cycleLinesList') as FormArray;
    let avalqty = trxLnArr[i].avlqty;
    let qty = trxLnArr[i].physicalQty;
    let uomCode = trxLnArr[i].uom;
    //alert(avalqty+'avalqty');
    //alert(trxLnArr[i].physicalQty +' qty');
    if (
      qty > avalqty &&
      this.miscellaneousForm.get('compileType').value !== 13
    ) {
      alert('You can not enter more than available quantity');
      trxLnArr1.controls[i].patchValue({ physicalQty: '' });
      qty1.focus();
    }
    if (qty <= 0) {
      alert('Please enter quantity more than zero');
      trxLnArr1.controls[i].patchValue({ physicalQty: '' });
      qty1.focus();
    }
    if (uomCode === 'NO') {
      // alert(Number.isInteger(qty)+'Status');
      if (!Number.isInteger(qty)) {
        alert('Please enter correct No');
        trxLnArr1.controls[i].patchValue({ physicalQty: '' });
      }
    }

    this.addnewcycleLinesList(i);
    this.setFocus('segment' +(i+1)  )
  }

  searchByCompileID(itemId) {
    // alert(itemId+'ID')
    var compileId = this.miscellaneousForm.get('compileId').value;
    // alert(compileId+'CompileID');
    // let select1=this.ItemIdList.find(d=>d.itemid===itemId);
    // var itemId= select1.itemId
    // alert(itemId+'Item');
    this.service.getsearchByCompId(compileId, itemId).subscribe((data) => {
      if (data.code === 400) {
        // window.location.reload();
        // alert('hELLO');
      }
      if (data.code === 200) {
        var xx = data.obj;
        console.log(data.obj);
        console.log(xx);
        let patch = this.miscellaneousForm.get('cycleLinesList') as FormArray;
        var control = this.miscellaneousForm.get('cycleLinesList').value;
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
        // for(let i= 0 ; i<data.obj.length; i++){
        //   control.controls[i].patchValue(data.obj);
        // }
        //  alert(data.obj.compileLineId)
        // this.miscellaneousForm.get('cycleLinesList').patchValue(data.obj);
        //  for(let i=0; i< data.obj.length; i++){
        //   //   alert(data.obj.cycleLinesList[i].subInventory+'subInventory');
        // this.miscellaneousForm.patchValue({'srlNo':i+1})
        // control.controls[i].patchValue({srlNo:i+1  })

        // this.miscellaneousForm.patchValue({'segment':data.obj.segment});
        // this.miscellaneousForm.patchValue({'subInventory':data.obj[i].subInventory});
        // this.miscellaneousForm.patchValue({'compileLineId':data.obj[i].compileLineId})
        // }
      }
    });
  }
  search(compNo) {
    // alert(compNo);
    if (compNo != undefined) {
      this.currentOp = 'SEARCH';
      var compno = this.miscellaneousForm.get('compNo').value;
      var appflag = this.miscellaneousForm.get('trans').value;
      // alert(compno);

      this.service.getSearchViewBycompNo(compno).subscribe((data) => {
        if (data.code === 400) {
          alert('Can not View data');
        }
        if (data.code === 200) {
          //       // this.lstcomment=data.obj;
          let control = this.miscellaneousForm.get(
            'cycleLinesList'
          ) as FormArray;
          var len = this.cycleLinesList().length;
          for (let i = 0; i < data.obj.cycleLinesList.length - len; i++) {
            var trxlist: FormGroup = this.newcycleLinesList();
            this.cycleLinesList().push(trxlist);
          }
          // for(let j=0; j<data.obj.cycleLinesList.length-len; j++){
          //  control.controls[j].patchValue(data.obj.cycleLinesList);
          // }

          for (let i = 0; i < this.cycleLinesList().length; i++) {
            // this.onOptiongetItem(data.obj.cycleLinesList[i].segment,i);
            // let itemLoct : ItemLocator  = new ItemLocator();
            // // let csvRecord: CsvData = new CsvData();

            // itemLoct.locatorId = data.obj.cycleLinesList[i].locatorId;
            // itemLoct.segmentName=data.obj.cycleLinesList[i].LocatorSegment;
            // this.getfrmSubLoc.push(itemLoct);
            // debugger;
            // console.log(this.getfrmSubLoc);
            // let sellc=this.getfrmSubLoc.find(d=>d.locatorId===data.obj.cycleLinesList[i].locatorId)
            // alert(sellc.segmentName+'Segment');
            // control.controls[i].patchValue({LocatorSegment:sellc.segmentName});
            control.controls[i].patchValue({
              lineNumber: i + 1,
            });
          }

          this.miscellaneousForm.patchValue(data.obj);
          this.currentOp = 'INSERT';
          // this.miscellaneousForm.get('cycleLinesList').patchValue(data.obj.cycleLinesList);
          this.miscellaneousForm.disable();
          // this.dispRow=false;
          this.displayaddButton = false;
          this.displayButton = false;
          // this.miscellaneousForm.get('cycleLinesList').disable();
        }
      });
    }
  }

  saveMisc() {
    this.displayButton = true;
    this.displayaddButton = true;
    if (this.miscellaneousForm.valid) {
      // this.displayButton=true;
      // this.displayaddButton=true;
      const formValue: Imiscellaneous = this.miscellaneousForm.getRawValue();
      this.service.miscSubmit(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          this.compileName = res.obj.compileName;
          this.totalCompileItems = res.obj.totalCompileItems;
          this.totalItemValue = res.obj.totalItemValue;
          this.compileStatus = res.obj.compileStatus;
          // this.lstcomment=data.obj;
          alert('Record Inserted Successfully');
          // this.miscellaneousForm.patchValue(obj);
          // let control =this.miscellaneousForm.get('cycleLinesList') as FormArray;
          // var len = this.cycleLinesList().length;
          // for(let i=0; i<res.obj.cycleLinesList.length-len; i++){
          //   var trxlist:FormGroup=this.newcycleLinesList();
          //   this.cycleLinesList().push(trxlist);

          this.miscellaneousForm.disable();
          this.displayButton = false;
          this.displayaddButton = false;
          // (document.getElementById("btnrm") as HTMLInputElement).disabled = false;
        } else {
          if (res.code === 400) {
            alert('ERROR OCCOURED IN PROCEESS');
            this.miscellaneousForm.reset();
          }
        }
      });
    } else {
      // alert('else');
      this.HeaderValidation();
    }
  }

  onSelectReason(event) {
    // alert(event);
    // var reasname=this.miscellaneousForm.get('reason').value;
    // this.service.reasonaccCode(this.locId,reasname).subscribe(
    var reasonArr = event.split('-');
    // alert(reasonArr.length);
    this.service
      .reasonaccCode(this.locId, reasonArr[0], reasonArr[1])
      .subscribe((data) => {
        this.acccodedesc = data;
        // this.miscellaneousForm.patchValue({reason:this.acccodedesc.segmentName});
        this.segmentName = this.acccodedesc.segmentName;
      });
  }

  HeaderValidation() {
    var isValid: boolean = false;
    Object.keys(this.miscellaneousForm.controls).forEach((key) => {
      const control = this.miscellaneousForm.controls[key] as
        | FormControl
        | FormArray
        | FormGroup;

      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormArray) {
        (<FormArray>(
          this.miscellaneousForm.get('cycleLinesList')
        )).controls.forEach((group: FormGroup) => {
          (<any>Object)
            .values(group.controls)
            .forEach((control: FormControl) => {
              control.markAsTouched();
            });
        });
      } else if (control instanceof FormGroup) {
      }
    });
  }

  getGroupControl(fieldName) {
    return this.miscellaneousForm.get(fieldName);
  }

  getGroupControllinewise(index, fieldName) {
    // alert('nam'+fieldName);
    return (<FormArray>this.miscellaneousForm.get('cycleLinesList'))
      .at(index)
      .get(fieldName);
  }
  deleteReserve() {
    var transtypeid = this.miscellaneousForm.get('compileType').value;
    var seltranstyp = this.transType.find(
      (d) => d.transactionTypeId === transtypeid
    );
    this.service
      .reserveDelete(
        seltranstyp.transactionTypeName,
        Number(sessionStorage.getItem('locId'))
      )
      .subscribe((res: any) => {
        //  var obj=res.obj;
        if (res.code === 200) {
          // alert(res.message);
        }
      });
  }
  deleteReserveLinewise(i) {
    var transtypeid = this.miscellaneousForm.get('compileType').value;
    var seltranstyp = this.transType.find(
      (d) => d.transactionTypeId === transtypeid
    );
    var trxLnArr1 = this.miscellaneousForm.get('cycleLinesList').value;
    var itemid = trxLnArr1[i].itemId;
    this.service
      .reserveDeleteLine(
        seltranstyp.transactionTypeName,
        Number(sessionStorage.getItem('locId')),
        itemid
      )
      .subscribe((res: any) => {
        //  var obj=res.obj;
        if (res.code === 200) {
          // alert(res.message);
        }
      });
  }

  setFocus(name) {
    alert(name)
    const ele = this.stkAdjForm.nativeElement[name];

    if (ele) {
      ele.focus();
    }
  }
}
