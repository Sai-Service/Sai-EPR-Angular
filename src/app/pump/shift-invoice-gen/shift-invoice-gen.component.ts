import { Component, VERSION } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { PumpService } from 'src/app/pump/pump.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-shift-invoice-gen',
  templateUrl: './shift-invoice-gen.component.html',
  styleUrls: ['./shift-invoice-gen.component.css']
})
export class ShiftInvoiceGenComponent  {
  pumpInvGenForm: FormGroup;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  dataSearchList:any=[];

  pipe = new DatePipe('en-US');

  constructor(private fb: FormBuilder,private service: MasterService, private router: Router,private PumpService1: PumpService) {
    this.pumpInvGenForm = fb.group({
      startDate:[],
      endDate:[],
      customerId:[],
    })
   }


   ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
  }


  pumpInvGen(pumpInvGenForm:any) {  }


  invGenetion(){
    var startDate1= this.pumpInvGenForm.get('startDate').value;
    var startDate = this.pipe.transform(startDate1, 'dd-MM-yyyy')
    var endDate1= this.pumpInvGenForm.get('endDate').value;
    var endDate = this.pipe.transform(endDate1, 'dd-MM-yyyy')
    this.PumpService1.shipEntryInvGenFn(startDate,endDate,sessionStorage.getItem('locId'))
    .subscribe(
      data => {
       console.log(data);
       if (data.length==0){
        alert('Data Not Available for Invoicing.!')
       }
       else{
        alert('Invoice Generated Successfully.!')
       }
      }
    );
  }

  search(){
    var startDate1= this.pumpInvGenForm.get('startDate').value;
    var startDate = this.pipe.transform(startDate1, 'dd-MM-yyyy')
    var endDate1= this.pumpInvGenForm.get('endDate').value;
    var endDate = this.pipe.transform(endDate1, 'dd-MM-yyyy')
    this.PumpService1.shipEntryInvGenSaerchFn(startDate,endDate,sessionStorage.getItem('locId'))
    .subscribe(
      data => {
       console.log(data);
       if (data.length==0){
        alert('Data Not Available.!')
       }
       else{
        alert('Data Saerching Successfully.!');
        this.dataSearchList=data;
       }
      }
    );
  }



  searchCust(){
    var startDate1= this.pumpInvGenForm.get('startDate').value;
    var startDate = this.pipe.transform(startDate1, 'dd-MM-yyyy')
    var endDate1= this.pumpInvGenForm.get('endDate').value;
    var endDate = this.pipe.transform(endDate1, 'dd-MM-yyyy');
    var custId = this.pumpInvGenForm.get('customerId').value;
    this.PumpService1.shipEntryInvGenSaerchCustFn(startDate,endDate,sessionStorage.getItem('locId'),custId)
    .subscribe(
      data => {
       console.log(data);
       if (data.length==0){
        alert('Data Not Available.!')
       }
       else{
        alert('Data Saerching Successfully.!');
        this.dataSearchList=data;
       }
      }
    );
  }

  refresh() {
    window.location.reload();
  }
  close() {
    this.router.navigate(['admin']);
  }

}
