import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor, MaxLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
import { now } from 'jquery';

interface IVariantMaster {
  variant: string;

}

@Component({
  selector: 'app-variant-master',
  templateUrl: './variant-master.component.html',
  styleUrls: ['./variant-master.component.css']
})
export class VariantMasterComponent implements OnInit {

  variantMasterForm: FormGroup;

 
  public OUIdList           :Array<string> = [];
  public mainModelList      :Array<string> = [];
  public fuelTypeList       :Array<string> = [];
  public statusList       :Array<string> = [];
  
  
   
  pipe = new DatePipe('en-US');

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
          alert ("Posting data  to VARIANT TABLE......")
          // const formValue: IPaymentRcpt =this.paymentReceiptForm.value;
          const formValue: IVariantMaster =this.transeData(this.variantMasterForm.value);
          // console.log(formValue);
          this.service.VariantMasterSubmit(formValue).subscribe((res: any) => {
            if (res.code === 200) {
              alert('RECORD INSERTED SUCCESSFUILY');
              this.displaySuccess=true;
              // this.saiEwSchemeMasterForm.reset();
              window.location.reload();
            } else {
              if (res.code === 400) {
                this.displaySuccess=false;
                alert('Code already present in the data base');
                this.variantMasterForm.reset();
              }
            }
          });
        }
  
        updateMast() {
          alert ("Putting data  to EW SCHEME......")
          const formValue: IVariantMaster =this.transeData(this.variantMasterForm.value);
          
            this.service.UpdateVariantMaster(formValue).subscribe((res: any) => {
            if (res.code === 200) {
              alert('RECORD UPDATED SUCCESSFUILY');
              window.location.reload();
            } else {
              if (res.code === 400) {
                alert('ERROR OCCOURED IN PROCEESS');
                this.variantMasterForm.reset();
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

