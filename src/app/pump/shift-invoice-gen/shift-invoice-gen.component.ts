import { Component, VERSION } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { PumpService } from 'src/app/pump/pump.service';
import { DatePipe } from '@angular/common';
import { OrderManagementService } from 'src/app/order-management/order-management.service';


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
  display = 'none';

  pipe = new DatePipe('en-US');
  public minDate = new Date();
  now = new Date();
  startDate = this.pipe.transform(this.now, 'y-MM-dd');
  endDate = this.pipe.transform(this.now, 'y-MM-dd');
  customerId:number;
  custAccountNo: number;
  custName: string;
  customerNameSearch: any = [];
  selCustomer: any;
  isDisabled3 = false;

   genInvoice=false;

   optType:string;
   searchInv :string;
   genInv:string;



  constructor(private fb: FormBuilder,private service: MasterService, private router: Router,private PumpService1: PumpService,private orderManagementService: OrderManagementService) {
    this.pumpInvGenForm = fb.group({
      startDate:[],
      endDate:[],
      customerId:[],
      custAccountNo: [],
      custName: [],
      optType:[],
      searchInv :[],
      genInv:[],
    })
   }


   ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
  }


  pumpInvGen(pumpInvGenForm:any) {  }

  radioEvent(event:any){
    // this.refresh();
    this.custAccountNo=null;this.customerId=null;this.custName=null;this.dataSearchList=null;
    if( event.target.value==='searchInv'){ alert ("Selected -  Search Invoice");this.genInvoice=false;}
    if( event.target.value==='genInv'){ alert ("Selected -  Generate Invoice");this.genInvoice=true;}
    }


  invGenetion(){

   
    var startDate1= this.pumpInvGenForm.get('startDate').value;
    var startDate = this.pipe.transform(startDate1, 'dd-MMM-yyyy')
    var endDate1= this.pumpInvGenForm.get('endDate').value;
    var endDate = this.pipe.transform(endDate1, 'dd-MMM-yyyy')
    var custId =this.pumpInvGenForm.get('customerId').value;

    if(custId==null || custId==undefined) { alert ("Please Select Customer...");return;}

    var  resp=confirm("Do You Want to Generate Invoice ???");
    if(resp==false) { return;}

    this.closeResetButton = false;
    this.dataDisplay = 'Invoice Generation in progress....Please Do not refresh the Page';

    this.PumpService1.shipEntryInvGenFn(startDate,endDate,sessionStorage.getItem('locId'),custId)
    .subscribe(
      data => {
       console.log(data);
       if (data.length==0){
        alert('Data Not Available for Invoicing.!')
        this.dataDisplay = ''
        this.closeResetButton = true;
       }
       else{
        alert('Invoice Generated Successfully.!')
        this.dataDisplay = ''
        this.closeResetButton = true;
        // this.searchCust();

       }
      }
    );
  }

  custNameSearch(custName) {
    // alert(custName)
    this.orderManagementService.custNameSearchFn1(custName, sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          if (data.code === 200) {
            this.customerNameSearch = data.obj;
          }
          else {
            if (data.code === 400) {
              alert(data.message);
              this.display = 'block';
            }
          }
        }
      );
  }

  accountNoSearch(custAccountNo) {
    // alert(custAccountNo);
    this.service.searchCustomerByAccount(custAccountNo)
      .subscribe(
        data => {
          if (data.code === 200) {
            this.selCustomer = data.obj;
            this.pumpInvGenForm.patchValue({ customerId: data.obj.customerId });
            this.pumpInvGenForm.patchValue({ custAccountNo: custAccountNo });
            this.pumpInvGenForm.patchValue({ custName: data.obj.custName });



         }
        }
      );
  }


        

  search(){
    var startDate1= this.pumpInvGenForm.get('startDate').value;
    var startDate = this.pipe.transform(startDate1, 'dd-MMM-yyyy')
    var endDate1= this.pumpInvGenForm.get('endDate').value;
    var endDate = this.pipe.transform(endDate1, 'dd-MMM-yyyy')
    var custId =this.pumpInvGenForm.get('customerId').value;

    if(custId>0){this.searchCust(); } else {this.searchByDate()}
   
  }

  searchByDate(){
    var startDate1= this.pumpInvGenForm.get('startDate').value;
    var startDate = this.pipe.transform(startDate1, 'dd-MMM-yyyy')
    var endDate1= this.pumpInvGenForm.get('endDate').value;
    var endDate = this.pipe.transform(endDate1, 'dd-MMM-yyyy')
    this.PumpService1.shipEntryInvGenSaerchFn(startDate,endDate,sessionStorage.getItem('locId'))
    .subscribe(
      data => {
       console.log(data);
       if (data.length==0){
        alert('Data Not Available.!')
       }
       else{
        alert('Data Searching Done Successfully.!');
        this.dataSearchList=data;
       }
      }
    );
  }


  searchCust(){
    var startDate1= this.pumpInvGenForm.get('startDate').value;
    var startDate = this.pipe.transform(startDate1, 'dd-MMM-yyyy')
    var endDate1= this.pumpInvGenForm.get('endDate').value;
    var endDate = this.pipe.transform(endDate1, 'dd-MMM-yyyy');
    var custId = this.pumpInvGenForm.get('customerId').value;
    this.PumpService1.shipEntryInvGenSaerchCustFn(startDate,endDate,sessionStorage.getItem('locId'),custId)
    .subscribe(
      data => {
       console.log(data);
       if (data.length==0){
        alert('Data Not Available.!')
       }
       else{
        alert('Data Searching Done Successfully.!');
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
