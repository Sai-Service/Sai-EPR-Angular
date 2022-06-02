import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';
import * as xlsx from 'xlsx';

interface IItemLocatorMaster {
  locatorId: number;
  locId: number;
  subinventoryId: string;
  segment1: string;
  segment2: string;
  segment3: string;
  segment4: string;
  segment5: string;
  // LocatorSegment: string;
  attribute8:string;
  status: string;
  endDate: Date;
  itemId:number;
  subInventoryId:number;
  description:string;
  // copyAddv:string;
  locationId:number;
  subId:number;
  subInventoryCode:string;
  locCode:string;
  itemLocatorId:number;
  attribute7:string;
}


@Component({
  selector: 'app-item-master-locator',
  templateUrl: './item-master-locator.component.html',
  styleUrls: ['./item-master-locator.component.css']
})
export class ItemMasterLocatorComponent implements OnInit {
  @ViewChild('epltable1', { static: false }) epltable1: ElementRef;
  ItemlocatorMasterForm: FormGroup;
  submitted = false;
  locatorId: number;
  locId: number;
  subinventoryId: string;
  segment1: string;
  segment2: string;
  segment3: string;
  segment4: string;
  segment5: string;
  LocatorSegment: string;
  attribute8:string;
  itemId:number;
  // copyAddv:string;
  orderedItem: string;
  endDate: Date;
  public status = "Active";
  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  lstcomments: any[];
  display = true;
  displayButton = true;
  public minDate = new Date();
  public statusList: Array<string> = [];
  public locationIdList: any = [];
  public subinventoryIdList: Array<string> = [];
  attribute7:string;
  userList2: any[] = [];
  lastkeydown1: number = 0;
  divisionId: number;
  public ItemIdList:any[];
  getItemDetail: any;
  LocatorList: any;
  Floor:string;
  Rack :string;
  RackNo:string;
  Row:string;
  RowNo:string;
  segment:string;
  subInventoryId:number;
  description:string
  locationId:number;
  subId:number;
  subInventoryCode:string;
  locCode:string;
  itemLocatorId:number;


  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;
  @ViewChild('input4') input4: ElementRef;
  @ViewChild('input5') input5: ElementRef;
  @ViewChild('input6') input6: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private orderManagementService: OrderManagementService) {
    this.ItemlocatorMasterForm = fb.group({
      locatorId :[],
      locId: ['', [Validators.required]],
      subInventoryId: ['', [Validators.required]],
      // segment1: ['', [Validators.required], [ Validators.maxLength(5)], Validators.pattern('[A-Z0-9.]*')],
      // segment2: ['', [Validators.required], [ Validators.maxLength(5)], Validators.pattern('[A-Z0-9.]*')],
      // segment3: ['', [Validators.required], [ Validators.maxLength(5)], Validators.pattern('[A-Z0-9.]*')],
      // segment4: ['', [Validators.required], [ Validators.maxLength(5)], Validators.pattern('[A-Z0-9.]*')],
      // segment5: ['', [Validators.required], [ Validators.maxLength(5)], Validators.pattern('[A-Z0-9.]*')],
      status: [''],
      endDate: ['', [Validators.nullValidator]],
      LocatorSegment:[],
      attribute8:[],
      Floor:[],
  Rack :[],
  RackNo:[],
  Row:[],
  RowNo:[],
  segment:[],
  itemId:[],
  description:[],
  locationId:[],
  subId:[],
  orderedItem:[],
  subInventoryCode:[],
  locCode:[],
  itemLocatorId:[],
  attribute7:[],
      // copyAddv:[],
    });
  }

  get f() { return this.ItemlocatorMasterForm.controls; }


  ngOnInit(): void {
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.locationId=Number(sessionStorage.getItem('locId'));
    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );

    this.service.locationIdList1(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.locationIdList = data;
          console.log(this.locationIdList);
        }
      );
    this.service.subinventoryIdList1(sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          this.subinventoryIdList = data;
          console.log(this.subinventoryIdList);
        }
      );
    //   this.service.ItemIdDivisionList(this.divisionId).subscribe(
    //     data =>{ this.ItemIdList = data;
    //       console.log(this.ItemIdList);

    //  });
  }

  ItemlocatorMaster(ItemlocatorMasterForm: any) {

  }

  // copyAdd(e) {
  //   if (e.target.checked) {
  //   this.copyAddv='Y'
  //   }
  //   else{
  //     this.copyAddv = 'N';
  //   }
  // }

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
  onOptiongetItem(event:any){
    // alert(event.target.value)
    // var itemDesc=event;
    var itemDesc = event.target.value.toUpperCase();
    this.orderManagementService.searchByItemSegmentDiv(this.divisionId, itemDesc)
      .subscribe(
        data => {
          this.orderedItem = data[0].description;
          console.log(data[0].description);
          this.ItemlocatorMasterForm.patchValue({description: data[0].description});
          this.ItemlocatorMasterForm.patchValue({itemId: data[0].itemId});
        })
      }
  


  okLocator()
  {
   var subInventoryId=this.ItemlocatorMasterForm.get('subId').value;
    alert(subInventoryId)
    this.LocatorSegment=this.ItemlocatorMasterForm.get('Floor').value.toUpperCase()+'.'+
                                 this.ItemlocatorMasterForm.get('Rack').value.toUpperCase()+'.'+
                                 this.ItemlocatorMasterForm.get('RackNo').value.toUpperCase()+'.'+
                                 this.ItemlocatorMasterForm.get('Row').value.toUpperCase()+'.'+
                                 this.ItemlocatorMasterForm.get('RowNo').value.toUpperCase();
    var LocatorSegment1=this.LocatorSegment.toUpperCase();
    // alert(LocatorSegment1);
    this.ItemlocatorMasterForm.patchValue({'attribute8': this.LocatorSegment.toUpperCase()})
    this.service.LocatorNameList(LocatorSegment1,Number(sessionStorage.getItem('locId')),subInventoryId).subscribe
    (data =>{
       this.LocatorList = data
       if(this.LocatorList.code===200) {
         alert(this.LocatorList.obj.locatorId)
        this.ItemlocatorMasterForm.patchValue({ locatorId: this.LocatorList.obj.locatorId })
       if(this.LocatorList.lengh==0) {
         alert('Invalid Code Combination');
       }
       else{
         this.locatorId=(this.LocatorList.obj.locatorId);
       }
      }
      else if (this.LocatorList.code===400) {
        this.ItemlocatorMasterForm.patchValue({LocatorSegment : ''});
      }
      });
      this.ItemlocatorMasterForm.get('Floor').reset();
      this.ItemlocatorMasterForm.get('Rack').reset();
      this.ItemlocatorMasterForm.get('RackNo').reset();
      this.ItemlocatorMasterForm.get('Row').reset();
      this.ItemlocatorMasterForm.get('RowNo').reset();
      alert('locator search complete')
   }

   OpenLocator()
   {
     var LocSegment1=this.ItemlocatorMasterForm.get('attribute8').value;
      var LocSegment = LocSegment1.toUpperCase();
      // alert(LocSegment)
     if (LocSegment===null)
     {
       this.ItemlocatorMasterForm.get('Floor').reset();
       this.ItemlocatorMasterForm.get('Rack').reset();
       this.ItemlocatorMasterForm.get('RackNo').reset();
       this.ItemlocatorMasterForm.get('Row').reset();
       this.ItemlocatorMasterForm.get('RowNo').reset();
     }
     if(LocSegment!=null)
     {
       var temp = LocSegment.split('.');
       // alert(temp[0]);
       this.Floor= temp[0].toUpperCase();
       this.Rack = temp[1].toUpperCase();
       this.RackNo = temp[2].toUpperCase();
       this.Row = temp[3].toUpperCase();
       this.RowNo = temp[4].toUpperCase();
     }
         // this.showModal = true;
        //  this.content = i;
        //  let a = i + 1
        //  this.title = "Locator :" + a;


   }

  onOptionsSelected(event: any) {
    this.Status1 = this.ItemlocatorMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.ItemlocatorMasterForm.get('endDate').reset();
    }
  }

  onKey(event: any) {
    var segment1=this.ItemlocatorMasterForm.get('segment1').value;
    var segment2=this.ItemlocatorMasterForm.get('segment2').value;
    var segment3=this.ItemlocatorMasterForm.get('segment3').value;
    var segment4=this.ItemlocatorMasterForm.get('segment4').value;
    var segment5=this.ItemlocatorMasterForm.get('segment5').value;
    // alert(segment1 + '.' + segment2 + '.' + segment3 + '.' + segment4 + '.' + segment5);
    // var segment1=this.locatorMasterForm.get('')
    const aaa = segment1.toUpperCase() + '.' + segment2.toUpperCase() + '.' + segment3.toUpperCase() + '.' + segment4.toUpperCase() + '.' + segment5.toUpperCase();
      // alert(aaa)
    // this.segmentName = aaa;
    this.ItemlocatorMasterForm.patchValue({attribute8:aaa})
  }
  transData(val) {
    delete val.locatorId;
    return val;
  }

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

  newMast() {
    const formValue: IItemLocatorMaster = this.ItemlocatorMasterForm.getRawValue();
    // var subId= this.subinventoryIdList.find(d => d.sub === locatorId);
    this.service.ItemLocatorMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // this.locatorMasterForm.reset();
        // window.location.reload();
        this.ItemlocatorMasterForm.disable()
      } else {
        if (res.code === 400) {
          alert(res.message);
          // this.locatorMasterForm.reset();
          // window.location.reload();
        }
      }
    });
  }

  updateMast() {
    const formValue: IItemLocatorMaster = this.ItemlocatorMasterForm.getRawValue();
    formValue.subInventoryId=this.ItemlocatorMasterForm.get('subId').value;
    let select = this.locationIdList.find(d => d.locCode === this.ItemlocatorMasterForm.get('locCode').value);
    formValue.locId=select.locId;
    this.service.UpdateItemLocatorMaster(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.ItemlocatorMasterForm.disable();
        // window.location.reload();
      } else {
        if (res.code === 400) {
          alert(res.message);
          // this.ItemlocatorMasterForm.reset();
        }
      }
    });
  };

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  searchMast(subId) {

    // alert(subId);
    var locId1=this.ItemlocatorMasterForm.get('locId').value;
    var subId=this.ItemlocatorMasterForm.get('subId').value;
    var itemId=this.ItemlocatorMasterForm.get('itemId').value;
    this.service.getItemLocatorMasterSearchNew(this.locationId,subId,itemId)
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);

        }
      );
  };

  Select(locatorId: number) {
    let select = this.lstcomments.find(d => d.locatorId === locatorId);
    var subInventoryId= this.ItemlocatorMasterForm.get('subId').value;
    // alert(subInventoryId);
    if (select) {
      this.ItemlocatorMasterForm.patchValue(select);
      this.ItemlocatorMasterForm.patchValue({attribute8:select.segmentName,subInventoryCode:select.subInventoryCode,subinventoryId:subInventoryId});
      this.displayButton = false;
      this.display = false;
    }
  }


  exportToExcel1() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable1.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable1.xlsx');
   }

}
