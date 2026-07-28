
import {
  Component,
  OnInit,
  ViewChild,
   ElementRef,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
 } from '@angular/forms';

import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { DatePipe } from '@angular/common';

interface IsubinventoryTransfer {
  subInventoryCode: string;
  transferSubInv: string;
  transDate: Date;
  SubNo: string;
  shipmentNumber: string;
  remarks: string;
  issueBy: string;
  Rack: string;
  RackNo: number;
  deptId: number;
  divisionId: number;
  Row: string;
  RowNo: number;
  Floor: string;
  lineNumber: number;
  name: string;

  itemId: number;
  segment: string;
  description: string;
  uom: string;
  attribute10 :string;
  issueTo: string;
  locatorId: number;
  transferLocatorId: number;
  onHandId: number;
  primaryQty: number;
  onHandQty: number;
  LocatorSegment: string;
  fromLocatorSegment:string
  attribute3:string;
  attribute17:string;
  attribute18:string;

  att14:number;
  att15 :string;

    pendingrec:any;

    onHandQtyInLtr: number;
    primaryQtyInLtr: number;




}



// @Component({
//   selector: 'app-subinventory-transfer',
//   templateUrl: './subinventory-transfer.component.html',
//   styleUrls: ['./subinventory-transfer.component.css'],
// })
// export class SubinventoryTransferComponent implements OnInit {

  
@Component({
  selector: 'app-paint-subinv-transfer',
  templateUrl: './paint-subinv-transfer.component.html',
  styleUrls: ['./paint-subinv-transfer.component.css']
})
export class PaintSubinvTransferComponent implements OnInit {
  PaintSubinventoryTransferForm: FormGroup;

  public subInvCode: any = [];
  public ItemIdList: any = [];
  public issueByList: any=[];
  getItemDetail: any;
  getfrmSubLoc: any;
  public LocatorList: any;
  phyLocation:any=[];
  locData = [
    {
      locatorId: 999,
      segmentName: 'D.U.01.D.01',
      id: 7,
      onHandQty: 40,
    },
  ];
  onhand: any;
  locId: number;
  showModal: boolean;
  deptId: number;
  divisionId: number;

  subInventoryCode: string;
  transferSubInv: string;
  // transDate:Date;
  remarks: string;
  issueBy: string;
  Rack: string;
  RackNo: number;
  shipmentNumber: string;
  Row: string;
  RowNo: number;
  Floor: string;
  content: number;
  issueTo: string;
  // issueTo: string ='3';

  title: string;
  name: string;

  itemId: number;
  segment: string;
  onHandId: number;
  description: string;
  uom: string;
  attribute10:string;
  locatorId: number;
  transferLocatorId: number;
  primaryQty: number;
  onHandQty: number;

   onHandQtyInLtr: number;
   primaryQtyInLtr: number;

  LocatorSegment: string;
  fromLocatorSegment:string
  lineNumber: number;
  displayaddButton: boolean = false;
  userList2: any[] = [];
  lastkeydown1: number = 0;
  tosubInvCode: any;
  resrveqty: any;
  SubNo: string;
  currentOp: string;
  dispsearLocator = true;
  pipe = new DatePipe('en-US');
  now = new Date();
  transDate = this.pipe.transform(this.now, 'dd-MM-yyyy');
  dispPhyLoc:boolean=true;
  attribute3:string;
  isVisiblenewSubtrf:boolean=false;
  isVisibledownloadSubGatePass:boolean=false;
  isVisibleReceiveButton:boolean=false;
  headerValidation1:boolean=false;
  lineValidation1=false;
  lineItemRepeated = false;
  pendingrec:any;
  attribute17:string;
  attribute18:string;

  att14:number;
  att15 :string;

