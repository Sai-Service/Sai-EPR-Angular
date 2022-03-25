import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
import { OrderManagementService } from 'src/app/order-management/order-management.service';

interface IEwScheme {
  

  mainModel:string;
  variant:string;
  ewType:string;
  ewSchemeName:string;
  premiumPeriod:number;
  slab:string;
  ewSchemeNo:string;
  ewSchemeDesc:string;
  ewInsId : number;
  schemeStartDate:Date;
  
  schemeEndDate:Date;
  schemeKms:number;
  validFromKms:number;
  validToKms:number;
  
  schemeAmount:number;

  
  
  }
@Component({
  selector: 'app-sai-ew-scheme-master',
  templateUrl: './sai-ew-scheme-master.component.html',
  styleUrls: ['./sai-ew-scheme-master.component.css']
})

export class SaiEwSchemeMasterComponent implements OnInit {
        saiEwSchemeMasterForm : FormGroup;
        
        pipe = new DatePipe('en-US');

        public OUIdList           : Array<string> = [];
        public mainModelList      :Array<string>  = [];
        public PaymentModeList    : Array<string> = [];
        public ReceiptMethodList  : Array<string> = [];
        public EwSchemeList       : Array<string>=[];
        public EWSlabList         : Array<string>=[];
        public EwTypeList         : Array<string>=[];
        public ModelVariantList   : Array<string>=[];
        public PremiumPeriodList  : Array<string>=[];
        public ewInsNameList      : Array<string> = [];
        
      
        public VariantSearch:any;
        lstcomments: any;
        lstEwSlabDetails:any;
        variantDetailsList:any;
       
        // lstcomments: any[];
      
        loginName:string;
        loginArray:string;
        name:string;
        ouName : string;
        locId: number;
        locName : string;
        orgId:number;
        ouId :number;
        deptId:number; 
       // emplId :number;
        public emplId =6;

      
      //////////////////////////////////
        mviewFlag :number=0;
        mainModel:string;
        ewSchemeName:string;
        slab:string;
        fromPurYear:number=3;
        addEw:string='N';

        ewSchemeId:number;
        ewType:string;
        ewSchemeNo:string;
        ewSchemeDesc:string;
      
        variant:string;
        variantDesc:string;
      
        ewInsId : number;
        ewInsurerSiteId:number;
      
        // schemeStartDate:Date;
        schemeStartDate = this.pipe.transform(Date.now(), 'y-MM-dd');
        schemeEndDate:Date;
      
        premiumPeriod:number;
        schemeKms:number;
        validFromKms:number;
        validToKms:number;
        schemeAmount:number;

        fromSlab:string;
        toSlab:string;

       
      
        //////////////////////////////////
        checkValidation=false;
        displayInactive = true;
        Status1: any;
        inactiveDate: Date;
        display = true;
        displayButton = true;
        showBankDetails=false;
        updateButton=false;
        saveButton=true;

        get f() { return this.saiEwSchemeMasterForm.controls; }

        saiEwSchemeMaster(saiEwSchemeMasterForm:any) {  }

        constructor(private service: MasterService,private orderManagementService:OrderManagementService,private  fb: FormBuilder, private router: Router) {
          this.saiEwSchemeMasterForm = fb.group({ 

            loginArray:[''],
            loginName:[''],
            ouName :[''],
            locId:[''],
            locName :[''],
            ouId :[],
            deptId :[],
            emplId:[''],
            orgId:[''],
      
            ewSchemeId:[],
            ewType:[],
            ewSchemeNo:[],
            ewSchemeDesc:[],
          
            variant:[],
            variantDesc:[],
          
            ewInsId : [],
            ewInsurerSiteId:[],
          
            schemeStartDate:[],
            schemeEndDate:[],
          
            premiumPeriod:[],
            schemeKms:[],
            validFromKms:[],
            validToKms:[],
            schemeAmount:[],
            addEw:[],

            slab:[],
            fromPurYear:[],

            ewSchemeName:[],
            mainModel:[],
            fromSlab:[],
            toSlab:[],
            mviewFlag:[],

          });
        }

