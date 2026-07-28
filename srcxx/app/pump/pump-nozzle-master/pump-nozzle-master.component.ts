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


interface INozzle {
  divisionId: number;
  
  // cmnTypeId:number;
  // cmnType: string;
  // cmnDesc: string;

  nozzleId:number;
  nozzleCode:string;
  nozzleDesc: string;
  fuelCode: number;
  pumpName:string;

  tankId:number;
  islandId: number;

  startDate:string;
  endDate:string,
  status:string;
  
}

@Component({
  selector: 'app-pump-nozzle-master',
  templateUrl: './pump-nozzle-master.component.html',
  styleUrls: ['./pump-nozzle-master.component.css']
})
export class PumpNozzleMasterComponent implements OnInit {

  pumpNozzleMasterForm :FormGroup;

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
  public tankList: Array<string> = [];
  public islandList: Array<string> = [];
  public fuelTypeList: Array<string> = [];


  
   cmnTypeList: any;

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

  nozzleId:number;
  nozzleCode:string;
  nozzleDesc: string;
  fuelCode: number;
  pumpName:string;

  tankId:number;
  islandId: number;

  


  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  checkValidation=false;
  saveButton=true;
  updButton=true;
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.pumpNozzleMasterForm = fb.group({
      // itemRows: this.fb.array([this.inItemRows()]),

      // cmnId:[],
      // cmnTypeId:[],
      // cmnType: ['', [Validators.required]],
      // cmnDesc: ['', [Validators.required]],

      nozzleId:[],
      nozzleCode:[],
      nozzleDesc: [],
      fuelCode: [],
    
      tankId:[],
      islandId: [],
      pumpName:[],
    
    
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

  get f() { return this.pumpNozzleMasterForm.controls; }

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

    this.service.applicationList()
      .subscribe(
        data => {
          this.applicationList = data;
          console.log(this.applicationList);
        });

    this.service.cmnTypeListNew(sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          this.cmnTypeList = data;
          console.log(this.cmnTypeList);
        });

      this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        });

        this.service.TankList()
        .subscribe(
          data => {
            this.tankList = data;
            console.log(this.tankList);
          });

          this.service.IslandList()
          .subscribe(
            data => {
              this.islandList = data;
              console.log(this.islandList);
            });

            this.service.FuelTypeList('PP.FUEL',3)
            .subscribe(
              data => {
                this.fuelTypeList = data;
                console.log(this.fuelTypeList);
              });

               

  }

  pumpNozzleMaster(pumpNozzleMasterForm: any) {

  }


  saveNozzleMast() {

      this.CheckDataValidations()
      
      if (this.checkValidation===true) {
         alert("Data Validation Sucessfull....") 
  
      const formValue: INozzle = this.transeData(this.pumpNozzleMasterForm.value);
      this.service.nozzleMasterSubmit(formValue).subscribe((res: any) => {
       
        if (res.code === 200) {
          alert('RECORD SAVED SUCCESSFULLY');
          this.saveButton=false;
          this.pumpNozzleMasterForm.disable();
          
        } else {
          if (res.code === 400) {
            alert('ERROR : RECORD NOT SAVED.' + res.message +", "+res.obj);
            this.saveButton=true;
          }
        }
  
  
      });
    } else { alert ("Data Validation Failed....Save not done.")}
    }
  
  
  
    updateNozzleMast() {
  
      // this.CheckDataValidations();
      // if (this.checkValidation===true) {
      //     alert("Data Validation Sucessfull....\nPutting data to TAX REGIME MASTER  TABLE")
      // alert ("Cmn Id = "+this.cmnId)
  
          const formValue: INozzle = this.pumpNozzleMasterForm.value;
          this.service.UpdateCommonMasterSubmit(formValue, this.nozzleId).subscribe((res: any) => {
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

  onOptionsSelected(event: any) {
    this.Status1 = this.pumpNozzleMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      // this.endDate = new Date();
      this.endDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    }
    else if (this.Status1 === 'Active') {
      this.pumpNozzleMasterForm.get('endDate').reset();
      this.displayInactive=true;
    }
  }


  searchMast() {
    this.service.getNozzleList()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
     }
  
  
  Select(nozzleId: number) {
  
      this.pumpNozzleMasterForm.reset();
      this.divisionId =3;
  
      let select = this.lstcomments.find(d => d.nozzleId === nozzleId);
      if (select) {
        this.pumpNozzleMasterForm.patchValue(select);
        this.nozzleId = select.nozzleId;
        // alert ("tankid :" + select.tankId)
        this.pumpNozzleMasterForm.patchValue({tankId:select.tankId});

        this.displayButton = false;
      
     }
     
    }

 

// onSelectType(cmnTp){
//   let select = this.cmnTypeList.find(d => d.CMNTYPE === cmnTp);
//   if (select) {
//      var cmnTypeId1=  select.CMNTYPEID+1;
//     this.pumpNozzleMasterForm.patchValue({cmnDesc:select.CMNDESC ,cmnTypeId :cmnTypeId1 ,application :'ALL'})
//   }
// }

resetMast() {
  window.location.reload();
}

closeMast() {
  this.router.navigate(['admin']);
}


CheckDataValidations(){

  const formValue: INozzle = this.pumpNozzleMasterForm.value;

  formValue.nozzleCode =this.nozzleCode.toUpperCase();
  formValue.nozzleDesc=this.nozzleDesc.toUpperCase();

  // formValue.attribute1=this.attribute1.charAt(0).toUpperCase();
  // alert ("code, desc ,attribute1: "+this.code + " , "+this.codeDesc+ " , "+this.attribute1);

  if (formValue.divisionId===undefined || formValue.divisionId===null || formValue.divisionId<0)
  {
    this.checkValidation=false; 
    alert ("DIVISION : Should not be null....");
    return;
  } 

  // if (formValue.nozzleId===undefined || formValue.nozzleId===null )
  // {
  //   this.checkValidation=false; 
  //   alert (" NAME : Should not be null....");
  //   return;
  // } 

  if (formValue.nozzleCode===undefined || formValue.nozzleCode===null || formValue.nozzleCode.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("CODE : Should not be null....");
    return;
  } 

  // if (formValue.nozzleDesc===undefined || formValue.nozzleDesc===null || formValue.nozzleDesc.trim()==='' )
  // {
  //   this.checkValidation=false; 
  //   alert ("CODE DESCRIPTION : Should not be null....");
  //   return;
  // } 

  if (formValue.status===undefined || formValue.status===null || formValue.status.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("STATUS : Should not be null....");
    return;
  } 

  if (formValue.startDate===undefined || formValue.startDate===null || formValue.startDate.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("START DATE : Enter Valid Start Date....");
    return;
  } 

    this.checkValidation=true;

}

}



