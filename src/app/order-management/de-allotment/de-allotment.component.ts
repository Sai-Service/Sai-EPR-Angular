import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators,FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { data } from 'jquery';
import { DatePipe } from '@angular/common';
import { Location } from "@angular/common";

interface IdeAllotmentForm {
  orderNumber:number;
  orderedItem:string;
}

@Component({
  selector: 'app-de-allotment',
  templateUrl: './de-allotment.component.html',
  styleUrls: ['./de-allotment.component.css']
})
export class DeAllotmentComponent implements OnInit {
  deAllotmentForm: FormGroup;
  orderNumber:number;
  orderedItem:string;
  segment:string;
  cancelReason:string;
  ouId:string;
  orderNumber1:string;
  selectOrderNumber:string;
  segment1:string;
  ouName:string;

  public Deallotmentsearchlist=[];
  public deAllotedChassisArray=[];

  constructor(private fb: FormBuilder,private location: Location, private router: Router, private service: MasterService,private orderManagementService:OrderManagementService,private transactionService :TransactionService) { 
    this.deAllotmentForm = fb.group({
 orderNumber:[''],
 orderedItem:[''],
 selectOrderNumber:[],
 cancelReason:[],
    })
  }


  deAllotment(deAllotmentForm: any) {
  }
  ngOnInit(): void {
    this.ouId=sessionStorage.getItem('ouId');
    this.ouName=sessionStorage.getItem('ouName');

    
    this.orderManagementService.Deallotmentsearchlist(this.ouId)
    .subscribe(
      data => {
        this.Deallotmentsearchlist = data;
        console.log(this.Deallotmentsearchlist);
      }
    );
  }


  transData(val) {
    return val;
  }

  selectOrderNumberEvent(e,orderNumber,orderedItem,cancelReason) {
    // alert(orderNumber+' '+ orderedItem);
    this.orderNumber1=orderNumber;
    this.segment1=orderedItem;
    this.cancelReason=cancelReason;
    if (e.target.checked) {
    this.selectOrderNumber='Y'
    }
    else{
      this.selectOrderNumber = 'N';
    }
  }



  // deAllotedVehicleSelect(){
  //   alert(this.segment1+' '+ this.orderNumber1+' '+ this.cancelReason);
  //   this.deAllotedChassisArray.push({orderNumber:this.orderNumber1,orderedItem:this.segment1,cancelReason:this.cancelReason});
  //   console.log(this.deAllotedChassisArray);
    
  // }


  

  Deallocate(){
    alert(this.orderNumber+' '+this.orderedItem+' '+this.cancelReason);
    this.orderManagementService.DeallocateSubmit(this.orderNumber1,this.segment1,this.cancelReason).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        // this.deAllotmentForm.reset();
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert(res.message);
          window.location.reload();
          // this.deAllotmentForm.reset();
        }
      }
    });
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  resetMast() {
    window.location.reload();
  }

}
