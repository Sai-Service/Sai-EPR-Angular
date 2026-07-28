import { Component, OnInit, HostListener, ViewChild, ElementRef, NgModule } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as xlsx from 'xlsx';
import { OrderManagementService } from 'src/app/order-management/order-management.service';

@Component({
  selector: 'app-spares-order-list',
  templateUrl: './spares-order-list.component.html',
  styleUrls: ['./spares-order-list.component.css']
})
export class SparesOrderListComponent implements OnInit {
orderListForm: FormGroup;
  poPendingListForm: FormGroup;
  pipe = new DatePipe('en-US');
  today = new Date();
  minDate = new Date();
  startDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
  endDt = this.pipe.transform(this.today, 'dd-MMM-yyyy');
  orderListDetails: any = [];

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: OrderManagementService) {
    this.orderListForm = this.fb.group({
      startDt: [],
      endDt: [],
      status: [],
    })
  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    var endDt1 = new Date(this.today);
    endDt1.setDate(endDt1.getDate() + 1);
    this.endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
    this.service.getBackOrderByUser( this.startDt, this.endDt, Number(sessionStorage.getItem('locId'))).subscribe((res: any) => {
      if (res.code === 400) {
        this.orderListDetails = res.obj;

      }
      else {
        if (res.code === 200) {
          alert(res.message);
        }
      }
    })
  }

  orderList(orderListForm) {
  }


  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }



   getPO() {
    var stDt = this.orderListForm.get('startDt').value;
    var stDate = this.pipe.transform(stDt, 'dd-MMM-yyyy');
// alert('iiiiii')
    var endDtSt = this.orderListForm.get('endDt').value;
    var endDt1 = new Date(endDtSt);
    // endDt1.setDate(endDt1.getDate() + 1);
   var endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
    this.service.getBackOrderByUser( stDate, endDt, Number(sessionStorage.getItem('locId'))).subscribe((res: any) => {
      (document.getElementById('search') as HTMLInputElement).disabled = true;
      if (res.code === 400) {
        this.orderListDetails = res.obj;
      (document.getElementById('search') as HTMLInputElement).disabled = false;
      }
      else {
        if (res.code === 200) {
          alert(res.message);
          (document.getElementById('search') as HTMLInputElement).disabled = false;
        }
      }
    })

  }
}
