import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from 'ng2-charts';
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
  // EwayBill:string;
  ewayBillNo:string;
  docDate:Date;
  ewayBillDate:Date;
  locId:number;
  poHeaderId:number;
  poLineId:number;
  suppNo:number;
  supplierSiteId:number;
  emplId:number;
  totAmount:number;
  invItemId:number;
  billToLoc:number;
  categoryId:number;
}

interface Ilocator {
  segment1:string;
  segment2:string;
  segment3:string;
  segment4:string;
  segment5:string;
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
  // EwayBill:string;
  ewayBillNo:string;
  docDate:Date;
  ewayBillDate:Date;  
  locId:number;
  poHeaderId:number;
  suppNo:number;
  supplierSiteId:number;
  emplId:string;
  totAmount:number;
  invItemId:number;
  billToLoc:number;
  categoryId:number;
  // segment1:string;
  segment2:string;
  segment3:string;
  segment4:string;
  segment5:string;

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
   poLineId:number;
  //  supplierSiteId:number;
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
      ewayBillNo:[''],
      docDate:[''],
      ewayBillDate:[''],
      locId:[''],
      poHeaderId:[''],
      suppNo:[''],
      supplierSiteId:[''],
      emplId:[''],
      poLines: this.fb.array([this.lineDetailsGroup()]),
    })
   }

   lineDetailsGroup() {
    return this.fb.group({
      poLineId:[],
      orderedQty: [],
      itemType:[],
      itemName:[],
      taxCategoryName:[],
      ctgDescription:[],
      itemDesc:[],
      subInvDesc:[],
      locatorDesc:[],
      uom:[],
      unitPrice:[],
      taxPercentage:[],
      taxAmount:[],
      sacCode:[],
      totalAmt:[],
      poChargeAcc:[],
      qtyReceived:[],
      locId:[],
      baseAmount:[],
      totAmount:[],
      invItemId:[''],
      billToLoc:[''],
      categoryId:[''],
      segment1:[''],
      segment2:[''],
      segment3:[''],
      segment4:[''],
      segment5:[''],
    });
  }
  get lineDetailsArray() {
    return <FormArray>this.poReceiptForm.get('poLines')
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
   this.ouName = (sessionStorage.getItem('ouName'));
   this.locId=Number(sessionStorage.getItem('locId'));
    this.emplId=(sessionStorage.getItem('emplId'));
    console.log(this.loginArray);
    console.log(this.locId);


    
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

  okLocator(){}

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

      refresh()
      {
        window.location.reload();
      }

      openlocator(i){}
     

      // onKey(event: any) {
      //   const aaa = this.segment1 + '.' + this.segment2 + '.' + this.segment3 + '.' + this.segment4 + '.' + this.segment5;
      //   this.segmentName = aaa;
      // }


      poSave(){
        // const formValue: IpoReceipt = this.transData(this.poReceiptForm.value);
        const formValue: IpoReceipt = this.poReceiptForm.value;
        // var test = this.lstcompolines;
        var arrayControl = this.poReceiptForm.get('poLines').value
        for(let i =0; i<this.lstcompolines.poLines.length; i++){
this.lstcompolines.poLines[i].qtyReceived= arrayControl[i].qtyReceived;
this.lstcompolines.poLines[i].baseAmount= arrayControl[i].baseAmount;
this.lstcompolines.poLines[i].taxAmount= arrayControl[i].taxAmount;
this.lstcompolines.poLines[i].totAmount= arrayControl[i].totAmount;
// this.locId=Number(sessionStorage.getItem('locId'));
alert(this.lstcompolines.poLines[i].qtyReceived)
        }
        console.log(this.lstcompolines);
        
    this.service.poSaveSubmit(this.lstcompolines).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFUILY');
        // this.poReceiptForm.reset();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
          this.poReceiptForm.reset();
        }
      }
    });
      }
}
