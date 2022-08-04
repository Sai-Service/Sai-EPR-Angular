import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { DatePipe } from '@angular/common';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { relativeTimeRounding } from 'moment';
import { ServiceService } from 'src/app/service/service.service';
import { ReturnStatement } from '@angular/compiler';

interface IReceiptWriteOff {}

@Component({
  selector: 'app-receipt-writeoff',
  templateUrl: './receipt-writeoff.component.html',
  styleUrls: ['./receipt-writeoff.component.css']
})

export class ReceiptWriteoffComponent implements OnInit {
  receiptWriteOffForm: FormGroup;

  public locIdList: Array<string> = [];
  public writeOffList: any[];


  pipe = new DatePipe('en-US');
  now = Date.now();

  loginName:string;
  loginArray:string;
  name:string;
  ouName : string;
  ouId:number;
  locId: number;
  deptId:number;
  locName : string;
  emplId :number;
  orgId:number;
  divisionId : number;
  divisionName:string;

  ticketNo: string;
  fullName : string;
  writeoffLimit:number=10;
  writeOffTotal:number;
  // fromDate:Date;
  // toDate:Date;
  public minDate = new Date();
  fromDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  toDate = this.pipe.transform(Date.now(), 'y-MM-dd');

   wirteOffButton =false;
   spinIcon = false;
   dataDisplay: any;
   get f() {return this.receiptWriteOffForm.controls;}

   receiptWriteOff(receiptWriteOffForm: any){}

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService) {
    this.receiptWriteOffForm = fb.group({

      loginArray:[''],
      loginName:[''],
      ouName :[''],
      ouId:[''],
      locId:[''],
      locName :[''],
      emplId:[''],
      divisionId :[''],
      divisionName:[''],

      ticketNo: [],
      fullName : [],
      writeoffLimit:[],
      fromDate:[],
      toDate:[],
      writeOffTotal:[],


    })
   }

  ngOnInit(): void {

    $("#wrapper").toggleClass("toggled");
    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
    this.divisionName=sessionStorage.getItem('divisionName');
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.loginName=sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    this.locName=(sessionStorage.getItem('locName'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.emplId= Number(sessionStorage.getItem('emplId'));

    this.ticketNo=(sessionStorage.getItem('ticketNo'));
    this.fullName=(sessionStorage.getItem('fullName'));
   
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);

    this.service.getLocationSearch1(this.ouId)
    .subscribe(
      data => {
        this.locIdList = data;
        console.log(this.locIdList);

      }
    );

  }


  FindList(){
    this.writeOffTotal=null;
    this.writeOffList=null;
    this.dataDisplay = 'Searching Records....Please dont refresh the Page';
    // alert ("spin  -" +this.spinIcon  + " msg : "+this.dataDisplay);
    var fDate =this.receiptWriteOffForm.get('fromDate').value;
    var tDate =this.receiptWriteOffForm.get('toDate').value;
    var wAmt =this.receiptWriteOffForm.get('writeoffLimit').value;
    var d1 = this.pipe.transform(fDate, 'dd-MMM-y');
    var d2 = this.pipe.transform(tDate, 'dd-MMM-y');
    var lcId =this.receiptWriteOffForm.get("locId").value;

    // alert("DATE1,DATE2: "+ d1 +","+ d2 );
   
    if(lcId <=0) { alert ("LOCATION : Select Location ...");return;}
    if (fDate>tDate ) { alert ("DATE : Select Proper Date Range ...");return;}


      this.spinIcon = true;

      this.service.getWriteOffList(this.locId,d1,d2,wAmt)
      .subscribe(
        data => {
          this.writeOffList = data.obj;
        
          if(data.obj.length >0) { this.wirteOffButton=true;}
           else { this.wirteOffButton=false;  alert ("No Record Found..."); 
          this.spinIcon=false; this.dataDisplay=null; }
           console.log(this.writeOffList);
           this.spinIcon=false; this.dataDisplay=null;

           var ttl=0;
          //  alert ("ttl :" +  ttl + " this.writeOffList.length >> "+this.writeOffList.length);
 
           for (let i = 0; i < this.writeOffList.length; i++) {
             ttl = ttl + Number(this.writeOffList[i].balanceAmount);
           }
             this.receiptWriteOffForm.patchValue({writeOffTotal:ttl});
 

          }); 

         
           
        } 
         

       

      WriteOff(){  alert ("Work in Progress...") }

      resetMast() {
        window.location.reload();
      }
    
      closeMast() {
        this.router.navigate(['admin']);
      }

}
