import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { PaintService } from 'src/app/paint/paint.service';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { DatePipe } from '@angular/common';
import { IFinanaceExchangeForm } from 'src/app/order-management/sales-order-form/sales-order-form.component';

interface IPaintMixingMaster {
  itemCode : string;
  itemCode1 : string;
  description : string;
  uom : string;
  itemCategory:string;
  baseCategory:string;
  relItemCode : number;
  relDescription : string;
  relUom : any;
  relationId : number;
  relationID : number;

  itemId : number;
  relatedItemId : number;

  startDate:string;
  endDate:string,
  status:string;

  attribute5 :number;

}

@Component({
  selector: 'app-paint-mixing-master',
  templateUrl: './paint-mixing-master.component.html',
  styleUrls: ['./paint-mixing-master.component.css']
})


export class PaintMixingMasterComponent implements OnInit {
  paintMixingMasterForm: FormGroup;

  pipe = new DatePipe('en-US');
  now = Date.now();
  public minDate = new Date();


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

  public paintColorList :any[];
  public statusList : Array<string> = [];


  startDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  endDate:string;
  status:string="Active";

  itemCode : string;
  itemCode1 : string;
  itemCode1Desc : string;

  description : string;
  uom : string;
  itemCategory:string;
  baseCategory:string;

  relItemCode : number;
  relDescription : string;
  relUom : any;

  relationId : number;
  relationID : number;

  itemId : number;
  relatedItemId : number;
  abc : any;
  abc2: any;

  attribute5 :number=0;

  saveButton=true;
  cancelButton=false;
  updateButtonDisable=true;
  checkValidation=false;

  dataDisplay :string;
  spinIcon=true;
  displayButton = true;
  displayInactive = true;

  Status1: any;
  userList2: any[] = [];
  lastkeydown1: number = 0;
  userList1: any[] = [];
 lastkeydown2: number = 0;


  get f() {return this.paintMixingMasterForm.controls;}

