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

interface ISalesBookingForm {
  itemSeg:string;
  attribute1:number;
}

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

@Component({
  selector: 'app-price-updation',
  templateUrl: './price-updation.component.html',
  styleUrls: ['./price-updation.component.css']
})


export class PriceUpdationComponent implements OnInit {
  PriceUpdationForm: FormGroup;
  orderedItem: string;
  itemSeg:string;
  segment:string;
  description:string;
  price:number;
  attribute1:number;
  id:number;
  // orderedItem:string;
  public itemMap = new Map<string, any[]>();
  public itemMap2 = new Map<number, any[]>();

  constructor(private fb: FormBuilder, private router1: ActivatedRoute, private location: Location, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService, private transactionService: TransactionService) {
    this.PriceUpdationForm = fb.group({
      itemSeg:[''],
      segment:[''],
      orderedItem:[''],
      description:[''],
      price:[''],
      attribute1:[''],
      id:[''],
    })
   }

   PriceUpdation(PriceUpdationForm: any) { }
  ngOnInit(): void {
  }
  searchByItemSegmentDiv(itemDesc: string) {
    var itemDesc = itemDesc.toUpperCase();
    this.orderManagementService.searchByItemSegmentDiv(sessionStorage.getItem('divisionId'), itemDesc)
      .subscribe(
        data => {
          this.orderedItem = data.description;
          console.log(data.description);
          this.itemMap.set(itemDesc, data);
          this.PriceUpdationForm.patchValue({description:data[0].description})
          // this.itemMap2.set(this.itemMap.get(itemDesc));
        }

      )
  }
  // onOptionsSelectedDescription(segment: string) {
  //   let select = (this.itemMap2.get(1)).find(d => d.segment === segment);
  // }
  transData(val){
    return val;
  }

  refresh() {
    window.location.reload();
  }
  close() {
    this.router.navigate(['admin']);
  }

  itemDetailsList:any=[];
  prc:number;
  itemDetails(itemSeg){
    this.orderManagementService.getOnHandQty(sessionStorage.getItem('locId'),itemSeg,6).subscribe((res: any) => {
        this.itemDetailsList=res;
      //   for (let i=0;i<res.length;i++){
      //   alert(res[i].prc);
      //   if (res[i].prc===null){
      //     this.prc=0;
      //   }
      // }
        // this.PriceUpdationForm.patchValue({id:res.id})
    })
  }

update(id){
  var attribute1 = this.PriceUpdationForm.get('attribute1').value;
  var onhandPrc:any=[];
  onhandPrc.push({ id: id, attribute1: attribute1});
  // const formValue: ISalesBookingForm = this.transData(this.PriceUpdationForm.getRawValue());
  this.orderManagementService.UpdatePrice(onhandPrc).subscribe((res: any) => {
    if (res.code === 200) {
      alert(res.message)
    }
    else if (res.code===400){
      alert(res.message)
    }
  })}

}