        ngOnInit(): void {
          $("#wrapper").toggleClass("toggled");
          this.name=  sessionStorage.getItem('name');
          this.loginArray=sessionStorage.getItem('divisionName');
          this.loginName=sessionStorage.getItem('name');
          this.ouName = (sessionStorage.getItem('ouName'));
          this.ouId=Number(sessionStorage.getItem('ouId'));
          this.locId=Number(sessionStorage.getItem('locId'));
          // this.locName=(sessionStorage.getItem('locName'));
          this.deptId=Number(sessionStorage.getItem('dept'));
          // this.emplId= Number(sessionStorage.getItem('emplId'));
         
          this.orgId=this.ouId;
          // this.ewInsId=this.ouId;
          // this.ewInsurerSiteId=this.ouId;
          console.log(this.loginArray);
          console.log(this.locId);

          this.service.OUIdList()
          .subscribe(
            data => {
              this.OUIdList = data;
              console.log(this.OUIdList);
            }
          );

          this.service.EwSchemeList()
          .subscribe(
            data => {
              this.EwSchemeList = data;
              console.log(this.EwSchemeList);
            }
          );

          this.service.EWSlabList()
          .subscribe(
            data => {
              this.EWSlabList = data;
              console.log(this.EWSlabList);
            }
          );
          
          // this.service.ewInsNameList()
          // .subscribe(
          //   data => {
          //     this.ewInsNameList = data;
          //     console.log(this.ewInsNameList);
          //   }
          // );

          this.service.insNameList()
          .subscribe(
            data => {
              this.ewInsNameList = data;
              console.log(this.ewInsNameList);
            }
          );
      

          this.service.EwTypeList()
          .subscribe(
            data => {
              this.EwTypeList = data;
              console.log(this.EwTypeList);
            }
          );

          this.service.ModelVariantList()
          .subscribe(
            data => {
              this.ModelVariantList = data;
              console.log(this.ModelVariantList);
            }
          );

          this.service.PremiumPeriodList()
          .subscribe(
            data => {
              this.PremiumPeriodList = data;
              console.log(this.PremiumPeriodList);
            }
          );

          this.service.mainModelList()
          .subscribe(
            data => {
              this.mainModelList = data;
              console.log(this.mainModelList);
            }
          );

        }

        searchMast() {
          this.service.getEWSchemeSearch(this.ouId)
            .subscribe(
              data => {
                this.lstcomments = data;
                console.log(this.lstcomments);
              }
            );
        }

   
         

        onSelectedEWtype(mEvent :any) {

          // alert( "mviewFlag :" +this.mviewFlag);

          if(this.mviewFlag===0) {
          this.ewSchemeNo=this.ewType +"EW"+this.premiumPeriod+"-"+this.ewSchemeName+"-"+ this.slab+"-"+this.variant
          this.ewSchemeDesc=this.ewSchemeNo;
        }

        }

        onSelectedEWSlab(mEvent :any) { 

          // alert (mEvent);

          this.service.getEWSlabDetailsByCodeDesc(mEvent)
            .subscribe(
              data => {
                this.lstEwSlabDetails = data;
                console.log(this.lstEwSlabDetails);
                this.saiEwSchemeMasterForm.patchValue({
                  fromSlab: this.lstEwSlabDetails.attribute1,
                  toSlab: this.lstEwSlabDetails.attribute2,
             });
           }
            );

            //  alert( "mviewFlag :" +this.mviewFlag);
            if(this.mviewFlag===0) {
              this.ewSchemeNo=this.ewType +"EW"+this.premiumPeriod+"-"+this.ewSchemeName+"-"+ this.slab+"-"+this.variant
              this.ewSchemeDesc=this.ewSchemeNo;
            }
        }




