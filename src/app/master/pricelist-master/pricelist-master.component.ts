import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemeService } from 'ng2-charts';


interface IPriceList {

  // priceListId :number;
  // priceListName:string;
  // priceDesc:string;

  // status:string;
  // startDate:Date;
  
  // ouId: number; 
  // ouName : string;
  // description : string; 
  priceListType: string;
  priceListHeaderId:number;
  

}
@Component({
  selector: 'app-pricelist-master',
  templateUrl: './pricelist-master.component.html',
  styleUrls: ['./pricelist-master.component.css']
})
export class PricelistMasterComponent implements OnInit {
  priceListMasterForm: FormGroup;

  priceListId :number;
  priceListName:string;
  priceListDesc:string;
  priceListType:string;
  
  priceListHeaderId : number;
  ouId: number;
  // ouName : string;
  divisionId : number;
  deptId : number;
  description : string; 
  
  // itemId : number;  
  itemDescription : string ;
  priceDesc:string;
  segment :string;

  searchBy : string;
  searchValue : string;

  startDate:Date;
  endDate:Date;

  showOu=false;
  showItemSearch=false;
  showPriceListLov =true;
  display=true;
  lstcomments: any[];

  public statusList: Array<string> = [];

  public PriceTypeList: Array<string> = [];
  public DepartmentList: Array<string> = [];

  public PriceListIdList : Array<string> = [];
  public priceDescList  :any;

  public OUIdList: Array<string> = [];
  
  public DivisionIDList : Array<string>=[];
  public itemIdList : Array<string>=[];

  public itemNameList: any;
  public priceListNameList: any;

  enableDesc=false;
  
  public status = "Active";
  displayInactive = true;
  Status1: any;
  // display= true;
  display1 = true;
  displayButton = true;
  plsearch=false;

  constructor(private service: MasterService, private fb: FormBuilder, private router: Router) 
    {
      this.priceListMasterForm = fb.group({
        
        priceListHeaderId: [],
        priceListType:[],
        divisionId: [],
        deptId: [],
        ouId :[],
        status :['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate:['', [Validators.required]],
        // itemId: ['', [Validators.required]],
        description: [],
        itemDescription:[],
        priceDesc:[],
        priceListId:['', [Validators.required]],
        priceListName:['', [Validators.required]],

        searchBy:['', [Validators.required]],
        searchValue:['', [Validators.required]],
       
        itemLines: this.fb.array([this.lineDetailsGroup()])
      });
    }

    lineDetailsGroup() {
      return this.fb.group({
        priceListLineId:[''],
        itemId :['', [Validators.required]],    
        itemName:['', [Validators.required]],
        itemDescription: ['', [Validators.required]],
        itemCategory: ['', [Validators.required]],
        uom: ['', [Validators.required]],
        itemBatchCode: ['', [Validators.required]],
        priceValue: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],

        segment: ['', [Validators.required]],

       });
    }
  
    get lineDetailsArray() {
      return <FormArray>this.priceListMasterForm.get('itemLines')
    }
   

     get f() { return this.priceListMasterForm.controls; }

 
  priceListMaster(priceListMasterForm:any) {  }

  ngOnInit(): void {

    this.service.PriceListIdList()
    .subscribe(
      data => {
        this.PriceListIdList = data;
        console.log(this.PriceListIdList);
      }
    );

    this.service.OUIdList()
    .subscribe(
      data => {
        this.OUIdList = data;
        console.log(this.OUIdList);
      }
    );

    this.service.DivisionIDList()
    .subscribe(
      data => {
        this.DivisionIDList = data;
        console.log(this.DivisionIDList);
      }
    );

    this.service.statusList()
    .subscribe(
      data => {
        this.statusList = data;
        console.log(this.statusList);
      }
    );
    
    this.service.DepartmentList()
    .subscribe(
      data => {
        this.DepartmentList = data;
        console.log(this.DepartmentList);
      }
    );

    this.service.PriceTypeList()
    .subscribe(
      data => {
        this.PriceTypeList = data;
        console.log(this.PriceTypeList);
      }
    );

    this.service.itemIdList()
    .subscribe(
      data => {
        this.itemIdList = data;
        console.log(this.itemIdList);
      }
    );

  }

  

