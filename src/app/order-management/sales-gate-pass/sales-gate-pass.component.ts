// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { OrderManagementService } from 'src/app/order-management/order-management.service';
// import { MasterService } from 'src/app/master/master.service';
// import { Router } from '@angular/router';



// @Component({
//   selector: 'app-sales-gate-pass',
//   templateUrl: './sales-gate-pass.component.html',
//   styleUrls: ['./sales-gate-pass.component.css']
// })
// export class SalesGatePassComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { MasterService } from 'src/app/master/master.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sales-gate-pass',
  templateUrl: './sales-gate-pass.component.html',
  styleUrls: ['./sales-gate-pass.component.css']
})
export class SalesGatePassComponent implements OnInit {
  SalesGatepassForm: FormGroup;
  gatepassNo:number;
  dateOfDelv:Date;
  itemId:number;
  segment:String;
  vin:String;
  modelVarClr:String;
  deliveryLoc:String;
  vehicleNo:String;
  serviceLoc:String;
  orderNumber:number;
  trxNumber:number;
  trxDate:Date;
  dmsSob:String;
  remark:String;
  balOutstandAmt:number;
  excessAmt:number
  lstcomments:any;
  emplId:number;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private orderManagementService: OrderManagementService) {
    this.SalesGatepassForm = fb.group({
      gatepassNo: [''],
      orderNumber:[''],
      emplId:[''],
      })   
     }
  ngOnInit(): void {
    this.emplId = Number(sessionStorage.getItem('emplId'));
  }

  gatePassOrderNo(orderNumber){
    alert(orderNumber);
    this.orderManagementService.getGatepassSearch(orderNumber)
    .subscribe(
      data => {
        this.lstcomments = data.obj;
        console.log(this.lstcomments);
        this.vehicleNo=this.lstcomments.vehicleNo;
        this.dateOfDelv=this.lstcomments.dateOfDelv;
        this.segment=this.lstcomments.segment;
        this.vin=this.lstcomments.vin;
        this.modelVarClr=this.lstcomments.modelVarClr;
        this.deliveryLoc=this.lstcomments.deliveryLoc;
        this.serviceLoc=this.lstcomments.serviceLoc;
        this.orderNumber=this.lstcomments.orderNumber;
        this.trxNumber=this.lstcomments.trxNumber;
        this.trxDate=this.lstcomments.trxDate;
        this.dmsSob=this.lstcomments.dmsSob;
        this.remark=this.lstcomments.remark;
        this.balOutstandAmt=this.lstcomments.balOutstandAmt;
        this.excessAmt=this.lstcomments.excessAmt;
      }
      
    );
  }


  gatepassNoSearch(orderNumber)
  {
    this.orderManagementService.getGatepassSearch(orderNumber)
    .subscribe(
      data => {
        this.lstcomments = data.obj;
        console.log(this.lstcomments);
        this.vehicleNo=this.lstcomments.vehicleNo;
        this.dateOfDelv=this.lstcomments.dateOfDelv;
        this.segment=this.lstcomments.segment;
        this.vin=this.lstcomments.vin;
        this.modelVarClr=this.lstcomments.modelVarClr;
        this.deliveryLoc=this.lstcomments.deliveryLoc;
        this.serviceLoc=this.lstcomments.serviceLoc;
        this.orderNumber=this.lstcomments.orderNumber;
        this.trxNumber=this.lstcomments.trxNumber;
        this.trxDate=this.lstcomments.trxDate;
        this.dmsSob=this.lstcomments.dmsSob;
        this.remark=this.lstcomments.remark;
        this.balOutstandAmt=this.lstcomments.balOutstandAmt;
        this.excessAmt=this.lstcomments.excessAmt;
      }
      
    );
     }

     orderNumberPost(orderNumber)
     {
       alert(orderNumber);
     // const formValue: IDivision = this.transData(this.divisionMasterForm.value);
      this.orderManagementService.orderNoPost(orderNumber,this.emplId).subscribe((res: any) => {
        if (res.code === 200) {
         alert(res.message);
          //window.location.reload();
          this.gatepassNo=res.obj;
         } else {
          if (res.code === 400) {
            alert(res.message);
            // window.location.reload();
          }
        }
      });

     }

  SalesGatepass(SalesGatepassForm){}

  
  resetMast() {
    window.location.reload();
  }

  // closeMast() {
  //   this.router.navigate(['admin']);
  // }

}