  @ViewChild('myinput') myInputField: ElementRef;
  @ViewChild('suppCode1') suppCode1: ElementRef;
  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;
  @ViewChild('input4') input4: ElementRef;
  @ViewChild('input5') input5: ElementRef;
  @ViewChild('input6') input6: ElementRef;
  @ViewChild('Item') Item: ElementRef;
  lstcomment: any;
  itemLocator: any;
  gettoSubLoc: any = [];
  displayLocator: boolean;
  locator: string;
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: MasterService
  ) {
    this.PaintSubinventoryTransferForm = fb.group({
      shipmentNumber: [],
      subInventoryCode: ['', Validators.required],
      transferSubInv: ['', Validators.required],
      transDate: ['', Validators.required],
      issueBy: [],
      remarks: [],
      Floor: ['', [Validators.maxLength(1)]],
      Rack: ['', [Validators.maxLength(1)]],
      RackNo: ['', [Validators.maxLength(2)]],
      Row: ['', [Validators.maxLength(1)]],
      RowNo: ['', [Validators.maxLength(2)]],
      locId: [],
      issueTo: [],
      SubNo: [],
      attribute3:[],
      attribute17:[],
      attribute18:[],

      att14:[],
      att15 :[],

      trfLinesList: this.fb.array([]),
    });
  }

  trfLinesList(): FormArray {
    return this.PaintSubinventoryTransferForm.get('trfLinesList') as FormArray;
  }

  newtrfLinesList(): FormGroup {
    return this.fb.group({
      itemId: [],
      segment: ['', Validators.required],
      description: [],
      uom: [],
      attribute10:[],
      locatorId: [],
      transferLocatorId: ['', Validators.required],
      primaryQty: ['', Validators.required],
      onHandQty: [],
      onHandQtyInLtr: [],
      primaryQtyInLtr: [],
      LocatorSegment: ['', Validators.required],

      lineNumber: [],
      onHandId: [],
      resveQty: [''],
      locator: [],
      fromLocatorSegment: ['', Validators.required],
     
    });
  }

  addnewtrfLinesList(i) {
    // alert ("index ="+i)
    this.checkLineValidation(i);
    if (i >= 0) {
      var trxLnArr1 = this.PaintSubinventoryTransferForm.get('trfLinesList').value;
      var itemqty = trxLnArr1[i].primaryQty;
       var item1 = trxLnArr1[i].segment;  
      // '--Select--'
      // alert(item1);
      if (item1 === '' || itemqty === '') {
        alert( "Line - " +i+1+ " : Please add line details..");
        return;
      }
      var trxLnArr = this.PaintSubinventoryTransferForm.get('trfLinesList') as FormArray;
      var locId = trxLnArr1[i].locatorId;
      var tolocator = trxLnArr1[i].transferLocatorId;
      var tosub = this.PaintSubinventoryTransferForm.get('transferSubInv').value;
      var subcode = this.PaintSubinventoryTransferForm.get('subInventoryCode').value;

      // this.displayaddButton=false;
      if (subcode === tosub) {
        // alert('In If')
        if (locId === tolocator) {
          // alert('In 2IF');
          debugger;
          alert('Please select correct locator  at line'+i);
          trxLnArr.controls[i - 1].patchValue({ LocatorSegment: '' });
          return;
        }
      }
    }
if (this.lineValidation1) {
    this.trfLinesList().push(this.newtrfLinesList());
    var len = this.trfLinesList().length;
    var patch = this.PaintSubinventoryTransferForm.get('trfLinesList') as FormArray;
    patch.controls[len - 1].patchValue({
      lineNumber: len,
    });
  }
    // this.trfLinesList().controls[len - 1].get('physicalQty').disable();
    // this.trfLinesList().controls[len - 1].get('LocatorSegment').disable();
  }

  removetrfLinesList(trfLineIndex) {
    var len1 = this.trfLinesList().length;
    if (len1 === 1) {
      alert('You can not delete the line');
      return;
    }
    this.trfLinesList().removeAt(trfLineIndex);
    var patch = this.PaintSubinventoryTransferForm.get(
      'cycleLinesList'
    ) as FormArray;
    var len = this.trfLinesList().length;
    patch.controls[len - 1].patchValue({
      lineNumber: len,
    });

    var btnrm = document.getElementById(
      'btnrm' + (trfLineIndex - 1)
    ) as HTMLInputElement;
    if (document.contains(btnrm)) {
      (
        document.getElementById(
          'btnrm' + (trfLineIndex - 1)
        ) as HTMLInputElement
      ).disabled = true;
      // (document.getElementById('btnrm'+i+1) as HTMLInputElement).disabled = true;
    }
  }
  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.locId = Number(sessionStorage.getItem('locId'));
    this.issueBy = sessionStorage.getItem('name');
    this.deptId = Number(sessionStorage.getItem('dept'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.isVisiblenewSubtrf=true;
    this.service.subInvCode2(this.deptId, this.divisionId).subscribe((data) => {
      this.subInvCode = data;
      this.subInventoryCode = this.subInvCode.subInventoryCode;
      console.log(this.subInvCode.subInventoryId);
      this.service
        .ItemIdListDept(this.deptId, this.locId, this.subInvCode.subInventoryId)
        .subscribe((data) => {
          this.ItemIdList = data;
          // console.log(this.invItemId);
        });

    });

      this.service.PendingPNInWip(this.locId,this.divisionId,this.deptId).subscribe(
      data=>{
        this.pendingrec=data;
       console.log(this.pendingrec);
        //  this.displayremakdata=true;
        }
    )

    // this.service
    //   .getsubTrfSubinventory(this.deptId, this.divisionId)
    //   .subscribe((data) => {
    //     this.tosubInvCode = data;
    //   });


       this.service
      .getsubTrfSubinventoryPaint(this.deptId, this.divisionId)
      .subscribe((data) => {
        this.tosubInvCode = data;
      });



      
    // this.service
    //   .issueByList(this.locId, this.deptId, this.divisionId)
    //   .subscribe((data) => {
    //     this.issueByList = data;
    //     console.log(this.issueByList);
    //   });

    // this.service.ItemIdList().subscribe(
    //   data => {
    //     this.ItemIdList = data;
    //     console.log(this.ItemIdList);
    //     // console.log(this.invItemId);
    //   });
    // this.addnewtrfLinesList(0);
     this.trfLinesList().push(this.newtrfLinesList());
    var patch = this.PaintSubinventoryTransferForm.get('trfLinesList') as FormArray;
    patch.controls[0].patchValue({
      lineNumber: 1,
    });
    // alert(this.subInventoryCode);
    
    // this.SubNo="12PU";
  }

  PendingtoReceive(){
   this.service.PendingPNInWip(this.locId,this.divisionId,this.deptId).subscribe(
      data=>{
        this.pendingrec=data;
       console.log(this.pendingrec);
        //  this.displayremakdata=true;
        }
    )
  }



  onOptionSubInv(event:any){
    var seltoSubInv = this.tosubInvCode.find(d =>d.subInventoryCode ===event);
     var loginDeptId= Number(sessionStorage.getItem('deptId'));
     var empDeptId=3;
    // this.service
    // .issueByList(this.locId, seltoSubInv.deptId, this.divisionId)
    // .subscribe((data) => {
    //   this.issueByList = data;
    //   console.log(this.issueByList);
    // });
    // var designation='Sales Manager';
    // this.service.issueByListNew(seltoSubInv.deptId,this.locId).subscribe((data) => {

    if(loginDeptId===3) { empDeptId=5} else { empDeptId=3}

    this.service.issueByListNew(empDeptId,this.locId).subscribe((data) => {
      this.issueByList = data.obj;
      console.log(this.issueByList);
    });

    if(this.subInventoryCode=='VH')
    {
      this.dispPhyLoc=false;
      this.service.getPhysicalLoc(this.locId).subscribe(
          data => {
            this.phyLocation = data;
        //     console.log(this.ItemIdList);
        //     // console.log(this.invItemId);
          });
      
    }
  }
  PaintSubinventoryTransfer(PaintSubinventoryTransferForm: any) {}

  keytab(event, maxLength, nxtEle) {
    // this.input1.nativeElement.focus();
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
        (document.getElementById('btnok') as HTMLInputElement).disabled = false;
      }
      if (nxtEle === 'input6') {
        this.input6.nativeElement.focus();
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

  search(SubNo) {
    this.isVisiblenewSubtrf=false;

    var loginDeptId= Number(sessionStorage.getItem('deptId'));
    // alert("login dept Id ="+loginDeptId +","+SubNo);
    // alert(SubNo+'1st');
    if (SubNo != undefined) {
      this.currentOp = 'SEARCH';
      this.dispsearLocator = true;
      this.service
        // .getsearchBySubInvTrfNo(SubNo, this.locId)
        .getsearchBySubInvTrfNoForPaint(SubNo, this.locId)
        .subscribe((data) => {
          this.lstcomment = data;
          let control = this.PaintSubinventoryTransferForm.get('trfLinesList' ) as FormArray;
              this.trfLinesList().clear();

          var len = this.trfLinesList().length;
          for (let i = 0; i < data.length - len; i++) {
            var trxlist: FormGroup = this.newtrfLinesList();
            this.trfLinesList().push(trxlist);
          }
          this.dispsearLocator = false;

          // alert ("this.lstcomment[0].transferSubInv" + this.lstcomment[0].attribute16+","+Number(this.lstcomment[0].attribute16))

          this.isVisibleReceiveButton=false

          var att16=Number(this.lstcomment[0].attribute16);

          if(this.lstcomment[0].subInventoryCode =='PN'  && this.lstcomment[0].transferSubInv=='WIP' && att16>0 && loginDeptId ==5 ){this.isVisibleReceiveButton=true;} 
         
          if(this.lstcomment[0].subInventoryCode =='MP'  && this.lstcomment[0].transferSubInv=='WIP' && att16>0 && loginDeptId ==3 ){this.isVisibleReceiveButton=true;} 

          // if (loginDeptId ==3) {
          //   if(Number(this.lstcomment[0].attribute16)>=1){this.isVisibleReceiveButton=true;} 
          //   else {this.isVisibleReceiveButton=false;}
          // } 
          // else { this.isVisibleReceiveButton=false}




          this.PaintSubinventoryTransferForm.patchValue(this.lstcomment[0]);
          this.PaintSubinventoryTransferForm.patchValue({ attribute18: this.lstcomment[0].shipmentNumber })

          this.PaintSubinventoryTransferForm.patchValue({ att14: Number(this.lstcomment[0].attribute14) })
          this.PaintSubinventoryTransferForm.patchValue({ att15: this.lstcomment[0].transferLocatorId })

          this.PaintSubinventoryTransferForm.get('trfLinesList').patchValue(this.lstcomment);
          var patch = this.PaintSubinventoryTransferForm.get(
            'trfLinesList'
          ) as FormArray;
          for (let i = 0; i < this.trfLinesList().length; i++) {
            // patch.get('locatorId').setValue(this.lstcomment[i].locatorId);

            // this.locData[i]={locatorId:this.lstcomment[i].locatorId,
            //                 segmentName:this.lstcomment[i].locator,
            //                 onHandQty:this.lstcomment[i].primaryQty,
            //                 id:this.lstcomment[i].locatorId}
            patch.controls[i].patchValue({ lineNumber: i + 1,LocatorSegment: this.lstcomment[i].transferLocator,});
            patch.controls[i].patchValue({ primaryQtyInLtr: Number(this.lstcomment[i].primaryQty)/Number(this.lstcomment[i].attribute10),});

            // patch.controls[i].patchValue({ att14: Number(this.lstcomment[i].attribute14),});
            // patch.controls[i].patchValue({ att15: this.lstcomment[i].attribute15,});
            
            // locatorId:this.lstcomment[i].locatorId,

          }
          this.PaintSubinventoryTransferForm.disable();
          this.isVisibledownloadSubGatePass=true;
          this.currentOp = 'INSERT';
        });
    }
  }

  onOptiongetdetails(event: any, i) {
    if (this.currentOp === 'SEARCH') {
      return;
    }
    // alert(event);
    // alert(event);
    var temp = event.split('--');
    // alert(temp[0]);
    var segment = temp[0];
    var trxLnArr = this.PaintSubinventoryTransferForm.get('trfLinesList').value;
    let select1 = this.ItemIdList.find((d) => d.SEGMENT == segment);
    // var itemId= select1.itemId
    console.log(select1.itemId);
    if (select1 != undefined) {
      // alert(select1.itemId)
      var trxLnArr1 = this.PaintSubinventoryTransferForm.get( 'trfLinesList' ) as FormArray;

      trxLnArr1.controls[i].patchValue({ itemId: select1.itemId });
      var subcode = this.PaintSubinventoryTransferForm.get('subInventoryCode').value;

          //  --------------------------------------------------------------
              // alert("Checking for duplicate line item....");
              this.duplicateLineCheck(i, select1.itemId,select1.SEGMENT);
              if( this.lineItemRepeated) { return;}
         //  --------------------------------------------------------------

      this.service.getItemDetail(select1.itemId).subscribe((data) => {
        this.getItemDetail = data;
        if (this.getItemDetail.description != undefined) {
          trxLnArr1.controls[i].patchValue({ description: this.getItemDetail.description,});
          trxLnArr1.controls[i].patchValue({ uom: this.getItemDetail.uom });
          trxLnArr1.controls[i].patchValue({ attribute10: this.getItemDetail.attribute10 });
          trxLnArr1.controls[i].patchValue({ locId: Number(sessionStorage.getItem('locId')),
          });

          // this.trfLinesList().controls[i].get('physicalQty').disable();
          // this.trfLinesList().controls[i].get('LocatorSegment').disable();
        }
      });

      this.service
        .getfrmSubLoc(this.locId,select1.itemId,this.subInvCode.subInventoryId )
        .subscribe((data) => {
          this.getfrmSubLoc = data;
          console.log(data);
          var getfrmSubLoc = data;
          // if(getfrmSubLoc!=''){
          // alert(i +'i'+'lOCATOR');
          this.locData[i] = data;
          if (getfrmSubLoc.length == 1) {
            // this.displayLocator[i]=false;
            trxLnArr1.controls[i].patchValue({locatorId: getfrmSubLoc[0].segmentName, });
            // trxLnArr1.controls[i].patchValue({locatorId:getfrmSubLoc[0].locatorId});
            trxLnArr1.controls[i].patchValue({onHandQty: getfrmSubLoc[0].onHandQty, });
            trxLnArr1.controls[i].patchValue({ onHandId: getfrmSubLoc[0].id });
          
            var avlqtyInLtr =getfrmSubLoc[0].onHandQty/Number(this.getItemDetail.attribute10)
            avlqtyInLtr=parseFloat(avlqtyInLtr.toFixed(4))
            trxLnArr1.controls[i].patchValue({onHandQtyInLtr: avlqtyInLtr, });

          } else {
            // this.getfrmSubLoc=data;
            trxLnArr1.controls[i].patchValue({ locatorId: getfrmSubLoc[0].segmentName, });
            trxLnArr1.controls[i].patchValue({ onHandQty: getfrmSubLoc[0].onHandQty, });
            trxLnArr1.controls[i].patchValue({ onHandId: getfrmSubLoc[0].id });
           
            var avlqtyInLtr =getfrmSubLoc[0].onHandQty/Number(this.getItemDetail.attribute10)
            avlqtyInLtr=parseFloat(avlqtyInLtr.toFixed(4))
            trxLnArr1.controls[i].patchValue({onHandQtyInLtr: avlqtyInLtr, });
          }
          // }
          // else{

          // );}
        });

      this.service.getreserqty(this.locId, select1.itemId).subscribe((data) => {
        this.resrveqty = data;
        trxLnArr1.controls[i].patchValue({ resveQty: this.resrveqty });
      });
      var seltoSubInv = this.tosubInvCode.find(
        (d) =>
          d.subInventoryCode ===
          this.PaintSubinventoryTransferForm.get('transferSubInv').value
      );
      this.service
        .getItemLoc(this.locId, seltoSubInv.subInventoryId, select1.itemId)
        .subscribe((data) => {
          this.gettoSubLoc = data;
          this.displayLocator = false;
          trxLnArr1.controls[i].patchValue({
            LocatorSegment: this.gettoSubLoc[0].segmentName,
          });
          trxLnArr1.controls[i].patchValue({
            transferLocatorId: this.gettoSubLoc[0].locatorId,
          });
        });
      if (event != null) {
        this.displayaddButton = true;
      }
    }
  }

  
  OpenLocator(i) {
    var LocSegment =
      this.trfLinesList().controls[i].get('LocatorSegment').value;

    if (LocSegment === null) {
      this.PaintSubinventoryTransferForm.get('Floor').reset();
      this.PaintSubinventoryTransferForm.get('Rack').reset();
      this.PaintSubinventoryTransferForm.get('RackNo').reset();
      this.PaintSubinventoryTransferForm.get('Row').reset();
      this.PaintSubinventoryTransferForm.get('RowNo').reset();
      // this.input1.nativeElement.focus();
    }
    if (LocSegment != null) {
      var temp = LocSegment.split('.');
      // alert(temp[0]);
      this.Floor = temp[0];
      this.Rack = temp[1];
      this.RackNo = temp[2];
      this.Row = temp[3];
      this.RowNo = temp[4];
      // this.input1.nativeElement.focus();
    }
    // this.showModal = true;
    this.content = i;
    let a = i + 1;
    this.title = 'Locator :' + a;

    // debugger;
    (document.getElementById('btnok') as HTMLInputElement).disabled = true;

    this.input1.nativeElement.focus();
  }

  okLocator(i) {
    // alert(i);
    var subInvCode = this.PaintSubinventoryTransferForm.get('transferSubInv').value;
    var selectsubInv = this.tosubInvCode.find(
      (d) => d.subInventoryCode === subInvCode
    );

    var LocSegment = this.PaintSubinventoryTransferForm.get('trfLinesList').value;
    var patch = this.PaintSubinventoryTransferForm.get('trfLinesList') as FormArray;
    LocSegment[i].LocatorSegment =
      this.PaintSubinventoryTransferForm.get('Floor').value +
      '.' +
      this.PaintSubinventoryTransferForm.get('Rack').value +
      '.' +
      this.PaintSubinventoryTransferForm.get('RackNo').value +
      '.' +
      this.PaintSubinventoryTransferForm.get('Row').value +
      '.' +
      this.PaintSubinventoryTransferForm.get('RowNo').value;

    var LocatorSegment1 = LocSegment[i].LocatorSegment;
    // alert(this.LocatorSegment1);
    patch.controls[i].patchValue({
      LocatorSegment: LocSegment[i].LocatorSegment,
    });

    this.service
      .LocatorNameList(
        LocatorSegment1,
        Number(sessionStorage.getItem('locId')),
        selectsubInv.subInventoryId
      )
      .subscribe((data) => {
        this.LocatorList = data;

        if (this.LocatorList.code === 200) {
          patch.controls[i].patchValue({
            transferLocatorId: this.LocatorList.obj.locatorId,
          });

          if (this.LocatorList.lengh == 0) {
            alert('Invalid Code Combination');
          } else {
            this.transferLocatorId = this.LocatorList.obj.locatorId;
          }
        } else if (this.LocatorList.code === 400) {
          var arraycontrol =
            this.PaintSubinventoryTransferForm.get('trfLinesList').value;
          patch.controls[i].patchValue({ LocatorSegment: '' });
        }
        var trxLnArr = this.PaintSubinventoryTransferForm.get('trfLinesList').value;
        var locId = trxLnArr[i].locatorId;
        var trflocId = this.LocatorList.obj.locatorId;
        // alert(locId+'fromLoccator'+trflocId);
        if (trflocId === locId) {
          alert('Can not enter same Locator');
          patch.controls[i].patchValue({ LocatorSegment: '' });
        }
      });
    this.PaintSubinventoryTransferForm.get('Floor').reset();
    this.PaintSubinventoryTransferForm.get('Rack').reset();
    this.PaintSubinventoryTransferForm.get('RackNo').reset();
    this.PaintSubinventoryTransferForm.get('Row').reset();
    this.PaintSubinventoryTransferForm.get('RowNo').reset();
    alert('locator search complete');
    // var trxLnArr1=this.SubinventoryTransferForm.get('trfLinesList')as FormArray;
  }

  closesubTrf() {
    this.router.navigate(['admin']);
  }
  resetsubTrf() {
    window.location.reload();
  }

  AvailQty(event: any, i: number) {
    if (this.currentOp === 'SEARCH') {
      return;
    }
    // alert(event+'Loca');
    var trxLnArr1 = this.PaintSubinventoryTransferForm.get('trfLinesList') as FormArray;
    var trxLnArr = this.PaintSubinventoryTransferForm.get('trfLinesList').value;
    var itemid = trxLnArr[i].itemId;
    var locId = trxLnArr[i].locatorId;
    var onhandid = trxLnArr[i].onHandId;
    var tolocator = trxLnArr[i].transferLocatorId;
    var tosub = this.PaintSubinventoryTransferForm.get('transferSubInv').value;
    // trxLnArr1.controls[i].patchValue({locatorId:locId});
    // alert(locId+'locatorID'+onhandid);
    var subcode = this.PaintSubinventoryTransferForm.get('subInventoryCode').value;

    // ===================================================================================

    let select1 = this.getfrmSubLoc.find((d) => d.locatorId == locId);
    if (select1 != undefined) {
      // alert(select1.segmentName)
      trxLnArr1.controls[i].patchValue({fromLocatorSegment: select1.segmentName, });
    }

    // ======================================================================================

    // alert(subcode);
    // let select2= this.subInvCode.find(d=>d.subInventoryCode===subcode);
    // alert(select2.subInventoryId+'Id')
    if (locId != undefined) {
      this.service
        .getonhandqty(Number(sessionStorage.getItem('locId')),this.subInvCode.subInventoryId,locId,itemid)
        .subscribe((data) => {
          this.onhand = data;
          console.log(this.onhand);
          trxLnArr1.controls[i].patchValue({ onHandQty: data.obj });
          trxLnArr1.controls[i].patchValue({ onHandQty: parseFloat(data.obj.toFixed(4)) });
          
           
          // trxLnArr1.controls[i].patchValue({onHandId:data.obj.id});

          let onHand = data.obj;
          let reserve = trxLnArr[i].resveQty;
          // alert(onHand+' << OnHand');
          // alert(reserve+'reserve');

            var avlqtyInLtr =onHand/Number(this.getItemDetail.attribute10)
            avlqtyInLtr=parseFloat(avlqtyInLtr.toFixed(4))
            trxLnArr1.controls[i].patchValue({onHandQtyInLtr: avlqtyInLtr, });
            //  alert(avlqtyInLtr+' << onHandQtyInLtr');


          let avlqty1 = 0;
          avlqty1 = onHand - reserve;

          if (subcode === tosub) {
            // alert('In If')
            if (locId === tolocator) {
              // alert('In 2IF');
              alert('Please select correct locator');
              trxLnArr1.controls[i].patchValue({ onHandQty: '' });
            }
          }

            trxLnArr1.controls[i].patchValue({ onHandQty: avlqty1 });
            trxLnArr1.controls[i].patchValue({ onHandQty: parseFloat(avlqty1.toFixed(4)) });
            avlqtyInLtr =avlqty1/Number(this.getItemDetail.attribute10)
            avlqtyInLtr=parseFloat(avlqtyInLtr.toFixed(4))
            trxLnArr1.controls[i].patchValue({onHandQtyInLtr: avlqtyInLtr, });

          if(avlqty1<0)
          {
            alert("Transfer is not allowed,Item has Reserve quantity - "+reserve);
            this.trfLinesList().clear();
            this.addnewtrfLinesList(i);
            // trxLnArr1.controls[i].patchValue({segment:'' });
          }
        });
    }
  }

  newSubtrf() {


     this.lineValidation1=false; 
    //  var trxLnArr1 = this.paintMiscellaneousForm.get('cycleLinesList').value;
    //  var len1=trxLnArr1.length;
      this.checkHeaderValidation();
    if (this.headerValidation1==false ) { alert("Header Validation Failed... Please Check");  return; }
   
      var patch = this.PaintSubinventoryTransferForm.get('trfLinesList') as FormArray;
      var trxLnArr1 = this.PaintSubinventoryTransferForm.get('trfLinesList').value;
    var len1=trxLnArr1.length;

    // alert ("len1 :" +len1);

    for (let i = 0; i < len1 ; i++)
      {
        this.checkLineValidation(i);
      }

      if(this.lineValidation1===false ) {alert("Line Validation Failed... Please Check.");return; }
     
    // if (this.PaintSubinventoryTransferForm.valid) {

       var  resp=confirm("Do You Want to Save this Transaction(Trf to WIP) ???");
       if(resp==false) { return;}

      // const formValue: IsubinventoryTransfer =this.PaintSubinventoryTransferForm.value;
      const formValue: IsubinventoryTransfer =this.PaintSubinventoryTransferForm.value;

      let variants = <FormArray>this.trfLinesList();
    
      var tranda = this.PaintSubinventoryTransferForm.get('transDate').value;
      var frmcode = this.PaintSubinventoryTransferForm.get('subInventoryCode').value;
      var tocode = this.PaintSubinventoryTransferForm.get('transferSubInv').value;
      var issby = this.PaintSubinventoryTransferForm.get('issueBy').value;
      var issto = this.PaintSubinventoryTransferForm.get('issueTo').value;
      var rmks = this.PaintSubinventoryTransferForm.get('remarks').value;
      var locId1 = this.PaintSubinventoryTransferForm.get('locId').value;
      var phyLoc=this.PaintSubinventoryTransferForm.get('attribute3').value;


      for (let i = 0; i < this.trfLinesList().length; i++) {
        let VariantFormGroup = <FormGroup>variants.controls[i];
        VariantFormGroup.addControl(
          'transDate',
          new FormControl(tranda, Validators.required)
        );
        VariantFormGroup.addControl(
          'subInventoryCode',
          new FormControl(frmcode, Validators.required)
        );
        VariantFormGroup.addControl(
          'transferSubInv',
          new FormControl(tocode, Validators.required)
        );
        VariantFormGroup.addControl(
          'issueBy',
          new FormControl(issby, Validators.required)
        );
        VariantFormGroup.addControl(
          'remarks',
          new FormControl(rmks, Validators.required)
        );
        VariantFormGroup.addControl(
          'orgId',
          new FormControl(locId1, Validators.required)
        );
        VariantFormGroup.addControl(
          'transferOrgId',
          new FormControl(locId1, Validators.required)
        );
        VariantFormGroup.addControl(
          'issueTo',
          new FormControl(issto, Validators.required)
        );
        VariantFormGroup.addControl(
          'attribute3',
          new FormControl(phyLoc, Validators.required)
        );
      }

      this.service
        .subInvTransferSubmit(variants.value)
        .subscribe((res: any) => {
          //  var obj=res;
          // sessionStorage.setItem('shipmentNumber',obj[0].shipmentNumber);
          if (res.code === 200) {
            alert(res.message);
            this.isVisiblenewSubtrf=false;
            this.isVisibledownloadSubGatePass=true;
            // this.shipmentNumber =res.obj.shipmentNumber;
            this.PaintSubinventoryTransferForm.patchValue(
              // //  'issueBy':res.obj[0].issueTo,
              { shipmentNumber: res.obj[0].shipmentNumber }
            );
            this.PaintSubinventoryTransferForm.disable();
            this.PendingtoReceive();

            // // 'transReference':res.obj[0].transReference}
            // );
            //  var trxLnArr2 = this.SubinventoryTransferForm.get('trfLinesList') as FormArray;
            //  for(let i=0; i<res.obj.length; i++){
            //   // trxLnArr2.controls[i].patchValue(res.obj[i]);

            // trxLnArr2.controls[i].patchValue({'segment':res.obj[i].segment});
            // trxLnArr2.controls[i].patchValue({'locator':res.obj[i].locator});
            // trxLnArr2.controls[i].patchValue({'avlqty':res.obj[i].avlqty});
            // trxLnArr2.controls[i].patchValue({'primaryQty':res.obj[i].primaryQty});
            // }

            // this.display = false;
            // this.displayButton = false;
          } else {
            if (res.code === 400) {
              alert(res.message);
              // this.SubinventoryTransferForm.reset();
            }
          }
        });

    // } else { this.HeaderValidation();  }
  }

    Wip2PnOrMp(){
      
      // alert ("Wip2PnOrMp")
      var loginDeptId= Number(sessionStorage.getItem('deptId'));
      if(loginDeptId===3) {this.newSubtrfforWIPtoPN();}
    
      if(loginDeptId===5) {this.newSubtrfforWIPtoMP();}
    }

   newSubtrfforWIPtoPN() {
     
       var  resp=confirm("Do You Want to Save this Transaction(WIP TO PN) ???");
       if(resp==false) { return;}

       this.isVisibleReceiveButton=false;

    // if (this.PaintSubinventoryTransferForm.valid) {
      const formValue: IsubinventoryTransfer =this.PaintSubinventoryTransferForm.getRawValue();
      let variants = <FormArray>this.trfLinesList();

      // var tranda = this.PaintSubinventoryTransferForm.get('transDate').value;
      // var frmcode = this.PaintSubinventoryTransferForm.get('subInventoryCode').value;
      // var tocode = this.PaintSubinventoryTransferForm.get('transferSubInv').value;
      var issby = this.PaintSubinventoryTransferForm.get('issueBy').value;
      var issto = this.PaintSubinventoryTransferForm.get('issueTo').value;
      var rmks = this.PaintSubinventoryTransferForm.get('remarks').value;
      var locId1 = this.PaintSubinventoryTransferForm.get('locId').value;
      var phyLoc=this.PaintSubinventoryTransferForm.get('attribute3').value;
      var att18=this.PaintSubinventoryTransferForm.get('attribute18').value;


       var frmcode = 'WIP';
       var tocode = 'PN'
       var tranda = this.pipe.transform(this.now, 'dd-MM-yyyy');


       var patch = this.PaintSubinventoryTransferForm.get('trfLinesList') as FormArray;
       
      for (let i = 0; i < this.trfLinesList().length; i++) {

         (patch.controls[i]).patchValue({LocatorSegment: 'P.N.01.G.01',});
         (patch.controls[i]).patchValue({transferLocatorId: this.att14,});

         (patch.controls[i]).patchValue({locator: 'W.I.01.P.01',});
         (patch.controls[i]).patchValue({locatorId: this.att15,});


        let VariantFormGroup = <FormGroup>variants.controls[i];

        VariantFormGroup.addControl(
          'transDate',
          new FormControl(tranda, Validators.required)
        );
        VariantFormGroup.addControl(
          'subInventoryCode',
          new FormControl(frmcode, Validators.required)
        );
        VariantFormGroup.addControl(
          'transferSubInv',
          new FormControl(tocode, Validators.required)
        );
        VariantFormGroup.addControl(
          'issueBy',
          new FormControl(issby, Validators.required)
        );
        VariantFormGroup.addControl(
          'remarks',
          new FormControl(rmks, Validators.required)
        );
        VariantFormGroup.addControl(
          'orgId',
          new FormControl(locId1, Validators.required)
        );
        VariantFormGroup.addControl(
          'transferOrgId',
          new FormControl(locId1, Validators.required)
        );
        VariantFormGroup.addControl(
          'issueTo',
          new FormControl(issto, Validators.required)
        );

        VariantFormGroup.addControl(
          'attribute3',
          new FormControl(phyLoc, Validators.required)
        );
        
         VariantFormGroup.addControl(
          'attribute18',
          new FormControl(att18, Validators.required)
        );
      }

      this.service
        // .subInvTransferSubmit(variants.value)
          .subInvTransferSubmit(variants.getRawValue())

        .subscribe((res: any) => {
          //  var obj=res;
          // sessionStorage.setItem('shipmentNumber',obj[0].shipmentNumber);
          if (res.code === 200) {
            alert(res.message);
            this.isVisiblenewSubtrf=false;
            this.isVisibleReceiveButton=false;
            this.isVisibledownloadSubGatePass=true;
            // this.shipmentNumber =res.obj.shipmentNumber;
            this.PaintSubinventoryTransferForm.patchValue(
              // //  'issueBy':res.obj[0].issueTo,
              { shipmentNumber: res.obj[0].shipmentNumber }
            );
            this.PaintSubinventoryTransferForm.disable();
            this.PendingtoReceive();
            // // 'transReference':res.obj[0].transReference}
            // );
            //  var trxLnArr2 = this.SubinventoryTransferForm.get('trfLinesList') as FormArray;
            //  for(let i=0; i<res.obj.length; i++){
            //   // trxLnArr2.controls[i].patchValue(res.obj[i]);

            // trxLnArr2.controls[i].patchValue({'segment':res.obj[i].segment});
            // trxLnArr2.controls[i].patchValue({'locator':res.obj[i].locator});
            // trxLnArr2.controls[i].patchValue({'avlqty':res.obj[i].avlqty});
            // trxLnArr2.controls[i].patchValue({'primaryQty':res.obj[i].primaryQty});
            // }

            // this.display = false;
            // this.displayButton = false;
          } else {
            if (res.code === 400) {
              alert(res.message);
              // this.SubinventoryTransferForm.reset();
            }
          }
        });

    // } else { this.HeaderValidation();  }
  }

  

   newSubtrfforWIPtoMP() {
     
       var  resp=confirm("Do You Want to Save this Transaction (WIP TO MP) ???");
       if(resp==false) { return;}

       this.isVisibleReceiveButton=false;

    // if (this.PaintSubinventoryTransferForm.valid) {
      const formValue: IsubinventoryTransfer =this.PaintSubinventoryTransferForm.getRawValue();
      let variants = <FormArray>this.trfLinesList();

      // var tranda = this.PaintSubinventoryTransferForm.get('transDate').value;
      // var frmcode = this.PaintSubinventoryTransferForm.get('subInventoryCode').value;
      // var tocode = this.PaintSubinventoryTransferForm.get('transferSubInv').value;
      var issby = this.PaintSubinventoryTransferForm.get('issueBy').value;
      var issto = this.PaintSubinventoryTransferForm.get('issueTo').value;
      var rmks = this.PaintSubinventoryTransferForm.get('remarks').value;
      var locId1 = this.PaintSubinventoryTransferForm.get('locId').value;
      var phyLoc=this.PaintSubinventoryTransferForm.get('attribute3').value;
      var att18=this.PaintSubinventoryTransferForm.get('attribute18').value;


       var frmcode = 'WIP';
       var tocode = 'MP'
       var tranda = this.pipe.transform(this.now, 'dd-MM-yyyy');


       var patch = this.PaintSubinventoryTransferForm.get('trfLinesList') as FormArray;
       
      for (let i = 0; i < this.trfLinesList().length; i++) {

         (patch.controls[i]).patchValue({LocatorSegment: 'M.P.01.P.01',});
         (patch.controls[i]).patchValue({transferLocatorId: this.att14,});

         (patch.controls[i]).patchValue({locator: 'W.I.01.P.01',});
         (patch.controls[i]).patchValue({locatorId: this.att15,});



        let VariantFormGroup = <FormGroup>variants.controls[i];

        VariantFormGroup.addControl(
          'transDate',
          new FormControl(tranda, Validators.required)
        );
        VariantFormGroup.addControl(
          'subInventoryCode',
          new FormControl(frmcode, Validators.required)
        );
        VariantFormGroup.addControl(
          'transferSubInv',
          new FormControl(tocode, Validators.required)
        );
        VariantFormGroup.addControl(
          'issueBy',
          new FormControl(issby, Validators.required)
        );
        VariantFormGroup.addControl(
          'remarks',
          new FormControl(rmks, Validators.required)
        );
        VariantFormGroup.addControl(
          'orgId',
          new FormControl(locId1, Validators.required)
        );
        VariantFormGroup.addControl(
          'transferOrgId',
          new FormControl(locId1, Validators.required)
        );
        VariantFormGroup.addControl(
          'issueTo',
          new FormControl(issto, Validators.required)
        );

        VariantFormGroup.addControl(
          'attribute3',
          new FormControl(phyLoc, Validators.required)
        );
        
         VariantFormGroup.addControl(
          'attribute18',
          new FormControl(att18, Validators.required)
        );
      }

      this.service
        // .subInvTransferSubmit(variants.value)
          .subInvTransferSubmit(variants.getRawValue())

        .subscribe((res: any) => {
          //  var obj=res;
          // sessionStorage.setItem('shipmentNumber',obj[0].shipmentNumber);
          if (res.code === 200) {
            alert(res.message);
            this.isVisiblenewSubtrf=false;
            this.isVisibleReceiveButton=false;
            this.isVisibledownloadSubGatePass=true;
            // this.shipmentNumber =res.obj.shipmentNumber;
            this.PaintSubinventoryTransferForm.patchValue(
              // //  'issueBy':res.obj[0].issueTo,
              { shipmentNumber: res.obj[0].shipmentNumber }
            );
            this.PaintSubinventoryTransferForm.disable();
            this.PendingtoReceive();
          
          } else {
            if (res.code === 400) {
              alert(res.message);
            }
          }
        });
  }

  HeaderValidation() {
    var isValid: boolean = false;
    Object.keys(this.PaintSubinventoryTransferForm.controls).forEach((key) => {
      const control = this.PaintSubinventoryTransferForm.controls[key] as
        | FormControl
        | FormArray
        | FormGroup;

      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormArray) {
        (<FormArray>(
          this.PaintSubinventoryTransferForm.get('trfLinesList')
        )).controls.forEach((group: FormGroup) => {
          (<any>Object)
            .values(group.controls)
            .forEach((control: FormControl) => {
              control.markAsTouched();
              // alert(control.hasError);
            });
        });
      } else if (control instanceof FormGroup) {
      }
    });
  }

  getGroupControl(fieldName) {
    return this.PaintSubinventoryTransferForm.get(fieldName);
  }

  getGroupControllinewise(index, fieldName) {
    // alert('nam'+fieldName);
    return (<FormArray>this.PaintSubinventoryTransferForm.get('trfLinesList'))
      .at(index)
      .get(fieldName);
  }
  onToLocator(event: any, i) {
    // alert(event);
    var trxLnArr1 = this.PaintSubinventoryTransferForm.get(
      'trfLinesList'
    ) as FormArray;
    var trxLnArr = this.PaintSubinventoryTransferForm.get('trfLinesList').value;
    var locId = trxLnArr[i].locatorId;
    var trflocId = trxLnArr[i].transferLocatorId;
    if (event === locId) {
      alert('Can not enter same Locator');
    }
  }

  validate(i: number, qty1) {
    // alert("Validate");
    // if(qty1)
    var trxLnArr = this.PaintSubinventoryTransferForm.get('trfLinesList').value;
    var trxLnArr1 = this.PaintSubinventoryTransferForm.get(
      'trfLinesList'
    ) as FormArray;
    let avalqty = trxLnArr[i].onHandQty;
    let qty = trxLnArr[i].primaryQty;
    let uomCode = trxLnArr[i].uom;
    //  alert(avalqty+'avalqty');
    //  alert(trxLnArr[i].primaryQty +' qty');
    if (qty > avalqty) {
      alert('You can not enter more than available quantity');
      trxLnArr1.controls[i].patchValue({ primaryQty: '' });
      qty1.focus();
    }
    if (qty <= 0) {
      alert('Please enter quantity more than zero');
      trxLnArr1.controls[i].patchValue({ primaryQty: '' });
      qty1.focus();
    }

    // if (uomCode === 'NO') {
    //   // alert(Number.isInteger(qty)+'Status');
    //   if (!Number.isInteger(qty)) {
    //     alert('Please enter correct No');
    //     trxLnArr1.controls[i].patchValue({ primaryQty: '' });
    //   }
    // }

    // var trxLnArr = this.SubinventoryTransferForm.get('trfLinesList').value;
    var locId = trxLnArr[i].locatorId;
    var tolocator = trxLnArr[i].transferLocatorId;
    var tosub = this.PaintSubinventoryTransferForm.get('transferSubInv').value;
    var subcode = this.PaintSubinventoryTransferForm.get('subInventoryCode').value;

    // this.displayaddButton=false;
    if (subcode === tosub) {
      // alert('In If')
      if (locId === tolocator) {
        // alert('In 2IF');
        alert('Please select correct locator');
        trxLnArr1.controls[i].patchValue({ LocatorSegment: '' });
        return;
      }
    }
  }


   validateLtr(i: number) {
    // alert("Validate");
    // alert(qtyLtr);
    // if(qtyLtr)
    var trxLnArr = this.PaintSubinventoryTransferForm.get('trfLinesList').value;
    var trxLnArr1 = this.PaintSubinventoryTransferForm.get( 'trfLinesList' ) as FormArray;
    let avalqty = trxLnArr[i].onHandQtyInLtr;
    let qty = trxLnArr[i].primaryQtyInLtr;
    let uomCode = trxLnArr[i].uom;
    //  alert(avalqty+'avalqty');
    //  alert(trxLnArr[i].primaryQty +' qty');
    if (qty > avalqty) {
      alert('You can not enter more than available quantity');
      trxLnArr1.controls[i].patchValue({ primaryQtyInLtr: '' });
      // qty1.focus();
    }
    if (qty <= 0) {
      alert('Please enter quantity more than zero');
      trxLnArr1.controls[i].patchValue({ primaryQtyInLtr: '' });
      // qty1.focus();
    }

    if(qty<=avalqty)  {
      trxLnArr1.controls[i].patchValue({ primaryQty: (qty*Number(trxLnArr[i].attribute10)) });
    }

    var locId = trxLnArr[i].locatorId;
    var tolocator = trxLnArr[i].transferLocatorId;
    var tosub = this.PaintSubinventoryTransferForm.get('transferSubInv').value;
    var subcode = this.PaintSubinventoryTransferForm.get('subInventoryCode').value;

    // this.displayaddButton=false;
    if (subcode === tosub) {
      // alert('In If')
      if (locId === tolocator) {
        // alert('In 2IF');
        alert('Please select correct locator');
        trxLnArr1.controls[i].patchValue({ LocatorSegment: '' });
        return;
      }
    }
  }


  ValLocator(i: number, loc) {
    alert("Validate");
    // if(qty1)
    var trxLnArr = this.PaintSubinventoryTransferForm.get('trfLinesList').value;
    var trxLnArr1 = this.PaintSubinventoryTransferForm.get(
      'trfLinesList'
    ) as FormArray;
    var locId = trxLnArr[i].locatorId;
    var tolocator = trxLnArr[i].transferLocatorId;
    var tosub = this.PaintSubinventoryTransferForm.get('transferSubInv').value;
    var subcode = this.PaintSubinventoryTransferForm.get('subInventoryCode').value;

    // this.displayaddButton=false;
    if (subcode === tosub) {
      // alert('In If')
      if (locId === tolocator) {
        // alert('In 2IF');
        alert('Please select correct locator');
        trxLnArr1.controls[i].patchValue({ LocatorSegment: '' });
        return;
      }
    }
  }


  downloadSubGatePass() {
    const fileName = 'download.pdf';
   var shipmentNumber = this.PaintSubinventoryTransferForm.get('shipmentNumber').value;
    alert(shipmentNumber +'-------'+sessionStorage.getItem('deptId'))
    if (Number(sessionStorage.getItem('deptId'))===1){
      this.service.downloadSubGatePassSaslesFn(shipmentNumber)
        .subscribe(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          var printWindow = window.open(url, '', 'width=800,height=500');
          printWindow.open
        });
      }
      else{
        this.service.downloadSubInvTrfNotePaint(shipmentNumber)
        .subscribe(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          var printWindow = window.open(url, '', 'width=800,height=500');
          printWindow.open
        });
      } 
      }


  checkHeaderValidation() {

    const formValue: IsubinventoryTransfer = this.PaintSubinventoryTransferForm.getRawValue();
    var msg1;

    if(formValue.subInventoryCode==formValue.transferSubInv) {

      this.headerValidation1 = false;
      msg1 = "[From SubInv]  and [To SubIv]  should not be same.." ;
      alert(msg1);
      return;
    }
    
     

    if (formValue.transferSubInv === undefined || formValue.transferSubInv === null  || formValue.transferSubInv.trim()=='' || formValue.transferSubInv=='--Select--') {

      this.headerValidation1 = false;
      msg1 = "Please Select [To SubInv]....";
      alert(msg1);
      return;
    }

    if (formValue.issueTo === undefined || formValue.issueTo === null  || formValue.issueTo.trim()=='' || formValue.issueTo=='--Select--') {
      this.headerValidation1 = false;
      msg1 = "Please Select [Issue To]....";
      alert(msg1);
      return;
    }

    if (formValue.remarks === undefined || formValue.remarks === null  || formValue.remarks.trim()=='' ) {
      this.headerValidation1 = false;
      msg1 = "Please Enter IPO Number...";
      alert(msg1);
      return;
    }
      
    this.headerValidation1 = true;
  }

  checkLineValidation(i) {
  
      // alert('addrow index '+i);
  
      // var patch = this.paintMiscellaneousForm.get('cycleLinesList') as FormArray;
      // var trxLnArr1 = this.paintMiscellaneousForm.get('cycleLinesList').value;

       var patch = this.PaintSubinventoryTransferForm.get('trfLinesList') as FormArray;
       var trxLnArr1 = this.PaintSubinventoryTransferForm.get('trfLinesList').value;
      var loginDeptId= Number(sessionStorage.getItem('deptId'));
  
      var lineValue1=trxLnArr1[i].segment;
      var lineValue2=trxLnArr1[i].fromLocatorSegment;  // FROM LOCATOR
      var lineValue3=trxLnArr1[i].LocatorSegment;   // TO LOCATOR ; transferLocatorId
      var lineValue4=trxLnArr1[i].transferLocatorId;

      var lineValue5=trxLnArr1[i].primaryQtyInLtr;
      var lineValue6=trxLnArr1[i].primaryQty;


      // alert("Line:"+trxLnArr1[i].locatorId+","+trxLnArr1[i].transferLocatorId+","+trxLnArr1[i].LocatorSegment)
 
       var j=i+1;

    

     
      if(lineValue1===undefined || lineValue1===null || lineValue1.trim()=='' ){
        alert("Line-"+j+ " ITEM CODE:  Should not be null value.");
        this.lineValidation1=false;
        return;
      }

        if(trxLnArr1[i].locatorId=='--Select--') {
        alert("Line-"+j+ " FROM LOCATOR :  Invalid locator");
        this.lineValidation1=false;
        return;
      }

      
      if(loginDeptId==5){
      if (lineValue2 != "M.P.01.P.01" ) {
         alert("Line-"+j+ " FROM LOCATOR :  Invalid locator");
        this.lineValidation1=false;
        return;
       }
      }

      if(loginDeptId==3){
      if (lineValue2 != 'P.N.01.G.01' ) {
         alert("Line-"+j+ " FROM LOCATOR :  Invalid locator");
        this.lineValidation1=false;
        return;
       }
      }
    
      if(lineValue3 !="W.I.01.P.01"){
        alert("Line-"+j+ " TO  LOCATOR :  Invalid Locator");
        this.lineValidation1=false;
        return;
      }

  
      if(lineValue5===undefined || lineValue5===null || lineValue5<=0){
        alert("Line-"+j+ " ISSUE QUANTITY(LTR) :  Please Enter  Valid Data");
        this.lineValidation1=false;
        return;
      }

        if(lineValue6===undefined || lineValue6===null || lineValue6<=0){
        alert("Line-"+j+ " ISSUE QUANTITY(GMS) :  Please Enter  Valid Data");
        this.lineValidation1=false;
        return;
      }
  
         this.lineValidation1=true;
  
      }

      duplicateLineCheck(index, mItem, itemSeg) {
        // alert("in duplicate check section..."+index +" , "+mItem+" , "+itemSeg)
        this.lineItemRepeated = false;
        var trxLnArr1 = this.PaintSubinventoryTransferForm.get('trfLinesList') as FormArray
        var trxLnArr = this.PaintSubinventoryTransferForm.get('trfLinesList').value;
        var len1=trxLnArr.length;
      
         for (let i = 0; i < trxLnArr.length; i++) {
          // var x = trxLnArr[i].invItemId;
          var x = trxLnArr[i].itemId;

          // alert ("i,x,mitem :" +i+","+x +" , "+mItem);

          if (i != index && (x === mItem)) {
            alert(itemSeg + " - Item Already Entered.Please Check Line :" + (i + 1));
            trxLnArr1.controls[index].patchValue({ segment: '' });
      
            this.lineItemRepeated = true;
            break;
          }
        }
      }
  

}

