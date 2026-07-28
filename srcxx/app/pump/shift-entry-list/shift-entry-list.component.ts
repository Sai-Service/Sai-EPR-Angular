import { Component, VERSION } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { PumpService } from 'src/app/pump/pump.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-shift-entry-list',
  templateUrl: './shift-entry-list.component.html',
  styleUrls: ['./shift-entry-list.component.css']
})
export class ShiftEntryListComponent  {
  shipEntryListForm: FormGroup;
  closeResetButton = true;
  dataDisplay: any;
  progress = 0;
  startDt:Date;
  endDt:Date;
  today = new Date();
  minDate = new Date();
  entryList:any=[];


  pipe = new DatePipe('en-US');
  constructor(private fb: FormBuilder,private service: MasterService, private router: Router,private PumpService1: PumpService,private router1: ActivatedRoute) {
    this.shipEntryListForm = fb.group({
      startDt:[],
      endDt:[]
    })
   }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
  }

  shipEntryList(shipEntryListForm:any) {  }


  getEntryList(){
    var stDt = this.shipEntryListForm.get('startDt').value;
    var stDate = this.pipe.transform(stDt, 'dd-MMM-yyyy');
    var endDtSt = this.shipEntryListForm.get('endDt').value;
    var endDt1 = new Date(endDtSt);
   var endDt = this.pipe.transform(endDt1, 'dd-MMM-yyyy');
   this.PumpService1.getEntryListFn( stDate, endDt,Number(sessionStorage.getItem('locId'))).subscribe((res: any) => {
   
    if (res.length===0){
      alert('Data Not Found.!');
    }
    else{
      this.entryList = res;
    }
   })
  }

}

