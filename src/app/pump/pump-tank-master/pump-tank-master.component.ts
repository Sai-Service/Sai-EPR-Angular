import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from 'src/app/master/master.service';
import { DatePipe } from '@angular/common';


interface ITank {
  divisionId: number;
  // cmnId:number;
  // cmnTypeId:number;
  // cmnType: string;
  // cmnDesc: string;

  tankId:number;
  tankName:string;
  description: string;
  fuelType: string;
  physicalLoc: string;

  length:number;
  attribute2: number;
  width:number;
  tankDipCode: string;

  startDate:Date;
  endDate:string,
  status:string;

  
}

@Component({
  selector: 'app-pump-tank-master',
  templateUrl: './pump-tank-master.component.html',
  styleUrls: ['./pump-tank-master.component.css']
})

export class PumpTankMasterComponent implements OnInit {
  pumpTankMasterForm :FormGroup;

  pipe = new DatePipe('en-US');
  now = Date.now();
  public minDate = new Date();

  startDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  endDate:string;
  status:string="Active";

  lstcomments: any[];
  public applicationList: Array<string> = [];
  public DivisionIDList: Array<string> = [];
  public statusList : Array<string> = [];
  public fuelTypeList: Array<string> = [];

  //  cmnTypeList: any;

  // cmnId:number;
  // cmnTypeId:number;
  // cmnType: string;
  // cmnDesc: string;

  loginName:string;
  loginArray:string;
  divisionId:number;
  name:string;
  ouName : string;
  locId: number;
  locationId:number;
  locName : string;
  orgId:number;
  ouId :number;
  deptId:number; 
  emplId :number;

  tankId:number;
  tankName:string;
  description: string;
  fuelType: string;
  physicalLoc: string;

  length:number;
  attribute2: number;
  width:number;
  tankDipCode: string;

  


  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  checkValidation=false;
  saveButton=true;
  updButton=true;
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.pumpTankMasterForm = fb.group({
      // itemRows: this.fb.array([this.inItemRows()]),

      // cmnId:[],
      // cmnTypeId:[],
      // cmnType: ['', [Validators.required]],
      // cmnDesc: ['', [Validators.required]],

      tankId:[],
      tankName:[],
      description: [],
      fuelType: [],
      physicalLoc: [],
    
      length:[],
      attribute2: [],
      width:[],
      tankDipCode: [],
    
      startDate:[],
      endDate:[],
      status:[],


      loginArray:[''],
      loginName:[''],
      divisionId:[],
      ouName :[''],
      locId:[],
      locationId:[],
      locName :[''],
      ouId :[],
      deptId :[],
      emplId:[''],
      orgId:[''],

    });
  }

 



  // inItemRows() {
  //   return this.fb.group({
  //     cmnType: [''],
  //     cmnDesc: ['']
  //   });
  // }


  // addRow() {
  //   const control = <FormArray>this.paintPanelMasterForm.controls['itemRows'];
  //   control.push(this.inItemRows());
  // }

  get f() { return this.pumpTankMasterForm.controls; }

  ngOnInit(): void {

    $("#wrapper").toggleClass("toggled");
    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
    this.loginName=sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    this.locName=(sessionStorage.getItem('locName'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.emplId= Number(sessionStorage.getItem('emplId'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);
    this.divisionId =3;

    this.service.DivisionIDList()
      .subscribe(
        data => {
          this.DivisionIDList = data;
          console.log(this.DivisionIDList);
        });

    // this.service.applicationList()
    //   .subscribe(
    //     data => {
    //       this.applicationList = data;
    //       console.log(this.applicationList);
    //     });

    // this.service.cmnTypeListNew(sessionStorage.getItem('divisionId'))
    //   .subscribe(
    //     data => {
    //       this.cmnTypeList = data;
    //       console.log(this.cmnTypeList);
    //     });

      this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        });

        this.service.FuelTypeList('PP.FUEL',3)
        .subscribe(
          data => {
            this.fuelTypeList = data;
            console.log(this.fuelTypeList);
          });

  }

  pumpTankMaster(pumpTankMasterForm: any) {

  }



  saveTankMast() {

    this.CheckDataValidations()
    
    if (this.checkValidation===true) {
       alert("Data Validation Sucessfull....") 

    const formValue: ITank = this.transeData(this.pumpTankMasterForm.value);
    this.service.tankMasterSubmit(formValue).subscribe((res: any) => {
     
      if (res.code === 200) {
        alert('RECORD SAVED SUCCESSFULLY');
        this.saveButton=false;
        this.pumpTankMasterForm.disable();
        
      } else {
        if (res.code === 400) {
          alert('ERROR : RECORD NOT SAVED.' + res.message +", "+res.obj);
          this.saveButton=true;
        }
      }


    });
  } else { alert ("Data Validation Failed....Save not done.")}
  }



  updateComnMast() {

    // this.CheckDataValidations();
    // if (this.checkValidation===true) {
    //     alert("Data Validation Sucessfull....\nPutting data to TAX REGIME MASTER  TABLE")
    // alert ("Cmn Id = "+this.cmnId)

        const formValue: ITank = this.pumpTankMasterForm.value;
        this.service.UpdateCommonMasterSubmit(formValue, this.tankId).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD UPDATED SUCCESSFULLY');
            this.updButton=false;
          } else {
            if (res.code === 400) {
              alert('ERROR OCCOURED IN PROCEESS');
              this.updButton=true;
              // this.jaiRegimeMasterForm.reset();
            }
          }
          
        });
      // }else{ alert("Data Validation Not Sucessfull....\nData not Saved...")  }
  }

  onOptionsSelected(event: any) {
    this.Status1 = this.pumpTankMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      // this.endDate = new Date();
      this.endDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    }
    else if (this.Status1 === 'Active') {
      this.pumpTankMasterForm.get('endDate').reset();
      this.displayInactive=true;
    }
  }