  paintMixingMaster(paintMixingMasterForm: any){}

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService, private orderManagementService: OrderManagementService) {
    this.paintMixingMasterForm = fb.group({

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
      relationID : [],
      itemId : [],
      relatedItemId : [],
      itemCategory:[],
      baseCategory:[],

      itemCode1:[],
      itemCode1Desc :[],

      startDate:[],
      endDate:[],
      status:[],
      attribute5 :[],
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

    this.service.paintColorCodeList(this.divisionId).subscribe(
      data => {
      this.paintColorList = data;
      console.log(this.paintColorList);
    });

    this.service.statusList()
    .subscribe(
      data => {
        this.statusList = data;
        console.log(this.statusList);
      });

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
      // delete val.itemCode ;
      delete val.description ;
      delete val.uom ;
      delete val.itemCategory;
      delete val.relItemCode ;
      delete val.relDescription ;
      delete val.relUom ;
     

    return val;
  }

  updateMast() {

    this.CheckDataValidations();
    this.saveButton=false;
    this.updateButtonDisable=false;

    if (this.checkValidation===true) {
    var  resp=confirm("Do You Want to Update this Transaction ???");
    if(resp==false) { return;}
    const formValue: IPaintMixingMaster = this.trData(this.paintMixingMasterForm.getRawValue()); 
    var mainItemId =this.paintMixingMasterForm.get("itemId").value;

    this.service.UpdatePaintMixMaster(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        // this.paintMixingMasterForm.disable();
        this.updateButtonDisable=true;
        this.cancelButton=false;

        this.service.getRelatedItem(mainItemId).subscribe(data =>{
          this.abc = data;
          console.log(this.abc)
        })
      } else {
        if (res.code === 400) {
          // this.saveButton=true;
          alert('ERROR OCCOURED IN PROCEESS');
          
          // this.paintMixingMasterForm.reset();
        }
      }
    });
  }
  };


  newMast(){

    this.CheckDataValidations();
    this.saveButton=false;
    this.updateButtonDisable=true;
    const formValue: IPaintMixingMaster = this.trData(this.paintMixingMasterForm.getRawValue()); 

    if (this.checkValidation===true) {

      var  resp=confirm("Do You Want to Save this Transaction ???");
      if(resp==false) { return;}
      // const formValue = this.trData(this.paintMixingMasterForm.value).getRawValue();  
      var mainItemId =this.paintMixingMasterForm.get("itemId").value;

    this.service.RelatedItemMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY..'+res.message);
        this.paintMixingMasterForm.disable();

        this.service.getRelatedItem(mainItemId).subscribe(data =>{
          this.abc = data;
          console.log(this.abc)
        })

      } else {
        if (res.code === 400) {
          this.saveButton=true;

          alert('Error While Inserting Record.');
          alert(res.message);
        }
        else { alert("Code : " +res.code + "-"+res.message); }

      }
      
    });
  } else { alert ("Data Validation Failed. Please check and try again...");}
  }

  deleteRelation() {
    // const formValue = this.trData(this.relatedItemMasterForm.value);  

    var  resp=confirm("Do You Want to Delete this Record ???");
    if(resp==false) { return;}

    this.updateButtonDisable=true;

    var relId =this.paintMixingMasterForm.get("relationId").value;
    var mainItemId =this.paintMixingMasterForm.get("itemId").value;
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

  Validateitem(itemCode){
    // alert ("Maincolr item :"+itemCode);
    this.service.getItemCodePach(itemCode).subscribe(data =>{
      this.abc2 = data;
      console.log(this.abc2)

    // alert ("Maincolr item abc2 :"+this.abc2 +","+this.abc2.length);

      // if(this.abc2.trim===null){alert("Colour Code doesnt exist...Please check")  ;this.saveButton=false;return;}
      // alert ("this.abc2.itemId :"+this.abc2.itemId)
      if(this.abc2.itemId===undefined) {
        this.description=''
        this.uom=''
        this.itemId=0
        this.itemCategory=''
        this.saveButton=false;
        alert ("Invalid ItemCode . Plese Select Valid item from the List...."); return;
      }
      else {

      this.description=this.abc2.description;
      this.uom=this.abc2.uom;
      this.itemId=this.abc2.itemId;
      this.itemCategory=this.abc2.categoryName;
      this.saveButton=true;

      // ---------------------List ------------------------------ 
      this.service.getRelatedItem(data.itemId).subscribe(data =>{
        this.abc = data;
        console.log(this.abc)  });
      // ---------------------------------------------------------
      }

      // this.EmployeeMasterNewForm.patchValue(this.abc);
    })
  
  }

  Validateitem1(relItemCode){
    // alert ("relItemCode item :"+relItemCode);

    this.service.getItemCodePach(relItemCode).subscribe(data =>{
      this.abc = data;
      console.log(this.abc)

      // if(this.abc.length===undefined){alert("Base Colour Code doesnt exist...Please check")  ;this.saveButton=false;return;}
      this.baseCategory=this.abc.categoryName;
      this.relDescription=this.abc.description;
      this.relatedItemId =this.abc.itemId;
      this.saveButton=true;
    })
  }



  getUserIdsFirstWayColor($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList1 = [];
 
    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.paintColorList, userId);
      }
    }
  }



 

 

