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
  lstShipList: any;

  dataDisplay: any;spinIcon = false;
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

  scope:string='fromloc';
  startDate:string;
  
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
      startDate:[],


   
      shipLines: this.fb.array([this.lineDetailsGroup()])

    });
  }

  lineDetailsGroup() {
    return this.fb.group({
      shippingNetId:[],
      fromLocationId:[],
      toLocationId:[],
      transfereType:[],
      interOrgReceivable:[],
      interOrgPayable:[],
      custAccountNo:[],
      custName:[],
      custSite:[],
      suppNo:[],
      name:[],
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


  find1(){
    var mScope = this.shippingNetworkForm.get('scope').value
    // alert ("Scope :" +mScope);
    this.spinIcon = true;
    if(mScope ==='fromloc'){ this.fromScopeData();this.dataDisplay = 'Loading Data(From Org)....Please Wait...';  }
    if(mScope ==='toloc'){ this.toScopeData();this.dataDisplay = 'Loading Data(To Org)....Please Wait...';  }
   }

  fromScopeData() {
     var mLocId = this.shippingNetworkForm.get('locId').value
    this.service.getShipNetFromDetails(mLocId)
      .subscribe(
        data => {
          this.lstShipList = data;
          // alert ("Total order lines :" +data.length);
          if (data.length > 0) {
           
           this.shippingNetworkForm.get('locId').disable();

            console.log(this.lstShipList);
            var len = this.lineDetailsArray().length;
            var y = 0;
            for (let i = 0; i < this.lstShipList.length - len; i++) {
              var ordLnGrp: FormGroup = this.lineDetailsGroup();
              this.lineDetailsArray().push(ordLnGrp);
              y = i;

            }

            this.shippingNetworkForm.get('shipLines').patchValue(this.lstShipList);
            this.spinIcon = false;this.dataDisplay = ''; 

            var shipLineArr = this.shippingNetworkForm.get('shipLines').value;
            var patch = this.shippingNetworkForm.get('shipLines') as FormArray;
            var z1 = this.pipe.transform(Date.now(), 'y-MM-dd');

            for (let i = 0; i < this.lstShipList.length - len; i++) {
            patch.controls[i].patchValue({ startDate: z1 })
            }

          }  
          else { this.spinIcon = false;  this.dataDisplay = '';   }
        });
  }

  toScopeData() {
    var mLocId = this.shippingNetworkForm.get('locId').value
   this.service.getShipNetToDetails(mLocId)
     .subscribe(
       data => {
         this.lstShipList = data;
         // alert ("Total order lines :" +data.length);
         if (data.length > 0) {
          
          this.shippingNetworkForm.get('locId').disable();

           console.log(this.lstShipList);
           var len = this.lineDetailsArray().length;
           var y = 0;
           for (let i = 0; i < this.lstShipList.length - len; i++) {
             var ordLnGrp: FormGroup = this.lineDetailsGroup();
             this.lineDetailsArray().push(ordLnGrp);
             y = i;

           }

           this.shippingNetworkForm.get('shipLines').patchValue(this.lstShipList);
           this.spinIcon = false;this.dataDisplay = ''; 

         }  
         else { this.spinIcon = false;  this.dataDisplay = '';   }
       });
 }


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
      if (ordLineArr[index].fromLocationId > 0 && ordLineArr[index].toLocationId >= 0) {
        this.lineDetailsArray().push(this.lineDetailsGroup());
      } else {

        if(index>0) {
        alert("Incomplete Line...Line will be deleted ");
        this.lineDetailsArray().removeAt(index);
        }
        }
    } }


 

}
