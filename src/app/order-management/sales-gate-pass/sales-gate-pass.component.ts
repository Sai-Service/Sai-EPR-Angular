

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { MasterService } from 'src/app/master/master.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { ActivatedRoute, ParamMap } from '@angular/router';


const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};




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
  private sub: any;
  shipToLoc:number;
  public BillShipList: Array<string> = [];

  constructor(private fb: FormBuilder, private router: Router,private router1: ActivatedRoute, private service: MasterService,private orderManagementService: OrderManagementService) {
    this.SalesGatepassForm = fb.group({
      gatepassNo: [''],
      shipToLoc:[''],
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
    this.shipToLoc=Number(sessionStorage.getItem('locCode'));

    this.sub = this.router1.params.subscribe(params => {
      this.orderNumber = params['orderNumber'];
      // alert(this.orderNumber)
      if (this.orderNumber != undefined) {
        this.orderNumberPost(this.orderNumber,sessionStorage.getItem('locId'));
      }
    });

    this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
    .subscribe(
      data => {
        this.BillShipList = data;
        console.log(this.BillShipList);
      }
    );
  }

  gatePassOrderNo(orderNumber){
    // alert(orderNumber);
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

     orderNumberPost(orderNumber,locId)
     {
     // const formValue: IDivision = this.transData(this.divisionMasterForm.value);
      this.orderManagementService.orderNoPost(orderNumber,this.emplId,locId).subscribe((res: any) => {
        if (res.code === 200) {
         alert(res.message);
         this.gatepassNoSearch(this.orderNumber);
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


  

  downloadGatePass(){
    // const fileName = 'download.pdf';
    // const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.orderManagementService.downloadGatePass(this.orderNumber)
    .subscribe(data => {
      // saveAs(new Blob([data], { type: MIME_TYPES[EXT] }));
      var blob = new Blob([data], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      var printWindow = window.open(url, '', 'width=800,height=500');
      printWindow.open
    });
  }
  
}
