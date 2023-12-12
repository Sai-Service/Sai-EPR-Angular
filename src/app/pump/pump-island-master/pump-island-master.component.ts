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


interface IIsland {
  divisionId: number;
  cmnId:number;
  cmnTypeId:number;
  cmnType: string;
  cmnDesc: string;

  islandCode:string;
  islandName:string;
  islandPhyLoc: string;

  nozzle1: string;
  nozzle2: string;
  nozzle3: string;
  nozzle4: string;

  tank1: string;
  tank2: string;
  tank3: string;
  tank4: string;

  startDate:string;
  endDate:string,
  status:string;
  
}
@Component({
  selector: 'app-pump-island-master',
  templateUrl: './pump-island-master.component.html',
  styleUrls: ['./pump-island-master.component.css']
})
export class PumpIslandMasterComponent implements OnInit {


  pumpIslandMasterForm :FormGroup;

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
  public nozzleList: Array<string> = [];
   cmnTypeList: any;

  cmnId:number;
  cmnTypeId:number;
  cmnType: string;
  cmnDesc: string;

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

  islandCode:string;
  islandName:string;
  islandPhyLoc: string;

  nozzle1: string;
  nozzle2: string;
  nozzle3: string;
  nozzle4: string;

  tank1: string;
  tank2: string;
  tank3: string;
  tank4: string;

  


  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  checkValidation=false;
  saveButton=true;
  updButton=true;
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.pumpIslandMasterForm = fb.group({
      // itemRows: this.fb.array([this.inItemRows()]),

      cmnId:[],
      cmnTypeId:[],
      cmnType: ['', [Validators.required]],
      cmnDesc: ['', [Validators.required]],

      islandCode:[],
      islandName:[],
      islandPhyLoc: [],
      
      nozzle1: [],
      nozzle2: [],
      nozzle3: [],
      nozzle4: [],

      tank1: [],
      tank2: [],
      tank3: [],
      tank4: [],
    
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

  get f() { return this.pumpIslandMasterForm.controls; }

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

          this.service.NozzleList()
          .subscribe(
            data => {
              this.nozzleList = data;
              console.log(this.nozzleList);
            });

  }

  pumpIslandMaster(pumpIslandMasterForm: any) {

  }

  saveComnMast() {

    this.CheckDataValidations()
    
    if (this.checkValidation===true) {
       alert("Data Validation Sucessfull....") 

    const formValue: IIsland = this.pumpIslandMasterForm.value;
    this.service.commonMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD SAVED SUCCESSFULLY');
        this.saveButton=false;
        this.pumpIslandMasterForm.disable();
        
      } else {
        if (res.code === 400) {
          alert('ERROR : RECORD NOT SAVED.' + res.message);
          this.saveButton=true;
        }
      }
    });
  } else { alert ("Data Validation Failed....Save not done.")}
  }

  // updateComnMast(){alert ("Update ....WIP")}


  updateComnMast() {

    // this.CheckDataValidations();
    // if (this.checkValidation===true) {
    //     alert("Data Validation Sucessfull....\nPutting data to TAX REGIME MASTER  TABLE")
    // alert ("Cmn Id = "+this.cmnId)

        const formValue: IIsland = this.pumpIslandMasterForm.value;
        this.service.UpdateCommonMasterSubmit(formValue, this.cmnId).subscribe((res: any) => {
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
    this.Status1 = this.pumpIslandMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      // this.endDate = new Date();
      this.endDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    }
    else if (this.Status1 === 'Active') {
      this.pumpIslandMasterForm.get('endDate').reset();
      this.displayInactive=true;
    }
  }



  searchCmnMst(){

    // var searchText=this.paintPanelMasterForm.get('cmnType').value;
    var searchText='Panel'
    this.service.getCommonLookupSearchNew(searchText,sessionStorage.getItem('divisionId'))
    .subscribe(
      data => {
        this.lstcomments = data;
        console.log(this.lstcomments);
        // this.displayButton=false;
        }
    );
  }




Select(cmId: number) {
  // alert ('cmnId='+cmId)
  let select = this.lstcomments.find(d => d.cmnId === cmId);
  if (select) {
    this.pumpIslandMasterForm.patchValue(select);
    this.cmnId=select.cmnId;
    this.displayButton = false;
    // this.updButton=true;
    // this.paintPanelMasterForm.disable();
    this.pumpIslandMasterForm.get('status').enable();

    this.display = false;
  }
}

onSelectType(cmnTp){
  let select = this.cmnTypeList.find(d => d.CMNTYPE === cmnTp);
  if (select) {
     var cmnTypeId1=  select.CMNTYPEID+1;
    //  alert ("Desc :" +select.CMNDESC + " , id : "+select.CMNTYPEID + "," +cmnTypeId1);
    this.pumpIslandMasterForm.patchValue({cmnDesc:select.CMNDESC ,cmnTypeId :cmnTypeId1 ,application :'ALL'})
  }
}

resetMast() {
  window.location.reload();
}

closeMast() {
  this.router.navigate(['admin']);
}


CheckDataValidations(){

  const formValue: IIsland = this.pumpIslandMasterForm.value;

  formValue.islandCode =this.islandCode.toUpperCase();
  formValue.islandName=this.islandName.toUpperCase();

  // formValue.attribute1=this.attribute1.charAt(0).toUpperCase();
  // alert ("code, desc ,attribute1: "+this.code + " , "+this.codeDesc+ " , "+this.attribute1);

  if (formValue.divisionId===undefined || formValue.divisionId===null || formValue.divisionId<0)
  {
    this.checkValidation=false; 
    alert ("DIVISION : Should not be null....");
    return;
  } 

  if (formValue.cmnType===undefined || formValue.cmnType===null || formValue.cmnType.trim()==='')
  {
    this.checkValidation=false; 
    alert ("TYPE NAME : Should not be null....");
    return;
  } 

  if (formValue.islandCode===undefined || formValue.islandCode===null || formValue.islandCode.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("CODE : Should not be null....");
    return;
  } 

  if (formValue.islandName===undefined || formValue.islandName===null || formValue.islandName.trim()==='' )
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

  if (formValue.startDate===undefined || formValue.startDate===null || formValue.startDate.trim()==='' )
  {
    this.checkValidation=false; 
    alert ("START DATE : Enter Valid Start Date....");
    return;
  } 

    this.checkValidation=true;

}

}



