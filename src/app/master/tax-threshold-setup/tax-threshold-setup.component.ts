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

interface ITaxThresholdSetup {


}

@Component({
  selector: 'app-tax-threshold-setup',
  templateUrl: './tax-threshold-setup.component.html',
  styleUrls: ['./tax-threshold-setup.component.css']
})
export class TaxThresholdSetupComponent implements OnInit {

  taxThresholdSetupForm: FormGroup;

 
  public OUIdList    :Array<string> = [];
  public statusList  : Array<string> = [];
  public regimeIdList: Array<string> = [];
  public thresholdTypeList: Array<string> = [];
  public tdsVendorList: Array<string> = [];
  public tdsSectionList: Array<string> = [];
  public tdsTaxCategoryList: Array<string> = [];

  public sectionNameDet: any;
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

  pipe = new DatePipe('en-US');
  ddate= Date.now();
  now = Date.now();
  // ewSaleDate = this.pipe.transform(this.now, 'y-MM-dd');

  
  regimeId: number;
  regimeCode:string;
  vendorType:string;
  sectionCode:string;
  sectionDesc:string;
  exceptionSetupFlag:string;
  retrospectiveFlag:string;
  taxCategoryId:number;
   
 


  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  showBankDetails=false;
  showCancelDetails=false;
  displaySuccess=false;

 

  
  get f() { return this.taxThresholdSetupForm.controls; }

  taxThresholdSetup(taxThresholdSetupForm:any) {  }

      constructor(private service: MasterService,private  fb: FormBuilder, private router: Router) { 
        this.taxThresholdSetupForm = fb.group({ 

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

      regimeId: ['', [Validators.required]],
      regimeCode:[],
      vendorType:[],
      sectionCode:[],
      sectionDesc:[],
      exceptionSetupFlag:[],   /* check box */
      retrospectiveFlag:[], /* check box */
      taxCategoryId:[],

     
      thresholdTypeLines: this.fb.array([this.lineDetailsGroup()]) ,
      thresholdTaxLines: this.fb.array([this.lineDetailsGroupTax()])        
        

      });

      }
      lineDetailsGroup() {
        return this.fb.group({
          thresholdTypeId :['', [Validators.required]],    
          thresholdType:['', [Validators.required]],
          fromAmt: [],
          toAmt: [],
          startDate:[],
          endDate:[],
                  
         });
      }

      lineDetailsGroupTax() {
        return this.fb.group({
          thresholdTaxId :['', [Validators.required]],    
          ouId:['', [Validators.required]],
          taxCatId: [],
          
                  
         });
      }
    
     lineDetailsArray() :FormArray{
        return <FormArray>this.taxThresholdSetupForm.get('thresholdTypeLines')
      }

      lineDetailsArrayTax() :FormArray{
        return <FormArray>this.taxThresholdSetupForm.get('thresholdTaxLines')
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

          this.service.regimeIdList()
          .subscribe(
            data => {
              this.regimeIdList = data;
              console.log(this.regimeIdList);
            }
          );

          this.service.thresholdTypeList()
          .subscribe(
            data => {
              this.thresholdTypeList = data;
              console.log(this.thresholdTypeList);
            }
          );

          this.service.tdsVendorList()
          .subscribe(
            data => {
              this.tdsVendorList = data;
              console.log(this.tdsVendorList);
            }
          );

          this.service.tdsSectionList()
          .subscribe(
            data => {
              this.tdsSectionList = data;
              console.log(this.tdsSectionList);
            }
          );

          this.service.tdsTaxCategoryList()
          .subscribe(
            data => {
              this.tdsTaxCategoryList = data;
              console.log(this.tdsTaxCategoryList);
            }
          );
         
        }

        onOptionSelectedSectionCode(sectionCode: any) {
          //  alert("sectionCode  :" + sectionCode);
         
             this.service.getSectionTdsDetailsByCode(sectionCode)
            .subscribe(
              data => {
                this.sectionNameDet = data;
                console.log(this.sectionNameDet);
                this.taxThresholdSetupForm.patchValue(this.sectionNameDet.codeDesc);
                this.sectionDesc = this.sectionNameDet.codeDesc;
                
              }
            );
        }

        exceptionSetupFlag1(e) {
          if (e.target.checked=== true) {
            this.exceptionSetupFlag = 'Y'
         } 

         if (e.target.checked=== false) {
           this.exceptionSetupFlag='N'
         }

         }

         retrospectiveFlag1(e) {
          if (e.target.checked=== true) {
            this.retrospectiveFlag = 'Y'
         } 

         if (e.target.checked=== false) {
           this.retrospectiveFlag='N'
         }

         }

      
        transeData(val) 
        {
 
          delete val.loginArray;
          delete val.loginName;
          delete val.ouName;
          delete val.locId;
          delete val.locName;
          // delete val.ouId;
          delete val.deptId;
          delete val.emplId;
          delete val.orgId;
          delete val.divisionId;
          return val;
        }


        addRow() {
           this.lineDetailsArray().push(this.lineDetailsGroup());
        }
      
        RemoveRow(index) {
          if (index===0){
      
          }
          else {
            this.lineDetailsArray().removeAt(index);
          }
        
        }

        addRow1() {
          this.lineDetailsArrayTax().push(this.lineDetailsGroupTax());
       }
     
       RemoveRow1(index) {
         if (index===0){
     
         }
         else {
           this.lineDetailsArrayTax().removeAt(index);
         }
       
       }

        

        resetMast() {
          window.location.reload();
        }
      
        closeMast() {
          this.router.navigate(['admin']);
        }

        newMast() {

          alert ("Threshold seetup..posting....wip")
          return;

          const formValue: ITaxThresholdSetup =this.transeData(this.taxThresholdSetupForm.value);
          this.service.McpPackageMasterSubmit(formValue).subscribe((res: any) => {
            if (res.code === 200) {
              alert('RECORD INSERTED SUCCESSFUILY');
              this.taxThresholdSetupForm.reset();
            } else {
              if (res.code === 400) {
                alert('ERROR WHILE INSERTING');
                this.taxThresholdSetupForm.reset();
              }
            }
          });
        }

        updateMast() {alert("Update....wip")}
        searchMast() {alert("Search....wip")}


}