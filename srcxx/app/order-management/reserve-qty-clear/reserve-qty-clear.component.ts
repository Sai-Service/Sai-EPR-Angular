import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { Location } from "@angular/common";
import { saveAs } from 'file-saver';

interface IrserverForm {
  itemSeg: string;
  locId: number;
}

@Component({
  selector: 'app-reserve-qty-clear',
  templateUrl: './reserve-qty-clear.component.html',
  styleUrls: ['./reserve-qty-clear.component.css']
})
export class ReserveQtyClearComponent implements OnInit {
  resverQtyClearForm: FormGroup;
  description: string;
  itemSeg: string;
  public itemMap = new Map<string, any[]>();
  public itemMap2 = new Map<number, any[]>();
  orderedItem: string;
  constructor(private fb: FormBuilder, private router1: ActivatedRoute, private location: Location, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.resverQtyClearForm = fb.group({
      itemSeg: [],
      description: [],
    })
  }


  get f() { return this.resverQtyClearForm.controls; }
  resverQtyClear(resverQtyClearForm: any) { }

  ngOnInit(): void {
  }

  reserveClear() {
    var itemCode=this.resverQtyClearForm.get('itemSeg').value;
    this.service.reserveQtyDelete(itemCode, Number(sessionStorage.getItem('locId'))).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        window.location.reload();
      }
    });
   }

   refresh() {
    window.location.reload();
  }
  close() {
    this.router.navigate(['admin']);
  }

  searchByItemSegmentDiv(itemDesc: string) {
    var itemDesc = itemDesc.toUpperCase();
    this.orderManagementService.searchByItemSegmentDiv(sessionStorage.getItem('divisionId'), itemDesc)
      .subscribe(
        data => {
          this.orderedItem = data.description;
          console.log(data.description);
          this.itemMap.set(itemDesc, data);
          this.resverQtyClearForm.patchValue({ description: data[0].description })
        }

      )
  }
}
