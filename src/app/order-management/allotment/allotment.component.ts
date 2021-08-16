import { Component, OnInit,ViewChild } from '@angular/core';
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
import * as XLSX from 'xlsx'; 




interface IallotmentForm {
  orderNumber:number;
  segment:string;
}

@Component({
  selector: 'app-allotment',
  templateUrl: './allotment.component.html',
  styleUrls: ['./allotment.component.css'],
})

export class AllotmentComponent implements OnInit {
  fileName= 'ExcelSheet.xlsx';
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
  qtyAvail:number;

  public allotedChassisArray=[];
  displayChassisForm:Array<boolean>=[];;
  displayChassisFormHead=true;
  // displayChassisForm:boolean;
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
      qtyAvail:[],
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
      (data: any[])  => {
        this.allotmentsearchlist = data;
        for (let i=0;i<data.length;i++){
          if (data[i].qtyAvail===0){
            this.displayChassisForm[i]=false;
          }
          else{
            if (data[i].qtyAvail>0){
            this.displayChassisForm[i]=true;
            }
          }
        }
      }
    );
 
  }

  Select(model:any,color:any,variant:any,locId) {
  //  alert(model+color+variant+this.locId);
   this.orderManagementService.allotmentVehicleSearch(model,color,variant,this.locId)
    .subscribe(
      data => {
        this.allotmentVehiclesearchlist = data;
        console.log(this.allotmentVehiclesearchlist);
      }
    );
    }

    selectOrderNumberEvent(e,orderNumber) {
      // alert(orderNumber);
      this.orderNumber1=orderNumber;
      if (e.target.checked) {
      this.selectOrderNumber='Y'
      }
      else{
        this.selectOrderNumber = 'N';
      }
    }

    selectChasisNumberEvent(e,segment) {
      // alert(segment);
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
      // alert(this.segment1+' '+ this.orderNumber1);
      this.allotedChassisArray.push({orderNumber:this.orderNumber1,segment:this.segment1});
      console.log(this.allotedChassisArray);
      this.orderManagementService.allotmentSubmit(this.allotedChassisArray).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          window.location.reload();
        } else {
          if (res.code === 400) {
            alert(res.message);
            window.location.reload();
          }
        }
      });
    }
    
    // allotment1(){
    //   this.orderManagementService.allotmentSubmit(this.allotedChassisArray).subscribe((res: any) => {
    //     if (res.code === 200) {
    //       alert(res.message);
    //       window.location.reload();
    //     } else {
    //       if (res.code === 400) {
    //         alert(res.message);
    //         window.location.reload();
    //       }
    //     }
    //   });
    // }

    closeMast() {
      this.router.navigate(['admin']);
    }
  
    resetMast() {
      window.location.reload();
    }


    exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

  
}
    


// allotedChassisArray
