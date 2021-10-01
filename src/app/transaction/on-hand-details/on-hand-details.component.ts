import { PathLocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';

interface IOnhanddetails {
  segment: string;
  invItemId: number;
  locId: number;
  deptId: number;
  divisionId: number;
  segmentName: string;
  onHandQty: number;
  subInventoryCode: string;
  description: string;
}


@Component({
  selector: 'app-on-hand-details',
  templateUrl: './on-hand-details.component.html',
  styleUrls: ['./on-hand-details.component.css']
})
export class OnHandDetailsComponent implements OnInit {
onhandDetailsForm:FormGroup;

  public ItemIdList:any[];
  public Itemdata:any[];
  segment:string;
  invItemId:number;
  ouId:number;
  ouName:string;
  locName:string;
  locId:number;
  deptId:number;
  divisionId:number;
  segmentName:string;
  onHandQty:number;
  subInventoryCode:string;
  description:string;
  itemId:number;
  
  userList2: any[] = [];
  lastkeydown1: number = 0;

  desc:string;
  uom:string;
  hsnSacCode :string;
  gstPer:number;
  salePrice:number;
  purchPrice:number;
  mrp:number;
  



  constructor(private fb: FormBuilder, private router: Router, private service: MasterService)
  {
    this.onhandDetailsForm=fb.group({
      segment:[''],
      invItemId:[''],
      ouId:[],
      ouName:[],
      locName:[],
      locId:[''],
      deptId:[''],
      divisionId:[''],
      segmentName:[''],
      onHandQty:[''],
      subInventoryCode:[''],
      description:[''],
      desc:[],
      uom:[],
      hsnSacCode:[],
      gstPer:[],
      salePrice:[],
      purchPrice:[],
      mrp:[],


    })
   }
   
  ngOnInit(): void {
    this.locId=Number(sessionStorage.getItem('locId'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    this.locName=(sessionStorage.getItem('locName'));



    this.service.ItemIdDivisionList(this.divisionId).subscribe(
      data =>{ this.ItemIdList = data;
        console.log(this.ItemIdList);

   });
  }
  OnHandDetails(onhandDetailsForm:any){}

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
 
 searchByItem(segment)
 {
  //  alert(this.onhandDetailsForm.get('segment').value);
   var segment1=this.onhandDetailsForm.get('segment').value
   let select1=this.ItemIdList.find(d=>d.SEGMENT===segment1);
  // var itemId= select1.itemId
  //  alert(itemId);
  //  var itemId=this.averagecostForm.get('invItemId').value;
  //  alert(itemId);
  this.service.searchByItem(select1.itemId,this.locId).subscribe(
    data =>{
      this.Itemdata= data;
      // alert("this.Itemdata.length :"+this.Itemdata.length);
      if(this.Itemdata.length >0 ){
      this.segment=this.Itemdata[0].itemCode;
      this.desc=this.Itemdata[0].desc;
      this.uom=this.Itemdata[0].uom;

      console.log(data);
      this.onhandDetailsForm.patchValue(data);
      } else { alert(segment1+" - Stock not  Available...");}
 })


}

}
