import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor, MaxLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
// import { now } from 'jquery';

interface IVariantMaster {
  mainModel:string;
  variantId:number;
  variant:string;
  varDescription:string;
  status:string;
  chasPrefix:string;
  engPrefix:string;
  fuelType:string;
  variantClass:string;
  vehicleType:string;
  cubicCapacity:string;
  seating:string;
  unladenWeight:string;
  grossWeight:string;
  fittedWith:string;
  serviceModel:string;
  mfgYearPrint:string;
  bharatStageNorms:string;
  cylinder:string;
  startDate:Date;
  endDate:string;
  oemWarrantyPeriod:number;


}

@Component({
  selector: 'app-variant-master',
  templateUrl: './variant-master.component.html',
  styleUrls: ['./variant-master.component.css']
})
export class VariantMasterComponent implements OnInit {
  variantMasterForm: FormGroup;

  pipe = new DatePipe('en-US');

 
  public OUIdList           :Array<string> = [];
  public mainModelList      :Array<string> = [];
  public fuelTypeList       :Array<string> = [];
  public statusList       :Array<string> = [];
  
  
   
  

  lstcomments: any[];
  
 

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
  public varAging : number;
  ddate= Date.now();
    
  now = Date.now();
  // ewSaleDate = this.pipe.transform(this.now, 'y-MM-dd');

mainModel:string;
variantId:number;
variant:string;
varDescription:string;
public status = "Active";
chasPrefix:string;
engPrefix:string;
fuelType:string;
variantClass:string;
vehicleType:string;
cubicCapacity:string;
seating:string;
unladenWeight:string;
grossWeight:string;
fittedWith:string;
serviceModel:string;
mfgYearPrint:string;
bharatStageNorms:string;
cylinder:string;
// startDate:Date;
startDate = this.pipe.transform(Date.now(), 'y-MM-dd');
endDate:Date;
// startDate = new Date();
oemWarrantyPeriod:number;
  
  checkValidation=false;
  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  showBankDetails=false;
  showCancelDetails=false;
  displaySuccess=false;

  variantItemId : number;

  
  get f() { return this.variantMasterForm.controls; }

  variantMaster(variantMasterForm:any) {  }

      constructor(private service: MasterService,private  fb: FormBuilder, private router: Router) { 
        this.variantMasterForm = fb.group({ 

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

     
      mainModel:[],
      variantId:[],
      variant:[],
      varDescription:[],
      status:[],
      chasPrefix:[],
      engPrefix:[],
      fuelType:[],
      variantClass:[],
      vehicleType:[],
      cubicCapacity:[],
      seating:[],
      unladenWeight:[],
      grossWeight:[],
      fittedWith:[],
      serviceModel:[],
      mfgYearPrint:[],
      bharatStageNorms:[],
      cylinder:[],
      startDate:[],
      endDate:[],
      oemWarrantyPeriod:[],
      });

      }

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
          // console.log(this.orgId);
          // this.ewInsuranceId=this.ouId;

          
         
          this.service.OUIdList()
          .subscribe(
            data => {
              this.OUIdList = data;
              console.log(this.OUIdList);
            }
          );

          this.service.mainModelList()
          .subscribe(
            data => {
              this.mainModelList = data;
              console.log(this.mainModelList);
            }
          );