searchFromArray(arr, regex) {
  let matches = [], i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i].match(regex)) {
      matches.push(arr[i]);
    }
  }
  return matches;
};


  serchByItem(clrCode){

    if(clrCode ===null || clrCode===undefined || clrCode.trim()==='') {alert ("Select Valid Main Colour Code ...");return;}

    var x = this.paintMixingMasterForm.get('itemCode1').value;
    // M0173-AXA-SLV
    if (x.includes(':')) {
       var x1=x.indexOf(':');
        var x2 =x.substr(0,x1);
    } else {  x2=x;  }

      // alert ("x,x1,x2 : "+x+","+x1+","+x2);
    
      // var y =clrCode.indexOf(':');
      // var itmCode = clrCode.substr(0,y);

      var itmCode =x2;

      this.spinIcon=false;
      this.dataDisplay='Loading...Please Wait...'

      this.service.getItemCodePach(itmCode).subscribe(data =>{
      this.abc2 = data;
      console.log(this.abc2)
      this.paintMixingMasterForm.patchValue({itemId : data.itemId});
      this.paintMixingMasterForm.patchValue({itemCategory : data.categoryName});
      this.paintMixingMasterForm.patchValue({itemCode1Desc : data.description});
     
      // this.itemCategory=this.abc.categoryName;
  
    var mainItemId =this.paintMixingMasterForm.get("itemId").value;
    if(mainItemId>0) {
    this.service.getRelatedItem(mainItemId).subscribe(data =>{
      this.abc = data;
      // alert ("this.abc :"+this.abc + " ," +this.abc.length);
      if(this.abc.length==0) { alert ("No Record(s) Found...");return;}

      console.log(this.abc)
      
    })
    this.spinIcon=true;this.dataDisplay='';

    } else {this.abc=null ;alert ("Invalid Item Code...");this.spinIcon=true;this.dataDisplay='';}

});

}

Select(relItemId: number) {
  // alert("Relation Item Id :" + relItemId);
  let select = this.abc.find(d => d.relatedItemId === relItemId);
  if (select) {
    this.paintMixingMasterForm.patchValue(select);
    this.relationID=select.relationId;

    this.service.getItemCodePach(select.relItemCode).subscribe(data =>{
      // this.abc = data;
      // console.log(this.abc)
      this.baseCategory=data.categoryName;

      // alert("relationId ,relationID :" +this.relationId +","+this.relationID);

   
    this.cancelButton = true;
    this.saveButton=false;
    this.displayButton = false;
    this.updateButtonDisable=false;

  })

  }
}


onOptionsSelected(event: any) {
  this.Status1 = this.paintMixingMasterForm.get('status').value;
  // alert(this.Status1);
  if (this.Status1 === 'Inactive') {
    this.displayInactive = false;
    // this.endDate = new Date();
    this.endDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  }
  else if (this.Status1 === 'Active') {
    this.paintMixingMasterForm.get('endDate').reset();
    this.displayInactive=true;
  }
}

 

  

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }


  CheckDataValidations(){
    
    const formValue: IPaintMixingMaster = this.trData(this.paintMixingMasterForm.value)
  
    // alert ("formValue.baseCategory:"+formValue.baseCategory);

    if (formValue.itemId===undefined || formValue.itemId===null  || formValue.itemId <=0)
    {
      this.checkValidation=false; 
      alert ("MAIN COLOUR CODE : Please check Item Code");this.saveButton=true;
      return;
    } 

    
    if (formValue.relatedItemId===undefined || formValue.relatedItemId===null  || formValue.relatedItemId <=0)
    {
      this.checkValidation=false; 
      alert ("BASE COLOUR CODE : Please check Related Item Code");this.saveButton=true;
      return;
    } 

    if(formValue.itemId===formValue.relatedItemId) {
      this.checkValidation=false; 
      alert ("[MAIN COLOUR CODE] and [BASE COLOUR CODE]  are same: Please check.");this.saveButton=true;
      return;

    }
    if(formValue.baseCategory==='PN.MAIN') {
      this.checkValidation=false; 
      alert ("Wrong  [BASE COLOUR CODE]  Selected ... Please check");this.saveButton=true;
      return;
    }

    if (formValue.attribute5===undefined || formValue.attribute5===null  || formValue.attribute5 <0)
      {
        this.checkValidation=false; 
        alert ("UNIT/GRAM : Please enter valid data");this.saveButton=true;
        return;
      } 


      this.checkValidation=true;

  }

  


}
