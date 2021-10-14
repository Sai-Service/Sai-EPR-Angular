// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-sai-ew-scheme',
//   templateUrl: './sai-ew-scheme.component.html',
//   styleUrls: ['./sai-ew-scheme.component.css']
// })
// export class SaiEwSchemeComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
// import { OrderManagementService } from 'src/app/order-management/order-management.service';

interface IEwScheme {
  premiumPeriod:string;
  
  }
@Component({
  selector: 'app-sai-ew-scheme',
  templateUrl: './sai-ew-scheme.component.html',
  styleUrls: ['./sai-ew-scheme.component.css']
})

export class SaiEwSchemeComponent implements OnInit {
        saiEwSchemeMasterForm : FormGroup;

        
        public PaymentModeList    : Array<string> = [];
        public ReceiptMethodList  : Array<string> = [];
      
        public EwTypeList         : Array<string>=[];
        public ModelVariantList   : Array<string>=[];
        public PremiumPeriodList : Array<string>=[];
        public OUIdList           : Array<string> = [];
        
      
        
        lstcomments: any;
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
        // public addEw='N';
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
        customerPremium:number;

       
      
        //////////////////////////////////
      
        displayInactive = true;
        Status1: any;
        inactiveDate: Date;
        display = true;
        displayButton = true;
        showBankDetails=false;

        get f() { return this.saiEwSchemeMasterForm.controls; }

        saiEwSchemeMaster(saiEwSchemeMasterForm:any) {  }

        constructor(private service: MasterService,private  fb: FormBuilder, private router: Router) {
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
            customerPremium:[],
            addEw:[],

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


        Select(ewSchemeId: number) {
          alert ('ewSchemeId='+ewSchemeId);
          // this.orderTypeMasterForm.get('ouId').reset();
          // this.orderTypeMasterForm.get('locId').reset();
          this.saiEwSchemeMasterForm.reset();
  
          let select = this.lstcomments.find(d => d.ewSchemeId === ewSchemeId);
          if (select) {
            this.saiEwSchemeMasterForm.patchValue(select);
            this.ewSchemeId = select.ewSchemeId;
            this.displayButton = false;
            this.premiumPeriod=select.premiumPeriod;
            alert( "premiumPeriod :" +this.premiumPeriod);
            
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
            alert(res.message);
            this.saiEwSchemeMasterForm.reset();
          } else {
            if (res.code === 400) {
              alert(res.message);
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
            alert(res.message);
            window.location.reload();
          } else {
            if (res.code === 400) {
              alert(res.message);
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


