import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from 'src/app/master/master.service';
import { PumpService } from 'src/app/pump/pump.service';

import { DatePipe } from '@angular/common';


interface IDipEntry {
  divisionId: number;
  
  dipentryid :number;
  dipentrydate  :Date
  dipentrynumber :string;
  locid:number;
  emplid:number;
  shiftid:number;
  tankid:number;
  tankname:string;
  opendip  :number;
  openstock:number;
  closedip:number;
  closestock :number;
  remarks:string;

  nozzleId:number;
  dipNum:string;
  shiftTypeName:string;
  shiftEmplName:string;
  
}


@Component({
  selector: 'app-dip-scale-entry',
  templateUrl: './dip-scale-entry.component.html',
  styleUrls: ['./dip-scale-entry.component.css']
})
export class DipScaleEntryComponent implements OnInit {
  pumpDipEntryForm :FormGroup;

  pipe = new DatePipe('en-US');
  now = Date.now();
  public minDate = new Date();

  startDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  dipentrydate = this.pipe.transform(Date.now(), 'y-MM-dd');

  searchByDate = this.pipe.transform(Date.now(), 'y-MM-dd');

  endDate:string;
  status:string="Active";

  lstcomments: any[];
  lstcomments1: any=[];

  public applicationList: Array<string> = [];
  public DivisionIDList: Array<string> = [];
  public statusList : Array<string> = [];
  // public tankList: Array<string> = [];
  public islandList: Array<string> = [];
  public fuelTypeList: Array<string> = [];
  shiftList :any=[];
  salesPersonList :any=[];
  tankList:any=[];

  
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

  
  dipentryid :number;
  // dipentrydate  :Date
  dipentrynumber:string;
  dipNum:string;
  locid:number;
  emplid:number;
  shiftid:number;
  tankid:number;
  tankname:string;
  opendip  :number;
  openstock:number;
  closedip:number;
  closestock :number;
  remarks:string;

  nozzleId:number;

  shiftTypeName:string;
  shiftEmplName:string;

