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
  premiumPeriod:string;
  
  }
@Component({
  selector: 'app-sai-ew-scheme-master',
  templateUrl: './sai-ew-scheme-master.component.html',
  styleUrls: ['./sai-ew-scheme-master.component.css']
})

export class SaiEwSchemeMasterComponent implements OnInit {
        saiEwSchemeMasterForm : FormGroup;

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
      
        schemeStartDate:Date;
        schemeEndDate:Date;
      
        premiumPeriod:string;
        schemeKms:number;
        schemeAmount:number;

        fromSlab:string;
        toSlab:string;

       
      
        //////////////////////////////////
      
        displayInactive = true;
        Status1: any;
        inactiveDate: Date;
        display = true;
        displayButton = true;
        showBankDetails=false;

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
          this.ewInsId=this.ouId;
          this.ewInsurerSiteId=this.ouId;
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
          
          this.service.ewInsNameList()
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



        onOptionsSelectedModel(mainModel){
          this.orderManagementService.VariantSearchFn(mainModel)
          .subscribe(
            data => {
              this.VariantSearch = data;
              console.log(this.VariantSearch);
            }
          );
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
        alert ("Posting data  to EW SCHEME TABLE......")
       

        // const formValue: IPaymentRcpt =this.paymentReceiptForm.value;
        const formValue: IEwScheme =this.transeData(this.saiEwSchemeMasterForm.value);
        // debugger;
        this.service.SaiEwSchemeSubmit(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD INSERTED SUCCESSFUILY');
            // this.saiEwSchemeMasterForm.reset();
            window.location.reload();
          } else {
            if (res.code === 400) {
              alert('Code already present in the data base');
              this.saiEwSchemeMasterForm.reset();
            }
          }
        });
      }

      updateMast() {
        alert ("Putting data  to EW SCHEME......")
        const formValue: IEwScheme =this.transeData(this.saiEwSchemeMasterForm.value);
        
          this.service.UpdateSaiEwScheme(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD UPDATED SUCCESSFUILY');
            window.location.reload();
          } else {
            if (res.code === 400) {
              alert('ERROR OCCOURED IN PROCEESS');
              this.saiEwSchemeMasterForm.reset();
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

