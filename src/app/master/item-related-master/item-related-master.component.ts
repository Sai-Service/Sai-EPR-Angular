import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, RequiredValidator } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';

interface IRelItemMaster {
  itemCode : string;
  itemCode1 : string;
  description : string;
  uom : string;
  itemCategory:string;
  relItemCode : number;
  relDescription : string;
  relUom : any;
  relationId : number;
  itemId : number;
  relatedItemId : number;
}

@Component({
  selector: 'app-item-related-master',
  templateUrl: './item-related-master.component.html',
  styleUrls: ['./item-related-master.component.css']
  })

export class ItemRelatedMasterComponent implements OnInit {
  relatedItemMasterForm: FormGroup;

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

  itemCode : string;
  itemCode1 : string;
  description : string;
  uom : string;
  itemCategory:string;
  relItemCode : number;
  relDescription : string;
  relUom : any;
  relationId : number;
  itemId : number;
  relatedItemId : number;
  abc : any;
  abc2: any;

  saveButton=true;
  cancelButton=false;

  get f() {return this.relatedItemMasterForm.controls;}

  relatedItemMaster(relatedItemMasterForm: any){}

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService) {
    this.relatedItemMasterForm = fb.group({

      loginArray:[''],
      loginName:[''],
      ouName :[''],
      ouId:[''],
      locId:[''],
      locName :[''],
      emplId:[''],
      divisionId :[''],
      divisionName:[''],

      itemCode : [],
      description : [],
      uom : [],
      relItemCode : [],
      relDescription : [],
      relUom : [],
      relationId : [],
      itemId : [],
      relatedItemId : [],
      itemCategory:[],
      itemCode1:[],
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
   
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);
  }

  trData(val) 
  {
    
      delete val.divisionId;
      delete val.division;
      delete val.ouId;
      delete val.loginArray;
      delete val.loginName;
      delete val.ewInsurerSiteId;
      delete val.ouName;
      delete val.locId;
      delete val.locName;
      delete val.deptId;
      delete val.orgId;
      delete val.divisionName;
      delete val.emplId;
      
      delete val.itemCategory;
      delete val.itemCode ;
      delete val.description ;
      delete val.uom ;
      delete val.itemCategory;
      delete val.relItemCode ;
      delete val.relDescription ;
      delete val.relUom ;
     

    return val;
  }


  newMast(){
    const formValue = this.trData(this.relatedItemMasterForm.value);  
    
    // const formValue: IRelItemMaster =this.trData(this.relatedItemMasterForm.value);

    this.service.RelatedItemMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY..'+res.message);
     
      } else {
        if (res.code === 400) {
          alert('Error While Inserting Record.');
          alert(res.message);
        }
        else { alert("Code : " +res.code + "-"+res.message); }

      }
      
    });
  }

  Validateitem(itemCode){
    this.service.getItemCodePach(itemCode).subscribe(data =>{
      this.abc2 = data;
      console.log(this.abc2)

      this.description=this.abc2.description;
      this.uom=this.abc2.uom;
      this.itemId=this.abc2.itemId;
      this.itemCategory=this.abc2.categoryName;

      // ---------------------List ------------------------------ 
      this.service.getRelatedItem(data.itemId).subscribe(data =>{
        this.abc = data;
        console.log(this.abc)  });
      // ---------------------------------------------------------


      // this.EmployeeMasterNewForm.patchValue(this.abc);
    })
  }
  Validateitem1(relItemCode){
    this.service.getItemCodePach(relItemCode).subscribe(data =>{
      this.abc = data;
      console.log(this.abc)

      this.relDescription=this.abc.description;
      this.relatedItemId =this.abc.itemId;
    })
  }

  serchByItem(itmCode){
    // alert ("Item code :" +itmCode);
    if(itmCode ===null || itmCode===undefined || itmCode.trim()==='') {alert ("Enter Valid Item Code ...");return;}
   
      this.service.getItemCodePach(itmCode).subscribe(data =>{
      this.abc2 = data;
      console.log(this.abc2)
      this.relatedItemMasterForm.patchValue({itemId : data.itemId});
      this.relatedItemMasterForm.patchValue({itemCategory : data.categoryName});
      // this.itemCategory=this.abc.categoryName;

   
    var mainItemId =this.relatedItemMasterForm.get("itemId").value;
    if(mainItemId>0) {
    this.service.getRelatedItem(mainItemId).subscribe(data =>{
      this.abc = data;
      console.log(this.abc)
    })
    } else {this.abc=null ;alert ("Invalid Item Code...")}

});

}

Select(relItemId: number) {
  // alert("Relation Item Id :" + relItemId);
  let select = this.abc.find(d => d.relatedItemId === relItemId);
  if (select) {
    this.relatedItemMasterForm.patchValue(select);
   
    this.cancelButton = true;
    this.saveButton=false;
  }
}

 

  deleteRelation() {
    // const formValue = this.trData(this.relatedItemMasterForm.value);  
    var relId =this.relatedItemMasterForm.get("relationId").value;
    var mainItemId =this.relatedItemMasterForm.get("itemId").value;
    this.service.DeleteItemRelation(relId).subscribe((res: any) => {
     if (res.code === 200) {
      this.cancelButton=false;

      this.service.getRelatedItem(mainItemId).subscribe(data =>{
        this.abc = data;
        console.log(this.abc)
      })

      alert(res.message);
     } else {
       if (res.code === 400) {
         alert(res.message);
       }
     }
   });
  }

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }


}