  userList1: any[] = [];
  lastkeydown1: number = 0;



  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  checkValidation=false;
  saveButton=true;
  updButton=true;
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private pumpService:PumpService) {
    this.pumpDipEntryForm = fb.group({
      // itemRows: this.fb.array([this.inItemRows()]),

      // cmnId:[],
      // cmnTypeId:[],
      // cmnType: ['', [Validators.required]],
      // cmnDesc: ['', [Validators.required]],
      searchByDate:[],
      dipentryid :[],
      dipentrydate  :[],
      dipentrynumber:[],
      dipNum:[],
      locid:[],
      emplid:[],
      shiftid:[],
      tankid:[],
      tankname:[''],
      opendip  :[],
      openstock:[],
      closedip:[],
      closestock :[],
      remarks:[],
      nozzleId:[],

      shiftTypeName:[],
      shiftEmplName:[],
        
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

  get f() { return this.pumpDipEntryForm.controls; }

  ngOnInit(): void {

    $("#wrapper").toggleClass("toggled");
    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
    this.loginName=sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locid=Number(sessionStorage.getItem('locId'));
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

              this.service.ShiftList().subscribe(
                data => {
                  this.shiftList = data;
                  console.log(this.shiftList);
                }
              );

              this.service.PPEmplIdList(sessionStorage.getItem('locId'),sessionStorage.getItem('divisionId'))
          .subscribe(
            data => {
              this.salesPersonList = data;
              console.log(this.salesPersonList);
            }
);
               

  }

  pumpDipEntry(pumpDipEntryForm: any) {

  }

  clearSearch() {
    
    this.pumpDipEntryForm.get('searchByDate').reset();
    this.lstcomments = null;
  }

  SearchByEntryDate(entdate1) {

    if (entdate1 === undefined || entdate1 === null) { return; } 
    var mDate = this.pipe.transform(entdate1, 'dd-MM-y');

    this.pumpService.SearchByEntryDate(mDate)
      .subscribe(
        data => {
          this.lstcomments1 = data;
          console.log(this.lstcomments1);
        
        });
  }


  onKey(event: any,tp ) {
    this.searchVolQty(event,tp);
  }

  
 
  searchVolQty(dipReading,tp){

    // alert ("---tp ,Reading="+tp+","+dipReading)

    var tnkId=this.pumpDipEntryForm.get('tankid').value;
    var dipOpen=this.pumpDipEntryForm.get('opendip').value;
    var dipClose=this.pumpDipEntryForm.get('closedip').value;
    var dipScaleReading=0; var tankQty=0;
    
    if(tp==='OPENR') { this.openstock=null;} 
    if(tp==='CLOSER') {this.closestock=null;}

    dipScaleReading=dipReading; 

     if(tnkId===undefined || tnkId===null ) { 
      alert ("Please Select [Tank Name] from Tank list..");this.opendip=null;this.closedip=null;
      return}

    this.service.getDipScaleSearchByTankIdAndVol(tnkId,dipReading)
    .subscribe(
      data => {
        if(data.obj===null) {alert(dipReading+ "...dosent exists in Master....." +data.message)}
        else {

          if(tp==='OPENR') {this.openstock=data.obj.qty;}
          if(tp==='CLOSER') {this.closestock=data.obj.qty;}
          }}
    );

  }


  getUserIdsFirstWay($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList1 = [];
  
   }
  
  
  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;

  
  }
  
validateShiftDate(shftDate) {
  var currDate = new Date();
  var shDate = new Date(shftDate);
  if (shDate > currDate) {
    alert("DIP ENTRY DATE :" + "Should not be above Today's Date");
    this.dipentrydate = this.pipe.transform(this.now, 'y-MM-dd');
  }

}


onSelectEmplName(event){
  var emlName=event.target.value;
  var emplList = emlName.substr(emlName.indexOf('-') + 1, emlName.length);
  var emplList1 = this.salesPersonList.find((salesPersonList:any)=>salesPersonList.fullName==emplList);
    console.log(emplList1);
  this.pumpDipEntryForm.patchValue({emplid:emplList1.emplId})
  
}


onSelectTank(tnkId){
  // alert("Tank Id :"+tnkId)
  
  var select3 = this.tankList.find((tankList:any)=>tankList.tankId==tnkId);
  console.log(select3);
  // alert ("select3.tankName   "+select3.tankName)
  this.pumpDipEntryForm.patchValue({tankname:select3.tankName})
   
}


saveDipEntry() {

      this.CheckDataValidations()
      
      if (this.checkValidation===true) {
         alert("Data Validation Sucessfull....") 
    
         var  resp=confirm("Do You Want to Save this Transaction ???");
         if(resp==false) { return;}
           
  
      const formValue: IDipEntry = this.transeData(this.pumpDipEntryForm.value);
      this.service.dipEntrySubmit(formValue).subscribe((res: any) => {
       
        if (res.code === 200) {
          alert('RECORD SAVED SUCCESSFULLY');
          this.dipentrynumber = res.obj.dipentrynumber;

          this.saveButton=false;
          this.pumpDipEntryForm.disable();
          
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
  
          const formValue: IDipEntry = this.pumpDipEntryForm.value;
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
    this.Status1 = this.pumpDipEntryForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      // this.endDate = new Date();
      this.endDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    }
    else if (this.Status1 === 'Active') {
      this.pumpDipEntryForm.get('endDate').reset();
      this.displayInactive=true;
    }
  }


  


  searchMst(dipnum) {
    this.displayButton=false;
    this.service.getDipEntryDetails(dipnum)
      .subscribe(
        data => {
          this.lstcomments = data;
          // console.log(this.lstcomments);
          this.pumpDipEntryForm.patchValue(data);

          let select1 = this.shiftList.find(d => d.cmnId === data.shiftid);
          if (select1) {  
            this.pumpDipEntryForm.patchValue(select1);
            this.shiftTypeName = select1.cmnId+"-"+select1.codeDesc;
          }

          let select2 = this.salesPersonList.find(d => d.emplId === data.emplid);
          if (select2) {  
            this.pumpDipEntryForm.patchValue(select2);
            this.shiftEmplName = select2.emplId+"-"+select2.ticketNo+"-"+select2.fullName;
            // this.pumpDipEntryForm.patchValue({shiftEmplName:select2.ticketNo+"-"+select2.fullName});

          }


        });

        this.pumpDipEntryForm.disable();


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
  
  
  Select(dipEntryId: number) {
        this.pumpDipEntryForm.reset();
      this.divisionId =3;
  
      let select = this.lstcomments1.find(d => d.dipentryid === dipEntryId);
      if (select) {
        this.pumpDipEntryForm.patchValue(select);
        this.dipentryid = select.dipentryid;
        this.displayButton = false;
      
     }
     
    }


 

// onSelectType(cmnTp){
//   let select = this.cmnTypeList.find(d => d.CMNTYPE === cmnTp);
//   if (select) {
//      var cmnTypeId1=  select.CMNTYPEID+1;
//     this.pumpDipEntryForm.patchValue({cmnDesc:select.CMNDESC ,cmnTypeId :cmnTypeId1 ,application :'ALL'})
//   }
// }

resetMast() {
  window.location.reload();
}

closeMast() {
  this.router.navigate(['admin']);
}


CheckDataValidations(){

  const formValue: IDipEntry = this.pumpDipEntryForm.value;

  // formValue.nozzleCode =this.nozzleCode.toUpperCase();
  // formValue.nozzleDesc=this.nozzleDesc.toUpperCase();

  // formValue.attribute1=this.attribute1.charAt(0).toUpperCase();
  // alert ("code, desc ,attribute1: "+this.code + " , "+this.codeDesc+ " , "+this.attribute1);

  if (formValue.divisionId===undefined || formValue.divisionId===null || formValue.divisionId<0)
  {
    this.checkValidation=false; 
    alert ("DIVISION : Should not be null....");
    return;
  } 

  if (formValue.shiftid===undefined || formValue.shiftid===null || formValue.shiftid<=0 )
  {
    this.checkValidation=false; 
    alert (" SHIFT NAME : Should not be null....");
    return;
  } 

  if (formValue.emplid===undefined || formValue.emplid===null || formValue.emplid<=0 )
  {
    this.checkValidation=false; 
    alert ("SHIFT EMPLOYEE : Should not be null....");
    return;
  } 

  if (formValue.tankid===undefined || formValue.tankid===null || formValue.tankid<=0 )
  {
    this.checkValidation=false; 
    alert ("TANK NAME : Should not be null....");
    return;
  } 

  if (formValue.opendip===undefined || formValue.opendip===null || formValue.opendip<0 )
  {
    this.checkValidation=false; 
    alert ("OPEN DIP READING : Enter Valid Open Reading");
    return;
  } 

  if (formValue.closedip===undefined || formValue.closedip===null || formValue.closedip<0 )
  {
    this.checkValidation=false; 
    alert ("OPEN DIP READING  : Enter Valid Close Reading");
    return;
  } 

   if (formValue.closedip < formValue.opendip )
  {
    this.checkValidation=false; 
    alert ("READING  : Enter Valid Reading");
    return;
  } 
  if (formValue.openstock===undefined || formValue.openstock===null || formValue.openstock<0 )
  {
    this.checkValidation=false; 
    alert ("OPEN STOCK  : Please Check....");
    return;
  } 

  if (formValue.closestock===undefined || formValue.closestock===null || formValue.closestock<0 )
  {
    this.checkValidation=false; 
    alert ("CLOSING STOCK  : Please Check...");
    return;
  } 
  
    this.checkValidation=true;

}

}




