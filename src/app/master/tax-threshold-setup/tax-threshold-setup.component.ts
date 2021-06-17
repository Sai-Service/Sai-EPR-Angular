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

  
  thresholdHdrId:number;
  thresholdSetupName:string;
  description:string;
  sectionCode:string; sectionDesc:string;
  sectionType:string;
  vendorTypeLookupCode:string;
 
  regimeId: number;
  regimeCode:string;
  multipleRateSetup:string;
  retrospectiveFlag:string;
  exceptionSetupFlag:string;
  custTypeLookupCode
  
  
  
  
  
 
  showTaxLine=false;
  showLineInputCol=false;
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

      thresholdHdrId:[],
      thresholdSetupName:[],
      description:[],
      regimeId: ['', [Validators.required]],
      regimeCode:[],
      vendorTypeLookupCode:[],
      sectionCode:[],
      sectionType:[],
      sectionDesc:[],
      exceptionSetupFlag:[],   /* check box */
      retrospectiveFlag:[], /* check box */
      // taxCategoryId:[],

     
      jaiApThreshSlabs: this.fb.array([this.lineDetailsGroup()]) ,
      jaiApThreshTaxes: this.fb.array([this.lineDetailsGroupTax()])        
        

      });

      }
      lineDetailsGroup() {
        return this.fb.group({
          thresholdTypeId :[],
          // thresholdHdrId:[], 
          thresholdType:['', [Validators.required]],
          thresholdSlabId:[], 
          fromAmount: [],
          toAmount: [],
          fromDate:[],
          toDate:[],
                  
         });
      }

      lineDetailsGroupTax() {
        return this.fb.group({
          thresholdTypeId :[],
          thresholdTaxId :[],
          thresholdTypeTax:[],
          // thresholdSlabId:[],
          // thresholdTypeId:[], 
          ouId:['', [Validators.required]],
          // taxId:[],
          taxCategoryId: [],
          
                  
         });
      }
    
     lineDetailsArray() :FormArray{
        return <FormArray>this.taxThresholdSetupForm.get('jaiApThreshSlabs')
      }

      lineDetailsArrayTax() :FormArray{
        return <FormArray>this.taxThresholdSetupForm.get('jaiApThreshTaxes')
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

        onThresholdTypeSelected(threshSlabCode : any ,index){
          // alert('threshId  =' +threshSlabCode + " index :"+index);

            if (threshSlabCode != '--Select--') {
              this.showLineInputCol=true;

             }
            else {
              this.showLineInputCol=false;
              // this.lineDetailsArray.clear();
              //  this.lineDetailsArray.controls[index].get('ouId').reset();
            }
          }

          onTaxThreshTypeSelected(txTreshSlab:any,index){
            // alert('TAX thresh SLAB =' +txTreshSlab + " index :"+index);
            var invLineArr = this.taxThresholdSetupForm.get('jaiApThreshSlabs').value;
            // var patch = this.taxThresholdSetupForm.get('jaiApThreshSlabs') as FormArray;
            // alert("lineDetailsArray Slab Length=" +invLineArr.length);
            // alert("lineDetailsArray Tax Length=" +this.lineDetailsArrayTax.length);
            var len1=invLineArr.length;

            for (let i = 0; i < len1 ; i++) 
              {
                var lineValue=invLineArr[i].thresholdType;
                // alert("lineValue"+i+"= "+lineValue);

                if(txTreshSlab===lineValue) 
                { 
                  alert("FOUND SELECTED VALUE IN THRESHOLD TYPE SLAB");
                  this.showTaxLine=true;
                }
                  else
                {
                  alert("SELECTED VALUE DOESN'T EXISIT IN SLAB TYPE...CAN'T PROCEED");
                  this.showTaxLine=false;
                  // this.lineDetailsArrayTax.clear();
                  
                }
              
              }

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
          delete val.regimeCode;
          delete val.sectionDesc;

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
          
          const formValue: ITaxThresholdSetup =this.transeData(this.taxThresholdSetupForm.value);
          this.service.taxThresholdSetupSubmit(formValue).subscribe((res: any) => {
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
       
        
        
         Select1(setupId: number) {
          // alert ('regimeid='+regimeId)
          let select = this.lstcomments.find(d => d.thresholdHdrId === setupId);
          if (select) {
            this.taxThresholdSetupForm.patchValue(select);
             this.thresholdHdrId = select.thresholdHdrId;
            this.displayButton = false;
            this.display = false;
          }
        }

        searchMast() {
          this.service.getThresholdSetup()
            .subscribe(
              data => {
                this.lstcomments = data;
                console.log(this.lstcomments);
              }
            );
        }

        Select(setupId: any) {
          alert("Threshold Setup Id :"+setupId);
          this.taxThresholdSetupForm.reset();
          let select = this.lstcomments.find(d => d.thresholdHdrId === setupId);

          alert( "select.thresholdHdrId : " + select.thresholdHdrId);
          alert("lineDetailsArray Length=" +this.lineDetailsArray.length);
        //  ------------------------- Threshold Slab-----------------------
          for(let i=0; i<this.lineDetailsArray.length; i++){ 
            this.lineDetailsArray().removeAt(i);
          }

          if(select.jaiApThreshSlabs.length>0){
      
             this.lineDetailsArray().clear();
      
            if (select) {

                var control = this.taxThresholdSetupForm.get('jaiApThreshSlabs') as FormArray;
               
                for (let i=0; i<select.jaiApThreshSlabs.length;i++) 
                  {
                    var jaiApThreshSlabs:FormGroup=this.lineDetailsGroup();
                    control.push(jaiApThreshSlabs);
                  }
                }
          }

          // --------------------------------Threshold Taxes ------------------------------------
          // for(let i=0; i<this.lineDetailsArrayTax.length; i++){ 
          //   this.lineDetailsArrayTax().removeAt(i);
          // }

          // if(select.jaiApThreshTaxes.length>0){
      
          //    this.lineDetailsArrayTax().clear();
      
          //   if (select) {

          //       var control1 = this.taxThresholdSetupForm.get('jaiApThreshTaxes') as FormArray;
               
          //       for (let i=0; i<select.jaiApThreshTaxes.length;i++) 
          //         {
          //           var jaiApThreshTaxes:FormGroup=this.lineDetailsGroupTax();
          //           control1.push(jaiApThreshTaxes);
          //         }
          //       }
          // }

          // ----------------------------------------------------------------------

           this.taxThresholdSetupForm.patchValue(select);  
           this.thresholdHdrId = select.thresholdHdrId;
            this.displayButton = false;
            this.display = false;
           
          }


}