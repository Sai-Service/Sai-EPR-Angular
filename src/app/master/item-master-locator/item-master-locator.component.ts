import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';

interface IItemLocatorMaster {
  locatorId: number;
  locId: number;
  subinventoryId: string;
  segment1: string;
  segment2: string;
  segment3: string;
  segment4: string;
  segment5: string;
  LocatorSegment: string;
  status: string;
  endDate: Date;
  itemId:number;
  subInventoryId:number;
  description:string;
  // copyAddv:string;
}


@Component({
  selector: 'app-item-master-locator',
  templateUrl: './item-master-locator.component.html',
  styleUrls: ['./item-master-locator.component.css']
})
export class ItemMasterLocatorComponent implements OnInit {
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
  itemId:number;
  // copyAddv:string;

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
  public locationIdList: Array<string> = [];
  public subinventoryIdList: Array<string> = [];

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

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.ItemlocatorMasterForm = fb.group({
      locatorId :[],
      locId: ['', [Validators.required]],
      subInventoryId: ['', [Validators.required]],
      segment1: ['', [Validators.required], [ Validators.maxLength(5)], Validators.pattern('[A-Z0-9.]*')],
      segment2: ['', [Validators.required], [ Validators.maxLength(5)], Validators.pattern('[A-Z0-9.]*')],
      segment3: ['', [Validators.required], [ Validators.maxLength(5)], Validators.pattern('[A-Z0-9.]*')],
      segment4: ['', [Validators.required], [ Validators.maxLength(5)], Validators.pattern('[A-Z0-9.]*')],
      segment5: ['', [Validators.required], [ Validators.maxLength(5)], Validators.pattern('[A-Z0-9.]*')],
      status: ['', [Validators.required]],
      endDate: ['', [Validators.nullValidator]],
      LocatorSegment:[],
      Floor:[],
  Rack :[],
  RackNo:[],
  Row:[],
  RowNo:[],
  segment:[],
  itemId:[],
  description:[],

      // copyAddv:[],
    });
  }

  get f() { return this.ItemlocatorMasterForm.controls; }


  ngOnInit(): void {
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );

    this.service.locationIdList()
      .subscribe(
        data => {
          this.locationIdList = data;
          console.log(this.locationIdList);
        }
      );
    this.service.subinventoryIdList()
      .subscribe(
        data => {
          this.subinventoryIdList = data;
          console.log(this.subinventoryIdList);
        }
      );
      this.service.ItemIdDivisionList(this.divisionId).subscribe(
        data =>{ this.ItemIdList = data;
          console.log(this.ItemIdList);

     });
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
  onOptiongetItem(event:any)
  {
    let select1=this.ItemIdList.find(d=>d.SEGMENT===event);
    this.ItemlocatorMasterForm.patchValue({itemId:select1.itemId})
    // var subcode=this.ItemlocatorMasterForm.get('subInventory').value;
      this.service.getItemDetail(select1.itemId).subscribe
      (data => {this.getItemDetail = data;
        // alert("this.getItemDetail.description" + this.getItemDetail.description);
        if(this.getItemDetail.description !=undefined){
          this.ItemlocatorMasterForm.patchValue({description: this.getItemDetail.description});
        }
      } );

  }


  okLocator()
  {

    // alert(i);

    this.LocatorSegment=this.ItemlocatorMasterForm.get('Floor').value+'.'+
                                 this.ItemlocatorMasterForm.get('Rack').value+'.'+
                                 this.ItemlocatorMasterForm.get('RackNo').value+'.'+
                                 this.ItemlocatorMasterForm.get('Row').value+'.'+
                                 this.ItemlocatorMasterForm.get('RowNo').value;


    var LocatorSegment1=this.LocatorSegment;
    // alert(this.LocatorSegment1);
    this.ItemlocatorMasterForm.patchValue({'LocatorSegment': this.LocatorSegment})

    this.service.LocatorNameList(LocatorSegment1,Number(sessionStorage.getItem('locId'))).subscribe
    (data =>{
       this.LocatorList = data

       if(this.LocatorList.code===200)
       {
        this.ItemlocatorMasterForm.patchValue({ locatorId: this.LocatorList.obj.locatorId })

       if(this.LocatorList.lengh==0)
       {
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

     var LocSegment=this.ItemlocatorMasterForm.get('LocatorSegment').value;

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
       this.Floor= temp[0];
       this.Rack = temp[1];
       this.RackNo = temp[2];
       this.Row = temp[3];
       this.RowNo = temp[4];
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
    const aaa = segment1 + '.' + segment2 + '.' + segment3 + '.' + segment4 + '.' + segment5;
    // this.segmentName = aaa;
    this.ItemlocatorMasterForm.patchValue({segmentName:aaa})
  }
  transData(val) {
    delete val.locatorId;
    return val;
  }

  newMast() {
    // this.submitted = true;
    // if(this.ItemlocatorMasterForm.invalid){
    //   return;
    // }
    const formValue: IItemLocatorMaster = this.ItemlocatorMasterForm.value;
    // var subId= this.subinventoryIdList.find(d => d.sub === locatorId);
    this.service.ItemLocatorMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
        // this.locatorMasterForm.reset();
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          // this.locatorMasterForm.reset();
          // window.location.reload();
        }
      }
    });
  }

  updateMast() {
    const formValue: IItemLocatorMaster = this.ItemlocatorMasterForm.value;
    this.service.UpdateItemLocatorMaster(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.ItemlocatorMasterForm.reset();
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

  searchMast() {
    this.service.getLocatorMasterSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };

  Select(locatorId: number) {
    let select = this.lstcomments.find(d => d.locatorId === locatorId);
    if (select) {
      this.ItemlocatorMasterForm.patchValue(select);
      this.displayButton = false;
      this.display = false;
    }
  }




}
