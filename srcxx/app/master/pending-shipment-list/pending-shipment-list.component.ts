import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { data } from 'jquery';
import { DatePipe } from '@angular/common';
import { Location } from "@angular/common";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pending-shipment-list',
  templateUrl: './pending-shipment-list.component.html',
  styleUrls: ['./pending-shipment-list.component.css']
})
export class PendingShipmentListComponent implements OnInit {
  pendingShipmentListForm: FormGroup;
  subInv: string;
  ShipPendingList: any[];
  shipmentNumber: string;
  constructor(private fb: FormBuilder, private location: Location, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.pendingShipmentListForm = fb.group({
      subInv: [''],
      shipmentNumber: [''],
    })
  }

  ngOnInit(): void {
    this.service.getShipmentList(sessionStorage.getItem('locId'),sessionStorage.getItem('deptId') ,sessionStorage.getItem('divisionId'))
    .subscribe(
      (data: any) => {
        this.ShipPendingList = data.obj;
        // alert(data.message)
        console.log(this.ShipPendingList);
      }
    );
  }


  pendingShipmentList(pendingShipmentListForm: any) {
  }

  // pendingList(subInv) {
  //   // alert(subInv);
  //   this.service.getShipmentList(sessionStorage.getItem('locId'),sessionStorage.getItem('deptId') ,sessionStorage.getItem('divisionId'))
  //     .subscribe(
  //       (data: any) => {
  //         this.ShipPendingList = data.obj;
  //         // alert(data.message)
  //         console.log(this.ShipPendingList);
  //       }
  //     );
  // }



  viewShipDetails(shipmentNumber) {
    this.router.navigate(['/admin/master/PoReceiptForm'], { queryParams: { shipmentNumber: shipmentNumber } });
    // alert(segment1);
  }

  refresh() {
    window.location.reload();
  }

  close() {
    this.location.back();
  }


}

