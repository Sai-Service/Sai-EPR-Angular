
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { MasterService } from '../master.service';
import { DatePipe } from '@angular/common';
 
interface IJaiRegime{

regimeCode:string;
regimeName:string;
regimeType:string;
startDate:Date;
endDate:Date;
status:string;
regimeId:number;
}

@Component({
  selector: 'app-jay-regime-master',
  templateUrl: './jay-regime-master.component.html',
  styleUrls: ['./jay-regime-master.component.css']
})
export class JaiRegimeMasterComponent implements OnInit {
  jaiRegimeMasterForm: FormGroup;

  pipe = new DatePipe('en-US');
  loginName:string;
  loginArray:string;
  name:string;
  ouName : string;
  locId: number;
  locName : string;
  orgId:number;
  ouId :number;
  deptId:number; 
  divisionId:number;
 // emplId :number;
  public emplId =6;


  regimeCode:string;
  regimeName:string;
  regimeType:string;
  // startDate:Date;
  endDate:Date;
  regimeId:number;
  submitted = false;
  public status ="Active"; 
  now = Date.now();
  startDate = this.pipe.transform(this.now, 'y-MM-dd');


  checkValidation=false;
  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  lstcomments: any[];
  public minDate = new Date();
  // public maxDate = new Date();
  public  regimeTypeList : Array<string> = [];
  public statusList : Array<string> = [];

constructor(private service : MasterService, private fb: FormBuilder, private router: Router) {
    this.jaiRegimeMasterForm = fb.group({
      loginArray:[''],
      loginName:[''],
      ouName :[''],
      locId:[''],
      locName :[''],
      ouId :[],
      deptId :[],
      emplId:[''],
      orgId:[],
      divisionId:[],
      regimeCode: ['', [Validators.required, Validators.maxLength(7)]],
      regimeName: ['', [Validators.required]],
      regimeType: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate:['',[Validators.nullValidator]],
      status:['', [Validators.required]],
      regimeId:[''],
    });
   }


  get f() { return this.jaiRegimeMasterForm.controls; }

  ngOnInit(): void {


    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.loginName=sessionStorage.getItem('name');
    this.ouName = (sessionStorage.getItem('ouName'));
    this.ouId=Number(sessionStorage.getItem('ouId'));
    this.locId=Number(sessionStorage.getItem('locId'));
    // this.locName=(sessionStorage.getItem('locName'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    // this.emplId= Number(sessionStorage.getItem('emplId'));
   
    this.orgId=this.ouId;
    console.log(this.loginArray);
    console.log(this.locId);

    this.service.regimeTypeLisFunt()
      .subscribe(
        data => {
          this.regimeTypeList = data;
          console.log(this.regimeTypeList);
        }
      );

      this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );
  }

  jaiRegimeMaster(jaiRegimeMaster: any){
  }

  //////////////////////////////////////Search Button 
  Select(regimeId: number) {
    // alert ('regimeid='+regimeId)
    let select = this.lstcomments.find(d => d.regimeId === regimeId);
    if (select) {
      this.jaiRegimeMasterForm.patchValue(select);
       this.regimeId = select.regimeId;
      this.displayButton = false;
      this.display = false;
    }
  }

  
  searchMast() {
    this.service.getJaiRegimeSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  }

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }
//////////////////////////////////////New Button 
  newMast() {
  
    this.CheckDataValidations();
    if (this.checkValidation===true) {
        alert("Data Validation Sucessfull....")

        const formValue: IJaiRegime =this.jaiRegimeMasterForm.value;
        this.service.JaiRegimeMasterSubmit(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD INSERTED SUCCESSFULLY');
            // this.jaiRegimeMasterForm.reset();
            this.jaiRegimeMasterForm.disable();
          } else {
            if (res.code === 400) {
              alert('Code already present in the data base');
              // this.jaiRegimeMasterForm.reset();
            }
          }
        });
    }else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }
  }
  
 
  
  
  updateMast() {

    this.CheckDataValidations();
    if (this.checkValidation===true) {
        alert("Data Validation Sucessfull....\nPutting data to TAX REGIME MASTER  TABLE")

        const formValue: IJaiRegime = this.jaiRegimeMasterForm.value;
        this.service.UpdateJaiRegimeById(formValue, formValue.regimeId).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD UPDATED SUCCESSFULLY');
            window.location.reload();
          } else {
            if (res.code === 400) {
              alert('ERROR OCCOURED IN PROCEESS');
              this.jaiRegimeMasterForm.reset();
            }
          }
          
        });
      }else{ alert("Data Validation Not Sucessfull....\nData not Saved...")  }
  }

  

  onOptionsSelected(event: any) {
    this.Status1 = this.jaiRegimeMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.jaiRegimeMasterForm.get('endDate').reset();
      this.displayInactive=true;
    }
  }


   // ------------------------------------VALIDATIONS------------------------------------

        CheckDataValidations(){
    
          const formValue: IJaiRegime = this.jaiRegimeMasterForm.value;
  
          // alert("ou id : "+formValue.ouId);
          if (formValue.regimeType===undefined || formValue.regimeType===null )
          {
            this.checkValidation=false; 
            alert ("REGIME TYPE : Should not be null....");
            return;
          } 
  
          if (formValue.regimeCode===undefined || formValue.regimeCode===null || formValue.regimeCode.trim()==='')
          {
            this.checkValidation=false; 
            alert ("REGIME CODE : Should not be null....");
            return;
          } 
  
          if (formValue.regimeName===undefined || formValue.regimeName===null || formValue.regimeName.trim()==='' )
          {
            this.checkValidation=false; 
            alert ("REGIME NAME : Should not be null....");
            return;
          } 
  
         
    
          // alert("status :" +formValue.status);
          if(formValue.status===undefined || formValue.status===null ) 
          {
              this.checkValidation=false;
              alert ("STATUS: Should not be null value");
              return; 
            }

                  if(formValue.startDate===undefined || formValue.startDate===null ) 
                  {
                      this.checkValidation=false;
                      alert ("START DATE: Should not be null value");
                      return; 
                    }
         
                    if(formValue.status==='Inactive' ) {
                      if(formValue.endDate===undefined || formValue.endDate===null ) 
                      {
                          this.checkValidation=false;
                          alert ("END DATE: Should not be null value");
                          return; 
                        } 
                      }

                  this.checkValidation=true;
  
        }




}
