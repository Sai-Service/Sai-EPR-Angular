import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
// import * as converter from 'number-to-words';


interface IShipNetwork {}

@Component({
  selector: 'app-shipping-network',
  templateUrl: './shipping-network.component.html',
  styleUrls: ['./shipping-network.component.css']
})
export class ShippingNetworkComponent implements OnInit {
  shippingNetworkForm : FormGroup;

  pipe = new DatePipe('en-US');
  now = Date.now();

  public OUIdList: Array<string> = [];
  public DepartmentList: Array<string> = [];
  public statusList: Array<string> = [];
  public locIdList: Array<string> = [];

  loginName:string;
  divisionId:number;
  loginArray:string;
  name:string;
  ouName : string;
  locId: number;
  locName : string;
  orgId:number;
  ouId :number;
  deptId:number; 
  emplId :number;

  scope:string;
  
  constructor(private service: MasterService,private orderManagementService:OrderManagementService,private transactionService: TransactionService , private  fb: FormBuilder, private router: Router) {
    this.shippingNetworkForm = fb.group({ 

      loginArray:[''],
      loginName:[''],
      divisionId:[],
      ouName :[''],
      locId:[''],
      locationId:[],
      locName :[''],
      ouId :[],
      deptId :[],
      emplId:[''],
      orgId:[''],

      scope:[],


   
      shipLines: this.fb.array([this.lineDetailsGroup()])

    });
  }

  lineDetailsGroup() {
    return this.fb.group({
      fromOrg:[],
      toOrg:[],
      trfType:[],
      interOrgRcvble:[],
      interOrgPayable:[],
      custNo:[],
      custName:[],
      custSite:[],
      supNo:[],
      supName:[],
      supSite:[],
      overDueDays:[],
      startDate:[],
      endDate:[],
     
    });
  }

  

  lineDetailsArray(): FormArray {
    return <FormArray>this.shippingNetworkForm.get('shipLines')
  }


  
  get f() { return this.shippingNetworkForm.controls; }

  shippingNetwork(shippingNetworkForm: any) { }


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.name = sessionStorage.getItem('name');
    this.loginArray = sessionStorage.getItem('divisionName');
    this.loginName = sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.locName = (sessionStorage.getItem('locName'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    this.emplId = Number(sessionStorage.getItem('emplId'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.orgId = this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);


    
    // this.service.OUIdList()
    //   .subscribe(
    //     data => {
    //       this.OUIdList = data;
    //       console.log(this.OUIdList);
    //     }
    //   );

   

    // this.service.locationIdList()
    // .subscribe(
    //   data => {
    //     this.locIdList = data;
    //     console.log(this.locIdList);
    //   }
    // );


      this.service.OUIdListDiv(sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          this.OUIdList = data;
          console.log(this.OUIdList);
        }
      );
   
   
   this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
    .subscribe(
      data => {
        this.locIdList = data;
        console.log(this.locIdList);
   
       }
        );
   
     

  }

  find1(){}

  clearSearch() {
    // this.jobcardForm.get('jobCardNum2').reset();
    // this.jobcardForm.get('regNo1').reset();
    // this.jobcardForm.get('JobOpenDt').reset();
    // this.jobcardForm.get('jobStatus1').enable();
    
    // this.lstJobcardList = null;
  }

  
  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  newMast(){
    alert ("Save Data ...wip");
  }

  onSelectTrfType(evnt) {
    // alert ("Transfer Type Selected  : "+evnt);
  }

  onSelectFromOrg(org,index){
    if(org !=null) {
    var patch = this.shippingNetworkForm.get('shipLines') as FormArray;
    var shipLineArr = this.shippingNetworkForm.get('shipLines').value;

    var x = shipLineArr[index].fromOrg;
    var y=shipLineArr[index].toOrg;

    if(x===y) { patch.controls[index].patchValue({ fromOrg: '' });
      // alert (" From Org : From Org and To Org Should not be Same...");
     
    return;
    } 
  }
  }


  onSelectToOrg(org, index){
    if(org !=null) {
    var patch = this.shippingNetworkForm.get('shipLines') as FormArray;
    var shipLineArr = this.shippingNetworkForm.get('shipLines').value;

    var x = shipLineArr[index].fromOrg;
    var y=shipLineArr[index].toOrg;

    if(x===y) {
      patch.controls[index].patchValue({ toOrg: '' });
      // alert (" To Org : From Org and To Org Should not be Same...");
      
    return;
    } 
  }
  }

  
  addNewRow() {
    var len1 = this.lineDetailsArray().length - 1;
    this.addRow(len1);
  }

  
  addRow(index) {
    var ordLineArr = this.shippingNetworkForm.get('shipLines').value;
    var len1 = this.lineDetailsArray().length - 1;
    if (len1 === index) {
      if (ordLineArr[index].fromOrg > 0 && ordLineArr[index].toOrg >= 0) {
        this.lineDetailsArray().push(this.lineDetailsGroup());
      } else {

        if(index>0) {
        alert("Incomplete Line...Line will be deleted ");
        this.lineDetailsArray().removeAt(index);
        }
        }
    } }


 

}