          this.service.fuelTypeList()
          .subscribe(
            data => {
              this.fuelTypeList = data;
              console.log(this.fuelTypeList);
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

        onOptionsSelected(event: any) {
          this.Status1 = this.variantMasterForm.get('status').value;
          // alert(this.Status1);
          if (this.Status1 === 'Inactive') {
            this.displayInactive = false;
            this.endDate = new Date();
          }
          else if (this.Status1 === 'Active') {
            this.variantMasterForm.get('endDate').reset();
            this.displayInactive=true;
          }
        }


        searchMast() {
          this.service.getVariantList()
            .subscribe(
              data => {
                this.lstcomments = data;
                console.log(this.lstcomments);
              }
            );
           }

           Select(variantId: number) {
     
            this.variantMasterForm.reset();
            // this.mviewFlag=1;
            // alert( "mviewFlag :" +this.mviewFlag);
            let select = this.lstcomments.find(d => d.variantId === variantId);
            if (select) {
              this.variantMasterForm.patchValue(select);
              this.variantId = select.itemId;
              this.displayButton = false;
           
           }
           
          }
            

      
        transeData(val) 
        {
 
          delete val.regNo;
          delete val.loginArray;
          delete val.loginName;
          delete val.ouName;
          delete val.locId;
          delete val.locName;
          delete val.ouId;
          delete val.deptId;
          delete val.emplId;
          delete val.orgId;
          delete val.divisionId;
          return val;
        }


        newMast() {


          this.CheckDataValidations();

        if (this.checkValidation===true) {
          alert("Data Validation Sucessfull....\nPosting data  to VARIANT TABLE")

          const formValue: IVariantMaster =this.transeData(this.variantMasterForm.value);
          // console.log(formValue);
          this.service.VariantMasterSubmit(formValue).subscribe((res: any) => {
            if (res.code === 200) {
              alert('RECORD INSERTED SUCCESSFUILY');
              this.displaySuccess=true;
              this.variantMasterForm.disable();
              // window.location.reload();
            } else {
              if (res.code === 400) {
                this.displaySuccess=false;
                alert('Code already present in the data base');
                // this.variantMasterForm.reset();
              }
            }
          });
        }else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }
        }
  
        updateMast() {

          this.CheckDataValidations();

          if (this.checkValidation===true) {
          alert("Data Validation Sucessfull....\nPutting data to ORDER TYPE MASTER  TABLE")

          const formValue: IVariantMaster =this.transeData(this.variantMasterForm.value);
            this.service.UpdateVariantMaster(formValue).subscribe((res: any) => {
            if (res.code === 200) {
              alert('RECORD UPDATED SUCCESSFUILY');
              // window.location.reload();
              this.variantMasterForm.disable();
            } else {
              if (res.code === 400) {
                alert('ERROR OCCOURED IN PROCEESS');
                // this.variantMasterForm.reset();
              }
            }
          });
        }else{ alert("Data Validation Not Sucessfull....\nData not Saved...")  }
        }

        resetMast() {
          window.location.reload();
        }
      
        closeMast() {
          this.router.navigate(['admin']);
        }

        // ------------------------------------VALIDATIONS------------------------------------

        CheckDataValidations(){
    
          const formValue: IVariantMaster = this.variantMasterForm.value;
  
          // alert("ou id : "+formValue.ouId);
  
          if (formValue.mainModel===undefined || formValue.mainModel===null )
          {
            this.checkValidation=false; 
            alert ("MODEL : Should not be null....");
            return;
          } 
  
          if (formValue.variant===undefined || formValue.variant===null || formValue.variant.trim()==='')
          {
            this.checkValidation=false; 
            alert ("VARIANT : Should not be null....");
            return;
          } 
  
          if (formValue.varDescription===undefined || formValue.varDescription===null || formValue.varDescription.trim()==='' )
          {
            this.checkValidation=false; 
            alert ("VARIANT DESCRIPTION : Should not be null....");
            return;
          } 
  
         
           if (formValue.chasPrefix===undefined || formValue.chasPrefix===null || formValue.chasPrefix.trim()==='')
          {
             this.checkValidation=false; 
             alert ("CHASSIS PREFIX: Should not be null....");
              return;
           } 
  
            if (formValue.engPrefix===undefined || formValue.engPrefix===null || formValue.engPrefix.trim()==='')
            {
                this.checkValidation=false; 
                alert ("ENGINE PREFIX : Should not be null....");
                return;
              } 
  
              if (formValue.fuelType===undefined || formValue.fuelType===null)
              {
                  this.checkValidation=false; 
                  alert ("ENGINE TYPE: Should not be null....");
                  return;
                } 
  
                
              if (formValue.variantClass===undefined || formValue.variantClass===null )
              {
                  this.checkValidation=false; 
                  alert ("VEHICLE CLASS: Should not be null....");
                  return;
                } 
  
                if (formValue.vehicleType===undefined || formValue.vehicleType===null)
                {
                   this.checkValidation=false; 
                   alert ("VEHICLE TYPE: Should not be null....");
                    return;
                 } 
  
                 if (formValue.cubicCapacity===undefined || formValue.cubicCapacity===null || formValue.cubicCapacity.trim()==='')
                 {
                    this.checkValidation=false; 
                    alert ("CUBIC CAPACITY: Should not be null....");
                     return;
                  } 
  
                  if(formValue.seating===undefined || formValue.seating===null || formValue.seating.trim()==='' ) 
                  {
                      this.checkValidation=false;
                      alert ("SEATING: Should not be null value");
                      return; 
                    }

                if(formValue.unladenWeight===undefined || formValue.unladenWeight===null || formValue.unladenWeight.trim()==='') 
                {
                    this.checkValidation=false;
                    alert ("UNLADEN WEIGHT: Should not be null value");
                    return; 
                  }

                if(formValue.grossWeight===undefined || formValue.grossWeight===null || formValue.grossWeight.trim()==='' ) 
                {
                    this.checkValidation=false;
                    alert ("GROSS WEIGHT: Should not be null value");
                    return; 
                  }

              if(formValue.serviceModel===undefined || formValue.serviceModel===null ) 
              {
                  this.checkValidation=false;
                  alert ("SERVICE MODEL: Should not be null value");
                  return; 
                }

              if(formValue.mfgYearPrint===undefined || formValue.mfgYearPrint===null  || formValue.mfgYearPrint.trim()==='') 
              {
                  this.checkValidation=false;
                  alert ("MFG YEAR: Should not be null value");
                  return; 
                }
    
              if(formValue.cylinder===undefined || formValue.cylinder===null || formValue.cylinder.trim()==='') 
              {
                  this.checkValidation=false;
                  alert ("CYLINDER: Should not be null value");
                  return; 
                }

                
              if(formValue.bharatStageNorms===undefined || formValue.bharatStageNorms===null || formValue.bharatStageNorms.trim()==='' ) 
              {
                  this.checkValidation=false;
                  alert ("BS NORMS: Should not be null value");
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

