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

interface IallotmentForm {
  orderNumber:number;
  segment:string;
}

@Component({
  selector: 'app-allotment',
  templateUrl: './allotment.component.html',
  styleUrls: ['./allotment.component.css']
})
export class AllotmentComponent implements OnInit {
  allotmentForm: FormGroup;
  ouName:string;
  locId:number;
  orgId:number;
  orderNumber:number;
  segment:string;
  selectOrderNumber:string;
  selectChasisNumber:string;
  orderNumber1:number;
  segment1:string;

  public allotedChassisArray=[];

  allotmentsearchlist:any[];
  allotmentVehiclesearchlist:any[];
  constructor(private fb: FormBuilder,private location: Location, private router: Router, private service: MasterService,private orderManagementService:OrderManagementService,private transactionService :TransactionService) { 
    this.allotmentForm = fb.group({
      ouName:[''],
      locId:[''],
      orderNumber:[''],
      segment:[''],
      selectOrderNumber:[''],
      selectChasisNumber:[''],
    })
  }

  allotment(allotmentForm: any) {
  }

  ngOnInit(): void {
    this.ouName=sessionStorage.getItem('ouName');
    this.locId=Number(sessionStorage.getItem('locId'));
    this.orgId=Number(sessionStorage.getItem('ouId'));

console.log(this.orgId);

    this.orderManagementService.allotmentSearch(this.orgId)
    .subscribe(
      data => {
        this.allotmentsearchlist = data;
        console.log(this.allotmentsearchlist);
      }
    );
  }

  Select(model:any,color:any,variant:any,locId) {
   alert(model+color+variant+this.locId);
   this.orderManagementService.allotmentVehicleSearch(model,color,variant,this.locId)
    .subscribe(
      data => {
        this.allotmentVehiclesearchlist = data;
        console.log(this.allotmentVehiclesearchlist);
      }
    );
    }

    selectOrderNumberEvent(e,orderNumber) {
      alert(orderNumber);
      this.orderNumber1=orderNumber;
      if (e.target.checked) {
      this.selectOrderNumber='Y'
      }
      else{
        this.selectOrderNumber = 'N';
      }
    }

    selectChasisNumberEvent(e,segment) {
      alert(segment);
      this.segment1=segment;
      // select=this.allotmentsearchlist.find(d=>this.)
      if (e.target.checked) {
      this.selectChasisNumber='Y'
      }
      else{
        this.selectChasisNumber = 'N';
      }
    }

    allotedVehicleSelect(){
      alert(this.segment1+' '+ this.orderNumber1);
      this.allotedChassisArray.push({orderNumber:this.orderNumber1,segment:this.segment1});
      console.log(this.allotedChassisArray);
      
    }
    
    allotment1(){
      this.orderManagementService.allotmentSubmit(this.allotedChassisArray).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD INSERTED SUCCESSFULLY');
          this.allotmentForm.reset();
        } else {
          if (res.code === 400) {
            alert('Data already present in the data base');
            this.allotmentForm.reset();
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

// allotedChassisArray
