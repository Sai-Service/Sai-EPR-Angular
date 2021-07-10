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
  invoiceNo:number;
  invoiceDt:Date;
  custName:string;
  custAdd:string;
  contactNo:number;
  contactPerson:string;
  salesExeName:string;
 

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private orderManagementService: OrderManagementService) {
    this.SalesGatepassForm = fb.group({
      gatepassNo: [''],
      orderNumber:[''],
      emplId:[''],
      segment:[],
      vin:[],
      modelVarClr:[],
      deliveryLoc:[],
      serviceLoc:[],
      dateOfDelv:[],
      invoiceNo:[],
      invoiceDt:[],
      vehicleNo:[],
      dmsSob:[],
      remark:[],
      custName:[],
      custAdd:[],
      contactNo:[],
      contactPerson:[],
  salesExeName:[],
  balOutstandAmt:[],
  excessAmt:[],
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
        this.invoiceNo=this.lstcomments.invoiceNo;
        this.invoiceDt=this.lstcomments.invoiceDt;
        this.dmsSob=this.lstcomments.dmsSob;
        this.remark=this.lstcomments.remark;
        this.balOutstandAmt=this.lstcomments.balOutstandAmt;
        this.excessAmt=this.lstcomments.excessAmt;
        this.custName=this.lstcomments.custName;
        this.custAdd=this.lstcomments.custAdd;
        this.contactNo=this.lstcomments.contactNo;
        this.salesExeName=this.lstcomments.salesExeName;
        this.contactPerson=this.lstcomments.contactPerson;
        this.gatepassNo=this.lstcomments.gatepassNo;
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
        this.SalesGatepassForm.patchValue(this.lstcomments);
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

  Close() {
    this.router.navigate(['admin']);
  }

}