  onOptionsSelectedStatus(event: any) {
    this.Status1 = this.priceListMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.priceListMasterForm.get('endDate').reset();
      this.displayInactive=true;
    }
  }


  

  onItemSelected(itemId: any) 
  {
      // alert("ITEM ID :" + itemId);
    if(itemId>0)
    {
       this.enableDesc=false
      this.service.itemNameList(itemId)
        .subscribe(
          data => {
            this.itemNameList = data;
            console.log(this.itemNameList);
            this.priceListMasterForm.patchValue(this.itemNameList.description);
            this.itemDescription = this.itemNameList.description;
            // alert("item desc :" + this.description);
          }
        );
    }
    else {
      this.enableDesc=true;
      this.priceListMasterForm.get("description").reset();
    }
    // alert ("enable Desc="+this.enableDesc);
 }
  
  
 onPLSelected(priceListId: any) 
 {
    //  alert("price list ID :" + priceListId);
   
          this.service.priceDescList(priceListId)
          .subscribe(
          data => {
           this.priceDescList = data;
           console.log(this.priceDescList);
           
           this.priceListMasterForm.patchValue(this.priceDescList.priceListType);
           this.priceListMasterForm.patchValue(this.priceDescList.priceListName);
           this.priceListMasterForm.patchValue(this.priceDescList.description);
           this.priceListMasterForm.patchValue(this.priceDescList.divisionId);
           this.priceListMasterForm.patchValue(this.priceDescList.deptId);
           this.priceListMasterForm.patchValue(this.priceDescList.ouId);
           this.priceListMasterForm.patchValue(this.priceDescList.status);

           this.priceListType=this.priceDescList.priceListType;
           this.priceListName=this.priceDescList.priceListName;
           this.description=this.priceDescList.description;
           this.divisionId=this.priceDescList.divisionId;
           this.ouId=this.priceDescList.ouId;
           this.deptId=this.priceDescList.deptId;
           this.status=this.priceDescList.status;

            this.priceListMasterForm.patchValue(this.priceDescList.endDate);
            this.endDate=this.priceDescList.endDate;
            this.priceListMasterForm.patchValue(this.priceDescList.startDate);
            this.startDate=this.priceDescList.startDate;

            this.displayButton = false;
            this.display = false;
            this.plsearch=true;
     
        
          if(priceListId>0){
            this.showItemSearch=true;
            this.showPriceListLov=false
          } else {
            this.showItemSearch=false;
            // this.showPriceListLov=false
          }

          
          //  alert("PL Name : " + this.priceListName + " PL ouid:  "+this.ouId );
          //  alert( " on pl select >>"+ this.status + " Start Date: " + this.startDate  + " End Date : " + this.endDate);
          // alert("pricelist type: "+this.priceListType);
          // alert("Show item search : "+this.showItemSearch);
          


         }
       );
    
  } 



  onPLTSelected (plTypeId : number) {
    // alert("price Type ID :" + plTypeId  + " PL type Name : " + plTypeName );
   if( plTypeId===2) {
     this.showOu=true;
    } else {
      this.showOu=false;
    }

    // alert("price Type ID :" + plTypeId  + " PL type Name : " + plTypeName + " Show OU : " + this.showOu );

  }



  addRow() {
    // alert('addrow index '+index);
    this.lineDetailsArray.push(this.lineDetailsGroup());
    
  }

  RemoveRow(index) {
    if (index===0){

    }
    else {
      this.lineDetailsArray.removeAt(index);
    }
  
  }

  ////////////////////////// Reset Button module
  resetMast() {  window.location.reload();   }

  ////////////////////////// Close Button module
  closeMast() {  this.router.navigate(['admin']);  }

  //////////////////////////////////////New Button 
  transeData(val) {
    delete val.priceDesc;
    delete val.itemDescription;
    delete val.priceListId;
   return val;
  }
    newMast() {

      alert ("Posting data  to PL mater......")
      // const formValue: IPriceList =this.priceListMasterForm.value;
      const formValue: IPriceList =this.transeData(this.priceListMasterForm.value);
      this.service.PriceListMasterSubmit(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD INSERTED SUCCESSFUILY');
          this.priceListMasterForm.reset();
        } else {
          if (res.code === 400) {
            alert('Code already present in the data base');
            this.priceListMasterForm.reset();
          }
        }
      });
    }


    updateMast() {
      alert ("Putting data  to PL mater......")
      // const formValue: IPriceList = this.priceListMasterForm.value;
      const formValue: IPriceList =this.transeData(this.priceListMasterForm.value);
      this.service.UpdatePriceListById(formValue, formValue.priceListHeaderId).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD UPDATED SUCCESSFUILY');
          window.location.reload();
        } else {
          if (res.code === 400) {
            alert('ERROR OCCOURED IN PROCEESS');
            this.priceListMasterForm.reset();
          }
        }
      });
    };

  // ============================================================

  Select(priceListHeaderId: number) {
    this.display1= false;
    // alert ('priceListHeaderId='+priceListHeaderId);
    let select = this.lstcomments.find(d => d.priceListHeaderId === priceListHeaderId);
    console.log(select.priceListDetailList[0]);
    
    if (select) {
      this.priceListMasterForm.patchValue(select);
      this.priceListType = select.priceListType+ "-" + select.priceListName;
      var control = this.priceListMasterForm.get('itemLines') as FormArray;
      var itemLines:FormGroup=this.lineDetailsGroup();
      alert("PL LENGTH: "+ select.priceListDetailList.length);
      for (let i=0; i<select.priceListDetailList.length;i++) {
        control.push(itemLines);
      }
      this.priceListHeaderId = select.priceListHeaderId;
      this.displayButton = false;
      this.display = false;
      this.showItemSearch=true;
      alert('priceListHeaderId='+priceListHeaderId+"  PL TYPE :" + this.priceListType);
      console.log("price list details : " + select.priceListDetailList);
      let controlinv1 = this.priceListMasterForm.get('itemLines') as FormArray;
      for (let i=0; i<select.priceListDetailList.length;i++) {
        alert('Item '+select.priceListDetailList[i].itemId);
        alert('priceValue '+select.priceListDetailList[i].priceValue); 
        controlinv1.controls[i].patchValue(select.priceListDetailList[i]);
      // this.priceListMasterForm.get('itemLines').patchValue(select.priceListDetailList);
      }

    }
  }

  searchMast() {
    this.service.getPriceListSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  }

   
  // ===============================================================================
   
}
 




 