        onOptionsSelectedVariant(modelVariant){

          this.service.variantDetailsList(modelVariant)
          .subscribe(
            data => {
              this.variantDetailsList = data;
              console.log(this.variantDetailsList);
              
              this.saiEwSchemeMasterForm.patchValue({
                variantDesc: this.variantDetailsList.varDescription,

              });
            }
             );

              if(this.mviewFlag===0) {
              this.ewSchemeNo=this.ewType +"EW"+this.premiumPeriod+"-"+this.ewSchemeName+"-"+ this.slab+"-"+this.variant
              this.ewSchemeDesc=this.ewSchemeNo;
            }
        }


        Select(ewSchemeId: number) {
       
          this.saiEwSchemeMasterForm.reset();
          this.mviewFlag=1;
          // alert( "mviewFlag :" +this.mviewFlag);
          let select = this.lstcomments.find(d => d.ewSchemeId === ewSchemeId);
          if (select) {
            this.saiEwSchemeMasterForm.patchValue(select);
            this.ewSchemeId = select.ewSchemeId;
            this.displayButton = false;
            this.updateButton=true;
            this.premiumPeriod=select.premiumPeriod;
            // alert("premium period : ,schemeStartDate ,slab : "+this.premiumPeriod +","+this.schemeStartDate +","+this.slab);

         }
         
        }
        
        transeData(val) 
        {
 
          delete val.divisionId;
          delete val.division;
          // delete val.ouId;
          delete val.loginArray;
          delete val.loginName;
          delete val.ewInsurerSiteId;
          delete val.ouName;
          delete val.locId;
          delete val.locName;
          delete val.deptId;
          delete val.orgId;
          
          return val;
        }
      
        

