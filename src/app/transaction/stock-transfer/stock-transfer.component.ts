// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';
import { TransactionService } from 'src/app/transaction/transaction.service';


interface IStockTransfer{
  ShipmentNo:String;

}

@Component({
  selector: 'app-stock-transfer',
  templateUrl: './stock-transfer.component.html',
  styleUrls: ['./stock-transfer.component.css']
})
export class StockTransferComponent implements OnInit {
  stockTranferForm:FormGroup;
  ShipmentNo:String;
  locId:number;
  deptId:number;
  divisionId:number;
  public ItemIdList:Array<string>=[];
  invItemId:number;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private transactionService :TransactionService)  {
    this.stockTranferForm=fb.group({
      ShipmentNo:[''],
      trxLinesList:this.fb.array([]),

    }

    )
    }
    trxLinesList():FormArray{
      return this.stockTranferForm.get("trxLinesList") as FormArray
   }
   newtrxLinesList(): FormGroup{
    return this.fb.group({
      invItemId:[''],
    })}

    addnewtrxLinesList(){
      this.trxLinesList().push(this.newtrxLinesList());
    }
    removenewtrxLinesList(trxLineIndex){
      this.trxLinesList().removeAt(trxLineIndex);
    }

  ngOnInit(): void {
    this.locId=Number(sessionStorage.getItem('locId'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.addnewtrxLinesList();
    this.transactionService.ItemIdList().subscribe(
      data =>{ this.ItemIdList = data;
        // console.log(this.invItemId);
        });
  }
  stockTransfer(stockTranferForm:any){}
}