searchMast() {
  this.service.getTankList()
    .subscribe(
      data => {
        this.lstcomments = data;
        console.log(this.lstcomments);
      }
    );
   }


Select(tankId: number) {

    this.pumpTankMasterForm.reset();
    this.divisionId =3;

    let select = this.lstcomments.find(d => d.tankId === tankId);
    if (select) {
      this.pumpTankMasterForm.patchValue(select);
      this.tankId = select.tankId;
      this.startDate= select.startDate;

      this.displayButton = false;
    
   }
   
  }

 

// onSelectType(cmnTp){
//   let select = this.cmnTypeList.find(d => d.CMNTYPE === cmnTp);
//   if (select) {
//      var cmnTypeId1=  select.CMNTYPEID+1;
//     this.pumpTankMasterForm.patchValue({cmnDesc:select.CMNDESC ,cmnTypeId :cmnTypeId1 ,application :'ALL'})
//   }
// }

resetMast() {
  window.location.reload();
}

closeMast() {
  this.router.navigate(['admin']);
}


transeData(val) {
  delete val.divisionId;
  delete val.loginArray;
  delete val.loginName;
  delete val.locName;
  delete val.ouName;
  delete val.locationId;
  // delete val.locId;
  // delete val.ouId;
  delete val.deptId;
  delete val.orgId;
  return val;
}

CheckDataValidations(){

  const formValue: ITank = this.pumpTankMasterForm.value;

  formValue.tankName =this.tankName.toUpperCase();
  formValue.description=this.description.toUpperCase();
  formValue.physicalLoc=this.physicalLoc.toUpperCase();

  // formValue.attribute1=this.attribute1.charAt(0).toUpperCase();
  // alert ("code, desc ,attribute1: "+this.code + " , "+this.codeDesc+ " , "+this.attribute1);

  // if (formValue.divisionId===undefined || formValue.divisionId===null || formValue.divisionId<0)
  // {
  //   this.checkValidation=false; 
  //   alert ("DIVISION : Should not be null....");
  //   return;
  // } 

  

  if (formValue.tankName===undefined || formValue.tankName===null || formValue.tankName.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("CODE : Should not be null....");
    return;
  } 

  if (formValue.description===undefined || formValue.description===null || formValue.description.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("CODE DESCRIPTION : Should not be null....");
    return;
  } 

  if (formValue.status===undefined || formValue.status===null || formValue.status.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("STATUS : Should not be null....");
    return;
  } 

  if (formValue.startDate===undefined || formValue.startDate===null  )
  {
    this.checkValidation=false; 
    alert ("START DATE : Enter Valid Start Date....");
    return;
  } 

    this.checkValidation=true;

}

}