         newMast() {

          this.CheckDataValidations();
         
          if (this.checkValidation===true) {
          alert("Data Validation Sucessfull....")
            this.displayButton=false;
            this.updateButton=false;

        // const formValue: IPaymentRcpt =this.paymentReceiptForm.value;
        const formValue: IEwScheme =this.transeData(this.saiEwSchemeMasterForm.value);
        // debugger;
        this.service.SaiEwSchemeSubmit(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD INSERTED SUCCESSFUILY');
            // this.saiEwSchemeMasterForm.reset();
            // window.location.reload();
            this.saiEwSchemeMasterForm.disable();
          } else {
            if (res.code === 400) {
              alert('Code already present in the data base');
              // this.saiEwSchemeMasterForm.reset();
              this.displayButton=true;
              // window.location.reload();
            }
          }
        });
      } else { alert("Data Validation Not Sucessfull....\nPosting Not Done...Pls Check.")}

      }

      updateMast() {

         this.CheckDataValidations();
         
          if (this.checkValidation===true) {
          alert("Data Validation Sucessfull....\n")
          this.updateButton=false;
        const formValue: IEwScheme =this.transeData(this.saiEwSchemeMasterForm.value);
        
          this.service.UpdateSaiEwScheme(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD UPDATED SUCCESSFUILY');
            this.saiEwSchemeMasterForm.disable();
            // window.location.reload();
          } else {
            if (res.code === 400) {
              alert('ERROR OCCOURED IN PROCEESS');
              this.updateButton=true;
              // this.saiEwSchemeMasterForm.reset();
            }
          }
        });
      }else { alert("Data Validation Not Sucessfull....\n Please Check and Try Again...")}
      }

        resetMast() {
          window.location.reload();
        }
      
        closeMast() {
          this.router.navigate(['admin']);
        }


        
        onOptionsSelectedModel(mainModel){
      
          if(mainModel != null){
            this.orderManagementService.VariantSearchFn(mainModel)
            .subscribe(
              data => {
                this.VariantSearch = data;
                console.log(this.VariantSearch);
              }
            );
          }
          else{}
        }

        CheckDataValidations()
        {
      
            const formValue: IEwScheme = this.saiEwSchemeMasterForm.value;
            // alert("mainModel date :" +formValue.mainModel);
    
            if(formValue.mainModel===undefined || formValue.mainModel===null ) {
                this.checkValidation=false;
                alert ("MODEL: Should not be null value");
                return; 
            }
    
            if(formValue.variant===undefined || formValue.variant===null ) {
              this.checkValidation=false;
              alert ("VARIANT: Should not be null value");
              return; 
           }
         
           if(formValue.ewType===undefined || formValue.ewType===null) {
            this.checkValidation=false;
            alert ("SCHEME TYPE: Should not be null value");
            return; 
           }
  
           if (formValue.ewSchemeName===undefined || formValue.ewSchemeName===null)
           {
              this.checkValidation=false; 
              alert ("SCHEME NAME: Should not be null value");
               return;
            } 
          
            if (formValue.premiumPeriod <=0  || formValue.premiumPeriod===undefined || formValue.premiumPeriod===null)
            {
                this.checkValidation=false;
                alert ("SCHEME PREIOD: Should be above Zero....");
                return;
             } 
  
             if (formValue.slab===undefined || formValue.slab===null)
             {
                this.checkValidation=false;   
                alert ("SLAB: Should not be null value....");
                 return;
              } 
  
              if (formValue.ewSchemeNo===undefined || formValue.ewSchemeNo===null || formValue.ewSchemeNo.trim()==='')
              {
                  this.checkValidation=false;  
                  alert ("SCHEME CODE : Should not be null value...");
                  return;
               } 
              //  alert("Scheme desc "+formValue.ewSchemeDesc);
              if (formValue.ewSchemeDesc===undefined || formValue.ewSchemeDesc===null || formValue.ewSchemeDesc.trim()==='')
              {
                  this.checkValidation=false;
                  alert ("SCHEME DESC: Should not be null value...");
                  return;
               } 

              
               if (formValue.ewInsId===undefined || formValue.ewInsId===null)
               {
                   this.checkValidation=false;
                   alert ("EW INSURANCE: Should not be null value...");
                   return;
                } 

               if (formValue.schemeStartDate===undefined || formValue.schemeStartDate===null)
               {
                   this.checkValidation=false;
                   alert ("SCHEME START DATE: Should not be null value...");
                   return;
                } 
  
                if (formValue.schemeEndDate===undefined || formValue.schemeEndDate===null || formValue.schemeEndDate<=formValue.schemeStartDate)
                {
                    this.checkValidation=false;  
                    alert ("SCHEME END DATE: Should not be null value/grater than Scheme Start Date...");
                    return;
                 } 

                 if (formValue.schemeKms <=0 || formValue.schemeKms===undefined || formValue.schemeKms===null )
                 {
                     this.checkValidation=false;  
                     alert ("SCHEME KM LIMIT: Should be above Zero");
                     return;
                  } 

                  if (formValue.validFromKms <=0 || formValue.validFromKms===undefined || formValue.validFromKms===null || formValue.validFromKms>formValue.validToKms)
                  {
                      this.checkValidation=false;  
                      alert ("VALID FROM KM : Should be above Zero/Should not be above VALID TO KMS");
                      return;
                   } 

                   if (formValue.validToKms <=0 || formValue.validToKms===undefined || formValue.validToKms===null || formValue.validToKms<formValue.validFromKms )
                   {
                       this.checkValidation=false;  
                       alert ("VALID TO KM: Should be above Zero/Should not be below VALID FROM KMS");
                       return;
                    } 
  
                 if (formValue.schemeAmount===undefined || formValue.schemeAmount===null || formValue.schemeAmount<=0)
                 {
                     this.checkValidation=false;  
                     alert ("SCHEME AMOUNT: Should be above Zero");
                     return;
                  } 

  
                
                  this.checkValidation=true
        }
      

  }


