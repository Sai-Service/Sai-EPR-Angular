import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../master.service';

interface IpoReceipt{
  ouName:string;
  poNumber:string;
  supplier:string;
  item:string;
  segment1:string;
  ouId:number;
  totalAmt:number;
  supplierName:string;
  // totalAmt:number;
  baseAmount:number;
  taxAmt:number;
  recDate:Date;
  Comments:string;
  gstDocNo:string;
  EwayBill:string;
  docDate:Date;
  EwayBillDate:Date;
}

@Component({
  selector: 'app-po-receipt-form',
  templateUrl: './po-receipt-form.component.html',
  styleUrls: ['./po-receipt-form.component.css']
})
export class PoReceiptFormComponent implements OnInit {
  poReceiptForm: FormGroup;
  ouName:string;
  poNumber:string;
  submitted = false;
  supplier:string;
  item:string;
  segment1:string;
  ouId:number;
  totalAmt:number;
  name:string;
  divisionName:string;
  supplierName:string;
  baseAmount:number;
  taxAmt:number;
  recDate:Date;
  Comments:string;
  gstDocNo:string;
  EwayBill:string;
  docDate:Date;
  EwayBillDate:Date;  

  // loginArray: any[];
  loginArray:string;
  public cityList: Array<string>[];
  lstcompolines: any;
  public poLines:any[];
   public lstlocationwise:any[];
   supplierList:any[];
   lstcomments2: any[];
   lstcomments: any;
   lstcomments1:any[];
   divisionId:any[];
   loginName:string;

  //  check box selection
  names: any;
  selectedAll: any;
  selectedNames: any;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.poReceiptForm = fb.group({
      ouName : [''],
      poNumber:['', Validators.required],
      supplier:[''],
      item:[''],
      segment1:['',Validators.required],
      ouId:[''],
      totalAmt:[''],
      divisionName:[''],
      supplierName:[''],
      baseAmount:[''],
      taxAmt:[''],
      recDate:[''],
      Comments:['',Validators.required],
      gstDocNo:[''],
      EwayBill:[''],
      docDate:[''],
      EwayBillDate:[''],
    })

   }


   selectAll() {
    this.selectedAll = !this.selectedAll;

    for (var i = 0; i < this.names.length; i++) {
        this.names[i].selected = this.selectedAll;
    } 
}
checkIfAllSelected() {
  var totalSelected =  0;
  for (var i = 0; i < this.names.length; i++) {
        if(this.names[i].selected) totalSelected++;
    } 
this.selectedAll = totalSelected === this.names.length;

return true;
}

   get f() { return this.poReceiptForm.controls; }

   poReceipt(poReceiptForm: any) {

  }


  ngOnInit(): void {
    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
   this.loginName=sessionStorage.getItem('name')
    
    console.log(this.loginArray);


    
    // this.poReceiptForm.patchValue(this.lstcomments1.user);
    // var divisionCode = this.lstcomments1.user.divisionCode;
    //  console.log(divisionCode);
    // var locId = this.lstcomments1.user.locId;
    // console.log(locId);


    // this.lstcomments= [];

    this.service.cityList()
    .subscribe(
      data => {
        this.cityList = data;
        console.log(this.cityList);
      }
    );


    
  }

  clear(){}
  // poFind(){}
  poFind(segment1) {
    alert(segment1);
    console.log(this.poReceiptForm.value);
    this.service.getsearchByPOlines(segment1)
      .subscribe(
        data => {
          this.lstcompolines = data;
          this.poReceiptForm.patchValue(this.lstcompolines);
        }
      );
  }

  locator(){
    
  }

  close(){
    this.router.navigate(['login']);
  }



  Select(suppSiteId: number) {
    // alert(suppSiteId);
    //     this.lstcomments2 = this.lstcomments.supplierList;
    //     console.log(this.lstcomments2);
    //     let select = this.lstcomments2.find(d => d.suppSiteId === suppSiteId);
        // let select = this.lstcomments.find(d => d.suppSiteId === suppSiteId);
        // if (select) {
        //   this.suppSiteId = select.suppSiteId
        //   this.saddress1 = select.address1
        //   this.saddress2 = select.address2
        //   this.saddress3 = select.address3
        //   this.saddress4 = select.address4
        //   this.scity = select.city
        //   this.pinCd = select.pinCd
        //   this.sstate = select.state
        //   this.contactNo = select.contactNo
        //   this.contactPerson = select.contactPerson
        //   this.emailId = select.emailId
        //   this.gstNo = select.gstNo
        //   this.smobile1 = select.mobile1
        //   this.smobile2 = select.mobile2
        //   this.ouId = select.ouId
        //   this.panNo = select.panNo
        //   this.tanNo = select.tanNo
        //   this.taxCategoryName = select.taxCategoryDesc
        //   // ticketNo not in  json
    
        //   // this.displayButton = false;
        // }
      }
}
